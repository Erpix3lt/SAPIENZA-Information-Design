// src/Home.js
import React from 'react';
import { Canvas } from '@react-three/fiber';
import Blob from './components/Blob'; // Adjust the import path if Blob.js is in src/components

export function App() {
  return (
    <div className="container">
      <Canvas camera={{ position: [0.0, 0.0, 8.0] }}>
        //generate 10 blobs
        
        <Blob />
      </Canvas>
    </div>
  );
}
