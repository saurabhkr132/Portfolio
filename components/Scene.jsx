"use client";

import { Environment, OrbitControls, useHelper } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { IsoRoom } from "@/components/IsoRoom";
import { TextField } from "@/components/TextField";
import { CreateTextTexture } from "@/components/CreateTextTexture";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib";
import { useGUI } from "./useGUI";
import { useEffect, useRef, useCallback } from "react";
import { Color } from "three";
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
import { HTML } from "@react-three/drei";
import { useState } from "react";
import { Text, Plane } from "@react-three/drei";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";

const SubmitButton = ({
  onClick,
  texture,
  args = [1, 1],
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}) => {
  const planeRef = useRef();

  useFrame(({ camera, pointer }) => {
    const raycaster = new THREE.Raycaster();
    raycaster.ray.origin.copy(camera.position);
    raycaster.ray.direction.copy(pointer.sub(camera.position).normalize());

    const intersects = raycaster.intersectObject(planeRef.current);

    if (intersects.length > 0) {
      planeRef.current.material.color.set(0xff0000); // Change color to indicate hover
    } else {
      planeRef.current.material.color.set(0xffffff); // Reset color
    }
  });

  return (
    <Plane
      ref={planeRef}
      args={args}
      position={position}
      rotation={rotation}
      onClick={onClick}
    >
      <meshBasicMaterial attach="material" map={texture} />
    </Plane>
  );
};

const Scene = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const sendEmail = (params) => {
    emailjs
      .send(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        params,
        {
          publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
          limitRate: {
            throttle: 5000, // cannot send more than 1 email per 5 seconds
          },
        }
      )
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  const onSubmit = () => {
    const templateParams = {
      to_name: "Saurabh",
      from_name: name,
      reply_to: email,
      message: message,
    };

    if (name != "" && email != "" && message != "") {
      setEmptyEmail(false);
      sendEmail(templateParams);
      console.log("Email sent!");
    } else {
      setEmptyEmail(true);
      console.log("Cannot send empty email!");
    }
  };

  const bloomColor = new Color("#222");
  bloomColor.multiplyScalar(1);
  // RectAreaLightUniformsLib.init();
  const light = useRef();
  const model = useRef();
  const dateText = useRef();

  // const name = useRef();
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [name, setName] = useState("");
  const [nameFieldTexture, setNameFieldTexture] = useState(
    new THREE.CanvasTexture(
      CreateTextTexture(name, 1022, 256, "#000000", "68px Arial")
    )
  );

  const [email, setEmail] = useState("");
  const [emailFieldTexture, setEmailFieldTexture] = useState(
    new THREE.CanvasTexture(
      CreateTextTexture(email, 1022, 256, "#000000", "68px Arial")
    )
  );

  const [message, setMessage] = useState("");
  const [messageFieldTexture, setMessageFieldTexture] = useState(
    new THREE.CanvasTexture(
      CreateTextTexture(message, 1022, 256, "#000000", "68px Arial")
    )
  );

  const handleNameChange = useCallback((event) => {
    setName(event.target.value);
    setNameFieldTexture(
      new THREE.CanvasTexture(
        CreateTextTexture(
          event.target.value,
          1022,
          256,
          "#000000",
          "68px Arial"
        )
      )
    );
  }, []);

  const handleEmailChange = useCallback((event) => {
    setEmail(event.target.value);
    setEmailFieldTexture(
      new THREE.CanvasTexture(
        CreateTextTexture(
          event.target.value,
          1022,
          256,
          "#000000",
          "68px Arial"
        )
      )
    );
  }, []);

  const handleMessageChange = useCallback((event) => {
    setMessage(event.target.value);
    setMessageFieldTexture(
      new THREE.CanvasTexture(
        CreateTextTexture(
          event.target.value,
          1022,
          256,
          "#000000",
          "68px Arial"
        )
      )
    );
  }, []);

  const handleNameClick = () => {
    const inputElement = document.getElementById("name");
    if (inputElement) {
      inputElement.focus();
    }
  };

  const handleEmailClick = () => {
    const inputElement = document.getElementById("email");
    if (inputElement) {
      inputElement.focus();
    }
  };

  const handleMessageClick = () => {
    const inputElement = document.getElementById("message");
    if (inputElement) {
      inputElement.focus();
    }
  };

  const contactCanvas = CreateTextTexture(
    "Contact Me",
    250,
    106,
    "#000000",
    "48px Arial"
  );
  const contactTexture = new THREE.CanvasTexture(contactCanvas);

  const emptyEmailCanvas = CreateTextTexture(
    "Cannot Send Empty Email!",
    650,
    186,
    "#000000",
    "48px Arial"
  );
  const emptyEmailTexture = new THREE.CanvasTexture(emptyEmailCanvas);

  const nameCanvas = CreateTextTexture(
    "Name: ",
    222,
    156,
    "#000000",
    "48px Arial"
  );
  const nameTexture = new THREE.CanvasTexture(nameCanvas);

  const emailCanvas = CreateTextTexture(
    "Email: ",
    222,
    156,
    "#000000",
    "48px Arial"
  );
  const emailTexture = new THREE.CanvasTexture(emailCanvas);

  const messageCanvas = CreateTextTexture(
    "Message: ",
    222,
    156,
    "#000000",
    "48px Arial"
  );
  const messageTexture = new THREE.CanvasTexture(messageCanvas);

  // const handleSubmit = () => {
  //   console.log("Contact Form submitted with values:");
  //   console.log("Name:", name);
  //   console.log("Email:", email);
  //   console.log("Message:", message);

  //   setName("Enter your name");
  //   setEmail("Enter your email");
  //   setMessage("Enter your message");
  // };

  const submitButtonTexture = new THREE.CanvasTexture(
    CreateTextTexture("Submit", 1022, 528, "#000", "268px Arial")
  );

  return (
    <>
      <Canvas shadows>
        <TextField
          onClick={null}
          args={[0.08, 0.03]}
          position={[-0.280, -0.029, -0.508]}
          rotation={[-0.115, 0, 0]}
          texture={contactTexture}
        />
        <TextField
          onClick={handleNameClick}
          args={[0.08, 0.05]}
          position={[-0.419, -0.055, -0.508]}
          rotation={[-0.115, 0, 0]}
          texture={nameTexture}
        />
        <TextField
          onClick={handleEmailClick}
          args={[0.08, 0.05]}
          position={[-0.419, -0.09, -0.508]}
          rotation={[-0.115, 0, 0]}
          texture={emailTexture}
        />
        <TextField
          onClick={handleMessageClick}
          args={[0.08, 0.05]}
          position={[-0.409, -0.128, -0.508]}
          rotation={[-0.115, 0, 0]}
          texture={messageTexture}
        />
        <TextField
          onClick={handleNameClick}
          args={[0.25, 0.05]}
          position={[-0.249, -0.055, -0.508]}
          rotation={[-0.115, 0, 0]}
          texture={nameFieldTexture}
        />
        <TextField
          onClick={handleEmailClick}
          args={[0.25, 0.05]}
          position={[-0.249, -0.09, -0.508]}
          rotation={[-0.115, 0, 0]}
          texture={emailFieldTexture}
        />
        <TextField
          onClick={handleMessageClick}
          args={[0.24, 0.05]}
          position={[-0.239, -0.129, -0.508]}
          rotation={[-0.115, 0, 0]}
          texture={messageFieldTexture}
        />
        <SubmitButton
          onClick={onSubmit}
          args={[0.05, 0.02]}
          position={[-0.309, -0.149, -0.5]}
          rotation={[-0.115, 0, 0]}
          texture={submitButtonTexture}
        />
        {emptyEmail && <TextField
          onClick={null}
          args={[0.1, 0.03]}
          position={[-0.309, -0.165, -0.5]}
          rotation={[-0.115, 0, 0]}
          texture={emptyEmailTexture}
        />}
        <OrbitControls />
        <Environment preset="city" />

        <OrbitControls minDistance={0.01} maxDistance={2} />
        <Text
          position-x={4.5}
          position-y={3.6}
          position-z={-6.2}
          lineHeight={0.8}
          textAlign="center"
          // rotation-y={degToRad(0)}
          // anchorY={"bottom"}
          // color={red}
          ref={dateText}
        >
          October
          <meshBasicMaterial
            color={bloomColor}
            toneMapped={false}
            // ref={dateTextMaterial}
          ></meshBasicMaterial>
        </Text>
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
        <IsoRoom ref={model} />
      </Canvas>
      <div style={{ position: "absolute", top: "-10000px", left: "-10000px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            id="name"
            type="text"
            value={name}
            placeholder="name"
            {...register("name", { required: true })}
            onChange={handleNameChange}
            style={{ fontSize: "24px", padding: "10px", borderRadius: "5px" }}
          />
          <input
            id="email"
            type="text"
            value={email}
            placeholder="email"
            {...register("email", { required: true })}
            onChange={handleEmailChange}
            style={{ fontSize: "24px", padding: "10px", borderRadius: "5px" }}
          />
          <textarea
            id="message"
            value={message}
            placeholder="message"
            {...register("message", { required: true, max: 500, min: 5 })}
            onChange={handleMessageChange}
            style={{ fontSize: "24px", padding: "10px", borderRadius: "5px" }}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
};

export default Scene;
