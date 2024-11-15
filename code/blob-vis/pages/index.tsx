import { Canvas } from "@react-three/fiber";
import * as THREE from 'three';
import { OrbitControls } from "@react-three/drei";
import Blob from "../components/blob";
import { useEffect, useState } from "react";

interface Keyword {
  Name: string;
  'Start Year': number;
  'End Year': number;
  'Usage Rating': number;
}

export default function Home() {
  const [keywords, setKeywords] = useState<Keyword[]>([]);

  useEffect(() => {
    fetch('/api/keywords')
      .then(response => response.json())
      .then(data => setKeywords(data));
  }, []);
  const blobPositions: THREE.Vector3[] = Array.from({ length: 36 }, (_, i) => new THREE.Vector3(0, 0, -i * 2));

  return (
    <div className="container">
      <Canvas camera={{ position: [0, 0, 8] as [number, number, number] }}>
        {blobPositions.map((position, index) => (
          <Blob key={index} position={position} />
        ))}
        <OrbitControls />
      </Canvas>
    </div>
  );
}