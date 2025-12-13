import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { AbsoluteFill, Audio } from "remotion";
import { KitchenSceneCanvas } from "./scene.jsx";
const SinkComposition = ({ totalFrames, startFrame }) => {
  const safeTotal = totalFrames || 2850;
  const safeStart = startFrame || 0;
  return /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { backgroundColor: "#050505" }, children: [
    /* @__PURE__ */ jsxDEV(KitchenSceneCanvas, { totalFrames: safeTotal, startFrame: safeStart }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 13,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(
      Audio,
      {
        src: "/api - Sink Battle - Sonauto.ogg",
        volume: 0.8,
        startFrom: safeStart
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 15,
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
        lineNumber: 22,
        columnNumber: 7
      }
    )
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 12,
    columnNumber: 5
  });
};
export {
  SinkComposition
};
