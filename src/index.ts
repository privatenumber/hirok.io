import { ViteSSG } from 'vite-ssg';
import NProgress from 'nprogress';
import { inject as injectAnalytics } from '@vercel/analytics';
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

			router.afterEach(() => {
				NProgress.done();
			});

			injectAnalytics();
		}
	},
);
