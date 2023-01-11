<template>
	<RecipeOfDay :recipeOfDay="recipeOfDay"></RecipeOfDay>
</template>

<script>
export default {
	name: 'IndexPage',
	data() {
		return {
			recipeOfDay: {
				title: 'Hoje',
				loading: true,
				recipe: null,
				alternatives: [],
			},
		};
	},
	methods: {
		getRecipeData() {
			this.$store.dispatch('store/fetchRecipes').then((res) => {
				this.recipeOfDay.loading = false;
				const list = Object.values(res);
				console.log(list.length);
				const todayRandomIndex = Math.floor((list.length / 365 / 3) * (new Date().getDate() + new Date().getMonth() * 30));
				for (let i = 0; i < 3; i++) {
					this.recipeOfDay.alternatives.push(list[todayRandomIndex + i * 365]);
				}
				this.recipeOfDay.recipe = this.recipeOfDay.alternatives[0];
				console.log('I got the data');
				console.log('Recipes of the day', this.recipeOfDay);
			});
		},
	},
	mounted() {
		console.log('Component mounted');
		this.getRecipeData();
	},
};
</script>
