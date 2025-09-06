# EduPerform - AI-Powered Student Performance & Engagement Platform

EduPerform is a comprehensive, AI-enhanced educational platform designed to empower both students and faculty. Built with Next.js, Genkit, and Firebase Studio, this application provides a suite of tools to track, predict, and improve student performance while fostering a more engaging and connected learning environment.

## Key Features

*   **Personalized Student Dashboard**: Students get a real-time overview of their academic performance, including scores, AI-generated strengths, and areas for improvement.
*   **AI Performance Calculator**: Utilizes AI to predict future student performance based on current metrics, offering actionable insights for students and high-level departmental views for faculty.
*   **Dynamic Learning Planner**: An AI-powered tool that generates customized, step-by-step learning paths for any topic, helping students structure their self-study.
*   **Interactive Assessments & Submissions**: Faculty can create and manage assessments, while students can easily submit their work.
*   **Student Project Portfolios**: A dedicated space for students to upload and showcase their projects, building a portfolio of their work.
*   **AI-Analyzed Feedback System**: Students can provide feedback on courses and assessments, which faculty can analyze with AI to generate actionable suggestions.
*   **Faculty & Peer Connection**: A directory to find and connect with faculty members to ask questions and foster collaboration.
*   **Mind-Refreshing Games**: A section with mini-games to help students relax and sharpen their cognitive skills.
*   **Role-Based Access Control**: Separate, tailored experiences for students and faculty members.

## Running the Project Locally

To run this project on your local machine, you will need Node.js and Git installed.

### 1. Clone the Repository
Clone your GitHub repository to your local machine:
```bash
git clone <your-github-repo-url>
cd <your-project-folder-name>
```

### 2. Install Dependencies
Install all the necessary packages for the project:
```bash
npm install
```

### 3. Set Up Environment Variables
This project uses the Gemini API for its AI features. You need to provide an API key.

- Create a file named `.env.local` in the root of the project.
- Add your Gemini API key to this file:
  ```
  GEMINI_API_KEY=<your-gemini-api-key>
  ```
You can get a Gemini API key from Google AI Studio.


### 4. Run the Development Servers
This project requires two servers running simultaneously in two separate terminals.

**Terminal 1: Start the Next.js App**
This command starts the main web application.
```bash
npm run dev
```
Your application will be available at `http://localhost:9002`.

**Terminal 2: Start the Genkit AI Service**
This command starts the backend AI service that powers features like the Calculator and Summarizer.
```bash
npm run genkit:watch
```

You must have both servers running for all features of the application to work correctly.
