/* Reuse the atlas's relief pixels at every resolution; only the Earth material
   gets this palette. Beer photos, plant meshes and picking remain untouched. */
export function applyAppleGlobePalette(material){
 const previousCompile=material.onBeforeCompile;
 const previousCacheKey=material.customProgramCacheKey.call(material);
 material.onBeforeCompile=function(shader,renderer){
  previousCompile.call(this,shader,renderer);
  shader.fragmentShader=shader.fragmentShader.replace('#include <map_fragment>',`
   #include <map_fragment>
   #ifdef USE_MAP
    // The bundled atlas uses a blue ocean and green/sand relief. Work in the
    // texture's decoded linear color space without a second texture download.
    float atlasLight = dot(diffuseColor.rgb, vec3(0.2126, 0.7152, 0.0722));
    float atlasOcean = smoothstep(0.004, 0.020, diffuseColor.b - diffuseColor.g)
      * (1.0 - smoothstep(0.12, 0.18, atlasLight));
    vec3 atlasLand = mix(diffuseColor.rgb * 1.20, vec3(0.61, 0.64, 0.52), 0.31);
    vec3 atlasWater = mix(vec3(0.22, 0.36, 0.46), vec3(0.29, 0.43, 0.52),
      smoothstep(0.015, 0.080, atlasLight));
    diffuseColor.rgb = mix(atlasLand, atlasWater, atlasOcean);
   #endif
  `);
 };
 material.customProgramCacheKey=()=>`${previousCacheKey}|apple-atlas-palette-v1`;
 material.needsUpdate=true;
 return material;
}
