import React from "react";
import { TextField } from "@/components/TextField";
import { CreateTextTexture } from "@/components/CreateTextTexture";

const Contact = () => {
  // const name = useRef();
  const [name, setName] = useState("Enter your name");
  const [nameFieldTexture, setNameFieldTexture] = useState(
    new THREE.CanvasTexture(
      CreateTextTexture(name, 1022, 256, "#000000", "68px Arial")
    )
  );

  const [email, setEmail] = useState("Enter your email");
  const [emailFieldTexture, setEmailFieldTexture] = useState(
    new THREE.CanvasTexture(
      CreateTextTexture(email, 1022, 256, "#000000", "68px Arial")
    )
  );

  const [message, setMessage] = useState("Enter your message");
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
          "48px Arial"
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

  // console.log(text);

  return (
    <>
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
      <div style={{ position: "absolute", top: "-10000px", left: "-10000px" }}>
        <form>
          <input
            id="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            style={{ fontSize: "24px", padding: "10px", borderRadius: "5px" }}
          />
          <input
            id="email"
            type="text"
            value={email}
            onChange={handleEmailChange}
            style={{ fontSize: "24px", padding: "10px", borderRadius: "5px" }}
          />
          <textarea
            id="message"
            value={message}
            onChange={handleMessageChange}
            style={{ fontSize: "24px", padding: "10px", borderRadius: "5px" }}
          />
        </form>
      </div>
    </>
  );
};

export { Contact };
