"use client"; // Indicates to next.js that this component is client side.
import SplashUI from "./ui/splash-ui";
import React, { useEffect, useState } from "react";

export default function FullScreenLoader() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 5000)
  }, []);

  if (!show) return null;

  return (
        <SplashUI/>
  );
}