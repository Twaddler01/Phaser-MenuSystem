renderDefaultItem(scene, container, item, y) {
    const bg = scene.add.rectangle(scene.contentIndent, y, this.width - this.contentIndent, this.itemHeight, item.bgColor || 0x333333)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true });

    const text = scene.add.text(scene.contentIndent + 10, y + this.itemHeight / 2, item.title, {
      fontSize: '16px',
      color: '#fff'
    }).setOrigin(0, 0.5);

    container.add([bg, text]);

    bg.on('pointerdown', () => {
      console.log(`Default action: ${item.action}`);
    });

    return y + this.itemHeight + this.verticalPadding;
  }