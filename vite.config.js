import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
    return {
        plugins: [react()],
        optimizeDeps: {
            include: ["ckeditor5-custom-build"],
        },
        build: {
            commonjsOptions: {
                exclude: ["ckeditor5-custom-build"],
            },
        },
    };
});
