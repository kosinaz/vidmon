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
    const next = this.map.createStaticLayer('next', tileset, 0, 0);
    const above1 = this.map.createStaticLayer('above1', tileset, 0, 0);
    const above2 = this.map.createStaticLayer('above2', tileset, 0, 0);
    next.setCollision();
    const starttile = next.findByIndex(317);
    this.player = this.add.sprite(
        starttile.getCenterX(),
        starttile.getCenterY(),
        'sprites',
        'down3',
    );
    this.anims.create({
      key: 'down',
      frames: [
        {key: 'sprites', frame: 'down3'},
        {key: 'sprites', frame: 'down2'},
        {key: 'sprites', frame: 'down1'},
        {key: 'sprites', frame: 'down2'},
        {key: 'sprites', frame: 'down3'},
        {key: 'sprites', frame: 'down4'},
        {key: 'sprites', frame: 'down5'},
        {key: 'sprites', frame: 'down4'},
      ],
      frameRate: 10,
      repeat: -1,
    });
    // this.player.play('down');
    this.anims.create({
      key: 'right',
      frames: [
        {key: 'sprites', frame: 'right3'},
        {key: 'sprites', frame: 'right2'},
        {key: 'sprites', frame: 'right1'},
        {key: 'sprites', frame: 'right2'},
        {key: 'sprites', frame: 'right3'},
        {key: 'sprites', frame: 'right4'},
        {key: 'sprites', frame: 'right5'},
        {key: 'sprites', frame: 'right4'},
      ],
      frameRate: 10,
      repeat: -1,
    });
    // this.player.play('right');
    this.anims.create({
      key: 'up',
      frames: [
        {key: 'sprites', frame: 'up3'},
        {key: 'sprites', frame: 'up2'},
        {key: 'sprites', frame: 'up1'},
        {key: 'sprites', frame: 'up2'},
        {key: 'sprites', frame: 'up3'},
        {key: 'sprites', frame: 'up4'},
        {key: 'sprites', frame: 'up5'},
        {key: 'sprites', frame: 'up4'},
      ],
      frameRate: 10,
      repeat: -1,
    });
    // this.player.play('up');
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(
        0, 0, next.x + next.width, next.y + next.height,
    );
  }

  /**
   *
   * @memberof LevelScene
   */
  update() {

  }
}
