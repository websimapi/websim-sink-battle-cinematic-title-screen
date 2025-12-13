import { useState, useEffect, useRef } from "react";

export const useRendering = (config, playerRef) => {
  const { duration, fps, strategy, customFrames, customConcurrency, combineChunks } = config;

  // Initialize with valid defaults to prevent Player crash on first render
  const [stats, setStats] = useState(() => {
    const frames = duration * fps;
    const targetChunks = 25;
    const fpc = Math.ceil(frames / targetChunks);
    const cc = Math.ceil(frames / fpc);
    return { totalFrames: frames, chunkCount: cc, framesPerChunk: fpc };
  });

  const [renderStatus, setRenderStatus] = useState({}); // { 0: 'pending', 1: 'rendering', 2: 'complete' }
  const [recording, setRecording] = useState(false);

  // Audio Context Refs for recording
  const audioCtxRef = useRef(null);
  const audioDestRef = useRef(null);
  const audioElRef = useRef(null);

  // Initialize Audio Context for recording capture
  useEffect(() => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    const dest = ctx.createMediaStreamDestination();
    const audio = new Audio("/api - Sink Battle - Sonauto.ogg");
    audio.crossOrigin = "anonymous";
    audio.volume = 0.8; // Match composition volume

    // Connect audio element to destination (for recording)
    const source = ctx.createMediaElementSource(audio);
    source.connect(dest);

    audioCtxRef.current = ctx;
    audioDestRef.current = dest;
    audioElRef.current = audio;

    return () => {
      if (ctx.state !== 'closed') ctx.close();
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Update stats when config changes
  useEffect(() => {
    const totalFrames = duration * fps;
    let framesPerChunk, chunkCount;

    if (strategy === "auto") {
      const targetChunks = 25;
      framesPerChunk = Math.ceil(totalFrames / targetChunks);
      chunkCount = Math.ceil(totalFrames / framesPerChunk);
    } else if (strategy === "frames") {
      framesPerChunk = customFrames;
      chunkCount = Math.ceil(totalFrames / framesPerChunk);
    } else {
      chunkCount = customConcurrency;
      framesPerChunk = Math.ceil(totalFrames / chunkCount);
    }

    setStats({ totalFrames, chunkCount, framesPerChunk });

    // Reset statuses
    const newStatus = {};
    for(let i=0; i<chunkCount; i++) newStatus[i] = 'pending';
    setRenderStatus(newStatus);
  }, [duration, fps, strategy, customFrames, customConcurrency]);

  const recordChunk = async (chunkIndex) => {
    if (recording) return;
    setRecording(true);

    const startFrame = chunkIndex * stats.framesPerChunk;
    const endFrame = Math.min((chunkIndex + 1) * stats.framesPerChunk - 1, stats.totalFrames - 1);
    const durationFrames = endFrame - startFrame + 1;
    const durationMs = (durationFrames / fps) * 1000;

    // Update status UI
    setRenderStatus(prev => ({ ...prev, [chunkIndex]: 'rendering' }));

    const canvas = document.querySelector("canvas");
    if (!canvas) {
      alert("Canvas not found! Wait for player to load.");
      setRecording(false);
      return;
    }

    // Initialize MediaRecorder
    const canvasStream = canvas.captureStream(fps);
    const audioStream = audioDestRef.current.stream;

    // Combine video and audio tracks
    const combinedStream = new MediaStream([
      ...canvasStream.getVideoTracks(),
      ...audioStream.getAudioTracks()
    ]);

    const mediaRecorder = new MediaRecorder(combinedStream, { mimeType: "video/webm;codecs=vp9" });
    const chunks = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `chunk-${chunkIndex + 1}_frames-${startFrame}-${endFrame}.webm`;
      a.click();
      URL.revokeObjectURL(url);
      setRenderStatus(prev => ({ ...prev, [chunkIndex]: 'complete' }));
      setRecording(false);
    };

    // Control Player & Audio
    if (playerRef.current) {
      // Ensure audio context is running
      if (audioCtxRef.current?.state === 'suspended') {
        await audioCtxRef.current.resume();
      }

      playerRef.current.seekTo(startFrame);
      if (audioElRef.current) {
        audioElRef.current.currentTime = startFrame / fps;
      }

      // Give Three.js a moment to render the first frame
      await new Promise(r => setTimeout(r, 500));

      mediaRecorder.start();
      playerRef.current.play();
      if (audioElRef.current) audioElRef.current.play();

      // Stop after duration
      setTimeout(() => {
        playerRef.current.pause();
        if (audioElRef.current) audioElRef.current.pause();
        mediaRecorder.stop();
      }, durationMs + 100); // Small buffer
    }
  };

  const renderCombinedVideo = async () => {
    if (recording) return;
    setRecording(true);

    // Reset status to pending
    const newStatus = {};
    for(let i=0; i<stats.chunkCount; i++) newStatus[i] = 'pending';
    setRenderStatus(newStatus);

    const canvas = document.querySelector("canvas");
    if (!canvas) {
      alert("Canvas not found! Wait for player to load.");
      setRecording(false);
      return;
    }

    // Capture combined stream
    const canvasStream = canvas.captureStream(fps);
    const audioStream = audioDestRef.current.stream;
    const combinedStream = new MediaStream([
      ...canvasStream.getVideoTracks(),
      ...audioStream.getAudioTracks()
    ]);

    const mediaRecorder = new MediaRecorder(combinedStream, { mimeType: "video/webm;codecs=vp9" });
    const chunks = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `combined_video_${duration}s.webm`;
      a.click();
      URL.revokeObjectURL(url);
      setRecording(false);

      // Mark all as complete
      const finalStatus = {};
      for(let i=0; i<stats.chunkCount; i++) finalStatus[i] = 'complete';
      setRenderStatus(finalStatus);
    };

    mediaRecorder.start();
    mediaRecorder.pause(); // Start in paused state

    // Ensure audio context is running
    if (audioCtxRef.current?.state === 'suspended') {
      await audioCtxRef.current.resume();
    }

    for (let i = 0; i < stats.chunkCount; i++) {
        setRenderStatus(prev => ({ ...prev, [i]: 'rendering' }));

        const startFrame = i * stats.framesPerChunk;
        const endFrame = Math.min((i + 1) * stats.framesPerChunk - 1, stats.totalFrames - 1);
        const durationFrames = endFrame - startFrame + 1;
        const durationMs = (durationFrames / fps) * 1000;

        if (playerRef.current) {
            playerRef.current.pause();
            if (audioElRef.current) audioElRef.current.pause();

            playerRef.current.seekTo(startFrame);
            if (audioElRef.current) {
              audioElRef.current.currentTime = startFrame / fps;
            }

            // Wait for render/buffer (allow Three.js to render frame)
            await new Promise(r => setTimeout(r, 800));

            mediaRecorder.resume();
            playerRef.current.play();
            if (audioElRef.current) audioElRef.current.play();

            // Record for duration
            await new Promise(r => setTimeout(r, durationMs));

            playerRef.current.pause();
            if (audioElRef.current) audioElRef.current.pause();
            mediaRecorder.pause();

            // Small stability buffer before next chunk
            await new Promise(r => setTimeout(r, 100));
        }

        setRenderStatus(prev => ({ ...prev, [i]: 'complete' }));
    }

    mediaRecorder.stop();
  };

  const renderAllChunks = async () => {
    if (combineChunks) {
      await renderCombinedVideo();
    } else {
      for (let i = 0; i < stats.chunkCount; i++) {
        if (renderStatus[i] !== 'complete') {
          await recordChunk(i);
          // Wait a bit between chunks
          await new Promise(r => setTimeout(r, 1000));
        }
      }
    }
  };

  return {
    stats,
    renderStatus,
    recording,
    recordChunk,
    renderAllChunks
  };
};