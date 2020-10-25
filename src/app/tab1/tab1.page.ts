import { Component } from '@angular/core';

declare var Phaser;
var that;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  game;
  back;
  mummy;
  anim;
  loopText;

  constructor() {
    that = Object.create(this.constructor.prototype);
    this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: that.preload, create: that.create, update: that.update });
  }


  preload() {
    this.game.load.image('lazur', 'assets/thorn_lazur.png');
    this.game.load.spritesheet('mummy', 'assets/metalslug_mummy37x45.png',
      37, 45, 18);
  }

  create() {
    // Set background
    this.back = this.game.add.image(0, -400, 'lazur');
    this.back.scale.set(2);
    this.back.smoothed = false;
    // Set mummy from a sprite
    this.mummy = this.game.add.sprite(200, 360, 'mummy', 5);
    this.mummy.scale.set(3);
    this.mummy.smoothed = false;
    // Set mummy animation
    this.anim = this.mummy.animations.add('walk');
    this.anim.onStart.add(that.animationStarted, this);
    this.anim.onLoop.add(that.animationLooped, this);
    this.anim.onComplete.add(that.animationStopped, this);
    this.anim.play(10, true);
  }

  animationStarted() {
    this.game.add.text(32, 32, 'Animation started', { fill: 'white' });
  }

  animationLooped() {
    if (this.anim.loopCount < 99) {
      this.loopText = this.game.add.text(32, 64, 'Animation looped',
        { fill: 'white' });
    }
    else {
      this.loopText.text = 'Animation looped x2';
      this.anim.loop = false;
    }

  }

  animationStopped() {
    this.game.add.text(32, 64 + 32, 'Animation stopped', { fill: 'white' });
  }

  update() {
    if (this.anim.isPlaying) { this.back.x -= 1; }
  }

}