(function() {
  var cssSide, entry, entryCount, entrys, gap, i, idx, j, k, l, len, len1, len2, m, maxEntryHeight, minEntryHeight, ref, ref1, ref2, scroll, side, sign, subIdx, target, timelineEntrys, toggle, totalHeight;

  entryCount = 2;

  minEntryHeight = 500;

  maxEntryHeight = 500;

  gap = 20;

  timelineEntrys = [];

  for (i = j = 1, ref = entryCount; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
    timelineEntrys.push(~~(minEntryHeight + Math.random() * (maxEntryHeight - minEntryHeight)));
  }

  entrys = [[], []];

  toggle = 0;

  for (k = 0, len = timelineEntrys.length; k < len; k++) {
    entry = timelineEntrys[k];
    target = entrys[toggle > 0 ? 1 : 0];
    sign = toggle > 0 ? 1 : -1;
    if (Math.abs(toggle) < 1) {
      toggle = 0;
    }
    target.push({
      height: entry,
      top: (((ref1 = _.last(target)) != null ? ref1.top : void 0) || 0) + (((ref2 = _.last(target)) != null ? ref2.height : void 0) || 0) + gap
    });
    if (Math.abs(toggle) < gap && entrys[0].length > 0 && entrys[1].length > 0) {
      entrys[0][entrys[0].length - 1].height += gap * 2;
      entrys[1][entrys[1].length - 1].height += gap * 2;
    }
    toggle -= (entry + gap) * sign;
  }

  for (idx = l = 0, len1 = entrys.length; l < len1; idx = ++l) {
    side = entrys[idx];
    cssSide = idx === 0 ? "left" : "right";
    for (subIdx = m = 0, len2 = side.length; m < len2; subIdx = ++m) {
      entry = side[subIdx];
      $("." + cssSide).append("<div class=\"entry hidden\" style=\"\n  height: " + (entry.height - 30) + "px;\n  top:    " + entry.top + "px;\n\">\n  <header></header>\n  <article></article>\n</div>");
      if (idx > 0 || subIdx > 0) {
        $(".line").append("<div class=\"dot hidden\" style=\"\n  top: " + entry.top + "px;\n\"></div>");
      }
    }
  }

  totalHeight = Math.max(_.last(entrys[0]).top + _.last(entrys[0]).height, _.last(entrys[1]).top + _.last(entrys[1]).height);

  $(".line").css({
    "height": totalHeight + "px"
  });

  scroll = function() {
    var $this, docBottom, docTop, elem, hit, hits, len3, len4, n, o, ref3, results;
    docTop = $(document).scrollTop();
    docBottom = docTop + window.innerHeight;
    hits = [];
    ref3 = $(".entry, .dot");
    for (n = 0, len3 = ref3.length; n < len3; n++) {
      elem = ref3[n];
      $this = $(elem);
      if ($this.offset().top <= docBottom) {
        $this.removeClass("hidden");
      }
      if ($this.offset().top + $this.height() <= docTop && !$this.hasClass("hidden")) {
        $this.addClass("hidden");
      }
      if ($this.offset().top > docBottom + gap && !$this.hasClass("hidden")) {
        $this.addClass("hidden");
      }
      if ($this.hasClass("dot") && $this.offset().top > docTop && $this.offset().top < docTop + 40) {
        hits.push($this);
      }
    }
    if (hits.length > 0 && (!$(".year").hasClass("hit"))) {
      $(".year").addClass("hit");
    } else if (hits.length === 0 && $(".year").hasClass("hit")) {
      $(".year").removeClass("hit");
    }
    results = [];
    for (o = 0, len4 = hits.length; o < len4; o++) {
      hit = hits[o];
      if (!hit.hasClass("hidden")) {
        results.push(hit.addClass("hidden"));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  $(document).scroll(function() {
    return scroll();
  });

  scroll();

}).call(this);

$(function() {
  for (var i=0; i < 50; i++) {
    $('.balloons').append("<div class='balloon balloon" + i + "'></div>");
  }
});

'use strict';

new Vue({
  el: '#app',
  data: function data() {
    return {
      startX: 0,
      x: 0,
      y: 0,
      flip: false,
      audioPlay: false,
      startArms: 0
    };
  },

  methods: {
    armsTL: function armsTL() {
      var tl = new TimelineMax();
      tl.add('startarms');
      tl.to('#backhand', 2, {
        x: -16,
        rotation: 150,
        transformOrigin: '50% 50%'
      }, 'startarms');
      tl.to('#rightarm', 2, {
        rotation: 30,
        transformOrigin: '100% 0'
      }, 'startarms');
      tl.to('#newrightarm', 2, {
        x: -94,
        y: -918,
        rotation: 10,
        transformOrigin: '100% 100%'
      }, 'startarms');

      tl.to('#hand', 2, {
        x: -15,
        y: -7,
        rotation: 90,
        transformOrigin: '50% 50%'
      }, 'startarms');
      tl.to('#leftarm', 2, {
        rotation: 20,
        transformOrigin: '100% 0'
      }, 'startarms');
      tl.to('#newleftarm', 2, {
        x: -100,
        y: -924,
        transformOrigin: '100% 100%'
      }, 'startarms');

      return tl;
    },
    coordinates: function coordinates(e) {
      var audio = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/Whoa.mp3'),
          walleBox = document.getElementById('walle').getBoundingClientRect(),
          walleCoords = walleBox.width / 2 + walleBox.left;

      if (this.startArms == 0) {
        this.startArms = this.armsTL();
      }

      this.y = e.clientY / 80 - 2;
      if (e.clientX > walleCoords) {
        this.x = -(e.clientX / 200);
        this.flip = true;
        if (this.audioPlay === false) {
          audio.play();
          this.audioPlay = true;
        }
      } else {
        this.audioPlay = false;
        this.x = e.clientX / 200 - 5;
        this.flip = false;

        TweenMax.set("#righteyeb2", {
          scaleX: 1 + (1 - e.clientX / walleCoords) / 5
        });
        TweenMax.set("#lefteyeb2", {
          scaleX: 1 + (1 - e.clientX / walleCoords) / 5
        });
        TweenMax.set("#walle", {
          x: e.clientX / walleCoords * 50 - 40
        });

        this.startArms.progress(1 - e.clientX / walleCoords).pause();
      }
    }
  },
  mounted: function mounted() {
    var tl = new TimelineMax({
      repeat: -1,
      repeatDelay: 2
    });

    tl.add('redo');
    tl.to('#lefteye', 0.5, {
      rotation: 5,
      repeat: 3,
      yoyo: true,
      transformOrigin: '100% 50%',
      ease: Sine.easeOut
    }, 'redo');
    tl.to('#righteye', 0.5, {
      rotation: -5,
      repeat: 3,
      yoyo: true,
      transformOrigin: '0% 30%',
      ease: Sine.easeOut
    }, 'redo+=0');
    tl.fromTo('#lefteyeball', 0.05, {
      scaleY: 1
    }, {
      scaleY: 0,
      repeat: 3,
      yoyo: true,
      transformOrigin: '50% 50%',
      ease: Circ.easeOut
    }, 'redo+=4');
    tl.fromTo('#righteyeball', 0.05, {
      scaleY: 1
    }, {
      scaleY: 0,
      repeat: 3,
      yoyo: true,
      transformOrigin: '50% 50%',
      ease: Circ.easeOut
    }, 'redo+=4');
    tl.to('#eyecontain', 0.4, {
      rotation: -15,
      repeat: 1,
      yoyo: true,
      transformOrigin: '50% 50%',
      ease: Sine.easeInOut
    }, 'redo+=2');
  }
});

TweenMax.to('p', 0.5, {
  opacity: 0,
  delay: 2,
  ease: Sine.easeIn
});


$(document).ready(function(){
  //Take your div into one js variable
  var div = $("#divToShowHide");
  //Take the current position (vertical position from top) of your div in the variable
  var pos = div.position();
  //Now when scroll event trigger do following
  $(window).scroll(function () {
   var windowpos = $(window).scrollTop();
   //Now if you scroll more than 100 pixels vertically change the class to AfterScroll
   // I am taking 100px scroll, you can take whatever you need
   if (windowpos >= (pos.top - 100)) {
     div.addClass("AfterScroll");
   }
   //If scroll is less than 100px, remove the class AfterScroll so that your content will be hidden again 
   else {
     s.removeClass("AfterScroll");
   }
   //Note: If you want the content should be shown always once you scroll and do not want to hide it again when go to top agian, no need to write the else part
 });
});

$('balloon balloon0').click(function() {
    $('.balloon balloon0').hide();
});

$('balloon1').click(function() {
    $('.balloon1').hide();
});

$('balloon2').click(function() {
    $('.balloon2').hide();
});

$('balloon3').click(function() {
    $('.balloon3').hide();
});
$('balloon4').click(function() {
    $('.balloon4').hide();
});

$('balloon5').click(function() {
    document.getElementById("balloon5").style.visibility = "hidden";
});

$('balloon6').click(function() {
    document.getElementById("balloon6").style.visibility = "hidden";
});

$('balloon7').click(function() {
    document.getElementById("balloon7").style.visibility = "hidden";
});

$('balloon8').click(function() {
    document.getElementById("balloon8").style.visibility = "hidden";
});
$('balloon9').click(function() {
    document.getElementById("balloon9").style.visibility = "hidden";
});


var audio = $("#simbaa")[0];
$("simba").mouseenter(function() {
  audio.play();

});

$('#simba').mouseover(function() {
   $("#simba").play('simba.wav');
});

'use strict';

function popBubble(bubble) {
  bubble.classList.add('popped-bubble');
}

function createBubble() {
  var size = Math.floor(Math.random() * 100);
  var position = Math.floor(Math.random() * (window.innerWidth - size * 1.5));
  var bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.style.height = size + 'px';
  bubble.style.width = size + 'px';
  bubble.style.left = position + 'px';
  bubble.style.bottom = '-2350px';

  var bubbleShinySize = size / 5;
  var bubbleShiny = document.createElement('div');
  bubbleShiny.className = 'bubble-shiny';
  bubbleShiny.style.height = bubbleShinySize + 'px';
  bubbleShiny.style.width = bubbleShinySize + 'px';

  bubble.appendChild(bubbleShiny);
  bubble.addEventListener('click', function () {
    return popBubble(bubble);
  });
  return bubble;
}

function animateBubble(bubble) {
  var interval = setInterval(function () {
    var bottomPos = parseInt(bubble.style.bottom);

    if (bottomPos > -1700) {
      bubble.parentNode.removeChild(bubble);
      clearInterval(interval);
    } else {
      bubble.style.bottom = bottomPos + 1 + 'px';
    }
  }, Math.floor(Math.random() * 10) - 10);
}

function spawnBubbles() {
  setInterval(function () {
    var bubble = createBubble();
    document.querySelector('main').appendChild(bubble);
    animateBubble(bubble);
  }, 1000);
}

spawnBubbles();

var hoverArea = document.getElementById('simbapic');
  var audio = document.getElementById('audio');
  hoverArea.onmouseover= function(){
    audio.play();
  }
  hoverArea.onmouseout= function(){
    audio.pause();
  }  

var
  words = ["We keep moving forward, opening new doors, and doing new things, because we're curious and curiosity keeps leading us down new paths."],
  part,
  i = 0,
  offset = 0,
  len = words.length,
  forwards = true,
  skip_count = 0,
  skip_delay = 5,
  speed = 50;

var wordflick = function(){
  setInterval(function(){
      if (forwards) {
        if(offset >= words[i].length){
          ++skip_count;
          if (skip_count == skip_delay) {
            forwards = false;
            skip_count = 0;
          }
        }
      }
      else {
         if(offset == 0){
            forwards = true;
            i++;
            offset = 0;
            if(i >= len){
              i=0;
            } 
         }
      }
      part = words[i].substr(0, offset);
      if (skip_count == 0) {
        if (forwards) {
          offset++;
        }
        else {
          offset--;
        }
      }
      $('.word').text(part);
  },speed);
};

$(document).ready(function(){
  wordflick();
});

