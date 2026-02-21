uniform float uSize;
uniform vec2 uMouse;
uniform float uDistortionRadius;
uniform float uDistortionStrength;
uniform float uTime;
uniform vec2 uResolution;

void main() {
  vec3 pos = position;
  
  // Calculate distance from mouse to particle
  vec2 particlePos = pos.xy;
  float dist = distance(particlePos, uMouse);
  
  // Apply distortion only within radius
  if (dist < uDistortionRadius) {
    float factor = 1.0 - (dist / uDistortionRadius); // Stronger near cursor
    vec2 direction = normalize(particlePos - uMouse);
    
    // Displacement with wave animation
    float displacement = factor * uDistortionStrength;
    float wave = sin(dist * 0.1 - uTime * 2.0) * 0.5 + 0.5;
    
    pos.xy += direction * displacement * wave;
  }
  
  // Standard particle size calculation
  vec4 modelPosition = modelViewMatrix * vec4(pos, 1.0);
  vec4 viewPosition = projectionMatrix * modelPosition;
  gl_Position = viewPosition;
  
  gl_PointSize = uSize;
  gl_PointSize *= (1.0 / -viewPosition.z);
}
