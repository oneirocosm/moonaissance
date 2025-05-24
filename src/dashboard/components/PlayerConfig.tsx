import React from 'react';
import { useReplicant } from '@nodecg/react-hooks';
import ControlForm from './ControlForm';
import { PlayerData, RunResult } from '../../types/playerdata';
import TimeInput from './TimeInput';
import {v4 as uuidv4} from 'uuid';

type PlayerConfigProps = {
    id: string;
}

export default function PlayerConfig(props: PlayerConfigProps) {
    const [player, setPlayer] = useReplicant<PlayerData>(props.id);
    const [order, setOrder] = React.useState<Array<string>>([]);
    const [time01, setTime01] = React.useState<string>("");
    const [time02, setTime02] = React.useState<string>("");

    const getValue = React.useCallback((result: RunResult, playerPenalty: string) => {
        const parsedTime = Number(result.time);
        let useTime = 120;
        if (!isNaN(parsedTime)) {
            useTime = parsedTime
        }

        let penalty = Math.round(Number(result.penalty));
        if (isNaN(penalty)) {
            penalty = 0;
        }

        let extraPenalty = Math.round(Number(playerPenalty));
        if (isNaN(extraPenalty)) {
            extraPenalty = 0;
        }

        const adjustedTime = useTime + penalty + extraPenalty;
        return adjustedTime;
    }, []);

    function setTime(timeText: string, id: string) {
        const oldResults = player?.results ?? {};
        const result = oldResults[id];
        if (!result) {
            return;
        }
        const newResult = {...result, time: timeText};
        const newResults = {...oldResults};
        newResults[id] = newResult;
        const newPlayer = {...player, results: newResults} as PlayerData;
        setPlayer(newPlayer);
    }

    function setPenalty(penalty: string, id: string) {
        const oldResults = player?.results ?? {};
        const result = oldResults[id];
        if (!result) {
            return;
        }
        const newResult = {...result, penalty: penalty};
        const newResults = {...oldResults};
        newResults[id] = newResult;
        const newPlayer = {...player, results: newResults} as PlayerData;
        setPlayer(newPlayer);
    };

    function setEnemies(enemies: string, id: string) {
        const oldResults = player?.results ?? {};
        const result = oldResults[id];
        if (!result) {
            return;
        }
        const newResult = {...result, enemies: enemies};
        const newResults = {...oldResults};
        newResults[id] = newResult;
        const newPlayer = {...player, results: newResults} as PlayerData;
        setPlayer(newPlayer);
    };

    function toggleReady(id: string) {
        const oldResults = player?.results ?? {};
        const result = oldResults[id];
        if (!result) {
            return;
        }
        const newResult = {...result, ready: !result.ready};
        const newResults = {...oldResults};
        newResults[id] = newResult;
        const newPlayer = {...player, results: newResults} as PlayerData;
        setPlayer(newPlayer);
    }

    function newResult() {
        const oldResults = player?.results ?? {};
        const defaultTime = '120';
        const newResult = {time: defaultTime, enemies: '0', penalty: '0', ready: false};
        const newId = uuidv4();
        const newResults = {...oldResults};
        newResults[newId] = newResult;
        const newPlayer = {...player, results: newResults} as PlayerData;
        setPlayer(newPlayer);
    }

    function deleteResult(id: string) {
        const results = player?.results ?? {};
        const newResults = {...results};
        delete newResults[id];
        const newPlayer = {...player, results: newResults} as PlayerData;
        setPlayer(newPlayer);
    }

    React.useEffect(() => {
        const idvals = Object.entries(player?.results ?? []).filter(([id, result]) => result.ready).map(([id, result]) => {
            const value = getValue(result, player?.playerPenalty ?? "0")
            return [id, value]
        });
        idvals.sort(([a_id, a_val], [b_id, b_val]) => Number(a_val) - Number(b_val))
        console.log(idvals);
        setOrder(idvals.map(([id, val]) => id.toString()));
    }, [player?.results, getValue, setOrder, player?.playerPenalty])

    React.useEffect(() => {
        if (order.length > 0) {
            setTime01(order[0]);
        } else {
            setTime01("");
        }

        if (order.length > 1) {
            setTime02(order[1]);
        } else {
            setTime02("");
        }

    }, [order, setTime01, setTime02])


    return (
        <>
            <h3>{props.id}</h3>
            <ControlForm label="Name">
                <input type="text"
                    value={player?.name ?? ""}
                    onChange={(e) => setPlayer({ ...player, name: e.target.value } as PlayerData)}
                />
            </ControlForm>
            <ControlForm label="Pronouns">
                <input type="text"
                    value={player?.pronouns ?? ""}
                    onChange={(e) => setPlayer({ ...player, pronouns: e.target.value } as PlayerData)}
                />
            </ControlForm>
            <ControlForm label="Global Penalty">
                <input type="text"
                    value={player?.playerPenalty ?? ""}
                    onChange={(e) => setPlayer({ ...player, playerPenalty: e.target.value } as PlayerData)}
                />
            </ControlForm>
            {Object.entries(player?.results ?? []).map(([id, result]) => <TimeInput result={result} key={id} id={id} setTime={setTime} setEnemies={setEnemies} setPenalty={setPenalty} deleteResult={deleteResult} toggleReady={toggleReady} top01={time01==id} top02={time02==id} playerPenalty={player?.playerPenalty ?? "0"}/>)}
            <button
                onClick={() => newResult()}
                style={{
                    marginBottom: "0.5rem",
                }}
            >
                +
            </button>
        </>
    );
}