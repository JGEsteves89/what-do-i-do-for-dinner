<template>
	<v-row justify="center" align="center">
		<v-col cols="12" sm="8" md="6">
			<v-skeleton-loader
				v-if="!recipe"
				:loading="loading"
				class="mx-auto"
				max-height="100vh"
				type="card, list-item, table, button"></v-skeleton-loader>
			<v-card :loading="loading" v-if="recipe">
				<v-card-title>Hoje</v-card-title>
				<v-img :src="recipe.image" />
				<v-card-title class="headline">{{ recipe.name }}</v-card-title>
				<v-tabs grow>
					<v-tab>Ingredientes</v-tab>
					<v-tab>Preparação</v-tab>
					<v-tab-item>
						<v-card-text>
							<v-list>
								<v-list-item min-height="22" v-for="(item, i) in recipe.ingredients" :key="i">
									<v-container fluid ma-0 pa-0>
										<v-layout row class="d-flex justify-space-between pa-0 ma-0">
											<v-flex xs8>{{ item.name }}</v-flex>
											<v-flex xs4 class="align-self-center">{{ item.qtd }} {{ item.unit }}</v-flex>
										</v-layout>
									</v-container>
								</v-list-item>
							</v-list>
						</v-card-text>
					</v-tab-item>
					<v-tab-item>
						<v-card-text>Preparação</v-card-text>
					</v-tab-item>
				</v-tabs>
				<v-card-actions>
					<v-spacer />
					<v-btn color="primary" nuxt to="/inspire">Continue</v-btn>
				</v-card-actions>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
export default {
	name: 'IndexPage',
	data() {
		return {
			loading: true,
			recipe: null,
		};
	},
	mounted() {
		console.log('Component mounted');
		this.$store.dispatch('store/fetchRecipes').then((res) => {
			this.loading = false;
			this.recipe = Object.values(res)[0];
			console.log('I got the data');
		});
	},
};
</script>
