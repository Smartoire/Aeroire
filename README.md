# Aeroire

<div align="center">
  <img src="https://img.shields.io/badge/Built%20with-Astro-FF5E1F?style=for-the-badge&logo=astro&logoColor=white" alt="Astro">
  <img src="https://img.shields.io/badge/Framework-React-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/Style-Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Platform-Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Cloudflare">
</div>

A modern, interactive portfolio built with ❤️ in Vancouver, BC by Smartoire Solutions Inc. This project features a Windows Aero inspired interface combined with an AI-powered terminal experience, creating a unique blend of nostalgia and cutting-edge technology.

## ✨ Features

- **Windows Aero Interface**: Authentic Windows Vista/7 style glass effects, window management, and dock
- **AI Terminal**: Interactive terminal powered by OpenAI for natural conversations
- **Responsive Design**: Seamlessly adapts between desktop and mobile experiences
- **Draggable Windows**: Fully functional window system with minimize, maximize, and close operations
- **Modern Stack**: Built with Astro, React, TypeScript, and Tailwind CSS
- **Cloudflare Deployment**: Optimized for global edge delivery

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Smartoire/aeroire.git
cd aeroire

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Add your OpenAI API key to .env
# OPENAI_API_KEY=your_api_key_here

# Start development server
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser to see the result.

### Building for Production

```bash
npm run build
npm run preview
```

## 🎯 Interactive Elements

### Desktop Experience
- **Taskbar**: Windows-style taskbar with start menu and system tray
- **Desktop Dock**: macOS-inspired dock for quick access to applications
- **Window Management**: Drag, resize, minimize, and maximize windows
- **AI Terminal**: Click the terminal icon to start a conversation with AI

### Mobile Experience
- **Mobile Dock**: Touch-friendly dock for mobile navigation
- **Responsive Windows**: Adaptive interface for mobile devices
- **Touch Gestures**: Swipe and tap interactions

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Astro** | Static site generator and framework |
| **React** | Interactive components and state management |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |
| **OpenAI API** | AI-powered terminal conversations |
| **Cloudflare Pages** | Hosting and edge deployment |

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Terminal.tsx     # AI terminal interface
│   ├── DraggableWindow.tsx # Window management system
│   ├── DesktopDock.tsx  # Desktop dock component
│   ├── MobileDock.tsx   # Mobile dock component
│   └── ...
├── config/              # Configuration files
│   └── author.ts        # Site and author information
├── layouts/             # Astro layout components
├── pages/               # Astro pages
├── styles/              # Global styles
└── assets/              # Static assets
```

## 🎨 Customization

### Personal Information
Edit `src/config/author.ts` to customize:
- Personal and company information
- Contact details and social links
- Skills and certifications
- Partner information

### Styling
- Modify `tailwind.config.js` for theme customization
- Update component styles in `src/components/`
- Add custom CSS in `src/styles/`

## 🌟 Inspiration

This project draws inspiration from:
- **macOS-Terminal-Portfolio** by Johnny Culbreth (Austin, TX)
- **Terminal Portfolio** by aabdoo23 (Giza, Egypt)
- Windows Aero design language
- Modern web development practices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

--

<div align="center">
  <sub>Built with ❤️ in Vancouver, BC</sub>
</div>
