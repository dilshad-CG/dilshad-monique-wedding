import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// In production the site is served from GitHub Pages at
// /dilshad-monique-wedding/. Local dev stays at the root.
export default defineConfig(function (_a) {
    var command = _a.command;
    return ({
        base: command === 'build' ? '/dilshad-monique-wedding/' : '/',
        plugins: [react()],
    });
});
