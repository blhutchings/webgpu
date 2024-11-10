import { AppBuilder } from "./engine/AppBuilder"
import {App} from "./engine/App.ts";

export class MyApp extends App {
    render(): void {
    }

    run(): void {
    }

    update(): void {
    }

}

async function main() {

    const app = await AppBuilder.start<MyApp>('Cube')
        .then(app => app.selectCanvas('#gpu'))
        .then(app => app.getAdapter())
        .then(app => app.getDevice())
        .then(app => app.getContext())
        .then(app => app.build(MyApp))
    
    app.run()

}
main()
