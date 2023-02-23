import { ViteSSG } from 'vite-ssg';
import NProgress from 'nprogress';
import 'uno.css'; // eslint-disable-line import/no-unresolved
import '@unocss/reset/tailwind.css';
import App from './App.vue';
import routes from '~pages'; // eslint-disable-line import/no-unresolved
import './styles.css';

export const createApp = ViteSSG(
	App,
	{
		routes,
		scrollBehavior: (to, _from, savedPosition) => {
			if (savedPosition) {
				return savedPosition;
			}

			if (to.hash) {
				return { el: to.hash };
			}

			return { top: 0 };
		},
	},
	({ router, isClient }) => {
		if (isClient) {
			router.beforeEach(() => {
				NProgress.start();
			});

			const microanalytics = 'pa' in window;

			router.afterEach((from, to) => {
				NProgress.done();

				if (microanalytics) {
					pa.track({
						name: 'navigation',
						value: JSON.stringify({
							from: from.fullPath,
							to: to.fullPath,
						}),
					});
				}
			});

			window.addEventListener('click', (event) => {
				if (!microanalytics || !event.target) {
					return;
				}

				const target = event.target as HTMLAnchorElement;
				if (target.tagName !== 'A' || !target.href) {
					return;
				}

				pa.track({
					name: 'click:link',
					value: target.href,
				});
			});
		}
	},
);

declare global {
	const pa: {
		track: (data: {
			name: string;
			value?: string;
			unit?: string;
		}) => void;
	};
}
