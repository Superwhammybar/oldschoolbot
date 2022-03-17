import getOSItem from '../../util/getOSItem';
import { DisassemblySourceGroup } from '..';

const i = getOSItem;

export const Defender: DisassemblySourceGroup = {
	name: 'Defender',
	items: [
		{ item: i('Bronze defender'), lvl: 1, partQuantity: 8 },
		{ item: i('Iron defender'), lvl: 10, partQuantity: 8 },
		{ item: i('Steel defender'), lvl: 20, partQuantity: 8 },
		{ item: i('Black defender'), lvl: 25, partQuantity: 8 },
		{ item: i('Mithril defender'), lvl: 30, partQuantity: 8 },
		{ item: i('Rune defender'), lvl: 50, partQuantity: 8 },
		{ item: i('Dragon defender'), lvl: 60, partQuantity: 8 }
	],
	parts: { base: 40, deflecting: 40, precise: 10, subtle: 10 } // Wiki doesn't contain values
};

export default Defender;
