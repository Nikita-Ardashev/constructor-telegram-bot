import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
	sassOptions: {
		includePaths: [path.join(__dirname, 'src/styles')],
	},
	experimental: {
		optimizeCss: true,
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `${process.env.APP_URL}/api/:path*`,
			},
		];
	},
};

export default nextConfig;
