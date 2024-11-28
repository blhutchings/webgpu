import { vec2, vec2d, Vec3, vec3 } from "wgpu-matrix";
import { App } from "./engine/App";
import boidShader   from "./shaders/boid.wgsl?raw";



export class BoidVertex {
    static readonly position = vec2.create(0, 0);
    static readonly color = vec3.create(255, 255, 255);

    static getSizeBytes() {
        return this.position.BYTES_PER_ELEMENT + this.color.BYTES_PER_ELEMENT;
    }
} 

export abstract class IRenderable {
    static buffer: GPUBuffer
    static pipeline: GPURenderPipeline; 
    abstract render(): void;
    static draw(pass: GPURenderPassEncoder) {}
    abstract update(deltaTime: number): void;
}

function createBoidMesh(x: number, y: number, z: number) {
    return [
        {0, 0.5, 0}, // tip
        {}, // Base Triangle Top
        {}, // Base Triangle Bottom Left
        {} // Base Triangle Bottom Right
    ]
}


export class Boid extends IRenderable {
    static buffer: GPUBuffer;
    static pipeline: GPURenderPipeline;

    private position: Float32Array = vec2.create(0, 0)
    private direction: Float32Array = vec2.create(1, 0)
    private speed: number = 1;

    static init(app: App) {
        this.buffer = app.device.createBuffer({
            size: BoidVertex.getSizeBytes() * 3,
            label: "Boid Definition",
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
        });

        app.device.queue.writeBuffer()

        const shader = app.device.createShaderModule({
            label: 'Boid Shader',
            code: boidShader
        });

        this.pipeline = app.device.createRenderPipeline({
            label: 'Boid Render Pipeline',
            layout: 'auto',
            vertex: {
                entryPoint: "vertex_main",
                module: shader,
            },
            fragment: {
                entryPoint: "fragment_main",
                module: shader,
                targets: [{ format: app.gpu.getPreferredCanvasFormat() }],
    
            }
        })
        return app.device.createCommandEncoder({ label: 'Boid' });
    }

    createCommandEncoder(app: App) {
        return app.device.createCommandEncoder({ label: 'Boid' });
    }
    
    update(deltaTime: number): void {
        vec3.add(this.position, (vec3.mulScalar(this.direction, this.speed * deltaTime, this.direction)), this.position)
    }

    render() {

    };

    static draw(pass: GPURenderPassEncoder): void {
        pass.draw(3);
    }
}

