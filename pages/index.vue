<template>
	<v-window v-model="selected">
		<v-window-item v-for="(recipe, i) in recipesOfDays" :key="i">
			<v-row class="d-flex flex-row flex-nowrap justify-space-between py-5">
				<v-btn :disabled="selected === 0" text @click="selectPage(selected - 1)">
					<v-icon>mdi-chevron-left</v-icon>
				</v-btn>
				<v-slide-group class="maxw-70" v-model="selected">
					<v-slide-item v-for="(recipe, n) in recipesOfDays" :key="n" v-slot="{ active, toggle }">
						<v-btn class="mx-2" :input-value="active" active-class="purple white--text" depressed rounded @click="toggle">
							{{ getDayString(recipe.date) }}
						</v-btn>
					</v-slide-item>
				</v-slide-group>
				<v-btn :disabled="selected === maxDays" text @click="selectPage(selected + 1)">
					<v-icon v-if="selected === recipesOfDays.length - 1">mdi-plus</v-icon>
					<v-icon v-else>mdi-chevron-right</v-icon>
				</v-btn>
			</v-row>
			<RecipeOfDay :recipeOfDay="recipe"></RecipeOfDay>
		</v-window-item>
	</v-window>
</template>

<script>
export default {
	name: 'IndexPage',
	data() {
		return { selected: 0, maxDays: 3 };
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
			n = Math.min(n, this.maxDays);
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
		getDayString(date) {
			if (new Date().toDateString() === new Date(date).toDateString()) {
				return 'Hoje';
			} else if (this.addDays(new Date(), 1).toDateString() === new Date(date).toDateString()) {
				return 'Amanhã';
			} else if (this.addDays(new Date(), 2).toDateString() === new Date(date).toDateString()) {
				return 'Depois de manhã';
			} else if (this.addDays(new Date(), 3).toDateString() === new Date(date).toDateString()) {
				return 'Depois depois de manhã';
			}
			return new Date(date).toStringDate();
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
