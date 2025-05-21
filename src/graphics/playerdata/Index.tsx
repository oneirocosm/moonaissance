import React from 'react';
import TfallDetailedStats from '../components/TfallDetailedStats';

export function Index() {
    const queryParameters = new URLSearchParams(window.location.search);
    const id = queryParameters.get("id") ?? "";
	return (
		<div style={{display: "flex",
            width: 498,
            height: 307,
			justifyContent: "space-around",
		}}>
			<TfallDetailedStats id={id}/>
		</div>
	);
}
