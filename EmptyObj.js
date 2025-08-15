// EmptyObj.js
export default class EmptyObj {
    static menus = {};           // { "Menu 1": { parentMenu, items: [...] } }
    static allMenuObjects = [];  // All created objects (TextObj, ImgObj, etc.)
    static listeners = new Set();// UI update callbacks

    constructor(parentMenu, options = {}) {
        this.parentMenu = parentMenu;
        this.text = options.text ?? null;
        this.bgColor = options.bgColor ?? 0x333333;
        this.action = options.action ?? null;

        // Track all created menu objects
        EmptyObj.allMenuObjects.push(this);

        // Ensure parent menu exists
        if (!EmptyObj.menus[parentMenu]) {
            EmptyObj.menus[parentMenu] = {
                parentMenu,
                items: []
            };
        }

        // If this object represents content, add it
        if (this.text) {
            EmptyObj.menus[parentMenu].items.push({
                type: this.constructor.name,
                ref: this, // reference to the actual object
                text: this.text,
                bgColor: this.bgColor,
                action: this.action
            });
        }

        // Notify UI to update
        EmptyObj.notifyUpdate();
    }

    // ==== Static helpers ====

    static onUpdate(cb) {
        EmptyObj.listeners.add(cb);
    }

    static offUpdate(cb) {
        EmptyObj.listeners.delete(cb);
    }

    static notifyUpdate() {
        for (const cb of EmptyObj.listeners) {
            cb();
        }
    }

    static getMenu(parentMenu) {
        return EmptyObj.menus[parentMenu] || null;
    }

    static getAllMenus() {
        return EmptyObj.menus;
    }

    static getAllMenuObjects() {
        return EmptyObj.allMenuObjects;
    }
}