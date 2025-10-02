'use client'

import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default function SimpleCube() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

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

        const BoxGeometry = new THREE.BoxGeometry(1,1,1);
        const material = new THREE.MeshBasicMaterial({color: 'white', wireframe: true})

        const cube = new THREE.Mesh(BoxGeometry, material);

        scene.add(cube)

        const controls = new OrbitControls(camera, canvasRef.current)
        controls.enableZoom = true;
        controls.enableDamping = true;
        controls.autoRotate = true;

        const renderer = new THREE.WebGLRenderer({ canvas: 
            canvasRef.current, 
            antialias: true, //smooths edges
        })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        const animate = () => {
            controls.update();
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
        }
    }, [])

    return (
        <div className="m-0 overflow-hidden">
            <canvas ref={canvasRef} className="threejs"></canvas>
        </div>
    )
}