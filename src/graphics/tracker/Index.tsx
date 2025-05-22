import React from 'react';
import Spline from "typescript-cubic-spline";
import {useIncrementNumSpeed} from "../../types/useIncrementNumSpeed"

import trackerBg from "../assets/tracker/tracker-bg.png";
import trackerHair from "../assets/tracker/tracker-hair.png";
import trackerHairMask from "../assets/tracker/tracker-hair-mask.png";
import trackerDownGoals from "../assets/tracker/tracker-down-goals.png";

function getHairOffset(total: number): string {
    const xs = [0, 1000, 2000, 3000, 4000, 5000, 6000];
    const ys = [-2257, -1753, -1389, -984, -656, -371, -6];
    const spline = new Spline(xs, ys);
    const yOffset = Math.min(spline.at(total), -6);
    return `0px ${yOffset}px`;
}

export function Index() {
    const [total, setTotal] = React.useState(0)
    const shown = useIncrementNumSpeed(total);

    React.useEffect(() => {
        let a = setInterval(() => setTotal((t) => t+40), 10000)

        return (() => clearInterval(a));
    }, [])

	return (
		<div style={{position: "relative",
            width: 2160,
            height: 2700,
		}}>
            <img style={{position: "absolute"}} src={trackerBg} />
            <img style={{position: "absolute"}} src={trackerDownGoals} />
            <img
            style={{
                position: "absolute",
                maskImage: `url(${trackerHairMask})`,
                maskPosition: getHairOffset(shown),
                WebkitMaskImage: `url(${trackerHairMask})`,
            }} src={trackerHair} key={"hair-movement"}/>
		</div>
	);
}
