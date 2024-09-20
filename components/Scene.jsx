"use client";

import { Environment, OrbitControls, useHelper } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { IsoRoom } from "@/components/IsoRoom";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib";
import { useGUI } from "./useGUI";
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";
import { degToRad } from "three/src/math/MathUtils";
import {
  DirectionalLight,
  DirectionalLightHelper,
  Mesh,
  PointLight,
  PointLightHelper,
  RectAreaLight,
  SpotLight,
  SpotLightHelper,
} from "three";



const Scene = () => {
  // RectAreaLightUniformsLib.init();
  const light = useRef();
  const model = useRef();

  

  return (
    <>
      <Canvas shadows >

        <OrbitControls minDistance={-20} maxDistance={30} />
        {/* <directionalLight
          castShadow
          position={[2.5, 8, 70]}
          shadow-mapSize={[1024, 1024]}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        /> */}
        {/* <hemisphereLight position={[1,10,1]} intensity={1} /> */}
        {/* <spotLight
          ref={light}
          position={[0.401, -0.216, -0.371]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.046, 0.005, 0.046]}
          castShadow
          intensity={50}
        /> */}
        <Environment preset="night" />
        {/* <Environment preset="city" /> */}
        <IsoRoom ref={model} scale={1} />
      </Canvas>
    </>
  );
};

export default Scene;
