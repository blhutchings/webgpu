import { App } from "./App";


export type AppConfig = {
    label: string;
    gpu: GPU;
    adapter: GPUAdapter;
    device: GPUDevice;
    canvas: HTMLCanvasElement;
    context: GPUCanvasContext;
}

export class AppBuilder<T extends App> {
    constructor(private config: AppConfig) { }

    async build(AppClass: new (config: AppConfig) => T): Promise<T> {
        Object.freeze(this.config);
        return new AppClass(this.config); // Instantiate using the passed class
    }

    static async start<T extends App>(label: string) {
        return new WebGPUStateCanvas<T>({
            label: label,
            gpu: navigator.gpu,
            adapter: undefined,
            device: undefined,
            canvas: undefined,
            context: undefined
        })
    }
}

export class WebGPUStateCanvas<T extends App> {
    constructor(private state: { label: string, gpu: GPU; adapter: undefined; device: undefined; canvas: undefined; context: undefined; }) { }
    async selectCanvas(selector: string) {
        const canvas = document.querySelector<HTMLCanvasElement>(selector)
        if (!canvas || !(canvas instanceof HTMLCanvasElement)) throw Error("Canvas not found.");
        return new WebGPUStateAdapter<T>({ ...this.state, canvas: canvas })
    }
    async getCanvasById(selector: string) {
        const canvas = document.getElementById(selector) as HTMLCanvasElement
        if (!canvas || !(canvas instanceof HTMLCanvasElement)) throw Error("Canvas not found.");
        return new WebGPUStateAdapter<T>({ ...this.state, canvas: canvas })
    }
}

export class WebGPUStateAdapter<T extends App> {
    constructor(private state: { label: string, gpu: GPU; canvas: HTMLCanvasElement; adapter: undefined; device: undefined; context: undefined; }) { }
    async getAdapter(options?: GPURequestAdapterOptions) {
        const adapter = await navigator?.gpu.requestAdapter(options);
        if (!adapter) throw new Error("GPUAdapter is null")
        return new WebGPUStateDevice<T>({ ...this.state, adapter: adapter })
    }
}

export class WebGPUStateDevice<T extends App> {
    constructor(private state: { label: string, gpu: GPU; adapter: GPUAdapter; canvas: HTMLCanvasElement; device: undefined; context: undefined; }) { }
    async getDevice(descriptor?: GPUDeviceDescriptor) {
        const device = await this.state.adapter?.requestDevice(descriptor)
        if (!device) throw Error("WebGPU not supported.");
        return new WebGPUStateContext<T>({ ...this.state, device: device })
    }
}

export class WebGPUStateContext<T extends App> {
    constructor(private state: { label: string, device: GPUDevice; adapter: GPUAdapter; canvas: HTMLCanvasElement; gpu: GPU; context: undefined; }) { }
    async getContext() {
        const context = this.state.canvas?.getContext('webgpu');
        if (!context) throw Error("WebGPU not supported.");
        return new AppBuilder<T>({ ...this.state, context: context })
    }
}

