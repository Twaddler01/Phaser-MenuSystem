export default class EmptyObj {
    static menuSystem = null; // set by MenuSystem constructor

    constructor(parentMenu, options = {}) {
        if (!parentMenu) throw new Error("parentMenu is required.");
        if (!EmptyObj.menuSystem) throw new Error("MenuSystem not initialized yet.");

        this.parentMenu = parentMenu;
        this.bgColor = options.bgColor ?? 0x333333;
        this.width = options.width ?? EmptyObj.menuSystem.getWidth();
        this.height = options.height ?? 50;

        // Register this object with the MenuSystem
        EmptyObj.menuSystem.addItemToMenu(this);
    }

    // Called by MenuSystem when it’s time to render this item
    render(scene, x, y) {
        // Subclasses override this
    }
}