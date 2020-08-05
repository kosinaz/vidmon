import Button from './button.js';
/**
 * Represent the home screen of the game.
 *
 * @export
 * @class BattleScene
 * @extends {Phaser.Scene}
 */
export default class BattleScene extends Phaser.Scene {
  /**
   * Creates an instance of BattleScene.
   * @memberof BattleScene
   */
  constructor() {
    super('BattleScene');
  }

  /**
   * Creates the content of the BattleScene.
   *
   * @param {*} data
   * @memberof BattleScene
   */
  create(data) {
    this.scene.get('MusicScene').play(1);
    this.add.image(512, 288, 'utca');
    this.add.image(100, 400, 'sprites', 'player').setOrigin(0.5, 1);
    this.add.image(774, 400, 'sprites', 'hajhulla').setOrigin(0.5, 1);
    this.vidmon = '';
    const bgtop = this.add.graphics();
    bgtop.fillStyle(0xffffff);
    bgtop.fillRect(0, 0, 1024, 100);
    bgtop.setAlpha(0.95);
    this.megtamadtak = this.add.text(512, 50, 'Egy Hajhulla támad rád!', {
      fontSize: '36px',
      fontFamily: 'font',
      color: 'black',
      lineSpacing: 10,
      align: 'center',
    }).setOrigin(0.5);
    const bgbottom = this.add.graphics();
    bgbottom.fillStyle(0xffffff);
    bgbottom.fillRect(0, 426, 1024, 150);
    bgbottom.setAlpha(0.95);
    this.valasszvidmont = this.add.text(512, 450, 'Válassz egy vidmont!', {
      fontSize: '24px',
      fontFamily: 'font',
      color: 'black',
      lineSpacing: 10,
      align: 'center',
    }).setOrigin(0.5);
    this.fejesface = new Button(
        this, 452, 516, 'sprites', 'fejeslabasmellesface',
    );
    this.fejesface.once('clicked', () => {
      this.chosen('fejeslabasmelles', 'Fejes lábas melles');
    });
    this.baratface = new Button(
        this, 572, 516, 'sprites', 'baratkozoeladoface',
    );
    this.baratface.once('clicked', () => {
      this.chosen('baratkozoelado', 'Barátkozó eladó');
    });
  }
  /**
   *
   *
   * @param {*} vidmon
   * @param {*} vidmonname
   * @memberof BattleScene
   */
  chosen(vidmon, vidmonname) {
    this.vidmon = vidmon;
    this.megtamadtak.destroy();
    this.valasszvidmont.destroy();
    this.fejesface.destroy();
    this.baratface.destroy();
    this.add.image(250, 400, 'sprites', vidmon).setOrigin(0.5, 1);
    this.playerface = this.add.image(50, 50, 'sprites', 'playerface');
    this.valasztott = this.add.text(125, 50,
        vidmonname + ', téged választalak!', {
          fontSize: '24px',
          fontFamily: 'font',
          color: 'black',
          lineSpacing: 10,
          align: 'left',
        }).setOrigin(0, 0.5);
    this.valasszakciot = this.add.text(512, 450, 'Válassz egy akciót!', {
      fontSize: '24px',
      fontFamily: 'font',
      color: 'black',
      lineSpacing: 10,
      align: 'center',
    }).setOrigin(0.5);
    if (vidmon === 'fejeslabasmelles') {
      this.action1 = new Button(
          this, 512, 496, 'sprites', 'button', 'Segges ugrás',
      );
      this.action2 = new Button(
          this, 512, 546, 'sprites', 'button', 'Zserbósütés',
      );
    } else {
      this.action1 = new Button(
          this, 512, 496, 'sprites', 'button', 'Késelés',
      );
      this.action2 = new Button(
          this, 512, 546, 'sprites', 'button', 'Éneklés',
      );
    }
    this.action1.once('clicked', () => {
      this.act(0);
    });
    this.action2.once('clicked', () => {
      this.act(1);
    });
  }
  /**
   *
   *
   * @param {*} i
   * @memberof BattleScene
   */
  act(i) {
    this.playerface.destroy();
    this.valasztott.destroy();
    this.valasszakciot.destroy();
    this.action1.destroy();
    this.action2.destroy();
    if (this.vidmon === 'fejeslabasmelles') {
      if (!i) {
        this.valasszvidmont = this.add.text(25, 50, 'Fejes lábas melles' +
        ' seggest ugrik Hajhulla arcába. Hajhulla veszít 33 életet!', {
          fontSize: '24px',
          fontFamily: 'font',
          color: 'black',
          lineSpacing: 10,
          align: 'left',
        }).setOrigin(0, 0.5);
      } else {
        this.valasszvidmont = this.add.text(25, 50, 'Fejes lábas melles' +
          ' zserbót süt Hajhullának. Hajhulla belefeledkezik az evésbe.', {
          fontSize: '24px',
          fontFamily: 'font',
          color: 'black',
          lineSpacing: 10,
          align: 'left',
        }).setOrigin(0, 0.5);
      }
    } else {
      if (!i) {
        this.valasszvidmont = this.add.text(25, 50, 'Barátkozó eladó' +
          ' doktorbácsisat játszik a késével. Hajhulla veszít 50 életet!', {
          fontSize: '24px',
          fontFamily: 'font',
          color: 'black',
          lineSpacing: 10,
          align: 'left',
        }).setOrigin(0, 0.5);
      } else {
        this.valasszvidmont = this.add.text(25, 50, 'Barátkozó eladó' +
          ' a fridzsiderben alvó hegyekről énekel. Hajhulla ledermed.', {
          fontSize: '24px',
          fontFamily: 'font',
          color: 'black',
          lineSpacing: 10,
          align: 'left',
        }).setOrigin(0, 0.5);
      }
    }
  }
}
