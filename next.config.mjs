/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
    ],
  },
  redirects: async () => {
    return [{ source: "/", destination: "/dashboard", permanent: false }];
  },
};

export default nextConfig;
