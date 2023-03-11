<template>
	<div class="a4-paper print:p-4">
		<div
			class="
			hidden
			!print:hidden
			rounded-md
			bg-blue/20
			px-6
			py-4
			mb-6
			sm:block
		"
		>
			<span class="mr-1">🖨️</span>
			Print this page on A4 paper for a condensed version.
		</div>
		<slot />
	</div>
</template>

<style>
@media print {
	* {
		@apply !color-black;
	}

	html {
		font-size: 14px;
	}

	header,
	footer {
		@apply hidden;
	}

	main {
		@apply p-0;
	}

	.prose {
		@apply max-w-none;
	}

	#app {
		min-height: auto;
	}

	h1 {
		@apply text-3xl;
	}

	h2 {
		@apply text-2xl;
	}

	h3 {
		@apply text-xl;
	}

	h4 {
		@apply text-lg;
	}

	.h1-styles {
		@apply my-0;
	}

	.h2-styles {
		@apply
			m-t-3
			p-b-2
			border-black/40;
	}

	.h3-styles {
		@apply
			m-y-1;
	}

	.h4-styles {
		@apply
			m-y-1;
	}

	p,
	ul,
	ol {
		@apply
			my-1
			leading-relaxed;
	}

	a {
		@apply color-black;
	}

	:not(pre) > code {
		@apply
			bg-transparent
			p-x-1;
	}

	.header-anchor{
		@apply hidden;
	}

	.a4-paper {
		@apply
			relative
			bg-white
			overflow-hidden
			color-gray-700;

		width: 21cm;
		height: 29cm;
	}
}
</style>
