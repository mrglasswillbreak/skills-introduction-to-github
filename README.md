# mrglasswillbreak — Portfolio Website

[![Live Site](https://img.shields.io/badge/Live%20Site-Visit-2563eb?style=flat-square&logo=github-pages&logoColor=white)](https://mrglasswillbreak.github.io/skills-introduction-to-github)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](https://gh.io/mit)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

A responsive, interactive personal portfolio website built with semantic HTML5, CSS custom properties, and vanilla JavaScript. Deployed via GitHub Pages.

---

## ✨ Features

- **Dark / Light mode** – respects `prefers-color-scheme` and persists user preference via `localStorage`
- **Responsive layout** – fluid grid and flexbox design that adapts from mobile (320 px) to wide desktop
- **Animated hero** – typewriter effect cycling through role descriptions; floating code-window illustration
- **Scroll-animated skill bars** – progress bars reveal and fill when they enter the viewport using the Intersection Observer API
- **Project filter** – instantly filters cards by category (All / Web / Open Source / Tools) without page reload
- **Contact form** – client-side validation with inline error messages and accessible live regions
- **Scroll spy** – active navigation link updates as the user scrolls through sections
- **Back-to-top button** – appears after scrolling 400 px and smooth-scrolls to the top
- **Keyboard & screen-reader accessible** – semantic HTML, ARIA attributes, skip-link, focus styles

---

## 🗂️ Project Structure

```
.
├── index.html      # Semantic HTML5 – single-page layout
├── style.css       # CSS custom properties, responsive grid, animations
├── script.js       # Vanilla JS – theme toggle, typed text, observer, form
├── README.md       # Project documentation (this file)
├── PROFILE.md      # GitHub profile text
└── .github/        # GitHub Skills workflows and step instructions
```

---

## 🚀 Getting Started

### View locally

```bash
# Clone the repository
git clone https://github.com/mrglasswillbreak/skills-introduction-to-github.git

# Open in your browser — no build step required
open index.html      # macOS
start index.html     # Windows
xdg-open index.html  # Linux
```

### Deploy to GitHub Pages

1. Go to **Settings → Pages** in your repository.
2. Under *Source*, select the branch (`main`) and folder (`/ (root)`).
3. Click **Save** — your site will be live at  
   `https://mrglasswillbreak.github.io/skills-introduction-to-github`

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic page structure |
| CSS3 (Custom Properties) | Design tokens, responsive layout, animations |
| Vanilla JavaScript (ES6+) | Interactivity, DOM manipulation, Intersection Observer |
| Font Awesome 6 | Icon library (via CDN) |
| GitHub Pages | Static site hosting |

---

## 📱 Responsiveness

| Breakpoint | Layout |
|------------|--------|
| < 600 px (mobile) | Single-column, stacked sections |
| 600 – 900 px (tablet) | Two-column about grid, hamburger nav |
| > 900 px (desktop) | Full hero split, multi-column grids |

All components honor `prefers-reduced-motion` to disable animations for users who request it.

---

## 🤝 Contributing

Pull requests are welcome. For significant changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-change`)
3. Commit your changes (`git commit -m 'Add my change'`)
4. Push to your branch (`git push origin feature/my-change`)
5. Open a Pull Request

---

## 📄 License

Distributed under the [MIT License](https://gh.io/mit).

---

&copy; 2025 GitHub &bull; [Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md)

