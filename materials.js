import * as THREE from "three";

export const loadMaterials = () => {
  const loader = new THREE.TextureLoader();
  const wood = loader.load("wood_counter.png");
  wood.wrapS = wood.wrapT = THREE.RepeatWrapping;
  
  const tiles = loader.load("kitchen_tiles.png");
  const metal = loader.load("metal_scratch.png");
  const dirty = loader.load("dirty_plate_texture.png");
  const hdrEnv = loader.load("kitchen_hdr.png");
  
  // Environment Map for realistic reflections
  hdrEnv.mapping = THREE.EquirectangularReflectionMapping;

  const counterMat = new THREE.MeshStandardMaterial({
    map: wood,
    roughness: 0.4,
  });

  const metalMat = new THREE.MeshStandardMaterial({
    map: metal,
    metalness: 0.8,
    roughness: 0.3,
    color: "#bbbbbb"
  });

  const rimMat = new THREE.MeshStandardMaterial({
    map: metal,
    metalness: 0.9,
    roughness: 0.2,
    color: "#cccccc"
  });

  const chromeMat = new THREE.MeshStandardMaterial({
    color: "#ffffff",
    metalness: 1.0,
    roughness: 0.15,
    envMapIntensity: 1.2,
  });
  
  const rubberMat = new THREE.MeshStandardMaterial({
    color: "#222222",
    roughness: 0.9,
    metalness: 0.0
  });

  const frameMat = new THREE.MeshStandardMaterial({
    color: "#e0e0e0",
    metalness: 0.1,
    roughness: 0.5,
  });

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0.05,
    transmission: 0.95, 
    thickness: 0.1,     
    ior: 1.5,           
    envMapIntensity: 1,
    transparent: true,
    opacity: 1,
  });

  const outdoorMat = new THREE.MeshBasicMaterial({
    map: hdrEnv,
    side: THREE.BackSide, 
  });

  const dirtyMat = new THREE.MeshStandardMaterial({
    map: dirty,
    roughness: 0.2,
    color: "#eeeeee",
  });

  return {
    wood, tiles, metal, dirty, hdrEnv,
    counterMat, metalMat, rimMat, chromeMat, rubberMat, frameMat, glassMat, outdoorMat, dirtyMat
  };
};

