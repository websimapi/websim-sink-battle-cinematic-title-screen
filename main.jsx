import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { createRoot } from "react-dom/client";
import { Player } from "@websim/remotion/player";
import { SinkComposition } from "./composition.jsx";
import { KitchenSceneStandalone } from "./scene.jsx";
const FPS = 30;
const DURATION_SEC = 95;
const DURATION_FRAMES = FPS * DURATION_SEC;
const App = () => {
  const [show3D, setShow3D] = React.useState(false);
  const [hasInteracted, setHasInteracted] = React.useState(false);
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "`" || e.key === "~") {
        setShow3D((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  if (!hasInteracted) {
    return /* @__PURE__ */ jsxDEV(
      "div",
      {
        onClick: () => setHasInteracted(true),
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#050505",
          cursor: "pointer",
          flexDirection: "column",
          gap: "20px",
          color: "white",
          fontFamily: "sans-serif"
        },
        children: [
          /* @__PURE__ */ jsxDEV("h1", { style: { margin: 0, textTransform: "uppercase", letterSpacing: "2px" }, children: "Sink Battle" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 44,
            columnNumber: 9
          }),
          /* @__PURE__ */ jsxDEV("div", { style: {
            padding: "12px 32px",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "4px",
            backgroundColor: "rgba(255,255,255,0.05)",
            fontSize: "1.2rem"
          }, children: "Click to Start" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 45,
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
  if (show3D) {
    return /* @__PURE__ */ jsxDEV(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          backgroundColor: "#111"
        },
        children: /* @__PURE__ */ jsxDEV(KitchenSceneStandalone, {}, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 67,
          columnNumber: 9
        })
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 60,
        columnNumber: 7
      }
    );
  }
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#111"
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
            maxWidth: "540px",
            // Scaled down for desktop view, but renders at full res
            aspectRatio: "9/16",
            boxShadow: "0 0 20px rgba(0,0,0,0.5)"
          }
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 83,
          columnNumber: 7
        }
      )
    },
    void 0,
    false,
    {
      fileName: "<stdin>",
      lineNumber: 73,
      columnNumber: 5
    }
  );
};
createRoot(document.getElementById("app")).render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 103,
  columnNumber: 51
}));
