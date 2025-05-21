import React from 'react';
import { useReplicant } from '@nodecg/react-hooks';
import { PlayerData, RunResult } from '../../types/playerdata';

type PlayerBlockProps = {
    id: string;
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

function formatTime(totalSeconds: number, posSign: boolean = false) {
    const minutes = Math.floor(Math.abs(totalSeconds) / 60);
    const seconds = Math.floor(Math.abs(totalSeconds) % 60);
    const decimal = Math.floor((Math.abs(totalSeconds) - 60*minutes - seconds) * 100);

    let signStr = ""
    if (totalSeconds < 0){
        signStr = "-"
    } else if (posSign) {
        signStr = "+"
    }

    return `${signStr}${minutes.toString()}:${seconds.toString().padStart(2, "0")}.${decimal.toString().padStart(2, "0")}`;
}

export default function TfallDetailedStats(props: PlayerBlockProps) {
    const [player, setPlayer] = useReplicant<PlayerData>(props.id);
    const [order, setOrder] = React.useState<Array<string>>([]);
    const [bestResult, setBestResult] = React.useState<RunResult>({time: '120', enemies: '0', penalty: '0'});

    const getValue = React.useCallback((result: RunResult) => {
        const parsedTime = parseNum(result.time, 120);

        const penalty = parseNum(result.penalty)

        const adjustedTime = parsedTime + penalty;
        return adjustedTime;
    }, []);

    React.useEffect(() => {
        const idvals = Object.entries(player?.results ?? []).map(([id, result]) => {
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
            bestResult = player?.results[id] as RunResult || {time: '120', enemies: '0', penalty: '0'};
        } else {
            bestResult = {time: '120', enemies: '0', penalty: '0'};
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
            color: "#d4b30e",
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
                {formatTime(parseNum(bestResult.time, 120) - 2 * parseNum(bestResult.enemies))}
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
                {`${formatTime(2 * parseNum(bestResult.enemies), true)}`}
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
                {`${formatTime(parseNum(bestResult.time, 120))}`}
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
                {`${formatTime(parseNum(bestResult.penalty, 0), true)}`}
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
                {`${formatTime(parseNum(bestResult.time, 120) + parseNum(bestResult.penalty, 0))}`}
                </h2 >
            </div>
        </div>
    )
}
