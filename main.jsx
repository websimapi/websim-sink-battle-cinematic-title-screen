import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { createRoot } from "react-dom/client";
import { Player } from "@websim/remotion/player";
import { SinkComposition } from "./composition.jsx";
import { KitchenSceneStandalone } from "./scene.jsx";
const FPS = 30;
const TOTAL_DURATION_SEC = 95;
const TOTAL_FRAMES = FPS * TOTAL_DURATION_SEC;
const CHUNK_SEC = 5;
const CHUNK_FRAMES = FPS * CHUNK_SEC;
const App = () => {
  const [show3D, setShow3D] = React.useState(false);
  const [hasInteracted, setHasInteracted] = React.useState(false);
  const [chunkIndex, setChunkIndex] = React.useState(-1);
  const isChunked = chunkIndex !== -1;
  const currentDuration = isChunked ? Math.min(CHUNK_FRAMES, TOTAL_FRAMES - chunkIndex * CHUNK_FRAMES) : TOTAL_FRAMES;
  const startFrame = isChunked ? chunkIndex * CHUNK_FRAMES : 0;
  const totalChunks = Math.ceil(TOTAL_FRAMES / CHUNK_FRAMES);
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
            lineNumber: 56,
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
            lineNumber: 57,
            columnNumber: 9
          })
        ]
      },
      void 0,
      true,
      {
        fileName: "<stdin>",
        lineNumber: 40,
        columnNumber: 7
      }
    );
  }
  if (show3D) {
    return /* @__PURE__ */ jsxDEV("div", { style: { width: "100%", height: "100%", backgroundColor: "#111" }, children: /* @__PURE__ */ jsxDEV(KitchenSceneStandalone, {}, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 73,
      columnNumber: 9
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 72,
      columnNumber: 7
    });
  }
  return /* @__PURE__ */ jsxDEV("div", { style: { width: "100%", height: "100%", display: "flex", flexDirection: "column", backgroundColor: "#111" }, children: [
    /* @__PURE__ */ jsxDEV("div", { style: {
      padding: "12px",
      background: "#1a1a1a",
      borderBottom: "1px solid #333",
      display: "flex",
      gap: "8px",
      overflowX: "auto",
      whiteSpace: "nowrap",
      scrollbarWidth: "thin"
    }, children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setChunkIndex(-1),
          style: {
            background: chunkIndex === -1 ? "#3b82f6" : "#333",
            color: "white",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "6px 12px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "0.9rem",
            fontWeight: chunkIndex === -1 ? "bold" : "normal"
          },
          children: "Full Video"
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 91,
          columnNumber: 9
        }
      ),
      Array.from({ length: totalChunks }).map((_, i) => /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setChunkIndex(i),
          style: {
            background: chunkIndex === i ? "#3b82f6" : "#333",
            color: "white",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "6px 12px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "0.9rem"
          },
          children: [
            "Chunk ",
            i + 1
          ]
        },
        i,
        true,
        {
          fileName: "<stdin>",
          lineNumber: 107,
          columnNumber: 11
        }
      ))
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 81,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { style: { flex: 1, display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden", background: "#050505" }, children: /* @__PURE__ */ jsxDEV(
      Player,
      {
        component: SinkComposition,
        durationInFrames: currentDuration,
        fps: FPS,
        compositionWidth: 1080,
        compositionHeight: 1920,
        controls: true,
        autoPlay: true,
        loop: true,
        inputProps: {
          totalFrames: TOTAL_FRAMES,
          startFrame
        },
        style: {
          width: "100%",
          maxWidth: "540px",
          aspectRatio: "9/16",
          boxShadow: "0 0 30px rgba(0,0,0,0.6)"
        }
      },
      startFrame,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 126,
        columnNumber: 9
      }
    ) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 125,
      columnNumber: 7
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 79,
    columnNumber: 5
  });
};
createRoot(document.getElementById("app")).render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 152,
  columnNumber: 51
}));
