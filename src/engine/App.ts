import { AppConfig } from "./AppBuilder";

export class App {
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

    run(): void

    update() : void

    render() : void
}