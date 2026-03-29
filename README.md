# Microsolvant Desktop

**Microsolvant** is a premium, institutional-grade desktop application designed for micro-finance management and local lending. Built with a focus on visual excellence and security, it provides a seamless cross-platform experience for financial institutions.

## ✨ Key Features
- **Artistic UI/UX**: Featuring a glassmorphic Gateway screen and a modern split-screen authentication flow.
- **Institutional Design**: Clean, high-contrast typography and professional architectural imagery.
- **Cross-Platform**: Native builds for Linux, Windows, and macOS.
- **High Performance**: Powered by Electron, Vite, and React for a lightning-fast desktop experience.

---

## 🚀 Navigation Guide

1.  **Gateway (Intro)**: The entry point featuring a premium glassmorphic welcome card.
2.  **Authentication**:
    - **Login**: Artistic split-screen layout with institutional-grade security.
    - **Register**: Consistent design for new account creation.
3.  **Dashboard**: The central hub for managing clients, loans, and financial reports.
4.  **Settings**: Personalize your institutional profile and system preferences.

---

## 🛠️ Development & Building

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

### Local Development
```bash
npm install
npm start
```

### 📦 Building for Production

Microsolvant uses **Electron Forge** for cross-platform distribution. Run the following command on the target OS:

#### Linux (Ubuntu/Debian)
```bash
# Generates a .deb and .zip package
npm run make
```

#### Windows
```bash
# Generates a Squirrel setup (.exe) and .zip package
npm run make
```

#### macOS
```bash
# Generates a .dmg and .zip package
npm run make
```

> [!NOTE]
> Building for a specific platform usually requires that platform's native tools (e.g., `rpmbuild` for RPM, or a Mac for DMG).

---

## 📥 Installation

### Linux
1.  Navigate to `out/make/deb/x64/`.
2.  Install the package:
    ```bash
    sudo dpkg -i microsolvant_1.0.0_amd64.deb
    ```
3.  **Sandbox Workaround**: If you encounter a sandbox error on some Linux distros, launch with:
    `microsolvant --no-sandbox`

### Windows
1.  Navigate to `out/make/squirrel.windows/x64/`.
2.  Run `Microsolvant-1.0.0 Setup.exe`.

### macOS
1.  Navigate to `out/make/`.
2.  Open the `.dmg` file and drag **Microsolvant** to your Applications folder.

---

## 🔒 Security & Performance
- **Asar Support**: All source code is packaged in an asar archive for protection.
- **Fuses Support**: Hardened Electron security via FuseV1Options.
- **Optimized Assets**: Visual assets are lazy-loaded and optimized for desktop performance.

---

© 2026 Microsolvant Team. All Rights Reserved.
