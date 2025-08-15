import MenuSystem from './MenuSystem.js';
import TextObj from './TextObj.js';
import RectObj from './RectObj.js';

export default class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    create() {
        this.menuUI = new MenuSystem({ scene: this, x: 50, y: 50, width: 350 });

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
    }
}