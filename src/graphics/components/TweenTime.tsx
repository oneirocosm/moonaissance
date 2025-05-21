// inspired by the gdq-break-channels tween number
import React from 'react';
import { useIncrementNumber } from "../../types/useIncrementNumber"

type TweenTimeProps = {
    value: number;
    posSign?: boolean;
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

export default function TweenTime({value, posSign}: TweenTimeProps) {
    const num = useIncrementNumber(value ?? 120);

    return (
        <>
            {formatTime(num, posSign)}
        </>
    )
}