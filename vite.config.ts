import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// All app content (courses, practice, formula reference) works fully offline /
// without any key. The optional Gemini key for the AI tutor is entered by the
// user at runtime and stored in localStorage — it is never read from env here.
// `base` controls the public path of bundled assets. For GitHub Pages project
// sites the app is served from /<repo>/, so the deploy workflow passes that in
// via VITE_BASE. Locally it defaults to '/'. (Hash routing means navigation
// works under any base with no server rewrites.)
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    target: 'es2022',
  },
});
