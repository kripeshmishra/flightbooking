import type { Config } from "tailwindcss";

const config: Config = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  important: true,
  theme: {
    extend: {
      colors: {
        primary: '#00BDBB',
        secondary: '#094067',
        darksecondary: '#0A557F',
        lightgrey: '#F1F8FE',
        lightbg: '#F0F9F8',
        customyellow: '#E3A70F',
        customorange: '#F27502',
        defaultText: '#676977',
      },
    },
    backgroundImage: {
      'custom-gradient': 'linear-gradient(125.08deg, #0169AB 6.44%, #02345A 91.07%)',
    },
  },
  plugins: [],
};
export default config;

