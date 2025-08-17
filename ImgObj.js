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

            // ---- IMAGE SIZING RULES ----
            if (this.fixed) {
                // Fixed width/height (hard limit, independent of menu width)
                if (this.fixed.imgWidth) {
                    this.img.displayWidth = this.fixed.imgWidth;
                    this.img.displayHeight = this.img.displayWidth * (origHeight / origWidth);
                } else if (this.fixed.imgHeight) {
                    this.img.displayHeight = this.fixed.imgHeight;
                    this.img.displayWidth = this.img.displayHeight * (origWidth / origHeight);
                }
            } 
            else if (this.stretch) {
                // Stretch up to a value (but still capped by menu width if stretch width)
                if (this.stretch.imgWidth) {
                    this.img.displayWidth = Math.min(this.stretch.imgWidth, this.width);
                    this.img.displayHeight = this.img.displayWidth * (origHeight / origWidth);
                }
                if (this.stretch.imgHeight) {
                    this.img.displayHeight = this.stretch.imgHeight;
                    this.img.displayWidth = this.img.displayHeight * (origWidth / origHeight);
                }
            } 
            else if (config.imgWidth) {
                this.img.displayWidth = Math.min(config.imgWidth, this.width);
                this.img.displayHeight = this.img.displayWidth * (origHeight / origWidth);
            } 
            else if (config.imgHeight) {
                this.img.displayHeight = config.imgHeight;
                this.img.displayWidth = this.img.displayHeight * (origWidth / origHeight);
            } 
            else {
                // Default: fit height to menu item height
                this.img.displayHeight = this.itemHeight;
                this.img.scaleX = this.img.scaleY; // lock aspect ratio
            }

            // Rectangle height = final image height
            this.itemHeight = this.img.displayHeight;

            this.container.add(this.img);
        }
    }

    render(scene) {
        // Rectangle always matches menu width
        this.bg.width = this.width;

        // Rectangle height = image height (or fallback to itemHeight)
        this.bg.height = this.itemHeight;

        // Update hit area (so clicks still match size)
        if (this.bg.input) {
            this.bg.input.hitArea.setSize(this.bg.width, this.bg.height);
        }

        if (this.img) this.img.setOrigin(0, 0);

        return this.container;
    }
}