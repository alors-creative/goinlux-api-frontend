/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/villas',
        permanent: true,
      },
    ];
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'app/_styles')],
    additionalData: `@use "variables" as *;`, // Or `@import "variables";` for legacy
  },
};

export default nextConfig;
