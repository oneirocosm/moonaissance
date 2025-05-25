import React from 'react';
import Spline from "typescript-cubic-spline";
import {useIncrementNumSpeed} from "../../types/useIncrementNumSpeed"
import {useIncrementNumber} from "../../types/useIncrementNumber"
import {motion, AnimatePresence} from "framer-motion";
import { useReplicant } from '@nodecg/react-hooks';

import trackerBgNarrow from "../assets/tracker/tracker-bg-narrow.png";
import trackerBg from "../assets/tracker/tracker-bg.png";
import trackerHair from "../assets/tracker/tracker-hair.png";
import trackerHairMask from "../assets/tracker/tracker-hair-mask.png";
import trackerDownGoals from "../assets/tracker/tracker-down-goals.png";
import trackerDownGoalsNarrow from "../assets/tracker/tracker-down-goals-narrow.png";
import trackerUpGoals from "../assets/tracker/tracker-up-goals.png";
import trackerKnight from "../assets/tracker/tracker-knight.png";
import tracker6000 from "../assets/tracker/tracker-6000.png";
import tracker12000 from "../assets/tracker/tracker-12000.png";
import trackerMoon from "../assets/tracker/tracker-moon.png";
import tracker7000Text from "../assets/tracker/tracker-7000-text.png"
import tracker8000Text from "../assets/tracker/tracker-8000-text.png"
import tracker9000Text from "../assets/tracker/tracker-9000-text.png"
import tracker10000Text from "../assets/tracker/tracker-10000-text.png"
import tracker11000Text from "../assets/tracker/tracker-11000-new-text.png"

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
    //const [total, setTotal] = useReplicant("total", {bundle: "nodecg-tiltify"});
    const [total, setTotal] = React.useState(4500);
    const shown = useIncrementNumber(total ?? 0);

    React.useEffect(() => {
        let interv = setInterval(() => setTotal(t => t+300), 3000);

        return () => {clearInterval(interv)}
    }, []);

    let bgSource = trackerBg;
    let downSource = trackerDownGoals;
    let moonX = 0;
    let moonScale = 1;
    if (narrow == "true") {
        bgSource = trackerBgNarrow;
        downSource = trackerDownGoalsNarrow;
        moonX = -790;
        moonScale = 0.6;
    }

	const ease = {
        duration: 2,
	};

    const wobble = {
        repeatType: "reverse",
        repeat: Infinity,
        duration: 2,
    };

    const bonusTexts: Record<number, string> = {
        7000: tracker7000Text,
        8000: tracker8000Text,
        9000: tracker9000Text, 
        10000: tracker10000Text,
        11000: tracker11000Text
    }

	return (
		<div style={{position: "relative",
            width: 2160,
            height: 2700,
		}}>
            <img style={{position: "absolute"}} src={bgSource} />
            <AnimatePresence>
                {(shown < 6000) &&<motion.img style={{position: "absolute"}} src={downSource} key="down-goals" exit={{opacity: 0}} transition={ease}/>}
            </AnimatePresence>
            <AnimatePresence>
                {shown >= 6000 && <motion.img style={{position: "absolute"}} src={trackerUpGoals} initial={{opacity: 0}} animate={{opacity: 1}} transition={ease}/>}
            </AnimatePresence>
            <AnimatePresence>
                {shown >= 5000 && <motion.img style={{position: "absolute"}} src={tracker6000} initial={{opacity: 0}} animate={{opacity: 1}} transition={ease}/>}
            </AnimatePresence>
            <AnimatePresence>
                {shown >= 11000 && <motion.img style={{position: "absolute"}} src={tracker12000} initial={{opacity: 0}} animate={{opacity: 1}} transition={ease}/>}
            </AnimatePresence>
            {
                Object.entries(bonusTexts).map(([amountStr, msg]) => <AnimatePresence key={`${amountStr}-msg`}>
                    {narrow != "true" && shown >= Number(amountStr) && <motion.img style={{position: "absolute"}} src={msg} initial={{opacity: 0}} animate={{opacity: 1}} transition={ease}/>}
                </AnimatePresence>)
            }
            <img
            style={{
                position: "absolute",
                maskImage: `url(${trackerHairMask})`,
                maskPosition: getHairOffset(shown),
                WebkitMaskImage: `url(${trackerHairMask})`,
                WebkitMaskPosition: getHairOffset(shown),
            }} src={trackerHair} key={"hair-movement"}/>
            <img style={{position: "absolute", left: `${getKnightPosition(shown)[0]}px`, top: `${getKnightPosition(shown)[1]}px`}} src={trackerKnight}/>
            {<motion.div style={{
                position: "absolute",
                top: 0,
                left: moonX,
                transformOrigin: "1885px 204px",
                WebkitTransformOrigin: "1885px 204px",
                width: 2160,
                height: 2700,
                scale: moonScale,
            }} animate={{rotate: 5}} initial={{rotate: -2}} transition={{
                repeatType: "reverse",
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
            }}>
                <img src={trackerMoon} style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                }}/>
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
            </motion.div>}
		</div>
	);
}
