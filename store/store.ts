const getAuthors = () => import('~/data/recipes.json').then((m) => m.default || m);
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
interface IState {
	allRecipes: { [id: string]: Recipe } | null;
	currentRecipe: Recipe | null;
}

export const state = (): IState => ({
	allRecipes: null,
	currentRecipe: null,
});

export const getters = {
	getRecipes: (state: IState) => state.allRecipes,
};

export const mutations = {
	changeRecipes(state: IState, recipes: any) {
		console.log('mutations changeRecipes was called');
		state.allRecipes = recipes;
	},
};
export const actions = {
	async fetchRecipes({ state }: any) {
		if (state.allRecipes) return state.allRecipes;
		const data = await getAuthors();
		(this as any).commit('store/changeRecipes', data.recipes);
		return data.recipes;
	},
};
