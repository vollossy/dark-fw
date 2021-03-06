steal.loading('documentjs/jmvcdoc/jmvcdoc.js', 'documentjs/jmvcdoc/content/content.js', 'documentjs/jmvcdoc/nav/nav.js', 'documentjs/jmvcdoc/search/search.js', 'jquery/dom/route/route.js', 'steal/html/html.js', 'steal/less/less.js', 'jquery/controller/controller.js', 'jquery/lang/observe/delegate/delegate.js', 'jquery/view/ejs/ejs.js', 'documentjs/jmvcdoc/highlight/highlight.js', 'documentjs/jmvcdoc/resources/helpers.js', 'documentjs/jmvcdoc/models/search.js', 'documentjs/jmvcdoc/content/doc_updated.js', 'jquery/class/class.js', 'jquery/lang/string/string.js', 'jquery/event/destroyed/destroyed.js', 'jquery/jquery.js', 'jquery/event/event.js', 'jquery/lang/observe/observe.js', 'jquery/view/view.js', 'jquery/lang/string/rsplit/rsplit.js', 'documentjs/jmvcdoc/highlight/languages/www.js', 'documentjs/jmvcdoc/highlight/languages/javascript.js', 'documentjs/jmvcdoc/models/favorites.js', 'jquery/dom/cookie/cookie.js', 'jquery/lang/json/json.js', 'documentjs/jmvcdoc/demo/demo.js', 'documentjs/jmvcdoc/demo/demo.ejs', 'documentjs/jmvcdoc/content/views/attribute.ejs', 'documentjs/jmvcdoc/content/views/class.ejs', 'documentjs/jmvcdoc/content/views/constructor.ejs', 'documentjs/jmvcdoc/content/views/favorite.ejs', 'documentjs/jmvcdoc/content/views/function.ejs', 'documentjs/jmvcdoc/content/views/page.ejs', 'documentjs/jmvcdoc/content/views/results.ejs', 'documentjs/jmvcdoc/content/views/top.ejs', 'documentjs/jmvcdoc/tooltip.js', 'mxui/layout/positionable/positionable.js', 'documentjs/jmvcdoc/nav/views/results.ejs', 'jquery/event/hashchange/hashchange.js', 'jquery/lang/string/deparam/deparam.js');
steal({src:'documentjs/jmvcdoc/production.css', has:['documentjs/jmvcdoc/style.less']});
steal.loadedProductionCSS = true;
steal("documentjs/jmvcdoc/content", "documentjs/jmvcdoc/nav", "documentjs/jmvcdoc/search", "jquery/dom/route", "steal/html", "steal/less").then("./style.less", function () {
    var k = window.location.href.match(/docs\/(.*)\.html/);
    if ((k = k && k[1]) && location.hash == "")window.location.hash = "&who=" + k;
    $.route.ready(false)(":who", {who:"index"})("/search/:search");
    $("#nav").jmvcdoc_nav();
    $("#doc").jmvcdoc_content({clientState:$.route.data});
    $("#search").jmvcdoc_search({clientState:$.route.data});
    $.route.ready(false);
    steal.isRhino ||
    Doc.load(function () {
        $.route.ready(true)
    })
});
steal.loaded("documentjs/jmvcdoc/jmvcdoc.js");
steal("jquery/controller", "jquery/lang/observe/delegate", "jquery/view/ejs", "documentjs/jmvcdoc/highlight", "documentjs/jmvcdoc/resources/helpers.js", "documentjs/jmvcdoc/models/search.js", "./doc_updated.js").then("./views/attribute.ejs", "./views/class.ejs", "./views/constructor.ejs", "./views/favorite.ejs", "./views/function.ejs", "./views/page.ejs", "./views/results.ejs", "./views/top.ejs", function (k) {
    k.Controller("Jmvcdoc.Content", {defaults:{}}, {init:function () {
    }, "{clientState} who set":function (c, r, l) {
        this._currentPage =
            l;
        this.element.html("Loading ...").scrollTop(0);
        Doc.findOne({name:l}, this.callback("show"))
    }, show:function (c) {
        document.title = c.title || c.name.replace(/~/g, ".");
        this.element.html("//documentjs/jmvcdoc/content/views/" + c.type.toLowerCase() + ".ejs", c, DocumentationHelpers).trigger("docUpdated", [c]);
        k("#results a.open").removeClass("open");
        k('#results a[href="' + location.hash + '"]').addClass("open");
        !!window._gaq && _gaq.push(["_trackPageview", document.title])
    }})
});
steal.loaded("documentjs/jmvcdoc/content/content.js");
steal("jquery/controller", "jquery/lang/observe/delegate", "jquery/view/ejs", "documentjs/jmvcdoc/models/search.js", "documentjs/jmvcdoc/resources/helpers.js", "documentjs/jmvcdoc/tooltip.js", function (k) {
    k.Controller("Jmvcdoc.Nav", {defaults:{}}, {"{$.route} who set":function (c, r, l) {
        for (r = Doc.findOne({name:l}); r.parents && (!r.childDocs || !r.childDocs.length || /static|prototype|getters|setters/i.test(r.type));)r = Doc.findOne({name:r.parents[0]});
        c = [r];
        for (l = r; l.parents && l.parents.length;) {
            l = Doc.findOne({name:l.parents[0]});
            c.unshift(l)
        }
        r = r.children().slice(0);
        l = 0;
        var o, y;
        for (o = false; l < r.length;)if (/static|prototype|getters|setters/.test(r[l].type)) {
            o = [l + 1, 0];
            y = r[l].children();
            o.push.apply(o, y);
            r.splice.apply(r, o);
            l = l + y.length + 1;
            o = true
        } else l++;
        this.element.html("//documentjs/jmvcdoc/nav/views/results.ejs", {list:r, selected:c, hide:false, hasStaticOrPrototype:o}, DocumentationHelpers);
        steal.html.ready()
    }, ".remove click":function (c, r) {
        r.preventDefault();
        c = c.closest(".content").prevAll(".content").eq(0);
        if (c.length)window.location.href = c.find("a").attr("href");
        else window.location.hash = ""
    }, "{$.route} search set":function (c, r, l) {
        this.element.html("//documentjs/jmvcdoc/nav/views/results.ejs", {list:Doc.findAll({search:l}), selected:[], hide:false, hasStaticOrPrototype:true}, DocumentationHelpers)
    }, "a mouseover":function (c) {
        this._highlight(c)
    }, "#results a mouseover":function (c) {
        this.showTooltip = c = c.attr("data-name");
        Doc.findOne({name:c}, this.proxy(function () {
        }))
    }, "a mouseout":function (c) {
        c.removeClass("highlight");
        this.showTooltip = null
    }, _highlight:function (c) {
        this._isInvalidMenuItem(c) ||
        c.addClass("highlight")
    }, _isInvalidMenuItem:function (c) {
        return c.hasClass("prototype") || c.hasClass("static") || c.hasClass("getters") || c.hasClass("setters")
    }})
}, "./views/results.ejs");
steal.loaded("documentjs/jmvcdoc/nav/nav.js");
steal("jquery/controller", "jquery/lang/observe/delegate", "documentjs/jmvcdoc/models/search.js", function (k) {
    k.Controller("Jmvcdoc.Search", {defaults:{}}, {setup:function (c, r) {
        this.input = k(c);
        this.input.wrap("<div>");
        c = this.input.parent();
        this.remove = k("<span title='clear term' class='remove'></span>").appendTo(c);
        this._super(c, r)
    }, init:function () {
        this.input.attr("disabled", false)
    }, "input keyup":function (c, r) {
        clearTimeout(this.searchTimer);
        if (c.val() == "" && typeof k.route.attr("who") == "undefined" || r.keyCode ==
            27)k.route.attrs({search:""}, true); else if (c.val() != "")this.searchTimer = setTimeout(this.callback("search"), 200)
    }, search:function () {
        k.route.attrs({search:this.input.val()}, true)
    }, "{clientState} search set":function (c, r, l) {
        this.input.val(l);
        l && l != "" ? this.remove.show() : this.remove.hide()
    }, ".remove click":function () {
        k.route.attrs({search:""}, true)
    }, focusin:function () {
        this.focused = true
    }, focusout:function () {
        this.focused = false
    }})
});
steal.loaded("documentjs/jmvcdoc/search/search.js");
steal("jquery/lang/observe", "jquery/event/hashchange", "jquery/lang/string/deparam", function (k) {
    var c = /\:([\w\.]+)/g, r = /^(?:&[^=]+=[^&]*)+/, l = function (K) {
            var v = [];
            s(K, function (F, E) {
                if (F === "className")F = "class";
                E && v.push(o(F), '="', o(E), '" ')
            });
            return v.join("")
        }, o = function (K) {
            return K.replace(/"/g, "&#34;").replace(/'/g, "&#39;")
        }, y = function (K, v) {
            for (var F = 0, E = 0; E < K.names.length; E++) {
                if (!v.hasOwnProperty(K.names[E]))return-1;
                F++
            }
            return F
        }, I = true, O = window.location, X = encodeURIComponent, A = decodeURIComponent,
        s = k.each, x = k.extend;
    k.route = function (K, v) {
        var F = [], E = K.replace(c, function (w, H) {
            F.push(H);
            return"([^\\/\\&]*)"
        });
        k.route.routes[K] = {test:new RegExp("^" + E), route:K, names:F, defaults:v || {}, length:K.split("/").length};
        return k.route
    };
    x(k.route, {param:function (K) {
        delete K.route;
        var v, F = -1, E;
        s(k.route.routes, function (ga, ja) {
            E = y(ja, K);
            if (E > F) {
                v = ja;
                F = E
            }
        });
        if (v) {
            var w = x({}, K), H = v.route.replace(c, function (ga, ja) {
                delete w[ja];
                return K[ja] === v.defaults[ja] ? "" : X(K[ja])
            }), P;
            s(v.defaults, function (ga, ja) {
                w[ga] ===
                    ja && delete w[ga]
            });
            P = k.param(w);
            return H + (P ? "&" + P : "")
        }
        return k.isEmptyObject(K) ? "" : "&" + k.param(K)
    }, deparam:function (K) {
        var v = {length:-1};
        s(k.route.routes, function (H, P) {
            if (P.test.test(K) && P.length > v.length)v = P
        });
        if (v.length > -1) {
            var F = K.match(v.test), E = F.shift(), w = (E = K.substr(E.length)) && r.test(E) ? k.String.deparam(E.slice(1)) : {};
            w = x(true, {}, v.defaults, w);
            s(F, function (H, P) {
                if (P)w[v.names[H]] = A(P)
            });
            w.route = v.route;
            return w
        }
        if (K.charAt(0) !== "&")K = "&" + K;
        return r.test(K) ? k.String.deparam(K.slice(1)) : {}
    },
        data:new k.Observe({}), routes:{}, ready:function (K) {
            if (K === false)I = false;
            if (K === true || I === true)z();
            return k.route
        }, url:function (K, v) {
            return v ? "#!" + k.route.param(x({}, B, K)) : "#!" + k.route.param(K)
        }, link:function (K, v, F, E) {
            return"<a " + l(x({href:k.route.url(v, E)}, F)) + ">" + K + "</a>"
        }, current:function (K) {
            return O.hash == "#!" + k.route.param(K)
        }});
    k(function () {
        k.route.ready()
    });
    s(["bind", "unbind", "delegate", "undelegate", "attr", "attrs", "serialize", "removeAttr"], function (K, v) {
        k.route[v] = function () {
            return k.route.data[v].apply(k.route.data,
                arguments)
        }
    });
    var B, z = function () {
        var K = O.hash.substr(1, 1) === "!" ? O.hash.slice(2) : O.hash.slice(1);
        B = k.route.deparam(K);
        k.route.attrs(B, true)
    };
    k(window).bind("hashchange", z);
    k.route.bind("change", function (K) {
        var v;
        return function () {
            clearTimeout(v);
            v = setTimeout(K, 1)
        }
    }(function () {
        O.hash = "#!" + k.route.param(k.route.serialize())
    }))
});
steal.loaded("jquery/dom/route/route.js");
steal(function () {
    var k = steal;
    steal.html = function (r, l) {
        k.html.load(r, l.browser || "envjs", function (o) {
            typeof l === "function" ? l(o) : print(o)
        })
    };
    steal.html.load = function (r, l, o) {
        steal("steal/browser/" + l, function () {
            (new k.browser[l]({print:true})).bind("pageready",function (y) {
                o.call(this, y)
            }).open(r)
        })
    };
    var c = 0;
    steal.html.wait = function () {
        c++
    };
    steal.html.ready = function () {
        c--;
        c <= 0 && steal.client && steal.client.trigger("pageready", window.location.hash)
    }
});
steal.loaded("steal/html/html.js");
steal({src:"./less_engine.js", ignore:true}, function () {
    steal.type("less css", function (k, c) {
        var r = [];
        if (!steal.isRhino) {
            r = k.src.split("/");
            r[r.length - 1] = "";
            r = [r.join("/")]
        }
        (new less.Parser({optimization:less.optimization, paths:r})).parse(k.text, function (l, o) {
            k.text = o.toCSS();
            c()
        })
    })
});
steal.loaded("steal/less/less.js");
steal("jquery/class", "jquery/lang/string", "jquery/event/destroyed", function (k) {
    var c = function (M, T, G) {
        var Y, ca = M.bind && M.unbind ? M : k(o(M) ? [M] : M);
        if (T.indexOf(">") === 0) {
            T = T.substr(1);
            Y = function (ia) {
                ia.target === M && G.apply(this, arguments)
            }
        }
        ca.bind(T, Y || G);
        return function () {
            ca.unbind(T, Y || G);
            M = T = G = Y = null
        }
    }, r = k.makeArray, l = k.isArray, o = k.isFunction, y = k.extend, I = k.String, O = k.each, X = Array.prototype.slice, A = function (M, T, G, Y) {
        var ca = M.delegate && M.undelegate ? M : k(o(M) ? [M] : M);
        ca.delegate(T, G, Y);
        return function () {
            ca.undelegate(T,
                G, Y);
            ca = M = G = Y = T = null
        }
    }, s = function (M, T, G, Y) {
        return Y ? A(M, Y, T, G) : c(M, T, G)
    }, x = function (M, T) {
        var G = typeof T == "string" ? M[T] : T;
        return function () {
            M.called = T;
            return G.apply(M, [this.nodeName ? k(this) : this].concat(X.call(arguments, 0)))
        }
    }, B = /\./g, z = /_?controllers?/ig, K = function (M) {
        return I.underscore(M.replace("jQuery.", "").replace(B, "_").replace(z, ""))
    }, v = /[^\w]/, F = /\{([^\}]+)\}/g, E = /^(?:(.*?)\s)?([\w\.\:>]+)$/, w, H = function (M, T) {
        return k.data(M, "controllers", T)
    };
    k.Class("jQuery.Controller", {setup:function () {
        this._super.apply(this,
            arguments);
        if (!(!this.shortName || this.fullName == "jQuery.Controller")) {
            this._fullName = K(this.fullName);
            this._shortName = K(this.shortName);
            var M = this, T = this.pluginName || this._fullName, G;
            k.fn[T] || (k.fn[T] = function (Y) {
                var ca = r(arguments), ia = typeof Y == "string" && o(M.prototype[Y]), ma = ca[0];
                return this.each(function () {
                    var ta = H(this);
                    if (ta = ta && ta[T])ia ? ta[ma].apply(ta, ca.slice(1)) : ta.update.apply(ta, ca); else M.newInstance.apply(M, [this].concat(ca))
                })
            });
            this.actions = {};
            for (G in this.prototype)if (!(G == "constructor" ||
                !o(this.prototype[G])))if (this._isAction(G))this.actions[G] = this._action(G)
        }
    }, hookup:function (M) {
        return new this(M)
    }, _isAction:function (M) {
        return v.test(M) ? true : k.inArray(M, this.listensTo) > -1 || k.event.special[M] || P[M]
    }, _action:function (M, T) {
        F.lastIndex = 0;
        if (!T && F.test(M))return null;
        M = T ? I.sub(M, [T, window]) : M;
        T = l(M);
        var G = (T ? M[1] : M).match(E);
        return{processor:P[G[2]] || w, parts:G, delegate:T ? M[0] : undefined}
    }, processors:{}, listensTo:[], defaults:{}}, {setup:function (M, T) {
        var G = this.constructor;
        M = (typeof M ==
            "string" ? k(M) : M.jquery ? M : [M])[0];
        var Y = G.pluginName || G._fullName;
        this.element = k(M).addClass(Y);
        (H(M) || H(M, {}))[Y] = this;
        this.options = y(y(true, {}, G.defaults), T);
        this.called = "init";
        this.bind();
        return[this.element, this.options].concat(r(arguments).slice(2))
    }, bind:function (M, T, G) {
        if (M === undefined) {
            this._bindings = [];
            M = this.constructor;
            T = this._bindings;
            G = M.actions;
            var Y = this.element;
            for (funcName in G)if (G.hasOwnProperty(funcName)) {
                ready = G[funcName] || M._action(funcName, this.options);
                T.push(ready.processor(ready.delegate ||
                    Y, ready.parts[2], ready.parts[1], funcName, this))
            }
            var ca = x(this, "destroy");
            Y.bind("destroyed", ca);
            T.push(function (ia) {
                k(ia).unbind("destroyed", ca)
            });
            return T.length
        }
        if (typeof M == "string") {
            G = T;
            T = M;
            M = this.element
        }
        return this._binder(M, T, G)
    }, _binder:function (M, T, G, Y) {
        if (typeof G == "string")G = x(this, G);
        this._bindings.push(s(M, T, G, Y));
        return this._bindings.length
    }, _unbind:function () {
        var M = this.element[0];
        O(this._bindings, function (T, G) {
            G(M)
        });
        this._bindings = []
    }, delegate:function (M, T, G, Y) {
        if (typeof M == "string") {
            Y =
                G;
            G = T;
            T = M;
            M = this.element
        }
        return this._binder(M, G, Y, T)
    }, update:function (M) {
        y(this.options, M);
        this._unbind();
        this.bind()
    }, destroy:function () {
        if (this._destroyed)throw this.constructor.shortName + " controller already deleted";
        var M = this.constructor.pluginName || this.constructor._fullName;
        this._destroyed = true;
        this.element.removeClass(M);
        this._unbind();
        delete this._actions;
        delete this.element.data("controllers")[M];
        k(this).triggerHandler("destroyed");
        this.element = null
    }, find:function (M) {
        return this.element.find(M)
    },
        _set_called:true});
    var P = k.Controller.processors;
    w = function (M, T, G, Y, ca) {
        return s(M, T, x(ca, Y), G)
    };
    O("change click contextmenu dblclick keydown keyup keypress mousedown mousemove mouseout mouseover mouseup reset resize scroll select submit focusin focusout mouseenter mouseleave".split(" "), function (M, T) {
        P[T] = w
    });
    var ga, ja = function (M, T) {
        for (ga = 0; ga < T.length; ga++)if (typeof T[ga] == "string" ? M.constructor._shortName == T[ga] : M instanceof T[ga])return true;
        return false
    };
    k.fn.extend({controllers:function () {
        var M =
            r(arguments), T = [], G, Y, ca;
        this.each(function () {
            G = k.data(this, "controllers");
            for (ca in G)if (G.hasOwnProperty(ca)) {
                Y = G[ca];
                if (!M.length || ja(Y, M))T.push(Y)
            }
        });
        return T
    }, controller:function () {
        return this.controllers.apply(this, arguments)[0]
    }})
});
steal.loaded("jquery/controller/controller.js");
steal("jquery/lang/observe", function () {
    var k = function (r, l) {
        for (var o = r.length, y = 0, I = [], O; y < o; y++) {
            O = l[y];
            if (typeof O !== "string")return null; else if (r[y] == "**")return l.join("."); else if (r[y] == "*")I.push(O); else if (O === r[y])I.push(O); else return null
        }
        return I.join(".")
    }, c = function (r, l, o, y, I) {
        var O = l.split("."), X = $.data(this, "_observe_delegates") || [], A, s = X.length, x, B, z, K;
        r.attr = l;
        r.lastAttr = O[O.length - 1];
        for (var v = 0; v < s; v++) {
            A = X[v];
            if (!(r.batchNum && A.batchNum === r.batchNum)) {
                z = undefined;
                K = true;
                for (var F =
                    0; F < A.attrs.length; F++) {
                    x = A.attrs[F];
                    if (B = k(x.parts, O))z = B;
                    if (x.value && K)K = x.value === "" + this.attr(x.attr); else if (K && A.attrs.length > 1)K = this.attr(x.attr) !== undefined
                }
                if (z && K) {
                    x = l.replace(z + ".", "");
                    if (r.batchNum)A.batchNum = r.batchNum;
                    if (A.event === "change") {
                        arguments[1] = x;
                        r.curAttr = z;
                        A.callback.apply(this.attr(z), $.makeArray(arguments))
                    } else if (A.event === o)A.callback.apply(this.attr(z), [r, y, I, x]); else A.event === "set" && o == "add" && A.callback.apply(this.attr(z), [r, y, I, x])
                }
            }
        }
    };
    $.extend($.Observe.prototype,
        {delegate:function (r, l, o) {
            r = $.trim(r);
            var y = $.data(this, "_observe_delegates") || $.data(this, "_observe_delegates", []), I = [];
            r.replace(/([^\s=]+)=?([^\s]+)?/g, function (O, X, A) {
                I.push({attr:X, parts:X.split("."), value:A})
            });
            y.push({selector:r, attrs:I, callback:o, event:l});
            y.length === 1 && this.bind("change", c);
            return this
        }, undelegate:function (r, l, o) {
            r = $.trim(r);
            l = 0;
            var y = $.data(this, "_observe_delegates") || [], I;
            if (r)for (; l < y.length;) {
                I = y[l];
                if (I.callback === o || !o && I.selector === r)y.splice(l, 1); else l++
            } else y =
                [];
            if (!y.length) {
                $.removeData(this, "_observe_delegates");
                this.unbind("change", c)
            }
            return this
        }});
    $.Observe.prototype.delegate.matches = k
});
steal.loaded("jquery/lang/observe/delegate/delegate.js");
steal("jquery/view", "jquery/lang/string/rsplit").then(function (k) {
    var c = function (G) {
        eval(G)
    }, r = k.String.rsplit, l = k.extend, o = k.isArray, y = /\r\n/g, I = /\r/g, O = /\n/g, X = /\n/, A = /\\/g, s = /"/g, x = /'/g, B = /\t/g, z = /\{/g, K = /\}/g, v = /\s*\(([\$\w]+)\)\s*->([^\n]*)/, F = function (G) {
        return G.replace(A, "\\\\").replace(O, "\\n").replace(s, '\\"').replace(B, "\\t")
    }, E = function (G) {
        return G.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(s, "&#34;").replace(x, "&#39;")
    }, w = k.View, H = function (G) {
        var Y = G.match(z);
        G = G.match(K);
        return(Y ? Y.length : 0) - (G ? G.length : 0)
    }, P = function (G) {
        if (this.constructor != P) {
            var Y = new P(G);
            return function (ca, ia) {
                return Y.render(ca, ia)
            }
        }
        if (typeof G == "function")this.template = {fn:G}; else {
            l(this, P.options, G);
            this.template = T(this.text, this.type, this.name)
        }
    };
    window.jQuery && (jQuery.EJS = P);
    P.prototype.render = function (G, Y) {
        G = G || {};
        this._extra_helpers = Y;
        Y = new P.Helpers(G, Y || {});
        return this.template.fn.call(G, G, Y)
    };
    l(P, {text:function (G) {
        if (typeof G == "string")return G;
        if (G === null || G === undefined)return"";
        var Y = G.hookup && function (ca, ia) {
            G.hookup.call(G, ca, ia)
        } || typeof G == "function" && G || o(G) && function (ca, ia) {
            for (var ma = 0; ma < G.length; ma++)G[ma].hookup ? G[ma].hookup(ca, ia) : G[ma](ca, ia)
        };
        if (Y)return"data-view-id='" + w.hookup(Y) + "'";
        return G.toString ? G.toString() : ""
    }, clean:function (G) {
        return typeof G == "string" ? E(G) : typeof G == "number" ? G : P.text(G)
    }, options:{type:"<", ext:".ejs"}});
    var ga = function (G, Y, ca) {
        Y = r(Y, X);
        for (var ia = 0; ia < Y.length; ia++)ja(G, Y[ia], ca)
    }, ja = function (G, Y, ca) {
        G.lines++;
        Y = r(Y, G.splitter);
        for (var ia,
                 ma = 0; ma < Y.length; ma++) {
            ia = Y[ma];
            ia !== null && ca(ia, G)
        }
    }, M = function (G, Y) {
        var ca = {};
        l(ca, {left:G + "%", right:"%" + Y, dLeft:G + "%%", dRight:"%%" + Y, eeLeft:G + "%==", eLeft:G + "%=", cmnt:G + "%#", scan:ga, lines:0});
        ca.splitter = new RegExp("(" + [ca.dLeft, ca.dRight, ca.eeLeft, ca.eLeft, ca.cmnt, ca.left, ca.right + "\n", ca.right, "\n"].join(")|(").replace(/\[/g, "\\[").replace(/\]/g, "\\]") + ")");
        return ca
    }, T = function (G, Y, ca) {
        G = G.replace(y, "\n").replace(I, "\n");
        Y = Y || "<";
        var ia = new P.Buffer(["var ___v1ew = [];"], []), ma = "", ta = function (ha) {
            ia.push("___v1ew.push(",
                '"', F(ha), '");')
        }, da = null, fa = function () {
            ma = ""
        }, N = [];
        ga(M(Y, Y === "[" ? "]" : ">"), G || "", function (ha, ka) {
            if (da === null)switch (ha) {
                case "\n":
                    ma += "\n";
                    ta(ma);
                    ia.cr();
                    fa();
                    break;
                case ka.left:
                case ka.eLeft:
                case ka.eeLeft:
                case ka.cmnt:
                    da = ha;
                    ma.length > 0 && ta(ma);
                    fa();
                    break;
                case ka.dLeft:
                    ma += ka.left;
                    break;
                default:
                    ma += ha;
                    break
            } else switch (ha) {
                case ka.right:
                    switch (da) {
                        case ka.left:
                            ha = H(ma);
                            ka = N.length && ha == -1 ? N.pop() : ";";
                            ka === "));" && ia.push("return ___v1ew.join('')");
                            ia.push(ma, ka);
                            ha === 1 && N.push(";");
                            break;
                        case ka.eLeft:
                            (ha =
                                H(ma)) && N.push("));");
                            if (v.test(ma)) {
                                ka = ma.match(v);
                                ma = "function(__){var " + ka[1] + "=$(__);" + ka[2] + "}"
                            }
                            ia.push("___v1ew.push(", "jQuery.EJS.clean(", ma, ha ? "var ___v1ew = [];" : "));");
                            break;
                        case ka.eeLeft:
                            (ha = H(ma)) && N.push("));");
                            ia.push("___v1ew.push(", "jQuery.EJS.text(", ma, ha ? "var ___v1ew = [];" : "));");
                            break
                    }
                    da = null;
                    fa();
                    break;
                case ka.dRight:
                    ma += ka.right;
                    break;
                default:
                    ma += ha;
                    break
            }
        });
        ma.length > 0 && ia.push("___v1ew.push(", '"', F(ma) + '");');
        G = {out:"try { with(_VIEW) { with (_CONTEXT) {" + ia.close() + " return ___v1ew.join('')}}}catch(e){e.lineNumber=null;throw e;}"};
        c.call(G, "this.fn = (function(_CONTEXT,_VIEW){" + G.out + "});\r\n//@ sourceURL=" + ca + ".js");
        return G
    };
    P.Buffer = function (G, Y) {
        this.line = [];
        this.script = [];
        this.post = Y;
        this.push.apply(this, G)
    };
    P.Buffer.prototype = {push:function () {
        this.line.push.apply(this.line, arguments)
    }, cr:function () {
        this.script.push(this.line.join(""), "\n");
        this.line = []
    }, close:function () {
        if (this.line.length > 0) {
            this.script.push(this.line.join(""));
            this.line = []
        }
        this.post.length && this.push.apply(this, this.post);
        this.script.push(";");
        return this.script.join("")
    }};
    P.Helpers = function (G, Y) {
        this._data = G;
        this._extras = Y;
        l(this, Y)
    };
    P.Helpers.prototype = {plugin:function () {
        var G = k.makeArray(arguments), Y = G.shift();
        return function (ca) {
            ca = k(ca);
            ca[Y].apply(ca, G)
        }
    }, view:function (G, Y, ca) {
        ca = ca || this._extras;
        Y = Y || this._data;
        return w(G, Y, ca)
    }};
    w.register({suffix:"ejs", script:function (G, Y) {
        return"jQuery.EJS(function(_CONTEXT,_VIEW) { " + (new P({text:Y, name:G})).template.out + " })"
    }, renderer:function (G, Y) {
        return P({text:Y, name:G})
    }})
});
steal.loaded("jquery/view/ejs/ejs.js");
steal("jquery",function () {
    hljs = new (function () {
        function k(x) {
            for (var B = "", z = 0; z < x.childNodes.length; z++)if (x.childNodes[z].nodeType == 3)B += x.childNodes[z].nodeValue; else if (x.childNodes[z].nodeName == "BR")B += "\n"; else throw"No highlight";
            return B
        }

        function c(x) {
            x = x.className.split(/\s+/);
            for (var B = 0; B < x.length; B++) {
                if (x[B] == "no-highlight")throw"No highlight";
                if (X[x[B]])return x[B]
            }
            return"javascript"
        }

        function r(x, B) {
            if ($(x).parent()[0].nodeName.toLowerCase() == "pre") {
                try {
                    var z = k(x), K = c(x)
                } catch (v) {
                    if (v ==
                        "No highlight")return
                }
                if (K)var F = s.highlight(K, z).value; else {
                    var E = 0;
                    for (var w in A)if (A.hasOwnProperty(w)) {
                        var H = s.highlight(w, z), P = H.keyword_count + H.relevance;
                        if (P > E) {
                            E = P;
                            F = H.value;
                            K = w
                        }
                    }
                }
                if (F) {
                    if (B)F = F.replace(/^(\t+)/gm, function (ga, ja) {
                        return ja.replace(/\t/g, B)
                    });
                    z = x.className;
                    z.match(K) || (z += " " + K);
                    K = document.createElement("div");
                    K.innerHTML = '<pre><code class="' + z + '">' + F + "</code></pre>";
                    x.parentNode.parentNode.replaceChild(K.firstChild, x.parentNode)
                }
            }
        }

        function l() {
            for (var x in X)if (X.hasOwnProperty(x))for (var B =
                X[x], z = 0; z < B.modes.length; z++) {
                if (B.modes[z].begin)B.modes[z].beginRe = s.langRe(B, "^" + B.modes[z].begin);
                if (B.modes[z].end)B.modes[z].endRe = s.langRe(B, "^" + B.modes[z].end);
                if (B.modes[z].illegal)B.modes[z].illegalRe = s.langRe(B, "^(?:" + B.modes[z].illegal + ")");
                B.defaultMode.illegalRe = s.langRe(B, "^(?:" + B.defaultMode.illegal + ")");
                if (B.modes[z].relevance == undefined)B.modes[z].relevance = 1
            }
        }

        function o() {
            function x(v) {
                if (!v.keywordGroups)for (var F in v.keywords)if (v.keywords.hasOwnProperty(F)) {
                    v.keywordGroups =
                        v.keywords[F]instanceof Object ? v.keywords : {keyword:v.keywords};
                    break
                }
            }

            for (var B in X)if (X.hasOwnProperty(B)) {
                var z = X[B];
                x(z.defaultMode);
                for (var K = 0; K < z.modes.length; K++)x(z.modes[K])
            }
        }

        function y(x) {
            for (var B = 0; B < x.childNodes.length; B++) {
                node = x.childNodes[B];
                if (node.nodeName == "CODE")return node;
                if (!(node.nodeType == 3 && node.nodeValue.match(/\s+/)))return null
            }
        }

        function I() {
            if (!I.called) {
                I.called = true;
                l();
                o();
                if (arguments.length)for (var x = 0; x < arguments.length; x++) {
                    if (X[arguments[x]])A[arguments[x]] =
                        X[arguments[x]]
                } else A = X;
                var B = document.getElementsByTagName("pre");
                for (x = 0; x < B.length; x++) {
                    var z = y(B[x]);
                    z && r(z, hljs.tabReplace)
                }
            }
        }

        function O() {
            var x = arguments, B = function () {
                I.apply(null, x)
            };
            if (window.addEventListener) {
                window.addEventListener("DOMContentLoaded", B, false);
                window.addEventListener("load", B, false)
            } else if (window.attachEvent)window.attachEvent("onload", B); else window.onload = B
        }

        var X = {}, A = {}, s = {};
        s.escape = function (x) {
            return x.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;")
        };
        s.contains = function (x, B) {
            if (!x)return false;
            for (var z = 0; z < x.length; z++)if (x[z] == B)return true;
            return false
        };
        s.highlight = function (x, B) {
            function z(da, fa) {
                da.sub_modes = [];
                for (var N = 0; N < da.contains.length; N++)for (var ha = 0; ha < fa.modes.length; ha++)if (fa.modes[ha].className == da.contains[N])da.sub_modes[da.sub_modes.length] = fa.modes[ha]
            }

            function K(da, fa) {
                if (T[da].end && T[da].endRe.test(fa))return 1;
                if (T[da].endsWithParent)return(da = K(da - 1, fa)) ? da + 1 : 0;
                return 0
            }

            function v(da, fa) {
                return fa.illegalRe && fa.illegalRe.test(da)
            }

            function F(da, fa) {
                function N(d) {
                    s.contains(ha, d) || (ha[ha.length] = d)
                }

                var ha = [];
                if (da.contains)for (var ka = 0; ka < fa.modes.length; ka++)s.contains(da.contains, fa.modes[ka].className) && N(fa.modes[ka].begin);
                ka = T.length - 1;
                do {
                    T[ka].end && N(T[ka].end);
                    ka--
                } while (T[ka + 1].endsWithParent);
                da.illegal && N(da.illegal);
                da = "(" + ha[0];
                for (ka = 0; ka < ha.length; ka++)da += "|" + ha[ka];
                da += ")";
                return s.langRe(fa, da)
            }

            function E(da, fa) {
                var N = T[T.length - 1];
                if (!N.terminators)N.terminators = F(N, M);
                da = da.substr(fa);
                fa = N.terminators.exec(da);
                if (!fa)return[da, "", true];
                return fa.index == 0 ? ["", fa[0], false] : [da.substr(0, fa.index), fa[0], false]
            }

            function w(da, fa) {
                fa = M.case_insensitive ? fa[0].toLowerCase() : fa[0];
                for (var N in da.keywordGroups)if (da.keywordGroups.hasOwnProperty(N)) {
                    var ha = da.keywordGroups[N].hasOwnProperty(fa);
                    if (ha)return[N, ha]
                }
                return false
            }

            function H(da, fa) {
                if (!fa.keywords || !fa.lexems)return s.escape(da);
                if (!fa.lexemsRe) {
                    for (var N = "(" + fa.lexems[0], ha = 1; ha < fa.lexems.length; ha++)N += "|" + fa.lexems[ha];
                    N += ")";
                    fa.lexemsRe = s.langRe(M,
                        N, true)
                }
                N = "";
                var ka = 0;
                fa.lexemsRe.lastIndex = 0;
                for (ha = fa.lexemsRe.exec(da); ha;) {
                    N += s.escape(da.substr(ka, ha.index - ka));
                    if (ka = w(fa, ha)) {
                        Y += ka[1];
                        N += '<span class="' + ka[0] + '">' + s.escape(ha[0]) + "</span>"
                    } else N += s.escape(ha[0]);
                    ka = fa.lexemsRe.lastIndex;
                    ha = fa.lexemsRe.exec(da)
                }
                N += s.escape(da.substr(ka, da.length - ka));
                return N
            }

            function P(da, fa) {
                if (fa.subLanguage && A[fa.subLanguage]) {
                    da = s.highlight(fa.subLanguage, da);
                    Y += da.keyword_count;
                    G += da.relevance;
                    return da.value
                } else return H(da, fa)
            }

            function ga(da, fa) {
                var N =
                    da.noMarkup ? "" : '<span class="' + da.className + '">';
                if (da.returnBegin) {
                    ca += N;
                    da.buffer = ""
                } else if (da.excludeBegin) {
                    ca += s.escape(fa) + N;
                    da.buffer = ""
                } else {
                    ca += N;
                    da.buffer = fa
                }
                T[T.length] = da
            }

            function ja(da, fa, N) {
                var ha = T[T.length - 1];
                if (N) {
                    ca += P(ha.buffer + da, ha);
                    return false
                }
                if (N = s.subMode(fa, ha)) {
                    ca += P(ha.buffer + da, ha);
                    ga(N, fa);
                    G += N.relevance;
                    return N.returnBegin
                }
                if (N = K(T.length - 1, fa)) {
                    var ka = ha.noMarkup ? "" : "</span>";
                    for (ca += ha.returnEnd ? P(ha.buffer + da, ha) + ka : ha.excludeEnd ? P(ha.buffer + da, ha) + ka + s.escape(fa) :
                        P(ha.buffer + da + fa, ha) + ka; N > 1;) {
                        ka = T[T.length - 2].noMarkup ? "" : "</span>";
                        ca += ka;
                        N--;
                        T.length--
                    }
                    T.length--;
                    T[T.length - 1].buffer = "";
                    if (ha.starts)for (da = 0; da < M.modes.length; da++)if (M.modes[da].className == ha.starts) {
                        ga(M.modes[da], "");
                        break
                    }
                    return ha.returnEnd
                }
                if (v(fa, ha))throw"Illegal";
            }

            s.subMode = function (da, fa) {
                if (!fa.contains)return null;
                fa.sub_modes || z(fa, M);
                for (var N = 0; N < fa.sub_modes.length; N++)if (fa.sub_modes[N].beginRe.test(da))return fa.sub_modes[N];
                return null
            };
            var M = X[x], T = [M.defaultMode], G = 0,
                Y = 0, ca = "";
            try {
                x = 0;
                M.defaultMode.buffer = "";
                do {
                    var ia = E(B, x), ma = ja(ia[0], ia[1], ia[2]);
                    x += ia[0].length;
                    ma || (x += ia[1].length)
                } while (!ia[2]);
                if (T.length > 1)throw"Illegal";
                return{relevance:G, keyword_count:Y, value:ca}
            } catch (ta) {
                if (ta == "Illegal")return{relevance:0, keyword_count:0, value:s.escape(B)}; else throw ta;
            }
        };
        s.langRe = function (x, B, z) {
            return new RegExp(B, "m" + (x.case_insensitive ? "i" : "") + (z ? "g" : ""))
        };
        this.LANGUAGES = X;
        this.initHighlightingOnLoad = O;
        this.highlightBlock = r;
        this.initHighlighting = I;
        this.IDENT_RE =
            "[a-zA-Z][a-zA-Z0-9_]*";
        this.UNDERSCORE_IDENT_RE = "[a-zA-Z_][a-zA-Z0-9_]*";
        this.NUMBER_RE = "\\b\\d+(\\.\\d+)?";
        this.C_NUMBER_RE = "\\b(0x[A-Za-z0-9]+|\\d+(\\.\\d+)?)";
        this.RE_STARTERS_RE = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|\\.|-|-=|/|/=|:|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";
        this.APOS_STRING_MODE = {className:"string", begin:"'", end:"'", illegal:"\\n", contains:["escape"], relevance:0};
        this.QUOTE_STRING_MODE = {className:"string", begin:'"', end:'"', illegal:"\\n",
            contains:["escape"], relevance:0};
        this.BACKSLASH_ESCAPE = {className:"escape", begin:"\\\\.", end:"^", noMarkup:true, relevance:0};
        this.C_LINE_COMMENT_MODE = {className:"comment", begin:"//", end:"$", relevance:0};
        this.C_BLOCK_COMMENT_MODE = {className:"comment", begin:"/\\*", end:"\\*/|\\*\\|"};
        this.HASH_COMMENT_MODE = {className:"comment", begin:"#", end:"$"};
        this.C_NUMBER_MODE = {className:"number", begin:this.C_NUMBER_RE, end:"^", relevance:0};
        this.start = function () {
            l();
            o()
        }
    });
    $.fn.highlight = function () {
        this.each(function () {
            hljs.highlightBlock(this)
        });
        return this
    }
}).then("./languages/www.js", "./languages/javascript.js", function () {
        hljs.start()
    });
steal.loaded("documentjs/jmvcdoc/highlight/highlight.js");
var orderedParams = function (k) {
    var c = [];
    for (var r in k)c[k[r].order] = k[r];
    return c
};
DocumentationHelpers = {previousIndent:0, calculateDisplay:function (k, c) {
    var r = c.split(/\./);
    k = k.split(/\./);
    for (var l = [], o = [], y = 0; y < r.length; y++)if (k[y] && k[y] == r[y])l.push(r[y]); else {
        o = r.slice(y);
        break
    }
    if (l.length == 1 && (l[0] == "jQuery" || l[0] == "steal"))return{length:1, name:c};
    if (this.indentAdjust === undefined)this.indentAdjust = l.length ? 0 : 1;
    return{length:l.length < 2 ? l.length + this.indentAdjust : l.length, name:o.join(".")}
}, normalizeName:function (k) {
    return k.replace(/&gt;/, "_gt_").replace(/\*/g, "_star_")
}, linkTags:function (k) {
    for (var c =
        [], r = 0; r < k.length; r++)c.push("<a href='#&search=" + k[r] + "'>" + k[r] + "</a>");
    return c.join(" ")
}, linkOpen:function (k) {
    return"<a href='#&who=" + k + "'>" + k + "</a>"
}, signiture:function () {
    var k = [], c = this._data.name;
    c = c.replace("jQuery.", "$.");
    var r = c.lastIndexOf(".static."),
        l = c.lastIndexOf(".prototype."),
        g = c.lastIndexOf(".getters."),
        s = c.lastIndexOf(".setters.");
    if (r != -1)
        c = c.substring(0, r) + "." + c.substring(r + 8);
    else if (l != -1)
        c = c.substring(0, l).replace("$.", "") + "." + c.substring(l + 11);
    else if (g != -1)
        c = c.substring(0, g).replace("$.", "") + "." + c.substring(g + 9);
    else if (s != -1)
        c = c.substring(0, s).replace("$.", "") + "." + c.substring(s + 9);
    if (this._data.construct)c = "new " + c;
    r = orderedParams(this._data.params);
    for (l = 0; l < r.length; l++)k.push(r[l].name);
    return c + "(" + k.join(", ") + ")" + (this._data.ret ? " -> " + this._data.ret.type : "")
}, link:function (k, c) {
    return k.replace(/\[\s*((?:['"][^"']*["'])|[^\|\]\s]*)\s*\|?\s*([^\]]*)\s*\]/g, function (r, l, o) {
        if (/^["']/.test(l))l = l.substr(1, l.length - 2);
        if (/^\/\//.test(l))l = steal.root.join(l.substr(2));
        var y = Doc.findOne({name:l}) || null;
        if (!y) {
            var I = l;
            if (l.indexOf("$.") == 0) {
                I = "jQuery." + I.substr(2);
                y = Doc.findOne({name:I}) || null
            }
            if (!y && l.indexOf("::"))y = Doc.findOne({name:I.replace("::",
                ".prototype.")}) || null;
            if (!y) {
                y = I.split(".");
                y.splice(y.length - 1, 0, "static");
                y = Doc.findOne({name:y.join(".")}) || null
            }
        }
        if (y) {
            o || (o = c ? l : l.replace(/\.prototype|\.static/, ""));
            return"<a href='" + $.route.url({who:y.name}) + "'>" + o + "</a>"
        } else if (typeof l == "string" && l.match(/^https?|www\.|#/))return"<a href='" + l + "'>" + (o || l) + "</a>";
        return r
    })
}, shortenUrl:function (k) {
    k = k.href ? k.href : k;
    var c = k.match(/(https?:\/\/|file:\/\/)[^\/]*\/(.*)/);
    return c[2] ? c[2] : k
}, source:function (k) {
    var c = k.src.match(/([^\/]+)\/(.+)/);
    return DOCS_SRC_MAP[c[1]] + "/blob/master/" + c[2] + "#L" + k.line
}};
steal.loaded("documentjs/jmvcdoc/resources/helpers.js");
steal("jquery/class").then("./favorites.js", function () {
    var k = {};
    $.ajaxSetup({converters:{"json addFavorites":function (c) {
        c.isFavorite = Favorites.isFavorite(c);
        return c
    }}});
    $.Class("Doc", {location:null, load:function (c) {
            if (window.localStorage && window.JMVCDOC_TIMESTAMP) {
                var r = window.localStorage["jmvcDoc" + JMVCDOC_TIMESTAMP];
                if (r) {
                    this._data = r = $.parseJSON(r);
                    c(r);
                    return
                } else for (i = 0; i < localStorage.length;) {
                    r = localStorage.key(i);
                    if (r.indexOf("jmvcDoc") == 0)localStorage.removeItem(r); else i++
                }
            }
            return $.ajax({url:(this.location ||
                DOCS_LOCATION) + "searchData.json", success:this.callback(["setData", c]), jsonpCallback:"C", dataType:"jsonp", cache:true})
        }, setData:function (c) {
            this._data = c;
            var r, l, o, y, I, O;
            for (r in this._data) {
                l = this._data[r];
                o = l.parents || [];
                I = o.length;
                for (y = 0; y < I; y++) {
                    O = c[o[y]];
                    if (!O.childDocs)O.childDocs = [];
                    O.childDocs.push(l.name)
                }
            }
            window.localStorage && window.JMVCDOC_TIMESTAMP && setTimeout(function () {
                window.localStorage["jmvcDoc" + JMVCDOC_TIMESTAMP] = $.toJSON(c)
            }, 1E3);
            return arguments
        }, findOne:function (c, r, l) {
            if (r) {
                if (window.localStorage &&
                    window.JMVCDOC_TIMESTAMP) {
                    var o = window.localStorage["jmvcDoc" + c.name];
                    if (o) {
                        o = $.parseJSON(o);
                        if (o.timestamp == JMVCDOC_TIMESTAMP) {
                            r(o);
                            return
                        }
                    }
                }
                var y = k[c.name];
                if (y) {
                    y.done(r);
                    y.fail(l)
                } else {
                    y = k[c.name] = $.Deferred();
                    y.done(r);
                    y.fail(l);
                    y.done(function (I) {
                        if (window.localStorage && window.JMVCDOC_TIMESTAMP) {
                            I.timestamp = JMVCDOC_TIMESTAMP;
                            setTimeout(function () {
                                window.localStorage["jmvcDoc" + c.name] = $.toJSON(I);
                                delete k[c.name]
                            }, 10)
                        }
                    });
                    $.ajax({url:(this.location || DOCS_LOCATION) + c.name.replace(/ /g, "_").replace(/&#46;/g,
                        ".") + ".json", error:function () {
                        y.reject.apply(y, arguments)
                    }, dataType:"script"})
                }
                return y
            }
            if (c.name)o = this._data[c.name];
            if (o)return new this(o)
        }, foundOne:function (c) {
            c.isFavorite = Favorites.isFavorite(c);
            k[c.name].resolve(c)
        }, findAll:function (c) {
            var r;
            c = c.search.toLowerCase();
            if (!c || c === "*") {
                c = "home";
                r = true
            }
            if (c == "favorites")return Favorites.findAll();
            for (var l = this.searchData(), o = 0; o < 2; o++) {
                if (c.length <= o || !l)break;
                var y = c.substring(o, o + 1);
                l = l[y]
            }
            y = [];
            if (l && c.length > 2) {
                l = this.lookup(l.list);
                for (o =
                         0; o < l.length; o++)this.matches(l[o], c, r) && y.push(l[o])
            } else if (l)y = this.lookup(l.list);
            return y.sort(Search.sortFn)
        }, searchData:function () {
            if (this._searchData)return this._searchData;
            if (window.localStorage && window.JMVCDOC_TIMESTAMP) {
                var c = window.localStorage["jmvcDocSearch" + window.JMVCDOC_TIMESTAMP];
                if (c)return this._searchData = $.parseJSON(c)
            }
            var r = this._searchData = {}, l, o = function (I, O) {
                var X, A, s = r;
                for (A = 0; A < 3; A++) {
                    X = O.substring(A, A + 1);
                    if (!s[X]) {
                        s[X] = {};
                        s[X].list = []
                    }
                    $.inArray(s[X].list, I) == -1 && s[X].list.push(I);
                    s = s[X]
                }
            };
            for (var y in this._data) {
                c = this._data[y];
                l = y.split(".");
                for (p = 0; p < l.length; p++) {
                    part = l[p].toLowerCase();
                    part != "jquery" && o(y, part)
                }
                if (c.tags)for (l = 0; l < c.tags.length; l++)o(y, c.tags[l])
            }
            return this._searchData
        }, matches:function (c, r, l) {
            if (!l && c.name.toLowerCase().indexOf(r) > -1)return true;
            if (c.tags)for (l = 0; l < c.tags.length; l++)if (c.tags[l].toLowerCase().indexOf(r) > -1)return true;
            return false
        }, lookup:function (c) {
            for (var r = [], l = 0; l < c.length; l++)this._data[c[l]] && r.push(this._data[c[l]]);
            return r
        }},
        {init:function (c) {
            $.extend(this, c)
        }, children:function () {
            var c = this.Class._data;
            return $.map(this.childDocs || [],function (r) {
                return new Doc(c[r])
            }).sort(Search.sortFn)
        }});
    $.Class("Search", {sortFn:function (c, r) {
        var l = c.order !== undefined, o = r.order !== undefined;
        if (l && o)return c.order - r.order;
        if (l)return-1;
        if (o)return 1;
        c = (c.title && c.name.indexOf(".") == -1 ? c.title : c.name).replace(".prototype", ".zzzaprototype").replace(".static", ".zzzbstatic").toLowerCase();
        r = (r.title && r.name.indexOf(".") == -1 ? r.title : r.name).replace(".prototype",
            ".zzzaprototype").replace(".static", ".zzzbstatic").toLowerCase();
        if (c < r)return-1;
        return 1
    }, sortJustStrings:function (c, r) {
        c = c.replace(".prototype", ".000AAAprototype").replace(".static", ".111BBBstatic");
        r = r.replace(".prototype", ".000AAAprototype").replace(".static", ".111BBBstatic");
        if (c < r)return-1;
        return 1
    }}, {});
    window.c = Doc.foundOne
});
steal.loaded("documentjs/jmvcdoc/models/search.js");
steal("jquery", "documentjs/jmvcdoc/demo", function (k) {
    var c = false, r;
    k(document).bind("docUpdated", function (l, o) {
        k("#disqus_thread").hide();
        l = k(l.target);
        l.find("h1.addFavorite").append('&nbsp;<span class="favorite favorite' + (o.isFavorite ? "on" : "off") + '">&nbsp;&nbsp;&nbsp;</span>');
        l.find("code").highlight();
        if (k("#api").length) {
            l = [];
            for (var y in Search._data.list)l.push(y);
            k("#api").html(DocumentationHelpers.link("[" + l.sort(Search.sortJustStrings).join("]<br/>[") + "]", true))
        }
        k(".iframe_menu_wrapper").remove();
        k(".demo_wrapper").demo();
        k(".image_tag").each(function () {
            var I = k(this), O = I.attr("src");
            O = steal.root.join(O);
            I.attr("src", O)
        });
        if (steal.options.env == "production" && o.name != "index" && typeof COMMENTS_LOCATION != "undefined" && k("#disqus_thread").length)if (c) {
            clearTimeout(r);
            r = setTimeout(function () {
                DISQUS.reset({reload:true, config:function () {
                    this.page.identifier = window.location.hash;
                    this.page.url = window.location.toString()
                }});
                k("#disqus_thread").show()
            }, 1500)
        } else {
            window.disqus_identifier = window.location.hash;
            window.disqus_url = window.location.toString();
            k.getScript(COMMENTS_LOCATION);
            c = true;
            k("#disqus_thread").show()
        }
    })
});
steal.loaded("documentjs/jmvcdoc/content/doc_updated.js");
steal("jquery", "jquery/lang/string", function (k) {
    var c = false, r = k.makeArray, l = k.isFunction, o = k.isArray, y = k.extend, I = k.String.getObject, O = function (s, x) {
        return s.concat(r(x))
    }, X = /xyz/.test(function () {
    }) ? /\b_super\b/ : /.*/, A = function (s, x, B) {
        B = B || s;
        for (var z in s)B[z] = l(s[z]) && l(x[z]) && X.test(s[z]) ? function (K, v) {
            return function () {
                var F = this._super, E;
                this._super = x[K];
                E = v.apply(this, arguments);
                this._super = F;
                return E
            }
        }(z, s[z]) : s[z]
    };
    clss = k.Class = function () {
        arguments.length && clss.extend.apply(clss, arguments)
    };
    y(clss, {proxy:function (s) {
        var x = r(arguments), B;
        s = x.shift();
        o(s) || (s = [s]);
        B = this;
        return function () {
            for (var z = O(x, arguments), K, v = s.length, F = 0, E; F < v; F++)if (E = s[F]) {
                if ((K = typeof E == "string") && B._set_called)B.called = E;
                z = (K ? B[E] : E).apply(B, z || []);
                if (F < v - 1)z = !o(z) || z._use_call ? [z] : z
            }
            return z
        }
    }, newInstance:function () {
        var s = this.rawInstance(), x;
        if (s.setup)x = s.setup.apply(s, arguments);
        if (s.init)s.init.apply(s, o(x) ? x : arguments);
        return s
    }, setup:function (s) {
        this.defaults = y(true, {}, s.defaults, this.defaults);
        return arguments
    },
        rawInstance:function () {
            c = true;
            var s = new this;
            c = false;
            return s
        }, extend:function (s, x, B) {
            function z() {
                if (!c)return this.constructor !== z && arguments.length ? arguments.callee.extend.apply(arguments.callee, arguments) : this.Class.newInstance.apply(this.Class, arguments)
            }

            if (typeof s != "string") {
                B = x;
                x = s;
                s = null
            }
            if (!B) {
                B = x;
                x = null
            }
            B = B || {};
            var K = this, v = this.prototype, F, E, w, H;
            c = true;
            H = new this;
            c = false;
            A(B, v, H);
            for (F in this)if (this.hasOwnProperty(F))z[F] = this[F];
            A(x, this, z);
            if (s) {
                w = s.split(/\./);
                E = w.pop();
                w = v = I(w.join("."),
                    window, true);
                v[E] = z
            }
            y(z, {prototype:H, namespace:w, shortName:E, constructor:z, fullName:s});
            z.prototype.Class = z.prototype.constructor = z;
            E = z.setup.apply(z, O([K], arguments));
            if (z.init)z.init.apply(z, E || O([K], arguments));
            return z
        }});
    clss.callback = clss.prototype.callback = clss.prototype.proxy = clss.proxy
})();
steal.loaded("jquery/class/class.js");
steal("jquery").then(function (k) {
    var c = {undHash:/_|-/, colons:/::/, words:/([A-Z]+)([A-Z][a-z])/g, lowUp:/([a-z\d])([A-Z])/g, dash:/([a-z\d])([A-Z])/g, replacer:/\{([^\}]+)\}/g, dot:/\./}, r = function (I, O, X) {
        return I[O] !== undefined ? I[O] : X && (I[O] = {})
    }, l = function (I) {
        var O = typeof I;
        return I && (O == "function" || O == "object")
    }, o, y = k.String = k.extend(k.String || {}, {getObject:o = function (I, O, X) {
        I = I ? I.split(c.dot) : [];
        var A = I.length, s, x, B, z = 0;
        O = k.isArray(O) ? O : [O || window];
        if (A == 0)return O[0];
        for (; s = O[z++];) {
            for (B = 0; B < A - 1 &&
                l(s); B++)s = r(s, I[B], X);
            if (l(s)) {
                x = r(s, I[B], X);
                if (x !== undefined) {
                    X === false && delete s[I[B]];
                    return x
                }
            }
        }
    }, capitalize:function (I) {
        return I.charAt(0).toUpperCase() + I.substr(1)
    }, camelize:function (I) {
        I = y.classize(I);
        return I.charAt(0).toLowerCase() + I.substr(1)
    }, classize:function (I, O) {
        I = I.split(c.undHash);
        for (var X = 0; X < I.length; X++)I[X] = y.capitalize(I[X]);
        return I.join(O || "")
    }, niceName:function (I) {
        return y.classize(I, " ")
    }, underscore:function (I) {
        return I.replace(c.colons, "/").replace(c.words, "$1_$2").replace(c.lowUp,
            "$1_$2").replace(c.dash, "_").toLowerCase()
    }, sub:function (I, O, X) {
        var A = [];
        X = typeof X == "boolean" ? !X : X;
        A.push(I.replace(c.replacer, function (s, x) {
            s = o(x, O, X);
            if (l(s)) {
                A.push(s);
                return""
            } else return"" + s
        }));
        return A.length <= 1 ? A[0] : A
    }, _regs:c})
});
steal.loaded("jquery/lang/string/string.js");
steal("jquery/event").then(function (k) {
    var c = jQuery.cleanData;
    k.cleanData = function (r) {
        for (var l = 0, o; (o = r[l]) !== undefined; l++)k(o).triggerHandler("destroyed");
        c(r)
    }
});
steal.loaded("jquery/event/destroyed/destroyed.js");
(function (k, c) {
    function r(a) {
        var b = Ua[a] = {}, e, f;
        a = a.split(/\s+/);
        e = 0;
        for (f = a.length; e < f; e++)b[a[e]] = true;
        return b
    }

    function l(a, b, e) {
        if (e === c && a.nodeType === 1) {
            e = "data-" + b.replace(vb, "-$1").toLowerCase();
            e = a.getAttribute(e);
            if (typeof e === "string") {
                try {
                    e = e === "true" ? true : e === "false" ? false : e === "null" ? null : d.isNumeric(e) ? parseFloat(e) : wb.test(e) ? d.parseJSON(e) : e
                } catch (f) {
                }
                d.data(a, b, e)
            } else e = c
        }
        return e
    }

    function o(a) {
        for (var b in a)if (!(b === "data" && d.isEmptyObject(a[b])))if (b !== "toJSON")return false;
        return true
    }

    function y(a, b, e) {
        var f = b + "defer", g = b + "queue", h = b + "mark", n = d._data(a, f);
        if (n && (e === "queue" || !d._data(a, g)) && (e === "mark" || !d._data(a, h)))setTimeout(function () {
            if (!d._data(a, g) && !d._data(a, h)) {
                d.removeData(a, f, true);
                n.fire()
            }
        }, 0)
    }

    function I() {
        return false
    }

    function O() {
        return true
    }

    function X(a) {
        return!a || !a.parentNode || a.parentNode.nodeType === 11
    }

    function A(a, b, e) {
        b = b || 0;
        if (d.isFunction(b))return d.grep(a, function (g, h) {
            return!!b.call(g, h, g) === e
        }); else if (b.nodeType)return d.grep(a, function (g) {
            return g ===
                b === e
        }); else if (typeof b === "string") {
            var f = d.grep(a, function (g) {
                return g.nodeType === 1
            });
            if (xb.test(b))return d.filter(b, f, !e); else b = d.filter(b, f)
        }
        return d.grep(a, function (g) {
            return d.inArray(g, b) >= 0 === e
        })
    }

    function s(a) {
        var b = Va.split("|");
        a = a.createDocumentFragment();
        if (a.createElement)for (; b.length;)a.createElement(b.pop());
        return a
    }

    function x(a) {
        return d.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function B(a, b) {
        if (!(b.nodeType !==
            1 || !d.hasData(a))) {
            var e, f, g;
            f = d._data(a);
            a = d._data(b, f);
            var h = f.events;
            if (h) {
                delete a.handle;
                a.events = {};
                for (e in h) {
                    f = 0;
                    for (g = h[e].length; f < g; f++)d.event.add(b, e + (h[e][f].namespace ? "." : "") + h[e][f].namespace, h[e][f], h[e][f].data)
                }
            }
            if (a.data)a.data = d.extend({}, a.data)
        }
    }

    function z(a, b) {
        var e;
        if (b.nodeType === 1) {
            b.clearAttributes && b.clearAttributes();
            b.mergeAttributes && b.mergeAttributes(a);
            e = b.nodeName.toLowerCase();
            if (e === "object")b.outerHTML = a.outerHTML; else if (e === "input" && (a.type === "checkbox" || a.type ===
                "radio")) {
                if (a.checked)b.defaultChecked = b.checked = a.checked;
                if (b.value !== a.value)b.value = a.value
            } else if (e === "option")b.selected = a.defaultSelected; else if (e === "input" || e === "textarea")b.defaultValue = a.defaultValue;
            b.removeAttribute(d.expando)
        }
    }

    function K(a) {
        return typeof a.getElementsByTagName !== "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll !== "undefined" ? a.querySelectorAll("*") : []
    }

    function v(a) {
        if (a.type === "checkbox" || a.type === "radio")a.defaultChecked = a.checked
    }

    function F(a) {
        var b =
            (a.nodeName || "").toLowerCase();
        if (b === "input")v(a); else b !== "script" && typeof a.getElementsByTagName !== "undefined" && d.grep(a.getElementsByTagName("input"), v)
    }

    function E(a) {
        var b = N.createElement("div");
        Wa.appendChild(b);
        b.innerHTML = a.outerHTML;
        return b.firstChild
    }

    function w(a, b) {
        b.src ? d.ajax({url:b.src, async:false, dataType:"script"}) : d.globalEval((b.text || b.textContent || b.innerHTML || "").replace(yb, "/*$0*/"));
        b.parentNode && b.parentNode.removeChild(b)
    }

    function H(a, b, e) {
        var f = b === "width" ? a.offsetWidth :
            a.offsetHeight, g = b === "width" ? zb : Ab, h = 0, n = g.length;
        if (f > 0) {
            if (e !== "border")for (; h < n; h++) {
                e || (f -= parseFloat(d.css(a, "padding" + g[h])) || 0);
                if (e === "margin")f += parseFloat(d.css(a, e + g[h])) || 0; else f -= parseFloat(d.css(a, "border" + g[h] + "Width")) || 0
            }
            return f + "px"
        }
        f = Fa(a, b, b);
        if (f < 0 || f == null)f = a.style[b] || 0;
        f = parseFloat(f) || 0;
        if (e)for (; h < n; h++) {
            f += parseFloat(d.css(a, "padding" + g[h])) || 0;
            if (e !== "padding")f += parseFloat(d.css(a, "border" + g[h] + "Width")) || 0;
            if (e === "margin")f += parseFloat(d.css(a, e + g[h])) || 0
        }
        return f +
            "px"
    }

    function P(a) {
        return function (b, e) {
            if (typeof b !== "string") {
                e = b;
                b = "*"
            }
            if (d.isFunction(e)) {
                b = b.toLowerCase().split(Xa);
                for (var f = 0, g = b.length, h, n; f < g; f++) {
                    h = b[f];
                    if (n = /^\+/.test(h))h = h.substr(1) || "*";
                    h = a[h] = a[h] || [];
                    h[n ? "unshift" : "push"](e)
                }
            }
        }
    }

    function ga(a, b, e, f, g, h) {
        g = g || b.dataTypes[0];
        h = h || {};
        h[g] = true;
        g = a[g];
        for (var n = 0, q = g ? g.length : 0, t = a === Ma, C; n < q && (t || !C); n++) {
            C = g[n](b, e, f);
            if (typeof C === "string")if (!t || h[C])C = c; else {
                b.dataTypes.unshift(C);
                C = ga(a, b, e, f, C, h)
            }
        }
        if ((t || !C) && !h["*"])C = ga(a, b,
            e, f, "*", h);
        return C
    }

    function ja(a, b) {
        var e, f, g = d.ajaxSettings.flatOptions || {};
        for (e in b)if (b[e] !== c)(g[e] ? a : f || (f = {}))[e] = b[e];
        f && d.extend(true, a, f)
    }

    function M(a, b, e, f) {
        if (d.isArray(b))d.each(b, function (h, n) {
            e || Bb.test(a) ? f(a, n) : M(a + "[" + (typeof n === "object" || d.isArray(n) ? h : "") + "]", n, e, f)
        }); else if (!e && b != null && typeof b === "object")for (var g in b)M(a + "[" + g + "]", b[g], e, f); else f(a, b)
    }

    function T(a, b, e) {
        var f = a.contents, g = a.dataTypes, h = a.responseFields, n, q, t, C;
        for (q in h)if (q in e)b[h[q]] = e[q];
        for (; g[0] ===
                   "*";) {
            g.shift();
            if (n === c)n = a.mimeType || b.getResponseHeader("content-type")
        }
        if (n)for (q in f)if (f[q] && f[q].test(n)) {
            g.unshift(q);
            break
        }
        if (g[0]in e)t = g[0]; else {
            for (q in e) {
                if (!g[0] || a.converters[q + " " + g[0]]) {
                    t = q;
                    break
                }
                C || (C = q)
            }
            t = t || C
        }
        if (t) {
            t !== g[0] && g.unshift(t);
            return e[t]
        }
    }

    function G(a, b) {
        if (a.dataFilter)b = a.dataFilter(b, a.dataType);
        var e = a.dataTypes, f = {}, g, h, n = e.length, q, t = e[0], C, V, L, Z, U;
        for (g = 1; g < n; g++) {
            if (g === 1)for (h in a.converters)if (typeof h === "string")f[h.toLowerCase()] = a.converters[h];
            C = t;
            t = e[g];
            if (t === "*")t = C; else if (C !== "*" && C !== t) {
                V = C + " " + t;
                L = f[V] || f["* " + t];
                if (!L) {
                    U = c;
                    for (Z in f) {
                        q = Z.split(" ");
                        if (q[0] === C || q[0] === "*")if (U = f[q[1] + " " + t]) {
                            Z = f[Z];
                            if (Z === true)L = U; else if (U === true)L = Z;
                            break
                        }
                    }
                }
                L || U || d.error("No conversion from " + V.replace(" ", " to "));
                if (L !== true)b = L ? L(b) : U(Z(b))
            }
        }
        return b
    }

    function Y() {
        try {
            return new k.XMLHttpRequest
        } catch (a) {
        }
    }

    function ca() {
        try {
            return new k.ActiveXObject("Microsoft.XMLHTTP")
        } catch (a) {
        }
    }

    function ia() {
        setTimeout(ma, 0);
        return Ia = d.now()
    }

    function ma() {
        Ia =
            c
    }

    function ta(a, b) {
        var e = {};
        d.each(Ya.concat.apply([], Ya.slice(0, b)), function () {
            e[this] = a
        });
        return e
    }

    function da(a) {
        if (!Na[a]) {
            var b = N.body, e = d("<" + a + ">").appendTo(b), f = e.css("display");
            e.remove();
            if (f === "none" || f === "") {
                if (!za) {
                    za = N.createElement("iframe");
                    za.frameBorder = za.width = za.height = 0
                }
                b.appendChild(za);
                if (!Ga || !za.createElement) {
                    Ga = (za.contentWindow || za.contentDocument).document;
                    Ga.write((N.compatMode === "CSS1Compat" ? "<!doctype html>" : "") + "<html><body>");
                    Ga.close()
                }
                e = Ga.createElement(a);
                Ga.body.appendChild(e);
                f = d.css(e, "display");
                b.removeChild(za)
            }
            Na[a] = f
        }
        return Na[a]
    }

    function fa(a) {
        return d.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : false
    }

    var N = k.document, ha = k.navigator, ka = k.location, d = function () {
        function a() {
            if (!b.isReady) {
                try {
                    N.documentElement.doScroll("left")
                } catch (u) {
                    setTimeout(a, 1);
                    return
                }
                b.ready()
            }
        }

        var b = function (u, R) {
                return new b.fn.init(u, R, g)
            }, e = k.jQuery, f = k.$, g, h = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, n = /\S/, q = /^\s+/, t = /\s+$/, C = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, V = /^[\],:{}\s]*$/,
            L = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, Z = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, U = /(?:^|:|,)(?:\s*\[)+/g, la = /(webkit)[ \/]([\w.]+)/, ra = /(opera)(?:.*version)?[ \/]([\w.]+)/, ua = /(msie) ([\w.]+)/, sa = /(mozilla)(?:.*? rv:([\w.]+))?/, Ba = /-([a-z]|[0-9])/ig, na = /^-ms-/, Aa = function (u, R) {
                return(R + "").toUpperCase()
            }, ya = ha.userAgent, j, m, D = Object.prototype.toString, J = Object.prototype.hasOwnProperty, Q = Array.prototype.push, S = Array.prototype.slice, aa = String.prototype.trim, ea = Array.prototype.indexOf,
            pa = {};
        b.fn = b.prototype = {constructor:b, init:function (u, R, ba) {
            var W;
            if (!u)return this;
            if (u.nodeType) {
                this.context = this[0] = u;
                this.length = 1;
                return this
            }
            if (u === "body" && !R && N.body) {
                this.context = N;
                this[0] = N.body;
                this.selector = u;
                this.length = 1;
                return this
            }
            if (typeof u === "string")if ((W = u.charAt(0) === "<" && u.charAt(u.length - 1) === ">" && u.length >= 3 ? [null, u, null] : h.exec(u)) && (W[1] || !R))if (W[1]) {
                ba = (R = R instanceof b ? R[0] : R) ? R.ownerDocument || R : N;
                if (u = C.exec(u))if (b.isPlainObject(R)) {
                    u = [N.createElement(u[1])];
                    b.fn.attr.call(u,
                        R, true)
                } else u = [ba.createElement(u[1])]; else {
                    u = b.buildFragment([W[1]], [ba]);
                    u = (u.cacheable ? b.clone(u.fragment) : u.fragment).childNodes
                }
                return b.merge(this, u)
            } else {
                if ((R = N.getElementById(W[2])) && R.parentNode) {
                    if (R.id !== W[2])return ba.find(u);
                    this.length = 1;
                    this[0] = R
                }
                this.context = N;
                this.selector = u;
                return this
            } else return!R || R.jquery ? (R || ba).find(u) : this.constructor(R).find(u); else if (b.isFunction(u))return ba.ready(u);
            if (u.selector !== c) {
                this.selector = u.selector;
                this.context = u.context
            }
            return b.makeArray(u,
                this)
        }, selector:"", jquery:"1.7.1", length:0, size:function () {
            return this.length
        }, toArray:function () {
            return S.call(this, 0)
        }, get:function (u) {
            return u == null ? this.toArray() : u < 0 ? this[this.length + u] : this[u]
        }, pushStack:function (u, R, ba) {
            var W = this.constructor();
            b.isArray(u) ? Q.apply(W, u) : b.merge(W, u);
            W.prevObject = this;
            W.context = this.context;
            if (R === "find")W.selector = this.selector + (this.selector ? " " : "") + ba; else if (R)W.selector = this.selector + "." + R + "(" + ba + ")";
            return W
        }, each:function (u, R) {
            return b.each(this, u, R)
        },
            ready:function (u) {
                b.bindReady();
                j.add(u);
                return this
            }, eq:function (u) {
                u = +u;
                return u === -1 ? this.slice(u) : this.slice(u, u + 1)
            }, first:function () {
                return this.eq(0)
            }, last:function () {
                return this.eq(-1)
            }, slice:function () {
                return this.pushStack(S.apply(this, arguments), "slice", S.call(arguments).join(","))
            }, map:function (u) {
                return this.pushStack(b.map(this, function (R, ba) {
                    return u.call(R, ba, R)
                }))
            }, end:function () {
                return this.prevObject || this.constructor(null)
            }, push:Q, sort:[].sort, splice:[].splice};
        b.fn.init.prototype =
            b.fn;
        b.extend = b.fn.extend = function () {
            var u, R, ba, W, qa, oa = arguments[0] || {}, va = 1, wa = arguments.length, Oa = false;
            if (typeof oa === "boolean") {
                Oa = oa;
                oa = arguments[1] || {};
                va = 2
            }
            if (typeof oa !== "object" && !b.isFunction(oa))oa = {};
            if (wa === va) {
                oa = this;
                --va
            }
            for (; va < wa; va++)if ((u = arguments[va]) != null)for (R in u) {
                ba = oa[R];
                W = u[R];
                if (oa !== W)if (Oa && W && (b.isPlainObject(W) || (qa = b.isArray(W)))) {
                    if (qa) {
                        qa = false;
                        ba = ba && b.isArray(ba) ? ba : []
                    } else ba = ba && b.isPlainObject(ba) ? ba : {};
                    oa[R] = b.extend(Oa, ba, W)
                } else if (W !== c)oa[R] = W
            }
            return oa
        };
        b.extend({noConflict:function (u) {
            if (k.$ === b)k.$ = f;
            if (u && k.jQuery === b)k.jQuery = e;
            return b
        }, isReady:false, readyWait:1, holdReady:function (u) {
            if (u)b.readyWait++; else b.ready(true)
        }, ready:function (u) {
            if (u === true && !--b.readyWait || u !== true && !b.isReady) {
                if (!N.body)return setTimeout(b.ready, 1);
                b.isReady = true;
                if (!(u !== true && --b.readyWait > 0)) {
                    j.fireWith(N, [b]);
                    b.fn.trigger && b(N).trigger("ready").off("ready")
                }
            }
        }, bindReady:function () {
            if (!j) {
                j = b.Callbacks("once memory");
                if (N.readyState === "complete")return setTimeout(b.ready,
                    1);
                if (N.addEventListener) {
                    N.addEventListener("DOMContentLoaded", m, false);
                    k.addEventListener("load", b.ready, false)
                } else if (N.attachEvent) {
                    N.attachEvent("onreadystatechange", m);
                    k.attachEvent("onload", b.ready);
                    var u = false;
                    try {
                        u = k.frameElement == null
                    } catch (R) {
                    }
                    N.documentElement.doScroll && u && a()
                }
            }
        }, isFunction:function (u) {
            return b.type(u) === "function"
        }, isArray:Array.isArray || function (u) {
            return b.type(u) === "array"
        }, isWindow:function (u) {
            return u && typeof u === "object" && "setInterval"in u
        }, isNumeric:function (u) {
            return!isNaN(parseFloat(u)) &&
                isFinite(u)
        }, type:function (u) {
            return u == null ? String(u) : pa[D.call(u)] || "object"
        }, isPlainObject:function (u) {
            if (!u || b.type(u) !== "object" || u.nodeType || b.isWindow(u))return false;
            try {
                if (u.constructor && !J.call(u, "constructor") && !J.call(u.constructor.prototype, "isPrototypeOf"))return false
            } catch (R) {
                return false
            }
            var ba;
            for (ba in u);
            return ba === c || J.call(u, ba)
        }, isEmptyObject:function (u) {
            for (var R in u)return false;
            return true
        }, error:function (u) {
            throw new Error(u);
        }, parseJSON:function (u) {
            if (typeof u !== "string" ||
                !u)return null;
            u = b.trim(u);
            if (k.JSON && k.JSON.parse)return k.JSON.parse(u);
            if (V.test(u.replace(L, "@").replace(Z, "]").replace(U, "")))return(new Function("return " + u))();
            b.error("Invalid JSON: " + u)
        }, parseXML:function (u) {
            var R, ba;
            try {
                if (k.DOMParser) {
                    ba = new DOMParser;
                    R = ba.parseFromString(u, "text/xml")
                } else {
                    R = new ActiveXObject("Microsoft.XMLDOM");
                    R.async = "false";
                    R.loadXML(u)
                }
            } catch (W) {
                R = c
            }
            if (!R || !R.documentElement || R.getElementsByTagName("parsererror").length)b.error("Invalid XML: " + u);
            return R
        }, noop:function () {
        },
            globalEval:function (u) {
                if (u && n.test(u))(k.execScript || function (R) {
                    k.eval.call(k, R)
                })(u)
            }, camelCase:function (u) {
                return u.replace(na, "ms-").replace(Ba, Aa)
            }, nodeName:function (u, R) {
                return u.nodeName && u.nodeName.toUpperCase() === R.toUpperCase()
            }, each:function (u, R, ba) {
                var W, qa = 0, oa = u.length, va = oa === c || b.isFunction(u);
                if (ba)if (va)for (W in u) {
                    if (R.apply(u[W], ba) === false)break
                } else for (; qa < oa;) {
                    if (R.apply(u[qa++], ba) === false)break
                } else if (va)for (W in u) {
                    if (R.call(u[W], W, u[W]) === false)break
                } else for (; qa < oa;)if (R.call(u[qa],
                    qa, u[qa++]) === false)break;
                return u
            }, trim:aa ? function (u) {
                return u == null ? "" : aa.call(u)
            } : function (u) {
                return u == null ? "" : u.toString().replace(q, "").replace(t, "")
            }, makeArray:function (u, R) {
                R = R || [];
                if (u != null) {
                    var ba = b.type(u);
                    u.length == null || ba === "string" || ba === "function" || ba === "regexp" || b.isWindow(u) ? Q.call(R, u) : b.merge(R, u)
                }
                return R
            }, inArray:function (u, R, ba) {
                var W;
                if (R) {
                    if (ea)return ea.call(R, u, ba);
                    W = R.length;
                    for (ba = ba ? ba < 0 ? Math.max(0, W + ba) : ba : 0; ba < W; ba++)if (ba in R && R[ba] === u)return ba
                }
                return-1
            }, merge:function (u, R) {
                var ba = u.length, W = 0;
                if (typeof R.length === "number")for (var qa = R.length; W < qa; W++)u[ba++] = R[W]; else for (; R[W] !== c;)u[ba++] = R[W++];
                u.length = ba;
                return u
            }, grep:function (u, R, ba) {
                var W = [], qa;
                ba = !!ba;
                for (var oa = 0, va = u.length; oa < va; oa++) {
                    qa = !!R(u[oa], oa);
                    ba !== qa && W.push(u[oa])
                }
                return W
            }, map:function (u, R, ba) {
                var W, qa, oa = [], va = 0, wa = u.length;
                if (u instanceof b || wa !== c && typeof wa === "number" && (wa > 0 && u[0] && u[wa - 1] || wa === 0 || b.isArray(u)))for (; va < wa; va++) {
                    W = R(u[va], va, ba);
                    if (W != null)oa[oa.length] = W
                } else for (qa in u) {
                    W =
                        R(u[qa], qa, ba);
                    if (W != null)oa[oa.length] = W
                }
                return oa.concat.apply([], oa)
            }, guid:1, proxy:function (u, R) {
                if (typeof R === "string") {
                    var ba = u[R];
                    R = u;
                    u = ba
                }
                if (!b.isFunction(u))return c;
                var W = S.call(arguments, 2);
                ba = function () {
                    return u.apply(R, W.concat(S.call(arguments)))
                };
                ba.guid = u.guid = u.guid || ba.guid || b.guid++;
                return ba
            }, access:function (u, R, ba, W, qa, oa) {
                var va = u.length;
                if (typeof R === "object") {
                    for (var wa in R)b.access(u, wa, R[wa], W, qa, ba);
                    return u
                }
                if (ba !== c) {
                    W = !oa && W && b.isFunction(ba);
                    for (wa = 0; wa < va; wa++)qa(u[wa],
                        R, W ? ba.call(u[wa], wa, qa(u[wa], R)) : ba, oa);
                    return u
                }
                return va ? qa(u[0], R) : c
            }, now:function () {
                return(new Date).getTime()
            }, uaMatch:function (u) {
                u = u.toLowerCase();
                u = la.exec(u) || ra.exec(u) || ua.exec(u) || u.indexOf("compatible") < 0 && sa.exec(u) || [];
                return{browser:u[1] || "", version:u[2] || "0"}
            }, sub:function () {
                function u(ba, W) {
                    return new u.fn.init(ba, W)
                }

                b.extend(true, u, this);
                u.superclass = this;
                u.fn = u.prototype = this();
                u.fn.constructor = u;
                u.sub = this.sub;
                u.fn.init = function (ba, W) {
                    if (W && W instanceof b && !(W instanceof u))W =
                        u(W);
                    return b.fn.init.call(this, ba, W, R)
                };
                u.fn.init.prototype = u.fn;
                var R = u(N);
                return u
            }, browser:{}});
        b.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (u, R) {
            pa["[object " + R + "]"] = R.toLowerCase()
        });
        ya = b.uaMatch(ya);
        if (ya.browser) {
            b.browser[ya.browser] = true;
            b.browser.version = ya.version
        }
        if (b.browser.webkit)b.browser.safari = true;
        if (n.test("\u00a0")) {
            q = /^[\s\xA0]+/;
            t = /[\s\xA0]+$/
        }
        g = b(N);
        if (N.addEventListener)m = function () {
            N.removeEventListener("DOMContentLoaded", m, false);
            b.ready()
        }; else if (N.attachEvent)m = function () {
            if (N.readyState === "complete") {
                N.detachEvent("onreadystatechange", m);
                b.ready()
            }
        };
        return b
    }(), Ua = {};
    d.Callbacks = function (a) {
        a = a ? Ua[a] || r(a) : {};
        var b = [], e = [], f, g, h, n, q, t = function (L) {
            var Z, U, la, ra;
            Z = 0;
            for (U = L.length; Z < U; Z++) {
                la = L[Z];
                ra = d.type(la);
                if (ra === "array")t(la); else if (ra === "function")if (!a.unique || !V.has(la))b.push(la)
            }
        }, C = function (L, Z) {
            Z = Z || [];
            f = !a.memory || [L, Z];
            g = true;
            q = h || 0;
            h = 0;
            for (n = b.length; b && q < n; q++)if (b[q].apply(L, Z) === false && a.stopOnFalse) {
                f =
                    true;
                break
            }
            g = false;
            if (b)if (a.once)if (f === true)V.disable(); else b = []; else if (e && e.length) {
                f = e.shift();
                V.fireWith(f[0], f[1])
            }
        }, V = {add:function () {
            if (b) {
                var L = b.length;
                t(arguments);
                if (g)n = b.length; else if (f && f !== true) {
                    h = L;
                    C(f[0], f[1])
                }
            }
            return this
        }, remove:function () {
            if (b)for (var L = arguments, Z = 0, U = L.length; Z < U; Z++)for (var la = 0; la < b.length; la++)if (L[Z] === b[la]) {
                if (g)if (la <= n) {
                    n--;
                    la <= q && q--
                }
                b.splice(la--, 1);
                if (a.unique)break
            }
            return this
        }, has:function (L) {
            if (b)for (var Z = 0, U = b.length; Z < U; Z++)if (L === b[Z])return true;
            return false
        }, empty:function () {
            b = [];
            return this
        }, disable:function () {
            b = e = f = c;
            return this
        }, disabled:function () {
            return!b
        }, lock:function () {
            e = c;
            if (!f || f === true)V.disable();
            return this
        }, locked:function () {
            return!e
        }, fireWith:function (L, Z) {
            if (e)if (g)a.once || e.push([L, Z]); else a.once && f || C(L, Z);
            return this
        }, fire:function () {
            V.fireWith(this, arguments);
            return this
        }, fired:function () {
            return!!f
        }};
        return V
    };
    var Pa = [].slice;
    d.extend({Deferred:function (a) {
        var b = d.Callbacks("once memory"), e = d.Callbacks("once memory"),
            f = d.Callbacks("memory"), g = "pending", h = {resolve:b, reject:e, notify:f}, n = {done:b.add, fail:e.add, progress:f.add, state:function () {
                return g
            }, isResolved:b.fired, isRejected:e.fired, then:function (C, V, L) {
                q.done(C).fail(V).progress(L);
                return this
            }, always:function () {
                q.done.apply(q, arguments).fail.apply(q, arguments);
                return this
            }, pipe:function (C, V, L) {
                return d.Deferred(function (Z) {
                    d.each({done:[C, "resolve"], fail:[V, "reject"], progress:[L, "notify"]}, function (U, la) {
                        var ra = la[0], ua = la[1], sa;
                        d.isFunction(ra) ? q[U](function () {
                            (sa =
                                ra.apply(this, arguments)) && d.isFunction(sa.promise) ? sa.promise().then(Z.resolve, Z.reject, Z.notify) : Z[ua + "With"](this === q ? Z : this, [sa])
                        }) : q[U](Z[ua])
                    })
                }).promise()
            }, promise:function (C) {
                if (C == null)C = n; else for (var V in n)C[V] = n[V];
                return C
            }}, q = n.promise({}), t;
        for (t in h) {
            q[t] = h[t].fire;
            q[t + "With"] = h[t].fireWith
        }
        q.done(function () {
            g = "resolved"
        }, e.disable, f.lock).fail(function () {
            g = "rejected"
        }, b.disable, f.lock);
        a && a.call(q, q);
        return q
    }, when:function (a) {
        function b(V) {
            return function (L) {
                f[V] = arguments.length >
                    1 ? Pa.call(arguments, 0) : L;
                --q || t.resolveWith(t, f)
            }
        }

        function e(V) {
            return function (L) {
                n[V] = arguments.length > 1 ? Pa.call(arguments, 0) : L;
                t.notifyWith(C, n)
            }
        }

        var f = Pa.call(arguments, 0), g = 0, h = f.length, n = new Array(h), q = h, t = h <= 1 && a && d.isFunction(a.promise) ? a : d.Deferred(), C = t.promise();
        if (h > 1) {
            for (; g < h; g++)if (f[g] && f[g].promise && d.isFunction(f[g].promise))f[g].promise().then(b(g), t.reject, e(g)); else--q;
            q || t.resolveWith(t, f)
        } else if (t !== a)t.resolveWith(t, h ? [a] : []);
        return C
    }});
    d.support = function () {
        var a, b, e, f, g,
            h, n, q, t = N.createElement("div");
        t.setAttribute("className", "t");
        t.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
        b = t.getElementsByTagName("*");
        e = t.getElementsByTagName("a")[0];
        if (!b || !b.length || !e)return{};
        f = N.createElement("select");
        g = f.appendChild(N.createElement("option"));
        b = t.getElementsByTagName("input")[0];
        a = {leadingWhitespace:t.firstChild.nodeType === 3, tbody:!t.getElementsByTagName("tbody").length, htmlSerialize:!!t.getElementsByTagName("link").length,
            style:/top/.test(e.getAttribute("style")), hrefNormalized:e.getAttribute("href") === "/a", opacity:/^0.55/.test(e.style.opacity), cssFloat:!!e.style.cssFloat, checkOn:b.value === "on", optSelected:g.selected, getSetAttribute:t.className !== "t", enctype:!!N.createElement("form").enctype, html5Clone:N.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>", submitBubbles:true, changeBubbles:true, focusinBubbles:false, deleteExpando:true, noCloneEvent:true, inlineBlockNeedsLayout:false, shrinkWrapBlocks:false,
            reliableMarginRight:true};
        b.checked = true;
        a.noCloneChecked = b.cloneNode(true).checked;
        f.disabled = true;
        a.optDisabled = !g.disabled;
        try {
            delete t.test
        } catch (C) {
            a.deleteExpando = false
        }
        if (!t.addEventListener && t.attachEvent && t.fireEvent) {
            t.attachEvent("onclick", function () {
                a.noCloneEvent = false
            });
            t.cloneNode(true).fireEvent("onclick")
        }
        b = N.createElement("input");
        b.value = "t";
        b.setAttribute("type", "radio");
        a.radioValue = b.value === "t";
        b.setAttribute("checked", "checked");
        t.appendChild(b);
        e = N.createDocumentFragment();
        e.appendChild(t.lastChild);
        a.checkClone = e.cloneNode(true).cloneNode(true).lastChild.checked;
        a.appendChecked = b.checked;
        e.removeChild(b);
        e.appendChild(t);
        t.innerHTML = "";
        if (k.getComputedStyle) {
            b = N.createElement("div");
            b.style.width = "0";
            b.style.marginRight = "0";
            t.style.width = "2px";
            t.appendChild(b);
            a.reliableMarginRight = (parseInt((k.getComputedStyle(b, null) || {marginRight:0}).marginRight, 10) || 0) === 0
        }
        if (t.attachEvent)for (n in{submit:1, change:1, focusin:1}) {
            b = "on" + n;
            q = b in t;
            if (!q) {
                t.setAttribute(b, "return;");
                q = typeof t[b] === "function"
            }
            a[n + "Bubbles"] = q
        }
        e.removeChild(t);
        e = f = g = b = t = b = null;
        d(function () {
            var V, L, Z, U, la = N.getElementsByTagName("body")[0];
            if (la) {
                V = N.createElement("div");
                V.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px";
                la.insertBefore(V, la.firstChild);
                t = N.createElement("div");
                V.appendChild(t);
                t.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>";
                h = t.getElementsByTagName("td");
                q = h[0].offsetHeight === 0;
                h[0].style.display =
                    "";
                h[1].style.display = "none";
                a.reliableHiddenOffsets = q && h[0].offsetHeight === 0;
                t.innerHTML = "";
                t.style.width = t.style.paddingLeft = "1px";
                d.boxModel = a.boxModel = t.offsetWidth === 2;
                if (typeof t.style.zoom !== "undefined") {
                    t.style.display = "inline";
                    t.style.zoom = 1;
                    a.inlineBlockNeedsLayout = t.offsetWidth === 2;
                    t.style.display = "";
                    t.innerHTML = "<div style='width:4px;'></div>";
                    a.shrinkWrapBlocks = t.offsetWidth !== 2
                }
                t.style.cssText = "position:absolute;top:0;left:0;width:1px;height:1px;margin:0;visibility:hidden;border:0;";
                t.innerHTML = "<div style='position:absolute;top:0;left:0;width:1px;height:1px;margin:0;border:5px solid #000;padding:0;'><div></div></div><table style='position:absolute;top:0;left:0;width:1px;height:1px;margin:0;border:5px solid #000;padding:0;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
                L = t.firstChild;
                Z = L.firstChild;
                U = {doesNotAddBorder:Z.offsetTop !== 5, doesAddBorderForTableAndCells:L.nextSibling.firstChild.firstChild.offsetTop === 5};
                Z.style.position = "fixed";
                Z.style.top = "20px";
                U.fixedPosition =
                    Z.offsetTop === 20 || Z.offsetTop === 15;
                Z.style.position = Z.style.top = "";
                L.style.overflow = "hidden";
                L.style.position = "relative";
                U.subtractsBorderForOverflowNotVisible = Z.offsetTop === -5;
                U.doesNotIncludeMarginInBodyOffset = la.offsetTop !== 1;
                la.removeChild(V);
                t = null;
                d.extend(a, U)
            }
        });
        return a
    }();
    var wb = /^(?:\{.*\}|\[.*\])$/, vb = /([A-Z])/g;
    d.extend({cache:{}, uuid:0, expando:"jQuery" + (d.fn.jquery + Math.random()).replace(/\D/g, ""), noData:{embed:true, object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", applet:true}, hasData:function (a) {
        a =
            a.nodeType ? d.cache[a[d.expando]] : a[d.expando];
        return!!a && !o(a)
    }, data:function (a, b, e, f) {
        if (d.acceptData(a)) {
            var g;
            g = d.expando;
            var h = typeof b === "string", n = a.nodeType, q = n ? d.cache : a, t = n ? a[g] : a[g] && g, C = b === "events";
            if (!((!t || !q[t] || !C && !f && !q[t].data) && h && e === c)) {
                if (!t)if (n)a[g] = t = ++d.uuid; else t = g;
                if (!q[t]) {
                    q[t] = {};
                    if (!n)q[t].toJSON = d.noop
                }
                if (typeof b === "object" || typeof b === "function")if (f)q[t] = d.extend(q[t], b); else q[t].data = d.extend(q[t].data, b);
                g = a = q[t];
                if (!f) {
                    if (!a.data)a.data = {};
                    a = a.data
                }
                if (e !==
                    c)a[d.camelCase(b)] = e;
                if (C && !a[b])return g.events;
                if (h) {
                    e = a[b];
                    if (e == null)e = a[d.camelCase(b)]
                } else e = a;
                return e
            }
        }
    }, removeData:function (a, b, e) {
        if (d.acceptData(a)) {
            var f, g, h, n = d.expando, q = a.nodeType, t = q ? d.cache : a, C = q ? a[n] : n;
            if (t[C]) {
                if (b)if (f = e ? t[C] : t[C].data) {
                    if (!d.isArray(b))if (b in f)b = [b]; else {
                        b = d.camelCase(b);
                        b = b in f ? [b] : b.split(" ")
                    }
                    g = 0;
                    for (h = b.length; g < h; g++)delete f[b[g]];
                    if (!(e ? o : d.isEmptyObject)(f))return
                }
                if (!e) {
                    delete t[C].data;
                    if (!o(t[C]))return
                }
                if (d.support.deleteExpando || !t.setInterval)delete t[C];
                else t[C] = null;
                if (q)if (d.support.deleteExpando)delete a[n]; else if (a.removeAttribute)a.removeAttribute(n); else a[n] = null
            }
        }
    }, _data:function (a, b, e) {
        return d.data(a, b, e, true)
    }, acceptData:function (a) {
        if (a.nodeName) {
            var b = d.noData[a.nodeName.toLowerCase()];
            if (b)return!(b === true || a.getAttribute("classid") !== b)
        }
        return true
    }});
    d.fn.extend({data:function (a, b) {
        var e, f, g, h = null;
        if (typeof a === "undefined") {
            if (this.length) {
                h = d.data(this[0]);
                if (this[0].nodeType === 1 && !d._data(this[0], "parsedAttrs")) {
                    f = this[0].attributes;
                    for (var n = 0, q = f.length; n < q; n++) {
                        g = f[n].name;
                        if (g.indexOf("data-") === 0) {
                            g = d.camelCase(g.substring(5));
                            l(this[0], g, h[g])
                        }
                    }
                    d._data(this[0], "parsedAttrs", true)
                }
            }
            return h
        } else if (typeof a === "object")return this.each(function () {
            d.data(this, a)
        });
        e = a.split(".");
        e[1] = e[1] ? "." + e[1] : "";
        if (b === c) {
            h = this.triggerHandler("getData" + e[1] + "!", [e[0]]);
            if (h === c && this.length) {
                h = d.data(this[0], a);
                h = l(this[0], a, h)
            }
            return h === c && e[1] ? this.data(e[0]) : h
        } else return this.each(function () {
            var t = d(this), C = [e[0], b];
            t.triggerHandler("setData" +
                e[1] + "!", C);
            d.data(this, a, b);
            t.triggerHandler("changeData" + e[1] + "!", C)
        })
    }, removeData:function (a) {
        return this.each(function () {
            d.removeData(this, a)
        })
    }});
    d.extend({_mark:function (a, b) {
        if (a) {
            b = (b || "fx") + "mark";
            d._data(a, b, (d._data(a, b) || 0) + 1)
        }
    }, _unmark:function (a, b, e) {
        if (a !== true) {
            e = b;
            b = a;
            a = false
        }
        if (b) {
            e = e || "fx";
            var f = e + "mark";
            if (a = a ? 0 : (d._data(b, f) || 1) - 1)d._data(b, f, a); else {
                d.removeData(b, f, true);
                y(b, e, "mark")
            }
        }
    }, queue:function (a, b, e) {
        var f;
        if (a) {
            b = (b || "fx") + "queue";
            f = d._data(a, b);
            if (e)if (!f || d.isArray(e))f =
                d._data(a, b, d.makeArray(e)); else f.push(e);
            return f || []
        }
    }, dequeue:function (a, b) {
        b = b || "fx";
        var e = d.queue(a, b), f = e.shift(), g = {};
        if (f === "inprogress")f = e.shift();
        if (f) {
            b === "fx" && e.unshift("inprogress");
            d._data(a, b + ".run", g);
            f.call(a, function () {
                d.dequeue(a, b)
            }, g)
        }
        if (!e.length) {
            d.removeData(a, b + "queue " + b + ".run", true);
            y(a, b, "queue")
        }
    }});
    d.fn.extend({queue:function (a, b) {
        if (typeof a !== "string") {
            b = a;
            a = "fx"
        }
        if (b === c)return d.queue(this[0], a);
        return this.each(function () {
            var e = d.queue(this, a, b);
            a === "fx" && e[0] !==
                "inprogress" && d.dequeue(this, a)
        })
    }, dequeue:function (a) {
        return this.each(function () {
            d.dequeue(this, a)
        })
    }, delay:function (a, b) {
        a = d.fx ? d.fx.speeds[a] || a : a;
        b = b || "fx";
        return this.queue(b, function (e, f) {
            var g = setTimeout(e, a);
            f.stop = function () {
                clearTimeout(g)
            }
        })
    }, clearQueue:function (a) {
        return this.queue(a || "fx", [])
    }, promise:function (a, b) {
        function e() {
            --h || f.resolveWith(g, [g])
        }

        if (typeof a !== "string") {
            b = a;
            a = c
        }
        a = a || "fx";
        var f = d.Deferred(), g = this;
        b = g.length;
        var h = 1, n = a + "defer", q = a + "queue";
        a = a + "mark";
        for (var t; b--;)if (t =
            d.data(g[b], n, c, true) || (d.data(g[b], q, c, true) || d.data(g[b], a, c, true)) && d.data(g[b], n, d.Callbacks("once memory"), true)) {
            h++;
            t.add(e)
        }
        e();
        return f.promise()
    }});
    var Za = /[\n\t\r]/g, Ja = /\s+/, Cb = /\r/g, Db = /^(?:button|input)$/i, Eb = /^(?:button|input|object|select|textarea)$/i, Fb = /^a(?:rea)?$/i, $a = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, ab = d.support.getSetAttribute, Ca, bb, cb;
    d.fn.extend({attr:function (a, b) {
        return d.access(this,
            a, b, true, d.attr)
    }, removeAttr:function (a) {
        return this.each(function () {
            d.removeAttr(this, a)
        })
    }, prop:function (a, b) {
        return d.access(this, a, b, true, d.prop)
    }, removeProp:function (a) {
        a = d.propFix[a] || a;
        return this.each(function () {
            try {
                this[a] = c;
                delete this[a]
            } catch (b) {
            }
        })
    }, addClass:function (a) {
        var b, e, f, g, h, n, q;
        if (d.isFunction(a))return this.each(function (t) {
            d(this).addClass(a.call(this, t, this.className))
        });
        if (a && typeof a === "string") {
            b = a.split(Ja);
            e = 0;
            for (f = this.length; e < f; e++) {
                g = this[e];
                if (g.nodeType === 1)if (!g.className &&
                    b.length === 1)g.className = a; else {
                    h = " " + g.className + " ";
                    n = 0;
                    for (q = b.length; n < q; n++)~h.indexOf(" " + b[n] + " ") || (h += b[n] + " ");
                    g.className = d.trim(h)
                }
            }
        }
        return this
    }, removeClass:function (a) {
        var b, e, f, g, h, n, q;
        if (d.isFunction(a))return this.each(function (t) {
            d(this).removeClass(a.call(this, t, this.className))
        });
        if (a && typeof a === "string" || a === c) {
            b = (a || "").split(Ja);
            e = 0;
            for (f = this.length; e < f; e++) {
                g = this[e];
                if (g.nodeType === 1 && g.className)if (a) {
                    h = (" " + g.className + " ").replace(Za, " ");
                    n = 0;
                    for (q = b.length; n < q; n++)h =
                        h.replace(" " + b[n] + " ", " ");
                    g.className = d.trim(h)
                } else g.className = ""
            }
        }
        return this
    }, toggleClass:function (a, b) {
        var e = typeof a, f = typeof b === "boolean";
        if (d.isFunction(a))return this.each(function (g) {
            d(this).toggleClass(a.call(this, g, this.className, b), b)
        });
        return this.each(function () {
            if (e === "string")for (var g, h = 0, n = d(this), q = b, t = a.split(Ja); g = t[h++];) {
                q = f ? q : !n.hasClass(g);
                n[q ? "addClass" : "removeClass"](g)
            } else if (e === "undefined" || e === "boolean") {
                this.className && d._data(this, "__className__", this.className);
                this.className = this.className || a === false ? "" : d._data(this, "__className__") || ""
            }
        })
    }, hasClass:function (a) {
        a = " " + a + " ";
        for (var b = 0, e = this.length; b < e; b++)if (this[b].nodeType === 1 && (" " + this[b].className + " ").replace(Za, " ").indexOf(a) > -1)return true;
        return false
    }, val:function (a) {
        var b, e, f, g = this[0];
        if (arguments.length) {
            f = d.isFunction(a);
            return this.each(function (h) {
                var n = d(this);
                if (this.nodeType === 1) {
                    h = f ? a.call(this, h, n.val()) : a;
                    if (h == null)h = ""; else if (typeof h === "number")h += ""; else if (d.isArray(h))h = d.map(h,
                        function (q) {
                            return q == null ? "" : q + ""
                        });
                    b = d.valHooks[this.nodeName.toLowerCase()] || d.valHooks[this.type];
                    if (!b || !("set"in b) || b.set(this, h, "value") === c)this.value = h
                }
            })
        } else if (g) {
            if ((b = d.valHooks[g.nodeName.toLowerCase()] || d.valHooks[g.type]) && "get"in b && (e = b.get(g, "value")) !== c)return e;
            e = g.value;
            return typeof e === "string" ? e.replace(Cb, "") : e == null ? "" : e
        }
    }});
    d.extend({valHooks:{option:{get:function (a) {
        var b = a.attributes.value;
        return!b || b.specified ? a.value : a.text
    }}, select:{get:function (a) {
        var b, e, f = a.selectedIndex,
            g = [], h = a.options, n = a.type === "select-one";
        if (f < 0)return null;
        a = n ? f : 0;
        for (e = n ? f + 1 : h.length; a < e; a++) {
            b = h[a];
            if (b.selected && (d.support.optDisabled ? !b.disabled : b.getAttribute("disabled") === null) && (!b.parentNode.disabled || !d.nodeName(b.parentNode, "optgroup"))) {
                b = d(b).val();
                if (n)return b;
                g.push(b)
            }
        }
        if (n && !g.length && h.length)return d(h[f]).val();
        return g
    }, set:function (a, b) {
        var e = d.makeArray(b);
        d(a).find("option").each(function () {
            this.selected = d.inArray(d(this).val(), e) >= 0
        });
        if (!e.length)a.selectedIndex = -1;
        return e
    }}}, attrFn:{val:true, css:true, html:true, text:true, data:true, width:true, height:true, offset:true}, attr:function (a, b, e, f) {
        var g, h, n = a.nodeType;
        if (!(!a || n === 3 || n === 8 || n === 2)) {
            if (f && b in d.attrFn)return d(a)[b](e);
            if (typeof a.getAttribute === "undefined")return d.prop(a, b, e);
            if (f = n !== 1 || !d.isXMLDoc(a)) {
                b = b.toLowerCase();
                h = d.attrHooks[b] || ($a.test(b) ? bb : Ca)
            }
            if (e !== c)if (e === null)d.removeAttr(a, b); else if (h && "set"in h && f && (g = h.set(a, e, b)) !== c)return g; else {
                a.setAttribute(b, "" + e);
                return e
            } else if (h &&
                "get"in h && f && (g = h.get(a, b)) !== null)return g; else {
                g = a.getAttribute(b);
                return g === null ? c : g
            }
        }
    }, removeAttr:function (a, b) {
        var e, f, g, h = 0;
        if (b && a.nodeType === 1) {
            e = b.toLowerCase().split(Ja);
            for (g = e.length; h < g; h++)if (f = e[h]) {
                b = d.propFix[f] || f;
                d.attr(a, f, "");
                a.removeAttribute(ab ? f : b);
                if ($a.test(f) && b in a)a[b] = false
            }
        }
    }, attrHooks:{type:{set:function (a, b) {
        if (Db.test(a.nodeName) && a.parentNode)d.error("type property can't be changed"); else if (!d.support.radioValue && b === "radio" && d.nodeName(a, "input")) {
            var e = a.value;
            a.setAttribute("type", b);
            if (e)a.value = e;
            return b
        }
    }}, value:{get:function (a, b) {
        if (Ca && d.nodeName(a, "button"))return Ca.get(a, b);
        return b in a ? a.value : null
    }, set:function (a, b, e) {
        if (Ca && d.nodeName(a, "button"))return Ca.set(a, b, e);
        a.value = b
    }}}, propFix:{tabindex:"tabIndex", readonly:"readOnly", "for":"htmlFor", "class":"className", maxlength:"maxLength", cellspacing:"cellSpacing", cellpadding:"cellPadding", rowspan:"rowSpan", colspan:"colSpan", usemap:"useMap", frameborder:"frameBorder", contenteditable:"contentEditable"},
        prop:function (a, b, e) {
            var f, g, h = a.nodeType;
            if (!(!a || h === 3 || h === 8 || h === 2)) {
                if (h !== 1 || !d.isXMLDoc(a)) {
                    b = d.propFix[b] || b;
                    g = d.propHooks[b]
                }
                return e !== c ? g && "set"in g && (f = g.set(a, e, b)) !== c ? f : (a[b] = e) : g && "get"in g && (f = g.get(a, b)) !== null ? f : a[b]
            }
        }, propHooks:{tabIndex:{get:function (a) {
            var b = a.getAttributeNode("tabindex");
            return b && b.specified ? parseInt(b.value, 10) : Eb.test(a.nodeName) || Fb.test(a.nodeName) && a.href ? 0 : c
        }}}});
    d.attrHooks.tabindex = d.propHooks.tabIndex;
    bb = {get:function (a, b) {
        var e, f = d.prop(a, b);
        return f ===
            true || typeof f !== "boolean" && (e = a.getAttributeNode(b)) && e.nodeValue !== false ? b.toLowerCase() : c
    }, set:function (a, b, e) {
        if (b === false)d.removeAttr(a, e); else {
            b = d.propFix[e] || e;
            if (b in a)a[b] = true;
            a.setAttribute(e, e.toLowerCase())
        }
        return e
    }};
    if (!ab) {
        cb = {name:true, id:true};
        Ca = d.valHooks.button = {get:function (a, b) {
            return(a = a.getAttributeNode(b)) && (cb[b] ? a.nodeValue !== "" : a.specified) ? a.nodeValue : c
        }, set:function (a, b, e) {
            var f = a.getAttributeNode(e);
            if (!f) {
                f = N.createAttribute(e);
                a.setAttributeNode(f)
            }
            return f.nodeValue =
                b + ""
        }};
        d.attrHooks.tabindex.set = Ca.set;
        d.each(["width", "height"], function (a, b) {
            d.attrHooks[b] = d.extend(d.attrHooks[b], {set:function (e, f) {
                if (f === "") {
                    e.setAttribute(b, "auto");
                    return f
                }
            }})
        });
        d.attrHooks.contenteditable = {get:Ca.get, set:function (a, b, e) {
            if (b === "")b = "false";
            Ca.set(a, b, e)
        }}
    }
    d.support.hrefNormalized || d.each(["href", "src", "width", "height"], function (a, b) {
        d.attrHooks[b] = d.extend(d.attrHooks[b], {get:function (e) {
            e = e.getAttribute(b, 2);
            return e === null ? c : e
        }})
    });
    if (!d.support.style)d.attrHooks.style =
    {get:function (a) {
        return a.style.cssText.toLowerCase() || c
    }, set:function (a, b) {
        return a.style.cssText = "" + b
    }};
    if (!d.support.optSelected)d.propHooks.selected = d.extend(d.propHooks.selected, {get:function () {
        return null
    }});
    if (!d.support.enctype)d.propFix.enctype = "encoding";
    d.support.checkOn || d.each(["radio", "checkbox"], function () {
        d.valHooks[this] = {get:function (a) {
            return a.getAttribute("value") === null ? "on" : a.value
        }}
    });
    d.each(["radio", "checkbox"], function () {
        d.valHooks[this] = d.extend(d.valHooks[this], {set:function (a, b) {
            if (d.isArray(b))return a.checked = d.inArray(d(a).val(), b) >= 0
        }})
    });
    var Qa = /^(?:textarea|input|select)$/i, db = /^([^\.]*)?(?:\.(.+))?$/, Gb = /\bhover(\.\S+)?\b/, Hb = /^key/, Ib = /^(?:mouse|contextmenu)|click/, eb = /^(?:focusinfocus|focusoutblur)$/, Jb = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/, Kb = function (a) {
        if (a = Jb.exec(a)) {
            a[1] = (a[1] || "").toLowerCase();
            a[3] = a[3] && new RegExp("(?:^|\\s)" + a[3] + "(?:\\s|$)")
        }
        return a
    }, Lb = function (a, b) {
        var e = a.attributes || {};
        return(!b[1] || a.nodeName.toLowerCase() === b[1]) && (!b[2] ||
            (e.id || {}).value === b[2]) && (!b[3] || b[3].test((e["class"] || {}).value))
    }, fb = function (a) {
        return d.event.special.hover ? a : a.replace(Gb, "mouseenter$1 mouseleave$1")
    };
    d.event = {add:function (a, b, e, f, g) {
        var h, n, q, t, C, V, L, Z, U;
        if (!(a.nodeType === 3 || a.nodeType === 8 || !b || !e || !(h = d._data(a)))) {
            if (e.handler) {
                L = e;
                e = L.handler
            }
            if (!e.guid)e.guid = d.guid++;
            q = h.events;
            if (!q)h.events = q = {};
            n = h.handle;
            if (!n) {
                h.handle = n = function (la) {
                    return typeof d !== "undefined" && (!la || d.event.triggered !== la.type) ? d.event.dispatch.apply(n.elem,
                        arguments) : c
                };
                n.elem = a
            }
            b = d.trim(fb(b)).split(" ");
            for (h = 0; h < b.length; h++) {
                t = db.exec(b[h]) || [];
                C = t[1];
                V = (t[2] || "").split(".").sort();
                U = d.event.special[C] || {};
                C = (g ? U.delegateType : U.bindType) || C;
                U = d.event.special[C] || {};
                t = d.extend({type:C, origType:t[1], data:f, handler:e, guid:e.guid, selector:g, quick:Kb(g), namespace:V.join(".")}, L);
                Z = q[C];
                if (!Z) {
                    Z = q[C] = [];
                    Z.delegateCount = 0;
                    if (!U.setup || U.setup.call(a, f, V, n) === false)if (a.addEventListener)a.addEventListener(C, n, false); else a.attachEvent && a.attachEvent("on" +
                        C, n)
                }
                if (U.add) {
                    U.add.call(a, t);
                    if (!t.handler.guid)t.handler.guid = e.guid
                }
                g ? Z.splice(Z.delegateCount++, 0, t) : Z.push(t);
                d.event.global[C] = true
            }
            a = null
        }
    }, global:{}, remove:function (a, b, e, f, g) {
        var h = d.hasData(a) && d._data(a), n, q, t, C, V, L, Z, U, la, ra;
        if (h && (Z = h.events)) {
            b = d.trim(fb(b || "")).split(" ");
            for (n = 0; n < b.length; n++) {
                q = db.exec(b[n]) || [];
                t = C = q[1];
                q = q[2];
                if (t) {
                    U = d.event.special[t] || {};
                    t = (f ? U.delegateType : U.bindType) || t;
                    la = Z[t] || [];
                    V = la.length;
                    q = q ? new RegExp("(^|\\.)" + q.split(".").sort().join("\\.(?:.*\\.)?") +
                        "(\\.|$)") : null;
                    for (L = 0; L < la.length; L++) {
                        ra = la[L];
                        if ((g || C === ra.origType) && (!e || e.guid === ra.guid) && (!q || q.test(ra.namespace)) && (!f || f === ra.selector || f === "**" && ra.selector)) {
                            la.splice(L--, 1);
                            ra.selector && la.delegateCount--;
                            U.remove && U.remove.call(a, ra)
                        }
                    }
                    if (la.length === 0 && V !== la.length) {
                        if (!U.teardown || U.teardown.call(a, q) === false)d.removeEvent(a, t, h.handle);
                        delete Z[t]
                    }
                } else for (t in Z)d.event.remove(a, t + b[n], e, f, true)
            }
            if (d.isEmptyObject(Z)) {
                if (b = h.handle)b.elem = null;
                d.removeData(a, ["events", "handle"],
                    true)
            }
        }
    }, customEvent:{getData:true, setData:true, changeData:true}, trigger:function (a, b, e, f) {
        if (!(e && (e.nodeType === 3 || e.nodeType === 8))) {
            var g = a.type || a, h = [], n, q, t, C, V;
            if (!eb.test(g + d.event.triggered)) {
                if (g.indexOf("!") >= 0) {
                    g = g.slice(0, -1);
                    n = true
                }
                if (g.indexOf(".") >= 0) {
                    h = g.split(".");
                    g = h.shift();
                    h.sort()
                }
                if (!((!e || d.event.customEvent[g]) && !d.event.global[g])) {
                    a = typeof a === "object" ? a[d.expando] ? a : new d.Event(g, a) : new d.Event(g);
                    a.type = g;
                    a.isTrigger = true;
                    a.exclusive = n;
                    a.namespace = h.join(".");
                    a.namespace_re =
                        a.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
                    n = g.indexOf(":") < 0 ? "on" + g : "";
                    if (e) {
                        a.result = c;
                        if (!a.target)a.target = e;
                        b = b != null ? d.makeArray(b) : [];
                        b.unshift(a);
                        t = d.event.special[g] || {};
                        if (!(t.trigger && t.trigger.apply(e, b) === false)) {
                            V = [
                                [e, t.bindType || g]
                            ];
                            if (!f && !t.noBubble && !d.isWindow(e)) {
                                C = t.delegateType || g;
                                h = eb.test(C + g) ? e : e.parentNode;
                                for (q = null; h; h = h.parentNode) {
                                    V.push([h, C]);
                                    q = h
                                }
                                if (q && q === e.ownerDocument)V.push([q.defaultView || q.parentWindow || k, C])
                            }
                            for (q = 0; q < V.length &&
                                !a.isPropagationStopped(); q++) {
                                h = V[q][0];
                                a.type = V[q][1];
                                (C = (d._data(h, "events") || {})[a.type] && d._data(h, "handle")) && C.apply(h, b);
                                (C = n && h[n]) && d.acceptData(h) && C.apply(h, b) === false && a.preventDefault()
                            }
                            a.type = g;
                            if (!f && !a.isDefaultPrevented())if ((!t._default || t._default.apply(e.ownerDocument, b) === false) && !(g === "click" && d.nodeName(e, "a")) && d.acceptData(e))if (n && e[g] && (g !== "focus" && g !== "blur" || a.target.offsetWidth !== 0) && !d.isWindow(e)) {
                                if (q = e[n])e[n] = null;
                                d.event.triggered = g;
                                e[g]();
                                d.event.triggered = c;
                                if (q)e[n] = q
                            }
                            return a.result
                        }
                    } else {
                        e = d.cache;
                        for (q in e)e[q].events && e[q].events[g] && d.event.trigger(a, b, e[q].handle.elem, true)
                    }
                }
            }
        }
    }, dispatch:function (a) {
        a = d.event.fix(a || k.event);
        var b = (d._data(this, "events") || {})[a.type] || [], e = b.delegateCount, f = [].slice.call(arguments, 0), g = !a.exclusive && !a.namespace, h = [], n, q, t, C, V, L, Z;
        f[0] = a;
        a.delegateTarget = this;
        if (e && !a.target.disabled && !(a.button && a.type === "click")) {
            t = d(this);
            t.context = this.ownerDocument || this;
            for (q = a.target; q != this; q = q.parentNode || this) {
                V = {};
                L = [];
                t[0] = q;
                for (n = 0; n < e; n++) {
                    C = b[n];
                    Z = C.selector;
                    if (V[Z] === c)V[Z] = C.quick ? Lb(q, C.quick) : t.is(Z);
                    V[Z] && L.push(C)
                }
                L.length && h.push({elem:q, matches:L})
            }
        }
        b.length > e && h.push({elem:this, matches:b.slice(e)});
        for (n = 0; n < h.length && !a.isPropagationStopped(); n++) {
            e = h[n];
            a.currentTarget = e.elem;
            for (b = 0; b < e.matches.length && !a.isImmediatePropagationStopped(); b++) {
                C = e.matches[b];
                if (g || !a.namespace && !C.namespace || a.namespace_re && a.namespace_re.test(C.namespace)) {
                    a.data = C.data;
                    a.handleObj = C;
                    C = ((d.event.special[C.origType] ||
                    {}).handle || C.handler).apply(e.elem, f);
                    if (C !== c) {
                        a.result = C;
                        if (C === false) {
                            a.preventDefault();
                            a.stopPropagation()
                        }
                    }
                }
            }
        }
        return a.result
    }, props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks:{}, keyHooks:{props:"char charCode key keyCode".split(" "), filter:function (a, b) {
        if (a.which == null)a.which = b.charCode != null ? b.charCode : b.keyCode;
        return a
    }}, mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
        filter:function (a, b) {
            var e, f, g = b.button, h = b.fromElement;
            if (a.pageX == null && b.clientX != null) {
                e = a.target.ownerDocument || N;
                f = e.documentElement;
                e = e.body;
                a.pageX = b.clientX + (f && f.scrollLeft || e && e.scrollLeft || 0) - (f && f.clientLeft || e && e.clientLeft || 0);
                a.pageY = b.clientY + (f && f.scrollTop || e && e.scrollTop || 0) - (f && f.clientTop || e && e.clientTop || 0)
            }
            if (!a.relatedTarget && h)a.relatedTarget = h === a.target ? b.toElement : h;
            if (!a.which && g !== c)a.which = g & 1 ? 1 : g & 2 ? 3 : g & 4 ? 2 : 0;
            return a
        }}, fix:function (a) {
        if (a[d.expando])return a;
        var b,
            e, f = a, g = d.event.fixHooks[a.type] || {}, h = g.props ? this.props.concat(g.props) : this.props;
        a = d.Event(f);
        for (b = h.length; b;) {
            e = h[--b];
            a[e] = f[e]
        }
        if (!a.target)a.target = f.srcElement || N;
        if (a.target.nodeType === 3)a.target = a.target.parentNode;
        if (a.metaKey === c)a.metaKey = a.ctrlKey;
        return g.filter ? g.filter(a, f) : a
    }, special:{ready:{setup:d.bindReady}, load:{noBubble:true}, focus:{delegateType:"focusin"}, blur:{delegateType:"focusout"}, beforeunload:{setup:function (a, b, e) {
        if (d.isWindow(this))this.onbeforeunload = e
    }, teardown:function (a, b) {
        if (this.onbeforeunload === b)this.onbeforeunload = null
    }}}, simulate:function (a, b, e, f) {
        a = d.extend(new d.Event, e, {type:a, isSimulated:true, originalEvent:{}});
        f ? d.event.trigger(a, null, b) : d.event.dispatch.call(b, a);
        a.isDefaultPrevented() && e.preventDefault()
    }};
    d.event.handle = d.event.dispatch;
    d.removeEvent = N.removeEventListener ? function (a, b, e) {
        a.removeEventListener && a.removeEventListener(b, e, false)
    } : function (a, b, e) {
        a.detachEvent && a.detachEvent("on" + b, e)
    };
    d.Event = function (a, b) {
        if (!(this instanceof d.Event))return new d.Event(a,
            b);
        if (a && a.type) {
            this.originalEvent = a;
            this.type = a.type;
            this.isDefaultPrevented = a.defaultPrevented || a.returnValue === false || a.getPreventDefault && a.getPreventDefault() ? O : I
        } else this.type = a;
        b && d.extend(this, b);
        this.timeStamp = a && a.timeStamp || d.now();
        this[d.expando] = true
    };
    d.Event.prototype = {preventDefault:function () {
        this.isDefaultPrevented = O;
        var a = this.originalEvent;
        if (a)if (a.preventDefault)a.preventDefault(); else a.returnValue = false
    }, stopPropagation:function () {
        this.isPropagationStopped = O;
        var a = this.originalEvent;
        if (a) {
            a.stopPropagation && a.stopPropagation();
            a.cancelBubble = true
        }
    }, stopImmediatePropagation:function () {
        this.isImmediatePropagationStopped = O;
        this.stopPropagation()
    }, isDefaultPrevented:I, isPropagationStopped:I, isImmediatePropagationStopped:I};
    d.each({mouseenter:"mouseover", mouseleave:"mouseout"}, function (a, b) {
        d.event.special[a] = {delegateType:b, bindType:b, handle:function (e) {
            var f = this, g = e.relatedTarget, h = e.handleObj, n;
            if (!g || g !== f && !d.contains(f, g)) {
                e.type = h.origType;
                n = h.handler.apply(this, arguments);
                e.type = b
            }
            return n
        }}
    });
    if (!d.support.submitBubbles)d.event.special.submit = {setup:function () {
        if (d.nodeName(this, "form"))return false;
        d.event.add(this, "click._submit keypress._submit", function (a) {
            a = a.target;
            if ((a = d.nodeName(a, "input") || d.nodeName(a, "button") ? a.form : c) && !a._submit_attached) {
                d.event.add(a, "submit._submit", function (b) {
                    this.parentNode && !b.isTrigger && d.event.simulate("submit", this.parentNode, b, true)
                });
                a._submit_attached = true
            }
        })
    }, teardown:function () {
        if (d.nodeName(this, "form"))return false;
        d.event.remove(this, "._submit")
    }};
    if (!d.support.changeBubbles)d.event.special.change = {setup:function () {
        if (Qa.test(this.nodeName)) {
            if (this.type === "checkbox" || this.type === "radio") {
                d.event.add(this, "propertychange._change", function (a) {
                    if (a.originalEvent.propertyName === "checked")this._just_changed = true
                });
                d.event.add(this, "click._change", function (a) {
                    if (this._just_changed && !a.isTrigger) {
                        this._just_changed = false;
                        d.event.simulate("change", this, a, true)
                    }
                })
            }
            return false
        }
        d.event.add(this, "beforeactivate._change",
            function (a) {
                a = a.target;
                if (Qa.test(a.nodeName) && !a._change_attached) {
                    d.event.add(a, "change._change", function (b) {
                        this.parentNode && !b.isSimulated && !b.isTrigger && d.event.simulate("change", this.parentNode, b, true)
                    });
                    a._change_attached = true
                }
            })
    }, handle:function (a) {
        var b = a.target;
        if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox")return a.handleObj.handler.apply(this, arguments)
    }, teardown:function () {
        d.event.remove(this, "._change");
        return Qa.test(this.nodeName)
    }};
    d.support.focusinBubbles ||
    d.each({focus:"focusin", blur:"focusout"}, function (a, b) {
        var e = 0, f = function (g) {
            d.event.simulate(b, g.target, d.event.fix(g), true)
        };
        d.event.special[b] = {setup:function () {
            e++ === 0 && N.addEventListener(a, f, true)
        }, teardown:function () {
            --e === 0 && N.removeEventListener(a, f, true)
        }}
    });
    d.fn.extend({on:function (a, b, e, f, g) {
        var h, n;
        if (typeof a === "object") {
            if (typeof b !== "string") {
                e = b;
                b = c
            }
            for (n in a)this.on(n, b, e, a[n], g);
            return this
        }
        if (e == null && f == null) {
            f = b;
            e = b = c
        } else if (f == null)if (typeof b === "string") {
            f = e;
            e = c
        } else {
            f = e;
            e = b;
            b = c
        }
        if (f === false)f = I; else if (!f)return this;
        if (g === 1) {
            h = f;
            f = function (q) {
                d().off(q);
                return h.apply(this, arguments)
            };
            f.guid = h.guid || (h.guid = d.guid++)
        }
        return this.each(function () {
            d.event.add(this, a, f, e, b)
        })
    }, one:function (a, b, e, f) {
        return this.on.call(this, a, b, e, f, 1)
    }, off:function (a, b, e) {
        if (a && a.preventDefault && a.handleObj) {
            var f = a.handleObj;
            d(a.delegateTarget).off(f.namespace ? f.type + "." + f.namespace : f.type, f.selector, f.handler);
            return this
        }
        if (typeof a === "object") {
            for (f in a)this.off(f, b, a[f]);
            return this
        }
        if (b ===
            false || typeof b === "function") {
            e = b;
            b = c
        }
        if (e === false)e = I;
        return this.each(function () {
            d.event.remove(this, a, e, b)
        })
    }, bind:function (a, b, e) {
        return this.on(a, null, b, e)
    }, unbind:function (a, b) {
        return this.off(a, null, b)
    }, live:function (a, b, e) {
        d(this.context).on(a, this.selector, b, e);
        return this
    }, die:function (a, b) {
        d(this.context).off(a, this.selector || "**", b);
        return this
    }, delegate:function (a, b, e, f) {
        return this.on(b, a, e, f)
    }, undelegate:function (a, b, e) {
        return arguments.length == 1 ? this.off(a, "**") : this.off(b, a, e)
    }, trigger:function (a, b) {
        return this.each(function () {
            d.event.trigger(a, b, this)
        })
    }, triggerHandler:function (a, b) {
        if (this[0])return d.event.trigger(a, b, this[0], true)
    }, toggle:function (a) {
        var b = arguments, e = a.guid || d.guid++, f = 0, g = function (h) {
            var n = (d._data(this, "lastToggle" + a.guid) || 0) % f;
            d._data(this, "lastToggle" + a.guid, n + 1);
            h.preventDefault();
            return b[n].apply(this, arguments) || false
        };
        for (g.guid = e; f < b.length;)b[f++].guid = e;
        return this.click(g)
    }, hover:function (a, b) {
        return this.mouseenter(a).mouseleave(b || a)
    }});
    d.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),
        function (a, b) {
            d.fn[b] = function (e, f) {
                if (f == null) {
                    f = e;
                    e = null
                }
                return arguments.length > 0 ? this.on(b, null, e, f) : this.trigger(b)
            };
            if (d.attrFn)d.attrFn[b] = true;
            if (Hb.test(b))d.event.fixHooks[b] = d.event.keyHooks;
            if (Ib.test(b))d.event.fixHooks[b] = d.event.mouseHooks
        });
    (function () {
        function a(j, m, D, J, Q, S) {
            Q = 0;
            for (var aa = J.length; Q < aa; Q++) {
                var ea = J[Q];
                if (ea) {
                    var pa = false;
                    for (ea = ea[j]; ea;) {
                        if (ea[f] === D) {
                            pa = J[ea.sizset];
                            break
                        }
                        if (ea.nodeType === 1 && !S) {
                            ea[f] = D;
                            ea.sizset = Q
                        }
                        if (ea.nodeName.toLowerCase() === m) {
                            pa = ea;
                            break
                        }
                        ea =
                            ea[j]
                    }
                    J[Q] = pa
                }
            }
        }

        function b(j, m, D, J, Q, S) {
            Q = 0;
            for (var aa = J.length; Q < aa; Q++) {
                var ea = J[Q];
                if (ea) {
                    var pa = false;
                    for (ea = ea[j]; ea;) {
                        if (ea[f] === D) {
                            pa = J[ea.sizset];
                            break
                        }
                        if (ea.nodeType === 1) {
                            if (!S) {
                                ea[f] = D;
                                ea.sizset = Q
                            }
                            if (typeof m !== "string") {
                                if (ea === m) {
                                    pa = true;
                                    break
                                }
                            } else if (L.filter(m, [ea]).length > 0) {
                                pa = ea;
                                break
                            }
                        }
                        ea = ea[j]
                    }
                    J[Q] = pa
                }
            }
        }

        var e = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, f = "sizcache" + (Math.random() + "").replace(".",
            ""), g = 0, h = Object.prototype.toString, n = false, q = true, t = /\\/g, C = /\r\n/g, V = /\W/;
        [0, 0].sort(function () {
            q = false;
            return 0
        });
        var L = function (j, m, D, J) {
            D = D || [];
            var Q = m = m || N;
            if (m.nodeType !== 1 && m.nodeType !== 9)return[];
            if (!j || typeof j !== "string")return D;
            var S, aa, ea, pa, u, R = true, ba = L.isXML(m), W = [], qa = j;
            do {
                e.exec("");
                if (S = e.exec(qa)) {
                    qa = S[3];
                    W.push(S[1]);
                    if (S[2]) {
                        pa = S[3];
                        break
                    }
                }
            } while (S);
            if (W.length > 1 && la.exec(j))if (W.length === 2 && U.relative[W[0]])aa = ya(W[0] + W[1], m, J); else for (aa = U.relative[W[0]] ? [m] : L(W.shift(),
                m); W.length;) {
                j = W.shift();
                if (U.relative[j])j += W.shift();
                aa = ya(j, aa, J)
            } else {
                if (!J && W.length > 1 && m.nodeType === 9 && !ba && U.match.ID.test(W[0]) && !U.match.ID.test(W[W.length - 1])) {
                    S = L.find(W.shift(), m, ba);
                    m = S.expr ? L.filter(S.expr, S.set)[0] : S.set[0]
                }
                if (m) {
                    S = J ? {expr:W.pop(), set:sa(J)} : L.find(W.pop(), W.length === 1 && (W[0] === "~" || W[0] === "+") && m.parentNode ? m.parentNode : m, ba);
                    aa = S.expr ? L.filter(S.expr, S.set) : S.set;
                    if (W.length > 0)ea = sa(aa); else R = false;
                    for (; W.length;) {
                        S = u = W.pop();
                        if (U.relative[u])S = W.pop(); else u = "";
                        if (S == null)S = m;
                        U.relative[u](ea, S, ba)
                    }
                } else ea = []
            }
            ea || (ea = aa);
            ea || L.error(u || j);
            if (h.call(ea) === "[object Array]")if (R)if (m && m.nodeType === 1)for (j = 0; ea[j] != null; j++) {
                if (ea[j] && (ea[j] === true || ea[j].nodeType === 1 && L.contains(m, ea[j])))D.push(aa[j])
            } else for (j = 0; ea[j] != null; j++)ea[j] && ea[j].nodeType === 1 && D.push(aa[j]); else D.push.apply(D, ea); else sa(ea, D);
            if (pa) {
                L(pa, Q, D, J);
                L.uniqueSort(D)
            }
            return D
        };
        L.uniqueSort = function (j) {
            if (na) {
                n = q;
                j.sort(na);
                if (n)for (var m = 1; m < j.length; m++)j[m] === j[m - 1] && j.splice(m--,
                    1)
            }
            return j
        };
        L.matches = function (j, m) {
            return L(j, null, null, m)
        };
        L.matchesSelector = function (j, m) {
            return L(m, null, null, [j]).length > 0
        };
        L.find = function (j, m, D) {
            var J, Q, S, aa, ea, pa;
            if (!j)return[];
            Q = 0;
            for (S = U.order.length; Q < S; Q++) {
                ea = U.order[Q];
                if (aa = U.leftMatch[ea].exec(j)) {
                    pa = aa[1];
                    aa.splice(1, 1);
                    if (pa.substr(pa.length - 1) !== "\\") {
                        aa[1] = (aa[1] || "").replace(t, "");
                        J = U.find[ea](aa, m, D);
                        if (J != null) {
                            j = j.replace(U.match[ea], "");
                            break
                        }
                    }
                }
            }
            J || (J = typeof m.getElementsByTagName !== "undefined" ? m.getElementsByTagName("*") :
                []);
            return{set:J, expr:j}
        };
        L.filter = function (j, m, D, J) {
            for (var Q, S, aa, ea, pa, u, R, ba, W = j, qa = [], oa = m, va = m && m[0] && L.isXML(m[0]); j && m.length;) {
                for (aa in U.filter)if ((Q = U.leftMatch[aa].exec(j)) != null && Q[2]) {
                    u = U.filter[aa];
                    pa = Q[1];
                    S = false;
                    Q.splice(1, 1);
                    if (pa.substr(pa.length - 1) !== "\\") {
                        if (oa === qa)qa = [];
                        if (U.preFilter[aa])if (Q = U.preFilter[aa](Q, oa, D, qa, J, va)) {
                            if (Q === true)continue
                        } else S = ea = true;
                        if (Q)for (R = 0; (pa = oa[R]) != null; R++)if (pa) {
                            ea = u(pa, Q, R, oa);
                            ba = J ^ ea;
                            if (D && ea != null)if (ba)S = true; else oa[R] = false; else if (ba) {
                                qa.push(pa);
                                S = true
                            }
                        }
                        if (ea !== c) {
                            D || (oa = qa);
                            j = j.replace(U.match[aa], "");
                            if (!S)return[];
                            break
                        }
                    }
                }
                if (j === W)if (S == null)L.error(j); else break;
                W = j
            }
            return oa
        };
        L.error = function (j) {
            throw new Error("Syntax error, unrecognized expression: " + j);
        };
        var Z = L.getText = function (j) {
            var m, D;
            m = j.nodeType;
            var J = "";
            if (m)if (m === 1 || m === 9)if (typeof j.textContent === "string")return j.textContent; else if (typeof j.innerText === "string")return j.innerText.replace(C, ""); else for (j = j.firstChild; j; j = j.nextSibling)J += Z(j); else {
                if (m === 3 || m === 4)return j.nodeValue
            } else for (m =
                            0; D = j[m]; m++)if (D.nodeType !== 8)J += Z(D);
            return J
        }, U = L.selectors = {order:["ID", "NAME", "TAG"], match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/, CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/, NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/, ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/, TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/, CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/, POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
            PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/}, leftMatch:{}, attrMap:{"class":"className", "for":"htmlFor"}, attrHandle:{href:function (j) {
            return j.getAttribute("href")
        }, type:function (j) {
            return j.getAttribute("type")
        }}, relative:{"+":function (j, m) {
            var D = typeof m === "string", J = D && !V.test(m);
            D = D && !J;
            if (J)m = m.toLowerCase();
            J = 0;
            for (var Q = j.length, S; J < Q; J++)if (S = j[J]) {
                for (; (S = S.previousSibling) && S.nodeType !== 1;);
                j[J] = D || S && S.nodeName.toLowerCase() === m ? S || false : S === m
            }
            D &&
            L.filter(m, j, true)
        }, ">":function (j, m) {
            var D, J = typeof m === "string", Q = 0, S = j.length;
            if (J && !V.test(m))for (m = m.toLowerCase(); Q < S; Q++) {
                if (D = j[Q]) {
                    D = D.parentNode;
                    j[Q] = D.nodeName.toLowerCase() === m ? D : false
                }
            } else {
                for (; Q < S; Q++)if (D = j[Q])j[Q] = J ? D.parentNode : D.parentNode === m;
                J && L.filter(m, j, true)
            }
        }, "":function (j, m, D) {
            var J, Q = g++, S = b;
            if (typeof m === "string" && !V.test(m)) {
                J = m = m.toLowerCase();
                S = a
            }
            S("parentNode", m, Q, j, J, D)
        }, "~":function (j, m, D) {
            var J, Q = g++, S = b;
            if (typeof m === "string" && !V.test(m)) {
                J = m = m.toLowerCase();
                S = a
            }
            S("previousSibling", m, Q, j, J, D)
        }}, find:{ID:function (j, m, D) {
            if (typeof m.getElementById !== "undefined" && !D)return(j = m.getElementById(j[1])) && j.parentNode ? [j] : []
        }, NAME:function (j, m) {
            if (typeof m.getElementsByName !== "undefined") {
                var D = [];
                m = m.getElementsByName(j[1]);
                for (var J = 0, Q = m.length; J < Q; J++)m[J].getAttribute("name") === j[1] && D.push(m[J]);
                return D.length === 0 ? null : D
            }
        }, TAG:function (j, m) {
            if (typeof m.getElementsByTagName !== "undefined")return m.getElementsByTagName(j[1])
        }}, preFilter:{CLASS:function (j, m, D, J, Q, S) {
            j = " " + j[1].replace(t, "") + " ";
            if (S)return j;
            S = 0;
            for (var aa; (aa = m[S]) != null; S++)if (aa)if (Q ^ (aa.className && (" " + aa.className + " ").replace(/[\t\n\r]/g, " ").indexOf(j) >= 0))D || J.push(aa); else if (D)m[S] = false;
            return false
        }, ID:function (j) {
            return j[1].replace(t, "")
        }, TAG:function (j) {
            return j[1].replace(t, "").toLowerCase()
        }, CHILD:function (j) {
            if (j[1] === "nth") {
                j[2] || L.error(j[0]);
                j[2] = j[2].replace(/^\+|\s*/g, "");
                var m = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(j[2] === "even" && "2n" || j[2] === "odd" && "2n+1" || !/\D/.test(j[2]) &&
                    "0n+" + j[2] || j[2]);
                j[2] = m[1] + (m[2] || 1) - 0;
                j[3] = m[3] - 0
            } else j[2] && L.error(j[0]);
            j[0] = g++;
            return j
        }, ATTR:function (j, m, D, J, Q, S) {
            m = j[1] = j[1].replace(t, "");
            if (!S && U.attrMap[m])j[1] = U.attrMap[m];
            j[4] = (j[4] || j[5] || "").replace(t, "");
            if (j[2] === "~=")j[4] = " " + j[4] + " ";
            return j
        }, PSEUDO:function (j, m, D, J, Q) {
            if (j[1] === "not")if ((e.exec(j[3]) || "").length > 1 || /^\w/.test(j[3]))j[3] = L(j[3], null, null, m); else {
                j = L.filter(j[3], m, D, true ^ Q);
                D || J.push.apply(J, j);
                return false
            } else if (U.match.POS.test(j[0]) || U.match.CHILD.test(j[0]))return true;
            return j
        }, POS:function (j) {
            j.unshift(true);
            return j
        }}, filters:{enabled:function (j) {
            return j.disabled === false && j.type !== "hidden"
        }, disabled:function (j) {
            return j.disabled === true
        }, checked:function (j) {
            return j.checked === true
        }, selected:function (j) {
            return j.selected === true
        }, parent:function (j) {
            return!!j.firstChild
        }, empty:function (j) {
            return!j.firstChild
        }, has:function (j, m, D) {
            return!!L(D[3], j).length
        }, header:function (j) {
            return/h\d/i.test(j.nodeName)
        }, text:function (j) {
            var m = j.getAttribute("type"), D = j.type;
            return j.nodeName.toLowerCase() ===
                "input" && "text" === D && (m === D || m === null)
        }, radio:function (j) {
            return j.nodeName.toLowerCase() === "input" && "radio" === j.type
        }, checkbox:function (j) {
            return j.nodeName.toLowerCase() === "input" && "checkbox" === j.type
        }, file:function (j) {
            return j.nodeName.toLowerCase() === "input" && "file" === j.type
        }, password:function (j) {
            return j.nodeName.toLowerCase() === "input" && "password" === j.type
        }, submit:function (j) {
            var m = j.nodeName.toLowerCase();
            return(m === "input" || m === "button") && "submit" === j.type
        }, image:function (j) {
            return j.nodeName.toLowerCase() ===
                "input" && "image" === j.type
        }, reset:function (j) {
            var m = j.nodeName.toLowerCase();
            return(m === "input" || m === "button") && "reset" === j.type
        }, button:function (j) {
            var m = j.nodeName.toLowerCase();
            return m === "input" && "button" === j.type || m === "button"
        }, input:function (j) {
            return/input|select|textarea|button/i.test(j.nodeName)
        }, focus:function (j) {
            return j === j.ownerDocument.activeElement
        }}, setFilters:{first:function (j, m) {
            return m === 0
        }, last:function (j, m, D, J) {
            return m === J.length - 1
        }, even:function (j, m) {
            return m % 2 === 0
        }, odd:function (j, m) {
            return m % 2 === 1
        }, lt:function (j, m, D) {
            return m < D[3] - 0
        }, gt:function (j, m, D) {
            return m > D[3] - 0
        }, nth:function (j, m, D) {
            return D[3] - 0 === m
        }, eq:function (j, m, D) {
            return D[3] - 0 === m
        }}, filter:{PSEUDO:function (j, m, D, J) {
            var Q = m[1], S = U.filters[Q];
            if (S)return S(j, D, m, J); else if (Q === "contains")return(j.textContent || j.innerText || Z([j]) || "").indexOf(m[3]) >= 0; else if (Q === "not") {
                m = m[3];
                D = 0;
                for (J = m.length; D < J; D++)if (m[D] === j)return false;
                return true
            } else L.error(Q)
        }, CHILD:function (j, m) {
            var D, J, Q, S;
            D = m[1];
            var aa = j;
            switch (D) {
                case "only":
                case "first":
                    for (; aa =
                               aa.previousSibling;)if (aa.nodeType === 1)return false;
                    if (D === "first")return true;
                    aa = j;
                case "last":
                    for (; aa = aa.nextSibling;)if (aa.nodeType === 1)return false;
                    return true;
                case "nth":
                    D = m[2];
                    J = m[3];
                    if (D === 1 && J === 0)return true;
                    m = m[0];
                    if ((Q = j.parentNode) && (Q[f] !== m || !j.nodeIndex)) {
                        S = 0;
                        for (aa = Q.firstChild; aa; aa = aa.nextSibling)if (aa.nodeType === 1)aa.nodeIndex = ++S;
                        Q[f] = m
                    }
                    j = j.nodeIndex - J;
                    return D === 0 ? j === 0 : j % D === 0 && j / D >= 0
            }
        }, ID:function (j, m) {
            return j.nodeType === 1 && j.getAttribute("id") === m
        }, TAG:function (j, m) {
            return m ===
                "*" && j.nodeType === 1 || !!j.nodeName && j.nodeName.toLowerCase() === m
        }, CLASS:function (j, m) {
            return(" " + (j.className || j.getAttribute("class")) + " ").indexOf(m) > -1
        }, ATTR:function (j, m) {
            var D = m[1];
            j = L.attr ? L.attr(j, D) : U.attrHandle[D] ? U.attrHandle[D](j) : j[D] != null ? j[D] : j.getAttribute(D);
            D = j + "";
            var J = m[2];
            m = m[4];
            return j == null ? J === "!=" : !J && L.attr ? j != null : J === "=" ? D === m : J === "*=" ? D.indexOf(m) >= 0 : J === "~=" ? (" " + D + " ").indexOf(m) >= 0 : !m ? D && j !== false : J === "!=" ? D !== m : J === "^=" ? D.indexOf(m) === 0 : J === "$=" ? D.substr(D.length -
                m.length) === m : J === "|=" ? D === m || D.substr(0, m.length + 1) === m + "-" : false
        }, POS:function (j, m, D, J) {
            var Q = U.setFilters[m[2]];
            if (Q)return Q(j, D, m, J)
        }}}, la = U.match.POS, ra = function (j, m) {
            return"\\" + (m - 0 + 1)
        };
        for (var ua in U.match) {
            U.match[ua] = new RegExp(U.match[ua].source + /(?![^\[]*\])(?![^\(]*\))/.source);
            U.leftMatch[ua] = new RegExp(/(^(?:.|\r|\n)*?)/.source + U.match[ua].source.replace(/\\(\d+)/g, ra))
        }
        var sa = function (j, m) {
            j = Array.prototype.slice.call(j, 0);
            if (m) {
                m.push.apply(m, j);
                return m
            }
            return j
        };
        try {
            Array.prototype.slice.call(N.documentElement.childNodes,
                0)
        } catch (Ba) {
            sa = function (j, m) {
                var D = 0;
                m = m || [];
                if (h.call(j) === "[object Array]")Array.prototype.push.apply(m, j); else if (typeof j.length === "number")for (var J = j.length; D < J; D++)m.push(j[D]); else for (; j[D]; D++)m.push(j[D]);
                return m
            }
        }
        var na, Aa;
        if (N.documentElement.compareDocumentPosition)na = function (j, m) {
            if (j === m) {
                n = true;
                return 0
            }
            if (!j.compareDocumentPosition || !m.compareDocumentPosition)return j.compareDocumentPosition ? -1 : 1;
            return j.compareDocumentPosition(m) & 4 ? -1 : 1
        }; else {
            na = function (j, m) {
                if (j === m) {
                    n = true;
                    return 0
                } else if (j.sourceIndex && m.sourceIndex)return j.sourceIndex - m.sourceIndex;
                var D, J, Q = [], S = [];
                D = j.parentNode;
                J = m.parentNode;
                var aa = D;
                if (D === J)return Aa(j, m); else if (D) {
                    if (!J)return 1
                } else return-1;
                for (; aa;) {
                    Q.unshift(aa);
                    aa = aa.parentNode
                }
                for (aa = J; aa;) {
                    S.unshift(aa);
                    aa = aa.parentNode
                }
                D = Q.length;
                J = S.length;
                for (aa = 0; aa < D && aa < J; aa++)if (Q[aa] !== S[aa])return Aa(Q[aa], S[aa]);
                return aa === D ? Aa(j, S[aa], -1) : Aa(Q[aa], m, 1)
            };
            Aa = function (j, m, D) {
                if (j === m)return D;
                for (j = j.nextSibling; j;) {
                    if (j === m)return-1;
                    j = j.nextSibling
                }
                return 1
            }
        }
        (function () {
            var j =
                N.createElement("div"), m = "script" + (new Date).getTime(), D = N.documentElement;
            j.innerHTML = "<a name='" + m + "'/>";
            D.insertBefore(j, D.firstChild);
            if (N.getElementById(m)) {
                U.find.ID = function (J, Q, S) {
                    if (typeof Q.getElementById !== "undefined" && !S)return(Q = Q.getElementById(J[1])) ? Q.id === J[1] || typeof Q.getAttributeNode !== "undefined" && Q.getAttributeNode("id").nodeValue === J[1] ? [Q] : c : []
                };
                U.filter.ID = function (J, Q) {
                    var S = typeof J.getAttributeNode !== "undefined" && J.getAttributeNode("id");
                    return J.nodeType === 1 && S && S.nodeValue ===
                        Q
                }
            }
            D.removeChild(j);
            D = j = null
        })();
        (function () {
            var j = N.createElement("div");
            j.appendChild(N.createComment(""));
            if (j.getElementsByTagName("*").length > 0)U.find.TAG = function (m, D) {
                D = D.getElementsByTagName(m[1]);
                if (m[1] === "*") {
                    m = [];
                    for (var J = 0; D[J]; J++)D[J].nodeType === 1 && m.push(D[J]);
                    D = m
                }
                return D
            };
            j.innerHTML = "<a href='#'></a>";
            if (j.firstChild && typeof j.firstChild.getAttribute !== "undefined" && j.firstChild.getAttribute("href") !== "#")U.attrHandle.href = function (m) {
                return m.getAttribute("href", 2)
            };
            j = null
        })();
        N.querySelectorAll && function () {
            var j = L, m = N.createElement("div");
            m.innerHTML = "<p class='TEST'></p>";
            if (!(m.querySelectorAll && m.querySelectorAll(".TEST").length === 0)) {
                L = function (J, Q, S, aa) {
                    Q = Q || N;
                    if (!aa && !L.isXML(Q)) {
                        var ea = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(J);
                        if (ea && (Q.nodeType === 1 || Q.nodeType === 9))if (ea[1])return sa(Q.getElementsByTagName(J), S); else if (ea[2] && U.find.CLASS && Q.getElementsByClassName)return sa(Q.getElementsByClassName(ea[2]), S);
                        if (Q.nodeType === 9) {
                            if (J === "body" && Q.body)return sa([Q.body],
                                S); else if (ea && ea[3]) {
                                var pa = Q.getElementById(ea[3]);
                                if (pa && pa.parentNode) {
                                    if (pa.id === ea[3])return sa([pa], S)
                                } else return sa([], S)
                            }
                            try {
                                return sa(Q.querySelectorAll(J), S)
                            } catch (u) {
                            }
                        } else if (Q.nodeType === 1 && Q.nodeName.toLowerCase() !== "object") {
                            ea = Q;
                            var R = (pa = Q.getAttribute("id")) || "__sizzle__", ba = Q.parentNode, W = /^\s*[+~]/.test(J);
                            if (pa)R = R.replace(/'/g, "\\$&"); else Q.setAttribute("id", R);
                            if (W && ba)Q = Q.parentNode;
                            try {
                                if (!W || ba)return sa(Q.querySelectorAll("[id='" + R + "'] " + J), S)
                            } catch (qa) {
                            } finally {
                                pa ||
                                ea.removeAttribute("id")
                            }
                        }
                    }
                    return j(J, Q, S, aa)
                };
                for (var D in j)L[D] = j[D];
                m = null
            }
        }();
        (function () {
            var j = N.documentElement, m = j.matchesSelector || j.mozMatchesSelector || j.webkitMatchesSelector || j.msMatchesSelector;
            if (m) {
                var D = !m.call(N.createElement("div"), "div"), J = false;
                try {
                    m.call(N.documentElement, "[test!='']:sizzle")
                } catch (Q) {
                    J = true
                }
                L.matchesSelector = function (S, aa) {
                    aa = aa.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                    if (!L.isXML(S))try {
                        if (J || !U.match.PSEUDO.test(aa) && !/!=/.test(aa)) {
                            var ea = m.call(S, aa);
                            if (ea ||
                                !D || S.document && S.document.nodeType !== 11)return ea
                        }
                    } catch (pa) {
                    }
                    return L(aa, null, null, [S]).length > 0
                }
            }
        })();
        (function () {
            var j = N.createElement("div");
            j.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (!(!j.getElementsByClassName || j.getElementsByClassName("e").length === 0)) {
                j.lastChild.className = "e";
                if (j.getElementsByClassName("e").length !== 1) {
                    U.order.splice(1, 0, "CLASS");
                    U.find.CLASS = function (m, D, J) {
                        if (typeof D.getElementsByClassName !== "undefined" && !J)return D.getElementsByClassName(m[1])
                    };
                    j = null
                }
            }
        })();
        L.contains = N.documentElement.contains ? function (j, m) {
            return j !== m && (j.contains ? j.contains(m) : true)
        } : N.documentElement.compareDocumentPosition ? function (j, m) {
            return!!(j.compareDocumentPosition(m) & 16)
        } : function () {
            return false
        };
        L.isXML = function (j) {
            return(j = (j ? j.ownerDocument || j : 0).documentElement) ? j.nodeName !== "HTML" : false
        };
        var ya = function (j, m, D) {
            var J, Q = [], S = "";
            for (m = m.nodeType ? [m] : m; J = U.match.PSEUDO.exec(j);) {
                S += J[0];
                j = j.replace(U.match.PSEUDO, "")
            }
            j = U.relative[j] ? j + "*" : j;
            J = 0;
            for (var aa =
                m.length; J < aa; J++)L(j, m[J], Q, D);
            return L.filter(S, Q)
        };
        L.attr = d.attr;
        L.selectors.attrMap = {};
        d.find = L;
        d.expr = L.selectors;
        d.expr[":"] = d.expr.filters;
        d.unique = L.uniqueSort;
        d.text = L.getText;
        d.isXMLDoc = L.isXML;
        d.contains = L.contains
    })();
    var Mb = /Until$/, Nb = /^(?:parents|prevUntil|prevAll)/, Ob = /,/, xb = /^.[^:#\[\.,]*$/, Pb = Array.prototype.slice, gb = d.expr.match.POS, Qb = {children:true, contents:true, next:true, prev:true};
    d.fn.extend({find:function (a) {
        var b = this, e, f;
        if (typeof a !== "string")return d(a).filter(function () {
            e =
                0;
            for (f = b.length; e < f; e++)if (d.contains(b[e], this))return true
        });
        var g = this.pushStack("", "find", a), h, n, q;
        e = 0;
        for (f = this.length; e < f; e++) {
            h = g.length;
            d.find(a, this[e], g);
            if (e > 0)for (n = h; n < g.length; n++)for (q = 0; q < h; q++)if (g[q] === g[n]) {
                g.splice(n--, 1);
                break
            }
        }
        return g
    }, has:function (a) {
        var b = d(a);
        return this.filter(function () {
            for (var e = 0, f = b.length; e < f; e++)if (d.contains(this, b[e]))return true
        })
    }, not:function (a) {
        return this.pushStack(A(this, a, false), "not", a)
    }, filter:function (a) {
        return this.pushStack(A(this,
            a, true), "filter", a)
    }, is:function (a) {
        return!!a && (typeof a === "string" ? gb.test(a) ? d(a, this.context).index(this[0]) >= 0 : d.filter(a, this).length > 0 : this.filter(a).length > 0)
    }, closest:function (a, b) {
        var e = [], f, g, h = this[0];
        if (d.isArray(a)) {
            for (g = 1; h && h.ownerDocument && h !== b;) {
                for (f = 0; f < a.length; f++)d(h).is(a[f]) && e.push({selector:a[f], elem:h, level:g});
                h = h.parentNode;
                g++
            }
            return e
        }
        var n = gb.test(a) || typeof a !== "string" ? d(a, b || this.context) : 0;
        f = 0;
        for (g = this.length; f < g; f++)for (h = this[f]; h;)if (n ? n.index(h) > -1 : d.find.matchesSelector(h,
            a)) {
            e.push(h);
            break
        } else {
            h = h.parentNode;
            if (!h || !h.ownerDocument || h === b || h.nodeType === 11)break
        }
        e = e.length > 1 ? d.unique(e) : e;
        return this.pushStack(e, "closest", a)
    }, index:function (a) {
        if (!a)return this[0] && this[0].parentNode ? this.prevAll().length : -1;
        if (typeof a === "string")return d.inArray(this[0], d(a));
        return d.inArray(a.jquery ? a[0] : a, this)
    }, add:function (a, b) {
        a = typeof a === "string" ? d(a, b) : d.makeArray(a && a.nodeType ? [a] : a);
        b = d.merge(this.get(), a);
        return this.pushStack(X(a[0]) || X(b[0]) ? b : d.unique(b))
    }, andSelf:function () {
        return this.add(this.prevObject)
    }});
    d.each({parent:function (a) {
        return(a = a.parentNode) && a.nodeType !== 11 ? a : null
    }, parents:function (a) {
        return d.dir(a, "parentNode")
    }, parentsUntil:function (a, b, e) {
        return d.dir(a, "parentNode", e)
    }, next:function (a) {
        return d.nth(a, 2, "nextSibling")
    }, prev:function (a) {
        return d.nth(a, 2, "previousSibling")
    }, nextAll:function (a) {
        return d.dir(a, "nextSibling")
    }, prevAll:function (a) {
        return d.dir(a, "previousSibling")
    }, nextUntil:function (a, b, e) {
        return d.dir(a, "nextSibling", e)
    }, prevUntil:function (a, b, e) {
        return d.dir(a, "previousSibling",
            e)
    }, siblings:function (a) {
        return d.sibling(a.parentNode.firstChild, a)
    }, children:function (a) {
        return d.sibling(a.firstChild)
    }, contents:function (a) {
        return d.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : d.makeArray(a.childNodes)
    }}, function (a, b) {
        d.fn[a] = function (e, f) {
            var g = d.map(this, b, e);
            Mb.test(a) || (f = e);
            if (f && typeof f === "string")g = d.filter(f, g);
            g = this.length > 1 && !Qb[a] ? d.unique(g) : g;
            if ((this.length > 1 || Ob.test(f)) && Nb.test(a))g = g.reverse();
            return this.pushStack(g, a, Pb.call(arguments).join(","))
        }
    });
    d.extend({filter:function (a, b, e) {
        if (e)a = ":not(" + a + ")";
        return b.length === 1 ? d.find.matchesSelector(b[0], a) ? [b[0]] : [] : d.find.matches(a, b)
    }, dir:function (a, b, e) {
        var f = [];
        for (a = a[b]; a && a.nodeType !== 9 && (e === c || a.nodeType !== 1 || !d(a).is(e));) {
            a.nodeType === 1 && f.push(a);
            a = a[b]
        }
        return f
    }, nth:function (a, b, e) {
        b = b || 1;
        for (var f = 0; a; a = a[e])if (a.nodeType === 1 && ++f === b)break;
        return a
    }, sibling:function (a, b) {
        for (var e = []; a; a = a.nextSibling)a.nodeType === 1 && a !== b && e.push(a);
        return e
    }});
    var Va = "abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        Rb = / jQuery\d+="(?:\d+|null)"/g, Ra = /^\s+/, hb = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig, ib = /<([\w:]+)/, Sb = /<tbody/i, Tb = /<|&#?\w+;/, Ub = /<(?:script|style)/i, Vb = /<(?:script|object|embed|option|style)/i, jb = new RegExp("<(?:" + Va + ")", "i"), kb = /checked\s*(?:[^=]|=\s*.checked.)/i, Wb = /\/(java|ecma)script/i, yb = /^\s*<!(?:\[CDATA\[|\-\-)/, xa = {option:[1, "<select multiple='multiple'>", "</select>"], legend:[1, "<fieldset>", "</fieldset>"], thead:[1, "<table>", "</table>"], tr:[2, "<table><tbody>",
            "</tbody></table>"], td:[3, "<table><tbody><tr>", "</tr></tbody></table>"], col:[2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], area:[1, "<map>", "</map>"], _default:[0, "", ""]}, Wa = s(N);
    xa.optgroup = xa.option;
    xa.tbody = xa.tfoot = xa.colgroup = xa.caption = xa.thead;
    xa.th = xa.td;
    if (!d.support.htmlSerialize)xa._default = [1, "div<div>", "</div>"];
    d.fn.extend({text:function (a) {
        if (d.isFunction(a))return this.each(function (b) {
            var e = d(this);
            e.text(a.call(this, b, e.text()))
        });
        if (typeof a !== "object" && a !== c)return this.empty().append((this[0] &&
            this[0].ownerDocument || N).createTextNode(a));
        return d.text(this)
    }, wrapAll:function (a) {
        if (d.isFunction(a))return this.each(function (e) {
            d(this).wrapAll(a.call(this, e))
        });
        if (this[0]) {
            var b = d(a, this[0].ownerDocument).eq(0).clone(true);
            this[0].parentNode && b.insertBefore(this[0]);
            b.map(function () {
                for (var e = this; e.firstChild && e.firstChild.nodeType === 1;)e = e.firstChild;
                return e
            }).append(this)
        }
        return this
    }, wrapInner:function (a) {
        if (d.isFunction(a))return this.each(function (b) {
            d(this).wrapInner(a.call(this, b))
        });
        return this.each(function () {
            var b = d(this), e = b.contents();
            e.length ? e.wrapAll(a) : b.append(a)
        })
    }, wrap:function (a) {
        var b = d.isFunction(a);
        return this.each(function (e) {
            d(this).wrapAll(b ? a.call(this, e) : a)
        })
    }, unwrap:function () {
        return this.parent().each(function () {
            d.nodeName(this, "body") || d(this).replaceWith(this.childNodes)
        }).end()
    }, append:function () {
        return this.domManip(arguments, true, function (a) {
            this.nodeType === 1 && this.appendChild(a)
        })
    }, prepend:function () {
        return this.domManip(arguments, true, function (a) {
            this.nodeType ===
                1 && this.insertBefore(a, this.firstChild)
        })
    }, before:function () {
        if (this[0] && this[0].parentNode)return this.domManip(arguments, false, function (b) {
            this.parentNode.insertBefore(b, this)
        }); else if (arguments.length) {
            var a = d.clean(arguments);
            a.push.apply(a, this.toArray());
            return this.pushStack(a, "before", arguments)
        }
    }, after:function () {
        if (this[0] && this[0].parentNode)return this.domManip(arguments, false, function (b) {
            this.parentNode.insertBefore(b, this.nextSibling)
        }); else if (arguments.length) {
            var a = this.pushStack(this,
                "after", arguments);
            a.push.apply(a, d.clean(arguments));
            return a
        }
    }, remove:function (a, b) {
        for (var e = 0, f; (f = this[e]) != null; e++)if (!a || d.filter(a, [f]).length) {
            if (!b && f.nodeType === 1) {
                d.cleanData(f.getElementsByTagName("*"));
                d.cleanData([f])
            }
            f.parentNode && f.parentNode.removeChild(f)
        }
        return this
    }, empty:function () {
        for (var a = 0, b; (b = this[a]) != null; a++)for (b.nodeType === 1 && d.cleanData(b.getElementsByTagName("*")); b.firstChild;)b.removeChild(b.firstChild);
        return this
    }, clone:function (a, b) {
        a = a == null ? false : a;
        b = b ==
            null ? a : b;
        return this.map(function () {
            return d.clone(this, a, b)
        })
    }, html:function (a) {
        if (a === c)return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(Rb, "") : null; else if (typeof a === "string" && !Ub.test(a) && (d.support.leadingWhitespace || !Ra.test(a)) && !xa[(ib.exec(a) || ["", ""])[1].toLowerCase()]) {
            a = a.replace(hb, "<$1></$2>");
            try {
                for (var b = 0, e = this.length; b < e; b++)if (this[b].nodeType === 1) {
                    d.cleanData(this[b].getElementsByTagName("*"));
                    this[b].innerHTML = a
                }
            } catch (f) {
                this.empty().append(a)
            }
        } else d.isFunction(a) ?
            this.each(function (g) {
                var h = d(this);
                h.html(a.call(this, g, h.html()))
            }) : this.empty().append(a);
        return this
    }, replaceWith:function (a) {
        if (this[0] && this[0].parentNode) {
            if (d.isFunction(a))return this.each(function (b) {
                var e = d(this), f = e.html();
                e.replaceWith(a.call(this, b, f))
            });
            if (typeof a !== "string")a = d(a).detach();
            return this.each(function () {
                var b = this.nextSibling, e = this.parentNode;
                d(this).remove();
                b ? d(b).before(a) : d(e).append(a)
            })
        } else return this.length ? this.pushStack(d(d.isFunction(a) ? a() : a), "replaceWith",
            a) : this
    }, detach:function (a) {
        return this.remove(a, true)
    }, domManip:function (a, b, e) {
        var f, g, h, n = a[0], q = [];
        if (!d.support.checkClone && arguments.length === 3 && typeof n === "string" && kb.test(n))return this.each(function () {
            d(this).domManip(a, b, e, true)
        });
        if (d.isFunction(n))return this.each(function (L) {
            var Z = d(this);
            a[0] = n.call(this, L, b ? Z.html() : c);
            Z.domManip(a, b, e)
        });
        if (this[0]) {
            f = n && n.parentNode;
            f = d.support.parentNode && f && f.nodeType === 11 && f.childNodes.length === this.length ? {fragment:f} : d.buildFragment(a, this,
                q);
            h = f.fragment;
            if (g = h.childNodes.length === 1 ? (h = h.firstChild) : h.firstChild) {
                b = b && d.nodeName(g, "tr");
                for (var t = 0, C = this.length, V = C - 1; t < C; t++)e.call(b ? x(this[t], g) : this[t], f.cacheable || C > 1 && t < V ? d.clone(h, true, true) : h)
            }
            q.length && d.each(q, w)
        }
        return this
    }});
    d.buildFragment = function (a, b, e) {
        var f, g, h, n, q = a[0];
        if (b && b[0])n = b[0].ownerDocument || b[0];
        n.createDocumentFragment || (n = N);
        if (a.length === 1 && typeof q === "string" && q.length < 512 && n === N && q.charAt(0) === "<" && !Vb.test(q) && (d.support.checkClone || !kb.test(q)) &&
            (d.support.html5Clone || !jb.test(q))) {
            g = true;
            if ((h = d.fragments[q]) && h !== 1)f = h
        }
        if (!f) {
            f = n.createDocumentFragment();
            d.clean(a, n, f, e)
        }
        if (g)d.fragments[q] = h ? f : 1;
        return{fragment:f, cacheable:g}
    };
    d.fragments = {};
    d.each({appendTo:"append", prependTo:"prepend", insertBefore:"before", insertAfter:"after", replaceAll:"replaceWith"}, function (a, b) {
        d.fn[a] = function (e) {
            var f = [];
            e = d(e);
            var g = this.length === 1 && this[0].parentNode;
            if (g && g.nodeType === 11 && g.childNodes.length === 1 && e.length === 1) {
                e[b](this[0]);
                return this
            } else {
                g =
                    0;
                for (var h = e.length; g < h; g++) {
                    var n = (g > 0 ? this.clone(true) : this).get();
                    d(e[g])[b](n);
                    f = f.concat(n)
                }
                return this.pushStack(f, a, e.selector)
            }
        }
    });
    d.extend({clone:function (a, b, e) {
        var f, g, h, n = d.support.html5Clone || !jb.test("<" + a.nodeName) ? a.cloneNode(true) : E(a);
        if ((!d.support.noCloneEvent || !d.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !d.isXMLDoc(a)) {
            z(a, n);
            f = K(a);
            g = K(n);
            for (h = 0; f[h]; ++h)g[h] && z(f[h], g[h])
        }
        if (b) {
            B(a, n);
            if (e) {
                f = K(a);
                g = K(n);
                for (h = 0; f[h]; ++h)B(f[h], g[h])
            }
        }
        return n
    }, clean:function (a, b, e, f) {
        b = b || N;
        if (typeof b.createElement === "undefined")b = b.ownerDocument || b[0] && b[0].ownerDocument || N;
        for (var g = [], h, n = 0, q; (q = a[n]) != null; n++) {
            if (typeof q === "number")q += "";
            if (q) {
                if (typeof q === "string")if (Tb.test(q)) {
                    q = q.replace(hb, "<$1></$2>");
                    h = (ib.exec(q) || ["", ""])[1].toLowerCase();
                    var t = xa[h] || xa._default, C = t[0], V = b.createElement("div");
                    b === N ? Wa.appendChild(V) : s(b).appendChild(V);
                    for (V.innerHTML = t[1] + q + t[2]; C--;)V = V.lastChild;
                    if (!d.support.tbody) {
                        C = Sb.test(q);
                        t = h === "table" && !C ? V.firstChild && V.firstChild.childNodes :
                            t[1] === "<table>" && !C ? V.childNodes : [];
                        for (h = t.length - 1; h >= 0; --h)d.nodeName(t[h], "tbody") && !t[h].childNodes.length && t[h].parentNode.removeChild(t[h])
                    }
                    !d.support.leadingWhitespace && Ra.test(q) && V.insertBefore(b.createTextNode(Ra.exec(q)[0]), V.firstChild);
                    q = V.childNodes
                } else q = b.createTextNode(q);
                var L;
                if (!d.support.appendChecked)if (q[0] && typeof(L = q.length) === "number")for (h = 0; h < L; h++)F(q[h]); else F(q);
                if (q.nodeType)g.push(q); else g = d.merge(g, q)
            }
        }
        if (e) {
            a = function (Z) {
                return!Z.type || Wb.test(Z.type)
            };
            for (n =
                     0; g[n]; n++)if (f && d.nodeName(g[n], "script") && (!g[n].type || g[n].type.toLowerCase() === "text/javascript"))f.push(g[n].parentNode ? g[n].parentNode.removeChild(g[n]) : g[n]); else {
                if (g[n].nodeType === 1) {
                    b = d.grep(g[n].getElementsByTagName("script"), a);
                    g.splice.apply(g, [n + 1, 0].concat(b))
                }
                e.appendChild(g[n])
            }
        }
        return g
    }, cleanData:function (a) {
        for (var b, e, f = d.cache, g = d.event.special, h = d.support.deleteExpando, n = 0, q; (q = a[n]) != null; n++)if (!(q.nodeName && d.noData[q.nodeName.toLowerCase()]))if (e = q[d.expando]) {
            if ((b = f[e]) &&
                b.events) {
                for (var t in b.events)g[t] ? d.event.remove(q, t) : d.removeEvent(q, t, b.handle);
                if (b.handle)b.handle.elem = null
            }
            if (h)delete q[d.expando]; else q.removeAttribute && q.removeAttribute(d.expando);
            delete f[e]
        }
    }});
    var Sa = /alpha\([^)]*\)/i, Xb = /opacity=([^)]*)/, Yb = /([A-Z]|^ms)/g, lb = /^-?\d+(?:px)?$/i, Zb = /^-?\d/, $b = /^([\-+])=([\-+.\de]+)/, ac = {position:"absolute", visibility:"hidden", display:"block"}, zb = ["Left", "Right"], Ab = ["Top", "Bottom"], Fa, mb, nb;
    d.fn.css = function (a, b) {
        if (arguments.length === 2 && b === c)return this;
        return d.access(this, a, b, true, function (e, f, g) {
            return g !== c ? d.style(e, f, g) : d.css(e, f)
        })
    };
    d.extend({cssHooks:{opacity:{get:function (a, b) {
        if (b) {
            a = Fa(a, "opacity", "opacity");
            return a === "" ? "1" : a
        } else return a.style.opacity
    }}}, cssNumber:{fillOpacity:true, fontWeight:true, lineHeight:true, opacity:true, orphans:true, widows:true, zIndex:true, zoom:true}, cssProps:{"float":d.support.cssFloat ? "cssFloat" : "styleFloat"}, style:function (a, b, e, f) {
        if (!(!a || a.nodeType === 3 || a.nodeType === 8 || !a.style)) {
            var g, h = d.camelCase(b),
                n = a.style, q = d.cssHooks[h];
            b = d.cssProps[h] || h;
            if (e !== c) {
                f = typeof e;
                if (f === "string" && (g = $b.exec(e))) {
                    e = +(g[1] + 1) * +g[2] + parseFloat(d.css(a, b));
                    f = "number"
                }
                if (!(e == null || f === "number" && isNaN(e))) {
                    if (f === "number" && !d.cssNumber[h])e += "px";
                    if (!q || !("set"in q) || (e = q.set(a, e)) !== c)try {
                        n[b] = e
                    } catch (t) {
                    }
                }
            } else {
                if (q && "get"in q && (g = q.get(a, false, f)) !== c)return g;
                return n[b]
            }
        }
    }, css:function (a, b, e) {
        var f, g;
        b = d.camelCase(b);
        g = d.cssHooks[b];
        b = d.cssProps[b] || b;
        if (b === "cssFloat")b = "float";
        if (g && "get"in g && (f = g.get(a,
            true, e)) !== c)return f; else if (Fa)return Fa(a, b)
    }, swap:function (a, b, e) {
        var f = {};
        for (var g in b) {
            f[g] = a.style[g];
            a.style[g] = b[g]
        }
        e.call(a);
        for (g in b)a.style[g] = f[g]
    }});
    d.curCSS = d.css;
    d.each(["height", "width"], function (a, b) {
        d.cssHooks[b] = {get:function (e, f, g) {
            var h;
            if (f) {
                if (e.offsetWidth !== 0)return H(e, b, g); else d.swap(e, ac, function () {
                    h = H(e, b, g)
                });
                return h
            }
        }, set:function (e, f) {
            if (lb.test(f)) {
                f = parseFloat(f);
                if (f >= 0)return f + "px"
            } else return f
        }}
    });
    if (!d.support.opacity)d.cssHooks.opacity = {get:function (a, b) {
        return Xb.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
    }, set:function (a, b) {
        var e = a.style;
        a = a.currentStyle;
        var f = d.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "", g = a && a.filter || e.filter || "";
        e.zoom = 1;
        if (b >= 1 && d.trim(g.replace(Sa, "")) === "") {
            e.removeAttribute("filter");
            if (a && !a.filter)return
        }
        e.filter = Sa.test(g) ? g.replace(Sa, f) : g + " " + f
    }};
    d(function () {
        if (!d.support.reliableMarginRight)d.cssHooks.marginRight = {get:function (a, b) {
            var e;
            d.swap(a, {display:"inline-block"},
                function () {
                    e = b ? Fa(a, "margin-right", "marginRight") : a.style.marginRight
                });
            return e
        }}
    });
    if (N.defaultView && N.defaultView.getComputedStyle)mb = function (a, b) {
        var e, f, g;
        b = b.replace(Yb, "-$1").toLowerCase();
        if ((f = a.ownerDocument.defaultView) && (g = f.getComputedStyle(a, null))) {
            e = g.getPropertyValue(b);
            if (e === "" && !d.contains(a.ownerDocument.documentElement, a))e = d.style(a, b)
        }
        return e
    };
    if (N.documentElement.currentStyle)nb = function (a, b) {
        var e, f, g = a.currentStyle && a.currentStyle[b], h = a.style;
        if (g === null && h && (e = h[b]))g =
            e;
        if (!lb.test(g) && Zb.test(g)) {
            e = h.left;
            if (f = a.runtimeStyle && a.runtimeStyle.left)a.runtimeStyle.left = a.currentStyle.left;
            h.left = b === "fontSize" ? "1em" : g || 0;
            g = h.pixelLeft + "px";
            h.left = e;
            if (f)a.runtimeStyle.left = f
        }
        return g === "" ? "auto" : g
    };
    Fa = mb || nb;
    if (d.expr && d.expr.filters) {
        d.expr.filters.hidden = function (a) {
            var b = a.offsetHeight;
            return a.offsetWidth === 0 && b === 0 || !d.support.reliableHiddenOffsets && (a.style && a.style.display || d.css(a, "display")) === "none"
        };
        d.expr.filters.visible = function (a) {
            return!d.expr.filters.hidden(a)
        }
    }
    var bc =
        /%20/g, Bb = /\[\]$/, ob = /\r?\n/g, cc = /#.*$/, dc = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, ec = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, fc = /^(?:GET|HEAD)$/, gc = /^\/\//, pb = /\?/, hc = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ic = /^(?:select|textarea)/i, Xa = /\s+/, jc = /([?&])_=[^&]*/, qb = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/, rb = d.fn.load, Ma = {}, sb = {}, Da, Ea, tb = ["*/"] + ["*"];
    try {
        Da = ka.href
    } catch (pc) {
        Da = N.createElement("a");
        Da.href = "";
        Da = Da.href
    }
    Ea = qb.exec(Da.toLowerCase()) || [];
    d.fn.extend({load:function (a, b, e) {
        if (typeof a !== "string" && rb)return rb.apply(this, arguments); else if (!this.length)return this;
        var f = a.indexOf(" ");
        if (f >= 0) {
            var g = a.slice(f, a.length);
            a = a.slice(0, f)
        }
        f = "GET";
        if (b)if (d.isFunction(b)) {
            e = b;
            b = c
        } else if (typeof b === "object") {
            b = d.param(b, d.ajaxSettings.traditional);
            f = "POST"
        }
        var h = this;
        d.ajax({url:a, type:f, dataType:"html", data:b, complete:function (n, q, t) {
            t = n.responseText;
            if (n.isResolved()) {
                n.done(function (C) {
                    t = C
                });
                h.html(g ? d("<div>").append(t.replace(hc, "")).find(g) : t)
            }
            e && h.each(e, [t, q, n])
        }});
        return this
    }, serialize:function () {
        return d.param(this.serializeArray())
    }, serializeArray:function () {
        return this.map(function () {
            return this.elements ? d.makeArray(this.elements) : this
        }).filter(function () {
            return this.name && !this.disabled && (this.checked || ic.test(this.nodeName) || ec.test(this.type))
        }).map(function (a, b) {
            a = d(this).val();
            return a == null ? null : d.isArray(a) ? d.map(a, function (e) {
                return{name:b.name, value:e.replace(ob, "\r\n")}
            }) :
            {name:b.name, value:a.replace(ob, "\r\n")}
        }).get()
    }});
    d.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, b) {
        d.fn[b] = function (e) {
            return this.on(b, e)
        }
    });
    d.each(["get", "post"], function (a, b) {
        d[b] = function (e, f, g, h) {
            if (d.isFunction(f)) {
                h = h || g;
                g = f;
                f = c
            }
            return d.ajax({type:b, url:e, data:f, success:g, dataType:h})
        }
    });
    d.extend({getScript:function (a, b) {
        return d.get(a, c, b, "script")
    }, getJSON:function (a, b, e) {
        return d.get(a, b, e, "json")
    }, ajaxSetup:function (a, b) {
        if (b)ja(a, d.ajaxSettings);
        else {
            b = a;
            a = d.ajaxSettings
        }
        ja(a, b);
        return a
    }, ajaxSettings:{url:Da, isLocal:/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/.test(Ea[1]), global:true, type:"GET", contentType:"application/x-www-form-urlencoded", processData:true, async:true, accepts:{xml:"application/xml, text/xml", html:"text/html", text:"text/plain", json:"application/json, text/javascript", "*":tb}, contents:{xml:/xml/, html:/html/, json:/json/}, responseFields:{xml:"responseXML", text:"responseText"}, converters:{"* text":k.String,
        "text html":true, "text json":d.parseJSON, "text xml":d.parseXML}, flatOptions:{context:true, url:true}}, ajaxPrefilter:P(Ma), ajaxTransport:P(sb), ajax:function (a, b) {
        function e(j, m, D, J) {
            if (ua !== 2) {
                ua = 2;
                ra && clearTimeout(ra);
                la = c;
                Z = J || "";
                na.readyState = j > 0 ? 4 : 0;
                var Q, S, aa;
                J = m;
                D = D ? T(f, na, D) : c;
                var ea;
                if (j >= 200 && j < 300 || j === 304) {
                    if (f.ifModified) {
                        if (ea = na.getResponseHeader("Last-Modified"))d.lastModified[C] = ea;
                        if (ea = na.getResponseHeader("Etag"))d.etag[C] = ea
                    }
                    if (j === 304) {
                        J = "notmodified";
                        Q = true
                    } else try {
                        S = G(f, D);
                        J =
                            "success";
                        Q = true
                    } catch (pa) {
                        J = "parsererror";
                        aa = pa
                    }
                } else {
                    aa = J;
                    if (!J || j) {
                        J = "error";
                        if (j < 0)j = 0
                    }
                }
                na.status = j;
                na.statusText = "" + (m || J);
                Q ? n.resolveWith(g, [S, J, na]) : n.rejectWith(g, [na, J, aa]);
                na.statusCode(t);
                t = c;
                if (sa)h.trigger("ajax" + (Q ? "Success" : "Error"), [na, f, Q ? S : aa]);
                q.fireWith(g, [na, J]);
                if (sa) {
                    h.trigger("ajaxComplete", [na, f]);
                    --d.active || d.event.trigger("ajaxStop")
                }
            }
        }

        if (typeof a === "object") {
            b = a;
            a = c
        }
        b = b || {};
        var f = d.ajaxSetup({}, b), g = f.context || f, h = g !== f && (g.nodeType || g instanceof d) ? d(g) : d.event, n = d.Deferred(),
            q = d.Callbacks("once memory"), t = f.statusCode || {}, C, V = {}, L = {}, Z, U, la, ra, ua = 0, sa, Ba, na = {readyState:0, setRequestHeader:function (j, m) {
                if (!ua) {
                    var D = j.toLowerCase();
                    j = L[D] = L[D] || j;
                    V[j] = m
                }
                return this
            }, getAllResponseHeaders:function () {
                return ua === 2 ? Z : null
            }, getResponseHeader:function (j) {
                var m;
                if (ua === 2) {
                    if (!U)for (U = {}; m = dc.exec(Z);)U[m[1].toLowerCase()] = m[2];
                    m = U[j.toLowerCase()]
                }
                return m === c ? null : m
            }, overrideMimeType:function (j) {
                if (!ua)f.mimeType = j;
                return this
            }, abort:function (j) {
                j = j || "abort";
                la && la.abort(j);
                e(0, j);
                return this
            }};
        n.promise(na);
        na.success = na.done;
        na.error = na.fail;
        na.complete = q.add;
        na.statusCode = function (j) {
            if (j) {
                var m;
                if (ua < 2)for (m in j)t[m] = [t[m], j[m]]; else {
                    m = j[na.status];
                    na.then(m, m)
                }
            }
            return this
        };
        f.url = ((a || f.url) + "").replace(cc, "").replace(gc, Ea[1] + "//");
        f.dataTypes = d.trim(f.dataType || "*").toLowerCase().split(Xa);
        if (f.crossDomain == null) {
            a = qb.exec(f.url.toLowerCase());
            f.crossDomain = !!(a && (a[1] != Ea[1] || a[2] != Ea[2] || (a[3] || (a[1] === "http:" ? 80 : 443)) != (Ea[3] || (Ea[1] === "http:" ? 80 : 443))))
        }
        if (f.data &&
            f.processData && typeof f.data !== "string")f.data = d.param(f.data, f.traditional);
        ga(Ma, f, b, na);
        if (ua === 2)return false;
        sa = f.global;
        f.type = f.type.toUpperCase();
        f.hasContent = !fc.test(f.type);
        sa && d.active++ === 0 && d.event.trigger("ajaxStart");
        if (!f.hasContent) {
            if (f.data) {
                f.url += (pb.test(f.url) ? "&" : "?") + f.data;
                delete f.data
            }
            C = f.url;
            if (f.cache === false) {
                a = d.now();
                var Aa = f.url.replace(jc, "$1_=" + a);
                f.url = Aa + (Aa === f.url ? (pb.test(f.url) ? "&" : "?") + "_=" + a : "")
            }
        }
        if (f.data && f.hasContent && f.contentType !== false || b.contentType)na.setRequestHeader("Content-Type",
            f.contentType);
        if (f.ifModified) {
            C = C || f.url;
            d.lastModified[C] && na.setRequestHeader("If-Modified-Since", d.lastModified[C]);
            d.etag[C] && na.setRequestHeader("If-None-Match", d.etag[C])
        }
        na.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + (f.dataTypes[0] !== "*" ? ", " + tb + "; q=0.01" : "") : f.accepts["*"]);
        for (Ba in f.headers)na.setRequestHeader(Ba, f.headers[Ba]);
        if (f.beforeSend && (f.beforeSend.call(g, na, f) === false || ua === 2)) {
            na.abort();
            return false
        }
        for (Ba in{success:1,
            error:1, complete:1})na[Ba](f[Ba]);
        if (la = ga(sb, f, b, na)) {
            na.readyState = 1;
            sa && h.trigger("ajaxSend", [na, f]);
            if (f.async && f.timeout > 0)ra = setTimeout(function () {
                na.abort("timeout")
            }, f.timeout);
            try {
                ua = 1;
                la.send(V, e)
            } catch (ya) {
                if (ua < 2)e(-1, ya); else throw ya;
            }
        } else e(-1, "No Transport");
        return na
    }, param:function (a, b) {
        var e = [], f = function (h, n) {
            n = d.isFunction(n) ? n() : n;
            e[e.length] = encodeURIComponent(h) + "=" + encodeURIComponent(n)
        };
        if (b === c)b = d.ajaxSettings.traditional;
        if (d.isArray(a) || a.jquery && !d.isPlainObject(a))d.each(a,
            function () {
                f(this.name, this.value)
            }); else for (var g in a)M(g, a[g], b, f);
        return e.join("&").replace(bc, "+")
    }});
    d.extend({active:0, lastModified:{}, etag:{}});
    var kc = d.now(), Ka = /(\=)\?(&|$)|\?\?/i;
    d.ajaxSetup({jsonp:"callback", jsonpCallback:function () {
        return d.expando + "_" + kc++
    }});
    d.ajaxPrefilter("json jsonp", function (a, b, e) {
        b = a.contentType === "application/x-www-form-urlencoded" && typeof a.data === "string";
        if (a.dataTypes[0] === "jsonp" || a.jsonp !== false && (Ka.test(a.url) || b && Ka.test(a.data))) {
            var f, g = a.jsonpCallback =
                d.isFunction(a.jsonpCallback) ? a.jsonpCallback() : a.jsonpCallback, h = k[g], n = a.url, q = a.data, t = "$1" + g + "$2";
            if (a.jsonp !== false) {
                n = n.replace(Ka, t);
                if (a.url === n) {
                    if (b)q = q.replace(Ka, t);
                    if (a.data === q)n += (/\?/.test(n) ? "&" : "?") + a.jsonp + "=" + g
                }
            }
            a.url = n;
            a.data = q;
            k[g] = function (C) {
                f = [C]
            };
            e.always(function () {
                k[g] = h;
                f && d.isFunction(h) && k[g](f[0])
            });
            a.converters["script json"] = function () {
                f || d.error(g + " was not called");
                return f[0]
            };
            a.dataTypes[0] = "json";
            return"script"
        }
    });
    d.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
        contents:{script:/javascript|ecmascript/}, converters:{"text script":function (a) {
            d.globalEval(a);
            return a
        }}});
    d.ajaxPrefilter("script", function (a) {
        if (a.cache === c)a.cache = false;
        if (a.crossDomain) {
            a.type = "GET";
            a.global = false
        }
    });
    d.ajaxTransport("script", function (a) {
        if (a.crossDomain) {
            var b, e = N.head || N.getElementsByTagName("head")[0] || N.documentElement;
            return{send:function (f, g) {
                b = N.createElement("script");
                b.async = "async";
                if (a.scriptCharset)b.charset = a.scriptCharset;
                b.src = a.url;
                b.onload = b.onreadystatechange =
                    function (h, n) {
                        if (n || !b.readyState || /loaded|complete/.test(b.readyState)) {
                            b.onload = b.onreadystatechange = null;
                            e && b.parentNode && e.removeChild(b);
                            b = c;
                            n || g(200, "success")
                        }
                    };
                e.insertBefore(b, e.firstChild)
            }, abort:function () {
                b && b.onload(0, 1)
            }}
        }
    });
    var Ta = k.ActiveXObject ? function () {
        for (var a in Ha)Ha[a](0, 1)
    } : false, lc = 0, Ha;
    d.ajaxSettings.xhr = k.ActiveXObject ? function () {
        return!this.isLocal && Y() || ca()
    } : Y;
    (function (a) {
        d.extend(d.support, {ajax:!!a, cors:!!a && "withCredentials"in a})
    })(d.ajaxSettings.xhr());
    d.support.ajax &&
    d.ajaxTransport(function (a) {
        if (!a.crossDomain || d.support.cors) {
            var b;
            return{send:function (e, f) {
                var g = a.xhr(), h, n;
                a.username ? g.open(a.type, a.url, a.async, a.username, a.password) : g.open(a.type, a.url, a.async);
                if (a.xhrFields)for (n in a.xhrFields)g[n] = a.xhrFields[n];
                a.mimeType && g.overrideMimeType && g.overrideMimeType(a.mimeType);
                if (!a.crossDomain && !e["X-Requested-With"])e["X-Requested-With"] = "XMLHttpRequest";
                try {
                    for (n in e)g.setRequestHeader(n, e[n])
                } catch (q) {
                }
                g.send(a.hasContent && a.data || null);
                b = function (t, C) {
                    var V, L, Z, U, la;
                    try {
                        if (b && (C || g.readyState === 4)) {
                            b = c;
                            if (h) {
                                g.onreadystatechange = d.noop;
                                Ta && delete Ha[h]
                            }
                            if (C)g.readyState !== 4 && g.abort(); else {
                                V = g.status;
                                Z = g.getAllResponseHeaders();
                                U = {};
                                if ((la = g.responseXML) && la.documentElement)U.xml = la;
                                U.text = g.responseText;
                                try {
                                    L = g.statusText
                                } catch (ra) {
                                    L = ""
                                }
                                if (!V && a.isLocal && !a.crossDomain)V = U.text ? 200 : 404; else if (V === 1223)V = 204
                            }
                        }
                    } catch (ua) {
                        C || f(-1, ua)
                    }
                    U && f(V, L, U, Z)
                };
                if (!a.async || g.readyState === 4)b(); else {
                    h = ++lc;
                    if (Ta) {
                        if (!Ha) {
                            Ha = {};
                            d(k).unload(Ta)
                        }
                        Ha[h] = b
                    }
                    g.onreadystatechange =
                        b
                }
            }, abort:function () {
                b && b(0, 1)
            }}
        }
    });
    var Na = {}, za, Ga, mc = /^(?:toggle|show|hide)$/, nc = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i, La, Ya = [
        ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
        ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
        ["opacity"]
    ], Ia;
    d.fn.extend({show:function (a, b, e) {
        if (a || a === 0)return this.animate(ta("show", 3), a, b, e); else {
            e = 0;
            for (var f = this.length; e < f; e++) {
                a = this[e];
                if (a.style) {
                    b = a.style.display;
                    if (!d._data(a, "olddisplay") && b === "none")b = a.style.display = "";
                    b === "" && d.css(a, "display") === "none" && d._data(a, "olddisplay", da(a.nodeName))
                }
            }
            for (e = 0; e < f; e++) {
                a = this[e];
                if (a.style) {
                    b = a.style.display;
                    if (b === "" || b === "none")a.style.display = d._data(a, "olddisplay") || ""
                }
            }
            return this
        }
    }, hide:function (a, b, e) {
        if (a || a === 0)return this.animate(ta("hide", 3), a, b, e); else {
            e = 0;
            for (var f = this.length; e < f; e++) {
                a = this[e];
                if (a.style) {
                    b = d.css(a, "display");
                    b !== "none" && !d._data(a, "olddisplay") && d._data(a, "olddisplay", b)
                }
            }
            for (e = 0; e < f; e++)if (this[e].style)this[e].style.display = "none";
            return this
        }
    },
        _toggle:d.fn.toggle, toggle:function (a, b, e) {
            var f = typeof a === "boolean";
            if (d.isFunction(a) && d.isFunction(b))this._toggle.apply(this, arguments); else a == null || f ? this.each(function () {
                var g = f ? a : d(this).is(":hidden");
                d(this)[g ? "show" : "hide"]()
            }) : this.animate(ta("toggle", 3), a, b, e);
            return this
        }, fadeTo:function (a, b, e, f) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({opacity:b}, a, e, f)
        }, animate:function (a, b, e, f) {
            function g() {
                h.queue === false && d._mark(this);
                var n = d.extend({}, h), q = this.nodeType ===
                    1, t = q && d(this).is(":hidden"), C, V, L, Z, U;
                n.animatedProperties = {};
                for (L in a) {
                    C = d.camelCase(L);
                    if (L !== C) {
                        a[C] = a[L];
                        delete a[L]
                    }
                    V = a[C];
                    if (d.isArray(V)) {
                        n.animatedProperties[C] = V[1];
                        V = a[C] = V[0]
                    } else n.animatedProperties[C] = n.specialEasing && n.specialEasing[C] || n.easing || "swing";
                    if (V === "hide" && t || V === "show" && !t)return n.complete.call(this);
                    if (q && (C === "height" || C === "width")) {
                        n.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY];
                        if (d.css(this, "display") === "inline" && d.css(this, "float") ===
                            "none")if (!d.support.inlineBlockNeedsLayout || da(this.nodeName) === "inline")this.style.display = "inline-block"; else this.style.zoom = 1
                    }
                }
                if (n.overflow != null)this.style.overflow = "hidden";
                for (L in a) {
                    q = new d.fx(this, n, L);
                    V = a[L];
                    if (mc.test(V))if (C = d._data(this, "toggle" + L) || (V === "toggle" ? t ? "show" : "hide" : 0)) {
                        d._data(this, "toggle" + L, C === "show" ? "hide" : "show");
                        q[C]()
                    } else q[V](); else {
                        C = nc.exec(V);
                        Z = q.cur();
                        if (C) {
                            V = parseFloat(C[2]);
                            U = C[3] || (d.cssNumber[L] ? "" : "px");
                            if (U !== "px") {
                                d.style(this, L, (V || 1) + U);
                                Z = (V || 1) /
                                    q.cur() * Z;
                                d.style(this, L, Z + U)
                            }
                            if (C[1])V = (C[1] === "-=" ? -1 : 1) * V + Z;
                            q.custom(Z, V, U)
                        } else q.custom(Z, V, "")
                    }
                }
                return true
            }

            var h = d.speed(b, e, f);
            if (d.isEmptyObject(a))return this.each(h.complete, [false]);
            a = d.extend({}, a);
            return h.queue === false ? this.each(g) : this.queue(h.queue, g)
        }, stop:function (a, b, e) {
            if (typeof a !== "string") {
                e = b;
                b = a;
                a = c
            }
            if (b && a !== false)this.queue(a || "fx", []);
            return this.each(function () {
                function f(t, C, V) {
                    C = C[V];
                    d.removeData(t, V, true);
                    C.stop(e)
                }

                var g, h = false, n = d.timers, q = d._data(this);
                e || d._unmark(true,
                    this);
                if (a == null)for (g in q)q[g] && q[g].stop && g.indexOf(".run") === g.length - 4 && f(this, q, g); else if (q[g = a + ".run"] && q[g].stop)f(this, q, g);
                for (g = n.length; g--;)if (n[g].elem === this && (a == null || n[g].queue === a)) {
                    e ? n[g](true) : n[g].saveState();
                    h = true;
                    n.splice(g, 1)
                }
                e && h || d.dequeue(this, a)
            })
        }});
    d.each({slideDown:ta("show", 1), slideUp:ta("hide", 1), slideToggle:ta("toggle", 1), fadeIn:{opacity:"show"}, fadeOut:{opacity:"hide"}, fadeToggle:{opacity:"toggle"}}, function (a, b) {
        d.fn[a] = function (e, f, g) {
            return this.animate(b,
                e, f, g)
        }
    });
    d.extend({speed:function (a, b, e) {
        var f = a && typeof a === "object" ? d.extend({}, a) : {complete:e || !e && b || d.isFunction(a) && a, duration:a, easing:e && b || b && !d.isFunction(b) && b};
        f.duration = d.fx.off ? 0 : typeof f.duration === "number" ? f.duration : f.duration in d.fx.speeds ? d.fx.speeds[f.duration] : d.fx.speeds._default;
        if (f.queue == null || f.queue === true)f.queue = "fx";
        f.old = f.complete;
        f.complete = function (g) {
            d.isFunction(f.old) && f.old.call(this);
            if (f.queue)d.dequeue(this, f.queue); else g !== false && d._unmark(this)
        };
        return f
    },
        easing:{linear:function (a, b, e, f) {
            return e + f * a
        }, swing:function (a, b, e, f) {
            return(-Math.cos(a * Math.PI) / 2 + 0.5) * f + e
        }}, timers:[], fx:function (a, b, e) {
            this.options = b;
            this.elem = a;
            this.prop = e;
            b.orig = b.orig || {}
        }});
    d.fx.prototype = {update:function () {
        this.options.step && this.options.step.call(this.elem, this.now, this);
        (d.fx.step[this.prop] || d.fx.step._default)(this)
    }, cur:function () {
        if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null))return this.elem[this.prop];
        var a, b = d.css(this.elem,
            this.prop);
        return isNaN(a = parseFloat(b)) ? !b || b === "auto" ? 0 : b : a
    }, custom:function (a, b, e) {
        function f(n) {
            return g.step(n)
        }

        var g = this, h = d.fx;
        this.startTime = Ia || ia();
        this.end = b;
        this.now = this.start = a;
        this.pos = this.state = 0;
        this.unit = e || this.unit || (d.cssNumber[this.prop] ? "" : "px");
        f.queue = this.options.queue;
        f.elem = this.elem;
        f.saveState = function () {
            g.options.hide && d._data(g.elem, "fxshow" + g.prop) === c && d._data(g.elem, "fxshow" + g.prop, g.start)
        };
        if (f() && d.timers.push(f) && !La)La = setInterval(h.tick, h.interval)
    }, show:function () {
        var a =
            d._data(this.elem, "fxshow" + this.prop);
        this.options.orig[this.prop] = a || d.style(this.elem, this.prop);
        this.options.show = true;
        a !== c ? this.custom(this.cur(), a) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur());
        d(this.elem).show()
    }, hide:function () {
        this.options.orig[this.prop] = d._data(this.elem, "fxshow" + this.prop) || d.style(this.elem, this.prop);
        this.options.hide = true;
        this.custom(this.cur(), 0)
    }, step:function (a) {
        var b, e = Ia || ia(), f = true, g = this.elem, h = this.options;
        if (a || e >= h.duration + this.startTime) {
            this.now =
                this.end;
            this.pos = this.state = 1;
            this.update();
            h.animatedProperties[this.prop] = true;
            for (b in h.animatedProperties)if (h.animatedProperties[b] !== true)f = false;
            if (f) {
                h.overflow != null && !d.support.shrinkWrapBlocks && d.each(["", "X", "Y"], function (n, q) {
                    g.style["overflow" + q] = h.overflow[n]
                });
                h.hide && d(g).hide();
                if (h.hide || h.show)for (b in h.animatedProperties) {
                    d.style(g, b, h.orig[b]);
                    d.removeData(g, "fxshow" + b, true);
                    d.removeData(g, "toggle" + b, true)
                }
                if (a = h.complete) {
                    h.complete = false;
                    a.call(g)
                }
            }
            return false
        } else {
            if (h.duration ==
                Infinity)this.now = e; else {
                a = e - this.startTime;
                this.state = a / h.duration;
                this.pos = d.easing[h.animatedProperties[this.prop]](this.state, a, 0, 1, h.duration);
                this.now = this.start + (this.end - this.start) * this.pos
            }
            this.update()
        }
        return true
    }};
    d.extend(d.fx, {tick:function () {
        for (var a, b = d.timers, e = 0; e < b.length; e++) {
            a = b[e];
            !a() && b[e] === a && b.splice(e--, 1)
        }
        b.length || d.fx.stop()
    }, interval:13, stop:function () {
        clearInterval(La);
        La = null
    }, speeds:{slow:600, fast:200, _default:400}, step:{opacity:function (a) {
        d.style(a.elem, "opacity",
            a.now)
    }, _default:function (a) {
        if (a.elem.style && a.elem.style[a.prop] != null)a.elem.style[a.prop] = a.now + a.unit; else a.elem[a.prop] = a.now
    }}});
    d.each(["width", "height"], function (a, b) {
        d.fx.step[b] = function (e) {
            d.style(e.elem, b, Math.max(0, e.now) + e.unit)
        }
    });
    if (d.expr && d.expr.filters)d.expr.filters.animated = function (a) {
        return d.grep(d.timers,function (b) {
            return a === b.elem
        }).length
    };
    var oc = /^t(?:able|d|h)$/i, ub = /^(?:body|html)$/i;
    d.fn.offset = "getBoundingClientRect"in N.documentElement ? function (a) {
        var b = this[0],
            e;
        if (a)return this.each(function (n) {
            d.offset.setOffset(this, a, n)
        });
        if (!b || !b.ownerDocument)return null;
        if (b === b.ownerDocument.body)return d.offset.bodyOffset(b);
        try {
            e = b.getBoundingClientRect()
        } catch (f) {
        }
        var g = b.ownerDocument, h = g.documentElement;
        if (!e || !d.contains(h, b))return e ? {top:e.top, left:e.left} : {top:0, left:0};
        b = g.body;
        g = fa(g);
        return{top:e.top + (g.pageYOffset || d.support.boxModel && h.scrollTop || b.scrollTop) - (h.clientTop || b.clientTop || 0), left:e.left + (g.pageXOffset || d.support.boxModel && h.scrollLeft ||
            b.scrollLeft) - (h.clientLeft || b.clientLeft || 0)}
    } : function (a) {
        var b = this[0];
        if (a)return this.each(function (V) {
            d.offset.setOffset(this, a, V)
        });
        if (!b || !b.ownerDocument)return null;
        if (b === b.ownerDocument.body)return d.offset.bodyOffset(b);
        var e, f = b.offsetParent, g = b, h = b.ownerDocument, n = h.documentElement, q = h.body;
        e = (h = h.defaultView) ? h.getComputedStyle(b, null) : b.currentStyle;
        for (var t = b.offsetTop, C = b.offsetLeft; (b = b.parentNode) && b !== q && b !== n;) {
            if (d.support.fixedPosition && e.position === "fixed")break;
            e = h ? h.getComputedStyle(b,
                null) : b.currentStyle;
            t -= b.scrollTop;
            C -= b.scrollLeft;
            if (b === f) {
                t += b.offsetTop;
                C += b.offsetLeft;
                if (d.support.doesNotAddBorder && !(d.support.doesAddBorderForTableAndCells && oc.test(b.nodeName))) {
                    t += parseFloat(e.borderTopWidth) || 0;
                    C += parseFloat(e.borderLeftWidth) || 0
                }
                g = f;
                f = b.offsetParent
            }
            if (d.support.subtractsBorderForOverflowNotVisible && e.overflow !== "visible") {
                t += parseFloat(e.borderTopWidth) || 0;
                C += parseFloat(e.borderLeftWidth) || 0
            }
            e = e
        }
        if (e.position === "relative" || e.position === "static") {
            t += q.offsetTop;
            C += q.offsetLeft
        }
        if (d.support.fixedPosition &&
            e.position === "fixed") {
            t += Math.max(n.scrollTop, q.scrollTop);
            C += Math.max(n.scrollLeft, q.scrollLeft)
        }
        return{top:t, left:C}
    };
    d.offset = {bodyOffset:function (a) {
        var b = a.offsetTop, e = a.offsetLeft;
        if (d.support.doesNotIncludeMarginInBodyOffset) {
            b += parseFloat(d.css(a, "marginTop")) || 0;
            e += parseFloat(d.css(a, "marginLeft")) || 0
        }
        return{top:b, left:e}
    }, setOffset:function (a, b, e) {
        var f = d.css(a, "position");
        if (f === "static")a.style.position = "relative";
        var g = d(a), h = g.offset(), n = d.css(a, "top"), q = d.css(a, "left"), t = {}, C = {};
        if ((f ===
            "absolute" || f === "fixed") && d.inArray("auto", [n, q]) > -1) {
            C = g.position();
            f = C.top;
            q = C.left
        } else {
            f = parseFloat(n) || 0;
            q = parseFloat(q) || 0
        }
        if (d.isFunction(b))b = b.call(a, e, h);
        if (b.top != null)t.top = b.top - h.top + f;
        if (b.left != null)t.left = b.left - h.left + q;
        "using"in b ? b.using.call(a, t) : g.css(t)
    }};
    d.fn.extend({position:function () {
        if (!this[0])return null;
        var a = this[0], b = this.offsetParent(), e = this.offset(), f = ub.test(b[0].nodeName) ? {top:0, left:0} : b.offset();
        e.top -= parseFloat(d.css(a, "marginTop")) || 0;
        e.left -= parseFloat(d.css(a,
            "marginLeft")) || 0;
        f.top += parseFloat(d.css(b[0], "borderTopWidth")) || 0;
        f.left += parseFloat(d.css(b[0], "borderLeftWidth")) || 0;
        return{top:e.top - f.top, left:e.left - f.left}
    }, offsetParent:function () {
        return this.map(function () {
            for (var a = this.offsetParent || N.body; a && !ub.test(a.nodeName) && d.css(a, "position") === "static";)a = a.offsetParent;
            return a
        })
    }});
    d.each(["Left", "Top"], function (a, b) {
        var e = "scroll" + b;
        d.fn[e] = function (f) {
            var g, h;
            if (f === c) {
                g = this[0];
                if (!g)return null;
                return(h = fa(g)) ? "pageXOffset"in h ? h[a ? "pageYOffset" :
                    "pageXOffset"] : d.support.boxModel && h.document.documentElement[e] || h.document.body[e] : g[e]
            }
            return this.each(function () {
                if (h = fa(this))h.scrollTo(!a ? f : d(h).scrollLeft(), a ? f : d(h).scrollTop()); else this[e] = f
            })
        }
    });
    d.each(["Height", "Width"], function (a, b) {
        var e = b.toLowerCase();
        d.fn["inner" + b] = function () {
            var f = this[0];
            return f ? f.style ? parseFloat(d.css(f, e, "padding")) : this[e]() : null
        };
        d.fn["outer" + b] = function (f) {
            var g = this[0];
            return g ? g.style ? parseFloat(d.css(g, e, f ? "margin" : "border")) : this[e]() : null
        };
        d.fn[e] =
            function (f) {
                var g = this[0];
                if (!g)return f == null ? null : this;
                if (d.isFunction(f))return this.each(function (q) {
                    var t = d(this);
                    t[e](f.call(this, q, t[e]()))
                });
                if (d.isWindow(g)) {
                    var h = g.document.documentElement["client" + b], n = g.document.body;
                    return g.document.compatMode === "CSS1Compat" && h || n && n["client" + b] || h
                } else if (g.nodeType === 9)return Math.max(g.documentElement["client" + b], g.body["scroll" + b], g.documentElement["scroll" + b], g.body["offset" + b], g.documentElement["offset" + b]); else if (f === c) {
                    g = d.css(g, e);
                    h = parseFloat(g);
                    return d.isNumeric(h) ? h : g
                } else return this.css(e, typeof f === "string" ? f : f + "px")
            }
    });
    k.jQuery = k.$ = d;
    typeof define === "function" && define.amd && define.amd.jQuery && define("jquery", [], function () {
        return d
    })
})(window);
steal.loaded("jquery/jquery.js");
steal("jquery");
steal.loaded("jquery/event/event.js");
steal("jquery/class").then(function () {
    var k = $.isArray, c = function (v) {
            return typeof v === "object" && v !== null && v
        }, r = $.makeArray, l = $.each, o = function (v, F, E) {
            if (v instanceof $.Observe)y([v], E._namespace); else v = k(v) ? new $.Observe.List(v) : new $.Observe(v);
            v.bind("change" + E._namespace, function (w) {
                var H = $.makeArray(arguments);
                w = H.shift();
                H[0] = F === "*" ? E.indexOf(v) + "." + H[0] : F + "." + H[0];
                $.event.trigger(w, H, E)
            });
            return v
        }, y = function (v, F) {
            for (var E, w = 0; w < v.length; w++)(E = v[w]) && E.unbind && E.unbind("change" + F)
        }, I = 0,
        O = null, X = function () {
            if (!O) {
                O = [];
                return true
            }
        }, A = function (v, F, E) {
            if (!v._init)if (O)O.push({t:v, ev:F, args:E}); else return $.event.trigger(F, E, v, true)
        }, s = 0, x = function () {
            var v = O.length, F = O.slice(0), E;
            O = null;
            s++;
            for (var w = 0; w < v; w++) {
                E = F[w];
                $.event.trigger({type:E.ev, batchNum:s}, E.args, E.t)
            }
        }, B = function (v, F, E) {
            v.each(function (w, H) {
                E[w] = c(H) && typeof H[F] == "function" ? H[F]() : H
            });
            return E
        };
    $.Class("jQuery.Observe", {init:function (v) {
        this._data = {};
        this._namespace = ".observe" + ++I;
        this._init = true;
        this.attrs(v);
        delete this._init
    }, attr:function (v, F) {
        if (F === undefined)return this._get(v); else {
            this._set(v, F);
            return this
        }
    }, each:function () {
        return l.apply(null, [this.__get()].concat(r(arguments)))
    }, removeAttr:function (v) {
        v = k(v) ? v : v.split(".");
        var F = v.shift(), E = this._data[F];
        if (v.length)return E.removeAttr(v); else {
            delete this._data[F];
            A(this, "change", [F, "remove", undefined, E]);
            return E
        }
    }, _get:function (v) {
        v = k(v) ? v : ("" + v).split(".");
        var F = this.__get(v.shift());
        return v.length ? F ? F._get(v) : undefined : F
    }, __get:function (v) {
        return v ?
            this._data[v] : this._data
    }, _set:function (v, F) {
        var E = k(v) ? v : ("" + v).split(".");
        v = E.shift();
        var w = this.__get(v);
        if (c(w) && E.length)w._set(E, F); else if (E.length)throw"jQuery.Observe: set a property on an object that does not exist"; else if (F !== w) {
            E = this.__get().hasOwnProperty(v) ? "set" : "add";
            this.__set(v, c(F) ? o(F, v, this) : F);
            A(this, "change", [v, E, F, w]);
            w && y([w], this._namespace)
        }
    }, __set:function (v, F) {
        this._data[v] = F;
        v in this.constructor.prototype || (this[v] = F)
    }, bind:function () {
        $.fn.bind.apply($([this]), arguments);
        return this
    }, unbind:function () {
        $.fn.unbind.apply($([this]), arguments);
        return this
    }, serialize:function () {
        return B(this, "serialize", {})
    }, attrs:function (v, F) {
        if (v === undefined)return B(this, "attrs", {});
        v = $.extend(true, {}, v);
        var E, w = X();
        for (E in this._data) {
            var H = this._data[E], P = v[E];
            if (P === undefined)F && this.removeAttr(E); else {
                if (c(H) && c(P))H.attrs(P, F); else H != P && this._set(E, P);
                delete v[E]
            }
        }
        for (E in v) {
            P = v[E];
            this._set(E, P)
        }
        w && x()
    }});
    var z = jQuery.Observe("jQuery.Observe.List", {init:function (v, F) {
        this.length =
            0;
        this._namespace = ".list" + ++I;
        this._init = true;
        this.bind("change", this.proxy("_changes"));
        this.push.apply(this, r(v || []));
        $.extend(this, F);
        this.comparator && this.sort();
        delete this._init
    }, _changes:function (v, F, E, w, H) {
        if (this.comparator && /^\d+./.test(F)) {
            var P = +/^\d+/.exec(F)[0], ga = this[P], ja = this.sortedIndex(ga);
            if (ja !== P) {
                [].splice.call(this, P, 1);
                [].splice.call(this, ja, 0, ga);
                A(this, "move", [ga, ja, P]);
                v.stopImmediatePropagation();
                A(this, "change", [F.replace(/^\d+/, ja), E, w, H]);
                return
            }
        }
        if (F.indexOf(".") ===
            -1)if (E === "add")A(this, E, [w, +F]); else E === "remove" && A(this, E, [H, +F])
    }, sortedIndex:function (v) {
        var F = v.attr(this.comparator), E = 0, w;
        for (w = 0; w < this.length; w++)if (v === this[w])E = -1; else if (F <= this[w].attr(this.comparator))return w + E;
        return w + E
    }, __get:function (v) {
        return v ? this[v] : this
    }, __set:function (v, F) {
        this[v] = F
    }, serialize:function () {
        return B(this, "serialize", [])
    }, splice:function (v, F) {
        var E = r(arguments), w;
        for (w = 2; w < E.length; w++) {
            var H = E[w];
            if (c(H))E[w] = o(H, "*", this)
        }
        if (F === undefined)F = E[1] = this.length -
            v;
        w = [].splice.apply(this, E);
        if (F > 0) {
            A(this, "change", ["" + v, "remove", undefined, w]);
            y(w, this._namespace)
        }
        E.length > 2 && A(this, "change", ["" + v, "add", E.slice(2), w]);
        return w
    }, attrs:function (v, F) {
        if (v === undefined)return B(this, "attrs", []);
        v = v.slice(0);
        for (var E = Math.min(v.length, this.length), w = X(), H = 0; H < E; H++) {
            var P = this[H], ga = v[H];
            if (c(P) && c(ga))P.attrs(ga, F); else P != ga && this._set(H, ga)
        }
        if (v.length > this.length)this.push(v.slice(this.length)); else v.length < this.length && F && this.splice(v.length);
        w && x()
    }, sort:function (v, F) {
        var E = this.comparator;
        [].sort.apply(this, E ? [function (w, H) {
            w = w[E];
            H = H[E];
            return w === H ? 0 : w < H ? -1 : 1
        }] : []);
        !F && A(this, "reset")
    }}), K = function (v) {
        return v[0] && $.isArray(v[0]) ? v[0] : r(v)
    };
    l({push:"length", unshift:0}, function (v, F) {
        z.prototype[v] = function () {
            for (var E = K(arguments), w = F ? this.length : 0, H = 0; H < E.length; H++) {
                var P = E[H];
                if (c(P))E[H] = o(P, "*", this)
            }
            if (E.length == 1 && this.comparator) {
                this.splice(this.sortedIndex(E[0]), 0, E[0]);
                return this.length
            }
            H = [][v].apply(this, E);
            if (this.comparator && E.length > 1) {
                this.sort(null,
                    true);
                A(this, "reset", [E])
            } else A(this, "change", ["" + w, "add", E, undefined]);
            return H
        }
    });
    l({pop:"length", shift:0}, function (v, F) {
        z.prototype[v] = function () {
            var E = K(arguments), w = F && this.length ? this.length - 1 : 0;
            E = [][v].apply(this, E);
            A(this, "change", ["" + w, "remove", undefined, [E]]);
            E && E.unbind && E.unbind("change" + this._namespace);
            return E
        }
    });
    z.prototype.indexOf = [].indexOf || function (v) {
        return $.inArray(v, this)
    };
    $.O = function (v, F) {
        return k(v) || v instanceof $.Observe.List ? new $.Observe.List(v, F) : new $.Observe(v, F)
    }
});
steal.loaded("jquery/lang/observe/observe.js");
steal("jquery").then(function (k) {
    var c = function (w) {
        return w.replace(/^\/\//, "").replace(/[\/\.]/g, "_")
    }, r = k.makeArray, l = 1, o = k.View = function (w, H, P, ga) {
        if (typeof P === "function") {
            ga = P;
            P = undefined
        }
        var ja = X(H);
        if (ja.length) {
            var M = k.Deferred();
            ja.push(I(w, true));
            k.when.apply(k, ja).then(function (G) {
                var Y = r(arguments), ca = Y.pop()[0];
                if (O(H))H = A(G); else for (var ia in H)if (O(H[ia]))H[ia] = A(Y.shift());
                Y = ca(H, P);
                M.resolve(Y);
                ga && ga(Y)
            });
            return M.promise()
        } else {
            var T;
            ja = typeof ga === "function";
            M = I(w, ja);
            if (ja) {
                T =
                    M;
                M.done(function (G) {
                    ga(G(H, P))
                })
            } else M.done(function (G) {
                T = G(H, P)
            });
            return T
        }
    }, y = function (w, H) {
        if (!w.match(/[^\s]/))throw"$.View ERROR: There is no template or an empty template at " + H;
    }, I = function (w, H) {
        return k.ajax({url:w, dataType:"view", async:H})
    }, O = function (w) {
        return w && k.isFunction(w.always)
    }, X = function (w) {
        var H = [];
        if (O(w))return[w]; else for (var P in w)O(w[P]) && H.push(w[P]);
        return H
    }, A = function (w) {
        return k.isArray(w) && w.length === 3 && w[1] === "success" ? w[0] : w
    };
    k.ajaxTransport("view", function (w, H) {
        var P = H.url;
        w = P.match(/\.[\w\d]+$/);
        var ga, ja, M, T, G = function (ca) {
            ca = ga.renderer(M, ca);
            if (o.cache)o.cached[M] = ca;
            return{view:ca}
        };
        if (ja = document.getElementById(P))w = "." + ja.type.match(/\/(x\-)?(.+)/)[2];
        if (!w) {
            w = o.ext;
            P += o.ext
        }
        M = c(P);
        if (P.match(/^\/\//)) {
            var Y = P.substr(2);
            P = typeof steal === "undefined" ? (P = "/" + Y) : steal.root.mapJoin(Y)
        }
        ga = o.types[w];
        return{send:function (ca, ia) {
            if (o.cached[M])return ia(200, "success", {view:o.cached[M]}); else if (ja)ia(200, "success", G(ja.innerHTML)); else T = k.ajax({async:H.async,
                url:P, dataType:"text", error:function () {
                    y("", P);
                    ia(404)
                }, success:function (ma) {
                    y(ma, P);
                    ia(200, "success", G(ma))
                }})
        }, abort:function () {
            T && T.abort()
        }}
    });
    k.extend(o, {hookups:{}, hookup:function (w) {
        var H = ++l;
        o.hookups[H] = w;
        return H
    }, cached:{}, cache:true, register:function (w) {
        this.types["." + w.suffix] = w;
        window.steal && steal.type(w.suffix + " view js", function (H, P) {
            var ga = o.types["." + H.type], ja = c(H.rootSrc);
            H.text = ga.script(ja, H.text);
            P()
        })
    }, types:{}, ext:".ejs", registerScript:function (w, H, P) {
        return"$.View.preload('" +
            H + "'," + o.types["." + w].script(H, P) + ");"
    }, preload:function (w, H) {
        o.cached[w] = function (P, ga) {
            return H.call(P, P, ga)
        }
    }});
    window.steal && steal.type("view js", function (w, H) {
        var P = o.types["." + w.type], ga = c(w.rootSrc);
        w.text = "steal('" + (P.plugin || "jquery/view/" + w.type) + "').then(function($){$.View.preload('" + ga + "'," + w.text + ");\n})";
        H()
    });
    var s, x, B, z, K, v, F, E = {val:true, text:true};
    s = function (w) {
        var H = k.fn[w];
        k.fn[w] = function () {
            var P = r(arguments), ga, ja, M = this;
            if (O(P[0])) {
                P[0].done(function (T) {
                    x.call(M, [T], H)
                });
                return this
            } else if (B(P)) {
                if (ga =
                    v(P)) {
                    ja = P[ga];
                    P[ga] = function (T) {
                        x.call(M, [T], H);
                        ja.call(M, T)
                    };
                    o.apply(o, P);
                    return this
                }
                P = o.apply(o, P);
                if (O(P)) {
                    P.done(function (T) {
                        x.call(M, [T], H)
                    });
                    return this
                } else P = [P]
            }
            return E[w] ? H.apply(this, P) : x.call(this, P, H)
        }
    };
    x = function (w, H) {
        var P;
        for (var ga in o.hookups)break;
        if (ga && w[0] && z(w[0])) {
            P = o.hookups;
            o.hookups = {};
            w[0] = k(w[0])
        }
        H = H.apply(this, w);
        P && F(w[0], P);
        return H
    };
    B = function (w) {
        var H = typeof w[1];
        return typeof w[0] == "string" && (H == "object" || H == "function") && !K(w[1])
    };
    K = function (w) {
        return w.nodeType ||
            w.jquery
    };
    z = function (w) {
        if (K(w))return true; else if (typeof w === "string") {
            w = k.trim(w);
            return w.substr(0, 1) === "<" && w.substr(w.length - 1, 1) === ">" && w.length >= 3
        } else return false
    };
    v = function (w) {
        return typeof w[3] === "function" ? 3 : typeof w[2] === "function" && 2
    };
    F = function (w, H) {
        var P, ga = 0, ja, M;
        w = w.filter(function () {
            return this.nodeType != 3
        });
        w = w.add("[data-view-id]", w);
        for (P = w.length; ga < P; ga++)if (w[ga].getAttribute && (ja = w[ga].getAttribute("data-view-id")) && (M = H[ja])) {
            M(w[ga], ja);
            delete H[ja];
            w[ga].removeAttribute("data-view-id")
        }
        k.extend(o.hookups,
            H)
    };
    k.fn.hookup = function () {
        var w = o.hookups;
        o.hookups = {};
        F(this, w);
        return this
    };
    k.each(["prepend", "append", "after", "before", "text", "html", "replaceWith", "val"], function (w, H) {
        s(H)
    })
});
steal.loaded("jquery/view/view.js");
steal("jquery/lang/string", function (k) {
    k.String.rsplit = function (c, r) {
        for (var l = r.exec(c), o = [], y; l !== null;) {
            y = l.index;
            if (y !== 0) {
                o.push(c.substring(0, y));
                c = c.slice(y)
            }
            o.push(l[0]);
            c = c.slice(l[0].length);
            l = r.exec(c)
        }
        c !== "" && o.push(c);
        return o
    }
});
steal.loaded("jquery/lang/string/rsplit/rsplit.js");
hljs.XML_COMMENT = {className:"comment", begin:"<!--", end:"--\>"};
hljs.XML_ATTR = {className:"attribute", begin:"\\s[a-zA-Z\\:-]+=", end:"^", contains:["value"]};
hljs.XML_VALUE_QUOT = {className:"value", begin:'"', end:'"'};
hljs.XML_VALUE_APOS = {className:"value", begin:"'", end:"'"};
hljs.LANGUAGES.xml = {defaultMode:{contains:["pi", "comment", "cdata", "tag"]}, case_insensitive:true, modes:[
    {className:"pi", begin:"<\\?", end:"\\?>", relevance:10},
    hljs.XML_COMMENT,
    {className:"cdata", begin:"<\\!\\[CDATA\\[", end:"\\]\\]>"},
    {className:"tag", begin:"</?", end:">", contains:["title", "tag_internal"], relevance:1.5},
    {className:"title", begin:"[A-Za-z:_][A-Za-z0-9\\._:-]+", end:"^", relevance:0},
    {className:"tag_internal", begin:"^", endsWithParent:true, noMarkup:true, contains:["attribute"], relevance:0, illegal:"[\\+\\.]"},
    hljs.XML_ATTR,
    hljs.XML_VALUE_QUOT,
    hljs.XML_VALUE_APOS
]};
hljs.HTML_TAGS = {code:1, kbd:1, font:1, noscript:1, style:1, img:1, title:1, menu:1, tt:1, tr:1, param:1, li:1, tfoot:1, th:1, input:1, td:1, dl:1, blockquote:1, fieldset:1, big:1, dd:1, abbr:1, optgroup:1, dt:1, button:1, isindex:1, p:1, small:1, div:1, dir:1, em:1, frame:1, meta:1, sub:1, bdo:1, label:1, acronym:1, sup:1, body:1, xml:1, basefont:1, base:1, br:1, address:1, strong:1, legend:1, ol:1, script:1, caption:1, s:1, col:1, h2:1, h3:1, h1:1, h6:1, h4:1, h5:1, table:1, select:1, noframes:1, span:1, area:1, dfn:1, strike:1, cite:1, thead:1, head:1, option:1,
    form:1, hr:1, "var":1, link:1, b:1, colgroup:1, ul:1, applet:1, del:1, iframe:1, pre:1, frameset:1, ins:1, tbody:1, html:1, samp:1, map:1, object:1, a:1, xmlns:1, center:1, textarea:1, i:1, q:1, u:1};
hljs.HTML_DOCTYPE = {className:"doctype", begin:"<!DOCTYPE", end:">", relevance:10};
hljs.HTML_ATTR = {className:"attribute", begin:"\\s[a-zA-Z\\:-]+=", end:"^", contains:["value"]};
hljs.HTML_SHORT_ATTR = {className:"attribute", begin:" [a-zA-Z]+", end:"^"};
hljs.HTML_VALUE = {className:"value", begin:"[a-zA-Z0-9]+", end:"^"};
hljs.LANGUAGES.html = {defaultMode:{contains:["tag", "comment", "doctype", "vbscript"]}, case_insensitive:true, modes:[hljs.XML_COMMENT, hljs.HTML_DOCTYPE, {className:"tag", lexems:[hljs.IDENT_RE], keywords:hljs.HTML_TAGS, begin:"<style", end:">", contains:["attribute"], illegal:"[\\+\\.]", starts:"css"}, {className:"tag", lexems:[hljs.IDENT_RE], keywords:hljs.HTML_TAGS, begin:"<script", end:">", contains:["attribute"], illegal:"[\\+\\.]", starts:"javascript"}, {className:"tag", lexems:[hljs.IDENT_RE], keywords:hljs.HTML_TAGS,
    begin:"<[A-Za-z/]", end:">", contains:["attribute"], illegal:"[\\+\\.]"}, {className:"css", end:"</style>", returnEnd:true, subLanguage:"css"}, {className:"javascript", end:"<\/script>", returnEnd:true, subLanguage:"javascript"}, hljs.HTML_ATTR, hljs.HTML_SHORT_ATTR, hljs.XML_VALUE_QUOT, hljs.XML_VALUE_APOS, hljs.HTML_VALUE, {className:"vbscript", begin:"<%", end:"%>", subLanguage:"vbscript"}]};
steal.loaded("documentjs/jmvcdoc/highlight/languages/www.js");
hljs.LANGUAGES.javascript = {defaultMode:{lexems:[hljs.UNDERSCORE_IDENT_RE], contains:["string", "comment", "number", "regexp_container", "function"], keywords:{keyword:{"in":1, "if":1, "for":1, "while":1, "finally":1, "var":1, "new":1, "function":1, "do":1, "return":1, "void":1, "else":1, "break":1, "catch":1, "instanceof":1, "with":1, "throw":1, "case":1, "default":1, "try":1, "this":1, "switch":1, "continue":1, "typeof":1, "delete":1}, literal:{"true":1, "false":1, "null":1}}}, modes:[hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE,
    hljs.C_NUMBER_MODE, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, hljs.BACKSLASH_ESCAPE, {className:"regexp_container", begin:"(" + hljs.RE_STARTERS_RE + "|case|return|throw)\\s*", end:"^", noMarkup:true, lexems:[hljs.IDENT_RE], keywords:{"return":1, "throw":1, "case":1}, contains:["comment", "regexp"], relevance:0}, {className:"regexp", begin:"/.*?[^\\\\/]/[gim]*", end:"^"}, {className:"function", begin:"\\bfunction\\b", end:"{", lexems:[hljs.UNDERSCORE_IDENT_RE], keywords:{"function":1}, contains:["title", "params"]}, {className:"title",
        begin:"[A-Za-z$_][0-9A-Za-z$_]*", end:"^"}, {className:"params", begin:"\\(", end:"\\)", contains:["string", "comment"]}]};
steal.loaded("documentjs/jmvcdoc/highlight/languages/javascript.js");
steal("jquery/dom/cookie", function () {
    Favorites = {toggle:function (k) {
        var c = this.findAll(), r = Favorites.isFavorite(k);
        if (r)for (var l = 0; l < c.length; l++) {
            if (c[l].name == k.name) {
                c.splice(l, 1);
                break
            }
        } else c.push(k);
        fav = $.toJSON(c);
        $.cookie("favorites", fav, {expires:364});
        return!r
    }, findAll:function () {
        var k = $.cookie("favorites");
        return k ? eval("(" + k + ")") : []
    }, isFavorite:function (k) {
        for (var c = Favorites.findAll(), r = 0; r < c.length; r++)if (c[r].name == k.name)return true;
        return false
    }}
});
steal.loaded("documentjs/jmvcdoc/models/favorites.js");
steal("jquery/lang/json", function () {
    jQuery.cookie = function (k, c, r) {
        if (typeof c != "undefined") {
            r = r || {};
            if (c === null) {
                c = "";
                r.expires = -1
            }
            if (typeof c == "object" && jQuery.toJSON)c = jQuery.toJSON(c);
            var l = "";
            if (r.expires && (typeof r.expires == "number" || r.expires.toUTCString)) {
                if (typeof r.expires == "number") {
                    l = new Date;
                    l.setTime(l.getTime() + r.expires * 24 * 60 * 60 * 1E3)
                } else l = r.expires;
                l = "; expires=" + l.toUTCString()
            }
            var o = r.path ? "; path=" + r.path : "", y = r.domain ? "; domain=" + r.domain : "";
            r = r.secure ? "; secure" : "";
            document.cookie =
                [k, "=", encodeURIComponent(c), l, o, y, r].join("")
        } else {
            c = null;
            if (document.cookie && document.cookie != "") {
                r = document.cookie.split(";");
                for (l = 0; l < r.length; l++) {
                    o = jQuery.trim(r[l]);
                    if (o.substring(0, k.length + 1) == k + "=") {
                        c = decodeURIComponent(o.substring(k.length + 1));
                        break
                    }
                }
            }
            if (jQuery.evalJSON && c && c.match(/^\s*\{/))try {
                c = jQuery.evalJSON(c)
            } catch (I) {
            }
            return c
        }
    }
});
steal.loaded("jquery/dom/cookie/cookie.js");
steal("jquery", function (k) {
    k.toJSON = function (l, o, y, I) {
        if (typeof JSON == "object" && JSON.stringify)return JSON.stringify(l, o, y);
        if (!I && k.isFunction(o))l = o("", l);
        if (typeof y == "number")y = "          ".substring(0, y);
        y = typeof y == "string" ? y.substring(0, 10) : "";
        var O = typeof l;
        if (l === null)return"null";
        if (!(O == "undefined" || O == "function")) {
            if (O == "number" || O == "boolean")return l + "";
            if (O == "string")return k.quoteString(l);
            if (O == "object") {
                if (typeof l.toJSON == "function")return k.toJSON(l.toJSON(), o, y, true);
                if (l.constructor ===
                    Date) {
                    y = l.getUTCMonth() + 1;
                    if (y < 10)y = "0" + y;
                    I = l.getUTCDate();
                    if (I < 10)I = "0" + I;
                    var X = l.getUTCFullYear(), A = l.getUTCHours();
                    if (A < 10)A = "0" + A;
                    var s = l.getUTCMinutes();
                    if (s < 10)s = "0" + s;
                    var x = l.getUTCSeconds();
                    if (x < 10)x = "0" + x;
                    l = l.getUTCMilliseconds();
                    if (l < 100)l = "0" + l;
                    if (l < 10)l = "0" + l;
                    return'"' + X + "-" + y + "-" + I + "T" + A + ":" + s + ":" + x + "." + l + 'Z"'
                }
                I = k.isFunction(o) ? function (K, v) {
                    return o(K, v)
                } : function (K, v) {
                    return v
                };
                X = y ? "\n" : "";
                x = y ? " " : "";
                if (l.constructor === Array) {
                    A = [];
                    for (s = 0; s < l.length; s++)A.push((k.toJSON(I(s, l[s]), o,
                        y, true) || "null").replace(/^/gm, y));
                    return"[" + X + A.join("," + X) + X + "]"
                }
                var B = [];
                if (k.isArray(o))A = k.map(o, function (K) {
                    return typeof K == "string" || typeof K == "number" ? K + "" : null
                });
                for (s in l) {
                    var z;
                    O = typeof s;
                    if (!(A && k.inArray(s + "", A) == -1)) {
                        if (O == "number")O = '"' + s + '"'; else if (O == "string")O = k.quoteString(s); else continue;
                        z = k.toJSON(I(s, l[s]), o, y, true);
                        typeof z != "undefined" && B.push((O + ":" + x + z).replace(/^/gm, y))
                    }
                }
                return"{" + X + B.join("," + X) + X + "}"
            }
        }
    };
    k.evalJSON = function (l) {
        if (typeof JSON == "object" && JSON.parse)return JSON.parse(l);
        return eval("(" + l + ")")
    };
    k.secureEvalJSON = function (l) {
        if (typeof JSON == "object" && JSON.parse)return JSON.parse(l);
        var o = l;
        o = o.replace(/\\["\\\/bfnrtu]/g, "@");
        o = o.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]");
        o = o.replace(/(?:^|:|,)(?:\s*\[)+/g, "");
        if (/^[\],:{}\s]*$/.test(o))return eval("(" + l + ")"); else throw new SyntaxError("Error parsing JSON, source is not valid.");
    };
    k.quoteString = function (l) {
        if (l.match(c))return'"' + l.replace(c, function (o) {
            var y = r[o];
            if (typeof y === "string")return y;
            y = o.charCodeAt();
            return"\\u00" + Math.floor(y / 16).toString(16) + (y % 16).toString(16)
        }) + '"';
        return'"' + l + '"'
    };
    var c = /["\\\x00-\x1f\x7f-\x9f]/g, r = {"\u0008":"\\b", "\t":"\\t", "\n":"\\n", "\u000c":"\\f", "\r":"\\r", '"':'\\"', "\\":"\\\\"}
});
steal.loaded("jquery/lang/json/json.js");
steal("jquery/controller", "jquery/view/ejs").then("./demo.ejs", function () {
    jQuery.Controller("DemoController", {}, {init:function () {
        var k = this, c = 320, r = "", l = "", o;
        this.element.html("//documentjs/jmvcdoc/demo/demo.ejs", {});
        var y = steal.root.join(this.element.attr("data-demo-src")), I = this.find("iframe");
        I.bind("load", function () {
            var O = $(this.contentWindow.document.body);
            k.find(".demo_content").css({padding:"5px"});
            r = this.contentWindow.DEMO_HTML || O.find("#demo-html").html();
            k.find(".html_content").html('<pre><code class="html"></code></pre>').find("code").text($.trim(r)).highlight();
            O.find("#demo-instructions").hide();
            l = O.find("#demo-source").html();
            k.find(".source_content").html('<pre><code class="javascript"></code></pre>').find("code").text($.trim(l)).highlight();
            if (!l) {
                $("script", I[0].contentWindow.document).each(function (A, s) {
                    if (!s.text.match(/steal.end()/)) {
                        o = s.text;
                        if (!s.src.match(/steal.js/))return false
                    }
                });
                k.find(".source_content").html('<pre><code class="javascript"></code></pre>').find("code").text($.trim(o)).highlight()
            }
            var X = function () {
                setTimeout(function () {
                    c = O.outerHeight();
                    I.height(c + 50);
                    k.find(".demo_content").height(c + 55)
                }, 200)
            };
            this.contentWindow.jQuery ? this.contentWindow.jQuery(X) : X()
        });
        I.attr("src", y)
    }, ".header click":function (k) {
        k.next().toggle("slow");
        k.find("span").toggleClass("ui-icon-triangle-1-s").toggleClass("ui-icon-triangle-1-e")
    }})
});
steal.loaded("documentjs/jmvcdoc/demo/demo.js");
steal("jquery/view/ejs").then(function (k) {
    k.View.preload("documentjs_jmvcdoc_demo_demo_ejs", jQuery.EJS(function (c, r) {
        try {
            with (r)with (c) {
                c = [];
                c.push('<div class="demo">\n');
                c.push('  <h3 class="demo_header header reset">\n');
                c.push('    <span class="ui-icon ui-icon-triangle-1-s"/>\n');
                c.push('    <a href="javascript://">Demo</a>\n');
                c.push("  </h3>\n");
                c.push('  <div class="demo_content content">\n');
                c.push('    <iframe height="100%" frameborder=0></iframe>\n');
                c.push("  </div>\n");
                c.push('  <h3 class="html_header header reset">\n');
                c.push('    <span class="ui-icon ui-icon-triangle-1-e"/>\n');
                c.push('    <a href="javascript://">HTML</a>\n');
                c.push("  </h3>\n");
                c.push('  <div class="html_content content" style="display: none">\n');
                c.push("    HTML content\n");
                c.push("  </div>\n");
                c.push('  <h3 class="source_header header reset">\n');
                c.push('    <span class="ui-icon ui-icon-triangle-1-e"/>\n');
                c.push('    <a href="javascript://">Source</a>\n');
                c.push("  </h3>\n");
                c.push('  <div class="source_content content" style="display: none">\n');
                c.push("    Source content\n");
                c.push("  </div>\n");
                c.push("</div>\n");
                c.push("\n");
                return c.join("")
            }
        } catch (l) {
            l.lineNumber = null;
            throw l;
        }
    }))
});
steal.loaded("documentjs/jmvcdoc/demo/demo.ejs");
steal("jquery/view/ejs").then(function (k) {
    k.View.preload("documentjs_jmvcdoc_content_views_attribute_ejs", jQuery.EJS(function (c, r) {
        try {
            with (r)with (c) {
                c = [];
                c.push(jQuery.EJS.text(view("//documentjs/jmvcdoc/content/views/top.ejs", this)));
                c.push("\n");
                c.push(jQuery.EJS.text(link(comment)));
                return c.join("")
            }
        } catch (l) {
            l.lineNumber = null;
            throw l;
        }
    }))
});
steal.loaded("documentjs/jmvcdoc/content/views/attribute.ejs");
steal("jquery/view/ejs").then(function (k) {
    k.View.preload("documentjs_jmvcdoc_content_views_class_ejs", jQuery.EJS(function (c, r) {
        try {
            with (r)with (c) {
                c = [];
                c.push(jQuery.EJS.text(view("//documentjs/jmvcdoc/content/views/top.ejs", this)));
                c.push("\n");
                c.push("\n");
                c.push(jQuery.EJS.text(link(this.comment)));
                c.push("\n");
                if (this.construct) {
                    c.push("\n");
                    c.push("\t<h2>Constructor</h2>\n");
                    c.push("\t");
                    c.push(jQuery.EJS.text(link(this.construct)));
                    c.push("\n")
                } else if (this.params || this.ret) {
                    c.push("\n");
                    c.push("\t<h2>API</h2>\n")
                }
                c.push("\n");
                if (this.params || this.ret) {
                    c.push("\n");
                    c.push("<pre class='signiture'><code>");
                    c.push(jQuery.EJS.clean(signiture()));
                    c.push("</code></pre>\n")
                }
                c.push("\n");
                c.push("\n");
                c.push("  <div class='params'>\n");
                c.push("  ");
                if (this.params) {
                    c.push("\n");
                    c.push("\t  ");
                    for (var l in this.params) {
                        var o = this.params[l];
                        c.push("  \n");
                        c.push("\t      <div class='param ");
                        c.push(jQuery.EJS.clean(o.optional ? "optional" : ""));
                        c.push("'>\n");
                        c.push("\t          <label>");
                        c.push(jQuery.EJS.clean(o.name));
                        c.push("</label>\n");
                        c.push("\t          <code>{");
                        c.push(jQuery.EJS.clean((o.optional ? "optional:" : "") + "" + o.type));
                        c.push("}</code>\n");
                        c.push("\t\t\t  ");
                        c.push(jQuery.EJS.text(o.description));
                        c.push("\n");
                        c.push("\t      </div>\n");
                        c.push("\t ")
                    }
                    c.push("\n");
                    c.push(" ")
                }
                c.push("\n");
                c.push(" ");
                if (this.ret && this.ret.type != "undefined") {
                    c.push("\n");
                    c.push("     <div class='return'>\n");
                    c.push("         <label>returns</label> \n");
                    c.push("         <code>{");
                    c.push(jQuery.EJS.clean(this.ret.type));
                    c.push("}</code>\n");
                    c.push("\t\t ");
                    c.push(jQuery.EJS.text(this.ret.description));
                    c.push("\n");
                    c.push("     </div>\n");
                    c.push(" ")
                }
                c.push("   \n");
                c.push(" \n");
                c.push(" </div>\n");
                c.push("\n");
                return c.join("")
            }
        } catch (y) {
            y.lineNumber = null;
            throw y;
        }
    }))
});
steal.loaded("documentjs/jmvcdoc/content/views/class.ejs");
steal("jquery/view/ejs").then(function (k) {
    k.View.preload("documentjs_jmvcdoc_content_views_constructor_ejs", jQuery.EJS(function (c, r) {
        try {
            with (r)with (c) {
                c = [];
                c.push(jQuery.EJS.text(view("//documentjs/jmvcdoc/content/views/top.ejs", this)));
                c.push("\n");
                c.push("\n");
                c.push(jQuery.EJS.text(link(comment)));
                c.push("\n");
                c.push("<h2>Constructor</h2>\n");
                c.push(jQuery.EJS.text(this.init));
                c.push("\n");
                c.push("<pre class='signiture'><code>");
                c.push(jQuery.EJS.clean(signiture()));
                c.push("</code></pre>\n");
                c.push("\n");
                c.push("  <div class='params'>\n");
                c.push("  \n");
                c.push("  ");
                for (var l in this.params) {
                    var o = this.params[l];
                    c.push("  \n");
                    c.push("      <div class='param ");
                    c.push(jQuery.EJS.clean(o.optional ? "optional" : ""));
                    c.push("'>\n");
                    c.push("          <label>");
                    c.push(jQuery.EJS.clean(o.name));
                    c.push("</label>\n");
                    c.push("          <code>{");
                    c.push(jQuery.EJS.clean((o.optional ? "optional:" : "") + "" + o.type));
                    c.push("}</code> - ");
                    c.push(jQuery.EJS.clean(link(o.description)));
                    c.push("\n");
                    c.push("      </div>\n");
                    c.push(" ")
                }
                c.push("\n");
                c.push("\n");
                c.push(" ");
                if (this.ret && this.ret.type != "undefined") {
                    c.push("\n");
                    c.push("     <div class='return'>\n");
                    c.push("         <label>returns</label> \n");
                    c.push("         <code>{");
                    c.push(jQuery.EJS.clean(this.ret.type));
                    c.push("}</code> - ");
                    c.push(jQuery.EJS.text(link(this.ret.description)));
                    c.push("\n");
                    c.push("     </div>\n");
                    c.push(" ")
                }
                c.push("   \n");
                c.push(" \n");
                c.push(" </div>");
                return c.join("")
            }
        } catch (y) {
            y.lineNumber = null;
            throw y;
        }
    }))
});
steal.loaded("documentjs/jmvcdoc/content/views/constructor.ejs");
steal("jquery/view/ejs").then(function (k) {
    k.View.preload("documentjs_jmvcdoc_content_views_favorite_ejs", jQuery.EJS(function (c, r) {
        try {
            with (r)with (c) {
                c = [];
                c.push("You can add  favorites by clicking the \n");
                c.push('Favorite button (<span class="favorite favoriteoff" style="background-position: center center">&nbsp;&nbsp;&nbsp;</span>) by page\'s title.  \n');
                c.push("<br/>After adding favorites, they will appear on the left.");
                return c.join("")
            }
        } catch (l) {
            l.lineNumber = null;
            throw l;
        }
    }))
});
steal.loaded("documentjs/jmvcdoc/content/views/favorite.ejs");
steal("jquery/view/ejs").then(function (k) {
    k.View.preload("documentjs_jmvcdoc_content_views_function_ejs", jQuery.EJS(function (c, r) {
        try {
            with (r)with (c) {
                c = [];
                c.push(jQuery.EJS.text(view("//documentjs/jmvcdoc/content/views/top.ejs", this)));
                c.push("\n");
                c.push(" <div class='comment'>");
                c.push(jQuery.EJS.text(link(this.comment)));
                c.push("</div>\n");
                c.push(" <h2>API</h2>\n");
                c.push(" <pre class='signiture'><code>");
                c.push(jQuery.EJS.clean(signiture()));
                c.push("</code></pre>\n");
                c.push("  \n");
                c.push("  <div class='params'>\n");
                c.push("  \n");
                c.push("  ");
                for (var l in this.params) {
                    var o = this.params[l];
                    c.push("  \n");
                    c.push("      <div class='param ");
                    c.push(jQuery.EJS.clean(o.optional ? "optional" : ""));
                    c.push("'>\n");
                    c.push("          <label>");
                    c.push(jQuery.EJS.clean(o.name));
                    c.push("</label>\n");
                    c.push("          <code>{");
                    c.push(jQuery.EJS.clean((o.optional ? "optional:" : "") + "" + o.type));
                    c.push("}");
                    c.push(jQuery.EJS.clean(o["default"] ? " defaults to " + o["default"] : ""));
                    c.push("</code> \n");
                    c.push("\t\t   ");
                    c.push(jQuery.EJS.text(link(o.description)));
                    c.push("\n");
                    c.push("      </div>\n");
                    c.push(" ")
                }
                c.push("\n");
                c.push("\n");
                c.push(" ");
                if (this.ret && this.ret.type) {
                    c.push("\n");
                    c.push("     <div class='return'>\n");
                    c.push("         <label>returns</label> \n");
                    c.push("         <code>{");
                    c.push(jQuery.EJS.clean(this.ret.type));
                    c.push("}</code> \n");
                    c.push("\t\t ");
                    c.push(jQuery.EJS.text(link(this.ret.description)));
                    c.push("\n");
                    c.push("     </div>\n");
                    c.push(" ")
                }
                c.push("   \n");
                c.push(" \n");
                c.push(" </div>");
                return c.join("")
            }
        } catch (y) {
            y.lineNumber =
                null;
            throw y;
        }
    }))
});
steal.loaded("documentjs/jmvcdoc/content/views/function.ejs");
steal("jquery/view/ejs").then(function (k) {
    k.View.preload("documentjs_jmvcdoc_content_views_page_ejs", jQuery.EJS(function (c, r) {
        try {
            with (r)with (c) {
                c = [];
                if (name != "index") {
                    c.push("\n");
                    c.push(jQuery.EJS.text(view("//documentjs/jmvcdoc/content/views/top.ejs", this)));
                    c.push("\n")
                }
                c.push("\n");
                c.push(jQuery.EJS.text(link(comment)));
                return c.join("")
            }
        } catch (l) {
            l.lineNumber = null;
            throw l;
        }
    }))
});
steal.loaded("documentjs/jmvcdoc/content/views/page.ejs");
steal("jquery/view/ejs").then(function (k) {
    k.View.preload("documentjs_jmvcdoc_content_views_results_ejs", jQuery.EJS(function (c, r) {
        try {
            with (r)with (c) {
                c = [];
                r = "";
                var l, o, y;
                c.push("\n");
                c.push("\n");
                if (selected && selected.length) {
                    c.push("\n");
                    c.push("\t<div id='selected'>\n");
                    c.push("\t\t    ");
                    for (var I = 0; I < selected.length; I++) {
                        c.push("\n");
                        c.push("\t\t\t\t");
                        o = selected[I];
                        y = o.title ? o.title : o.name;
                        l = calculateDisplay(r, y);
                        name = normalizeName(o.name);
                        c.push("\n");
                        c.push('\t\t<div class="content">\n');
                        c.push('\t\t\t    <a href="#&who=');
                        c.push(jQuery.EJS.clean(name));
                        c.push("\" class='selected choice ");
                        c.push(jQuery.EJS.clean(o.type));
                        c.push("' style=\"padding-left: ");
                        c.push(jQuery.EJS.clean(l.length * 20));
                        c.push('px">\n');
                        c.push("\t\t\t    \t<span class='remove' title=\"close\"></span>\n");
                        c.push("\t\t\t\t\t");
                        c.push(jQuery.EJS.clean(l.name.replace("jQuery.", "$.")));
                        c.push("\n");
                        c.push("\t\t\t\t\t\n");
                        c.push("\t\t\t\t</a>\n");
                        c.push("\t\t\t\t");
                        r = y;
                        c.push("\n");
                        c.push("\t\t</div>\n");
                        c.push("\t\t\t");
                        if (I < selected.length - 1) {
                            c.push("\n");
                            c.push('\t\t<div class="spacer"><div>&nbsp;</div></div>\n');
                            c.push("\t\t\t")
                        }
                        c.push("\n");
                        c.push("\t\t\t")
                    }
                    c.push("\n");
                    c.push("\t</div>\n")
                }
                c.push("\n");
                c.push("<div id='results' style=\"display: ");
                c.push(jQuery.EJS.clean(hide ? "none" : "block"));
                c.push('">\n');
                c.push('\t<div class="content">\n');
                c.push("\t    ");
                for (I = 0; I < list.length; I++) {
                    c.push("\n");
                    c.push("\t\t\t");
                    o = list[I];
                    if (!o.hide) {
                        y = o.title ? o.title : o.name;
                        l = calculateDisplay(r, y);
                        name = normalizeName(o.name);
                        c.push("\n");
                        c.push('\t\t    <a href="');
                        c.push(jQuery.EJS.clean(o.type == "prototype" || o.type == "static" || o.type == "getters" || o.type == "setters" ? "javascript://" : "#&who=" + name));
                        c.push("\" class='result choice ");
                        c.push(jQuery.EJS.clean(o.type));
                        c.push("' style=\"padding-left: ");
                        c.push(jQuery.EJS.clean(l.length * 20));
                        c.push('px">\n');
                        c.push("\t\t    \t");
                        c.push(jQuery.EJS.clean(l.name.replace("jQuery.", "$.")));
                        c.push("\n");
                        c.push("\t\t\t</a>\n");
                        c.push("\t\t\t");
                        r = y;
                        c.push("\n");
                        c.push("\t\t")
                    }
                }
                c.push("\n");
                c.push("\t</div>\n");
                c.push("</div>\n");
                c.push("\n");
                c.push("\n");
                return c.join("")
            }
        } catch (O) {
            O.lineNumber =
                null;
            throw O;
        }
    }))
});
steal.loaded("documentjs/jmvcdoc/content/views/results.ejs");
steal("jquery/view/ejs").then(function (k) {
    k.View.preload("documentjs_jmvcdoc_content_views_top_ejs", jQuery.EJS(function (c, r) {
        try {
            with (r)with (c) {
                c = [];
                c.push("<div class='top'>\n");
                c.push('\t<div class="content">\n');
                c.push("\t    <h1>");
                c.push(jQuery.EJS.clean(this.title || this.alias || this.name.match(/((\w+)\.(\w+)\.(\w+)$)/i)[1] || name.replace(/~/g, ".")));
                c.push("&nbsp;\n");
                c.push("\t    \t<span class='");
                c.push(jQuery.EJS.clean(type));
                c.push(' type\'><span class="typeEnd">');
                c.push(jQuery.EJS.clean(type));
                c.push("</span></span>&nbsp;\n");
                c.push('\t    \t<span class="favorite favorite');
                c.push(jQuery.EJS.clean(isFavorite ? "on" : "off"));
                c.push('">&nbsp;&nbsp;&nbsp;</span></h1>\n');
                c.push("\t    ");
                if (this.inherits) {
                    c.push("\n");
                    c.push("\t    <div class='inherits'>\n");
                    c.push("\t        inherits: ");
                    c.push(jQuery.EJS.text(linkOpen(this.inherits)));
                    c.push("\n");
                    c.push("\t    </div>\n");
                    c.push("\t    ")
                }
                c.push("\n");
                c.push("\t    ");
                if (this.tags) {
                    c.push("\n");
                    c.push("\t    <div class='tags'>\n");
                    c.push("\t        tags: ");
                    c.push(jQuery.EJS.text(linkTags(this.tags)));
                    c.push("\n");
                    c.push("\t    </div>\n");
                    c.push("\t    ")
                }
                c.push("\n");
                c.push("\t    ");
                if (this.plugin) {
                    c.push("\n");
                    c.push("\t    <div class='plugin'>\n");
                    c.push("\t        plugin: ");
                    c.push(jQuery.EJS.clean(this.plugin));
                    c.push("\n");
                    c.push("\t    </div>\n");
                    c.push("\t    ")
                }
                c.push("\n");
                c.push("\t\t");
                if (this.download) {
                    c.push("\n");
                    c.push("\t    <div class='download'>\n");
                    c.push("\t        download: <a href='");
                    c.push(jQuery.EJS.clean(this.download));
                    c.push("'> ");
                    c.push(jQuery.EJS.text(this.title || name.replace(/~/g, ".")));
                    c.push("</a>\n");
                    c.push("\t    </div>\n");
                    c.push("\t    ")
                }
                c.push("\n");
                c.push("\t\t");
                if (this.test) {
                    c.push("\n");
                    c.push("\t    <div class='test'>\n");
                    c.push("\t        test: <a href='");
                    c.push(jQuery.EJS.clean(steal.root ? steal.root.join(this.test) : this.test));
                    c.push("'>");
                    c.push(jQuery.EJS.clean(this.test.match(/[^\/]*$/)[0]));
                    c.push("</a>\n");
                    c.push("\t    </div>\n");
                    c.push("\t    ")
                }
                c.push("\n");
                c.push("\t\t");
                if (this.line !== undefined && window.DOCS_SRC_MAP) {
                    c.push("\n");
                    c.push("\t\t\t<a href='");
                    c.push(jQuery.EJS.text(source(this)));
                    c.push("'>Source</a>\n");
                    c.push("\t\t")
                }
                c.push("\n");
                c.push("\t</div>\t\n");
                c.push("</div>\n");
                return c.join("")
            }
        } catch (l) {
            l.lineNumber = null;
            throw l;
        }
    }))
});
steal.loaded("documentjs/jmvcdoc/content/views/top.ejs");
steal("jquery/controller", "mxui/layout/positionable", function () {
    $.Controller("Tooltip", {init:function () {
        this.element.mxui_layout_positionable({my:"left top", at:"right top", offset:"0 -5"})
    }, update:function (k) {
        this._super(k);
        this.element.html(k.message);
        this.element.trigger("show", k.of)
    }})
});
steal.loaded("documentjs/jmvcdoc/tooltip.js");
steal("jquery/controller").then(function (k) {
    (function (c, r) {
        c.ui = c.ui || {};
        var l = /left|center|right/, o = /top|center|bottom/, y = /[+-]\d+%?/, I = /^\w+/, O = /%$/, X = c.fn.position;
        c.position = {scrollbarWidth:function () {
            var A, s, x = c("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>");
            s = x.children()[0];
            c("body").append(x);
            A = s.offsetWidth;
            x.css("overflow", "scroll");
            s = s.offsetWidth;
            if (A === s)s = x[0].clientWidth;
            x.remove();
            return A - s
        }, getScrollInfo:function (A) {
            var s =
                A[0] !== window, x = s ? A.css("overflow-x") : "";
            s = s ? A.css("overflow-y") : "";
            x = x === "auto" || x === "scroll" ? c.position.scrollbarWidth() : 0;
            s = s === "auto" || s === "scroll" ? c.position.scrollbarWidth() : 0;
            return{height:A.height() < A[0].scrollHeight ? s : 0, width:A.width() < A[0].scrollWidth ? x : 0}
        }};
        c.fn.position = function (A) {
            if (!A || !A.of)return X.apply(this, arguments);
            A = c.extend({}, A);
            var s = c(A.of), x = c(A.within || window), B = s[0], z = (A.collision || "flip").split(" "), K = {}, v, F, E, w;
            if (B.nodeType === 9) {
                F = s.width();
                E = s.height();
                w = {top:0, left:0}
            } else if (c.isWindow(B)) {
                F =
                    s.width();
                E = s.height();
                w = {top:s.scrollTop(), left:s.scrollLeft()}
            } else if (B.preventDefault) {
                A.at = "left top";
                F = E = 0;
                w = {top:A.of.pageY, left:A.of.pageX}
            } else {
                F = s.outerWidth();
                E = s.outerHeight();
                w = s.offset()
            }
            c.each(["my", "at"], function () {
                var H = (A[this] || "").split(" "), P, ga;
                if (H.length === 1)H = l.test(H[0]) ? H.concat(["center"]) : o.test(H[0]) ? ["center"].concat(H) : ["center", "center"];
                H[0] = l.test(H[0]) ? H[0] : "center";
                H[1] = o.test(H[1]) ? H[1] : "center";
                P = y.exec(H[0]);
                ga = y.exec(H[1]);
                K[this] = [P ? P[0] : 0, ga ? ga[0] : 0];
                A[this] =
                    [I.exec(H[0])[0], I.exec(H[1])[0]]
            });
            if (z.length === 1)z[1] = z[0];
            if (A.at[0] === "right")w.left += F; else if (A.at[0] === "center")w.left += F / 2;
            if (A.at[1] === "bottom")w.top += E; else if (A.at[1] === "center")w.top += E / 2;
            v = [parseInt(K.at[0], 10) * (O.test(K.at[0]) ? F / 100 : 1), parseInt(K.at[1], 10) * (O.test(K.at[1]) ? E / 100 : 1)];
            w.left += v[0];
            w.top += v[1];
            return this.each(function () {
                var H = c(this), P = H.outerWidth(), ga = H.outerHeight(), ja = parseInt(c.curCSS(this, "marginLeft", true)) || 0, M = parseInt(c.curCSS(this, "marginTop", true)) || 0, T = c.position.getScrollInfo(x),
                    G = P + ja + (parseInt(c.curCSS(this, "marginRight", true)) || 0) + T.width, Y = ga + M + (parseInt(c.curCSS(this, "marginBottom", true)) || 0) + T.height, ca = c.extend({}, w), ia = [parseInt(K.my[0], 10) * (O.test(K.my[0]) ? H.outerWidth() / 100 : 1), parseInt(K.my[1], 10) * (O.test(K.my[1]) ? H.outerHeight() / 100 : 1)], ma;
                if (A.my[0] === "right")ca.left -= P; else if (A.my[0] === "center")ca.left -= P / 2;
                if (A.my[1] === "bottom")ca.top -= ga; else if (A.my[1] === "center")ca.top -= ga / 2;
                ca.left += ia[0];
                ca.top += ia[1];
                ma = {marginLeft:ja, marginTop:M};
                c.each(["left", "top"],
                    function (ta, da) {
                        c.ui.position[z[ta]] && c.ui.position[z[ta]][da](ca, {targetWidth:F, targetHeight:E, elemWidth:P, elemHeight:ga, collisionPosition:ma, collisionWidth:G, collisionHeight:Y, offset:[v[0] + ia[0], v[1] + ia[1]], my:A.my, at:A.at, within:x, elem:H})
                    });
                c.fn.bgiframe && H.bgiframe();
                H.offset(c.extend(ca, {using:A.using}))
            })
        };
        c.ui.position = {fit:{left:function (A, s) {
            var x = s.within, B = c(window), z = c.isWindow(s.within[0]), K = z ? B.scrollLeft() : x.offset().left;
            B = z ? B.width() : x.outerWidth();
            z = A.left - s.collisionPosition.marginLeft;
            x = K - z;
            var v = z + s.collisionWidth - B - K;
            if (s.collisionWidth > B)if (x > 0 && v <= 0) {
                s = A.left + x + s.collisionWidth - B - K;
                A.left += x - s
            } else A.left = v > 0 && x <= 0 ? K : x > v ? K + B - s.collisionWidth : K; else if (x > 0)A.left += x; else if (v > 0)A.left -= v; else A.left = Math.max(A.left - z, A.left)
        }, top:function (A, s) {
            var x = s.within, B = c(window), z = c.isWindow(s.within[0]), K = z ? B.scrollTop() : x.offset().top;
            B = z ? B.height() : x.outerHeight();
            z = A.top - s.collisionPosition.marginTop;
            x = K - z;
            var v = z + s.collisionHeight - B - K;
            if (s.collisionHeight > B)if (x > 0 && v <= 0) {
                s = A.top +
                    x + s.collisionHeight - B - K;
                A.top += x - s
            } else A.top = v > 0 && x <= 0 ? K : x > v ? K + B - s.collisionHeight : K; else if (x > 0)A.top += x; else if (v > 0)A.top -= v; else A.top = Math.max(A.top - z, A.top)
        }}, flip:{left:function (A, s) {
            if (s.at[0] !== "center") {
                s.elem.removeClass("ui-flipped-left ui-flipped-right");
                var x = s.within;
                c(window);
                var B = c.isWindow(s.within[0]), z = (B ? 0 : x.offset().left) + x.scrollLeft(), K = B ? x.width() : x.outerWidth();
                B = A.left - s.collisionPosition.marginLeft;
                x = B - z;
                var v = B + s.collisionWidth - K - z;
                B = s.my[0] === "left" ? -s.elemWidth : s.my[0] ===
                    "right" ? s.elemWidth : 0;
                var F = s.at[0] === "left" ? s.targetWidth : -s.targetWidth, E = -2 * s.offset[0];
                if (x < 0) {
                    z = A.left + B + F + E + s.collisionWidth - K - z;
                    if (z < 0 || z < Math.abs(x)) {
                        s.elem.addClass("ui-flipped-right");
                        A.left += B + F + E
                    }
                } else if (v > 0) {
                    z = A.left - s.collisionPosition.marginLeft + B + F + E - z;
                    if (z > 0 || Math.abs(z) < v) {
                        s.elem.addClass("ui-flipped-left");
                        A.left += B + F + E
                    }
                }
            }
        }, top:function (A, s) {
            if (s.at[1] !== "center") {
                s.elem.removeClass("ui-flipped-top ui-flipped-bottom");
                var x = s.within;
                c(window);
                var B = c.isWindow(s.within[0]), z = (B ?
                    0 : x.offset().top) + x.scrollTop(), K = B ? x.height() : x.outerHeight();
                B = A.top - s.collisionPosition.marginTop;
                x = B - z;
                var v = B + s.collisionHeight - K - z;
                B = s.my[1] === "top" ? -s.elemHeight : s.my[1] === "bottom" ? s.elemHeight : 0;
                var F = s.at[1] === "top" ? s.targetHeight : -s.targetHeight, E = -2 * s.offset[1];
                if (x < 0) {
                    z = A.top + B + F + E + s.collisionHeight - K - z;
                    if (z < 0 || z < Math.abs(x)) {
                        s.elem.addClass("ui-flipped-bottom");
                        A.top += B + F + E
                    }
                } else if (v > 0) {
                    z = A.top - s.collisionPosition.marginTop + B + F + E - z;
                    if (z > 0 || Math.abs(z) < v) {
                        s.elem.addClass("ui-flipped-top");
                        A.top += B + F + E
                    }
                }
            }
        }}, flipfit:{left:function () {
            c.ui.position.flip.left.apply(this, arguments);
            c.ui.position.fit.left.apply(this, arguments)
        }, top:function () {
            c.ui.position.flip.top.apply(this, arguments);
            c.ui.position.fit.top.apply(this, arguments)
        }}};
        c.uiBackCompat !== false && function (A) {
            var s = A.fn.position;
            A.fn.position = function (x) {
                if (!x || !x.offset)return s.call(this, x);
                var B = x.offset.split(" "), z = x.at.split(" ");
                if (B.length === 1)B[1] = B[0];
                if (/^\d/.test(B[0]))B[0] = "+" + B[0];
                if (/^\d/.test(B[1]))B[1] = "+" + B[1];
                if (z.length === 1)if (/left|center|right/.test(z[0]))z[1] = "center"; else {
                    z[1] = z[0];
                    z[0] = "center"
                }
                return s.call(this, A.extend(x, {at:z[0] + B[0] + " " + z[1] + B[1], offset:r}))
            }
        }(c)
    })(k);
    k.Controller("Mxui.Layout.Positionable", {rhorizontal:/left|center|right/, rvertical:/top|center|bottom/, hdefault:"center", vdefault:"center", listensTo:["show", "move"], iframe:false, keep:false}, {init:function () {
        this.element.css("position", "absolute");
        if (!this.options.keep) {
            this.element[0].parentNode.removeChild(this.element[0]);
            document.body.appendChild(this.element[0])
        }
    },
        show:function () {
            this.move.apply(this, arguments)
        }, move:function (c, r, l) {
            var o = k.extend({}, this.options);
            o.of = l || o.of;
            if (o.of) {
                c = k(o.of);
                var y = (o.collision || "flip").split(" "), I = o.offset ? o.offset.split(" ") : [0, 0], O, X;
                if (o.of.nodeType === 9) {
                    O = c.width();
                    X = c.height();
                    c = {top:0, left:0}
                } else if (o.of.scrollTo && o.of.document) {
                    O = c.width();
                    X = c.height();
                    c = {top:c.scrollTop(), left:c.scrollLeft()}
                } else if (o.of.preventDefault) {
                    o.at = "left top";
                    O = X = 0;
                    c = {top:o.of.pageY, left:o.of.pageX}
                } else if (o.of.top) {
                    o.at = "left top";
                    O = X = 0;
                    c = {top:o.of.top, left:o.of.left}
                } else {
                    O = c.outerWidth();
                    X = c.outerHeight();
                    c = c.offset()
                }
                k.each(["my", "at"], this.proxy(function (z, K) {
                    z = (o[K] || "").split(" ");
                    if (z.length === 1)z = this.Class.rhorizontal.test(z[0]) ? z.concat([this.Class.vdefault]) : this.Class.rvertical.test(z[0]) ? [this.Class.hdefault].concat(z) : [this.Class.hdefault, this.Class.vdefault];
                    z[0] = this.Class.rhorizontal.test(z[0]) ? z[0] : this.Class.hdefault;
                    z[1] = this.Class.rvertical.test(z[1]) ? z[1] : this.Class.vdefault;
                    o[K] = z
                }));
                if (y.length === 1)y[1] =
                    y[0];
                I[0] = parseInt(I[0], 10) || 0;
                if (I.length === 1)I[1] = I[0];
                I[1] = parseInt(I[1], 10) || 0;
                if (o.at[0] === "right")c.left += O; else if (o.at[0] === this.Class.hdefault)c.left += O / 2;
                if (o.at[1] === "bottom")c.top += X; else if (o.at[1] === this.Class.vdefault)c.top += X / 2;
                c.left += I[0];
                c.top += I[1];
                var A = this.element, s = A.outerWidth(), x = A.outerHeight(), B = k.extend({}, c);
                if (o.my[0] === "right")B.left -= s; else if (o.my[0] === this.Class.hdefault)B.left -= s / 2;
                if (o.my[1] === "bottom")B.top -= x; else if (o.my[1] === this.Class.vdefault)B.top -= x / 2;
                k.each(["left", "top"], function (z, K) {
                    if (k.ui.position[y[z]])k.ui.position[y[z]][K](B, {targetWidth:O, targetHeight:X, elem:A, within:k((o.of && o.of.preventDefault) != null || !o.of ? window : o.of), collisionPosition:{marginLeft:parseInt(k.curCSS(A[0], "marginLeft", true)) || 0, marginTop:parseInt(k.curCSS(A[0], "marginTop", true)) || 0}, elemWidth:s, elemHeight:x, offset:I, my:o.my, at:o.at})
                });
                (c = A.is(":visible")) || A.css("opacity", 0).show();
                A.offset(k.extend(B, {using:o.using}));
                c || A.css("opacity", 1).hide()
            }
        }})
});
steal.loaded("mxui/layout/positionable/positionable.js");
steal("jquery/view/ejs").then(function (k) {
    k.View.preload("documentjs_jmvcdoc_nav_views_results_ejs", jQuery.EJS(function (c, r) {
        try {
            with (r)with (c) {
                c = [];
                r = "";
                var l, o, y, I, O;
                c.push("\n");
                c.push("\n");
                if (selected && selected.length) {
                    c.push("\n");
                    c.push("\t<div id='selected'>\n");
                    c.push("\t\t    ");
                    for (var X = 0; X < selected.length; X++) {
                        c.push("\n");
                        c.push("\t\t\t\t");
                        o = selected[X];
                        y = o.title ? o.title : o.name;
                        l = calculateDisplay(r, y);
                        name = normalizeName(o.name);
                        c.push("\n");
                        c.push('\t\t<div class="content">\n');
                        c.push('\t\t\t    <a href="');
                        c.push(jQuery.EJS.clean(k.route.url({who:name})));
                        c.push('" \n');
                        c.push("\t\t\t\t   class='selected choice ");
                        c.push(jQuery.EJS.clean(o.type));
                        c.push("' \n");
                        c.push('\t\t\t\t   style="padding-left: ');
                        c.push(jQuery.EJS.clean(l.length * 20));
                        c.push('px">\n');
                        c.push("\t\t\t    \t");
                        if (name != "index") {
                            c.push("\n");
                            c.push("\t\t\t\t\t\t<span class='remove' title=\"close\"></span>\n");
                            c.push("\t\t\t\t\t")
                        }
                        c.push("\n");
                        c.push("\t\t\t\t\t");
                        c.push(jQuery.EJS.clean(l.name.replace("jQuery.", "$.")));
                        c.push("\n");
                        c.push("\t\t\t\t\t\n");
                        c.push("\t\t\t\t</a>\n");
                        c.push("\t\t\t\t");
                        r = y;
                        c.push("\n");
                        c.push("\t\t</div>\n");
                        c.push("\t\t\t");
                        if (X < selected.length - 1) {
                            c.push("\n");
                            c.push('\t\t\t\t<div class="spacer"><div>&nbsp;</div></div>\n');
                            c.push("\t\t\t")
                        }
                        c.push("\n");
                        c.push("\t\t\t")
                    }
                    c.push("\n");
                    c.push("\t</div>\n")
                }
                c.push("\n");
                c.push("<div id='results' style=\"display: ");
                c.push(jQuery.EJS.clean(hide ? "none" : "block"));
                c.push('">\n');
                c.push('\t<div class="content">\n');
                c.push("\t    ");
                for (X = 0; X < list.length; X++) {
                    c.push("\n");
                    c.push("\t\t\t");
                    o = list[X];
                    if (!o.hide) {
                        y = o.title ? o.title : o.name;
                        l = calculateDisplay(r, y);
                        name = normalizeName(o.name);
                        O = l.name.replace("jQuery.", "$.");
                        I = y.replace("jQuery.", "$.");
                        c.push("\n");
                        c.push('\t\t    <a href="');
                        c.push(jQuery.EJS.clean(o.type == "prototype" || o.type == "static" || o.type == "getters" || o.type == "setters" ? "javascript://" : k.route.url({who:name})));
                        c.push('" \n');
                        c.push("\t\t\t   class='result choice ");
                        c.push(jQuery.EJS.clean(o.type));
                        c.push("' \n");
                        c.push('\t\t\t   style="padding-left: ');
                        c.push(jQuery.EJS.clean(hasStaticOrPrototype ?
                            l.length * 20 : 20));
                        c.push('px"\n');
                        c.push('\t\t\t   data-name="');
                        c.push(jQuery.EJS.clean(o.name));
                        c.push('">\n');
                        c.push("\t\t    \t");
                        if (hasStaticOrPrototype) {
                            c.push("\n");
                            c.push("\t\t\t\t\t")
                        } else {
                            c.push("\n");
                            c.push("\t\t\t\t\t<span class='faded'>");
                            c.push(jQuery.EJS.clean(I.replace(O, "")));
                            c.push("</span>")
                        }
                        c.push(jQuery.EJS.clean(O));
                        c.push("\n");
                        c.push("\t\t\t\t");
                        c.push("\n");
                        c.push("\t\t\t</a>\n");
                        c.push("\t\t\t");
                        r = y;
                        c.push("\n");
                        c.push("\t\t")
                    }
                }
                c.push("\n");
                c.push("\t</div>\n");
                c.push("</div>\n");
                c.push("\n");
                c.push("\n");
                return c.join("")
            }
        } catch (A) {
            A.lineNumber = null;
            throw A;
        }
    }))
});
steal.loaded("documentjs/jmvcdoc/nav/views/results.ejs");
steal("jquery").then(function (k) {
    function c(A) {
        A = A || window[o][y];
        return A.replace(/^[^#]*#?(.*)$/, "$1")
    }

    var r, l = k.event.special, o = "location", y = "href", I = document.documentMode, O = k.browser.msie && (I === undefined || I < 8), X = "onhashchange"in window && !O;
    k.hashchangeDelay = 100;
    l.hashchange = k.extend(l.hashchange, {setup:function () {
        if (X)return false;
        k(r.start)
    }, teardown:function () {
        if (X)return false;
        k(r.stop)
    }});
    r = function () {
        function A() {
            z = K = function (v) {
                return v
            };
            if (O) {
                B = k('<iframe src="javascript:0"/>').hide().insertAfter("body")[0].contentWindow;
                K = function () {
                    return c(B.document[o][y])
                };
                z = function (v, F) {
                    if (v !== F) {
                        F = B.document;
                        F.open().close();
                        F[o].hash = "#" + v
                    }
                };
                z(c())
            }
        }

        var s = {}, x, B, z, K;
        s.start = function () {
            if (!x) {
                var v = c();
                z || A();
                navigator.userAgent.match(/Rhino/) || function F() {
                    var E = c(), w = K(v);
                    if (E !== v) {
                        z(v = E, w);
                        k(window).trigger("hashchange")
                    } else if (w !== v)window[o][y] = window[o][y].replace(/#.*/, "") + "#" + w;
                    x = setTimeout(F, k.hashchangeDelay)
                }()
            }
        };
        s.stop = function () {
            if (!B) {
                x && clearTimeout(x);
                x = 0
            }
        };
        return s
    }()
});
steal.loaded("jquery/event/hashchange/hashchange.js");
steal("jquery", function (k) {
    var c = /^\d+$/, r = /([^\[\]]+)|(\[\])/g, l = /\+/g, o = /([^?#]*)(#.*)?$/;
    k.String = k.extend(k.String || {}, {deparam:function (y) {
        if (!y || !o.test(y))return{};
        var I = {};
        y = y.split("&");
        for (var O, X = 0; X < y.length; X++) {
            O = I;
            var A = y[X].split("=");
            if (A.length != 2)A = [A[0], A.slice(1).join("=")];
            var s = decodeURIComponent(A[0].replace(l, " "));
            A = decodeURIComponent(A[1].replace(l, " "));
            s = s.match(r);
            for (var x = 0; x < s.length - 1; x++) {
                var B = s[x];
                O[B] || (O[B] = c.test(s[x + 1]) || s[x + 1] == "[]" ? [] : {});
                O = O[B]
            }
            lastPart =
                s[s.length - 1];
            if (lastPart == "[]")O.push(A); else O[lastPart] = A
        }
        return I
    }})
});
steal.loaded("jquery/lang/string/deparam/deparam.js");
