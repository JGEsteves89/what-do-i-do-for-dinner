<template>
	<v-window v-model="selected">
		<v-window-item v-for="(recipe, i) in recipesOfDays" :key="i">
			<RecipeOfDay :recipeOfDay="recipe"></RecipeOfDay>
			<v-row class="d-flex flex-row flex-nowrap justify-space-between py-5">
				<v-btn text @click="selectPage(selected - 1)">
					<v-icon>mdi-chevron-left</v-icon>
				</v-btn>
				<v-slide-group class="maxw-70" v-model="selected">
					<v-slide-item v-for="(recipe, n) in recipesOfDays" :key="n" v-slot="{ active, toggle }">
						<v-btn class="mx-2" :input-value="active" active-class="purple white--text" depressed rounded @click="toggle">
							{{ new Date(recipe.date).toDateString() }}
						</v-btn>
					</v-slide-item>
				</v-slide-group>
				<v-btn text @click="selectPage(selected + 1)">
					<v-icon>mdi-chevron-right</v-icon>
				</v-btn>
			</v-row>
		</v-window-item>
	</v-window>
</template>

<script>
export default {
	name: 'IndexPage',
	data() {
		return { selected: 0 };
	},
	computed: {
		recipesOfDays() {
			const recipesOfTheDays = this.$store.getters['store/getRecipesOfTheDays'];
			console.log('recipesOfDays returned', recipesOfTheDays);
			const daysArray = [];
			for (const recipesOfTheDay of Object.values(recipesOfTheDays)) {
				daysArray.push({
					loading: false,
					recipe: recipesOfTheDay.alternatives[recipesOfTheDay.selected],
					alternatives: recipesOfTheDay.alternatives,
					date: recipesOfTheDay.date,
				});
			}
			return daysArray;
		},
	},
	methods: {
		selectPage(n) {
			n = Math.max(n, 0);
			n = Math.min(n, 2);
			if (n === this.recipesOfDays.length) {
				this.$store.dispatch('store/getRecipesOfTheDays', this.addDays(new Date(), n)).then(() => {
					this.selected = n;
				});
			} else {
				this.selected = n;
			}
		},
		addDays(date, n) {
			date.setDate(date.getDate() + n);
			return date;
		},
	},
	mounted() {
		console.log('Component mounted');
		this.$store.dispatch('store/getRecipesOfTheDays', new Date());
	},
};
</script>
<style scoped>
.maxw-70 {
	max-width: 70% !important;
}
</style>
