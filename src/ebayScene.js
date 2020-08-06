import Button from './button.js';

/**
 * Represent the description and credits scene.
 *
 * @export
 * @class EbayScene
 * @extends {Phaser.Scene}
 */
export default class EbayScene extends Phaser.Scene {
  /**
   * Creates an instance of EbayScene.
   * @memberof EbayScene
   */
  constructor() {
    super('EbayScene');
  }

  /**
   * Creates the content of the EbayScene.
   *
   * @memberof EbayScene
   */
  create() {
    let opened = false;
    const info = new Button(this, 128, 48, 'sprites', 'ebay');
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
    const banner = this.add.image(-438, -200, 'sprites', 'ebaytitle');
    const film = this.add.image(-438, -100, 'sprites', 'filmezosestesface');
    const honk = this.add.image(-438, 25, 'sprites', 'honkface');
    const tuz = this.add.image(-438, 150, 'sprites', 'tuzinditoface');
    const div1 = this.add.text(-380, -100, `Filmezős estés - 1133 vidmani + ingyenes házhozszállítás
Nem szobatiszta, laktózérzékeny, fényérzékeny, allergiás az oxigénre, büdös.
Ajándék Pista közlegény megmentése DVD-vel.`, {
      fontSize: '14px',
      fontFamily: 'font',
      color: 'black',
      lineSpacing: 6,
      align: 'left',
    }).setOrigin(0, 0.5);
    const div2 = this.add.text(-380, 25, `Honk - 15 vidmani + ingyenes házhozszállítás
Ért a kisállatokhoz, tud bánni a kisgyerekekkel, lehet vele jókat játszani, nem beszél feleslegesen, nem zabálja fel a 
kajádat, nem issza meg a sörödet, mint a suttyó barátaid. A te pártodat fogja, ha a házastársad problémázik valamin, 
és ha dolgod adódna a rendőrséggel, nem fog köpni (csak a határon).`, {
      fontSize: '14px',
      fontFamily: 'font',
      color: 'black',
      lineSpacing: 6,
      align: 'left',
    }).setOrigin(0, 0.5);
    const div3 = this.add.text(-380, 150, `Tűzindító - 8522 vidmani + ingyenes házhozszállítás
Véletlenszerűen hozza rád a frászt, szétpakolja a cuccaidat, gyújtogat.
Ajándék fotóval és zsálya illatú füstölőpálcával, ami megtisztítja a házat a nem kívánatos energiáktól és képzeletbeli 
barátoktól (NAV ellenőröktől nem).`, {
      fontSize: '14px',
      fontFamily: 'font',
      color: 'black',
      lineSpacing: 6,
      align: 'left',
    }).setOrigin(0, 0.5);
    const window = this.add.container(512, 904, [bg, banner, film, honk, tuz,
      div1, div2, div3]);
    window.visible = false;
  }
}
