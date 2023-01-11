<template>
	<v-row justify="center" align="center">
		<v-col cols="12" sm="8" md="6">
			<v-skeleton-loader
				v-if="!recipeOfDay.recipe"
				:loading="recipeOfDay.loading"
				class="mx-auto"
				max-height="100vh"
				type="card, list-item, table, button"></v-skeleton-loader>
			<v-card :loading="recipeOfDay.loading" v-if="recipeOfDay.recipe">
				<v-card-title>{{ recipeOfDay.title }}</v-card-title>
				<v-tabs grow>
					<v-tab @click="getOption(0)">Opção 1</v-tab>
					<v-tab @click="getOption(1)">Opção 2</v-tab>
					<v-tab @click="getOption(2)">Opção 3</v-tab>
				</v-tabs>
				<v-img :src="recipeOfDay.recipe.image">
					<template v-slot:placeholder>
						<v-row class="fill-height ma-0" align="center" justify="center">
							<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
						</v-row>
					</template>
				</v-img>
				<v-card-title class="headline">{{ recipeOfDay.recipe.name }}</v-card-title>
				<v-tabs grow>
					<v-tab>Ingredientes</v-tab>
					<v-tab>Preparação</v-tab>
					<v-tab-item>
						<v-card-text>
							<v-list>
								<v-list-item class="ingredient-item" v-for="(item, i) in recipeOfDay.recipe.ingredients" :key="i">
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
						<v-list>
							<v-list-item min-height="22" v-for="(item, i) in recipeOfDay.recipe.steps" :key="i">
								<v-card-text fluid ma-0 pa-0>
									{{ item }}
								</v-card-text>
							</v-list-item>
						</v-list>
					</v-tab-item>
				</v-tabs>
				<v-card-actions>
					<v-btn color="accent" elevation="5" fab large><v-icon large>mdi-basket-plus</v-icon></v-btn>
				</v-card-actions>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
export default {
	name: 'RecipeOfTheDay',
	props: ['recipeOfDay'],
	methods: {
		getOption(n) {
			this.$store.dispatch('store/changeSelection', n);
		},
	},
};
</script>
<style scoped>
.ingredient-item {
	max-height: 1.7rem;
	min-height: 1.2rem;
}
</style>
