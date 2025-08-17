import { setScene } from './sceneManager.js';
import MenuSystem from './MenuSystem.js';
//import TextObj from './TextObj.js';
//import RectObj from './RectObj.js';
import ImgObj from './ImgObj.js';

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
        // Set scene to load globally
        setScene(this);
        
        const width = this.game.config.width;
        const height = this.game.config.height;
        // Game area rectangle
        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0x222222, 1); // Gray color
        this.graphics.fillRect(0, 0, width, height);
        this.graphics.setDepth(-1); // -1 ensures it's behind other game elements

        //// MENUS + CONTENT
        this.menuUI = new MenuSystem({ x: 50, y: 50, width: 350, itemHeight: 50, contentIndent: 0 });

/*
        new TextObj('Menu 1', {
            text: 'Content 1',
            bgColor: 0x444444,
            onClick: (obj) => console.log(`Clicked ${obj.text} (ID ${obj.id})`)
        });

        new TextObj('Menu 1', {
            text: 'Content 2',
            bgColor: 0x555555,
            onClick: (obj) => console.log(`Custom action for ${obj.text}`)
        });

        new RectObj('Menu 2', {
            height: 100,
            bgColor: 0x777777,
            onClick: (obj) => console.log(`RectObj clicked: ID ${obj.id}`)
        });

        new TextObj('Menu 3', {
            text: 'Only item',
            bgColor: 0x999999
        });
        */

        new ImgObj({ parentMenu: 'Menu 4', imageKey: 'opened', width: 50, height: 50, bgColor: 0x444444 });
        new ImgObj({ parentMenu: 'Menu 5', imageKey: 'opened', stretch: { width: 100 }, bgColor: 0x444444 });
        new ImgObj({ parentMenu: 'Menu 6', imageKey: 'opened', bgColor: 0x666666 });
        new ImgObj({ parentMenu: 'Menu 7', imageKey: 'opened', fixed: { width: 100 }, bgColor: 0x444444 });

//new TextObj('Menu 7');

        this.menuUI.render();
        //console.log(this.menuUI.menus);


    } // create()
} // MainScene

// Export default MainScene;
export default MainScene;