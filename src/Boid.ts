import { vec3 } from "wgpu-matrix";


export class Boid {
    private position: Float32Array = vec3.create(0, 0, 0)
    private direction: Float32Array = vec3.create(1, 0, 0)
    private speed: number = 1;
    private perceptionRadius = 1;

    nextPosition(deltaTime: number) {
        vec3.add(this.position, (vec3.mulScalar(this.direction, this.speed * deltaTime, this.direction)), this.position)
    }
}

