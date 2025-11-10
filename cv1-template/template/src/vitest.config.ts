import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        // Toto řekne vitest, aby spustil náš setup.ts PŘED VŠÍM OSTATNÍM
        setupFiles: ['test/setup.ts'],
    },
});