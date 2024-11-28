import { IRenderable } from "../Boid";
import { AppConfig } from "./AppBuilder";

export abstract class App {
    private animationId?: number;
    gpu: GPU;
    adapter: GPUAdapter;
    device: GPUDevice;
    canvas: HTMLCanvasElement;
    context: GPUCanvasContext;

    private renderablesMap: Map<number, IRenderable>= new Map();
    protected get renderables() {
        return this.renderablesMap.values();
    }

    constructor(config: AppConfig) {
        this.gpu = config.gpu;
        this.adapter = config.adapter;
        this.device = config.device;
        this.canvas = config.canvas;
        this.context = config.context;
    }

    run() {
        let lastTime: number | undefined = undefined
        const animate = (currentTime: number) => {
            if (lastTime === undefined) {
                lastTime = currentTime
            }

            const deltaTime = currentTime - lastTime

            this.update(deltaTime);
            this.render();

            this.animationId = requestAnimationFrame(animate)
        }

        this.animationId = requestAnimationFrame(animate)
    }

    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }

    abstract update(deltaTime: number) : void
    abstract render() : void

    addRenderable(id: number, renderable: IRenderable) {
        this.renderablesMap.set(id, renderable);
    }
}