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

  // API Route: Checks if uploaded photos exist on local disk and provides active links to the client
  app.get("/api/images", (req, res) => {
    const formalExists = fs.existsSync(path.join(uploadsPath, "formal-upload.png"));
    const casualExists = fs.existsSync(path.join(uploadsPath, "casual-upload.png"));

    res.json({
      formalUrl: formalExists ? `/uploads/formal-upload.png?t=${Date.now()}` : null,
      casualUrl: casualExists ? `/uploads/casual-upload.png?t=${Date.now()}` : null,
    });
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
