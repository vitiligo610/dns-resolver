"use client";

import SplashUI from "@/components/ui/splash-ui";
import { useEffect, useState } from "react";

export default function FullScreenLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 5000);
  }, []);

  if (!show) return null;

  return <SplashUI/>;
}