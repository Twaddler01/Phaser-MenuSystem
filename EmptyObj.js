let nextId = 1;

export default class EmptyObj {
    static menuSystem = null; // Set by MenuSystem

    constructor(parentMenu, options = {}) {
        if (!parentMenu) throw new Error("parentMenu is required.");
        if (!EmptyObj.menuSystem) throw new Error("MenuSystem not initialized yet.");

        this.id = nextId++; // unique ID
        this.parentMenu = parentMenu;
        this.bgColor = options.bgColor ?? 0x333333;
        this.width = options.width ?? EmptyObj.menuSystem.getWidth();
        this.height = options.height ?? 50;
        this.action = options.onClick ?? (() => console.log(`Clicked object ID ${this.id}`));

        // Register with the MenuSystem
        EmptyObj.menuSystem.addItemToMenu(this);
    }

    /**
     * Adds click handling to a Phaser display object
     */
    makeInteractive(displayObj) {
        displayObj.setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                if (typeof this.action === 'function') {
                    this.action(this);
                }
            });
    }

    // Subclasses must override this
    render(scene, x, y) { }
}