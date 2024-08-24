import React, { useEffect, useRef, useState } from "react";
import { useGLTF, PerspectiveCamera, useAnimations } from "@react-three/drei";
import { useGUI } from "./useGUI";
import { degToRad } from "three/src/math/MathUtils";
import * as THREE from 'three';
import { useRouter } from 'next/navigation';


const modelPath = "./assets/models/isoRoom-transformed.glb";

function ReadingLightScene() {
  const rectAreaLightRef = useRef(null);
  // useHelper(rectAreaLightRef, RectAreaLightHelper, "red");
  // useGUI((gui) => {
  //   const positionFolder = gui.addFolder("Position");
  //   positionFolder.add(rectAreaLightRef.current.position, "x", -1, 1);
  //   positionFolder.add(rectAreaLightRef.current.position, "y", -1, 1);
  //   positionFolder.add(rectAreaLightRef.current.position, "z", -1, 1);

  //   const rotationFolder = gui.addFolder("Rotation");
  //   rotationFolder.add(rectAreaLightRef.current.rotation, "x", 0, degToRad(360)).name("Rotate X");
  //   rotationFolder.add(rectAreaLightRef.current.rotation, "y", 0, degToRad(360)).name("Rotate Y");
  //   rotationFolder.add(rectAreaLightRef.current.rotation, "z", 0, degToRad(360)).name("Rotate Z");

  //   const sizeFolder = gui.addFolder("Size");
  //   sizeFolder.add(rectAreaLightRef.current, "width", 0, 10).name("Width");
  //   sizeFolder.add(rectAreaLightRef.current, "height", 0, 10).name("Height");
  // });

  return (
    <>
      <rectAreaLight
        ref={rectAreaLightRef}
        intensity={2000}
        width={0.02}
        height={0.04}
        // position={[0.401, -0.216, -0.371]}
        position={[0.258, -0.03, -0.37]}
        rotation={[4.72, 0, 1.56]}
        color={"#ffffff"}
        // lookAt={[2, 2, 2]}
        castShadow
      />
    </>
  );
}


export function IsoRoom(props) {
  const router = useRouter();

  const model = useRef();
  const switch1 = useRef();
  const cupboard1 = useRef();
  const cupboard2 = useRef();
  const cupboard3 = useRef();
  const readingLightSwitchRef = useRef();
  // const notebook = useRef();

  const goToSore = () => {
    router.push('/store');
  };

  const [switchOn, setSwitchOn] = useState(false);
  const [readingLightOn, setReadingLightOn] = useState(false);
  const [cupboard1OUT, setCupboard1OUT] = useState(false);
  const [cupboard2OUT, setCupboard2OUT] = useState(false);
  const [cupboard3OUT, setCupboard3OUT] = useState(false);

  const { nodes, materials, animations } = useGLTF(modelPath);
  const { actions, names } = useAnimations(animations, model);

  console.log(switchOn);
  

  // useGUI((gui) => {
  //   const positionFolder = gui.addFolder("Position");
  //   positionFolder.add(notebook.current.position, "x", -10, 10);
  //   positionFolder.add(notebook.current.position, "y", -10, 10);
  //   positionFolder.add(notebook.current.position, "z", -10, 10);

    // const rotationFolder = gui.addFolder("Rotation");
    // rotationFolder.add(notebook.current.rotation, "x", 0, degToRad(360));
    // rotationFolder.add(notebook.current.rotation, "y", 0, degToRad(360));
    // rotationFolder.add(notebook.current.rotation, "z", 0, degToRad(360));

    // const scaleFolder = gui.addFolder("Scale");
    // scaleFolder
    //   .add(
    //     { uniformScale: notebook.current.scale.x },
    //     "uniformScale",
    //     0.1,
    //     10
    //   )
    // .onChange((value) => {
    //   notebook.current.scale.set(value, value, value);
    // });
  // });

  // useEffect(() => {
  //     for(let i=0; i<names.length; ++i){
  //       // actions[names[i]].reset().fadeIn(10).play()
  //       actions[names[i]].play()
  //     }
  //   }, []);

  const toggleSwitch = () => {
    console.log("Switch pressed !");
    setSwitchOn(prev => !prev);
  };

  const toggleCupboard1 = () => {
    console.log("Cupboard1 toggled !");
    setCupboard1OUT(prev => !prev);
  };
  const toggleCupboard2 = () => {
    console.log("Cupboard2 toggled !");
    setCupboard2OUT(prev => !prev);
  };
  const toggleCupboard3 = () => {
    console.log("Cupboard3 toggled !");
    setCupboard3OUT(prev => !prev);
  };

  const toggleReadingLightSwitch = () => {
    console.log("Reading light switch pressed !");
    setReadingLightOn(prev => !prev);
  };

  return (
    <>
    {readingLightOn && <ReadingLightScene />}
    <group ref={model} {...props} dispose={null}>
      <PerspectiveCamera name="Camera" makeDefault={false} far={1000} near={0.1} fov={22.895} position={[1.858, 1.935, 2.675]} rotation={[-0.59, 0.541, 0.332]} />
      {/* <spotLight intensity={1087.028} angle={Math.PI / 8} penumbra={0.15} decay={2} position={[0.259, -0.025, -0.368]} rotation={[-1.617, 0.391, -0.546]} target={nodes.studyLight.target}>
        <primitive object={nodes.studyLight.target} position={[0, 0, -1]} />
      </spotLight> */}
      <mesh name="wall" castShadow receiveShadow geometry={nodes.wall.geometry} material={materials.wall} />
      <mesh name="IDhanger" castShadow receiveShadow geometry={nodes.IDhanger.geometry} material={materials.hanger} position={[-0.93, 0.564, -0.505]} rotation={[0, 0, -Math.PI / 2]} scale={-0.021} />
      <mesh name="hanger" castShadow receiveShadow geometry={nodes.hanger.geometry} material={materials.hanger} position={[-0.915, 0.726, 0.462]} rotation={[-Math.PI, 0, -Math.PI]} scale={[-0.009, -0.017, -0.244]} />
      <mesh name="idStrip" castShadow receiveShadow geometry={nodes.idStrip.geometry} material={materials.idStrip} position={[-0.908, 0.545, -0.466]} rotation={[0, 0, -Math.PI / 2]} scale={[-0.034, -0.063, -0.006]} />
      <mesh name="id" castShadow receiveShadow geometry={nodes.id.geometry} material={materials.id} position={[-0.908, 0.047, -0.56]} rotation={[0, 0, -Math.PI / 2]} scale={[-0.049, -0.041, -0.041]} />
      <mesh name="container" castShadow receiveShadow geometry={nodes.container.geometry} material={materials.woodContainer} position={[-0.014, 0.757, -0.721]} scale={[0.561, 0.243, 0.186]} />
      <mesh name="bottle" castShadow receiveShadow geometry={nodes.bottle.geometry} material={materials.bottle} position={[-0.578, -0.186, -0.392]} scale={[0.037, 0.036, 0.037]} />
      <mesh name="bottleCap" castShadow receiveShadow geometry={nodes.bottleCap.geometry} material={materials.bottleCap} position={[-0.578, -0.182, -0.392]} scale={[0.042, 0.036, 0.042]} />
      <mesh name="bottleWater" castShadow receiveShadow geometry={nodes.bottleWater.geometry} material={materials.water} position={[-0.578, -0.186, -0.392]} scale={[0.036, 0.035, 0.036]} />
      <group onClick={goToSore} name="notebook" position={[0.142, -0.208, -0.49]} scale={[0.102, 0.013, 0.137]}>
        <mesh name="Cube006" castShadow receiveShadow geometry={nodes.Cube006.geometry} material={materials.notebook} />
        <mesh name="Cube006_1" castShadow receiveShadow geometry={nodes.Cube006_1.geometry} material={materials.spring} />
        <mesh name="Cube006_2" castShadow receiveShadow geometry={nodes.Cube006_2.geometry} material={materials.notes} />
        <mesh name="Cube006_3" castShadow receiveShadow geometry={nodes.Cube006_3.geometry} material={materials.pages} />
        <mesh name="Cube006_4" castShadow receiveShadow geometry={nodes.Cube006_4.geometry} material={materials.pages} />
      </group>
      <group name="plug" position={[0.488, 0.31, -0.915]} scale={[0.042, 0.042, 0.009]}>
        <mesh name="Cube022" castShadow receiveShadow geometry={nodes.Cube022.geometry} material={materials['switch']} />
        <mesh name="Cube022_1" castShadow receiveShadow geometry={nodes.Cube022_1.geometry} material={materials['switch']} />
      </group>
      <group name="phone" position={[0.134, -0.216, -0.269]} rotation={[-Math.PI, 0, -Math.PI]} scale={[-0.04, -0.005, -0.069]}>
        <mesh name="Cube009" castShadow receiveShadow geometry={nodes.Cube009.geometry} material={materials.phone} />
        <mesh name="Cube009_1" castShadow receiveShadow geometry={nodes.Cube009_1.geometry} material={materials.phone} />
      </group>
      <mesh name="phoneScreen" castShadow receiveShadow geometry={nodes.phoneScreen.geometry} material={switchOn ? materials.phoneScreen : new THREE.MeshBasicMaterial({ color: "black" })} position={[0.134, -0.216, -0.269]} rotation={[-Math.PI, 0, -Math.PI]} scale={[-0.043, -0.005, -0.074]} />
      <mesh onClick={toggleSwitch} ref={switch1} name="plugSwitch" castShadow receiveShadow geometry={nodes.plugSwitch.geometry} material={materials['switch']} position={[0.501, 0.311, -0.904]} rotation={[switchOn? 0.262: -0.262, 0.002, 0]} scale={[0.006, 0.019, 0.006]} />
      <group name="cupboardCover" position={[0.253, -0.567, -0.511]} scale={[0.182, 0.24, 0.32]}>
        <mesh name="Cube003" castShadow receiveShadow geometry={nodes.Cube003.geometry} material={materials.blackMetal} />
        <mesh name="Cube003_1" castShadow receiveShadow geometry={nodes.Cube003_1.geometry} material={materials.blackMetal} />
      </group>
      <mesh name="tableTopMetal" castShadow receiveShadow geometry={nodes.tableTopMetal.geometry} material={materials.blackMetal} position={[-0.159, -0.253, -0.509]} scale={[0.669, 0.028, 0.312]} />
      <mesh ref={cupboard1} onClick={toggleCupboard1} name="cupboard1" castShadow receiveShadow geometry={nodes.cupboard1.geometry} material={materials.cupboard} position={[0.252, -0.413, cupboard1OUT? -0.2:-0.497]} scale={[0.165, 0.077, 0.314]} />
      <mesh ref={cupboard2} onClick={toggleCupboard2} name="cupboard2" castShadow receiveShadow geometry={nodes.cupboard2.geometry} material={materials.cupboard} position={[0.252, -0.565, cupboard2OUT? -0.2:-0.497]} scale={[0.165, 0.077, 0.314]} />
      <mesh ref={cupboard3} onClick={toggleCupboard3} name="cupboard3" castShadow receiveShadow geometry={nodes.cupboard3.geometry} material={materials.cupboard} position={[0.252, -0.718, cupboard3OUT? -0.2:-0.497]} scale={[0.165, 0.077, 0.314]} />
      <mesh name="tableLeg1" castShadow receiveShadow geometry={nodes.tableLeg1.geometry} material={materials.blackMetal} position={[-1.318, -0.239, 0.039]} />
      <mesh name="tableLeg2" castShadow receiveShadow geometry={nodes.tableLeg2.geometry} material={materials.blackMetal} position={[0.877, -0.239, 0.308]} rotation={[0, Math.PI / 2, 0]} />
      <mesh name="tableTop" castShadow receiveShadow geometry={nodes.tableTop.geometry} material={materials.woodTable} position={[-0.159, -0.233, -0.509]} scale={[0.686, 0.028, 0.335]} />
      <mesh name="chairNet1" castShadow receiveShadow geometry={nodes.chairNet1.geometry} material={materials.net} position={[0, -0.356, 0.467]} scale={[0.164, 0.17, 0.005]} />
      <mesh name="chairNet2" castShadow receiveShadow geometry={nodes.chairNet2.geometry} material={materials.net} position={[0, -0.559, 0.293]} rotation={[Math.PI / 2, 0, 0]} scale={[0.164, 0.159, 0.005]} />
      <mesh name="chairMetal" castShadow receiveShadow geometry={nodes.chairMetal.geometry} material={materials.blackMetal} position={[0, -0.177, 0.468]} scale={0.123} />
      <group name="laptopCPU" position={[-0.278, -0.21, -0.381]} rotation={[Math.PI, 0, Math.PI]} scale={[0.187, 0.006, 0.115]}>
        <mesh name="Cube017" castShadow receiveShadow geometry={nodes.Cube017.geometry} material={materials.keyboard} />
        <mesh name="Cube017_1" castShadow receiveShadow geometry={nodes.Cube017_1.geometry} material={materials.keyboard} />
      </group>
      <mesh name="laptopMonitor" castShadow receiveShadow geometry={nodes.laptopMonitor.geometry} material={materials.laptopScreen} position={[-0.279, -0.105, -0.508]} rotation={[1.445, 0, 0]} scale={[0.187, 0.004, 0.115]} />
      <mesh name="laptopHinge" castShadow receiveShadow geometry={nodes.laptopHinge.geometry} material={materials.laptopHinge} position={[-0.279, -0.207, -0.491]} rotation={[0, 0, -Math.PI / 2]} scale={[0.006, 0.114, 0.006]} />
      <mesh name="laptopKeyboard" castShadow receiveShadow geometry={nodes.laptopKeyboard.geometry} material={materials.keyboard} position={[-0.29, -0.21, -0.396]} rotation={[Math.PI, 0, Math.PI]} scale={[0.183, 0.007, 0.113]} />
      <mesh name="laptopScreen" castShadow receiveShadow geometry={nodes.laptopScreen.geometry} material={materials.laptopScreen} position={[-0.279, -0.105, -0.508]} rotation={[1.445, 0, 0]} scale={[0.187, 0.004, 0.115]} />
      <mesh name="readingLight" castShadow receiveShadow geometry={nodes.readingLight.geometry} material={materials.readingLight} position={[0.401, -0.216, -0.371]} rotation={[0, -Math.PI / 2, 0]} scale={[0.046, 0.005, 0.046]} />
      <mesh name="readingLightGlow" castShadow receiveShadow geometry={nodes.readingLightGlow.geometry} material={nodes.readingLightGlow.material} position={[0.401, -0.215, -0.371]} rotation={[0, -Math.PI / 2, 0]} scale={[0.046, 0.005, 0.046]} />
      <mesh ref={readingLightSwitchRef} onClick={toggleReadingLightSwitch} name="readingLightSwitch" castShadow receiveShadow geometry={nodes.readingLightSwitch.geometry} material={materials.Material} position={[0.401, -0.216, -0.371]} rotation={[0, -Math.PI / 2, 0]} scale={[0.046, 0.005, 0.046]} />
      <mesh name="phoneChargerAdapter" castShadow receiveShadow geometry={nodes.phoneChargerAdapter.geometry} material={materials.phoneCharger} position={[0.478, 0.303, -0.855]} scale={[0.006, 0.002, 0.004]} />
      <mesh name="phoneChargerPlug" castShadow receiveShadow geometry={nodes.phoneChargerPlug.geometry} material={materials.phoneChargerPlug} position={[0.478, 0.303, -0.855]} scale={[0.006, 0.002, 0.004]} />
      <mesh name="phoneChargerTypeC1" castShadow receiveShadow geometry={nodes.phoneChargerTypeC1.geometry} material={materials.phoneCharger} position={[0.478, 0.303, -0.869]} scale={[0.006, 0.002, 0.004]} />
      <mesh name="phoneChargerTypeC2" castShadow receiveShadow geometry={nodes.phoneChargerTypeC2.geometry} material={materials.phoneCharger} position={[0.134, -0.216, -0.202]} scale={[0.006, 0.002, 0.004]} />
      <mesh name="phoneChargerWire" castShadow receiveShadow geometry={nodes.phoneChargerWire.geometry} material={materials.phoneCharger} position={[0.134, -0.216, -0.15]} rotation={[0, Math.PI / 2, 0]} scale={0.009} />
    </group>
    </>
  )
}

useGLTF.preload(modelPath);
