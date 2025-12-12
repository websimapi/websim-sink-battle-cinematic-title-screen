import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Player } from "@remotion/player";
import { SinkComposition } from "./composition.jsx";
import { KitchenSceneStandalone } from "./scene.jsx";
const FPS = 30;
const DURATION_SEC = 95;
const DURATION_FRAMES = FPS * DURATION_SEC;
const App = () => {
  const [started, setStarted] = useState(false);
  const [show3D, setShow3D] = useState(false);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "`" || e.key === "~") {
        setShow3D((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  if (!started) {
    return /* @__PURE__ */ jsxDEV(
      "div",
      {
        onClick: () => setStarted(true),
        style: {
          width: "100%",
          height: "100%",
          backgroundColor: "#000",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          fontFamily: "sans-serif",
          padding: "20px",
          textAlign: "center"
        },
        children: [
          /* @__PURE__ */ jsxDEV("h1", { style: { marginBottom: "20px", fontSize: "2rem" }, children: "SINK BATTLE" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 45,
            columnNumber: 9
          }),
          /* @__PURE__ */ jsxDEV("p", { style: { opacity: 0.7 }, children: "Tap to Start" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 46,
            columnNumber: 9
          })
        ]
      },
      void 0,
      true,
      {
        fileName: "<stdin>",
        lineNumber: 28,
        columnNumber: 7
      }
    );
  }
  return /* @__PURE__ */ jsxDEV("div", { style: { width: "100%", height: "100%", position: "relative", backgroundColor: "#111" }, children: [
    /* @__PURE__ */ jsxDEV(
      "button",
      {
        onClick: () => setShow3D(!show3D),
        style: {
          position: "absolute",
          top: "20px",
          right: "20px",
          zIndex: 1e3,
          background: "rgba(0,0,0,0.6)",
          color: "white",
          border: "1px solid rgba(255,255,255,0.3)",
          padding: "8px 16px",
          borderRadius: "20px",
          cursor: "pointer",
          backdropFilter: "blur(4px)"
        },
        children: show3D ? "Watch Movie" : "Explore 3D"
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 54,
        columnNumber: 7
      }
    ),
    show3D ? /* @__PURE__ */ jsxDEV("div", { style: { width: "100%", height: "100%" }, children: /* @__PURE__ */ jsxDEV(KitchenSceneStandalone, {}, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 75,
      columnNumber: 11
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 74,
      columnNumber: 9
    }) : /* @__PURE__ */ jsxDEV(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        },
        children: /* @__PURE__ */ jsxDEV(
          Player,
          {
            component: SinkComposition,
            durationInFrames: DURATION_FRAMES,
            fps: FPS,
            compositionWidth: 1080,
            compositionHeight: 1920,
            controls: true,
            autoPlay: true,
            loop: true,
            style: {
              width: "100%",
              height: "100%",
              maxHeight: "100vh",
              aspectRatio: "9/16",
              objectFit: "contain",
              boxShadow: "0 0 20px rgba(0,0,0,0.5)"
            }
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 87,
            columnNumber: 11
          }
        )
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 78,
        columnNumber: 9
      }
    )
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 52,
    columnNumber: 5
  });
};
createRoot(document.getElementById("app")).render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 111,
  columnNumber: 51
}));
