import { RunResult } from "./playerdata";

function getValue(result: RunResult) {
        const parsedTime = Number(result.time);
        let useTime = 120;
        if (!isNaN(parsedTime)) {
            useTime = parsedTime
        }

        let penalty = Math.round(Number(result.penalty));
        if (isNaN(penalty)) {
            penalty = 0;
        }

        const adjustedTime = useTime + penalty;
        return adjustedTime;
}

export {getValue};