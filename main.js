var blipp = require('blippar').blipp;
var scene = blipp.addScene();

// Global variables
var mW = blipp.getMarker().getWidth();
var mH = blipp.getMarker().getHeight();

// Scene creation
scene.onCreate = function() {
    var Plane = scene.addSprite().setColor('#ff7d32aa').setScale(mW, mH, 1);
}
