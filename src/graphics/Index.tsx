import React from 'react';
import TfallSimpleStats from './components/TfallSimpleStats';
import { PlayerData } from '../types/playerdata';
import { useReplicant } from '@nodecg/react-hooks';
import { getValue } from '../types/helper';
import {motion} from 'framer-motion';

import pos01 from "./assets/awards/pos-01.png"
import pos02 from "./assets/awards/pos-02.png"
import pos03 from "./assets/awards/pos-03.png"
import pos04 from "./assets/awards/pos-04.png"
import pos05 from "./assets/awards/pos-05.png"

type Award = {
	id: string;
	asset: string;
}
const ORDERED_AWARD_IDS = ["first", "second", "third", "fourth", "fifth"];
const REWARD_SRC = [
	pos01, pos02, pos03, pos04, pos05,
];

export function Index() {
    const [player1, setPlayer1] = useReplicant<PlayerData>("player1");
    const [player2, setPlayer2] = useReplicant<PlayerData>("player2");
    const [player3, setPlayer3] = useReplicant<PlayerData>("player3");
    const [player4, setPlayer4] = useReplicant<PlayerData>("player4");
    const [player5, setPlayer5] = useReplicant<PlayerData>("player5");
	const [order, setOrder] = React.useState<Array<string>>([]);
	const [awardsType, setAwardsType] = useReplicant<Record<string, number>>("tf2AwardsType");
	const [awards, setAwards] = React.useState<Array<Award>>([]);
	
	React.useEffect(() => {
		const players = {
			"player5": player5,
			"player4": player4,
			"player3": player3,
			"player2": player2,
			"player1": player1
		};

		const idVals = Object.entries(players).map(([id, player]) => {
			const results = player?.results ?? {};
			if (Object.entries(player?.results?? {}).length == 0) {
				return [id, 120];
			}
			const best = Object.entries(results).map(([res_id, result]) => getValue(result))
				.reduce((acc, value) => Math.min(acc, value), 9999999);
			return [id, best];
		});
		idVals.sort(([id1, score1], [id2, score2]) => Number(score1) - Number(score2));

		let curAward = 0;
		let prevScore = -9999999999;
		const newAwards: Record<string, number> = {};
		let count = 0;
		for (const [_, pair] of Object.entries(idVals)) {
			const id = pair[0];
			const score = pair[1];
			if (prevScore == Number(score)) {
				newAwards[id] = curAward;
			} else {
				newAwards[id] = count;
			}
			count += 1;
			prevScore = Number(score);
			curAward = newAwards[id];
		}
		setAwardsType(newAwards);

		setOrder(idVals.map(([id, val]) => id.toString()));
	}, [player1, player2, player3, player4, player5, setAwardsType, setOrder]);

	React.useEffect(() => {
		const players = ["player1", "player2", "player3", "player4", "player5"];
		const newRewards = [];
		for (const playerId of players) {
			const playerIndex = order.indexOf(playerId);
			if (playerIndex == -1) {
				continue;
			}
			const rewardId = ORDERED_AWARD_IDS[playerIndex];
			const rewardType = awardsType?.[playerId];
			if (rewardType == undefined) {
				continue;
			}
			const newReward: Award = {
				id: rewardId,
				asset: REWARD_SRC[rewardType],
			}
			newRewards.push(newReward)
		}
		setAwards(newRewards)
	}, [order, setAwards, awardsType])

	const spring = {
		type: "spring",
		damping: 25,
		stiffness: 120,
	}

	return (
		<>
		<div style={{
			position: "absolute",
			display: "flex",
            width: 1817,
            height: 171,
			justifyContent: "space-around",
			padding: "0 100px",
		}}>
			<TfallSimpleStats id={"player1"}/>
			<TfallSimpleStats id={"player2"}/>
			<TfallSimpleStats id={"player3"}/>
			<TfallSimpleStats id={"player4"}/>
			<TfallSimpleStats id={"player5"}/>
		</div>
			<div style={{
				position: "absolute",
				display: "flex",
				justifyContent: "space-around",
            	width: 1817,
            	height: 70,
				padding: "0 150px",
				marginTop: -6,
			}}>
				{awards.map((award) => <motion.img src={award.asset} layout transition={spring} key={award.id}/>)}
			</div>
		</>
	);
}
