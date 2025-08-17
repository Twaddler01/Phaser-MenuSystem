import { scene } from './sceneManager.js';

export default class EmptyObj {
    constructor(config = {}) {
        this.parentMenu = config.parentMenu || 'default';
        this.width = config.width || 200;
        this.height = config.height || 40; // default row height
        this.itemHeight = config.itemHeight || this.height;
        this.bgColor = config.bgColor || 0x666666;

        this.container = scene.add.container(0, 0);

        // Background rectangle
        this.bg = scene.add.rectangle(0, 0, this.width, this.itemHeight, this.bgColor).setOrigin(0);
        this.container.add(this.bg);

        // Optional click
        if (config.onClick) {
            this.bg.setInteractive({ useHandCursor: true });
            this.bg.on('pointerdown', () => config.onClick(this));
        }

        // Register with MenuSystem
        if (EmptyObj.menuSystem) {
            EmptyObj.menuSystem.addItemToMenu(this);
        }
    }

    render(scene) {
        // Ensure container has correct itemHeight
        this.bg.height = this.itemHeight;
        return this.container;
    }
}