import React, { PropsWithChildren } from 'react';
import { RunResult } from '../../types/playerdata';
import ControlForm from './ControlForm';

type ControlFormsProps = {
    result: RunResult;
    id: string;
    setTime: (time: string, id: string) => void;
    setEnemies: (enemies: string, id: string) => void;
    setPenalty: (penalty: string, id: string) => void;
    deleteResult: (id: string) => void;
    top01: boolean;
    top02: boolean;
}

function parseNum(num: string, backup: number = 0) {
    let out = Number(num);
    if (isNaN(out)) {
        return backup;
    }
    return out;
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

function getFinalTime(result: RunResult) {
    const time = parseNum(result.time, 120);
    const modifier = parseNum(result.penalty, 0);
    return formatTime(time + modifier);
}

export default function TimeInput(props: PropsWithChildren<ControlFormsProps>) {
    let bgColor: string;
    if (props.top01) {
        bgColor = "limegreen";
    } else if (props.top02) {
        bgColor = "#8b8000";
    } else {
        bgColor = "#888";
    }

    return (
        <div style={{display: "flex", backgroundColor: bgColor, border: "1px solid black", borderRadius: "5px", alignItems: "center", padding: "1px 8px", gap: "10px",}}>            
            <ControlForm label="T" style={{flexShrink: 1}}>
                &nbsp;
                <input type="text" style={{width: "50px"}}
                    value={props.result.time ?? ""}
                    onChange={(e) => props.setTime(e.target.value, props.id)}
                />
            </ControlForm>
            <ControlForm label="E" style={{flexShrink: 1}}>
                &nbsp;
                <input type="text" style={{width: "50px"}}
                    value={props.result.enemies ?? ""}
                    onChange={(e) => props.setEnemies(e.target.value, props.id)}
                />
            </ControlForm>
            <ControlForm label="M">
                <input type="text" style={{width: "50px"}}
                    value={props.result.penalty ?? 0}
                    onChange={(e) => props.setPenalty(e.target.value, props.id)}
                />
            </ControlForm>
            {getFinalTime(props.result)}
            <button
                onClick={() => props.deleteResult(props.id)}
                style={{
                    marginLeft: "auto",
                }}
            >
                -
            </button>

        </div>
    )
}