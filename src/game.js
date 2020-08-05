import LoadScene from './loadScene.js';
import TitleScene from './titleScene.js';
import MenuScene from './menuScene.js';
import LevelScene from './levelScene.js';
import PauseScene from './pauseScene.js';
import WinScene from './winScene.js';
import MusicScene from './musicScene.js';
import InfoScene from './infoScene.js';
import BattleScene from './battleScene.js';

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
    LevelScene,
    PauseScene,
    WinScene,
    MusicScene,
    InfoScene,
    BattleScene,
  ],
});
