/** @type {import('next').NextConfig} */

const nextConfig = () => {
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
            NEXTAUTH_URL: "http://localhost:3000",
            NEXTAUTH_SECRET: "ZkhRjxaMTpibWO2fomRDP9tjczKD61Q6r23RH8roJZ8=",
            DB_USERNAME: "dev_user",
            DB_PASSWORD: "X002HVKzcSEuO4Yp",
            DB_NAME: "dev-ecto-db"
        }
    }
}

module.exports = nextConfig
