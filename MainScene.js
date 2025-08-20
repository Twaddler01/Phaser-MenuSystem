import { setScene } from './sceneManager.js';
import MenuSystem from './MenuSystem.js';
import TextObj from './TextObj.js';
import RectObj from './RectObj.js';
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
        const menu = new MenuSystem({ x: 50, y: 50, width: 350, itemHeight: 50, contentIndent: 0 });

        menu.addItem(ImgObj, { 
            parentMenu: 'Menu 4', 
            imageKey: 'opened', 
            imgWidth: 50, 
            imgHeight: 50, 
            bgColor: 0x444444, 
            onClick: (obj) => console.log(`ImgObj clicked: ID ${obj.id}`)
        });

        menu.addItemOver(TextObj, { 
            parentMenu: 'Menu 4', 
            text: 'Content Text for Menu 4...',
            bgColor: 0x444444, 
            onClick: (obj) => console.log(`TextObj clicked: ID ${obj.id}`)
        });

        menu.addItemOver(TextObj, { 
            parentMenu: 'Menu 3', 
            text: 'Content Text for Menu 3...',
            bgColor: 0x444444, 
            onClick: (obj) => console.log(`TextObj clicked: ID ${obj.id}`)
        });
        
        menu.addItem(ImgObj, { 
            parentMenu: 'Menu 5', 
            imageKey: 'opened', 
            stretch: { imgWidth: 100 }, 
            bgColor: 0x444444,
            onClick: (obj) => console.log(`ImgObj clicked: ID ${obj.id}`)
        });
        
        menu.addItem(ImgObj, { 
            parentMenu: 'Menu 6', 
            imageKey: 'opened', 
            bgColor: 0x666666,
            onClick: (obj) => console.log(`ImgObj clicked: ID ${obj.id}`)
        });
        
        menu.addItem(ImgObj, { 
            parentMenu: 'Menu 7', 
            imageKey: 'opened', 
            fixed: { imgWidth: 100 }, 
            bgColor: 0x444444,
            onClick: (obj) => console.log(`ImgObj clicked: ID ${obj.id}`)
        });
        
        menu.addItem(RectObj, { 
            parentMenu: 'Menu 8', 
            onClick: (obj) => console.log(`RectObj clicked: ID ${obj.id}`)
        });

        menu.render();


    } // create()
} // MainScene

// Export default MainScene;
export default MainScene;