if (!window.jQuery){
  var script = document.createElement('script');
  script.src = 'https://code.jquery.com/jquery-3.7.0.min.js'; 
  document.head.appendChild(script);
  var script2 = document.createElement('script');
  script2.src = 'https://code.jquery.com/jquery-migrate-3.4.1.min.js'; 
  document.head.appendChild(script2);
}

var currentDisplayIDMode = false;

function collision($div1, $div2) {
  var x1 = $div1.offset().left;
  var y1 = $div1.offset().top;
  var h1 = $div1.outerHeight(true);
  var w1 = $div1.outerWidth(true);
  var b1 = y1 + h1;
  var r1 = x1 + w1;
  var x2 = $div2.offset().left;
  var y2 = $div2.offset().top;
  var h2 = $div2.outerHeight(true);
  var w2 = $div2.outerWidth(true);
  var b2 = y2 + h2;
  var r2 = x2 + w2;

  if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
  return true;
}

function clearOverlaps(classname) {
  jQuery("."+classname).each(function(){
    var $source = jQuery(this);

    do {
      var hasCollision = false;
      jQuery("."+classname).each(function(){
        var $target = jQuery(this);
        if ($source[0] !== $target[0]) {
          if (collision($source, $target)){ 
            hasCollision = true;
            $target.css({
              top: ($target.position().top + $target.outerHeight(true)+1)
          });
          }
        }
      });
    } while (hasCollision);


  });
}

function toggleDisplayDivIDs() {
  currentDisplayIDMode = !currentDisplayIDMode;

  if (currentDisplayIDMode) {
    jQuery("div[id]").each(function(){
      if(this.id !==''){
        var id = this.id;
        $this = jQuery(this);

        if ($this.outerHeight(true) > 0 && $this.outerWidth(true) > 0) {

          var computedPosition = $this.css("position");  //Computed position
          if (this.style.position.length == 0 || computedPosition == 'static'){  //Explicitly set the position attribute
            if (computedPosition == 'static') {
              $this.attr("resetPosition", 'static');
              this.style.position = 'relative';
            } else {
              $this.attr("resetPosition", true);
              this.style.position = computedPosition;
            }
          }
          var $highlight = jQuery('<div>', {
            id: '',
            class: 'highlight-div-id',
            }).html(id + ' <button class="tooltip" onclick="copyToClipboard(this, \'' + id + '\')">Copy to Clipboard</button>');
          jQuery(this).prepend($highlight);
          $highlight.hover( function() {
            jQuery(this).parent().addClass("highlight-div-glow");
          }, function() {
            jQuery(this).parent().removeClass("highlight-div-glow");
          });
        }
      }
    });
    
    clearOverlaps('highlight-div-id');

  } else {
    jQuery("div.highlight-div-id").each(function(){
      jQuery(this).remove();
    });
    jQuery("div[resetPosition]").each(function(){
      if(this.id !==''){
        this$ = jQuery(this);
        if (this$.attr("resetPosition") == 'static'){
          this.style.position = 'static';
        } else {
          this.style.position = '';
        }
        this$.attr("resetPosition", '');
      }
    });
  }
}


function copyToClipboard(button, value) {
  navigator.clipboard.writeText(value);
  
  var $tooltip = jQuery('<div>', {
    id: '',
    class: 'highlight-div-tooltip',
    }).html('Copied!');
  jQuery(button).append($tooltip);

  setTimeout(function () {
    jQuery($tooltip).remove();
  }, 1000);
}

