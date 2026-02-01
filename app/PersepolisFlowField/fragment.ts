// export const fragment = `

// varying vec3 vColor;

// void main () {

//     vec2 uv = gl_PointCoord;
    
//     vec3 color = vec3(uv.x, uv.y, 1.0);


   
//     //vec3 color = vec3(0.8, 0.65, 0.2);
//     //vec3 color = vec3(0.545, 0.435, 0.278);

    
//     //vec3 color = vec3(0.77, 0.12, 0.23);

//     //vec3 color = vec3(0.70, 0.29, 0.24);

//     //vec3 color = vec3(0.961, 0.949, 0.878);
   
 
//     gl_FragColor = vec4(color, 1.0);
// }
// `


export const fragment = `
varying vec3 vColor;

void main () {
    vec2 uv = gl_PointCoord;
    
    // Distance from center for soft circular particles
    float dist = length(uv - 0.5);
    
    // Discard outside circle
    if (dist > 0.5) discard;
    
    // Soft falloff
    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    
    // HDR color - VALUES ABOVE 1.0 IS THE KEY
    //vec3 color = vec3(2.5, 1.2, 3.5); // electric purple
    vec3 color = vec3(uv.x, uv.y, 2.0) * 2.0;
    //vec3 color = vec3(0.3, 0.9, 0.5) * 1.4;
    //vec3 color = vec3(0.6, 0.5, 0.3) * 2.0;

    gl_FragColor = vec4(color, alpha);
}
`