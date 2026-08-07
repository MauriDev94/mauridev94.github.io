# CV — fuente y build

Fuente de los CV en PDF que publica el sitio. Antes vivía fuera del repo
(`D:\descargas\cv`), y por eso el sitio y el CV se desincronizaron: el commit
`188180b` sacó Django del stack de API Monolith en la web, pero los PDF siguieron
diciendo Django durante mes y medio. Ahora la fuente y el sitio viajan juntos.

## La fuente es el `.html`, NO el `.md`

Léelo dos veces, porque es la trampa de esta carpeta.

No existe ningún paso `md → html`. El único script es `build-pdf.ps1`, y hace
`html → pdf`. Los `.md` son una capa anterior que quedó a medio camino:

| Archivo | Estado |
|---|---|
| `CV_Mauricio_Salinas.html` | ✅ fuente real |
| `CV_Mauricio_Salinas_EN.html` | ✅ fuente real |
| `CV_Mauricio_Salinas.md` | ⚠️ desfasado (9 jul) |
| `CV_Mauricio_Salinas_EN.md` | ⚠️ desfasado (9 jul) |

Los `.md` de backend son del 9 de julio; los `.html`, del 30. Al `.md` le faltan
la cobertura `85–92%` por servicio, los `3 módulos de dominio` de API Monolith y
el gate `--cov-fail-under=82`. Todo eso **sí** está en el `.html` y en el PDF que
está publicado.

**Si editas el `.md` y regeneras desde ahí, retrocedes el CV tres semanas.**
Edita el `.html`.

## Generar

```powershell
powershell -ExecutionPolicy Bypass -File .\build-pdf.ps1
```

| Target | Sale en | Versionado |
|---|---|---|
| `CV_Mauricio_Salinas` (backend ES) | `../assets/` | sí — lo sirve el sitio |
| `CV_Mauricio_Salinas_EN` (backend EN) | `../assets/` | sí — lo sirve el sitio |
| `CV_Mauricio_Salinas_QA` (QA ES) | — | su HTML no está acá |
| `CV_Mauricio_Salinas_QA_EN` (QA EN) | — | su HTML no está acá |

Los de backend se escriben **directo en `assets/`** a propósito: una sola copia de
cada PDF en el repo. Si existieran en `cv/` y en `assets/` a la vez, volverían a
desincronizarse — que es exactamente el problema que esta carpeta vino a cerrar.

Los targets de QA siguen declarados en el script, pero su HTML **no vive acá**: el
`.gitignore` bloquea `cv/*_QA*` y la fuente está en `D:\descargas\cv`. Correr el
build tal cual los omite con un warning y sigue — es lo esperado, no un error.

Son variantes dirigidas: se mandan a una postulación puntual y no se publican. El
sitio dice "Backend Developer" en el `<title>`, el hero y el pitch; un CV de QA
colgando de la misma URL manda una señal cruzada.

Después de generar:

```bash
git add assets/ && git commit -m "chore: actualizar cv"
```

## Por qué `build-pdf.ps1` es así de defensivo

El script usa Edge en headless. Los comentarios del código explican el porqué de
cada workaround — no los borres, son cicatrices reales de esta máquina:

- `--no-sandbox` es **obligatorio** acá: el driver de GPU mata los procesos hijos
  sandboxeados de Chromium, el padre nunca termina y los `msedge.exe` se acumulan
  colgados. Mismo síntoma que Obsidian y OpenCode Desktop.
- `--user-data-dir` único por corrida: un perfil compartido queda bloqueado si una
  corrida previa dejó procesos huérfanos.
- 3 reintentos con pausa creciente: Edge falla de forma intermitente, típicamente
  en la 3ª invocación seguida.
- Guarda el PDF anterior como `.prev` y lo restaura si falla, para no dejarte sin
  archivo.

## Ojo con GitHub Pages

Este repo es **público por obligación**: GitHub Pages de usuario no admite repo
privado. Y Pages sirve el árbol completo desde la raíz, así que cualquier archivo
que commitees acá queda alcanzable por dos caminos — el repo en GitHub y una URL
directa del sitio:

```
https://mauridev94.github.io/cv/<archivo>
```

Para los `.html` de backend eso da lo mismo: es el mismo contenido, palabra por
palabra, del PDF que cualquiera se baja apretando "Descargar CV" en el home. No
hay exposición incremental.

Por eso las variantes QA **no están en el repo**. `.gitignore` bloquea `cv/*_QA*`
y su fuente vive en `D:\descargas\cv`. Si algún día las copias acá, git las va a
ignorar solo — pero si fuerzas el `git add`, quedan públicas. Ten eso presente.

## `github-profile-README.md`

No es documentación de esta carpeta. Es el README del perfil de GitHub
(`MauriDev94/MauriDev94`). Venía llamado `README.md` dentro de la carpeta de CV, y
con ese nombre GitHub lo renderizaría como si describiera el build. Renombrado
para que no confunda.
