import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, Text } from "@react-three/drei";
import { Vulnerability } from "@/app/api/osv/[ecosystem]/route";
import { Bush } from "./models/bush";
import { Fountain } from "./models/fountain";
import { Wall } from "./models/wall";
import { FlowerPots } from "./models/flower-pots";
import { SingleFlower } from "./models/single-flower";
import { normalize, sortedVulnerabilityReport } from "./scene-helpers";

interface ViewerSceneProps {
  autoRotate: boolean;
  vulnerabilityReport: Vulnerability[];
  onClick: (vulnerability: Vulnerability) => void;
  onHover: () => void;
  onLeave: () => void;
}

interface ModelProps {
  key: string;
  position: [number, number, number];
  scale: number;
  onClick: () => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}

export const ViewerScene: React.FC<ViewerSceneProps> = ({
  autoRotate,
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

  const renderModel = (severityScore: number | undefined, props: ModelProps) => {
    if (severityScore === undefined || severityScore <= 2) {
      return <Fountain {...props} />;
    } else if (severityScore <= 4) {
      return <Wall {...props} />;
    } else if (severityScore <= 6) {
      return <Bush {...props} />;
    } else if (severityScore <= 8) {
      return <FlowerPots {...props} />;
    } else {
      return <SingleFlower {...props} />;
    }
  };

  return (
    <div style={{ height: "85vh", width: "100vw" }}>
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
                  const scale = (vulnerability.severityScore || 0) / 2 || 1;
                  const y = vulnerability.severityScore > 5 ? 0.5 : 2;


                  return renderModel(vulnerability.severityScore, {
                    key: vulnerability.id,
                    position: [x, y, z],
                    scale: scale,
                    onClick: () => onClick(vulnerability),
                    onPointerEnter: handleHover,
                    onPointerLeave: handleLeave,
                  });
                })}
              </group>
            ) : (
              <Text
                color="white"
                anchorX="center"
                anchorY="middle"
                fontSize={0.1}
              >
                Loading ...
              </Text>
            )}
          </group>
        </Stage>
        <gridHelper args={[20, 20]} />
        <OrbitControls autoRotate={autoRotate} />
      </Canvas>
    </div>
  );
};
