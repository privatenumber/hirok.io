import fs from 'fs/promises';
import { setTimeout } from 'timers/promises';
import { cli } from 'cleye';
import {
	search as npmSearch,
	downloads as getNpmDownloads,
} from '@nodesecure/npm-registry-sdk';

type NpmPackage = {
	name: string;
	repository: string | undefined;
	description: string;
	lastPublishDate: string;
	latestVersion: string;
	downloads: Record<string, number>;
};

type LastMonth = [month: string, downloads: number];

type NpmDownloads = {
	packages: NpmPackage[];
	lastMonth: LastMonth;
	fetched: string;
};

const npmDownloadsJsonPath = './src/data/npm-downloads.json';

const getNpmDownloadsJson = async (): Promise<NpmDownloads> => {
	const fileExists = await fs.access(npmDownloadsJsonPath).then(() => true, () => false);
	if (!fileExists) {
		return {
			packages: [],
			lastMonth: ['', 0],
			fetched: '',
		};
	}

	const npmDownloadsString = await fs.readFile(npmDownloadsJsonPath, 'utf8');
	return JSON.parse(npmDownloadsString);
};

const getThisMonth = () => {
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

type MonthRange = [startDate: string, endDate: string];
const getLastMonthRange = (start: Date): MonthRange => {
	const end = new Date(start);
	end.setMonth(end.getMonth() + 1);
	end.setDate(0);

	return [
		getIsoDate(start),
		getIsoDate(end),
	];
};

const getNpmPackages = async () => {
	const npmDownloads = await getNpmDownloadsJson();

	const results = await npmSearch({
		text: 'author:hirokiosame',
		size: 250,
	});

	const npmPackages = results.objects.map(({ package: npmPackage }): NpmPackage => {
		const previousData = npmDownloads.packages.find(p => p.name === npmPackage.name);

		return {
			name: npmPackage.name,
			repository: npmPackage.links.repository,
			description: npmPackage.description,
			lastPublishDate: npmPackage.date,
			latestVersion: npmPackage.version,
			downloads: {
				...previousData?.downloads,
			},
		};
	});

	npmPackages.sort((a, b) => a.name.localeCompare(b.name));

	return npmPackages;
};

const getDownloadsForMonth = async (
	packages: NpmPackage[],
	monthRange: MonthRange,
) => {
	console.log('Downloading', monthRange);
	const monthRangeString = monthRange.join(':');
	const [monthKey] = monthRange;
	const monthDownloads = await Promise.all(packages.map(async (npmPackage) => {
		if (npmPackage.downloads[monthKey]) {
			return npmPackage.downloads[monthKey];
		}

		const downloadCount = await getNpmDownloads(npmPackage.name, monthRangeString);
		npmPackage.downloads[monthKey] = downloadCount.downloads;
		return downloadCount.downloads;
	}));

	console.log('Downloaded', monthRange);

	return monthDownloads.reduce((total, d) => total + d, 0);
};

(async () => {
	const argv = cli({
		flags: {
			range: {
				type: Number,
				alias: 'm',
				description: 'Number of months to go back to fetch',
				default: 1,
			},
		},
	});

	const packages = await getNpmPackages();
	const thisMonth = getThisMonth();

	let lastMonth: LastMonth;
	for (let i = argv.flags.range - 1; i >= 0; i -= 1) {
		const month = new Date(thisMonth);
		month.setMonth(month.getMonth() - i);
		const monthRange = getLastMonthRange(month);
		const lastMonthDownloads = await getDownloadsForMonth(packages, monthRange);

		if (i === 0) {
			lastMonth = [monthRange[0], lastMonthDownloads];
		}

		await setTimeout(1000);
	}

	const npmDownloads: NpmDownloads = {
		packages,
		lastMonth: lastMonth!,
		fetched: new Date().toISOString(),
	};

	await fs.writeFile(
		npmDownloadsJsonPath,
		`${JSON.stringify(npmDownloads, null, '\t')}\n`,
	);
})();
