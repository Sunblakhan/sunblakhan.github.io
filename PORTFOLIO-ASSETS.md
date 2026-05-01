# Portfolio: thumbnails, documentation & slides

Project cards on the **Portfolio** page (`/projects/`) are driven by **`_data/portfolio.yml`**. Jekyll reads that file at build time; after you edit it, commit and push so GitHub Pages rebuilds the site.

## Thumbnails

1. Add image files under **`assets/img/projects/`** (create the folder if needed). Use PNG or WebP, roughly **1200×675** (16∶9) or similar so they look sharp on retina screens.
2. In `_data/portfolio.yml`, set `thumbnail` to a **site-relative path** beginning with `/`, for example:
   ```yaml
   thumbnail: "/assets/img/projects/chargehub.png"
   ```
3. Alternatively, you may use a **full HTTPS URL** (e.g. a hosted screenshot or CDN). Until you have art, placeholders from `placehold.co` work for testing.

If `thumbnail` is empty (`""`), the layout shows a **gradient placeholder** block instead of an image.

## Documentation

Use **`documentation_url`** for anything long-form recruiters should open separately: README PDF, architecture write-up, Notion page, Google Doc (share link), etc.

```yaml
documentation_url: "https://drive.google.com/file/d/…/view"
```

Leave `""` until the link exists; then the **Documentation / Dokumentation** button appears automatically on that card.

## Presentations / slides

Use **`presentation_url`** for slide decks:

- Google Slides “Publish to web” or share link  
- Speaker Deck, Canva, PowerPoint exported to PDF (hosted somewhere public)

```yaml
presentation_url: "https://docs.google.com/presentation/d/…"
```

Again, use `""` until ready; then the **Slides / Folien** button shows.

## Filters

Each project has **`categories`** — a YAML list whose entries must match the filter **`id`** values (`freelance`, `coding`, `ai`, `data-science`, `personal`). Example:

```yaml
categories: [data-science, coding, personal]
```

To add a new filter type, extend the **`filters`** list at the top of `_data/portfolio.yml` **and** use the same `id` in project `categories`.

## Adding a new project

Copy an existing entry under `projects:` and fill in:

- `slug` — short internal id (not shown on site)  
- `categories`, `thumbnail`, `documentation_url`, `presentation_url`  
- `title_en` / `title_de`, `summary_en` / `summary_de`, `meta_en` / `meta_de`  
- `tech:` list (or `[]`)  
- `links:` — list of `{ label_en, label_de, url }`

After saving, build locally (`bundle exec jekyll serve`) or push to GitHub Pages to verify.
