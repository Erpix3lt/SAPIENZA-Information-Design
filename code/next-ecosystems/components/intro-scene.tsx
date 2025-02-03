import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { Bush } from "./models/bush";

interface IntroSceneProps {
  onClick: () => void;
  onHover: () => void;
  onLeave: () => void;
}

export const IntroScene: React.FC<IntroSceneProps> = ({
  onClick,
  onHover,
  onLeave,
}) => {
  return (
    <div style={{ height: "85vh", width: "100vw" }}>
      <Canvas>
        <Stage preset="rembrandt" intensity={1} environment="forest">
          <Bush
            onClick={onClick}
            onPointerEnter={onHover}
            onPointerLeave={onLeave}
          />
        </Stage>
        <gridHelper args={[20, 20]} />
        <OrbitControls autoRotate />
      </Canvas>
    </div>
  );
};
