import React from 'react';
import PlayerConfig from './components/PlayerConfig';

export function Panel() {
	return (
		<>
			<PlayerConfig id="player1" />
			<PlayerConfig id="player2" />
			<PlayerConfig id="player3" />
			<PlayerConfig id="player4" />
		</>
	)
}
