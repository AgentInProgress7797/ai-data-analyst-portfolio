"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

type CursorMode =
  | "default"
  | "interactive"
  | "avatar"
  | "download"
  | "contact"
  | "open"
  | "view";

type CursorState = {
  mode: CursorMode;
  label: string;
};

const allowedModes: CursorMode[] = [
  "default",
  "interactive",
  "avatar",
  "download",
  "contact",
  "open",
  "view",
];

const defaultLabels: Partial<
  Record<CursorMode, string>
> = {
  download: "GET",
  contact: "CONNECT",
  open: "OPEN",
  view: "VIEW",
};

function getCursorState(
  target: EventTarget | null
): CursorState {
  const element =
    target instanceof HTMLElement
      ? target
      : null;

  if (!element) {
    return {
      mode: "default",
      label: "",
    };
  }

  /*
   * Keep the normal browser cursor for text fields.
   */
  const textField =
    element.closest<HTMLElement>(
      [
        "input",
        "textarea",
        "select",
        "[contenteditable='true']",
      ].join(",")
    );

  if (textField) {
    return {
      mode: "default",
      label: "",
    };
  }

  /*
   * Elements with an explicitly configured cursor.
   */
  const customTarget =
    element.closest<HTMLElement>(
      "[data-cursor]"
    );

  if (customTarget) {
    const requestedMode =
      customTarget.dataset.cursor;

    const mode =
      requestedMode &&
      allowedModes.includes(
        requestedMode as CursorMode
      )
        ? (requestedMode as CursorMode)
        : "interactive";

    const customLabel =
      customTarget.dataset.cursorLabel?.trim();

    return {
      mode,
      label:
        customLabel ||
        defaultLabels[mode] ||
        "",
    };
  }

  /*
   * Automatically recognise normal links and buttons.
   */
  const interactiveTarget =
    element.closest<HTMLElement>(
      [
        "a",
        "button",
        "summary",
        "[role='button']",
        "[tabindex]:not([tabindex='-1'])",
      ].join(",")
    );

  if (interactiveTarget) {
    return {
      mode: "interactive",
      label: "",
    };
  }

  return {
    mode: "default",
    label: "",
  };
}

export default function CustomCursor() {
  const [enabled, setEnabled] =
    useState(false);

  const [visible, setVisible] =
    useState(false);

  const [pressed, setPressed] =
    useState(false);

  const [cursorState, setCursorState] =
    useState<CursorState>({
      mode: "default",
      label: "",
    });

  /*
   * Raw pointer location.
   */
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);

  /*
   * Smooth glass-lens movement.
   */
  const lensX = useSpring(pointerX, {
    stiffness: 500,
    damping: 38,
    mass: 0.2,
  });

  const lensY = useSpring(pointerY, {
    stiffness: 500,
    damping: 38,
    mass: 0.2,
  });

  /*
   * The label follows slightly more quickly.
   */
  const labelX = useSpring(pointerX, {
    stiffness: 560,
    damping: 42,
    mass: 0.18,
  });

  const labelY = useSpring(pointerY, {
    stiffness: 560,
    damping: 42,
    mass: 0.18,
  });

  useEffect(() => {
    const finePointer =
      window.matchMedia("(pointer: fine)");

    const hoverSupport =
      window.matchMedia("(hover: hover)");

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      );

    const updateSupport = () => {
      const supported =
        finePointer.matches &&
        hoverSupport.matches &&
        !reducedMotion.matches;

      setEnabled(supported);

      document.documentElement.classList.toggle(
        "glass-cursor-enabled",
        supported
      );
    };

    updateSupport();

    finePointer.addEventListener(
      "change",
      updateSupport
    );

    hoverSupport.addEventListener(
      "change",
      updateSupport
    );

    reducedMotion.addEventListener(
      "change",
      updateSupport
    );

    return () => {
      finePointer.removeEventListener(
        "change",
        updateSupport
      );

      hoverSupport.removeEventListener(
        "change",
        updateSupport
      );

      reducedMotion.removeEventListener(
        "change",
        updateSupport
      );

      document.documentElement.classList.remove(
        "glass-cursor-enabled"
      );
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      setVisible(false);
      return;
    }

    const handlePointerMove = (
      event: PointerEvent
    ) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);

      setCursorState(
        getCursorState(event.target)
      );

      setVisible(true);
    };

    const handlePointerOver = (
      event: PointerEvent
    ) => {
      setCursorState(
        getCursorState(event.target)
      );
    };

    const handlePointerDown = () => {
      setPressed(true);
    };

    const handlePointerUp = () => {
      setPressed(false);
    };

    const handlePointerLeave = () => {
      setVisible(false);
      setPressed(false);
    };

    const handlePointerEnter = () => {
      setVisible(true);
    };

    const handleWindowBlur = () => {
      setVisible(false);
      setPressed(false);
    };

    window.addEventListener(
      "pointermove",
      handlePointerMove,
      { passive: true }
    );

    window.addEventListener(
      "pointerover",
      handlePointerOver,
      { passive: true }
    );

    window.addEventListener(
      "pointerdown",
      handlePointerDown
    );

    window.addEventListener(
      "pointerup",
      handlePointerUp
    );

    document.documentElement.addEventListener(
      "pointerleave",
      handlePointerLeave
    );

    document.documentElement.addEventListener(
      "pointerenter",
      handlePointerEnter
    );

    window.addEventListener(
      "blur",
      handleWindowBlur
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      window.removeEventListener(
        "pointerover",
        handlePointerOver
      );

      window.removeEventListener(
        "pointerdown",
        handlePointerDown
      );

      window.removeEventListener(
        "pointerup",
        handlePointerUp
      );

      document.documentElement.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );

      document.documentElement.removeEventListener(
        "pointerenter",
        handlePointerEnter
      );

      window.removeEventListener(
        "blur",
        handleWindowBlur
      );
    };
  }, [
    enabled,
    pointerX,
    pointerY,
  ]);

  if (!enabled) {
    return null;
  }

  const isInteractive =
    cursorState.mode !== "default";

  const isAvatar =
    cursorState.mode === "avatar";

  const showLabel =
    cursorState.label.length > 0;

  /*
   * Smaller size prevents the lens from obscuring
   * the text inside links and buttons.
   */
  let lensSize = 16;

  if (isInteractive) {
    lensSize = 20;
  }

  if (isAvatar) {
    lensSize = 36;
  }

  if (pressed) {
    lensSize *= 0.82;
  }

  /*
   * Move the lens away from the real mouse location
   * when hovering an interactive element.
   */
  const lensOffsetX =
    isInteractive && !isAvatar ? 18 : 0;

  const lensOffsetY =
    isInteractive && !isAvatar ? -18 : 0;

  /*
   * Context label sits to the upper-right.
   */
  const labelOffsetX = 35;
  const labelOffsetY = -42;

  return (
    <>
      {/* Pointer-position tracker */}
      <motion.div
        aria-hidden="true"
        className="glass-cursor-tracker"
        style={{
          x: lensX,
          y: lensY,
        }}
        animate={{
          opacity: visible ? 1 : 0,
        }}
        transition={{
          opacity: {
            duration: 0.12,
          },
        }}
      >
        {/* Actual glass lens */}
        <motion.div
          className="glass-cursor-lens"
          animate={{
            x: lensOffsetX,
            y: lensOffsetY,

            width: lensSize,
            height: lensSize,

            scale: visible
              ? pressed
                ? 0.82
                : 1
              : 0.65,

            borderColor: isInteractive
              ? "rgba(94, 234, 212, 0.72)"
              : "rgba(94, 234, 212, 0.42)",

            backgroundColor: isInteractive
              ? "rgba(94, 234, 212, 0.09)"
              : "rgba(94, 234, 212, 0.035)",

            boxShadow: isAvatar
              ? [
                  "0 8px 28px rgba(0,0,0,0.38)",
                  "inset 0 1px 0 rgba(204,251,241,0.28)",
                  "0 0 20px rgba(94,234,212,0.22)",
                ].join(",")
              : isInteractive
                ? [
                    "0 6px 22px rgba(0,0,0,0.3)",
                    "inset 0 1px 0 rgba(204,251,241,0.22)",
                    "0 0 14px rgba(94,234,212,0.14)",
                  ].join(",")
                : [
                    "0 6px 20px rgba(0,0,0,0.28)",
                    "inset 0 1px 0 rgba(204,251,241,0.14)",
                    "0 0 9px rgba(94,234,212,0.08)",
                  ].join(","),
          }}
          transition={{
            x: {
              type: "spring",
              stiffness: 500,
              damping: 32,
            },

            y: {
              type: "spring",
              stiffness: 500,
              damping: 32,
            },

            width: {
              duration: 0.18,
            },

            height: {
              duration: 0.18,
            },

            scale: {
              duration: 0.14,
            },

            borderColor: {
              duration: 0.18,
            },

            backgroundColor: {
              duration: 0.18,
            },

            boxShadow: {
              duration: 0.18,
            },
          }}
        >
          <span className="glass-cursor-highlight" />
        </motion.div>
      </motion.div>

      {/* Context-label position tracker */}
      <motion.div
        aria-hidden="true"
        className="glass-cursor-label-tracker"
        style={{
          x: labelX,
          y: labelY,
        }}
        animate={{
          opacity:
            visible && showLabel
              ? 1
              : 0,
        }}
        transition={{
          opacity: {
            duration: 0.14,
          },
        }}
      >
        <motion.div
          className="glass-cursor-label"
          animate={{
            x: labelOffsetX,
            y: labelOffsetY,

            scale:
              visible && showLabel
                ? 1
                : 0.86,
          }}
          transition={{
            x: {
              type: "spring",
              stiffness: 520,
              damping: 34,
            },

            y: {
              type: "spring",
              stiffness: 520,
              damping: 34,
            },

            scale: {
              duration: 0.16,
            },
          }}
        >
          {cursorState.label}
        </motion.div>
      </motion.div>
    </>
  );
}