var r, g, b;
var active = 'swatch1';
var shadow = [10,119,0];
var midtone = [255,255,255];
var highlight = [10,119,0];

function colourWheel() {
  var can = document.getElementById('picker');
  can.attr = ('width', '256');
  can.attr = ('height', '256');
  var canvas = can.getContext('2d');
  var pixels = canvas.createImageData(256, 256);
  for(var x = 0; x < 256; x++) {
    for(var y = 0; y < 256; y++) {
      var idx = (x + y * 256) * 4;
      pixels.data[idx] =  350 - distance(x,95,y,85)*2;
      pixels.data[idx + 1] = 350 - distance(x,160,y,85)*2;
      pixels.data[idx + 2] = 350 - distance(x,128, y,160)*2;
      pixels.data[idx + 3] = 255;
    }
  }
  function distance(x1,x2,y1,y2){
    return Math.sqrt((x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2));
  }
  canvas.putImageData(pixels, 0, 0);
  can.onclick = function(e){
 document.getElementById('example').style.background = rgbaReturn(r,g,b);
    document.getElementById(active).style.background = 'rgb('+r+','+g+','+b+')';
  }
  can.onmousemove = function(e){
    var x = e.pageX - can.offsetLeft - 10;
    var y = e.pageY - can.offsetTop - 10;
    var colour = canvas.getImageData(x, y, 1, 1);
    var data = colour.data;
    r = data[0];
    g = data[1];
    b = data[2];
    can.style.border = '10px solid rgb('+r+','+g+','+b+')';
  }
}

function rgbaReturn(red, green, blue) {
  switch(active){
    case 'swatch1':
      shadow = [red,green,blue];
      break;
    case 'swatch2':
      midtone = [red,green,blue];
      break;
    case 'swatch3':
      highlight = [red,green,blue];
  }
  var prefix;
  var browsers = document.getElementsByName('browser');
  for (var i = 0; i < browsers.length; i++){
    if (browsers[i].checked) {
        prefix = browsers[i].value;
    }
  }
  var output = '-' + prefix + '-linear-gradient(rgb(' + shadow[0] + ',' + shadow[1] + ',' + shadow[2] + ') 0%, rgb(' + midtone[0] + ',' + midtone[1] + ',' + midtone[2] + ') 50%, rgb(' + highlight[0] + ',' + highlight[1] + ',' + highlight[2] + ') 100%)';
  document.getElementById('output').innerHTML = output;
  return output;
}

document.getElementById('swatch1').onclick = function(){
  active = 'swatch1';
  document.getElementById('swatch1').classList.add('active');
  document.getElementById('swatch2').classList.remove('active');
  document.getElementById('swatch3').classList.remove('active');
}
document.getElementById('swatch2').onclick = function(){
  active = 'swatch2';
  document.getElementById('swatch2').classList.add('active');
  document.getElementById('swatch1').classList.remove('active');
  document.getElementById('swatch3').classList.remove('active');
}
document.getElementById('swatch3').onclick = function(){
  active = 'swatch3';
  document.getElementById('swatch3').classList.add('active');
  document.getElementById('swatch1').classList.remove('active');
  document.getElementById('swatch2').classList.remove('active');
}

colourWheel();