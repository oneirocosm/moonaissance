import React from 'react';
import { useReplicant } from '@nodecg/react-hooks';
import { PlayerData, RunResult } from '../../types/playerdata';
import TweenTime from './TweenTime';

import pos01 from "../assets/awards/pos-01.png"
import pos02 from "../assets/awards/pos-02.png"
import pos03 from "../assets/awards/pos-03.png"
import pos04 from "../assets/awards/pos-04.png"
import pos05 from "../assets/awards/pos-05.png"

const REWARD_SRC = [
	pos01, pos02, pos03, pos04, pos05,
];

type PlayerBlockProps = {
    id: string;
}

function awardSrc(rewardType: Record<string, number>, id: string) {
    const index = rewardType[id];
    return REWARD_SRC[index];
}

function parseNum(num: string, backup: number = 0) {
    let out = Number(num);
    if (isNaN(out)) {
        return backup;
    }
    return out;
}

function formatPronouns(pronouns: string | undefined) {
    if (!pronouns) {
        return "";
    } else {
        return `(${pronouns})`;
    }
}

export default function TfallDetailedStats(props: PlayerBlockProps) {
    const [player, setPlayer] = useReplicant<PlayerData>(props.id);
    const [order, setOrder] = React.useState<Array<string>>([]);
    const [bestResult, setBestResult] = React.useState<RunResult>({time: '120', enemies: '0', penalty: '0', ready: true});
	const [awardsType, setAwardsType] = useReplicant<Record<string, number>>("tf2AwardsType");

    const getValue = React.useCallback((result: RunResult) => {
        const parsedTime = parseNum(result.time, 120);

        const penalty = parseNum(result.penalty) + parseNum(player?.playerPenalty ?? "0")

        const adjustedTime = parsedTime + penalty;
        return adjustedTime;
    }, [player?.playerPenalty]);

    React.useEffect(() => {
        const idvals = Object.entries(player?.results ?? []).filter(([id, result]) => result.ready).map(([id, result]) => {
            const value = getValue(result)
            return [id, value]
        });
        idvals.sort(([a_id, a_val], [b_id, b_val]) => Number(a_val) - Number(b_val))
        console.log(idvals);
        setOrder(idvals.map(([id, val]) => id.toString()));
    }, [player?.results, getValue, setOrder])

    React.useEffect(() => {
        let bestResult: RunResult;
        if (order.length > 0) {
            const id = order[0];
            bestResult = player?.results[id] as RunResult || {time: '120', enemies: '0', penalty: '0', ready: true};
        } else {
            bestResult = {time: '120', enemies: '0', penalty: '0', ready: true};
        }
        setBestResult(bestResult)

    }, [order, setBestResult])

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            fontFamily: "Metronic",
            fontWeight: 600,
            color: "white",
            marginLeft: "40px",
            marginRight: "auto",
            fontSize: "24px",
        }}
        >
            <div style={{display: "flex",
                alignItems: "center",
            }}>
                <h1 style={{fontSize: "64px"}}>
                    {player?.name}
                </h1>
                &nbsp;
                <h4>{formatPronouns(player?.pronouns)}</h4>
            </div>
            <div style={{display: "flex",
                alignItems: "center",
                marginBottom: "30px",
            }}>
                <h3 style={{
                }}
                >
                Raw Time:&nbsp;
                </h3 >

                <h4 style={{
                }}
                >
                <TweenTime value={parseNum(bestResult.time, 120) - 2 * parseNum(bestResult.enemies)}/>
                </h4 >
            </div>
            <div style={{display: "flex", alignItems: "center"}}>
                <h4 style={{
                    fontSize: 17,
                }}
                >
                In-game penalty:&nbsp;
                </h4 >

                <h4 style={{
                    fontSize: 17
                }}
                >
                <TweenTime value={2 * parseNum(bestResult.enemies)} posSign={true} />
                </h4 >
            </div>
            <div style={{display: "flex",
                alignItems: "center",
                marginBottom: "30px",
            }}>
                <h3 style={{
                }}
                >
                In-game time:&nbsp;
                </h3 >

                <h3 style={{
                }}
                >
                <TweenTime value={parseNum(bestResult.time, 120)} />
                </h3 >
            </div>
            <div style={{display: "flex", alignItems: "center"}}>
                <h4 style={{
                    fontSize: 17,
                }}
                >
                Modifier:&nbsp;
                </h4 >

                <h4 style={{
                    fontSize: 17,
                }}
                >
                <TweenTime value={parseNum(bestResult.penalty, 0) + parseNum(player?.playerPenalty ?? "0")} posSign={true}/>
                </h4 >
            </div>
            <div style={{display: "flex", alignItems: "center"}}>
                <h2 style={{
                }}
                >
                Final Time:&nbsp;
                </h2 >

                <h2 style={{
                }}
                >
                <TweenTime value={parseNum(bestResult.time, 120) + parseNum(bestResult.penalty, 0) + parseNum(player?.playerPenalty ?? "0")} />
                </h2 >
            </div>
            <img src={awardSrc({...awardsType}, props.id)} style={{
                position: "absolute",
                top: 30,
                left: 320,
            }} />
        </div>
    )
}
