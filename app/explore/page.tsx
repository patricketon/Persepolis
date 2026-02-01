// 'use client';

// import * as THREE from 'three';
// import { useEffect, useRef } from 'react';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { BOOKS } from '../data/books';
// import { useRouter } from 'next/navigation';

// // Types
// interface BookBlock {
//   mesh: THREE.Mesh;
//   container: THREE.Group;
//   homeAngle: number;
//   homeY: number;
//   isSelected: boolean;
//   currentRadiusOffset: number;
//   targetRadiusOffset: number;
//   bookData?: {
//     id: string;
//     title: string;
//     author: string;
//     coverUrl: string;
//   };
// }

// // Constants
// const CYLINDER_RADIUS = 6;
// const CYLINDER_HEIGHT = 30;
// const NUM_VERTICAL_SECTIONS = 12;
// const BLOCKS_PER_SECTION = 5;
// const VERTICAL_SPACING = 3.2;
// const SECTION_ANGLE = (Math.PI * 2) / BLOCKS_PER_SECTION;
// const MAX_RANDOM_ANGLE = SECTION_ANGLE * 0.25;
// const BASE_ROTATION_SPEED = 0.002;
// const POP_OUT_DISTANCE = 3;
// const LERP_SPEED = 0.08;

// export default function CylinderGallery() {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const sceneRef = useRef<THREE.Scene | null>(null);
//   const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
//   const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
//   const galleryGroupRef = useRef<THREE.Group | null>(null);
//   const blocksRef = useRef<BookBlock[]>([]);
//   const selectedBlockRef = useRef<BookBlock | null>(null);
//   const raycasterRef = useRef(new THREE.Raycaster());
//   const mouseRef = useRef(new THREE.Vector2());
//   const isRotatingRef = useRef(true);
//   const router = useRouter();

//   useEffect(() => {
//     if (!canvasRef.current) return;

//     console.log('CylinderGallery mounted');

//     // Scene
//     const scene = new THREE.Scene();
//     sceneRef.current = scene;

//     //scene.background = new THREE.Color(0x000000);


//     // Camera
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     camera.position.set(0, 0, 10);
//     cameraRef.current = camera;

//     // Renderer
//     const renderer = new THREE.WebGLRenderer({
//       canvas: canvasRef.current,
//       antialias: true,
//       alpha: true,
//     });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     renderer.outputColorSpace = THREE.SRGBColorSpace;
//     renderer.setClearColor(0x000000, 1);
//     rendererRef.current = renderer;

//     // Controls
//     const controls = new OrbitControls(camera, canvasRef.current);
//     controls.enableDamping = true;
//     controls.enablePan = false;
//     controls.minDistance = 3.25;
//     controls.maxDistance = 20;

//     // Group
//     const galleryGroup = new THREE.Group();
//     scene.add(galleryGroup);
//     galleryGroupRef.current = galleryGroup;

//     // Light
//     scene.add(new THREE.AmbientLight(0xffffff, 2));

//     const textureLoader = new THREE.TextureLoader();

//     // Geometry helper
//     function createCurvedPlane(
//       width: number,
//       height: number,
//       radius: number,
//       segments: number
//     ): THREE.BufferGeometry {
//       const geometry = new THREE.BufferGeometry();
//       const vertices: number[] = [];
//       const indices: number[] = [];
//       const uvs: number[] = [];

//       const segmentsX = segments * 4;
//       const segmentsY = Math.floor(height * 8);
//       const theta = width / radius;

//       for (let y = 0; y <= segmentsY; y++) {
//         const yPos = (y / segmentsY - 0.5) * height;
//         for (let x = 0; x <= segmentsX; x++) {
//           const xAngle = (x / segmentsX - 0.5) * theta;
//           vertices.push(
//             Math.sin(xAngle) * radius,
//             yPos,
//             Math.cos(xAngle) * radius
//           );
//           uvs.push(x / segmentsX, y / segmentsY);
//         }
//       }

//       for (let y = 0; y < segmentsY; y++) {
//         for (let x = 0; x < segmentsX; x++) {
//           const a = x + (segmentsX + 1) * y;
//           const b = x + (segmentsX + 1) * (y + 1);
//           const c = x + 1 + (segmentsX + 1) * (y + 1);
//           const d = x + 1 + (segmentsX + 1) * y;
//           indices.push(a, b, d, b, c, d);
//         }
//       }

//       geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
//       geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
//       geometry.setIndex(indices);
//       geometry.computeVertexNormals();
//       return geometry;
//     }

//     // Titanium texture loader (never throws)
//     function loadTexture(url: string): Promise<THREE.Texture> {
//       return new Promise((resolve) => {
//         textureLoader.load(
//           url,
//           (texture: THREE.Texture) => {
//             // 🔑 critical for JPG/PNG book covers
//             texture.colorSpace = THREE.SRGBColorSpace;
//             texture.generateMipmaps = true;
//             texture.minFilter = THREE.LinearMipmapLinearFilter;
//             texture.magFilter = THREE.LinearFilter;
//             texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
//             texture.needsUpdate = true;
//             resolve(texture);
//         },
//           undefined,
//           () => {
//             console.warn('Texture failed to load:', url);
//             resolve(new THREE.Texture());
//           }
//         );
//       });
//     }

//     async function createBookBlock(
//       sectionIndex: number,
//       blockIndex: number,
//       imageUrl: string,
//       volumeId: string,
//     ): Promise<BookBlock> {
//       const geometry = createCurvedPlane(2.2, 3, CYLINDER_RADIUS, 10);

//       let texture: THREE.Texture;
//       try {
//         texture = await loadTexture(imageUrl);
//       } catch {
//         texture = new THREE.Texture();
//       }

//       const mesh = new THREE.Mesh(
//         geometry,
//         new THREE.MeshPhongMaterial({
//           map: texture,
//           side: THREE.DoubleSide,
//           toneMapped: false,
//         })
//       );
//       mesh.userData.volumeId = volumeId;
//       console.log('Created mesh with volumeId:', volumeId);
      

//       const baseY = -CYLINDER_HEIGHT / 2 + (sectionIndex + 1) * VERTICAL_SPACING;
//       mesh.position.y = baseY + (Math.random() - 0.5) * 0.3;

//       const container = new THREE.Group();
//       const baseAngle = SECTION_ANGLE * blockIndex +
//         sectionIndex * (SECTION_ANGLE / BLOCKS_PER_SECTION) * 0.9;
//       container.rotation.y = baseAngle +
//         (Math.random() * 2 - 1) * MAX_RANDOM_ANGLE;

//       container.userData.volumeId = volumeId;
//       container.add(mesh);
//       return {
//         mesh,
//         container,
//         homeAngle: container.rotation.y,
//         homeY: mesh.position.y,
//         isSelected: false,
//         currentRadiusOffset: 0,
//         targetRadiusOffset: 0,
//       };
//     }

//     async function initializeBlocks() {
//       const blocks: BookBlock[] = [];

//       for (let section = 0; section < NUM_VERTICAL_SECTIONS; section++) {
//         for (let i = 0; i < BLOCKS_PER_SECTION; i++) {
//           const bookIndex = (section * BLOCKS_PER_SECTION + i) % BOOKS.length;
//           const book = BOOKS[bookIndex];

//           console.log(bookIndex, book.title, book.coverPath);

//           const block = await createBookBlock(
//             section, 
//             i, 
//             book.coverPath,
//             book.volumeId
//         );
//           block.bookData = {
//             id: book.id,
//             title: book.title,
//             author: book.author,
//             coverUrl: book.coverPath,
//           };

//           blocks.push(block);
//           galleryGroup.add(block.container);
//         }
//       }

//       blocksRef.current = blocks;
      
//     }

//     function animate() {
//       requestAnimationFrame(animate);
//       controls.update();

//       galleryGroup.rotation.y += BASE_ROTATION_SPEED;

//       blocksRef.current.forEach((block) => {
//         block.currentRadiusOffset +=
//           (block.targetRadiusOffset - block.currentRadiusOffset) * LERP_SPEED;
//         block.mesh.position.z = block.currentRadiusOffset;
//       });

//       renderer.render(scene, camera);
//     }

//     function handleClick(event: MouseEvent) {
//         if(!canvasRef.current || !cameraRef.current || !sceneRef.current) return;

//         const rect = canvasRef.current.getBoundingClientRect();

//         mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
//         mouseRef.current.y =   -((event.clientY - rect.top) / rect.height) * 2 + 1;

//         raycasterRef.current.setFromCamera(
//             mouseRef.current,
//             cameraRef.current
//         );

//         const intersects = raycasterRef.current.intersectObjects(
//             sceneRef.current.children,
//             true
//         );

//         if (intersects.length === 0 ) return;

//         const hit = intersects[0].object as THREE.Object3D;
//         const volumeId = hit.userData.volumeId;

//         if (volumeId) {
//             router.push(`/book/${volumeId}`);
            
//         }

//     }
//     canvasRef.current.addEventListener('click', handleClick);

   
//     initializeBlocks();
//     animate();



//     return () => {
//         canvasRef.current?.removeEventListener('click', handleClick);
//         renderer.dispose();
//     };
//     }, []);

//   return <canvas ref={canvasRef} className="w-full h-full" />;
// }

'use client';

import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { BOOKS } from '../data/books';
import { useRouter } from 'next/navigation';

interface BookBlock {
  mesh: THREE.Mesh;
  container: THREE.Group;
  currentRadiusOffset: number;
  targetRadiusOffset: number;
}

const CYLINDER_RADIUS = 6;
const CYLINDER_HEIGHT = 30;
const NUM_VERTICAL_SECTIONS = 12;
const BLOCKS_PER_SECTION = 5;
const VERTICAL_SPACING = 3.2;
const SECTION_ANGLE = (Math.PI * 2) / BLOCKS_PER_SECTION;
const MAX_RANDOM_ANGLE = SECTION_ANGLE * 0.25;
const BASE_ROTATION_SPEED = 0.002;
const POP_OUT_DISTANCE = 3;
const LERP_SPEED = 0.08;

const DOUBLE_CLICK_MS = 400;
const POINTER_CLICK_THRESHOLD = 6; // px

export default function CylinderGallery() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const galleryGroupRef = useRef<THREE.Group | null>(null);
  const blocksRef = useRef<BookBlock[]>([]);
  const selectedBlockRef = useRef<BookBlock | null>(null);

  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const router = useRouter();

  const pointerDownPos = useRef<{ x: number; y: number } | null>(null);
  const clickStateRef = useRef<{
    volumeId: string | null;
    clickCount: number;
    lastTime: number;
  }>({ volumeId: null, clickCount: 0, lastTime: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;

    /* ---------- SCENE ---------- */
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 15);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, canvasRef.current);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 3.25;
    controls.maxDistance = 20;

    const galleryGroup = new THREE.Group();
    scene.add(galleryGroup);
    galleryGroupRef.current = galleryGroup;

    scene.add(new THREE.AmbientLight(0xffffff, 2));

    const textureLoader = new THREE.TextureLoader();

    /* ---------- HELPERS ---------- */
    function createCurvedPlane(
      width: number,
      height: number,
      radius: number,
      segments: number
    ): THREE.BufferGeometry {
      const geometry = new THREE.BufferGeometry();
      const vertices: number[] = [];
      const indices: number[] = [];
      const uvs: number[] = [];

      const segmentsX = segments * 4;
      const segmentsY = Math.floor(height * 8);
      const theta = width / radius;

      for (let y = 0; y <= segmentsY; y++) {
        const yPos = (y / segmentsY - 0.5) * height;
        for (let x = 0; x <= segmentsX; x++) {
          const xAngle = (x / segmentsX - 0.5) * theta;
          vertices.push(
            Math.sin(xAngle) * radius,
            yPos,
            Math.cos(xAngle) * radius
          );
          uvs.push(x / segmentsX, y / segmentsY);
        }
      }

      for (let y = 0; y < segmentsY; y++) {
        for (let x = 0; x < segmentsX; x++) {
          const a = x + (segmentsX + 1) * y;
          const b = x + (segmentsX + 1) * (y + 1);
          const c = x + 1 + (segmentsX + 1) * (y + 1);
          const d = x + 1 + (segmentsX + 1) * y;
          indices.push(a, b, d, b, c, d);
        }
      }

      geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(vertices, 3)
      );
      geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
      geometry.setIndex(indices);
      geometry.computeVertexNormals();
      return geometry;
    }

    function loadTexture(url: string): Promise<THREE.Texture> {
      return new Promise((resolve) => {
        textureLoader.load(
          url,
          (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.generateMipmaps = true;
            texture.minFilter = THREE.LinearMipmapLinearFilter;
            texture.magFilter = THREE.LinearFilter;
            resolve(texture);
          },
          undefined,
          () => resolve(new THREE.Texture())
        );
      });
    }

    async function createBookBlock(
      sectionIndex: number,
      blockIndex: number,
      coverPath: string,
      volumeId: string
    ): Promise<BookBlock> {
      const geometry = createCurvedPlane(2.2, 3, CYLINDER_RADIUS, 10);
      const texture = await loadTexture(coverPath);

      const mesh = new THREE.Mesh(
        geometry,
        new THREE.MeshPhongMaterial({
          map: texture,
          side: THREE.DoubleSide,
          toneMapped: false,
        })
      );

      mesh.userData.volumeId = volumeId;

      const baseY =
        -CYLINDER_HEIGHT / 2 + (sectionIndex + 1) * VERTICAL_SPACING;
      mesh.position.y = baseY + (Math.random() - 0.5) * 0.3;

      const container = new THREE.Group();
      const baseAngle =
        SECTION_ANGLE * blockIndex +
        sectionIndex * (SECTION_ANGLE / BLOCKS_PER_SECTION) * 0.9;

      container.rotation.y =
        baseAngle + (Math.random() * 2 - 1) * MAX_RANDOM_ANGLE;

      container.add(mesh);

      return {
        mesh,
        container,
        currentRadiusOffset: 0,
        targetRadiusOffset: 0,
      };
    }

    async function initializeBlocks() {
      const blocks: BookBlock[] = [];

      for (let section = 0; section < NUM_VERTICAL_SECTIONS; section++) {
        for (let i = 0; i < BLOCKS_PER_SECTION; i++) {
          const bookIndex =
            (section * BLOCKS_PER_SECTION + i) % BOOKS.length;
          const book = BOOKS[bookIndex];

          const block = await createBookBlock(
            section,
            i,
            book.coverPath,
            book.volumeId
          );

          blocks.push(block);
          galleryGroup.add(block.container);
        }
      }

      blocksRef.current = blocks;
    }

    function selectBlock(block: BookBlock) {
      if (selectedBlockRef.current && selectedBlockRef.current !== block) {
        selectedBlockRef.current.targetRadiusOffset = 0;
      }
      block.targetRadiusOffset = POP_OUT_DISTANCE;
      selectedBlockRef.current = block;
    }

    function deselectAll() {
      blocksRef.current.forEach(
        (b) => (b.targetRadiusOffset = 0)
      );
      selectedBlockRef.current = null;
    }

    function animate() {
      requestAnimationFrame(animate);
      controls.update();

      galleryGroup.rotation.y += BASE_ROTATION_SPEED;

      blocksRef.current.forEach((block) => {
        block.currentRadiusOffset +=
          (block.targetRadiusOffset - block.currentRadiusOffset) *
          LERP_SPEED;
        block.mesh.position.z = block.currentRadiusOffset;
      });

      renderer.render(scene, camera);
    }

    /* ---------- POINTER HANDLING (INDUSTRIAL-GRADE) ---------- */

    function onPointerDown(e: PointerEvent) {
      pointerDownPos.current = { x: e.clientX, y: e.clientY };
    }

    function onPointerUp(e: PointerEvent) {
      if (!pointerDownPos.current) return;

      const dx = e.clientX - pointerDownPos.current.x;
      const dy = e.clientY - pointerDownPos.current.y;
      const dist = Math.hypot(dx, dy);
      pointerDownPos.current = null;

      if (dist > POINTER_CLICK_THRESHOLD) return;

      if (!canvasRef.current || !cameraRef.current || !sceneRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      mouseRef.current.x =
        ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y =
        -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycasterRef.current.setFromCamera(
        mouseRef.current,
        cameraRef.current
      );

      const hits = raycasterRef.current.intersectObjects(
        sceneRef.current.children,
        true
      );

      if (hits.length === 0) {
        deselectAll();
        clickStateRef.current = { volumeId: null, clickCount: 0, lastTime: 0 };
        return;
      }

      const hit = hits[0].object as THREE.Object3D;
      const volumeId = hit.userData.volumeId as string | undefined;
      if (!volumeId) return;

      const now = performance.now();
      const state = clickStateRef.current;

      if (state.volumeId === volumeId && now - state.lastTime < DOUBLE_CLICK_MS) {
        state.clickCount += 1;
      } else {
        state.volumeId = volumeId;
        state.clickCount = 1;
      }

      state.lastTime = now;

      if (state.clickCount === 1) {
        const block = blocksRef.current.find(
          (b) => b.mesh.userData.volumeId === volumeId
        );
        if (block) selectBlock(block);
        return;
      }

      if (state.clickCount === 2) {
        router.push(`/book/${volumeId}`);
        clickStateRef.current = { volumeId: null, clickCount: 0, lastTime: 0 };
      }
    }

    canvasRef.current.addEventListener('pointerdown', onPointerDown);
    canvasRef.current.addEventListener('pointerup', onPointerUp);

    initializeBlocks();
    animate();

    return () => {
      canvasRef.current?.removeEventListener('pointerdown', onPointerDown);
      canvasRef.current?.removeEventListener('pointerup', onPointerUp);
      renderer.dispose();
    };
  }, [router]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
