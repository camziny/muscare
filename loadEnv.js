import { execSync } from "child_process";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

// Determine environment
const env = process.env.NODE_ENV || "development";

// Load environment variables from the correct .env file
const envFilePath = path.resolve(process.cwd(), `.env.${env}`);
if (fs.existsSync(envFilePath)) {
  dotenv.config({ path: envFilePath });
} else {
  console.error(`Environment file not found: ${envFilePath}`);
  process.exit(1);
}

// Run drizzle-kit push command
try {
  execSync("drizzle-kit push", { stdio: "inherit" });
} catch (error) {
  console.error("Error running drizzle-kit push:", error);
  process.exit(1);
}
