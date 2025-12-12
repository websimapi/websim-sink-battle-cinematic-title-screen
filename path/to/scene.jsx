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
  const counterMat = new THREE.MeshStandardMaterial({
    map: wood,
    roughness: 0.4
  });
  const holeWidth = 3.5;
  const holeDepth = 2.1;
  const counterWidth = 18;
  const counterDepth = 5;
  const counterThickness = 0.2;
  const counterGroup = new THREE.Group();
  counterGroup.position.y = -0.1;
  const slabW = (counterWidth - holeWidth) / 2;
  const leftSlab = new THREE.Mesh(new THREE.BoxGeometry(slabW, counterThickness, counterDepth), counterMat);
  leftSlab.position.set(-(counterWidth / 2 - slabW / 2), 0, 0);
  leftSlab.receiveShadow = true;
  counterGroup.add(leftSlab);
  const rightSlab = new THREE.Mesh(new THREE.BoxGeometry(slabW, counterThickness, counterDepth), counterMat);
  rightSlab.position.set(counterWidth / 2 - slabW / 2, 0, 0);
  rightSlab.receiveShadow = true;
  counterGroup.add(rightSlab);
  const stripD = (counterDepth - holeDepth) / 2;
  const frontStrip = new THREE.Mesh(new THREE.BoxGeometry(holeWidth, counterThickness, stripD), counterMat);
  frontStrip.position.set(0, 0, counterDepth / 2 - stripD / 2);
  frontStrip.receiveShadow = true;
  counterGroup.add(frontStrip);
  const backStrip = new THREE.Mesh(new THREE.BoxGeometry(holeWidth, counterThickness, stripD), counterMat);
  backStrip.position.set(0, 0, -(counterDepth / 2 - stripD / 2));
  backStrip.receiveShadow = true;
  counterGroup.add(backStrip);
  scene.add(counterGroup);
  const metalMat = new THREE.MeshStandardMaterial({
    map: metal,
    metalness: 0.8,
    roughness: 0.3,
    color: "#bbbbbb"
  });
  const sinkGroup = new THREE.Group();
  sinkGroup.position.set(0, 0, 0);
  const sinkW = 3.4;
  const sinkD = 2;
  const sinkDeep = 0.8;
  const dividerW = 0.12;
  const rimW = 0.15;
  const rimH = 0.04;
  const rimGroup = new THREE.Group();
  const rimMat = new THREE.MeshStandardMaterial({
    map: metal,
    metalness: 0.9,
    roughness: 0.2,
    color: "#cccccc"
  });
  const rBack = new THREE.Mesh(new THREE.BoxGeometry(sinkW + rimW * 2, rimH, rimW), rimMat);
  rBack.position.set(0, rimH / 2, -(sinkD / 2 + rimW / 2));
  rBack.castShadow = true;
  rimGroup.add(rBack);
  const rFront = new THREE.Mesh(new THREE.BoxGeometry(sinkW + rimW * 2, rimH, rimW), rimMat);
  rFront.position.set(0, rimH / 2, sinkD / 2 + rimW / 2);
  rFront.castShadow = true;
  rimGroup.add(rFront);
  const rLeft = new THREE.Mesh(new THREE.BoxGeometry(rimW, rimH, sinkD), rimMat);
  rLeft.position.set(-(sinkW / 2 + rimW / 2), rimH / 2, 0);
  rLeft.castShadow = true;
  rimGroup.add(rLeft);
  const rRight = new THREE.Mesh(new THREE.BoxGeometry(rimW, rimH, sinkD), rimMat);
  rRight.position.set(sinkW / 2 + rimW / 2, rimH / 2, 0);
  rRight.castShadow = true;
  rimGroup.add(rRight);
  const rDiv = new THREE.Mesh(new THREE.BoxGeometry(dividerW, rimH, sinkD), rimMat);
  rDiv.position.set(0, rimH / 2, 0);
  rDiv.castShadow = true;
  rimGroup.add(rDiv);
  sinkGroup.add(rimGroup);
  const createBasin = (xPos) => {
    const bW = (sinkW - dividerW) / 2;
    const basin = new THREE.Group();
    basin.position.set(xPos, 0, 0);
    const wallThick = 0.05;
    const sideWall = new THREE.BoxGeometry(wallThick, sinkDeep, sinkD);
    const fbWall = new THREE.BoxGeometry(bW, sinkDeep, wallThick);
    const w1 = new THREE.Mesh(sideWall, metalMat);
    w1.position.set(-bW / 2, -sinkDeep / 2, 0);
    basin.add(w1);
    const w2 = new THREE.Mesh(sideWall, metalMat);
    w2.position.set(bW / 2, -sinkDeep / 2, 0);
    basin.add(w2);
    const w3 = new THREE.Mesh(fbWall, metalMat);
    w3.position.set(0, -sinkDeep / 2, -sinkD / 2);
    basin.add(w3);
    const w4 = new THREE.Mesh(fbWall, metalMat);
    w4.position.set(0, -sinkDeep / 2, sinkD / 2);
    basin.add(w4);
    const bot = new THREE.Mesh(new THREE.BoxGeometry(bW, wallThick, sinkD), metalMat);
    bot.position.set(0, -sinkDeep, 0);
    bot.receiveShadow = true;
    basin.add(bot);
    const drain = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 0.06, 32),
      new THREE.MeshStandardMaterial({ color: "#222222", metalness: 0.5, roughness: 0.8 })
    );
    drain.position.set(0, -sinkDeep + 0.04, -0.4);
    basin.add(drain);
    return basin;
  };
  sinkGroup.add(createBasin(-(sinkW / 4 + dividerW / 4)));
  sinkGroup.add(createBasin(sinkW / 4 + dividerW / 4));
  scene.add(sinkGroup);
  const faucetGroup = new THREE.Group();
  faucetGroup.position.set(0, 0, -1.45);
  const brushedMetal = new THREE.MeshStandardMaterial({
    map: metal,
    color: "#e0e0e0",
    metalness: 0.9,
    roughness: 0.3
  });
  const baseGeo = new THREE.CylinderGeometry(0.18, 0.22, 0.3, 32);
  const baseMesh = new THREE.Mesh(baseGeo, brushedMetal);
  baseMesh.position.y = 0.15;
  baseMesh.castShadow = true;
  faucetGroup.add(baseMesh);
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.2, 0),
    // Start at base
    new THREE.Vector3(0, 1.5, 0),
    // Vertical rise
    new THREE.Vector3(0, 2.5, 0.6),
    // High arch peak
    new THREE.Vector3(0, 2, 1.3),
    // Curving down
    new THREE.Vector3(0, 1.2, 1.45)
    // End over sink
  ]);
  const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.08, 16, false);
  const neckMesh = new THREE.Mesh(tubeGeo, brushedMetal);
  neckMesh.castShadow = true;
  faucetGroup.add(neckMesh);
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 1.2, 1.45);
  headGroup.rotation.x = -Math.PI / 1.3;
  const headGeo = new THREE.CylinderGeometry(0.12, 0.11, 0.45, 32);
  const headMesh = new THREE.Mesh(headGeo, brushedMetal);
  headMesh.rotation.x = Math.PI / 2;
  headMesh.position.z = 0.22;
  headMesh.castShadow = true;
  headGroup.add(headMesh);
  const btnMat = new THREE.MeshStandardMaterial({
    color: "#222222",
    roughness: 0.8,
    metalness: 0.2
  });
  const btnGeo = new THREE.CapsuleGeometry(0.035, 0.1, 4, 8);
  const btn1 = new THREE.Mesh(btnGeo, btnMat);
  btn1.position.set(0, 0.11, 0.25);
  btn1.rotation.z = Math.PI / 2;
  btn1.scale.set(1, 0.8, 0.4);
  headGroup.add(btn1);
  const btn2 = new THREE.Mesh(btnGeo, btnMat);
  btn2.position.set(0, -0.11, 0.25);
  btn2.rotation.z = Math.PI / 2;
  btn2.scale.set(1, 0.8, 0.4);
  headGroup.add(btn2);
  faucetGroup.add(headGroup);
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
  dishesGroup.position.set(0, -0.78, 0);
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
  pile.position.set(2.4, 0.78, 0.2);
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
  addPlate([-1, 0, 0.2], [0.2, 0, 0]);
  addPlate([-0.8, 0.05, -0.2], [-0.1, 0.5, 0.2]);
  addCup([-1.2, 0.1, 0.4], [1.7, 0, -0.2]);
  addPlate([1, 0, -0.3], [0.1, 0.2, 0.1]);
  addPlate([0.9, 0.08, 0.1], [-0.2, 2.5, 0.1]);
  addCup([1.1, 0.05, 0.5], [1.5, 0.5, -0.4]);
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
    const x = interpolate(t, [0, 0.4, 1], [1.5, 0.6, -1.4]);
    const y = interpolate(t, [0, 0.2, 1], [0.9, 3, 2.6]);
    const z = interpolate(t, [0, 0.3, 1], [2.2, 5.2, 6]);
    const lookX = 0;
    const lookY = interpolate(t, [0, 1], [-0.35, -0.05]);
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
      lineNumber: 509,
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
      const x = interpolate(t, [0, 0.4, 1], [1.5, 0.6, -1.4]);
      const y = interpolate(t, [0, 0.2, 1], [0.9, 3, 2.6]);
      const z = interpolate(t, [0, 0.3, 1], [2.2, 5.2, 6]);
      const lookX = 0;
      const lookY = interpolate(t, [0, 1], [-0.35, -0.05]);
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
      lineNumber: 615,
      columnNumber: 5
    }
  );
};
export {
  KitchenSceneCanvas,
  KitchenSceneStandalone
};
