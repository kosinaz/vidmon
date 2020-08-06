import Button from './button.js';

/**
 * Represents the music controller.
 *
 * @export
 * @class MusicScene
 * @extends {Phaser.Scene}
 */
export default class MusicScene extends Phaser.Scene {
  /**
   * Creates an instance of MusicScene.
   * @memberof MusicScene
   */
  constructor() {
    super('MusicScene');
  }

  /**
   * Creates the content of the MusicScene.
   *
   * @memberof MusicScene
   */
  create() {
    this.volume = 1;
    this.menu = this.sound.add('title', {
      loop: true,
      volume: 0,
    });
    this.level = this.sound.add('level', {
      loop: true,
      volume: 0,
    });
    this.win = this.sound.add('battle', {
      loop: true,
      volume: 0,
    });
    const musicbutton = new Button(this, 0, 0, 'sprites', 'music3');
    musicbutton.on('click', () => {
      if (this.fadeout) {
        this.fadeout.stop();
      }
      if (this.fadein) {
        this.fadein.stop();
      }
      if (this.volume === 0) {
        this.volume = 0.3;
        musicbutton.list[0].setFrame('music1');
      } else if (this.volume === 0.3) {
        this.volume = 0.6;
        musicbutton.list[0].setFrame('music2');
      } else if (this.volume === 0.6) {
        this.volume = 1;
        musicbutton.list[0].setFrame('music3');
      } else if (this.volume === 1) {
        this.volume = 0;
        musicbutton.list[0].setFrame('music0');
      }
      if (this.current) {
        this.current.volume = this.volume;
      }
    });
    this.add.container(960, 64, [
      musicbutton,
    ]);
  }
  /**
   *
   *
   * @param {number} music
   * @memberof MusicScene
   */
  play(music) {
    if (this.fadeout) {
      this.fadeout.stop();
    }
    if (this.fadein) {
      this.fadein.stop();
    }
    if (this.current === [this.menu, this.level, this.win][music]) {
      return;
    }
    const previous = this.current;
    if (previous && this.volume > 0) {
      this.fadeout = this.tweens.add({
        targets: previous,
        volume: 0,
        duration: 500,
        onComplete: () => {
          previous.stop();
        },
      });
    }
    const next = [this.menu, this.level, this.win][music];
    next.volume = 0;
    next.play();
    this.current = next;
    this.fadein = this.tweens.add({
      targets: next,
      volume: this.volume,
      duration: 2000,
    });
  }
}
