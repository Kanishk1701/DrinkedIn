import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // We pass DIRECT_URL here because the CLI needs the direct connection to push to Supabase!
    url: env("DIRECT_URL"),
  },
});