import { Project, WorkExperience, Education, SkillCategory, Certification, Achievement } from "./types";

export const PERSONAL_INFO = {
  fullName: "Ajim Patel",
  designations: [
    "Software Engineer",
    "Backend Developer",
    "Enterprise Integration Specialist",
    "Cloud Solutions Architect"
  ],
  logoInitials: "AP",
  githubUrl: "https://github.com/ajju853",
  linkedinUrl: "https://www.linkedin.com/in/ajim-patel-b359192ab/",
  emailId: "ajimp340@gmail.com",
  phoneNumber: "+91 93254 80476",
  location: "Pune, India",
  colorTheme: {
    primary: "navy",
    accent: "gold",
    background: "cream"
  },
  fontStyle: "Space Grotesk & Inter",
  introductionParagraph: "I am a results-driven Software Engineer specializing in designing and building high-performance backend systems, microservices, and enterprise automation workflows. With extensive hands-on expertise in Java (Spring Boot), Python (Flask/FastAPI), and TIBCO BusinessWorks, I orchestrate distributed, highly secure environments with Docker and SQL databases. My background spans creating robust ERP integrations for global clients and leading full-lifecycle deployments with CI/CD automation. I am currently focused on integrating advanced AI/LLM orchestrators like LangChain and Gemini into traditional business workflows to unlock unprecedented operational efficiency. Let's connect and build the next frontier of secure, scalable technology.",
  aboutMeParagraph: `Backend Engineer. Cloud Architect. Security-first thinker.

I design systems that handle enterprise load without breaking — and without keeping the on-call team up at night.

80% reduction in ops overhead. Production APIs serving manufacturing enterprises. Multi-tenant SaaS built from the ground up. Role-based access controls that actually work.

BCA · 7.79 CGPA · Available for senior backend & platform roles.`,
  missionStatement: "To engineer highly scaling, self-healing modular distributed services that eliminate friction, safeguard data isolation, and elevate operational velocity across legacy and modern cloud environments.",
  visionStatement: "To lead the paradigm shift toward AI-orchestrated microservices, where enterprise-grade business logic seamlessly self-corrects, scales dynamically, and integrates securely with absolute developer trust."
};

export const PROJECTS_LIST: Project[] = [
  {
    id: "proj_1",
    title: "HR Service Integration Engine",
    type: "Enterprise Integration Platform",
    duration: "Jan 2024 - Apr 2024",
    description: "Designed and built a production-style enterprise integration platform using TIBCO BusinessWorks CE as the orchestration layer, automating onboarding workflows across microservices and backend services.",
    keyOutcomes: [
      "Automated a 7-step employee onboarding workflow across 4 Spring Boot microservices and 6 backend services through REST-based communication, centralized error handling, and compensation logic for payroll failures.",
      "Implemented Spring Cloud Gateway as a centralized API gateway for request routing, JWT validation, rate limiting, and service access management across 6 backend services, each documented with Swagger/OpenAPI.",
      "Secured the platform using Spring Security 6 and JWT Bearer authentication with Role-Based Access Control (HR_MANAGER / ADMIN), enforcing authenticated access through the API Gateway.",
      "Containerized the full system using Docker Compose (8 containers) and configured GitHub Actions CI/CD pipelines for automated builds, dependency validation, and Docker image generation."
    ],
    technologies: ["TIBCO BW CE", "Java 17", "Spring Boot 3.2", "Spring Cloud Gateway", "React 18", "PostgreSQL", "Docker", "GitHub Actions"],
    githubUrl: "https://github.com/ajju853"
  },
  {
    id: "proj_kafka",
    title: "Kafka Event-Driven Order System",
    type: "Event-Driven Microservices Platform",
    duration: "Jan 2025 - Mar 2025",
    description: "Designed and implemented an advanced, high-throughput event-driven microservices architecture to process and reconcile purchase orders through multi-partitioned Apache Kafka clusters.",
    keyOutcomes: [
      "Configured multi-broker Apache Kafka clusters with key-based routing, partition allocation strategies, and custom serialization formats to handle high-velocity asynchronous traffic streams.",
      "Developed decoupled, resilient Spring Boot services (Order, Inventory, Notification, Payment) using Kafka producers/consumers, integrating solid idempotency guards to safeguard transaction consistency.",
      "Designed robust Dead Letter Queues (DLQ) and transactional Outbox patterns to isolate failed events, handle boundary network interruptions, and guarantee consistent data synchronization.",
      "Containerized all services and Kafka/Zookeeper nodes via Docker Compose, designing load benchmarks that verified linear system routing performance."
    ],
    technologies: ["Apache Kafka", "Java 17", "Spring Boot", "Docker Compose", "PostgreSQL", "Zookeeper", "Confluent Schema Registry"],
    githubUrl: "https://github.com/ajju853/Kafka-event-driven-order-system-architecture"
  },
  {
    id: "proj_2",
    title: "LPS – Line Production System",
    type: "ERP Integration Platform (CIE Automotive)",
    duration: "May 2024 - Aug 2024",
    description: "A full-stack ERP integration platform spanning demand creation, BOM management, production tracking, and dispatch for a leading automotive manufacturing client.",
    keyOutcomes: [
      "Built a full-stack ERP integration platform covering the complete manufacturing data integration lifecycle from demand creation to actual logistics dispatch.",
      "Developed a real-time OEE (Overall Equipment Effectiveness) application monitoring dashboard using TanStack Query and Recharts, replacing manual status checks with high density gauges.",
      "Implemented sub-machine load-balancing logic using object-oriented principles and creational and structural design patterns to identify and resolve critical production throughput bottlenecks."
    ],
    technologies: ["React", "TypeScript", "Flask", "PostgreSQL", "Redis", "TanStack Query", "Recharts"],
    githubUrl: "https://github.com/ajju853"
  },
  {
    id: "proj_3",
    title: "JobMatchAI – Automation Workflow",
    type: "AI Process Orchestration Engine",
    duration: "Sep 2023 - Dec 2023",
    description: "An advanced modular process automation engine integrating Large Language Model (LLM) matching, smart resume routing, and cross-platform candidate tracking.",
    keyOutcomes: [
      "Architected a modular multi-service process workflow integrating LLM intelligence, semantic resume indexing, and multi-hub cross tracking.",
      "Designed and documented 60+ robust RESTful APIs across a Python Flask backend, backed by solid unit-testing covers and security layers.",
      "Reduced manual tracking and candidate profile coordination overhead by 80% with secure encrypted session caching."
    ],
    technologies: ["Python", "LangChain", "OpenAI API", "FastAPI", "Flask", "Playwright", "Fernet Encryption"],
    githubUrl: "https://github.com/ajju853"
  },
  {
    id: "proj_4",
    title: "PGFlow – Multi-Tenant SaaS Platform",
    type: "Automated Invoicing & Tenant Portal",
    duration: "Oct 2024 - Dec 2024",
    description: "A robust multi-tenant rental management software automating communication and transaction billing pipelines securely in real-time.",
    keyOutcomes: [
      "Automated rent invoicing, utility billing, and automated notifications via WhatsApp (MSG91 API) and Razorpay gateway integrations.",
      "Implemented strict Supabase Row-Level Security (RLS) policies guaranteeing secure multi-tenant data isolation and preventing cross-client leaks.",
      "Created transactional webhook listener pipelines designed with automatic retry logic to guarantee transaction sync in high latency networks."
    ],
    technologies: ["Next.js", "TypeScript", "Supabase", "Razorpay", "MSG91", "Row-Level Security"],
    githubUrl: "https://github.com/ajju853"
  }
];

export const WORK_EXPERIENCE_LIST: WorkExperience[] = [
  {
    id: "exp_1",
    designation: "Software Engineer",
    company: "Nexvitech India Pvt Ltd",
    employmentType: "Full-time",
    location: "Pune, India",
    duration: "May 2025 - Present",
    keyResponsibilities: [
      "Develop and maintain Spring Boot and Flask microservices for ERP systems supporting high-intensity manufacturing operations for Wipro and Mahindra.",
      "Orchestrate complex backend shift-management operations, HOLD queues, and asynchronous alert notifications with sub-second task execution.",
      "Troubleshoot database schema performance bottlenecks under heavy simultaneous connection pools on enterprise PostgreSQL.",
      "Perform code reviews, set up and enforce branching standards, and write CI/CD pipelines to ensure automated audit-ready version deployment of APIs."
    ],
    keyAchievements: [
      "Designed a comprehensive 6-role RBAC system and secured 40+ RESTful microservice APIs using Flask-JWT-Extended, dropping unauthorized incidents to flat zero.",
      "Automated complex manufacturing dispatch coordination via custom Python and Bash scripting, reducing manual pipeline management effort by 60%."
    ]
  }
];

export const EDUCATION_LIST: Education[] = [
  {
    id: "edu_1",
    qualification: "Bachelor of Computer Applications (BCA)",
    institution: "Punyashlok Ahilyadevi Holkar Solapur University",
    duration: "2022 - 2025",
    mode: "Full-time",
    highlights: [
      "Graduated with an outstanding academic CGPA of 7.79 / 10.0.",
      "Specialized in Software Engineering principles, Advanced Databases (DBMS), and Object-Oriented Software Engineering.",
      "Awarded top marks for academic capstone projects presenting secure cloud database synchronization models."
    ]
  }
];

export const SKILLS_LIST: SkillCategory[] = [
  {
    id: "skill_cat_1",
    category: "Integration & Backend",
    skills: [
      { name: "Java / Spring Boot 3.x", level: 95 },
      { name: "TIBCO BusinessWorks CE", level: 90 },
      { name: "Python / Flask & FastAPI", level: 92 },
      { name: "RESTful API / Swagger (OpenAPI)", level: 95 },
      { name: "Node.js / Express.js", level: 85 }
    ]
  },
  {
    id: "skill_cat_2",
    category: "Database, DevOps & Cloud",
    skills: [
      { name: "Docker & Docker Compose", level: 92 },
      { name: "PostgreSQL / MySQL / Redis", level: 90 },
      { name: "GitHub Actions CI/CD Platforms", level: 95 },
      { name: "Oracle Cloud Infrastructure (OCI)", level: 88 },
      { name: "Linux Administration & Bash Scripting", level: 85 }
    ]
  },
  {
    id: "skill_cat_3",
    category: "Security & Engineering Principles",
    skills: [
      { name: "JWT Bearer & OAuth 2.0 Web Auth", level: 92 },
      { name: "Role-Based Access Control (RBAC)", level: 95 },
      { name: "OOP, Concurrency & Design Patterns", level: 90 },
      { name: "AES-256 Symmetric Encryption", level: 85 },
      { name: "Agile / Scrum / SDLC Methodologies", level: 90 }
    ]
  },
  {
    id: "skill_cat_4",
    category: "Frontend & AI Technologies",
    skills: [
      { name: "React.js / Next.js Frameworks", level: 88 },
      { name: "TypeScript & JavaScript", level: 90 },
      { name: "Tailwind CSS Utility Styling", level: 92 },
      { name: "LangChain & LLM APIs (OpenAI/Gemini)", level: 85 }
    ]
  }
];

export const CERTIFICATIONS_LIST: Certification[] = [
  {
    id: "cert_oci_24",
    name: "Oracle Cloud Infrastructure 2024 Certified Foundations Associate",
    provider: "Oracle",
    year: "Feb 2025",
    imageFilename: "oracle_oci.jpg"
  },
  {
    id: "cert_oracle_erp",
    name: "Oracle Fusion Cloud Applications ERP Certified Foundations Associate",
    provider: "Oracle",
    year: "Mar 2025",
    imageFilename: "oracle_erp.jpg"
  },
  {
    id: "cert_oracle_hcm",
    name: "Oracle Fusion Cloud Applications HCM Certified Foundations Associate",
    provider: "Oracle",
    year: "Mar 2025",
    imageFilename: "oracle_hcm.jpg"
  },
  {
    id: "cert_cisco_eh",
    name: "Cisco Ethical Hacker",
    provider: "Cisco",
    year: "May 2024",
    imageFilename: "cisco_eh.jpg"
  },
  {
    id: "cert_hr_sql_adv",
    name: "SQL Advanced Skill Certificate",
    provider: "HackerRank",
    year: "Jan 2025",
    imageFilename: "hackerrank_sql.jpg"
  },
  {
    id: "cert_hr_rest_int",
    name: "REST API Intermediate Skill Certificate",
    provider: "HackerRank",
    year: "Oct 2024",
    imageFilename: "hackerrank_rest.jpg"
  },
  {
    id: "cert_github_ce",
    name: "Career Essentials in GitHub Professional Certificate",
    provider: "GitHub",
    year: "Apr 2024",
    imageFilename: "github_pro.jpg"
  },
  {
    id: "cert_github_actions",
    name: "Practical GitHub Actions",
    provider: "LinkedIn / GitHub",
    year: "Apr 2024",
    imageFilename: "github_actions.jpg"
  },
  {
    id: "cert_walmart_se",
    name: "Walmart Advanced Software Engineering Job Simulation",
    provider: "Walmart",
    year: "Nov 2024",
    imageFilename: "walmart_se.jpg"
  },
  {
    id: "cert_ms_genai",
    name: "Career Essentials in Generative AI",
    provider: "Microsoft & LinkedIn",
    year: "Apr 2024",
    imageFilename: "microsoft_ai.jpg"
  }
];

export const ACHIEVEMENTS_LIST: Achievement[] = [
  {
    id: "ach_1",
    category: "Professional",
    year: "2025",
    title: "Secured 40+ REST APIs (Zero Incident Status)",
    institution: "Nexvitech India Pvt Ltd",
    description: "Designed and rolled out a high-control 6-role RBAC security mechanism in Flask, eliminating key credential exposures and bringing unauthorized gateway requests to standard zero.",
    statsValue: "0",
    statsLabel: "Security Incidents"
  },
  {
    id: "ach_2",
    category: "Professional",
    year: "2025",
    title: "Automated Dispatch Operations Automation",
    institution: "Nexvitech India Pvt Ltd",
    description: "Crafted automated background dispatch schedulers and HOLD queue notifications, dropping operational communication and follow-up synchronization overhead by 60%.",
    statsValue: "60%",
    statsLabel: "Effort Saved"
  },
  {
    id: "ach_3",
    category: "Other",
    year: "2024",
    title: "Oracle Certified Foundations Cloud Associate",
    institution: "Oracle",
    description: "Successfully proven competency validation in security models, cloud container resources, multi-zone resiliency, and database migrations on Oracle Cloud Infrastructure.",
    statsValue: "OCI '24",
    statsLabel: "Certified"
  },
  {
    id: "ach_4",
    category: "Academic",
    year: "2024",
    title: "Reduced Candidate Screening Effort by 80%",
    institution: "JobMatchAI Capstone Project",
    description: "Formed a robust process automation workflow with multi-threaded LangChain filters, creating instant profile screening scoring matrix with high accuracy and low token overhead.",
    statsValue: "80%",
    statsLabel: "Efficiency Lift"
  }
];

export const STATS = [
  { value: "1+", label: "Years Experience" },
  { value: "10", label: "Certifications" },
  { value: "5", label: "Core Projects" },
  { value: "4", label: "Key Achievements" }
];
