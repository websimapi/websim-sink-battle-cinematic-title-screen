import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { createRoot } from "react-dom/client";
import { Player } from "@remotion/player";
import { SinkComposition } from "./composition.jsx";
import { KitchenSceneStandalone } from "./scene.jsx";
const FPS = 30;
const DURATION_SEC = 95;
const DURATION_FRAMES = FPS * DURATION_SEC;
const DownloadButton = ({ playerRef }) => {
  const [recording, setRecording] = React.useState(false);
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: "browser" },
        audio: true
      });
      const recorder = new MediaRecorder(stream, {
        mimeType: "video/webm; codecs=vp9,opus"
      });
      const chunks = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "sink-battle-render.webm";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setRecording(false);
      };
      recorder.start();
      setRecording(true);
      if (playerRef.current) {
        playerRef.current.seekTo(0);
        playerRef.current.play();
      }
      stream.getVideoTracks()[0].onended = () => {
        recorder.stop();
        if (playerRef.current) {
          playerRef.current.pause();
        }
      };
    } catch (err) {
      console.error("Error recording:", err);
      setRecording(false);
    }
  };
  return /* @__PURE__ */ jsxDEV(
    "button",
    {
      onClick: recording ? null : startRecording,
      style: {
        position: "absolute",
        bottom: "20px",
        right: "20px",
        padding: "12px 24px",
        backgroundColor: recording ? "#ff4444" : "#2196f3",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        fontWeight: "bold",
        cursor: recording ? "default" : "pointer",
        zIndex: 1e3,
        boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontFamily: "system-ui, sans-serif",
        transition: "all 0.2s",
        opacity: recording ? 0.9 : 1
      },
      children: [
        recording && /* @__PURE__ */ jsxDEV("div", { style: {
          width: 10,
          height: 10,
          background: "white",
          borderRadius: "50%",
          animation: "pulse 1s infinite"
        } }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 91,
          columnNumber: 9
        }),
        recording ? "Recording... (Stop Sharing to Save)" : "Render & Download",
        /* @__PURE__ */ jsxDEV("style", { children: `
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      ` }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 100,
          columnNumber: 7
        })
      ]
    },
    void 0,
    true,
    {
      fileName: "<stdin>",
      lineNumber: 67,
      columnNumber: 5
    }
  );
};
const App = () => {
  const [show3D, setShow3D] = React.useState(false);
  const playerRef = React.useRef(null);
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "`" || e.key === "~") {
        setShow3D((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
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
          lineNumber: 135,
          columnNumber: 9
        })
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 128,
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
        backgroundColor: "#111",
        position: "relative"
      },
      children: [
        /* @__PURE__ */ jsxDEV(
          Player,
          {
            ref: playerRef,
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
            lineNumber: 152,
            columnNumber: 7
          }
        ),
        /* @__PURE__ */ jsxDEV(DownloadButton, { playerRef }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 169,
          columnNumber: 7
        })
      ]
    },
    void 0,
    true,
    {
      fileName: "<stdin>",
      lineNumber: 141,
      columnNumber: 5
    }
  );
};
createRoot(document.getElementById("app")).render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 174,
  columnNumber: 51
}));
