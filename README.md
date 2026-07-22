# Counter-MaterialCulture Exhibition

An immersive online exhibition experience. Click to enter, explore themed rooms, and interact with artifacts.

## Structure

```
.
├── index.html                 # Homepage entry
├── css/
│   └── style.css             # Main stylesheet
├── js/
│   ├── app.js                # Core functionality
│   └── exhibition.js         # Room-specific logic
├── data/
│   └── exhibition.json       # Exhibition rooms and artifacts
└── README.md
```

## Getting Started

### Run Locally

```bash
# Python
python3 -m http.server 8000

# Or Node.js
npx http-server .
```

Visit `http://localhost:8000`

## Adding Rooms & Artifacts

Edit `data/exhibition.json` to add themed exhibition rooms with artifacts.

## Deploy to GitHub Pages

1. Settings → Pages
2. Deploy from main branch, root folder
3. Site live at: `https://cvidal123.github.io/Material-Counter-Culture/`
