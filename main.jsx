import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { createRoot } from "react-dom/client";
import { Player } from "@websim/remotion/player";
import { SinkComposition } from "./composition.jsx";
const FPS = 30;
const DURATION_SEC = 95;
const DURATION_FRAMES = FPS * DURATION_SEC;
createRoot(document.getElementById("app")).render(
  /* @__PURE__ */ jsxDEV("div", { style: { width: "100%", height: "100%", backgroundColor: "#000" }, children: /* @__PURE__ */ jsxDEV(
    Player,
    {
      component: SinkComposition,
      durationInFrames: DURATION_FRAMES,
      fps: FPS,
      compositionWidth: 720,
      compositionHeight: 1280,
      controls: true,
      loop: true,
      autoPlay: true,
      style: {
        width: "100%",
        height: "100%"
      }
    },
    void 0,
    false,
    {
      fileName: "<stdin>",
      lineNumber: 12,
      columnNumber: 5
    }
  ) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 11,
    columnNumber: 3
  })
);
