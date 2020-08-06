import Profile from './profile.js';

/**
 * Represent the load screen of the game.
 *
 * @export
 * @class LoadScene
 * @extends {Phaser.Scene}
 */
export default class LoadScene extends Phaser.Scene {
  /**
   * Creates an instance of LoadScene.
   * @memberof LoadScene
   */
  constructor() {
    /* Create the LoadScene with a pre-preloaded package of the progress bar
    parts, to display it while all the other assets are loading. */
    super({
      key: 'LoadScene',
      pack: {
        files: [
          {
            type: 'image',
            key: 'bar',
            url: 'image/bar.png',
          },
          {
            type: 'image',
            key: 'border',
            url: 'image/border.png',
          },
        ],
      },
    });
  }

  /**
   * Loads all the assets while the pre-preloaded progress bar shows the
   * progress of the loading.
   *
   * @memberof LoadScene
   */
  preload() {
    const border = this.add.image(0, 0, 'border');
    const mask = this.add.image(512, 288, 'bar');
    mask.visible = false;
    const bar = this.add.image(-mask.width, 0, 'bar');
    bar.mask = new Phaser.Display.Masks.BitmapMask(this, mask);
    this.container = this.add.container(512, 288, [border, mask, bar]);
    this.load.on('progress', (value) => {
      this.tweens.add({
        targets: bar,
        x: mask.width * (value - 1),
        ease: 'Quad',
        duration: 300,
      });
    });
    this.load.atlas('sprites', 'image/sprites.png', 'image/sprites.json');
    this.load.image('bg', 'image/bg.png');
    this.load.image('title', 'image/title.png');
    this.load.image('utca', 'image/utca.png');
    this.load.image('mailbanner', 'image/mailbanner.png');
    this.load.tilemapTiledJSON('map', 'data/map.json');
    this.load.image('tileset', 'data/tileset.png');
    this.load.audio('title', 'audio/title.mp3');
    this.load.audio('level', 'audio/music_zapsplat_stay_away.mp3');
    this.load.audio('battle', 'audio/music_zapsplat_tuff_enough.mp3');
  }

  /**
   * Creates the start button.
   *
   * @memberof LoadScene
   */
  create() {
    Profile.star = parseInt(localStorage.getItem('star')) || 0;
    Profile.progress = parseInt(localStorage.getItem('progress')) || 0;
    Profile.time = parseInt(localStorage.getItem('time')) || 1;
    for (let i = 0; i < 15; i += 1) {
      Profile.level[i] = parseInt(localStorage.getItem('level' + i));
    }
    this.scene.start('TitleScene');
  }
}
