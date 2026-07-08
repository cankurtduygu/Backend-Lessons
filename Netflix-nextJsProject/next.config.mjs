/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
    ],
  },
};
// nextConfig.js deki Image yi kullanacaksak dışarıdan aldığımız bütün resimlerin yollarını buraya yazmalıyız
export default nextConfig;
