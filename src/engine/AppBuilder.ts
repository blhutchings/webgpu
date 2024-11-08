import { App } from "./App";


export type AppConfig = {
    label: string;
    gpu: GPU;
    adapter: GPUAdapter;
    device: GPUDevice;
    canvas: HTMLCanvasElement;
    context: GPUCanvasContext;
}

export class AppBuilder {
    constructor(private config: AppConfig) { }
    async build(): Promise<App> {
        Object.freeze(this.config);
        return new App(this.config)
    }

    static async start(label: string) {
        return new WebGPUStateCanvas({
            label: label,
            gpu: navigator.gpu,
            adapter: undefined,
            device: undefined,
            canvas: undefined,
            context: undefined
        })
    }
}

export class WebGPUStateCanvas {
    constructor(private state: { label: string, gpu: GPU; adapter: undefined; device: undefined; canvas: undefined; context: undefined; }) { }
    async selectCanvas(selector: string) {
        const canvas = document.querySelector<HTMLCanvasElement>(selector)
        if (!canvas || !(canvas instanceof HTMLCanvasElement)) throw Error("Canvas not found.");
        return new WebGPUStateAdapter({ ...this.state, canvas: canvas })
    }
    async getCanvasById(selector: string) {
        const canvas = document.getElementById(selector) as HTMLCanvasElement
        if (!canvas || !(canvas instanceof HTMLCanvasElement)) throw Error("Canvas not found.");
        return new WebGPUStateAdapter({ ...this.state, canvas: canvas })
    }
}

export class WebGPUStateAdapter {
    constructor(private state: { label: string, gpu: GPU; canvas: HTMLCanvasElement; adapter: undefined; device: undefined; context: undefined; }) { }
    async getAdapter(options?: GPURequestAdapterOptions) {
        const adapter = await navigator?.gpu.requestAdapter(options);
        if (!adapter) throw new Error("GPUAdapter is null")
        return new WebGPUStateDevice({ ...this.state, adapter: adapter })
    }
}

export class WebGPUStateDevice {
    constructor(private state: { label: string, gpu: GPU; adapter: GPUAdapter; canvas: HTMLCanvasElement; device: undefined; context: undefined; }) { }
    async getDevice(descriptor?: GPUDeviceDescriptor) {
        const device = await this.state.adapter?.requestDevice(descriptor)
        if (!device) throw Error("WebGPU not supported.");
        return new WebGPUStateContext({ ...this.state, device: device })
    }
}

export class WebGPUStateContext {
    constructor(private state: { label: string, device: GPUDevice; adapter: GPUAdapter; canvas: HTMLCanvasElement; gpu: GPU; context: undefined; }) { }
    async getContext() {
        const context = this.state.canvas?.getContext('webgpu');
        if (!context) throw Error("WebGPU not supported.");
        return new AppBuilder({ ...this.state, context: context })
    }
}

