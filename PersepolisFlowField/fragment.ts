export const fragment = `

varying vec3 vColor;

void main () {

    vec2 uv = gl_PointCoord;
    
    vec3 color = vec3(uv.x, uv.y, 1.0);


   
    //vec3 color = vec3(0.8, 0.65, 0.2);
    //vec3 color = vec3(0.545, 0.435, 0.278);

    
    //vec3 color = vec3(0.77, 0.12, 0.23);

    //vec3 color = vec3(0.70, 0.29, 0.24);

    //vec3 color = vec3(0.961, 0.949, 0.878);
   
 
    gl_FragColor = vec4(color, 1.0);
}
`