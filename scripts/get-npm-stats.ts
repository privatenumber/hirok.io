import fs from 'fs/promises';
import { search, downloads } from '@nodesecure/npm-registry-sdk';

(async () => {
	const results = await search({
		text: 'author:hirokiosame',
		size: 250,
	});

	let downloadsStart: string; let
		downloadsEnd: string;
	const packages = await Promise.all(
		results.objects.map(
			async ({ package: npmPackage }) => {
				const downloadCount = await downloads(npmPackage.name, 'last-month');

				downloadsStart = downloadCount.start;
				downloadsEnd = downloadCount.end;

				return {
					name: npmPackage.name,
					repository: npmPackage.links.repository,
					description: npmPackage.description,
					lastPublishDate: npmPackage.date,
					latestVersion: npmPackage.version,
					downloads: downloadCount.downloads,
				};
			},
		),
	);

	packages.sort((a, b) => a.name.localeCompare(b.name));

	const npmPackages = {
		packages,
		fetched: results.time,
		totalDownloads: packages.reduce((total, p) => total + p.downloads, 0),
		downloadsRange: {
			start: downloadsStart!,
			end: downloadsEnd!,
		},
	};
	await fs.writeFile(
		'./src/data/npm-packages.json',
		`${JSON.stringify(npmPackages, null, '\t')}\n`,
	);
})();
