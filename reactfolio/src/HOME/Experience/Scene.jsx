import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import Avatar from "./Avatar";

// Floating geometric shapes that react to mouse
function FloatingShape({ position, geometry, color, speed, rotationSpeed, scale = 1 }) {
	const meshRef = useRef();
	const initialPos = useMemo(() => new THREE.Vector3(...position), [position]);
	const timeOffset = useMemo(() => Math.random() * Math.PI * 2, []);

	useFrame((state) => {
		if (!meshRef.current) return;
		const t = state.clock.elapsedTime * speed + timeOffset;

		// Float animation
		meshRef.current.position.y = initialPos.y + Math.sin(t) * 0.5;
		meshRef.current.position.x = initialPos.x + Math.sin(t * 0.7) * 0.3;

		// Rotation
		meshRef.current.rotation.x += rotationSpeed * 0.01;
		meshRef.current.rotation.y += rotationSpeed * 0.015;
		meshRef.current.rotation.z += rotationSpeed * 0.005;

		// Mouse reactivity
		const mouseX = state.pointer.x * 0.3;
		const mouseY = state.pointer.y * 0.3;
		meshRef.current.position.x += mouseX * 0.1;
		meshRef.current.position.y += mouseY * 0.1;
	});

	return (
		<mesh ref={meshRef} position={position} scale={scale}>
			{geometry === "octahedron" && <octahedronGeometry args={[1, 0]} />}
			{geometry === "icosahedron" && <icosahedronGeometry args={[1, 0]} />}
			{geometry === "torus" && <torusGeometry args={[1, 0.4, 16, 32]} />}
			{geometry === "torusKnot" && <torusKnotGeometry args={[0.8, 0.3, 100, 16]} />}
			{geometry === "dodecahedron" && <dodecahedronGeometry args={[1, 0]} />}
			<meshStandardMaterial
				color={color}
				wireframe
				transparent
				opacity={0.3}
				emissive={color}
				emissiveIntensity={0.1}
			/>
		</mesh>
	);
}

// Particle field
function Particles({ count = 2000 }) {
	const pointsRef = useRef();
	const { positions, velocities } = useMemo(() => {
		const positions = new Float32Array(count * 3);
		const velocities = new Float32Array(count * 3);
		for (let i = 0; i < count; i++) {
			positions[i * 3] = (Math.random() - 0.5) * 40;
			positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
			positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
			velocities[i * 3] = (Math.random() - 0.5) * 0.01;
			velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
			velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
		}
		return { positions, velocities };
	}, [count]);

	useFrame((state) => {
		if (!pointsRef.current) return;
		const posArray = pointsRef.current.geometry.attributes.position.array;
		for (let i = 0; i < count; i++) {
			posArray[i * 3] += velocities[i * 3];
			posArray[i * 3 + 1] += velocities[i * 3 + 1];
			posArray[i * 3 + 2] += velocities[i * 3 + 2];

			// Wrap around
			for (let j = 0; j < 3; j++) {
				if (posArray[i * 3 + j] > 20) posArray[i * 3 + j] = -20;
				if (posArray[i * 3 + j] < -20) posArray[i * 3 + j] = 20;
			}
		}
		pointsRef.current.geometry.attributes.position.needsUpdate = true;

		// Slow rotation of entire particle field
		pointsRef.current.rotation.y += 0.0002;
		pointsRef.current.rotation.x += 0.0001;
	});

	return (
		<points ref={pointsRef}>
			<bufferGeometry>
				<bufferAttribute
					attach="attributes-position"
					count={count}
					array={positions}
					itemSize={3}
				/>
			</bufferGeometry>
			<pointsMaterial
				size={0.04}
				color="#16a34a"
				transparent
				opacity={0.6}
				sizeAttenuation
				depthWrite={false}
			/>
		</points>
	);
}

// Connecting lines between nearby particles
function ConnectionLines() {
	const lineRef = useRef();
	const { viewport } = useThree();

	const nodes = useMemo(() => {
		const arr = [];
		for (let i = 0; i < 30; i++) {
			arr.push({
				pos: new THREE.Vector3(
					(Math.random() - 0.5) * 20,
					(Math.random() - 0.5) * 12,
					(Math.random() - 0.5) * 10
				),
				vel: new THREE.Vector3(
					(Math.random() - 0.5) * 0.02,
					(Math.random() - 0.5) * 0.02,
					(Math.random() - 0.5) * 0.01
				),
			});
		}
		return arr;
	}, []);

	useFrame(() => {
		if (!lineRef.current) return;
		const positions = [];

		nodes.forEach((node) => {
			node.pos.add(node.vel);
			if (Math.abs(node.pos.x) > 10) node.vel.x *= -1;
			if (Math.abs(node.pos.y) > 6) node.vel.y *= -1;
			if (Math.abs(node.pos.z) > 5) node.vel.z *= -1;
		});

		for (let i = 0; i < nodes.length; i++) {
			for (let j = i + 1; j < nodes.length; j++) {
				const dist = nodes[i].pos.distanceTo(nodes[j].pos);
				if (dist < 5) {
					positions.push(
						nodes[i].pos.x, nodes[i].pos.y, nodes[i].pos.z,
						nodes[j].pos.x, nodes[j].pos.y, nodes[j].pos.z
					);
				}
			}
		}

		const geometry = lineRef.current.geometry;
		geometry.setAttribute(
			"position",
			new THREE.Float32BufferAttribute(positions, 3)
		);
		geometry.attributes.position.needsUpdate = true;
	});

	return (
		<lineSegments ref={lineRef}>
			<bufferGeometry />
			<lineBasicMaterial color="#16a34a" transparent opacity={0.08} />
		</lineSegments>
	);
}

// Camera rig that follows mouse
function CameraRig() {
	useFrame((state) => {
		const t = state.clock.elapsedTime * 0.1;
		state.camera.position.x = THREE.MathUtils.lerp(
			state.camera.position.x,
			state.pointer.x * 2,
			0.02
		);
		state.camera.position.y = THREE.MathUtils.lerp(
			state.camera.position.y,
			state.pointer.y * 1.5 + 1,
			0.02
		);
		state.camera.lookAt(0, 0, 0);
	});

	return null;
}

// Ground grid
function Grid() {
	const gridRef = useRef();

	useFrame((state) => {
		if (!gridRef.current) return;
		gridRef.current.position.z = -(state.clock.elapsedTime * 0.5) % 2;
	});

	return (
		<group ref={gridRef} position={[0, -4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
			<gridHelper
				args={[60, 60, "#16a34a", "#16a34a"]}
				material-transparent
				material-opacity={0.05}
			/>
		</group>
	);
}

export default function Scene({ scrollProgress = 0 }) {
	const shapes = useMemo(
		() => [
			{ position: [-6, 2, -5], geometry: "octahedron", color: "#16a34a", speed: 0.5, rotationSpeed: 1, scale: 1.2 },
			{ position: [5, -1, -8], geometry: "icosahedron", color: "#22c55e", speed: 0.7, rotationSpeed: 0.8, scale: 1.5 },
			{ position: [-3, -2, -3], geometry: "torus", color: "#15803d", speed: 0.4, rotationSpeed: 1.2, scale: 0.8 },
			{ position: [7, 3, -6], geometry: "torusKnot", color: "#16a34a", speed: 0.6, rotationSpeed: 0.6, scale: 0.7 },
			{ position: [0, 4, -10], geometry: "dodecahedron", color: "#22c55e", speed: 0.3, rotationSpeed: 0.9, scale: 1.0 },
			{ position: [-8, 0, -7], geometry: "icosahedron", color: "#15803d", speed: 0.5, rotationSpeed: 1.1, scale: 0.6 },
			{ position: [4, -3, -4], geometry: "octahedron", color: "#16a34a", speed: 0.8, rotationSpeed: 0.7, scale: 0.9 },
		],
		[]
	);

	return (
		<>
			<ambientLight intensity={0.2} />
			<pointLight position={[10, 10, 10]} intensity={0.5} color="#16a34a" />
			<pointLight position={[-10, -10, -10]} intensity={0.3} color="#22c55e" />
			<directionalLight position={[0, 5, 5]} intensity={0.3} />

			<fog attach="fog" args={["#0a0a0a", 15, 40]} />

			<Particles count={1500} />
			<ConnectionLines />
			<Grid />

			{shapes.map((shape, i) => (
				<FloatingShape key={i} {...shape} />
			))}

			{/* 3D Avatar — chibi Leslie standing in the scene */}
			<group position={[4, -2.2, 1]}>
				<spotLight
					position={[2, 4, 3]}
					angle={0.5}
					penumbra={0.8}
					intensity={1.5}
					color="#22c55e"
					target-position={[0, 0, 0]}
				/>
				<pointLight position={[0, 2, 2]} intensity={0.6} color="#ffffff" />
				<Avatar position={[0, 0, 0]} action="wave" scale={0.65} />
			</group>

			<CameraRig />
		</>
	);
}
