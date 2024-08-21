interface Item {
	weight: number,
	[key: string]: any
}

export function getWeightedRandomItem<T extends Item>(items: T[]): T {
    const weights = items.reduce((acc, item, i) => {
        acc.push(item.weight + (acc[i - 1] ?? 0));
        return acc;
    }, [] as number[]);
    const random = Math.random() * (weights.at(-1) ?? 0);
    return items[weights.findIndex((weight) => weight > random)];
}