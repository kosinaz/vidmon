import Profile from './profile.js';

/**
 * Represent the home screen of the game.
 *
 * @export
 * @class LevelScene
 * @extends {Phaser.Scene}
 */
export default class LevelScene extends Phaser.Scene {
  /**
   * Creates an instance of LevelScene.
   * @memberof LevelScene
   */
  constructor() {
    super('LevelScene');
  }

  /**
   * Creates the content of the LevelScene.
   *
   * @param {*} data
   * @memberof LevelScene
   */
  create(data) {
    this.scene.get('MusicScene').play(1);
    this.map = this.make.tilemap({
      key: 'map',
    });
    const tileset = this.map.addTilesetImage('tileset', 'tileset');
    this.map.createStaticLayer('below', tileset, 0, 0);
    this.walls = this.map.createStaticLayer('next', tileset, 0, 0);
    const starttile = this.walls.findByIndex(317);
    this.player = this.add.sprite(
        starttile.getCenterX() - 48,
        starttile.getCenterY(),
        'sprites',
        'down3',
    ).setOrigin(0.5, 1);
    this.map.createStaticLayer('above1', tileset, 0, 0);
    this.map.createStaticLayer('above2', tileset, 0, 0);
    this.anims.create({
      key: 'down',
      frames: [
        {key: 'sprites', frame: 'down2'},
        {key: 'sprites', frame: 'down1'},
        {key: 'sprites', frame: 'down2'},
        {key: 'sprites', frame: 'down3'},
        {key: 'sprites', frame: 'down4'},
        {key: 'sprites', frame: 'down5'},
        {key: 'sprites', frame: 'down4'},
        {key: 'sprites', frame: 'down3'},
      ],
      frameRate: 30,
      // repeat: -1,
    });
    // this.player.play('down');
    this.anims.create({
      key: 'right',
      frames: [
        {key: 'sprites', frame: 'right2'},
        {key: 'sprites', frame: 'right1'},
        {key: 'sprites', frame: 'right2'},
        {key: 'sprites', frame: 'right3'},
        {key: 'sprites', frame: 'right4'},
        {key: 'sprites', frame: 'right5'},
        {key: 'sprites', frame: 'right4'},
      ],
      frameRate: 30,
      // repeat: -1,
    });
    // this.player.play('right');
    this.anims.create({
      key: 'up',
      frames: [
        {key: 'sprites', frame: 'up2'},
        {key: 'sprites', frame: 'up1'},
        {key: 'sprites', frame: 'up2'},
        {key: 'sprites', frame: 'up3'},
        {key: 'sprites', frame: 'up4'},
        {key: 'sprites', frame: 'up5'},
        {key: 'sprites', frame: 'up4'},
        {key: 'sprites', frame: 'up3'},
      ],
      frameRate: 30,
      // repeat: -1,
    });
    // this.player.play('up');
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, this.walls.width, this.walls.height);
  }

  /**
   *
   * @memberof LevelScene
   */
  update() {
    if (this.input.activePointer.isDown && !this.moving) {
      const worldPoint = this.cameras.main.getWorldPoint(
          this.input.activePointer.x,
          this.input.activePointer.y,
      );
      const pointerTileX = this.walls.worldToTileX(worldPoint.x);
      const pointerTileY = this.walls.worldToTileY(worldPoint.y);
      const playerTileX = this.walls.worldToTileX(this.player.x);
      const playerTileY = this.walls.worldToTileX(this.player.y);
      const xd = pointerTileX - playerTileX;
      const yd = pointerTileY - playerTileY;
      const nextTileX = playerTileX + (xd > 0 ? 1 : -1);
      const nextTileY = playerTileY + (yd > 0 ? 1 : -1);
      if (Math.abs(xd) > Math.abs(yd) &&
        !this.walls.getTileAt(nextTileX, playerTileY)) {
        this.moving = true;
        this.player.play('right');
        this.player.flipX = xd < 0;
        this.tweens.add({
          targets: this.player,
          x: this.walls.tileToWorldX(nextTileX) + 24,
          duration: 250,
          onComplete: () => {
            this.moving = false;
          },
        });
      } else if (!this.walls.getTileAt(playerTileX, nextTileY)) {
        this.moving = true;
        this.player.play(yd > 0 ? 'down' : 'up');
        this.tweens.add({
          targets: this.player,
          y: this.walls.tileToWorldY(nextTileY) + 24,
          duration: 250,
          onComplete: () => {
            this.moving = false;
          },
        });
      }
    }
  }
}
