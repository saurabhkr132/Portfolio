"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "@/components/styles/form.module.css";
import emailjs from "@emailjs/browser";

export default function Form() {
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

  const onSubmit = (data) => {
    const templateParams = {
      to_name: "Saurabh",
      from_name: data.name,
      reply_to: data.email,
      message: data.message,
    };

    sendEmail(templateParams);
  };

  useEffect(() => {
    let boxes = document.querySelectorAll(`.${styles.box}`);
    boxes.forEach((box) => {
      box.onmousemove = function (e) {
        let x = e.pageX - box.offsetLeft;
        let y = e.pageY - box.offsetTop;

        box.style.setProperty("--x", `${x}px`);
        box.style.setProperty("--y", `${y}px`);
      };
    });

    return () => {
      boxes.forEach((box) => {
        box.onmousemove = null;
      });
    };
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.box} style={{ "--clr": "#0f0" }}></div>
        <div className={styles.box} style={{ "--clr": "#ff0" }}></div>
        <div className={styles.box} style={{ "--clr": "#f00" }}></div>
        <div className={styles.box} style={{ "--clr": "#f0f" }}></div>
        <div className={styles.box} style={{ "--clr": "#0ff" }}></div>
        <div className={styles.box} style={{ "--clr": "#0f0" }}></div>
        <div className={styles.box} style={{ "--clr": "#ff0" }}></div>
        <div className={styles.box} style={{ "--clr": "#f00" }}></div>
        <div className={styles.box} style={{ "--clr": "#f0f" }}></div>
        <div className={styles.box} style={{ "--clr": "#0ff" }}></div>
        <div className={styles.box} style={{ "--clr": "#0f0" }}></div>
        <div className={styles.box} style={{ "--clr": "#ff0" }}></div>
        <div className={styles.box} style={{ "--clr": "#f00" }}></div>
        <div className={styles.box} style={{ "--clr": "#f0f" }}></div>
        <div className={styles.box} style={{ "--clr": "#0ff" }}></div>
        <div className={styles.box} style={{ "--clr": "#0f0" }}></div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <h2>Contact Us</h2>
        <div className={styles.inputBox}>
          <input
            type="text"
            placeholder="name"
            {...register("name", { required: "This field is required!" })}
          />
          <span>Name</span>
        </div>
        {
          errors.name && <span className="inline-block self-start">{errors.name.message}</span>
        }        
        <div className={styles.inputBox}>
          <input
            type="email"
            placeholder="email"
            {...register("email", { required: "This field is required!" })}
          />
          <span>E-mail</span>
        </div>
        {errors.email && (
          <span className="inline-block self-start text-accent">
            {errors.email.message}
          </span>
        )}
        <div className={styles.inputBox}>
          <textarea
            placeholder="message"
            {...register("message", { required: "This field is required!", max: 500, min: 5 })}
          />
          <span>Message</span>
        </div>
        {errors.message && (
          <span className="inline-block self-start text-accent">
            {errors.message.message}
          </span>
        )}
        <div className={styles.inputBox}>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </>
  );
}
