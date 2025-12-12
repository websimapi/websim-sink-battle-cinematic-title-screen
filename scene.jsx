import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useEffect, useRef, useState } from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import * as THREE from "three";
const createKitchenScene = (width, height) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#111111");
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(1, 0.5, 1);
  const ambient = new THREE.AmbientLight(13421823, 0.3);
  scene.add(ambient);
  const keyLight = new THREE.PointLight(16755336, 1.5);
  keyLight.position.set(5, 5, 2);
  keyLight.castShadow = true;
  scene.add(keyLight);
  const fillLight = new THREE.PointLight(11184895, 0.8);
  fillLight.position.set(-4, 3, 4);
  scene.add(fillLight);
  const spot = new THREE.SpotLight(16777215, 2, 20, Math.PI / 3, 0.5, 1);
  spot.position.set(0, 8, 0);
  spot.castShadow = true;
  spot.shadow.mapSize.set(2048, 2048);
  scene.add(spot);
  const loader = new THREE.TextureLoader();
  const wood = loader.load("wood_counter.png");
  wood.wrapS = wood.wrapT = THREE.RepeatWrapping;
  const tiles = loader.load("kitchen_tiles.png");
  const metal = loader.load("metal_scratch.png");
  const dirty = loader.load("dirty_plate_texture.png");
  const counterGeo = new THREE.BoxGeometry(10, 0.2, 4);
  const counterMat = new THREE.MeshStandardMaterial({
    map: wood,
    roughness: 0.4
  });
  const counter = new THREE.Mesh(counterGeo, counterMat);
  counter.position.set(0, -0.1, 0);
  counter.receiveShadow = true;
  scene.add(counter);
  const metalMat = new THREE.MeshStandardMaterial({
    map: metal,
    metalness: 0.9,
    roughness: 0.3
  });
  const basinGroup = new THREE.Group();
  basinGroup.position.set(0, -0.25, 0);
  const bottom = new THREE.Mesh(
    new THREE.BoxGeometry(2.6, 0.1, 1.6),
    metalMat
  );
  bottom.position.set(0, -0.2, 0);
  bottom.castShadow = true;
  bottom.receiveShadow = true;
  basinGroup.add(bottom);
  const wallHeight = 0.4;
  const wallThickness = 0.08;
  const back = new THREE.Mesh(
    new THREE.BoxGeometry(2.6, wallHeight, wallThickness),
    metalMat
  );
  back.position.set(0, 0, -0.8);
  basinGroup.add(back);
  const front = new THREE.Mesh(
    new THREE.BoxGeometry(2.6, wallHeight, wallThickness),
    metalMat
  );
  front.position.set(0, 0, 0.8);
  basinGroup.add(front);
  const left = new THREE.Mesh(
    new THREE.BoxGeometry(wallThickness, wallHeight, 1.6),
    metalMat
  );
  left.position.set(-1.3, 0, 0);
  basinGroup.add(left);
  const right = new THREE.Mesh(
    new THREE.BoxGeometry(wallThickness, wallHeight, 1.6),
    metalMat
  );
  right.position.set(1.3, 0, 0);
  basinGroup.add(right);
  const rim = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 0.05, 2.2),
    new THREE.MeshStandardMaterial({
      map: metal,
      metalness: 0.9,
      roughness: 0.2
    })
  );
  rim.position.set(0, 0.02, 0);
  rim.castShadow = true;
  rim.receiveShadow = true;
  scene.add(rim);
  scene.add(basinGroup);
  const faucetGroup = new THREE.Group();
  faucetGroup.position.set(0, 0, -1.1);
  const faucetBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.15, 1, 16),
    new THREE.MeshStandardMaterial({
      color: "#dddddd",
      metalness: 1,
      roughness: 0.1
    })
  );
  faucetBody.position.set(0, 0.5, 0);
  faucetBody.castShadow = true;
  faucetGroup.add(faucetBody);
  const faucetNeck = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.1, 0.8, 16),
    new THREE.MeshStandardMaterial({
      color: "#dddddd",
      metalness: 1,
      roughness: 0.1
    })
  );
  faucetNeck.position.set(0, 1, 0.3);
  faucetNeck.rotation.set(0.5, 0, 0);
  faucetNeck.castShadow = true;
  faucetGroup.add(faucetNeck);
  scene.add(faucetGroup);
  const frameMat = new THREE.MeshStandardMaterial({
    color: "#e0e0e0",
    metalness: 0.1,
    roughness: 0.5
  });
  const windowWidth = 4;
  const windowHeight = 2.5;
  const frameThickness = 0.1;
  const frameDepth = 0.05;
  const windowZ = -2;
  const topFrame = new THREE.Mesh(
    new THREE.BoxGeometry(windowWidth + frameThickness * 2, frameThickness, frameDepth),
    frameMat
  );
  topFrame.position.set(0, 2.5, windowZ);
  scene.add(topFrame);
  const bottomFrame = new THREE.Mesh(
    new THREE.BoxGeometry(windowWidth + frameThickness * 2, frameThickness, frameDepth),
    frameMat
  );
  bottomFrame.position.set(0, 0.5, windowZ);
  scene.add(bottomFrame);
  const leftFrame = new THREE.Mesh(
    new THREE.BoxGeometry(frameThickness, windowHeight, frameDepth),
    frameMat
  );
  leftFrame.position.set(-windowWidth / 2 - frameThickness / 2, 1.5, windowZ);
  scene.add(leftFrame);
  const rightFrame = new THREE.Mesh(
    new THREE.BoxGeometry(frameThickness, windowHeight, frameDepth),
    frameMat
  );
  rightFrame.position.set(windowWidth / 2 + frameThickness / 2, 1.5, windowZ);
  scene.add(rightFrame);
  const glass = new THREE.Mesh(
    new THREE.PlaneGeometry(windowWidth, windowHeight),
    new THREE.MeshStandardMaterial({
      color: "#020202",
      roughness: 0.9,
      metalness: 0,
      transparent: true,
      opacity: 0.98
    })
  );
  glass.position.set(0, 1.5, windowZ - 0.01);
  scene.add(glass);
  const sill = new THREE.Mesh(
    new THREE.BoxGeometry(10, 0.08, 0.6),
    new THREE.MeshStandardMaterial({
      map: wood,
      roughness: 0.4
    })
  );
  sill.position.set(0, 0.1, -1.7);
  sill.castShadow = true;
  sill.receiveShadow = true;
  scene.add(sill);
  const dirtyMat = new THREE.MeshStandardMaterial({
    map: dirty,
    roughness: 0.2,
    color: "#eeeeee"
  });
  const plateGeo = new THREE.CylinderGeometry(0.4, 0.3, 0.05, 32);
  const cupGeo = new THREE.CylinderGeometry(0.15, 0.12, 0.4, 16);
  const dishesGroup = new THREE.Group();
  dishesGroup.position.set(0, -0.5, 0);
  scene.add(dishesGroup);
  const addPlate = (pos, rot) => {
    const mesh = new THREE.Mesh(plateGeo, dirtyMat);
    mesh.position.set(pos[0], pos[1], pos[2]);
    mesh.rotation.set(rot[0], rot[1], rot[2]);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    dishesGroup.add(mesh);
  };
  const addCup = (pos, rot) => {
    const mat = new THREE.MeshStandardMaterial({
      color: "#ccbbaa",
      roughness: 0.5,
      map: dirty
    });
    const mesh = new THREE.Mesh(cupGeo, mat);
    mesh.position.set(pos[0], pos[1], pos[2]);
    mesh.rotation.set(rot[0], rot[1], rot[2]);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    dishesGroup.add(mesh);
  };
  const pile = new THREE.Group();
  pile.position.set(0.5, 0.1, 0.2);
  dishesGroup.add(pile);
  const addPilePlate = (pos, rot) => {
    const mesh = new THREE.Mesh(plateGeo, dirtyMat);
    mesh.position.set(pos[0], pos[1], pos[2]);
    mesh.rotation.set(rot[0], rot[1], rot[2]);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    pile.add(mesh);
  };
  addPilePlate([0, 0, 0], [0.1, 0, 0]);
  addPilePlate([0.05, 0.06, 0.02], [-0.05, 1, 0]);
  addPilePlate([-0.05, 0.12, -0.05], [0.05, 2, 0.1]);
  addPilePlate([0.1, 0.18, 0.05], [0.1, 3, -0.05]);
  addCup([-0.4, 0.1, 0.3], [0, 0, 1.4]);
  const forkGeo = new THREE.BoxGeometry(0.02, 0.02, 0.8);
  const forkMat = new THREE.MeshStandardMaterial({
    color: "#888888",
    metalness: 1,
    roughness: 0.2
  });
  const fork = new THREE.Mesh(forkGeo, forkMat);
  fork.position.set(0.2, 0.21, 0);
  fork.rotation.set(0, 0.5, 0.1);
  fork.castShadow = true;
  pile.add(fork);
  addPlate([-0.5, 0, 0], [0.2, 0, 0]);
  addPlate([-0.3, 0.05, -0.2], [-0.1, 0.5, 0.2]);
  addCup([-0.8, 0.1, 0], [0.2, 0, -0.2]);
  const shadowPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.ShadowMaterial({ color: 0, opacity: 0.4 })
  );
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = -1.1;
  shadowPlane.receiveShadow = true;
  scene.add(shadowPlane);
  return { scene, camera };
};
const KitchenSceneCanvas = () => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const [ready, setReady] = useState(false);
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();
  useEffect(() => {
    if (!containerRef.current || rendererRef.current) return;
    const canvas = document.createElement("canvas");
    containerRef.current.appendChild(canvas);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      preserveDrawingBuffer: true
    });
    renderer.setPixelRatio(1);
    renderer.setSize(width, height, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    const { scene, camera } = createKitchenScene(width, height);
    rendererRef.current = renderer;
    sceneRef.current = scene;
    cameraRef.current = camera;
    setReady(true);
    return () => {
      renderer.dispose();
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, [width, height]);
  useEffect(() => {
    if (!ready || !rendererRef.current || !sceneRef.current || !cameraRef.current) {
      return;
    }
    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const t = durationInFrames > 0 ? frame / durationInFrames : 0;
    const x = interpolate(t, [0, 0.4, 1], [0.8, 0, -1.5]);
    const y = interpolate(t, [0, 0.2, 1], [0.3, 2.5, 1.8]);
    const z = interpolate(t, [0, 0.3, 1], [0.8, 3.5, 4]);
    const lookX = 0;
    const lookY = interpolate(t, [0, 1], [-0.5, -0.2]);
    const lookZ = 0;
    const shake = Math.sin(frame * 0.05) * 5e-3;
    camera.position.set(x, y + shake, z);
    camera.lookAt(lookX, lookY, lookZ);
    renderer.render(scene, camera);
  }, [frame, durationInFrames, ready]);
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      ref: containerRef,
      style: {
        width: "100%",
        height: "100%",
        overflow: "hidden"
      }
    },
    void 0,
    false,
    {
      fileName: "<stdin>",
      lineNumber: 385,
      columnNumber: 5
    }
  );
};
const KitchenSceneStandalone = () => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  useEffect(() => {
    if (!containerRef.current || rendererRef.current) return;
    const { clientWidth, clientHeight } = containerRef.current;
    const canvas = document.createElement("canvas");
    containerRef.current.appendChild(canvas);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setSize(clientWidth, clientHeight, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    const { scene, camera } = createKitchenScene(clientWidth, clientHeight);
    rendererRef.current = renderer;
    sceneRef.current = scene;
    cameraRef.current = camera;
    let animationFrameId;
    const fps = 30;
    const durationSec = 95;
    const durationFrames = fps * durationSec;
    let frame = 0;
    const renderLoop = () => {
      if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
      const renderer2 = rendererRef.current;
      const scene2 = sceneRef.current;
      const camera2 = cameraRef.current;
      const t = durationFrames > 0 ? frame % durationFrames / durationFrames : 0;
      const x = interpolate(t, [0, 0.4, 1], [0.8, 0, -1.5]);
      const y = interpolate(t, [0, 0.2, 1], [0.3, 2.5, 1.8]);
      const z = interpolate(t, [0, 0.3, 1], [0.8, 3.5, 4]);
      const lookX = 0;
      const lookY = interpolate(t, [0, 1], [-0.5, -0.2]);
      const lookZ = 0;
      const shake = Math.sin(frame * 0.05) * 5e-3;
      camera2.position.set(x, y + shake, z);
      camera2.lookAt(lookX, lookY, lookZ);
      renderer2.render(scene2, camera2);
      frame += 1;
      animationFrameId = requestAnimationFrame(renderLoop);
    };
    renderLoop();
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const { clientWidth: clientWidth2, clientHeight: clientHeight2 } = containerRef.current;
      rendererRef.current.setSize(clientWidth2, clientHeight2, false);
      cameraRef.current.aspect = clientWidth2 / clientHeight2;
      cameraRef.current.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      rendererRef.current = null;
      sceneRef.current = null;
      cameraRef.current = null;
    };
  }, []);
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      ref: containerRef,
      style: {
        width: "100%",
        height: "100%",
        overflow: "hidden"
      }
    },
    void 0,
    false,
    {
      fileName: "<stdin>",
      lineNumber: 491,
      columnNumber: 5
    }
  );
};
export {
  KitchenSceneCanvas,
  KitchenSceneStandalone
};
