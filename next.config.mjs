/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true
    },
    reactStrictMode: false,
    swcMinify: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "scontent.fdel72-1.fna.fbcdn.net",
            },
            {
                protocol: 'https',
                hostname: 'www.travelslake.com',
            }
        ]
    },
    env: {
        SITE_URL: 'http://localhost:3000/',
        SITE_NAME: 'Fly States',
        api_path: 'http://151.106.26.194:8029/api',
        cdn_path: "https://www.travelslake.com/airlinelogo",
        tscdn_path: "https://www.travelslake.com",
    },
};

export default nextConfig;
