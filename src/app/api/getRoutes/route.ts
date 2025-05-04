import { NextResponse } from 'next/server';
import { readdir } from 'fs/promises';
import path from 'path';

async function GET() {
	try {
		const appDirectory = path.join(process.cwd(), 'src/app');
		console.log('Looking for routes in:', appDirectory);

		const routes = await getRoutes(appDirectory);

		return NextResponse.json({ routes });
	} catch (error) {
		console.error('Error fetching routes:', error);
		return NextResponse.json(
			{ error: `Failed to fetch routes: ${error}` },
			{ status: 500 },
		);
	}
}

async function getRoutes(directory: string, prefix = ''): Promise<string[]> {
	const items = await readdir(directory, { withFileTypes: true });
	const routes: string[] = [];

	for (const item of items) {
		if (item.name.startsWith('_') || item.name.startsWith('.') || item.name === 'api') {
			continue;
		}

		const fullPath = path.join(directory, item.name);
		const routeName = prefix ? `${prefix}/${item.name}` : `/${item.name}`;

		if (item.isDirectory()) {
			const subRoutes = await getRoutes(fullPath, routeName);
			routes.push(...subRoutes);
		} else if (item.name === 'page.tsx' || item.name === 'page.js') {
			const cleanRoute = routeName
				.replace(/\/page\.(tsx|js)$/, '')
				.replace(/\\/g, '/');

			routes.push(cleanRoute === '' ? '/' : cleanRoute);
		}
	}

	return routes;
}

export { GET };
