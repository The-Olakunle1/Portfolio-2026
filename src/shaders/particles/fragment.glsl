void main() {
  // Calculate distance from center for circular particles
  vec2 center = gl_PointCoord - vec2(0.5);
  float dist = length(center);
  
  // Create circular particle with smooth edges
  float alpha = smoothstep(0.5, 0.2, dist);
  
  // Pure black color
  gl_FragColor = vec4(0.0, 0.0, 0.0, alpha);
}
