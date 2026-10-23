import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
    resolve: {
        alias: {
            "@/ui": path.resolve(__dirname, "./src/components/ui"),
            "@/layout": path.resolve(__dirname, "./src/components/layout"),
            "@/features": path.resolve(__dirname, "./src/components/features"),
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
