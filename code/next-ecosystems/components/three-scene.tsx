import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from 'three';
import { OrbitControls } from "@react-three/drei";

interface ThreeSceneProps {
  onClick: () => void;
  onHover: () => void;
  onNoHover: () => void;
}

const RotatingMesh: React.FC<ThreeSceneProps> = ({ onClick, onHover, onNoHover }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh
      ref={meshRef}
      onClick={onClick}
      onPointerOver={onHover}
      onPointerLeave={onNoHover}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

export const ThreeScene: React.FC<ThreeSceneProps> = ({
  onClick,
  onHover,
  onNoHover,
}) => {
  return (
    <div style={{ height: "80vh", width: "100vw" }}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <RotatingMesh onClick={onClick} onHover={onHover} onNoHover={onNoHover} />
        <OrbitControls />
      </Canvas>
    </div>
  );
};