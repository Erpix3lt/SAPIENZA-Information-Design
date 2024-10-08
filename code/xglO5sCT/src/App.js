import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useCursor, MeshReflectorMaterial, Image, Text, Environment } from '@react-three/drei'
import { useRoute, useLocation } from 'wouter'
import { easing } from 'maath'
import getUuid from 'uuid-by-string'

const GOLDENRATIO = 1.61803398875

const floatingTextStyle = {
  position: 'absolute',
  bottom: '20px',
  left: '20px',
  color: 'white',
  padding: '10px',
  borderRadius: '5px',
  fontSize: '14px',
  zIndex: 10,
  fontFamily: 'sans-serif',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
}

const floatingTextStyleRight = {
  position: 'absolute',
  bottom: '20px',
  right: '20px',
  color: 'gray',
  padding: '10px',
  borderRadius: '5px',
  fontSize: '14px',
  zIndex: 10,
  fontFamily: 'sans-serif',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
}

const linkStyle = {
  color: 'lightgray',
  textDecoration: 'none'
}

const linkStyleSecondary = {
  color: 'gray',
  textDecoration: 'none'
}


export const App = ({ images }) => (
  <>
    <Canvas dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 15] }}>
      <color attach="background" args={['#191920']} />
      <fog attach="fog" args={['#191920', 0, 15]} />
      <group position={[0, -0.5, 0]}>
        <Frames images={images} />
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={2048}
            mixBlur={1}
            mixStrength={80}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#050505"
            metalness={0.5}
          />
        </mesh>
      </group>
      <Environment preset="city" />
    </Canvas>
    <div style={floatingTextStyle}>
      <svg width="12" height="12" viewBox="0 0 24 24" style={{ marginRight: '10px', verticalAlign: 'middle' }}>
        <polygon points="22,12 2,2 2,22" fill="white" />
      </svg>
      <a href="https://www.youtube.com/watch?v=Q9wcvFkWpsM" target="_blank" rel="noopener noreferrer" style={linkStyle}>
        TEDxVancouver - Jer Thorp - The Weight of Data
      </a>
    </div>
    <div style={floatingTextStyleRight}>
      <a href="https://www.jerthorp.com/" target="_blank" rel="noopener noreferrer" style={linkStyleSecondary}>
        Jer Thorp
      </a>
    </div>
  </>
)

function Frames({ images, q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
  const ref = useRef()
  const clicked = useRef()
  const [, params] = useRoute('/item/:id')
  const [, setLocation] = useLocation()
  useEffect(() => {
    clicked.current = ref.current.getObjectByName(params?.id)
    if (clicked.current) {
      clicked.current.parent.updateWorldMatrix(true, true)
      clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25))
      clicked.current.parent.getWorldQuaternion(q)
    } else {
      p.set(0, 0, 5.5)
      q.identity()
    }
  })
  useFrame((state, dt) => {
    easing.damp3(state.camera.position, p, 0.4, dt)
    easing.dampQ(state.camera.quaternion, q, 0.4, dt)
  })
  return (
    <group
      ref={ref}
      onClick={(e) => (e.stopPropagation(), setLocation(clicked.current === e.object ? '/' : '/item/' + e.object.name))}
      onPointerMissed={() => setLocation('/')}>
      {images.map((props) => <Frame key={props.url} {...props} /> /* prettier-ignore */)}
    </group>
  )
}

function Frame({ url, c = new THREE.Color(), ...props }) {
  const image = useRef()
  const frame = useRef()
  const [, params] = useRoute('/item/:id')
  const [hovered, hover] = useState(false)
  const [rnd] = useState(() => Math.random())
  const name = getUuid(url)
  const isActive = params?.id === name
  useCursor(hovered)
  useFrame((state, dt) => {
    image.current.material.zoom = 2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2
    easing.damp3(image.current.scale, [0.85 * (!isActive && hovered ? 0.85 : 1), 0.9 * (!isActive && hovered ? 0.905 : 1), 1], 0.1, dt)
    easing.dampC(frame.current.material.color, hovered ? 'orange' : 'white', 0.1, dt)
  })
  return (
    <group {...props}>
      <mesh
        name={name}
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        scale={[1, GOLDENRATIO, 0.05]}
        position={[0, GOLDENRATIO / 2, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} />
        <mesh ref={frame} raycast={() => null} scale={[0.9, 0.93, 0.9]} position={[0, 0, 0.2]}>
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        <Image raycast={() => null} ref={image} position={[0, 0, 0.7]} url={url} />
      </mesh>
      <Text maxWidth={0.3} anchorX="left" anchorY="top" position={[0.55, GOLDENRATIO, 0]} fontSize={0.025} fontWeight={700}>
        {props.name}
      </Text>
      <Text maxWidth={0.3} anchorX="left" anchorY="top" position={[0.55, GOLDENRATIO - 0.07, 0]} fontSize={0.025}>
        {props.description}
      </Text>
    </group>
  )
}
