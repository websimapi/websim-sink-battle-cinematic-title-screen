import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useEffect, useState } from "react";
import { AbsoluteFill, Audio, continueRender, delayRender, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { KitchenSceneCanvas } from "./scene.jsx";
const SinkComposition = () => {
  const [audioSrc, setAudioSrc] = useState(null);
  const [handle] = useState(() => delayRender("Loading Audio"));
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  useEffect(() => {
    fetch("sink_battle_music.mp3").then((res) => res.blob()).then((blob) => {
      const url = URL.createObjectURL(blob);
      setAudioSrc(url);
      continueRender(handle);
    }).catch((err) => {
      console.error("Error loading audio:", err);
      continueRender(handle);
    });
    return () => {
    };
  }, [handle]);
  const volume = interpolate(
    frame,
    [durationInFrames - 60, durationInFrames],
    [0.8, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  return /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { backgroundColor: "#050505" }, children: [
    /* @__PURE__ */ jsxDEV(KitchenSceneCanvas, {}, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 40,
      columnNumber: 7
    }),
    audioSrc && /* @__PURE__ */ jsxDEV(
      Audio,
      {
        src: audioSrc,
        volume
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 43,
        columnNumber: 9
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
        lineNumber: 50,
        columnNumber: 7
      }
    )
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 39,
    columnNumber: 5
  });
};
export {
  SinkComposition
};
