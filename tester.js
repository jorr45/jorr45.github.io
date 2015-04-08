window.addEventListener("load",function() {
var Q = window.Q = Quintus()
        .include("Sprites, Scenes, Input, 2D, Touch, UI")
        // Maximize this game to whatever the size of the browser is
        .setup({ width:320,height:320 })
        // And turn on default input controls and touch input (for UI)
        .controls(true).touch();
Q.scene("level1",function(stage) {
    stage.insert(new Q.TileLayer({ dataAsset: 'level.json', sheet: 'tiles' }));
});


Q.load("tile.gif", function() {
    Q.sheet("tiles", "tile.gif", {tilew: 32, tileh: 32});
    Q.stageScene("level1");
});
});