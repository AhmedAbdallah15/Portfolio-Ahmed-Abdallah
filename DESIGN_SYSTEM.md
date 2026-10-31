# Nocturnal studio design system

The existing React/TypeScript/Vite architecture, content source, artwork and hash routes are preserved. The redesign changes presentation and interaction in place.

## Palette and typography

- Canvas #08090d; surface #11141c; elevated surface #171b25.
- Foreground #f5f5f7; secondary #a5a8b8; borders #292c39.
- Violet #b6a0ff; supporting ice #80dded. Dark plum variations provide atmosphere without unrelated UI colors.
- System Arial/Helvetica sans with Georgia italic editorial accents. No external font request.
- Responsive clamp typography; 1280px content maximum; 20px mobile, 40px tablet and 64px large-screen gutters.

All surrounding UI, project stages, contact areas, menus and dialogs are dark. Original artwork retains its real colors and remains uncropped in case-study views. Atmosphere uses static SVG noise, restrained radial lighting and a fine grid; no video/canvas background or generated project artwork.

## Reusable motion system

Tokens in src/styles.css: 220ms feedback, 700ms reveals, cubic-bezier(.16,1,.3,1). Hero words reveal from masks in a short stagger; posters gently float on eligible desktop devices; the orbital graphic and scroll cue move slowly. Pointer lighting, restrained 3D tilt and magnetic actions are progressive enhancements.

src/hooks/usePortfolioMotion.ts owns IntersectionObserver reveals, dynamic-content enrollment, pointer state, a single pending requestAnimationFrame and cleanup. It writes CSS variables directly instead of rendering React on pointer movement. Motion and pointer media-query changes are handled live; route changes disconnect previous observers/listeners.

Reduced motion removes entrances, ambient drift, smooth scroll, pointer enhancements and reveal transforms. Touch devices keep simple entrances/reveals without a cursor aura, tilt or continuous poster movement. The native cursor is never hidden. Content is visible before JavaScript; the hook only stages below-viewport elements. No intro/loading gate or scroll hijack.

## Components and composition

- Header: floating translucent surface, scroll-state styling, active-section location indicator, reading-progress line and animated mobile disclosure.
- Home: cinematic poster stage, staggered headline, ambient pointer spotlight and scroll cue. Complete collection uses asymmetric two-column desktop rhythm and single-column mobile.
- Project cards: dark grid stages, pointer-following light, subtle tilt, image lift, animated border/arrow and visible keyboard focus.
- Capabilities: keyboard tabs for the existing four creative services, arrow/Home/End support and animated panel. A static summary retains every description without interaction or JavaScript.
- Visual language: nature, journey, emotion and culture from the source; project links, reveal progression and drawn line. This is not an employment timeline.
- ProjectView/Lightbox: complete original galleries, coordinated dark stages, modal entrance, native Escape plus explicit Tab wrapping and focus restoration.
- Contact: dark atmosphere, magnetic email action, preserved email/phone/Upwork/LinkedIn links.

## Data, routing and SEO

src/content.ts is unchanged by the redesign. Existing #/project/<slug> URLs, title/description behavior, share fallback and browser history remain. Homepage pre-rendering, Person structured data and social profiles remain. Theme-color, favicon and social preview now match the dark system. scripts/social-preview.mjs generates the preview from original artwork; the existing asset generator calls it.

Real SITE_URL configuration is still required at public deployment for canonical/sitemap/absolute social metadata. Static hosting and deployment procedures are unchanged. No runtime animation package or backend was added.
