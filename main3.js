const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const canvas2 = document.getElementById("canvas2"),
      ctx2 = canvas2.getContext('2d');
var newData;
var sz = 2;
var fh = 10;
var populate = 1.5;
var pxData;
var w = canvas.width = window.innerWidth / sz;
var h = canvas.height = window.innerHeight / sz;
var  grid = new Uint16Array(w * h);
//window.onresize = getImageData();
var color=0;
 var w2 = canvas2.width = canvas2.width;
  var h2 = canvas2.height = canvas2.height;
var data;
var wind = 0;

getImageData()
function getImageData() {
    ctx.clearRect(0,0,w,h)
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0, 0, w, h);
    pxData = ctx.getImageData(0, 0, w, h);
    
}
 anim();
 
function anim() {
    ctx.putImageData(pxData, 0, 0);
    requestAnimationFrame(anim);
    for (let i = 0; i < grid.length; i++) {
        var pixel = i + w;
        var pixels = grid[pixel];
        
        if (i < grid.length - w) {
            newData = pixels * populate * (random(1, 8,'y') /7);
        } else {
            newData = fh * (random(0, 100,'y'));
        }
        grid[i+wind] = newData;
        newData = grid[i+wind];
          pxData.data[i * 4 + color] = newData;
   
    }
};


function random(min, max, decOrNot) {
    this.decOrNot = decOrNot;
    if (this.decOrNot === 'y') {
        this.decOrNot = true;
    } else {
        this.decOrNot === false
    }
    var num = Math.floor(Math.random() * (max - min)) + min;
    if (this.decOrNot === true) {
        num = num + (num / max);
    } else {
        num = num
    }
    if (min < 0) {
        posOrNeg(num)
    }

    function posOrNeg(x) {
        var arr = [-1, 1];
        var pOrn = random(0, 10);
        return arr[pOrn] * x;
    }
    return num;
}


  $('#blue').on('click',function(){
     color = 2;
     getImageData(0, 0, w, h);
})

  $('#green').on('click',function(){
    color = 1;
    getImageData(0, 0, w, h)
})

  $('#red').on('click',function(){
    color = 0;   
     getImageData(0, 0, w, h);
})

  $('#left').on('click', function () {
    wind-=1;
      getImageData(0, 0, w, h)
  })
  $('#right').on('click', function () {
    wind+=1;
     getImageData(0, 0, w, h)
  })

  $('#up').on('click', function () {
    fh+=10;
      getImageData(0, 0, w, h)
  })

  $('#down').on('click', function () {
    fh-=10;
     getImageData(0, 0, w, h)
  })


const move = function(event){

  let ev = event;

  if (event.type === "touchmove") {
    event.preventDefault();
    p = event.targetTouches[0];

  }
  let x = Math.round((ev.clientX - canvas.offsetLeft) / sz);
  let y = Math.round((ev.clientY - canvas.offsetTop) / sz);

  grid[y * w + x] = 5000 * Math.random();

}
canvas.addEventListener("mousemove",move,false);
canvas.addEventListener("touchmove",move,false);
