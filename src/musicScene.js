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
    this.title = this.sound.add('title', {
      loop: false,
      volume: 0,
    });
    this.level = this.sound.add('level', {
      loop: true,
      volume: 0,
    });
    this.battle = this.sound.add('battle', {
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
    this.add.container(976, 48, [
      musicbutton,
    ]);
  }

  /**
   * Plays the specified track.
   * If there is already a track playing, and it's different than the specified
   * one track, it fades out the current track, then fades in the new one.
   * If it's the specified track that is now playing, it won't be interrupted.
   * If nothing is playing, it simply fades in the specified track.
   *
   * @param {string} track
   * @memberof MusicScene
   */
  play(track) {
    /* If the currently playing track is the same as the track to be played. */
    if (this.currentName === track) {
      /* Do nothing. */
      return;
    }
    /* If a track change is currently in progress, but the user has initiated
    another one, fast forward the change. */
    if (this.fadeout) {
      this.fadeout.stop();
      this.current.volume = 0;
    }
    if (this.fadein) {
      this.fadein.stop();
      this.current.volume = this.volume;
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
    const next = [this.title, this.level, this.battle][music];
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
