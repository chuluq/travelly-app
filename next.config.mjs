/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [{ source: "/", destination: "/dashboard", permanent: false }];
  },
  transpilePackages: ["lucide-react"],
};

export default nextConfig;
