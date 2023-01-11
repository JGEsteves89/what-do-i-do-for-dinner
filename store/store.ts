const getRecipes = (day: number) => import('~/data/' + day + '.json').then((m) => m.default || m);
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
	recipesOfTheDay: RecipeOfTheDay | null;
}

export const state = (): IState => ({
	recipesOfTheDay: null,
});

export const getters = {
	getRecipesOfTheDay: (state: IState) => state.recipesOfTheDay,
};

export const mutations = {
	changeRecipesOfTheDay(state: IState, recipesOfTheDay: any) {
		console.log('mutations changeRecipesOfTheDay was called');
		state.recipesOfTheDay = recipesOfTheDay;
	},
};
export const actions = {
	async getRecipesOfTheDay({ state }: any) {
		if (state.recipesOfTheDay) {
			return state.recipesOfTheDay;
		}
		const now: any = new Date();
		const start: any = new Date(now.getFullYear(), 0, 0);
		const diff = now - start;
		const oneDay = 1000 * 60 * 60 * 24;
		const day = Math.max(Math.min(Math.floor(diff / oneDay), 365), 0);
		const todaysRecipes = await getRecipes(day);
		const alternatives = Object.values(todaysRecipes);
		const recipesOfTheDay = { alternatives, selected: 0 };
		(this as any).commit('store/changeRecipesOfTheDay', recipesOfTheDay);
		return recipesOfTheDay;
	},
	async changeSelection({ state }: any, n: number) {
		if (!state.recipesOfTheDay) {
			await (this as any).dispatch('store/getRecipesOfTheDay');
		}
		const copy = { ...state.recipesOfTheDay };
		copy.selected = n;
		console.log('Changing selected to', n);
		(this as any).commit('store/changeRecipesOfTheDay', copy);
	},
};
