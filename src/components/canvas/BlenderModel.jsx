import React from 'react';
import { useGLTF } from '@react-three/drei';

/**
 * A reusable component to load '.glb' models exported from Blender.
 * Ensure the original file is placed in the `public/` folder.
 * 
 * Usage:
 * <BlenderModel url="/my-model.glb" scale={2} position={[0, -1, 0]} />
 */
export function BlenderModel({ url, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={scale} position={position} rotation={rotation} />;
}
