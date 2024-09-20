import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

const ContactMe = () => {
  // const [emptyEmail, setEmptyEmail] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleNameChange = useCallback((event) => {
    setName(event.target.value);
  }, []);

  const handleEmailChange = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  const handleMessageChange = useCallback((event) => {
    setMessage(event.target.value);
  }, []);

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

  const onSubmit = (e) => {
    const templateParams = {
      to_name: "Saurabh",
      from_name: name,
      reply_to: email,
      message: message,
    };

    if (name != "" && email != "" && message != "") {
      // setEmptyEmail(false);
      sendEmail(templateParams);
      console.log("Email sent!");
    } else {
      // setEmptyEmail(true);
      console.log("Cannot send empty email!");
    }
    e.preventDefault()
  };

  return (
    <>
      <div className="flex flex-col items-center w-full">
        <header className="text-sm font-bold">Contact Me</header>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-2 text-xs w-11/12"
        >
          <input
            id="name"
            type="text"
            value={name}
            placeholder="name"
            {...register("name", { required: true })}
            onChange={handleNameChange}
            className="rounded px-0.5 w-full"
          />
          <input
            id="email"
            type="text"
            value={email}
            placeholder="email"
            {...register("email", { required: true })}
            onChange={handleEmailChange}
            className="rounded px-0.5 w-full"
          />
          <textarea
            id="message"
            value={message}
            placeholder="message"
            {...register("message", { required: true, max: 500, min: 5 })}
            onChange={handleMessageChange}
            className="rounded px-0.5 w-full"
          />
          <input type="submit" value="Submit" onClick={(e) => onSubmit(e) } className="rounded bg-sky-500 w-1/2" />
        </form>
      </div>
    </>
  );
};
export default ContactMe;
