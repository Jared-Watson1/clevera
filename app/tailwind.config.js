module.exports = {
  darkMode: ["class"], // Enable dark mode using 'class'
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],

  theme: {
    extend: {
      colors: {
        // Light Theme Colors
        light1: "#EDEDE9",
        light2: "#D6CCC2",
        light3: "#F5EBE0",
        light4: "#E3D5CA",
        light5: "#D5BDAF",
        darkText: "#333333",

        // Feedback Colors
        error: "#EF4444",
        success: "#10B981",

        // Borders
        border: "#D1D5DB",

        // Primary Blue Shades
        blue: {
          500: "#3B82F6",
          600: "#2563EB",
        },

        // Dynamic Theme Variables
        background: "hsl(var(--sidebar-background))", // Dynamic Background
        foreground: "hsl(var(--sidebar-foreground))", // Dynamic Foreground
        primary: "hsl(var(--sidebar-primary))", // Primary Color
        "primary-foreground": "hsl(var(--sidebar-primary-foreground))", // Primary Foreground
        accent: "hsl(var(--sidebar-accent))", // Accent Color
        "accent-foreground": "hsl(var(--sidebar-accent-foreground))", // Accent Foreground
        border: "hsl(var(--sidebar-border))", // Border Color
        ring: "hsl(var(--sidebar-ring))", // Focus Ring Color

        // Sidebar Specific Colors
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
    },
  },
  plugins: [],
};
