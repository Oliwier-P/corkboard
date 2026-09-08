import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
    resolve: {
        alias: {
            "@/features": path.resolve(__dirname, "./src/components/features"),
            "@/layout": path.resolve(__dirname, "./src/components/layout"),
            "@/ui": path.resolve(__dirname, "./src/components/ui"),
            "@/components": path.resolve(__dirname, "./src/components"),
            "@/api": path.resolve(__dirname, "./src/api"),
            "@/context": path.resolve(__dirname, "./src/context"),
            "@/global": path.resolve(__dirname, "./src/global"),
            "@/hooks": path.resolve(__dirname, "./src/hooks"),
            "@/lib": path.resolve(__dirname, "./src/lib"),
            "@/pages": path.resolve(__dirname, "./src/pages"),
            "@/store": path.resolve(__dirname, "./src/store"),
            "@/types": path.resolve(__dirname, "./src/types"),
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
