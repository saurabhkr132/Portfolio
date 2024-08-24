import React, { useState, useEffect } from "react";
import { Html, useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

const modelPath = "./assets/models/bookStore-transformed.glb";

const Form = ({ onSubmit }) => {
  return (
    <>
      <Html
        position={[-0.5, 1, 0]}
        className="h-80 w-80 bg-red-100 p-4 opacity-60"
      >
        <div className="text-center font-extrabold">Wait, who are you?</div>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              // required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              // required
            />
          </div>
          <input
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            type="submit"
            value="Submit"
          />
        </form>
      </Html>
    </>
  );
};

const ShowDescription = ({ text }) => {
  return (
    <>
      <Html position={[0, 1, 0]}>
        <div
          style={{
            color: "white",
            background: "rgba(0, 0, 0, 0.5)",
            padding: "5px",
            borderRadius: "5px",
            display: "inline-block",
          }}
        >
          {text}
          <button
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
              marginLeft: "10px",
            }}
            onClick={() => console.log("clicked")}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#0056b3")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#007bff")
            }
          >
            View
          </button>
        </div>
      </Html>
    </>
  );
};

export function BookStore({ html, ...props }) {
  const model = React.useRef();
  const { nodes, materials, animations } = useGLTF(modelPath);
  const { names, actions } = useAnimations(animations, model);

  const [showText, setShowText] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);

  const [showNotebook1, setShowNotebook1] = useState(false);
  const [showNotebook2, setShowNotebook2] = useState(false);
  const [showNotebook3, setShowNotebook3] = useState(false);
  const [showNotebook4, setShowNotebook4] = useState(false);
  const [showNotebook5, setShowNotebook5] = useState(false);
  const [showNotebook6, setShowNotebook6] = useState(false);
  const [showNotebook7, setShowNotebook7] = useState(false);
  const [showNotebook8, setShowNotebook8] = useState(false);
  const [showNotebook9, setShowNotebook9] = useState(false);
  const [showNotebook10, setShowNotebook10] = useState(false);
  const [showNotebook11, setShowNotebook11] = useState(false);
  const [showNotebook12, setShowNotebook12] = useState(false);
  const [showNotebook13, setShowNotebook13] = useState(false);
  const [showNotebook14, setShowNotebook14] = useState(false);
  const [showNotebook15, setShowNotebook15] = useState(false);

  const numberOfNotebooks = 14;

  const notebooks = [];

  for (let i = 1; i <= numberOfNotebooks; i++) {
    notebooks.push({
      name: `notebook${i}`,
      position: i > 7 ? [0.173, 0.583 + (2 * (i%7) * 0.014), 0.119] : [0.425, 0.583 + (2 * i * 0.014), 0.119],
      rotation: [0, 0, -0.011],
      scale: [0.102, 0.013, 0.137],
      showState: eval(`showNotebook${i}`), // Dynamically access the state variable
      setShowState: eval(`setShowNotebook${i}`), // Dynamically access the state setter
    });
  }
  

  useEffect(() => {
    if (loggedIn) {
      const mixer = actions[names[0]].getMixer(); // Get the mixer from the first action
      const handleAnimationFinished = () => {
        setShowText(true);
      };

      mixer.addEventListener("finished", handleAnimationFinished);

      names.forEach((name) => {
        const action = actions[name];
        action.setLoop(THREE.LoopOnce); // Play the animation only once
        action.clampWhenFinished = true; // Stop at the last frame when the animation is done
        action.play();
      });

      // Cleanup listener on unmount
      return () => {
        mixer.removeEventListener("finished", handleAnimationFinished);
      };
    }
  }, [loggedIn, names, actions]);

  return (
    <>
      {!loggedIn && (
        <Form
          onSubmit={(event) => {
            event.preventDefault();
            setLoggedIn(true);
          }}
        />
      )}
      <group ref={model} {...props} dispose={null}>
        <group name="Scene">
          <mesh
            name="almirah"
            castShadow
            receiveShadow
            geometry={nodes.almirah.geometry}
            material={materials.almirah}
            scale={[0.568, 1, 0.417]}
          >
            <group
              name="door1"
              position={[0.992, -0.002, 1.033]}
              rotation={[Math.PI, 0, Math.PI]}
              scale={[0.971, 0.978, 1]}
            >
              <mesh
                name="Cube004"
                castShadow
                receiveShadow
                geometry={nodes.Cube004.geometry}
                material={materials.almirah}
              />
              <mesh
                name="Cube004_1"
                castShadow
                receiveShadow
                geometry={nodes.Cube004_1.geometry}
                material={materials.metal}
              />
              <mesh
                name="Cube004_2"
                castShadow
                receiveShadow
                geometry={nodes.Cube004_2.geometry}
                material={materials.metal}
              />
              <mesh
                name="handle"
                castShadow
                receiveShadow
                geometry={nodes.handle.geometry}
                material={materials.metal}
                position={[0.653, 0.003, -0.076]}
                rotation={[-Math.PI, 0, -Math.PI]}
                scale={[0.234, 0.024, 0.034]}
              />
            </group>
            <mesh
              name="door2"
              castShadow
              receiveShadow
              geometry={nodes.door2.geometry}
              material={materials.almirah}
              position={[-0.982, -0.002, 0.961]}
              scale={[0.971, 0.978, 1]}
            />
          </mesh>
          <mesh
            name="almirah001"
            castShadow
            receiveShadow
            geometry={nodes.almirah001.geometry}
            material={materials.almirah}
            scale={[0.568, 1, 0.417]}
          />
          {notebooks.map((notebook, index) => (
            <group
              key={index}
              name={notebook.name}
              position={notebook.position}
              rotation={notebook.rotation}
              scale={notebook.scale}
              onClick={() => notebook.setShowState((prev) => !prev)}
            >
              {showText && notebook.showState && (
                <ShowDescription text={`${notebook.name}!`} />
              )}
              <mesh
              name="Cube022"
              castShadow
              receiveShadow
              geometry={nodes.Cube022.geometry}
              material={materials.notebook}
            />
            <mesh
              name="Cube022_1"
              castShadow
              receiveShadow
              geometry={nodes.Cube022_1.geometry}
              material={materials.spring}
            />
            <mesh
              name="Cube022_2"
              castShadow
              receiveShadow
              geometry={nodes.Cube022_2.geometry}
              material={materials.notes}
            />
            <mesh
              name="Cube022_3"
              castShadow
              receiveShadow
              geometry={nodes.Cube022_3.geometry}
              material={materials.pages}
            />
            <mesh
              name="Cube022_4"
              castShadow
              receiveShadow
              geometry={nodes.Cube022_4.geometry}
              material={materials.pages}
            />
            </group>
          ))}
        </group>
      </group>
    </>
  );
}

useGLTF.preload(modelPath);
