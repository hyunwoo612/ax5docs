var gridList = [
    {companyJson: {"대표자명": "----"}, a: "A", b: "A01", price: 1000, amount: 12, cost: 12000, saleDt: "2016-08-29", customer: "장기영", saleType: "A", c:"C", d:"D", e:"E", f:"F", g:"G", userType: "M"},
    {companyJson: {"대표자명": "----"}, a: true, b: true, price: 1000, amount: 12, cost: 12000, saleDt: "2016-08-29", customer: "장기영", saleType: "A", c:"C", d:"D", e:"E", f:"F", g:"G", userType: "M"},
    {companyJson: {"대표자명": "abcd"}, a: "A", b: "B01", price: 1100, amount: 11, cost: 12100, saleDt: "2016-08-28", customer: "장서우", saleType: "B", c:"C", d:"D", e:"E", f:"F", g:"G", userType: "D"},
    {companyJson: {"대표자명": "abcd"}, a: "A", b: "C01", price: 1200, amount: 10, cost: 12000, saleDt: "2016-08-27", customer: "이영희", saleType: "A", c:"C", d:"D", e:"E", f:"F", g:"G", userType: "W"},
    {companyJson: {"대표자명": "9999"}, a: "B", b: "A01", price: 1300, amount: 8, cost: 10400, saleDt: "2016-08-25", customer: "황인서", saleType: "C", c:"C", d:"D", e:"E", f:"F", g:"G", userType: "M"},
    {companyJson: {"대표자명": "abcd"}, a: "B", b: "B01", price: 1400, amount: 5, cost: 7000, saleDt: "2016-08-29", customer: "황세진", saleType: "D", c:"C", d:"D", e:"E", f:"F", g:"G", userType: "S"},
    {companyJson: {"대표자명": "----"}, a: "A", b: "A01", price: 1000, amount: 12, cost: 12000, saleDt: "2016-08-29", customer: "장기영", saleType: "A", c:"C", d:"D", e:"E", f:"F", g:"G", userType: "M"},
    {companyJson: {"대표자명": "abcd"}, a: "A", b: "B01", price: 1100, amount: 11, cost: 12100, saleDt: "2016-08-28", customer: "장서우", saleType: "B", c:"C", d:"D", e:"E", f:"F", g:"G", userType: "D"},
    {companyJson: {"대표자명": "abcd"}, a: "A", b: "C01", price: 1200, amount: 10, cost: 12000, saleDt: "2016-08-27", customer: "이영희", saleType: "A", c:"C", d:"D", e:"E", f:"F", g:"G", userType: "W"},
    {companyJson: {"대표자명": "위세라"}, a: "B", b: "A01", price: 1300, amount: 8, cost: 10400, saleDt: "2016-08-25", customer: "황인서", saleType: "C", c:"C", d:"D", e:"E", f:"F", g:"G", userType: "M"},
    {companyJson: {"대표자명": "abcd"}, a: "B", b: "B01", price: 1400, amount: 5, cost: 7000, saleDt: "2016-08-29", customer: "황세진", saleType: "D", c:"C", d:"D", e:"E", f:"F", g:"G", userType: "S"},
    {companyJson: {"대표자명": "----"}, a: "A", b: "A01", price: 1000, amount: 12, cost: 12000, saleDt: "2016-08-29", customer: "장기영", saleType: "A", c:"C", d:"D", e:"E", f:"F", g:"G", userType: "M"},
    {companyJson: {"대표자명": "abcd"}, a: "A", b: "B01", price: 1100, amount: 11, cost: 12100, saleDt: "2016-08-28", customer: "장서우", saleType: "B", c:"C", d:"D", e:"E", f:"F", g:"G", userType: "D"},
    {companyJson: {"대표자명": "abcd"}, a: "A", b: "C01", price: 1200, amount: 10, cost: 12000, saleDt: "2016-08-27", customer: "이영희", saleType: "A", c:"C", d:"D", e:"E", f:"F", g:"G", userType: "W"},
    {companyJson: {"대표자명": "위세라"}, a: "B", b: "A01", price: 1300, amount: 8, cost: 10400, saleDt: "2016-08-25", customer: "황인서", saleType: "C", c:"C", d:"D", e:"E", f:"F", g:"G", userType: "M"},
    {companyJson: {"대표자명": "abcd"}, a: "B", b: "B01", price: 1400, amount: 5, cost: 7000, saleDt: "2016-08-29", customer: "황세진", saleType: "D", c:"C", d:"D", e:"E", f:"F", g:"G", userType: "S"},
    {companyJson: {"대표자명": "abcd"}, a: "B", b: "A01", price: 1500, amount: 2, cost: 3000, saleDt: "2016-08-26", customer: "이서연", saleType: "A", c:"C", d:"D", e:"E", f:"F", g:"G", userType: "W"},
    {companyJson: {"대표자명": "abcd"}, a: "B", b: "A01", price: 1500, amount: 2, cost: 3000, saleDt: "2016-08-26", customer: "황현진", saleType: "A", c:"C", d:"D", e:"E", f:"F", g:"G", userType: "S"}
];

var fn_docs = (function () {
    return {
        _data: {},
        _jos: {}, // jquery objects 저장소
        menu: {
            list: [],
            offsetList: [],
            target: null,
            scrollType: '',
            printed: false,
            viewType: -1,
            focusedH1: '',
            focusedH2: '',
            focusedH3: '',
            ready: function (target, scrollType) {
                if (scrollType != 'inline') return;

                var list = [], offsetList = [];
                this.target = target;
                this.scrollType = scrollType;

                var h1_index = -1, h2_index = -1, h3_index = -1;
                fn_docs._jos['docs-body'].find('h1,h2,h3').each(function (idx, nn) {
                    var $this = $(this);
                    $this.find('a[data-name]').remove();
                    var h_id = 'doc-' + this.innerHTML.replace(/\W/g, "-") + '-' + idx;

                    if (idx == 0 && this.tagName !== "H1") {
                        // 상위 아이템 없음.
                        h1_index = 0;
                        h2_index = 0;
                        h3_index = 0;
                        list.push({
                            tagName: "H1",
                            id: "",
                            label: "",
                            child: []
                        });

                        offsetList.push({
                            top: 0,
                            id: "",
                            h1_index: h1_index,
                            h2_index: h2_index,
                            h3_index: h3_index
                        });
                    }

                    if (this.tagName === "H1") {
                        _list = list;
                        h1_index = _list.length;
                        h2_index = 0;
                        h3_index = 0;
                    }
                    else if (this.tagName === "H2") {
                        _list = (h1_index > -1) ? list[h1_index].child : list;
                        h2_index = _list.length;
                        h3_index = 0;
                    }
                    else if (this.tagName == "H3") {
                        _list = (h1_index > -1 && h2_index > -1) ? list[h1_index].child[h2_index].child : list;
                        h3_index = _list.length;
                    }

                    _list.push({
                        tagName: this.tagName,
                        id: h_id,
                        label: this.innerHTML.replace(/<(?:.|\n)*?>/gm, ''),
                        child: []
                    });

                    offsetList.push({
                        top: $this.offset().top,
                        id: h_id,
                        h1_index: h1_index,
                        h2_index: h2_index,
                        h3_index: h3_index
                    });

                    $this.append('<a name="' + h_id + '" data-name="true"></a>');

                });

                this.list = list;
                this.offsetList = offsetList;
                if (!this.printed) this.print();
            },
            getMenuList: function (parentLabel, list, depth) {
                var _this = this, po = [];
                list.forEach(function (item) {
                    po.push('<li data-h' + depth + '-id="' + item.id + '">');
                    po.push('<a href="#' + item.id + '">' + item.label.replace(parentLabel, "") + "</a>");
                    po.push('</li>');
                    if (item.child.length > 0) {
                        po.push('<ul data-parent-h' + depth + '-id="' + item.id + '">');
                        po.push(_this.getMenuList(item.label, item.child, (depth + 1)));
                        po.push('</ul>');
                    }
                });
                return po.join('');
            },
            print: function () {
                var po = [];
                po.push('<div class="docs-menu-scroll">');
                po.push('<ul>');
                po.push(this.getMenuList("", this.list, 1));
                po.push('</ul>');
                po.push('</div>');
                this.target.html(po.join(''));
                this.printed = true;
            },

            setFocus: function (scTop) {

                var $menu = fn_docs._jos["docs-inline-menu"];
                for (var i = 0, l = this.offsetList.length, item; i < l; i++) {
                    item = this.offsetList[i];
                    if (item.h1_index === -1) break;
                    if (item.top >= scTop) { // 보정이 필요할수도 있음.
                        if (this.focusedH1 !== item.h1_index) {
                            $menu.find('[data-parent-h1-id]').removeClass("open");
                            $menu.find('[data-parent-h1-id="' + this.list[item.h1_index].id + '"]').addClass("open");
                            $menu.find('[data-h1-id]').removeClass("open");
                            $menu.find('[data-h1-id="' + this.list[item.h1_index].id + '"]').addClass("open");
                            this.focusedH1 = item.h1_index;
                            this.focusedH2 = '';
                            this.focusedH3 = '';
                        }

                        if (this.list[item.h1_index].child.length > 0 && this.focusedH2 !== item.h2_index) {
                            $menu.find('[data-parent-h2-id]').removeClass("open");
                            $menu.find('[data-parent-h2-id="' + this.list[item.h1_index].child[item.h2_index].id + '"]').addClass("open");
                            $menu.find('[data-h2-id]').removeClass("open");
                            $menu.find('[data-h2-id="' + this.list[item.h1_index].child[item.h2_index].id + '"]').addClass("open");
                            this.focusedH2 = item.h2_index;
                            this.focusedH3 = '';
                        }

                        break;
                    }
                }

            }
        }
    }
})();

$(document.body).ready(function () {
    if (!window.fn_docs) return;

    fn_docs._jos = (function () {
        return {
            "menu-target": $("#docs-menu-print-target"),
            "docs-header-tool": $("#docs-header-tool"),
            "docs-body": $("#docs-body"),
            "docs-foot": $("#docs-foot"),
            "docs-inline-menu": $("#docs-inline-menu"),
            "docs-menu": $("#docs-menu"),
            "docs-menu-parent": $("#docs-menu").parent(),
            "docs-menu-scroll": $("#docs-menu").find(".docs-menu-scroll"),
            "docs-navbar-collapse": $("#docs-navbar-collapse")
        }
    })();

    $("#mobile-menu").click(function () {
        fn_docs._jos["docs-navbar-collapse"].toggleClass("open-in-mobile");
    });

    var menuParentTop = 0;
    $(window).on('load resize', function () {
        // toolbar position cache
        fn_docs._data["doc-header-tool-change-position"] = ax5.util.number(fn_docs._jos["docs-body"].css("margin-top")) - fn_docs._jos["docs-header-tool"].height();
        fn_docs._data["window-height"] = $(window).height();
        fn_docs._data["window-width"] = $(window).width();
        fn_docs._data["dpcs-foot-top"] = (fn_docs._jos["docs-foot"].get(0)) ? fn_docs._jos["docs-foot"].offset().top || 0 : 0;
        // change print way(static) -- remove
        if (fn_docs._jos['docs-inline-menu'][0]) {
            fn_docs.menu.ready(fn_docs._jos['docs-inline-menu'], 'inline');
            fn_docs.menu.setFocus(0);
        } else {
            fn_docs.menu.target = fn_docs._jos['docs-menu'];
            fn_docs.menu.target_parent = fn_docs._jos['docs-menu-parent'];
            //menuParentTop = fn_docs.menu.target_parent.offset().top;
        }
    });

    $(window).on('load resize scroll', function () {
        var windowScrollTop = $(window).scrollTop();
        var docsFootTop = fn_docs._data["dpcs-foot-top"] || 0;
        var windowHeight = fn_docs._data["window-height"];
        /// viewType 결정
        var viewType;
        if (windowScrollTop >= fn_docs._data["doc-header-tool-change-position"]) {
            viewType = 1;
        }
        else {
            viewType = 0;
        }

        /// viewType이 변경 되었다면 CSS Class 변경
        if (fn_docs.menu.viewType != viewType) {
            if (viewType == 0) {
                fn_docs._jos["docs-header-tool"].removeClass("reflection");
                if (fn_docs.menu.target) fn_docs.menu.target.attr("class", "docs-menu").css({top: 'auto', height: 'auto'});
            }
            else if (viewType == 1) {
                fn_docs._jos["docs-header-tool"].addClass("reflection");
                if (fn_docs.menu.target) {
                    fn_docs.menu.target.attr("class", "docs-menu fixed").css({top: 0});
                }
            }
            fn_docs.menu.viewType = viewType;
        }

        if (fn_docs._data["window-width"] > 650) {
            if (windowScrollTop + windowHeight > docsFootTop) {
                fn_docs.menu.target.css({height: windowHeight - (windowScrollTop + windowHeight - docsFootTop)});
            } else if (fn_docs.menu.viewType == 1) {
                fn_docs.menu.target.css({height: windowHeight});
            }
        } else {

            if (fn_docs.menu.target) fn_docs.menu.target.css({height: "auto"});
            if (fn_docs._jos["docs-menu-scroll"].find("li.active").get(0)) {
                fn_docs._jos["docs-menu-scroll"].scrollLeft(fn_docs._jos["docs-menu-scroll"].find("li.active").position().left);
            }
        }

        /// windowScrollTop 위치에 맞게 메뉴 하이라이트
        if (fn_docs.menu.scrollType === "inline") {
            fn_docs.menu.setFocus(windowScrollTop);
        }
    });

    $('[data-ax5ui-plugins]').on("click", "[data-href]", function () {
        var href = this.getAttribute("data-href");

        var hrefs = ax5.info.urlUtil().pathname.split("/");
        hrefs[1] = href.replace("/", "");

        if(href == "/ax5core"){
            location.href = href;
            return;
        }

        if (hrefs[2] == "" || hrefs[2] == "demo" || hrefs[2] == "api") {
            hrefs.pop();
            location.href = hrefs.join("/");
        }else{
            location.href = href;
        }
    });

});