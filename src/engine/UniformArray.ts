



export type UniformContainer = {
    binding?: number,
    values: Uint32Array
    descriptor: GPUBuffer
}

export class UniformArray {
    private entries = new Map<number,UniformContainer>()

    constructor(private device: GPUDevice) {}

    addUniform(values: Uint32Array, binding: number = this.entries.size) {
        Object.freeze(values);
        const bufferDescription = this.device.createBuffer({
            size: values.BYTES_PER_ELEMENT,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
        })
        if (this.entries.has(binding)) {
            throw new Error(`Uniform binding ${binding} is already bound`)
        }
        this.entries.set(this.entries.size, {values, descriptor: bufferDescription})
    }

    write() {
        this.entries.forEach((uniform) => {
            this.device.queue.writeBuffer(uniform.descriptor, 0, uniform.values)
        })
    }
} 