import React from 'react';
import { useReplicant } from '@nodecg/react-hooks';
import { PlayerData, RunResult } from '../../types/playerdata';
import TweenTime from './TweenTime';

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

export default function TfallSimpleStats(props: PlayerBlockProps) {
    const [player, setPlayer] = useReplicant<PlayerData>(props.id);
    const [order, setOrder] = React.useState<Array<string>>([]);
    const [bestResult, setBestResult] = React.useState<RunResult>({time: '120', enemies: '0', penalty: '0', ready: true});

    const getValue = React.useCallback((result: RunResult) => {
        const parsedTime = parseNum(result.time, 120);

        const penalty = parseNum(result.penalty)

        const adjustedTime = parsedTime + penalty;
        return adjustedTime;
    }, []);

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
            bestResult = player?.results[id] || {time: '120', enemies: '0', penalty: '0', ready: true};
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
            marginBottom: "5px",
            marginTop: "auto",
        }}
        >
            <div style={{display: "flex",
                alignItems: "center",
                marginBottom: "10px",
            }}>
                <h1 style={{fontSize: "64px"}}>
                    {player?.name}
                </h1>
                &nbsp;
                <h4 style={{fontSize: 17}}>{formatPronouns(player?.pronouns)}</h4>
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
                <TweenTime value={parseNum(bestResult.penalty, 0)} posSign={true} />
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
                <TweenTime value={parseNum(bestResult.time, 120) + parseNum(bestResult.penalty, 0)}/>
                </h2 >
            </div>
        </div>
    )
}