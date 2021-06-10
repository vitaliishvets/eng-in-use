(function() {
    var e, t, n, r, i, s = function(e, t) {
            return function() {
                return e.apply(t, arguments)
            }
        },
        o = [].indexOf || function(e) {
            for (var t = 0, n = this.length; t < n; t++)
                if (t in this && this[t] === e) return t;
            return -1
        };
    t = function() {
        function e() {}
        return e.prototype.extend = function(e, t) {
            var n, r;
            for (n in t) r = t[n], e[n] == null && (e[n] = r);
            return e
        }, e.prototype.isMobile = function(e) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(e)
        }, e.prototype.createEvent = function(e, t, n, r) {
            var i;
            return t == null && (t = !1), n == null && (n = !1), r == null && (r = null), document.createEvent != null ? (i = document.createEvent("CustomEvent"), i.initCustomEvent(e, t, n, r)) : document.createEventObject != null ? (i = document.createEventObject(), i.eventType = e) : i.eventName = e, i
        }, e.prototype.emitEvent = function(e, t) {
            if (e.dispatchEvent != null) return e.dispatchEvent(t);
            if (t in (e != null)) return e[t]();
            if ("on" + t in (e != null)) return e["on" + t]()
        }, e.prototype.addEvent = function(e, t, n) {
            return e.addEventListener != null ? e.addEventListener(t, n, !1) : e.attachEvent != null ? e.attachEvent("on" + t, n) : e[t] = n
        }, e.prototype.removeEvent = function(e, t, n) {
            return e.removeEventListener != null ? e.removeEventListener(t, n, !1) : e.detachEvent != null ? e.detachEvent("on" + t, n) : delete e[t]
        }, e.prototype.innerHeight = function() {
            return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
        }, e
    }(), n = this.WeakMap || this.MozWeakMap || (n = function() {
        function e() {
            this.keys = [], this.values = []
        }
        return e.prototype.get = function(e) {
            var t, n, r, i, s;
            s = this.keys;
            for (t = r = 0, i = s.length; r < i; t = ++r) {
                n = s[t];
                if (n === e) return this.values[t]
            }
        }, e.prototype.set = function(e, t) {
            var n, r, i, s, o;
            o = this.keys;
            for (n = i = 0, s = o.length; i < s; n = ++i) {
                r = o[n];
                if (r === e) {
                    this.values[n] = t;
                    return
                }
            }
            return this.keys.push(e), this.values.push(t)
        }, e
    }()), e = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (e = function() {
        function e() {
            typeof console != "undefined" && console !== null && console.warn("MutationObserver is not supported by your browser."), typeof console != "undefined" && console !== null && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
        }
        return e.notSupported = !0, e.prototype.observe = function() {}, e
    }()), r = this.getComputedStyle || function(e, t) {
        return this.getPropertyValue = function(t) {
            var n;
            return t === "float" && (t = "styleFloat"), i.test(t) && t.replace(i, function(e, t) {
                return t.toUpperCase()
            }), ((n = e.currentStyle) != null ? n[t] : void 0) || null
        }, this
    }, i = /(\-([a-z]){1})/g, this.WOW = function() {
        function i(e) {
            e == null && (e = {}), this.scrollCallback = s(this.scrollCallback, this), this.scrollHandler = s(this.scrollHandler, this), this.resetAnimation = s(this.resetAnimation, this), this.start = s(this.start, this), this.scrolled = !0, this.config = this.util().extend(e, this.defaults), this.animationNameCache = new n, this.wowEvent = this.util().createEvent(this.config.boxClass)
        }
        return i.prototype.defaults = {
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: !0,
            live: !0,
            callback: null
        }, i.prototype.init = function() {
            var e;
            return this.element = window.document.documentElement, (e = document.readyState) === "interactive" || e === "complete" ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
        }, i.prototype.start = function() {
            var t, n, r, i;
            this.stopped = !1, this.boxes = function() {
                var e, n, r, i;
                r = this.element.querySelectorAll("." + this.config.boxClass), i = [];
                for (e = 0, n = r.length; e < n; e++) t = r[e], i.push(t);
                return i
            }.call(this), this.all = function() {
                var e, n, r, i;
                r = this.boxes, i = [];
                for (e = 0, n = r.length; e < n; e++) t = r[e], i.push(t);
                return i
            }.call(this);
            if (this.boxes.length)
                if (this.disabled()) this.resetStyle();
                else {
                    i = this.boxes;
                    for (n = 0, r = i.length; n < r; n++) t = i[n], this.applyStyle(t, !0)
                } this.disabled() || (this.util().addEvent(window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50));
            if (this.config.live) return (new e(function(e) {
                return function(t) {
                    var n, r, i, s, o;
                    o = [];
                    for (n = 0, r = t.length; n < r; n++) s = t[n], o.push(function() {
                        var e, t, n, r;
                        n = s.addedNodes || [], r = [];
                        for (e = 0, t = n.length; e < t; e++) i = n[e], r.push(this.doSync(i));
                        return r
                    }.call(e));
                    return o
                }
            }(this))).observe(document.body, {
                childList: !0,
                subtree: !0
            })
        }, i.prototype.stop = function() {
            this.stopped = !0, this.util().removeEvent(window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler);
            if (this.interval != null) return clearInterval(this.interval)
        }, i.prototype.sync = function(t) {
            if (e.notSupported) return this.doSync(this.element)
        }, i.prototype.doSync = function(e) {
            var t, n, r, i, s;
            e == null && (e = this.element);
            if (e.nodeType !== 1) return;
            e = e.parentNode || e, i = e.querySelectorAll("." + this.config.boxClass), s = [];
            for (n = 0, r = i.length; n < r; n++) t = i[n], o.call(this.all, t) < 0 ? (this.boxes.push(t), this.all.push(t), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(t, !0), s.push(this.scrolled = !0)) : s.push(void 0);
            return s
        }, i.prototype.show = function(e) {
            return this.applyStyle(e), e.className = e.className + " " + this.config.animateClass, this.config.callback != null && this.config.callback(e), this.util().emitEvent(e, this.wowEvent), this.util().addEvent(e, "animationend", this.resetAnimation), this.util().addEvent(e, "oanimationend", this.resetAnimation), this.util().addEvent(e, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(e, "MSAnimationEnd", this.resetAnimation), e
        }, i.prototype.applyStyle = function(e, t) {
            var n, r, i;
            return r = e.getAttribute("data-wow-duration"), n = e.getAttribute("data-wow-delay"), i = e.getAttribute("data-wow-iteration"), this.animate(function(s) {
                return function() {
                    return s.customStyle(e, t, r, n, i)
                }
            }(this))
        }, i.prototype.animate = function() {
            return "requestAnimationFrame" in window ? function(e) {
                return window.requestAnimationFrame(e)
            } : function(e) {
                return e()
            }
        }(), i.prototype.resetStyle = function() {
            var e, t, n, r, i;
            r = this.boxes, i = [];
            for (t = 0, n = r.length; t < n; t++) e = r[t], i.push(e.style.visibility = "visible");
            return i
        }, i.prototype.resetAnimation = function(e) {
            var t;
            if (e.type.toLowerCase().indexOf("animationend") >= 0) return t = e.target || e.srcElement, t.className = t.className.replace(this.config.animateClass, "").trim()
        }, i.prototype.customStyle = function(e, t, n, r, i) {
            return t && this.cacheAnimationName(e), e.style.visibility = t ? "hidden" : "visible", n && this.vendorSet(e.style, {
                animationDuration: n
            }), r && this.vendorSet(e.style, {
                animationDelay: r
            }), i && this.vendorSet(e.style, {
                animationIterationCount: i
            }), this.vendorSet(e.style, {
                animationName: t ? "none" : this.cachedAnimationName(e)
            }), e
        }, i.prototype.vendors = ["moz", "webkit"], i.prototype.vendorSet = function(e, t) {
            var n, r, i, s;
            r = [];
            for (n in t) i = t[n], e["" + n] = i, r.push(function() {
                var t, r, o, u;
                o = this.vendors, u = [];
                for (t = 0, r = o.length; t < r; t++) s = o[t], u.push(e["" + s + n.charAt(0).toUpperCase() + n.substr(1)] = i);
                return u
            }.call(this));
            return r
        }, i.prototype.vendorCSS = function(e, t) {
            var n, i, s, o, u, a;
            u = r(e), o = u.getPropertyCSSValue(t), s = this.vendors;
            for (n = 0, i = s.length; n < i; n++) a = s[n], o = o || u.getPropertyCSSValue("-" + a + "-" + t);
            return o
        }, i.prototype.animationName = function(e) {
            var t;
            try {
                t = this.vendorCSS(e, "animation-name").cssText
            } catch (n) {
                t = r(e).getPropertyValue("animation-name")
            }
            return t === "none" ? "" : t
        }, i.prototype.cacheAnimationName = function(e) {
            return this.animationNameCache.set(e, this.animationName(e))
        }, i.prototype.cachedAnimationName = function(e) {
            return this.animationNameCache.get(e)
        }, i.prototype.scrollHandler = function() {
            return this.scrolled = !0
        }, i.prototype.scrollCallback = function() {
            var e;
            if (this.scrolled) {
                this.scrolled = !1, this.boxes = function() {
                    var t, n, r, i;
                    r = this.boxes, i = [];
                    for (t = 0, n = r.length; t < n; t++) {
                        e = r[t];
                        if (!e) continue;
                        if (this.isVisible(e)) {
                            this.show(e);
                            continue
                        }
                        i.push(e)
                    }
                    return i
                }.call(this);
                if (!this.boxes.length && !this.config.live) return this.stop()
            }
        }, i.prototype.offsetTop = function(e) {
            var t;
            while (e.offsetTop === void 0) e = e.parentNode;
            t = e.offsetTop;
            while (e = e.offsetParent) t += e.offsetTop;
            return t
        }, i.prototype.isVisible = function(e) {
            var t, n, r, i, s;
            return n = e.getAttribute("data-wow-offset") || this.config.offset, s = window.pageYOffset, i = s + Math.min(this.element.clientHeight, this.util().innerHeight()) - n, r = this.offsetTop(e), t = r + e.clientHeight, r <= i && t >= s
        }, i.prototype.util = function() {
            return this._util != null ? this._util : this._util = new t
        }, i.prototype.disabled = function() {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent)
        }, i
    }()
}).call(this);