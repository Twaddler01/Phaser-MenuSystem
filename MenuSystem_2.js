export default class MenuSystem {
  /**
   * @param {Phaser.Scene} scene 
   * @param {Object} config 
   * @param {Object} config.data - menu data with parent/content arrays
   * @param {number} [config.x=50]
   * @param {number} [config.y=50]
   * @param {number} [config.width=300]
   * @param {number} [config.itemHeight=40]
   * @param {number} [config.contentIndent=20]
   * @param {number} [config.verticalPadding=5]
   * @param {Object} [config.renderers={}] - custom renderer functions by type
   */
  constructor(scene, config = {}) {
    this.scene = scene;
    this.data = config.data || { parent: [] };

    this.x = config.x || 50;
    this.y = config.y || 50;
    this.width = config.width || 300;
    this.itemHeight = config.itemHeight || 40;
    this.contentIndent = (config.contentIndent !== undefined) ? config.contentIndent : 20;
    this.verticalPadding = config.verticalPadding || 5;

    // Merge default renderer into custom renderers
    this.renderers = Object.assign({
      default: this.renderDefaultItem
    }, config.renderers || {});

    this.expandedParents = new Set();
    this.container = this.scene.add.container(this.x, this.y);

    this.render();
  }

  render() {
    this.container.removeAll(true);
    let currentY = 0;

    this.data.parent.forEach(parent => {
      // Parent button
      const parentBg = this.scene.add.rectangle(0, currentY, this.width, this.itemHeight, 0x0000ff)
        .setOrigin(0)
        .setInteractive({ useHandCursor: true });

      const parentText = this.scene.add.text(10, currentY + this.itemHeight / 2, parent.id, {
        fontSize: '18px',
        color: '#ffffff'
      }).setOrigin(0, 0.5);

      this.container.add([parentBg, parentText]);

      parentBg.on('pointerdown', () => {
        if (this.expandedParents.has(parent.id)) {
          this.expandedParents.delete(parent.id);
        } else {
          this.expandedParents.add(parent.id);
        }
        this.render();
      });

      currentY += this.itemHeight + this.verticalPadding;

      if (this.expandedParents.has(parent.id)) {
        parent.content.forEach(item => {
          const type = parent.type && this.renderers[parent.type]
            ? parent.type
            : "default";

          const rendererFn = this.renderers[type];
          currentY = rendererFn(this.scene, this.container, item, currentY, this);
        });
      }
    });
  }

  // Default renderer: rectangle + text
  renderDefaultItem(scene, container, item, y, menu) {
    const bg = scene.add.rectangle(menu.contentIndent, y, menu.width - menu.contentIndent, menu.itemHeight, item.bgColor || 0x333333)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true });

    const text = scene.add.text(menu.contentIndent + 10, y + menu.itemHeight / 2, item.title, {
      fontSize: '16px',
      color: '#fff'
    }).setOrigin(0, 0.5);

    container.add([bg, text]);

    bg.on('pointerdown', () => {
      console.log(`Default action: ${item.action}`);
    });

    return y + menu.itemHeight + menu.verticalPadding;
  }

  addParentMenu(id, type) {
    if (this.data.parent.find(p => p.id === id)) return;
    this.data.parent.push({ id, type, content: [] });
    this.render();
  }

  addContentToParent(parentId, contentItem) {
    const parent = this.data.parent.find(p => p.id === parentId);
    if (!parent) return;
    parent.content.push(contentItem);
    this.render();
  }
}