````markdown
# Google Meet Attendance Tracker (Chrome Extension)

![Extension Icon](icons/icon128.png)  
A lightweight Chrome extension to track participant names in Google Meet and export to CSV.

---

## ✨ Features
- Real-time participant name detection  
- One-click export to CSV  
- Works with Google Meet's latest interface  
- Privacy-focused: No data leaves your browser  
- Simple and intuitive popup interface  

---

## 🛠 Installation

### Method 1: Load Unpacked Extension
1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/meet-attendance-extension.git
````

2. Open Chrome and go to:

   ```
   chrome://extensions
   ```
3. Enable **Developer mode** (toggle in top-right corner).
4. Click **Load unpacked** and select the cloned folder.

### Method 2: Install from Chrome Web Store

*(Coming soon)*

---

## 🖥 Usage

1. Join a Google Meet meeting.
2. Open the **People** panel.
3. Click the extension icon in your toolbar.
4. View participant count and click **Export as CSV**.

![Popup Preview](screenshots/popup-screenshot.png) *(optional: add actual screenshot)*

---

## 📂 File Structure

```
/
├── manifest.json          # Extension configuration
├── background.js          # Background processes
├── content.js             # Meet DOM interaction
├── popup.html             # Popup UI
├── popup.js               # Popup logic
├── icons/                 # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md
```

---

## 🤝 Contributing

1. Fork the project.
2. Create your feature branch:

   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit changes:

   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:

   ```bash
   git push origin feature/your-feature
   ```
5. Open a Pull Request.

---

## ⚠️ Known Limitations

* Requires the **People** panel to be open.
* Participant names are only captured while the panel is visible.
* Google Meet's DOM structure may change, potentially breaking the extension (selectors will be updated as needed).

---

## 📜 License

MIT © \[Anjali Rai]

---

**Like this project?** ⭐ Star it on GitHub!

```
```
