import fs from 'fs/promises';
import { search, downloads } from '@nodesecure/npm-registry-sdk';

const getMonthFirstDay = () => {
	const date = new Date();
	date.setUTCHours(0);
	date.setUTCMinutes(0);
	date.setUTCSeconds(0);
	date.setUTCMilliseconds(0);
	date.setMonth(date.getMonth() - 1);
	date.setDate(1);
	return date;
};

const getIsoDate = (date: Date) => date.toISOString().split('T')[0];

const getLastMonthRange = () => {
	const start = getMonthFirstDay();
	const end = new Date(start);
	end.setMonth(end.getMonth() + 1);
	end.setDate(0);

	return [
		getIsoDate(start),
		getIsoDate(end),
	] as [startDate: string, endDate: string];
};

(async () => {
	const results = await search({
		text: 'author:hirokiosame',
		size: 250,
	});

	// eg. 2023-01-01:2023-01-31
	const lastMonthRange = getLastMonthRange();

	const packages = await Promise.all(
		results.objects.map(
			async ({ package: npmPackage }) => {
				const downloadCount = await downloads(npmPackage.name, lastMonthRange.join(':'));

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
		totalDownloads: packages.reduce((total, p) => total + p.downloads, 0),
		totalDownloadsMonth: lastMonthRange[0],
		fetched: results.time,
	};

	await fs.writeFile(
		'./src/data/npm-downloads.json',
		`${JSON.stringify(npmPackages, null, '\t')}\n`,
	);
})();
