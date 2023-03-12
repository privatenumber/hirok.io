import fs from 'fs/promises';
import { graphql } from '@octokit/graphql';
import { gql } from 'code-tag';

type PageInfo = {
	endCursor: string;
	hasNextPage: boolean;
};

type Repositories = {
	edges: {
		node: {
			nameWithOwner: string;
			stargazers: {
				totalCount: number;
			};
		};
	}[];
	pageInfo: PageInfo;
};

const { GITHUB_TOKEN } = process.env;

const getStarsPage = async (cursor: string) => graphql<{
	viewer: {
		repositories: Repositories;
	};
}>(
	gql`
		query {
			viewer {
				repositories(
					first: 100,
					isFork: false,
					privacy: PUBLIC,
					orderBy: {
						field: STARGAZERS,
						direction: DESC,
					},
					${cursor ? `after: "${cursor}"` : ''}
				) {
					edges {
						node {
							nameWithOwner,
							stargazers {
								totalCount,
							},
						},
					},
					pageInfo {
						endCursor,
						hasNextPage,
					},
				}
			}
		}
	`,
	{
		headers: {
			authorization: `token ${GITHUB_TOKEN}`,
		},
	},
);

const getAllStars = async () => {
	const allRepositories: Record<string, number> = {};
	let pageInfo: PageInfo | undefined;
	do {
		const results = await getStarsPage(pageInfo?.endCursor ?? '');
		const { repositories } = results.viewer;

		for (const node of repositories.edges) {
			allRepositories[node.node.nameWithOwner] = node.node.stargazers.totalCount;
		}

		pageInfo = repositories.pageInfo;
	} while (pageInfo.hasNextPage);

	return allRepositories;
};

(async () => {
	const data = {
		repositories: await getAllStars(),
		fetched: new Date(),
	};

	await fs.writeFile(
		'./src/data/github-stars.json',
		`${JSON.stringify(data, null, '\t')}\n`,
	);
})();
