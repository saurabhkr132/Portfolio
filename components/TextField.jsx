import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Plane } from "@react-three/drei";
import * as THREE from "three";

const TextField = ({ onClick, texture, args = [1, 1], position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  const planeRef = useRef();

  useFrame(({ camera, pointer }) => {
    const raycaster = new THREE.Raycaster();
    raycaster.ray.origin.copy(camera.position);
    raycaster.ray.direction.copy(pointer.sub(camera.position).normalize());

    const intersects = raycaster.intersectObject(planeRef.current);

    if (intersects.length > 0) {
      planeRef.current.material.color.set(0xff0000); // Change color to indicate click
    } else {
      planeRef.current.material.color.set(0xffffff); // Reset color
    }
  });

  return (
    <Plane ref={planeRef} args={args} position={position} rotation={rotation} onClick={onClick}>
      <meshBasicMaterial attach="material" map={texture} />
    </Plane>
  );
};

export { TextField };
