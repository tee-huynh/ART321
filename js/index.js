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

$('.door').click(function(){
  $('.door').toggleClass('doorOpen');
});