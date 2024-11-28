import { IRenderable } from "../Boid";
import { App } from "./App";


export class RenderPassQueue {
    constructor(
        private label: string,
        private app: App,
    ) {}

    private queue: IRenderable[] = [];
    push(renderable: IRenderable) {
        this.queue.push(renderable)
    }

    draw() {
        const renderPassDescriptor: GPURenderPassDescriptor = {
            label: 'our basic canvas renderPass',
            colorAttachments: [
              {
                view: this.app.context.getCurrentTexture().createView(),
                clearValue: [0.3, 0.3, 0.3, 1],
                loadOp: 'clear',
                storeOp: 'store',
              },
            ],
            
          };

        const encoder = this.app.device.createCommandEncoder({ label: this.label });
        const pass = encoder.beginRenderPass(renderPassDescriptor);
 
        let previousClass: unknown | undefined;

        for (let obj of this.queue) {
            if (previousClass == typeof obj && previousClass === undefined) {
                pass.setPipeline(Object.getPrototypeOf(obj).pipeline);
            }

            Object.getPrototypeOf(obj).constructor.draw(pass);

            previousClass = typeof obj;
        }
        pass.end();

        const commandBuffer = encoder.finish();
        this.app.device.queue.submit([commandBuffer]);
    }
}
