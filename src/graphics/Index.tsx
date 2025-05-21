import React from 'react';
import TfallSimpleStats from './components/TfallSimpleStats';

export function Index() {
	return (
		<div style={{display: "flex",
            width: 1817,
            height: 171,
            border: "solid 1px black",
			justifyContent: "space-around",
			backgroundColor: "#416abf",
		}}>
			<TfallSimpleStats id={"player1"}/>
			<TfallSimpleStats id={"player2"}/>
			<TfallSimpleStats id={"player3"}/>
			<TfallSimpleStats id={"player4"}/>
			<TfallSimpleStats id={"player5"}/>
		</div>
	);
}
