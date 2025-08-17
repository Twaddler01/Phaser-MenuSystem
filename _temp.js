export default class EmptyObj {
    constructor(config = {}) {
        this.parentMenu = config.parentMenu || 'default';
        this.width = config.width || 200;
        this.height = config.height || 40; 
        this.itemHeight = config.itemHeight || this.height;
        this.bgColor = config.bgColor || 0x666666;
        this.onClick = config.onClick || null;

        this.container = scene.add.container(0, 0);
        this.bg = scene.add.rectangle(0, 0, this.width, this.itemHeight, this.bgColor)
            .setOrigin(0, 0);

        this.container.add(this.bg);

        if (this.onClick) {
            this.bg.setInteractive({ useHandCursor: true })
                  .on('pointerdown', () => this.onClick(this));
        }
    }

    render() {
        // Update graphics size
        this.bg.width = this.width;
        this.bg.height = this.itemHeight;

        // Update hit area (so clicks still match size)
        if (this.bg.input) {
            this.bg.input.hitArea.setSize(this.bg.width, this.bg.height);
        }

        return this.container;
    }
}