import React from 'react';
import TfallDetailedStats from '../components/TfallDetailedStats';

export function Index() {
    const queryParameters = new URLSearchParams(window.location.search);
    const id = queryParameters.get("id") ?? "";
	return (
		<div style={{display: "flex",
            width: 498,
            height: 307,
            border: "solid 1px black",
			justifyContent: "space-around",
            backgroundColor: "#191556",
		}}>
			<TfallDetailedStats id={id}/>
		</div>
	);
}
