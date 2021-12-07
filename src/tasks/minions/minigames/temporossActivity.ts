import { increaseNumByPercent, randInt } from 'e';
import { Task } from 'klasa';

import { Emoji, Events } from '../../../lib/constants';
import { getMinigameEntity, incrementMinigameScore } from '../../../lib/settings/settings';
import { getTemporossLoot } from '../../../lib/simulation/tempoross';
import { SkillsEnum } from '../../../lib/skilling/types';
import { TemporossActivityTaskOptions } from '../../../lib/types/minions';
import { skillingBoostPercent } from '../../../lib/util';
import { formatOrdinal } from '../../../lib/util/formatOrdinal';
import { handleTripFinish } from '../../../lib/util/handleTripFinish';

export default class extends Task {
	async run(data: TemporossActivityTaskOptions) {
		const { userID, channelID, quantity, rewardBoost, duration } = data;
		const user = await this.client.fetchUser(userID);
		const currentLevel = user.skillLevel(SkillsEnum.Fishing);
		const previousScore = (await getMinigameEntity(user.id)).big_chompy_bird_hunting;
		const { newScore } = await incrementMinigameScore(userID, 'tempoross', quantity);
		const kcForPet = randInt(previousScore, newScore);

		let rewardTokens = quantity * 6;
		if (rewardBoost > 0) {
			rewardTokens = Math.ceil(increaseNumByPercent(rewardTokens, rewardBoost));
		}
		const loot = getTemporossLoot(rewardTokens, currentLevel, user.bank());

		if (loot.has('Tiny tempor')) {
			this.client.emit(
				Events.ServerNotification,
				`${Emoji.TinyTempor} **${user.username}'s** minion, ${
					user.minionName
				}, just received a Tiny tempor! They got the pet on the ${formatOrdinal(
					kcForPet
				)} kill, and their Fishing level is ${currentLevel}.`
			);
		}

		let fXPtoGive = quantity * 5500 * (currentLevel / 40);
		let fBonusXP = 0;

		// Add bonus for Angler outfit
		const amountToAdd = Math.floor(fXPtoGive * (skillingBoostPercent(user, 'angler') / 100));
		fXPtoGive += amountToAdd;
		fBonusXP += amountToAdd;

		const xpStr = await user.addXP({ skillName: SkillsEnum.Fishing, amount: fXPtoGive, duration });

		const { previousCL, itemsAdded } = await user.addItemsToBank(loot, true);

		const { image } = await this.client.tasks.get('bankImage')!.generateBankImage(
			itemsAdded,
			`${rewardTokens} reward pool rolls`,
			true,
			{
				showNewCL: 1
			},
			user,
			previousCL
		);

		let output = `${user}, ${
			user.minionName
		} finished fighting Tempoross ${quantity}x times. ${xpStr.toLocaleString()}`;

		if (fBonusXP > 0) {
			output += `\n\n**Fishing Bonus XP:** ${fBonusXP.toLocaleString()}`;
		}

		handleTripFinish(
			this.client,
			user,
			channelID,
			output,
			['tempoross', [quantity], true],
			image!,
			data,
			itemsAdded
		);
	}
}
