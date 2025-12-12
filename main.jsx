import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { createRoot } from "react-dom/client";
import { Player } from "@remotion/player";
import { SinkComposition } from "./composition.jsx";
const FPS = 30;
const DURATION_SEC = 95;
const DURATION_FRAMES = FPS * DURATION_SEC;
createRoot(document.getElementById("app")).render(
  /* @__PURE__ */ jsxDEV(
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
          autoPlay: false,
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
          lineNumber: 21,
          columnNumber: 5
        }
      )
    },
    void 0,
    false,
    {
      fileName: "<stdin>",
      lineNumber: 11,
      columnNumber: 3
    }
  )
);
