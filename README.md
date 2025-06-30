# PTG Forge

AI-powered prompt-to-Gazebo tool for robotics engineers. Instantly generate complete ROS2/Gazebo simulation environments—including `.world`, `.urdf`, and `.launch.py` files—using natural language prompts. Perfect for rapid robot cell prototyping in manufacturing and robotics engineering.

---

## Features

- Natural language to `.world` scene generation
- Prompt-based URDF creation for Fanuc robots and other components
- Auto-generation of ROS2 `.launch.py` files
- One-click export of all config files in a ZIP bundle
- Simple, professional web UI with real-time generation

## Tech Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS, shadcn/ui
- **AI Builders:** Cursor, Trae AI, Firebase Studio
- **Backend / Logic:** GPT-4/LLM for prompt interpretation, file generation templates
- **Simulation:** ROS2, Gazebo, URDF, RViz (optional for visualization)
- **Hosting/Deployment:** Firebase, HuggingFace Spaces, or Replit

---

## Example Use Case

> "Simulate two Fanuc LR Mate robots welding on either side of a car chassis inside a 6x6m cell."
>
> The system generates a `.world` file with correct model placements, URDFs for the arms, and a ROS2 launch file that initializes the scene.

---

## Target Users

- Robotics engineers and developers
- Manufacturing simulation teams
- Students learning ROS2/Gazebo
- Fanuc or automation companies prototyping layouts

---

## Prerequisites

- Node.js 18.18.0 or higher (recommended: Node.js 20+)
- npm 9.0.0 or higher
- Google AI API key for Genkit integration

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd PTG-Forge
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp env.example .env.local
```
Edit `.env.local` and add your API keys:

```env
GOOGLE_AI_API_KEY=your_google_ai_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:9002
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open your browser

Go to [http://localhost:9002](http://localhost:9002)

---

## Usage

1. Open the web interface at `http://localhost:9002`
2. Enter a natural language prompt describing your desired simulation environment
3. Review the generated `.world`, `.urdf`, and `.launch.py` files
4. Export all configuration files as a ZIP bundle

#### Example Prompts

- "Simulate two Fanuc LR Mate robots welding on either side of a car chassis inside a 6x6m cell."
- "Create a scene with a single robot arm and a conveyor belt."
- "Generate a URDF for a Fanuc M-20iA robot with a gripper."

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
│   │   ├── simverse/      # Simulation-specific components
│   │   └── ui/            # shadcn/ui components
│   ├── hooks/             # Custom React hooks
│   └── lib/               # Utility functions
├── docs/                  # Documentation
└── public/                # Static assets
```

---

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run genkit:dev` - Start Genkit development server
- `npm run genkit:watch` - Start Genkit with file watching
- `npm run clean` - Clean build artifacts and dependencies
- `npm run reinstall` - Clean and reinstall dependencies

---

## Environment Variables

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

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write comprehensive tests
- Update documentation for new features
- Ensure ROS2/Gazebo compatibility

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

- **ROS** - Robot Operating System foundation
- **Gazebo** - Robot simulation environment
- **MoveIt** - Motion planning framework
- **Google Gemini** - Natural language processing
- **Firebase** - Backend infrastructure
- **Next.js** - React framework
- **shadcn/ui** - UI component library

---

Built with love by the PTG Forge Team

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
