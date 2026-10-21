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
├── assets/             # CV en PDF (ES/EN) — generados fuera del repo, no editar a mano
└── README.md
```

## Actualizar el CV

Los PDF de `assets/` son los CV de backend. Se generan fuera de este repo, con el
generador de CV (`uv run build.py`, en la carpeta local `perfil/cv`), y se copian
acá con estos nombres:

| Generado | En el sitio |
|---|---|
| `CV_Mauricio_Salinas_Backend_ES.pdf` | `assets/CV_Mauricio_Salinas.pdf` |
| `CV_Mauricio_Salinas_Backend_EN.pdf` | `assets/CV_Mauricio_Salinas_EN.pdf` |

`js/main.js` mapea esos nombres al botón de descarga según el idioma activo. Si
renombras un PDF, actualiza `cvFiles` en `js/main.js`.

Solo se publican las variantes de backend: el sitio es de backend y este repo es
público por obligación (GitHub Pages de usuario no admite repo privado), así que
todo lo que se commitea acá queda servido en `mauridev94.github.io`.

## Publicar en GitHub Pages

El repo de páginas de usuario debe llamarse exactamente `mauridev94.github.io`.

1. Crear el repo en GitHub (público) y hacer push de este contenido a `main`, con `index.html` en la raíz.
2. Activar GitHub Pages: Settings → Pages → Source: `main` / `/ (root)`.
3. El sitio queda disponible en `https://mauridev94.github.io`.
