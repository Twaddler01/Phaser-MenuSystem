import EmptyObj from './EmptyObj.js';

export default class RectObj extends EmptyObj {
    constructor(parentMenu, options = {}) {
        super(parentMenu, options);
    }

    render(scene, x, y) {
        const rect = scene.add.rectangle(x, y, this.width - x, this.height, this.bgColor).setOrigin(0);

        // Click handler for rectangle
        this.makeInteractive(rect);

        EmptyObj.menuSystem.container.add(rect);
    }
}