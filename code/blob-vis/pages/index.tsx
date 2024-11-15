import { Canvas, ThreeEvent } from "@react-three/fiber";
import {
  AccumulativeShadows,
  CameraControls,
  RandomizedLight,
  Stars,
} from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import Timeline from "../components/timeline";

export interface Keyword {
  Name: string;
  "Start Year": number;
  "End Year": number;
  "Usage Rating": number;
}

export default function Home() {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const controls = useRef<CameraControls | null>(null);
  const [isPressing, setIsPressing] = useState(false);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [hoveredKeyword, setHoveredKeyword] = useState<Keyword | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetch("/api/keywords")
      .then((response) => response.json())
      .then((data) => setKeywords(data));
  }, []);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      setIsPressing(true);
      if (event.clientX < window.innerWidth / 2) {
        setDirection("left");
      } else {
        setDirection("right");
      }
    };

    const handleMouseUp = () => {
      setIsPressing(false);
      setDirection(null);
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPressing && direction) {
      interval = setInterval(() => {
        if (direction === "left") {
          controls.current?.truck(-4, 0.0, true);
        } else if (direction === "right") {
          controls.current?.truck(4, 0.0, true);
        }
      }, 16);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPressing, direction]);

  const handlePointerOver = (keyword: Keyword, event: React.PointerEvent) => {
    setHoveredKeyword(keyword);
    setMousePos({ x: event.clientX, y: event.clientY });
  };

  const handlePointerOut = () => {
    setHoveredKeyword(null);
  };

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (hoveredKeyword) {
      setMousePos({ x: event.clientX, y: event.clientY });
    }
  };

  return (
    <>
      <Canvas
        camera={{ position: [0.0, 0.0, 100.0] as [number, number, number] }}
      >
        <Timeline
          keywords={keywords}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onPointerMove={handlePointerMove}
        />
        <CameraControls ref={controls} />
        <AccumulativeShadows temporal frames={100} scale={10}>
          <RandomizedLight amount={8} position={[5, 5, -10]} />
        </AccumulativeShadows>
        <Stars
          radius={100}
          depth={100}
          count={50000}
          factor={4}
          saturation={2}
          fade
          speed={1}
        />
      </Canvas>
      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: '50%',
          zIndex: 9,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          transform: "translateX(-50%)",
          gap: 5,
          color: "white",
          fontSize: 10
        }}
        >
          <p>Navigate by clicking either on the left or right. Hover to see more information.</p>
        </div>
      {hoveredKeyword && (
        <div
        style={{
          position: "absolute",
          bottom: mousePos.y,
          left: mousePos.x,
          zIndex: 10,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          transform: "translateX(-50%)",
          gap: 5,
          backgroundColor: "rgba(255, 255, 255, 0.2)", 
          backdropFilter: "blur(10px)",
          borderRadius: "10px", 
          padding: "10px", 
          color: "white",
          fontSize: 12
        }}
        >
          <p style={{ margin: 0 }}>{hoveredKeyword["Name"]}</p>
          <p style={{ margin: 0, color: "lightgray" }}>
            {hoveredKeyword["Start Year"]} - {hoveredKeyword["End Year"]}
          </p>
        </div>
      )}
    </>
  );
}
