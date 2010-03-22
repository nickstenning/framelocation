# framelocation.js

framelocation.js is a tiny script with no external dependencies that makes it possible to display useful (if slightly ugly) URLs when loading a website within a frame from another website.

Say your website lives at http://my.cheap.host/~user/, but you also own http://snazzydomain.com/. 

1. Edit framelocation.js and update frameRoot to be "http://my.cheap.host/~user" (NB: no trailing slash).
2. Update framesetDomain to be "http://snazzydomain.com".
3. Put your edited version of framelocation.js somewhere web-accessible.
4. Add `<script src="/path/to/framelocation.js"></script>` to the bottom of each framed page's `<body>` tag.
  
At this point, when you visit a page on your site through a frame at http://snazzydomain.com/, the hash part of the URL will update to reflect your location.

i.e. If you are looking at http://my.cheap.host/~user/some/page.html, the URL in the address bar will be http://snazzydomain.com/#/some/page.html.

If you also have access to the frameset page at http://snazzydomain.com, you can also have the URLs serve as permanent links to particular framed locations. Add `<script src="/path/to/framelocation.js"></script>` to the `<head>` of the frameset page, and someone directly visiting http://snazzydomain.com/#/some/page.html will immediately see http://my.cheap.host/~user/some/page.html.
  