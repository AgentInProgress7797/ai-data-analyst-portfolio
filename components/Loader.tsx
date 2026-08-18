"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

/* =========================================================
   BOOT SEQUENCE
========================================================= */

const bootSteps = [
  {
    max: 20,
    label: "Initializing Enterprise AI Engine",
  },
  {
    max: 42,
    label: "Loading Enterprise Knowledge",
  },
  {
    max: 66,
    label: "Building Decision Intelligence",
  },
  {
    max: 94,
    label: "Connecting Agentic Automation Layer",
  },
  {
    max: 100,
    label: "Portfolio Ready",
  },
] as const;

/* =========================================================
   STATUS
========================================================= */

function getBootStatus(
  progress: number,
): string {
  const currentStep =
    bootSteps.find(
      (step) =>
        progress <=
        step.max,
    ) ??
    bootSteps[
      bootSteps.length - 1
    ];

  return currentStep.label;
}

/* =========================================================
   MATRIX TYPES
========================================================= */

type MatrixStream = {
  x: number;
  y: number;
  speed: number;
  fontSize: number;
  length: number;
  opacity: number;
  bright: boolean;
  seed: number;
  drift: number;
  active: boolean;
  phase: number;
};

/* =========================================================
   MATRIX / CODE RAIN
========================================================= */

function MatrixRain() {
  const canvasRef =
    useRef<HTMLCanvasElement>(
      null,
    );

  useEffect(() => {
    const canvas =
      canvasRef.current;

    if (!canvas) {
      return;
    }

    const context =
      canvas.getContext(
        "2d",
      );

    if (!context) {
      return;
    }

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    let width =
      window.innerWidth;

    let height =
      window.innerHeight;

    let streams: MatrixStream[] =
      [];

    let animationFrameId = 0;

    let previousTime = 0;

    const isMobile = () =>
      window.innerWidth <
      768;

    const characters =
      "01{}[]<>/\\();:=+-_*#@$%&|!?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz23456789";

    /* =====================================================
       CREATE MATRIX STREAMS
    ===================================================== */

    const createStreams =
      () => {
        const mobile =
          isMobile();

        const columnSpacing =
          mobile ? 10 : 7;

        const streamCount =
          Math.ceil(
            width /
              columnSpacing,
          );

        streams =
          Array.from(
            {
              length:
                streamCount,
            },
            (
              _,
              index,
            ) => {
              const bright =
                index %
                  8 ===
                0;

              const active =
                Math.random() >
                (mobile
                  ? 0.08
                  : 0.04);

              const jitter =
                (Math.random() -
                  0.5) *
                (mobile
                  ? 5
                  : 6);

              return {
                x:
                  index *
                    columnSpacing +
                  jitter,

                y:
                  Math.random() *
                    (height +
                      300) -
                  150,

                speed:
                  bright
                    ? Math.random() *
                        0.65 +
                      1.15
                    : Math.random() *
                        0.45 +
                      0.65,

                fontSize:
                  mobile
                    ? Math.random() *
                        2.5 +
                      7.5
                    : Math.random() *
                        3 +
                      8,

                length:
                  bright
                    ? Math.floor(
                        Math.random() *
                          18,
                      ) + 26
                    : Math.floor(
                        Math.random() *
                          17,
                      ) + 20,

                opacity:
                  active
                    ? bright
                      ? Math.random() *
                          0.16 +
                        0.28
                      : Math.random() *
                          0.09 +
                        0.08
                    : 0,

                bright,

                seed:
                  Math.random() *
                  5000,

                drift:
                  (Math.random() -
                    0.5) *
                  0.012,

                active,

                phase:
                  Math.random() *
                  Math.PI *
                  2,
              };
            },
          );
      };

    /* =====================================================
       RESIZE
    ===================================================== */

    const resize =
      () => {
        width =
          window.innerWidth;

        height =
          window.innerHeight;

        const pixelRatio =
          Math.min(
            window
              .devicePixelRatio ||
              1,
            2,
          );

        canvas.width =
          Math.floor(
            width *
              pixelRatio,
          );

        canvas.height =
          Math.floor(
            height *
              pixelRatio,
          );

        canvas.style.width =
          `${width}px`;

        canvas.style.height =
          `${height}px`;

        context.setTransform(
          pixelRatio,
          0,
          0,
          pixelRatio,
          0,
          0,
        );

        createStreams();
      };

    /* =====================================================
       DRAW MATRIX STREAM
    ===================================================== */

    const drawStream = (
      stream: MatrixStream,
      time: number,
    ) => {
      if (
        !stream.active ||
        stream.opacity <= 0
      ) {
        return;
      }

      const lineHeight =
        stream.fontSize *
        1.12;

      context.font =
        `${stream.fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;

      context.textAlign =
        "center";

      context.textBaseline =
        "middle";

      const breathing =
        0.88 +
        Math.sin(
          time *
            0.001 +
            stream.phase,
        ) *
          0.12;

      for (
        let index = 0;
        index <
        stream.length;
        index += 1
      ) {
        const characterIndex =
          Math.abs(
            Math.floor(
              stream.seed +
                index * 7 +
                time *
                  0.0035,
            ),
          ) %
          characters.length;

        const character =
          characters[
            characterIndex
          ];

        const y =
          stream.y -
          index *
            lineHeight;

        if (
          y < -40 ||
          y >
            height + 40
        ) {
          continue;
        }

        const trailRatio =
          1 -
          index /
            stream.length;

        const trailFade =
          Math.pow(
            trailRatio,
            1.35,
          );

        let opacity =
          stream.opacity *
          trailFade *
          breathing;

        if (
          index === 0
        ) {
          opacity *=
            stream.bright
              ? 2.7
              : 1.55;
        }

        if (
          stream.bright &&
          index === 0
        ) {
          context.fillStyle =
            `rgba(204,255,248,${Math.min(
              opacity,
              0.72,
            )})`;
        } else if (
          stream.bright
        ) {
          context.fillStyle =
            `rgba(94,234,212,${Math.min(
              opacity,
              0.3,
            )})`;
        } else {
          context.fillStyle =
            `rgba(45,212,191,${Math.min(
              opacity,
              0.16,
            )})`;
        }

        context.fillText(
          character,
          stream.x,
          y,
        );

        if (
          stream.bright &&
          index === 0
        ) {
          const glow =
            context.createRadialGradient(
              stream.x,
              y,
              0,
              stream.x,
              y,
              18,
            );

          glow.addColorStop(
            0,
            "rgba(204,255,248,0.30)",
          );

          glow.addColorStop(
            0.25,
            "rgba(94,234,212,0.16)",
          );

          glow.addColorStop(
            0.6,
            "rgba(45,212,191,0.05)",
          );

          glow.addColorStop(
            1,
            "rgba(45,212,191,0)",
          );

          context.beginPath();

          context.arc(
            stream.x,
            y,
            18,
            0,
            Math.PI *
              2,
          );

          context.fillStyle =
            glow;

          context.fill();
        }
      }
    };

    /* =====================================================
       UPDATE MATRIX STREAM
    ===================================================== */

    const updateStream = (
      stream: MatrixStream,
      deltaMultiplier: number,
    ) => {
      if (
        reducedMotion
      ) {
        return;
      }

      if (
        !stream.active
      ) {
        return;
      }

      stream.y +=
        stream.speed *
        deltaMultiplier;

      stream.x +=
        stream.drift *
        deltaMultiplier;

      if (
        stream.x < -20
      ) {
        stream.x =
          width + 20;
      }

      if (
        stream.x >
        width + 20
      ) {
        stream.x = -20;
      }

      const streamHeight =
        stream.length *
        stream.fontSize *
        1.35;

      if (
        stream.y -
          streamHeight >
        height + 50
      ) {
        stream.y =
          -Math.random() *
            180 -
          30;

        stream.x +=
          (Math.random() -
            0.5) *
          8;

        stream.seed =
          Math.random() *
          5000;

        stream.phase =
          Math.random() *
          Math.PI *
          2;

        stream.length =
          stream.bright
            ? Math.floor(
                Math.random() *
                  18,
              ) + 26
            : Math.floor(
                Math.random() *
                  17,
              ) + 20;

        stream.speed =
          stream.bright
            ? Math.random() *
                0.65 +
              1.15
            : Math.random() *
                0.45 +
              0.65;
      }
    };

    /* =====================================================
       RENDER LOOP
    ===================================================== */

    const render = (
      time: number,
    ) => {
      const delta =
        previousTime === 0
          ? 16.67
          : Math.min(
              time -
                previousTime,
              34,
            );

      previousTime =
        time;

      const deltaMultiplier =
        delta /
        16.67;

      context.clearRect(
        0,
        0,
        width,
        height,
      );

      streams.forEach(
        (stream) => {
          updateStream(
            stream,
            deltaMultiplier,
          );

          drawStream(
            stream,
            time,
          );
        },
      );

      if (
        !reducedMotion
      ) {
        animationFrameId =
          window.requestAnimationFrame(
            render,
          );
      }
    };

    resize();

    render(0);

    if (
      !reducedMotion
    ) {
      animationFrameId =
        window.requestAnimationFrame(
          render,
        );
    }

    window.addEventListener(
      "resize",
      resize,
    );

    return () => {
      window.cancelAnimationFrame(
        animationFrameId,
      );

      window.removeEventListener(
        "resize",
        resize,
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-0
        z-[1]
        h-full
        w-full
      "
    />
  );
}

/* =========================================================
   CIRCUIT OVERLAY
========================================================= */

function CircuitOverlay() {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-0
        z-[2]
        overflow-hidden
      "
    >
      {/* LEFT CIRCUIT */}

      <svg
        viewBox="0 0 600 900"
        fill="none"
        className="
          absolute
          -left-[190px]
          top-0
          h-full
          w-[540px]
          opacity-[0.12]
          sm:-left-[120px]
          sm:w-[660px]
          lg:-left-[70px]
          lg:w-[760px]
        "
      >
        <motion.path
          d="
            M70 0
            V120
            L150 200
            V325
            L225 400
            H320
            L380 460
            V580
          "
          stroke="rgba(94,234,212,0.55)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          initial={{
            pathLength: 0,
            opacity: 0,
          }}
          animate={{
            pathLength: 1,
            opacity: [
              0.12,
              0.4,
              0.12,
            ],
          }}
          transition={{
            pathLength: {
              duration: 2,
              ease:
                "easeInOut",
            },

            opacity: {
              duration: 4,
              repeat:
                Infinity,
              ease:
                "easeInOut",
            },
          }}
        />

        <motion.path
          d="
            M180 0
            V90
            L250 160
            V255
            L315 320
            V390
            L420 495
          "
          stroke="rgba(45,212,191,0.34)"
          strokeWidth="0.8"
          vectorEffect="non-scaling-stroke"
          strokeDasharray="5 8"
          animate={{
            strokeDashoffset: [
              0,
              -120,
            ],
          }}
          transition={{
            duration: 9,
            repeat:
              Infinity,
            ease: "linear",
          }}
        />

        <motion.path
          d="
            M0 370
            H110
            L175 435
            H280
            L335 490
          "
          stroke="rgba(103,232,249,0.32)"
          strokeWidth="0.8"
          vectorEffect="non-scaling-stroke"
          animate={{
            opacity: [
              0.06,
              0.3,
              0.06,
            ],
          }}
          transition={{
            duration: 4.5,
            repeat:
              Infinity,
          }}
        />
      </svg>

      {/* RIGHT CIRCUIT */}

      <svg
        viewBox="0 0 600 900"
        fill="none"
        className="
          absolute
          -right-[190px]
          top-[4%]
          h-full
          w-[540px]
          scale-x-[-1]
          opacity-[0.10]
          sm:-right-[120px]
          sm:w-[660px]
          lg:-right-[70px]
          lg:w-[760px]
        "
      >
        <motion.path
          d="
            M70 0
            V120
            L150 200
            V325
            L225 400
            H320
            L380 460
            V580
          "
          stroke="rgba(94,234,212,0.48)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: 1,
          }}
          transition={{
            duration: 2.3,
            delay: 0.3,
          }}
        />

        <motion.path
          d="
            M180 0
            V90
            L250 160
            V255
            L315 320
            V390
            L420 495
          "
          stroke="rgba(45,212,191,0.30)"
          strokeWidth="0.8"
          vectorEffect="non-scaling-stroke"
          strokeDasharray="4 9"
          animate={{
            strokeDashoffset: [
              0,
              -110,
            ],
          }}
          transition={{
            duration: 10,
            repeat:
              Infinity,
            ease: "linear",
          }}
        />
      </svg>
    </div>
  );
}

/* =========================================================
   LOADER
========================================================= */

export default function Loader() {
  const [
    visible,
    setVisible,
  ] =
    useState(true);

  const [
    pct,
    setPct,
  ] =
    useState(0);

  const [
    systemOnline,
    setSystemOnline,
  ] =
    useState(false);

  const bootStatus =
    useMemo(
      () =>
        getBootStatus(
          pct,
        ),
      [pct],
    );

  const isReady =
    pct >= 100;

  /* =========================================================
     PROGRESS
  ========================================================= */

  useEffect(() => {
    let timer:
      | number
      | undefined;

    const tick =
      () => {
        timer =
          window.setTimeout(
            () => {
              setPct(
                (
                  current,
                ) => {
                  if (
                    current >=
                    100
                  ) {
                    return 100;
                  }

                  let increment =
                    1;

                  if (
                    current <
                    22
                  ) {
                    increment =
                      Math.floor(
                        Math.random() *
                          5,
                      ) + 4;
                  } else if (
                    current <
                    52
                  ) {
                    increment =
                      Math.floor(
                        Math.random() *
                          4,
                      ) + 2;
                  } else if (
                    current <
                    78
                  ) {
                    increment =
                      Math.floor(
                        Math.random() *
                          3,
                      ) + 2;
                  } else if (
                    current <
                    94
                  ) {
                    increment =
                      Math.floor(
                        Math.random() *
                          2,
                      ) + 1;
                  }

                  return Math.min(
                    current +
                      increment,
                    100,
                  );
                },
              );

              tick();
            },
            getProgressDelay(
              pct,
            ),
          );
      };

    tick();

    return () => {
      if (
        timer !==
        undefined
      ) {
        window.clearTimeout(
          timer,
        );
      }
    };
  }, []);

  /* =========================================================
     SYSTEM ONLINE
  ========================================================= */

  useEffect(() => {
    if (
      !isReady
    ) {
      return;
    }

    const onlineTimer =
      window.setTimeout(
        () => {
          setSystemOnline(
            true,
          );
        },
        260,
      );

    const hideTimer =
      window.setTimeout(
        () => {
          setVisible(
            false,
          );

          window.dispatchEvent(
            new Event(
              "portfolio-ready",
            ),
          );
        },
        550,
      );

    return () => {
      window.clearTimeout(
        onlineTimer,
      );

      window.clearTimeout(
        hideTimer,
      );
    };
  }, [isReady]);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key="loader"
          className="
            loader-screen
            overflow-hidden
          "
          initial={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
            scale: 1.02,
            filter:
              "blur(10px)",
          }}
          transition={{
            duration: 0.45,
            ease: [
              0.25,
              0,
              0,
              1,
            ],
          }}
        >
          <MatrixRain />

          <CircuitOverlay />

          {/* CENTER READABILITY MASK */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              z-[3]
              bg-[radial-gradient(ellipse_at_center,rgba(2,6,8,0.34)_0%,rgba(2,6,8,0.22)_24%,rgba(2,6,8,0.07)_52%,rgba(2,6,8,0.01)_78%,transparent_100%)]
            "
          />

          {/* EDGE VIGNETTE */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              z-[3]
              bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.12)_72%,rgba(0,0,0,0.32)_100%)]
            "
          />

          {/* CENTER AMBIENT GLOW */}

          <motion.div
            aria-hidden="true"
            animate={{
              opacity:
                systemOnline
                  ? [
                      0.14,
                      0.55,
                      0,
                    ]
                  : [
                      0.06,
                      0.14,
                      0.06,
                    ],

              scale:
                systemOnline
                  ? [
                      1,
                      1.6,
                      2.1,
                    ]
                  : [
                      0.95,
                      1.08,
                      0.95,
                    ],
            }}
            transition={{
              duration:
                systemOnline
                  ? 0.8
                  : 4,

              repeat:
                systemOnline
                  ? 0
                  : Infinity,

              ease:
                "easeInOut",
            }}
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              z-[4]
              h-[480px]
              w-[480px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-signal-400/[0.035]
              blur-[120px]
            "
          />

          {/* SCANNING LINE */}

          {!systemOnline && (
            <motion.div
              aria-hidden="true"
              initial={{
                left: "-10%",
              }}
              animate={{
                left: "110%",
              }}
              transition={{
                duration: 7,
                repeat:
                  Infinity,
                ease:
                  "linear",
              }}
              className="
                pointer-events-none
                absolute
                inset-y-0
                z-[5]
                w-px
                bg-gradient-to-b
                from-transparent
                via-signal-200/[0.05]
                to-transparent
              "
            />
          )}

          {/* MAIN CONTENT */}

          <div
            className="
              relative
              z-10
              w-full
              max-w-[800px]
              px-5
              text-center
              sm:px-6
            "
          >
            <motion.h1
              initial={{
                opacity: 0,
                y: 18,
                letterSpacing:
                  "0.13em",
              }}
              animate={{
                opacity: 1,
                y: 0,
                letterSpacing:
                  "0.22em",
              }}
              transition={{
                duration: 0.7,
                ease: [
                  0.25,
                  0,
                  0,
                  1,
                ],
              }}
              className="
                font-display
                text-[28px]
                font-medium
                text-white
                sm:text-4xl
                lg:text-[42px]
              "
            >
              ASHISH PAWAR
            </motion.h1>

            <motion.div
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.18,
                duration: 0.6,
              }}
              className="
                mt-5
                flex
                flex-wrap
                items-center
                justify-center
                gap-x-3
                gap-y-2
                font-mono
                text-[9px]
                uppercase
                tracking-[0.26em]
                text-signal-400
                sm:mt-6
                sm:text-xs
                lg:text-[13px]
              "
            >
              <span>
                Enterprise AI
              </span>

              <span
                aria-hidden="true"
                className="text-signal-400/40"
              >
                •
              </span>

              <span>
                Data Intelligence
              </span>

              <span
                aria-hidden="true"
                className="text-signal-400/40"
              >
                •
              </span>

              <span>
                Agentic Automation
              </span>
            </motion.div>

            {/* PROGRESS HEADER */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.34,
                duration: 0.55,
              }}
              className="
                mt-12
                flex
                items-center
                justify-between
                gap-4
                font-mono
                text-[9px]
                uppercase
                tracking-[0.16em]
                text-mist-500
                sm:mt-14
                sm:text-xs
              "
            >
              <span className="text-left">
                Enterprise Intelligence System
              </span>

              <span
                aria-live="polite"
                aria-label={`${pct} percent loaded`}
                className="
                  inline-flex
                  min-w-[55px]
                  items-baseline
                  justify-end
                  tabular-nums
                "
              >
                <span
                  className={
                    isReady
                      ? "text-signal-200"
                      : "text-mist-300"
                  }
                >
                  {pct}
                </span>

                <span
                  aria-hidden="true"
                  className="
                    ml-[2px]
                    text-signal-400/70
                  "
                >
                  %
                </span>
              </span>
            </motion.div>

            {/* PROGRESS TRACK */}

            <div
              className="
                relative
                mt-4
                h-[3px]
                w-full
                overflow-visible
                rounded-full
                bg-white/[0.07]
              "
            >
              <motion.div
                animate={{
                  width:
                    `${pct}%`,
                }}
                transition={{
                  duration: 0.2,
                  ease:
                    "easeOut",
                }}
                className="
                  absolute
                  inset-y-0
                  left-0
                  rounded-full
                  bg-gradient-to-r
                  from-signal-500
                  via-cyan-300
                  to-signal-400
                  shadow-[0_0_16px_rgba(45,212,191,0.34)]
                "
              />

              <motion.div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  top-1/2
                "
                animate={{
                  left:
                    `${pct}%`,
                }}
                transition={{
                  duration: 0.2,
                  ease:
                    "easeOut",
                }}
                style={{
                  transform:
                    "translate(-50%, -50%)",
                }}
              >
                <motion.div
                  animate={{
                    scale:
                      isReady
                        ? [
                            1,
                            1.7,
                            1,
                          ]
                        : [
                            0.92,
                            1.16,
                            0.92,
                          ],
                  }}
                  transition={{
                    duration:
                      isReady
                        ? 0.6
                        : 1.4,

                    repeat:
                      isReady
                        ? 0
                        : Infinity,

                    ease:
                      "easeInOut",
                  }}
                  className="
                    relative
                    h-2
                    w-2
                    rounded-full
                    bg-signal-100
                  "
                >
                  <span
                    className="
                      absolute
                      left-1/2
                      top-1/2
                      h-5
                      w-5
                      -translate-x-1/2
                      -translate-y-1/2
                      rounded-full
                      bg-signal-300/[0.11]
                      blur-[5px]
                    "
                  />

                  <span
                    className="
                      absolute
                      left-1/2
                      top-1/2
                      h-3
                      w-3
                      -translate-x-1/2
                      -translate-y-1/2
                      rounded-full
                      shadow-[0_0_12px_rgba(153,246,228,0.8),0_0_24px_rgba(45,212,191,0.45)]
                    "
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* BOOT STATUS */}

            <div
              className="
                mt-7
                flex
                min-h-8
                items-center
                justify-center
                gap-2
                font-mono
                text-[11px]
                sm:text-sm
              "
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={
                    systemOnline
                      ? "online"
                      : bootStatus
                  }
                  initial={{
                    opacity: 0,
                    y: 7,
                    filter:
                      "blur(4px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter:
                      "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    y: -7,
                    filter:
                      "blur(4px)",
                  }}
                  transition={{
                    duration: 0.24,
                  }}
                  className={
                    systemOnline
                      ? "font-medium uppercase tracking-[0.18em] text-signal-200"
                      : isReady
                        ? "text-signal-300"
                        : "text-mist-600"
                  }
                >
                  {systemOnline
                    ? "SYSTEM ONLINE"
                    : `${isReady ? "✓ " : "> "}${bootStatus}`}
                </motion.span>
              </AnimatePresence>

              {!isReady && (
                <motion.span
                  aria-hidden="true"
                  animate={{
                    opacity: [
                      0,
                      1,
                      0,
                    ],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat:
                      Infinity,
                  }}
                  className="
                    inline-block
                    h-4
                    w-[6px]
                    bg-signal-400/45
                  "
                />
              )}
            </div>
          </div>

          {/* SYSTEM ONLINE PULSE */}

          <AnimatePresence>
            {systemOnline && (
              <motion.div
                aria-hidden="true"
                initial={{
                  opacity: 0.5,
                  scale: 0.08,
                }}
                animate={{
                  opacity: [
                    0.5,
                    0.14,
                    0,
                  ],

                  scale: [
                    0.08,
                    1.3,
                    2.1,
                  ],
                }}
                transition={{
                  duration: 0.95,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-1/2
                  z-[9]
                  h-[480px]
                  w-[480px]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  border
                  border-signal-300/20
                  shadow-[0_0_70px_rgba(45,212,191,0.1)]
                "
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* =========================================================
   OPTIMIZED PROGRESS DELAY
========================================================= */

function getProgressDelay(
  progress: number,
) {
  if (
    progress >= 89 &&
    progress <= 94
  ) {
    return 55;
  }

  if (
    progress < 25
  ) {
    return 28;
  }

  if (
    progress < 70
  ) {
    return 34;
  }

  return 42;
}