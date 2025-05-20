import React, { PropsWithChildren } from 'react';
import { RunResult } from '../../types/playerdata';
import ControlForm from './ControlForm';

type ControlFormsProps = {
    result: RunResult;
    id: string;
    setTime: (time: string, id: string) => void;
    setPenalty: (penalty: string, id: string) => void;
    deleteResult: (id: string) => void;
    top01: boolean;
    top02: boolean;
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
        <div style={{display: "flex", backgroundColor: bgColor, border: "1px solid black", borderRadius: "5px", alignItems: "center", padding: "1px 8px"}}>            
            <ControlForm label="T" style={{flexShrink: 1}}>
                &nbsp;
                <input type="text" style={{width: "100px"}}
                    value={props.result.time ?? ""}
                    onChange={(e) => props.setTime(e.target.value, props.id)}
                />
            </ControlForm>
            <ControlForm label="P">
                <input type="number" style={{width: "50px"}}
                    value={props.result.penalty ?? 0}
                    onChange={(e) => props.setPenalty(e.target.value, props.id)}
                />
            </ControlForm>
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