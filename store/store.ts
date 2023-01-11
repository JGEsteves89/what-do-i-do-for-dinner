const getRecipes = () => import('~/data/recipes.json').then((m) => m.default || m);
interface Recipe {
	name: string;
	image: string;
	link: string;
	portions: number;
	ingredients: { name: string; qtd: number; unit: string }[];
	rawIngredients: {
		id: number;
		g: number;
		ml: number;
	}[];
	steps: string[];
}
interface RecipeOfTheDay {
	selected: number;
	alternatives: Recipe[];
}
interface IState {
	allRecipes: { [id: string]: Recipe } | null;
	recipesOfTheDay: RecipeOfTheDay | null;
}

export const state = (): IState => ({
	allRecipes: null,
	recipesOfTheDay: null,
});

export const getters = {
	getRecipes: (state: IState) => state.allRecipes,
	getRecipesOfTheDay: (state: IState) => state.recipesOfTheDay,
};

export const mutations = {
	changeRecipes(state: IState, recipes: any) {
		console.log('mutations changeRecipes was called');
		state.allRecipes = recipes;
	},
	changeRecipesOfTheDay(state: IState, recipesOfTheDay: any) {
		console.log('mutations changeRecipesOfTheDay was called');
		state.recipesOfTheDay = recipesOfTheDay;
	},
};
export const actions = {
	async fetchRecipes({ state }: any) {
		if (state.allRecipes) return state.allRecipes;
		const data = await getRecipes();
		(this as any).commit('store/changeRecipes', data.recipes);
		return data.recipes;
	},
	async getRecipesOfTheDay({ state }: any) {
		if (!state.allRecipes) {
			await (this as any).dispatch('store/fetchRecipes');
		}
		if (state.recipesOfTheDay) {
			return state.recipesOfTheDay;
		}
		const list = Object.values(state.allRecipes);
		const currentDayOfMonth = new Date().getDate();
		const currentMonth = new Date().getMonth();
		const todayRandomIndex = Math.floor((list.length / 365 / 3) * (currentDayOfMonth + currentMonth * 30));
		const alternatives = [];
		for (let i = 0; i < 3; i++) {
			alternatives.push(list[todayRandomIndex + i * 365]);
		}
		const recipesOfTheDay = { alternatives, selected: 0 };
		(this as any).commit('store/changeRecipesOfTheDay', recipesOfTheDay);
		return recipesOfTheDay;
	},
	async changeSelection({ state }: any, n: number) {
		if (!state.allRecipes) {
			await (this as any).dispatch('store/fetchRecipes');
		}
		if (!state.recipesOfTheDay) {
			await (this as any).dispatch('store/getRecipesOfTheDay');
		}
		const copy = { ...state.recipesOfTheDay };
		copy.selected = n;
		console.log('Changing selected to', n);
		(this as any).commit('store/changeRecipesOfTheDay', copy);
	},
};
