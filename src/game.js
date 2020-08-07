import LoadScene from './loadScene.js';
import TitleScene from './titleScene.js';
import WorldScene from './worldScene.js';
import InfoScene from './infoScene.js';
import BattleScene from './battleScene.js';
import MusicScene from './musicScene.js';
import MailScene from './mailScene.js';
import EbayScene from './ebayScene.js';

new Phaser.Game({
  type: Phaser.AUTO,
  backgroundColor: '#fff',
  scale: {
    parent: 'game-container',
    mode: Phaser.Scale.FIT,
    width: 1024,
    height: 576,
  },
  scene: [
    LoadScene,
    TitleScene,
    InfoScene,
    WorldScene,
    MailScene,
    EbayScene,
    BattleScene,
    MusicScene,
  ],
});
