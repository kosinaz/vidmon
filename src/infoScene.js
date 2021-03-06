import Button from './button.js';

/**
 * Represent the description and credits scene.
 *
 * @export
 * @class InfoScene
 * @extends {Phaser.Scene}
 */
export default class InfoScene extends Phaser.Scene {
  /**
   * Creates an instance of InfoScene.
   * @memberof InfoScene
   */
  constructor() {
    super('InfoScene');
  }

  /**
   * Creates the content of the InfoScene.
   *
   * @memberof InfoScene
   */
  create() {
    let opened = false;
    const info = new Button(this, 48, 48, 'sprites', 'info');
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
    bg.fillRect(-360, -200, 720, 400);
    bg.setAlpha(0.95);
    const div1 = this.add.text(0, 0,
        `Grafika
Rajzok - JustVidman (adaptálta: Kosina Zoltán)
Ikonok - Delapouite, Guard13007
Betűk - AlfaSlabOne - José Miguel Solé B.

Zene
Pokemon Theme Song Instrumental részlet
ZapSplat - Stay Away
ZapSplat - Tuff Enough`, {
          fontSize: '22px',
          fontFamily: 'font',
          color: 'black',
          lineSpacing: 10,
          align: 'center',
        }).setOrigin(0.5);
    const window = this.add.container(512, 904, [bg, div1]);
    window.visible = false;
  }
}
