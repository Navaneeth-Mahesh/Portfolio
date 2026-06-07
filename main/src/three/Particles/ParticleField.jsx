import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Particles({ count = 1200 }) {
  const mesh = useRef()
  const mouse = useRef([0, 0])

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return pos
  }, [count])

  const speeds = useMemo(() =>
    new Float32Array(count).map(() => Math.random() * 0.3 + 0.05),
    [count]
  )

  useFrame(({ clock }) => {
    if (!mesh.current) return
    const t = clock.getElapsedTime()
    const posAttr = mesh.current.geometry.attributes.position

    for (let i = 0; i < count; i++) {
      const s = speeds[i]
      posAttr.array[i * 3 + 1] -= s * 0.005
      posAttr.array[i * 3] += Math.sin(t * s + i) * 0.0008

      if (posAttr.array[i * 3 + 1] < -10) {
        posAttr.array[i * 3 + 1] = 10
        posAttr.array[i * 3] = (Math.random() - 0.5) * 20
      }
    }
    posAttr.needsUpdate = true

    // Subtle rotation following mouse
    mesh.current.rotation.y = mouse.current[0] * 0.03
    mesh.current.rotation.x = mouse.current[1] * 0.02
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#ffffff"
        transparent
        opacity={0.5}
        sizeAttenuation
        fog={false}
      />
    </points>
  )
}

export default function ParticleField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
    >
      <Particles />
    </Canvas>
  )
}
