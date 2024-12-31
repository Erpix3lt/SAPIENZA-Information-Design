import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from 'three';
import { OrbitControls, Stage } from "@react-three/drei";
import { Ecosystem } from "@/app/page";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { useLoader } from "@react-three/fiber";

interface ThreeSceneProps {
  ecosystem: Ecosystem;
  onClick: () => void;
  onHover: () => void;
  onLeave: () => void;
}

interface GLTFModelProps {
  url: string;
  onClick: () => void;
  onHover: () => void;
  onLeave: () => void;
}

const GLTFModel: React.FC<GLTFModelProps> = ({ url, onClick, onHover, onLeave }) => {
  const gltf = useLoader(GLTFLoader, url);
  const meshRef = useRef<THREE.Group>(null);
  const [rotationSpeed, setRotationSpeed] = useState(0.002);

  const handlePointerOver = () => {
    setRotationSpeed(0.001);
    onHover();
  }

  const handlePointerLeave = () => {  
    setRotationSpeed(0.003);
    onLeave()
  }

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <primitive
      ref={meshRef}
      object={gltf.scene}
      onClick={onClick}
      onPointerOver={handlePointerOver}
      onPointerLeave={handlePointerLeave}
    />
  );
};

export const ThreeScene: React.FC<ThreeSceneProps> = ({
  ecosystem,
  onClick,
  onHover,
  onLeave,
}) => {
  console.log(ecosystem);

  
  return (
    <div style={{ height: "80vh", width: "100vw" }}>
      <Canvas>
        <Stage preset="rembrandt" intensity={1} environment="forest">
          <GLTFModel url={ecosystem.url} onClick={onClick} onHover={onHover} onLeave={onLeave} />
        </Stage>
        <OrbitControls />
      </Canvas>
    </div>
  );
};