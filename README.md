# Personal Portfolio Website

A responsive portfolio built with plain HTML, CSS, and JavaScript, hosted on GitHub Pages.

## Folder structure

```
/                         Home page (all sections, follows the wireframe)
/about/  /skills/  /experience/  /projects/  /education/  /cv/  /contact/
/projects/<project-id>/   One page per project
/404.html                 "Page not found" page
/robots.txt  /sitemap.xml SEO files
/assets/css/style.css     All styles (light and dark mode)
/assets/js/app.js         Renders the site (no need to edit)
/assets/js/data/profile.js   YOUR personal info, skills, experience, education
/assets/js/data/projects.js  YOUR projects
/assets/img/              Photo, project images, favicon, social preview image
/assets/cv/               Put your CV PDF here
```

## 1. Replace the sample content

1. **Personal info:** edit `assets/js/data/profile.js`.
2. **Projects:** edit `assets/js/data/projects.js`. Leave a link as `""` if it doesn't exist; empty links are hidden automatically.
3. **Find and replace in every file** (VS Code: `Ctrl+Shift+H`):
   - `Emmanuel Baylon` → your real name
   - `tuix094` → your GitHub username
   - `emmanuelbaylon03@gmail.com` → your email
   - `yourprofile` → your LinkedIn profile ID
4. **Profile photo:** save a square photo as `assets/img/profile.webp` (about 480×480 px), then change `photo` in `profile.js`.
5. **Project images:** save screenshots as `.webp` files (about 1600×1000 px, under 200 KB) in `assets/img/projects/`, then update `image` and `screenshots` in `projects.js`. Convert images for free at https://squoosh.app.
6. **CV:** save your CV as `assets/cv/Your-Name-CV.pdf`, or change `cv.file` in `profile.js` to match your file name.
7. **Social preview image:** `assets/img/og-image.png` (1200×630) shows when your link is shared. Replace it with your own if you like.
8. **Initials:** change `initials` in `profile.js` and the "EB" text in `assets/img/favicon.svg`.

### Adding a new project
1. Copy one `{ ... }` block in `projects.js` and edit it. The `id` becomes the URL.
2. Copy a folder inside `/projects/`, rename it to the new `id`, and in its `index.html` update the `<title>`, `description`, `canonical` and `og:url` links, `data-project`, and the `<h1>` text.
3. Add the new URL to `sitemap.xml`.

## 2. Connect the contact form (Formspree, free)

GitHub Pages can't send email, so the form uses Formspree.
1. Sign up at https://formspree.io and create a new form with your email.
2. Copy the form ID (the part after `/f/`, for example `xyzabcde`).
3. Paste it into `formspreeId` in `profile.js`.
4. Send a test message from the live site and confirm it in your inbox.

The form ID is meant to be public, so it is safe in your code. Spam protection: a hidden honeypot field, a 3-second minimum fill time, input validation, and Formspree's own filtering.

## 3. Test locally

The site uses root paths like `/assets/...`, so open it through a local server, not by double-clicking the file:

```
cd path/to/portfolio
python -m http.server 8000
```
Then open http://localhost:8000. (Or use the VS Code "Live Server" extension.)

## 4. Deploy to GitHub Pages

1. Create a GitHub account if you don't have one.
2. Create a **new public repository named exactly `tuix094.github.io`** (use your real username). This makes the site live at `https://tuix094.github.io/`.
3. Upload all files in this folder to the repository (Add file → Upload files, or use Git):
   ```
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/tuix094/tuix094.github.io.git
   git push -u origin main
   ```
4. In the repository go to **Settings → Pages**. Under "Build and deployment", set Source to **Deploy from a branch**, branch **main**, folder **/ (root)**, then Save.
5. Wait 1 to 3 minutes, then open `https://tuix094.github.io/`.
6. In Settings → Pages, make sure **Enforce HTTPS** is checked.

### Optional: custom domain
Buy a domain, then in Settings → Pages enter it under "Custom domain". At your domain provider, add DNS records: four `A` records for `@` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, and a `CNAME` record for `www` pointing to `tuix094.github.io`. After DNS updates, enable Enforce HTTPS, and replace `https://tuix094.github.io` with your domain in all files.

## 5. Help search engines find you

1. Go to https://search.google.com/search-console and add your site URL.
2. Verify ownership (the "HTML tag" method: paste the meta tag into the `<head>` of `index.html`).
3. Submit `sitemap.xml` under Sitemaps.
4. Check your link preview at https://www.opengraph.xyz.

## 6. Optional analytics

GoatCounter is free and privacy-friendly. Sign up at https://www.goatcounter.com, then add this line before `</head>` in each page:
```
<script data-goatcounter="https://YOURCODE.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
```
CV buttons already have `data-goatcounter-click` tags, so CV views and downloads are counted.

## Features covered

Home, About, Skills, Experience, Projects, Education, CV, and Contact sections; clean URLs; one page per project; search and filter by name, technology, category, year, and type without reloading; Download CV and View CV online; contact form with spam protection; dark/light mode saved in local storage; hamburger menu on small screens; responsive layout; SEO (titles, descriptions, canonical URLs, Open Graph, robots.txt, sitemap.xml, structured data); lazy-loaded images; escaped output against XSS; keyboard navigation, skip link, focus indicators, alt text, form labels, and reduced-motion support.

## Final testing checklist

- [ ] Public URL opens and shows HTTPS (padlock icon)
- [ ] Every nav link works, on desktop and in the mobile menu
- [ ] About, Skills, Experience, Education, and Projects show correctly
- [ ] Project search and each filter work; "Clear filters" resets them
- [ ] Every `/projects/<id>/` page opens, and Previous/Next links work
- [ ] All images load
- [ ] Download CV saves the PDF; View CV online opens it in a new tab
- [ ] Contact form sends a message you receive by email
- [ ] Social links open the right profiles
- [ ] Layout works on phone, tablet, and desktop (browser DevTools → device toolbar)
- [ ] Dark mode toggle works and stays after refreshing
- [ ] No errors in the browser console (F12 → Console)
- [ ] `/sitemap.xml` and `/robots.txt` open
- [ ] A missing URL like `/abc` shows the 404 page
