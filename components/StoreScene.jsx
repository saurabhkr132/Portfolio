"use client";

import React, { useState, useRef } from "react";
import { BookStore } from "@/components/BookStore";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const CameraAnimation = () => {
  const { camera, clock } = useThree();
  const start = useRef({ x: 0, y: -5, z: 10 });
  const end = useRef({ x: 0, y: 2, z: 4 });

  const [animationComplete, setAnimationComplete] = useState(false);
  
  useFrame(() => {
    if (animationComplete) return;

    const elapsedTime = clock.getElapsedTime();
    const duration = 3; // duration of animation in seconds
    const progress = Math.min(elapsedTime / duration, 1);

    camera.position.lerpVectors(
      new THREE.Vector3(start.current.x, start.current.y, start.current.z),
      new THREE.Vector3(end.current.x, end.current.y, end.current.z),
      progress
    );

    camera.lookAt(0, 0, 0);

    if (progress === 1) {
      // Stop further updates once the animation is complete
      camera.position.set(end.current.x, end.current.y, end.current.z);
      setAnimationComplete(true);
    }
  });

  return null;
};

const StoreScene = () => {
  return (
    <Canvas shadows camera={{ position: [0, -5, 10], fov: 50 }}>
      <Environment preset="city" />
      <OrbitControls minDistance={1} maxDistance={5} />
      <CameraAnimation />
      <BookStore />
    </Canvas>
  );
};

export default StoreScene
