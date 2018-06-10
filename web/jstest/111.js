!
function(a, b) {
    function c(a, b) {
        a = a.toString().split("."),
        b = b.toString().split(".");
        for (var c = 0; c < a.length || c < b.length; c++) {
            var d = parseInt(a[c], 10),
            e = parseInt(b[c], 10);
            if (window.isNaN(d) && (d = 0), window.isNaN(e) && (e = 0), d < e) return - 1;
            if (d > e) return 1
        }
        return 0
    }
    var d = a.Promise,
    e = a.document,
    f = a.navigator.userAgent,
    g = /Windows\sPhone\s(?:OS\s)?[\d\.]+/i.test(f) || /Windows\sNT\s[\d\.]+/i.test(f),
    h = g && a.WindVane_Win_Private && a.WindVane_Win_Private.call,
    i = /iPhone|iPad|iPod/i.test(f),
    j = /Android/i.test(f),
    k = f.match(/WindVane[\/\s](\d+[._]\d+[._]\d+)/),
    l = Object.prototype.hasOwnProperty,
    m = b.windvane = a.WindVane || (a.WindVane = {}),
    n = (a.WindVane_Native, Math.floor(65536 * Math.random())),
    o = 1,
    p = [],
    q = 3,
    r = "hybrid",
    s = "wv_hybrid",
    t = "iframe_",
    u = "param_",
    v = "chunk_",
    w = 6e5,
    x = 6e5,
    y = 6e4;
    k = k ? (k[1] || "0.0.0").replace(/\_/g, ".") : "0.0.0";
    var z = {
        isAvailable: 1 === c(k, "0"),
        call: function(a, b, c, e, f, g) {
            var h, i;
            "number" == typeof arguments[arguments.length - 1] && (g = arguments[arguments.length - 1]),
            "function" != typeof e && (e = null),
            "function" != typeof f && (f = null),
            d && (i = {},
            i.promise = new d(function(a, b) {
                i.resolve = a,
                i.reject = b
            })),
            h = A.getSid();
            var j = {
                success: e,
                failure: f,
                deferred: i
            };
            if (g > 0 && (j.timeout = setTimeout(function() {
                z.onFailure(h, {
                    ret: "HY_TIMEOUT"
                })
            },
            g)), A.registerCall(h, j), A.registerGC(h, g), z.isAvailable ? A.callMethod(a, b, c, h) : z.onFailure(h, {
                ret: "HY_NOT_IN_WINDVANE"
            }), i) return i.promise
        },
        fireEvent: function(a, b, c) {
            var d = e.createEvent("HTMLEvents");
            d.initEvent(a, !1, !0),
            d.param = A.parseData(b || A.getData(c)),
            e.dispatchEvent(d)
        },
        getParam: function(a) {
            return A.getParam(a)
        },
        setData: function(a, b) {
            A.setData(a, b)
        },
        onSuccess: function(a, b) {
            A.onComplete(a, b, "success")
        },
        onFailure: function(a, b) {
            A.onComplete(a, b, "failure")
        }
    },
    A = {
        params: {},
        chunks: {},
        calls: {},
        getSid: function() {
            return (n + o++) % 65536 + ""
        },
        buildParam: function(a) {
            return a && "object" == typeof a ? JSON.stringify(a) : a || ""
        },
        getParam: function(a) {
            return this.params[u + a] || ""
        },
        setParam: function(a, b) {
            this.params[u + a] = b
        },
        parseData: function(a) {
            var b;
            if (a && "string" == typeof a) try {
                b = JSON.parse(a)
            } catch(a) {
                b = {
                    ret: ["WV_ERR::PARAM_PARSE_ERROR"]
                }
            } else b = a || {};
            return b
        },
        setData: function() {
            this.chunks[v + sid] = this.chunks[v + sid] || [],
            this.chunks[v + sid].push(chunk)
        },
        getData: function(a) {
            return this.chunks[v + a] ? this.chunks[v + a].join("") : ""
        },
        registerCall: function(a, b) {
            this.calls[a] = b
        },
        unregisterCall: function(a) {
            var b = {};
            return this.calls[a] && (b = this.calls[a], delete this.calls[a]),
            b
        },
        useIframe: function(a, b) {
            var c = t + a,
            d = p.pop();
            d || (d = e.createElement("iframe"), d.setAttribute("frameborder", "0"), d.style.cssText = "width:0;height:0;border:0;display:none;"),
            d.setAttribute("id", c),
            d.setAttribute("src", b),
            d.parentNode || setTimeout(function() {
                e.body.appendChild(d)
            },
            5)
        },
        retrieveIframe: function(a) {
            var b = t + a,
            c = e.querySelector("#" + b);
            p.length >= q ? e.body.removeChild(c) : p.indexOf(c) < 0 && p.push(c)
        },
        callMethod: function(b, c, d, e) {
            if (d = A.buildParam(d), g) h ? a.WindVane_Win_Private.call(b, c, e, d) : this.onComplete(e, {
                ret: "HY_NO_HANDLER_ON_WP"
            },
            "failure");
            else {
                var f = r + "://" + b + ":" + e + "/" + c + "?" + d;
                if (i) this.setParam(e, d),
                this.useIframe(e, f);
                else if (j) {
                    var k = s + ":";
                    window.prompt(f, k)
                } else this.onComplete(e, {
                    ret: "HY_NOT_SUPPORT_DEVICE"
                },
                "failure")
            }
        },
        registerGC: function(a, b) {
            var c = this,
            d = Math.max(b || 0, w),
            e = Math.max(b || 0, y),
            f = Math.max(b || 0, x);
            setTimeout(function() {
                c.unregisterCall(a)
            },
            d),
            i ? setTimeout(function() {
                c.params[u + a] && delete c.params[u + a]
            },
            e) : j && setTimeout(function() {
                c.chunks[v + a] && delete c.chunks[v + a]
            },
            f)
        },
        onComplete: function(a, b, c) {
            var d = this.unregisterCall(a),
            e = d.success,
            f = d.failure,
            g = d.deferred,
            h = d.timeout;
            h && clearTimeout(h),
            b = b ? b: this.getData(a),
            b = this.parseData(b);
            var k = b.ret;
            "string" == typeof k && (b = b.value || b, b.ret || (b.ret = [k])),
            "success" === c ? (e && e(b), g && g.resolve(b)) : "failure" === c && (f && f(b), g && g.reject(b)),
            i ? (this.retrieveIframe(a), this.params[u + a] && delete this.params[u + a]) : j && this.chunks[v + a] && delete this.chunks[v + a]
        }
    };
    for (var B in z) l.call(m, B) || (m[B] = z[B])
} (window, window.lib || (window.lib = {})); !
function(a, b) {
    function c() {
        var a = {},
        b = new o(function(b, c) {
            a.resolve = b,
            a.reject = c
        });
        return a.promise = b,
        a
    }
    function d(a, b) {
        for (var c in b) void 0 === a[c] && (a[c] = b[c]);
        return a
    }
    function e(a) {
        var b = document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0] || document.firstElementChild || document;
        b.appendChild(a)
    }
    function f(a) {
        var b = [];
        for (var c in a) a[c] && b.push(c + "=" + encodeURIComponent(a[c]));
        return b.join("&")
    }
    function g(a) {
        return a.substring(a.lastIndexOf(".", a.lastIndexOf(".") - 1) + 1)
    }
    function h(a) {
        function b(a, b) {
            return a << b | a >>> 32 - b
        }
        function c(a, b) {
            var c, d, e, f, g;
            return e = 2147483648 & a,
            f = 2147483648 & b,
            c = 1073741824 & a,
            d = 1073741824 & b,
            g = (1073741823 & a) + (1073741823 & b),
            c & d ? 2147483648 ^ g ^ e ^ f: c | d ? 1073741824 & g ? 3221225472 ^ g ^ e ^ f: 1073741824 ^ g ^ e ^ f: g ^ e ^ f
        }
        function d(a, b, c) {
            return a & b | ~a & c
        }
        function e(a, b, c) {
            return a & c | b & ~c
        }
        function f(a, b, c) {
            return a ^ b ^ c
        }
        function g(a, b, c) {
            return b ^ (a | ~c)
        }
        function h(a, e, f, g, h, i, j) {
            return a = c(a, c(c(d(e, f, g), h), j)),
            c(b(a, i), e)
        }
        function i(a, d, f, g, h, i, j) {
            return a = c(a, c(c(e(d, f, g), h), j)),
            c(b(a, i), d)
        }
        function j(a, d, e, g, h, i, j) {
            return a = c(a, c(c(f(d, e, g), h), j)),
            c(b(a, i), d)
        }
        function k(a, d, e, f, h, i, j) {
            return a = c(a, c(c(g(d, e, f), h), j)),
            c(b(a, i), d)
        }
        function l(a) {
            for (var b, c = a.length,
            d = c + 8,
            e = (d - d % 64) / 64, f = 16 * (e + 1), g = new Array(f - 1), h = 0, i = 0; c > i;) b = (i - i % 4) / 4,
            h = i % 4 * 8,
            g[b] = g[b] | a.charCodeAt(i) << h,
            i++;
            return b = (i - i % 4) / 4,
            h = i % 4 * 8,
            g[b] = g[b] | 128 << h,
            g[f - 2] = c << 3,
            g[f - 1] = c >>> 29,
            g
        }
        function m(a) {
            var b, c, d = "",
            e = "";
            for (c = 0; 3 >= c; c++) b = a >>> 8 * c & 255,
            e = "0" + b.toString(16),
            d += e.substr(e.length - 2, 2);
            return d
        }
        function n(a) {
            a = a.replace(/\r\n/g, "\n");
            for (var b = "",
            c = 0; c < a.length; c++) {
                var d = a.charCodeAt(c);
                128 > d ? b += String.fromCharCode(d) : d > 127 && 2048 > d ? (b += String.fromCharCode(d >> 6 | 192), b += String.fromCharCode(63 & d | 128)) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128), b += String.fromCharCode(63 & d | 128))
            }
            return b
        }
        var o, p, q, r, s, t, u, v, w, x = [],
        y = 7,
        z = 12,
        A = 17,
        B = 22,
        C = 5,
        D = 9,
        E = 14,
        F = 20,
        G = 4,
        H = 11,
        I = 16,
        J = 23,
        K = 6,
        L = 10,
        M = 15,
        N = 21;
        for (a = n(a), x = l(a), t = 1732584193, u = 4023233417, v = 2562383102, w = 271733878, o = 0; o < x.length; o += 16) p = t,
        q = u,
        r = v,
        s = w,
        t = h(t, u, v, w, x[o + 0], y, 3614090360),
        w = h(w, t, u, v, x[o + 1], z, 3905402710),
        v = h(v, w, t, u, x[o + 2], A, 606105819),
        u = h(u, v, w, t, x[o + 3], B, 3250441966),
        t = h(t, u, v, w, x[o + 4], y, 4118548399),
        w = h(w, t, u, v, x[o + 5], z, 1200080426),
        v = h(v, w, t, u, x[o + 6], A, 2821735955),
        u = h(u, v, w, t, x[o + 7], B, 4249261313),
        t = h(t, u, v, w, x[o + 8], y, 1770035416),
        w = h(w, t, u, v, x[o + 9], z, 2336552879),
        v = h(v, w, t, u, x[o + 10], A, 4294925233),
        u = h(u, v, w, t, x[o + 11], B, 2304563134),
        t = h(t, u, v, w, x[o + 12], y, 1804603682),
        w = h(w, t, u, v, x[o + 13], z, 4254626195),
        v = h(v, w, t, u, x[o + 14], A, 2792965006),
        u = h(u, v, w, t, x[o + 15], B, 1236535329),
        t = i(t, u, v, w, x[o + 1], C, 4129170786),
        w = i(w, t, u, v, x[o + 6], D, 3225465664),
        v = i(v, w, t, u, x[o + 11], E, 643717713),
        u = i(u, v, w, t, x[o + 0], F, 3921069994),
        t = i(t, u, v, w, x[o + 5], C, 3593408605),
        w = i(w, t, u, v, x[o + 10], D, 38016083),
        v = i(v, w, t, u, x[o + 15], E, 3634488961),
        u = i(u, v, w, t, x[o + 4], F, 3889429448),
        t = i(t, u, v, w, x[o + 9], C, 568446438),
        w = i(w, t, u, v, x[o + 14], D, 3275163606),
        v = i(v, w, t, u, x[o + 3], E, 4107603335),
        u = i(u, v, w, t, x[o + 8], F, 1163531501),
        t = i(t, u, v, w, x[o + 13], C, 2850285829),
        w = i(w, t, u, v, x[o + 2], D, 4243563512),
        v = i(v, w, t, u, x[o + 7], E, 1735328473),
        u = i(u, v, w, t, x[o + 12], F, 2368359562),
        t = j(t, u, v, w, x[o + 5], G, 4294588738),
        w = j(w, t, u, v, x[o + 8], H, 2272392833),
        v = j(v, w, t, u, x[o + 11], I, 1839030562),
        u = j(u, v, w, t, x[o + 14], J, 4259657740),
        t = j(t, u, v, w, x[o + 1], G, 2763975236),
        w = j(w, t, u, v, x[o + 4], H, 1272893353),
        v = j(v, w, t, u, x[o + 7], I, 4139469664),
        u = j(u, v, w, t, x[o + 10], J, 3200236656),
        t = j(t, u, v, w, x[o + 13], G, 681279174),
        w = j(w, t, u, v, x[o + 0], H, 3936430074),
        v = j(v, w, t, u, x[o + 3], I, 3572445317),
        u = j(u, v, w, t, x[o + 6], J, 76029189),
        t = j(t, u, v, w, x[o + 9], G, 3654602809),
        w = j(w, t, u, v, x[o + 12], H, 3873151461),
        v = j(v, w, t, u, x[o + 15], I, 530742520),
        u = j(u, v, w, t, x[o + 2], J, 3299628645),
        t = k(t, u, v, w, x[o + 0], K, 4096336452),
        w = k(w, t, u, v, x[o + 7], L, 1126891415),
        v = k(v, w, t, u, x[o + 14], M, 2878612391),
        u = k(u, v, w, t, x[o + 5], N, 4237533241),
        t = k(t, u, v, w, x[o + 12], K, 1700485571),
        w = k(w, t, u, v, x[o + 3], L, 2399980690),
        v = k(v, w, t, u, x[o + 10], M, 4293915773),
        u = k(u, v, w, t, x[o + 1], N, 2240044497),
        t = k(t, u, v, w, x[o + 8], K, 1873313359),
        w = k(w, t, u, v, x[o + 15], L, 4264355552),
        v = k(v, w, t, u, x[o + 6], M, 2734768916),
        u = k(u, v, w, t, x[o + 13], N, 1309151649),
        t = k(t, u, v, w, x[o + 4], K, 4149444226),
        w = k(w, t, u, v, x[o + 11], L, 3174756917),
        v = k(v, w, t, u, x[o + 2], M, 718787259),
        u = k(u, v, w, t, x[o + 9], N, 3951481745),
        t = c(t, p),
        u = c(u, q),
        v = c(v, r),
        w = c(w, s);
        var O = m(t) + m(u) + m(v) + m(w);
        return O.toLowerCase()
    }
    function i(a, b, c) {
        var d = c || {};
        document.cookie = a.replace(/[^+#$&^`|]/g, encodeURIComponent).replace("(", "%28").replace(")", "%29") + "=" + b.replace(/[^+#$&\/:<-\[\]-}]/g, encodeURIComponent) + (d.domain ? ";domain=" + d.domain: "") + (d.path ? ";path=" + d.path: "") + (d.secure ? ";secure": "") + (d.httponly ? ";HttpOnly": "")
    }
    function j(a) {
        var b = new RegExp("(?:^|;\\s*)" + a + "\\=([^;]+)(?:;\\s*|$)").exec(document.cookie);
        return b ? b[1] : void 0
    }
    function k(a, b, c) {
        var d = new Date;
        d.setTime(d.getTime() - 864e5);
        var e = "/";
        document.cookie = a + "=;path=" + e + ";domain=." + b + ";expires=" + d.toGMTString(),
        document.cookie = a + "=;path=" + e + ";domain=." + c + "." + b + ";expires=" + d.toGMTString()
    }
    function l() {
        var b = a.location.hostname;
        if (!b) {
            var c = a.parent.location.hostname;
            c && ~c.indexOf("zebra.alibaba-inc.com") && (b = c)
        }
        var d = ["taobao.net", "taobao.com", "tmall.com", "tmall.hk", "alibaba-inc.com"],
        e = new RegExp("([^.]*?)\\.?((?:" + d.join(")|(?:").replace(/\./g, "\\.") + "))", "i"),
        f = b.match(e) || [],
        g = f[2] || "taobao.com",
        h = f[1] || "m";
        "taobao.net" !== g || "x" !== h && "waptest" !== h && "daily" !== h ? "taobao.net" === g && "demo" === h ? h = "demo": "alibaba-inc.com" === g && "zebra" === h ? h = "zebra": "waptest" !== h && "wapa" !== h && "m" !== h && (h = "m") : h = "waptest";
        var i = "api"; ("taobao.com" === g || "tmall.com" === g) && (i = "h5api"),
        t.mainDomain = g,
        t.subDomain = h,
        t.prefix = i
    }
    function m() {
        var b = a.navigator.userAgent,
        c = b.match(/WindVane[\/\s]([\d\.\_]+)/);
        c && (t.WindVaneVersion = c[1]);
        var d = b.match(/AliApp\(([^\/]+)\/([\d\.\_]+)\)/i);
        d && (t.AliAppName = d[1], t.AliAppVersion = d[2])
    }
    function n(a) {
        this.id = ++w,
        this.params = d(a || {},
        {
            v: "*",
            data: {},
            type: "get",
            dataType: "jsonp"
        }),
        this.params.type = this.params.type.toLowerCase(),
        "object" == typeof this.params.data && (this.params.data = JSON.stringify(this.params.data)),
        this.middlewares = u.slice(0)
    }
    var o = a.Promise;
    if (!o) {
        var p = "褰撳墠娴忚鍣ㄤ笉鏀寔Promise锛岃鍦╳indows瀵硅薄涓婃寕杞絇romise瀵硅薄鍙弬鑰冿紙http://gitlab.alibaba-inc.com/mtb/lib-es6polyfill/tree/master锛変腑鐨勮В鍐虫柟妗�";
        throw b.mtop = {
            ERROR: p
        },
        new Error(p)
    }
    String.prototype.trim || (String.prototype.trim = function() {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
    });
    var q, r = o.resolve();
    try {
        q = a.localStorage,
        q.setItem("@private", "false")
    } catch(s) {
        q = !1
    }
    var t = {
        useJsonpResultType: !1,
        safariGoLogin: !0,
        useAlipayJSBridge: !1
    },
    u = [],
    v = {
        ERROR: -1,
        SUCCESS: 0,
        TOKEN_EXPIRED: 1,
        SESSION_EXPIRED: 2
    };
    l(),
    m();
    var w = 0,
    x = "2.4.2";
    n.prototype.use = function(a) {
        if (!a) throw new Error("middleware is undefined");
        return this.middlewares.push(a),
        this
    },
    n.prototype.__processRequestMethod = function(a) {
        var b = this.params,
        c = this.options;
        "get" === b.type && "jsonp" === b.dataType ? c.getJSONP = !0 : "get" === b.type && "originaljsonp" === b.dataType ? c.getOriginalJSONP = !0 : "get" === b.type && "json" === b.dataType ? c.getJSON = !0 : "post" === b.type && (c.postJSON = !0),
        a()
    },
    n.prototype.__processRequestType = function(c) {
        var d = this,
        e = this.options;
        if (t.H5Request === !0 && (e.H5Request = !0), t.WindVaneRequest === !0 && (e.WindVaneRequest = !0), e.H5Request === !1 && e.WindVaneRequest === !0) {
            if (!b.windvane || parseFloat(e.WindVaneVersion) < 5.4) throw new Error("WINDVANE_NOT_FOUND::缂哄皯WindVane鐜")
        } else e.H5Request === !0 ? e.WindVaneRequest = !1 : "undefined" == typeof e.WindVaneRequest && "undefined" == typeof e.H5Request && (b.windvane && parseFloat(e.WindVaneVersion) >= 5.4 ? e.WindVaneRequest = !0 : e.H5Request = !0);
        var f = a.navigator.userAgent.toLowerCase();
        return f.indexOf("youku") > -1 && e.mainDomain.indexOf("youku.com") < 0 && (e.WindVaneRequest = !1, e.H5Request = !0),
        e.mainDomain.indexOf("youku.com") > -1 && f.indexOf("youku") < 0 && (e.WindVaneRequest = !1, e.H5Request = !0),
        c ? c().then(function() {
            var a = e.retJson.ret;
            return a instanceof Array && (a = a.join(",")),
            e.WindVaneRequest === !0 && (!a || a.indexOf("PARAM_PARSE_ERROR") > -1 || a.indexOf("HY_FAILED") > -1 || a.indexOf("HY_NO_HANDLER") > -1 || a.indexOf("HY_CLOSED") > -1 || a.indexOf("HY_EXCEPTION") > -1 || a.indexOf("HY_NO_PERMISSION") > -1) ? (t.H5Request = !0, d.__sequence([d.__processRequestType, d.__processToken, d.__processRequestUrl, d.middlewares, d.__processRequest])) : void 0
        }) : void 0
    };
    var y = "_m_h5_c",
    z = "_m_h5_tk",
    A = "_m_h5_tk_enc";
    n.prototype.__getTokenFromAlipay = function() {
        var b = c(),
        d = this.options,
        e = (a.navigator.userAgent, !!location.protocol.match(/^https?\:$/)),
        f = "AP" === d.AliAppName && parseFloat(d.AliAppVersion) >= 8.2;
        return d.useAlipayJSBridge === !0 && !e && f && a.AlipayJSBridge && a.AlipayJSBridge.call ? a.AlipayJSBridge.call("getMtopToken",
        function(a) {
            a && a.token && (d.token = a.token),
            b.resolve()
        },
        function() {
            b.resolve()
        }) : b.resolve(),
        b.promise
    },
    n.prototype.__getTokenFromCookie = function() {
        var a = this.options;
        return a.CDR && j(y) ? a.token = j(y).split(";")[0] : a.token = a.token || j(z),
        a.token && (a.token = a.token.split("_")[0]),
        o.resolve()
    },
    n.prototype.__processToken = function(a) {
        var b = this,
        c = this.options;
        this.params;
        return c.token && delete c.token,
        c.WindVaneRequest !== !0 ? r.then(function() {
            return b.__getTokenFromAlipay()
        }).then(function() {
            return b.__getTokenFromCookie()
        }).then(a).then(function() {
            var a = c.retJson,
            d = a.ret;
            if (d instanceof Array && (d = d.join(",")), d.indexOf("TOKEN_EMPTY") > -1 || c.CDR === !0 && d.indexOf("ILLEGAL_ACCESS") > -1 || d.indexOf("TOKEN_EXOIRED") > -1) {
                if (c.maxRetryTimes = c.maxRetryTimes || 5, c.failTimes = c.failTimes || 0, c.H5Request && ++c.failTimes < c.maxRetryTimes) return b.__sequence([b.__processToken, b.__processRequestUrl, b.middlewares, b.__processRequest]);
                c.maxRetryTimes > 0 && (k(y, c.pageDomain, "*"), k(z, c.mainDomain, c.subDomain), k(A, c.mainDomain, c.subDomain)),
                a.retType = v.TOKEN_EXPIRED
            }
        }) : void a()
    },
    n.prototype.__processRequestUrl = function(b) {
        var c = this.params,
        d = this.options;
        if (d.hostSetting && d.hostSetting[a.location.hostname]) {
            var e = d.hostSetting[a.location.hostname];
            e.prefix && (d.prefix = e.prefix),
            e.subDomain && (d.subDomain = e.subDomain),
            e.mainDomain && (d.mainDomain = e.mainDomain)
        }
        if (d.H5Request === !0) {
            var f = "//" + (d.prefix ? d.prefix + ".": "") + (d.subDomain ? d.subDomain + ".": "") + d.mainDomain + "/h5/" + c.api.toLowerCase() + "/" + c.v.toLowerCase() + "/",
            g = c.appKey || ("waptest" === d.subDomain ? "4272": "12574478"),
            i = (new Date).getTime(),
            j = h(d.token + "&" + i + "&" + g + "&" + c.data),
            k = {
                jsv: x,
                appKey: g,
                t: i,
                sign: j
            },
            l = {
                data: c.data,
                ua: c.ua
            };
            Object.keys(c).forEach(function(a) {
                "undefined" == typeof k[a] && "undefined" == typeof l[a] && (k[a] = c[a])
            }),
            d.getJSONP ? k.type = "jsonp": d.getOriginalJSONP ? k.type = "originaljsonp": (d.getJSON || d.postJSON) && (k.type = "originaljson"),
            d.useJsonpResultType === !0 && "originaljson" === k.type && delete k.type,
            d.querystring = k,
            d.postdata = l,
            d.path = f
        }
        b()
    },
    n.prototype.__processUnitPrefix = function(a) {
        a()
    };
    var B = 0;
    n.prototype.__requestJSONP = function(a) {
        function b(a) {
            if (k && clearTimeout(k), l.parentNode && l.parentNode.removeChild(l), "TIMEOUT" === a) window[j] = function() {
                window[j] = void 0;
                try {
                    delete window[j]
                } catch(a) {}
            };
            else {
                window[j] = void 0;
                try {
                    delete window[j]
                } catch(b) {}
            }
        }
        var d = c(),
        g = this.params,
        h = this.options,
        i = g.timeout || 2e4,
        j = "mtopjsonp" + (g.jsonpIncPrefix || "") + ++B,
        k = setTimeout(function() {
            a("TIMEOUT::鎺ュ彛瓒呮椂"),
            b("TIMEOUT")
        },
        i);
        h.querystring.callback = j;
        var l = document.createElement("script");
        return l.src = h.path + "?" + f(h.querystring) + "&" + f(h.postdata),
        l.async = !0,
        l.onerror = function() {
            b("ABORT"),
            a("ABORT::鎺ュ彛寮傚父閫€鍑�")
        },
        window[j] = function() {
            h.results = Array.prototype.slice.call(arguments),
            b(),
            d.resolve()
        },
        e(l),
        d.promise
    },
    n.prototype.__requestJSON = function(b) {
        function d(a) {
            l && clearTimeout(l),
            "TIMEOUT" === a && i.abort()
        }
        var e = c(),
        g = this.params,
        h = this.options,
        i = new a.XMLHttpRequest,
        k = g.timeout || 2e4,
        l = setTimeout(function() {
            b("TIMEOUT::鎺ュ彛瓒呮椂"),
            d("TIMEOUT")
        },
        k);
        h.CDR && j(y) && (h.querystring.c = decodeURIComponent(j(y))),
        i.onreadystatechange = function() {
            if (4 == i.readyState) {
                var a, c, f = i.status;
                if (f >= 200 && 300 > f || 304 == f) {
                    d(),
                    a = i.responseText,
                    c = i.getAllResponseHeaders() || "";
                    try {
                        a = /^\s*$/.test(a) ? {}: JSON.parse(a),
                        a.responseHeaders = c,
                        h.results = [a],
                        e.resolve()
                    } catch(g) {
                        b("PARSE_JSON_ERROR::瑙ｆ瀽JSON澶辫触")
                    }
                } else d("ABORT"),
                b("ABORT::鎺ュ彛寮傚父閫€鍑�")
            }
        };
        var m, n, o = h.path + "?" + f(h.querystring);
        if (h.getJSON ? (m = "GET", o += "&" + f(h.postdata)) : h.postJSON && (m = "POST", n = f(h.postdata)), i.open(m, o, !0), i.withCredentials = !0, i.setRequestHeader("Accept", "application/json"), i.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), g.headers) for (var p in g.headers) i.setRequestHeader(p, g.headers[p]);
        return i.send(n),
        e.promise
    },
    n.prototype.__requestWindVane = function(a) {
        function d(a) {
            g.results = [a],
            e.resolve()
        }
        var e = c(),
        f = this.params,
        g = this.options,
        h = f.data,
        i = f.api,
        j = f.v,
        k = g.postJSON ? 1 : 0,
        l = g.getJSON || g.postJSON ? "originaljson": "";
        g.useJsonpResultType === !0 && (l = "");
        var m, n, o = "https" === location.protocol ? 1 : 0,
        p = f.isSec || 0,
        q = f.sessionOption || "AutoLoginOnly",
        r = f.ecode || 0;
        return n = "undefined" != typeof f.timer ? parseInt(f.timer) : "undefined" != typeof f.timeout ? parseInt(f.timeout) : 2e4,
        m = 2 * n,
        f.needLogin === !0 && "undefined" == typeof f.sessionOption && (q = "AutoLoginAndManualLogin"),
        "undefined" != typeof f.secType && "undefined" == typeof f.isSec && (p = f.secType),
        b.windvane.call("MtopWVPlugin", "send", {
            api: i,
            v: j,
            post: String(k),
            type: l,
            isHttps: String(o),
            ecode: String(r),
            isSec: String(p),
            param: JSON.parse(h),
            timer: n,
            sessionOption: q,
            ext_headers: {
                referer: location.href
            }
        },
        d, d, m),
        e.promise
    },
    n.prototype.__processRequest = function(a, b) {
        var c = this;
        return r.then(function() {
            var a = c.options;
            if (a.H5Request && (a.getJSONP || a.getOriginalJSONP)) return c.__requestJSONP(b);
            if (a.H5Request && (a.getJSON || a.postJSON)) return c.__requestJSON(b);
            if (a.WindVaneRequest) return c.__requestWindVane(b);
            throw new Error("UNEXCEPT_REQUEST::閿欒鐨勮姹傜被鍨�")
        }).then(a).then(function() {
            var a = c.options,
            b = (c.params, a.results[0]),
            d = b && b.ret || [];
            b.ret = d,
            d instanceof Array && (d = d.join(","));
            var e = b.c;
            a.CDR && e && i(y, e, {
                domain: a.pageDomain,
                path: "/"
            }),
            d.indexOf("SUCCESS") > -1 ? b.retType = v.SUCCESS: b.retType = v.ERROR,
            a.retJson = b
        })
    },
    n.prototype.__sequence = function(a) {
        function b(a) {
            if (a instanceof Array) a.forEach(b);
            else {
                var g, h = c(),
                i = c();
                e.push(function() {
                    return h = c(),
                    g = a.call(d,
                    function(a) {
                        return h.resolve(a),
                        i.promise
                    },
                    function(a) {
                        return h.reject(a),
                        i.promise
                    }),
                    g && (g = g["catch"](function(a) {
                        h.reject(a)
                    })),
                    h.promise
                }),
                f.push(function(a) {
                    return i.resolve(a),
                    g
                })
            }
        }
        var d = this,
        e = [],
        f = [];
        a.forEach(b);
        for (var g, h = r; g = e.shift();) h = h.then(g);
        for (; g = f.pop();) h = h.then(g);
        return h
    };
    var C = function(a) {
        a()
    },
    D = function(a) {
        a()
    };
    n.prototype.request = function(b) {
        var c = this;
        this.options = d(b || {},
        t);
        var e = o.resolve([C, D]).then(function(a) {
            var b = a[0],
            d = a[1];
            return c.__sequence([b, c.__processRequestMethod, c.__processRequestType, c.__processToken, c.__processRequestUrl, c.middlewares, c.__processRequest, d])
        }).then(function() {
            var a = c.options.retJson;
            return a.retType !== v.SUCCESS ? o.reject(a) : c.options.successCallback ? void c.options.successCallback(a) : o.resolve(a)
        })["catch"](function(a) {
            var b;
            return a instanceof Error ? (console.error(a.stack), b = {
                ret: [a.message],
                stack: [a.stack],
                retJson: v.ERROR
            }) : b = "string" == typeof a ? {
                ret: [a],
                retJson: v.ERROR
            }: void 0 !== a ? a: c.options.retJson,
            c.options.failureCallback ? void c.options.failureCallback(b) : o.reject(b)
        });
        return this.__processRequestType(),
        c.options.H5Request && (c.constructor.__firstProcessor || (c.constructor.__firstProcessor = e), C = function(a) {
            c.constructor.__firstProcessor.then(a)["catch"](a)
        }),
        ("get" === this.params.type && "json" === this.params.dataType || "post" === this.params.type) && (b.pageDomain = b.pageDomain || g(a.location.hostname), b.mainDomain !== b.pageDomain && (b.maxRetryTimes = 4, b.CDR = !0)),
        e
    },
    b.mtop = function(a) {
        return new n(a)
    },
    b.mtop.request = function(a, b, c) {
        var d = {
            H5Request: a.H5Request,
            WindVaneRequest: a.WindVaneRequest,
            LoginRequest: a.LoginRequest,
            AntiCreep: a.AntiCreep,
            AntiFlood: a.AntiFlood,
            successCallback: b,
            failureCallback: c || b
        };
        return new n(a).request(d)
    },
    b.mtop.H5Request = function(a, b, c) {
        var d = {
            H5Request: !0,
            successCallback: b,
            failureCallback: c || b
        };
        return new n(a).request(d)
    },
    b.mtop.middlewares = u,
    b.mtop.config = t,
    b.mtop.RESPONSE_TYPE = v,
    b.mtop.CLASS = n
} (window, window.lib || (window.lib = {})),
function(a, b) {
    function c(a) {
        return a.preventDefault(),
        !1
    }
    function d(a) {
        var b = new RegExp("(?:^|;\\s*)" + a + "\\=([^;]+)(?:;\\s*|$)").exec(document.cookie);
        return b ? b[1] : void 0
    }
    function e(b, d) {
        var e = this,
        f = a.dpr || 1,
        g = document.createElement("div"),
        h = document.documentElement.getBoundingClientRect(),
        i = Math.max(h.width, window.innerWidth) / f,
        j = Math.max(h.height, window.innerHeight) / f;
        g.style.cssText = ["-webkit-transform:scale(" + f + ") translateZ(0)", "-ms-transform:scale(" + f + ") translateZ(0)", "transform:scale(" + f + ") translateZ(0)", "-webkit-transform-origin:0 0", "-ms-transform-origin:0 0", "transform-origin:0 0", "width:" + i + "px", "height:" + j + "px", "z-index:999999", "position:" + (i > 800 ? "fixed": "absolute"), "left:0", "top:0px", "background:" + (i > 800 ? "rgba(0,0,0,.5)": "#FFF"), "display:none"].join(";");
        var k = document.createElement("div");
        k.style.cssText = ["width:100%", "height:52px", "background:#EEE", "line-height:52px", "text-align:left", "box-sizing:border-box", "padding-left:20px", "position:absolute", "left:0", "top:0", "font-size:16px", "font-weight:bold", "color:#333"].join(";"),
        k.innerText = b;
        var l = document.createElement("a");
        l.style.cssText = ["display:block", "position:absolute", "right:0", "top:0", "height:52px", "line-height:52px", "padding:0 20px", "color:#999"].join(";"),
        l.innerText = "鍏抽棴";
        var m = document.createElement("iframe");
        m.style.cssText = ["width:100%", "height:100%", "border:0", "overflow:hidden"].join(";"),
        i > 800 && (k.style.cssText = ["width:370px", "height:52px", "background:#EEE", "line-height:52px", "text-align:left", "box-sizing:border-box", "padding-left:20px", "position:absolute", "left:" + (i / 2 - 185) + "px", "top:40px", "font-size:16px", "font-weight:bold", "color:#333"].join(";"), m.style.cssText = ["position:absolute", "top:92px", "left:" + (i / 2 - 185) + "px", "width:370px", "height:480px", "border:0", "background:#FFF", "overflow:hidden"].join(";")),
        k.appendChild(l),
        g.appendChild(k),
        g.appendChild(m),
        g.className = "J_MIDDLEWARE_FRAME_WIDGET",
        document.body.appendChild(g),
        m.src = d,
        l.addEventListener("click",
        function() {
            e.hide();
            var a = document.createEvent("HTMLEvents");
            a.initEvent("close", !1, !1),
            g.dispatchEvent(a)
        },
        !1),
        this.addEventListener = function() {
            g.addEventListener.apply(g, arguments)
        },
        this.removeEventListener = function() {
            g.removeEventListener.apply(g, arguments)
        },
        this.show = function() {
            document.addEventListener("touchmove", c, !1),
            g.style.display = "block",
            window.scrollTo(0, 0)
        },
        this.hide = function() {
            document.removeEventListener("touchmove", c),
            window.scrollTo(0, -h.top),
            g.parentNode && g.parentNode.removeChild(g)
        }
    }
    function f(a) {
        var c = this,
        d = this.options,
        e = this.params;
        return a().then(function() {
            var a = d.retJson,
            f = a.ret,
            g = navigator.userAgent.toLowerCase(),
            h = g.indexOf("safari") > -1 && g.indexOf("chrome") < 0 && g.indexOf("qqbrowser") < 0;
            if (f instanceof Array && (f = f.join(",")), (f.indexOf("SESSION_EXPIRED") > -1 || f.indexOf("SID_INVALID") > -1 || f.indexOf("AUTH_REJECT") > -1 || f.indexOf("NEED_LOGIN") > -1) && (a.retType = l.SESSION_EXPIRED, !d.WindVaneRequest && (k.LoginRequest === !0 || d.LoginRequest === !0 || e.needLogin === !0))) {
                if (!b.login) throw new Error("LOGIN_NOT_FOUND::缂哄皯lib.login");
                if (d.safariGoLogin !== !0 || !h || "taobao.com" === d.pageDomain) return b.login.goLoginAsync().then(function(a) {
                    return c.__sequence([c.__processToken, c.__processRequestUrl, c.__processUnitPrefix, c.middlewares, c.__processRequest])
                })["catch"](function(a) {
                    throw "CANCEL" === a ? new Error("LOGIN_CANCEL::鐢ㄦ埛鍙栨秷鐧诲綍") : new Error("LOGIN_FAILURE::鐢ㄦ埛鐧诲綍澶辫触")
                });
                b.login.goLogin()
            }
        })
    }
    function g(a) {
        var b = this.options;
        this.params;
        return b.H5Request !== !0 || k.AntiFlood !== !0 && b.AntiFlood !== !0 ? void a() : a().then(function() {
            var a = b.retJson,
            c = a.ret;
            c instanceof Array && (c = c.join(",")),
            c.indexOf("FAIL_SYS_USER_VALIDATE") > -1 && a.data.url && (b.AntiFloodReferer ? location.href = a.data.url.replace(/(http_referer=).+/, "$1" + b.AntiFloodReferer) : location.href = a.data.url)
        })
    }
    function h(b) {
        var c = this,
        f = this.options,
        g = this.params;
        return g.forceAntiCreep !== !0 && f.H5Request !== !0 || k.AntiCreep !== !0 && f.AntiCreep !== !0 ? void b() : b().then(function() {
            var b = f.retJson,
            h = b.ret;
            if (h instanceof Array && (h = h.join(",")), h.indexOf("RGV587_ERROR::SM") > -1 && b.data.url) {
                var j = "_m_h5_smt",
                k = d(j),
                l = !1;
                if (f.saveAntiCreepToken === !0 && k) {
                    k = JSON.parse(k);
                    for (var m in k) g[m] && (l = !0)
                }
                if (f.saveAntiCreepToken === !0 && k && !l) {
                    for (var m in k) g[m] = k[m];
                    return c.__sequence([c.__processToken, c.__processRequestUrl, c.__processUnitPrefix, c.middlewares, c.__processRequest])
                }
                return new i(function(d, h) {
                    function i() {
                        m.removeEventListener("close", i),
                        a.removeEventListener("message", k),
                        h("USER_INPUT_CANCEL::鐢ㄦ埛鍙栨秷杈撳叆")
                    }
                    function k(b) {
                        var e;
                        try {
                            e = JSON.parse(b.data) || {}
                        } catch(l) {}
                        if (e && "child" === e.type) {
                            m.removeEventListener("close", i),
                            a.removeEventListener("message", k),
                            m.hide();
                            var n;
                            try {
                                n = JSON.parse(decodeURIComponent(e.content)),
                                "string" == typeof n && (n = JSON.parse(n));
                                for (var o in n) g[o] = n[o];
                                f.saveAntiCreepToken === !0 ? (document.cookie = j + "=" + JSON.stringify(n) + ";", a.location.reload()) : c.__sequence([c.__processToken, c.__processRequestUrl, c.__processUnitPrefix, c.middlewares, c.__processRequest]).then(d)
                            } catch(l) {
                                h("USER_INPUT_FAILURE::鐢ㄦ埛杈撳叆澶辫触")
                            }
                        }
                    }
                    var l = b.data.url,
                    m = new e("", l);
                    m.addEventListener("close", i, !1),
                    a.addEventListener("message", k, !1),
                    m.show()
                })
            }
        })
    }
    if (!b || !b.mtop || b.mtop.ERROR) throw new Error("Mtop 鍒濆鍖栧け璐ワ紒璇峰弬鑰僊top鏂囨。http://gitlab.alibaba-inc.com/mtb/lib-mtop");
    var i = a.Promise,
    j = b.mtop.CLASS,
    k = b.mtop.config,
    l = b.mtop.RESPONSE_TYPE;
    b.mtop.middlewares.push(f),
    b.mtop.loginRequest = function(a, b, c) {
        var d = {
            LoginRequest: !0,
            H5Request: !0,
            successCallback: b,
            failureCallback: c || b
        };
        return new j(a).request(d)
    },
    b.mtop.antiFloodRequest = function(a, b, c) {
        var d = {
            AntiFlood: !0,
            successCallback: b,
            failureCallback: c || b
        };
        return new j(a).request(d)
    },
    b.mtop.middlewares.push(g),
    b.mtop.antiCreepRequest = function(a, b, c) {
        var d = {
            AntiCreep: !0,
            successCallback: b,
            failureCallback: c || b
        };
        return new j(a).request(d)
    },
    b.mtop.middlewares.push(h)
} (window, window.lib || (window.lib = {})); !
function(a, b, c) {
    function d(a) {
        var b = new RegExp("(?:^|;\\s*)" + a + "\\=([^;]+)(?:;\\s*|$)").exec(g.cookie);
        return b ? b[1] : c
    }
    function e() {
        return h.indexOf("AliApp") > 0 || h.match(/ttid\=[^@]+@[^_]+_[^_]+_[\d\.]+/) || j.match(/ttid\=[^@]+@[^_]+_[^_]+_[\d\.]+/) || h.indexOf("WindVane") > 0
    }
    function f(a, b) {
        if (e()) {
            var c = g.createElement("a"),
            d = g.createEvent("HTMLEvents");
            c.style.display = "none",
            c.href = a,
            g.body.appendChild(c),
            d.initEvent("click", !1, !0),
            c.dispatchEvent(d)
        } else b ? location.replace(a) : location.href = a
    }
    var g = a.document,
    h = a.navigator.userAgent,
    i = location.hostname,
    j = a.location.search,
    k = b.login = b.login || {},
    l = /.*?([^.]+)(?:\.x|\.demo)?\.(taobao|tmall|etao|alibaba|alipay|aliyun|tdd)\.(com|net|la).*/i,
    m = function() {
        return i.match(/taobao\.com$/) ? "taobao.com": i.match(/taobao\.net$/) ? "taobao.net": i.match(/tdd\.la$/) ? "tdd.la": "taobao.com"
    } (),
    n = function() {
        var a;
        if (i.indexOf("x.taobao.net") > -1 || i.indexOf("demo.taobao.net") > -1) a = "waptest";
        else if (i.indexOf("tdd.la") > -1) {
            var a = "",
            b = i.match(l); ! b || "waptest" !== b[1] && "wapa" !== b[1] || (a = b[1])
        } else {
            var a = "m",
            b = i.match(l); ! b || "waptest" !== b[1] && "wapa" !== b[1] && "m" !== b[1] || (a = b[1])
        }
        return a
    } (),
    o = "login";
    k.config = {
        loginName: "login.htm",
        logoutName: "logout.htm",
        prefix: o,
        mainDomain: m,
        subDomain: n,
        protocol: location.protocol
    },
    k.isLogin = function(a) {
        if (!a || !b.mtop) {
            var d = this.getUserNick();
            return !! d
        }
        b.mtop.request({
            api: "mtop.user.getUserSimple",
            v: "1.0",
            data: {
                isSec: 0
            }
        },
        function(d) {
            d.retType === b.mtop.RESPONSE_TYPE.SUCCESS ? a(!0, d) : a(c)
        },
        function(d) {
            d.retType === b.mtop.RESPONSE_TYPE.SESSION_EXPIRED ? a(!1) : a(c)
        })
    },
    k.getUserNick = function() {
        var a = "",
        b = d("_w_tb_nick"),
        c = d("_nk_") || d("snk");
        return b && b.length > 0 && "null" != b ? a = decodeURIComponent(b) : c && c.length > 0 && "null" != c && (a = unescape(unescape(c).replace(/\\u/g, "%u"))),
        a
    },
    k.genUrl = function(a, b) {
        var c = k.config.protocol + "//" + (k.config.prefix ? k.config.prefix + ".": "") + (k.config.subDomain ? k.config.subDomain + ".": "") + k.config.mainDomain + "/" + k.config[(a || "login") + "Name"];
        return b !== !1 && (c += "?tpl_redirect_url=" + encodeURIComponent(b || location.href)),
        c
    },
    k.goLogin = function(a) {
        a = a || {},
        a.targetUrl = a.targetUrl || a.redirectUrl || a.rediUrl;
        var b = this.genUrl("login", a.targetUrl);
        f(b, a.replace)
    },
    k.goLogout = function(a) {
        a = a || {},
        a.targetUrl = a.targetUrl || a.redirectUrl || a.rediUrl;
        var b = this.genUrl("logout", a.targetUrl);
        f(b, a.replace)
    },
    k.getNickFromCookie = k.getUserNick
} (window, window.lib || (window.lib = {})); !
function(a, b) {
    a.loginedRequest = function(c, d) {
        function e() {
            c.retryed ? g.call(null, {
                errcode: "NOT_LOGINED",
                message: "璇ラ〉闈㈤渶瑕佺櫥褰曪紝璇峰埛鏂伴噸璇�!"
            }) : (h && h.call(), b.goLogin({
                hideType: {
                    succ: function() {
                        a.loginedRequest(c, d)
                    },
                    fail: function() {
                        c.retryed = !0,
                        a.loginedRequest(c, d)
                    }
                }
            }))
        }
        var f = d.succ,
        g = d.fail,
        h = d.beforeLogin;
        return b.isLogin() ? (a.request(c,
        function(a) {
            f && f.call(null, a)
        },
        function(a) {
            var b = {
                message: "绯荤粺閿欒",
                result: a
            };
            if (a && a.ret && a.ret.length) {
                var c = a.ret[0].split("::");
                if (2 === c.length) {
                    if (0 <= c[0].indexOf("SESSION_EXPIRED") || 0 <= c[0].indexOf("NEED_LOGIN") || 0 <= c[0].indexOf("FAIL_SYS_SESSION_EXPIRED")) return e(),
                    void 0;
                    b.errcode = c[0],
                    b.message = c[1]
                }
            }
            g && g.call(null, b)
        }), void 0) : (e(), void 0)
    }
} (window.lib.mtop, window.lib.login); !
function(a, b) {
    function c(a) {
        return a.preventDefault(),
        !1
    }
    function d(b, d) {
        var e = this,
        f = a.dpr || 1,
        h = document.createElement("div"),
        i = document.documentElement.getBoundingClientRect(),
        j = Math.max(i.width, window.innerWidth) / f,
        k = Math.max(i.height, window.innerHeight) / f;
        h.style.cssText = ["-webkit-transform:scale(" + f + ") translateZ(0)", "-ms-transform:scale(" + f + ") translateZ(0)", "transform:scale(" + f + ") translateZ(0)", "-webkit-transform-origin:0 0", "-ms-transform-origin:0 0", "transform-origin:0 0", "width:" + j + "px", "height:" + k + "px", "z-index:999999", "position:absolute", "left:0", "top:0px", "background:#FFF", "display:none"].join(";");
        var l = document.createElement("div");
        l.style.cssText = ["width:100%", "height:52px", "background:#EEE", "line-height:52px", "text-align:left", "box-sizing:border-box", "padding-left:20px", "position:absolute", "left:0", "top:0", "font-size:16px", "font-weight:bold", "color:#333"].join(";"),
        l.innerText = b;
        var m = document.createElement("a");
        m.style.cssText = ["display:block", "position:absolute", "right:0", "top:0", "height:52px", "line-height:52px", "padding:0 20px", "color:#999"].join(";"),
        m.innerText = "鍏抽棴";
        var n = document.createElement("iframe");
        n.style.cssText = ["width:100%", "height:100%", "border:0", "overflow:hidden"].join(";"),
        l.appendChild(m),
        h.appendChild(l),
        h.appendChild(n),
        g.body.appendChild(h),
        n.src = d,
        m.addEventListener("click",
        function() {
            e.hide();
            var a = g.createEvent("HTMLEvents");
            a.initEvent("close", !1, !1),
            h.dispatchEvent(a)
        },
        !1),
        this.addEventListener = function() {
            h.addEventListener.apply(h, arguments)
        },
        this.removeEventListener = function() {
            h.removeEventListener.apply(h, arguments)
        },
        this.show = function() {
            document.addEventListener("touchmove", c, !1),
            h.style.display = "block",
            window.scrollTo(0, 0)
        },
        this.hide = function() {
            document.removeEventListener("touchmove", c),
            window.scrollTo(0, -i.top),
            g.body.removeChild(h)
        }
    }
    function e(a, b) {
        this.request = a,
        this.response = b;
        var c = 0,
        d = {};
        this.on = function(a, b) {
            d[a] = b
        },
        this.next = function() {
            var b = m[c++];
            b ? a[b.__name__] ? b(this) : this.next() : this.end()
        },
        this.reset = function() {
            c = 0,
            d.reset && d.reset.call(this)
        },
        this.end = function() {
            d.end && d.end.call(this)
        }
    }
    function f(a, b) {
        b.__name__ = a,
        m.push(b)
    }
    var g = a.document,
    h = a.navigator.userAgent,
    i = h.match(/WindVane[\/\s]([\d\.\_]+)/);
    i && (i = i[1]);
    var j, k, l = h.match(/AliApp\(([^\/]+)\/([\d\.\_]+)\)/i);
    l && (j = l[1], k = l[2]),
    b.mtop = b.mtop || {},
    b.mtop.middleware = {};
    var m = [];
    b.mtop.middleware.pipe = function(a, b) {
        return new e(a, b)
    },
    b.mtop.middleware.add = f,
    f("LoginRequest",
    function(a) {
        function c() {
            a.reset()
        }
        function d() {
            a.response && a.response.ret.push("MW_ERROR::LOGIN_FAILURE"),
            a.end()
        }
        function e() {
            a.response && a.response.ret.push("MW_ERROR::WIDGET_CANCEL"),
            a.end()
        }
        var f = (a.response && a.response.ret || []).join(",");
        f.indexOf("SESSION_EXPIRED") > -1 || f.indexOf("SID_INVALID") > -1 || f.indexOf("AUTH_REJECT") > -1 || f.indexOf("NEED_LOGIN") > -1 ? b.login.goLogin(function(a) {
            "SUCCESS" === a ? c() : "CANCEL" === a ? e() : d()
        }) : a.next()
    }),
    f("AntiCreep",
    function(b) {
        function c() {
            h.removeEventListener("close", c),
            a.removeEventListener("message", e),
            b.response && b.response.ret.push("MW_ERROR::WIDGET_CANCEL"),
            b.end()
        }
        function e() {
            h.removeEventListener("close", c),
            a.removeEventListener("message", e);
            var d = JSON.parse(g.data) || {};
            if (d && "child" === d.type) {
                var f;
                try {
                    f = JSON.parse(decodeURIComponent(d.content)),
                    "string" == typeof f && (f = JSON.parse(f))
                } catch(g) {
                    f = null
                }
                if (f) {
                    for (var i in f) b.request[i] = f[i];
                    b.reset()
                } else b.response && b.response.ret.push("MW_ERROR::SM_FAILURE"),
                b.end();
                h.hide()
            } else b.end()
        }
        var f = (b.response && b.response.ret || []).join(",");
        if (!l && f.indexOf("RGV587_ERROR::SM") > -1 && b.response.data.url) {
            var g = b.response.data.url,
            h = new d("", g);
            h.addEventListener("close", c, !1),
            a.addEventListener("message", e, !1),
            h.show()
        } else b.next()
    }),
    f("AntiFlood",
    function(a) {
        var b = (a.response && a.response.ret || []).join(",");
        if (!l && b.indexOf("FAIL_SYS_USER_VALIDATE") > -1 && a.response.data.url) {
            var c = a.response.data.url;
            location.href = c
        } else a.next()
    })
} (window, window.lib || (window.lib = {})); !
function(a, b) {
    function c() {
        var a = {},
        b = location.search;
        if (b) {
            var c = b.slice(1).split("&");
            if (c.length) for (var d = 0; d < c.length; d++) if (c[d] && -1 != c[d].indexOf("=")) {
                var e = c[d].split("=");
                a[e[0]] = e[1]
            }
        }
        return a
    }
    function d(a) {
        var b = j.createElement("img");
        b.style.cssText = "display:none",
        b.src = a,
        j.body.appendChild(b)
    }
    function e(a) {
        var b = document.cookie;
        if (name = a + "=", start = b.indexOf(name), start < 0) return null;
        start += name.length;
        var c = b.indexOf(";", start);
        return c = -1 == c ? b.length: c,
        b.substring(start, c)
    }
    function f(a) {
        a = a || {};
        var b = a.apuri || a.ap_uri,
        c = "1" === e("ntm") ? !0 : !1,
        f = {};
        if (b || c) {
            b && (f.apuri = b),
            c && (f.fresh = 1),
            f.logtype = 2,
            f.cache = parseInt((Math.random() + 1) * Date.now());
            var g = [];
            for (var h in f) g.push(h + "=" + encodeURIComponent(f[h]));
            d("http://wgo.mmstat.com/sb.1.1?" + g.join("&"))
        }
    }
    function g() {
        var a = c(),
        b = a.ttid,
        d = /[^@]+\@taobao\_(iphone|android|apad|ipad)\_[\d.]+/i;
        return b = b ? decodeURIComponent(b) : "",
        d.test(b)
    }
    function h() {
        return !! a.navigator.userAgent.match(/WindVane/)
    }
    function i() {
        return !! a.navigator.userAgent.match(/AlipayClient/i)
    }
    var j = a.document,
    k = j.cookie.match(/(?:^|\s)cna=([^;]+)(?:;|$)/);
    k && (k = k[1]);
    var l = j.createElement("frame"),
    m = function(a) {
        var b = this,
        c = navigator.standalone,
        d = navigator.userAgent;
        return null != d.match(/iPhone|iPod|iPad/i) ? (this.platform = "ios", this.isIpad = null != d.match(/iPad/i)) : null != d.match(/Android/i) ? null != d.match(/Mobile/i) && (this.platform = "android", this.isChrome = null != d.match(/Chrome/i) && null == d.match(/Version\/\d+\.\d+(\.\d+)?\sChrome\//i)) : null != d.match(/Linux/i) && (this.platform = "android"),
        !this.platform || c ? (this.invaliable = !0, null) : (this.init(a) && (this.create(), window.onblur = function() {
            clearTimeout(b.timeload),
            b.timeload = null
        }), this)
    };
    m.prototype = {
        constructor: m,
        init: function(a) {
            var b = this.options = a,
            d = b.isInstance ||
            function() {
                return h() || g() || i()
            };
            if (d()) return this.invaliable = !0,
            null;
            a.version || (a.version = "v1"),
            this.cover = b.cover || !1,
            this.isDownload = b.download || !1,
            this.timeout = b.timeout || 1e3;
            var e = b.from || "h5",
            f = b.crossplat || !1;
            if ("ios" != this.platform || f) {
                var l = b.url || "http://m.taobao.com/channel/act/sale/tbdl1.html";
                l += -1 == l.indexOf("?") ? "?": "&",
                l += location.search.slice(1),
                this.bannerUrl = l
            } else this.bannerUrl = b.appstoreUrl || (this.isIpad ? "https://itunes.apple.com/app/id438865278": "http://itunes.apple.com/cn/app/id387682726?mt=8");
            if (b.href) {
                var m = b.href,
                n = c(),
                o = j.getElementById("buried"),
                p = n.ttid || o && o.value,
                q = n.refid,
                r = n.ali_trackid,
                s = n.pid,
                t = n.actparam,
                u = n.actname,
                v = n.ad_id,
                w = n.source_type,
                x = {
                    from: e
                };
                if (p && (x.ttid = p), q && (x.refid = q), r && (x.ali_trackid = r), s && (x.pid = s), t && (x.actparam = t), u && (x.actname = u), v && (x.ad_id = v), w && (x.source_type = w), x.url = encodeURIComponent(location.href.split(/[?#]/)[0]), k && (x.h5_uid = k), x.ap_uri = "", b.point) for (var y in b.point) x[y] = b.point[y];
                if (x = encodeURIComponent(JSON.stringify(x)), m = m.split("#"), -1 == m[0].indexOf("?") ? m[0] += "?": m[0].indexOf("?") != m.length - 1 && (m[0] += "&"), m[0] += "point=" + x, m = m.join("#"), m = -1 != m.indexOf("://") ? m: "taobao://" + m, this.isChrome) {
                    var z = m.split("://"),
                    A = z[0],
                    B = z[1],
                    C = b.bag || "com.taobao.taobao";
                    m = "intent://" + B + "#Intent;scheme=" + A + ";package=" + C + ";end"
                }
                this.paramUrl = m
            }
            return ! 0
        },
        reset: function(a) {
            this.iClose || (this.init(a), this.resetHtml && this.resetHtml(a))
        },
        create: function() {
            this.iClose || (l.parentNode || (l.setAttribute("id", "J_smartFrame"), l.style.cssText = "display:none", j.body.appendChild(l)), this.frame = l)
        },
        download: function(b) {
            var c = Date.now(); (!b || c - b < this.timeout + 200) && (this.cover ? a.location.replace(this.bannerUrl) : a.location.href = this.bannerUrl)
        },
        redirect: function(b) {
            var c = this.options && this.options.version,
            d = this.frame,
            e = b ? "click_sb_" + c + "_manual": "click_sb_" + c + "_auto";
            this.paramUrl && (f({
                ap_uri: e
            }), this.paramUrl = this.paramUrl.replace("%22ap_uri%22%3A%22%22", encodeURIComponent('"ap_uri":"' + e + '"')), this.isChrome ? a.location.href = this.paramUrl: d && d.setAttribute("src", this.paramUrl))
        },
        install: function(a) {
            var b = this,
            c = Date.now();
            b.isDownload || (b.timeload = setTimeout(function() {
                b.download(c)
            },
            b.timeout)),
            b.redirect(a)
        }
    },
    b.smartbanner = function(a) {
        var c = a.type,
        d = b.smartbanner.BannerUI,
        e = b.smartbanner.PopUI;
        if ("banner" !== c && c) {
            if ("pop" === c) {
                if (e) return new e(a)
            } else if ("func" === c) return b.smartbanner.getInstance(a)
        } else if (d) return new d(a)
    },
    b.smartbanner.getInstance = function(a, b) {
        b || (b = Object.create({}));
        for (var c in m.prototype) b[c] = m.prototype[c];
        return m.call(b, a)
    },
    b.smartbanner.aplus = f,
    b.smartbanner.getParam = c,
    b.smartbanner.ttidInTaobaoApp = g,
    b.smartbanner.uaInTaobaoApp = h
} (window, window.lib || (window.lib = {})),
function(a, b) {
    function c(a) {
        var b = document.cookie;
        if (name = a + "=", start = b.indexOf(name), start < 0) return null;
        start += name.length;
        var c = b.indexOf(";", start);
        return c = -1 == c ? b.length: c,
        b.substring(start, c)
    }
    function d() {
        var a = decodeURIComponent(c("imewweoriw"));
        return a && a.length > 32
    }
    function e(a) {
        var b = window.localStorage;
        if (b) {
            var c = b[a],
            d = !1;
            if (c) {
                var c = parseInt(c, 10),
                e = new Date;
                e.setHours(0),
                e.setMinutes(0),
                e.setSeconds(0),
                e.setMilliseconds(0),
                c > e && (d = !0)
            }
            return d
        }
    }
    function f(a, b) {
        a = a || 0;
        var e = navigator.userAgent,
        f = j.ali_trackid,
        g = Boolean(f),
        h = c("tkmb"),
        i = h ? h.split("&") : null,
        k = /400000_.*@\w+_(iphone|android)_.*/i,
        l = /.+@taobao_(iphone|android|apad|ipad)_.+/i,
        m = j.ttid,
        n = m ? decodeURIComponent(m) : "",
        o = "" != n ? !0 : !1,
        p = j.ut_sk,
        q = p ? decodeURIComponent(p) : "",
        r = "" != q ? !0 : !1,
        s = q.match(/.+_(\d+)_.+/),
        t = j.iv,
        u = k.test(n),
        v = t && 1 == t || i && "iv=1" === i[1],
        w = "undefined" != typeof t && 1 == t || i && "iv=0" === i[1],
        x = g && null != f.match(/^1_.+/i) && ("undefined" == typeof b || 1 == b),
        y = g && null != f.match(/^1_.+/i) && "undefined" != typeof b && 0 == b,
        z = !0; (o && l.test(n) || null != e.match(/WindVane/)) && (z = !1, !r || null == s || 12278902 != s[1] && 21380790 != s[1] || (z = !0)),
        null != e.match(/AlipayClient/i) && (z = !1);
        var A = "000";
        if (z) {
            var B = "1",
            C = "2",
            D = "1",
            E = "1",
            F = "2";
            u || v || x ? B = "0": (w || y) && (B = "2"),
            null != e.match(/QQ/i) ? C = "0": null != e.match(/UCBrowser|UCWeb/i) ? C = "1": null != e.match(/Weibo/i) && (C = "3"),
            d() && (D = "0");
            var G = c("_w_app_lg"),
            H = 1,
            I = 2;
            G && (null != e.match(/iPhone|iPod/i) && G & H ? E = "0": null != e.match(/Android/i) && G & I && (E = "0"));
            var J = document.referrer;
            u || null != e.match(/MicroMessenger/i) || null != J.match(/(t\.sina)|(weibo\.com)|(weibo\.cn)|(sina\.com)|(t\.cn)|(sinaurl)|(3g\.sina)|(iask\.cn)/i) ? F = "1": (null != J.match(/(qq|baidu|hao123|google|soso)\.com/i) || null != J.match(/(m|wap)\.taobao\.com/i) || o && null != n.match(/^(12tx0065|b0tx02|eguc01|001001|51uc0003)$/i)) && (F = "0");
            try {
                A = window.strategy[a][B + C + D + E + F]
            } catch(K) {
                A = "000",
                console.log(K)
            }
        }
        var L = {};
        return A && ("1" == A.charAt(0) && (L.isInvoke = !0), "1" == A.charAt(1) && (L.isShow = !0), "1" == A.charAt(2) && (L.isInvokeDay = !0)),
        L
    }
    function g(a, b, c) {
        if (a) {
            var d, g = f(b, c);
            if (g.isInvoke && (d = d || i(a), d && d.redirect()), g.isShow && (d = d || i(a)), g.isInvokeDay && (d = d || i(a), !e("cloudDate"))) {
                d && d.redirect();
                try {
                    localStorage.cloudDate = Date.now()
                } catch(h) {
                    console.log(h)
                }
            }
            return d
        }
    }
    var h = document,
    i = b.smartbanner,
    j = (i.aplus, i.getParam()),
    k = String.fromCharCode(97 + parseInt(24 * Math.random(), 10)),
    l = k + parseInt(1e7 * Math.random(), 10).toString(16),
    m = k + parseInt(100 * Math.random(), 10).toString(16),
    n = m + "dsk",
    o = function(a) {
        a.version = "v1",
        i.getInstance(a, this),
        this.calClose() || this.invaliable || (this.setParam(a), this.createHtml())
    };
    o.prototype = {
        constructor: o,
        calClose: function() {
            var a = window.localStorage;
            if (a) {
                var b = a.closeDate;
                if (b) {
                    var b = parseInt(b, 10),
                    c = new Date;
                    c.setHours(0),
                    c.setMinutes(0),
                    c.setSeconds(0),
                    c.setMilliseconds(0),
                    b > c && (this.iClose = !0)
                }
                return this.iClose
            }
        },
        setParam: function(a) {
            var b = a.color ? "color:" + a.color + ";": "",
            c = a.bgcolor ? "background-color:" + a.bgcolor + ";": "";
            this.styles = b + c,
            this.isHide = a.hide || !1,
            this.text = a.text || "绔嬪嵆鎵撳紑",
            this.title = a.title || "涓婃墜鏈烘窐瀹濆鎴风锛屼繚闅滀氦鏄撳畨鍏�",
            this.icon = a.icon || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAA3NCSVQICAjb4U/gAAABy1BMVEX/////aTL/RAD/aTL/RAD/aTL/ZzD/RAD/aTL/RAD/ZzD/RgL/aTL/RAD//////fz/+/n/+ff/+PX/9/X/9/T/9fH/8+//8+3/8ev/8ez/7ef/7OX/6+P/6eH/6N//5t3/5Nr/4tf/4df/4NX/39P/3dH/3M//287/2cz/18n/1sf/1cX/08P/0cD/0L//z73/zbv/zLn/y7j/y7n/ybX/yLP/xrH/xa//w63/wKn/v6j/vab/vaX/vKP/uZ//uqH/t53/t5v/tZn/tZr/s5f/sZX/sJP/r5H/rY//q43/qYv/p4f/pYX/o4P/oX7/n3z/nXr/nHf/nHj/mXT/mXP/l3H/lW//k2z/lG3/k2v/kWb/kWn/jmb/jWT/jGL/i2D/iV7/iF3/hVj/g1b/glT/gVP/gVT/f1H/fU7/fk7/fEz/e0r/eUj/eEf/dkT/c0D/dEL/cj7/cT7/cDz/bjr/bzr/bTj/bDf/ajT/aTL/ZzD/Zi7/ZS7/ZCz/Yyr/ZCr/Yij/YCb/XiP/XiT/XCD/XCL/Wh7/WBz/Vxr/Vhn/VBj/VBb/UhT/URL/UBD/Tg7/Tgz/TAr/TAv/Sgj/Sgn/SAb/RwT/RgL/RACuODADAAAAmXRSTlMAEREiM0SIiJnM3d3u7v////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+SMNVfAAAACXBIWXMAAAsSAAALEgHS3X78AAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAA8VJREFUWIXNl+lf0zAYxyMiiEqGwgABxaOKk9N5IKhjKsqQgSeHikPEewgqiGwcbqN2sG7OW/9ckzxZmo7hsbzx92J98jzP79s2TdrPEEKbtu4I5aUdRZsR0ZY87QyxBaHN2/L3E8ImVKTiD4WKkNIFhELbUFhR6oAFRakDFhWlDlhSlDpgeQMt3p7fqGQTitj0uPNwxyiLxrCj0fc88kfZAX2YqpOGJ1l4/N8AjxzMhYcikdkyFgVIdnm8t8OtHSCjaq35ytPfAS6AH7dFIr0sODIz7D3CqRlpw3ZAVNJ53tMSXahhwS7ZWZ0J3GHJYwM84B3Xon77SXuuPpkh9aB3J1zYsgRYkQX34F6ZdwpzWcvAjNUwAYQLVgbFbLp3SnPfisXOCr/z4kNbQw/Lli+JBHqfQ2NgLi+nv44ZufQKSvdFAumSQuPs8LqK9tT2P2Dz36XbxKB4QIxtgDPYR37n6mhL1Wu9mR7r39kB8Hi6cgIekkpzWJ89QY47n+lwIzWarMt6LcyzBTCEYntpqe6NYUwcdASMhVq8Xu0GZF3CJQHGYMnVEoLx1DBacvgFoN4CxC0FD8JFv6IDtpT8waALzhgEzcbZBOFKYZIBccPP1smepXg8sps8wEGSa2WGVtEDAKcFWLVprpGWfSSad1UEaIYDRAcAysQ4C7Aa7yJlbXVVnwwGJqn4LUyC5jgAW4C1LBn1GO9eW3uZawoxPr3GAXqmHyWy5SWTkEhMbwBIcIBoXw9ox7gpkZg7xAX70slHvvUAM0tR4uiRxm2sv41ExvjZuGkCwCHq6wB0Ep+bsSmqRTI+xgzHTNNDHvFoBuC0AEm76AaoTCSHWFs/SXBAMklfNk3JJADqhCELMFVBqueSyX7WNiQDgvT4lgMOW4CUrHn24nyRSsEHYpSkOCBleOnxUgoALcKCPkhaZvtRI9EIa+sjEQCO9sI7uZKvg9PCIwNWYDMFSDgJ7YHp6aP2hXAHduPFXIDoflbbmyJxqhpny8NeMC74Yl23AOmMuB/fZKPhLPuJqXScvC/afDB8IWwCENkHpWoTxn7pi9Z0JURT7u5wGtZV/QcL8JEr1g7N/kxiye9pbDjn6Rt5lKAjljM90DT4UQh9Fpqg81Ohf86lMK45daOng3+wWtNWBX2yZHZj3P0pp+7K89FkSBVk65vWorkBZyx75UBarqCvf6XQoLezQXM0uLonTHsFfVGUOuCbov4DwHdFqQN+KEodsF3Nvx0VqwGKUUGpir+0AKHC0p95q7SQ/n0vKC7Jz15STM7/C0WkvAQNIbFkAAAAAElFTkSuQmCC",
            this.isIpad && (this.title = this.title.replace(/(鎵嬫満)?娣樺疂/gi, "娣樺疂HD"))
        },
        template: function() {
            var a = this.isHide,
            b = ['<div id="' + l + '" class="' + n + '" ' + (a ? 'style="display:none"': "") + ">", '<a id="' + l + '-close" class="' + m + '-close" href="#"></a>', '<a id="' + l + '-open" class="' + m + '-point" href="#">', '<p class="' + m + '-font">', '<b class="' + m + '-taobao"><img src = "' + this.icon + '"></b>', "<span>" + this.title + "</span>", '<b class="' + m + '-dl" style="' + this.styles + '">' + this.text + "</b>", "</p>", "</a>", "</div>"];
            return b.join("")
        },
        resetHtml: function(a) {
            this.setParam(a);
            var b = ['<b class="' + m + '-taobao"></b>', "<span>" + this.title + "</span>", '<b class="' + m + '-dl" style="' + this.styles + '">' + this.text + "</b>"].join("");
            this.smartDom && (this.smartDom.querySelector("." + m + "-font").innerHTML = b)
        },
        createHtml: function() {
            if (!this.iClose) {
                var a = this.template(),
                b = h.createElement("style"),
                c = h.createElement("div"),
                d = this.options.dpr || window.dpr || 1;
                c.innerHTML = a,
                this.smartDom = c.querySelector("#" + l),
                this.popDom = i({
                    type: "pop",
                    title: this.title,
                    dpr: d
                }),
                b.innerHTML = "." + n + "{background-color:rgba(66,66,74,0.96);position:fixed;bottom:0;left:0;height:" + 68 * d + "px;width:100%;font-size:1rem;z-index:1000;font-size:" + 14 * d + "px}." + m + "-point{color:#fff;display:block;text-decoration:none;height:100%;}." + m + "-close{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA61pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcFJpZ2h0czpNYXJrZWQ9IkZhbHNlIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NUY0MDYzNjgzODIwNjgxMUIzQzJGMTE5OTQ3OTlEMzUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEVFNkRGMzUxNDdGMTFFMzk0QzNCQ0VGODJBOTdBMTUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEVFNkRGMzQxNDdGMTFFMzk0QzNCQ0VGODJBOTdBMTUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTMyBXaW5kb3dzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InV1aWQ6QzBFQ0RDNjM1RjEwRTMxMUJBQzZBQjEyRDc5RTUwOEIiIHN0UmVmOmRvY3VtZW50SUQ9InV1aWQ6RDE1N0E1MDlBQTBGRTMxMThCRTc4OEMyQUI0QTU3NzAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4dUF9zAAADBklEQVR42syYy28ScRDHeQnySgmRaBoCSA+tGqHh0ISoCWcCiQe5efUARzlgCokV/wQInPkjPBgPNjRgND7qK7xiChYwiKTaUoq2iDPJbrL+sssuj9KdZLLZV/LZmfl9Z34rlUgkfomITA6+LCKeE7EBHYsNqCc2oD2xAbXEBrQ7EshqteojkUjY5XKZ8/n8J67nvF7vSjAYfKBWq5vFYvH7FEAVTqDFxUVNOBx+vLCw4DQajdcdDodqa2trm3zO7/df9fl8j1Qq1cWlpaVbcCwWCoXWJCsM/DMnUCwWi+r1+mv0ucFguOJ0OtUA9Y4JA9HZkMlk5/FcKpXK7Xb7zXq9/rzVavXGBPoB3pBx3e10OmXymsViuQ2g9+g0MWFo6/f738AOJohQe6RS53K5jxgRSNkK8zqcL7vdbvPq6updEubo6Gg3mUxGIUKHY8IMwT/wKjWmhw1Ko9FYIT0KEiadTscqlcrPCaKD6aoK6mUIhQWNNcT1DKSpATDRUqm0N+HqwvLYF9xccXWtra1d0ul0l8l7g8HgANIUngLmN5UuTJtEJuQNLGCTyeRmHRfkcn0gELgzhfZ8we8SPH7QOkMWMFnoUOS6bDb7dgLtQRn5KwiI1BlGmnpw7dwMoMpUQfMPaJgmtshgAUPN3DebzQqEIKFI8RxhWMTbgifGUCj0UKlUXiBhUqnUOhYwRgIjwgK10u1289Vq9RcP0GtUC8FAWq22gW0A2wFDZ/5b2mxQzWbzaSaTecYDswNeG2umxgYJAli22Ww3IDLNRCKxziZ6TChQ6CfxeDwtIFVv6GVOmpRv1wE1YWq324fw5SObpcfjsW5ubtYErKosjqpcD/ACzdBwab8kV9VZbYOGlN7wzknzAKI7eV0MG0VMEwplQww71xPwV+BjzdinBYSi+II6nvnefofSmT9n/bNhn2oHNS7RmxcQil0R/D1bbxrXFFO8iympgH+lCngmNglQB7e82EeZk948gY4piA4F0T9NFVUQRTmk6gCbXxd/j9C7gXnZPwEGAGrNPc1RZ9hjAAAAAElFTkSuQmCC) no-repeat;background-size:" + 18 * d + "px;width:" + 20 * d + "px;height:" + 20 * d + "px;position:absolute;left:0;top:0;z-index:10;}." + m + "-font{margin:0;padding:" + 20 * d + "px " + 8 * d + "px 0 " + 8 * d + "px;display:-webkit-box;height:" + 32 * d + "px;overflow:hidden;-webkit-box-align:center;}." + m + "-font > span{-webkit-box-flex:1;display:block;margin:0 " + 12 * d + "px;line-height:120%;}." + m + "-taobao{width:" + 30 * d + "px;height:" + 30 * d + "px;display:inline-block;vertical-align:top;}." + m + "-taobao img{width:100%;height:100%;}." + m + "-dl{display:block;color:#3d4245;background-color:#e5e5e5;border-radius:" + 5 * d + "px;height:" + 30 * d + "px;line-height:" + 30 * d + "px;text-align:center;padding:0 " + 12 * d + "px;font-weight:normal;}",
                h.body.appendChild(b),
                h.body.appendChild(this.smartDom),
                this.listen()
            }
        },
        show: function() {
            this.iClose || this.smartDom && (this.smartDom.style.display = "block")
        },
        hide: function() {
            this.iClose || this.smartDom && (this.smartDom.style.display = "none")
        },
        pop: function() {
            this.iClose || this.popDom && this.popDom.open()
        },
        listen: function() {
            if (!this.iClose) {
                var a = this,
                b = a.smartDom;
                b.querySelector("#" + l + "-close").addEventListener("click",
                function(b) {
                    b.preventDefault(),
                    a.hide();
                    try {
                        localStorage.closeDate = Date.now(),
                        a.calClose()
                    } catch(b) {}
                },
                !1),
                b.querySelector("#" + l + "-open").addEventListener("click",
                function(b) {
                    b.preventDefault(),
                    a.install(!0)
                })
            }
        }
    },
    b.smartbanner.expiresInDay = e,
    b.smartbanner.smtStatus = f,
    b.smartbanner.sbLogic = g,
    b.smartbanner.BannerUI = o
} (window, window.lib || (window.lib = {})),
function(a, b) {
    function c(a) {
        return a.preventDefault(),
        !1
    }
    var d, e, f, g, h, i = a.document,
    j = a.localStorage,
    k = b.smartbanner,
    l = (k.aplus, !1),
    m = ['<div class="c-smartpop">', '<section class="header">', '<a href="javascript:void(0)"></a>', "</section>", '<section class="title">', "<span>娣樺疂瀹㈡埛绔笉浠呭彲浠ユ洿娴佺晠鍦版敹钘忓疂璐濓紝杩樿兘鍒嗕韩锛岀珛鍒讳笅杞戒綋楠岋紒</span>", "</section>", '<section class="banner">', '<img border="0"></img>', "</section>", '<section class="action">', '<a href="javascript:void(0)">绔嬪嵆鎵撳紑</a>', "</section>", "</div>"].join(""),
    n = document.createElement("div"),
    o = document.createElement("style");
    try {
        j.setItem("testPrivateModel", "false")
    } catch(p) {
        j = null
    }
    var q = function(a) {
        a.version = "v2",
        k.getInstance(a, this),
        this.title = a.title,
        this.isIpad && this.title && (this.title = this.title.replace(/(鎵嬫満)?娣樺疂/gi, "娣樺疂HD")),
        this.banner = a.banner
    };
    q.prototype = {
        constructor: q,
        _render: function() {
            var a = this,
            b = a.options.dpr || 1,
            c = [".c-smartpop-wrap {", "width: 100%;height: 100%;top: 0;left: 0;position: absolute;z-index: 999;background: rgba(0,0,0,0);display: -webkit-box;-webkit-box-pack: center;-webkit-box-align: center;", "}", ".c-smartpop {", "width: 252px * @dpr;background-color: rgba(255,255,255,0.9);border: 1px solid rgba(51,51,51,0.18);-webkit-box-shadow: 0px 1px 8px 0px rgba(0,0,0,0.27);box-shadow: 0px 1px 8px 0px rgba(0,0,0,0.27);border-radius: 4px * @dpr;", "}", ".c-smartpop .header {", "width: 100%;height: 34px * @dpr;position: relative;", "}", ".c-smartpop .header a {", "display: inline-block;width: 14px * @dpr;height: 14px * @dpr;position: absolute;", "background: url(data:image/gif;base64,R0lGODlhHAAcAJEAAP///8zMzJmZmWZmZiH5BAAHAP8ALAAAAAAcABwAAAJWjICpyyk2TptMRGAlpdnd3XSKCHra+JVklXJt+C6re6L1NmMxuOalLvH9gMKhbmdEWJDGTFH1edJsSSDrNoVhrzim0vvdWn8+qexl5oarpjE7bHjLAgUAOw==) no-repeat 0 0;", "background-size: contain;top: 8px * @dpr;right: 8px * @dpr;opacity: 0.9;-webkit-tap-highlight-color:rgba(0,0,0,0);", "}", ".c-smartpop .title {", "height: 32px * @dpr;line-height: 16px * @dpr;font-size: 12px * @dpr;margin: 0 12px * @dpr 8px * @dpr;padding-left: 36px * @dpr;", "background: url(data:image/gif;base64,R0lGODlhOAA4ALMAAP//////zP/MzP/Mmf/MZv+Zmf+ZZv+ZM/+ZAP9mM/9mAP8zAMxmM8xmAAAAAAAAACH5BAAHAP8ALAAAAAA4ADgAAAT/EEgwjGoqY51v3x4nhuRmDFOakF3rvnAsN0kKsHKu79/E8MBgrjYQGo+dwQHJDC6b0Kh0Sq1ar9isdstFGgoGS6cmMKy6L0GqmDGkBBXXIpM4Uws2gDhPKQ8EAXxldkxqNkVuNoZ8fAVQKDaOgYxvAgQFA5MTAk0HeQqQjJZPLombTScSSgqUAI45phKkUYuMhDCRXpxJbwa1YjmHRzUAASuxAAfIJ1/MYBWOtbtCmnoKB4YrrYwKtQFGyNYKBgjd23zmKUfYuRmh36w2MbU3XjZPkJza8jD0nYtFErAzc4CYioIIV/iDcsrTOXQLUUng5PChvIhMIAW8xKxCHmiXpwYUwThsgoVmFc58GqeGDUkjizLck8lPRboJTRbtmhlPHSiTNyVkTLHHZk+ceNR5QxKqWAcbxo5S8vXmSFNxPy0qqjYNyNV6bSwOSBCKHgEhX4GFpQSng4EA0Wzc0hEORoKOzEgVKEiHXlcgZCe8EmKQ0lwgBwLZYytllhNAUAU4RkO5suXLmDNr3mx5MucOB9h8foHiMGeDo1skqGb68uqPnimHThEBADs=) no-repeat 0 center;", "background-size: 28px * @dpr 28px * @dpr;color: #666;", "}", ".c-smartpop .banner {", "height: 88px * @dpr;margin: 0 12px * @dpr 10px * @dpr;overflow: hidden;", "}", ".c-smartpop .banner img {", "border: 0px;width: 100%;height: 100%;", "}", ".c-smartpop .action {", "height: 28px * @dpr;text-align: center;margin: 0 auto 12px * @dpr;", "}", ".c-smartpop .action a {", "display: inline-block;height: 28px * @dpr;line-height: 28px * @dpr;background-color: rgb(255,102,0);", "border-radius: 3px * @dpr;text-align: center;-webkit-box-shadow: 0px 1px 1px 0px rgba(0,0,0,0.05), inset 0px 1px 3px 0px rgba(169,172,175,0.31);", "box-shadow: 0px 1px 1px 0px rgba(0,0,0,0.05), inset 0px 1px 3px 0px rgba(169,172,175,0.31);font-size: 14px * @dpr;", "color: #FFF;text-decoration: none;-webkit-tap-highlight-color:rgba(0,0,0,0);margin: 0 10px * @dpr;padding: 0 8px * @dpr;", "}", ".c-smartpop .action a:hover, .c-smartpop .action a.hover {", "background-color: #EF5F00;", "}"].join("").replace(/(\d+)px\s+\*\s+\@dpr/gi,
            function(a, c) {
                return parseFloat(c) * b + "px"
            });
            n.className = "c-smartpop-wrap",
            n.innerHTML = m,
            n.style.cssText = "display:none",
            d = n.querySelector(".c-smartpop"),
            e = n.querySelector(".header a"),
            f = n.querySelector(".title span"),
            g = n.querySelector(".banner"),
            e_bannerImg = n.querySelector(".banner img"),
            h = n.querySelector(".action a"),
            e.addEventListener("click",
            function(b) {
                b.preventDefault(),
                j && j.setItem("smpopCloseDate", Date.now()),
                a.close()
            },
            !1),
            h.addEventListener("touchstart",
            function() {
                h.className = "hover"
            },
            !1),
            h.addEventListener("touchend",
            function() {
                h.className = ""
            },
            !1),
            h.addEventListener("click",
            function(b) {
                b.preventDefault(),
                a.install(!0)
            },
            !1),
            o.innerHTML = c,
            i.body.appendChild(o),
            i.body.appendChild(n)
        },
        _show: function() {
            var b = this,
            d = a.scrollY,
            e = a.innerHeight;
            f.innerHTML = b.title,
            b.banner ? (g.style.display = "", e_bannerImg.setAttribute("src", b.banner)) : g.style.display = "none",
            n.style.top = d + "px",
            n.style.height = e + "px",
            n.style.display = "",
            n.addEventListener("touchmove", c, !1)
        },
        open: function() {
            if (!this.invaliable) {
                if (j) {
                    var a = parseInt(localStorage.getItem("smpopCloseDate")),
                    b = new Date;
                    if (b.setHours(0), b.setMinutes(0), b.setSeconds(0), b.setMilliseconds(0), a > b.getTime()) return
                }
                l || (l = !0, this._render()),
                this._show()
            }
        },
        close: function() {
            this.invaliable || l && (n.style.display = "none", n.removeEventListener("touchmove", c, !1))
        }
    },
    k.PopUI = q
} (window, window.lib || (window.lib = {}));