/*================================================================ UTILS
*/

function getRandomInt(t, e) {
  return Math.floor(Math.random() * (e - t + 1)) + t;
}

/*================================================================ CONST
*/

var IS_DEBUG = true;

var ELE_ID = 'canvas';
var WIDTH = document.getElementById(ELE_ID).offsetWidth;
var HEIGHT = document.getElementById(ELE_ID).offsetHeight;

var canvas = document.getElementById(ELE_ID)
var ctx = canvas.getContext('2d');

var DEFAULT_QUOTE = 'ยะเยือกเบอร์รี';
var DEFAULT_PAGE_NAME = 'เสี่ยวเอ้อ';

var CANVAS_PADDING = 24;
var $QUOTE = $('#quote-text');

var QUOTE_PADDING = font_size/2;

var IMAGE_SRC = 'images';
var IMG = "img";
var SOLID = "solid";

// var background = 'rgb(247,247,247)';
var bgtype = IMG;
var background = new Image();
background.src = "images/1.jpg";

var font = "Kanit";
var font_size = 48;
var font_color = "#222222";
var lines = "";

/*================================================================ APP
*/

function clearBg() {
  if(bgtype == SOLID){
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
  }
  else 
    ctx.drawImage(background,0,0,560, 560);
}

function drawQuoteLine(text, currentLine, nLines) {
  var xPos = WIDTH / 2;
  var yPos = HEIGHT / 2;
  var mid = Math.round(nLines/2);

  ctx.fillStyle = font_color;
  ctx.font = font_size +'px '+font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.lineWidth = 4;

  var middleHeight = HEIGHT / 2;
  var padding;

  //need to handle cases for even lines
  for(var i = nLines; i>= 0; i--) {
    // if(nLines%2 == 0 && currentLine == mid) yPos = middleHeight;
    if(currentLine == i) yPos = middleHeight + QUOTE_PADDING * 2 * (i - mid + 1);
  }


  // hacky
  // if (nLines === 1) {
  //   yPos = middleHeight;

  // } else if (nLines === 2) {
  //   if      (currentLine === 0) { yPos = middleHeight - QUOTE_PADDING; }
  //   else if (currentLine === 1) { yPos = middleHeight + QUOTE_PADDING; }

  // } else if (nLines === 3) {
  //   if      (currentLine === 0) { yPos = middleHeight - QUOTE_PADDING * 2; }
  //   else if (currentLine === 1) { yPos = middleHeight; }
  //   else if (currentLine === 2) { yPos = middleHeight + QUOTE_PADDING * 2; }

  // } else if (nLines === 4) {
  //   if      (currentLine === 0) { yPos = middleHeight - QUOTE_PADDING * 3; }
  //   else if (currentLine === 1) { yPos = middleHeight - QUOTE_PADDING; }
  //   else if (currentLine === 2) { yPos = middleHeight + QUOTE_PADDING; }
  //   else if (currentLine === 3) { yPos = middleHeight + QUOTE_PADDING * 3; }

  // } else if (nLines === 5) {
  //   if      (currentLine === 0) { yPos = middleHeight - QUOTE_PADDING * 4; }
  //   else if (currentLine === 1) { yPos = middleHeight - QUOTE_PADDING * 2; }
  //   else if (currentLine === 2) { yPos = middleHeight}
  //   else if (currentLine === 3) { yPos = middleHeight + QUOTE_PADDING * 2; }
  //   else if (currentLine === 4) { yPos = middleHeight + QUOTE_PADDING * 4; }
  // }

  ctx.fillText(text, xPos, yPos);
}

function drawQuote(lines) {
  var lines = (lines) ? lines : [DEFAULT_QUOTE];
  var nLines = lines.length;
  var i = 0;
  for (i = 0; i < nLines; i += 1) {
    var text = lines[ i ];
    drawQuoteLine(text, i, nLines);

    // console.log('nLines: ' + nLines + ', line: ' + i + ', text:' + text);
  };

}

function drawPageName() {
  var text = DEFAULT_PAGE_NAME;
  var xPos = WIDTH - CANVAS_PADDING;
  var yPos = HEIGHT - CANVAS_PADDING - 10;

  ctx.fillStyle = 'rgb(138, 138, 138)';
  ctx.font = '20px Kanit';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.lineWidth = 4;
  ctx.fillText(text, xPos, yPos);
}


function drawPageAvatar() {
  var imageObj = new Image();
  var xPos = WIDTH - CANVAS_PADDING * 6 + 8;
  var yPos = HEIGHT - CANVAS_PADDING * 2 - 2;

  imageObj.onload = function() {
    ctx.drawImage(imageObj, xPos, yPos);
  };

  imageObj.src = IMAGE_SRC + '/page-avatar.png';
}

function downloadCanvas() {
  var min = 100000;
  var max = 999999;
  var rand = getRandomInt(min, max);
  var fileName = 'quote-' + rand + '.png';

  canvas.toBlob(function(blob) {
    window.saveAs(blob, fileName);
  });
}

function init() {
  clearBg();
  drawQuote();
  $QUOTE.text(DEFAULT_QUOTE); // set default text
  drawPageName();
  drawPageAvatar();
  $("#font-size").text(font_size);
}

function redrawCanvas() {
  clearBg();
  drawQuote(lines);
  drawPageName();
  drawPageAvatar();
}

function changeFontSize(mode) {
  $("#font-size").text(font_size);
  if(mode == 1) font_size += 4;
  else if(font_size > 8) font_size -= 4;
  QUOTE_PADDING = font_size/2;
  redrawCanvas();
}

$("#url_form").submit(function(e) {
  e.preventDefault();
  if($("#image_url").val() != '') 
    background.src = $("#image_url").val();
  bgtype = IMG;
  redrawCanvas();
  e.preventDefault();
})

window.onload = function() {
  if (IS_DEBUG) {
    init();

  } else {
    WebFontConfig = {
      active: function() {
        init();
      },

      google: {
        families: [font]
      }
    };
  }
};

$("#images img").click(function(){
  background = new Image();
  background.src = IMAGE_SRC + "/" + (1+$(this).parent().index()) + ".jpg";
  bgtype = IMG;
  redrawCanvas(lines);
})

$("#fonts a").click(function() {
  font = $(this).text();
  redrawCanvas(lines);
})

$("#color_blocks div").click(function(){
  background = $(this).css("background-color");
  bgtype = SOLID;
  redrawCanvas(lines)
})

$("#font-colors div").click(function(){
  font_color = $(this).css("background-color");
  redrawCanvas(lines)
})

/*
http://stackoverflow.com/questions/2299604/javascript-convert-textarea-into-an-array
http://stackoverflow.com/questions/8479053/convert-textarea-value-to-javascript-array-separated-by-new-lines
http://stackoverflow.com/questions/4478742/html5-canvas-can-i-somehow-use-linefeeds-in-filltext
http://stackoverflow.com/questions/5026961/html5-canvas-ctx-filltext-wont-do-line-breaks
*/
$QUOTE.bind('input propertychange', function() {
  var text = this.value;
  lines = text.split(/\n/);
  redrawCanvas(lines);
});
