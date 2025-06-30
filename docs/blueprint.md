# **App Name**: PTG-Forge

## Core Features:

- World Generation: Convert natural language scene descriptions into Gazebo .world files using a GPT-based tool, automatically generating basic elements like ground planes, lighting, and initial model placements.
- URDF Generation: Dynamically generate URDF robot descriptions from natural language input such as "add a Fanuc M-10iA arm with a gripper". Allow selection from pre-built robot models or prompt-based customization.
- ROS2 Launch File Generation: Automatically generate ROS2 launch files from scene descriptions like "simulate welding task with two arms and a conveyor" using an AI tool to configure robot spawning, joint state publishers, and sensor topics. Also handle namespacing.
- Download Bundle: Create a downloadable bundle containing the generated .world, .urdf, and .launch.py files in a zip archive, with clear file labels and a README explaining ROS2 and Gazebo simulation setup. Support saving and regenerating bundles later via session ID.
- Task Simulation: Simulate basic tasks such as object pickup, welding, or inspection by generating Python scripts based on requests like "welding simulation with 3 cycles", using a tool to generate robot waypoints, sensor/actuator logging, and log storage for download.
- Web Interface: Provide a web interface with a text input field for scene descriptions, display panels for .world, URDF, and .launch file outputs, and download buttons for generated files.
- Real-time Visualization: Implement basic real-time visualization of the generated environment using Three.js.

## Style Guidelines:

- Primary color: Deep indigo (#4B0082), suggestive of deep learning systems.
- Background color: Very light gray (#F0F0F0), almost white, providing a clean backdrop.
- Accent color: Vibrant orange (#FF4500) to highlight interactive elements.
- Body and headline font: 'Inter', a grotesque-style sans-serif.
- Code font: 'Source Code Pro' for displaying code snippets.
- Use minimalist, geometric icons to represent different robots, sensors, and simulation components.
- Divide the web interface into clear sections for prompt input, file outputs, simulation preview, and download options. Use a grid-based layout to ensure responsiveness.