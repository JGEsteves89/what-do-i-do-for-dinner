<template>
	<RecipeOfDay :recipeOfDay="recipeOfDay"></RecipeOfDay>
</template>

<script>
export default {
	name: 'IndexPage',
	computed: {
		recipeOfDay() {
			const recipesOfTheDay = this.$store.getters['store/getRecipesOfTheDay'];
			console.log('Computed recipesOfTheDay', recipesOfTheDay);
			if (!recipesOfTheDay) {
				return {
					title: 'Hoje',
					loading: true,
					recipe: null,
					alternatives: [],
				};
			}
			return {
				title: 'Hoje',
				loading: false,
				recipe: recipesOfTheDay.alternatives[recipesOfTheDay.selected],
				alternatives: recipesOfTheDay.alternatives,
			};
		},
	},
	mounted() {
		console.log('Component mounted');
		this.$store.dispatch('store/getRecipesOfTheDay');
	},
};
</script>
