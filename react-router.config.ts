import type { Config } from "@react-router/dev/config";
import { vercelPreset } from "@vercel/remix/vite";

export default {
  presets: [vercelPreset()],
  future: {
    unstable_optimizeDeps: true,
  },
  ssr: true,
} satisfies Config;
