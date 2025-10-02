'use client'

import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


export default function SimpleCube() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const pagesRef = useRef<THREE.Mesh[]>([]);
    const currentPageRef = useRef<number>(0);
    const [currentPage, setCurrentPage] = useState(0);
    const cameraTargetRef = useRef({ x: 0, y: 0, z: 5 })


    useEffect(() => {
        if(!canvasRef.current) return 
        const scene = new THREE.Scene()

        const camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth/window.innerHeight,
            0.1,
            1000
        )

        camera.position.z = 5

        scene.background = new THREE.Color('green');

        const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
        scene.add(ambientLight)
        // scene.add(ambientLight)

        const directionLight = new THREE.DirectionalLight(0xffffff, 1.3);
        directionLight.position.set(2, 2, 2)

        scene.add(directionLight)

        const loader = new THREE.TextureLoader();

        const bookCoverColors = [
            new THREE.MeshLambertMaterial({ color: 0xffffff }),
            new THREE.MeshLambertMaterial({ color: 0x8B4513 }),
            new THREE.MeshLambertMaterial({ color: 'skyblue' }),
            new THREE.MeshLambertMaterial({ color: 'green' }),
            new THREE.MeshLambertMaterial({ map: loader.load('https://covers.openlibrary.org/b/id/8225261-L.jpg')}),
            new THREE.MeshLambertMaterial({ color: 'orange'}),
        ]

        const bookGroup = new THREE.Group();
        scene.add(bookGroup);
        
        const pageGeometry = new THREE.PlaneGeometry(3.48, 4.98);
        pageGeometry.translate(1.74, 0, 0)
        const pages: THREE.Mesh[] = [];

        for (let i = 0; i < 12; i++) {
        
        const pageMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xffffff,
            side: THREE.DoubleSide 
        });

        const page = new THREE.Mesh(pageGeometry, pageMaterial);

        //page.geometry.translate(1.74, 0, 0); // Half the width (3.48/2)
        page.position.x = -1.74;

        page.position.z = -0.19 + (i * 0.032);
        
        // Stack pages with slight variation
        page.position.z = -0.19 + (i * 0.032);
        //page.position.x = Math.random() * 0.002; // Tiny random offset
        page.position.y = Math.random() * 0.002;
        page.rotation.z = (Math.random() - 0.5) * 0.01; // Slight rotation
        
        bookGroup.add(page);
        pages.push(page);
        bookGroup.add(page);
        }

        pagesRef.current = pages;
    

        const frontCoverGeometry = new THREE.PlaneGeometry(3.5, 5);
        frontCoverGeometry.translate(1.75, 0, 0);
        
        //const frontCoverGeometry = new RoundedBoxGeometry(3.5, 5, 0.1, 2, 0.05);

        const frontCoverMaterial = new THREE.MeshStandardMaterial({
            map: loader.load('https://images-na.ssl-images-amazon.com/images/P/1401997503.01.L.jp'),
            side: THREE.DoubleSide
               //normalMap: loader.load('https://cdn.polyhaven.com/asset_img/primary/fabric_pattern_07.png')
        })
        const frontCover = new THREE.Mesh(frontCoverGeometry, frontCoverMaterial);
        frontCover.position.z = 0.21;
        frontCover.position.x = -1.74;
        frontCover.position.z = 0.21;
        pages.unshift(frontCover); 

        bookGroup.add(frontCover);


        //initalized backCover and add to bookGroup

        const backCoverGeometry = new THREE.PlaneGeometry(3.5, 5);
        const backCoverMaterial = new THREE.MeshLambertMaterial( {color: 0x8B4513 });
        const backCover = new THREE.Mesh(backCoverGeometry, backCoverMaterial);

        backCover.position.z = -0.21; 
        backCover.rotation.y = Math.PI;
        bookGroup.add(backCover);

        //initialized spine geometry 
        const spineGeometry = new THREE.CylinderGeometry(0.21, 0.21, 5, 8, 1, false, -Math.PI, Math.PI);
        const spineMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x654321,
         });
        const spine = new THREE.Mesh(spineGeometry, spineMaterial);
       
        spine.position.x = -1.70;
        bookGroup.add(spine);

        const controls = new OrbitControls(camera, canvasRef.current)
        controls.enableZoom = true;
        controls.enableDamping = true;
        //controls.autoRotate = true;
       

        const renderer = new THREE.WebGLRenderer({ canvas: 
            canvasRef.current, 
            antialias: true, //smooths edges
        })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        const handleClick = () => {
             // Set a target page 6 pages ahead

            cameraTargetRef.current = { x: -1.85, y: 0, z: 5};

            setTimeout(() => {
                const targetPage = Math.min(currentPageRef.current + 8, 11);

                // Create an interval that flips one page every X milliseconds
                const flipInterval = setInterval(() => {
                    if (currentPageRef.current < targetPage ) {
                        currentPageRef.current += 1;
                        setCurrentPage(currentPageRef.current);
                    } else {
                        clearInterval(flipInterval);
                    }
                }, 300);

            }, 275)
            
        }

        canvasRef.current.addEventListener('click', handleClick);

        const animate = () => {
            controls.update();

            camera.position.x += (cameraTargetRef.current.x - camera.position.x) * 0.05;
            // camera.position.y += (cameraTargetRef.current.y - camera.position.y) * 0.1;
            // camera.position.z += (cameraTargetRef.current.z - camera.position.z) * 0.1;

            controls.target.x += (cameraTargetRef.current.x - controls.target.x) * 0.05;

            pagesRef.current.forEach((page, i) => {

                if (i === 0) {
                    const targetRotation = i < currentPageRef.current ? -Math.PI : 0;
                    page.rotation.y += (targetRotation - page.rotation.y) * 0.1;
                } else {
                    const targetRotation = i < currentPageRef.current ? -Math.PI * 0.97 : 0;
                    page.rotation.y += (targetRotation - page.rotation.y) * 0.1;

                     // Move flipped pages to the left side Z position
                    const targetZ = i < currentPageRef.current 
                        ? 0.21 - (i * 0.002)  // Stack on left, slightly offset
                        : -0.19 + (i * 0.032); // Original right side position
                    page.position.z += (targetZ - page.position.z) * 0.1;
                }
                
            })

            requestAnimationFrame(animate);
            renderer.render(scene,camera)
        }

        animate()
        
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)  
        }
        window.addEventListener('resize', handleResize)

        return() => {
            window.removeEventListener('resize', handleResize)
             if (canvasRef.current) {
                canvasRef.current.removeEventListener('click', handleClick);
            }
        }
    }, [])

    return (
        <div className="m-0 overflow-hidden">
            <canvas ref={canvasRef} className="threejs"></canvas>
        </div>
    )
}



// 'use client'

// import * as THREE from 'three';
// import { useEffect, useRef } from 'react';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { gsap } from 'gsap';

// export default function SimpleCube() {
//     const canvasRef = useRef<HTMLCanvasElement | null>(null);

//     useEffect(() => {
//         if(!canvasRef.current) return;

//         const scene = new THREE.Scene();

//         const camera = new THREE.PerspectiveCamera(
//             75, 
//             window.innerWidth/window.innerHeight,
//             0.1,
//             1000
//         );
//         camera.position.z = 10;

//         // Lighting
//         const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
//         scene.add(ambientLight);

//         const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
//         directionalLight.position.set(5, 5, 5);
//         scene.add(directionalLight);

//         const loader = new THREE.TextureLoader();

//         // Create book group
//         const bookGroup = new THREE.Group();
//         scene.add(bookGroup);

//         // Store pages for animation
//         const pageGroups: THREE.Group[] = [];

//         // Create individual pages with pivot groups
//         for (let i = 0; i < 12; i++) {
//             // Create pivot group positioned at spine
//             const pageGroup = new THREE.Group();
//             pageGroup.position.x = -1.75; // Position at spine
//             bookGroup.add(pageGroup);
//             pageGroups.push(pageGroup);

//             const pageGeometry = new THREE.PlaneGeometry(3.48, 4.98);
            
//             // Translate geometry so left edge is at origin
//             pageGeometry.translate(1.74, 0, 0);
            
//             const pageMaterial = new THREE.MeshStandardMaterial({ 
//                 color: 0xfefefe,
//                 roughness: 0.9,
//                 metalness: 0.0,
//                 side: THREE.DoubleSide 
//             });
            
//             const page = new THREE.Mesh(pageGeometry, pageMaterial);
            
//             // Stack pages with slight variation
//             page.position.z = -0.19 + (i * 0.032);
//             page.position.y = Math.random() * 0.002;
//             page.rotation.z = (Math.random() - 0.5) * 0.01;
            
//             pageGroup.add(page);

//             // Add page edges
//             const edgesGeometry = new THREE.EdgesGeometry(pageGeometry);
//             const edgesMaterial = new THREE.LineBasicMaterial({ 
//                 color: 0xcccccc,
//                 linewidth: 1
//             });
//             const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
//             edges.position.copy(page.position);
//             edges.rotation.copy(page.rotation);
//             pageGroup.add(edges);
//         }

//         // Front cover
//         const frontCoverGeometry = new THREE.PlaneGeometry(3.5, 5);
//         const frontCoverMaterial = new THREE.MeshStandardMaterial({ 
//             map: loader.load('https://covers.openlibrary.org/b/id/12583254-L.jpg'),
//             roughness: 0.3,
//             metalness: 0.1
//         });
//         const frontCover = new THREE.Mesh(frontCoverGeometry, frontCoverMaterial);
//         frontCover.position.z = 0.21;
//         bookGroup.add(frontCover);

//         // Back cover
//         const backCoverGeometry = new THREE.PlaneGeometry(3.5, 5);
//         const backCoverMaterial = new THREE.MeshStandardMaterial({ 
//             color: 0x8B4513,
//             roughness: 0.8,
//             metalness: 0.0
//         });
//         const backCover = new THREE.Mesh(backCoverGeometry, backCoverMaterial);
//         backCover.position.z = -0.21;
//         backCover.rotation.y = Math.PI;
//         bookGroup.add(backCover);

//         // Spine (half cylinder)
//         const spineGeometry = new THREE.CylinderGeometry(0.21, 0.21, 5, 8, 1, false, -Math.PI, Math.PI);
//         const spineMaterial = new THREE.MeshStandardMaterial({ 
//             color: 0x654321,
//             roughness: 0.8,
//             metalness: 0.0
//         });
//         const spine = new THREE.Mesh(spineGeometry, spineMaterial);
//         spine.rotation.z = Math.PI / 2;
//         spine.position.x = -1.9;
//         bookGroup.add(spine);

//         const controls = new OrbitControls(camera, canvasRef.current);
//         controls.enableZoom = true;
//         controls.enableDamping = true;

//         // Click detection and animation
//         const raycaster = new THREE.Raycaster();
//         const mouse = new THREE.Vector2();
//         let isOpen = false;

//         const onBookClick = (event: MouseEvent) => {
//             mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//             mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            
//             raycaster.setFromCamera(mouse, camera);
//             const intersects = raycaster.intersectObject(bookGroup, true);
            
//             if (intersects.length > 0) {
//                 console.log('Book clicked!');
                
//                 if (isOpen) {
//                     // Close book
//                     const closeTimeline = gsap.timeline();
//                     pageGroups.forEach((pageGroup, index) => {
//                         closeTimeline.to(pageGroup.rotation, {
//                             y: 0,
//                             duration: 0.6,
//                             ease: "power2.inOut"
//                         }, index * 0.05);
//                     });
//                     isOpen = false;
//                 } else {
//                     // Open book
//                     const openTimeline = gsap.timeline();
//                     pageGroups.forEach((pageGroup, index) => {
//                         openTimeline.to(pageGroup.rotation, {
//                             y: -Math.PI + (index * 0.08), // Stagger slightly
//                             duration: 0.8,
//                             ease: "power2.out"
//                         }, index * 0.1);
//                     });
//                     isOpen = true;
//                 }
//             }
//         };

//         canvasRef.current.addEventListener('click', onBookClick);

//         const renderer = new THREE.WebGLRenderer({ 
//             canvas: canvasRef.current, 
//             antialias: true
//         });
//         renderer.setSize(window.innerWidth, window.innerHeight);
//         renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//         renderer.outputColorSpace = THREE.SRGBColorSpace;

//         const animate = () => {
//             controls.update();
//             requestAnimationFrame(animate);
//             renderer.render(scene, camera);
//         };

//         animate();

//         const handleResize = () => {
//             camera.aspect = window.innerWidth / window.innerHeight;
//             camera.updateProjectionMatrix();
//             renderer.setSize(window.innerWidth, window.innerHeight);
//         };

//         window.addEventListener('resize', handleResize);

//         return () => {
//             window.removeEventListener('resize', handleResize);
//             canvasRef.current?.removeEventListener('click', onBookClick);
//         };
//     }, []);

//     return (
//         <div className="w-full h-screen m-0 overflow-hidden">
//             <canvas ref={canvasRef} className="threejs"></canvas>
//         </div>
//     );
// }
