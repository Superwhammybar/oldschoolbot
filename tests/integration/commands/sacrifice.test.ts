import { Bank } from 'oldschooljs';
import { ItemBank } from 'oldschooljs/dist/meta/types';
import { describe, expect, test } from 'vitest';

import { Emoji } from '../../../src/lib/constants';
import { mahojiClientSettingsFetch } from '../../../src/lib/util/clientSettings';
import { sacrificeCommand } from '../../../src/mahoji/commands/sacrifice';
import { createTestUser, mockClient } from '../util';

describe('Sacrifice Command', async () => {
	await mockClient();
	const user = await createTestUser();

	test('No options provided', async () => {
		await user.addItemsToBank({ items: new Bank().add('Trout').add('Coal', 10) });
		await user.runCommand(sacrificeCommand, { items: '1 trout, 10 coal' });
		const result = await user.runCommand(sacrificeCommand, {});
		expect(result).toEqual(
			`${Emoji.Incinerator} **Your Sacrifice Stats** ${Emoji.Incinerator}\n\n` +
				`**Current Minion Icon:** ${Emoji.Minion}\n` +
				'**Sacrificed Value:** 1,635 GP\n' +
				'**Unique Items Sacrificed:** 2 items'
		);
	});

	test('No items provided', async () => {
		const result = await user.runCommand(sacrificeCommand, { items: 'aaaa' });
		expect(result).toEqual('No items were provided.\nYour current sacrificed value is: 1,635 (1.64k)');
	});

	test('Successful', async () => {
		await user.addItemsToBank({ items: new Bank().add('Trout').add('Coal', 10) });
		const result = await user.runCommand(sacrificeCommand, { items: '1 trout, 10 coal' });
		expect(result).toEqual(
			'You sacrificed 10x Coal, 1x Trout, with a value of 1,635gp (1.64k). Your total amount sacrificed is now: 3,270. '
		);
		const stats = await user.fetchStats({ sacrificed_bank: true });
		expect(user.bank.equals(new Bank())).toBe(true);
		expect(new Bank(stats.sacrificed_bank as ItemBank).equals(new Bank().add('Coal', 20).add('Trout', 2))).toBe(
			true
		);
		expect(user.user.sacrificedValue).toEqual(BigInt(3270));
		const clientSettings = await mahojiClientSettingsFetch({ economyStats_sacrificedBank: true });
		expect(
			new Bank(clientSettings.economyStats_sacrificedBank as ItemBank).equals(
				new Bank().add('Coal', 20).add('Trout', 2)
			)
		).toEqual(true);
		await user.addItemsToBank({ items: new Bank().add('Trout').add('Cake') });
		const res = await user.runCommand(sacrificeCommand, { items: '1 trout, 1 cake' });
		expect(res).toEqual(
			'You sacrificed 1x Trout, 1x Cake, with a value of 206gp (206). Your total amount sacrificed is now: 3,476. '
		);
		await user.sync();
		expect(user.bank.equals(new Bank())).toBe(true);
		const stats2 = await user.fetchStats({ sacrificed_bank: true });
		expect(
			new Bank(stats2.sacrificed_bank as ItemBank).equals(new Bank().add('Coal', 20).add('Trout', 3).add('Cake'))
		).toBe(true);
		expect(user.user.sacrificedValue).toEqual(BigInt(3476));

		const clientSettings2 = await mahojiClientSettingsFetch({ economyStats_sacrificedBank: true });
		expect(
			new Bank(clientSettings2.economyStats_sacrificedBank as ItemBank).equals(
				new Bank().add('Coal', 20).add('Trout', 3).add('Cake')
			)
		).toEqual(true);
	});

	test('Cant be sac', async () => {
		await user.addItemsToBank({ items: new Bank().add('BSO dragon trophy') });
		const result = await user.runCommand(sacrificeCommand, { items: 'BSO dragon trophy' });
		expect(result).toEqual("BSO dragon trophy can't be sacrificed!");
	});
});
