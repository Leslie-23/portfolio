import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Colors
const SKIN = "#8B6914";
const SKIN_DARK = "#7A5C12";
const HAIR = "#1a1a1a";
const HOODIE = "#16a34a";
const HOODIE_DARK = "#15803d";
const PANTS = "#1e293b";
const SHOES = "#111111";
const EYE_WHITE = "#ffffff";
const EYE_PUPIL = "#111111";

// Rounded box helper
function RoundedBox({ args, radius = 0.05, ...props }) {
	const geometry = useMemo(() => {
		const shape = new THREE.Shape();
		const [w, h] = [args[0] / 2, args[1] / 2];
		const r = Math.min(radius, w, h);
		shape.moveTo(-w + r, -h);
		shape.lineTo(w - r, -h);
		shape.quadraticCurveTo(w, -h, w, -h + r);
		shape.lineTo(w, h - r);
		shape.quadraticCurveTo(w, h, w - r, h);
		shape.lineTo(-w + r, h);
		shape.quadraticCurveTo(-w, h, -w, h - r);
		shape.lineTo(-w, -h + r);
		shape.quadraticCurveTo(-w, -h, -w + r, -h);

		const extrudeSettings = { depth: args[2] || 0.1, bevelEnabled: false };
		const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
		geo.center();
		return geo;
	}, [args, radius]);

	return (
		<mesh geometry={geometry} {...props}>
			{props.children}
		</mesh>
	);
}

export default function Avatar({ position = [0, 0, 0], scrollProgress = 0, action = "idle", scale = 0.35 }) {
	const groupRef = useRef();
	const headRef = useRef();
	const leftArmRef = useRef();
	const rightArmRef = useRef();
	const leftLegRef = useRef();
	const rightLegRef = useRef();
	const bodyRef = useRef();

	useFrame((state) => {
		if (!groupRef.current) return;
		const t = state.clock.elapsedTime;

		// Idle breathing / bobbing
		if (headRef.current) {
			headRef.current.position.y = 1.85 + Math.sin(t * 2) * 0.03;
			headRef.current.rotation.z = Math.sin(t * 0.8) * 0.02;
		}

		// Body subtle sway
		if (bodyRef.current) {
			bodyRef.current.rotation.z = Math.sin(t * 1.2) * 0.01;
		}

		// Arm swing (idle)
		if (action === "idle") {
			if (leftArmRef.current) {
				leftArmRef.current.rotation.x = Math.sin(t * 1.5) * 0.1;
			}
			if (rightArmRef.current) {
				rightArmRef.current.rotation.x = Math.sin(t * 1.5 + Math.PI) * 0.1;
			}
		}

		// Walking animation
		if (action === "walk") {
			const walkSpeed = 4;
			if (leftArmRef.current) {
				leftArmRef.current.rotation.x = Math.sin(t * walkSpeed) * 0.5;
			}
			if (rightArmRef.current) {
				rightArmRef.current.rotation.x = Math.sin(t * walkSpeed + Math.PI) * 0.5;
			}
			if (leftLegRef.current) {
				leftLegRef.current.rotation.x = Math.sin(t * walkSpeed + Math.PI) * 0.4;
			}
			if (rightLegRef.current) {
				rightLegRef.current.rotation.x = Math.sin(t * walkSpeed) * 0.4;
			}
			// Bounce while walking
			if (groupRef.current) {
				groupRef.current.position.y = position[1] + Math.abs(Math.sin(t * walkSpeed * 2)) * 0.05;
			}
		}

		// Wave animation
		if (action === "wave") {
			if (rightArmRef.current) {
				rightArmRef.current.rotation.x = -0.3;
				rightArmRef.current.rotation.z = -1.2 + Math.sin(t * 6) * 0.3;
			}
		}

		// Point animation
		if (action === "point") {
			if (rightArmRef.current) {
				rightArmRef.current.rotation.x = -0.8;
				rightArmRef.current.rotation.z = -0.3;
			}
		}
	});

	return (
		<group ref={groupRef} position={position} scale={scale}>
			{/* === HEAD (big, chibi-style) === */}
			<group ref={headRef} position={[0, 1.85, 0]}>
				{/* Main head sphere */}
				<mesh>
					<sphereGeometry args={[0.55, 32, 32]} />
					<meshStandardMaterial color={SKIN} roughness={0.7} />
				</mesh>

				{/* Hair cap (low cut) */}
				<mesh position={[0, 0.12, 0]}>
					<sphereGeometry args={[0.56, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
					<meshStandardMaterial color={HAIR} roughness={0.9} />
				</mesh>

				{/* Hairline fade (slightly visible) */}
				<mesh position={[0, 0.02, 0.35]}>
					<boxGeometry args={[0.5, 0.08, 0.05]} />
					<meshStandardMaterial color={HAIR} roughness={0.9} />
				</mesh>

				{/* Left eye white */}
				<mesh position={[-0.18, 0.05, 0.48]}>
					<sphereGeometry args={[0.09, 16, 16]} />
					<meshStandardMaterial color={EYE_WHITE} />
				</mesh>
				{/* Left pupil */}
				<mesh position={[-0.18, 0.05, 0.56]}>
					<sphereGeometry args={[0.055, 16, 16]} />
					<meshStandardMaterial color={EYE_PUPIL} />
				</mesh>
				{/* Left eye shine */}
				<mesh position={[-0.16, 0.07, 0.6]}>
					<sphereGeometry args={[0.02, 8, 8]} />
					<meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
				</mesh>

				{/* Right eye white */}
				<mesh position={[0.18, 0.05, 0.48]}>
					<sphereGeometry args={[0.09, 16, 16]} />
					<meshStandardMaterial color={EYE_WHITE} />
				</mesh>
				{/* Right pupil */}
				<mesh position={[0.18, 0.05, 0.56]}>
					<sphereGeometry args={[0.055, 16, 16]} />
					<meshStandardMaterial color={EYE_PUPIL} />
				</mesh>
				{/* Right eye shine */}
				<mesh position={[0.2, 0.07, 0.6]}>
					<sphereGeometry args={[0.02, 8, 8]} />
					<meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
				</mesh>

				{/* Nose (subtle) */}
				<mesh position={[0, -0.05, 0.52]}>
					<sphereGeometry args={[0.04, 12, 12]} />
					<meshStandardMaterial color={SKIN_DARK} roughness={0.8} />
				</mesh>

				{/* Smile */}
				<mesh position={[0, -0.17, 0.47]} rotation={[0.2, 0, 0]}>
					<torusGeometry args={[0.08, 0.015, 8, 16, Math.PI]} />
					<meshStandardMaterial color={SKIN_DARK} />
				</mesh>

				{/* Ears */}
				<mesh position={[-0.52, 0, 0]}>
					<sphereGeometry args={[0.1, 12, 12]} />
					<meshStandardMaterial color={SKIN} roughness={0.7} />
				</mesh>
				<mesh position={[0.52, 0, 0]}>
					<sphereGeometry args={[0.1, 12, 12]} />
					<meshStandardMaterial color={SKIN} roughness={0.7} />
				</mesh>
			</group>

			{/* === BODY (hoodie) === */}
			<group ref={bodyRef} position={[0, 1.05, 0]}>
				{/* Torso */}
				<mesh>
					<capsuleGeometry args={[0.28, 0.45, 8, 16]} />
					<meshStandardMaterial color={HOODIE} roughness={0.6} />
				</mesh>

				{/* Hoodie collar */}
				<mesh position={[0, 0.32, 0.05]}>
					<torusGeometry args={[0.22, 0.05, 8, 16]} />
					<meshStandardMaterial color={HOODIE_DARK} roughness={0.7} />
				</mesh>

				{/* Hoodie pocket */}
				<mesh position={[0, -0.1, 0.26]}>
					<boxGeometry args={[0.3, 0.12, 0.02]} />
					<meshStandardMaterial color={HOODIE_DARK} roughness={0.7} />
				</mesh>

				{/* Hoodie zipper line */}
				<mesh position={[0, 0, 0.28]}>
					<boxGeometry args={[0.02, 0.5, 0.01]} />
					<meshStandardMaterial color={HOODIE_DARK} />
				</mesh>
			</group>

			{/* === ARMS === */}
			{/* Left arm */}
			<group ref={leftArmRef} position={[-0.38, 1.2, 0]}>
				{/* Upper arm (hoodie) */}
				<mesh position={[0, -0.15, 0]}>
					<capsuleGeometry args={[0.08, 0.2, 8, 12]} />
					<meshStandardMaterial color={HOODIE} roughness={0.6} />
				</mesh>
				{/* Hand */}
				<mesh position={[0, -0.38, 0]}>
					<sphereGeometry args={[0.08, 12, 12]} />
					<meshStandardMaterial color={SKIN} roughness={0.7} />
				</mesh>
			</group>

			{/* Right arm */}
			<group ref={rightArmRef} position={[0.38, 1.2, 0]}>
				{/* Upper arm (hoodie) */}
				<mesh position={[0, -0.15, 0]}>
					<capsuleGeometry args={[0.08, 0.2, 8, 12]} />
					<meshStandardMaterial color={HOODIE} roughness={0.6} />
				</mesh>
				{/* Hand */}
				<mesh position={[0, -0.38, 0]}>
					<sphereGeometry args={[0.08, 12, 12]} />
					<meshStandardMaterial color={SKIN} roughness={0.7} />
				</mesh>
			</group>

			{/* === LEGS === */}
			{/* Left leg */}
			<group ref={leftLegRef} position={[-0.14, 0.45, 0]}>
				<mesh position={[0, -0.15, 0]}>
					<capsuleGeometry args={[0.09, 0.25, 8, 12]} />
					<meshStandardMaterial color={PANTS} roughness={0.8} />
				</mesh>
				{/* Shoe */}
				<mesh position={[0, -0.38, 0.04]}>
					<boxGeometry args={[0.14, 0.08, 0.22]} />
					<meshStandardMaterial color={SHOES} roughness={0.5} />
				</mesh>
				{/* Shoe sole */}
				<mesh position={[0, -0.42, 0.04]}>
					<boxGeometry args={[0.15, 0.02, 0.23]} />
					<meshStandardMaterial color="#ffffff" roughness={0.3} />
				</mesh>
			</group>

			{/* Right leg */}
			<group ref={rightLegRef} position={[0.14, 0.45, 0]}>
				<mesh position={[0, -0.15, 0]}>
					<capsuleGeometry args={[0.09, 0.25, 8, 12]} />
					<meshStandardMaterial color={PANTS} roughness={0.8} />
				</mesh>
				{/* Shoe */}
				<mesh position={[0, -0.38, 0.04]}>
					<boxGeometry args={[0.14, 0.08, 0.22]} />
					<meshStandardMaterial color={SHOES} roughness={0.5} />
				</mesh>
				{/* Shoe sole */}
				<mesh position={[0, -0.42, 0.04]}>
					<boxGeometry args={[0.15, 0.02, 0.23]} />
					<meshStandardMaterial color="#ffffff" roughness={0.3} />
				</mesh>
			</group>

			{/* Shadow blob */}
			<mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<circleGeometry args={[0.3, 24]} />
				<meshStandardMaterial color="#000000" transparent opacity={0.2} />
			</mesh>
		</group>
	);
}
