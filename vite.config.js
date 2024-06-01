import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
    return {
        optimizeDeps: {
            include: ["@workspace/ckeditor5-custom-build"],
        },
        build: {
            commonjsOptions: {
                include: [/@workspace\/ckeditor5-custom-build/, /node_modules/],
            },
        },
        plugins: [react()],
    };
});
