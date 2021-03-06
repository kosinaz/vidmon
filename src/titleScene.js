import Button from './button.js';

/**
 * Represent the title screen of the game.
 *
 * @export
 * @class TitleScene
 * @extends {Phaser.Scene}
 */
export default class TitleScene extends Phaser.Scene {
  /**
   * Creates an instance of TitleScene.
   * @memberof TitleScene
   */
  constructor() {
    super('TitleScene');
  }

  /**
   *
   *
   * @param {*} data
   * @memberof TitleScene
   */
  create(data) {
    this.cameras.main.fadeIn(100);
    const bg = this.add.image(512, 288, 'bg');
    bg.setDisplaySize(1024, 576);
    this.add.image(490, 220, 'title');
    this.scene.run('InfoScene');
    this.scene.run('MusicScene');
    const play = new Button(this, 512, 480, 'sprites', 'playon');
    play.once('click', () => {
      play.disableInteractive();
      this.cameras.main.fadeOut(3000);
      this.scene.get('MusicScene').play(0);
    });
    this.input.keyboard.on('keydown', (event) => {
      event.preventDefault();
      if (event.key === '0') {
        this.add.text(8, 568, 'gode mode on', {
          fontSize: '16px',
          fontFamily: 'font',
        }).setOrigin(0, 1);
        Profile.progress = 15;
        Profile.invincible = true;
      } else {
        this.cameras.main.fadeOut(300);
      }
    });
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('WorldScene', {
        level: 0,
      });
    });
  }
}
