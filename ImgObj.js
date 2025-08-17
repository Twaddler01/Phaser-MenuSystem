import EmptyObj from './EmptyObj.js';
import { scene } from './sceneManager.js';

export default class ImgObj extends EmptyObj {
    constructor(config = {}) {
        super(config);

        this.imageKey = config.imageKey || null;
        this.stretch = config.stretch || null;
        this.fixed = config.fixed || null;

        if (this.imageKey) {
            this.img = scene.add.image(0, 0, this.imageKey).setOrigin(0, 0);

            const origWidth = this.img.width;
            const origHeight = this.img.height;

            // Determine image size
            if (this.fixed) {
                if (this.fixed.width) {
                    this.img.displayWidth = Math.min(this.fixed.width, this.width);
                    this.img.displayHeight = this.img.displayWidth * (origHeight / origWidth);
                } else if (this.fixed.height) {
                    this.img.displayHeight = this.fixed.height;
                    this.img.displayWidth = this.img.displayHeight * (origWidth / origHeight);
                }
            } else if (this.stretch) {
                if (this.stretch.width) this.img.displayWidth = Math.min(this.stretch.width, this.width);
                if (this.stretch.height) this.img.displayHeight = this.stretch.height;
            } else if (config.height) {
                this.img.displayHeight = config.height;
                this.img.displayWidth = this.img.displayHeight * (origWidth / origHeight);
            } else {
                this.img.displayHeight = this.itemHeight;
                this.img.scaleX = this.img.scaleY;
            }

            // Ensure image width never exceeds menu width
            if (this.img.displayWidth > this.width) this.img.displayWidth = this.width;

            // Rectangle height = final image height
            this.itemHeight = this.img.displayHeight;

            this.container.add(this.img);
        }
    }

    render(scene) {
        // Rectangle always full menu width
        this.bg.width = this.width;

        // Rectangle height matches final image height
        this.bg.height = this.itemHeight;

        // Ensure image inside container aligns top-left
        if (this.img) this.img.setOrigin(0, 0);

        return this.container;
    }
}