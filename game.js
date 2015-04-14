window.addEventListener("load",function(e) {
var Q = window.Q = Quintus()
        .include("Sprites, Scenes, Input, 2D, Touch, UI, Anim");
Q.NONE=0;
Q.SPRITE_ALL= 0xFFFF;
Q.setup({width: 420, height: 420}).touch(Q.SPRITE_ALL).controls(true);

Q.BLUE = 16;
Q.RED = 32;

Q.gravityX=0; Q.gravityY=0;
var turnTracking=0;
var player="Blue";
var placementTracking=0;
var labels=[];

Q.endTurn = function(){
	if (player=="Blue"){
		player="Red";
	}
	else if (player=="Red"){
		player="Blue";
		turnTracking++;
	}
	//if (turnTracking==0) Q.nextPlacement;
};

Q.nextPlacement= function(){
	var stage=Q.stage();
	var newOne=[];
	while (placementTracking < 40){
	var xcoord=Q.width/20+(Q.width/10)*(placementTracking%10);
	var ycoord=Q.height/20+(Q.height/10)*Math.floor(placementTracking/10);
        console.log(ycoord);
        
       // for (var i=0; i<)
        
	
	if (placementTracking<=0){
		newOne[placementTracking]=stage.insert(new Q.BF({ x: xcoord, y: ycoord, placement: placementTracking }));
	}
	else if (placementTracking<=6){
		newOne[placementTracking]=stage.insert(new Q.BB({ x: xcoord, y: ycoord, placement: placementTracking }));
	}
	else if (placementTracking<=14){
		newOne[placementTracking]=stage.insert(new Q.B9({ x: xcoord, y: ycoord, placement: placementTracking }));
	}
	else if (placementTracking<=19){
		newOne[placementTracking]=stage.insert(new Q.B8({ x: xcoord, y: ycoord, placement: placementTracking }));
	}
	else if (placementTracking<=23){
		newOne[placementTracking]=stage.insert(new Q.B7({ x: xcoord, y: ycoord, placement: placementTracking }));
	}
	else if (placementTracking<=27){
		newOne[placementTracking]=stage.insert(new Q.B6({ x: xcoord, y: ycoord, placement: placementTracking }));
	}
	else if (placementTracking<=31){
		newOne[placementTracking]=stage.insert(new Q.B5({ x: xcoord, y: ycoord, placement: placementTracking }));
	}
	else if (placementTracking<=34){
		newOne[placementTracking]=stage.insert(new Q.B4({ x: xcoord, y: ycoord, placement: placementTracking }));
	}
	else if (placementTracking<=36){
		newOne[placementTracking]=stage.insert(new Q.B3({ x: xcoord, y: ycoord, placement: placementTracking }));
	}
	else if (placementTracking<=37){
		newOne[placementTracking]=stage.insert(new Q.B2({ x: xcoord, y: ycoord, placement: placementTracking }));
	}
	else if (placementTracking<=38){
		newOne[placementTracking]=stage.insert(new Q.B1({ x: xcoord, y: ycoord, placement: placementTracking }));
	}
	else if (placementTracking<=39){
		newOne[placementTracking]=stage.insert(new Q.BS({ x: xcoord, y: ycoord, placement: placementTracking }));
	}
        if (player=="Blue"){
	labels[placementTracking]=Q.stage().insert(new Q.UI.Button({
        label: newOne[placementTracking].p.value,
        color: "white",
      x: xcoord,
      y: ycoord
    }, function() {}));
        }
	placementTracking++;
	
	}
while (placementTracking >= 40 && placementTracking<80){
	var xcoord=Q.width/20+(Q.width/10)*(placementTracking%10);
	var ycoord=Q.height-(Q.height/20+ (Q.height/10) *Math.floor((placementTracking-40)/10));

	if (placementTracking<=40){
		newOne[placementTracking]=stage.insert(new Q.RF({ x: xcoord, y: ycoord, placement: placementTracking }));
	}
	else if (placementTracking<=46){
		newOne[placementTracking]=stage.insert(new Q.RB({ x: xcoord, y: ycoord, placement: placementTracking }));
	}
	else if (placementTracking<=54){
		newOne[placementTracking]=stage.insert(new Q.R9({ x: xcoord, y: ycoord, placement: placementTracking }));
	}
	else if (placementTracking<=59){
		newOne[placementTracking]=stage.insert(new Q.R8({ x: xcoord, y: ycoord, placement: placementTracking }));
	}
	else if (placementTracking<=63){
		newOne[placementTracking]=stage.insert(new Q.R7({ x: xcoord, y: ycoord, placement: placementTracking }));
	}
	else if (placementTracking<=67){
		newOne[placementTracking]=stage.insert(new Q.R6({ x: xcoord, y: ycoord, placement: placementTracking }));
	}
	else if (placementTracking<=71){
		newOne[placementTracking]=stage.insert(new Q.R5({ x: xcoord, y: ycoord, placement: placementTracking }));
	}
	else if (placementTracking<=74){
		newOne[placementTracking]=stage.insert(new Q.R4({ x: xcoord, y: ycoord, placement: placementTracking }));
	}
	else if (placementTracking<=76){
		newOne[placementTracking]=stage.insert(new Q.R3({ x: xcoord, y: ycoord, placement: placementTracking }));
	}
	else if (placementTracking<=77){
		newOne[placementTracking]=stage.insert(new Q.R2({ x: xcoord, y: ycoord, placement: placementTracking }));
	}
	else if (placementTracking<=78){
		newOne[placementTracking]=stage.insert(new Q.R1({ x: xcoord, y: ycoord, placement: placementTracking }));
	}
	else if (placementTracking<=79){
		newOne[placementTracking]=stage.insert(new Q.RS({ x: xcoord, y: ycoord, placement: placementTracking }));
	} 
    //if (player=="Red"){
    console.log(newOne[placementTracking]);
	labels[placementTracking]=Q.stage().insert(new Q.UI.Button({
      label: newOne[placementTracking].p.value,
        
      x: xcoord,
      y: ycoord
    }, function() {}));
    //}
	placementTracking++;    
}
	
/////////////////PIECE//////////////////
};
Q.Sprite.extend("Piece", {
  init: function(p,defaults) {

    this._super(p,Q._defaults(defaults||{},{
      collisionMask: Q.NONE,
      originalX: p.x,
      originalY: p.y,
      value: 0
    }));

    this.add("2d");
    this.on("drag");
    this.on("touchEnd");

    },

    drag: function(touch) {
       this.p.x = touch.origX + touch.dx;
       this.p.y = touch.origY + touch.dy;
        labels[this.p.placement].destroy();
        labels[this.p.placement]=Q.stage().insert(new Q.UI.Button({
        label: this.p.value,
        color: "white",
      x: this.p.x,
      y: this.p.y
    }, function() {}));
     },

     touchEnd: function(touch) {
         this.validateMove (this.p.x, this.p.y);
         this.p.originalX=this.p.x; this.p.originalY=this.p.y;
     },

     collide: function(x, y){
        var destroyThis=false;
        var destroyOther=false;
         var collided=false;
         var possibles=Q(".2d");
         
         //possibles.invoke("checkLocation",x, y);
        for (var i=0; i<possibles.length; i++){
             console.log(possibles.at(i).checkLocation(x,y));
             if (possibles.at(i).checkLocation(x,y) && possibles.at(i)!=this){ collided=possibles.at(i);
             }
         }
         console.log(collided);
        this.p.x=x; this.p.y=y;
        if (!collided || collided.className==this.className){
            console.log("No Collision");
            this.p.originalX=this.p.x;
         this.p.originalY=this.p.y;
          Q.endTurn();
            labels[this.p.placement].destroy();
            labels[this.p.placement]=Q.stage().insert(new Q.UI.Button({
            label: this.p.value,
            color: "white",
            x: x,
            y: y
        }, function() {}));
        }
        else if (collided.p.team==this.p.team){
            console.log("Same Team");
            this.p.x=this.p.originalX; this.p.y=this.p.originalY;
            labels[this.p.placement].destroy();
            labels[this.p.placement]=Q.stage().insert(new Q.UI.Button({
            label: this.p.value,
            color: "white",
            x: this.p.x,
            y: this.p.y
        }, function() {}));
        }
        else if (this.p.value==8 && collided.p.value=='B' || this.p.value=='S' && collided.p.value=='1'){ 
            destroyThis=false; destroyOther=true;
        }
        //else if (collided.p.value=='F') Q.victory();
         else if (collided.p.value==this.p.value){
             destroyThis=true;
             destroyOther=true;
             console.log("Same value");
         }
        else if (collided.p.value<this.p.value || collided.p.value=='B'){     
          destroyThis=true;     
        }
        else if (collided.p.value>=this.p.value && collided.p.value!='B' || collided.p.value=='F') {destroyOther=true;}
        if (destroyOther) {
            console.log("Destroy Other");
            collided.destroy();
            this.p.x=x; this.p.y=y;
            labels[collided.p.placement].destroy();
            labels[this.p.placement].destroy();
            if (!destroyThis){
                labels[this.p.placement]=Q.stage().insert(new Q.UI.Button({
                label: this.p.value,
                color: "white",
                x: x,
                y: y
                }, function() {}));
            }
        }
        if (destroyThis) {
            console.log("Destroy This");
            this.destroy(); 
            labels[this.p.placement].destroy();}
         
        if (destroyThis||destroyOther) {this.p.originalX=this.p.x;
         this.p.originalY=this.p.y;Q.endTurn();}
     },
    
     validateMove: function (x, y){
        var validMove=true;
        x=Math.floor(x/(Q.width/10))*(Q.width/10)+(Q.width/20);
        y=Math.floor(y/(Q.height/10))*(Q.height/10)+(Q.height/20);
        //console.log("y: "+y+"; originaly: "+this.p.originalY);
        if (x!=this.p.originalX && y!=this.p.originalY){ validMove=false;}
        if (x==this.p.originalX && y==this.p.originalY){ validMove=false;}
        if (Math.abs(x-this.p.originalX)>Q.width/10) {validMove=false;}
        if (Math.abs(y-this.p.originalY)>Q.height/10){ validMove=false;}
        if (Q.height/10*4<=y && Q.height/10*6>=y && (Q.width/10*2<=x && Q.height/10*4>=x || Q.width/10*6<=x && Q.height/10*8>=x)) {validMove=false;}
        if (validMove) {this.collide(x,y); }
        else{
            console.log("Invalid move");
            this.p.x=this.p.originalX; this.p.y=this.p.originalY;
            labels[this.p.placement].destroy();
            labels[this.p.placement]=Q.stage().insert(new Q.UI.Button({
            label: this.p.value,
            color: "white",
            x: this.p.originalX,
            y: this.p.originalY
        }, function() {}));}
     },
	step: function(dt) {
       if(this.p.over) {
         this.p.scale = 1.2;
          this.p.type=Q.SPRITE_ACTIVE_PIECE;
       } else {
         this.p.scale = 1.;
           this.p.type=Q.SPRITE_INACTIVE_PIECE;
       }
	},
    
    checkLocation: function (x, y){
        if (x==this.p.x && y==this.p.y){
           return true; 
        }
        else return false;
    }
   
});

Q.Piece.extend("Blue", {
  init: function(p, defaults) {

    this._super(p,Q._defaults(defaults||{},{
        asset: "blue-rectangle.png",
        team: "Blue",
        type: Q.BLUE
    }));
},

    /* validatePlacement: function(x, y){
	var validPlacement=true;
	x=Math.floor(x/(Q.width/10))*(Q.width/10)+(Q.width/20);
	y=Math.floor(y/(Q.height/10))*(Q.height/10)+(Q.height/20);
	//if (y>(Q.height/20)+(Q.height/10)*4 || y<0) {validPlacement=false;}
	//if (Q.stage().locate(x,y)!=null){ validPlacement=false;}
	if (validPlacement) {this.p.x=x; this.p.y=y; this.p.placing=false; 
		//if (placementTracking<40){Q.nextPlacement()}
		//else {Q.endTurn();}
	}
     },*/
     drag: function(touch) {
        if (player=="Blue"){
           this._super(touch);
        }
     },
    touchEnd: function(touch) {
        if (player=="Blue"){
           this._super(touch);
        }
     }

});

Q.Blue.extend("B9", {
  init: function(p) {
    this._super(p,{
      value:9
    });

    },

    validateMove: function(x, y){
	 var validMove=true;
        x=Math.floor(x/(Q.width/10))*(Q.width/10)+(Q.width/20);
        y=Math.floor(y/(Q.height/10))*(Q.height/10)+(Q.height/20);
        //console.log("y: "+y+"; originaly: "+this.p.originalY);
        if (x!=this.p.originalX && y!=this.p.originalY){ validMove=false;}
        if (x==this.p.originalX && y==this.p.originalY){ validMove=false;}
       

	var xsign, ysign;
	if (x>this.p.originalX) {xSign=1;} else xSign=-1;
	if (y>this.p.originalY) {ySign=1;} else ySign=-1;

	if (validMove){for (var i=(Q.width/10); i<xSign*(x-this.p.originalX); i=i+(Q.width/10)*xSign){
	  if (Q.stage().locate(this.p.originalX+i, y)){
		validMove=false;
		break;
	  }
	}}
	if (validMove){for (var i=(Q.height/10); i<ySign*(y-this.p.originalY); i=i+(Q.height/10)*ySign){
	  if (Q.stage().locate(x, this.p.originalY+i)){
		validMove=false;
		break;
	  }
	}}

	 if (validMove) {this.collide(x,y); }
        else{this.p.x=this.p.originalX; this.p.y=this.p.originalY;
            labels[this.p.placement].destroy();
            labels[this.p.placement]=Q.stage().insert(new Q.UI.Button({
            label: this.p.value,
            color: "white",
            x: this.p.x,
            y: this.p.y
        }, function() {}));}
    }
  

});

Q.Blue.extend("B8", {
  init: function(p) {
    this._super(p,{
      value: 8
    });
  }
});

Q.Blue.extend("B7", {
  init: function(p) {
    this._super(p,{
      value: 7
    });
  }
});

Q.Blue.extend("B6", {
  init: function(p) {
    this._super(p,{
      value: 6
    });
  }
});

Q.Blue.extend("B5", {
  init: function(p) {
    this._super(p,{
      value: 5
    });
  }
});
Q.Blue.extend("B4", {
  init: function(p) {
    this._super(p,{
      value: 4
    });
  }
});
Q.Blue.extend("B3", {
  init: function(p) {
    this._super(p,{
      value: 3
    });
  }
});
Q.Blue.extend("B2", {
  init: function(p) {
    this._super(p,{
      value: 2
    });
  }
});
Q.Blue.extend("B1", {
  init: function(p) {
    this._super(p,{
      value: 1
    });
  }
});
Q.Blue.extend("BS", {
  init: function(p) {
    this._super(p,{
      value: 'S'
    });
  }
});
Q.Blue.extend("BB", {
  init: function(p) {
    this._super(p,{
      value: 'B'
    });
  },
  drag: function(touch) {
       if (this.p.placing==true) this._super(touch); 
  }
});
Q.Blue.extend("BF", {
  init: function(p) {
    this._super(p,{
        value: 'F'
    });
  },
  drag: function(touch) {
       if (this.p.placing==true) this._super(touch); 
  }
});


////////////////////////////RED/////////////////////////////
Q.Piece.extend("Red", {
  init: function(p, defaults) {

    this._super(p,Q._defaults(defaults||{},{
      asset: "red_rectangle.jpg",
        type: Q.RED,
        team:"Red"
    }));
	},

     /*validatePlacement: function(x, y){
	var validPlacement=true;
	x=Math.floor(x/(Q.width/10))*(Q.width/10)+(Q.width/20);
	y=Math.floor(y/(Q.height/10))*(Q.height/10)+(Q.height/20);
	if (y<Q.height-((Q.height/20)+(Q.height/10)*4) || y>Q.height) validPlacement=false;
	if (Q.stage().locate(x,y)!=null) validPlacement=false;
	if (validPlacement) {this.p.x=x; this.p.y=y; this.p.placing=false; 
		if (turnTracking<80)Q.nextPlacement();
		else Q.endTurn();}
     },*/
     drag: function(touch) {
       if (player=="Red") this._super(touch);
     },
    touchEnd: function(touch) {
        if (player=="Red"){
           this._super(touch);
        }
     }
    
});

Q.Red.extend("R9", {
  init: function(p) {
    this._super(p,{
      value:9
    });

    },

   
    validateMove: function(x, y){
	 var validMove=true;
        x=Math.floor(x/(Q.width/10))*(Q.width/10)+(Q.width/20);
        y=Math.floor(y/(Q.height/10))*(Q.height/10)+(Q.height/20);
        //console.log("y: "+y+"; originaly: "+this.p.originalY);
        if (x!=this.p.originalX && y!=this.p.originalY){ validMove=false;}
        if (x==this.p.originalX && y==this.p.originalY){ validMove=false;}
       

	var xsign, ysign;
	if (x>this.p.originalX) xSign=1; else xSign=-1;
	if (y>this.p.originalY) ySign=1; else ySign=-1;

	if (validMove){for (var i=(Q.width/10); i<xSign*(x-this.p.originalX); i=i+(Q.width/10)*xSign){
	  if (Q.stage().locate(this.p.originalX+i, y)){
		validMove=false;
		break;
	  }
	}}
	if (validMove){for (var i=(Q.height/10); i<ySign*(y-this.p.originalY); i=i+(Q.height/10)*ySign){
	  if (Q.stage().locate(x, this.p.originalY+i)){
		validMove=false;
		break;
	  }
	}}

	 if (validMove) {this.collide(x,y); }
        else{this.p.x=this.p.originalX; this.p.y=this.p.originalY;
            labels[this.p.placement].destroy();
            labels[this.p.placement]=Q.stage().insert(new Q.UI.Button({
            label: this.p.value,
            color: "white",
            x: this.p.x,
            y: this.p.y
        }, function() {}));}
    }
  

});

Q.Red.extend("R8", {
  init: function(p) {
    this._super(p,{
      value: 8
    });
  }
});

Q.Red.extend("R7", {
  init: function(p) {
    this._super(p,{
      value: 7
    });
  }
});

Q.Red.extend("R6", {
  init: function(p) {
    this._super(p,{
      value: 6
    });
  }
});

Q.Red.extend("R5", {
  init: function(p) {
    this._super(p,{
      value: 5
    });
  }
});
Q.Red.extend("R4", {
  init: function(p) {
    this._super(p,{
      value: 4
    });
  }
});
Q.Red.extend("R3", {
  init: function(p) {
    this._super(p,{
      value: 3
    });
  }
});
Q.Red.extend("R2", {
  init: function(p) {
    this._super(p,{
      value: 2
    });
  }
});
Q.Red.extend("R1", {
  init: function(p) {
    this._super(p,{
      value: 1
    });
  }
});
Q.Red.extend("RS", {
  init: function(p) {
    this._super(p,{
      value: 'S'
    });
  }
});
Q.Red.extend("RB", {
  init: function(p) {
    this._super(p,{
      value: 'B'
    });
  },
  drag: function(touch) {
        
  }
});
Q.Red.extend("RF", {
  init: function(p) {
    this._super(p,{
      value: 'F'
    });
  },
  drag: function(touch) {
        
  }
});


Q.scene("level1",function(stage) {
  stage.insert(new Q.Repeater({ asset: "Classic_board.jpg", speedX: 0.5, speedY: 0.5, type: 0 }));
});
    



Q.load("Classic_board.jpg, blue-rectangle.png, red_rectangle.jpg", function() {
    //Q.sheet("tiles", "tile.gif", {tilew: 32, tileh: 32});
    
    Q.stageScene("level1");
 
    //while (placementTracking<16)Q.nextPlacement();
	Q.nextPlacement();
});


  var currentObj = null;
  Q.el.addEventListener('mousemove',function(e) {
        
        var x = e.offsetX || e.layerX,
        y = e.offsetY || e.layerY,
        stage = Q.stage();

    // Use the helper methods from the Input Module on Q to
    // translate from canvas to stage
    var stageX = Q.canvasToStageX(x, stage),
        stageY = Q.canvasToStageY(y, stage);

    // Find the first object at that position on the stage
    var obj = stage.locate(stageX,stageY);

    
    // Set a `hit` property so the step method for the 
    // sprite can handle scale appropriately
    if(currentObj) { currentObj.p.over = false;
                   }
    if(obj) {
      currentObj = obj;
      obj.p.over = true;
        
    }
  });
});
