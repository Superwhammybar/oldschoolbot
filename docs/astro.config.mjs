import preact from '@astrojs/preact';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

import { remarkItems } from './src/plugins/items';

// https://astro.build/config
export default defineConfig({
	vite: {
		resolve: {
			alias: {
				'@data': '../../../data'
			}
		},
		plugins: [tailwindcss()]
	},
	devToolbar: {
		enabled: false
	},
	experimental: {
		clientPrerender: true
	},
	markdown: {
		remarkPlugins: [remarkItems],
		smartypants: false,
		syntaxHighlight: false
	},
	integrations: [
		starlight({
			components: {
				Footer: './src/components/Footer.astro',
				Header: './src/components/Header.astro'
			},
			title: 'Oldschool.gg Wiki',
			favicon: 'favicon.ico',
			social: {
				github: 'https://github.com/oldschoolgg/oldschoolbot',
				discord: 'https://discord.gg/ob'
			},
			customCss: ['./src/styles/main.css', './src/fonts/font-face.css'],
			pagination: false,
			head: [
				{
					tag: 'script',
					content: `if (window.location.href.includes('/bso/')) {
window.onload = () => document.body.classList.add('bso-theme');
}`
				}
			],
			editLink: {
				baseUrl: 'https://github.com/oldschoolgg/oldschoolbot/edit/master/docs/'
			},
			sidebar: [
				{
					label: 'Getting Started',
					autogenerate: { directory: 'getting-started' },
					collapsed: false
				},
				{
					label: 'Old School Bot (OSB)',
					autogenerate: { directory: 'osb', collapsed: true },
					collapsed: false
				},
				{
					label: 'BSO',
					autogenerate: { directory: 'bso', collapsed: true },
					collapsed: false
				}
			]
		}),
		preact({ compat: true })
	]
});
