import LoadScene from './loadScene.js';
import TitleScene from './titleScene.js';
import MenuScene from './menuScene.js';
import LevelScene from './levelScene.js';
import PauseScene from './pauseScene.js';
import WinScene from './winScene.js';
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
    MenuScene,
    InfoScene,
    LevelScene,
    PauseScene,
    MailScene,
    EbayScene,
    WinScene,
    BattleScene,
    MusicScene,
  ],
});
