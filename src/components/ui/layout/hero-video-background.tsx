"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { VideoControl } from "./VideoControl";

// Tipado para la Network Information API
interface NetworkInformation extends EventTarget {
  readonly effectiveType: "slow-2g" | "2g" | "3g" | "4g";
  readonly saveData: boolean;
}
interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformation;
  mozConnection?: NetworkInformation;
  webkitConnection?: NetworkInformation;
}

interface Props {
  poster: string;
  videoSrc?: string;
  delay?: number;
  overlay?: React.ReactNode;
}

export default function HeroVideoBackground({
  poster,
  videoSrc,
  delay = 1200,
  overlay,
}: Props) {
  // Lógica de detección de conexión (Lazy Initializer para evitar el error de setState)
  const [allowVideo] = useState(() => {
    if (typeof navigator === "undefined") return true;
    const nav = navigator as NavigatorWithConnection;
    const conn = nav.connection || nav.mozConnection || nav.webkitConnection;
    if (!conn) return true;
    return (
      !conn.saveData && !["slow-2g", "2g", "3g"].includes(conn.effectiveType)
    );
  });

  const [showVideo, setShowVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { amount: 0.1 });

  useEffect(() => {
    if (!isInView || !videoSrc || !allowVideo || showVideo) return;
    const timer = setTimeout(() => setShowVideo(true), delay);
    return () => clearTimeout(timer);
  }, [isInView, videoSrc, allowVideo, delay, showVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlayback = async () => {
      if (isInView && showVideo && isPlaying) {
        try {
          await video.play();
        } catch (error) {
          // console.error(error);
          // El navegador bloqueó el autoplay (ej. ahorro de batería)
          setIsPlaying(false);
        }
      } else {
        video.pause();
      }
    };

    handlePlayback();
  }, [isInView, showVideo, isPlaying]);
  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden bg-slate-950"
    >
      {(!videoSrc || !allowVideo) && (
        <Image
          src={poster}
          alt="Hero background"
          fill
          priority
          sizes="100vw"
          className={`object-cover transition-opacity duration-1000 ${showVideo ? "opacity-0" : "opacity-100"}`}
        />
      )}

      {videoSrc && allowVideo && showVideo && (
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none
        backdrop-blur-md md:backdrop-blur-xl
        "
        >
          <source src={videoSrc} type="video/webm" />
          <source src={videoSrc.replace(".webm", ".mp4")} type="video/mp4" />
        </video>
      )}

      <div
        className="absolute inset-0 z-10 pointer-events-none bg-linear-to-b 
        from-slate-950/20 via-slate-950/40 to-slate-950"
      />

      {overlay}

      {/* Uso del componente separado */}
      <VideoControl
        isPlaying={isPlaying}
        togglePlay={() => setIsPlaying((prev) => !prev)}
        isVisible={showVideo && allowVideo}
      />
    </div>
  );
}
