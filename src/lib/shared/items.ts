enum ItemRarity {
	Common = 'common',
	Uncommon = 'uncommon',
	Rare = 'rare',
	VeryRare = 'veryRare',
	Epic = 'epic',
	Legendary = 'legendary'
}

interface ItemData {
	id: string
	rarity?: ItemRarity
	price?: number
	useable?: boolean
}

export class Item {
	id: string
	rarity: ItemRarity
	price: number
	usable: boolean

	constructor(data: ItemData) {
		this.id = data.id
		this.rarity = data.rarity ?? ItemRarity.Common
		this.price = data.price ?? 0
		this.usable = data.useable ?? false
	}

	get sellable() {
		return Boolean(this.price)
	}
}

const itemsData: ItemData[] = [
	{
		id: 'fish',
		price: 4
	},
	{
		id: 'tropicalFish',
		price: 8
	},
	{
		id: 'pufferfish',
		price: 10
	},
	{
		id: 'squid',
		price: 50
	},
	{
		id: 'octopus',
		price: 55
	},
	{
		id: 'envelope',
		useable: true
	},
	{
		id: 'shrimp',
		price: 16
	},
	{
		id: 'goldenFish',
		price: 120
	},
	{
		id: 'crab',
		price: 16
	},
	{
		id: 'diamond',
		price: 1000
	}
]

export const items = new Map<string, Item>(
	itemsData.map((data) => [data.id, new Item(data)])
)
