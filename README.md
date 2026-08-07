# Portfolio Site — Mauricio Salinas

Landing estática (HTML + CSS + JS vanilla) del portfolio de Mauricio Salinas, backend developer.

- Bilingüe ES/EN (toggle en el header, detecta idioma del navegador por defecto).
- Dark mode opcional.
- Sin frameworks ni build step: abre `index.html` directo con doble click.

## Estructura

```
portfolio-site/
├── index.html
├── css/styles.css
├── js/main.js
├── assets/             # CV en PDF (ES/EN) — generados, no editar a mano
├── cv/                 # fuente de los CV + build-pdf.ps1 (ver cv/README.md)
└── README.md
```

## Actualizar el CV

La fuente vive en `cv/` (los `.html`, **no** los `.md`). Editas el HTML, corres el
build y los PDF de backend caen solos en `assets/`:

```powershell
powershell -ExecutionPolicy Bypass -File .\cv\build-pdf.ps1
```

Los nombres de archivo importan: `js/main.js` mapea `CV_Mauricio_Salinas.pdf` (ES)
y `CV_Mauricio_Salinas_EN.pdf` (EN) al botón de descarga según el idioma activo.
Si renombras un PDF, actualiza `cvFiles` en `js/main.js`.

Detalle completo del pipeline en [`cv/README.md`](cv/README.md).

## Publicar en GitHub Pages

El repo de páginas de usuario debe llamarse exactamente `mauridev94.github.io`.

1. Crear el repo en GitHub (público) y hacer push de este contenido a `main`, con `index.html` en la raíz.
2. Activar GitHub Pages: Settings → Pages → Source: `main` / `/ (root)`.
3. El sitio queda disponible en `https://mauridev94.github.io`.
