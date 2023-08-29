/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const nextConfig = () => {
    let nextAuthUrl;
    let nextAuthSecret;

    if (phase === PHASE_DEVELOPMENT_SERVER) {
        nextAuthUrl: "http://localhost:3000";
        nextAuthSecret: "Jm6J5cKmbJBGxwA9OIQMsTDgrHN57uk0+ngevoasi50=";
    }

    else {
        nextAuthUrl: "https://ectomonster.vercel.app";
        nextAuthSecret: "F9GzJIKPPK4gGgKxjn2s79IdAJh45NKoXn9az8TJoHc=";
    }

    return {
        webpack(config) {
            // Grab the existing rule that handles SVG imports
            const fileLoaderRule = config.module.rules.find((rule) =>
                rule.test?.test?.(".svg"),
            )
        
            config.module.rules.push(
                // Reapply the existing rule, but only for svg imports ending in ?url
                {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
                },
                // Convert all other *.svg imports to React components
                {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                resourceQuery: { not: /url/ }, // exclude if *.svg?url
                use: ["@svgr/webpack"],
                },
            )
        
            // Modify the file loader rule to ignore *.svg, since we have it handled now.
            fileLoaderRule.exclude = /\.svg$/i
        
            return config
        },
        reactStrictMode: true,
        env: {
            NEXTAUTH_URL: nextAuthUrl,
            NEXTAUTH_SECRET: nextAuthSecret
        }
    }
}

module.exports = nextConfig
