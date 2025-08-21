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

// Define menu here...
        const menu = new MenuSystem({ 
            x: 50, // Menu location x
            y: 50, // Menu location y
            width: 350, // Menu width
            itemHeight: 50, // Default height of each menu item
            contentIndent: 0 }); // Indentation of all content relative to parent

// Add content here and parent menu if not initialized....
// TYPES:
// RectObj ... a rectangle with color
// TextObj ... text with color
// ImgObj .... an image as specified in preload()


        // Add image
        menu.addItem(ImgObj, { 
            parentMenu: 'Menu 1', // Title and ID
            imageKey: 'opened',  // Define img source in preload() function above
            imgWidth: 50, 
            imgHeight: 50, 
            bgColor: 0x444444, 
            onClick: (obj) => console.log(`ImgObj clicked: ID ${obj.id}`)
        });
        
        // Add over other existing menu content
        menu.addItemOver(TextObj, { 
            parentMenu: 'Menu 1', 
            text: 'Content Text for Menu 1...',
            bgColor: 0x444444, 
            onClick: (obj) => console.log(`TextObj clicked: ID ${obj.id}`)
        });

        // Rectangle is automatically created if only an overlay item is added
        menu.addItemOver(TextObj, { 
            parentMenu: 'Menu 2', 
            text: 'Content Text for Menu 2...',
            bgColor: 0x444444, 
            onClick: (obj) => console.log(`TextObj clicked: ID ${obj.id}`)
        });
        
        menu.addItem(ImgObj, { 
            parentMenu: 'Menu 3', 
            imageKey: 'opened', 
            stretch: { imgWidth: 100 }, 
            bgColor: 0x444444,
            onClick: (obj) => console.log(`ImgObj clicked: ID ${obj.id}`)
        });
        
        menu.addItem(ImgObj, { 
            parentMenu: 'Menu 4', 
            imageKey: 'opened', 
            bgColor: 0x666666,
            onClick: (obj) => console.log(`ImgObj clicked: ID ${obj.id}`)
        });
        
        menu.addItem(ImgObj, { 
            parentMenu: 'Menu 5', 
            imageKey: 'opened', 
            fixed: { imgWidth: 100 }, 
            bgColor: 0x444444,
            onClick: (obj) => console.log(`ImgObj clicked: ID ${obj.id}`)
        });
        
        menu.addItem(RectObj, { 
            parentMenu: 'Menu 6', 
            onClick: (obj) => console.log(`RectObj clicked: ID ${obj.id}`)
        });

        // Run after all menus initialized
        menu.render();


    } // create()
} // MainScene

// Export default MainScene;
export default MainScene;