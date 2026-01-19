# PyPass Elite Chrome Extension

A high-end, AI-powered password generator with a premium Dashlane-inspired interface. This extension not only generates secure passwords but also provides a real-time security analysis using Google's Gemini AI and exports the generation logic as a standalone Python script.

## 🚀 Features

- **AI Security Architect**: Real-time password strength analysis and "Time-to-Crack" estimates powered by `gemini-3-pro-preview`.
- **Memorable Mode**: Generates secure yet easy-to-type word-based patterns.
- **Python Implementation**: Live export of the generation algorithm as Python code for developers.
- **Chrome Extension V3**: Built with the latest manifest standards.
- **Premium UI**: Glassmorphism design with Tailwind CSS and Inter/JetBrains Mono typography.

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API Key

### Build Steps

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env` file in the root directory:
   ```bash
   VITE_GEMINI_API_KEY=your_api_key_here
   ```
   **Important**: The variable must be prefixed with `VITE_` for Vite to expose it to the browser.
   
   Get your API key from: https://makersuite.google.com/app/apikey

3. **Build the extension**:
   ```bash
   npm run build
   ```
   This will create a `dist` folder with all the compiled files.

4. **Load in Chrome**:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable **Developer mode** (toggle in the top right)
   - Click **Load unpacked**
   - Select the `dist` folder from this project
   - The extension should now appear in your extensions list

5. **Test the extension**:
   - Click the extension icon in Chrome's toolbar
   - The password generator popup should open

### ⚠️ Important Notes

- **Environment Variables**: Make sure your `.env` file contains `VITE_GEMINI_API_KEY` (with the `VITE_` prefix) before building. This is required for Vite to expose the variable to the browser.
- **Build Output**: After running `npm run build`, the `dist` folder will contain all files needed to load the extension in Chrome. All CSS and assets are bundled locally (no CDN dependencies).
- **API Key**: If you don't set the API key, the extension will still work but AI analysis will be disabled.

## 📖 How to Push to GitHub

If you've just created this project locally, follow these steps to push it to your own repository:

1. Create a new repository on [GitHub](https://github.com/new).
2. Initialize your local directory and push:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: PyPass Elite Extension"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo-name.git
   git push -u origin main
   ```

## 🏗️ Tech Stack

- **Framework**: React 19
- **Styling**: Tailwind CSS
- **AI Integration**: Google Generative AI (Gemini SDK)
- **Runtime**: Chrome Extension Manifest V3
- **Icons**: Font Awesome 6
