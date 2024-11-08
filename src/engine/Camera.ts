import { mat4, vec3 } from "wgpu-matrix";


export class Camera {
    
    position = vec3.create(0, 0, 0)
    fov = mat4.perspective(60, 16/9, 0.1, 1000)


    getViewMatrix() {
        return mat4.lookAt(this.position, vec3.create(0,0,-1), vec3.create(0,0,1))
    }

    get projection() {
        return this.fov;
    }



}