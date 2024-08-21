export interface FishDrop {
	itemId: string
	weight: number
	isJunk: boolean
}

export const fishDrop: FishDrop[] = [
	{
		itemId: 'fish',
		weight: 25,
		isJunk: false
	}, {
		itemId: 'tropicalFish',
		weight: 10,
		isJunk: false
	}, {
		itemId: 'pufferfish',
		weight: 5,
		isJunk: false
	}, {
		itemId: 'crab',
		weight: 2.5,
		isJunk: false
	}, {
		itemId: 'shrimp',
		weight: 2.5,
		isJunk: false
	}, {
		itemId: 'squid',
		weight: 1.7,
		isJunk: false
	}, {
		itemId: 'octopus',
		weight: 1.7,
		isJunk: false
	}, {
		itemId: 'goldenFish',
		weight: 1.4,
		isJunk: false
	}, {
		itemId: 'diamond',
		weight: 0.2,
		isJunk: false
	},
	{
		itemId: 'seagrass',
		weight: 16.67,
		isJunk: true
	},
	{
		itemId: 'shell',
		weight: 16.67,
		isJunk: true
	},
	{
		itemId: 'boot',
		weight: 16.67,
		isJunk: true
	}
]