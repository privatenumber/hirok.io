<script setup lang="ts">
let isSending = $ref(false);
let name = $ref('');
let email = $ref('');
let message = $ref('');

const sendMessage = async () => {
	isSending = true;

	const body = new FormData();
	body.append('name', name);
	body.append('email', email);
	body.append('message', message);
	body.append('access_key', '01766d79-8da6-4752-a79f-48ed42a1631f');

	const fetching = await fetch(
		'https://api.web3forms.com/submit',
		{
			method: 'POST',
			body,
		},
	);

	const response = await fetching.json();

	if (response.success) {
		// show popup
	}

	name = '';
	email = '';
	message = '';
	isSending = false;
};

</script>

<template>
	<div class="mx-auto">
		<form @submit.prevent="sendMessage">
			<div
				class="
				flex
				flex-wrap
				md:flex-nowrap
				gap-4
				my-4
			"
			>
				<label class="w-full">
					<div class="label">Name</div>
					<input
						v-model="name"
						class="w-full"
						type="text"
						required
						:disabled="isSending"
						placeholder="Your name"
					>
				</label>

				<label class="w-full">
					<div class="label">Email</div>
					<input
						v-model="email"
						class="w-full"
						type="email"
						required
						:disabled="isSending"
						placeholder="your@email.com"
					>
				</label>
			</div>

			<label class="block my-5">
				<div class="label">Message</div>
				<textarea
					v-model="message"
					class="w-full"
					placeholder="Hey there, can I ask you a question?"
					:disabled="isSending"
					required
				/>
			</label>

			<div class="flex flex-row-reverse">
				<Button
					title="Send email"
					type="submit"
					:disabled="isSending"
				>
					<template v-if="isSending">
						<Spinner
							v-if="isSending"
							class="w-4 m-r-2"
						/>

						Sending
					</template>
					<template v-else>
						<icon-mdi:send
							class="inline m-r-2"
						/>

						Send
					</template>
				</Button>
			</div>
		</form>
	</div>
</template>
