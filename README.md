# PTG Forge: AI-Powered Prompt-to-Gazebo Tool

## Overview

PTG Forge is an AI-powered prompt-to-Gazebo tool that enables engineers—especially those at Fanuc or in automotive manufacturing—to generate complete robot simulation environments using simple text prompts. The tool converts natural language into `.world`, `.urdf`, and `.launch.py` files for ROS2/Gazebo, drastically speeding up robot cell layout prototyping and testing.

## 📝 Key Features

- **Natural language to .world scene generation**
- **Prompt-based URDF creation** for Fanuc robots and other components
- **Auto-generation of ROS2 .launch.py files**
- **One-click export** of all config files in a ZIP bundle
- **Simple, professional web UI** with real-time generation

## 🛠️ Tech Stack

- **Frontend:** TailwindCSS, React (Next.js, shadcn/ui)
- **AI Builders:** Cursor, Trae AI, Firebase Studio
- **Backend / Logic:** GPT-4/LLM for prompt interpretation, file generation templates
- **Simulation:** ROS2, Gazebo, URDF, RViz (optional for visualization)
- **Hosting/Deployment:** Firebase, HuggingFace Spaces, or Replit

## 🚀 Example Use Case

> "Simulate two Fanuc LR Mate robots welding on either side of a car chassis inside a 6x6m cell."
>
> The system generates a `.world` file with correct model placements, URDFs for the arms, and a ROS2 launch file that initializes the scene.

## 👤 Target Users

- Robotics engineers and developers
- Manufacturing simulation teams
- Students learning ROS2/Gazebo
- Fanuc or automation companies prototyping layouts

---

## 📋 Prerequisites

- Node.js 18.18.0 or higher (recommended: Node.js 20+)
- npm 9.0.0 or higher
- Google AI API key for Genkit integration

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PTG-Forge
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   Edit `.env.local` and add your API keys:
   ```env
   GOOGLE_AI_API_KEY=your_google_ai_api_key_here
   NEXT_PUBLIC_APP_URL=http://localhost:9002
   ```
4. **Start the development server**
   ```bash
   npm run dev
   ```
5. **Open your browser**
   Navigate to [http://localhost:9002](http://localhost:9002)

## 📁 Project Structure

```
PTG-Forge/
├── src/
│   ├── ai/                 # AI integration with Genkit
│   │   ├── flows/         # AI generation flows
│   │   ├── dev.ts         # Development server
│   │   └── genkit.ts      # Genkit configuration
│   ├── app/               # Next.js App Router
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   ├── components/        # React components
│   │   ├── simverse/      # Simulation-specific components
│   │   └── ui/            # shadcn/ui components
│   ├── hooks/             # Custom React hooks
│   └── lib/               # Utility functions
├── docs/                  # Documentation
└── public/                # Static assets
```

## 🎯 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run genkit:dev` - Start Genkit development server
- `npm run genkit:watch` - Start Genkit with file watching
- `npm run clean` - Clean build artifacts and dependencies
- `npm run reinstall` - Clean and reinstall dependencies

## 🔧 Configuration Files

- **`next.config.ts`** - Next.js configuration with optimizations
- **`tailwind.config.ts`** - Tailwind CSS with custom theme
- **`tsconfig.json`** - TypeScript configuration
- **`components.json`** - shadcn/ui configuration
- **`.eslintrc.json`** - ESLint rules
- **`.prettierrc`** - Prettier formatting rules

## 🔒 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Required
GOOGLE_AI_API_KEY=your_google_ai_api_key_here

# Optional
NEXT_PUBLIC_APP_URL=http://localhost:9002
NEXT_PUBLIC_APP_NAME=PTG Forge
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Include your Node.js version and error logs

## 🔄 Updates

To update dependencies:
```bash
npm update
npm audit fix
```

For major updates, check the [CHANGELOG](CHANGELOG.md) for breaking changes.

---

Built with ❤️ by the PTG Forge Team
