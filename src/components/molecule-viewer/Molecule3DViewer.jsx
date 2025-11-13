import React, { useState, useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';   
import { OrbitControls } from '@react-three/drei';       
import { parseXYZ, calculateBonds } from './utils';


const MoleculeModel = ({ xyz, highlighted, rotation, onReady }) => {
  const groupRef = useRef();
  const hasCalledReady = useRef(false);
  const geometriesRef = useRef([]);
  const materialsRef = useRef([]);

  useFrame(() => {
    if (rotation && groupRef.current) {
      groupRef.current.rotation.y += 0.01;
      groupRef.current.rotation.x += 0.005;
    }
  });

  const atoms = useMemo(() => xyz ? parseXYZ(xyz) : [], [xyz]);
  const bonds = useMemo(() => calculateBonds(atoms), [atoms]);

  const { center, scale } = useMemo(() => {
    if (atoms.length === 0) return { center: [0, 0, 0], scale: 1 };

    if (atoms.length === 1) {
      return {
        center: [atoms[0].x, atoms[0].y, atoms[0].z],
        scale: 3
      };
    }

    const xs = atoms.map(a => a.x);
    const ys = atoms.map(a => a.y);
    const zs = atoms.map(a => a.z);

    const centerX = (Math.max(...xs) + Math.min(...xs)) / 2;
    const centerY = (Math.max(...ys) + Math.min(...ys)) / 2;
    const centerZ = (Math.max(...zs) + Math.min(...zs)) / 2;

    const maxDim = Math.max(
      Math.max(...xs) - Math.min(...xs),
      Math.max(...ys) - Math.min(...ys),
      Math.max(...zs) - Math.min(...zs)
    );

    const baseScale = maxDim > 0 ? 10 / maxDim : 3;
    const scale = Math.min(Math.max(baseScale, 0.5), 5);

    return { center: [centerX, centerY, centerZ], scale };
  }, [atoms]);

  useEffect(() => {
    if (atoms.length > 0 && !hasCalledReady.current && onReady) {
      hasCalledReady.current = true;
      onReady();
    }
  }, [atoms, onReady]);

  useEffect(() => {
    hasCalledReady.current = false;
  }, [xyz]);

  useEffect(() => {
    return () => {
      geometriesRef.current.forEach(geometry => {
        if (geometry && geometry.dispose) {
          geometry.dispose();
        }
      });

      materialsRef.current.forEach(material => {
        if (material && material.dispose) {
          material.dispose();
        }
      });

      geometriesRef.current = [];
      materialsRef.current = [];
    };
  }, [xyz]);

  return (
    <group ref={groupRef} scale={scale} position={[-center[0] * scale, -center[1] * scale, -center[2] * scale]}>
      {atoms.length > 0 ? (
        <>
          {atoms.map((atom, index) => {
            const geometry = new THREE.SphereGeometry(atom.radius, 32, 32);
            const material = new THREE.MeshPhongMaterial({
              color: new THREE.Color(atom.color),
              shininess: 30
            });

            geometriesRef.current.push(geometry);
            materialsRef.current.push(material);

            return (
              <mesh key={`atom-${index}`} position={[atom.x, atom.y, atom.z]} geometry={geometry} material={material} />
            );
          })}
          {bonds.map((bond, index) => {
            const start = new THREE.Vector3(bond.start.x, bond.start.y, bond.start.z);
            const end = new THREE.Vector3(bond.end.x, bond.end.y, bond.end.z);
            const direction = new THREE.Vector3().subVectors(end, start);
            const length = direction.length();
            const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);

            const orientation = new THREE.Matrix4();
            orientation.lookAt(start, end, new THREE.Object3D().up);
            orientation.multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2));
            const quaternion = new THREE.Quaternion().setFromRotationMatrix(orientation);

            const geometry = new THREE.CylinderGeometry(0.08, 0.08, length, 8);
            const material = new THREE.MeshPhongMaterial({ color: 0x888888, shininess: 20 });

            geometriesRef.current.push(geometry);
            materialsRef.current.push(material);

            return (
              <mesh
                key={`bond-${index}`}
                position={[midpoint.x, midpoint.y, midpoint.z]}
                quaternion={quaternion}
                geometry={geometry}
                material={material}
              />
            );
          })}
        </>
      ) : (
        <mesh>
          <icosahedronGeometry args={[2, 0]} />
          <meshPhongMaterial color={highlighted ? 0x00ff88 : 0x4488ff} shininess={50} />
        </mesh>
      )}
    </group>
  );
};

const Molecule3DViewer = ({ size = 100, rotation = true, onClick, xyz, highlighted = false }) => {
  const [isSceneVisible, setSceneVisible] = useState(false);
  const rafId = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    setSceneVisible(false);
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
  }, [xyz]);

  useEffect(() => {
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  if (!xyz) {
    return (
      <div style={{ width: size, height: size }} className="flex items-center justify-center bg-gray-800/30 rounded-lg">
        <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleModelReady = () => {
    rafId.current = requestAnimationFrame(() => {
      setSceneVisible(true);
    });
  };

  return (
    <div
      onClick={onClick}
      className="transition-transform  relative bg-transparent"
      style={{ width: size, height: size }}
    >
      <div
        className={`absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-300 ${isSceneVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
      >
        <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>

      <div className={`w-full h-full transition-opacity duration-500 ${isSceneVisible ? 'opacity-100' : 'opacity-0'}`}>
        <Canvas
          ref={canvasRef}
          camera={{ position: [0, 0, 15], fov: 60 }}
          gl={{
            powerPreference: "high-performance",
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: false 
          }}
          onCreated={({ gl }) => {
            const handleContextLost = (e) => {
              e.preventDefault();
              console.warn('WebGL context lost in Molecule3DViewer');
              if (rafId.current) {
                cancelAnimationFrame(rafId.current);
              }
            };

            const handleContextRestored = () => {
              console.log('WebGL context restored in Molecule3DViewer');
              setSceneVisible(false);
            };

            gl.domElement.addEventListener('webglcontextlost', handleContextLost, false);
            gl.domElement.addEventListener('webglcontextrestored', handleContextRestored, false);

            return () => {
              gl.domElement.removeEventListener('webglcontextlost', handleContextLost);
              gl.domElement.removeEventListener('webglcontextrestored', handleContextRestored);
            };
          }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <MoleculeModel
            xyz={xyz}
            highlighted={highlighted}
            rotation={rotation}
            onReady={handleModelReady}
          />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </div>
    </div>
  );
};

const MemoizedMolecule3DViewer = React.memo(Molecule3DViewer, (prevProps, nextProps) => {
  return (
    prevProps.xyz === nextProps.xyz &&
    prevProps.size === nextProps.size &&
    prevProps.highlighted === nextProps.highlighted &&
    prevProps.rotation === nextProps.rotation
  );
});

export default MemoizedMolecule3DViewer;