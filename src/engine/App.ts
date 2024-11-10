import { AppConfig } from "./AppBuilder";

export abstract class App {
    gpu: GPU;
    adapter: GPUAdapter;
    device: GPUDevice;
    canvas: HTMLCanvasElement;
    context: GPUCanvasContext;

    constructor(config: AppConfig) {
        this.gpu = config.gpu;
        this.adapter = config.adapter;
        this.device = config.device;
        this.canvas = config.canvas;
        this.context = config.context;
    }

    abstract run(): void

    abstract update() : void

    abstract render() : void
}