import React, { useEffect, useRef, useState } from "react";
import {
  Html,
  useGLTF,
  PerspectiveCamera,
  useAnimations,
  useHelper,
} from "@react-three/drei";
import { useGUI } from "./useGUI";
import { degToRad } from "three/src/math/MathUtils";
import * as THREE from "three";
import { useRouter } from "next/navigation";
import ContactMe from "./ContactMe";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";
import { CiBatteryCharging } from "react-icons/ci";
import { IoBatteryChargingSharp } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

const modelPath = "./assets/models/isoRoom1.glb";

function ReadingLightScene() {
  const rectAreaLightRef = useRef(null);

  // useHelper(rectAreaLightRef, RectAreaLightHelper, "red");
  // useGUI((gui) => {
  //   const positionFolder = gui.addFolder("Position");
  //   positionFolder.add(rectAreaLightRef.current.position, "x", -20, 20);
  //   positionFolder.add(rectAreaLightRef.current.position, "y", -20, 20);
  //   positionFolder.add(rectAreaLightRef.current.position, "z", -20, 20);

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
        intensity={1000}
        width={0.04} // {0.26}
        height={0.07} // {0.63}
        position={[0.26, -0.464, -1.395]}
        // position={[2.1, -3.72, -11.18]}
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
  // const cupboard1 = useRef();
  // const cupboard2 = useRef();
  // const cupboard3 = useRef();
  const readingLightSwitchRef = useRef();
  // const notebook = useRef();

  const ligRef = useRef();

  const goToSore = () => {
    router.push("/store");
  };

  const [switchOn, setSwitchOn] = useState(false);
  const [readingLightOn, setReadingLightOn] = useState(false);
  const [cupboard1OUT, setCupboard1OUT] = useState(false);
  const [cupboard2OUT, setCupboard2OUT] = useState(false);
  const [cupboard3OUT, setCupboard3OUT] = useState(false);

  const { nodes, materials, animations } = useGLTF(modelPath);
  const { actions, names } = useAnimations(animations, model);

  // Tubelight
  // useGUI((gui) => {
  //   const positionFolder = gui.addFolder("Position");
  //   positionFolder.add(ligRef.current.position, "x", -10, 10);
  //   positionFolder.add(ligRef.current.position, "y", -10, 10);
  //   positionFolder.add(ligRef.current.position, "z", -10, 10);

  //   const rotationFolder = gui.addFolder("Rotation");
  //   rotationFolder.add(ligRef.current.rotation, "x", 0, degToRad(360));
  //   rotationFolder.add(ligRef.current.rotation, "y", 0, degToRad(360));
  //   rotationFolder.add(ligRef.current.rotation, "z", 0, degToRad(360));

  //   const scaleFolder = gui.addFolder("Scale");
  //   scaleFolder
  //     .add({ uniformScale: ligRef.current.scale.x }, "uniformScale", 0.1, 10)
  //     .onChange((value) => {
  //       ligRef.current.scale.set(value, value, value);
  //     });
  // });

  // useEffect(() => {
  //     for(let i=0; i<names.length; ++i){
  //       // actions[names[i]].reset().fadeIn(10).play()
  //       actions[names[i]].play()
  //     }
  //   }, []);

  const toggleSwitch = () => {
    console.log("Switch pressed !");
    setSwitchOn((prev) => !prev);
  };

  // const toggleCupboard1 = () => {
  //   console.log("Cupboard1 toggled !");
  //   setCupboard1OUT((prev) => !prev);
  // };
  // const toggleCupboard2 = () => {
  //   console.log("Cupboard2 toggled !");
  //   setCupboard2OUT((prev) => !prev);
  // };
  // const toggleCupboard3 = () => {
  //   console.log("Cupboard3 toggled !");
  //   setCupboard3OUT((prev) => !prev);
  // };

  const toggleReadingLightSwitch = () => {
    console.log("Reading light switch pressed !");
    setReadingLightOn((prev) => !prev);
  };

  const { camera, gl, scene } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const pointer = useRef(new THREE.Vector2());

  const handleClick = (event) => {
    pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.current.setFromCamera(pointer.current, camera);

    // Get all intersected objects sorted by distance
    const intersects = raycaster.current.intersectObjects(scene.children);

    if (intersects.length > 0) {
      // Only consider the first intersect (the closest)
      const firstObject = intersects[0].object;
      console.log("Clicked on:", firstObject.name);

      if (firstObject.name == "cupboard1") {
        console.log("Cupboard1 toggled !");
        const targetZ = cupboard1OUT ? -0.597 : -1.627;
        setCupboard1OUT((prev) => !prev);
        gsap.to(firstObject.position, {
          z: targetZ,
          duration: 1,
          ease: "power2.out",
        });
      }
      if (firstObject.name == "cupboard2") {
        console.log("Cupboard2 toggled !");
        const targetZ = cupboard2OUT ? -0.597 : -1.627;
        setCupboard2OUT((prev) => !prev);
        gsap.to(firstObject.position, {
          z: targetZ,
          duration: 1,
          ease: "power2.out",
        });
      }
      if (firstObject.name == "cupboard3") {
        console.log("Cupboard3 toggled !");
        const targetZ = cupboard3OUT ? -0.597 : -1.627;
        setCupboard3OUT((prev) => !prev);
        gsap.to(firstObject.position, {
          z: targetZ,
          duration: 1,
          ease: "power2.out",
        });
      }
    }

    event.stopPropagation();
  };

  return (
    <>
      {readingLightOn && <ReadingLightScene />}
      <group {...props} ref={model} dispose={null} onClick={handleClick}>
        <directionalLight
          ref={ligRef}
          intensity={5}
          width={0.02}
          height={0.04}
          // position={[0.401, -0.216, -0.371]}
          position={[0.258, -0.03, -0.37]}
          rotation={[4.72, 0, 1.56]}
          color={"#ffffff"}
          // lookAt={[2, 2, 2]}
          castShadow
        />
        <PerspectiveCamera
          name="Camera"
          makeDefault={false}
          far={10000}
          near={0}
          fov={22.895}
          position={[1.858, 1.935, 2.675]}
          rotation={[-0.59, 0.541, 0.332]}
        />
        {/* <spotLight intensity={1087.028} angle={Math.PI / 8} penumbra={0.15} decay={2} position={[0.259, -0.025, -0.368]} rotation={[-1.617, 0.391, -0.546]} target={nodes.studyLight.target}>
          <primitive object={nodes.studyLight.target} position={[0, 0, -1]} />
        </spotLight> */}
        <group name="wall" position={[-0.221, -0.412, -0.722]} scale={1.821}>
          <mesh
            name="Cube"
            castShadow
            receiveShadow
            geometry={nodes.Cube.geometry}
            material={materials.wall}
          />
          <mesh
            name="Cube_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube_1.geometry}
            material={materials.flooring}
          />
        </group>
        <mesh
          name="IDhanger"
          castShadow
          receiveShadow
          geometry={nodes.IDhanger.geometry}
          material={materials.hanger}
          position={[-1.914, 0.616, -1.642]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={-0.039}
        />
        <mesh
          name="hanger"
          castShadow
          receiveShadow
          geometry={nodes.hanger.geometry}
          material={materials.hanger}
          position={[-1.887, 0.91, 0.119]}
          rotation={[-Math.PI, 0, -Math.PI]}
          scale={[-0.016, -0.032, -0.444]}
        />
        <mesh
          name="idStrip"
          castShadow
          receiveShadow
          geometry={nodes.idStrip.geometry}
          material={materials.idStrip}
          position={[-1.875, 0.581, -1.571]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[-0.062, -0.114, -0.011]}
        />
        <mesh
          name="id"
          castShadow
          receiveShadow
          geometry={nodes.id.geometry}
          material={materials.id}
          position={[-1.875, -0.327, -1.743]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[-0.09, -0.075, -0.075]}
        />
        <mesh
          name="container"
          castShadow
          receiveShadow
          geometry={nodes.container.geometry}
          material={materials.woodContainer}
          position={[-0.247, 0.966, -2.035]}
          scale={[1.021, 0.443, 0.339]}
        />
        <mesh
          name="bottle"
          castShadow
          receiveShadow
          geometry={nodes.bottle.geometry}
          material={materials.bottle}
          position={[-1.274, -0.75, -1.435]}
          scale={[0.068, 0.066, 0.068]}
        />
        <mesh
          name="bottleCap"
          castShadow
          receiveShadow
          geometry={nodes.bottleCap.geometry}
          material={materials.bottleCap}
          position={[-1.274, -0.742, -1.435]}
          scale={[0.077, 0.066, 0.077]}
        />
        <mesh
          name="bottleWater"
          castShadow
          receiveShadow
          geometry={nodes.bottleWater.geometry}
          material={materials.water}
          position={[-1.274, -0.75, -1.435]}
          scale={[0.066, 0.064, 0.066]}
        />
        <group
          onClick={goToSore}
          name="notebook"
          position={[0.038, -0.79, -1.615]}
          scale={[0.185, 0.023, 0.25]}
        >
          <mesh
            name="Cube006"
            castShadow
            receiveShadow
            geometry={nodes.Cube006.geometry}
            material={materials.notebook}
          />
          <mesh
            name="Cube006_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube006_1.geometry}
            material={materials.spring}
          />
          <mesh
            name="Cube006_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube006_2.geometry}
            material={materials.notes}
          />
          <mesh
            name="Cube006_3"
            castShadow
            receiveShadow
            geometry={nodes.Cube006_3.geometry}
            material={materials.pages}
          />
          <mesh
            name="Cube006_4"
            castShadow
            receiveShadow
            geometry={nodes.Cube006_4.geometry}
            material={materials.pages}
          />
        </group>
        <group
          name="plug"
          position={[0.667, 0.152, -2.388]}
          scale={[0.077, 0.077, 0.017]}
        >
          <mesh
            name="Cube022"
            castShadow
            receiveShadow
            geometry={nodes.Cube022.geometry}
            material={materials["switch"]}
          />
          <mesh
            name="Cube022_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube022_1.geometry}
            material={materials["switch"]}
          />
        </group>
        <group
          name="phone"
          position={[0.023, -0.805, -1.212]}
          rotation={[-Math.PI, 0, -Math.PI]}
          scale={[-0.072, -0.01, -0.126]}
        >
          <mesh
            name="Cube009"
            castShadow
            receiveShadow
            geometry={nodes.Cube009.geometry}
            material={materials.phone}
          />
          <mesh
            name="Cube009_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube009_1.geometry}
            material={materials.phone}
          />
        </group>
        <mesh
          name="phoneScreen"
          castShadow
          receiveShadow
          geometry={nodes.phoneScreen.geometry}
          // material={
          //   switchOn
          //     ? materials.phoneScreen
          //     : new THREE.MeshBasicMaterial({ color: "black" })
          // }
          position={[0.023, -0.805, -1.212]}
          rotation={[-Math.PI, 0, -Math.PI]}
          scale={[-0.078, -0.01, -0.136]}
        >
          <Html
            rotation-x={-Math.PI / 2}
            occlude
            fullscreen
            transform
            style={{ transform: "scale(0.47)" }}
            position={[0, -1, 0]}
            className="max-h-36 border max-w-36 flex flex-col items-end bg-gray-300 py-5"
          >
            {switchOn && (
              <div className="text-3xl">
                <CiBatteryCharging />
              </div>
            )}
            <div className="flex flex-wrap justify-evenly ">
              <div className="text-5xl">
                <Link href="https://github.com/saurabhkr132" target="_blank">
                  <FaGithub />
                </Link>
              </div>
              <div className="text-5xl">
                <Link
                  href="https://www.linkedin.com/in/saurabh-kumar-17a202262"
                  target="_blank"
                >
                  <FaLinkedin />
                </Link>
              </div>
              <div className="text-5xl">
                <Link
                  href="https://www.instagram.com/saurabh_kr132/"
                  target="_blank"
                >
                  <FaInstagram />
                </Link>
              </div>
            </div>
          </Html>
        </mesh>
        <mesh
          onClick={toggleSwitch}
          ref={switch1}
          name="plugSwitch"
          castShadow
          receiveShadow
          geometry={nodes.plugSwitch.geometry}
          material={materials["switch"]}
          position={[0.69, 0.154, -2.368]}
          rotation={[switchOn ? 0.262 : -0.262, 0.002, 0]}
          scale={[0.01, 0.035, 0.01]}
        />
        <group
          name="floor"
          position={[-0.268, -2.103, -0.774]}
          scale={[1.856, 0.838, 1.878]}
        >
          <mesh
            name="Cube019"
            castShadow
            receiveShadow
            geometry={nodes.Cube019.geometry}
            material={materials.flooring}
          />
          <mesh
            name="Cube019_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube019_1.geometry}
            material={materials.marble}
          />
        </group>
        <group
          name="cupboardCover"
          position={[0.239, -1.444, -1.653]}
          scale={[0.331, 0.437, 0.582]}
        >
          <mesh
            name="Cube003"
            castShadow
            receiveShadow
            geometry={nodes.Cube003.geometry}
            material={materials.blackMetal}
          />
          <mesh
            name="Cube003_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube003_1.geometry}
            material={materials.blackMetal}
          />
        </group>
        <mesh
          name="tableTopMetal"
          castShadow
          receiveShadow
          geometry={nodes.tableTopMetal.geometry}
          material={materials.blackMetal}
          position={[-0.511, -0.873, -1.649]}
          scale={[1.218, 0.05, 0.568]}
        />
        <mesh
          // ref={cupboard1}
          // onClick={toggleCupboard1}
          name="cupboard1"
          castShadow
          receiveShadow
          geometry={nodes.cupboard1.geometry}
          material={materials.cupboard}
          position={[0.238, -1.163, -1.627]}
          scale={[0.301, 0.141, 0.572]}
        />
        <mesh
          // ref={cupboard2}
          // onClick={toggleCupboard2}
          name="cupboard2"
          castShadow
          receiveShadow
          geometry={nodes.cupboard2.geometry}
          material={materials.cupboard}
          position={[0.238, -1.44, -1.627]}
          scale={[0.301, 0.141, 0.572]}
        />
        <mesh
          // ref={cupboard3}
          // onClick={toggleCupboard3}
          name="cupboard3"
          castShadow
          receiveShadow
          geometry={nodes.cupboard3.geometry}
          material={materials.cupboard}
          position={[0.238, -1.719, -1.627]}
          scale={[0.301, 0.141, 0.572]}
        />
        <mesh
          name="tableLeg1"
          castShadow
          receiveShadow
          geometry={nodes.tableLeg1.geometry}
          material={materials.blackMetal}
          position={[-2.622, -0.847, -0.651]}
          scale={1.821}
        />
        <mesh
          name="tableLeg2"
          castShadow
          receiveShadow
          geometry={nodes.tableLeg2.geometry}
          material={materials.blackMetal}
          position={[1.376, -0.847, -0.162]}
          rotation={[0, Math.PI / 2, 0]}
          scale={1.821}
        />
        <mesh
          name="tableTop"
          castShadow
          receiveShadow
          geometry={nodes.tableTop.geometry}
          material={materials.woodTable}
          position={[-0.511, -0.835, -1.649]}
          scale={[1.249, 0.05, 0.61]}
        />
        <mesh
          name="chairNet1"
          castShadow
          receiveShadow
          geometry={nodes.chairNet1.geometry}
          material={materials.net}
          position={[-0.621, -1.06, 0.128]}
          scale={[0.298, 0.31, 0.009]}
        />
        <mesh
          name="chairNet2"
          castShadow
          receiveShadow
          geometry={nodes.chairNet2.geometry}
          material={materials.net}
          position={[-0.621, -1.429, -0.19]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.298, 0.289, 0.009]}
        />
        <mesh
          name="chairMetal"
          castShadow
          receiveShadow
          geometry={nodes.chairMetal.geometry}
          material={materials.blackMetal}
          position={[-0.621, -0.733, 0.129]}
          scale={0.225}
        />
        <group
          name="laptopCPU"
          position={[-0.729, -0.795, -1.416]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={[0.34, 0.011, 0.21]}
        >
          <mesh
            name="Cube017"
            castShadow
            receiveShadow
            geometry={nodes.Cube017.geometry}
            material={materials.keyboard}
          />
          <mesh
            name="Cube017_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube017_1.geometry}
            material={materials.keyboard}
          />
        </group>
        <mesh
          name="laptopMonitor"
          castShadow
          receiveShadow
          geometry={nodes.laptopMonitor.geometry}
          material={materials.laptopScreen}
          position={[-0.729, -0.603, -1.648]}
          rotation={[1.445, 0, 0]}
          scale={[0.34, 0.008, 0.21]}
        />
        <mesh
          name="laptopHinge"
          castShadow
          receiveShadow
          geometry={nodes.laptopHinge.geometry}
          material={materials.laptopHinge}
          position={[-0.729, -0.789, -1.617]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.012, 0.207, 0.012]}
        />
        <mesh
          name="laptopKeyboard"
          castShadow
          receiveShadow
          geometry={nodes.laptopKeyboard.geometry}
          material={materials.keyboard}
          position={[-0.749, -0.795, -1.444]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={[0.334, 0.013, 0.206]}
        />
        <mesh
          name="laptopScreen"
          castShadow
          receiveShadow
          geometry={nodes.laptopScreen.geometry}
          // material={materials.laptopScreen}
          position={[-0.729, -0.61, -1.648]}
          rotation={[1.445, 0, 0]}
          scale={[0.34, 0.008, 0.22]}
        >
          <Html
            rotation-x={-Math.PI / 2}
            occlude
            fullscreen
            transform
            style={{ transform: "scale(0.47)" }}
            position={[0, 0, -0.15]}
            className="overflow-y-auto max-h-32 max-w-36 "
          >
            <ContactMe />
          </Html>
          
        </mesh>
        <mesh
          name="readingLight"
          castShadow
          receiveShadow
          geometry={nodes.readingLight.geometry}
          material={materials.readingLight}
          position={[0.509, -0.805, -1.397]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.083, 0.009, 0.083]}
        />
        <mesh
          name="readingLightGlow"
          castShadow
          receiveShadow
          geometry={nodes.readingLightGlow.geometry}
          material= {readingLightOn? new THREE.MeshBasicMaterial({ color: "white" }) : nodes.readingLightGlow.material}
          position={[0.509, -0.803, -1.397]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.083, 0.009, 0.083]}
        />
        <mesh
          ref={readingLightSwitchRef}
          onClick={toggleReadingLightSwitch}
          name="readingLightSwitch"
          castShadow
          receiveShadow
          geometry={nodes.readingLightSwitch.geometry}
          material={materials.Material}
          position={[0.507, -0.829, -1.462]}
          rotation={[0.084, -0.789, 0.098]}
          scale={[0.179, 0.031, 0.179]}
        />
        <mesh
          name="phoneChargerAdapter"
          castShadow
          receiveShadow
          geometry={nodes.phoneChargerAdapter.geometry}
          material={materials.phoneCharger}
          position={[0.648, 0.14, -2.28]}
          scale={[0.01, 0.004, 0.008]}
        />
        <mesh
          name="phoneChargerPlug"
          castShadow
          receiveShadow
          geometry={nodes.phoneChargerPlug.geometry}
          material={materials.phoneChargerPlug}
          position={[0.648, 0.14, -2.28]}
          scale={[0.01, 0.004, 0.008]}
        />
        <mesh
          name="phoneChargerTypeC1"
          castShadow
          receiveShadow
          geometry={nodes.phoneChargerTypeC1.geometry}
          material={materials.phoneCharger}
          position={[0.649, 0.139, -2.304]}
          scale={[0.01, 0.004, 0.008]}
        />
        <mesh
          name="phoneChargerTypeC2"
          castShadow
          receiveShadow
          geometry={nodes.phoneChargerTypeC2.geometry}
          material={materials.phoneCharger}
          position={[0.022, -0.805, -1.09]}
          scale={[0.01, 0.004, 0.008]}
        />
        <mesh
          name="phoneChargerWire"
          castShadow
          receiveShadow
          geometry={nodes.phoneChargerWire.geometry}
          material={materials.phoneCharger}
          position={[0.023, -0.806, -0.996]}
          rotation={[0, Math.PI / 2, 0]}
          scale={0.017}
        />
      </group>
    </>
  );
}

useGLTF.preload(modelPath);
