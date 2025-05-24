import { RunResult } from "./playerdata";

function getValue(result: RunResult, playerPenalty: string) {
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
        if (isNaN(penalty)) {
            extraPenalty = 0;
        }

        const adjustedTime = useTime + penalty + extraPenalty;
        return adjustedTime;
}

export {getValue};