import Button from './button.js';

/**
 * Represent the description and credits scene.
 *
 * @export
 * @class MailScene
 * @extends {Phaser.Scene}
 */
export default class MailScene extends Phaser.Scene {
  /**
   * Creates an instance of MailScene.
   * @memberof MailScene
   */
  constructor() {
    super('MailScene');
  }

  /**
   * Creates the content of the MailScene.
   *
   * @memberof MailScene
   */
  create() {
    let opened = false;
    const info = new Button(this, 48, 48, 'sprites', 'mail');
    info.on('click', () => {
      if (!opened) {
        window.visible = true;
        opened = true;
        this.tweens.add({
          duration: 150,
          targets: window,
          y: 328,
        });
      } else {
        opened = false;
        this.tweens.add({
          duration: 150,
          targets: window,
          y: 904,
          onComplete: () => {
            window.visible = false;
          },
        });
      }
    });
    const bg = this.add.graphics();
    bg.fillStyle(0xffffff);
    bg.fillRect(-512, -250, 1024, 500);
    bg.setAlpha(0.95);
    const banner = this.add.image(0, -128, 'mailbanner');
    const div1 = this.add.text(64, 128, `MISSION #1: ÁLLÍTSD MEG A HAJHULLÁST!
(Egy ZS-kategóriás videójáték első küldetése.)

A rettegett hajhullagyártó, Hajhullás, rászabadította szörnyeit a városra. 
Csak te állíthatod meg! Győzd le a Hajhullákat, majd szállj szembe magával
Hajhullással!

Jutalom: 10.000 Vidmani
`, {
      fontSize: '16px',
      fontFamily: 'font',
      color: 'black',
      lineSpacing: 6,
      align: 'left',
    }).setOrigin(0.5);
    const div2 = this.add.text(-496, -24, `
 
Csillagozott levelek
Fontos
Elküldött levelek
Piszkozatok`, {
      fontSize: '16px',
      fontFamily: 'font',
      color: 'black',
      lineSpacing: 12,
      align: 'left',
    }).setOrigin(0, 0);
    const div3 = this.add.text(-496, -24, '\nBeérkező levelek (1)', {
      fontSize: '16px',
      fontFamily: 'font',
      color: 'red',
      lineSpacing: 12,
      align: 'left',
    }).setOrigin(0, 0);
    const window = this.add.container(512, 904, [bg, banner, div1, div2, div3]);
    window.visible = false;
  }
}
