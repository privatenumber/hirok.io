import fs from 'fs/promises';
import { search, downloads } from '@nodesecure/npm-registry-sdk';

(async () => {
	const results = await search({
		text: 'author:hirokiosame',
		size: 250,
	});

	const npmPackages = await Promise.all(
		results.objects.map(
			async ({ package: npmPackage }) => {
				const downloadCount = await downloads(npmPackage.name, 'last-month');

				return {
					name: npmPackage.name,
					repository: npmPackage.links.repository,
					date: npmPackage.date,
					latestVersion: npmPackage.version,
					downloads: downloadCount.downloads,
				};
			},
		),
	);

	npmPackages.sort((a, b) => a.name.localeCompare(b.name));

	await fs.writeFile(
		'./data/npm-packages.json',
		JSON.stringify(npmPackages, null, '\t'),
	);
})();
