"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function PwaPrompt() {
  const pathname = usePathname();
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [prompt, setPrompt] = useState(false);

  const installPWA = () => {
    console.log("working");
    if (prompt) {
      prompt.prompt();

      prompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          toast.success("PWA installed, Thank you!");
        } else {
          toast.error("installtion canceled");
        }
      });
      setPrompt(null);
      setShowInstallModal(false);
    }
  };


  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setPrompt(e);
      if (!window.matchMedia("(display-mode: standalone)").matches) {
        setShowInstallModal(true);
      }
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  return (
    pathname != "/" &&
    showInstallModal && (
      <div className="pwa-prompt">
        <p>Install on home screen</p>
        <button className="btn" onClick={installPWA}>
          Install
        </button>
        <span onClick={() => setShowInstallModal(false)}>X</span>
      </div>
    )
  );
}
