import { jsPDF } from "jspdf";

export function generateResumePDF(asDataUri = false): string | void {
  // Create an A4 PDF document (portrait, mm, a4)
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm

  const leftMargin = 18;
  const rightMargin = 18;
  const contentWidth = pageWidth - leftMargin - rightMargin; // 174mm

  // PAGE 1
  let y = 16;

  // --- NAME HEADER (Centered, Times Bold, Large) ---
  doc.setFont("times", "bold");
  doc.setFontSize(22);
  doc.setTextColor(11, 25, 44); // Deep Navy (#0B192C)
  doc.text("AJIM PATEL", pageWidth / 2, y, { align: "center" });
  y += 6;

  // --- CONTACT INFO ROW (Centered, Times Regular, Small) ---
  doc.setFont("times", "normal");
  doc.setFontSize(9);
  doc.setTextColor(30, 30, 30);
  const contactString = "+91 93254 80476   |   ajimp340@gmail.com   |   linkedin.com/in/ajim-patel   |   github.com/ajju853   |   Pune, India";
  doc.text(contactString, pageWidth / 2, y, { align: "center" });
  y += 10;

  // Helper function to draw Section Header
  const drawSectionHeader = (title: string, currentY: number) => {
    doc.setFont("times", "bold");
    doc.setFontSize(11);
    doc.setTextColor(11, 25, 44);
    doc.text(title, leftMargin, currentY);
    
    // Draw thin horizontal black line immediately below header
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.2);
    doc.line(leftMargin, currentY + 1.5, pageWidth - rightMargin, currentY + 1.5);
    return currentY + 6.5; // Padding below section header line
  };

  // Helper function for formatted bullet points
  const drawBulletPoint = (text: string, currentY: number, bulletIndent = 4, textIndent = 8) => {
    doc.setFont("times", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(17, 17, 17);
    
    // Draw bullet character
    doc.text("•", leftMargin + bulletIndent, currentY);
    
    // Wrap text to width of content
    const maxTextWidth = contentWidth - textIndent;
    const lines = doc.splitTextToSize(text, maxTextWidth);
    
    doc.text(lines, leftMargin + textIndent, currentY);
    // Return next y line position calculating times line height (~4.2mm per line)
    return currentY + (lines.length * 4.2) + 1;
  };

  // Helper function to draw skill pairs
  const skillPairDraw = (label: string, value: string, currentY: number) => {
    doc.setFont("times", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(11, 25, 44);
    doc.text(label + ": ", leftMargin, currentY);
    
    doc.setFont("times", "normal");
    doc.setTextColor(17, 17, 17);
    const labelWidth = doc.getTextWidth(label + ": ");
    const wrappedValue = doc.splitTextToSize(value, contentWidth - labelWidth - 2);
    doc.text(wrappedValue, leftMargin + labelWidth + 1, currentY);
    return currentY + (wrappedValue.length * 4.2) + 0.5;
  };

  // --- SECTION 1: Professional Summary ---
  y = drawSectionHeader("Professional Summary", y);
  doc.setFont("times", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(17, 17, 17);
  const summaryParagraph = "Software Engineer with experience building enterprise backend systems, microservices, REST APIs, and workflow automation solutions using Java, Spring Boot, Python, and Flask. Developed a production-style enterprise integration platform using TIBCO BusinessWorks CE, Spring Cloud Gateway, JWT security, Docker, and PostgreSQL to orchestrate business workflows across distributed services. Experienced in ERP-focused application development, API integration, production support, troubleshooting, CI/CD, and distributed system design for manufacturing clients including Mahindra and Wipro. Oracle Cloud Infrastructure 2024 Certified.";
  const summaryLines = doc.splitTextToSize(summaryParagraph, contentWidth);
  doc.text(summaryLines, leftMargin, y);
  y += (summaryLines.length * 4.2) + 5;

  // --- SECTION 2: Projects ---
  y = drawSectionHeader("Projects", y);

  // -- PROJECT 1: HR Service Integration Engine
  doc.setFont("times", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(11, 25, 44);
  doc.text("HR Service Integration Engine", leftMargin, y);
  doc.setFont("times", "normal");
  doc.text("GitHub", pageWidth - rightMargin, y, { align: "right" });
  y += 4;

  doc.setFont("times", "italic");
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  doc.text("TIBCO BW CE, Java 17, Spring Boot 3.2, Spring Cloud Gateway, React 18, PostgreSQL, Docker, GitHub Actions", leftMargin, y);
  y += 4.5;

  y = drawBulletPoint(
    "Designed and built a production-style enterprise integration platform using TIBCO BusinessWorks CE as the orchestration layer, automating a 7-step employee onboarding workflow across 4 Spring Boot microservices and 6 backend services through REST-based communication, centralized error handling, compensation logic for payroll failures, and response aggregation.",
    y
  );
  y = drawBulletPoint(
    "Implemented Spring Cloud Gateway as a centralized API gateway for request routing, JWT validation, rate limiting, and service access management across 6 backend services, each documented with Swagger/OpenAPI.",
    y
  );
  y = drawBulletPoint(
    "Secured the platform using Spring Security 6 and JWT Bearer authentication with Role-Based Access Control (HR_MANAGER / ADMIN), enforcing authenticated access through the API Gateway.",
    y
  );
  y = drawBulletPoint(
    "Containerized the full system using Docker Compose (8 containers) and configured GitHub Actions CI/CD pipelines for automated builds, dependency validation, and Docker image generation across all services.",
    y
  );
  y = drawBulletPoint(
    "Designed and documented end-to-end system architecture, service interaction flows, API contracts, deployment topology, and error-handling strategies using architecture diagrams, sequence diagrams, and technical documentation.",
    y
  );
  y += 4.5;

  // -- PROJECT 2: LPS - Line Production System
  doc.setFont("times", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(11, 25, 44);
  doc.text("LPS – Line Production System (CIE Automotive)", leftMargin, y);
  doc.setFont("times", "normal");
  doc.text("github.com/ajju853", pageWidth - rightMargin, y, { align: "right" });
  y += 4;

  doc.setFont("times", "italic");
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  doc.text("React, TypeScript, Flask, PostgreSQL, Redis, TanStack Query, Recharts", leftMargin, y);
  y += 4.5;

  y = drawBulletPoint(
    "Built a full-stack ERP integration platform spanning demand creation, BOM management, production tracking, and dispatch — covering the complete manufacturing data integration lifecycle for an automotive client.",
    y
  );
  y = drawBulletPoint(
    "Developed a real-time OEE application monitoring dashboard using TanStack Query and Recharts, replacing manual status checks and enabling live production visibility for floor supervisors.",
    y
  );
  y = drawBulletPoint(
    "Implemented sub-machine load-balancing logic using OOP and design patterns to identify and resolve workflow bottlenecks, improving throughput predictability across production lines.",
    y
  );
  y += 4.5;

  // -- PROJECT 3: JobMatchAI
  doc.setFont("times", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(11, 25, 44);
  doc.text("JobMatchAI – Automation Workflow Engine", leftMargin, y);
  doc.setFont("times", "normal");
  doc.text("github.com/ajju853", pageWidth - rightMargin, y, { align: "right" });
  y += 4;

  doc.setFont("times", "italic");
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  doc.text("Python, LangChain, OpenAI API, FastAPI, Flask, Playwright, Fernet Encryption", leftMargin, y);
  y += 4.5;

  y = drawBulletPoint(
    "Architected a modular, multi-service process automation workflow integrating LLM scoring, resume routing, and cross-platform job tracking — demonstrating enterprise integration and service orchestration patterns.",
    y
  );
  y = drawBulletPoint(
    "Designed 60+ RESTful APIs across a Flask backend with a 7-tab monitoring dashboard; implemented unit and integration testing across automation pipeline stages. Reduced manual effort by 80%.",
    y
  );
  y += 4.5;

  // -- PROJECT 4: PGFlow
  doc.setFont("times", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(11, 25, 44);
  doc.text("PGFlow – Multi-Tenant SaaS Platform", leftMargin, y);
  doc.setFont("times", "normal");
  doc.text("github.com/ajju853", pageWidth - rightMargin, y, { align: "right" });
  y += 4;

  doc.setFont("times", "italic");
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  doc.text("Next.js, TypeScript, Supabase, Razorpay, MSG91, Row-Level Security", leftMargin, y);
  y += 4.5;

  y = drawBulletPoint(
    "Automated rent invoicing, utility splitting, and WhatsApp notification workflows via MSG91 API and Razorpay gateway; implemented Supabase Row-Level Security (RLS) for zero-leakage multi-tenant data isolation.",
    y
  );

  // -------------------------------------------------------------------------
  // PAGE 2
  // -------------------------------------------------------------------------
  doc.addPage();
  y = 16;

  // --- SECTION 3: Technical Skills ---
  y = drawSectionHeader("Technical Skills", y);
  y = skillPairDraw("Integration & Middleware", "TIBCO BusinessWorks CE, Service-Oriented Architecture (SOA), Enterprise Integration, REST API Integration, Swagger/OpenAPI, Postman, XML, JSON", y);
  y = skillPairDraw("Backend Development", "Java, Spring Boot, Spring Security, Spring Data JPA, Hibernate, Spring Cloud Gateway, Microservices, REST APIs, Distributed Systems, Flask, FastAPI, Node.js, Express.js", y);
  y = skillPairDraw("DevOps & Cloud", "Git, GitHub, Maven, Docker, CI/CD, Continuous Integration, Continuous Deployment, OCI Cloud, Linux, Agile/Scrum, SDLC", y);
  y = skillPairDraw("Databases", "PostgreSQL, MySQL, MongoDB, Redis", y);
  y = skillPairDraw("Security", "JWT, OAuth 2.0, RBAC, AES-256, Fernet Encryption", y);
  y = skillPairDraw("Languages", "Java, Python, JavaScript, TypeScript, Kotlin, SQL", y);
  y = skillPairDraw("Engineering Practices", "Object-Oriented Programming (OOP), Design Patterns, Multithreading, System Design, Unit Testing, Integration Testing, Code Reviews", y);
  y = skillPairDraw("Monitoring & Support", "Application Monitoring, Production Support, System Troubleshooting, Incident Resolution", y);
  y = skillPairDraw("Frontend", "React.js, Next.js, Tailwind CSS", y);
  y = skillPairDraw("AI/LLM", "LangChain, OpenAI API, Gemini API", y);
  y += 4.5;

  // --- SECTION 4: Work Experience ---
  y = drawSectionHeader("Work Experience", y);

  doc.setFont("times", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(11, 25, 44);
  doc.text("Software Engineer", leftMargin, y);
  doc.text("May 2025 \u2013 Present", pageWidth - rightMargin, y, { align: "right" });
  y += 4.5;

  doc.setFont("times", "italic");
  doc.setFontSize(9.5);
  doc.setTextColor(11, 25, 44);
  doc.text("Nexvitech India Pvt Ltd", leftMargin, y);
  doc.text("Pune, India", pageWidth - rightMargin, y, { align: "right" });
  y += 4.5;

  y = drawBulletPoint(
    "Developed and maintained secure Spring Boot and Flask microservices for ERP applications supporting manufacturing operations for Mahindra and Wipro, contributing to stable production service delivery and workflow automation initiatives.",
    y
  );
  y = drawBulletPoint(
    "Designed a 6-role RBAC system and secured 40+ RESTful APIs using Flask-JWT-Extended, enforcing granular access control across multi-tenant environments — reducing unauthorized access incidents to zero.",
    y
  );
  y = drawBulletPoint(
    "Automated shift management workflows (HOLD queue processing, team notifications) via Python and Bash scripting, cutting manual coordination effort by 60% and eliminating cross-team synchronization delays.",
    y
  );
  y = drawBulletPoint(
    "Resolved concurrency and integration issues in backend services through systematic troubleshooting and incident resolution, maintaining sprint delivery schedules in an Agile environment.",
    y
  );
  y = drawBulletPoint(
    "Enforced Git source code management best practices — branching strategies, PR review workflows, and deployment pipelines — ensuring audit-ready version control across all service releases.",
    y
  );
  y += 4.5;

  // --- SECTION 5: Education ---
  y = drawSectionHeader("Education", y);

  doc.setFont("times", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(11, 25, 44);
  doc.text("Bachelor of Computer Applications (BCA)", leftMargin, y);
  doc.text("2025", pageWidth - rightMargin, y, { align: "right" });
  y += 4.5;

  doc.setFont("times", "italic");
  doc.setFontSize(9.5);
  doc.text("Punyashlok Ahilyadevi Holkar Solapur University", leftMargin, y);
  doc.setFont("times", "bold");
  doc.text("CGPA: 7.79 / 10.0", pageWidth - rightMargin, y, { align: "right" });
  y += 8;

  // --- SECTION 6: Certifications ---
  y = drawSectionHeader("Certifications", y);

  const drawCertificationRow = (title: string, suffix: string, currentY: number) => {
    doc.setFont("times", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(11, 25, 44);
    doc.text(title, leftMargin, currentY);
    
    doc.setFont("times", "normal");
    doc.text(suffix, pageWidth - rightMargin, currentY, { align: "right" });
    return currentY + 4.5;
  };

  y = drawCertificationRow("Oracle Cloud Infrastructure 2024 Certified Foundations Associate", "Oracle, 2025", y);
  y = drawCertificationRow("HackerRank Software Engineer Certificate", "HackerRank, 2024", y);
  y = drawCertificationRow("SQL (Advanced)", "HackerRank, 2024", y);
  y = drawCertificationRow("REST API (Intermediate)", "HackerRank, 2024", y);
  y = drawCertificationRow("Advanced Software Engineering Job Simulation", "Walmart USA (Forage), 2024", y);
  y = drawCertificationRow("Google AI Essentials", "Google, 2024", y);
  y = drawCertificationRow("Career Essentials in Generative AI", "Microsoft & LinkedIn, 2024", y);
  y += 4;

  // --- SECTION 7: Additional Details ---
  y = drawSectionHeader("Additional", y);

  doc.setFont("times", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(11, 25, 44);
  doc.text("Languages: ", leftMargin, y);
  doc.setFont("times", "normal");
  doc.setTextColor(17, 17, 17);
  doc.text("English (Professional), Hindi (Native), Marathi (Native)", leftMargin + doc.getTextWidth("Languages: "), y);
  y += 4.5;

  doc.setFont("times", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(11, 25, 44);
  doc.text("Interests: ", leftMargin, y);
  doc.setFont("times", "normal");
  doc.setTextColor(17, 17, 17);
  doc.text("Open Source Contribution, Technical Writing, Developer Mentoring", leftMargin + doc.getTextWidth("Interests: "), y);

  if (asDataUri) {
    return doc.output("datauristring");
  }

  // Save the constructed high-fidelity PDF
  doc.save("Ajim_Patel_Resume.pdf");
}
