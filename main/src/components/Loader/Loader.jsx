import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const progressRef = useRef(null);
  const nameRef = useRef(null);
  const percentRef = useRef(null);

  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame = 0;
    const total = 100;
    const duration = 2400;

    gsap.set(progressRef.current, {
      scaleX: 0,
      transformOrigin: "left center",
    });

    const interval = setInterval(() => {
      frame++;

      const progress = frame / total;
      const eased = 1 - Math.pow(1 - progress, 3);

      const value = Math.floor(eased * 100);

      setCount(value);

      gsap.to(progressRef.current, {
        scaleX: value / 100,
        duration: 0.08,
        ease: "none",
      });

      if (frame >= total) {
        clearInterval(interval);
        setCount(100);

        const tl = gsap.timeline({
          delay: 0.2,
          onComplete,
        });

        tl.to([nameRef.current, percentRef.current], {
          y: -10,
          opacity: 0,
          duration: 0.45,
          ease: "power2.inOut",
        })
          .to(
            loaderRef.current,
            {
              opacity: 0,
              scale: 0.98,
              filter: "blur(20px)",
              duration: 0.9,
              ease: "expo.inOut",
            },
            "-=0.1"
          );
      }
    }, duration / total);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      style={{
        position: "fixed",
        inset: 0,
        background: "#050505",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99999,
      }}
    >
      <div
        style={{
          width: "260px",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        <div
          ref={nameRef}
          style={{
            fontSize: "11px",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,.9)",
            fontWeight: 500,
            fontFamily: "var(--font-body)",
          }}
        >
          Navaneeth
        </div>

        <div
          style={{
            width: "100%",
            height: "1px",
            background: "rgba(255,255,255,.12)",
            overflow: "hidden",
          }}
        >
          <div
            ref={progressRef}
            style={{
              width: "100%",
              height: "100%",
              background: "#ffffff",
              transform: "scaleX(0)",
            }}
          />
        </div>

        <div
          ref={percentRef}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "11px",
            color: "rgba(255,255,255,.45)",
            fontFamily: "var(--font-body)",
            letterSpacing: "0.08em",
          }}
        >
          <span>{String(count).padStart(2, "0")}%</span>

          <span>Loading</span>
        </div>
      </div>
    </div>
  );
}