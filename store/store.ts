const getRecipes = (day: number) => import('~/data/' + day + '.json').then((m) => m.default || m);
const deepCopy = (object: any) => JSON.parse(JSON.stringify(object));
export const state = (): any => ({
	recipesOfTheDays: {},
});

export const getters = {
	getRecipesOfTheDays: (state: any) => state.recipesOfTheDays,
};

export const mutations = {
	changeRecipesOfTheDays(state: any, recipesOfTheDays: any) {
		//console.log('mutations changeRecipesOfTheDay was called');
		state.recipesOfTheDays = recipesOfTheDays;
	},
};

export const actions = {
	async getRecipesOfTheDays({ state }: any, date: any) {
		//console.log('Store getRecipesOfTheDays started', onDeactivated, new Date().getSeconds());
		if (state.recipesOfTheDays[date.toDateString()]) return;
		const start: any = new Date(date.getFullYear(), 0, 0);
		const diff = date - start;
		const oneDay = 1000 * 60 * 60 * 24;
		const day = Math.max(Math.min(Math.floor(diff / oneDay), 365), 0);
		const todaysRecipes = await getRecipes(day);
		const alternatives: any[] = Object.values(todaysRecipes);
		for (const alternative of alternatives) {
			alternative.defaultPortions = alternative.portions;
		}
		const recipesOfTheDay = { alternatives, selected: 0, date };
		const copy = deepCopy(state.recipesOfTheDays);
		copy[date.toDateString()] = recipesOfTheDay;
		//console.log('Store getRecipesOfTheDays commit', new Date().getSeconds());
		(this as any).commit('store/changeRecipesOfTheDays', copy);
	},
	async changeSelection({ state }: any, info: any) {
		//console.log('Store changeSelection started', info, new Date().getSeconds());
		const date = new Date(info.date).toDateString();
		//console.log('changeSelection called with', info);
		if (!state.recipesOfTheDays[date]) {
			await (this as any).dispatch('store/getRecipesOfTheDay');
		}
		const copy = deepCopy(state.recipesOfTheDays);
		copy[date].selected = info.n;
		//console.log('Changing selected to', info.n);
		//console.log('Store changeSelection commit', new Date().getSeconds());
		(this as any).commit('store/changeRecipesOfTheDays', copy);
	},
	async setPortions({ state }: any, info: any) {
		//console.log('Store setPortions started', info, new Date().getSeconds());
		const date = new Date(info.date).toDateString();
		if (!state.recipesOfTheDays) {
			await (this as any).dispatch('store/getRecipesOfTheDay');
		}
		const copy = deepCopy(state.recipesOfTheDays);
		copy[date].alternatives[copy[date].selected].portions = info.portions;
		//console.log('Changing portions to', info.portions);
		//console.log('Store setPortions commit', new Date().getSeconds());
		(this as any).commit('store/changeRecipesOfTheDays', copy);
	},
};
