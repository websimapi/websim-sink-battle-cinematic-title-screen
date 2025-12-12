import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { KitchenScene } from "./scene.jsx";
const SinkComposition = () => {
  return /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { backgroundColor: "#050505" }, children: [
    /* @__PURE__ */ jsxDEV(
      ThreeCanvas,
      {
        shadows: true,
        camera: { position: [3, 4, 3], fov: 45 },
        width: 1080,
        height: 1920,
        style: { width: "100%", height: "100%" },
        children: /* @__PURE__ */ jsxDEV(KitchenScene, {}, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 17,
          columnNumber: 9
        })
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 10,
        columnNumber: 7
      }
    ),
    /* @__PURE__ */ jsxDEV(
      Audio,
      {
        src: "/api - Sink Battle - Sonauto.ogg",
        volume: 0.8
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 20,
        columnNumber: 7
      }
    ),
    /* @__PURE__ */ jsxDEV(
      AbsoluteFill,
      {
        style: {
          background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.4) 100%)",
          pointerEvents: "none"
        }
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 26,
        columnNumber: 7
      }
    )
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 9,
    columnNumber: 5
  });
};
export {
  SinkComposition
};
