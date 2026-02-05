'use client'

import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import CardReveal from '../CardReveal/page'
import BookCardInfo from '../../../../components/BookCardInfo';
import styles from './BookCard.module.css'
import GUI from 'lil-gui';


export default function SimpleCube() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const pagesRef = useRef<THREE.Mesh[]>([]);

    const currentPageRef = useRef<number>(0);
    const [currentPage, setCurrentPage] = useState(0);

    const cameraTargetRef = useRef({ x: 0, y: 0, z: 5 });
    const [isBookOpen, setIsBookOpen] = useState(false);

    const bookGroupRef = useRef<THREE.Group>(null);
    const bookRotationtargetRef = useRef(0);
    const [showBookContent, setShowBookContent] = useState(false);


    useEffect(() => {
        if(!canvasRef.current) return 
        const scene = new THREE.Scene()

        const camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth/window.innerHeight,
            0.1,
            1000
        )

        camera.position.z = 40

        //scene.background = new THREE.Color().setHex(0xfffaeb);
        scene.background = new THREE.Color('#f0f7fc')

        const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
        scene.add(ambientLight)
        
        const gui = new GUI();
        gui.add(ambientLight, 'intensity').min(0).max(5).step(0.001);
        gui.addColor(ambientLight, 'color')
     

        const directionLight = new THREE.DirectionalLight(0xffffff, 1.2);
        directionLight.position.set(0,0,13)

        scene.add(directionLight)

        // const hemisphereLight = new THREE.HemisphereLight(0x000000, 0xffffff, 5);
        // scene.add(hemisphereLight)

        const pointLight = new THREE.PointLight(0xf5f5f5, 20);
        //pointLight.position.set(-2.5,-2.3,0.70)
        //scene.add(pointLight)

        //gui.add(pointLight, 'intensity').min(0).max(5).step(0.001);
        //gui.addColor(pointLight, 'color')


        // const pointLight2 = new THREE.PointLight(0xf5f5f5, 20);
        // pointLight2.position.set(2.9,2.4,0.90)
        // scene.add(pointLight2)

        gui.add(pointLight, 'intensity').min(0).max(5).step(0.001);
        gui.addColor(pointLight, 'color')

        gui.add(pointLight.position, 'x').min(-10).max(10).step(0.1);
        gui.add(pointLight.position, 'y').min(-10).max(10).step(0.1);
        gui.add(pointLight.position, 'z').min(-10).max(10).step(0.1);

        // gui.add(pointLight2, 'intensity').min(0).max(5).step(0.001);
        // gui.addColor(pointLight2, 'color')

        // gui.add(pointLight2.position, 'x').min(-10).max(10).step(0.1);
        // gui.add(pointLight2.position, 'y').min(-10).max(10).step(0.1);
        // gui.add(pointLight2.position, 'z').min(-10).max(10).step(0.1);
       

        // const directionLight2 = new THREE.DirectionalLight(0xff234f, 5.2);
        // directionLight2.position.set(0, 0, 4)

        // scene.add(directionLight2)


        const loader = new THREE.TextureLoader();

        const clock = new THREE.Clock();

        let zoomStartTime = null;
        const zoomDuration = 1.5;

      
        let panStartTime: number | null = null;
        const panDuration = 1.0;

        
        let finalZoomStartTime: number | null = null;
        const finalZoomDuration = 2.0;

        zoomStartTime = clock.getElapsedTime();


        const bookGroup = new THREE.Group();
        bookGroupRef.current = bookGroup;
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
        panStartTime = clock.getElapsedTime();  
       
        
        cameraTargetRef.current = { x: -1.85, y: 0, z: 7 };

        setTimeout(() => {
            const targetPage = Math.min(currentPageRef.current + 8, 11);


            const flipInterval = setInterval(() => {
                if (currentPageRef.current < targetPage) {
                    currentPageRef.current += 1;
                    setCurrentPage(currentPageRef.current);
                } else {
                    clearInterval(flipInterval);
                    finalZoomStartTime = clock.getElapsedTime();
                     setTimeout(() => {
                        setIsBookOpen(true);
                        setTimeout(() => {
                            setShowBookContent(true);
                        }, 2000);
                    }, finalZoomDuration * 1000); 
                }
            }, 350);
        }, 600);
    };
        
        canvasRef.current.addEventListener('click', handleClick);

        const animate = () => {

            if ( zoomStartTime !== null ) {
                const elapsedTime = clock.getElapsedTime();
                const zoomProgress = Math.min((elapsedTime - zoomStartTime) / zoomDuration, 1.0);
                // const easeProgress = Math.pow(zoomProgress, 3.0);
                const easeProgress = 1 - Math.pow(1 - zoomProgress, 3.0);

                const startZ = 70;
                const endZ = 5;
                camera.position.z = startZ + (endZ - startZ) * easeProgress;
            
            }

            if (panStartTime !== null) {
                const elapsedTime = clock.getElapsedTime();
                const panProgress = Math.min((elapsedTime - panStartTime) / panDuration, 1.0);
                const easeProgress = 1 - Math.pow(1 - panProgress, 3.0);
                
                const startX = 0;
                const endX = -1.85;
                camera.position.x = startX + (endX - startX) * easeProgress;
                controls.target.x = startX + (endX - startX) * easeProgress; 
            }

            if (finalZoomStartTime !== null) {
                const elapsedTime = clock.getElapsedTime();
                const zoomProgress = Math.min((elapsedTime - finalZoomStartTime) / finalZoomDuration, 1.0);
                const easeProgress = 1 - Math.pow(1 - zoomProgress, 3.0);
                
                // const startZ = 5;    // Where the first zoom ended
                // const endZ = 0.01;    // Very close! Adjust this to taste
                // camera.position.z = startZ + (endZ - startZ) * easeProgress;

                const startY = 0;    // Current Y position
                const endY = -5;     // Move down by 8 units
                camera.position.y = startY + (endY - startY) * easeProgress;

            }

            controls.update();

            if (bookGroupRef.current) {
                bookGroupRef.current.rotation.x += (bookRotationtargetRef.current - bookGroupRef.current.rotation.x) * 0.1;
            }



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
        
        <div className="h-screen relative">

            <canvas ref={canvasRef} className="w-full h-full"></canvas>
           

            {isBookOpen && (
                <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-auto">
                    <div className={`w-[550px] h-[700px]  rounded-3xl ${styles.bookCardContainer}`}> 
                        <div className={styles.card}>
                            
                                <CardReveal shouldAnimate={isBookOpen} />
                           
                            <div 
                                className={`absolute inset-0 p-8 transition-opacity duration-1000 ${
                                    showBookContent ? 'opacity-100' : 'opacity-0'
                                }`}
                            >
                                <BookCardInfo/>
                            </div>
                        </div>
                    </div>
                </div>   
            )}
        </div>
    )
}



 