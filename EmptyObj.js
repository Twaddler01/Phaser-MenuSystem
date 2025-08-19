import { scene } from './sceneManager.js';

let contentId = 1;

export default class EmptyObj {
    constructor(config = {}) {
        this.parentMenu = config.parentMenu;
        this.width = config.width;
        this.itemHeight = config.itemHeight;
        this.bgColor = config.bgColor;
        this.noBg = config.noBg || false;

        this.container = scene.add.container(0, 0);

        this.bg = scene.add.rectangle(0, 0, this.width, this.itemHeight, this.bgColor).setOrigin(0);
        this.container.add(this.bg);
    
        this.id = 'content_' + contentId;
        contentId++;

        if (config.onClick && !this.noBg) {
            this.bg.setInteractive({ useHandCursor: true });
            this.bg.on('pointerdown', () => config.onClick(this));
        }

        // Hide if an overlsy
        if (this.noBg) {
            this.bg.setFillStyle(0x000000, 0);   // invisible
        }
    }

    render() {
        this.bg.width = this.width;
        this.bg.height = this.itemHeight;
        return this.container;
    }
}