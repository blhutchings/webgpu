import { AppBuilder } from "./engine/AppBuilder"

async function main() {

    const app = await AppBuilder.start('Cube')
        .then(app => app.selectCanvas('#gpu'))
        .then(app => app.getAdapter())
        .then(app => app.getDevice())
        .then(app => app.getContext())
        .then(app => app.build())
        .catch(err => console.error(err))
    
    app.start(60)

}
main()
