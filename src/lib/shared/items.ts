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
		id: '01',
		price: 25
	},
	{
		id: '02',
		price: 25
	},
	{
		id: '03',
		price: 25
	},
	{
		id: '04',
		price: 25
	},
	{
		id: '05',
		price: 25
	},
	{
		id: '06',
		price: 25
	},
	{
		id: '07',
		price: 25
	},
	{
		id: '09',
		price: 25
	},
	{
		id: '20',
		price: 25
	},
	{
		id: '21',
		price: 25
	},
	{
		id: '22',
		price: 25
	},
	{
		id: '23',
		price: 25
	},
	{
		id: '40',
		price: 25
	},
	{
		id: '41',
		price: 25
	},
	{
		id: '51',
		price: 25
	},
	{
		id: '60',
		price: 25
	},
	{
		id: '61',
		price: 25
	},
	{
		id: '70',
		price: 25
	},
	{
		id: '71',
		price: 25
	},
	{
		id: '72',
		price: 25
	},
	{
		id: '73',
		price: 25
	},
	{
		id: '74',
		price: 25
	},
	{
		id: '75',
		price: 25
	},
	{
		id: '76',
		price: 25
	},
	{
		id: '77',
		price: 25
	},
	{
		id: '78',
		price: 25
	},
	{
		id: '79',
		price: 25
	},
	{
		id: '80',
		price: 25
	},
	{
		id: '81',
		price: 25
	},
	{
		id: '82',
		price: 25
	},
	{
		id: '83',
		price: 25
	},
	{
		id: '84',
		price: 25
	},
	{
		id: '85',
		price: 25
	},
	{
		id: '90',
		price: 25
	},
	{
		id: '91',
		price: 25
	},
	{
		id: '92',
		price: 25
	},
	{
		id: '95',
		price: 25
	},
	{
		id: '96',
		price: 25
	},
	{
		id: '97',
		price: 25
	},
	{
		id: '98',
		price: 25
	}
]

export const items = new Map<string, Item>(itemsData.map((data) => [data.id, new Item(data)]))
