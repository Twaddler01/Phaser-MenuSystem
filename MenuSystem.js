import EmptyObj from './EmptyObj.js';

export default class MenuSystem {
    constructor({ 
        scene, 
        x = 50, 
        y = 50, 
        width = 300, 
        itemHeight = 40, 
        verticalPadding = 5, 
        contentIndent = 10
    }) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.width = width;
        this.itemHeight = itemHeight;
        this.verticalPadding = verticalPadding;
        this.contentIndent = contentIndent;

        this.menus = {}; // { parentName: [objects...] }
        this.expandedParents = new Set();

        this.container = this.scene.add.container(this.x, this.y);

        // Register MenuSystem in EmptyObj
        EmptyObj.menuSystem = this;
    }

    getWidth() {
        return this.width;
    }

    addItemToMenu(obj) {
        if (!this.menus[obj.parentMenu]) {
            this.menus[obj.parentMenu] = [];
        }
        this.menus[obj.parentMenu].push(obj);
        this.render();
    }

    render() {
        this.container.removeAll(true);

        let currentY = 0;
        for (const parentName in this.menus) {
            // Parent button
            const parentBg = this.scene.add.rectangle(0, currentY, this.width, this.itemHeight, 0x0000ff)
                .setOrigin(0)
                .setInteractive({ useHandCursor: true });
            const parentText = this.scene.add.text(10, currentY + this.itemHeight / 2, parentName, {
                fontSize: '18px', color: '#ffffff'
            }).setOrigin(0, 0.5);

            parentBg.on('pointerdown', () => {
                if (this.expandedParents.has(parentName)) {
                    this.expandedParents.delete(parentName);
                } else {
                    this.expandedParents.add(parentName);
                }
                this.render();
            });

            this.container.add([parentBg, parentText]);
            currentY += this.itemHeight + this.verticalPadding;

            // Render children if expanded
            if (this.expandedParents.has(parentName)) {
                for (const obj of this.menus[parentName]) {
                    const contentX = this.contentIndent; // indent
                    obj.render(this.scene, contentX, currentY);
                    currentY += obj.height + this.verticalPadding;
                }
            }
        }
    }
}