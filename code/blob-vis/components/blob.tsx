import React, { useMemo, useRef } from "react";
import vertexShader from "./vertexShader";
import fragmentShader from "./fragmentShader";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { MathUtils, type Vector3 } from "three";

interface BlobProps {
  position: Vector3;
  scale: Vector3;
  onPointerOver: (event: ThreeEvent<PointerEvent>) => void;
  onPointerOut: (event: ThreeEvent<PointerEvent>) => void;
  onPointerMove: (event: ThreeEvent<PointerEvent>) => void;
}

const Blob: React.FC<BlobProps> = ({ position, scale, onPointerOver, onPointerOut, onPointerMove }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const hover = useRef(false);
  const uniforms = useMemo(() => {
    return {
      u_time: { value: 0 },
      u_intensity: { value: 0.3 },
    };
  }, []);

  useFrame((state) => {
    const { clock } = state;
    if (mesh.current) {
      (mesh.current.material as THREE.ShaderMaterial).uniforms.u_time.value =
        0.4 * clock.getElapsedTime();

      (mesh.current.material as THREE.ShaderMaterial).uniforms.u_intensity.value = MathUtils.lerp(
        (mesh.current.material as THREE.ShaderMaterial).uniforms.u_intensity.value,
        hover.current ? 0.7 : 0.25,
        0.02
      );
    }
  });

  return (
    <mesh
      ref={mesh}
      scale={scale}
      position={position}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onPointerMove={onPointerMove}
    >
      <icosahedronBufferGeometry args={[2, 20]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        attach="material"
      />
    </mesh>
  );
};

export default Blob;