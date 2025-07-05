# PTG Forge

<p align="left">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT" />
  <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/ROS2-Humble-blue" alt="ROS2 Humble" />
  <img src="https://img.shields.io/badge/MoveIt2-2.0-brightgreen" alt="MoveIt2 2.0" />
  <img src="https://img.shields.io/badge/Gazebo-Classic-orange?logo=gazebo" alt="Gazebo Classic" />
   
</p>

**Live Demo:** [https://ptg-forge.netlify.app](https://ptg-forge.netlify.app)

An AI-powered prompt-to-Gazebo tool that lets users generate complete ROS2/Gazebo simulation environments—including `.world`, `.urdf`, and `.launch.py` files—using natural language prompts. Perfect for rapid robot cell prototyping in manufacturing and robotics engineering.

---

## Features

* **Natural Language Scene Generation**: Describe your simulation in plain English
* **Prompt-based URDF Creation**: Generate URDFs for Fanuc and other robots
* **Auto-generation of ROS2 Launch Files**: Instantly create `.launch.py` files
* **One-click Export**: Download all config files in a ZIP bundle
* **Modern Web UI**: Real-time generation and preview

## Tech Stack

* **Frontend**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
* **Backend / Logic**: Gemini/genkit for prompt interpretation, file generation templates
* **Simulation**: ROS2, Gazebo, URDF, RViz (optional)
* **Hosting/Deployment**: Netlify, Firebase, HuggingFace Spaces

---

## Setup Instructions

### Prerequisites

* Node.js 18+
* npm 9+
* (Optional) ROS2/Gazebo for local simulation

### Frontend Setup

```bash
git clone https://github.com/cronenberg64/PTG-Forge.git
cd PTG-Forge
npm install
cp env.example .env.local
npm run dev
```

### Environment Variables

Set your environment variables in `.env.local`:

```env
GOOGLE_AI_API_KEY=your_google_ai_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:9002
```

For deployment (e.g., Netlify), set these in your site environment variables.

---

## Usage

1. **Open the web interface** at [https://ptg-forge.netlify.app](https://ptg-forge.netlify.app) or `http://localhost:9002`
2. **Describe your simulation** using natural language:
   ```
   Simulate two Fanuc LR Mate robots welding on either side of a car chassis inside a 6x6m cell.
   ```
3. **Review the generated files**: `.world`, `.urdf`, `.launch.py`, and more
4. **Export** all files as a ZIP bundle

### Example Prompts

* "A factory floor with a Fanuc M-10iA robot arm that picks up a small red cube and places it on a conveyor belt. The simulation should run for 5 cycles."
* "Create a scene with a single robot arm and a conveyor belt."
* "Generate a URDF for a Fanuc M-20iA robot with a gripper."

---

## Project Structure

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
│   │   ├── ptgverse/      # Simulation-specific components
│   │   └── ui/            # shadcn/ui components
│   ├── hooks/             # Custom React hooks
│   └── lib/               # Utility functions
├── docs/                  # Documentation
└── public/                # Static assets
```

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

* Follow TypeScript best practices
* Write comprehensive tests
* Update documentation for new features
* Ensure ROS2/Gazebo compatibility

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

* **ROS** - Robot Operating System foundation
* **Gazebo** - Robot simulation environment
* **MoveIt** - Motion planning framework
* **Google Gemini** - Natural language processing
* **Firebase** - Backend infrastructure
* **Next.js** - React framework
* **shadcn/ui** - UI component library

---

## Deploying to Netlify

This project supports static export for easy deployment on Netlify.

### Steps:

1. **Push your code to GitHub (or GitLab/Bitbucket).**
2. **Create a new site on [Netlify](https://app.netlify.com/).**
3. **Connect your repository.**
4. **Set the build command:**
   ```
   npm run build && npm run export
   ```
5. **Set the publish directory:**
   ```
   out
   ```
6. **Add your environment variables** (from `.env.example`) in the Netlify dashboard under Site settings > Environment variables.
7. **Deploy!**

For advanced SSR/ISR support, see the [Netlify Next.js docs](https://docs.netlify.com/integrations/frameworks/next-js/).
