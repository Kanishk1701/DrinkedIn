🍻 DrinkedIn
DrinkedIn is the premier professional network for unprofessional behavior. Swap corporate milestones for nightlife achievements. Get endorsed for "Irish Goodbyes," equip the #OpenToShots profile ring, and write inspiring thought leadership about your worst hangovers. Because surviving Tequila Tuesday is your true full-time job.

📋 Table of Contents
About the Project

Key Features

Tech Stack

Getting Started

Environment Variables

Contributing

Disclaimer

🥂 About the Project
Traditional networking platforms focus on B2B SaaS synergies and Q3 deliverables. DrinkedIn disrupts the market by focusing on what truly matters: B2C (Bar-to-Couch) logistics and weekend stamina.

This platform provides a satirical, 1:1 clone of corporate networking UX, repurposed for tracking nightlife milestones, endorsing friends for survival skills, and generating unhinged "thought leadership" posts about late-night pizza runs.

✨ Key Features
The "Thought Leadership" AI Generator: Turn a simple mistake ("I texted my ex") into a 10-line motivational post about risk-taking and vulnerability using our integrated LLM text generation.

Corporate Profile Rings: Replace traditional status indicators with highly relevant tags like #OpenToShots, #BuyingRounds, and #Hungover (which automatically enables Do Not Disturb).

Skill Endorsements: Validate your network's core competencies. Endorse connections for high-value skills such as Designated Driving, Irish Goodbyes, and Advanced Beer Pong.

Real-Time "Cheers" Ticker: A WebSocket-powered live engagement feed. Instead of "Likes," users "Cheers" posts, triggering real-time UI animations.

Nightlife Connections: Organize your network accurately—categorize connections by "Wingman," "Met in the Bathroom Line," or "Friend of a Friend."

🛠 Tech Stack
Frontend: Next.js & Tailwind CSS (For pixel-perfect corporate UI cloning)

Backend: Node.js & FastAPI (For high-performance AI generation endpoints)

Real-Time: WebSockets (Socket.io)

Database: PostgreSQL

🚀 Getting Started
Follow these instructions to set up the project locally.

Prerequisites
Node.js (v18.x or higher)

npm or yarn

PostgreSQL running locally

Installation
Clone the repository:

git clone https://github.com/yourusername/drinkedin.git
cd drinkedin


2. Install dependencies:
   ```bash
npm install
Set up your environment variables (see below).

Run the development server:

npm run dev


5. Open `http://localhost:3000` in your browser to view the application.

## 🔐 Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
# Database configuration
DATABASE_URL="postgresql://user:password@localhost:5432/drinkedin"

# Authentication
NEXTAUTH_SECRET="your_super_secret_key"
NEXTAUTH_URL="http://localhost:3000"

# AI Integration (For Thought Leadership Generator)
OPENAI_API_KEY="your_api_key_here"
🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated—whether it's a new feature, a bug fix, or just a funnier UI copy.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

⚠️ Disclaimer
DrinkedIn is a satirical project built for entertainment and portfolio purposes. Please drink responsibly, never drink and drive, and hydrate before bed. The creator of this application are not responsible for any actual texts sent to your ex while using this platform.
