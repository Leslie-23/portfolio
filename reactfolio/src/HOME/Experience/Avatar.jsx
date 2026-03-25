import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Colors
const SKIN = "#a37b2c";
const SKIN_DARK = "#8B6914";
const SKIN_HIGHLIGHT = "#c49a3a";
const HAIR = "#1a1a1a";
const HOODIE = "#16a34a";
const HOODIE_DARK = "#15803d";
const HOODIE_LIGHT = "#22c55e";
const PANTS = "#1e293b";
const PANTS_DARK = "#0f172a";
const SHOES = "#111111";
const SHOE_ACCENT = "#16a34a";
const EYE_WHITE = "#ffffff";
const EYE_PUPIL = "#111111";
const LIP = "#7a4a10";

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
					<sphereGeometry args={[0.58, 32, 32]} />
					<meshStandardMaterial color={SKIN} roughness={0.6} metalness={0.05} />
				</mesh>

				{/* Cheek highlights — subtle warmth */}
				<mesh position={[-0.32, -0.08, 0.38]}>
					<sphereGeometry args={[0.1, 16, 16]} />
					<meshStandardMaterial color={SKIN_HIGHLIGHT} roughness={0.5} transparent opacity={0.4} />
				</mesh>
				<mesh position={[0.32, -0.08, 0.38]}>
					<sphereGeometry args={[0.1, 16, 16]} />
					<meshStandardMaterial color={SKIN_HIGHLIGHT} roughness={0.5} transparent opacity={0.4} />
				</mesh>

				{/* Hair cap (low cut, tight fade) */}
				<mesh position={[0, 0.12, 0]}>
					<sphereGeometry args={[0.59, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.52]} />
					<meshStandardMaterial color={HAIR} roughness={0.95} />
				</mesh>

				{/* Hair texture lines — gives the low cut a realistic look */}
				{[...Array(6)].map((_, i) => (
					<mesh key={`hair-${i}`} position={[0, 0.28, -0.1]} rotation={[0, (i * Math.PI) / 3, 0]}>
						<boxGeometry args={[0.6, 0.01, 0.01]} />
						<meshStandardMaterial color="#333333" roughness={1} />
					</mesh>
				))}

				{/* Hairline edge — clean fade line */}
				<mesh position={[0, 0.05, 0.4]}>
					<boxGeometry args={[0.52, 0.04, 0.04]} />
					<meshStandardMaterial color={HAIR} roughness={0.9} />
				</mesh>

				{/* Eyebrows — expressive */}
				<mesh position={[-0.18, 0.18, 0.5]} rotation={[0, 0, 0.1]}>
					<boxGeometry args={[0.14, 0.03, 0.03]} />
					<meshStandardMaterial color={HAIR} roughness={0.9} />
				</mesh>
				<mesh position={[0.18, 0.18, 0.5]} rotation={[0, 0, -0.1]}>
					<boxGeometry args={[0.14, 0.03, 0.03]} />
					<meshStandardMaterial color={HAIR} roughness={0.9} />
				</mesh>

				{/* Left eye white */}
				<mesh position={[-0.18, 0.07, 0.5]}>
					<sphereGeometry args={[0.1, 16, 16]} />
					<meshStandardMaterial color={EYE_WHITE} />
				</mesh>
				{/* Left pupil */}
				<mesh position={[-0.18, 0.07, 0.59]}>
					<sphereGeometry args={[0.06, 16, 16]} />
					<meshStandardMaterial color={EYE_PUPIL} />
				</mesh>
				{/* Left eye shine */}
				<mesh position={[-0.15, 0.1, 0.63]}>
					<sphereGeometry args={[0.022, 8, 8]} />
					<meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
				</mesh>

				{/* Right eye white */}
				<mesh position={[0.18, 0.07, 0.5]}>
					<sphereGeometry args={[0.1, 16, 16]} />
					<meshStandardMaterial color={EYE_WHITE} />
				</mesh>
				{/* Right pupil */}
				<mesh position={[0.18, 0.07, 0.59]}>
					<sphereGeometry args={[0.06, 16, 16]} />
					<meshStandardMaterial color={EYE_PUPIL} />
				</mesh>
				{/* Right eye shine */}
				<mesh position={[0.21, 0.1, 0.63]}>
					<sphereGeometry args={[0.022, 8, 8]} />
					<meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
				</mesh>

				{/* Nose */}
				<mesh position={[0, -0.04, 0.55]}>
					<sphereGeometry args={[0.045, 12, 12]} />
					<meshStandardMaterial color={SKIN_DARK} roughness={0.7} />
				</mesh>
				{/* Nostrils */}
				<mesh position={[-0.025, -0.06, 0.56]}>
					<sphereGeometry args={[0.015, 8, 8]} />
					<meshStandardMaterial color="#6a4f0e" roughness={0.8} />
				</mesh>
				<mesh position={[0.025, -0.06, 0.56]}>
					<sphereGeometry args={[0.015, 8, 8]} />
					<meshStandardMaterial color="#6a4f0e" roughness={0.8} />
				</mesh>

				{/* Smile — wider, friendlier */}
				<mesh position={[0, -0.17, 0.5]} rotation={[0.15, 0, 0]}>
					<torusGeometry args={[0.1, 0.018, 8, 16, Math.PI]} />
					<meshStandardMaterial color={LIP} />
				</mesh>

				{/* Ears */}
				<mesh position={[-0.54, 0, 0]}>
					<sphereGeometry args={[0.1, 12, 12]} />
					<meshStandardMaterial color={SKIN} roughness={0.6} />
				</mesh>
				{/* Ear inner */}
				<mesh position={[-0.52, 0, 0.04]}>
					<sphereGeometry args={[0.05, 10, 10]} />
					<meshStandardMaterial color={SKIN_DARK} roughness={0.7} />
				</mesh>
				<mesh position={[0.54, 0, 0]}>
					<sphereGeometry args={[0.1, 12, 12]} />
					<meshStandardMaterial color={SKIN} roughness={0.6} />
				</mesh>
				<mesh position={[0.52, 0, 0.04]}>
					<sphereGeometry args={[0.05, 10, 10]} />
					<meshStandardMaterial color={SKIN_DARK} roughness={0.7} />
				</mesh>
			</group>

			{/* === NECK === */}
			<mesh position={[0, 1.42, 0]}>
				<cylinderGeometry args={[0.12, 0.14, 0.15, 12]} />
				<meshStandardMaterial color={SKIN} roughness={0.6} />
			</mesh>

			{/* === BODY (hoodie) === */}
			<group ref={bodyRef} position={[0, 1.05, 0]}>
				{/* Torso */}
				<mesh>
					<capsuleGeometry args={[0.3, 0.5, 8, 16]} />
					<meshStandardMaterial color={HOODIE} roughness={0.5} metalness={0.05} />
				</mesh>

				{/* Hoodie collar / hood back */}
				<mesh position={[0, 0.35, -0.08]}>
					<sphereGeometry args={[0.22, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
					<meshStandardMaterial color={HOODIE_DARK} roughness={0.6} />
				</mesh>

				{/* Collar front */}
				<mesh position={[0, 0.33, 0.12]}>
					<torusGeometry args={[0.18, 0.04, 8, 16]} />
					<meshStandardMaterial color={HOODIE_DARK} roughness={0.6} />
				</mesh>

				{/* Hoodie strings */}
				<mesh position={[-0.06, 0.2, 0.3]}>
					<cylinderGeometry args={[0.008, 0.008, 0.2, 6]} />
					<meshStandardMaterial color={HOODIE_LIGHT} roughness={0.4} />
				</mesh>
				<mesh position={[0.06, 0.2, 0.3]}>
					<cylinderGeometry args={[0.008, 0.008, 0.2, 6]} />
					<meshStandardMaterial color={HOODIE_LIGHT} roughness={0.4} />
				</mesh>
				{/* String tips */}
				<mesh position={[-0.06, 0.08, 0.3]}>
					<sphereGeometry args={[0.015, 8, 8]} />
					<meshStandardMaterial color={HOODIE_LIGHT} roughness={0.3} />
				</mesh>
				<mesh position={[0.06, 0.08, 0.3]}>
					<sphereGeometry args={[0.015, 8, 8]} />
					<meshStandardMaterial color={HOODIE_LIGHT} roughness={0.3} />
				</mesh>

				{/* Hoodie pocket */}
				<mesh position={[0, -0.1, 0.28]}>
					<boxGeometry args={[0.32, 0.14, 0.02]} />
					<meshStandardMaterial color={HOODIE_DARK} roughness={0.6} />
				</mesh>

				{/* Zipper line */}
				<mesh position={[0, 0.05, 0.3]}>
					<boxGeometry args={[0.015, 0.55, 0.01]} />
					<meshStandardMaterial color="#999999" metalness={0.6} roughness={0.3} />
				</mesh>

				{/* Hoodie bottom hem */}
				<mesh position={[0, -0.28, 0]}>
					<torusGeometry args={[0.28, 0.025, 8, 24]} />
					<meshStandardMaterial color={HOODIE_DARK} roughness={0.6} />
				</mesh>
			</group>

			{/* === ARMS === */}
			{/* Left arm */}
			<group ref={leftArmRef} position={[-0.4, 1.2, 0]}>
				{/* Upper arm (hoodie sleeve) */}
				<mesh position={[0, -0.15, 0]}>
					<capsuleGeometry args={[0.09, 0.22, 8, 12]} />
					<meshStandardMaterial color={HOODIE} roughness={0.5} />
				</mesh>
				{/* Sleeve cuff */}
				<mesh position={[0, -0.28, 0]}>
					<torusGeometry args={[0.085, 0.02, 8, 12]} />
					<meshStandardMaterial color={HOODIE_DARK} roughness={0.6} />
				</mesh>
				{/* Forearm */}
				<mesh position={[0, -0.32, 0]}>
					<capsuleGeometry args={[0.055, 0.08, 8, 10]} />
					<meshStandardMaterial color={SKIN} roughness={0.6} />
				</mesh>
				{/* Hand */}
				<mesh position={[0, -0.42, 0]}>
					<sphereGeometry args={[0.075, 12, 12]} />
					<meshStandardMaterial color={SKIN} roughness={0.6} />
				</mesh>
				{/* Thumb */}
				<mesh position={[0.06, -0.42, 0.02]}>
					<capsuleGeometry args={[0.02, 0.03, 6, 6]} />
					<meshStandardMaterial color={SKIN} roughness={0.6} />
				</mesh>
			</group>

			{/* Right arm */}
			<group ref={rightArmRef} position={[0.4, 1.2, 0]}>
				<mesh position={[0, -0.15, 0]}>
					<capsuleGeometry args={[0.09, 0.22, 8, 12]} />
					<meshStandardMaterial color={HOODIE} roughness={0.5} />
				</mesh>
				<mesh position={[0, -0.28, 0]}>
					<torusGeometry args={[0.085, 0.02, 8, 12]} />
					<meshStandardMaterial color={HOODIE_DARK} roughness={0.6} />
				</mesh>
				<mesh position={[0, -0.32, 0]}>
					<capsuleGeometry args={[0.055, 0.08, 8, 10]} />
					<meshStandardMaterial color={SKIN} roughness={0.6} />
				</mesh>
				<mesh position={[0, -0.42, 0]}>
					<sphereGeometry args={[0.075, 12, 12]} />
					<meshStandardMaterial color={SKIN} roughness={0.6} />
				</mesh>
				<mesh position={[-0.06, -0.42, 0.02]}>
					<capsuleGeometry args={[0.02, 0.03, 6, 6]} />
					<meshStandardMaterial color={SKIN} roughness={0.6} />
				</mesh>
			</group>

			{/* === LEGS === */}
			{/* Left leg */}
			<group ref={leftLegRef} position={[-0.14, 0.45, 0]}>
				<mesh position={[0, -0.12, 0]}>
					<capsuleGeometry args={[0.1, 0.28, 8, 12]} />
					<meshStandardMaterial color={PANTS} roughness={0.7} />
				</mesh>
				{/* Knee detail */}
				<mesh position={[0, -0.12, 0.08]}>
					<sphereGeometry args={[0.06, 8, 8]} />
					<meshStandardMaterial color={PANTS_DARK} roughness={0.8} transparent opacity={0.3} />
				</mesh>
				{/* Shoe */}
				<mesh position={[0, -0.38, 0.05]}>
					<boxGeometry args={[0.15, 0.1, 0.24]} />
					<meshStandardMaterial color={SHOES} roughness={0.4} />
				</mesh>
				{/* Shoe sole */}
				<mesh position={[0, -0.43, 0.05]}>
					<boxGeometry args={[0.16, 0.025, 0.25]} />
					<meshStandardMaterial color="#eeeeee" roughness={0.3} />
				</mesh>
				{/* Shoe accent stripe */}
				<mesh position={[0, -0.36, 0.17]}>
					<boxGeometry args={[0.12, 0.03, 0.01]} />
					<meshStandardMaterial color={SHOE_ACCENT} emissive={SHOE_ACCENT} emissiveIntensity={0.3} roughness={0.3} />
				</mesh>
			</group>

			{/* Right leg */}
			<group ref={rightLegRef} position={[0.14, 0.45, 0]}>
				<mesh position={[0, -0.12, 0]}>
					<capsuleGeometry args={[0.1, 0.28, 8, 12]} />
					<meshStandardMaterial color={PANTS} roughness={0.7} />
				</mesh>
				<mesh position={[0, -0.12, 0.08]}>
					<sphereGeometry args={[0.06, 8, 8]} />
					<meshStandardMaterial color={PANTS_DARK} roughness={0.8} transparent opacity={0.3} />
				</mesh>
				<mesh position={[0, -0.38, 0.05]}>
					<boxGeometry args={[0.15, 0.1, 0.24]} />
					<meshStandardMaterial color={SHOES} roughness={0.4} />
				</mesh>
				<mesh position={[0, -0.43, 0.05]}>
					<boxGeometry args={[0.16, 0.025, 0.25]} />
					<meshStandardMaterial color="#eeeeee" roughness={0.3} />
				</mesh>
				<mesh position={[0, -0.36, 0.17]}>
					<boxGeometry args={[0.12, 0.03, 0.01]} />
					<meshStandardMaterial color={SHOE_ACCENT} emissive={SHOE_ACCENT} emissiveIntensity={0.3} roughness={0.3} />
				</mesh>
			</group>

			{/* Shadow blob */}
			<mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<circleGeometry args={[0.35, 24]} />
				<meshStandardMaterial color="#000000" transparent opacity={0.25} />
			</mesh>

			{/* Subtle green glow under feet */}
			<mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<circleGeometry args={[0.5, 24]} />
				<meshStandardMaterial
					color="#16a34a"
					transparent
					opacity={0.08}
					emissive="#16a34a"
					emissiveIntensity={0.3}
				/>
			</mesh>
		</group>
	);
}
