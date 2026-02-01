'use client'

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from 'react';


const CardReveal = ({ shouldAnimate = false}) => {

    //Create function to generate clip paths for each grid cell
    const generateClipPaths = (type: string)=>  {
        //creates a 5x5 grid
        const gridSize = 6;
        const step = 100 / gridSize; //Each cell is 20 percent of width in size 
        const paths = [];

        // to avoid visual gaps in images
        const overlap = 0.1;
        
        //loop over each row and column in grid to define 25 clip paths (5x5)
        for (let row = 0; row < gridSize; row++) {
            for (let col=0; col< gridSize; col++) {
                //calculate the top-left (x1, y1) and bottom-right (x2, y2) coordinates of each grid cell in percentage
                const x1 = col* step - overlap;
                const y1 = row* step - overlap;
                const x2 = (col + 1) * step;
                const y2 = (row + 1) * step;



                if(type === 'visible'){
                    paths.push(
                        //first cell clip-path: polygon(0% 0%, 20% 0%, 20% 20%, 0% 20%); 
                        `polygon(${x1}% ${y1}%, ${x2}% ${y1}%, ${x2}% ${y2}%, ${x1}% ${y2}%)`
                    );
                } else {
                    paths.push(
                        //first cell clip-path: polygon(0% 0%, 20% 0%, 20% 20%, 0% 20%); 
                        `polygon(${x1}% ${y1}%, ${x1}% ${y1}%, ${x1}% ${y1}%, ${x1}% ${y1}%)`
                    );
                }

            }
        }

        return paths;
    }

    const hiddenClipPaths = generateClipPaths("hidden");
    const visibleClipPaths = generateClipPaths("visible");

    const randomOrder = [
        [".mask0"],
        [".mask1", ".mask6"],
        [".mask2", ".mask7", ".mask12"],
        [".mask3", ".mask8", ".mask13", ".mask18"],
        [".mask4", ".mask9", ".mask14", ".mask19", ".mask24"],
        [".mask5", ".mask10", ".mask15", ".mask20", ".mask25", ".mask30"],
        [".mask11", ".mask16", ".mask21", ".mask26", ".mask31"],
        [".mask17", ".mask22", ".mask27", ".mask32"],
        [".mask23", ".mask28", ".mask33"],
        [".mask29", ".mask34"],
        [".mask35"]
    ]
    
    useEffect(() => {
    if (!shouldAnimate) return;
    
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray<Element>(".image").forEach((image) => {
        const masks = image.querySelectorAll(".mask")

        masks.forEach((mask: Element, index: number)=> {
            gsap.set(mask, {
                clipPath: hiddenClipPaths[index],
            })
        
            let t1 = gsap.timeline();
            t1.to(masks, {
                clipPath: (i, el)=> visibleClipPaths[i],
                duration: 0.5, 
                ease: "power2.out",
                stagger: 0.1,
            })

            randomOrder.forEach((group, groupIndex)=> {
                const maskElements = group.map((cls) => image.querySelector(cls))

                t1.to(maskElements , {
                    clipPath: (i,el) => {
                         const maskIndex = Array.from(masks).indexOf(el)
                         return visibleClipPaths[maskIndex]
                    },
                    duration: .5,
                    delay: .1,
                    ease: "power2.out",
                    stagger: 0.1,
                },
                groupIndex *0.125
                );
            })
        });
    });
}, [shouldAnimate]);

    return (

        //Create funciton to generate clip paths for each grid cell
                <div className="image h-full w-full overflow-hidden relative rounded-3xl"> 
                    {[...Array(36)].map((_,j) =>(
                        <div 
                            key={j} 
                            className={`
                                h-full 
                                w-full 
                                mask mask${j}
                                absolute 
                                top-0 
                                left-0 
                                backdrop-blur-md 
                                border border-1-gray-300
                                bg-gray-800/12
                                inset-shadow-gray-400
                                `}
                        ></div>
                    ))}  
                </div>
    )
}
export default CardReveal;