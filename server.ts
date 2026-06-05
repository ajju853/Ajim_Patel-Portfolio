import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Enable JSON request decoding with high limits to securely handle base64 image transfers
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Serve upload assets directory persistently
  const uploadsPath = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
  }
  app.use("/uploads", express.static(uploadsPath));

  // Same-origin print-perfect A4 HTML preview route to avoid restricted PDF plugin blocks inside sandboxed frames
  app.get("/api/resume-pdf-view", (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Ajim Patel - Resume</title>
  <style>
    body {
      background-color: #0b1a2c;
      margin: 0;
      padding: 24px 10px;
      font-family: "Georgia", "Times New Roman", Times, serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;
      min-height: 100vh;
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
    }
    .page {
      background-color: white;
      width: 210mm;
      min-height: 297mm;
      box-sizing: border-box;
      padding: 18mm 18mm;
      box-shadow: 0 10px 40px rgba(0,0,0,0.65);
      color: #111111;
      font-size: 10pt;
      line-height: 1.45;
      display: flex;
      flex-direction: column;
      position: relative;
    }
    h1 {
      text-align: center;
      font-size: 24pt;
      margin: 0 0 6px 0;
      color: #000000;
      font-weight: 500;
      letter-spacing: 0.5px;
      font-family: inherit;
    }
    .contact {
      text-align: center;
      font-size: 9pt;
      margin-bottom: 20px;
      color: #222222;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .contact a {
      color: #222222;
      text-decoration: none;
      border-bottom: 1px dotted #888;
    }
    .contact a:hover {
      border-bottom: 1px solid #111;
    }
    .section-header {
      font-size: 11pt;
      font-weight: bold;
      color: #000000;
      margin-top: 18px;
      margin-bottom: 2px;
      text-transform: uppercase;
      letter-spacing: 0.75px;
    }
    .section-line {
      border-bottom: 1.2px solid #111111;
      margin-bottom: 10px;
    }
    .item-header {
      display: flex;
      justify-content: space-between;
      font-weight: bold;
      font-size: 10.5pt;
      color: #000000;
      margin-top: 10px;
    }
    .item-header-link {
      text-decoration: none;
      color: #000000;
    }
    .item-sub {
      display: flex;
      justify-content: space-between;
      font-style: italic;
      color: #444444;
      font-size: 9.5pt;
      margin-bottom: 6px;
      margin-top: 2px;
    }
    .skills-row {
      margin-bottom: 6px;
      font-size: 9.5pt;
      line-height: 1.4;
      text-align: justify;
    }
    .skills-label {
      font-weight: bold;
      color: #000000;
    }
    ul {
      margin: 0;
      padding-left: 18px;
    }
    li {
      margin-bottom: 4px;
      font-size: 9.5pt;
      line-height: 1.45;
      text-align: justify;
    }
    .summary-text {
      font-size: 9.5pt;
      line-height: 1.45;
      text-align: justify;
      margin-bottom: 10px;
    }
    .page-footer {
      position: absolute;
      bottom: 10mm;
      left: 0;
      right: 0;
      text-align: center;
      font-size: 8pt;
      color: #666666;
    }
    @media print {
      body {
        background-color: transparent;
        padding: 0;
        gap: 0;
      }
      .page {
        box-shadow: none;
        page-break-after: always;
      }
      .page:last-child {
        page-break-after: avoid;
      }
    }
  </style>
</head>
<body>
  <!-- PAGE 1 -->
  <div class="page">
    <h1>AJIM PATEL</h1>
    <div class="contact">
      <span>📞 +91 93254 80476</span>
      <span>•</span>
      <span>✉️ <a href="mailto:ajimp340@gmail.com">ajimp340@gmail.com</a></span>
      <span>•</span>
      <span>🔗 <a href="https://linkedin.com/in/ajim-patel" target="_blank">linkedin.com/in/ajim-patel</a></span>
      <span>•</span>
      <span>🐙 <a href="https://github.com/ajju853" target="_blank">github.com/ajju853</a></span>
      <span>•</span>
      <span>📍 Pune, India</span>
    </div>
    
    <div class="section-header">Professional Summary</div>
    <div class="section-line"></div>
    <div class="summary-text">
      Software Engineer with experience building enterprise backend systems, microservices, REST APIs, and workflow automation solutions using <strong>Java, Spring Boot, Python, and Flask</strong>. Developed a production-style enterprise integration platform using <strong>TIBCO BusinessWorks CE, Spring Cloud Gateway, JWT security, Docker, and PostgreSQL</strong> to orchestrate business workflows across distributed services. Experienced in ERP-focused application development, API integration, production support, troubleshooting, CI/CD, and distributed system design for manufacturing clients including <strong>Mahindra and Wipro</strong>. Oracle Cloud Infrastructure 2024 Certified.
    </div>

    <div class="section-header">Projects</div>
    <div class="section-line"></div>
    
    <div class="item-header">
      <span>HR Service Integration Engine</span>
      <a href="https://github.com/ajju853" target="_blank" class="item-header-link">GitHub</a>
    </div>
    <div class="item-sub">
      <span>TIBCO BW CE, Java 17, Spring Boot 3.2, Spring Cloud Gateway, React 18, PostgreSQL, Docker, GitHub Actions</span>
    </div>
    <ul>
      <li>Designed and built a <strong>production-style enterprise integration platform</strong> using <strong>TIBCO BusinessWorks CE</strong> as the orchestration layer, automating a 7-step employee onboarding workflow across <strong>4 Spring Boot microservices</strong> and 6 backend services through REST-based communication, centralized error handling, <strong>compensation logic for payroll failures</strong>, and response aggregation.</li>
      <li>Implemented <strong>Spring Cloud Gateway</strong> as a centralized API gateway for request routing, JWT validation, rate limiting, and service access management across 6 backend services, each documented with <strong>Swagger/OpenAPI</strong>.</li>
      <li>Secured the platform using <strong>Spring Security 6 and JWT Bearer authentication</strong> with Role-Based Access Control (HR_MANAGER / ADMIN), enforcing authenticated access through the API Gateway.</li>
      <li>Containerized the full system using <strong>Docker Compose</strong> (8 containers) and configured <strong>GitHub Actions CI/CD pipelines</strong> for automated builds, dependency validation, and Docker image generation across all services.</li>
      <li>Designed and documented end-to-end <strong>system architecture, service interaction flows, API contracts, deployment topology, and error-handling strategies</strong> using architecture diagrams, sequence diagrams, and technical documentation.</li>
    </ul>

    <div class="item-header">
      <span>LPS – Line Production System (CIE Automotive)</span>
      <a href="https://github.com/ajju853" target="_blank" class="item-header-link">github.com/ajju853</a>
    </div>
    <div class="item-sub">
      <span>React, TypeScript, Flask, PostgreSQL, Redis, TanStack Query, Recharts</span>
    </div>
    <ul>
      <li>Built a <strong>full-stack ERP integration platform</strong> spanning demand creation, BOM management, production tracking, and dispatch — covering the complete manufacturing data integration lifecycle for an automotive client.</li>
      <li>Developed a <strong>real-time OEE application monitoring dashboard</strong> using TanStack Query and Recharts, replacing manual status checks and enabling live production visibility for floor supervisors.</li>
      <li>Implemented <strong>sub-machine load-balancing logic</strong> using OOP and design patterns to identify and resolve workflow bottlenecks, improving throughput predictability across production lines.</li>
    </ul>

    <div class="item-header">
      <span>JobMatchAI – Automation Workflow Engine</span>
      <a href="https://github.com/ajju853" target="_blank" class="item-header-link">github.com/ajju853</a>
    </div>
    <div class="item-sub">
      <span>Python, LangChain, OpenAI API, FastAPI, Flask, Playwright, Fernet Encryption</span>
    </div>
    <ul>
      <li>Architected a <strong>modular, multi-service process automation workflow</strong> integrating LLM scoring, resume routing, and cross-platform job tracking — demonstrating enterprise integration and service orchestration patterns.</li>
      <li>Designed <strong>60+ RESTful APIs</strong> across a Flask backend with a 7-tab monitoring dashboard; implemented <strong>unit and integration testing</strong> across automation pipeline stages. <strong>Reduced manual effort by 80%.</strong></li>
    </ul>

    <div class="item-header">
      <span>PGFlow – Multi-Tenant SaaS Platform</span>
      <a href="https://github.com/ajju853" target="_blank" class="item-header-link">github.com/ajju853</a>
    </div>
    <div class="item-sub">
      <span>Next.js, TypeScript, Supabase, Razorpay, MSG91, Row-Level Security</span>
    </div>
    <ul>
      <li>Automated rent invoicing, utility splitting, and WhatsApp notification workflows via MSG91 API and Razorpay gateway; implemented <strong>Supabase Row-Level Security (RLS)</strong> for zero-leakage multi-tenant data isolation.</li>
    </ul>

    <div class="page-footer">Page 1 of 2</div>
  </div>

  <!-- PAGE 2 -->
  <div class="page">
    <div class="section-header">Technical Skills</div>
    <div class="section-line"></div>
    <div class="skills-row"><span class="skills-label">Integration & Middleware:</span> TIBCO BusinessWorks CE, Service-Oriented Architecture (SOA), Enterprise Integration, REST API Integration, Swagger/OpenAPI, Postman, XML, JSON</div>
    <div class="skills-row"><span class="skills-label">Backend Development:</span> Java, Spring Boot, Spring Security, Spring Data JPA, Hibernate, Spring Cloud Gateway, Microservices, REST APIs, Distributed Systems, Flask, FastAPI, Node.js, Express.js</div>
    <div class="skills-row"><span class="skills-label">DevOps & Cloud:</span> Git, GitHub, Maven, Docker, CI/CD, Continuous Integration, Continuous Deployment, OCI Cloud, Linux, Agile/Scrum, SDLC</div>
    <div class="skills-row"><span class="skills-label">Databases:</span> PostgreSQL, MySQL, MongoDB, Redis</div>
    <div class="skills-row"><span class="skills-label">Security:</span> JWT, OAuth 2.0, RBAC, AES-256, Fernet Encryption</div>
    <div class="skills-row"><span class="skills-label">Languages:</span> Java, Python, JavaScript, TypeScript, Kotlin, SQL</div>
    <div class="skills-row"><span class="skills-label">Engineering Practices:</span> Object-Oriented Programming (OOP), Design Patterns, Multithreading, System Design, Unit Testing, Integration Testing, Code Reviews</div>
    <div class="skills-row"><span class="skills-label">Monitoring & Support:</span> Application Monitoring, Production Support, System Troubleshooting, Incident Resolution</div>
    <div class="skills-row"><span class="skills-label">Frontend:</span> React.js, Next.js, Tailwind CSS</div>
    <div class="skills-row"><span class="skills-label">AI/LLM:</span> LangChain, OpenAI API, Gemini API</div>

    <div class="section-header">Work Experience</div>
    <div class="section-line"></div>
    <div class="item-header">
      <span>Software Engineer</span>
      <span>May 2025 – Present</span>
    </div>
    <div class="item-sub">
      <span>Nexvitech India Pvt Ltd</span>
      <span>Pune, India</span>
    </div>
    <ul>
      <li>Developed and maintained secure <strong>Spring Boot and Flask microservices</strong> for ERP applications supporting manufacturing operations for <strong>Mahindra and Wipro</strong>, contributing to stable production service delivery and workflow automation initiatives.</li>
      <li>Designed a <strong>6-role RBAC system and secured 40+ RESTful APIs</strong> using Flask-JWT-Extended, enforcing granular access control across multi-tenant environments — <strong>reducing unauthorized access incidents to zero</strong>.</li>
      <li>Automated <strong>shift management workflows</strong> (HOLD queue processing, team notifications) via Python and Bash scripting, <strong>cutting manual coordination effort by 60%</strong> and eliminating cross-team synchronization delays.</li>
      <li>Resolved <strong>concurrency and integration issues</strong> in backend services through systematic troubleshooting and incident resolution, maintaining sprint delivery schedules in an Agile environment.</li>
      <li>Enforced <strong>Git source code management</strong> best practices — branching strategies, PR review workflows, and deployment pipelines — ensuring audit-ready version control across all service releases.</li>
    </ul>

    <div class="section-header">Education</div>
    <div class="section-line"></div>
    <div class="item-header">
      <span>Bachelor of Computer Applications (BCA)</span>
      <span>2025</span>
    </div>
    <div class="item-sub">
      <span>Punyashlok Ahilyadevi Holkar Solapur University</span>
      <span>CGPA: 7.79 / 10.0</span>
    </div>

    <div class="section-header">Certifications</div>
    <div class="section-line"></div>
    
    <div style="display: flex; flex-direction: column; gap: 4px; font-size: 9.5pt;">
      <div style="display: flex; justify-content: space-between;">
        <strong>Oracle Cloud Infrastructure 2024 Certified Foundations Associate</strong>
        <span>Oracle, 2025</span>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <strong>HackerRank Software Engineer Certificate</strong>
        <span>HackerRank, 2024</span>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <strong>SQL (Advanced)</strong>
        <span>HackerRank, 2024</span>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <strong>REST API (Intermediate)</strong>
        <span>HackerRank, 2024</span>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <strong>Advanced Software Engineering Job Simulation</strong>
        <span>Walmart USA (Forage), 2024</span>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <strong>Google AI Essentials</strong>
        <span>Google, 2024</span>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <strong>Career Essentials in Generative AI</strong>
        <span>Microsoft & LinkedIn, 2024</span>
      </div>
    </div>

    <div class="section-header">Additional</div>
    <div class="section-line"></div>
    <div class="skills-row"><span class="skills-label">Languages:</span> English (Professional), Hindi (Native), Marathi (Native)</div>
    <div class="skills-row"><span class="skills-label">Interests:</span> Open Source Contribution, Technical Writing, Developer Mentoring</div>

    <div class="page-footer">Page 2 of 2</div>
  </div>
</body>
</html>`);
  });

  // API Route: Checks if uploaded photos exist on local disk and provides active links to the client
  app.get("/api/images", (req, res) => {
    const formalExists = fs.existsSync(path.join(uploadsPath, "formal-upload.png"));
    const casualExists = fs.existsSync(path.join(uploadsPath, "casual-upload.png"));

    res.json({
      formalUrl: formalExists ? `/uploads/formal-upload.png?t=${Date.now()}` : null,
      casualUrl: casualExists ? `/uploads/casual-upload.png?t=${Date.now()}` : null,
    });
  });

  // API Route: Saves the generated PDF on the backend so it can be served same-origin in the iframe
  app.post("/api/save-pdf", (req, res) => {
    try {
      const { pdfBase64 } = req.body;
      if (!pdfBase64) {
        return res.status(400).json({ error: "Missing pdf data base64 payload" });
      }

      let base64Data = pdfBase64;
      const matches = pdfBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        base64Data = matches[2];
      }

      const buffer = Buffer.from(base64Data, "base64");
      const targetFilePath = path.join(uploadsPath, "resume.pdf");

      fs.writeFileSync(targetFilePath, buffer);
      console.log(`PDF document saved successfully: ${targetFilePath}`);

      return res.json({
        success: true,
        url: `/uploads/resume.pdf?t=${Date.now()}`
      });
    } catch (err: any) {
      console.error("Internal storage operation failed for PDF:", err);
      return res.status(500).json({ error: err.message || "Failed to persist PDF file" });
    }
  });

  // API Route: Saves an uploaded profile photo base64 directly to the local persistent directory
  app.post("/api/upload-image", (req, res) => {
    try {
      const { type, imageStr } = req.body;
      if (!type || !imageStr) {
        return res.status(400).json({ error: "Missing picture type or image base64 coordinate" });
      }

      if (type !== "formal" && type !== "casual") {
        return res.status(400).json({ error: "Invalid type designated" });
      }

      // Check and strip standard header if included (e.g. "data:image/png;base64, ...")
      let base64Data = imageStr;
      const matches = imageStr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        base64Data = matches[2];
      }

      const buffer = Buffer.from(base64Data, "base64");
      const filename = `${type}-upload.png`;
      const targetFilePath = path.join(uploadsPath, filename);

      // Persist the binary file on the workspace filesystem permanently
      fs.writeFileSync(targetFilePath, buffer);
      console.log(`Image written successfully: ${targetFilePath}`);

      return res.json({
        success: true,
        imageUrl: `/uploads/${filename}?t=${Date.now()}`
      });
    } catch (err: any) {
      console.error("Internal storage operation failed:", err);
      return res.status(500).json({ error: err.message || "Failed to persist image into directory" });
    }
  });

  // Mount Vite development middle layer or handle Production distribution
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Backend server successfully listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
