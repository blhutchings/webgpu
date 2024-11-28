import { AppBuilder } from "./engine/AppBuilder"
import {App} from "./engine/App.ts";

import { Boid } from "./Boid.ts";

export class BoidCluster extends App {

    update(deltaTime: number): void {
        for (let obj of this.renderables) {
            obj.update(deltaTime);
        }
    }

    render(): void {
        for (let obj of this.renderables) {
            obj.render();
        }
    }


}

async function main() {

    const app = await AppBuilder.start<BoidCluster>('Cube')
        .then(app => app.selectCanvas('#gpu'))
        .then(app => app.getAdapter())
        .then(app => app.getDevice())
        .then(app => app.getContext())
        .then(app => app.build(BoidCluster))
    



    Boid.init(app)
    app.addRenderable(0, new Boid());
    app.run()
    // Object pool
    // add boid to pool
    // each loop will call each objects update
    // Add object to render queue,
    // Call queue

}
main()
