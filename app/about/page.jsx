"use client";
import { Model } from "@/components/Model";
import { Cloud, Clouds, Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import * as THREE from 'three';

const About = () => {
  return (
    <>
      <div>About</div>
      <div className="h-screen">
      <Canvas className="h-screen">
        <Environment preset="city" />
        <OrbitControls />
        {/* <Model /> */}
        <Clouds material={THREE.MeshBasicMaterial}>
          <Cloud segments={40} bounds={[10, 2, 2]} volume={10} color="#3d88ff" />
          <Cloud seed={1} scale={2} volume={5} color="#5ad6ff" fade={100} />
        </Clouds>
      </Canvas>
      </div>
    </>
  );
};

export default About;
