
import {simplexNoise4d} from './simplexNoise4d';

export const particleShader = `
${simplexNoise4d}

uniform float uTime;
uniform sampler2D uBase;
uniform float uDeltaTime;
uniform float uFlowFieldInfluence;
uniform float uFlowFieldStrength;
uniform float uFlowFieldFrequency;
uniform float uMorphProgress;
uniform sampler2D uTarget;
uniform float uFlowFieldDecreaseInfluence;


void main () {

    float time = uTime * 0.2;
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 particle = texture2D(uParticlePositionComputation, uv);
    vec4 base = texture(uBase, uv);
    vec4 target = texture2D(uTarget, uv);


    //Particle Lifespan. check to see if particle is dead (has  a value bigger than 1) return to original position. 
    if(particle.a >= 1.0)
    {
        particle.a = mod(particle.a, 1.0);
        
        //option 1 for loading. when i use option 2 i can't use the particle.xyz line and when i use option 2 can't
        //use the two lines below with vec3 morphedBase and particle.xyz = morphedBase;
        particle.xyz = base.xyz;

        //option 2 for loading
         //vec3 morphedBase = mix(base.xyz, target.xyz, uMorphProgress);
         //particle.xyz = morphedBase;
    }

    //Flow Field
    else //if particle a value is not bigger than 1 apply flow field
    {
        //strength variable to control the flowfield
        float strength = snoise(vec4(base.xyz * 0.2, time + 1.0));
        float influence = (uFlowFieldInfluence - 0.5) * (-2.0);
        strength = smoothstep(influence , 1.0, strength);

        vec3 flowField = vec3(
            snoise(vec4(particle.xyz * uFlowFieldFrequency, time)),
            snoise(vec4(particle.xyz * uFlowFieldFrequency + 1.0, time)),
            snoise(vec4(particle.xyz * uFlowFieldFrequency + 2.0, time))
        );
    
        flowField = normalize(flowField);
        particle.xyz += flowField * uDeltaTime * strength * uFlowFieldStrength; //controls particle decay speed
        particle.a += uDeltaTime * 0.5;

    }

    particle.xyz = mix(particle.xyz, target.xyz, uMorphProgress);

    gl_FragColor = particle;


}
`