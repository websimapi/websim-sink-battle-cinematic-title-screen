import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
import React, { useRef, useMemo } from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { useThree, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, Float, Stars, Sparkles } from "@react-three/drei";
import * as THREE from "three";
const useKitchenTextures = () => {
  return useMemo(() => {
    const textureLoader = new THREE.TextureLoader();
    const load = (path) => {
      const tex = textureLoader.load(path);
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      return tex;
    };
    return {
      wood: load("wood_counter.png"),
      tiles: load("kitchen_tiles.png"),
      tilesNormal: load("kitchen_tiles_normal.png"),
      metal: load("metal_scratch.png"),
      dirtyPlate: load("dirty_plate_texture.png"),
      env: "kitchen_hdr.png"
    };
  }, []);
};
const SinkBasin = ({ position, texture }) => {
  return /* @__PURE__ */ jsxDEV("group", { position, children: [
    /* @__PURE__ */ jsxDEV("mesh", { position: [0, -0.1, 0], receiveShadow: true, children: [
      /* @__PURE__ */ jsxDEV("boxGeometry", { args: [6, 0.2, 4] }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 40,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("meshStandardMaterial", { map: texture.wood, roughness: 0.4 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 41,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 39,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("group", { position: [0, -0.6, 0], children: [
      /* @__PURE__ */ jsxDEV("mesh", { position: [0, 0, 0], receiveShadow: true, castShadow: true, children: [
        /* @__PURE__ */ jsxDEV("boxGeometry", { args: [2.8, 0.1, 1.8] }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 48,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV(
          "meshStandardMaterial",
          {
            map: texture.metal,
            metalness: 0.9,
            roughness: 0.3,
            envMapIntensity: 1.5
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 49,
            columnNumber: 11
          }
        )
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 47,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("mesh", { position: [0, 0.5, -0.9], receiveShadow: true, children: [
        /* @__PURE__ */ jsxDEV("boxGeometry", { args: [2.8, 1.1, 0.1] }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 58,
          columnNumber: 13
        }),
        /* @__PURE__ */ jsxDEV("meshStandardMaterial", { map: texture.metal, metalness: 0.9, roughness: 0.3 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 59,
          columnNumber: 13
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 57,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("mesh", { position: [0, 0.5, 0.9], receiveShadow: true, children: [
        /* @__PURE__ */ jsxDEV("boxGeometry", { args: [2.8, 1.1, 0.1] }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 62,
          columnNumber: 13
        }),
        /* @__PURE__ */ jsxDEV("meshStandardMaterial", { map: texture.metal, metalness: 0.9, roughness: 0.3 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 63,
          columnNumber: 13
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 61,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("mesh", { position: [-1.4, 0.5, 0], receiveShadow: true, children: [
        /* @__PURE__ */ jsxDEV("boxGeometry", { args: [0.1, 1.1, 1.9] }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 66,
          columnNumber: 13
        }),
        /* @__PURE__ */ jsxDEV("meshStandardMaterial", { map: texture.metal, metalness: 0.9, roughness: 0.3 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 67,
          columnNumber: 13
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 65,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("mesh", { position: [1.4, 0.5, 0], receiveShadow: true, children: [
        /* @__PURE__ */ jsxDEV("boxGeometry", { args: [0.1, 1.1, 1.9] }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 70,
          columnNumber: 13
        }),
        /* @__PURE__ */ jsxDEV("meshStandardMaterial", { map: texture.metal, metalness: 0.9, roughness: 0.3 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 71,
          columnNumber: 13
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 69,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 45,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("group", { position: [0, 0, -1.1], children: [
      /* @__PURE__ */ jsxDEV("mesh", { position: [0, 0.5, 0], castShadow: true, children: [
        /* @__PURE__ */ jsxDEV("cylinderGeometry", { args: [0.1, 0.15, 1, 16] }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 78,
          columnNumber: 13
        }),
        /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#ddd", metalness: 1, roughness: 0.1 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 79,
          columnNumber: 13
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 77,
        columnNumber: 10
      }),
      /* @__PURE__ */ jsxDEV("mesh", { position: [0, 1, 0.3], rotation: [0.5, 0, 0], castShadow: true, children: [
        /* @__PURE__ */ jsxDEV("cylinderGeometry", { args: [0.08, 0.1, 0.8, 16] }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 82,
          columnNumber: 14
        }),
        /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#ddd", metalness: 1, roughness: 0.1 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 83,
          columnNumber: 14
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 81,
        columnNumber: 10
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 76,
      columnNumber: 7
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 37,
    columnNumber: 5
  });
};
const DirtyPlate = ({ position, rotation, texture, scale = 1 }) => {
  return /* @__PURE__ */ jsxDEV("mesh", { position, rotation, scale, castShadow: true, receiveShadow: true, children: [
    /* @__PURE__ */ jsxDEV("cylinderGeometry", { args: [0.4, 0.3, 0.05, 32] }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 93,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(
      "meshStandardMaterial",
      {
        map: texture.dirtyPlate,
        roughness: 0.2,
        color: "#eee"
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 94,
        columnNumber: 7
      }
    )
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 92,
    columnNumber: 5
  });
};
const DirtyCup = ({ position, rotation, texture }) => {
  return /* @__PURE__ */ jsxDEV("group", { position, rotation, children: /* @__PURE__ */ jsxDEV("mesh", { castShadow: true, receiveShadow: true, children: [
    /* @__PURE__ */ jsxDEV("cylinderGeometry", { args: [0.15, 0.12, 0.4, 16] }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 107,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#ccb", roughness: 0.5, map: texture.dirtyPlate }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 108,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 106,
    columnNumber: 13
  }) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 105,
    columnNumber: 9
  });
};
const Backsplash = ({ texture }) => {
  return /* @__PURE__ */ jsxDEV("mesh", { position: [0, 1.5, -2], receiveShadow: true, children: [
    /* @__PURE__ */ jsxDEV("planeGeometry", { args: [10, 5] }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 117,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV(
      "meshStandardMaterial",
      {
        map: texture.tiles,
        normalMap: texture.tilesNormal,
        roughness: 0.1,
        metalness: 0
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 118,
        columnNumber: 13
      }
    )
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 116,
    columnNumber: 9
  });
};
const KitchenScene = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const textures = useKitchenTextures();
  const cameraRef = useRef();
  useFrame((state) => {
    const t = frame / durationInFrames;
    const x = interpolate(t, [0, 0.4, 1], [0.8, 0, -1.5]);
    const y = interpolate(t, [0, 0.2, 1], [0.3, 2.5, 1.8]);
    const z = interpolate(t, [0, 0.3, 1], [0.8, 3.5, 4]);
    const lookX = interpolate(t, [0, 1], [0, 0]);
    const lookY = interpolate(t, [0, 1], [-0.5, -0.2]);
    const lookZ = interpolate(t, [0, 1], [0, 0]);
    state.camera.position.set(x, y, z);
    state.camera.lookAt(lookX, lookY, lookZ);
    const shake = Math.sin(frame * 0.05) * 5e-3;
    state.camera.position.y += shake;
  });
  return /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV("color", { attach: "background", args: ["#1a1a1a"] }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 166,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("ambientLight", { intensity: 0.3, color: "#ccccff" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 169,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("pointLight", { position: [5, 5, 2], intensity: 1.5, castShadow: true, "shadow-bias": -1e-3, color: "#ffaa88" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 170,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("pointLight", { position: [-4, 3, 4], intensity: 0.8, color: "#aaaaff" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 171,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(
      "spotLight",
      {
        position: [0, 8, 0],
        angle: 0.5,
        penumbra: 0.5,
        intensity: 2,
        castShadow: true,
        "shadow-mapSize": [2048, 2048]
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 172,
        columnNumber: 7
      }
    ),
    /* @__PURE__ */ jsxDEV(Environment, { files: textures.env, blur: 0.8, background: false }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 181,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("group", { position: [0, -0.5, 0], children: [
      /* @__PURE__ */ jsxDEV(SinkBasin, { position: [0, 0, 0], texture: textures }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 185,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV(Backsplash, { texture: textures }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 186,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("group", { position: [0.5, 0.1, 0.2], children: [
        /* @__PURE__ */ jsxDEV(DirtyPlate, { position: [0, 0, 0], rotation: [0.1, 0, 0], texture: textures }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 191,
          columnNumber: 14
        }),
        /* @__PURE__ */ jsxDEV(DirtyPlate, { position: [0.05, 0.06, 0.02], rotation: [-0.05, 1, 0], texture: textures }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 192,
          columnNumber: 14
        }),
        /* @__PURE__ */ jsxDEV(DirtyPlate, { position: [-0.05, 0.12, -0.05], rotation: [0.05, 2, 0.1], texture: textures }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 193,
          columnNumber: 14
        }),
        /* @__PURE__ */ jsxDEV(DirtyPlate, { position: [0.1, 0.18, 0.05], rotation: [0.1, 3, -0.05], texture: textures }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 194,
          columnNumber: 14
        }),
        /* @__PURE__ */ jsxDEV(DirtyCup, { position: [-0.4, 0.1, 0.3], rotation: [0, 0, 1.4], texture: textures }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 197,
          columnNumber: 14
        }),
        /* @__PURE__ */ jsxDEV("mesh", { position: [0.2, 0.21, 0], rotation: [0, 0.5, 0.1], castShadow: true, children: [
          /* @__PURE__ */ jsxDEV("boxGeometry", { args: [0.02, 0.02, 0.8] }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 201,
            columnNumber: 17
          }),
          /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#888", metalness: 1, roughness: 0.2 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 202,
            columnNumber: 17
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 200,
          columnNumber: 14
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 190,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("group", { position: [-0.5, -0.5, 0], children: [
        /* @__PURE__ */ jsxDEV(DirtyPlate, { position: [0, 0, 0], rotation: [0.2, 0, 0], texture: textures }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 208,
          columnNumber: 14
        }),
        /* @__PURE__ */ jsxDEV(DirtyPlate, { position: [0.2, 0.05, -0.2], rotation: [-0.1, 0.5, 0.2], texture: textures }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 209,
          columnNumber: 14
        }),
        /* @__PURE__ */ jsxDEV(DirtyCup, { position: [-0.3, 0.1, 0], rotation: [0.2, 0, -0.2], texture: textures }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 210,
          columnNumber: 14
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 207,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV(
        Sparkles,
        {
          count: 100,
          scale: 6,
          size: 2,
          speed: 0.2,
          opacity: 0.3,
          color: "#ffffcc",
          position: [0, 1, 0]
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 214,
          columnNumber: 9
        }
      )
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 184,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(
      ContactShadows,
      {
        resolution: 1024,
        scale: 20,
        blur: 2,
        opacity: 0.5,
        far: 10,
        color: "#000000"
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 226,
        columnNumber: 7
      }
    )
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 165,
    columnNumber: 5
  });
};
export {
  KitchenScene
};
