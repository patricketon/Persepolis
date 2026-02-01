
'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import GUI from 'lil-gui';
import { GPUComputationRenderer, MeshSurfaceSampler } from 'three/examples/jsm/Addons.js';
import { vertex } from './vertex';
import { fragment } from './fragment';
import { particleShader } from './particleShader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { backgroundVertexShader, backgroundFragmentShader } from './backgroundShader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';




export default function PersepolisFlowFieldLandingPage() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight,
            pixelRatio: Math.min(window.devicePixelRatio, 2),
        }

        const scene = new THREE.Scene();
        //scene.background = new THREE.Color('#F5E3D4');
        //scene.background = new THREE.Color('#88582B');

        const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.set(0, 0, 16);
        scene.add(camera);

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
        })

        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(sizes.pixelRatio);

        //Step 2 Tone Mapping
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.5;

        //renderer.setClearColor('#e8e0b5');

        // Create composer with HalfFloat for HDR support
        const renderTarget = new THREE.WebGLRenderTarget(
            sizes.width * sizes.pixelRatio, 
            sizes.height * sizes.pixelRatio, 
            {type: THREE.HalfFloatType,
        });

        const composer = new EffectComposer(renderer, renderTarget);

        // Pass 1: Render the scene
        const renderPass = new RenderPass(scene, camera);
        composer.addPass(renderPass);

        // Pass 2: Bloom (the magic)
        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(sizes.width, sizes.height),
            0.9,   // strength
            0.9,   // radius  
            0.15   // threshold
        );
        composer.addPass(bloomPass);

        // Pass 3: Output (color space conversion)
        const outputPass = new OutputPass();
        composer.addPass(outputPass);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        const gui = new GUI({ width: 340 });
        const debugObject = { clearColor: '#e8e0b5' }
        

        const backgroundGeometry = new THREE.PlaneGeometry(2, 2);
        const backgroundMaterial = new THREE.ShaderMaterial({
        uniforms: {
            u_time: { value: 0.0 },
            u_mouse: { value: new THREE.Vector2(0.0, 0.0) },
            u_resolution: { value: new THREE.Vector2(sizes.width, sizes.height) }
        },
        vertexShader: backgroundVertexShader,
        fragmentShader: backgroundFragmentShader,
        depthTest: false,
        depthWrite: false
        });

        const backgroundMesh = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
        backgroundMesh.renderOrder = -1;
        //scene.add(backgroundMesh);



        const initWithModel = async () => {

            const fontLoader = new FontLoader();
            const font = await fontLoader.loadAsync('/Font/optimer_bold.typeface.json');

            const distance = 8; // approximate z-distance where text sits
            const vFOV = camera.fov * Math.PI / 180;
            const visibleHeight = 2 * Math.tan(vFOV / 2) * distance;
            const visibleWidth = visibleHeight * camera.aspect;

            const responsiveSize = Math.min(visibleWidth, visibleHeight) * 0.05; // 15% of smaller dimension

            const textGeometry = new TextGeometry('PERSEPOLIS', {
                font: font,
                size: responsiveSize,
                depth: 0,
                curveSegments: 32,
                bevelEnabled: false,
                bevelThickness: 0.23,
                bevelSize: 0.01,
                bevelOffset: 0,
                bevelSegments: 20,
            })

            textGeometry.center();

           

            const baseGeometry = {
                instance: textGeometry,
                count: textGeometry.attributes.position.count,
            }




            const gpu = {
                size: Math.ceil(Math.sqrt(baseGeometry.count)),
                computation: null as any,
                particlesVariable: null as any,
                debug: null as any,
            };

            gpu.computation = new GPUComputationRenderer(gpu.size, gpu.size, renderer)

            // Base Particles
            const baseParticlesTexture = gpu.computation.createTexture();

            for (let i = 0; i < baseGeometry.count; i++) {
                const i3 = i * 3;
                const i4 = i * 4;

                // baseParticlesTexture.image.data[i4 + 0] = baseGeometry.instance.attributes.position.array[i3];
                // baseParticlesTexture.image.data[i4 + 1] = baseGeometry.instance.attributes.position.array[i3 + 1];
                // baseParticlesTexture.image.data[i4 + 2] = baseGeometry.instance.attributes.position.array[i3 + 2];
                // baseParticlesTexture.image.data[i4 + 3] = Math.random();


                //replaced the code above. this code here makes particles start in random positoni. 

                // baseParticlesTexture.image.data[i4 + 0] = (Math.random() - 0.5) * 10;
                // baseParticlesTexture.image.data[i4 + 1] = (Math.random() - 0.5) * 10;
                // baseParticlesTexture.image.data[i4 + 2] = (Math.random() - 0.5) * 10;

                // Generate random point inside sphere
                // const radius = 8;
                // const u = Math.random();
                // const v = Math.random();
                // const theta = u * 2 * Math.PI;
                // const phi = Math.acos(2 * v - 1);
                // const r = Math.cbrt(Math.random()) * radius;

                // baseParticlesTexture.image.data[i4 + 0] = r * Math.sin(phi) * Math.cos(theta);
                // baseParticlesTexture.image.data[i4 + 1] = r * Math.sin(phi) * Math.sin(theta);
                // baseParticlesTexture.image.data[i4 + 2] = r * Math.cos(phi);



                const spread = 30;
                baseParticlesTexture.image.data[i4 + 0] = (Math.random() + Math.random() - 1) * spread;
                baseParticlesTexture.image.data[i4 + 1] = (Math.random() + Math.random() - 1) * spread;
                baseParticlesTexture.image.data[i4 + 2] = (Math.random() + Math.random() - 1) * spread;


                baseParticlesTexture.image.data[i4 + 3] = Math.random();
            }

            const targetParticlesTexture = gpu.computation.createTexture();
            


            for (let i = 0; i < baseGeometry.count; i++) {
                   const i3 = i * 3;
                   const i4 = i * 4;
          

                targetParticlesTexture.image.data[i4 + 0] = baseGeometry.instance.attributes.position.array[i3];
                targetParticlesTexture.image.data[i4 + 1] = baseGeometry.instance.attributes.position.array[i3 + 1];
                targetParticlesTexture.image.data[i4 + 2] = baseGeometry.instance.attributes.position.array[i3 + 2];
                targetParticlesTexture.image.data[i4 + 3] = Math.random();

                // targetParticlesTexture.image.data[i4 + 0] = position.x;
                // targetParticlesTexture.image.data[i4 + 1] = position.y;
                // targetParticlesTexture.image.data[i4 + 2] = position.z;
                // targetParticlesTexture.image.data[i4 + 3] = Math.random();



            }

            gpu.particlesVariable = gpu.computation.addVariable('uParticlePositionComputation', particleShader, baseParticlesTexture);
            gpu.computation.setVariableDependencies(gpu.particlesVariable, [gpu.particlesVariable]);


            //Uniforms sending into the particle shader to adjust the texture
            gpu.particlesVariable.material.uniforms.uTime = new THREE.Uniform(0.0);
            gpu.particlesVariable.material.uniforms.uBase = new THREE.Uniform(baseParticlesTexture);
            gpu.particlesVariable.material.uniforms.uDeltaTime = new THREE.Uniform(0.0);
            gpu.particlesVariable.material.uniforms.uFlowFieldInfluence = new THREE.Uniform(1);
            gpu.particlesVariable.material.uniforms.uFlowFieldStrength = new THREE.Uniform(50);
            gpu.particlesVariable.material.uniforms.uFlowFieldFrequency = new THREE.Uniform(0.023);
            gpu.particlesVariable.material.uniforms.uMorphProgress = new THREE.Uniform(0.0);
            //gpu.particlesVariable.material.uniforms.uTarget = new THREE.Uniform(0.0);
            gpu.particlesVariable.material.uniforms.uTarget = new THREE.Uniform(targetParticlesTexture);
            gpu.particlesVariable.material.uniforms.uFlowFieldDecreaseInfluence = new THREE.Uniform(0.0);
            


            gpu.computation.init()

            gpu.debug = new THREE.Mesh(
                new THREE.PlaneGeometry(3, 3),
                new THREE.MeshBasicMaterial({
                    map: gpu.computation.getCurrentRenderTarget(gpu.particlesVariable).texture,
                })
            )

            gpu.debug.visible = false; 
            gpu.debug.position.x = 3
            //scene.add(gpu.debug)

            const particles: {
                geometry: THREE.BufferGeometry;
                material: THREE.ShaderMaterial;
                points: THREE.Points;
            } = {} as any;

            // GPU Setup
            const particlesUvArray = new Float32Array(baseGeometry.count * 2);
            const sizesArray = new Float32Array(baseGeometry.count * 2);

            for (let y = 0; y < gpu.size; y++) {
                for (let x = 0; x < gpu.size; x++) {
                    const i = (y * gpu.size + x)
                    const i2 = i * 2

                    // Particles UV
                    const uvX = (x + 0.5) / gpu.size;
                    const uvY = (y + 0.5) / gpu.size;

                    particlesUvArray[i2 + 0] = uvX;
                    particlesUvArray[i2 + 1] = uvY;

                    sizesArray[i] = Math.random();
                }
            }

            particles.geometry = new THREE.BufferGeometry();
            particles.geometry.setDrawRange(0, baseGeometry.count);
            particles.geometry.setAttribute('aParticlesUv', new THREE.BufferAttribute(particlesUvArray, 2));
            particles.geometry.setAttribute('aSize', new THREE.BufferAttribute(sizesArray, 1));

            particles.material = new THREE.ShaderMaterial({
                vertexShader: vertex,
                fragmentShader: fragment,
                uniforms: {
                    uSize: new THREE.Uniform(0.01),
                    uResolution: new THREE.Uniform(new THREE.Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)),
                    uParticlesTexture: new THREE.Uniform(),
                },
                transparent: true,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
            })

            particles.points = new THREE.Points(particles.geometry, particles.material);
            console.log('Adding particles to scene, current scene children:', scene.children.length);

            scene.add(particles.points)


            gui.addColor(debugObject, 'clearColor').onChange(() => renderer.setClearColor(debugObject.clearColor));
            gui.add(particles.material.uniforms.uSize, 'value').min(0).max(1).step(0.001).name('uSize');
            gui.add(gpu.particlesVariable.material.uniforms.uFlowFieldInfluence , 'value').min(0).max(1).step(0.001).name('FlowFieldInfluence');
            gui.add(gpu.particlesVariable.material.uniforms.uFlowFieldStrength , 'value').min(0).max(20).step(0.001).name('FlowFieldStrength');
            gui.add(gpu.particlesVariable.material.uniforms.uFlowFieldFrequency, 'value').min(0).max(1).step(0.001).name('FlowFieldFrequency');
            gui.add(gpu.particlesVariable.material.uniforms.uMorphProgress, 'value').min(0).max(1).step(0.001).name('Morph Progress');
            gui.add(bloomPass, 'strength').min(0).max(3).step(0.01).name('Bloom Strength');
            gui.add(bloomPass, 'radius').min(0).max(1).step(0.01).name('Bloom Radius');
            gui.add(bloomPass, 'threshold').min(0).max(1).step(0.01).name('Bloom Threshold');
            gui.add(renderer, 'toneMappingExposure').min(0).max(3).step(0.01).name('Exposure');

            const clock = new THREE.Clock();
            let previousTime = 0;

            

            console.log('Text geometry:', textGeometry);
            console.log('Scene children:', scene.children);


            const easeInFunction = (t) => Math.pow(t, 2.0)


            const tick = () => {
                const elapsedTime = clock.getElapsedTime();
                const deltaTime = elapsedTime - previousTime;
                previousTime = elapsedTime;

                //initialize particle morphing
                const morphStart = 4.0;
                const morphDuration = 6.0;
                const morphProgress= Math.min(Math.max((elapsedTime - morphStart) / morphDuration, 0.0), 1.0);

                const easeInProgress = Math.pow(morphProgress, 16.0);
                
                gpu.particlesVariable.material.uniforms.uMorphProgress.value = easeInProgress;


                //Camera Timing Logic
                const zoomStart = 4.0;       // Camera zoom starts at 6 seconds
                const zoomDuration = 6.0;    // Camera zoom lasts 4 seconds (ends at 10s)
                const rawZoomProgress = (elapsedTime - zoomStart) / zoomDuration;
                const zoomProgress = Math.min(Math.max(rawZoomProgress, 0.0), 1.0); // Clamp to 0–1
                const zoomEase = easeInFunction(zoomProgress);


                //initalize camera zoom from 16 to 8 
                const startZPosition = 50;
                const endZPosition = 6;
                camera.position.z = startZPosition + (endZPosition - startZPosition) * zoomEase;

                //initalize field of view change to dramatize zoom in
                const startFOV = 80;
                const endFOV = 20;
                camera.fov = startFOV + (endFOV - startFOV) * zoomEase;
                camera.updateProjectionMatrix();
            
                //const currentZPosition = startZPosition + (endZPosition - startZPosition) * morphProgress;
                //camera.position.z = currentZPosition;
            
                

            
                //camera.fov = startFOV + (endFOV - startFOV) * morphProgress;
                camera.updateProjectionMatrix(); 


    
                controls.update();

                // GPGPU update
                gpu.particlesVariable.material.uniforms.uDeltaTime.value = deltaTime;
                gpu.particlesVariable.material.uniforms.uTime.value = elapsedTime;
                gpu.computation.compute();

                particles.material.uniforms.uParticlesTexture.value = gpu.computation.getCurrentRenderTarget(gpu.particlesVariable).texture;

                //updated background time 
                backgroundMaterial.uniforms.u_time.value = elapsedTime;
                // Render normal scene
                //renderer.render(scene, camera);
                //Render with post-processing bloom and HDR
                composer.render();

                // Call tick again at next frame
                requestAnimationFrame(tick);
            }

            // Resize handler (moved inside async function to access particles)
            const handleResize = () => {
                sizes.width = window.innerWidth
                sizes.height = window.innerHeight
                sizes.pixelRatio = Math.min(window.devicePixelRatio, 2)

                camera.aspect = sizes.width / sizes.height
                camera.updateProjectionMatrix()

                renderer.setSize(sizes.width, sizes.height)
                renderer.setPixelRatio(sizes.pixelRatio)

                composer.setSize(sizes.width, sizes.height);

                particles.material.uniforms.uResolution.value.set(
                    sizes.width * sizes.pixelRatio,
                    sizes.height * sizes.pixelRatio
                )

            }
            window.addEventListener('resize', handleResize)

            tick();
            
        }

        window.addEventListener('mousemove', (event) => {
            backgroundMaterial.uniforms.u_mouse.value.x = event.clientX / sizes.width;
            backgroundMaterial.uniforms.u_mouse.value.y = 1.0 - (event.clientY / sizes.height);
        });


        // Call the async function
        initWithModel()

        return () => {
            window.removeEventListener('resize', () => {}),
            window.removeEventListener('mousemove', () => {})
        }
    }, [])

    return (
        <div className="m-0 overflow-hidden">
            <canvas ref={canvasRef} className="webgl w-full h-full block" />
        </div>
    )
}