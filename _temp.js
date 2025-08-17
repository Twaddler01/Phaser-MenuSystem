create() {
    setScene(this);

    this.menuUI = new MenuSystem({ x: 50, y: 50, width: 350, itemHeight: 50, contentIndent: 0 });

    new ImgObj({ parentMenu: 'Menu 4', imageKey: 'opened', width: 50, height: 50, bgColor: 0x444444 });
    new ImgObj({ parentMenu: 'Menu 5', imageKey: 'opened', stretch: { width: 100 }, bgColor: 0x444444 });
    new ImgObj({ parentMenu: 'Menu 6', imageKey: 'opened', bgColor: 0x444444 });

    this.menuUI.expandedParents.add('Menu 4');
    this.menuUI.expandedParents.add('Menu 5');
    this.menuUI.expandedParents.add('Menu 6');

    this.menuUI.render();
}