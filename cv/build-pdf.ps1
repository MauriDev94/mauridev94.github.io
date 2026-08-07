# build-pdf.ps1
# Genera los PDF de los CV desde los HTML usando Edge en modo headless.
# Uso:  powershell -ExecutionPolicy Bypass -File .\build-pdf.ps1

$ErrorActionPreference = "Stop"

# --- Ubicar Edge -------------------------------------------------------------
$edgeCandidates = @(
    "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
)
$edge = $edgeCandidates | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $edge) { throw "No se encontro msedge.exe en las rutas conocidas." }

# --- Config ------------------------------------------------------------------
$dir = if ($PSScriptRoot) { $PSScriptRoot } else { (Get-Location).Path }
# Perfil UNICO por corrida: un --user-data-dir compartido queda bloqueado si una
# corrida previa dejo procesos msedge huerfanos, y la siguiente se cuelga.
$profileDir = Join-Path $env:TEMP ("edge-pdf-" + [guid]::NewGuid().ToString("N").Substring(0,8))

# Los dos CV de backend se publican en el sitio, asi que se generan DIRECTO en
# assets/: una sola copia de cada PDF en el repo, imposible que se desincronice.
#
# Los targets de QA siguen declarados a proposito, pero su HTML NO esta en el
# repo (esta en .gitignore, la fuente vive en D:\descargas\cv). Si corres esto
# tal cual, el loop los omite con un warning y sigue - es el comportamiento
# esperado, no un error. Si algun dia copias los *_QA*.html aca al lado, se
# generan solos y quedan locales, sin publicarse.
$publishDir = Join-Path $dir ".." | Join-Path -ChildPath "assets"
if (-not (Test-Path $publishDir)) { throw "No existe la carpeta de publicacion: $publishDir" }
$publishDir = (Resolve-Path $publishDir).Path

$targets = @(
    @{ Name = "CV_Mauricio_Salinas";       Out = $publishDir }  # Backend       - Espanol
    @{ Name = "CV_Mauricio_Salinas_EN";    Out = $publishDir }  # Backend       - Ingles
    @{ Name = "CV_Mauricio_Salinas_QA";    Out = $dir }         # QA Automation - Espanol
    @{ Name = "CV_Mauricio_Salinas_QA_EN"; Out = $dir }         # QA Automation - Ingles
)

Write-Host "Edge: $edge"
Write-Host "Fuentes:  $dir"
Write-Host "Publica:  $publishDir`n"

# --- Generar -----------------------------------------------------------------
$ok = 0
foreach ($t in $targets) {
    $name = $t.Name
    $html = Join-Path $dir "$name.html"
    $pdf  = Join-Path $t.Out "$name.pdf"

    if (-not (Test-Path $html)) {
        Write-Warning "No existe $name.html - se omite."
        continue
    }

    $uri = "file:///" + ($html -replace '\\', '/')
    Write-Host "Generando $name.pdf ..."

    $backup = $null
    if (Test-Path $pdf) {
        # Guardamos el PDF previo: si Edge falla, lo restauramos en vez de
        # dejar al usuario sin archivo.
        $backup = "$pdf.prev"
        Move-Item $pdf $backup -Force
    }

    # --no-sandbox es OBLIGATORIO en esta maquina: el driver de GPU hace que los
    # procesos hijos sandboxeados de Chromium mueran, el padre nunca termina y los
    # msedge.exe se acumulan colgados. Mismo problema que Obsidian y OpenCode Desktop.
    $edgeArgs = @(
        "--headless=new"
        "--no-sandbox"
        "--disable-gpu"
        "--disable-software-rasterizer"
        "--disable-dev-shm-usage"
        "--no-pdf-header-footer"
        "--user-data-dir=$profileDir"
        "--virtual-time-budget=6000"
        "--print-to-pdf=$pdf"
        $uri
    )

    # Edge falla de forma intermitente (tipicamente en la 3a invocacion seguida).
    # Hasta 3 intentos con pausa creciente.
    $generated = $false
    for ($try = 1; $try -le 3 -and -not $generated; $try++) {
        if ($try -gt 1) {
            Write-Host "  reintento $try ..." -ForegroundColor DarkYellow
            Start-Sleep -Seconds (2 * $try)
        }

        # Start-Process (no el operador &) evita que el stderr nativo de Edge se
        # convierta en un error terminante. -PassThru + Wait-Process -Timeout mata
        # el proceso si se cuelga, en vez de esperar para siempre y acumular.
        $proc = Start-Process -FilePath $edge -ArgumentList $edgeArgs -PassThru -NoNewWindow `
                              -RedirectStandardError (Join-Path $env:TEMP "edge-pdf-err.log")
        try {
            Wait-Process -Id $proc.Id -Timeout 45 -ErrorAction Stop
        } catch {
            Write-Warning "  Edge se colgo (>45s) - matando proceso $($proc.Id)"
            Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
        }

        # Matar hijos huerfanos de ESTA corrida (identificados por el perfil unico).
        Get-CimInstance Win32_Process -Filter "Name='msedge.exe'" |
            Where-Object { $_.CommandLine -like "*$(Split-Path $profileDir -Leaf)*" } |
            ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }

        if ((Test-Path $pdf) -and (Get-Item $pdf).Length -gt 1024) { $generated = $true }
    }

    if ($generated) {
        $kb = [math]::Round((Get-Item $pdf).Length / 1KB, 1)
        Write-Host "  OK  -> $name.pdf ($kb KB)" -ForegroundColor Green
        if ($backup -and (Test-Path $backup)) { Remove-Item $backup -Force }
        $ok++
    } else {
        Write-Warning "  FALLO -> no se genero $name.pdf tras 3 intentos"
        if ($backup -and (Test-Path $backup)) {
            Move-Item $backup $pdf -Force
            Write-Warning "  PDF anterior restaurado (no perdiste el archivo)."
        }
    }

    Start-Sleep -Seconds 2   # respiro entre archivos: sin esto Edge falla en cadena
}

Write-Host "`n$ok de $($targets.Count) PDF generados."

# Limpieza del perfil temporal de esta corrida.
if (Test-Path $profileDir) {
    Remove-Item $profileDir -Recurse -Force -ErrorAction SilentlyContinue
}
