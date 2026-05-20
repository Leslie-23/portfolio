import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import Avatar from "./Avatar";

/**
 * Climbing intro: climbs up once, pauses, climbs back down, then scales out.
 * Mounts inside an existing R3F Canvas at the given position.
 */
export default function ClimbingIntro({
	position = [0, -3, -1],
	rotation = [0, Math.PI, 0], // face the camera by default; flip if back-to-viewer is wanted
	scale = 0.018,
	pauseMs = 700,
	onFinish,
}) {
	const wrapperRef = useRef();
	const [phase, setPhase] = useState("up"); // up → pause → down → gone

	useEffect(() => {
		if (phase !== "pause") return;
		const t = setTimeout(() => setPhase("down"), pauseMs);
		return () => clearTimeout(t);
	}, [phase, pauseMs]);

	// Scale-out collapse once the down climb finishes
	useFrame((_, delta) => {
		if (phase !== "gone" || !wrapperRef.current) return;
		const s = Math.max(0, wrapperRef.current.scale.x - delta * 1.8);
		wrapperRef.current.scale.setScalar(s);
		if (s === 0) onFinish?.();
	});

	return (
		<group ref={wrapperRef} position={position} rotation={rotation}>
			<Avatar
				action="climb"
				playOnce
				reverse={phase === "down"}
				scale={scale}
				onComplete={() => {
					if (phase === "up") setPhase("pause");
					else if (phase === "down") setPhase("gone");
				}}
			/>
		</group>
	);
}
