import { scene } from './sceneManager.js';

let contentId = 1;

export default class EmptyObj {
    constructor(config = {}) {
        this.parentMenu = config.parentMenu;
        this.width = config.width;
        this.itemHeight = config.itemHeight;
        this.bgColor = config.bgColor;

        this.container = scene.add.container(0, 0);

        this.bg = scene.add.rectangle(0, 0, this.width, this.itemHeight, this.bgColor).setOrigin(0);
        this.container.add(this.bg);
        this.id = 'content_' + contentId;
        contentId++;

        if (config.onClick) {
            this.bg.setInteractive({ useHandCursor: true });
            this.bg.on('pointerdown', () => config.onClick(this));
        }
    }

    render() {
        this.bg.width = this.width;
        this.bg.height = this.itemHeight;
        return this.container;
    }
}