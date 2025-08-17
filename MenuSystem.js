import EmptyObj from './EmptyObj.js';
import { scene } from './sceneManager.js';

export default class MenuSystem {
    constructor({ x = 50, y = 50, width = 300, itemHeight = 40, verticalPadding = 5, contentIndent = 10 }) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.width = width;
        this.itemHeight = itemHeight;
        this.verticalPadding = verticalPadding;
        this.contentIndent = contentIndent;

        this.menus = {};             // { parentName: [child objects...] }
        this.expandedParents = new Set();

        this.container = this.scene.add.container(this.x, this.y);

        // Register MenuSystem globally in EmptyObj
        EmptyObj.menuSystem = this;
    }

    addItemToMenu(obj) {
        if (!this.menus[obj.parentMenu]) this.menus[obj.parentMenu] = [];
        this.menus[obj.parentMenu].push(obj);
    }

    // Get or create parent background rectangle
    getOrCreateParentBg(parentName) {
        let parentBg = this.container.list.find(c => c.isParentBg && c.text === parentName);
        if (!parentBg) {
            parentBg = this.scene.add.rectangle(0, 0, this.width, this.itemHeight, 0x0000ff).setOrigin(0);
            parentBg.isParentBg = true;
            parentBg.text = parentName;
            parentBg.setInteractive({ useHandCursor: true });

            // Toggle expand/collapse on click
            parentBg.on('pointerdown', () => {
                const isExpanded = this.expandedParents.has(parentName);
                if (isExpanded) this.expandedParents.delete(parentName);
                else this.expandedParents.add(parentName);

                this.reposition();
            });

            this.container.add(parentBg);
        }
        return parentBg;
    }

    // Get or create parent text
    getOrCreateParentText(parentName) {
        let parentText = this.container.list.find(c => c.isParentText && c.text === parentName);
        if (!parentText) {
            parentText = this.scene.add.text(10, 0, parentName, { fontSize: '18px', color: '#ffffff' }).setOrigin(0, 0.5);
            parentText.isParentText = true;
            parentText.text = parentName;
            this.container.add(parentText);
        }
        return parentText;
    }

    render() {
        let currentY = 0;

        for (const parentName in this.menus) {
            const parentBg = this.getOrCreateParentBg(parentName);
            const parentText = this.getOrCreateParentText(parentName);

            parentBg.y = currentY;
            parentText.y = currentY + this.itemHeight / 2;
            currentY += this.itemHeight + this.verticalPadding;

            const isExpanded = this.expandedParents.has(parentName);

            for (const obj of this.menus[parentName]) {
                obj.render(this.scene);

                // Set x relative to parent + contentIndent (once)
                if (!obj.container.xSet) {
                    obj.container.x = parentBg.x + this.contentIndent;
                    obj.container.xSet = true;
                }

                // Update y dynamically and visibility
                obj.container.y = currentY;
                obj.container.setVisible(isExpanded);

                if (isExpanded) currentY += obj.itemHeight + this.verticalPadding;
            }
        }
    }

    reposition() {
        let currentY = 0;

        for (const parentName in this.menus) {
            const parentBg = this.container.list.find(c => c.isParentBg && c.text === parentName);
            const parentText = this.container.list.find(c => c.isParentText && c.text === parentName);

            if (parentBg) parentBg.y = currentY;
            if (parentText) parentText.y = currentY + this.itemHeight / 2;

            currentY += this.itemHeight + this.verticalPadding;

            const isExpanded = this.expandedParents.has(parentName);
            for (const obj of this.menus[parentName]) {
                obj.container.y = currentY + parentBg.height;
                obj.container.x = this.x + this.contentIndent;
                obj.container.setVisible(isExpanded);

                if (isExpanded) currentY += obj.itemHeight + this.verticalPadding;
            }
        }
    }
}