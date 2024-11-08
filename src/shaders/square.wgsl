@binding(0) @group(0) var<uniform> frame : u32;

@vertex
fn vertex_main(
    @builtin(vertex_index) vertex_index : u32
) -> @builtin(position) vec4f 
{
  const pos = array(
    vec2( 0.0,  0.5),
    vec2(-0.5, -0.5),
    vec2( 0.5, -0.5)
  );

  return vec4f(pos[vertex_index], 0, 1);
}

@fragment
fn fragment_main(
    
) -> @location(0) vec4<f32>
{
    return vec4(sin(f32(frame) / 128), sin(f32(frame) / 128), cos(f32(frame) / 128), 1);
}