import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, Text } from "@react-three/drei";
import { Vulnerability } from "@/app/api/osv/[ecosystem]/route";
import { Strauch } from "./Strauch";
import { normalize, sortedVulnerabilityReport } from "./scene-helpers";

interface ThreeSceneProps {
  vulnerabilityReport: Vulnerability[];
  onClick: (vulnerability: Vulnerability) => void;
  onHover: () => void;
  onLeave: () => void;
}

export const ThreeScene: React.FC<ThreeSceneProps> = ({
  vulnerabilityReport,
  onClick,
  onHover,
  onLeave,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const gridMin = -10;
  const gridMax = 10;

  function handleHover() {  
    if (!isHovered) {
      setIsHovered(true);
      onHover();
    }
  }

  function handleLeave() {
    if (isHovered) {
      setIsHovered(false);
      onLeave();
    }
  }

  vulnerabilityReport = sortedVulnerabilityReport(vulnerabilityReport);

  return (
    <div style={{ height: "80vh", width: "100vw" }}>
      <Canvas>
        <Stage preset="rembrandt" intensity={1} environment="forest">
          <group>
            {Array.isArray(vulnerabilityReport) &&
            vulnerabilityReport.length > 0 ? (
              <group>
                {vulnerabilityReport.map((vulnerability, index) => {
                  const x =
                    gridMin +
                    (index / (vulnerabilityReport.length - 1)) *
                      (gridMax - gridMin);
                  const z =
                    gridMin +
                    normalize(vulnerability.severityScore, 0, 10) *
                      (gridMax - gridMin);
                  const scale = vulnerability.severityScore / 2;

                  return (
                    <Strauch
                      key={vulnerability.id}
                      position={[x, 2.5, z]}
                      scale={scale}
                      onClick={() => onClick(vulnerability)}
                      onPointerEnter={handleHover}
                      onPointerLeave={handleLeave}
                    />
                  );
                })}
              </group>
            ) : (
              <Text
                color="white"
                anchorX="center"
                anchorY="middle"
                fontSize={0.1}
              >
                An error occurred. Try refreshing.
              </Text>
            )}
          </group>
        </Stage>
        <gridHelper args={[20, 20]} />
        <OrbitControls autoRotate />
      </Canvas>
    </div>
  );
};
