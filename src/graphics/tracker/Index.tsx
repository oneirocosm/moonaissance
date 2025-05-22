import React from 'react';
import TfallDetailedStats from '../components/TfallDetailedStats';

import trackerBg from "../assets/tracker/tracker-bg.png";
import trackerHair from "../assets/tracker/tracker-hair.png";
import trackerHairMask from "../assets/tracker/tracker-hair-mask.png";
import trackerDownGoals from "../assets/tracker/tracker-down-goals.png";

function getHairOffset(total: number): string {
    const xOffset = 0;
    const yOffset = -2257 ;
    return "";
}

export function Index() {
    const donationTotal = 1000;

	return (
		<div style={{position: "relative",
            width: 2160,
            height: 2700,
		}}>
            <img style={{position: "absolute"}} src={trackerBg} />
            <img style={{position: "absolute"}} src={trackerDownGoals} />
            <img style={{
                position: "absolute",
                maskImage: `url(${trackerHairMask})`,
                maskPosition: "0px -2257px",
                WebkitMaskImage: `url(${trackerHairMask})`,
            }} src={trackerHair} />
		</div>
	);
}
