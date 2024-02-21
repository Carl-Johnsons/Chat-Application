/** @type {import('next').NextConfig} */
// import dotenv from 'dotenv';
// dotenv.config();

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    }
}

export default nextConfig