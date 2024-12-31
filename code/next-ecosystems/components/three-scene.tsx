import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from 'three';
import { OrbitControls } from "@react-three/drei";
import { Ecosystem } from "@/app/page";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { useLoader } from "@react-three/fiber";

interface ThreeSceneProps {
  ecosystem: Ecosystem;
  onClick: () => void;
  onHover: () => void;
  onNoHover: () => void;
}

interface GLTFModelProps {
  url: string;
  onClick: () => void;
  onHover: () => void;
  onNoHover: () => void;
}

const GLTFModel: React.FC<GLTFModelProps> = ({ url, onClick, onHover, onNoHover }) => {
  const gltf = useLoader(GLTFLoader, url);
  const meshRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <primitive
      ref={meshRef}
      object={gltf.scene}
      scale={[2, 2, 2]}
      onClick={onClick}
      onPointerOver={onHover}
      onPointerLeave={onNoHover}
    />
  );
};

export const ThreeScene: React.FC<ThreeSceneProps> = ({
  ecosystem,
  onClick,
  onHover,
  onNoHover,
}) => {
  console.log(ecosystem);

  
  return (
    <div style={{ height: "80vh", width: "100vw" }}>
      <Canvas camera={{ position: [0, 5, 5] }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <GLTFModel url={ecosystem.url} onClick={onClick} onHover={onHover} onNoHover={onNoHover} />
        <OrbitControls />
      </Canvas>
    </div>
  );
};