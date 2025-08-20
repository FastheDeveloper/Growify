/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/app/**/*.{js,ts,tsx}', './src/components/**/*.{js,ts,tsx}'],

    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            fontFamily: {
                INTER_REGULAR: 'Inter_Regular',
                INTER_MEDIUM: 'Inter_Medium',
                INTER_SEMIBOLD: 'Inter_SemiBold',
                INTER_BOLD: 'Inter_Bold',
                INTER_BLACK: 'Inter_Black',
            },
            colors: {
                // 🌱 Primary Brand Colors
                PRIMARY: "#4CAF50", // Fresh green (growth & success)
                PRIMARY_DARK: "#388E3C",
                PRIMARY_LIGHT: "#C8E6C9",

                // ✨ Accent / Reward Colors
                ACCENT: "#FFC107", // Gold (coins, rewards)
                ACCENT_DARK: "#FFA000",
                ACCENT_LIGHT: "#FFECB3",

                // 🔥 Streak / Energy
                STREAK: "#FF5722", // Fiery orange (streaks, motivation)
                STREAK_LIGHT: "#FFCCBC",

                // 🌙 Neutral UI
                BACKGROUND: "#FFFFFF", // Main background
                SURFACE: "#F5F5F5", // Card backgrounds
                BORDER: "#E0E0E0",

                // 📝 Text
                TEXT_PRIMARY: "#212121",
                TEXT_SECONDARY: "#757575",
                TEXT_LIGHT: "#FFFFFF",

                // ⚠️ States
                SUCCESS: "#66BB6A", // habit completed
                WARNING: "#FFA726", // reminder
                ERROR: "#EF5350",
            }
        },
    },
    plugins: [],
};