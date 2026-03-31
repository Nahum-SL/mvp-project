"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { VideoControl } from "./VideoControl";
import { cn } from "@/src/lib/utils";

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
  const isInView = useInView(containerRef, {
    amount: 0.1,
    once: true,
  });

  const [imageLoaded, setImageLoaded] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

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
        video.currentTime = 0; // Reiniciamos para evitar que quede en pausa a mitad
      }
    };

    handlePlayback();
  }, [isInView, showVideo, isPlaying]);
  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden bg-slate-950"
    >
      {(!showVideo || !allowVideo) && (
        <>
          {/* Fondo base (evita pantallazo) */}
          <div className="absolute inset-0 bg-slate-950" />

          <Image
            src={poster}
            alt="Hero background"
            fill
            priority
            sizes="100vw"
            onLoadingComplete={() => setImageLoaded(true)}
            className={cn(
              "object-cover transition-opacity duration-700",
              imageLoaded ? "opacity-100" : "opacity-0",
              videoReady ? "opacity-0" : "opacity-100"
            )}
          />
        </>
      )}

      {videoSrc && allowVideo && showVideo && (
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="auto"
          onCanPlay={() => setVideoReady(true)}
          className={cn(
            "absolute inset-0 w-full h-full object-cover pointer-events-none",
            "transition-opacity duration-700",
            showVideo && videoReady ? "opacity-70 md:opacity-100" : "opacity-0",
          )}
        >
          <source src={videoSrc} type="video/webm" />
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
        isVisible={showVideo && allowVideo && isInView}
      />
    </div>
  );
}
