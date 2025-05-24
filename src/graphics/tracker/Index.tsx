import React from 'react';
import Spline from "typescript-cubic-spline";
import {useIncrementNumSpeed} from "../../types/useIncrementNumSpeed"
import {useIncrementNumber} from "../../types/useIncrementNumber"
import {motion, AnimatePresence} from "framer-motion";

import trackerBgNarrow from "../assets/tracker/tracker-bg-narrow.png";
import trackerBg from "../assets/tracker/tracker-bg.png";
import trackerHair from "../assets/tracker/tracker-hair.png";
import trackerHairMask from "../assets/tracker/tracker-hair-mask.png";
import trackerDownGoals from "../assets/tracker/tracker-down-goals.png";
import trackerDownGoalsNarrow from "../assets/tracker/tracker-down-goals-narrow.png";
import trackerUpGoals from "../assets/tracker/tracker-up-goals.png";
import trackerKnight from "../assets/tracker/tracker-knight.png";
import tracker6000 from "../assets/tracker/tracker-6000.png";
import { useReplicant } from '@nodecg/react-hooks';

function getHairOffset(total: number): string {
    const xs = [0, 1000, 2000, 3000, 4000, 5000, 6000];
    const ys = [-2257, -1753, -1389, -984, -656, -371, -6];
    const spline = new Spline(xs, ys);
    const yOffset = Math.min(spline.at(total), -6);
    return `0px ${yOffset}px`;
}

function getKnightPosition(total: number): [number, number] {
    const ts = [0, 5500, 6000, 7000, 8000, 9000, 10000, 11000, 12000];
    const xs = [0, 0, -110, -160, -185, -200, -215, -225, -265]
    const ys = [0, 0, 0, -232, -517, -845, -1249, -1614, -2074]
    const splineX = new Spline(ts, xs);
    const splineY = new Spline(ts, ys);
    let xOffset = Math.min(Math.max(splineX.at(total),-265),0)
    let yOffset = Math.min(Math.max(splineY.at(total),-2074),0)
    if (total < 5500) {
        xOffset = 0;
        yOffset = 0;
    }

    return [xOffset, yOffset];
}

export function Index() {
    const queryParameters = new URLSearchParams(window.location.search);
    const narrow = queryParameters.get("narrow") ?? "false";
    const [total, setTotal] = useReplicant("total", {bundle: "nodecg-tiltify"});
    const shown = useIncrementNumber(total ?? 0) + 12282.03;

    let bgSource = trackerBg;
    let downSource = trackerDownGoals;
    if (narrow == "true") {
        bgSource = trackerBgNarrow;
        downSource = trackerDownGoalsNarrow;
    }

	const spring = {
        duration: 2,
	}

	return (
		<div style={{position: "relative",
            width: 2160,
            height: 2700,
		}}>
            <img style={{position: "absolute"}} src={bgSource} />
            <AnimatePresence>
                {(shown < 6000) &&<motion.img style={{position: "absolute"}} src={downSource} key="down-goals" exit={{opacity: 0}} transition={spring}/>}
            </AnimatePresence>
            <AnimatePresence>
                {shown >= 6000 && <motion.img style={{position: "absolute"}} src={trackerUpGoals} initial={{opacity: 0}} animate={{opacity: 1}} transition={spring}/>}
            </AnimatePresence>
            <AnimatePresence>
                {shown >= 5000 && <motion.img style={{position: "absolute"}} src={tracker6000} initial={{opacity: 0}} animate={{opacity: 1}} transition={spring}/>}
            </AnimatePresence>
            <img
            style={{
                position: "absolute",
                maskImage: `url(${trackerHairMask})`,
                maskPosition: getHairOffset(shown),
                WebkitMaskImage: `url(${trackerHairMask})`,
                WebkitMaskPosition: getHairOffset(shown),
            }} src={trackerHair} key={"hair-movement"}/>
            <img style={{position: "absolute", left: `${getKnightPosition(shown)[0]}px`, top: `${getKnightPosition(shown)[1]}px`}} src={trackerKnight}/>
            {narrow != "true" && <span>
                    <span style={{
                    position: "absolute",
                    right: 560,
                    top: 22, 
                    fontFamily: "PirataOne",
                    fontSize: 124,
                    color: "#1B1971",
                    }}>${Math.floor(shown)}.
                    </span>
                    <span style={{
                    position: "absolute",
                    right: 510,
                    top: 87, 
                    fontFamily: "PirataOne",
                    fontSize: 64,
                    color: "#1B1971",
                    }}>{String(Math.round((shown % 1) * 100)).padStart(2, "0")}
                    </span>
                    
                </span>}
		</div>
	);
}
