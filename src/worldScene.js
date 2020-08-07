/**
 * Represent the home screen of the game.
 *
 * @export
 * @class WorldScene
 * @extends {Phaser.Scene}
 */
export default class WorldScene extends Phaser.Scene {
  /**
   * Creates an instance of WorldScene.
   * @memberof WorldScene
   */
  constructor() {
    super('WorldScene');
  }

  /**
   * Creates the content of the WorldScene.
   *
   * @param {*} data
   * @memberof WorldScene
   */
  create(data) {
    this.scene.launch('MailScene');
    this.scene.launch('EbayScene');
    this.scene.get('MusicScene').play(1);
    this.map = this.make.tilemap({
      key: 'map',
    });
    const tileset = this.map.addTilesetImage('tileset', 'tileset');
    this.map.createStaticLayer('below', tileset, 0, 0);
    this.obstacles = this.map.createStaticLayer('obstacles', tileset, 0, 0);
    const starttile = this.obstacles.findByIndex(317);
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
        {key: 'sprites', frame: 'right3'},
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
    this.player = this.add.sprite(
        starttile.getCenterX() - 48,
        starttile.getCenterY(),
        'sprites',
        'down3',
    ).setOrigin(0.5, 0.7);
    this.anims.create({
      key: 'hajhulladown',
      frames: [
        {key: 'sprites', frame: 'hajhulladown2'},
        {key: 'sprites', frame: 'hajhulladown1'},
        {key: 'sprites', frame: 'hajhulladown2'},
        {key: 'sprites', frame: 'hajhulladown3'},
        {key: 'sprites', frame: 'hajhulladown4'},
        {key: 'sprites', frame: 'hajhulladown5'},
        {key: 'sprites', frame: 'hajhulladown4'},
        {key: 'sprites', frame: 'hajhulladown3'},
      ],
      frameRate: 9,
      repeat: -1,
    });
    // this.player.play('down');
    this.anims.create({
      key: 'hajhullaright',
      frames: [
        {key: 'sprites', frame: 'hajhullaright2'},
        {key: 'sprites', frame: 'hajhullaright1'},
        {key: 'sprites', frame: 'hajhullaright2'},
        {key: 'sprites', frame: 'hajhullaright3'},
        {key: 'sprites', frame: 'hajhullaright4'},
        {key: 'sprites', frame: 'hajhullaright5'},
        {key: 'sprites', frame: 'hajhullaright4'},
        {key: 'sprites', frame: 'hajhullaright3'},
      ],
      frameRate: 9,
      repeat: -1,
    });
    // this.player.play('right');
    this.anims.create({
      key: 'hajhullaup',
      frames: [
        {key: 'sprites', frame: 'hajhullaup2'},
        {key: 'sprites', frame: 'hajhullaup1'},
        {key: 'sprites', frame: 'hajhullaup2'},
        {key: 'sprites', frame: 'hajhullaup3'},
        {key: 'sprites', frame: 'hajhullaup4'},
        {key: 'sprites', frame: 'hajhullaup5'},
        {key: 'sprites', frame: 'hajhullaup4'},
        {key: 'sprites', frame: 'hajhullaup3'},
      ],
      frameRate: 9,
      repeat: -1,
    });
    // this.player.play('up');
    this.enemies = [];
    this.obstacles.forEachTile((tile) => {
      if (tile.index > 362 && tile.index < 373) {
        const hajhulla = this.add.sprite(
            tile.getCenterX(),
            tile.getCenterY() + 48,
            'sprites',
            'hajhulladown3',
        );
        hajhulla.setOrigin(0.5, 0.7);
        if (this.enemies.length % 2) {
          this.tweens.add({
            targets: hajhulla,
            x: '+=96',
            duration: 2500,
            flipX: true,
            yoyo: true,
            repeat: -1,
          });
          hajhulla.play('hajhullaright');
        } else {
          this.tweens.add({
            targets: hajhulla,
            y: '+=144',
            duration: 3750,
            yoyo: true,
            repeat: -1,
          });
          hajhulla.play('hajhulladown');
        }
        this.enemies.push(hajhulla);
      }
    });
    this.map.createStaticLayer('above1', tileset, 0, 0);
    this.map.createStaticLayer('above2', tileset, 0, 0);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, this.obstacles.width, this.obstacles.height);
    this.time.addEvent({delay: 1000, loop: true, callback: () => {
      this.enemies.forEach((enemy) => {
        // eslint-disable-next-line new-cap
        if (Phaser.Math.Distance.Between(
            enemy.x, enemy.y, this.player.x, this.player.y,
        ) < 150) {
          this.scene.pause();
          this.scene.launch('BattleScene');
          this.enemies.splice(this.enemies.indexOf(enemy), 1);
          enemy.destroy();
        }
      });
    }});
    this.events.on('resume', () => {
      this.scene.get('MusicScene').play(1);
    });
  }

  /**
   *
   * @memberof WorldScene
   */
  update() {
    if (this.input.activePointer.isDown && !this.moving &&
      this.input.activePointer.y > 96) {
      const worldPoint = this.cameras.main.getWorldPoint(
          this.input.activePointer.x,
          this.input.activePointer.y,
      );
      const pointerTileX = this.obstacles.worldToTileX(worldPoint.x);
      const pointerTileY = this.obstacles.worldToTileY(worldPoint.y);
      const playerTileX = this.obstacles.worldToTileX(this.player.x);
      const playerTileY = this.obstacles.worldToTileX(this.player.y);
      const xd = pointerTileX - playerTileX;
      const yd = pointerTileY - playerTileY;
      const nextTileX = playerTileX + (xd > 0 ? 1 : -1);
      const nextTileY = playerTileY + (yd > 0 ? 1 : -1);
      if (Math.abs(xd) > Math.abs(yd) &&
        !this.obstacles.getTileAt(nextTileX, playerTileY)) {
        this.moving = true;
        this.player.play('right');
        this.player.flipX = xd < 0;
        this.tweens.add({
          targets: this.player,
          x: this.obstacles.tileToWorldX(nextTileX) + 24,
          duration: 250,
          onComplete: () => {
            this.moving = false;
          },
        });
      } else if (!this.obstacles.getTileAt(playerTileX, nextTileY)) {
        this.moving = true;
        this.player.play(yd > 0 ? 'down' : 'up');
        this.tweens.add({
          targets: this.player,
          y: this.obstacles.tileToWorldY(nextTileY) + 24,
          duration: 250,
          onComplete: () => {
            this.moving = false;
          },
        });
      }
    }
  }
}
