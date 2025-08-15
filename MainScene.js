import TextObj from './TextObj.js';
//import ImgObj from './ImgObj.js';
//import RectObj from './RectObj.js';
import MenuSystem from './MenuSystem.js';

// `000`
// console.log();

// Export scene
export let scene = null;
export function setScene(s) {
    scene = s;
}

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
        const menuUI = new MenuSystem({ scene, x: 50, y: 50 });
        new TextObj('Menu 1');
        new TextObj('Menu 1', { text: 'Content 1', bgColor: 0x444444 });
        new TextObj('Menu 1', { text: 'Content 2', bgColor: 0x555555 });
        new TextObj('Menu 2', { text: 'Image Content', imageKey: 'logo', bgColor: 0x999999 });
        new TextObj('Menu 3', { text: 'Rectangle Item', width: 200, height: 100, bgColor: 0x777777 });
        //new ImgObj('Menu 2', { text: 'Image Content', imageKey: 'logo', bgColor: 0x999999 });
        //new RectObj('Menu 3', { text: 'Rectangle Item', width: 200, height: 100, bgColor: 0x777777 });
        
        //console.log('All Menu Objects: ');
        //console.log(TextObj.getAllMenuObjects());
        //console.log('Menu height: ');
        //console.log(menuUI.getHeight());


    } // create()
} // MainScene

// Export default MainScene;
export default MainScene;