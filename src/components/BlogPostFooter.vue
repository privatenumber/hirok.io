<script setup lang="ts">
const route = useRoute();
</script>

<template>
	<div
		class="prose m-auto mt-20"
	>
		<hr>

		<div class="flex gap-8 items-center justify-center">
			<AppLink
				href="/"
				class="min-w-fit"
			>
				<img
					src="/hiroki.webp"
					class="h-28 rounded-full"
				>
			</AppLink>
			<div>
				<div class="text-xl font-medium">
					Thanks for reading! Hope you'll stick around.
				</div>
				<div class="mt-2">
					— Hiroki Osame
				</div>
				<div class="mt-1 opacity-70">
					Open source Engineer. Living in Tokyo. Working at Square.
				</div>

				<div class="mt-8 flex flex-col sm:flex-row gap-2">
					<Button
						href="https://twitter.com/privatenumbr"
						size="small"
					>
						<icon-mdi-twitter /> Follow @privatenumbr
					</Button>
					<Button
						href="https://github.com/sponsors/privatenumber"
						size="small"
						variant="custom"
						class="bg-rose-500 border-rose-500 hover:bg-rose-600"
					>
						<icon-mdi-heart /> Buy me a coffee
					</Button>
				</div>
			</div>
		</div>

		<div class="mt-16 flex justify-between text-xs">
			<div>
				<div class="text-sm font-bold">
					Have a question for me?
				</div>
				Reach out via
				<AppLink href="/contact">
					email
				</AppLink>
				or
				<AppLink href="https://twitter.com/privatenumbr">
					Twitter
				</AppLink>
			</div>

			<div>
				<div class="text-sm font-bold">
					Want to propose an edit?
				</div>
				<AppLink
					:href="`https://github.com/privatenumber/hirok.io/blob/master${route.meta.filePath}`"
				>
					Open a pull request
				</AppLink>
			</div>
		</div>
	</div>
</template>
