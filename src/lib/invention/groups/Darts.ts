import getOSItem from '../../util/getOSItem';
import { DisassemblySourceGroup } from '..';

const i = getOSItem;

export const Darts: DisassemblySourceGroup = {
	name: 'Darts',
	items: [
		{ item: i('Bronze dart'), lvl: 1, partQuantity: 8 },
		{ item: i('Bronze javelin'), lvl: 1, partQuantity: 8 },
		{ item: i('Iron dart'), lvl: 10, partQuantity: 8 },
		{ item: i('Iron javelin'), lvl: 10, partQuantity: 8 },
		{ item: i('Steel dart'), lvl: 20, partQuantity: 8 },
		{ item: i('Steel javelin'), lvl: 20, partQuantity: 8 },
		{
			item: i('Black dart'),
			lvl: 25,
			partQuantity: 8,
			special: { always: true, parts: [{ type: 'knightly', chance: 100, amount: 8 }] }
		},
		{ item: i('Mithril dart'), lvl: 30, partQuantity: 8 },
		{ item: i('Mithril javelin'), lvl: 30, partQuantity: 8 },
		{ item: i('Rune dart'), lvl: 50, partQuantity: 8 },
		{ item: i('Rune javelin'), lvl: 50, partQuantity: 8 },
		{ item: i('Dragon dart'), lvl: 60, partQuantity: 8 },
		{ item: i('Dragon javelin'), lvl: 60, partQuantity: 8 },
		{ item: i("Morrigan's javelin"), lvl: 78, partQuantity: 8 }
	],
	parts: { simple: 35, swift: 2, sharp: 3, blade: 30, spiked: 30 }
};

export default Darts;
