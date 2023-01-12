<template>
	<v-list>
		<v-list-item-group>
			<v-list-item v-for="(item, i) in shoppingList" :key="item.name">
				<v-list-item-action>
					<v-checkbox :value="item.active" @click="toggle(i)"></v-checkbox>
				</v-list-item-action>

				<v-list-item-content>
					<v-list-item-title>{{ item.name }}</v-list-item-title>
					<v-list-item-subtitle>{{ item.qtd.map((q) => q.qtd + ' ' + q.unit).join(' + ') }}</v-list-item-subtitle>
					<v-divider></v-divider>
				</v-list-item-content>
				<v-list-item-action>
					<v-btn icon @click="shoppingList.splice(i, 1)"><v-icon>mdi-delete</v-icon></v-btn>
				</v-list-item-action>
			</v-list-item>
		</v-list-item-group>
	</v-list>
</template>

<script>
export default {
	name: 'Shopping',
	data() {
		return { internalList: [] };
	},
	methods: {
		toggle(i) {
			this.internalList[i].active = !this.internalList[i].active;
		},
	},
	computed: {
		shoppingList() {
			return this.internalList.sort((a, b) => (a.active ? 1 : -1) - (b.active ? 1 : -1));
		},
	},
	mounted() {
		const list = JSON.parse(JSON.stringify(this.$store.getters['store/getShoppingList']));
		for (const item of list) {
			item.active = false;
		}
		this.internalList = list;
	},
};
</script>
<style scoped></style>
