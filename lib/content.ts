// Shared portfolio content used by the page sections and the digital book.

export const RESUME_URL = "/Rishikesh_Koli_ML_Intern_Resume.pdf";
export const EMAIL = "1983rishikesh@gmail.com";
export const LINKEDIN = "https://www.linkedin.com/in/rishikesh-koli-828248257/";

// Set `repo` to the project's own repository URL and `image` to a screenshot in /public
// (e.g. "/projects/nexus.png"). Until then the card links to the GitHub profile and
// shows the architecture flow instead of a screenshot.
export const GITHUB_PROFILE = "https://github.com/Rishikoli";

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  desc: string;
  tech: string[];
  metrics: string[];
  flow: string[];
  color: string;
  repo: string;
  demo?: string;
  image?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "nexus",
    title: "NEXUS Ray",
    subtitle: "AI Agent Orchestration Framework",
    year: "2025",
    desc: "An event-driven AI orchestration framework for distributed intelligent workflows. Built scalable Python microservices for AI inference and workflow automation. Optimized AI inference latency using OpenVINO INT8 quantization, reducing model execution time for production deployments. Integrated OpenAI APIs with custom prompt engineering for intelligent automation.",
    tech: ["Python", "Apache Kafka", "OpenVINO", "OpenAI APIs", "ChromaDB"],
    metrics: ["60% Latency Reduction", "Event-Driven Inference"],
    flow: ["Events", "Kafka", "Agent Services", "OpenVINO INT8", "ChromaDB"],
    color: "#76ABAE",
    repo: ""
  },
  {
    id: "interview",
    title: "InterviewMaster",
    subtitle: "AI Interview Coaching Platform",
    year: "2025",
    desc: "An AI-powered coaching platform with real-time feedback loops and dynamic LLM-driven question generation. Implemented prompt engineering pipelines to simulate diverse interview scenarios. Built low-latency backend APIs using FastAPI supporting concurrent AI sessions, validating model outputs for accuracy.",
    tech: ["FastAPI", "React", "OpenAI GPT-4", "WebSockets", "Redis"],
    metrics: ["Low-Latency Sessions", "Dynamic LLM Prompting"],
    flow: ["React UI", "WebSockets", "FastAPI", "GPT-4", "Live Feedback"],
    color: "#FF5722",
    repo: ""
  },
  {
    id: "dementia",
    title: "AI Dementia Assistant",
    subtitle: "Cognitive Support LLM App",
    year: "2024",
    desc: "A human-centered AI assistant for dementia patients leveraging conversational LLM workflows for cognitive support and caregiver interaction. Engineered scalable REST APIs enabling real-time AI responses. Applied responsible AI design principles to ensure safe, personalized, and context-aware interactions.",
    tech: ["FastAPI", "Next.js", "OpenAI Speech", "MongoDB Vector"],
    metrics: ["Context-Aware Memory", "Responsible AI Guardrails"],
    flow: ["Voice", "Speech API", "FastAPI", "LLM + Memory", "Caregiver"],
    color: "#303841",
    repo: ""
  }
];

export const TIMELINE = [
  {
    period: "Jan – May 2026",
    title: "Technical Intern",
    org: "Maharashtra Remote Sensing Application Centre (MRSAC)",
    note: "Worked under an Associate Scientist",
    desc: "Spearheaded cloud computing and scalable system architectures under the direct guidance of an Associate Scientist. Developed advanced technical workflows, analyzed spatial/multidimensional datasets, and applied Agile methodologies to accelerate project lifecycles.",
    color: "#76ABAE",
  },
  {
    period: "2025",
    title: "Intel Unnati Industrial Training",
    org: "Intel",
    desc: "Industrial training programme run by Intel.",
    color: "#FF5722",
  },
  {
    period: "Graduating May 2026",
    title: "B.Tech, Computer Science and Business Systems",
    org: "St. Vincent Pallotti College of Engineering, Nagpur",
    desc: "Coursework in Artificial Intelligence, Machine Learning, Deep Learning, Cloud Computing and System Design.",
    color: "#303841",
  },
];

export const ACHIEVEMENTS = [
  { title: "NASA Space Apps Challenge", label: "Winner", color: "#FF5722", desc: "Led AI-driven rapid prototyping for space challenges." },
  { title: "AIxplore Hackathon", label: "1st Prize", color: "#76ABAE", desc: "Intelligent ML automation — first place across all teams." },
  { title: "Vodafone Idea Foundation Innovation Marathon", label: "Runner-Up", color: "#303841", desc: "AI-integrated solutions with scalable system design." },
  { title: "TechSaksham Showcase", label: "Awarded", color: "#303841", desc: "Recognized by industry mentors for innovative AI." },
];

export const CERTIFICATIONS = [
  "Intel Unnati Industrial Training 2025 — Intel",
  "Microsoft Copilot for Productivity — Microsoft & LinkedIn",
  "Advanced Course on Green Skills and Artificial Intelligence",
];
