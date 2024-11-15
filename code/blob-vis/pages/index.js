import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Blob from "../components/Blob";
import { useEffect, useState } from "react";

export default function Home() {
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    fetch('/api/keywords')
      .then(response => response.json())
      .then(data => setKeywords(data));
  }, []);

  const blobPositions = Array.from({ length: 36 }, (_, i) => [0, 0, -i * 2]);
  console.log("keywords", keywords);

  return (
    <div className="container">
      <Canvas camera={{ position: [0.0, 0.0, 8.0] }}>
        {blobPositions.map((position, index) => (
          <Blob key={index} position={position} />
        ))}
          <OrbitControls />
      </Canvas>
    </div>
  );
}