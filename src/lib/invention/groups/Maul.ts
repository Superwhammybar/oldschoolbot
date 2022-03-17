import getOSItem from '../../util/getOSItem';
import { DisassemblySourceGroup } from '..';

const i = getOSItem;

export const Maul: DisassemblySourceGroup = {
	name: 'Maul',
	items: [
		{ item: i('Barrelchest anchor'), lvl: 1, partQuantity: 12 },
		{ item: i('Gadderhammer'), lvl: 1, partQuantity: 12 },
		{ item: i('Golden hammer'), lvl: 1, partQuantity: 12 },
		{ item: i('Tzhaar-ket-om'), lvl: 60, partQuantity: 12 }
	],
	parts: { plated: 30, strong: 2, head: 30, base: 35, heavy: 3 }
};

export default Maul;
