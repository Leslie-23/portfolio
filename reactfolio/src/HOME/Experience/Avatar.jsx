import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFBX, useAnimations } from "@react-three/drei";
import { clone as cloneSkeleton } from "three/examples/jsm/utils/SkeletonUtils.js";

const CHARACTER_URL = "/T-Pose.fbx";

const CLIPS = {
	idle:    "/Breathing%20Idle.fbx",
	walk:    "/Walking.fbx",
	texting: "/Walking%20While%20Texting.fbx",
	wave:    "/Waving%20Gesture.fbx",
	clap:    "/Sitting%20Clap.fbx",
	climb:   "/Climbing.fbx",
};

// Map any incoming `action` string to one of the registered clip keys.
function resolveClipName(action = "") {
	const a = action.toLowerCase();
	if (a.includes("climb")) return "climb";
	if (a.includes("text") || a.includes("type") || a.includes("phone")) return "texting";
	if (a.includes("wave") || a.includes("hello") || a.includes("hi") || a.includes("point")) return "wave";
	if (a.includes("clap") || a.includes("sit") || a.includes("celebrate") || a.includes("success")) return "clap";
	if (a.includes("walk") || a.includes("moving")) return "walk";
	return "idle";
}

export default function Avatar({
	position = [0, 0, 0],
	rotation = [0, 0, 0],
	action = "idle",
	scale = 0.01,         // Mixamo exports at 100 units; 0.01 ≈ a 1.8m human
	playOnce = false,     // when true, animation plays once and stops at end
	reverse = false,      // when true, animation plays backward
	onComplete,           // callback fired when a playOnce clip finishes
}) {
	const group = useRef();

	// Character mesh (single source of truth)
	const characterFbx = useFBX(CHARACTER_URL);

	// Animation source FBXs — all loaded so any action prop value just works
	const idleFbx    = useFBX(CLIPS.idle);
	const walkFbx    = useFBX(CLIPS.walk);
	const textingFbx = useFBX(CLIPS.texting);
	const waveFbx    = useFBX(CLIPS.wave);
	const clapFbx    = useFBX(CLIPS.clap);
	const climbFbx   = useFBX(CLIPS.climb);

	// Clone the scene graph so the same mesh can mount in multiple canvases
	// (hero + AvatarGuide mini + footer) without three.js complaining.
	const character = useMemo(() => cloneSkeleton(characterFbx), [characterFbx]);

	// Mixamo clips are all named "mixamo.com" — rename so we can address by intent.
	const clips = useMemo(() => {
		const named = (fbx, name) => {
			if (!fbx?.animations?.[0]) return null;
			const clip = fbx.animations[0].clone();
			clip.name = name;
			return clip;
		};
		return [
			named(idleFbx,    "idle"),
			named(walkFbx,    "walk"),
			named(textingFbx, "texting"),
			named(waveFbx,    "wave"),
			named(clapFbx,    "clap"),
			named(climbFbx,   "climb"),
		].filter(Boolean);
	}, [idleFbx, walkFbx, textingFbx, waveFbx, clapFbx, climbFbx]);

	const { actions } = useAnimations(clips, group);

	useEffect(() => {
		const clipName = resolveClipName(action);
		const next = actions[clipName];
		if (!next) return;

		next.reset();
		if (playOnce) {
			next.setLoop(THREE.LoopOnce, 1);
			next.clampWhenFinished = true;
		} else {
			next.setLoop(THREE.LoopRepeat, Infinity);
		}
		if (reverse) {
			next.timeScale = -1;
			next.time = next.getClip().duration;
		} else {
			next.timeScale = 1;
		}
		next.fadeIn(0.3).play();

		let handleFinished = null;
		if (playOnce && onComplete) {
			const mixer = next.getMixer();
			handleFinished = (e) => {
				if (e.action === next) onComplete();
			};
			mixer.addEventListener("finished", handleFinished);
		}

		return () => {
			next.fadeOut(0.3);
			if (handleFinished) {
				next.getMixer().removeEventListener("finished", handleFinished);
			}
		};
	}, [action, playOnce, reverse, actions, onComplete]);

	return (
		<group ref={group} position={position} rotation={rotation} scale={scale}>
			<primitive object={character} />
		</group>
	);
}

useFBX.preload(CHARACTER_URL);
Object.values(CLIPS).forEach(useFBX.preload);
