// This is adapted from the GamesDoneQuick gdq-break-channels code
// for the original, go to https://github.com/GamesDoneQuick/gdq-break-channels/blob/ddf4e627c123b8cc2e5ae91088692642d98d75ca/src/lib/hooks/useIncrementNumber.tsx
import gsap from 'gsap';
import { useEffect, useState } from 'react';

export const useIncrementNumSpeed = (newValue: number, fps = 60, speed = 10.0) => {
	const [number, setNumber] = useState(newValue);

	useEffect(() => {
		const target = {
			value: number,
		};

		const tween = gsap.to(target, {
			value: newValue,
			duration: Math.abs(newValue - number)/speed,
			ease: (progress) => {
				return Math.round(progress * fps) / fps;
			},
			onUpdate() {
				setNumber(target.value);
			},
		});

		return () => {
			tween.kill();
		};
	}, [newValue]);

	return number;
};