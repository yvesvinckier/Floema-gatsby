import React, { useRef, useMemo } from "react";
import { getSrc } from "gatsby-plugin-image";
import { useTexture } from "@react-three/drei";

const Media = ({ element }) => {
  const mesh = useRef();

  const texture = getSrc(element);
  const tex = useTexture(texture);
  // console.log(texture, tex);

  const shaderArgs = useMemo(
    () => ({
      uniforms: {
        uTexture: { value: tex },
      },
      vertexShader: /* glsl */ `
      varying vec2 vUv;

      void main(){
          vUv = uv;
          vec3 pos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
      }
      `,
      fragmentShader: /* glsl */ `
      uniform sampler2D uTexture;

      varying vec2 vUv;

      void main() {
          vec3 texture = texture2D(uTexture, vUv).rgb;
          gl_FragColor = vec4(texture, 1.0);
      }
      `,
    }),
    [tex]
  );

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[1, 1, 20, 20]} />
      <shaderMaterial args={[shaderArgs]} />
    </mesh>
  );
};

export default Media;
