# Chrome Extension Setup Guide

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Create `.env` file** with your API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

3. **Build the extension**:
   ```bash
   npm run build
   ```

4. **Load in Chrome**:
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` folder

## Project Structure

```
GenPass-1/
├── dist/                    # Build output (created after npm run build)
│   ├── index.html          # Extension popup HTML
│   ├── manifest.json       # Chrome extension manifest
│   └── assets/             # Bundled JS/CSS files
├── components/             # React components
├── services/               # API services
├── index.html             # Source HTML
├── index.tsx              # React entry point
├── App.tsx                # Main app component
├── manifest.json          # Extension manifest (copied to dist)
├── vite.config.ts         # Vite build configuration
└── package.json           # Dependencies and scripts
```

## Troubleshooting

### CSP Errors
If you see Content Security Policy errors related to external scripts (like Tailwind CDN), you may need to:
- Bundle Tailwind CSS instead of using CDN
- Adjust the CSP in `manifest.json`

### Build Issues
- Make sure you have Node.js v16+ installed
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check that your `.env` file exists and contains `GEMINI_API_KEY`

### Extension Not Loading
- Make sure you're loading the `dist` folder, not the root folder
- Check the browser console for errors (right-click extension icon → Inspect popup)
- Verify `manifest.json` is in the `dist` folder after building
