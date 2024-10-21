/** @type {import('next').NextConfig} */

import path from 'path';

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'styles')],
  },
  images: {
    domains: ['softstar.s3.amazonaws.com'], // Adicione o domínio da S3 aqui
  },
};

export default nextConfig;
