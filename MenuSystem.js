// MenuSystem.js
import EmptyObj from './EmptyObj.js';

export default class MenuSystem {
    constructor(config = {}) {
        this.scene = config.scene;

        this.x = config.x ?? 10;
        this.y = config.y ?? 10;
        this.width = config.width ?? 300;
        this.itemHeight = config.itemHeight ?? 40;
        this.contentIndent = config.contentIndent ?? 20;
        this.verticalPadding = config.verticalPadding ?? 5;

        this.expandedParents = new Set();
        this.container = this.scene.add.container(this.x, this.y);

        // Auto-update when any menu data changes
        EmptyObj.onUpdate(() => this.render());

        this.render();
    }

    render() {
        this.container.removeAll(true);
        let currentY = 0;

        const menus = EmptyObj.getAllMenus();

        for (const [parentMenu, data] of Object.entries(menus)) {
            // Parent menu rectangle
            const parentBg = this.scene.add.rectangle(0, currentY, this.width, this.itemHeight, 0x0000ff)
                .setOrigin(0)
                .setInteractive({ useHandCursor: true });

            const parentText = this.scene.add.text(10, currentY + this.itemHeight / 2, parentMenu, {
                fontSize: '18px',
                color: '#ffffff'
            }).setOrigin(0, 0.5);

            this.container.add([parentBg, parentText]);

            parentBg.on('pointerdown', () => {
                if (this.expandedParents.has(parentMenu)) {
                    this.expandedParents.delete(parentMenu);
                } else {
                    this.expandedParents.add(parentMenu);
                }
                this.render();
            });

            currentY += this.itemHeight + this.verticalPadding;

            // Render children if expanded
            if (this.expandedParents.has(parentMenu)) {
                data.items.forEach(item => {
                    const contentBg = this.scene.add.rectangle(
                        this.contentIndent,
                        currentY,
                        this.width - this.contentIndent,
                        this.itemHeight,
                        item.bgColor
                    )
                    .setOrigin(0)
                    .setInteractive({ useHandCursor: true });

                    const contentText = this.scene.add.text(
                        this.contentIndent + 10,
                        currentY + this.itemHeight / 2,
                        item.text,
                        { fontSize: '16px', color: '#ffffff' }
                    ).setOrigin(0, 0.5);

                    this.container.add([contentBg, contentText]);

                    contentBg.on('pointerdown', () => {
                        console.log(`Action triggered: ${item.action || 'no-action'}`);
                    });

                    currentY += this.itemHeight + this.verticalPadding;
                });
            }
        }
    }

    getHeight() {
        let height = 0;
        const menus = EmptyObj.getAllMenus();

        for (const [parentMenu, data] of Object.entries(menus)) {
            height += this.itemHeight + this.verticalPadding;
            if (this.expandedParents.has(parentMenu)) {
                height += data.items.length * (this.itemHeight + this.verticalPadding);
            }
        }
        return height;
    }
}