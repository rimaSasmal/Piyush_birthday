# Happy Birthday, Pati ji — Interactive Night Voyage

A pure static, single-URL birthday website built with React, Vite, Tailwind CSS, and the Web Audio API. Designed for effortless customization in **IntelliJ IDEA** and instant sharing via a **single GitHub Pages URL** (zero external hosting needed).

---

## Step 1: Download & Open in IntelliJ IDEA

1. **Export / Download the Project** from AI Studio (or clone your GitHub repo once pushed), and unzip it on your computer.
2. Open **IntelliJ IDEA** → **File → Open...** → select the unzipped project folder.
3. Make sure **Node.js (v20+)** is installed on your machine (`node -v` in IntelliJ's built-in **Terminal** tab at the bottom).
4. In IntelliJ's Terminal, install dependencies and preview locally:
   ```bash
   npm install
   npm run dev
   ```
   Open `http://localhost:3000` in your browser to preview any edits live.

---

## Step 2: Add Your Real Photos & Messages

### A. Add Your Photos
1. In IntelliJ's Project tree on the left, expand `public/photos/`.
2. Drag and drop your real photos (`.jpg`, `.jpeg`, `.png`, or `.webp`) into `public/photos/`, e.g.:
   - `public/photos/moon-photo.jpg`
   - `public/photos/star-photo.jpg`
   - `public/photos/clouds-photo.jpg`
   - `public/photos/ship-photo.jpg`
   - `public/photos/dolphin-photo.jpg`
   - `public/photos/bottle-photo.jpg`

### B. Update Messages & Photo Paths
1. Open `src/config/birthdayConfig.ts` in IntelliJ (treat it just like a Java `Constants.java` file).
2. In each of the 6 items inside `memories: [ ... ]`:
   - Change `photoUrl: dummyMoonPhoto` to `photoUrl: './photos/moon-photo.jpg'` (keep the quotes `'./photos/...'`).
   - Edit `title`, `dateOrLocation`, `message` (use `\n\n` for new paragraphs), and `signOff`.
   - Optionally edit `mainGreeting` or `finale` at the top/middle of the same file.
3. Save (`Ctrl+S` / `Cmd+S`) and refresh `http://localhost:3000` to verify every photo and letter looks right.

*(Optional Audio Tip: The built-in Music-Box "Happy Birthday" + Ocean Waves plays automatically with zero setup. If you ever want to use a personal `.mp3` song instead, place it at `public/audio/our-song.mp3` and set `customAudioUrl: './audio/our-song.mp3'` in `birthdayConfig.ts`.)*

---

## Step 3: Push to GitHub & Get Your Single Shareable URL

1. Create a new repository on [GitHub](https://github.com/new) (for example, `birthday-voyage` — **Public** repositories get free GitHub Pages).
2. In IntelliJ's **Terminal** (or IntelliJ's **Git** menu), run:
   ```bash
   git init
   git add .
   git commit -m "Personalized Happy Birthday Pati ji voyage"
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
   git push -u origin main
   ```
3. On GitHub, open your repository → **Settings → Pages**.
4. Under **Build and deployment → Source**, select **GitHub Actions**.
5. Wait ~1 minute for the **Deploy Static Birthday Voyage to GitHub Pages** workflow (already included in `.github/workflows/deploy.yml`) to finish with a green checkmark.
6. GitHub will show your single shareable link right at the top of **Settings → Pages**:
   ```
   https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/
   ```
7. Copy that single URL and send it to your husband—it opens directly in any phone or laptop browser with the night sky, clickable memories, and music-box audio!
