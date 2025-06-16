// postcss.config.mjs (Renamed from postcss.config.js)
// This configuration is correct for Tailwind CSS v4 and Next.js 15
const config = {
  plugins: {
    // You *must* use @tailwindcss/postcss for Tailwind CSS v4
    "@tailwindcss/postcss": {},
    // Autoprefixer is also typically included if needed, ensure it's installed
    // autoprefixer: {},
  },
};

export default config;
