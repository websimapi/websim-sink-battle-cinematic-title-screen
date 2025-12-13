import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { Player } from "@remotion/player";
import { SinkComposition } from "./composition.jsx";
import { styles } from "./styles.js";
import { useRendering } from "./useRendering.js";
import { DebugPanel } from "./DebugPanel.jsx";
import { ChunkGrid } from "./ChunkGrid.jsx";
const App = () => {
  const [showDebug, setShowDebug] = useState(false);
  const [config, setConfig] = useState({
    duration: 95,
    fps: 30,
    strategy: "auto",
    customFrames: 120,
    customConcurrency: 25,
    combineChunks: false
  });
  const playerRef = useRef(null);
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "~" || e.key === "`") {
        setShowDebug((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);
  const {
    stats,
    renderStatus,
    recording,
    recordChunk,
    renderAllChunks
  } = useRendering(config, playerRef);
  return /* @__PURE__ */ jsxDEV("div", { style: styles.container, children: [
    showDebug && /* @__PURE__ */ jsxDEV("header", { style: styles.header, children: [
      /* @__PURE__ */ jsxDEV("h1", { style: styles.h1, children: "\u{1F3AC} Remotion Smart Chunk Manager" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 45,
        columnNumber: 11
      }),
      /* @__PURE__ */ jsxDEV("p", { style: styles.subtitle, children: "Optimized rendering pipeline for WebSim & Lambda" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 46,
        columnNumber: 11
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 44,
      columnNumber: 9
    }),
    /* @__PURE__ */ jsxDEV("div", { style: styles.grid, children: [
      showDebug && /* @__PURE__ */ jsxDEV(
        DebugPanel,
        {
          config,
          setConfig,
          stats,
          recording,
          renderAllChunks
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 53,
          columnNumber: 11
        }
      ),
      /* @__PURE__ */ jsxDEV("div", { style: styles.playerWrapper, children: stats.totalFrames > 0 ? /* @__PURE__ */ jsxDEV(
        Player,
        {
          ref: playerRef,
          component: SinkComposition,
          durationInFrames: stats.totalFrames,
          fps: config.fps,
          compositionWidth: 1080,
          compositionHeight: 1920,
          controls: true,
          loop: true,
          muted: recording,
          style: {
            width: "100%",
            maxWidth: "360px",
            aspectRatio: "9/16",
            boxShadow: "0 0 20px rgba(0,0,0,0.5)"
          }
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 65,
          columnNumber: 13
        }
      ) : /* @__PURE__ */ jsxDEV("div", { style: {
        width: "100%",
        maxWidth: "360px",
        aspectRatio: "9/16",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.5)",
        borderRadius: "10px",
        color: "white"
      }, children: "Invalid Duration" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 83,
        columnNumber: 14
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 63,
        columnNumber: 9
      }),
      showDebug && /* @__PURE__ */ jsxDEV(
        ChunkGrid,
        {
          stats,
          renderStatus,
          recordChunk
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 95,
          columnNumber: 11
        }
      )
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 50,
      columnNumber: 7
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 42,
    columnNumber: 5
  });
};
createRoot(document.getElementById("app")).render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 106,
  columnNumber: 51
}));
