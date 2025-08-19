import { scene } from './sceneManager.js';

export default class MenuSystem {
    constructor({ x = 50, y = 50, width = 300, itemHeight = 40, verticalPadding = 5, contentIndent = 10, bgColor = 0x666666 }) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.itemHeight = itemHeight;
        this.verticalPadding = verticalPadding;
        this.contentIndent = contentIndent;
        this.bgColor = bgColor;

        this.menus = {};               // stores items per parent
        this.expandedParents = new Set(); // which parent sections are expanded

        this.container = scene.add.container(this.x, this.y); // main container for menu
    }

    // Add an object under a parent section
    addItem(objClass, config = {}) {
        const parentName = config.parentMenu || 'default';

        // Inject shared menu properties
        Object.assign(config, {
            width: config.width || this.width,
            itemHeight: config.itemHeight || this.itemHeight,
            bgColor: config.bgColor || this.bgColor,
            parentMenu: parentName
        });

        const item = new objClass(config);

        if (!this.menus[parentName]) this.menus[parentName] = [];
        this.menus[parentName].push(item);

        return item;
    }

    // Add an overlay item inside an existing parent row (doesn't affect layout height)
    addItemOver(objClass, config = {}) {
        const parentName = config.parentMenu || 'default';
    
        // Ensure parent exists first
        const parentBg = this.getOrCreateParentBg(parentName);
    
        // Shared props
        Object.assign(config, {
            width: config.width || this.width,
            itemHeight: config.itemHeight || this.itemHeight,
            bgColor: config.bgColor || this.bgColor,
            parentMenu: parentName
        });
    
        const item = new objClass({ ...config, noBg: true });
    
        if (!this.menus[parentName]) this.menus[parentName] = [];
        if (!this.menus[parentName]._over) this.menus[parentName]._over = [];
        this.menus[parentName]._over.push(item);
    
        return item;
    }

    // Get or create parent rectangle
    getOrCreateParentBg(parentName) {
        let parentBg = this.container.list.find(c => c.isParentBg && c.text === parentName);
        if (!parentBg) {
            parentBg = scene.add.rectangle(0, 0, this.width, this.itemHeight, 0x0000ff).setOrigin(0);
            parentBg.isParentBg = true;
            parentBg.text = parentName;
            parentBg.setInteractive({ useHandCursor: true });

            // Toggle expand/collapse on click
            parentBg.on('pointerdown', () => {
                if (this.expandedParents.has(parentName)) this.expandedParents.delete(parentName);
                else this.expandedParents.add(parentName);

                this.render(); // reposition everything
            });

            this.container.add(parentBg);
        }
        return parentBg;
    }

    // Get or create parent text label
    getOrCreateParentText(parentName) {
        let parentText = this.container.list.find(c => c.isParentText && c.text === parentName);
        if (!parentText) {
            parentText = scene.add.text(10, 0, parentName, { fontSize: '18px', color: '#ffffff' }).setOrigin(0, 0.5);
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
            const isExpanded = this.expandedParents.has(parentName);

            // Position parent row
            parentBg.y = currentY;
            parentText.y = currentY + this.itemHeight / 2;
    
            // Position overlay items below this parent (but no added height)
            if (this.menus[parentName]._over) {
                for (const obj of this.menus[parentName]._over) {
                    obj.render();
    
                    if (!obj.container.xSet) {
                        obj.container.x = this.contentIndent;
                        obj.container.xSet = true;
                    }
    
                    // Lock to baseline immediately below parent row
                    obj.container.y = parentBg.y + parentBg.height + this.verticalPadding;
    
                    obj.container.setVisible(isExpanded);
    
                    if (!this.container.list.includes(obj.container)) {
                        this.container.add(obj.container);
                    }
                    this.container.bringToTop(obj.container);
                }
            }
    
            // Move down ONLY once per parent row
            currentY += this.itemHeight + this.verticalPadding;
    
            // Stack children normally
            for (const obj of this.menus[parentName]) {
                if (obj === this.menus[parentName]._over) continue;
    
                obj.render();
    
                if (!obj.container.xSet) {
                    obj.container.x = this.contentIndent;
                    obj.container.xSet = true;
                }
    
                obj.container.y = currentY;
                obj.container.setVisible(isExpanded);
    
                if (isExpanded) currentY += obj.itemHeight + this.verticalPadding;
    
                if (!this.container.list.includes(obj.container)) {
                    this.container.add(obj.container);
                }
            }
        }
    }

/*
    // Render all sections and their children
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
                obj.render();

                // Set x relative to menu container + indent
                if (!obj.container.xSet) {
                    obj.container.x = this.contentIndent;
                    obj.container.xSet = true;
                }

                // Stack vertically
                obj.container.y = currentY;
                obj.container.setVisible(isExpanded);

                if (isExpanded) currentY += obj.itemHeight + this.verticalPadding;

                // Ensure object is in the main container
                if (!this.container.list.includes(obj.container)) {
                    this.container.add(obj.container);
                }
            }
        }
    }
*/
    // Optional: reposition without fully re-rendering (useful if dynamic height changes)
    reposition() {
        this.render(); // for simplicity we can reuse render
    }
}