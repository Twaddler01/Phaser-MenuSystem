import EmptyObj from './EmptyObj.js';
import { scene } from './sceneManager.js';

export default class RectObj extends EmptyObj {
    constructor(config = {}) {
        super(config);
        this.bgColor = config.bgColor ?? 0x0000ff;
        this.x = config.x ?? 0;
        this.y = config.y ?? 0;
        this.width = config.width;
        this.height = config.height;
        
        const rect = scene.add.rectangle(this.x, this.y, this.width - this.x, this.height, this.bgColor).setOrigin(0);

        this.container.add(rect);
    }

    render(scene) {
        return this.container;
    }
}