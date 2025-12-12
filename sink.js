import * as THREE from "three";

export const createCounterAndSink = (scene, materials) => {
  const { counterMat, metalMat, rimMat } = materials;

  // Dimensions
  const holeWidth = 3.5;
  const holeDepth = 2.1;
  const counterWidth = 10;
  const counterDepth = 4;
  const counterThickness = 0.2;
  
  const counterGroup = new THREE.Group();
  counterGroup.position.y = -0.1;
  
  // Left Slab
  const slabW = (counterWidth - holeWidth) / 2;
  const leftSlab = new THREE.Mesh(new THREE.BoxGeometry(slabW, counterThickness, counterDepth), counterMat);
  leftSlab.position.set(-(counterWidth/2 - slabW/2), 0, 0);
  leftSlab.receiveShadow = true;
  counterGroup.add(leftSlab);

  // Right Slab
  const rightSlab = new THREE.Mesh(new THREE.BoxGeometry(slabW, counterThickness, counterDepth), counterMat);
  rightSlab.position.set((counterWidth/2 - slabW/2), 0, 0);
  rightSlab.receiveShadow = true;
  counterGroup.add(rightSlab);

  // Front Strip
  const stripD = (counterDepth - holeDepth) / 2;
  const frontStrip = new THREE.Mesh(new THREE.BoxGeometry(holeWidth, counterThickness, stripD), counterMat);
  frontStrip.position.set(0, 0, (counterDepth/2 - stripD/2));
  frontStrip.receiveShadow = true;
  counterGroup.add(frontStrip);

  // Back Strip
  const backStrip = new THREE.Mesh(new THREE.BoxGeometry(holeWidth, counterThickness, stripD), counterMat);
  backStrip.position.set(0, 0, -(counterDepth/2 - stripD/2));
  backStrip.receiveShadow = true;
  counterGroup.add(backStrip);

  scene.add(counterGroup);

  // Sink Logic
  const sinkGroup = new THREE.Group();
  sinkGroup.position.set(0, 0, 0);

  const sinkW = 3.4;
  const sinkD = 2.0;
  const sinkDeep = 0.8;
  const dividerW = 0.12;
  const rimW = 0.15;
  const rimH = 0.04;

  const rimGroup = new THREE.Group();
  
  const rBack = new THREE.Mesh(new THREE.BoxGeometry(sinkW + rimW*2, rimH, rimW), rimMat);
  rBack.position.set(0, rimH/2, -(sinkD/2 + rimW/2));
  rBack.castShadow = true;
  rimGroup.add(rBack);
  
  const rFront = new THREE.Mesh(new THREE.BoxGeometry(sinkW + rimW*2, rimH, rimW), rimMat);
  rFront.position.set(0, rimH/2, (sinkD/2 + rimW/2));
  rFront.castShadow = true;
  rimGroup.add(rFront);
  
  const rLeft = new THREE.Mesh(new THREE.BoxGeometry(rimW, rimH, sinkD), rimMat);
  rLeft.position.set(-(sinkW/2 + rimW/2), rimH/2, 0);
  rLeft.castShadow = true;
  rimGroup.add(rLeft);

  const rRight = new THREE.Mesh(new THREE.BoxGeometry(rimW, rimH, sinkD), rimMat);
  rRight.position.set((sinkW/2 + rimW/2), rimH/2, 0);
  rRight.castShadow = true;
  rimGroup.add(rRight);
  
  const rDiv = new THREE.Mesh(new THREE.BoxGeometry(dividerW, rimH, sinkD), rimMat);
  rDiv.position.set(0, rimH/2, 0);
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
    w1.position.set(-bW/2, -sinkDeep/2, 0);
    basin.add(w1);

    const w2 = new THREE.Mesh(sideWall, metalMat);
    w2.position.set(bW/2, -sinkDeep/2, 0);
    basin.add(w2);

    const w3 = new THREE.Mesh(fbWall, metalMat);
    w3.position.set(0, -sinkDeep/2, -sinkD/2);
    basin.add(w3);

    const w4 = new THREE.Mesh(fbWall, metalMat);
    w4.position.set(0, -sinkDeep/2, sinkD/2);
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

  sinkGroup.add(createBasin(-(sinkW/4 + dividerW/4))); 
  sinkGroup.add(createBasin((sinkW/4 + dividerW/4)));

  scene.add(sinkGroup);
};

