# Portfolio: thumbnails, detail pages, gallery & docs

Project cards on **Portfolio** (`/projects/`) come from **`_data/portfolio.yml`**. Each project also has a **detail page** at **`/projects/<slug>/`** (for example `/projects/chargehub/`).

After you edit YAML or add images, commit and push so GitHub Pages rebuilds the site.

## How it works

| What visitors see | Where it is configured |
|-------------------|------------------------|
| Card on `/projects/` (thumbnail, short summary, filters, search) | `_data/portfolio.yml` — `summary_*`, `thumbnail`, `categories`, `keywords`, `featured` |
| Full project page | Same YAML — `description_*`, `gallery`, `links`, `documentation_url`, `presentation_url` |
| Page URL | `slug` field → `/projects/<slug>/` (wired by a small file in `project/<slug>.html`) |

Cards link to the detail page (**View project**). The detail page shows the long description, image gallery, live demo / GitHub buttons, and documentation / slides when URLs are set.

## Thumbnails (portfolio cards)

1. Put images in **`assets/img/projects/`** (PNG or WebP, about **1200×675**, 16∶9).
2. In `_data/portfolio.yml`:
   ```yaml
   thumbnail: "/assets/img/projects/charging-hub-thumbnail.png"
   ```
3. You can use a full **HTTPS URL** instead. If `thumbnail` is `""`, a gradient placeholder is shown.

## Gallery (detail page only)

1. Create a folder per project, for example:
   - `assets/img/projects/chargehub/`
   - `assets/img/projects/bi-aol/`
2. Add screenshots there (`screenshot-map.png`, `architecture.png`, etc.).
3. List them under that project in `_data/portfolio.yml`:
   ```yaml
   gallery:
     - src: "/assets/img/projects/chargehub/screenshot-map.png"
       caption_en: "Berlin station map"
       caption_de: "Karte der Berliner Stationen"
     - src: "/assets/img/projects/chargehub/dashboard.png"
       caption_en: "Analytics dashboard"
       caption_de: "Analytics-Dashboard"
   ```
4. Use `gallery: []` until you have images; the gallery section is hidden when empty.

## Full description (detail page)

Add Markdown in **`description_en`** and **`description_de`** (multi-line with `|`):

```yaml
description_en: |
  ChargeHubBerlin is a Streamlit app for exploring EV charging infrastructure in Berlin.

  It combines geospatial views, filtering, and data quality checks backed by a large automated test suite.
description_de: |
  …
```

If both are empty, the detail page falls back to `summary_*` and `meta_*` from the card.

## Documentation & slides

**Option A — host on your site (PDF, etc.)**

1. Put files in **`assets/docs/projects/`**, e.g. `assets/docs/projects/chargehub-report.pdf`.
2. In YAML:
   ```yaml
   documentation_url: "/assets/docs/projects/chargehub-report.pdf"
   ```

**Option B — external link (Google Drive, Notion, Slides)**

```yaml
documentation_url: "https://drive.google.com/file/d/…/view"
presentation_url: "https://docs.google.com/presentation/d/…"
```

Leave `""` until ready; the **Documentation** / **Slides** buttons appear on the detail page (and on the card if you still have those buttons there).

## Live demo & other links

Use the **`links`** list on each project (shown on the detail page and previously on the card):

```yaml
links:
  - { label_en: "Live App", label_de: "Live-App", url: "https://…" }
  - { label_en: "GitHub", label_de: "GitHub", url: "https://github.com/…" }
```

## Adding a new project

1. Copy an existing block under `projects:` in `_data/portfolio.yml` (include `description_*` and `gallery: []`).
2. Add **`project/<slug>.html`** (copy an existing file in `project/` and change `permalink` + `project_slug`).
3. Add thumbnail (and optional gallery folder + docs).

## Filters, search & featured

Each project has **`categories`** — entries must match filter **`id`** values (`freelance`, `coding`, `ai`, `data-science`, `personal`). A project may use **multiple** categories.

| Project type | Example | `categories` |
|--------------|---------|----------------|
| Academic (data + software) | ChargeHub, AOL BI | `[data-science, coding]` |
| Freelance AI / automation | n8n ops | `[ai, freelance]` |
| Personal link hubs | GitHub / GitLab card | `[personal]` |

Set **`featured: true`** on one flagship project (badge + wider card). Optional **`keywords`** add extra terms for the search box on `/projects/`.

To add a new filter chip, extend the **`filters`** list and use the same `id` in project `categories`.
