(function () {
  // Set this to the FULL root location of the framed site (without a trailing slash).
  //
  // e.g. If you want visitors to http://example.com/b.html to see a framed version 
  //      of http://my.cheap.host/~blah/b.html, this should be "http://my.cheap.host/~blah".
  var frameRoot = "http://localhost/framelocation/framed";
  
  // Set this to the domain of the framing page, e.g. http://snazzydomain.com/
  var framesetDomain = "http://localhost/";
  
  // This should be the 'name' attribute of the frame that's loading the framed site.
  var frameName = 'site';
  
  function frameLocationSetup() {
    // In frameset:
    if (window === top) {
      var specifiedPath = window.location.hash.substr(1);
      if (specifiedPath !== '') {
        window[frameName].location = frameRoot + specifiedPath;
      }
      
      window.addEventListener('message', function (e) {
        // Quick sanity check:
        if (e.data[0] === '#') {
          window.location.hash = e.data;
        }
      }, false);
    // In child frames:
    } else {
      var relMatch = new RegExp('^' + frameRoot + '(.*)$', 'i');
      var relPath  = window.location.toString().match(relMatch)[1];
      if (parent.location.hash.substr(1) !== relPath) {
        parent.window.postMessage('#' + relPath, framesetDomain);
      }
    }
  }

  // Nothing below here is specific to the framelocation code. Ignoring it
  // is probably for the best.

  // Cross-browser onDomLoad handler by Dean Edwards/Matthias Miller/John Resig.
  function init() {
    // quit if this function has already been called
    if (arguments.callee.done) return;

    // flag this function so we don't do the same thing twice
    arguments.callee.done = true;

    // kill the timer
    if (_timer) clearInterval(_timer);

    // do stuff
    frameLocationSetup();
  }

  /* for Mozilla/Opera9 */
  if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", init, false);
  }

  /* for Internet Explorer */
  /*@cc_on @*/
  /*@if (@_win32)
    document.write("<script id=__ie_onload defer src=javascript:void(0)><\/script>");
    var script = document.getElementById("__ie_onload");
    script.onreadystatechange = function() {
      if (this.readyState == "complete") {
        init(); // call the onload handler
      }
    };
  /*@end @*/

  /* for Safari */
  if (/WebKit/i.test(navigator.userAgent)) { // sniff
    var _timer = setInterval(function() {
      if (/loaded|complete/.test(document.readyState)) {
        init(); // call the onload handler
      }
    }, 10);
  }

  /* for other browsers */
  window.onload = init; 
})();