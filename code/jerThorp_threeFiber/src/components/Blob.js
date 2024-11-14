import React, { useRef } from "react";
const Blob = () => {
  const mesh = useRef();

  return (
    <mesh
      ref={mesh}
      scale={1.5}
      position={[0, 0, 0]}
    >
      <icosahedronBufferGeometry args={[2, 20]} />
      <meshStandardMaterial />
    </mesh>
  );
};

export default Blob;
