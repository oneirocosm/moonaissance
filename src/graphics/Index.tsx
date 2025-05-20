import React from 'react';
import TfallDetailedStats from './components/TfallDetailedStats';

export function Index() {
	return (
		<div style={{display: "flex",
            width: 1817,
            height: 171,
            border: "solid 1px black",
			justifyContent: "space-around",
		}}>
			<TfallDetailedStats id={"player1"}/>
			<TfallDetailedStats id={"player2"}/>
			<TfallDetailedStats id={"player3"}/>
			<TfallDetailedStats id={"player4"}/>
			<TfallDetailedStats id={"player5"}/>
		</div>
	);
}
