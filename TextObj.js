import EmptyObj from './EmptyObj.js';
import { scene } from './sceneManager.js';

export default class TextObj extends EmptyObj {
    constructor(config = {}) {
        super(config);
        this.text = config.text ?? '';
        this.color = config.color ?? '#ffffff';
        this.x = config.x ?? 0;
        
        const txt = scene.add.text(this.x + 10, this.itemHeight / 2, this.text, {
            fontSize: '16px',
            color: this.color
        }).setOrigin(0, 0.5);
        
        this.container.add(txt);
    }

    render(scene) {
        return this.container;
    }
}