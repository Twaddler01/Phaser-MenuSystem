import MenuSystem from './MenuSystem.js';

// `000`
// console.log();

class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    preload() {
        this.load.image('opened', 'assets/MenuItem_open.png');
        this.load.image('closed', 'assets/MenuItem_closed.png');
    }

    update() {
        //
    }

    create() {
        const width = this.game.config.width;
        const height = this.game.config.height;
        // Game area rectangle
        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0x222222, 1); // Gray color
        this.graphics.fillRect(0, 0, width, height);
        this.graphics.setDepth(-1); // -1 ensures it's behind other game elements

        //

const menuData = {
    parent: [
        { id: 'menu1', content: [
            { id: 'menu1content1', title: 'Menu 1 - Contents 1', bgColor: 0x333333, action: 'act1.1' },
            { id: 'menu1content2', title: 'Menu 1 - Contents 2', bgColor: 0x333333, action: 'act1.2' },
            { id: 'menu1content3', title: 'Menu 1 - Contents 3', bgColor: 0x333333, action: 'act1.3' },
        ] },
        { id: 'menu2', content: [
            { id: 'menu2content1', title: 'Menu 2 - Contents 1', bgColor: 0x333333, action: 'act2.1' },
            { id: 'menu2content2', title: 'Menu 2 - Contents 2', bgColor: 0x333333, action: 'act2.2' },
            { id: 'menu2content3', title: 'Menu 2 - Contents 3', bgColor: 0x333333, action: 'act2.3' },
        ] },
        { id: 'menu3', content: [
            { id: 'menu3content1', title: 'Menu 3 - Contents 1', bgColor: 0x333333, action: 'act3.1' },
            { id: 'menu3content2', title: 'Menu 3 - Contents 2', bgColor: 0x333333, action: 'act3.2' },
            { id: 'menu3content3', title: 'Menu 3 - Contents 3', bgColor: 0x333333, action: 'act3.3' },
        ] }
    ]
};

const myMenuSystem = new MenuSystem(this, {
    data: menuData,
    x: 50,
    y: 50,
    width: 300,
    itemHeight: 40,
    contentIndent: 0,
    verticalPadding: 8
});







    } // create()
} // MainScene

// Export default MainScene;
export default MainScene;