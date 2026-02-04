# Eric Tuyisenge — Portfolio (Static Site)

This repository contains a small static portfolio site built with plain HTML, CSS and JavaScript.

Contents
- `index.html` — main page
- `style.css` — styles
- `script.js` — small UI enhancements and dynamic GitHub project loader
- `Images/` — optional local images

How it works
- The projects grid in the "Featured projects" section will attempt to load your latest GitHub repositories using the GitHub REST API.
- To enable automatic project loading, set your GitHub username in `index.html` by updating the meta tag:

```html
<meta name="github-username" content="your-github-username">
```

Local testing
1. Open `index.html` in your browser (double-click or use `Live Server` in VS Code).
2. No build step required — it's a static site.

Publishing & automatic deploys (recommended)

This repository includes a GitHub Actions workflow that will publish the site to GitHub Pages automatically when you push to the `main` branch.

Quick steps to publish (choose one):

- Using the GitHub website:
	1. Create a new repository on GitHub and push this project to it (see commands below).
	2. In the repository settings -> Pages, confirm the site is configured to deploy from GitHub Actions (you may need to enable Pages).
	3. After the first successful Actions run your site will be available at `https://<your-username>.github.io/<repo-name>/`.

- Using the GitHub CLI (`gh`):
	```bash
	gh repo create <your-username>/<repo-name> --public --source=. --remote=origin --push
	```

Commands to run locally (create repo on GitHub first, or create remote afterwards):

```bash
git init
git checkout -b main
git add .
git commit -m "Initial site"
# create remote using the repo URL you created on GitHub (example):
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Notes:
- The included GitHub Actions workflow (`.github/workflows/pages.yml`) uploads the repository contents and deploys them to Pages whenever `main` is pushed.
- If you prefer manual Pages config, set Pages to use the `gh-pages` branch or `/` root as needed.

Notes & tips
- The `Download Resume` link points to a Google Drive URL; the `download` attribute does not work cross-origin. If you want to host the resume in the repo, add the file to the repository and change the link to the local file path.
- If GitHub's API returns rate-limit or other errors, the projects section will show a friendly message. For heavy usage consider pre-building a projects list or using a server-side proxy.

Want help?
- I can commit and create a GitHub repo, enable GitHub Pages, or update the meta tag with your GitHub username — tell me which and I'll proceed.



(Commit commands)
```bash
cd "d:\USER\Portforio_Eric TUYISENGE\Personal-portiforio"
git add -A
git commit -m "Restore original dark theme palette"
git push origin main
git push origin master
git add -A ; git commit -m "Restore original dark theme palette" ; git push origin main

`git remote add origin https://github.com/<your-username>/`<repo-name>.git
git push -u origin main

Global config
git config --global user.name "Eric Tuyisenge"
git config --global user.email "your-email@example.com"
git config --global --list

git add .
git commit -m "Update portfolio content"
git push origin main
```