// import { nextui } from '@nextui-org/theme';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // "./node_modules/@nextui-org/theme/dist/components/(button|divider|modal|navbar|ripple|spinner).js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      whiteish: '#FFFFFA',
      primary: 'lightblue',
      // primary: '#0D5C63',
      secondary: '#44A1A0',
      light: '#78CDD7',
      midblue: '#247B7B',
      black: '#000000',
      gray: '#e8e8e8',
      white: '#fff',
      destructive: '#f03c4b'
    },
  },
  // plugins: [nextui()],
};
export default config;
