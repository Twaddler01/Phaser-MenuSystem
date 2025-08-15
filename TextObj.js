import EmptyObj from './EmptyObj.js';

export default class TextObj extends EmptyObj {
    constructor(parentMenu, options = {}) {
        super(parentMenu, options);
        this.text = options.text ?? '';
        this.color = options.color ?? '#ffffff';
    }

    render(scene, x, y) {
        const bg = scene.add.rectangle(x, y, this.width - x, this.height, this.bgColor).setOrigin(0);
        const txt = scene.add.text(x + 10, y + this.height / 2, this.text, {
            fontSize: '16px',
            color: this.color
        }).setOrigin(0, 0.5);

        // Click handler for background
        this.makeInteractive(bg);

        EmptyObj.menuSystem.container.add([bg, txt]);
    }
}