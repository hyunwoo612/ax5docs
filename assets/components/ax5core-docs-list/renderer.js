exports.render = function(input, out) {
  var fs = require('fs');
  var Finder = require('fs-finder');
  var htmlparser = require("htmlparser");

  // find files and filter
  var files = Finder.from(input.file).findFiles('*.html').filter(function(path) {
    return /html$/.test(path);
  });

  var url_replace = function(url) {
    return url.replace(process.cwd() + "/" + input.hrefRoot, "/");
  };

  var menus = [], trees = [];

  (function() {
    // Read file and parse 'tmpl-metadata' tag
    files.forEach(function(src) {

      var meta = (function() {
        var rawHtml = fs.readFileSync(src, 'utf8');
        var handler = new htmlparser.DefaultHandler(
          function(error) {}, {verbose: false, ignoreWhitespace: true}
        );
        var parser = new htmlparser.Parser(handler);
        parser.parseComplete(rawHtml);

        var obj = {};
        handler.dom.forEach(function(n) {
          if (n.name == "tmpl-metadata") {
            n.children.forEach(function(m) {
              if (m.children) obj[m.name] = m.children[0].data;
            });
            return false;
          }
        });
        return obj;
      })();

      var menu = {
        url: url_replace(src)
      };

      // extend object
      for (var k in meta) {
        if (k == "sort") menu[k] = Number(meta[k]);
        else menu[k] = meta[k];
      }
      if(menu.title) menus.push(menu);
    });

    // menus array sort
    menus.sort(function(v1, v2) {
      if (v1.sort == v2.sort) return 0;
      else if (v1.sort > v2.sort) return 1;
      else return -1;
    });

    menus.forEach(function(dn) {
      if (!dn.parent) {
        trees.push(dn);
      }
      else {
        var findMenuIndex = -1;
        trees.forEach(function(mn, midx) {
          if (mn.title == dn.parent) {
            findMenuIndex = midx;
            return false;
          }
        });
        if (findMenuIndex == -1) {
          trees.push({title: dn.parent, child: [dn]});
        }
        else {
          trees[findMenuIndex].child.push(dn);
        }
      }
    });
  })();

  var getUrl = function(url){
    return url;
  };
  var po = [];
  for (var i = 0, l = trees.length, _item; i < l; i++) {
    _item = trees[i];
    po.push('<li ' + (function(){
        return (input.activeId == _item.id) ? "class='active'":"";
      })() + '>');
    if (_item.url) {
      po.push('<a href="' + getUrl(_item.url) + '">' + _item.title + '</a>');
    }
    else {
      po.push(_item.title);
    }
    po.push('</li>');

    if (_item.child && _item.child.length > 0) {
      po.push('<ul>');
      _item.child.forEach(function(c) {
        po.push('<li><a href="' + getUrl(c.url) + '">' + c.title + '</a></li>');
      });
      po.push('</ul>');
    }
  }

  out.write(po.join(''));
};