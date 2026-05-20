import React, { useEffect, useMemo, useRef } from "react";
import { useFBX, useAnimations } from "@react-three/drei";
import { clone as cloneSkeleton } from "three/examples/jsm/utils/SkeletonUtils.js";

const FBX_BASE = "/Walking.fbx";
const FBX_TEXTING = "/Walking%20While%20Texting.fbx";
const FBX_CLIMBING = "/Climbing.fbx";

// Map any incoming `action` string to one of the three available clips.
// Anything unrecognized falls back to "walk".
function resolveClipName(action = "") {
	const a = action.toLowerCase();
	if (a.includes("climb")) return "climb";
	if (a.includes("text") || a.includes("type") || a.includes("phone") || a.includes("wave") || a.includes("idle")) return "texting";
	return "walk";
}

export default function Avatar({
	position = [0, 0, 0],
	action = "walk",
	scale = 0.01, // Mixamo exports at 100 units; 0.01 ≈ a 1.8m human
}) {
	const group = useRef();

	const baseFbx = useFBX(FBX_BASE);
	const textingFbx = useFBX(FBX_TEXTING);
	const climbingFbx = useFBX(FBX_CLIMBING);

	// Clone the scene graph so the same FBX can mount in multiple canvases
	// (main hero + AvatarGuide mini) without three.js complaining.
	const character = useMemo(() => cloneSkeleton(baseFbx), [baseFbx]);

	// Mixamo clips are all named "mixamo.com" — rename them so we can address by intent.
	const clips = useMemo(() => {
		const named = (fbx, name) => {
			if (!fbx.animations?.[0]) return null;
			const clip = fbx.animations[0].clone();
			clip.name = name;
			return clip;
		};
		return [
			named(baseFbx, "walk"),
			named(textingFbx, "texting"),
			named(climbingFbx, "climb"),
		].filter(Boolean);
	}, [baseFbx, textingFbx, climbingFbx]);

	const { actions } = useAnimations(clips, group);

	useEffect(() => {
		const clipName = resolveClipName(action);
		const next = actions[clipName];
		if (!next) return;
		next.reset().fadeIn(0.3).play();
		return () => next.fadeOut(0.3);
	}, [action, actions]);

	return (
		<group ref={group} position={position} scale={scale}>
			<primitive object={character} />
		</group>
	);
}

useFBX.preload(FBX_BASE);
useFBX.preload(FBX_TEXTING);
useFBX.preload(FBX_CLIMBING);
