! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t(require("_")) : "function" == typeof define && define.amd ? define("dbsm-viewer-app", ["_"], t) : "object" == typeof exports ? exports["dbsm-viewer-app"] = t(require("_")) : e["dbsm-viewer-app"] = t(e._)
}("undefined" != typeof self ? self : this, (e => (() => {
    var t, r, n = {
            1289: (e, t, r) => {
                e.exports = {
                    ITEM_TYPES: r(1613).w$
                }
            },
            1613: (e, t) => {
                "use strict";
                t.w$ = t.cb = void 0, t.cb = "STATIC_PAGE_V2", t.w$ = {
                    DEFAULT: "DEFAULT",
                    STATIC_PAGE: "STATIC_PAGE",
                    STATIC_PAGE_V2: t.cb,
                    STORES_PRODUCT: "STORES_PRODUCT",
                    FORUM_POST: "FORUM_POST",
                    FORUM_CATEGORY: "FORUM_CATEGORY",
                    PRO_GALLERY_ITEM: "PRO_GALLERY_ITEM",
                    BLOG_POST: "BLOG_POST",
                    BLOG_CATEGORY: "BLOG_CATEGORY",
                    BLOG_TAGS: "BLOG_TAGS",
                    BLOG_ARCHIVE: "BLOG_ARCHIVE",
                    GROUPS_PAGE: "GROUPS_PAGE",
                    GROUPS_POST: "GROUPS_POST",
                    EVENTS_PAGE: "EVENTS_PAGE",
                    CHALLENGES_PAGE: "CHALLENGES_PAGE",
                    SEARCH_PAGE: "SEARCH_PAGE",
                    BOOKINGS_SERVICE: "BOOKINGS_SERVICE",
                    BOOKINGS_CALENDAR: "BOOKINGS_CALENDAR",
                    BOOKINGS_FORM: "BOOKINGS_FORM",
                    BREADCRUMBS_COMPONENT: "BREADCRUMBS_COMPONENT",
                    BLOG_HASHTAGS: "BLOG_HASHTAGS",
                    RESTAURANTS_ORDER_PAGE: "RESTAURANTS_ORDER_PAGE",
                    MEMBERS_AREA_PROFILE: "MEMBERS_AREA_PROFILE",
                    VIDEO_COMPONENT: "VIDEO_COMPONENT",
                    PORTFOLIO_COLLECTIONS: "PORTFOLIO_COLLECTIONS",
                    PORTFOLIO_PROJECTS: "PORTFOLIO_PROJECTS",
                    GIFT_CARD: "GIFT_CARD",
                    SCHEDULE_PAGE: "SCHEDULE_PAGE",
                    WIX_DATA_PAGE_ITEM: "WIX_DATA_PAGE_ITEM",
                    REVIEWS_COMPONENT: "REVIEWS_COMPONENT",
                    STORES_CATEGORY: "STORES_CATEGORY",
                    STORES_GALLERY_COMPONENT: "STORES_GALLERY_COMPONENT",
                    RESTAURANTS_MENU_PAGE: "RESTAURANTS_MENU_PAGE",
                    RESTAURANTS_MENU_COMPONENT: "RESTAURANTS_MENU_COMPONENT",
                    MEMBERS_AREA_PROFILE_TABS: "MEMBERS_AREA_PROFILE_TABS",
                    PROGRAMS_COMPONENT: "PROGRAMS_COMPONENT",
                    SERVICES_COMPONENT: "SERVICES_COMPONENT",
                    PAYMENT_PAGE: "PAYMENT_PAGE",
                    THANK_YOU_PAGE: "THANK_YOU_PAGE",
                    PROTECTED_PAGE: "PROTECTED_PAGE",
                    MEMBERS_AREA_AUTHOR_PROFILE: "MEMBERS_AREA_AUTHOR_PROFILE",
                    PRICING_PLANS: "PRICING_PLANS"
                }
            },
            7056: (e, t) => {
                "use strict";
                t.EM = t.Jr = void 0, t.Jr = "dataBinding", t.EM = "1380b703-ce81-ff05-f115-39571d94dfcd";
                var r = {}
            },
            3: e => {
                "use strict";

                function t(e) {
                    return t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    }, t(e)
                }
                var r = "User",
                    n = "Error",
                    o = "EDM",
                    a = function(e, r) {
                        e && "object" === t(e) && (e.errorGroup = r)
                    };
                e.exports = {
                    markUserError: function(e) {
                        return a(e, r)
                    },
                    isUserError: function(e) {
                        return e && e.errorGroup === r
                    },
                    markAppError: function(e) {
                        return a(e, n)
                    },
                    isAppError: function(e) {
                        return e && e.errorGroup === n
                    },
                    markEdmError: function(e) {
                        return a(e, o)
                    },
                    isEdmError: function(e) {
                        return e && e.errorGroup === o
                    },
                    markError: a,
                    isMarked: function(e) {
                        return !!e && void 0 !== e.errorGroup
                    },
                    USER_ERROR_GROUP: r,
                    APP_ERROR_GROUP: n,
                    EDM_ERROR_GROUP: o,
                    UNKNOWN_ERROR_GROUP: "Unknown"
                }
            },
            67: (e, t, r) => {
                "use strict";

                function n(e) {
                    return n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    }, n(e)
                }

                function o(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var n = t[r];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }

                function a(e, t) {
                    return a = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
                        return e.__proto__ = t, e
                    }, a(e, t)
                }

                function i(e) {
                    var t = function() {
                        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                        if (Reflect.construct.sham) return !1;
                        if ("function" == typeof Proxy) return !0;
                        try {
                            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
                        } catch (e) {
                            return !1
                        }
                    }();
                    return function() {
                        var r, o = c(e);
                        if (t) {
                            var a = c(this).constructor;
                            r = Reflect.construct(o, arguments, a)
                        } else r = o.apply(this, arguments);
                        return function(e, t) {
                            if (t && ("object" === n(t) || "function" == typeof t)) return t;
                            if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                            return s(e)
                        }(this, r)
                    }
                }

                function s(e) {
                    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return e
                }

                function c(e) {
                    return c = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
                        return e.__proto__ || Object.getPrototypeOf(e)
                    }, c(e)
                }
                var l = r(3),
                    d = function(e) {
                        ! function(e, t) {
                            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                            e.prototype = Object.create(t && t.prototype, {
                                constructor: {
                                    value: e,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), Object.defineProperty(e, "prototype", {
                                writable: !1
                            }), t && a(e, t)
                        }(d, e);
                        var t, r, n, c = i(d);

                        function d() {
                            var e;
                            ! function(e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, d);
                            for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
                            return e = c.call.apply(c, [this].concat(r)), Error.captureStackTrace && Error.captureStackTrace(s(e), e.constructor), e.name = d.name, l.markUserError(s(e)), e
                        }
                        return t = d, r && o(t.prototype, r), n && o(t, n), Object.defineProperty(t, "prototype", {
                            writable: !1
                        }), t
                    }(function(e) {
                        function t() {
                            var t = Reflect.construct(e, Array.from(arguments));
                            return Object.setPrototypeOf(t, Object.getPrototypeOf(this)), t
                        }
                        return t.prototype = Object.create(e.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e, t
                    }(Error));
                e.exports = {
                    UserCodeError: d
                }
            },
            3182: (e, t, r) => {
                "use strict";

                function n(e, t) {
                    var r = Object.keys(e);
                    if (Object.getOwnPropertySymbols) {
                        var n = Object.getOwnPropertySymbols(e);
                        t && (n = n.filter((function(t) {
                            return Object.getOwnPropertyDescriptor(e, t).enumerable
                        }))), r.push.apply(r, n)
                    }
                    return r
                }

                function o(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = null != arguments[t] ? arguments[t] : {};
                        t % 2 ? n(Object(r), !0).forEach((function(t) {
                            a(e, t, r[t])
                        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : n(Object(r)).forEach((function(t) {
                            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                        }))
                    }
                    return e
                }

                function a(e, t, r) {
                    return t in e ? Object.defineProperty(e, t, {
                        value: r,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : e[t] = r, e
                }
                var i = r(3),
                    s = r(67);
                e.exports = o(o({}, s), i)
            },
            1435: (e, t, r) => {
                "use strict";
                t.aU = t.pY = void 0;
                var n = r(5578);
                Object.defineProperty(t, "pY", {
                    enumerable: !0,
                    get: function() {
                        return n.convertToCustomFormat
                    }
                }), Object.defineProperty(t, "aU", {
                    enumerable: !0,
                    get: function() {
                        return n.convertFromCustomFormat
                    }
                });
                var o = r(1513)
            },
            9683: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.ConvertersComposer = void 0;
                var n = r(2794),
                    o = function(e) {
                        return null !== e && "object" == typeof e
                    },
                    a = function() {
                        function e() {
                            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                            this._converters = e
                        }
                        return e.prototype.convertToCustomFormat = function(e, t, r) {
                            var n;
                            if (void 0 === t && (t = new Set), void 0 === r && (r = !1), o(e)) {
                                if (t.has(e)) throw new TypeError("Converting circular structure to JSON");
                                t.add(e)
                            }
                            if (Array.isArray(e)) return this._convertArray(e, t);
                            var a = null === (n = this._findConverterToCustomFormat(e)) || void 0 === n ? void 0 : n.convertToCustomFormat(e, r);
                            return o(e) ? this._convertObject(a, e, t) : a
                        }, e.prototype.convertFromCustomFormat = function(e) {
                            var t, r = this,
                                a = e;
                            return Array.isArray(e) ? a = e.map((function(e) {
                                return r.convertFromCustomFormat(e)
                            })) : o(e) && (a = (0, n.mapValues)(e, this.convertFromCustomFormat.bind(this))), null === (t = this._findConverterFromCustomFormat(a)) || void 0 === t ? void 0 : t.convertFromCustomFormat(a)
                        }, e.prototype._convertObject = function(e, t, r) {
                            var o, a = this;
                            return o = "function" == typeof e.toJSON ? (0, n.mapValues)(e.toJSON(), (function(e) {
                                return a.convertToCustomFormat(e, r)
                            })) : (0, n.mapValues)(e, (function(e) {
                                return a.convertToCustomFormat(e, r)
                            })), r.delete(t), o
                        }, e.prototype._convertArray = function(e, t) {
                            var r = this,
                                n = e.map((function(e) {
                                    return r.convertToCustomFormat(e, t, !0)
                                }));
                            return t.delete(e), n
                        }, e.prototype._findConverterFromCustomFormat = function(e) {
                            return this._converters.find((function(t) {
                                return t.canConvertFromCustomFormat(e)
                            }))
                        }, e.prototype._findConverterToCustomFormat = function(e) {
                            return this._converters.find((function(t) {
                                return t.canConvertToCustomFormat(e)
                            }))
                        }, e
                    }();
                t.ConvertersComposer = a
            },
            7246: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.DateConverter = void 0;
                var r = function() {
                    function e() {}
                    return e.prototype.canConvertToCustomFormat = function(e) {
                        return e instanceof Date
                    }, e.prototype.convertToCustomFormat = function(e) {
                        return {
                            $date: e.toISOString()
                        }
                    }, e.prototype.canConvertFromCustomFormat = function(e) {
                        return this._isObjectWith$Date(e) && "string" == typeof e.$date && (t = e.$date, !Number.isNaN(Date.parse(t)));
                        var t
                    }, e.prototype.convertFromCustomFormat = function(e) {
                        return new Date(e.$date)
                    }, e.prototype._isObjectWith$Date = function(e) {
                        return !!e && "object" == typeof e && "$date" in e
                    }, e
                }();
                t.DateConverter = r
            },
            9287: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.DefaultConverter = void 0;
                var r = function() {
                    function e() {}
                    return e.prototype.canConvertToCustomFormat = function() {
                        return !0
                    }, e.prototype.convertToCustomFormat = function(e, t) {
                        return t && void 0 === e ? null : e
                    }, e.prototype.canConvertFromCustomFormat = function() {
                        return !0
                    }, e.prototype.convertFromCustomFormat = function(e) {
                        return e
                    }, e
                }();
                t.DefaultConverter = r
            },
            5578: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.convertFromCustomFormat = t.convertToCustomFormat = void 0;
                var n = r(9683),
                    o = r(7246),
                    a = r(9287),
                    i = new n.ConvertersComposer(new o.DateConverter, new a.DefaultConverter);
                t.convertToCustomFormat = function(e) {
                    return i.convertToCustomFormat(e)
                };
                t.convertFromCustomFormat = function(e) {
                    return i.convertFromCustomFormat(e)
                }
            },
            2794: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.mapValues = void 0, t.mapValues = function(e, t) {
                    var r = {};
                    return Object.keys(e).forEach((function(n) {
                        var o = t(e[n]);
                        void 0 !== o && (r[n] = o)
                    })), r
                }
            },
            1513: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.getBackendPackageNameFromImportName = t.generateBackendPackageWebMethodUrl = t.generatePackageWebMethodUrl = t.exceptionToWebMethodPayload = t.resultToWebMethodPayload = void 0;
                var n = r(5578);
                t.resultToWebMethodPayload = function(e, t) {
                    var r = t ? JSON.parse(JSON.stringify(e, t)) : (0, n.convertToCustomFormat)(e);
                    return void 0 === r ? {} : {
                        result: r
                    }
                };
                t.exceptionToWebMethodPayload = function(e, t, r) {
                    return void 0 === t && (t = function(e) {
                        return e
                    }), void 0 === r && (r = function(e) {
                        return ""
                    }), {
                        result: e instanceof Error ? {
                            message: t(e.message),
                            name: e.name,
                            stack: r(e.stack),
                            code: e.code,
                            _elementoryError: !0
                        } : e,
                        exception: !0
                    }
                };
                var o = function(e, t) {
                    return "/_webMethods/packages/".concat(encodeURIComponent(e), "/").concat(t, ".ajax")
                };
                t.generatePackageWebMethodUrl = o;
                t.generateBackendPackageWebMethodUrl = function(e, t) {
                    return o("".concat(e, "-backend"), t)
                };
                t.getBackendPackageNameFromImportName = function(e) {
                    return "".concat(e, "-backend")
                }
            },
            3678: e => {
                e.exports = (e, t) => t.reduce(((e, t) => e.chain((e => t.map((t => Array.isArray(t) ? e.concat([t]) : e.concat(t)))))), e.of([]))
            },
            9706: e => {
                e.exports.$ = {
                    COMPONENT: "COMPONENT_SCOPE",
                    GLOBAL: "GLOBAL_SCOPE"
                }
            },
            5012: (e, t, r) => {
                "use strict";
                const n = r(6639),
                    o = r(6719),
                    a = r(5380);
                e.exports = {
                    union: n,
                    Result: o,
                    Maybe: a
                }
            },
            5380: e => {
                "use strict";
                const t = e => ({
                        map: r => t(r(e)),
                        chain: t => t(e),
                        fold: (t, r) => r(e),
                        getOrElse: () => e,
                        orElse: () => t(e),
                        filter: n => n(e) ? t(e) : r()
                    }),
                    r = () => ({
                        map: () => r(),
                        chain: () => r(),
                        fold: e => e(),
                        getOrElse: e => e,
                        orElse: e => e(),
                        filter: () => r()
                    }),
                    n = {
                        Just: t,
                        Nothing: r,
                        fromNullable: e => null != e ? t(e) : r(),
                        of: e => t(e)
                    };
                e.exports = n
            },
            6719: e => {
                "use strict";
                const t = e => ({
                        map: r => t(r(e)),
                        chain: t => t(e),
                        fold: (t, r) => r(e),
                        getOrElse: () => e,
                        merge: () => e
                    }),
                    r = e => ({
                        map: () => r(e),
                        chain: () => r(e),
                        fold: t => t(e),
                        getOrElse: e => e,
                        merge: () => e
                    }),
                    n = {
                        Ok: t,
                        Error: r,
                        try: e => {
                            try {
                                return t(e())
                            } catch (e) {
                                return r(e)
                            }
                        },
                        fromNullable: (e, n) => null != e ? t(e) : r(n),
                        fromMaybe: (e, n) => e.fold((() => r(n)), (e => t(e))),
                        of: e => t(e)
                    };
                e.exports = n
            },
            6639: e => {
                "use strict";
                const t = Symbol.for("union-type-any-symbol"),
                    r = e => r => {
                        const n = Object.keys(r);
                        for (const t of n)
                            if (t === e.name) return r[t](e.payload);
                        if (r[t]) return r[t]();
                        throw new Error(`Variant "${e.name}" not covered in pattern with keys [${n}].\nThis could mean you did not include all variants in your Union's matchWith function.`)
                    },
                    n = (e, t, n = {}) => Object.keys(t).reduce(((o, a) => (o[a] = ((e, t, n, o) => {
                        const a = Symbol(`[${e}:${t}]`),
                            i = (...e) => {
                                const i = n(...e),
                                    s = {
                                        matchWith: r({
                                            name: t,
                                            payload: i
                                        }),
                                        toString: () => t,
                                        [a]: !0
                                    };
                                return Object.keys(o).forEach((e => {
                                    s[e] = o[e](s)
                                })), s
                            };
                        return i.hasInstance = e => e && !0 === e[a], i
                    })(e, a, t[a], n), o)), {});
                n.any = t, e.exports = n
            },
            396: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                })
            },
            5109: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.DefaultMaxPageSize = void 0;
                const n = r(9881);
                t.DefaultMaxPageSize = {
                    [n.PagingMode.Offset]: 1e3,
                    [n.PagingMode.Cursor]: 100
                }
            },
            1796: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.AllowedFilterOperator = t.FieldType = void 0,
                    function(e) {
                        e.number = "number", e.text = "text", e.image = "image", e.boolean = "boolean", e.document = "document", e.url = "url", e.richText = "richtext", e.date = "date", e.dateTime = "datetime", e.video = "video", e.reference = "reference", e.multiReference = "multi-reference", e.pageLink = "pagelink", e.object = "object", e.mediaGallery = "media-gallery", e.address = "address", e.stringArray = "array<string>", e.color = "color", e.audio = "audio", e.time = "time", e.array = "array", e.richContent = "rich-content", e.language = "language", e.documentArray = "array<document>", e.any = "any", e.legacyBook = "bookType", e.legacyExternalUrl = "externalUrl", e.legacyBrokenRef = "broken-reference", e.legacyExternalVideo = "externalVideo", e.legacyImage = "Image"
                    }(t.FieldType || (t.FieldType = {})),
                    function(e) {
                        e.eq = "eq", e.ne = "ne", e.lt = "lt", e.lte = "lte", e.gt = "gt", e.gte = "gte", e.hasSome = "hasSome", e.hasAll = "hasAll", e.contains = "contains", e.startsWith = "startsWith", e.endsWith = "endsWith", e.urlized = "urlized", e.exists = "exists"
                    }(t.AllowedFilterOperator || (t.AllowedFilterOperator = {}))
            },
            5814: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.CMS_FIELD_PLUGIN_ID = void 0, t.CMS_FIELD_PLUGIN_ID = "cms"
            },
            9052: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.Operator = void 0,
                    function(e) {
                        e.and = "$and", e.or = "$or", e.not = "$not", e.eq = "$eq", e.ne = "$ne", e.lt = "$lt", e.lte = "$lte", e.gt = "$gt", e.gte = "$gte", e.hasSome = "$hasSome", e.hasAll = "$hasAll", e.contains = "$contains", e.startsWith = "$startsWith", e.endsWith = "$endsWith", e.urlized = "$urlized"
                    }(t.Operator || (t.Operator = {}))
            },
            264: function(e, t, r) {
                "use strict";
                var n = this && this.__createBinding || (Object.create ? function(e, t, r, n) {
                        void 0 === n && (n = r);
                        var o = Object.getOwnPropertyDescriptor(t, r);
                        o && !("get" in o ? !t.__esModule : o.writable || o.configurable) || (o = {
                            enumerable: !0,
                            get: function() {
                                return t[r]
                            }
                        }), Object.defineProperty(e, n, o)
                    } : function(e, t, r, n) {
                        void 0 === n && (n = r), e[n] = t[r]
                    }),
                    o = this && this.__exportStar || function(e, t) {
                        for (var r in e) "default" === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r)
                    };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), o(r(4572), t), o(r(9052), t), o(r(1796), t), o(r(6249), t), o(r(9881), t), o(r(336), t), o(r(5109), t), o(r(5814), t), o(r(396), t)
            },
            4572: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.Direction = void 0,
                    function(e) {
                        e.asc = "asc", e.desc = "desc"
                    }(t.Direction || (t.Direction = {}))
            },
            9881: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.PagingMode = void 0,
                    function(e) {
                        e.Offset = "OFFSET", e.Cursor = "CURSOR"
                    }(t.PagingMode || (t.PagingMode = {}))
            },
            336: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.CMS_PLUGIN_ID = t.PAGE_LINK_PLUGIN_ID = t.SHARED_PLUGIN_ID = t.MULTILINGUAL_PLUGIN_ID = t.UrlizedFormat = t.URLIZED_PLUGIN_ID = t.SINGLES_PLUGIN_ID = t.GRID_APPLESS_PLUGIN_ID = t.PublishingStatus = t.DRAFT_DATE_FIELD_KEY = t.PUBLISH_DATE_FIELD_KEY = t.PUBLISH_STATUS_FIELD_KEY = t.PUBLISHING_PLUGIN_ID = void 0, t.PUBLISHING_PLUGIN_ID = "publishing", t.PUBLISH_STATUS_FIELD_KEY = "_publishStatus", t.PUBLISH_DATE_FIELD_KEY = "_publishDate", t.DRAFT_DATE_FIELD_KEY = "_draftDate",
                    function(e) {
                        e.DRAFT = "DRAFT", e.PUBLISHED = "PUBLISHED"
                    }(t.PublishingStatus || (t.PublishingStatus = {})), t.GRID_APPLESS_PLUGIN_ID = "gridAppless", t.SINGLES_PLUGIN_ID = "singleItem", t.URLIZED_PLUGIN_ID = "urlized",
                    function(e) {
                        e.PLAIN = "plain", e.ORIGINAL = "original"
                    }(t.UrlizedFormat || (t.UrlizedFormat = {})), t.MULTILINGUAL_PLUGIN_ID = "multilingual", t.SHARED_PLUGIN_ID = "shared", t.PAGE_LINK_PLUGIN_ID = "persistentPageLink", t.CMS_PLUGIN_ID = "cms"
            },
            6249: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.Storage = t.PermissionRole = t.CollectionOperation = t.DataOperation = void 0,
                    function(e) {
                        e.aggregate = "aggregate", e.bulkInsert = "bulkInsert", e.bulkRemove = "bulkRemove", e.bulkSave = "bulkSave", e.bulkUpdate = "bulkUpdate", e.count = "count", e.distinct = "distinct", e.find = "find", e.get = "get", e.insert = "insert", e.insertReference = "insertReference", e.isReferenced = "isReferenced", e.queryReferenced = "queryReferenced", e.remove = "remove", e.removeReference = "removeReference", e.replaceReferences = "replaceReferences", e.save = "save", e.truncate = "truncate", e.update = "update"
                    }(t.DataOperation || (t.DataOperation = {})),
                    function(e) {
                        e.UPDATE = "update", e.REMOVE = "remove"
                    }(t.CollectionOperation || (t.CollectionOperation = {})),
                    function(e) {
                        e.anyone = "anyone", e.siteMember = "siteMember", e.siteMemberAuthor = "siteMemberAuthor", e.admin = "admin"
                    }(t.PermissionRole || (t.PermissionRole = {})),
                    function(e) {
                        e.driver = "driver", e.docstore = "docstore", e.app = "app", e.external = "external", e.dynamicApplication = "dynamicApplication", e.staticAppSchema = "staticAppSchema"
                    }(t.Storage || (t.Storage = {}))
            },
            5241: (e, t, r) => {
                "use strict";
                var n = r(1297),
                    o = r(3894),
                    a = r(8605);

                function i(e, t) {
                    return t.encode ? t.strict ? n(e) : encodeURIComponent(e) : e
                }

                function s(e) {
                    return Array.isArray(e) ? e.sort() : "object" == typeof e ? s(Object.keys(e)).sort((function(e, t) {
                        return Number(e) - Number(t)
                    })).map((function(t) {
                        return e[t]
                    })) : e
                }

                function c(e) {
                    var t = e.indexOf("?");
                    return -1 === t ? "" : e.slice(t + 1)
                }

                function l(e, t) {
                    var r = function(e) {
                            var t;
                            switch (e.arrayFormat) {
                                case "index":
                                    return function(e, r, n) {
                                        /\[(\d*)\]$/.exec(e), e.replace(/\[\d*\]$/, ""), t ? (void 0 === n[e] && (n[e] = {}), n[e][t[1]] = r) : n[e] = r
                                    };
                                case "bracket":
                                    return function(e, r, n) {
                                        /(\[\])$/.exec(e), e.replace(/\[\]$/, ""), t ? void 0 !== n[e] ? n[e] = [].concat(n[e], r) : n[e] = [r] : n[e] = r
                                    };
                                default:
                                    return function(e, t, r) {
                                        void 0 !== r[e] ? r[e] = [].concat(r[e], t) : r[e] = t
                                    }
                            }
                        }(o({
                            arrayFormat: "none"
                        }, t)),
                        n = Object.create(null);
                    return "string" != typeof e ? n : e.trim().replace(/^[?#&]/, "") ? (e.split("&").forEach((function(e) {
                        var t = e.replace(/\+/g, " ").split("="),
                            o = t.shift(),
                            i = t.length > 0 ? t.join("=") : void 0;
                        void 0 === i ? null : a(i), r(a(o), i, n)
                    })), Object.keys(n).sort().reduce((function(e, t) {
                        var r = n[t];
                        return Boolean(r) && "object" == typeof r && !Array.isArray(r) ? e[t] = s(r) : e[t] = r, e
                    }), Object.create(null))) : n
                }
                t.As = function(e, t) {
                    !1 === (t = o({
                        encode: !0,
                        strict: !0,
                        arrayFormat: "none"
                    }, t)).sort && (t.sort = function() {});
                    var r = function(e) {
                        switch (e.arrayFormat) {
                            case "index":
                                return function(t, r, n) {
                                    return null === r ? [i(t, e), "[", n, "]"].join("") : [i(t, e), "[", i(n, e), "]=", i(r, e)].join("")
                                };
                            case "bracket":
                                return function(t, r) {
                                    return null === r ? i(t, e) : [i(t, e), "[]=", i(r, e)].join("")
                                };
                            default:
                                return function(t, r) {
                                    return null === r ? i(t, e) : [i(t, e), "=", i(r, e)].join("")
                                }
                        }
                    }(t);
                    return e ? Object.keys(e).sort(t.sort).map((function(n) {
                        var o = e[n];
                        if (void 0 === o) return "";
                        if (null === o) return i(n, t);
                        if (Array.isArray(o)) {
                            var a = [];
                            return o.slice().forEach((function(e) {
                                void 0 !== e && a.push(r(n, e, a.length))
                            })), a.join("&")
                        }
                        return i(n, t) + "=" + i(o, t)
                    })).filter((function(e) {
                        return e.length > 0
                    })).join("&") : ""
                }
            },
            1297: e => {
                "use strict";
                e.exports = function(e) {
                    return encodeURIComponent(e).replace(/[!'()*]/g, (function(e) {
                        return "%" + e.charCodeAt(0).toString(16).toUpperCase()
                    }))
                }
            },
            9308: e => {
                var t = Object.prototype.toString;
                e.exports = function(e) {
                    var r = typeof e;
                    return "undefined" === r ? "undefined" : null === e ? "null" : !0 === e || !1 === e || e instanceof Boolean ? "boolean" : "string" === r || e instanceof String ? "string" : "number" === r || e instanceof Number ? "number" : "function" === r || e instanceof Function ? void 0 !== e.constructor.name && "Generator" === e.constructor.name.slice(0, 9) ? "generatorfunction" : "function" : void 0 !== Array.isArray && Array.isArray(e) ? "array" : e instanceof RegExp ? "regexp" : e instanceof Date ? "date" : "[object RegExp]" === (r = t.call(e)) ? "regexp" : "[object Date]" === r ? "date" : "[object Arguments]" === r ? "arguments" : "[object Error]" === r ? "error" : "[object Promise]" === r ? "promise" : function(e) {
                        return e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
                    }(e) ? "buffer" : "[object Set]" === r ? "set" : "[object WeakSet]" === r ? "weakset" : "[object Map]" === r ? "map" : "[object WeakMap]" === r ? "weakmap" : "[object Symbol]" === r ? "symbol" : "[object Map Iterator]" === r ? "mapiterator" : "[object Set Iterator]" === r ? "setiterator" : "[object String Iterator]" === r ? "stringiterator" : "[object Array Iterator]" === r ? "arrayiterator" : "[object Int8Array]" === r ? "int8array" : "[object Uint8Array]" === r ? "uint8array" : "[object Uint8ClampedArray]" === r ? "uint8clampedarray" : "[object Int16Array]" === r ? "int16array" : "[object Uint16Array]" === r ? "uint16array" : "[object Int32Array]" === r ? "int32array" : "[object Uint32Array]" === r ? "uint32array" : "[object Float32Array]" === r ? "float32array" : "[object Float64Array]" === r ? "float64array" : "object"
                }
            },
            5790: () => {
                if ("function" != typeof self.queueMicrotask && (self.queueMicrotask = function(e) {
                        Promise.resolve().then(e).catch((e => setTimeout((() => {
                            throw e
                        }))))
                    }), "function" != typeof Array.prototype.at) {
                    const e = Reflect.getPrototypeOf(Int8Array);
                    for (const t of [Array, String, e]) Object.defineProperty(t.prototype, "at", {
                        value: function(e) {
                            if ((e = Math.trunc(e) || 0) < 0 && (e += this.length), !(e < 0 || e >= this.length)) return this[e]
                        },
                        writable: !0,
                        enumerable: !1,
                        configurable: !0
                    })
                }
            },
            8605: e => {
                "use strict";
                var t = "%[a-f0-9]{2}",
                    r = new RegExp("(" + t + ")|([^%]+?)", "gi"),
                    n = new RegExp("(" + t + ")+", "gi");

                function o(e, t) {
                    try {
                        return [decodeURIComponent(e.join(""))]
                    } catch (e) {}
                    if (1 === e.length) return e;
                    t = t || 1;
                    var r = e.slice(0, t),
                        n = e.slice(t);
                    return Array.prototype.concat.call([], o(r), o(n))
                }

                function a(e) {
                    try {
                        return decodeURIComponent(e)
                    } catch (a) {
                        for (var t = e.match(r) || [], n = 1; n < t.length; n++) t = (e = o(t, n).join("")).match(r) || [];
                        return e
                    }
                }
                e.exports = function(e) {
                    if ("string" != typeof e) throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof e + "`");
                    try {
                        return e = e.replace(/\+/g, " "), decodeURIComponent(e)
                    } catch (t) {
                        return function(e) {
                            for (var t = {
                                    "%FE%FF": "\ufffd\ufffd",
                                    "%FF%FE": "\ufffd\ufffd"
                                }, r = n.exec(e); r;) {
                                try {
                                    t[r[0]] = decodeURIComponent(r[0])
                                } catch (e) {
                                    var o = a(r[0]);
                                    o !== r[0] && (t[r[0]] = o)
                                }
                                r = n.exec(e)
                            }
                            t["%C2"] = "\ufffd";
                            for (var i = Object.keys(t), s = 0; s < i.length; s++) {
                                var c = i[s];
                                e = e.replace(new RegExp(c, "g"), t[c])
                            }
                            return e
                        }(e)
                    }
                }
            },
            3894: e => {
                "use strict";
                /*
                object-assign
                (c) Sindre Sorhus
                @license MIT
                */
                var t = Object.getOwnPropertySymbols,
                    r = Object.prototype.hasOwnProperty,
                    n = Object.prototype.propertyIsEnumerable;
                e.exports = function() {
                    try {
                        if (!Object.assign) return !1;
                        var e = new String("abc");
                        if (e[5] = "de", "5" === Object.getOwnPropertyNames(e)[0]) return !1;
                        for (var t = {}, r = 0; r < 10; r++) t["_" + String.fromCharCode(r)] = r;
                        if ("0123456789" !== Object.getOwnPropertyNames(t).map((function(e) {
                                return t[e]
                            })).join("")) return !1;
                        var n = {};
                        return "abcdefghijklmnopqrst".split("").forEach((function(e) {
                            n[e] = e
                        })), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, n)).join("")
                    } catch (e) {
                        return !1
                    }
                }() ? Object.assign : function(e, o) {
                    for (var a, i, s = function(e) {
                            if (null == e) throw new TypeError("Object.assign cannot be called with null or undefined");
                            return Object(e)
                        }(e), c = 1; c < arguments.length; c++) {
                        for (var l in a = Object(arguments[c])) r.call(a, l) && (s[l] = a[l]);
                        if (t) {
                            i = t(a);
                            for (var d = 0; d < i.length; d++) n.call(a, i[d]) && (s[i[d]] = a[i[d]])
                        }
                    }
                    return s
                }
            },
            1359: (e, t) => {
                "use strict";
                var r = Object.prototype.hasOwnProperty;

                function n(e) {
                    try {
                        return decodeURIComponent(e.replace(/\+/g, " "))
                    } catch (e) {
                        return null
                    }
                }

                function o(e) {
                    try {
                        return encodeURIComponent(e)
                    } catch (e) {
                        return null
                    }
                }
                t.stringify = function(e, t) {
                    t = t || "";
                    var n, a, i = [];
                    for (a in "string" != typeof t && (t = "?"), e)
                        if (r.call(e, a)) {
                            if ((n = e[a]) || null != n && !isNaN(n) || (n = ""), a = o(a), n = o(n), null === a || null === n) continue;
                            i.push(a + "=" + n)
                        }
                    return i.length ? t + i.join("&") : ""
                }, t.parse = function(e) {
                    for (var t, r = /([^=?#&]+)=?([^&]*)/g, o = {}; t = r.exec(e);) {
                        var a = n(t[1]),
                            i = n(t[2]);
                        null === a || null === i || a in o || (o[a] = i)
                    }
                    return o
                }
            },
            6831: e => {
                "use strict";
                var t = function(e) {
                    return null != e && "function" == typeof e.run && "boolean" == typeof e.isQueued && (!e.resultActionCreator || "function" == typeof e.resultActionCreator)
                };
                e.exports = {
                    isEffect: t,
                    isImmediateEffect: function(e) {
                        return t(e) && !e.isQueued
                    },
                    isQueuedEffect: function(e) {
                        return t(e) && e.isQueued
                    }
                }
            },
            405: (e, t, r) => {
                "use strict";
                var n = r(3177);
                e.exports = {
                    createMiddleware: n
                }
            },
            3177: (e, t, r) => {
                "use strict";
                var n = r(3550).isPromise,
                    o = r(1222),
                    a = o.sequence,
                    i = o.try_,
                    s = r(8364),
                    c = r(6831),
                    l = c.isEffect,
                    d = c.isImmediateEffect,
                    u = c.isQueuedEffect,
                    p = function(e) {
                        return function(t) {
                            return e.push(t),
                                function() {
                                    var r = e.indexOf(t);
                                    r >= 0 && e.splice(r, 1)
                                }
                        }
                    };
                e.exports = function() {
                    var e = [],
                        t = [],
                        r = Promise.resolve();
                    return {
                        middleware: function(o) {
                            return function(c) {
                                return function(p) {
                                    var f = function(e) {
                                            var t = i((function() {
                                                return e.run()
                                            }));
                                            return t.fold((function(r) {
                                                var n = e.resultActionCreator ? o.dispatch(e.resultActionCreator(!0, r)) : Promise.resolve();
                                                return [t, n]
                                            }), (function(r) {
                                                if (n(r)) {
                                                    var a = r.then((function(t) {
                                                        return e.resultActionCreator ? o.dispatch(e.resultActionCreator(!1, t)) : Promise.resolve()
                                                    }), (function(t) {
                                                        throw e.resultActionCreator && o.dispatch(e.resultActionCreator(!0, t)).catch((function() {})), t
                                                    }));
                                                    return [t, a]
                                                }
                                                var i = e.resultActionCreator ? o.dispatch(e.resultActionCreator(!1, r)) : Promise.resolve();
                                                return [t, i]
                                            }))
                                        },
                                        h = function() {
                                            var e = void 0,
                                                n = new Promise((function(t) {
                                                    return e = t
                                                })),
                                                o = new Promise((function(e, o) {
                                                    var a = r = r.then((function() {
                                                        return n
                                                    })).then(function(e, t) {
                                                        return function(r) {
                                                            if (r.length > 0) {
                                                                var n = r.filter(u).map(f);
                                                                return Promise.all(n.map((function(e) {
                                                                    return e[1]
                                                                }))).then((function() {
                                                                    return e()
                                                                }), t), Promise.all(n.map((function(e) {
                                                                    return e[0]
                                                                })).map((function(e) {
                                                                    return e.fold((function(e) {
                                                                        return Promise.reject(e)
                                                                    }), (function(e) {
                                                                        return e
                                                                    }))
                                                                }))).catch(t)
                                                            }
                                                            return e(), Promise.resolve()
                                                        }
                                                    }(e, o), o).catch(o).then((function() {
                                                        a === r && t.slice().forEach((function(e) {
                                                            return e()
                                                        }))
                                                    }))
                                                }));
                                            return {
                                                promise: o,
                                                trigger: e
                                            }
                                        },
                                        m = function(e) {
                                            var t = h(),
                                                r = t.promise,
                                                n = t.trigger;
                                            return i((function() {
                                                return function(e) {
                                                    var t = e.filter(d).map(f);
                                                    return t.map((function(e) {
                                                        return e[0]
                                                    })).map((function(e) {
                                                        return e.fold((function(e) {
                                                            throw e
                                                        }), (function(e) {
                                                            return e
                                                        }))
                                                    })), t.map((function(e) {
                                                        return e[1]
                                                    })).map((function(e) {
                                                        return e.catch((function() {}))
                                                    })), e.filter(u)
                                                }(e)
                                            })).fold((function(e) {
                                                throw n([]), e
                                            }), (function(e) {
                                                return n(e), r
                                            }))
                                        },
                                        g = o.getState(),
                                        y = c(p),
                                        v = o.getState();
                                    if (g !== v) {
                                        var _ = s(g, v);
                                        return a(e.slice().map((function(e) {
                                            return i((function() {
                                                return e(_) || []
                                            }))
                                        }))).fold((function(e) {
                                            throw e
                                        }), (function(e) {
                                            return m(e.filter(l))
                                        }))
                                    }
                                    return Promise.resolve(y)
                                }
                            }
                        },
                        subscribe: p(e),
                        onIdle: p(t)
                    }
                }
            },
            1222: e => {
                "use strict";
                var t = function() {},
                    r = function(e, r) {
                        return e.fold(r.Error || t, r.Ok || t)
                    },
                    n = function(e) {
                        return {
                            map: function(e) {
                                return this
                            },
                            fold: function(t, r) {
                                return t(e)
                            },
                            chain: function(e) {
                                return this
                            },
                            match: function(e) {
                                return r(this, e)
                            },
                            value: e
                        }
                    },
                    o = function e(t) {
                        return {
                            map: function(r) {
                                return e(r(t))
                            },
                            fold: function(e, r) {
                                return r(t)
                            },
                            chain: function(e) {
                                return e(t)
                            },
                            match: function(e) {
                                return r(this, e)
                            },
                            value: t
                        }
                    },
                    a = {
                        Left: n,
                        Right: o
                    };
                e.exports = {
                    Either: a,
                    sequence: function(e) {
                        return e.reduce((function(e, t) {
                            return e.chain((function(e) {
                                return t.map((function(t) {
                                    return e.concat(t)
                                }))
                            }))
                        }), o([]))
                    },
                    try_: function(e) {
                        try {
                            return o(e())
                        } catch (e) {
                            return n(e)
                        }
                    }
                }
            },
            3550: e => {
                "use strict";
                e.exports.isPromise = function(e) {
                    return null != e && "function" == typeof e.then
                }
            },
            8364: e => {
                "use strict";
                e.exports = function(e, t) {
                    var r = {
                        from: e,
                        to: t,
                        hasChanged: function(r) {
                            return r(e) !== r(t)
                        },
                        hasChangedToMatch: function(e, n) {
                            return r.hasChanged(e) && n(e(t))
                        },
                        hasChangedToTrue: function(e) {
                            return r.hasChangedToMatch(e, (function(e) {
                                return !0 === e
                            }))
                        },
                        hasChangedToFalse: function(e) {
                            return r.hasChangedToMatch(e, (function(e) {
                                return !1 === e
                            }))
                        },
                        hasChangedToNull: function(e) {
                            return r.hasChangedToMatch(e, (function(e) {
                                return null === e
                            }))
                        },
                        hasChangedToNotNull: function(e) {
                            return r.hasChangedToMatch(e, (function(e) {
                                return null !== e
                            }))
                        }
                    };
                    return r
                }
            },
            3062: e => {
                "use strict";
                e.exports = function(e, t) {
                    if (t = t.split(":")[0], !(e = +e)) return !1;
                    switch (t) {
                        case "http":
                        case "ws":
                            return 80 !== e;
                        case "https":
                        case "wss":
                            return 443 !== e;
                        case "ftp":
                            return 21 !== e;
                        case "gopher":
                            return 70 !== e;
                        case "file":
                            return !1
                    }
                    return 0 !== e
                }
            },
            400: e => {
                var t = Object.prototype.hasOwnProperty;

                function r(e) {
                    return "[Throws: " + (e ? e.message : "?") + "]"
                }

                function n(e) {
                    var n = [];
                    return function e(o) {
                        if (null === o || "object" != typeof o) return o;
                        if (-1 !== n.indexOf(o)) return "[Circular]";
                        if (n.push(o), "function" == typeof o.toJSON) try {
                            var a = e(o.toJSON());
                            return n.pop(), a
                        } catch (e) {
                            return r(e)
                        }
                        if (Array.isArray(o)) {
                            var i = o.map(e);
                            return n.pop(), i
                        }
                        var s = Object.keys(o).reduce((function(n, a) {
                            return n[a] = e(function(e, n) {
                                if (t.call(e, n)) try {
                                    return e[n]
                                } catch (e) {
                                    return r(e)
                                }
                                return e[n]
                            }(o, a)), n
                        }), {});
                        return n.pop(), s
                    }(e)
                }
                e.exports = function(e, t, r) {
                    return JSON.stringify(n(e), t, r)
                }, e.exports.ensureProperties = n
            },
            2225: (e, t, r) => {
                "use strict";
                var n = r(3062),
                    o = r(1359),
                    a = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/,
                    i = /[\n\r\t]/g,
                    s = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//,
                    c = /:\d+$/,
                    l = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i,
                    d = /^[a-zA-Z]:/;

                function u(e) {
                    return (e || "").toString().replace(a, "")
                }
                var p = [
                        ["#", "hash"],
                        ["?", "query"],
                        function(e, t) {
                            return m(t.protocol) ? e.replace(/\\/g, "/") : e
                        },
                        ["/", "pathname"],
                        ["@", "auth", 1],
                        [NaN, "host", void 0, 1, 1],
                        [/:(\d*)$/, "port", void 0, 1],
                        [NaN, "hostname", void 0, 1, 1]
                    ],
                    f = {
                        hash: 1,
                        query: 1
                    };

                function h(e) {
                    var t, n = ("undefined" != typeof window ? window : void 0 !== r.g ? r.g : "undefined" != typeof self ? self : {}).location || {},
                        o = {},
                        a = typeof(e = e || n);
                    if ("blob:" === e.protocol) o = new y(unescape(e.pathname), {});
                    else if ("string" === a)
                        for (t in o = new y(e, {}), f) delete o[t];
                    else if ("object" === a) {
                        for (t in e) t in f || (o[t] = e[t]);
                        void 0 === o.slashes && (o.slashes = s.test(e.href))
                    }
                    return o
                }

                function m(e) {
                    return "file:" === e || "ftp:" === e || "http:" === e || "https:" === e || "ws:" === e || "wss:" === e
                }

                function g(e, t) {
                    e = (e = u(e)).replace(i, ""), t = t || {};
                    var r, n = l.exec(e),
                        o = n[1] ? n[1].toLowerCase() : "",
                        a = !!n[2],
                        s = !!n[3],
                        c = 0;
                    return a ? s ? (r = n[2] + n[3] + n[4], c = n[2].length + n[3].length) : (r = n[2] + n[4], c = n[2].length) : s ? (r = n[3] + n[4], c = n[3].length) : r = n[4], "file:" === o ? c >= 2 && (r = r.slice(2)) : m(o) ? r = n[4] : o ? a && (r = r.slice(2)) : c >= 2 && m(t.protocol) && (r = n[4]), {
                        protocol: o,
                        slashes: a || m(o),
                        slashesCount: c,
                        rest: r
                    }
                }

                function y(e, t, r) {
                    if (e = (e = u(e)).replace(i, ""), !(this instanceof y)) return new y(e, t, r);
                    var a, s, c, l, f, v, _ = p.slice(),
                        E = typeof t,
                        I = this,
                        T = 0;
                    for ("object" !== E && "string" !== E && (r = t, t = null), r && "function" != typeof r && (r = o.parse), a = !(s = g(e || "", t = h(t))).protocol && !s.slashes, I.slashes = s.slashes || a && t.slashes, I.protocol = s.protocol || t.protocol || "", e = s.rest, ("file:" === s.protocol && (2 !== s.slashesCount || d.test(e)) || !s.slashes && (s.protocol || s.slashesCount < 2 || !m(I.protocol))) && (_[3] = [/(.*)/, "pathname"]); T < _.length; T++) "function" != typeof(l = _[T]) ? (c = l[0], v = l[1], c != c ? I[v] = e : "string" == typeof c ? ~(f = "@" === c ? e.lastIndexOf(c) : e.indexOf(c)) && ("number" == typeof l[2] ? (I[v] = e.slice(0, f), e = e.slice(f + l[2])) : (I[v] = e.slice(f), e = e.slice(0, f))) : (f = c.exec(e)) && (I[v] = f[1], e = e.slice(0, f.index)), I[v] = I[v] || a && l[3] && t[v] || "", l[4] && (I[v] = I[v].toLowerCase())) : e = l(e, I);
                    r && (I.query = r(I.query)), a && t.slashes && "/" !== I.pathname.charAt(0) && ("" !== I.pathname || "" !== t.pathname) && (I.pathname = function(e, t) {
                        if ("" === e) return t;
                        for (var r = (t || "/").split("/").slice(0, -1).concat(e.split("/")), n = r.length, o = r[n - 1], a = !1, i = 0; n--;) "." === r[n] ? r.splice(n, 1) : ".." === r[n] ? (r.splice(n, 1), i++) : i && (0 === n && (a = !0), r.splice(n, 1), i--);
                        return a && r.unshift(""), "." !== o && ".." !== o || r.push(""), r.join("/")
                    }(I.pathname, t.pathname)), "/" !== I.pathname.charAt(0) && m(I.protocol) && (I.pathname = "/" + I.pathname), n(I.port, I.protocol) || (I.host = I.hostname, I.port = ""), I.username = I.password = "", I.auth && (~(f = I.auth.indexOf(":")) ? (I.username = I.auth.slice(0, f), I.username = encodeURIComponent(decodeURIComponent(I.username)), I.password = I.auth.slice(f + 1), I.password = encodeURIComponent(decodeURIComponent(I.password))) : I.username = encodeURIComponent(decodeURIComponent(I.auth)), I.auth = I.password ? I.username + ":" + I.password : I.username), I.origin = "file:" !== I.protocol && m(I.protocol) && I.host ? I.protocol + "//" + I.host : "null", I.href = I.toString()
                }
                y.prototype = {
                    set: function(e, t, r) {
                        var a = this;
                        switch (e) {
                            case "query":
                                "string" == typeof t && t.length && (t = (r || o.parse)(t)), a[e] = t;
                                break;
                            case "port":
                                a[e] = t, n(t, a.protocol) ? t && (a.host = a.hostname + ":" + t) : (a.host = a.hostname, a[e] = "");
                                break;
                            case "hostname":
                                a[e] = t, a.port && (t += ":" + a.port), a.host = t;
                                break;
                            case "host":
                                a[e] = t, c.test(t) ? (t = t.split(":"), a.port = t.pop(), a.hostname = t.join(":")) : (a.hostname = t, a.port = "");
                                break;
                            case "protocol":
                                a.protocol = t.toLowerCase(), a.slashes = !r;
                                break;
                            case "pathname":
                            case "hash":
                                if (t) {
                                    var i = "pathname" === e ? "/" : "#";
                                    a[e] = t.charAt(0) !== i ? i + t : t
                                } else a[e] = t;
                                break;
                            case "username":
                            case "password":
                                a[e] = encodeURIComponent(t);
                                break;
                            case "auth":
                                var s = t.indexOf(":");
                                ~s ? (a.username = t.slice(0, s), a.username = encodeURIComponent(decodeURIComponent(a.username)), a.password = t.slice(s + 1), a.password = encodeURIComponent(decodeURIComponent(a.password))) : a.username = encodeURIComponent(decodeURIComponent(t))
                        }
                        for (var l = 0; l < p.length; l++) {
                            var d = p[l];
                            d[4] && (a[d[1]] = a[d[1]].toLowerCase())
                        }
                        return a.auth = a.password ? a.username + ":" + a.password : a.username, a.origin = "file:" !== a.protocol && m(a.protocol) && a.host ? a.protocol + "//" + a.host : "null", a.href = a.toString(), a
                    },
                    toString: function(e) {
                        e && "function" == typeof e || (e = o.stringify);
                        var t, r = this,
                            n = r.host,
                            a = r.protocol;
                        a && ":" !== a.charAt(a.length - 1) && (a += ":");
                        var i = a + (r.protocol && r.slashes || m(r.protocol) ? "//" : "");
                        return r.username ? (i += r.username, r.password && (i += ":" + r.password), i += "@") : r.password ? (i += ":" + r.password, i += "@") : "file:" !== r.protocol && m(r.protocol) && !n && "/" !== r.pathname && (i += "@"), (":" === n[n.length - 1] || c.test(r.hostname) && !r.port) && (n += ":"), i += n + r.pathname, (t = "object" == typeof r.query ? e(r.query) : r.query) && (i += "?" !== t.charAt(0) ? "?" + t : t), r.hash && (i += r.hash), i
                    }
                }, y.extractProtocol = g, y.location = h, y.trimLeft = u, y.qs = o, e.exports = y
            },
            3785: (e, t, r) => {
                var n = r(6532),
                    o = r(9311),
                    a = o;
                a.v1 = n, a.v4 = o, e.exports = a
            },
            4936: e => {
                for (var t = [], r = 0; r < 256; ++r) t[r] = (r + 256).toString(16).substr(1);
                e.exports = function(e, r) {
                    var n = r || 0,
                        o = t;
                    return [o[e[n++]], o[e[n++]], o[e[n++]], o[e[n++]], "-", o[e[n++]], o[e[n++]], "-", o[e[n++]], o[e[n++]], "-", o[e[n++]], o[e[n++]], "-", o[e[n++]], o[e[n++]], o[e[n++]], o[e[n++]], o[e[n++]], o[e[n++]]].join("")
                }
            },
            9629: e => {
                var t = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof window.msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto);
                if (t) {
                    var r = new Uint8Array(16);
                    e.exports = function() {
                        return t(r), r
                    }
                } else {
                    var n = new Array(16);
                    e.exports = function() {
                        for (var e, t = 0; t < 16; t++) 3 & t || (e = 4294967296 * Math.random()), n[t] = e >>> ((3 & t) << 3) & 255;
                        return n
                    }
                }
            },
            6532: (e, t, r) => {
                var n, o, a = r(9629),
                    i = r(4936),
                    s = 0,
                    c = 0;
                e.exports = function(e, t, r) {
                    var l = t && r || 0,
                        d = t || [],
                        u = (e = e || {}).node || n,
                        p = void 0 !== e.clockseq ? e.clockseq : o;
                    if (null == u || null == p) {
                        var f = a();
                        null == u && (u = n = [1 | f[0], f[1], f[2], f[3], f[4], f[5]]), null == p && (p = o = 16383 & (f[6] << 8 | f[7]))
                    }
                    var h = void 0 !== e.msecs ? e.msecs : (new Date).getTime(),
                        m = void 0 !== e.nsecs ? e.nsecs : c + 1,
                        g = h - s + (m - c) / 1e4;
                    if (g < 0 && void 0 === e.clockseq && (p = p + 1 & 16383), (g < 0 || h > s) && void 0 === e.nsecs && (m = 0), m >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
                    s = h, c = m, o = p;
                    var y = (1e4 * (268435455 & (h += 122192928e5)) + m) % 4294967296;
                    d[l++] = y >>> 24 & 255, d[l++] = y >>> 16 & 255, d[l++] = y >>> 8 & 255, d[l++] = 255 & y;
                    var v = h / 4294967296 * 1e4 & 268435455;
                    d[l++] = v >>> 8 & 255, d[l++] = 255 & v, d[l++] = v >>> 24 & 15 | 16, d[l++] = v >>> 16 & 255, d[l++] = p >>> 8 | 128, d[l++] = 255 & p;
                    for (var _ = 0; _ < 6; ++_) d[l + _] = u[_];
                    return t || i(d)
                }
            },
            9311: (e, t, r) => {
                var n = r(9629),
                    o = r(4936);
                e.exports = function(e, t, r) {
                    var a = t && r || 0;
                    "string" == typeof e && (t = "binary" === e ? new Array(16) : null, e = null);
                    var i = (e = e || {}).random || (e.rng || n)();
                    if (i[6] = 15 & i[6] | 64, i[8] = 63 & i[8] | 128, t)
                        for (var s = 0; s < 16; ++s) t[a + s] = i[s];
                    return t || o(i)
                }
            },
            3185: t => {
                "use strict";
                t.exports = e
            },
            8212: (e, t, r) => {
                var n = r(6347);
                e.exports = function(e, t, r) {
                    return (t = n(t)) in e ? Object.defineProperty(e, t, {
                        value: r,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : e[t] = r, e
                }, e.exports.__esModule = !0, e.exports.default = e.exports
            },
            3878: (e, t, r) => {
                var n = r(4319).default;
                e.exports = function(e, t) {
                    if ("object" != n(e) || !e) return e;
                    var r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                        var o = r.call(e, t || "default");
                        if ("object" != n(o)) return o;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === t ? String : Number)(e)
                }, e.exports.__esModule = !0, e.exports.default = e.exports
            },
            6347: (e, t, r) => {
                var n = r(4319).default,
                    o = r(3878);
                e.exports = function(e) {
                    var t = o(e, "string");
                    return "symbol" == n(t) ? t : t + ""
                }, e.exports.__esModule = !0, e.exports.default = e.exports
            },
            4319: e => {
                function t(r) {
                    return e.exports = t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    }, e.exports.__esModule = !0, e.exports.default = e.exports, t(r)
                }
                e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports
            }
        },
        o = {};

    function a(e) {
        var t = o[e];
        if (void 0 !== t) return t.exports;
        var r = o[e] = {
            exports: {}
        };
        return n[e].call(r.exports, r, r.exports, a), r.exports
    }
    a.m = n, a.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return a.d(t, {
            a: t
        }), t
    }, r = Object.getPrototypeOf ? e => Object.getPrototypeOf(e) : e => e.__proto__, a.t = function(e, n) {
        if (1 & n && (e = this(e)), 8 & n) return e;
        if ("object" == typeof e && e) {
            if (4 & n && e.__esModule) return e;
            if (16 & n && "function" == typeof e.then) return e
        }
        var o = Object.create(null);
        a.r(o);
        var i = {};
        t = t || [null, r({}), r([]), r(r)];
        for (var s = 2 & n && e;
            "object" == typeof s && !~t.indexOf(s); s = r(s)) Object.getOwnPropertyNames(s).forEach((t => i[t] = () => e[t]));
        return i.default = () => e, a.d(o, i), o
    }, a.d = (e, t) => {
        for (var r in t) a.o(t, r) && !a.o(e, r) && Object.defineProperty(e, r, {
            enumerable: !0,
            get: t[r]
        })
    }, a.f = {}, a.e = e => Promise.all(Object.keys(a.f).reduce(((t, r) => (a.f[r](e, t), t)), [])), a.u = e => "formulajs.chunk.min.js", a.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")()
        } catch (e) {
            if ("object" == typeof window) return window
        }
    }(), a.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), a.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, a.p = "https://static.parastorage.com/services/dbsm-viewer-app/47d21a60346d593f8cbb13e56c7d3fc0ae3308b6a1412b83b8c13d72/webworker/", (() => {
        var e = {
            524: 1
        };
        a.f.i = (t, r) => {
            e[t] || importScripts(a.p + a.u(t))
        };
        var t = ("undefined" != typeof self ? self : this).webpackJsonp__wix_dbsm_viewer_app = ("undefined" != typeof self ? self : this).webpackJsonp__wix_dbsm_viewer_app || [],
            r = t.push.bind(t);
        t.push = t => {
            var [n, o, i] = t;
            for (var s in o) a.o(o, s) && (a.m[s] = o[s]);
            for (i && i(a); n.length;) e[n.pop()] = 1;
            r(t)
        }
    })();
    var i = {};
    return (() => {
        "use strict";
        a.r(i), a.d(i, {
            createControllers: () => Im,
            initAppForPage: () => Em
        });
        var e = {};
        a.r(e), a.d(e, {
            READ: () => Xe,
            READ_WRITE: () => Qe,
            WRITE: () => Ze
        });
        var t = {};
        a.r(t), a.d(t, {
            z: () => Cr,
            ROUTER_DATASET: () => br
        });
        var r = {};
        a.r(r), a.d(r, {
            DBSMViewer: () => wo,
            DBSMViewerNext: () => Po,
            UserErrors: () => So,
            WixData: () => Oo
        });
        var n = a(7056);
        const o = {
            "tpa/addVariantToCart": async ({
                wixSdk: e,
                currentItem: t
            }) => {
                const {
                    window: r,
                    location: o,
                    site: a
                } = e, i = await a.getPublicAPI(n.EM), s = "Mobile" === r.formFactor;
                if (t.managedVariant) await i.cart.addProducts([{
                    productId: t.productId,
                    quantity: 1,
                    options: {
                        choices: t.choices
                    }
                }]), s ? await i.navigate.toCart() : i.cart.showMinicart();
                else if (s) {
                    const e = await i.product.getRelativeProductUrl({
                        id: t.productId
                    });
                    o.to ? .(e)
                } else await i.product.openQuickView(t.productId)
            },
            "tpa/addProductToCart": async ({
                wixSdk: e,
                currentItem: t
            }) => {
                const {
                    window: r,
                    location: o,
                    site: a
                } = e, i = await a.getPublicAPI(n.EM), s = "Mobile" === r.formFactor;
                var c;
                (c = t).customFields && c.customFields.length > 0 || Object.keys(c.productOptions || {}).length > 0 ? s ? o.to ? .(t.productPageUrl) : await i.product.openQuickView(t._id) : (await i.cart.addProducts([{
                    productId: t._id,
                    quantity: 1
                }]), s ? await i.navigate.toCart() : i.cart.showMinicart())
            },
            "tpa/quicklyViewProduct": async ({
                wixSdk: e,
                currentItem: t
            }) => {
                const r = await e.site.getPublicAPI(n.EM);
                await r.product.openQuickView(t._id)
            },
            "tpa/purchasePricingPlan": async ({
                wixSdk: e,
                currentItem: t
            }) => {
                await e["pricing-plans"].checkout.startOnlinePurchase(t._id)
            },
            "tpa/pricingPlansNavigateToCheckout": async ({
                wixSdk: e,
                currentItem: t
            }) => {
                await e["pricing-plans"].customPurchaseFlow.navigateToCheckout({
                    planId: t._id
                })
            }
        };
        a(5790);
        var s = a(2225),
            c = a.n(s);
        var l = a(264);
        const {
            text: d,
            boolean: u,
            number: p,
            dateTime: f,
            date: h,
            richText: m,
            url: g,
            reference: y,
            stringArray: v
        } = l.FieldType, _ = [d, m, u, f, h, y, p, g, v];
        var E = a(3785);
        const I = ({
            httpClient: e
        }) => ({
            reportFormEventToAutomationCreator: () => async ({
                detailedEventPayload: t,
                eventUTCTime: r
            }) => {
                const n = {
                    eventIdentifier: {
                        eventUniqueId: (0, E.v4)(),
                        eventType: "form/form/code",
                        sourceUniqueId: "675bbcef-18d8-41f5-800e-131ec9e08762"
                    },
                    eventUTCTime: r,
                    detailedEventPayload: t
                };
                await e.post("/_api/action-triggers-server/v1/report-event", n)
            }
        });
        var T = a(8212),
            R = a.n(T);
        class w extends Error {
            static withMessage(e) {
                return class extends(this) {
                    constructor() {
                        for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
                        super(e, ...r)
                    }
                }
            }
            static with(e) {
                let {
                    message: t,
                    options: r
                } = e;
                return class extends(this) {
                    constructor(e) {
                        super(t || e instanceof String && e, { ...r,
                            ...e instanceof Object ? e : {}
                        })
                    }
                }
            }
            constructor(e, t, r) {
                void 0 === r && (r = "DataBindingError"), super(e, t);
                const {
                    cause: n,
                    ...o
                } = t || {};
                this.name = r, this.options = o, this.cause || (this.cause = n)
            }
            toString() {
                return this.cause ? `${super.toString()}\nCaused by ${this.cause.toString()}` : super.toString()
            }
        }
        R()(w, "scopes", {
            USER_SCOPE: "userCodeZone",
            APPLICATION_SCOPE: "applicationCodeZone",
            SERVER_SCOPE: "wixDataCodeZone"
        });
        class S extends w {
            constructor(e, t) {
                super(e, t, "AppError"), this.scope = w.scopes.APPLICATION_SCOPE
            }
        }
        class O extends w {
            constructor(e, t, r) {
                void 0 === r && (r = "UserError"), super(e, t, r), this.scope = w.scopes.USER_SCOPE
            }
        }
        class P extends O {
            constructor(e, t) {
                const {
                    code: r,
                    ...n
                } = t;
                super(e, n, "DatasetError"), this.code = r
            }
        }
        class N extends O {
            constructor(e, t) {
                super(e, t, "ServerValidationError")
            }
        }
        R()(N, "codes", ["WD_SITE_IN_TEMPLATE_MODE", "WD_PERMISSION_DENIED", "WD_COLLECTION_DELETED", "WD_VALIDATION_FAILED"]);
        class C extends w {
            constructor(e, t) {
                const {
                    code: r,
                    ...n
                } = t;
                super(e, n, "ServerError"), this.scope = w.scopes.SERVER_SCOPE, this.code = r
            }
        }
        class b extends w {
            constructor(e) {
                super("Async operation error wasn't handled", e, "UnhandledPromiseRejection")
            }
        }
        var D = a(3185);

        function A(e, t, r) {
            ! function(e, t) {
                if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object")
            }(e, t), t.set(e, r)
        }

        function F(e, t) {
            return e.get(function(e, t, r) {
                if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : r;
                throw new TypeError("Private element is not present on this object")
            }(e, t))
        }
        var x = new WeakMap;
        const L = new class {
                constructor() {
                    A(this, x, new Proxy({}, {
                        get(e, t) {
                            if (e[t]) return e[t];
                            throw new ReferenceError(`There is no ${t} in context. Check if the context has been already set`)
                        }
                    }))
                }
                set(e) {
                    Object.entries(e).forEach((e => {
                        let [t, r] = e;
                        F(x, this)[t] = r
                    }))
                }
                get() {
                    return F(x, this)
                }
            },
            U = L.get(),
            M = L.set.bind(L);
        class k {
            constructor(e) {
                this._context = e, this._eventToListener = new V
            }
            dispatch(e) {
                for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) r[n - 1] = arguments[n];
                return this._eventToListener.has(e) ? this._eventToListener.get(e).reduce(((t, n) => [...t, U.errorReporting(n, S.with({
                    message: `${e} listener failed`,
                    options: {
                        extra: this._context
                    }
                }))(this._context, ...r)]), []) : void 0
            }
            subscribe(e, t) {
                return e.constructor === Object ? Object.entries(e).reduce(((e, t) => {
                    let [r, n] = t;
                    return [...e, this.subscribe(r, n)]
                }), []) : (this._eventToListener.getOrDefault(e, new $).add(t), () => this.unsubscribe(e, t))
            }
            unsubscribe(e, t) {
                return this._eventToListener.has(e) && this._eventToListener.get(e).delete(t)
            }
        }
        class G {
            constructor() {
                var e = this;
                this.promise = new Promise(((t, r) => {
                    this.resolve = function() {
                        return t(...arguments), e.promise
                    }, this.reject = function() {
                        return r(...arguments), e.promise
                    }
                }))
            }
        }
        const j = (e, t) => function() {
                for (var r = arguments.length, n = new Array(r), o = 0; o < r; o++) n[o] = arguments[o];
                try {
                    const r = e(...n);
                    return (null == r ? void 0 : r.catch) instanceof Function ? r.catch((e => t(e, ...n))) : r
                } catch (e) {
                    return t(e, ...n)
                }
            },
            B = e => null != e && e.then ? e : {
                then: t => t(e)
            };
        class V extends Map {
            getOrDefault(e, t) {
                return this.has(e) ? this.get(e) : this.set(e, t).get(e)
            }
            find(e) {
                const [, t] = Array.from(this).find((t => {
                    let [r, n] = t;
                    return e(n, r, this)
                })) || [];
                return t
            }
        }
        class $ extends Set {
            reduce(e, t) {
                return Array.from(this).reduce(((t, r, n) => e(t, r, n, this)), t)
            }
        }
        const W = "unknown",
            q = e => {
                const t = e.split("/"),
                    r = t[t.length - 3],
                    n = t[t.length - 2];
                if (!/^\d+\.\d+\.\d+$/.test(n)) throw new Error(`Invalid version string ${n}`);
                return {
                    appName: r,
                    version: n
                }
            },
            H = e => {
                try {
                    const {
                        appName: t,
                        version: r
                    } = q(e);
                    return `${t}@${r}`
                } catch {
                    return W
                }
            },
            z = () => {
                const e = new Error;
                return e.stack ? e.stack.toString() : ""
            },
            Y = e => {
                const t = z().match(new RegExp(`https?://.*?${e}.*?.js`));
                return t ? t[0] : ""
            },
            J = "detailsRepeaterRole",
            K = "detailsDatasetRole",
            Q = "filterInputRole",
            X = "textRole",
            Z = "galleryRole",
            ee = "mediaGalleryRole",
            te = "ratingsDisplayRole",
            re = "dropdownOptionsRole",
            ne = "MobuiPickerOptionsRole",
            oe = "gridRole",
            ae = "datepickerRole",
            ie = "radioGroupRole",
            se = "uploadButtonRole",
            ce = "repeaterRole",
            le = "pageRole",
            de = "paginationRole",
            ue = "addressInputRole",
            pe = "googleMapRole",
            fe = "timePickerRole",
            he = "progressBarRole",
            me = "selectionTagsOptionsRole",
            ge = "signatureInputRole",
            ye = "richContentRole",
            ve = "userInputFilterDropdownRole",
            _e = "userInputFilterCheckboxRole",
            Ee = "userInputFilterRadioGroupRole",
            Ie = "userInputFilterCheckboxGroupRole",
            Te = "userInputFilterSelectionTagsRole",
            Re = "userInputFilterRangeSliderRole";
        var we;
        ! function(e) {
            e.SINGLE_CHOICE = "SINGLE_CHOICE", e.MULTI_CHOICE = "MULTI_CHOICE", e.CHECKBOX = "CHECKBOX", e.RANGE_SLIDER = "RANGE_SLIDER"
        }(we || (we = {}));
        const Se = [ve, _e, Ee, Ie, Te, Re];
        var Oe;
        ! function(e) {
            e.EQUALS = "eq", e.NOT_EQUALS = "ne", e.INCLUDES_ANY = "includesAny", e.EXCLUDES_ANY = "excludesAny", e.INCLUDES_ALL = "includesAll", e.GREATER_THAN_OR_EQUAL = "ge", e.LESS_THAN_OR_EQUAL = "le", e.IN_BETWEEN = "inBetween", e.OUTSIDE_OF = "outsideOf"
        }(Oe || (Oe = {}));
        const {
            EQUALS: Pe,
            NOT_EQUALS: Ne,
            INCLUDES_ALL: Ce,
            INCLUDES_ANY: be,
            EXCLUDES_ANY: De,
            GREATER_THAN_OR_EQUAL: Ae,
            LESS_THAN_OR_EQUAL: Fe,
            IN_BETWEEN: xe,
            OUTSIDE_OF: Le
        } = Oe, {
            SINGLE_CHOICE: Ue,
            MULTI_CHOICE: Me,
            CHECKBOX: ke,
            RANGE_SLIDER: Ge
        } = we, je = e => Array.isArray(e) ? e : [e], Be = (l.FieldType.text, l.FieldType.text, l.FieldType.number, l.FieldType.number, l.FieldType.number, l.FieldType.number, l.FieldType.stringArray, l.FieldType.stringArray, l.FieldType.text, l.FieldType.text, l.FieldType.number, l.FieldType.number, l.FieldType.stringArray, l.FieldType.stringArray, l.FieldType.stringArray, l.FieldType.boolean, l.FieldType.boolean, l.FieldType.number, l.FieldType.number, "RESET_ALL"), Ve = [ve, Ee, Ie, Te], $e = new Map([
            ["new", "add"]
        ]), We = "dbsm-viewer-app";
        class qe {
            constructor(e) {
                let {
                    collectionId: t,
                    collectionName: r,
                    componentType: o,
                    datasetId: a,
                    datasetMode: i,
                    datasetType: s,
                    fieldType: c,
                    filteredBy: l,
                    id: d,
                    numberOfResults: u,
                    pageId: p,
                    pageUrl: f,
                    viewMode: h
                } = e;
                this.type = qe.types.EVENT, this.event = {
                    pageId: p,
                    src: 79,
                    ver: H(Y(We)),
                    app_name: We,
                    app_id: n.Jr,
                    evid: d,
                    ds_id: a,
                    ds_type: s,
                    mode: i,
                    collection_name: r,
                    collection_id: t,
                    component_type: o,
                    filtered_by: l,
                    field_type: c,
                    number_of_results: u,
                    viewmode: h,
                    page_url: f
                }
            }
        }
        R()(qe, "types", {
            EVENT: "event",
            ERROR: "error"
        });
        class He extends qe {
            constructor(e) {
                let {
                    message: t,
                    code: r
                } = e;
                super({}), this.type = qe.types.ERROR;
                const n = (e => {
                    if ((0, D.isString)(e)) {
                        const t = e.replace(/\D/g, ""),
                            r = parseInt(t);
                        if (Number.isNaN(r)) return 1
                    }
                    return (0, D.isNumber)(e) ? Number.isNaN(e) ? 1 : e : 1
                })(r);
                this.event = {
                    evid: 10,
                    src: 79,
                    dsc: t,
                    errn: t,
                    errc: n
                }
            }
        }
        class ze {
            constructor(e, t, r) {
                const {
                    type: n,
                    fn: o
                } = t instanceof Function ? {
                    type: ze.types.TRACE,
                    fn: t
                } : {
                    type: t
                };
                this.name = e, this.params = r, this.run = () => this._handlerByType[n](o), this.onStart = e => this._start = e, this.onEnd = e => this._end = e, this._start = () => {}, this._end = () => {}, this._handlerByType = {
                    [ze.types.TRACE]: e => (this._start(), B(e()).then((e => (this._end(), e)))),
                    [ze.types.START]: () => this._start(),
                    [ze.types.END]: () => this._end()
                }
            }
        }
        R()(ze, "types", {
            START: "START",
            END: "END",
            TRACE: "TRACE"
        });
        class Ye {
            static with(e) {
                let {
                    category: t,
                    message: r,
                    level: n,
                    data: o
                } = e;
                return class extends(this) {
                    constructor(e) {
                        let {
                            category: a = t,
                            message: i = r,
                            level: s = n,
                            data: c
                        } = e;
                        super({
                            category: a,
                            message: i,
                            level: s,
                            data: c || o ? { ...c,
                                ...o
                            } : void 0
                        })
                    }
                }
            }
            constructor(e) {
                let {
                    category: t,
                    message: r,
                    level: n = "info",
                    data: o
                } = e;
                this.event = {
                    category: t,
                    message: r,
                    level: n,
                    data: o
                }
            }
        }
        class Je {
            static with(e) {
                return class extends(this) {
                    constructor(t, r) {
                        void 0 === r && (r = {}), super(t, { ...e,
                            ...r
                        })
                    }
                }
            }
            constructor(e, t) {
                this._builderByType = {
                    [Je.types.DS_API.CALLED]: e => {
                        let {
                            methodName: t,
                            args: r
                        } = e;
                        return 0 === r.length ? [`[wix-dataset.${t}] called`] : [`[wix-dataset.${t}] called with (`, JSON.stringify(r), ")"]
                    },
                    [Je.types.DS_API.SUCCED]: e => {
                        let {
                            methodName: t,
                            result: r
                        } = e;
                        return void 0 === r ? [`[wix-dataset.${t}] returned`] : [`[wix-dataset.${t}] returned with (`, JSON.stringify(r), ")"]
                    },
                    [Je.types.DS_API.DEPRECATED]: e => {
                        let {
                            methodName: t,
                            replacementMethodName: r
                        } = e;
                        return [`[wix-dataset.${t}] is deprecated${r?`; use [wix-dataset.${r}] instead`:""}`]
                    },
                    [Je.types.DS_API.REGISTERED]: e => {
                        let {
                            methodName: t
                        } = e;
                        return [`[${t} callback registered] on wix-dataset`]
                    },
                    [Je.types.DS_API.TRIGGERED]: e => {
                        let {
                            eventName: t,
                            eventArgs: r = []
                        } = e;
                        if (r.length) {
                            const e = r.map((e => e instanceof Error ? e.toString() : e));
                            return [`[${t} event] triggered on wix-dataset with (`, JSON.stringify(e), ")"]
                        }
                        return [`[${t} event] triggered on wix-dataset`]
                    }
                }, this._context = t, this.messages = this._builderByType[e](t)
            }
            _getComponentPresentation() {
                const {
                    component: {
                        nickname: e,
                        parentRepeater: t
                    }
                } = this._context;
                return t ? `#${t.nickname}.#${e}` : `#${e}`
            }
        }
        R()(Je, "types", {
            DS_API: {
                CALLED: "DS_API_CALLED",
                SUCCED: "DS_API_SUCCED",
                DEPRECATED: "DS_API_DEPRECATED",
                REGISTERED: "DS_API_REGISTERED",
                TRIGGERED: "DS_API_TRIGGERED"
            }
        });
        class Ke {
            constructor(e, t) {
                void 0 === t && (t = "log"), this.message = e, this.level = t
            }
        }
        const Qe = "READ_WRITE",
            Xe = "READ",
            Ze = "WRITE",
            et = (e, t) => [oe, de].includes(e) || t && t.properties && Object.keys(t.properties).length > 0;
        var tt = a(5012);
        const rt = Object.keys,
            nt = (Object.values, Object.entries),
            ot = e => null != e,
            at = {
                AddressInput: {
                    viewerType: ["wixui.AddressInput"],
                    sdkType: "$w.AddressInput"
                },
                Text: {
                    viewerType: ["wysiwyg.viewer.components.WRichText"],
                    sdkType: "$w.Text"
                },
                Image: {
                    viewerType: ["wysiwyg.viewer.components.WPhoto", "wixui.ImageX"],
                    sdkType: "$w.Image"
                },
                TextInput: {
                    viewerType: ["wysiwyg.viewer.components.inputs.TextInput"],
                    sdkType: "$w.TextInput"
                },
                TimePicker: {
                    viewerType: ["wixui.TimePicker"],
                    sdkType: "$w.TimePicker"
                },
                Button: {
                    viewerType: ["wysiwyg.viewer.components.SiteButton"],
                    sdkType: "$w.Button"
                },
                IconButton: {
                    viewerType: ["wysiwyg.common.components.imagebutton.viewer.ImageButton"],
                    sdkType: "$w.IconButton"
                },
                RatingsDisplay: {
                    viewerType: ["wixui.RatingsDisplay"],
                    sdkType: "$w.RatingsDisplay"
                },
                RatingsInput: {
                    viewerType: ["wixui.RatingsInput"],
                    sdkType: "$w.RatingsInput"
                },
                VerticalMenu: {
                    viewerType: ["wysiwyg.common.components.verticalmenu.viewer.VerticalMenu"],
                    sdkType: "$w.VerticalMenu"
                },
                Checkbox: {
                    viewerType: ["wysiwyg.viewer.components.inputs.Checkbox"],
                    sdkType: "$w.Checkbox"
                },
                Gallery: {
                    viewerType: ["wysiwyg.viewer.components.MatrixGallery", "wysiwyg.viewer.components.SliderGallery", "wysiwyg.viewer.components.SlideShowGallery", "wysiwyg.viewer.components.PaginatedGridGallery", "wysiwyg.viewer.components.tpapps.TPAWidget"],
                    sdkType: "$w.Gallery"
                },
                Dropdown: {
                    viewerType: ["wysiwyg.viewer.components.inputs.ComboBoxInput", "wixui.Dropdown"],
                    sdkType: "$w.Dropdown"
                },
                TextBox: {
                    viewerType: ["wysiwyg.viewer.components.inputs.TextAreaInput"],
                    sdkType: "$w.TextBox"
                },
                RichTextBox: {
                    viewerType: ["wixui.RichTextBox"],
                    sdkType: "$w.RichTextBox"
                },
                Table: {
                    viewerType: ["wysiwyg.viewer.components.Grid"],
                    sdkType: "$w.Table"
                },
                DatePicker: {
                    viewerType: ["wysiwyg.viewer.components.inputs.DatePicker"],
                    sdkType: "$w.DatePicker"
                },
                RadioButtonGroup: {
                    viewerType: ["wysiwyg.viewer.components.inputs.RadioGroup"],
                    sdkType: "$w.RadioButtonGroup"
                },
                UploadButton: {
                    viewerType: ["wysiwyg.viewer.components.inputs.UploadButton", "wixui.FileUploaderNew", "wysiwyg.viewer.components.inputs.FileUploader"],
                    sdkType: "$w.UploadButton"
                },
                ClassicSection: {
                    viewerType: ["wysiwyg.viewer.components.ClassicSection"],
                    sdkType: "$w.Section"
                },
                Column: {
                    viewerType: ["wysiwyg.viewer.components.Column"],
                    sdkType: "$w.Column"
                },
                Video: {
                    viewerType: ["wysiwyg.viewer.components.Video"],
                    sdkType: "$w.Video"
                },
                VideoPlayer: {
                    viewerType: ["wixui.VideoPlayer"],
                    sdkType: "$w.VideoPlayer"
                },
                VideoBox: {
                    viewerType: ["wysiwyg.viewer.components.MediaPlayer"],
                    sdkType: "$w.VideoBox"
                },
                MusicPlayer: {
                    viewerType: ["wixui.MusicPlayer"],
                    sdkType: "$w.AudioPlayer"
                },
                Repeater: {
                    viewerType: ["wysiwyg.viewer.components.Repeater"],
                    sdkType: "$w.Repeater"
                },
                Pagination: {
                    viewerType: ["wixui.Pagination"],
                    sdkType: "$w.Pagination"
                },
                Page: {
                    viewerType: ["mobile.core.components.Page"],
                    sdkType: "$w.Page"
                },
                Document: {
                    viewerType: ["fake-document-type"],
                    sdkType: "$w.Document"
                },
                MediaContainer: {
                    viewerType: ["wysiwyg.viewer.components.MediaContainer"],
                    sdkType: "$w.Container"
                },
                StripColumnsContainer: {
                    viewerType: ["wysiwyg.viewer.components.StripColumnsContainer"],
                    sdkType: "$w.ColumnStrip"
                },
                ToggleSwitch: {
                    viewerType: ["wixui.ToggleSwitch"],
                    sdkType: "$w.Switch"
                },
                Slider: {
                    viewerType: ["wixui.Slider"],
                    sdkType: "$w.Slider"
                },
                RangeSlider: {
                    viewerType: ["wixui.RangeSlider"],
                    sdkType: "$w.RangeSlider"
                },
                StylableButton: {
                    viewerType: ["wixui.StylableButton"],
                    sdkType: "$w.StylableButton"
                },
                GoogleMap: {
                    viewerType: ["wysiwyg.viewer.components.GoogleMap"],
                    sdkType: "$w.GoogleMap"
                },
                CheckboxGroup: {
                    viewerType: ["wysiwyg.viewer.components.inputs.CheckboxGroup"],
                    sdkType: "$w.CheckboxGroup"
                },
                ProgressBar: {
                    viewerType: ["wixui.ProgressBar"],
                    sdkType: "$w.ProgressBar"
                },
                VectorImage: {
                    viewerType: ["wysiwyg.viewer.components.VectorImage", "wysiwyg.viewer.components.svgshape.SvgShape"],
                    sdkType: "$w.VectorImage"
                },
                SelectionTags: {
                    viewerType: ["wixui.SelectionTagsList"],
                    sdkType: "$w.SelectionTags"
                },
                Section: {
                    viewerType: ["responsive.components.Section"],
                    sdkType: "$w.Section"
                },
                SignatureInput: {
                    viewerType: ["wixui.SignatureInput"],
                    sdkType: "$w.SignatureInput"
                },
                RefComponent: {
                    viewerType: ["wysiwyg.viewer.components.RefComponent"],
                    sdkType: "$w.RefComponent"
                },
                RichContent: {
                    viewerType: ["wysiwyg.viewer.components.tpapps.TPAWidget"],
                    sdkType: "$w.RichContent"
                },
                AppController: {
                    viewerType: ["platform.components.AppController"],
                    sdkType: "$w.AppController"
                },
                SlideshowRepeater: {
                    viewerType: ["wixui.Slideshow"],
                    sdkType: "$w.Slideshow"
                }
            },
            it = (0, D.mapValues)(at, (({
                sdkType: e
            }) => e)),
            {
                AddressInput: st,
                RatingsInput: ct,
                TextInput: lt,
                TextBox: dt,
                RichTextBox: ut,
                Checkbox: pt,
                DatePicker: ft,
                RadioButtonGroup: ht,
                Dropdown: mt,
                UploadButton: gt,
                ToggleSwitch: yt,
                Slider: vt,
                TimePicker: _t,
                CheckboxGroup: Et,
                SelectionTags: It,
                SignatureInput: Tt
            } = (rt(at).reduce(((e, t) => (e.concat(at[t].viewerType), e)), []), rt(at).map((e => at[e].viewerType)).reduce(((e, t) => e.concat(t)), []).reduce(((e, t) => (e[t.split(".").reverse()[0]] = t, e)), {}), rt(at).map((e => at[e].sdkType)), it),
            Rt = [{
                type: st,
                role: ue
            }, {
                type: ct,
                role: "ratingsInputRole"
            }, {
                type: lt,
                role: "textInputRole"
            }, {
                type: dt,
                role: "textAreaRole"
            }, {
                type: ut,
                role: "richTextBoxRole"
            }, {
                type: pt,
                role: "checkboxRole"
            }, {
                type: ft,
                role: ae
            }, {
                type: ht,
                role: ie
            }, {
                type: mt,
                role: "dropdownRole"
            }, {
                type: gt,
                role: se
            }, {
                type: yt,
                role: "toggleSwitchRole"
            }, {
                type: vt,
                role: "sliderRole"
            }, {
                type: _t,
                role: fe
            }, {
                type: Et,
                role: "checkboxGroupRole"
            }, {
                type: It,
                role: "selectionTagsRole"
            }, {
                type: Tt,
                role: ge
            }],
            wt = (Rt.map((e => e.type)), Rt.map((e => e.role))),
            St = e => e.some((e => {
                return t = (0, D.get)(e, "role"), wt.includes(t);
                var t
            })),
            Ot = (e, t) => (e => [Ze, Qe].includes(e))(e) && (e => e.some((e => "save" === (0, D.get)(e, "config.events.onClick.action"))))(t) && St(t);

        function Pt(e) {
            return Pt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }, Pt(e)
        }

        function Nt(e) {
            var t = function(e, t) {
                if ("object" != Pt(e) || !e) return e;
                var r = e[Symbol.toPrimitive];
                if (void 0 !== r) {
                    var n = r.call(e, t || "default");
                    if ("object" != Pt(n)) return n;
                    throw new TypeError("@@toPrimitive must return a primitive value.")
                }
                return ("string" === t ? String : Number)(e)
            }(e, "string");
            return "symbol" == Pt(t) ? t : t + ""
        }

        function Ct(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }))), r.push.apply(r, n)
            }
            return r
        }

        function bt(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? Ct(Object(r), !0).forEach((function(t) {
                    var n, o, a;
                    n = e, o = t, a = r[t], (o = Nt(o)) in n ? Object.defineProperty(n, o, {
                        value: a,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : n[o] = a
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ct(Object(r)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                }))
            }
            return e
        }

        function Dt(e) {
            return "Minified Redux error #" + e + "; visit https://redux.js.org/Errors?code=" + e + " for the full message or use the non-minified dev environment for full errors. "
        }
        var At = "function" == typeof Symbol && Symbol.observable || "@@observable",
            Ft = function() {
                return Math.random().toString(36).substring(7).split("").join(".")
            },
            xt = {
                INIT: "@@redux/INIT" + Ft(),
                REPLACE: "@@redux/REPLACE" + Ft(),
                PROBE_UNKNOWN_ACTION: function() {
                    return "@@redux/PROBE_UNKNOWN_ACTION" + Ft()
                }
            };

        function Lt(e) {
            if ("object" != typeof e || null === e) return !1;
            for (var t = e; null !== Object.getPrototypeOf(t);) t = Object.getPrototypeOf(t);
            return Object.getPrototypeOf(e) === t
        }

        function Ut(e, t, r) {
            var n;
            if ("function" == typeof t && "function" == typeof r || "function" == typeof r && "function" == typeof arguments[3]) throw new Error(Dt(0));
            if ("function" == typeof t && void 0 === r && (r = t, t = void 0), void 0 !== r) {
                if ("function" != typeof r) throw new Error(Dt(1));
                return r(Ut)(e, t)
            }
            if ("function" != typeof e) throw new Error(Dt(2));
            var o = e,
                a = t,
                i = [],
                s = i,
                c = !1;

            function l() {
                s === i && (s = i.slice())
            }

            function d() {
                if (c) throw new Error(Dt(3));
                return a
            }

            function u(e) {
                if ("function" != typeof e) throw new Error(Dt(4));
                if (c) throw new Error(Dt(5));
                var t = !0;
                return l(), s.push(e),
                    function() {
                        if (t) {
                            if (c) throw new Error(Dt(6));
                            t = !1, l();
                            var r = s.indexOf(e);
                            s.splice(r, 1), i = null
                        }
                    }
            }

            function p(e) {
                if (!Lt(e)) throw new Error(Dt(7));
                if (void 0 === e.type) throw new Error(Dt(8));
                if (c) throw new Error(Dt(9));
                try {
                    c = !0, a = o(a, e)
                } finally {
                    c = !1
                }
                for (var t = i = s, r = 0; r < t.length; r++) {
                    (0, t[r])()
                }
                return e
            }
            return p({
                type: xt.INIT
            }), (n = {
                dispatch: p,
                subscribe: u,
                getState: d,
                replaceReducer: function(e) {
                    if ("function" != typeof e) throw new Error(Dt(10));
                    o = e, p({
                        type: xt.REPLACE
                    })
                }
            })[At] = function() {
                var e, t = u;
                return (e = {
                    subscribe: function(e) {
                        if ("object" != typeof e || null === e) throw new Error(Dt(11));

                        function r() {
                            e.next && e.next(d())
                        }
                        return r(), {
                            unsubscribe: t(r)
                        }
                    }
                })[At] = function() {
                    return this
                }, e
            }, n
        }

        function Mt() {
            for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
            return 0 === t.length ? function(e) {
                return e
            } : 1 === t.length ? t[0] : t.reduce((function(e, t) {
                return function() {
                    return e(t.apply(void 0, arguments))
                }
            }))
        }

        function kt() {
            for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
            return function(e) {
                return function() {
                    var r = e.apply(void 0, arguments),
                        n = function() {
                            throw new Error(Dt(15))
                        },
                        o = {
                            getState: r.getState,
                            dispatch: function() {
                                return n.apply(void 0, arguments)
                            }
                        },
                        a = t.map((function(e) {
                            return e(o)
                        }));
                    return n = Mt.apply(void 0, a)(r.dispatch), bt(bt({}, r), {}, {
                        dispatch: n
                    })
                }
            }
        }
        const Gt = {
                collectionName: null,
                readWriteType: Xe,
                filter: null,
                sort: null,
                includes: null,
                nested: [],
                pageSize: 12,
                deferred: !1
            },
            jt = "SET_CURRENT_RECORD",
            Bt = "UPDATE_FIELDS",
            Vt = "REFRESH_CURRENT_RECORD",
            $t = "REFRESH_CURRENT_VIEW",
            Wt = "INCREMENT_NUM_PAGES_TO_SHOW",
            qt = "SET_DEFAULT_RECORD",
            Ht = "GO_TO_INDEX",
            zt = "GO_TO_NEXT_PAGE",
            Yt = "GO_TO_PREVIOUS_PAGE",
            Jt = "LOAD_PAGE",
            Kt = "GET_RECORD_BY_INDEX_RESULT",
            Qt = "CURRENT_VIEW_UPDATED",
            Xt = "REVERT_CHANGES",
            Zt = "RECORD_REVERTED",
            er = "SAVE_RECORD",
            tr = "SAVE_RECORD_RESULT",
            rr = "REMOVE_CURRENT_RECORD",
            nr = "REMOVE_CURRENT_RECORD_RESULT",
            or = "NEW_RECORD",
            ar = "NEW_RECORD_RESULT",
            ir = "REFRESH",
            sr = "SET_USER_INPUT_OPTION_VALUES",
            cr = {
                INIT: "INIT",
                SET_PAGINATION_DATA: "SET_PAGINATION_DATA"
            },
            lr = cr,
            dr = e => {
                let {
                    controllerConfig: t = {},
                    connections: r = [],
                    isScoped: n = !1,
                    datasetType: o
                } = e;
                return {
                    type: cr.INIT,
                    datasetConfig: t.dataset || {},
                    connections: r,
                    isScoped: n,
                    datasetType: o
                }
            },
            ur = e => ({
                type: cr.SET_PAGINATION_DATA,
                paginationData: e
            }),
            pr = "SET_FILTER",
            fr = "SET_SORT",
            hr = "SET_IS_DATASET_READY",
            mr = "SET_FIXED_FILTER_ITEM",
            gr = e => null == e ? void 0 : e.readWriteType,
            yr = e => null == e ? void 0 : e.pageSize,
            vr = gr,
            _r = e => {
                let {
                    error: t,
                    payload: r
                } = e;
                return t ? tt.Result.Error(r) : tt.Result.Ok(r)
            },
            Er = {
                currentRecord: {
                    index: void 0,
                    data: void 0,
                    fieldsToUpdate: void 0,
                    updateSource: void 0
                },
                lastSavedRecord: {
                    index: void 0,
                    data: void 0
                },
                desiredIndex: void 0,
                refreshCurrentRecord: !1,
                removeCurrentRecord: !1,
                newRecordIndex: null,
                refreshCurrentView: !1,
                refreshController: !1,
                setFilterCalled: !1,
                revertChanges: !1,
                saveRecord: !1,
                defaultRecord: void 0,
                isForm: void 0,
                page: {
                    numPagesToShow: 1,
                    offset: 0,
                    size: Gt.pageSize
                },
                schema: void 0,
                userFilterInitialData: null,
                isApplyUserInputFiltersActionBindingPresent: !1
            },
            Ir = e => ((e, t) => (0, D.inRange)(e, Or(t).offset, Or(t).offset + Or(t).size))(Pr(e), e),
            Tr = e => e.some((e => "applyUserInputFilters" === (0, D.get)(e, "config.events.onClick.action"))),
            Rr = (e, t, r, n) => {
                const o = { ...e,
                    currentRecord: {
                        index: t,
                        data: r,
                        updateSource: n
                    },
                    desiredIndex: t,
                    refreshCurrentRecord: !1,
                    refreshController: !1
                };
                return Ir(o) ? o : { ...o,
                    page: { ...o.page,
                        offset: Math.floor(o.currentRecord.index / o.page.size) * o.page.size,
                        numPagesToShow: 1
                    }
                }
            },
            wr = e => e.page.size,
            Sr = e => e.currentRecord.data,
            Or = e => e.page,
            Pr = e => e.currentRecord.index,
            Nr = {
                reducer: function(e, t) {
                    switch (void 0 === e && (e = Er), t.type) {
                        case jt:
                            {
                                const {
                                    recordIndex: r,
                                    record: n,
                                    updateSource: o
                                } = t;
                                return Rr(e, r, n, o)
                            }
                        case or:
                            return { ...e,
                                newRecordIndex: t.atIndex
                            };
                        case ar:
                            return _r(t).fold((() => ({ ...e,
                                newRecordIndex: null
                            })), (t => ({ ...Rr(e, e.newRecordIndex, t),
                                newRecordIndex: null
                            })));
                        case Bt:
                            {
                                const {
                                    fieldsToUpdate: r,
                                    updateSource: n
                                } = t;
                                return { ...e,
                                    currentRecord: { ...e.currentRecord,
                                        fieldsToUpdate: r,
                                        updateSource: n
                                    }
                                }
                            }
                        case Ht:
                            return { ...e,
                                desiredIndex: t.index
                            };
                        case Kt:
                            return _r(t).fold((() => ({ ...e,
                                desiredIndex: e.currentRecord.index,
                                refreshCurrentRecord: !1,
                                refreshController: !1
                            })), (t => t.matchWith({
                                Record: t => {
                                    let {
                                        index: r,
                                        record: n
                                    } = t;
                                    return Rr(e, r, n)
                                },
                                InvalidIndex: () => ({ ...e,
                                    desiredIndex: e.currentRecord.index,
                                    refreshCurrentRecord: !1
                                }),
                                NoRecord: () => Rr(e, null, null)
                            })));
                        case Vt:
                            return { ...e,
                                refreshCurrentRecord: !0
                            };
                        case rr:
                            return { ...e,
                                removeCurrentRecord: !0
                            };
                        case nr:
                            return _r(t).fold((() => ({ ...e,
                                removeCurrentRecord: !1
                            })), (() => ({ ...e,
                                removeCurrentRecord: !1,
                                refreshCurrentRecord: !0
                            })));
                        case $t:
                            return { ...e,
                                refreshCurrentView: !0
                            };
                        case Qt:
                            return { ...e,
                                refreshCurrentView: !1
                            };
                        case Xt:
                            return { ...e,
                                revertChanges: !0
                            };
                        case Zt:
                            return { ...e,
                                revertChanges: !1
                            };
                        case qt:
                            {
                                const {
                                    record: r
                                } = t;
                                return { ...e,
                                    defaultRecord: r
                                }
                            }
                        case lr.INIT:
                            {
                                const {
                                    datasetConfig: r,
                                    connections: n
                                } = t,
                                o = yr(r),
                                a = vr(r);
                                return { ...e,
                                    isForm: Ot(a, n),
                                    page: { ...e.page,
                                        size: o || e.page.size
                                    },
                                    isApplyUserInputFiltersActionBindingPresent: Tr(n)
                                }
                            }
                        case lr.SET_PAGINATION_DATA:
                            {
                                const r = { ...e,
                                    page: { ...e.page,
                                        ...t.paginationData
                                    }
                                };
                                return Ir(r) ? r : { ...r,
                                    desiredIndex: r.page.offset
                                }
                            }
                        case zt:
                            {
                                const t = Or(e),
                                    r = wr(e),
                                    n = t.offset + r,
                                    o = { ...e,
                                        page: { ...e.page,
                                            numPagesToShow: 1,
                                            offset: n
                                        }
                                    };
                                return Ir(o) ? o : { ...o,
                                    desiredIndex: o.page.offset
                                }
                            }
                        case Yt:
                            {
                                const t = Or(e),
                                    r = Math.max(0, t.offset - t.size),
                                    n = { ...e,
                                        page: { ...e.page,
                                            numPagesToShow: 1,
                                            offset: r
                                        }
                                    };
                                return Ir(n) ? n : { ...n,
                                    desiredIndex: n.page.offset
                                }
                            }
                        case Jt:
                            {
                                const {
                                    size: r
                                } = Or(e),
                                n = { ...e,
                                    page: { ...e.page,
                                        numPagesToShow: 1,
                                        offset: r * (t.pageNumber - 1)
                                    }
                                };
                                return Ir(n) ? n : { ...n,
                                    desiredIndex: n.page.offset
                                }
                            }
                        case Wt:
                            return { ...e,
                                page: { ...e.page,
                                    numPagesToShow: e.page.numPagesToShow + 1
                                }
                            };
                        case er:
                            return { ...e,
                                saveRecord: !0,
                                lastSavedRecord: {
                                    index: void 0,
                                    data: void 0
                                }
                            };
                        case tr:
                            return _r(t).fold((() => ({ ...e,
                                saveRecord: !1
                            })), (t => ({ ...e,
                                saveRecord: !1,
                                lastSavedRecord: {
                                    index: e.currentRecord.index,
                                    data: t
                                }
                            })));
                        case pr:
                            return { ...e,
                                setFilterCalled: !0,
                                refreshController: !0
                            };
                        case fr:
                        case ir:
                            return { ...e,
                                refreshController: !0
                            };
                        case sr:
                            return { ...e,
                                userFilterInitialData: t.userFilterInitialData
                            };
                        default:
                            return e
                    }
                },
                getPaginationData: Or,
                hasCurrentRecord: e => !!Sr(e),
                selectDefaultDraft: e => ({ ...e.defaultRecord
                }),
                selectCurrentRecord: Sr,
                selectCurrentRecordIndex: Pr,
                selectDesiredRecordIndex: e => e.desiredIndex,
                selectFieldsToUpdate: e => e.currentRecord.fieldsToUpdate,
                selectLastSavedRecord: e => e.lastSavedRecord.data,
                selectLastSavedRecordIndex: e => e.lastSavedRecord.index,
                selectRefreshCurrentRecord: e => e.refreshCurrentRecord,
                selectRemoveCurrentRecord: e => e.removeCurrentRecord,
                selectRefreshController: e => e.refreshController,
                selectSetFilterCalled: e => e.setFilterCalled,
                selectRefreshCurrentView: e => e.refreshCurrentView,
                selectRevertChanges: e => e.revertChanges,
                selectSaveRecord: e => e.saveRecord,
                selectUpdateSource: e => e.currentRecord.updateSource,
                selectNewRecordIndex: e => e.newRecordIndex,
                isDuringSave: e => e.saveRecord,
                isForm: e => e.isForm,
                getUserFilterInitialData: e => e.userFilterInitialData,
                selectIsApplyUserInputFiltersActionBindingPresent: e => e.isApplyUserInputFiltersActionBindingPresent
            },
            Cr = "dataset",
            br = "router_dataset",
            Dr = e => {
                const {
                    prop: t,
                    fieldName: r
                } = (null == e ? void 0 : e.userInputFilter) ? ? {};
                return !(!t || !r)
            },
            {
                WRITE: Ar
            } = e,
            {
                ROUTER_DATASET: Fr
            } = t,
            xr = ["collectionName", "readWriteType", "includes", "cursor"],
            Lr = ["filter", "sort"],
            Ur = e => (0, D.pick)(e, xr),
            Mr = e => (0, D.pick)(e, Lr),
            kr = e => {
                let {
                    datasetConfig: t,
                    connections: r,
                    isScoped: n,
                    datasetType: o
                } = e;
                const a = o === Fr,
                    i = r.some((e => {
                        let {
                            role: t
                        } = e;
                        return t === K
                    })),
                    s = n,
                    c = !n,
                    l = t.readWriteType === Ar;
                return {
                    datasetIsRouter: a,
                    datasetIsMaster: i,
                    datasetIsVirtual: s,
                    datasetIsReal: c,
                    datasetIsDeferred: Boolean(t.deferred) && !(s || i || a || l),
                    dynamicPageNavComponentsShouldBeLinked: a && c,
                    userFilterConnectionProps: r.filter((e => {
                        let {
                            role: t,
                            config: r
                        } = e;
                        return Se.includes(t) && Dr(r)
                    })).map((e => {
                        let {
                            config: {
                                userInputFilter: t
                            },
                            role: r
                        } = e;
                        return { ...t,
                            role: r
                        }
                    }))
                }
            },
            Gr = (e, t) => ({ ...e,
                transientData: { ...e.transientData,
                    ...t
                }
            }),
            jr = {
                canonicalData: Ur(Gt),
                canonicalCalculatedData: {},
                transientData: {
                    isDatasetReady: !1,
                    ...Mr(Gt)
                }
            },
            Br = {
                reducer: function(e, t) {
                    switch (void 0 === e && (e = jr), t.type) {
                        case lr.INIT:
                            {
                                const {
                                    datasetConfig: r,
                                    connections: n,
                                    isScoped: o,
                                    datasetType: a
                                } = t;
                                return { ...e,
                                    canonicalData: { ...e.canonicalData,
                                        ...Ur(t.datasetConfig)
                                    },
                                    canonicalCalculatedData: kr({
                                        datasetConfig: r,
                                        connections: n,
                                        isScoped: o,
                                        datasetType: a
                                    }),
                                    transientData: { ...e.transientData,
                                        ...Mr(t.datasetConfig)
                                    }
                                }
                            }
                        case pr:
                            {
                                const {
                                    filter: r
                                } = t;
                                return Gr(e, {
                                    filter: r
                                })
                            }
                        case fr:
                            {
                                const {
                                    sort: r
                                } = t;
                                return Gr(e, {
                                    sort: r
                                })
                            }
                        case hr:
                            {
                                const {
                                    isDatasetReady: r
                                } = t;
                                return Gr(e, {
                                    isDatasetReady: r
                                })
                            }
                        case mr:
                            {
                                const {
                                    fixedFilterItem: r
                                } = t;
                                return Gr(e, {
                                    fixedFilterItem: r
                                })
                            }
                        default:
                            return e
                    }
                },
                isWriteOnly: e => (0, D.get)(e, ["canonicalData", "readWriteType"]) === Ze,
                isReadOnly: e => (0, D.get)(e, ["canonicalData", "readWriteType"]) === Xe,
                getReadWriteMode: e => (0, D.get)(e, ["canonicalData", "readWriteType"]),
                isDatasetReady: e => (0, D.get)(e, ["transientData", "isDatasetReady"]),
                isDatasetConfigured: e => !!(0, D.get)(e, ["canonicalData", "collectionName"]),
                isCursorPagingRequired: e => !!(0, D.get)(e, ["canonicalData", "cursor"]),
                isDatasetRouter: e => {
                    let {
                        canonicalCalculatedData: {
                            datasetIsRouter: t
                        }
                    } = e;
                    return t
                },
                isDatasetMaster: e => {
                    let {
                        canonicalCalculatedData: {
                            datasetIsMaster: t
                        }
                    } = e;
                    return t
                },
                isDatasetVirtual: e => {
                    let {
                        canonicalCalculatedData: {
                            datasetIsVirtual: t
                        }
                    } = e;
                    return t
                },
                isDatasetReal: e => {
                    let {
                        canonicalCalculatedData: {
                            datasetIsReal: t
                        }
                    } = e;
                    return t
                },
                isDatasetDeferred: e => {
                    let {
                        canonicalCalculatedData: {
                            datasetIsDeferred: t
                        }
                    } = e;
                    return t
                },
                shouldLinkDynamicPageNavComponents: e => {
                    let {
                        canonicalCalculatedData: {
                            dynamicPageNavComponentsShouldBeLinked: t
                        }
                    } = e;
                    return t
                },
                getUserFilterConnectionProps: e => {
                    let {
                        canonicalCalculatedData: {
                            userFilterConnectionProps: t
                        }
                    } = e;
                    return t
                },
                getFixedFilterItem: e => (0, D.get)(e, ["transientData", "fixedFilterItem"]),
                getFilter: e => (0, D.get)(e, ["transientData", "filter"]),
                getSort: e => (0, D.get)(e, ["transientData", "sort"]),
                getIncludes: e => (0, D.get)(e, ["canonicalData", "includes"]) || [],
                getCollectionName: e => (0, D.get)(e, ["canonicalData", "collectionName"])
            },
            Vr = "NEXT_DYNAMIC_PAGE_URL_RESULT",
            $r = "PREVIOUS_DYNAMIC_PAGE_URL_RESULT",
            Wr = "INITIALIZE",
            qr = (0, tt.union)("DynamicPageUrlLoadState", {
                Empty() {},
                Loading() {},
                Loaded: e => {
                    if (!e) throw new Error("url must exist");
                    return {
                        url: e
                    }
                }
            }, {
                hasUrl: e => () => e.matchWith({
                    Empty: () => !1,
                    Loading: () => !1,
                    Loaded: () => !0
                }),
                shouldLoadUrl: e => () => e.matchWith({
                    Empty: () => !1,
                    Loading: () => !0,
                    Loaded: () => !1
                })
            });
        qr.fromUrl = e => e ? qr.Loaded(e) : qr.Empty();
        const Hr = qr,
            {
                fromUrl: zr
            } = qr,
            Yr = {
                nextDynamicPageUrl: Hr.Empty(),
                previousDynamicPageUrl: Hr.Empty()
            },
            Jr = e => {
                const t = (e => {
                        const t = e.filter((e => !!(0, D.get)(e, "config.events.onClick.action")));
                        return new Set(t.map((e => (0, D.get)(e, "config.events.onClick.action"))))
                    })(e),
                    r = e => e ? Hr.Loading() : Hr.Empty();
                return {
                    nextDynamicPageUrl: r(t.has("nextDynamicPage")),
                    previousDynamicPageUrl: r(t.has("previousDynamicPage"))
                }
            },
            Kr = {
                reducer: function(e, t) {
                    switch (void 0 === e && (e = Yr), t.type) {
                        case Wr:
                            return { ...e,
                                ...Jr(t.connections)
                            };
                        case Vr:
                            return { ...e,
                                nextDynamicPageUrl: Hr.fromUrl(t.payload)
                            };
                        case $r:
                            return { ...e,
                                previousDynamicPageUrl: Hr.fromUrl(t.payload)
                            };
                        default:
                            return e
                    }
                },
                selectNextDynamicPageUrl: e => e.nextDynamicPageUrl,
                selectPreviousDynamicPageUrl: e => e.previousDynamicPageUrl
            },
            Qr = function(e) {
                for (var t = Object.keys(e), r = {}, n = 0; n < t.length; n++) {
                    var o = t[n];
                    0, "function" == typeof e[o] && (r[o] = e[o])
                }
                var a, i = Object.keys(r);
                try {
                    ! function(e) {
                        Object.keys(e).forEach((function(t) {
                            var r = e[t];
                            if (void 0 === r(void 0, {
                                    type: xt.INIT
                                })) throw new Error(Dt(12));
                            if (void 0 === r(void 0, {
                                    type: xt.PROBE_UNKNOWN_ACTION()
                                })) throw new Error(Dt(13))
                        }))
                    }(r)
                } catch (e) {
                    a = e
                }
                return function(e, t) {
                    if (void 0 === e && (e = {}), a) throw a;
                    for (var n = !1, o = {}, s = 0; s < i.length; s++) {
                        var c = i[s],
                            l = r[c],
                            d = e[c],
                            u = l(d, t);
                        if (void 0 === u) {
                            t && t.type;
                            throw new Error(Dt(14))
                        }
                        o[c] = u, n = n || u !== d
                    }
                    return (n = n || i.length !== Object.keys(e).length) ? o : e
                }
            }({
                records: Nr.reducer,
                config: Br.reducer,
                dynamicPages: Kr.reducer
            }),
            Xr = e => Br.getCollectionName(e.config),
            Zr = e => Br.getFilter(e.config),
            en = e => Br.getSort(e.config),
            tn = e => Nr.getPaginationData(e.records),
            rn = e => Br.getReadWriteMode(e.config),
            nn = e => Br.isDatasetConfigured(e.config),
            on = e => Br.isDatasetReady(e.config),
            an = e => Br.isReadOnly(e.config),
            sn = e => Br.isWriteOnly(e.config),
            cn = e => (e => Nr.hasCurrentRecord(e.records))(e) && !an(e),
            ln = e => Br.isDatasetRouter(e.config),
            dn = e => Br.isDatasetMaster(e.config),
            un = e => Br.isDatasetVirtual(e.config),
            pn = e => Br.isDatasetReal(e.config),
            fn = e => Br.isDatasetDeferred(e.config),
            hn = e => Br.shouldLinkDynamicPageNavComponents(e.config),
            mn = e => Nr.selectCurrentRecord(e.records),
            gn = e => Nr.selectCurrentRecordIndex(e.records),
            yn = e => Nr.selectDefaultDraft(e.records),
            vn = e => Nr.selectDesiredRecordIndex(e.records),
            _n = e => Nr.selectFieldsToUpdate(e.records),
            En = e => Nr.selectUpdateSource(e.records),
            In = e => Nr.selectNewRecordIndex(e.records),
            Tn = e => Kr.selectNextDynamicPageUrl(e.dynamicPages),
            Rn = e => Kr.selectPreviousDynamicPageUrl(e.dynamicPages),
            wn = e => Nr.selectRefreshController(e.records),
            Sn = e => Nr.selectSetFilterCalled(e.records),
            On = e => Nr.selectRefreshCurrentRecord(e.records),
            Pn = e => Nr.selectRefreshCurrentView(e.records),
            Nn = e => Nr.selectRemoveCurrentRecord(e.records),
            Cn = e => Nr.selectRevertChanges(e.records),
            bn = e => Nr.selectSaveRecord(e.records),
            Dn = e => Nr.getUserFilterInitialData(e.records),
            {
                READ_WRITE: An,
                READ: Fn
            } = e;
        class xn {
            constructor(e, t) {
                this._logger = e, this._listenToUnhandledErrors(t), this._predicateByEventType = new V([
                    [qe, e => {
                        let {
                            mode: t,
                            env: r
                        } = e;
                        return t.csr && !r.dev
                    }],
                    [Je, e => {
                        let {
                            mode: t,
                            env: r
                        } = e;
                        return t.verbose && r.preview
                    }]
                ])
            }
            log(e) {
                if (this._shouldLogErrorBi(e) && this._logger.log(e, new He(e.cause || e)), this._shouldLog(e)) return this._logger.log(e)
            }
            logError(e, t, r) {
                this.log(e instanceof w ? e : new S(t, {
                    cause: e,
                    ...r
                }))
            }
            _shouldLog(e) {
                const t = this._predicateByEventType.find(((t, r) => e instanceof r)) || (() => !0);
                return t(U.platform.settings)
            }
            _shouldLogErrorBi(e) {
                return e instanceof w && !(e instanceof O) && this._predicateByEventType.get(qe)(U.platform.settings)
            }
            _listenToUnhandledErrors(e) {
                e.addEventListener("unhandledrejection", (e => {
                    e.reason instanceof w && (e.preventDefault(), this._logger.log(new b({
                        cause: e.reason
                    })))
                }))
            }
        }
        const Ln = e => (t, r) => j(t, (t => e.log(new r({
                cause: t
            })))),
            Un = e => (t, r) => j((function() {
                for (var n = arguments.length, o = new Array(n), a = 0; a < n; a++) o[a] = arguments[a];
                const i = t(...o);
                return e.log(new r({
                    data: {
                        args: o,
                        result: i
                    }
                })), i
            }), (t => {
                throw e.log(new r({
                    data: {
                        exception: t
                    },
                    level: "error"
                })), t
            })),
            Mn = e => (t, r) => function() {
                for (var n = arguments.length, o = new Array(n), a = 0; a < n; a++) o[a] = arguments[a];
                if (r.startsWith("on")) return e.log(new Je(Je.types.DS_API.REGISTERED, {
                    methodName: r
                })), t(...o);
                if (e.log(new Je(Je.types.DS_API.CALLED, {
                        methodName: r,
                        args: o
                    })), $e.has(r)) {
                    const t = $e.get(r);
                    e.log(new Je(Je.types.DS_API.DEPRECATED, {
                        methodName: r,
                        replacementMethodName: t
                    }))
                }
                return B(t(...o)).then((t => (e.log(new Je(Je.types.DS_API.SUCCED, {
                    methodName: r,
                    result: t
                })), t)))
            };
        class kn extends qe {
            constructor(e) {
                let {
                    id: t,
                    collectionId: r,
                    collectionName: n,
                    datasetId: o,
                    datasetType: a,
                    datasetMode: i,
                    numberOfResults: s,
                    filteredBy: c,
                    componentType: l,
                    fieldType: d
                } = e;
                const {
                    platform: {
                        location: {
                            pageId: u,
                            pageUrl: p
                        },
                        settings: {
                            env: f
                        }
                    }
                } = U;
                super({
                    id: t,
                    collectionId: r,
                    collectionName: n,
                    datasetId: o,
                    datasetType: a,
                    datasetMode: i,
                    viewMode: f.name,
                    pageId: u,
                    pageUrl: p,
                    numberOfResults: s,
                    filteredBy: c,
                    componentType: l,
                    fieldType: d
                })
            }
        }
        var Gn = a(1435);
        const jn = e => {
            let {
                message: t,
                code: r
            } = e;
            const n = new Error(t);
            return n.code = r, n
        };
        class Bn {
            constructor(e) {
                let {
                    getRequestParams: t,
                    httpClient: r
                } = e;
                this.getRequestParams = t, this.httpClient = r
            }
            async _makeRequestTo(e, t) {
                const {
                    instance: r,
                    gridAppId: n
                } = this.getRequestParams();
                return (await this.httpClient.post(`/_serverless/data-binding-server/${e}`, t, {
                    params: {
                        gridAppId: n
                    },
                    headers: {
                        Authorization: r,
                        "Content-Type": "application/json"
                    }
                })).data
            }
            async fetchBulkData(e) {
                const {
                    recordsByCollectionId: t,
                    recordsInfoByDataset: r
                } = await this._makeRequestTo("fetch-initial-data", e);
                return {
                    recordsInfoByDataset: r.reduce(((e, t) => {
                        let {
                            itemIds: r = [],
                            totalCount: n = 0,
                            error: o
                        } = t;
                        return [...e, {
                            itemIds: r,
                            totalCount: n,
                            error: o ? jn(o) : void 0
                        }]
                    }), []),
                    recordsByCollectionId: Object.entries(t).reduce(((e, t) => {
                        let [r, n] = t;
                        return { ...e,
                            [r]: Object.entries(n).reduce(((e, t) => {
                                let [r, n] = t;
                                return { ...e,
                                    [r]: (0, Gn.aU)(n)
                                }
                            }), {})
                        }
                    }), {})
                }
            }
            async fetchData(e) {
                const {
                    items: t,
                    ...r
                } = await this._makeRequestTo("fetch-data", e);
                return { ...r,
                    items: t.map((e => (0, Gn.aU)(e)))
                }
            }
            async remove(e) {
                return this._makeRequestTo("remove", e)
            }
            async save(e) {
                const {
                    item: t
                } = await this._makeRequestTo("save", e);
                return (0, Gn.aU)(t)
            }
        }
        const Vn = ".",
            $n = e => (0, D.head)(e.split(Vn)),
            Wn = e => e.split(Vn),
            qn = e => (0, D.isPlainObject)(e) && (0, D.has)(e, "_id"),
            Hn = (e, t) => e !== t && qn(e) && !qn(t) ? e : t,
            zn = function(e, t) {
                void 0 === t && (t = {});
                for (const r of e) {
                    const e = t[r._id];
                    t[r._id] = (0, D.mergeWith)(e, r, Hn)
                }
                return t
            },
            Yn = (e, t) => {
                const r = t.flatMap((e => ["fields", e])).concat("type");
                return (0, D.get)(e, r)
            },
            Jn = (e, t) => r => {
                const n = Wn(r);
                if (((e, t) => t.length >= 2 && Yn(e, [t[0]]) === l.FieldType.reference)(e, n)) {
                    const [r, ...o] = n, a = e && e.fields[r] ? e.fields[r].referencedCollection : null, i = t && a ? t[a] : null;
                    return Yn(i, o)
                }
                return Yn(e, n)
            },
            Kn = (e, t) => null != t && null != t.fields[e] ? t.fields[e].referencedCollection : null,
            Qn = e => null != e ? e.displayField : null,
            Xn = e => null != e ? e.maxPageSize : void 0,
            Zn = e => (0, D.includes)(e, Vn),
            eo = e => {
                let {
                    schema: t,
                    defaultToDbDriverLimit: r
                } = e;
                const n = r ? 100 : 1e3;
                return Xn(t) ? ? n
            },
            to = (e, t) => async r => {
                const {
                    baseQuery: n,
                    fieldName: o,
                    schema: a
                } = r, i = ((e, t, r) => {
                    const n = e.fields[t] ? .queryOperators;
                    return !n || n.includes(r)
                })(a, o, l.AllowedFilterOperator.ne);
                if (i) return t({ ...r,
                    baseQuery: n.ne(o, e)
                });
                const s = await t(r);
                return (0, D.filter)(s, (t => ((e => (0, D.isObject)(e))(t) ? t[o] : t) !== e))
            },
            ro = e => to("", e),
            no = e => to(void 0, e),
            oo = async e => {
                let {
                    baseQuery: t,
                    schema: r,
                    fieldName: n
                } = e;
                const o = eo({
                        schema: r,
                        defaultToDbDriverLimit: !0
                    }),
                    {
                        items: a
                    } = await t.limit(o).find(),
                    i = a.flatMap((e => e[n]));
                return (0, D.uniq)(i)
            },
            ao = async e => {
                let {
                    baseQuery: t,
                    fieldName: r,
                    schema: n
                } = e;
                const o = eo({
                        schema: n,
                        defaultToDbDriverLimit: !1
                    }),
                    {
                        items: a
                    } = await t.limit(o).distinct(r, null);
                return a
            },
            io = e => {
                let {
                    wixData: t,
                    schema: r,
                    sortModel: n,
                    fieldName: o,
                    filterModel: a
                } = e;
                const i = (e => {
                    let {
                        wixData: t,
                        schema: r,
                        sortModel: n,
                        fieldName: o
                    } = e;
                    const a = $n(o);
                    if (a) {
                        var i, s;
                        const e = (null == (i = r.fields[a]) ? void 0 : i.sortable) ? ? !0,
                            o = r.defaultSort ? [{
                                [r.defaultSort.fieldName]: r.defaultSort.direction
                            }] : null,
                            c = (null == n ? void 0 : n.length) > 0,
                            l = !((null == n ? void 0 : n.find((e => e[a]))) || (null == r || null == (s = r.defaultSort) ? void 0 : s.fieldName) === a) && e,
                            d = t.sort().ascending(a).getSortModel();
                        if (c) return l ? [...n, ...d] : n;
                        if (o) return l ? [...o, ...d] : o;
                        if (e) return d
                    }
                    return null
                })({
                    wixData: t,
                    schema: r,
                    sortModel: n,
                    fieldName: o
                });
                return t.query(r.id).setFilterModel(a).setSortModel(i)
            },
            so = async e => {
                let {
                    baseQuery: t,
                    schema: r,
                    references: n
                } = e;
                const o = eo({
                        schema: r,
                        defaultToDbDriverLimit: !0
                    }),
                    {
                        items: a
                    } = await t.hasSome("_id", n).limit(o).find();
                return a
            },
            co = async e => {
                let {
                    baseQuery: t,
                    schema: r,
                    wixData: n,
                    customSortExists: o,
                    referencingFieldName: a,
                    referencedFieldName: i,
                    referencedSchema: s
                } = e;
                const c = eo({
                        schema: r,
                        defaultToDbDriverLimit: !1
                    }),
                    {
                        items: l
                    } = await t.limit(c).distinct(a, null),
                    d = ro(no(so)),
                    u = await d({
                        baseQuery: n.query(s.id),
                        schema: s,
                        fieldName: i,
                        references: l
                    });
                return o ? l.flatMap((e => u.filter((t => t._id === e)))) : u
            },
            lo = async e => {
                let {
                    baseQuery: t,
                    schema: r,
                    fieldName: n
                } = e;
                const o = eo({
                        schema: r,
                        defaultToDbDriverLimit: !0
                    }),
                    {
                        items: a
                    } = await t.limit(o).include(n).find();
                return a
            },
            uo = async e => {
                let {
                    baseQuery: t,
                    schema: r,
                    referencingFieldName: n,
                    referencedFieldName: o
                } = e;
                const a = no(lo),
                    i = await a({
                        baseQuery: t,
                        schema: r,
                        fieldName: n
                    });
                return (0, D.uniqBy)(i.map((e => e[n])).filter((e => !["", void 0].includes(e[o]))), "_id")
            },
            po = async e => {
                var t;
                let {
                    schema: r,
                    schemas: n,
                    wixData: o,
                    fieldName: a,
                    role: i,
                    sortModel: s,
                    filterModel: c
                } = e;
                const d = io({
                        wixData: o,
                        schema: r,
                        fieldName: a,
                        sortModel: s,
                        filterModel: c
                    }),
                    [u, p] = Wn(a),
                    f = n[r.fields[u].referencedCollection];
                if (!f) return null;
                const h = (null == s ? void 0 : s.length) > 0,
                    m = (null == (t = r.allowedOperations) ? void 0 : t.includes(l.DataOperation.distinct)) ? co : uo,
                    g = await m({
                        baseQuery: d,
                        schema: r,
                        schemas: n,
                        wixData: o,
                        fieldName: a,
                        customSortExists: h,
                        referencingFieldName: u,
                        referencedFieldName: p,
                        referencedSchema: f
                    }),
                    y = (e => {
                        let {
                            referencedItems: t,
                            referencedSchema: r,
                            referencedFieldName: n,
                            customSortExists: o
                        } = e;
                        const a = (0, D.uniq)(t.flatMap((e => e[n]))),
                            i = r.fields[n].type;
                        return o ? a : i === l.FieldType.number ? a.sort(((e, t) => e - t)) : a.sort()
                    })({
                        referencedItems: g,
                        referencedSchema: f,
                        referencedFieldName: p,
                        customSortExists: h
                    }),
                    v = (e => {
                        let {
                            referencedItems: t,
                            referencedFieldName: r,
                            options: n
                        } = e;
                        return Object.fromEntries(n.map((e => [e, t.filter((t => (0, D.isArray)(t[r]) ? t[r].includes(e) : t[r] === e)).map((e => e._id))])))
                    })({
                        referencedItems: g,
                        options: y,
                        referencedFieldName: p
                    });
                return {
                    fieldName: a,
                    role: i,
                    options: y,
                    referencedItemIdsByOption: v
                }
            },
            fo = async e => {
                var t;
                let {
                    schema: r,
                    wixData: n,
                    fieldName: o,
                    role: a,
                    filterModel: i
                } = e;
                const s = {
                    wixData: n,
                    schema: r,
                    filterModel: i,
                    fieldName: o,
                    role: a
                };
                return (null == (t = r.allowedOperations) ? void 0 : t.includes(l.DataOperation.aggregate)) ? (async e => {
                    let {
                        wixData: t,
                        schema: r,
                        filterModel: n,
                        fieldName: o,
                        role: a
                    } = e;
                    const i = t.filter().setFilterModel(n),
                        {
                            items: s
                        } = await t.aggregate(r.id).filter(i).max(o, "max").min(o, "min").run(),
                        {
                            min: c,
                            max: l
                        } = s[0] ? ? {};
                    return {
                        fieldName: o,
                        role: a,
                        min: c,
                        max: l
                    }
                })(s) : (async e => {
                    let {
                        wixData: t,
                        schema: r,
                        filterModel: n,
                        fieldName: o,
                        role: a
                    } = e;
                    const i = t.query(r.id).setFilterModel(n).limit(1),
                        [{
                            items: s
                        }, {
                            items: c
                        }] = await Promise.all([i.ascending(o).find(), i.descending(o).find()]),
                        l = s.map((e => e[o]))[0],
                        d = c.map((e => e[o]))[0];
                    return {
                        fieldName: o,
                        role: a,
                        min: l,
                        max: d
                    }
                })(s)
            };
        class ho {
            constructor(e) {
                let {
                    wixData: t,
                    wixDataSchemas: r
                } = e;
                this._wixData = mo.reduce(((e, r) => (e[r] = function() {
                    const e = t[r](...arguments);
                    return e.catch instanceof Function ? e.catch((e => {
                        throw Io(e)
                    })) : e
                }, e)), { ...t
                }), this._wixDataSchemas = r
            }
            async fetchBulkData(e) {
                const t = await Promise.all(e.map((e => {
                    let {
                        collectionId: t,
                        filter: r,
                        sort: n,
                        offset: o,
                        cursor: a,
                        length: i,
                        includes: s,
                        uniqueFieldValues: c
                    } = e;
                    return this.fetchData({
                        collectionId: t,
                        filter: r,
                        sort: n,
                        offset: o,
                        cursor: a,
                        length: i,
                        includes: s,
                        uniqueFieldValues: c
                    }).catch((e => ({
                        error: e
                    })))
                })));
                return ((e, t) => t.reduce(((t, r, n) => {
                    let {
                        items: o,
                        nextCursor: a,
                        totalCount: i,
                        uniqueFieldValues: s,
                        error: c
                    } = r;
                    if (c) return t.recordInfosInDatasetOrder.push({
                        error: c
                    }), t;
                    t.recordInfosInDatasetOrder.push({
                        itemIds: o.map((e => {
                            let {
                                _id: t
                            } = e;
                            return t
                        })),
                        totalCount: i,
                        nextCursor: a
                    });
                    const l = e[n].collectionId,
                        d = t.recordsByCollectionId[l];
                    return t.recordsByCollectionId[l] = zn(o, d), t.uniqueFieldValuesByCollection[l] = { ...t.uniqueFieldValuesByCollection[l],
                        ...s
                    }, t
                }), {
                    recordInfosInDatasetOrder: [],
                    recordsByCollectionId: {},
                    uniqueFieldValuesByCollection: {}
                }))(e, t)
            }
            async fetchData(e) {
                let {
                    collectionId: t,
                    filter: r,
                    sort: n,
                    offset: o = 0,
                    includes: a,
                    cursor: i,
                    length: s,
                    uniqueFieldValues: c
                } = e;
                const l = i ? this._wixData.fetch(t, i, s) : (() => {
                        let e = this._wixData.query(t).setFilterModel(r).setSortModel(n).skip(o).limit(s);
                        return null == a || a.forEach((t => {
                            e = e.include(t)
                        })), e.find()
                    })(),
                    d = c.length > 0 ? this._fetchUniqueValues({
                        collectionId: t,
                        fieldKeys: c
                    }) : Promise.resolve({}),
                    [u, p] = await Promise.all([l, d]),
                    {
                        items: f,
                        totalCount: h,
                        nextCursor: m
                    } = u;
                return {
                    items: f,
                    nextCursor: m,
                    totalCount: h || 0,
                    uniqueFieldValues: p
                }
            }
            async fetchUserFilterInitialData(e) {
                let {
                    filter: t,
                    sort: r,
                    userFilterConnectionProps: n,
                    schema: o,
                    schemas: a
                } = e;
                const i = [Re],
                    s = (0, D.uniqBy)(n.filter((e => {
                        let {
                            role: t
                        } = e;
                        return i.includes(t)
                    })), "fieldName"),
                    c = (0, D.uniqWith)(n.filter((e => {
                        let {
                            role: t
                        } = e;
                        return Ve.includes(t)
                    })), ((e, t) => e.fieldName === t.fieldName)),
                    d = await Promise.all([...s.map((async e => {
                        let {
                            fieldName: r,
                            role: n
                        } = e;
                        const a = {
                            schema: o,
                            wixData: this._wixData,
                            fieldName: r,
                            role: n,
                            filterModel: t
                        };
                        return fo(a)
                    })), ...c.map((async e => {
                        let {
                            fieldName: n,
                            role: i
                        } = e;
                        const s = Zn(n),
                            c = {
                                wixData: this._wixData,
                                schema: o,
                                schemas: a,
                                fieldName: n,
                                role: i,
                                sortModel: r,
                                filterModel: t
                            };
                        return s ? po(c) : (async e => {
                            var t;
                            let {
                                wixData: r,
                                schema: n,
                                fieldName: o,
                                role: a,
                                sortModel: i,
                                filterModel: s
                            } = e;
                            const c = io({
                                    wixData: r,
                                    schema: n,
                                    fieldName: o,
                                    sortModel: i,
                                    filterModel: s
                                }),
                                d = null == (t = n.allowedOperations) ? void 0 : t.includes(l.DataOperation.distinct),
                                u = ro(d ? ao : no(oo));
                            return {
                                fieldName: o,
                                role: a,
                                options: await u({
                                    baseQuery: c,
                                    fieldName: o,
                                    schema: n
                                })
                            }
                        })(c)
                    }))]);
                return d.filter(ot)
            }
            async remove(e) {
                let {
                    collectionId: t,
                    recordId: r
                } = e;
                return this._wixData.remove(t, r)
            }
            async save(e) {
                let {
                    collectionId: t,
                    record: r,
                    includeReferences: n
                } = e;
                return this._wixData.save(t, r, {
                    includeReferences: n
                })
            }
            async getSibling(e) {
                let {
                    collectionName: t,
                    filter: r,
                    sort: n,
                    fieldValues: o,
                    sortFields: a,
                    directionTowardSibling: i
                } = e;
                const s = this._wixData.query(t).setFilterModel(r),
                    {
                        items: [c]
                    } = await go({
                        sort: n,
                        sortFields: a,
                        fieldValues: o,
                        baseQuery: s,
                        directionTowardSibling: i
                    }).find();
                return c
            }
            fetchSchemas(e) {
                return this._wixDataSchemas.bulkGet(e, {
                    referencedCollectionsDepth: 1
                })
            }
            createSimpleFilter(e, t) {
                return this._wixData.filter().eq(e, t).getFilterModel()
            }
            async _fetchUniqueValues(e) {
                let {
                    collectionId: t,
                    fieldKeys: r
                } = e;
                return (await Promise.all(r.map((e => this._wixData.query(t).distinct(e))))).reduce(((e, t, n) => {
                    let {
                        _items: o
                    } = t;
                    return e[r[n]] = o, e
                }), {})
            }
        }
        const mo = ["save", "remove", "find", "sort", "filter", "query", "fetch", "aggregate"],
            go = e => {
                let {
                    sort: t,
                    sortFields: r,
                    directionTowardSibling: n,
                    fieldValues: o,
                    baseQuery: a
                } = e;
                return yo({
                    sort: t,
                    sortFields: r,
                    directionTowardSibling: n,
                    fieldValues: o,
                    baseQuery: a
                })(r.length - 1).reduce(((e, t) => e.or(t)))
            },
            yo = e => {
                let {
                    baseQuery: t,
                    sortFields: r,
                    sort: n,
                    directionTowardSibling: o,
                    fieldValues: a
                } = e;
                return function e(i) {
                    if (-1 === i) return [];
                    const s = r[i];
                    if (!a[s]) return e(i - 1);
                    return [(0, D.flow)(vo(n, o), _o(n[s], o, s, a[s]), Eo(i, r, a))(t), ...e(i - 1)]
                }
            },
            vo = (e, t) => r => Object.entries(e).reduce(((e, r) => {
                let [n, o] = r;
                return o === t ? e.ascending(n) : e.descending(n)
            }), r),
            _o = (e, t, r, n) => o => e === t ? o.gt(r, n) : o.lt(r, n),
            Eo = (e, t, r) => n => (0, D.range)(e).reduce(((e, n) => e.eq(t[n], r[t[n]])), n).limit(1),
            Io = e => {
                if (!e.stack) {
                    const {
                        message: t,
                        code: r
                    } = "string" == typeof e ? {
                        message: e,
                        code: "WD_VALIDATION_FAILED"
                    } : e, n = new Error(t);
                    return n.code = r, n
                }
                return e
            };
        class To {
            constructor(e) {
                R()(this, "warmupData", void 0), this.warmupData = e
            }
            getSchemas() {
                return this.warmupData.get("schemas")
            }
            setSchemas(e) {
                this.warmupData.set("schemas", e)
            }
            getDataStore() {
                return this.warmupData.get("dataStore")
            }
            setDataStore(e) {
                this.warmupData.set("dataStore", e)
            }
            getUserFilterInitialData(e) {
                return this.warmupData.get(`userFilterInitialData-${e}`)
            }
            setUserFilterInitialData(e, t) {
                this.warmupData.set(`userFilterInitialData-${e}`, t)
            }
        }
        class Ro {
            constructor(e) {
                if (e && e.config) {
                    this._collectionId = e.config.dataset.collectionName, this._items = e.items, this._schemas = e.schemas;
                    const t = e.nextCursor || void 0,
                        r = e.totalCount || 0,
                        n = (e.items || []).length;
                    this._datasetSize = {
                        cursor: t,
                        total: r,
                        loaded: n
                    }
                }
            }
            getSchemas() {
                return this._schemas
            }
            getDataStore() {
                if (this._items) return (e => {
                    let {
                        items: t,
                        datasetSize: r,
                        collectionId: n
                    } = e;
                    return {
                        recordInfosInDatasetOrder: [{
                            itemIds: t.map((e => {
                                let {
                                    _id: t
                                } = e;
                                return t
                            })),
                            datasetSize: r,
                            collectionId: n
                        }],
                        recordsByCollectionId: {
                            [n]: zn(t, {})
                        }
                    }
                })({
                    items: this._items,
                    datasetSize: this._datasetSize,
                    collectionId: this._collectionId
                })
            }
            getItems() {
                return this._items
            }
        }
        const wo = {
                dsn: "https://27180ecd50484e4eafe543b40d29866d@sentry.wixpress.com/89"
            },
            So = {
                dsn: "https://73a0410004ae41b7b60ca1c4b4684996@sentry.wixpress.com/183"
            },
            Oo = {
                dsn: "https://9653fbb3e48143d890dba8a09a5a98c6@sentry.wixpress.com/184"
            },
            Po = {
                dsn: "https://cef68e5a2fd04f08a7c2a02738dbc237@sentry-next.wixpress.com/2411"
            },
            No = ["ReactSource", "EditorSource", "experiments", "petri_ovr", "WixCodeRuntimeSource", "js-wixcode-sdk-override", "debug"],
            Co = e => {
                try {
                    const t = (e => Array.from(new URL(e).searchParams.entries()).reduce(((e, [t, r]) => ({ ...e,
                        [t]: r
                    })), {}))(e || "");
                    return (e => "true" === e.forceReportSentry)(t) || (e => Object.keys(e).every((e => !No.includes(e))))(t)
                } catch {
                    return !0
                }
            },
            bo = [e => (e => [e ? .request ? .headers ? .Referer, e ? .request ? .url])(e).every(Co)],
            Do = (e, t) => bo.concat(t || (e => e)).every((t => t(e))),
            Ao = e => {
                try {
                    return e()
                } catch {
                    return "unknown"
                }
            },
            Fo = e => {
                try {
                    return e()
                } catch (e) {
                    return "object" == typeof e && null !== e && "message" in e ? e.message : void 0
                }
            },
            xo = ({
                Raven: e,
                globalScope: t,
                dsn: r,
                params: n = {},
                appName: o
            }) => {
                /https?:\/\/localhost/.test(z()) || ((({
                    Raven: e,
                    appName: t,
                    browserUrlGetter: r,
                    dsn: n,
                    params: o
                }) => {
                    const a = Y(t),
                        i = H(a);
                    e.config(n, {
                        maxUrlLength: 1e3,
                        captureUnhandledRejections: !1,
                        autoBreadcrumbs: {
                            dom: !1
                        }
                    }), e.setRelease(o.release || i), e.setShouldSendCallback(o.shouldSendCallback || Do), e.setDataCallback(((e, t) => (e.request = Object.assign(e.request || {}, {
                        url: r()
                    }), (t || (e => e))(e))))
                })({
                    Raven: e,
                    appName: o,
                    browserUrlGetter: () => Ao((() => t ? .["wix-location"] ? .url)),
                    dsn: r,
                    params: n
                }), e.setDataCallback(((e, r = (e => e)) => (e.extra = Object.assign(e.extra || {}, (e => ({
                    referrer: Fo((() => e ? .["wix-window"] ? .referrer)),
                    workerUrl: Fo((() => e ? .location ? .href))
                }))(t)), e.tags = Object.assign(e.tags || {}, n.tags || {}, (e => ({
                    renderMode: Ao((() => e ? .["wix-window"] ? .rendering ? .env)),
                    viewMode: Ao((() => e ? .["wix-window"] ? .viewMode)),
                    santaVersion: Ao((() => (e => {
                        const t = e.match(/santa\/([^/]*)/);
                        return t ? t[1] : "unknown"
                    })(e ? .location ? .href || "")))
                }))(t)), r(e)))))
            },
            {
                USER_SCOPE: Lo,
                APPLICATION_SCOPE: Uo,
                SERVER_SCOPE: Mo
            } = w.scopes,
            {
                DBSMViewer: {
                    dsn: ko
                },
                UserErrors: {
                    dsn: Go
                },
                WixData: {
                    dsn: jo
                },
                DBSMViewerNext: {
                    dsn: Bo
                }
            } = r,
            Vo = {
                [Uo]: ko,
                [Lo]: Go,
                [Mo]: jo
            };
        let $o = function(e, t) {
            return r => this.mode.dev ? (e === Error && (this.console.error(r), r.cause && this.console.error("Caused by:", r.cause)), null == r.run ? void 0 : r.run()) : t(r)
        };
        class Wo {
            constructor(e) {
                let {
                    fedops: t,
                    bi: r,
                    monitor: n,
                    verbose: o,
                    console: a,
                    global: i,
                    platform: s
                } = e;
                const c = a.factory();
                $o = $o.bind({
                    mode: s.settings.mode,
                    console: c
                }), this._eventToHandler = this._createEventToHandler(), this._fedOpsLogger = this._createFedopsLogger(t), this._bi = this._createBiLoggers({
                    bi: r,
                    settings: s.settings
                }), this._monitor = (e => {
                    let {
                        createErrorMonitor: t,
                        dsn: r,
                        platform: n
                    } = e;
                    const o = Y(We),
                        a = H(o);
                    return t({
                        dsn: r,
                        appName: We,
                        version: a,
                        environment: n.settings.mode.name,
                        user: {
                            id: n.user.id
                        }
                    })
                })({
                    createErrorMonitor: n.createErrorMonitor,
                    dsn: Bo,
                    platform: s
                }), this._legacyMonitor = this._setupLegacyMonitor({
                    monitor: n,
                    global: i,
                    platform: s
                }), this._verboseLogger = o.factory(), this._console = c, this._errorMonitorTags = {
                    msid: s.settings.metaSiteId,
                    url: (s.location.pageUrl || "").slice(0, 200),
                    viewMode: s.settings.mode.name,
                    renderMode: s.settings.env.name
                }
            }
            log() {
                for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                if (t.length > 1) return t.map((e => this.log(e)));
                const [n] = t, [, o] = Array.from(this._eventToHandler).find((e => {
                    let [t] = e;
                    return t.prototype.isPrototypeOf(n)
                })) || [];
                return o ? o(n) : this._console.error("Oj-vej! This event is not supported by logger", n)
            }
            _createEventToHandler() {
                return new Map([
                    [Error, $o(Error, (e => {
                        if (e instanceof b) this._console.warn("You have unhandled error in async operation. Consider catching it and handling accordingly.\n", e.cause);
                        else {
                            const {
                                scope: t,
                                cause: r,
                                options: {
                                    extra: n,
                                    ...o
                                } = {}
                            } = e;
                            if (e instanceof O) this._console.error(e), r && this._console.error("Caused by:", r);
                            else {
                                const t = r instanceof Error;
                                this._monitor.captureException(t ? r : e, {
                                    tags: { ...o,
                                        ...this._errorMonitorTags,
                                        wrapperErrorMessage: t ? `${e.name}: ${e.message}\n${e.stack}`.slice(0, 200) : void 0
                                    },
                                    contexts: { ...n,
                                        wrapperError: t ? e : void 0
                                    }
                                })
                            }
                            this._legacyMonitor[t].captureException(e, {
                                zone: t,
                                extra: {
                                    cause: r,
                                    ...n
                                },
                                ...o
                            })
                        }
                    }))],
                    [qe, $o(qe, (e => {
                        let {
                            event: t,
                            type: r
                        } = e;
                        return r === qe.types.ERROR ? this._bi.errorLogger.log(t) : this._bi.logger.log(t)
                    }))],
                    [ze, $o(ze, (e => {
                        let {
                            name: t,
                            params: r,
                            run: n,
                            onStart: o,
                            onEnd: a
                        } = e;
                        return o((() => this._fedOpsLogger.interactionStarted(t, r))), a((() => this._fedOpsLogger.interactionEnded(t, r))), n()
                    }))],
                    [Ye, $o(Ye, (e => {
                        let {
                            event: t
                        } = e;
                        this._legacyMonitor[Uo].captureBreadcrumb(t), this._monitor.addBreadcrumb(t)
                    }))],
                    [Je, e => {
                        let {
                            messages: t
                        } = e;
                        return this._verboseLogger.log(...t)
                    }],
                    [Ke, e => {
                        let {
                            message: t,
                            level: r
                        } = e;
                        return this._console[r](t)
                    }]
                ])
            }
            _createFedopsLogger(e) {
                let {
                    factory: t,
                    hooks: {
                        start: r,
                        end: n
                    }
                } = e;
                return t.getLoggerForWidget({
                    appId: "databinding",
                    appName: "databinding",
                    startHook: r,
                    endHook: n
                })
            }
            _createBiLoggers(e) {
                let {
                    bi: {
                        factory: t
                    },
                    settings: {
                        env: r
                    }
                } = e;
                return {
                    logger: t().logger({
                        endpoint: r.editor ? "platform" : "platform-viewer"
                    }),
                    errorLogger: t().logger({
                        endpoint: "trg"
                    })
                }
            }
            _setupLegacyMonitor(e) {
                let {
                    monitor: {
                        factory: t
                    },
                    global: r,
                    platform: n
                } = e;
                const {
                    metaSiteId: o,
                    userId: a
                } = n.settings;
                return Object.entries(Vo).reduce(((e, n) => {
                    let [i, s] = n;
                    const c = t(s);
                    return e[i] = c, xo({
                        dsn: s,
                        Raven: c,
                        globalScope: r,
                        appName: We,
                        user: {
                            id: a
                        },
                        params: {
                            tags: {
                                msid: o
                            }
                        }
                    }), e
                }), {})
            }
        }
        class qo {
            constructor() {
                this._recordInfosByDatasetId = {}, this._recordsByCollectionId = {}, this._uniqueFieldValuesByCollection = {}, this._schemas = {}, this._userFilterInitialData = {}
            }
            getData(e) {
                let {
                    datasetId: t,
                    collectionId: r,
                    includes: n
                } = e;
                const o = this._recordInfosByDatasetId[t];
                return o ? {
                    datasetSize: o.datasetSize,
                    items: o.itemIds.map((e => Ho(this._recordsByCollectionId[r][e], this.getSchema(r), n)))
                } : null
            }
            getRecord(e) {
                var t;
                let {
                    collectionId: r,
                    recordId: n,
                    includes: o
                } = e;
                const a = null == (t = this._recordsByCollectionId[r]) ? void 0 : t[n];
                return a && Ho(a, this.getSchema(r), o)
            }
            updateCollectionData(e) {
                let {
                    collectionId: t,
                    data: r
                } = e;
                const {
                    [t]: n
                } = this._recordsByCollectionId, {
                    [t]: o
                } = this._uniqueFieldValuesByCollection, {
                    items: a,
                    uniqueFieldValues: i
                } = r;
                this._recordsByCollectionId[t] = zo(a, n), this._uniqueFieldValuesByCollection[t] = Yo(i, o)
            }
            getSchema(e) {
                return this._schemas[e]
            }
            updateStore(e) {
                let {
                    recordsByCollectionId: t = {},
                    recordInfosByDatasetId: r = {},
                    uniqueFieldValuesByCollection: n = {}
                } = e;
                this._recordInfosByDatasetId = { ...this._recordInfosByDatasetId,
                    ...r
                };
                for (const [e, r] of Object.entries(t)) this._recordsByCollectionId[e] = { ...this._recordsByCollectionId[e],
                    ...r
                };
                for (const [e, t] of Object.entries(n)) this._uniqueFieldValuesByCollection[e] = { ...this._uniqueFieldValuesByCollection[e],
                    ...t
                }
            }
            getStore() {
                return {
                    recordInfosByDatasetId: this._recordInfosByDatasetId,
                    recordsByCollectionId: this._recordsByCollectionId,
                    uniqueFieldValuesByCollection: this._uniqueFieldValuesByCollection
                }
            }
            hasDataset(e) {
                return Boolean(this._recordInfosByDatasetId[e])
            }
            setUniqueFieldValues(e) {
                let {
                    collectionId: t,
                    fieldKey: r,
                    data: n
                } = e;
                this._uniqueFieldValuesByCollection[t] = { ...this._uniqueFieldValuesByCollection[t],
                    [r]: n
                }
            }
            getUniqueFieldValues(e) {
                var t;
                let {
                    collectionId: r,
                    fieldKey: n
                } = e;
                return null == (t = this._uniqueFieldValuesByCollection[r]) ? void 0 : t[n]
            }
            updateSchemas(e) {
                for (const [t, r] of Object.entries(e)) this._schemas[t] = { ...this._schemas[t],
                    ...r
                }
            }
            getSchemas() {
                return this._schemas
            }
            getUserFilterInitialData(e) {
                return this._userFilterInitialData[e]
            }
            setUserFilterInitialData(e, t) {
                this._userFilterInitialData[e] = t
            }
        }
        const Ho = (e, t, r) => Object.entries(e).reduce(((e, n) => {
                let [o, a] = n;
                return ((e, t) => {
                    var r;
                    return (null == t || null == (r = t.fields) || null == (r = r[e]) ? void 0 : r.type) === l.FieldType.reference
                })(o, t) && ((e, t) => !e || !e.includes(t))(r, o) && Boolean(null == a ? void 0 : a._id) ? e[o] = a._id : e[o] = a, e
            }), {}),
            zo = function(e, t) {
                return void 0 === t && (t = {}), e.reduce(((e, t) => {
                    const r = e[t._id];
                    return e[t._id] = r ? (0, D.mergeWith)(r, t, Hn) : t, e
                }), t)
            },
            Yo = function(e, t) {
                return void 0 === e && (e = {}), void 0 === t && (t = {}), { ...t,
                    ...e
                }
            },
            Jo = e => e ? .plugins ? .[l.CMS_PLUGIN_ID] ? .siteSort ? .sort,
            Ko = async ({
                datasetConfigSort: e,
                getSchema: t
            }) => {
                const r = e && e.length > 0 ? e : (n = await t(), (Jo(n) || []).map((({
                    fieldName: e,
                    direction: t
                }) => ({
                    [e]: t
                }))));
                var n;
                return r.length > 0 ? r : null
            };
        class Qo {
            constructor() {
                const {
                    logger: e,
                    dataFetcher: t
                } = U;
                this._dataFetcher = t, this._logger = e, this._dataStore = new qo, this._dataFetchingBulk = {}, this._bulkDataFetching = Promise.resolve()
            }
            createInitialDataRequest(e) {
                this._dataFetchingBulk = e.reduce(((e, t) => {
                    let {
                        id: r,
                        refresh: n
                    } = t;
                    return n || !this._dataStore.hasDataset(r) ? { ...e,
                        [r]: new G
                    } : e
                }), {});
                const t = Object.entries(this._dataFetchingBulk).map((e => {
                    let [, {
                        promise: t
                    }] = e;
                    return t
                }));
                this._bulkDataFetching = this._waitForDataFetched(t).then((() => this._dataFetchingBulk = {}))
            }
            async getInitialData(e) {
                let {
                    datasetId: t,
                    collectionId: r,
                    cursorPaging: n,
                    filter: o,
                    sort: a,
                    length: i,
                    includes: s,
                    uniqueFieldValues: c
                } = e;
                return this._dataFetchingBulk[t] && (this._dataFetchingBulk[t].resolve({
                    datasetId: t,
                    collectionId: r,
                    cursorPaging: n,
                    filter: o,
                    sort: a,
                    length: i,
                    includes: s,
                    uniqueFieldValues: c
                }), await this._bulkDataFetching), this._dataStore.getData({
                    datasetId: t,
                    collectionId: r,
                    includes: s
                }) || this.getData({
                    datasetId: t,
                    collectionId: r,
                    cursorPaging: n,
                    filter: o,
                    sort: a,
                    offset: 0,
                    length: i,
                    includes: s,
                    uniqueFieldValues: c
                })
            }
            async getSort(e) {
                let {
                    sort: t,
                    collectionId: r
                } = e;
                return await Ko({
                    datasetConfigSort: t,
                    getSchema: async () => (await this.waitForSchemasLoaded(), this.getSchema(r))
                })
            }
            async getData(e) {
                const {
                    collectionId: t,
                    cursorPaging: r,
                    offset: n,
                    filter: o,
                    includes: a,
                    length: i,
                    datasetSize: s,
                    uniqueFieldValues: c
                } = e, l = e => !this.getUniqueFieldValues({
                    collectionId: t,
                    fieldKey: e
                }), d = await this.getSort(e), {
                    items: u,
                    totalCount: p,
                    nextCursor: f,
                    uniqueFieldValues: h
                } = await this._dataFetcher.fetchData({
                    collectionId: t,
                    offset: n,
                    filter: o,
                    sort: d,
                    includes: a,
                    cursor: r ? null == s ? void 0 : s.cursor : void 0,
                    length: i,
                    uniqueFieldValues: c.filter((e => l(e)))
                }).catch(Zo("Data fetching failed", {
                    datasetConfig: e
                }));
                return await this.waitForSchemasLoaded(), this._dataStore.updateCollectionData({
                    collectionId: t,
                    data: {
                        items: u,
                        uniqueFieldValues: h
                    }
                }), {
                    items: u,
                    datasetSize: {
                        total: p,
                        loaded: ((null == s ? void 0 : s.loaded) || 0) + u.length,
                        cursor: f
                    },
                    uniqueFieldValues: h
                }
            }
            async remove(e) {
                let {
                    collectionId: t,
                    recordId: r
                } = e;
                return this._dataFetcher.remove({
                    collectionId: t,
                    recordId: r
                }).catch(Zo("Record removing failed", {
                    collectionId: t,
                    recordId: r
                }))
            }
            async save(e) {
                let {
                    collectionId: t,
                    record: r,
                    includeReferences: n
                } = e;
                return this._dataFetcher.save({
                    collectionId: t,
                    record: r,
                    includeReferences: n
                }).catch(Zo("Record saving failed", {
                    collectionId: t,
                    record: r,
                    includeReferences: n
                }))
            }
            async getSibling(e) {
                return await this._dataFetcher.getSibling(e)
            }
            async loadSchemas(e) {
                const t = this._dataStore.getSchemas(),
                    r = e.filter((e => !t[e]));
                this._schemasLoading = r.length ? this._dataFetcher.fetchSchemas(r).catch(Zo("Schema fetching failed", {
                    collectionIds: r
                })) : Promise.resolve({});
                const n = await this._schemasLoading;
                return this._dataStore.updateSchemas({ ...t,
                    ...n
                }), this._dataStore.getSchemas()
            }
            async setSchemas(e) {
                this._dataStore.updateSchemas(e)
            }
            getSchemas() {
                return this._dataStore.getSchemas()
            }
            getRecord(e) {
                let {
                    collectionId: t,
                    recordId: r,
                    includes: n
                } = e;
                return this._dataStore.getRecord({
                    collectionId: t,
                    recordId: r,
                    includes: n
                })
            }
            getSchema(e) {
                return this._dataStore.getSchema(e)
            }
            hasSchema(e) {
                return Boolean(this.getSchema(e))
            }
            getReferencedSchemas(e) {
                const t = this.getSchema(e),
                    r = this._dataStore.getSchemas();
                return (e => e ? (0, D.flow)((e => (0, D.pickBy)(e, (e => {
                    let {
                        referencedCollection: t
                    } = e;
                    return Boolean(t)
                }))), (e => (0, D.map)(e, (e => {
                    let {
                        referencedCollection: t
                    } = e;
                    return t
                }))), D.uniq, (e => e.filter(Boolean)))(e.fields) : [])(t).reduce(((e, t) => ({ ...e,
                    [t]: r[t]
                })), {})
            }
            setCollectionData(e) {
                let {
                    collectionId: t,
                    data: r
                } = e;
                r && this._dataStore.updateCollectionData({
                    collectionId: t,
                    data: r
                })
            }
            setStore(e) {
                e && this._dataStore.updateStore(e)
            }
            setStaticStore(e) {
                const {
                    recordsByCollectionId: t,
                    recordInfosInDatasetOrder: r,
                    uniqueFieldValuesByCollectionId: n
                } = e, o = this._datasetConfigs.find((e => {
                    let {
                        type: t
                    } = e;
                    return t === br
                }));
                if (o) {
                    const {
                        datasetId: e
                    } = o, a = {
                        [e]: r[0]
                    };
                    this._dataStore.updateStore({
                        recordsByCollectionId: t,
                        recordInfosByDatasetId: a,
                        uniqueFieldValuesByCollectionId: n
                    })
                }
            }
            getStore() {
                return this._dataStore.getStore()
            }
            setUniqueFieldValues(e) {
                let {
                    collectionId: t,
                    fieldKey: r,
                    data: n
                } = e;
                return this._dataStore.setUniqueFieldValues({
                    collectionId: t,
                    fieldKey: r,
                    data: n
                })
            }
            getUniqueFieldValues(e) {
                let {
                    collectionId: t,
                    fieldKey: r
                } = e;
                return this._dataStore.getUniqueFieldValues({
                    collectionId: t,
                    fieldKey: r
                })
            }
            createSimpleFilter(e, t) {
                return this._dataFetcher.createSimpleFilter(e, t)
            }
            setDatasetConfigs(e) {
                this._datasetConfigs = e
            }
            getUserFilterInitialData(e) {
                return this._dataStore.getUserFilterInitialData(e)
            }
            setUserFilterInitialData(e, t) {
                this._dataStore.setUserFilterInitialData(e, t)
            }
            async _fetchInitialData(e) {
                try {
                    const {
                        recordsByCollectionId: t,
                        recordInfosInDatasetOrder: r,
                        uniqueFieldValuesByCollection: n
                    } = await this._logger.log(new ze("dataset/fetchPrimaryInitialData", (async () => this._dataFetcher.fetchBulkData(await Promise.all(e.map((async e => ({ ...e,
                        sort: await this.getSort(e)
                    }))))))));
                    return {
                        recordsByCollectionId: t,
                        recordInfosByDatasetId: r.reduce(((t, r, n) => {
                            let {
                                itemIds: o = [],
                                error: a,
                                nextCursor: i,
                                totalCount: s
                            } = r;
                            const c = e[n];
                            return a && this._logger.log(Xo("Initial data fetching failed for one of the datasets", {
                                cause: a,
                                extra: {
                                    datasetConfig: c
                                }
                            })), t[c.datasetId] = {
                                itemIds: o,
                                datasetSize: {
                                    total: s,
                                    loaded: o.length,
                                    cursor: i
                                }
                            }, t
                        }), {}),
                        uniqueFieldValuesByCollection: n
                    }
                } catch (t) {
                    throw new S("Initial data fetching failed", {
                        cause: t,
                        extra: {
                            datasetConfigs: e
                        }
                    })
                }
            }
            async waitForSchemasLoaded() {
                await this._schemasLoading
            }
            async _waitForDataFetched(e) {
                if (e.length) {
                    const t = await Promise.all(e),
                        r = await this._fetchInitialData(t);
                    await this.waitForSchemasLoaded(), this._dataStore.updateStore(r)
                }
            }
        }
        const Xo = (e, t) => {
                let {
                    cause: r,
                    ...n
                } = t;
                return new(N.codes.includes(r.code) ? N : C)(e, { ...n,
                    cause: r,
                    code: r.code
                })
            },
            Zo = (e, t) => r => {
                throw Xo(e, {
                    cause: r,
                    extra: t
                })
            },
            ea = "PRIMARY";
        var ta = a(3678),
            ra = a.n(ta);
        const na = function(e, t, r) {
                return void 0 === r && (r = []), e(t) ? [{
                    path: (0, D.clone)(r),
                    filterExpression: t
                }] : (n = t, Array.isArray(n) || (0, D.isPlainObject)(n) ? (0, D.flatMap)(t, ((t, n) => na(e, t, r.concat(n)))) : []);
                var n
            },
            oa = e => t => t.reduce(((e, t) => {
                let {
                    path: r,
                    filterExpression: n
                } = t;
                return ((e, t, r) => (0, D.set)(e, t, r))(e, r, n)
            }), (0, D.cloneDeep)(e)),
            aa = (e, t, r) => {
                const n = ((e, t) => ra()(tt.Maybe, t.map((t => {
                    let {
                        path: r,
                        filterExpression: n
                    } = t;
                    return e(n).map((e => ({
                        path: r,
                        filterExpression: e
                    })))
                }))))(t, na(e, r));
                return n.map(oa(r))
            },
            ia = () => () => tt.Maybe.fromNullable(U.platform.user).map((e => {
                let {
                    id: t,
                    loggedIn: r
                } = e;
                return r ? t : null
            })),
            sa = e => t => {
                let {
                    filterId: r
                } = t;
                return tt.Maybe.fromNullable(e(r)).chain((e => {
                    let t, {
                        masterDataset: r,
                        fieldName: n
                    } = e;
                    try {
                        t = r.api.getCurrentItem()
                    } catch {}
                    return tt.Maybe.fromNullable(t).map((e => {
                        const t = e[n];
                        return void 0 === t ? null : t
                    }))
                }))
            },
            ca = e => da(e).chain((e => {
                let [t, r] = e;
                return "$not" === t && (0, D.isArray)(r) ? la({
                    positive: !1,
                    filterExpression: r[0]
                }) : tt.Maybe.Nothing()
            })).orElse((() => la({
                positive: !0,
                filterExpression: e
            }))),
            la = e => {
                let {
                    positive: t,
                    filterExpression: r
                } = e;
                return da(r).chain((e => {
                    let [r, n] = e;
                    return da(n).map((e => {
                        let [n, o] = e;
                        return {
                            field: r,
                            condition: n,
                            value: o,
                            positive: t
                        }
                    }))
                }))
            },
            da = e => {
                if (!(0, D.isPlainObject)(e)) return tt.Maybe.Nothing();
                const t = (0, D.entries)(e)[0];
                return tt.Maybe.fromNullable(t)
            },
            {
                stringArray: ua,
                number: pa
            } = l.FieldType,
            fa = (e, t) => (0, D.get)(e, t),
            ha = e => {
                let {
                    previousRecord: t,
                    currentRecord: r,
                    fieldName: n
                } = e;
                return !(0, D.isEqual)(fa(t, n), fa(r, n))
            },
            {
                mediaGallery: ma
            } = l.FieldType,
            ga = e => null == e || "function" != typeof e.toString ? "" : Array.isArray(e) ? e.join(", ") : e.toString(),
            ya = e => /^\d{2}:\d{2}:\d{2}\.\d{3}$/.test(e),
            va = e => e instanceof Date && !isNaN(e),
            _a = e => {
                let {
                    time: t,
                    date: r
                } = e;
                const [n, o] = t.split(":");
                return r.setHours(n), r.setMinutes(o), r.setSeconds(0), r.setMilliseconds(0), r
            },
            Ea = e => `${e.toTimeString().split(" ")[0]}.000`,
            Ia = e => {
                const t = new Date(e);
                return va(t) ? t : (() => {
                    const e = new Date;
                    return e.setHours(0), e.setMinutes(0), e.setSeconds(0), e.setMilliseconds(0), e
                })()
            },
            Ta = e => String(e).padStart(2, "0"),
            Ra = e => [e.getFullYear(), Ta(e.getMonth() + 1), Ta(e.getDate())].join("-"),
            wa = "datetime",
            Sa = e => {
                let {
                    value: t,
                    formatter: r,
                    fieldType: n,
                    format: o
                } = e;
                if (o.type === wa) {
                    const e = n === l.FieldType.date,
                        a = ((e, t) => {
                            switch (t) {
                                case l.FieldType.date:
                                    return new Date(e);
                                case l.FieldType.time:
                                    return new Date(`1970-01-01T${e}`);
                                default:
                                    return e
                            }
                        })(t, n);
                    return va(a) ? r ? r.formatDateTime(a, o.params.dateFormat, {
                        timeZone: e ? "UTC" : void 0
                    }) : e && "string" == typeof t ? t : "" : t
                }
                return t
            },
            {
                mediaGallery: Oa,
                address: Pa,
                date: Na
            } = l.FieldType,
            Ca = e => {
                let {
                    value: t,
                    fieldType: r,
                    role: n,
                    componentIsInput: o,
                    propPath: a,
                    format: i,
                    utils: {
                        formatter: s
                    } = {}
                } = e;
                const c = [{
                    converter: e => {
                        let {
                            formatted: t
                        } = e;
                        return t
                    },
                    condition: Boolean(t && r === Pa && n !== ue)
                }, {
                    converter: ga,
                    condition: Boolean(n === X || !o && ![te, ee, he, ye].includes(n) && r !== l.FieldType.boolean)
                }, {
                    converter: e => (e => {
                        let {
                            value: t
                        } = e;
                        const {
                            platform: {
                                utils: {
                                    media: r
                                }
                            }
                        } = U, n = r.parseMediaItemUri(t);
                        if (n.error) return t;
                        switch (n.type) {
                            case r.types.IMAGE:
                                return r.getScaleToFillImageURL(n.mediaId, n.width, n.height, n.width, n.height, {
                                    name: n.title
                                });
                            case r.types.VIDEO:
                                return `https://video.wixstatic.com/video/${n.mediaId}/file`;
                            case r.types.AUDIO:
                                return `https://static.wixstatic.com/mp3/${n.mediaId}`;
                            default:
                                return t
                        }
                    })({
                        value: e
                    }),
                    condition: Boolean("link" === a && n !== pe)
                }, {
                    converter: () => [],
                    condition: Boolean(!t && r === Oa)
                }, {
                    converter: Ea,
                    condition: Boolean(n === fe && va(t))
                }, {
                    converter: e => {
                        const t = new Date(e);
                        return null !== e && va(t) ? t : "" === e || null === e ? void 0 : e
                    },
                    condition: Boolean(n === ae && r === Na)
                }].filter((e => {
                    let {
                        condition: t
                    } = e;
                    return t
                })).map((e => {
                    let {
                        converter: t
                    } = e;
                    return t
                }));
                return (0, D.flow)([e => (e => {
                    let {
                        value: t,
                        formatter: r,
                        fieldType: n,
                        format: o
                    } = e;
                    return o ? Sa({
                        value: t,
                        formatter: r,
                        fieldType: n,
                        format: o
                    }) : t
                })({
                    value: e,
                    formatter: s,
                    fieldType: r,
                    format: i
                }), ...c])(t)
            };
        var ba = function(e) {
                var t = function(e) {
                    var t = 0;
                    if (void 0 === e || 0 === e.length) return t;
                    for (var r = 0; r < e.length; r++) {
                        t = (t << 5) - t + e.charCodeAt(r), t |= 0
                    }
                    return t *= Math.sign(t), t = Math.sqrt(t), t = Math.floor(1e6 * (t - Math.floor(t)))
                }(e);
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(e, r) {
                    var n = Math.ceil(t / (r + 1)) % 16;
                    return ("x" === e ? n : 3 & n | 8).toString(16)
                }))
            },
            Da = function(e) {
                return void 0 === e && (e = ""), e ? e.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-\.]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "") : ""
            };

        function Aa(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }))), r.push.apply(r, n)
            }
            return r
        }

        function Fa(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? Aa(Object(r), !0).forEach((function(t) {
                    xa(e, t, r[t])
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Aa(Object(r)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                }))
            }
            return e
        }

        function xa(e, t, r) {
            var n;
            return (t = "symbol" == typeof(n = function(e, t) {
                if ("object" != typeof e || !e) return e;
                var r = e[Symbol.toPrimitive];
                if (void 0 !== r) {
                    var n = r.call(e, t || "default");
                    if ("object" != typeof n) return n;
                    throw new TypeError("@@toPrimitive must return a primitive value.")
                }
                return ("string" === t ? String : Number)(e)
            }(t, "string")) ? n : String(n)) in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r, e
        }
        var La = function(e, t) {
                return e && "object" == typeof e ? "direct" === e.type ? Fa(Fa({}, e), {}, {
                    type: "web"
                }) : {
                    type: "wix",
                    data: e
                } : "string" == typeof e ? {
                    type: "web",
                    url: e,
                    target: t,
                    text: e
                } : {
                    target: "_blank",
                    type: "none"
                }
            },
            Ua = function(e) {
                void 0 === e && (e = {});
                var t = {
                    link: e.url
                };
                return e.url && (t.target = e.target), t
            },
            Ma = function(e) {
                return null !== /^(wix:)?(image|video)(:\/\/)/.exec(e)
            },
            ka = function(e) {
                return Ma(e) ? e.split("/")[3] : e
            },
            Ga = function(e) {
                try {
                    return Ma(e) ? e.split("/")[4].split("#").slice(0, -1).join("#") : "_.jpg"
                } catch (e) {
                    return "_.jpg"
                }
            },
            ja = function(e, t) {
                return "wix:image://v1/" + (e || Da(t.name)) + "/" + Da(t.fileName || t.name) + "#originWidth=" + t.width + "&originHeight=" + t.height
            },
            Ba = function(e, t) {
                return "wix:video://v1/" + (e || Da(t.name)) + "/" + Da(t.fileName || t.name) + "#posterUri=" + t.posters[0].url + "&posterWidth=" + t.width + "&posterHeight=" + t.height
            },
            Va = function(e) {
                var t = {},
                    r = !1;
                try {
                    var n = /\/\d*_\d*\//.exec(e);
                    if (n && n[0] && n[0].length > 0) {
                        var o = n[0].replace(/\//g, "").split("_").map((function(e) {
                                return Number(e)
                            })),
                            a = o[0],
                            i = o[1];
                        a > 0 && i > 0 && (r = !0, t = {
                            originWidth: a,
                            originHeight: i
                        })
                    }
                } catch (e) {
                    r = !1
                }
                if (!r) try {
                    var s = /wm_(.*)\//.exec(e);
                    if (s && s[0] && s[0].length > 0) {
                        var c = s[1];
                        c.length > 0 && (t.watermark = c)
                    }
                } catch (e) {
                    r = !1
                }
                if (!r) try {
                    e.split("#").pop().split("&").map((function(e) {
                        return e.split("=")
                    })).forEach((function(e) {
                        t[e[0]] = isNaN(Number(e[1])) ? String(e[1]) : Number(e[1])
                    }))
                } catch (e) {
                    r = !1
                }
                return t
            },
            $a = function(e, t) {
                return void 0 === t && (t = 0),
                    function(e) {
                        return !!(e.src || e.type && e.html)
                    }(e) ? function(e, t) {
                        var r, n, o, a = Va(e.src);
                        "video" === (null == (r = e.type) ? void 0 : r.toLowerCase()) && (null != (n = e.src) && n.includes("youtube") || null != (o = e.src) && o.includes("vimeo")) && (a.originWidth = 1920, a.originHeight = 1080), a.width = e.width || a.originWidth || a.originalWidth || a.posterWidth || 1, a.height = e.height || a.originHeight || a.originalHeight || a.posterHeight || 1;
                        var i, s = e.settings && e.settings.focalPoint,
                            c = a.watermark,
                            l = e.imageToken || e.token || a.token,
                            d = (e.type || "image").toLowerCase(),
                            u = Fa({
                                itemId: Da(e.slug) || (Da(e.title || e.id) || ba(e.src || e.html || t)) + "_" + t,
                                mediaUrl: ka(e.src),
                                metaData: Object.assign(Fa({
                                    type: d,
                                    alt: e.alt || "",
                                    title: e.title || "",
                                    description: e.description || "",
                                    name: Ga(e.src),
                                    fileName: Ga(e.src),
                                    link: La(e.link, e.target),
                                    width: a.width,
                                    height: a.height,
                                    sourceName: "private"
                                }, "customButtonText" in e && {
                                    customButtonText: e.customButtonText
                                }), s ? {
                                    focalPoint: s
                                } : {}, c ? {
                                    watermarkStr: c
                                } : {}),
                                orderIndex: t
                            }, l && {
                                token: l
                            });
                        if ("text" === d) {
                            var p = e.style;
                            u.metaData.height = a.height || 500, u.metaData.width = a.width || 500 * p.layoutRatio, u.metaData.textStyle = {
                                width: u.metaData.width,
                                height: u.metaData.height,
                                backgroundColor: p.fillColor
                            }, u.metaData.html = u.editorHtml = e.html
                        }
                        if ("video" === d) {
                            var f = {};
                            e.thumbnail && (f = Va(e.thumbnail));
                            var h = (i = ka(e.thumbnail), null !== /^.*\.(jpeg|jpg|webp|png|jpe).*$/.exec(i) ? ka(e.thumbnail) : a.posterUri);
                            u.metaData.posters = [{
                                url: h,
                                width: f.width || a.width,
                                height: f.height || a.height
                            }], u.isExternal = 0 === e.src.indexOf("http"), u.isExternal || Ma(e.src) ? (u.metaData.source = e.src.indexOf("youtube.com") > 0 ? "youtube" : e.src.indexOf("vimeo.com") > 0 ? "vimeo" : "wix", u.metaData.videoUrl = e.src) : u.metaData.qualities = [{
                                width: a.width,
                                height: a.height,
                                quality: a.height + "p",
                                formats: [Ma(e.src) ? "wix" : e.src.split(/#|\?/)[0].split(".").pop().trim()]
                            }]
                        }
                        return u
                    }(e, t) : function(e, t) {
                        return {
                            itemId: ba(t + "_" + (e.uri || e.alt || t)),
                            mediaUrl: e.uri || "",
                            metaData: {
                                height: e.height || 1,
                                lastModified: Date.now(),
                                link: La(e.link, e.target),
                                title: e.title || "",
                                description: e.description || "",
                                alt: e.alt || "",
                                sourceName: "private",
                                tags: [],
                                width: e.width || 1
                            },
                            orderIndex: t
                        }
                    }(e, t)
            },
            Wa = function(e, t) {
                return void 0 === e && (e = {}), void 0 === t && (t = !0), t ? function(e) {
                    void 0 === e && (e = {});
                    var t = e.metaData || e.metadata || {},
                        r = Ua(t.link) || {},
                        n = Fa({
                            type: t.type || "image",
                            slug: e.itemId
                        }, r),
                        o = n.type.toLowerCase();
                    if ("text" === o) {
                        var a = t.testStyle || {};
                        Object.assign(n, {
                            html: t.html,
                            style: {
                                width: a.width,
                                height: a.height,
                                bgColor: a.backgroundColor
                            }
                        })
                    } else Object.assign(n, {
                        title: t.title,
                        description: t.description,
                        alt: t.alt
                    }), "image" === o ? Object.assign(n, Fa(Fa({
                        src: ja(e.mediaUrl, t),
                        settings: Object.assign({}, t.focalPoint ? {
                            focalPoint: t.focalPoint
                        } : {})
                    }, "imageToken" in e && {
                        imageToken: e.imageToken
                    }), "token" in e && {
                        token: e.token
                    })) : "video" === o && Object.assign(n, {
                        src: Ba(e.mediaUrl, t),
                        thumbnail: t.posters[0].url
                    });
                    return n
                }(e) : (n = (r = e).metaData || r.metadata || {}, o = Ua(n.link) || {}, Fa({
                    uri: r.mediaUrl,
                    description: n.description,
                    alt: n.alt,
                    title: n.title,
                    height: n.height,
                    width: n.width
                }, o));
                var r, n, o
            };
        const {
            mediaGallery: qa,
            documentArray: Ha
        } = l.FieldType, za = e => {
            let {
                value: t,
                currentValue: r = [],
                fieldType: n
            } = e;
            switch (n) {
                case qa:
                    return [...r, ...t.map((e => {
                        let {
                            fileUrl: t,
                            url: r
                        } = e;
                        return (e => {
                            let {
                                uploadedFileUrl: t
                            } = e;
                            const {
                                platform: {
                                    utils: {
                                        media: r
                                    }
                                }
                            } = U, n = r.parseMediaItemUri(t), o = r.createMediaItemUri(n).item, a = $a({ ...n,
                                src: o
                            });
                            return Wa(a)
                        })({
                            uploadedFileUrl: t || r
                        })
                    }))];
                case Ha:
                    return [...r, ...t.map((e => {
                        let {
                            fileUrl: t,
                            url: r
                        } = e;
                        return t || r
                    }))];
                default:
                    return t[0].fileUrl || t[0].url
            }
        }, {
            reference: Ya,
            dateTime: Ja,
            date: Ka
        } = l.FieldType, Qa = e => {
            let {
                value: t,
                currentValue: r,
                fieldType: n,
                fieldName: o,
                role: a,
                utils: {
                    referenceFetcher: i
                } = {}
            } = e;
            const s = [{
                converter: e => i(e, o),
                condition: Boolean(n === Ya)
            }, {
                converter: e => ((e, t) => {
                    const r = {},
                        n = {};
                    if (ya(e)) r.time = e, r.date = new Date;
                    else {
                        const t = Ia(e);
                        r.date = t, r.time = Ea(t)
                    }
                    return ya(t) ? n.time = t : n.date = Ia(t), _a({ ...r,
                        ...n
                    })
                })(r, e),
                condition: Boolean(n === Ja && [ae, fe, ie].includes(a))
            }, {
                converter: Ra,
                condition: Boolean(n === Ka && a === ae)
            }, {
                converter: e => za({
                    value: e,
                    currentValue: r,
                    fieldType: n
                }),
                condition: Boolean(a === se)
            }].filter((e => {
                let {
                    condition: t
                } = e;
                return t
            })).map((e => {
                let {
                    converter: t
                } = e;
                return t
            }));
            return (0, D.flow)(s)(t)
        }, Xa = {
            ALIGN: (e, t) => t,
            SPACES: e => "&nbsp;".repeat(Number(e)),
            STRIKE: e => `<span style="text-decoration: line-through" class="wixui-rich-text__text">${e}</span>`,
            UNDERLINE: e => `<span style="text-decoration: underline" class="wixui-rich-text__text">${e}</span>`,
            ITALIC: e => `<span style="font-style: italic" class="wixui-rich-text__text">${e}</span>`,
            BOLD: e => `<span style="font-weight: bold" class="wixui-rich-text__text">${e}</span>`,
            HIGHLIGHT: (e, t) => `<span style="background-color: ${e}" class="wixui-rich-text__text">${t}</span>`,
            COLOR: (e, t) => `<span style="color: ${e}" class="wixui-rich-text__text">${t}</span>`
        }, Za = (...e) => [...e], ei = ({
            expression: e,
            functions: t,
            variables: r,
            throwIfVariableUnknown: n
        }) => {
            if ("integer" === e.type) return parseInt(e.value);
            if ("float" === e.type) return parseFloat(e.value);
            if ("string" === e.type) return e.value;
            if ("function" === e.type) {
                const o = "function" == typeof e.name ? e.name : t[e.name];
                if (o) return o(...e.arguments.map((e => ei({
                    expression: e,
                    functions: t,
                    variables: r,
                    throwIfVariableUnknown: n
                }))));
                throw new Error("Unknown function " + e.name)
            }
            if ("variable" === e.type) {
                if ("false" === e.name) return !1;
                if ("true" === e.name) return !0;
                if ("undefined" === e.name) return;
                if ("null" === e.name) return null;
                if (n && !(e.name in r)) throw new Error("Unknown variable " + e.name);
                return r[e.name]
            }
            throw new Error("Unknown AST node " + JSON.stringify(e))
        }, ti = e => new Error("Syntax error. " + e), ri = e => {
            if (0 === e.trim().length) return {
                type: "string",
                parentFunction: void 0,
                closed: !0,
                value: "",
                doubleQuoted: !1,
                startedAt: 0
            };
            let t = {
                    type: "initial",
                    parentFunction: void 0
                },
                r = 0,
                n = e[r];
            const o = () => {
                    n = e[++r]
                },
                a = e => {
                    t = {
                        type: "initial",
                        parentFunction: e
                    }, o()
                },
                i = () => void 0 === n || ")" === n && (t.parentFunction && !t.parentFunction.closed || "function" === t.type && !t.closed) || "]" === n && (t.parentFunction && t.parentFunction.name === Za && !t.parentFunction.closed || "function" === t.type && t.name === Za && !t.closed),
                s = () => {
                    if (void 0 === n) {
                        const r = t.parentFunction || t;
                        if ("function" === r.type && !r.closed) throw ti("Function was not closed. Started at index " + r.startedAt + " with: " + e.slice(r.startedAt))
                    }
                    if (t.parentFunction) return "function" !== t.type || t.closed ? (t.parentFunction.closed = !0, t = t.parentFunction, t.parentFunction && (t = t.parentFunction)) : (t.closed = !0, t = t.parentFunction), void o();
                    for (o();
                        /^\s$/.test(n || "");) o();
                    if (void 0 !== n) throw ti("Unexpected characters after a finished expression at index " + r + ": " + e.slice(r));
                    return t
                };
            for (;;) {
                if ("initial" === t.type) {
                    if ("[" === n) {
                        t = {
                            type: "function",
                            parentFunction: t.parentFunction,
                            closed: !1,
                            name: Za,
                            startedAt: r,
                            arguments: []
                        }, t.parentFunction && t.parentFunction.arguments.push(t), o();
                        continue
                    }
                    if ("-" === n) {
                        t = {
                            type: "integer",
                            parentFunction: t.parentFunction,
                            closed: !1,
                            value: "-"
                        }, t.parentFunction && t.parentFunction.arguments.push(t), o();
                        continue
                    }
                    if (n >= "0" && n <= "9") {
                        t = {
                            type: "integer",
                            parentFunction: t.parentFunction,
                            closed: !1,
                            value: n
                        }, t.parentFunction && t.parentFunction.arguments.push(t), o();
                        continue
                    }
                    if ("_" === n || n >= "a" && n <= "z" || n >= "A" && n <= "Z") {
                        t = {
                            type: "variable",
                            parentFunction: t.parentFunction,
                            closed: !1,
                            name: n,
                            startedAt: r
                        }, t.parentFunction && t.parentFunction.arguments.push(t), o();
                        continue
                    }
                    if ('"' === n || "'" === n) {
                        t = {
                            type: "string",
                            parentFunction: t.parentFunction,
                            closed: !1,
                            doubleQuoted: '"' === n,
                            startedAt: r,
                            value: ""
                        }, t.parentFunction && t.parentFunction.arguments.push(t), o();
                        continue
                    }
                    if (/^\s$/.test(n)) {
                        o();
                        continue
                    }
                    throw ti(`Unexpected character "${n}" near: ${e.slice(r)}`)
                }
                if ("function" !== t.type) {
                    if ("integer" === t.type) {
                        if ("." === n) {
                            t.parentFunction && t.parentFunction.arguments.pop(), t = {
                                type: "float",
                                parentFunction: t.parentFunction,
                                closed: !1,
                                value: t.value + n
                            }, t.parentFunction && t.parentFunction.arguments.push(t), o();
                            continue
                        }
                        if (n >= "0" && n <= "9") {
                            if (t.closed) throw ti(`Integer has unexpected whitespace near: ${e.slice(r-1)}`);
                            t.value += n, o();
                            continue
                        }
                        if ("," === n && t.parentFunction) {
                            a(t.parentFunction);
                            continue
                        }
                        if (i()) {
                            const e = s();
                            if (e) return e;
                            continue
                        }
                        if (/^\s$/.test(n)) {
                            t.closed = !0, o();
                            continue
                        }
                        throw ti(`Unexpected character "${n}" after integer near: ${e.slice(r)}`)
                    }
                    if ("float" === t.type) {
                        if (n >= "0" && n <= "9") {
                            if (t.closed) throw ti(`Floating number has unexpected whitespace near: ${e.slice(r-1)}`);
                            t.value += n, o();
                            continue
                        }
                        if ("," === n && t.parentFunction) {
                            a(t.parentFunction);
                            continue
                        }
                        if (i()) {
                            const e = s();
                            if (e) return e;
                            continue
                        }
                        if (/^\s$/.test(n)) {
                            t.closed = !0, o();
                            continue
                        }
                        throw ti(`Floating number has an unexpected character "${n}" near: ${e.slice(r)}`)
                    }
                    if ("string" !== t.type) {
                        if ("variable" === t.type) {
                            if (n >= "0" && n <= "9" || "_" === n || n >= "a" && n <= "z" || n >= "A" && n <= "Z") {
                                if (t.closed) throw ti(`Unexpected whitespace near: ${e.slice(r-1)}`);
                                t.name += n, o();
                                continue
                            }
                            if ("(" === n) {
                                t.parentFunction && t.parentFunction.arguments.pop(), t = {
                                    type: "function",
                                    parentFunction: t.parentFunction,
                                    closed: !1,
                                    name: t.name,
                                    startedAt: t.startedAt,
                                    arguments: []
                                }, t.parentFunction && t.parentFunction.arguments.push(t), o();
                                continue
                            }
                            if ("," === n && t.parentFunction) {
                                a(t.parentFunction);
                                continue
                            }
                            if (i()) {
                                const e = s();
                                if (e) return e;
                                continue
                            }
                            if (/^\s$/.test(n)) {
                                t.closed = !0, o();
                                continue
                            }
                            throw ti(`Unexpected character "${n}" in an identifier near: ${e.slice(r-1)}`)
                        }
                    } else {
                        if (t.closed) {
                            if ("," === n && t.parentFunction) {
                                a(t.parentFunction);
                                continue
                            }
                            if (i()) {
                                const e = s();
                                if (e) return e;
                                continue
                            }
                            if (/^\s$/.test(n)) {
                                o();
                                continue
                            }
                            throw ti("Unexpected characters after a closed string at index " + r + ": " + e.slice(r))
                        }
                        if (void 0 === n) throw ti(`${t.doubleQuoted?"Double":"Single"}-quoted string was not closed. Started with: ${e.slice(t.startedAt)}`);
                        if ("\\" === n) {
                            if ("\\" !== e[r + 1] && '"' !== e[r + 1] && "'" !== e[r + 1]) throw ti(`Backslash cannot escape character ${e[r+1]} near: ${e.slice(r)}`);
                            t.value += e[r + 1], o()
                        } else t.doubleQuoted && '"' === n || !t.doubleQuoted && "'" === n ? t.closed = !0 : t.value += n;
                        o()
                    }
                } else {
                    if ("," === n) {
                        if (t.closed) throw ti("Unexpected comma after a closed top-level function near: " + e.slice(r));
                        if (0 === t.arguments.length) throw ti("Function was not closed or first argument missing. Started at index " + t.startedAt + " with: " + e.slice(t.startedAt));
                        a(t);
                        continue
                    }
                    if (i()) {
                        const e = s();
                        if (e) return e;
                        continue
                    }
                    if (/^\s$/.test(n)) {
                        o();
                        continue
                    }
                    if (t.closed) throw ti(`Unexpected character "${n}" near: ${e.slice(r)}`);
                    t = {
                        type: "initial",
                        parentFunction: t
                    }
                }
            }
        }, ni = Object.keys(Xa), oi = e => "function" === e.type && (!("string" != typeof e.name || !ni.includes(e.name)) || e.arguments.some((e => oi(e)))), ai = ({
            expression: e,
            functions: t,
            variables: r,
            throwIfVariableUnknown: n = !1
        }) => (({
            expression: e,
            functions: t,
            variables: r,
            throwIfVariableUnknown: n
        }) => {
            const o = ei({
                expression: e,
                functions: t,
                variables: r,
                throwIfVariableUnknown: n
            });
            return oi(e) ? {
                html: String(o),
                alignment: "function" === e.type && "ALIGN" === e.name && e.arguments[0] ? String(ei({
                    expression: e.arguments[0],
                    functions: t,
                    variables: r,
                    throwIfVariableUnknown: n
                })) : "left"
            } : o
        })({
            expression: ri(e),
            functions: t,
            variables: r,
            throwIfVariableUnknown: n
        });
        let ii;
        const si = async () => {
                if (ii) return;
                const {
                    utils: e,
                    ...t
                } = await a.e(622).then(a.bind(a, 4031));
                ii = { ...t,
                    ...e.symbols,
                    ...Xa
                }
            },
            ci = () => ii,
            li = e => {
                let {
                    expression: t,
                    record: r,
                    prop: n,
                    role: o,
                    componentIsInput: a,
                    logger: i
                } = e;
                try {
                    const e = ai({
                        expression: t,
                        variables: r,
                        functions: ci()
                    });
                    if ("object" == typeof e && null !== e && "html" in e && "alignment" in e && 2 === Object.keys(e).length) {
                        const {
                            html: t,
                            alignment: r
                        } = e, i = "$text" === n ? "html" : n;
                        return {
                            value: `<p class="wixui-rich-text__text" style="text-align: ${r};">${Ca({value:t,role:o,componentIsInput:a,propPath:i})}</p>`,
                            propPath: i
                        }
                    } {
                        const t = "$text" === n ? "text" : n;
                        return {
                            value: Ca({
                                value: e,
                                role: o,
                                componentIsInput: a,
                                propPath: t
                            }),
                            propPath: t
                        }
                    }
                } catch (e) {
                    return i.log(`Failed to evaluate expression: ${e}`), {
                        propPath: "$text" === n ? "text" : n,
                        value: ""
                    }
                }
            },
            di = e => {
                let {
                    recordStore: t
                } = e;
                return t().fold((() => null), (e => e.isCursorPaging()))
            },
            ui = e => {
                let {
                    state: t
                } = e;
                const {
                    size: r
                } = tn(t);
                return r
            },
            pi = e => {
                let {
                    state: t
                } = e;
                const {
                    offset: r
                } = tn(t);
                return r
            },
            fi = e => {
                let {
                    state: t
                } = e;
                const {
                    size: r,
                    numPagesToShow: n
                } = tn(t);
                return r * n
            },
            hi = e => {
                let {
                    state: t
                } = e;
                const r = gn(t);
                return null == r ? null : r
            },
            mi = e => {
                let {
                    state: t
                } = e;
                if (null == hi({
                        state: t
                    })) return null;
                const {
                    features: r
                } = U;
                if (r.newCurrentPageIndex) {
                    const {
                        size: e,
                        offset: r
                    } = tn(t);
                    return r / e + 1
                }
                const {
                    size: n,
                    offset: o,
                    numPagesToShow: a
                } = tn(t);
                return o / n + a
            },
            gi = e => {
                let {
                    recordStore: t
                } = e;
                return t().fold((() => null), (e => e.getDatasetSize()))
            },
            yi = e => {
                let {
                    state: t,
                    recordStore: r
                } = e;
                const n = gi({
                    recordStore: r
                });
                return n ? Math.ceil(n.total / ui({
                    state: t
                })) : null
            },
            vi = e => {
                let {
                    recordStore: t
                } = e;
                return t().fold((() => !1), (e => {
                    const t = e.getDatasetSize();
                    return e.isCursorPaging() && !(null == t || !t.cursor)
                }))
            },
            _i = e => {
                let {
                    state: t
                } = e;
                const r = hi({
                    state: t
                });
                return null != r && r > 0
            },
            Ei = e => {
                let {
                    state: t,
                    recordStore: r
                } = e;
                if (vi({
                        recordStore: r
                    })) return !0;
                const n = gi({
                    recordStore: r
                });
                if (!n) return !1;
                const o = hi({
                    state: t
                });
                return null != o && o < n.total - 1
            },
            Ii = e => {
                let {
                    state: t
                } = e;
                const {
                    offset: r
                } = tn(t);
                return r > 0
            },
            Ti = e => {
                let {
                    state: t,
                    recordStore: r
                } = e;
                if (vi({
                        recordStore: r
                    })) return !0;
                const n = gi({
                    recordStore: r
                });
                if (!n) return !1;
                const {
                    offset: o,
                    size: a
                } = tn(t);
                return o + a < n.total
            },
            Ri = async e => {
                let {
                    index: t,
                    recordStore: r
                } = e;
                await r().fold((() => {}), (e => e.getRecords(t, 1)))
            },
            {
                Checkbox: wi,
                Dropdown: Si
            } = it,
            Oi = e => e.type === wi ? "checked" : "value",
            Pi = e => {
                let {
                    component: t,
                    connectionConfig: r,
                    currentRecord: n,
                    previousRecord: o,
                    getFieldType: a,
                    formatter: i,
                    modeIsLivePreview: s,
                    logger: c,
                    recordStore: l,
                    actions: d
                } = e;
                const {
                    role: u,
                    isInput: p
                } = t, {
                    properties: f = {},
                    totalCount: h,
                    expressions: m = {}
                } = r, g = {};
                if (h && !d.isCursorPaging()) {
                    var y;
                    const e = null == (y = gi({
                        recordStore: l
                    })) ? void 0 : y.total;
                    if ("number" == typeof e) {
                        const r = Ca({
                            value: e,
                            role: u
                        });
                        t.setValue(r, {
                            propPath: h.prop
                        })
                    }
                }
                n && (nt(m).forEach((e => {
                    let [r, {
                        expression: o
                    }] = e;
                    const {
                        value: a,
                        propPath: i
                    } = li({
                        expression: o,
                        record: n,
                        prop: r,
                        role: u,
                        componentIsInput: p,
                        logger: c
                    });
                    g[i] = a, t.setValue(a, {
                        propPath: i
                    })
                })), nt(f).forEach((e => {
                    let [r, l] = e;
                    try {
                        const {
                            fieldName: e,
                            format: c
                        } = l, d = a(e).getOrElse(void 0), f = Ca({
                            value: fa(n, e),
                            role: u,
                            componentIsInput: p,
                            fieldType: d,
                            propPath: r,
                            format: c,
                            utils: {
                                formatter: i
                            }
                        });
                        if (g[r] = f, (e => {
                                let {
                                    previousRecord: t,
                                    currentRecord: r,
                                    fieldName: n
                                } = e;
                                return (e => !e)(t) || ha({
                                    previousRecord: t,
                                    currentRecord: r,
                                    fieldName: n
                                })
                            })({
                                currentRecord: n,
                                previousRecord: o,
                                fieldName: e
                            })) {
                            if (s && (e => void 0 === e || "" === e || Array.isArray(e) && 0 === e.length)(f)) return;
                            t.setValue(f, {
                                propPath: r,
                                fieldType: d,
                                binding: l
                            })
                        }
                    } catch (e) {
                        c.log(new S(`Failed setting ${r}`, {
                            cause: e
                        }))
                    }
                })))
            },
            Ni = e => {
                let {
                    getConnectedComponents: t,
                    getFieldType: r
                } = e;
                return e => {
                    const n = t();
                    if (!n) return tt.Maybe.Nothing();
                    const o = n.filter((e => {
                        let {
                            role: t
                        } = e;
                        return t === Q
                    }));
                    return ca(e).map((e => {
                        let {
                            field: t,
                            condition: n,
                            value: a,
                            positive: i
                        } = e;
                        const s = ((e, t) => e.map((e => e === pa && "string" == typeof t && /^[+-]?(?:\d+\.?\d*|\d*\.?\d+)$/.test(t.trim()) ? Number(t) : e === ua && 0 === (0, D.get)(t, "length", 0) ? null : t)).getOrElse(t))(r(t), ((e, t) => {
                            const {
                                filterId: r
                            } = e, n = t.find((e => e.connectionConfig.filters[r]));
                            if (!n) return;
                            const o = Oi(n);
                            return n.getValue({
                                propPath: o
                            })
                        })(a, o));
                        if (!s && 0 !== s) return {
                            $and: []
                        };
                        const c = {
                            [t]: {
                                [n]: s
                            }
                        };
                        return i ? c : {
                            $not: [c]
                        }
                    }))
                }
            },
            Ci = "@resolver",
            bi = "currentUser",
            Di = e => (0, D.isPlainObject)(e) && e[Ci] === bi,
            Ai = n.Jr,
            Fi = e => (0, D.isPlainObject)(e) && e[Ci] === Ai,
            xi = "userInput",
            Li = e => (0, D.isPlainObject)(e) && e[Ci] === xi,
            Ui = e => Di(e) || Fi(e) || Gi(e),
            Mi = e => {
                let {
                    role: t,
                    fieldName: r,
                    value: n,
                    condition: o
                } = e;
                if (!o) return t === Re ? {
                    [r]: {
                        $gte: n[0],
                        $lte: n[1]
                    }
                } : {
                    [r]: Array.isArray(n) ? {
                        $hasSome: n
                    } : n
                };
                const {
                    getFilterQuery: a
                } = (e => {
                    switch (e) {
                        case Pe:
                            return {
                                getFilterQuery: (e, t) => ({
                                    [e]: Array.isArray(t) ? {
                                        $hasSome: t
                                    } : t
                                }),
                                requiredQueryOperators: [l.AllowedFilterOperator.eq, l.AllowedFilterOperator.hasSome]
                            };
                        case Ne:
                            return {
                                getFilterQuery: (e, t) => ({
                                    $not: [{
                                        [e]: Array.isArray(t) ? {
                                            $hasSome: t
                                        } : t
                                    }]
                                }),
                                requiredQueryOperators: [l.AllowedFilterOperator.eq, l.AllowedFilterOperator.hasSome]
                            };
                        case be:
                            return {
                                getFilterQuery: (e, t) => ({
                                    [e]: {
                                        $hasSome: je(t)
                                    }
                                }),
                                requiredQueryOperators: [l.AllowedFilterOperator.hasSome]
                            };
                        case De:
                            return {
                                getFilterQuery: (e, t) => ({
                                    $not: [{
                                        [e]: {
                                            $hasSome: je(t)
                                        }
                                    }]
                                }),
                                requiredQueryOperators: [l.AllowedFilterOperator.hasSome]
                            };
                        case Ce:
                            return {
                                getFilterQuery: (e, t) => ({
                                    [e]: {
                                        $hasAll: je(t)
                                    }
                                }),
                                requiredQueryOperators: [l.AllowedFilterOperator.hasAll]
                            };
                        case Ae:
                            return {
                                getFilterQuery: (e, t) => ({
                                    [e]: {
                                        $gte: t
                                    }
                                }),
                                requiredQueryOperators: [l.AllowedFilterOperator.gte]
                            };
                        case Fe:
                            return {
                                getFilterQuery: (e, t) => ({
                                    [e]: {
                                        $lte: t
                                    }
                                }),
                                requiredQueryOperators: [l.AllowedFilterOperator.lte]
                            };
                        case xe:
                            return {
                                getFilterQuery: (e, t) => ({
                                    [e]: {
                                        $gte: t[0],
                                        $lte: t[1]
                                    }
                                }),
                                requiredQueryOperators: [l.AllowedFilterOperator.gte, l.AllowedFilterOperator.lte]
                            };
                        case Le:
                            return {
                                getFilterQuery: (e, t) => ({
                                    $not: [{
                                        [e]: {
                                            $gte: t[0],
                                            $lte: t[1]
                                        }
                                    }]
                                }),
                                requiredQueryOperators: [l.AllowedFilterOperator.gte, l.AllowedFilterOperator.lte]
                            };
                        default:
                            return {
                                getFilterQuery: (e, t) => ({
                                    [e]: Array.isArray(t) ? {
                                        $hasSome: t
                                    } : t
                                }),
                                requiredQueryOperators: [l.AllowedFilterOperator.eq, l.AllowedFilterOperator.hasSome]
                            }
                    }
                })(o);
                return a(r, n)
            },
            ki = e => {
                let {
                    valueResolvers: t,
                    getConnectedComponents: r,
                    getFieldType: n,
                    getUserFilterInitialData: o,
                    wasSetFilterCalled: a
                } = e;
                return e => {
                    const i = aa(Ui, (e => Di(e) ? t.currentUser() : Fi(e) ? t.dataBinding(e) : Gi(e) ? t.userInput(e) : void 0), e).map((e => {
                        if (a()) return e;
                        const t = r().filter((e => {
                            let {
                                role: t
                            } = e;
                            return Se.includes(t)
                        })).map((e => {
                            const {
                                userInputFilter: t
                            } = e.connectionConfig, {
                                prop: r,
                                fieldName: a,
                                condition: i
                            } = t, s = e.getValue({
                                propPath: r
                            }), c = Zn(a) ? $n(a) : a;
                            if ([Be, "", !1].includes(s) || (0, D.isEqual)(s, []) || e.role === Re && (0, D.isEqual)(s, e.getBounds())) return null;
                            const d = (e => {
                                let {
                                    value: t,
                                    fieldType: r,
                                    fieldName: n,
                                    getUserFilterInitialData: o
                                } = e;
                                switch (r) {
                                    case l.FieldType.reference:
                                        {
                                            var a;
                                            const e = null == (a = o()) ? void 0 : a.find((e => e.fieldName === n && Ve.includes(e.role)));
                                            if (!e) return null;
                                            const {
                                                referencedItemIdsByOption: r
                                            } = e;
                                            return (0, D.isArray)(t) ? t.flatMap((e => r[e])) : r[t]
                                        }
                                    case l.FieldType.number:
                                        return Array.isArray(t) ? t.map(Number) : Number(t);
                                    default:
                                        return t
                                }
                            })({
                                value: s,
                                fieldType: n(c).getOrElse(null),
                                fieldName: a,
                                getUserFilterInitialData: o
                            });
                            return null === d ? null : Mi({
                                role: e.role,
                                fieldName: c,
                                value: d,
                                condition: i
                            })
                        })).filter(Boolean);
                        return 0 === t.length ? e : {
                            $and: [e].filter(Boolean).concat(t)
                        }
                    }));
                    return i
                }
            },
            Gi = e => ca(e).map((e => {
                let {
                    value: t
                } = e;
                return Li(t)
            })).getOrElse(!1),
            ji = e => na(Fi, e),
            Bi = e => !(0, D.isEmpty)(na(Li, e)),
            Vi = e => Bi(e) || (e => !(0, D.isEmpty)(na(Di, e)))(e) || (e => ji(e).length > 0)(e),
            {
                WRITE: $i
            } = e,
            Wi = (e, t, r) => {
                const {
                    readWriteType: n,
                    deferred: o,
                    filter: a,
                    collectionName: i
                } = e, s = n === $i, c = r.some((e => {
                    let {
                        role: t
                    } = e;
                    return t === K
                })), l = t === br, d = Boolean(o) && !(c || l || s), u = a && Vi(a), p = (e => {
                    let {
                        collectionId: t,
                        datasetHasDynamicFilter: r,
                        datasetIsDeferred: n,
                        datasetIsRouter: o,
                        datasetIsWriteOnly: a
                    } = e;
                    return t ? r || n || o || a ? "REGULAR" : ea : "UNCONFIGURED"
                })({
                    collectionId: i,
                    datasetHasDynamicFilter: u,
                    datasetIsDeferred: d,
                    datasetIsRouter: l,
                    datasetIsWriteOnly: s
                });
                return {
                    sequenceType: p,
                    datasetIsWriteOnly: s,
                    datasetIsMaster: c,
                    datasetIsRouter: l,
                    datasetIsDeferred: d,
                    datasetHasDynamicFilter: u
                }
            },
            qi = e => {
                const t = (0, D.values)({
                    DATASET: Cr,
                    ROUTER_DATASET: br
                });
                return e.map((e => {
                    const {
                        id: r,
                        type: n,
                        collectionId: o,
                        filter: a,
                        sort: i,
                        pageSize: s,
                        readWriteType: c,
                        includes: l,
                        nested: d,
                        deferred: u,
                        connections: p,
                        dataIsInvalidated: f,
                        updatedCompIds: h,
                        dynamicPageData: m,
                        cursor: g
                    } = e;
                    t.includes(n) || U.logger.log(new S(`type of controller MUST be one of ${t} but is ${n}`));
                    const y = (0, D.defaults)({
                        collectionName: o,
                        filter: a,
                        sort: i,
                        includes: l,
                        nested: d,
                        pageSize: s,
                        readWriteType: c,
                        cursor: g,
                        deferred: u,
                        uniqueFieldValues: []
                    }, Gt);
                    return {
                        id: r,
                        compId: r,
                        type: n,
                        livePreviewOptions: {
                            shouldFetchData: f,
                            compsIdsToReset: h
                        },
                        connections: p,
                        dynamicPageData: m,
                        config: {
                            dataset: y,
                            datasetStaticConfig: Wi(y, n, p)
                        }
                    }
                }))
            },
            Hi = Symbol("isPristine"),
            zi = e => e._id,
            Yi = e => ({ ...e,
                [Hi]: !1
            }),
            Ji = (e, t) => ({ ...e,
                _id: t || (0, E.v4)(),
                [Hi]: !0
            }),
            Ki = (e, t) => e && t && e._id === t._id,
            Qi = e => (0, D.omit)(e, [Hi]),
            Xi = e => {
                let {
                    record: t,
                    draft: r,
                    includes: n,
                    nestedFieldKeys: o,
                    fieldKey: a
                } = e;
                return (e => {
                    let {
                        includes: t,
                        nestedFieldKeys: r,
                        fieldKey: n
                    } = e;
                    const o = null == t ? void 0 : t.includes(n),
                        a = r.includes(n);
                    return o || a
                })({
                    includes: n,
                    nestedFieldKeys: o,
                    fieldKey: a
                }) && (e => {
                    let {
                        record: t,
                        draft: r,
                        fieldKey: n
                    } = e;
                    return (0, D.isPlainObject)(t[n]) && (0, D.isPlainObject)(r[n])
                })({
                    record: t,
                    draft: r,
                    fieldKey: a
                })
            },
            Zi = {
                chain: e => t => e.matchWith({
                    Empty: () => e,
                    Results: e => {
                        let {
                            items: r,
                            datasetSize: n,
                            offset: o
                        } = e;
                        return t({
                            items: r,
                            datasetSize: n,
                            offset: o
                        })
                    }
                }),
                map: e => t => e.matchWith({
                    Empty: () => e,
                    Results: e => {
                        let {
                            items: r,
                            datasetSize: n,
                            offset: o
                        } = e;
                        const {
                            items: a = r,
                            datasetSize: i = n,
                            offset: s = o
                        } = t({
                            items: r,
                            datasetSize: n,
                            offset: o
                        });
                        return es.Results(a, i, s)
                    }
                }),
                filter: e => t => e.matchWith({
                    Empty: () => e,
                    Results: r => {
                        let {
                            items: n,
                            datasetSize: o,
                            offset: a
                        } = r;
                        return t({
                            items: n,
                            datasetSize: o,
                            offset: a
                        }) ? e : es.Empty()
                    }
                }),
                orElse: e => t => e.matchWith({
                    Empty: () => t(),
                    Results: () => e
                }),
                get: e => () => e.matchWith({
                    Empty: () => ({
                        items: [],
                        datasetSize: {
                            total: 0,
                            loaded: 0
                        },
                        offset: 0
                    }),
                    Results: e => e
                }),
                of: () => ts
            },
            es = (0, tt.union)("QueryResults", {
                Empty: () => ({}),
                Results: function(e, t, r) {
                    return void 0 === r && (r = 0), {
                        items: e,
                        datasetSize: t,
                        offset: r
                    }
                }
            }, Zi);

        function ts(e) {
            let {
                items: t,
                datasetSize: r,
                offset: n
            } = e;
            return r && Math.max(r.total, r.loaded) > 0 && Array.isArray(t) ? es.Results(t, r, n) : es.Empty()
        }
        const rs = {
                Empty: es.Empty,
                Results: es.Results,
                fromWixDataQueryResults: function(e, t) {
                    return e ? this.of({
                        items: e.items,
                        datasetSize: e.datasetSize,
                        offset: t
                    }) : es.Empty()
                },
                of: ts
            },
            ns = e => t => ({ ...t,
                ...e
            }),
            os = (e, t) => r => t(e(r))(r),
            as = (e, t, r) => {
                const n = new Map;
                return function() {
                    for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++) a[i] = arguments[i];
                    const s = t(a),
                        c = n.get(s);
                    if (c && r(a, c.args)) return c.result;
                    const l = e.apply(this, a);
                    return n.set(s, {
                        args: a,
                        result: l
                    }), l
                }
            },
            is = e => ns({
                records: e
            }),
            ss = e => t => {
                var r, n, o;
                return { ...t,
                    datasetSize: {
                        cursor: null == (r = t.datasetSize) ? void 0 : r.cursor,
                        total: ((null == (n = t.datasetSize) ? void 0 : n.total) || 0) + e,
                        loaded: ((null == (o = t.datasetSize) ? void 0 : o.loaded) || 0) + e
                    }
                }
            },
            cs = e => {
                let {
                    cursor: t,
                    loaded: r,
                    total: n
                } = e;
                return e => ({ ...e,
                    datasetSize: {
                        cursor: t,
                        loaded: r + ps(e),
                        total: n + ps(e)
                    }
                })
            },
            ls = e => ({ ...e,
                numSeedRecords: e.records.length
            }),
            ds = e => e.matchWith({
                Empty: () => cs({
                    total: 0,
                    loaded: 0
                }),
                Results: e => {
                    let {
                        items: t,
                        datasetSize: r
                    } = e;
                    return (0, D.flow)(is(t.map((e => zi(e)))), cs(r), ls)
                }
            }),
            us = e => t => ({ ...t,
                newRecordMarkers: e(t.newRecordMarkers)
            }),
            ps = (e, t) => e.newRecordMarkers.filter((e => null == t || e <= t)).length,
            fs = function(e, t, r) {
                let {
                    overwrite: n = !0,
                    fixIndex: o = !0
                } = void 0 === r ? {} : r;
                return os((r => {
                    const a = e + (o ? ps(r, e) : 0),
                        i = Math.max(0, a - r.records.length),
                        s = a + (n ? t.length : 0);
                    return r.records.slice(0, a).concat(new Array(i)).concat(t.map((e => zi(e)))).concat(r.records.slice(s))
                }), is)
            },
            hs = (e, t, r) => n => Object.assign({}, e(n), ...r.map((e => ({
                [t(e)]: e
            })))),
            ms = (e, t, r) => n => ({ ...e(n),
                [t]: r(e(n)[t])
            }),
            gs = (e, t) => r => Object.assign({}, ...Object.keys(e(r)).filter((e => e !== t)).map((t => ({
                [t]: e(r)[t]
            })))),
            ys = e => ns({
                records: e
            }),
            vs = e => ns({
                drafts: e
            }),
            _s = (0, D.curry)(((e, t, r) => ns({
                scopes: { ...r.scopes,
                    [e]: t
                }
            })(r))),
            Es = e => t => t.scopes[e],
            Is = e => os(hs((e => {
                let {
                    records: t
                } = e;
                return t
            }), zi, e), ys),
            Ts = e => os(hs((e => {
                let {
                    drafts: t
                } = e;
                return t
            }), zi, [e]), vs),
            Rs = e => os(gs((e => {
                let {
                    drafts: t
                } = e;
                return t
            }), zi(e)), vs),
            ws = () => vs({}),
            Ss = e => e.matchWith({
                Empty: () => e => e,
                Results: e => {
                    let {
                        items: t
                    } = e;
                    return t.length > 0 ? Is(t) : e => e
                }
            }),
            Os = (e, t) => os(ms((e => {
                let {
                    drafts: t
                } = e;
                return t
            }), e, (0, D.flow)(Yi, (e => t => Object.entries(e).reduce(((e, t) => {
                let [r, n] = t;
                return (0, D.set)(e, r, n)
            }), (0, D.cloneDeep)(t)))(t))), vs),
            Ps = (e, t, r, n) => {
                const o = t.records[e],
                    a = t.drafts[e],
                    i = (0, D.isPlainObject)(o),
                    s = (0, D.isPlainObject)(a);
                return i && s ? (e => {
                    let {
                        record: t,
                        draft: {
                            _id: r,
                            ...n
                        },
                        includes: o,
                        nestedFieldKeys: a
                    } = e;
                    const i = Object.keys(n).filter((e => Xi({
                            record: t,
                            draft: n,
                            includes: o,
                            nestedFieldKeys: a,
                            fieldKey: e
                        }))),
                        s = { ...t,
                            ...n
                        };
                    return i.reduce(((e, r) => ({ ...e,
                        [r]: (0, D.merge)({}, t[r], n[r])
                    })), s)
                })({
                    record: o,
                    draft: a,
                    includes: r,
                    nestedFieldKeys: n
                }) : i ? { ...o
                } : s ? { ...a
                } : null
            },
            Ns = (0, D.curry)(((e, t, r) => Object.keys(r.scopes).filter((e => t(r.scopes[e], e))).map((t => e(r.scopes[t], t))))),
            Cs = (0, D.curry)((function(e, t, r, n, o, a, i) {
                void 0 === i && (i = !1);
                const {
                    records: s,
                    datasetSize: c
                } = Es(e)(a), l = r - t, d = s.slice(t, r).reduce(((e, t) => {
                    const r = Ps(t, a, n, o);
                    return null != r ? e.concat(Qi(r)) : e
                }), []);
                return rs.of({
                    items: d,
                    datasetSize: c,
                    offset: t
                }).filter((function(e) {
                    let {
                        items: t
                    } = e;
                    return i || t.length >= l
                }))
            })),
            bs = (0, D.curry)(((e, t) => os((0, D.flow)(Es(e), t), _s(e)))),
            Ds = (0, D.curry)(((e, t) => ns({
                [e]: t
            }))),
            As = e => t => t[e],
            Fs = (0, D.curry)(((e, t) => os((0, D.flow)(As(e), t), Ds(e)))),
            xs = e => e === Ze,
            Ls = e => {
                let [{
                    datasetId: t
                }] = e;
                return t
            },
            Us = (e, t) => {
                let [r] = e, [n] = t;
                return (0, D.every)(r, ((e, t) => {
                    return "filter" === t ? (r = e, o = n[t], JSON.stringify(r) === JSON.stringify(o)) : e === n[t];
                    var r, o
                }))
            },
            Ms = e => {
                let {
                    primaryDatasetId: t,
                    recordStoreCache: r,
                    refreshStoreCache: n,
                    dataProvider: o,
                    mainCollectionName: a,
                    includes: i,
                    nestedFieldKeys: s,
                    uniqueFieldValues: c,
                    readWriteType: d,
                    cursorPagingRequired: u
                } = e;
                const {
                    breadcrumbReporting: p
                } = U, f = () => r[t], h = e => {
                    r[t] = e
                };
                ((0, D.isEmpty)(f()) || n || xs(d)) && h((e => ({
                    [e]: {
                        records: {},
                        drafts: {},
                        scopes: {}
                    }
                }))(a));
                const m = [],
                    g = as((e => {
                        let {
                            pageSize: t,
                            sort: r,
                            filter: n,
                            datasetId: g,
                            referencedCollectionName: y,
                            fixedRecordId: v
                        } = e;
                        const _ = null != y ? y : a,
                            E = JSON.stringify({
                                filter: n,
                                sort: r
                            }),
                            I = As(_),
                            T = Fs(_),
                            R = (0, D.flow)(I, Es(E)),
                            w = bs(E),
                            S = () => o.getSchema(_),
                            O = e => e - e % t,
                            P = (0, D.memoize)((e => {
                                let {
                                    offset: t,
                                    length: a,
                                    datasetSize: s
                                } = e;
                                return o.getData({
                                    datasetId: g,
                                    length: a,
                                    collectionId: _,
                                    cursorPaging: M.isCursorPaging(),
                                    offset: t,
                                    filter: n,
                                    sort: r,
                                    includes: null != y ? void 0 : i,
                                    uniqueFieldValues: c,
                                    datasetSize: s
                                }).then((e => ({
                                    items: e.items,
                                    datasetSize: e.datasetSize,
                                    offset: t
                                })))
                            }), (e => {
                                let {
                                    offset: t,
                                    length: r,
                                    datasetSize: n
                                } = e;
                                return [t, r, null == n ? void 0 : n.cursor].join("-")
                            })),
                            N = e => M.isCursorPaging() ? (async e => {
                                const t = [];
                                let {
                                    datasetSize: r
                                } = R(f());
                                for (const {
                                        offset: n,
                                        length: o
                                    } of e) {
                                    const e = await P({
                                        offset: n,
                                        length: o,
                                        datasetSize: r
                                    });
                                    if (t.push(e), r = e.datasetSize, !r.cursor) break
                                }
                                return t
                            })(e) : Promise.all(e.map((e => {
                                let {
                                    offset: t,
                                    length: r
                                } = e;
                                return P({
                                    offset: t,
                                    length: r
                                })
                            }))),
                            C = (e, r, n) => {
                                const o = M.isCursorPaging() ? 0 : O(r),
                                    a = (i = r, s = n, Math.ceil((O(i) + (s - O(i))) / t) * t);
                                var i, s;
                                const c = Xn(S()) || l.DefaultMaxPageSize[M.getPaging()],
                                    d = ((e, t, r) => {
                                        const n = e.records.slice(t, r),
                                            o = n.findIndex(u),
                                            a = ((e, t) => {
                                                if (t.length > 0)
                                                    for (let r = t.length - 1; r >= 0; r -= 1)
                                                        if (e(t[r])) return r;
                                                return -1
                                            })(u, n),
                                            i = p(o, t),
                                            s = p(a, r),
                                            c = ps(e, i),
                                            l = i - c,
                                            d = s - c - l;
                                        return 0 === d ? tt.Maybe.Nothing() : tt.Maybe.Just({
                                            offset: l,
                                            length: d
                                        });

                                        function u(e) {
                                            return "string" != typeof e
                                        }

                                        function p(t, r) {
                                            return -1 === t ? Math.max(e.records.length, r) : o + r
                                        }
                                    })(e, o, a),
                                    u = d.map((e => {
                                        let {
                                            offset: t,
                                            length: r
                                        } = e;
                                        return r <= c ? [{
                                            offset: t,
                                            length: r
                                        }] : (0, D.flatten)((0, D.times)(Math.ceil(r / c), (e => [{
                                            offset: t + e * c,
                                            length: Math.min(c, r - e * c)
                                        }])))
                                    })).getOrElse([]);
                                return N(u)
                            },
                            b = (e, t, r) => ra()(tt.Result, m.map((n => tt.Result.try((() => n(null != e ? Qi(e) : null, null != t ? Qi(t) : null, r)))))),
                            A = function(e, t, r) {
                                const n = R(f()).records[r],
                                    o = Ps(n, I(f()), i, s);
                                if (null == o) return t(); {
                                    const t = function() {
                                            h((0, D.flow)(...arguments)(f()))
                                        },
                                        d = e => {
                                            const t = Ps(n, I(f()), i, s);
                                            return (0, D.isEqual)(o, t) ? tt.Result.Ok([]) : b(o, t, e)
                                        };
                                    for (var a = arguments.length, c = new Array(a > 3 ? a - 3 : 0), l = 3; l < a; l++) c[l - 3] = arguments[l];
                                    return e({
                                        update: t,
                                        notifyIfChanged: d
                                    }, o, r, ...c)
                                }
                            },
                            F = (e, t) => function(r) {
                                for (var n = arguments.length, o = new Array(n > 1 ? n - 1 : 0), a = 1; a < n; a++) o[a - 1] = arguments[a];
                                return A(e, t, r, ...o)
                            },
                            x = (e, t) => async function(r) {
                                for (var n = arguments.length, o = new Array(n > 1 ? n - 1 : 0), a = 1; a < n; a++) o[a - 1] = arguments[a];
                                return A(e, t, r, ...o)
                            },
                            L = (e, t) => p(t, Ye.with({
                                category: "recordStore",
                                message: e,
                                data: {
                                    datasetId: g,
                                    scope: E
                                }
                            })),
                            U = e => {
                                return e && (t = zi(e), !I(f()).records[t]);
                                var t
                            },
                            M = {
                                getRecords: L("getRecords", (async (e, t) => {
                                    const {
                                        datasetSize: r
                                    } = R(f()), n = (e => {
                                        let {
                                            from: t,
                                            length: r,
                                            datasetSize: n,
                                            cursorPaging: o
                                        } = e;
                                        if (!n) return t + r;
                                        const {
                                            total: a,
                                            loaded: i,
                                            cursor: s
                                        } = n, c = o ? s ? 1 / 0 : i : a;
                                        return Math.min(t + r, c)
                                    })({
                                        from: e,
                                        length: t,
                                        datasetSize: r,
                                        cursorPaging: M.isCursorPaging()
                                    }), o = Cs(E, e, n, i, s), a = xs(d) || !r || (e => {
                                        let {
                                            loaded: t,
                                            total: r,
                                            cursor: n
                                        } = e;
                                        return !t && !r && !n
                                    })(r);
                                    return o(I(f()), a).orElse((async () => {
                                        const t = await C(R(f()), e, n),
                                            r = T((0, D.flow)(...t.map((e => {
                                                let {
                                                    items: t,
                                                    datasetSize: r,
                                                    offset: n
                                                } = e;
                                                return rs.fromWixDataQueryResults({
                                                    items: t,
                                                    datasetSize: r
                                                }, n)
                                            })).map((e => (0, D.flow)(Ss(e), w(e.matchWith({
                                                Empty: () => cs({
                                                    total: 0,
                                                    loaded: 0
                                                }),
                                                Results: e => {
                                                    let {
                                                        items: t,
                                                        datasetSize: r,
                                                        offset: n
                                                    } = e;
                                                    return (0, D.flow)(cs(r), t.length > 0 ? fs(n, t) : e => e)
                                                }
                                            }))))))),
                                            a = f();
                                        var i, s;
                                        return h(r(f())), i = I(a), s = I(f()), Object.keys(i.records).filter((e => (0, D.isPlainObject)(s.records[e]) && s.records[e]._updatedDate > i.records[e]._updatedDate)).forEach((e => b(i.records[e], s.records[e]))), o(I(f()), !0)
                                    }))
                                })),
                                getRecordsLimitedByMaxPageSize: (e, t) => {
                                    const r = Math.min(t, Xn(S()) || t);
                                    return M.getRecords(e, r)
                                },
                                seed: L("seed", (() => {
                                    if (0 === R(f()).numSeedRecords) {
                                        return (v ? o.getData({
                                            datasetId: g,
                                            length: t,
                                            collectionId: _,
                                            cursorPaging: void 0,
                                            offset: 0,
                                            filter: n,
                                            sort: r,
                                            includes: null != y ? void 0 : i,
                                            uniqueFieldValues: c
                                        }) : o.getInitialData({
                                            datasetId: g,
                                            collectionId: _,
                                            filter: n,
                                            sort: r,
                                            includes: i,
                                            length: t,
                                            uniqueFieldValues: c
                                        })).then((e => {
                                            const t = rs.fromWixDataQueryResults(e, 0),
                                                r = T((0, D.flow)(Ss(t), w(ds(t))));
                                            h(r(f()))
                                        }))
                                    }
                                    return Promise.resolve()
                                })),
                                getTheStore: f,
                                getPaging: () => (({
                                    schema: e,
                                    cursorPagingPreferred: t
                                }) => {
                                    const r = e ? .pagingMode ? .includes(l.PagingMode.Offset),
                                        n = e ? .pagingMode ? .includes(l.PagingMode.Cursor);
                                    return 1 === e ? .pagingMode ? .length && n || r && n && t ? l.PagingMode.Cursor : l.PagingMode.Offset
                                })({
                                    schema: S(),
                                    cursorPagingPreferred: u
                                }),
                                isCursorPaging: () => M.getPaging() === l.PagingMode.Cursor,
                                getSeedRecords: L("getSeedRecords", (() => Cs(E, 0, R(f()).numSeedRecords, i, s, I(f()), !0))),
                                getDatasetSize: L("getDatasetSize", (() => R(f()).datasetSize)),
                                getRecordById: L("getRecordById", (e => tt.Maybe.fromNullable(I(f()).records[e]))),
                                removeRecord: L("removeRecord", x((async (e, t) => {
                                    let {
                                        update: r,
                                        notifyIfChanged: n
                                    } = e;
                                    const a = zi(t);
                                    !U(t) && a && await o.remove({
                                        collectionId: _,
                                        recordId: a
                                    }), P.cache.clear();
                                    const i = Ns(((e, t) => {
                                        return bs(t, (0, D.flow)((n = a, os((e => e.records.filter((e => e !== n))), is)), ss(-1), us((r = ((e, t) => t.records.indexOf(e))(a, e), e => e.filter((e => e !== r))))));
                                        var r, n
                                    }), (s = a, e => e.records.includes(s)), I(f()));
                                    var s;
                                    return r(T((0, D.flow)((0, D.flow)(Rs(t), (e => os(gs((e => {
                                        let {
                                            records: t
                                        } = e;
                                        return t
                                    }), e), ys))(a)), ...i))), n()
                                }), (() => Promise.resolve(tt.Result.Error("cannot remove record: index not found"))))),
                                reset: L("reset", (() => {
                                    P.cache.clear(), h(T((0, D.flow)(_s(E, {
                                        records: [],
                                        numSeedRecords: 0,
                                        newRecordMarkers: []
                                    }), ws()))(f()))
                                })),
                                newRecord: L("newRecord", ((e, t) => {
                                    const r = Ji(t),
                                        n = T((0, D.flow)(Ts(r), w((0, D.flow)(ss(1), ns({
                                            newRecordMarkers: [e]
                                        }), fs(e, [r], {
                                            overwrite: !1,
                                            fixIndex: !1
                                        })))));
                                    return h(n(f())), b(null, r), Qi(r)
                                })),
                                saveRecord: L("saveRecord", x((async (e, t, r) => {
                                    let {
                                        update: n,
                                        notifyIfChanged: a
                                    } = e;
                                    const i = await o.save({
                                        collectionId: _,
                                        record: Qi(t),
                                        includeReferences: !0
                                    });
                                    return n(T((0, D.flow)((e => Is([e]))(i), Rs(t), w((0, D.flow)(((e, t) => fs(e, [t], {
                                        fixIndex: !1
                                    }))(r, i), us((e => e.filter((e => e !== r))))))))), a(), Qi(i)
                                }), (() => Promise.reject(new Error("cannot save record: index not found"))))),
                                setFieldsValues: L("setFieldsValues", F(((e, t, r, n, o) => {
                                    let {
                                        update: a,
                                        notifyIfChanged: i
                                    } = e;
                                    return Object.keys(n).length && a(T(Os(zi(t), n))), i(o)
                                }), (() => tt.Result.Error("cannot update field values: index not found")))),
                                isPristine: L("isPristine", F(((e, t) => (e => "boolean" != typeof e[Hi] || e[Hi])(t)), (() => !0))),
                                hasDraft: L("hasDraft", F(((e, t) => (e => "boolean" == typeof e[Hi])(t)), (() => !1))),
                                isNewRecord: L("isNewRecord", F(((e, t) => U(t)), (() => !0))),
                                clearDrafts: L("clearDrafts", (() => {
                                    h(T(ws())(f()))
                                })),
                                resetDraft: L("resetDraft", F(((e, t, r, n) => {
                                    let {
                                        update: o,
                                        notifyIfChanged: a
                                    } = e;
                                    return o(T(U(t) ? ((e, t) => os(ms((e => {
                                        let {
                                            drafts: t
                                        } = e;
                                        return t
                                    }), zi(e), (e => Ji(t, e._id))), vs))(t, n) : Rs(t))), a()
                                }), (() => tt.Result.Error("cannot reset draft: index not found")))),
                                hasSeedData: L("hasSeedData", (() => R(f()).numSeedRecords > 0)),
                                getUniqueFieldValues: L("getUniqueFieldValues", (e => o.getUniqueFieldValues({
                                    collectionId: _,
                                    fieldKey: e
                                })))
                            };
                        if (I(f()) || h(Ds(_, {
                                records: {},
                                drafts: {},
                                scopes: {}
                            })(f())), !I(f()).scopes[E]) {
                            const e = [];
                            if (v) {
                                const t = o.getRecord({
                                        collectionId: _,
                                        recordId: v,
                                        includes: i
                                    }) || Ps(v, I(f()), i, s),
                                    r = t ? [t] : [],
                                    n = r.length > 0 ? rs.of({
                                        items: r,
                                        offset: 0,
                                        datasetSize: {
                                            loaded: r.length,
                                            total: r.length
                                        }
                                    }) : rs.Empty(),
                                    a = n.matchWith({
                                        Empty: tt.Maybe.Nothing,
                                        Results: (0, D.flow)(rs.of, tt.Maybe.Just)
                                    });
                                (0, D.some)(r, U) && e.push(Ss(n)), a.fold((() => {
                                    e.push(_s(E, {
                                        records: [],
                                        numSeedRecords: 0,
                                        newRecordMarkers: []
                                    }))
                                }), (t => {
                                    e.push(_s(E, ds(t)({
                                        records: [],
                                        numSeedRecords: 0,
                                        newRecordMarkers: []
                                    })))
                                }))
                            } else e.push(_s(E, {
                                records: [],
                                numSeedRecords: 0,
                                newRecordMarkers: []
                            }));
                            h(T((0, D.flow)(...e))(f()))
                        }
                        return M.externalApi = {
                            getRecords: async (e, t) => (await M.getRecords(e, t)).map((e => {
                                let {
                                    items: t,
                                    ...r
                                } = e;
                                return {
                                    items: (0, D.cloneDeep)(t),
                                    ...r
                                }
                            })),
                            getSeedRecords: () => M.getSeedRecords().map((e => {
                                let {
                                    items: t,
                                    ...r
                                } = e;
                                return {
                                    items: (0, D.cloneDeep)(t),
                                    ...r
                                }
                            })),
                            getRecordsLimitedByMaxPageSize: async (e, t) => (await M.getRecordsLimitedByMaxPageSize(e, t)).map((e => {
                                let {
                                    items: t,
                                    ...r
                                } = e;
                                return {
                                    items: (0, D.cloneDeep)(t),
                                    ...r
                                }
                            }))
                        }, M
                    }), Ls, Us);
                var y;
                return g.onChange = (y = m, e => (y.push(e), () => {
                    const t = y.indexOf(e);
                    t >= 0 && y.splice(t, 1)
                })), g
            },
            ks = e => {
                const t = {};
                return {
                    setController: (r, n) => {
                        let {
                            repeaterId: o,
                            itemId: a
                        } = r;
                        e.log(new Ye({
                            category: "scopeStore",
                            message: "adding scope",
                            data: {
                                componentId: o,
                                itemId: a
                            }
                        })), t[o] = t[o] || {}, t[o][a] = n
                    },
                    getController: e => {
                        let {
                            repeaterId: r,
                            itemId: n
                        } = e;
                        const o = t[r];
                        return o && o[n]
                    },
                    removeController: r => {
                        let {
                            repeaterId: n,
                            itemId: o
                        } = r;
                        e.log(new Ye({
                            category: "scopeStore",
                            message: "removing scope",
                            data: {
                                componentId: n,
                                itemId: o
                            }
                        }));
                        const a = t[n];
                        (0, D.get)(a, o) && (a[o].dispose(), (0, D.unset)(a, o))
                    },
                    getAll: () => Object.values(t).reduce(((e, t) => e.concat(Object.values(t))), [])
                }
            };
        var Gs = a(9706);
        const js = (0, tt.union)("GoToIndexResult", {
                Record: (e, t) => ({
                    index: e,
                    record: t
                }),
                InvalidIndex: () => ({}),
                NoRecord: () => ({})
            }),
            Bs = function(e, t) {
                return void 0 === t && (t = !1), {
                    type: Ht,
                    index: e,
                    suppressRefreshView: t
                }
            },
            Vs = (e, t) => ({
                type: Bt,
                fieldsToUpdate: e,
                updateSource: t
            }),
            $s = e => ({
                type: or,
                atIndex: e
            }),
            Ws = () => ({
                type: ir
            }),
            qs = async (e, t, r, n) => {
                const o = await e(n).fold((() => rs.Empty()), (e => e.externalApi.getRecords(t, r)));
                return o.get()
            },
            Hs = (e, t) => qs(e, pi({
                state: t
            }), fi({
                state: t
            })),
            zs = e => ({
                type: sr,
                userFilterInitialData: e
            }),
            Ys = {
                doFetch: qs,
                fetchCurrentPage: Hs,
                flushDraft: () => ({
                    type: er
                }),
                goToRecordByIndexResult: (e, t) => ({
                    type: Kt,
                    error: e,
                    payload: t
                }),
                incrementNumOfPagesToShow: () => ({
                    type: Wt
                }),
                initWriteOnly: e => e ? Bs(0) : $s(0),
                loadPage: e => ({
                    type: Jt,
                    pageNumber: e
                }),
                newRecord: $s,
                newRecordResult: (e, t) => ({
                    type: ar,
                    error: e,
                    payload: t
                }),
                nextPage: () => ({
                    type: zt
                }),
                previousPage: () => ({
                    type: Yt
                }),
                reInitWriteOnly: () => $s(0),
                refresh: Ws,
                refreshCurrentRecord: () => ({
                    type: Vt
                }),
                refreshCurrentView: () => ({
                    type: $t
                }),
                refreshResult: (e, t) => ({
                    type: Kt,
                    error: e,
                    payload: t
                }),
                remove: () => ({
                    type: rr
                }),
                removeCurrentRecordResult: (e, t) => ({
                    type: nr,
                    error: e,
                    payload: t
                }),
                revert: () => ({
                    type: Xt
                }),
                revertResult: (e, t) => ({
                    type: Zt,
                    error: e,
                    payload: t
                }),
                saveRecordResult: (e, t) => ({
                    type: tr,
                    error: e,
                    payload: t
                }),
                setCurrentIndex: Bs,
                setCurrentRecord: (e, t, r) => ({
                    type: jt,
                    record: e,
                    recordIndex: t,
                    updateSource: r
                }),
                setDefaultRecord: e => ({
                    type: qt,
                    record: e
                }),
                updateCurrentViewResult: (e, t) => ({
                    type: Qt,
                    error: e,
                    payload: t
                }),
                updateFields: Vs,
                GoToIndexResult: js
            },
            Js = e => ({
                type: Wr,
                connections: e
            }),
            Ks = e => ({
                type: pr,
                filter: e
            }),
            Qs = e => ({
                type: fr,
                sort: e
            }),
            Xs = e => ({
                type: hr,
                isDatasetReady: e
            });
        var Zs = a(405),
            ec = a.n(Zs);
        const tc = (e, t) => {
                const {
                    middleware: r,
                    subscribe: n,
                    onIdle: o
                } = ec().createMiddleware(), a = Ut(Qr, void 0, kt(r, ((e, t) => () => r => n => (e.log(new Ye({
                    category: "redux",
                    message: `${n.type} (dataset: ${t})`,
                    data: (0, D.omit)(n, "type", "record")
                })), r(n)))(e, t)));
                return {
                    store: a,
                    subscribe: n,
                    onIdle: o
                }
            },
            {
                READ: rc,
                WRITE: nc,
                READ_WRITE: oc
            } = e,
            ac = {
                [rc]: "read-only",
                [nc]: "write-only",
                [oc]: "read-write"
            },
            ic = (e, t) => {
                if (e) throw new P(`Operation (${t}) not allowed on a dataset with non-offset paging mode`, {
                    code: "OPERATION_NOT_ALLOWED"
                })
            },
            sc = (e, t) => {
                if (r = e(), Nr.isDuringSave(r.records)) throw new P(`Operation (${t}) not allowed during save`, {
                    code: "OPERATION_NOT_ALLOWED"
                });
                var r
            },
            cc = function(e, t, r, n, o) {
                void 0 === t && (t = ""), void 0 === o && (o = !0), ((e, t, r) => {
                        if (!nn(e())) throw new P(r === br ? `Operation (${t}) is not allowed because the field used to build this page's URL is empty` : `Operation (${t}) not allowed on an unconfigured dataset`, {
                            code: "OPERATION_NOT_ALLOWED"
                        })
                    })(e, t, n),
                    function(e, t, r) {
                        void 0 === r && (r = []);
                        const n = rn(e());
                        if (!(0, D.includes)(r, n)) throw new P(`Operation (${t}) not allowed on ${ac[n]} dataset`, {
                            code: "OPERATION_NOT_ALLOWED"
                        })
                    }(e, t, r), o || sc(e, t)
            },
            lc = (e, t) => {
                if (!(0, D.isNumber)(t)) throw new P(`Parameter (${e}) must be a number`, {
                    code: "DS_INVALID_ARGUMENT"
                })
            },
            dc = (e, t) => {
                if (!(0, D.isInteger)(t) || t < 1) throw new P(`Parameter (${e}) must be a positive integer number`, {
                    code: "DS_INVALID_ARGUMENT"
                })
            },
            uc = (e, t) => {
                if (!(0, D.isFunction)(t)) throw new P(`The callback passed to (${e}) must be a function`, {
                    code: "DS_INVALID_ARGUMENT"
                })
            },
            pc = (e, t) => {
                if (!on(e())) throw new P(`The dataset didn't load yet. You need to call ${t} inside the onReady for the dataset.`, {
                    code: "DS_NOT_LOADED"
                })
            },
            fc = e => {
                if (null == hi({
                        state: e()
                    })) throw new P("There is no current item", {
                    code: "DS_NO_CURRENT_ITEM"
                })
            },
            hc = (e, t) => {
                if (e) throw new P(`The "${t}" function cannot be called on the dataset because the dataset was selected using a repeated item scope selector.\nRead more about repeated item scope selectors: http://wix.to/94BuAAs/$w.Repeater.html#repeated-item-scope`, {
                    code: "OPERATION_NOT_ALLOWED"
                })
            },
            mc = e => {
                let {
                    datasetType: t,
                    siblingDynamicPageUrlGetter: r
                } = e;
                const n = {
                    getNextDynamicPage: async () => null != r ? r.getNextDynamicPageUrl() : null,
                    getPreviousDynamicPage: async () => r ? r.getPreviousDynamicPageUrl() : null
                };
                return (0, D.mapValues)(n, ((e, r) => function() {
                    return ((e, t) => {
                        if (e !== br) throw new P(`"${t}" function on the dataset is not allowed. "${t}" can only be called on a Dynamic Page Dataset.`, {
                            code: "OPERATION_NOT_ALLOWED"
                        })
                    })(t, r), e(...arguments)
                }))
            },
            {
                READ: gc,
                WRITE: yc,
                READ_WRITE: vc
            } = e,
            _c = e => {
                let {
                    store: {
                        dispatch: t,
                        getState: r
                    },
                    recordStore: n,
                    eventListeners: {
                        fireEvent: o,
                        register: a
                    },
                    controllerStore: i,
                    datasetId: s,
                    datasetType: c,
                    isFixedItem: l,
                    siblingDynamicPageUrlGetter: d,
                    onIdle: u,
                    dispatcher: p,
                    onReadyAsync: f
                } = e;
                const {
                    logger: h,
                    errorReporting: m,
                    breadcrumbReporting: g,
                    verboseReporting: y
                } = U, v = async function() {
                    try {
                        await t(Ys.flushDraft());
                        const n = (e = r(), Nr.selectLastSavedRecord(e.records) || mn(r()));
                        return (0, D.cloneDeep)(n)
                    } catch (e) {
                        throw p.dispatch("datasetSaveError"), e
                    }
                    var e
                }, _ = async function(e, o) {
                    void 0 === e && (e = (e => {
                        let {
                            state: t
                        } = e;
                        const r = hi({
                            state: t
                        });
                        return null == r ? 0 : r + 1
                    })({
                        state: r()
                    })), pc(r, o), cc(r, o, [yc, vc], c, !1), lc("atIndex", e), await v(), di({
                        recordStore: n
                    }) && await Ri({
                        index: e,
                        recordStore: n
                    }), (e => {
                        let {
                            index: t,
                            datasetSize: {
                                total: r,
                                loaded: n
                            }
                        } = e;
                        if (t < 0 || t > Math.max(r, n)) throw new P("Invalid index", {
                            code: "DS_INDEX_OUT_OF_RANGE"
                        })
                    })({
                        index: e,
                        datasetSize: gi({
                            recordStore: n
                        })
                    }), await t(Ys.newRecord(e))
                };
                return e => {
                    const p = e ? (e, t) => m(e, O.withMessage(`An error occurred in one of ${t} callbacks`)) : D.identity,
                        E = {
                            async isIdle() {
                                await new Promise((e => {
                                    const t = u((() => {
                                        t(), e()
                                    }))
                                }))
                            },
                            onBeforeSave: e => (uc("onBeforeSave", e), cc(r, "onBeforeSave", [yc, vc], c, !1), a("beforeSave", p(e, "beforeSave"))),
                            onAfterSave: e => (uc("onAfterSave", e), cc(r, "onAfterSave", [yc, vc], c, !1), a("afterSave", p(e, "afterSave"))),
                            async save() {
                                cc(r, "save", [yc, vc], c, !1);
                                const e = await v();
                                return sn(r()) && await t(Ys.reInitWriteOnly()), e
                            },
                            async getItems(e, t) {
                                cc(r, "getItems", [gc, vc], c, !1), lc("fromIndex", e), lc("numberOfItems", t);
                                const {
                                    items: o,
                                    offset: a,
                                    datasetSize: i
                                } = await Ys.doFetch(n, e, t);
                                return {
                                    items: o,
                                    totalCount: di({
                                        recordStore: n
                                    }) ? void 0 : i.total,
                                    offset: a
                                }
                            },
                            getTotalCount: () => (cc(r, "getTotalCount", [gc, vc], c, !1), on(r()) ? (ic(di({
                                recordStore: n
                            }), "getTotalCount"), gi({
                                recordStore: n
                            }).total) : null),
                            getCurrentItem: () => {
                                cc(r, "getCurrentItem", [gc, yc, vc], c);
                                const e = mn(r());
                                return e ? (0, D.cloneDeep)(e) : null
                            },
                            getCurrentItemIndex: () => (cc(r, "getCurrentItemIndex", [gc, vc], c), hi({
                                state: r()
                            })),
                            async setCurrentItemIndex(e) {
                                hc(l, "setCurrentItemIndex"), cc(r, "setCurrentItemIndex", [gc, vc], c, !1), (e => {
                                    if (!(0, D.isInteger)(e)) throw new P(`Parameter (${e}) must be a number`, {
                                        code: "PARAMETER_NOT_ALLOWED"
                                    })
                                })(e), await new Promise((e => T.onReady(e))), an(r()) || await v(), await t(Ys.setCurrentIndex(e))
                            },
                            setFieldValue: (e, n) => {
                                pc(r, "setFieldValue"), cc(r, "setFieldValue", [yc, vc], c), fc(r), t(Ys.updateFields({
                                    [e]: (0, D.cloneDeep)(n)
                                }))
                            },
                            setFieldValues: e => {
                                pc(r, "setFieldValues"), cc(r, "setFieldValues", [yc, vc], c), fc(r), t(Ys.updateFields((0, D.mapValues)(e, D.cloneDeep)))
                            },
                            async next() {
                                if (hc(l, "next"), pc(r, "next"), cc(r, "next", [gc, vc], c, !1), an(r()) || await v(), !T.hasNext()) throw new P("There are no more items in the dataset", {
                                    code: "NO_SUCH_ITEM"
                                });
                                const e = hi({
                                    state: r()
                                });
                                return await t(Ys.setCurrentIndex(e + 1)), T.getCurrentItem()
                            },
                            async previous() {
                                if (hc(l, "previous"), pc(r, "previous"), cc(r, "previous", [gc, vc], c, !1), an(r()) || await v(), !T.hasPrevious()) throw new P("This is the first item in the dataset", {
                                    code: "NO_SUCH_ITEM"
                                });
                                const e = hi({
                                    state: r()
                                });
                                return await t(Ys.setCurrentIndex(e - 1)), T.getCurrentItem()
                            },
                            hasNext: () => (cc(r, "hasNext", [gc, vc], c), Ei({
                                state: r(),
                                recordStore: n
                            })),
                            hasPrevious: () => (cc(r, "hasPrevious", [gc, vc], c), _i({
                                state: r()
                            })),
                            new: async e => _(e, "new"),
                            add: async e => _(e, "add"),
                            async remove() {
                                pc(r, "remove"), cc(r, "remove", [vc], c, !1);
                                if (null == hi({
                                        state: r()
                                    })) throw new P("Invalid index", {
                                    code: "DS_INDEX_OUT_OF_RANGE"
                                });
                                await t(Ys.remove())
                            },
                            revert: async () => (pc(r, "revert"), cc(r, "revert", [yc, vc], c, !1), fc(r), t(Ys.revert())),
                            async refresh() {
                                pc(r, "refresh"), cc(r, "refresh", [gc, yc, vc], c, !1), await t(Ys.refresh())
                            },
                            onCurrentIndexChanged: e => (uc("onCurrentIndexChanged", e), cc(r, "onCurrentIndexChanged", [vc, gc], c, !1), a("currentIndexChanged", p(e, "currentIndexChanged"))),
                            onItemValuesChanged: e => (uc("onItemValuesChanged", e), cc(r, "onItemValuesChanged", [vc, yc], c, !1), a("itemValuesChanged", p(e, "itemValuesChanged"))),
                            onError: e => (uc("onError", e), cc(r, "onError", [vc, gc, yc], c, !1), a("datasetError", p(e, "datasetError"))),
                            onReady: e => (uc("onReady", e), cc(r, "onReady", [gc, yc, vc], c, !1), on(r()) ? (Promise.resolve(p(e)()), D.noop) : a("datasetReady", p(e, "datasetReady"))),
                            onReadyAsync: f,
                            async setSort(e) {
                                hc(l, "setSort"), cc(r, "setSort", [gc, vc], c, !1), (e => {
                                    if (!e || !(0, D.isFunction)(e._build)) throw new P("The given sort object is invalid", {
                                        code: "DS_INVALID_ARGUMENT"
                                    })
                                })(e), await new Promise((e => T.onReady(e))), an(r()) || await v();
                                const n = m((() => e._build()), O.withMessage("Sort building failed"));
                                await t(Qs((0, D.cloneDeep)(n())))
                            },
                            async setFilter(e) {
                                hc(l, "setFilter"), cc(r, "setFilter", [gc, vc], c, !1), (e => {
                                    if (!e || !(0, D.isFunction)(e._build)) throw new P("The given filter object is invalid", {
                                        code: "DS_INVALID_ARGUMENT"
                                    })
                                })(e), await new Promise((e => T.onReady(e))), an(r()) || await v();
                                const n = m((() => e._build()), O.withMessage("Filter building failed"));
                                await t(Ks((0, D.cloneDeep)(n())))
                            },
                            loadMore: async () => {
                                hc(l, "loadMore"), pc(r, "loadMore"), cc(r, "loadMore", [gc, vc], c, !1), await t(Ys.incrementNumOfPagesToShow())
                            },
                            async nextPage() {
                                if (hc(l, "nextPage"), pc(r, "nextPage"), cc(r, "nextPage", [gc, vc], c, !1), an(r()) || await v(), !T.hasNextPage()) throw new P("There are no more pages in the dataset", {
                                    code: "NO_SUCH_PAGE"
                                });
                                await t(Ys.nextPage());
                                const {
                                    items: e
                                } = await Ys.fetchCurrentPage(n, r());
                                return e
                            },
                            async previousPage() {
                                if (hc(l, "previousPage"), pc(r, "previousPage"), cc(r, "previousPage", [gc, vc], c, !1), an(r()) || await v(), !T.hasPreviousPage()) throw new P("This is the first page in the dataset", {
                                    code: "NO_SUCH_PAGE"
                                });
                                await t(Ys.previousPage());
                                const {
                                    items: e
                                } = await Ys.fetchCurrentPage(n, r());
                                return e
                            },
                            hasNextPage: () => (cc(r, "hasNextPage", [gc, vc], c), Ti({
                                state: r(),
                                recordStore: n
                            })),
                            hasPreviousPage: () => (cc(r, "hasPreviousPage", [gc, vc], c), Ii({
                                state: r()
                            })),
                            getTotalPageCount: () => (cc(r, "getTotalPageCount", [gc, vc], c), on(r()) ? (ic(di({
                                recordStore: n
                            }), "getTotalPageCount"), yi({
                                state: r(),
                                recordStore: n
                            })) : null),
                            getCurrentPageIndex: () => (cc(r, "getCurrentPageIndex", [gc, vc], c), mi({
                                state: r()
                            })),
                            async loadPage(e) {
                                cc(r, "loadPage", [gc, vc], c, !1), hc(l, "loadPage"), pc(r, "loadPage"), ic(di({
                                    recordStore: n
                                }), "loadPage"), ((e, t) => {
                                    if (dc("pageNumber", e), e > t) throw new P(`Page ${e} does not exist`, {
                                        code: "NO_SUCH_PAGE"
                                    })
                                })(e, T.getTotalPageCount()), an(r()) || await v(), await t(Ys.loadPage(e));
                                const {
                                    items: o
                                } = await Ys.fetchCurrentPage(n, r());
                                return o
                            },
                            inScope: (e, t) => {
                                cc(r, "inScope", [gc, yc, vc], c, !1);
                                const n = i.getController({
                                    repeaterId: e,
                                    itemId: t
                                });
                                return n ? n.staticExports : T
                            },
                            getPageSize: () => (cc(r, "getPageSize", [gc, vc], c), ui({
                                state: r()
                            })),
                            async setPageSize(e) {
                                cc(r, "setPageSize", [gc, vc], c, !1), dc("size", e), await new Promise((e => T.onReady(e))), an(r()) || await v(), await t(ur({
                                    size: e
                                }))
                            }
                        },
                        I = mc({
                            datasetType: c,
                            siblingDynamicPageUrlGetter: d
                        }),
                        T = Object.assign(E, I),
                        R = {};
                    for (const e in T) R[e] = (0, D.flow)((t => g(t, Ye.with({
                        category: "datasetAPI",
                        message: `method: ${e} - datasetId:${s}`
                    }))), (t => y(t, e)), (t => {
                        return j(t, (r = e, e => {
                            throw e instanceof O ? h.log(new O(`datasetApi '${r}' operation failed`, {
                                cause: e
                            })) : e instanceof C ? h.log(e) : h.log(new S(`datasetApi '${r}' operation failed`, {
                                cause: e
                            })), o("datasetError", r, e instanceof N ? e.cause.message : e.cause || e), e.cause || e
                        }));
                        var r
                    }))(T[e]);
                    return R
                }
            },
            Ec = function(e) {
                void 0 === e && (e = D.noop);
                let t = !1,
                    r = {};
                const n = e => r[e] ? r[e] : r[e] = [],
                    o = function(e) {
                        for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) r[o - 1] = arguments[o];
                        return Promise.all(n(e).map((e => e(...r))))
                    };
                return {
                    register: (e, r) => {
                        if (t) return D.noop;
                        const o = (e => j((function(t) {
                            for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++) n[o - 1] = arguments[o];
                            return Promise.resolve(e(t, ...n))
                        }), (e => Promise.reject(e))))(r);
                        return n(e).push(o), () => {
                            (0, D.remove)(n(e), (e => e === o))
                        }
                    },
                    executeHooks: o,
                    fireEvent: function(t) {
                        for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++) n[a - 1] = arguments[a];
                        return U.logger.log(new Je(Je.types.DS_API.TRIGGERED, {
                            eventName: t,
                            eventArgs: n
                        })), e(t, ...n), o(t, ...n)
                    },
                    dispose: () => {
                        t = !0, r = {}
                    }
                }
            },
            Ic = ["siteButtonRole", "imageButtonRole", "stylableButtonRole"],
            Tc = [re, ne, Q, me, ...Se],
            Rc = e => e.filter((e => {
                let {
                    role: t,
                    isInput: r
                } = e;
                return r && !Tc.includes(t)
            })),
            wc = (e, t) => e.filter((e => {
                let {
                    role: t
                } = e;
                return (0, D.includes)(Ic, t)
            })).filter((e => {
                let {
                    connectionConfig: r
                } = e;
                return (0, D.includes)(t, (0, D.get)(r, "events.onClick.action"))
            })),
            Sc = (e, t, r, n) => {
                e.enabled !== t && (t ? e.enable() : e.disable(), r.log(new Ye({
                    category: "components",
                    message: `${e.id} changed to ${t?"enabled":"disabled"} (dataset: ${n})`
                })))
            },
            Oc = (e, t, r, n, o) => {
                let {
                    getState: a,
                    subscribe: i
                } = e;
                const s = {
                        new: () => !an(a()),
                        save: () => cn(a()),
                        revert: () => cn(a()),
                        remove: () => cn(a()),
                        next: () => Ei({
                            state: a(),
                            recordStore: o
                        }),
                        previous: () => _i({
                            state: a()
                        }),
                        nextPage: () => Ti({
                            state: a(),
                            recordStore: o
                        }),
                        previousPage: () => Ii({
                            state: a()
                        }),
                        nextDynamicPage: () => Tn(a()).hasUrl(),
                        previousDynamicPage: () => Rn(a()).hasUrl(),
                        loadMore: () => (e => {
                            let {
                                state: t,
                                recordStore: r
                            } = e;
                            if (vi({
                                    recordStore: r
                                })) return !0;
                            const n = gi({
                                recordStore: r
                            });
                            return !!n && pi({
                                state: t
                            }) + fi({
                                state: t
                            }) < n.total
                        })({
                            state: a(),
                            recordStore: o
                        })
                    },
                    {
                        inputComponents: c,
                        linkedComponents: l
                    } = ((e, t) => {
                        const r = (0, D.uniqBy)(e.filter((e => {
                            let {
                                enabled: t
                            } = e;
                            return t
                        })), (e => {
                            let {
                                id: t
                            } = e;
                            return t
                        }));
                        return {
                            inputComponents: Rc(r),
                            linkedComponents: wc(r, t)
                        }
                    })(t, Object.keys(s)),
                    d = c.length + l.length ? i((e => {
                        let {
                            getState: t,
                            inputComponents: r,
                            linkedComponents: n,
                            datasetId: o,
                            logger: a,
                            shouldEnableLinkedComponent: i
                        } = e;
                        return () => {
                            const e = t();
                            if (!on(e)) return;
                            const s = cn(e);
                            r.forEach((e => {
                                Sc(e, s, a, o)
                            })), n.forEach((e => {
                                const {
                                    action: t
                                } = e.connectionConfig.events.onClick, r = i[t]();
                                Sc(e, r, a, o)
                            }))
                        }
                    })({
                        getState: a,
                        inputComponents: c,
                        linkedComponents: l,
                        datasetId: n,
                        logger: r,
                        shouldEnableLinkedComponent: s
                    })) : D.noop;
                return d
            },
            Pc = {
                SHORT_DATE: "SHORT_DATE",
                MEDIUM_DATE: "MEDIUM_DATE",
                LONG_DATE: "LONG_DATE",
                FULL_DATE: "FULL_DATE",
                SHORT_DATE_TIME: "SHORT_DATE_TIME",
                LONG_DATE_TIME: "LONG_DATE_TIME",
                FULL_DATE_TIME: "FULL_DATE_TIME",
                MEDIUM_TIME_12: "MEDIUM_TIME_12",
                MEDIUM_TIME_24: "MEDIUM_TIME_24",
                LONG_TIME_12: "LONG_TIME_12",
                LONG_TIME_24: "LONG_TIME_24",
                HOUR_ONLY: "HOUR_ONLY",
                MINUTE_ONLY: "MINUTE_ONLY",
                YEAR_ONLY: "YEAR_ONLY",
                MONTH_ONLY: "MONTH_ONLY",
                SHORT_MONTH_ONLY: "SHORT_MONTH_ONLY",
                DAY_ONLY: "DAY_ONLY"
            },
            Nc = (new Set([Pc.SHORT_DATE_TIME, Pc.LONG_DATE_TIME, Pc.FULL_DATE_TIME, Pc.MEDIUM_TIME_12, Pc.MEDIUM_TIME_24, Pc.LONG_TIME_12, Pc.LONG_TIME_24, Pc.HOUR_ONLY, Pc.MINUTE_ONLY]), {
                [Pc.SHORT_DATE]: {
                    day: "numeric",
                    month: "numeric",
                    year: "2-digit"
                },
                [Pc.MEDIUM_DATE]: {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                },
                [Pc.LONG_DATE]: {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                },
                [Pc.FULL_DATE]: {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    weekday: "long"
                },
                [Pc.SHORT_DATE_TIME]: {
                    day: "numeric",
                    month: "numeric",
                    year: "2-digit",
                    hour: "numeric",
                    minute: "numeric"
                },
                [Pc.LONG_DATE_TIME]: {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric"
                },
                [Pc.FULL_DATE_TIME]: {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    weekday: "long",
                    timeZoneName: "short"
                },
                [Pc.MEDIUM_TIME_12]: {
                    minute: "numeric",
                    hour: "numeric",
                    hour12: !0
                },
                [Pc.MEDIUM_TIME_24]: {
                    minute: "numeric",
                    hour: "numeric",
                    hour12: !1
                },
                [Pc.LONG_TIME_12]: {
                    minute: "numeric",
                    hour: "numeric",
                    second: "numeric",
                    hour12: !0
                },
                [Pc.LONG_TIME_24]: {
                    minute: "numeric",
                    hour: "numeric",
                    second: "numeric",
                    hour12: !1
                },
                [Pc.HOUR_ONLY]: {
                    hour: "numeric"
                },
                [Pc.MINUTE_ONLY]: {
                    minute: "numeric"
                },
                [Pc.YEAR_ONLY]: {
                    year: "numeric"
                },
                [Pc.MONTH_ONLY]: {
                    month: "long"
                },
                [Pc.SHORT_MONTH_ONLY]: {
                    month: "short"
                },
                [Pc.DAY_ONLY]: {
                    weekday: "long"
                }
            }),
            Cc = ({
                locale: e,
                timeZone: t
            } = {}) => {
                if (!e) throw new Error('A "locale" parameter is required for wixFormatting');
                return {
                    formatDateTime(r, n, {
                        locale: o,
                        timeZone: a
                    } = {}) {
                        const i = { ...Nc[n],
                            timeZone: a || t
                        };
                        return new Intl.DateTimeFormat(o || e, i).format(r)
                    },
                    dateFormats: Pc
                }
            },
            bc = e => (0, D.isEqual)(!1, e);

        function Dc(e, t) {
            return (0, D.mapValues)(t, ((t, r) => e(r).map((e => function(e, t) {
                switch (e) {
                    case "number":
                        return Number(t);
                    case "boolean":
                        if ("string" == typeof t) return "true" === t.toLowerCase() || "1" === t.toLowerCase();
                        break;
                    case "text":
                        if (null != t && "function" == typeof t.toString) return t.toString()
                }
                return t
            }(e, t))).getOrElse(t)))
        }
        const Ac = function(e, t, r, n, o, a, i, s) {
                const {
                    logger: c,
                    errorReporting: l,
                    breadcrumbReporting: d
                } = U, u = (e, t) => d(t, Ye.with({
                    category: "effects",
                    message: e,
                    data: {
                        datasetId: o
                    }
                }));

                function p(e, r) {
                    t.onCurrentRecordModified(r, e)
                }

                function f(e) {
                    for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) r[n - 1] = arguments[n];
                    return l(i, S.withMessage(`Dataset ${e} event execution failed`))(e, ...r)
                }

                function h() {
                    return Promise.all(t.onRecordsLoaded())
                }
                const m = e => {
                    throw new P(e, {
                        code: "DS_OPERATION_FAILED"
                    })
                };
                return {
                    goToRecordByIndex: (t, r, n) => ({
                        run: u("goToRecordByIndex", (async function() {
                            let o;
                            di({
                                recordStore: e
                            }) && await Ri({
                                index: r,
                                recordStore: e
                            });
                            try {
                                o = (e => {
                                    let {
                                        recordStore: t,
                                        index: r
                                    } = e;
                                    const {
                                        total: n,
                                        loaded: o
                                    } = t().fold((e => {
                                        throw e
                                    }), (e => e.getDatasetSize()));
                                    return Math.max(Math.min(r, Math.max(n, o) - 1), 0)
                                })({
                                    recordStore: e,
                                    index: r
                                })
                            } catch (e) {
                                m(e)
                            }
                            if (t !== o || n) {
                                const t = await (a = o, e().fold(m, (e => e.getRecords(a, 1))));
                                return t.matchWith({
                                    Empty: () => Ys.GoToIndexResult.NoRecord(),
                                    Results: e => {
                                        let {
                                            items: t
                                        } = e;
                                        return Ys.GoToIndexResult.Record(o, t[0])
                                    }
                                })
                            }
                            return Ys.GoToIndexResult.InvalidIndex();
                            var a
                        })),
                        isQueued: !0,
                        resultActionCreator: Ys.goToRecordByIndexResult
                    }),
                    setFieldsInCurrentRecord: (t, n, o) => ({
                        run: u("setFieldsInCurrentRecord", (function() {
                            const a = Dc(r, t);
                            return e().fold(m, (e => e.setFieldsValues(n, a, o).fold((e => {
                                throw e
                            }), (() => {}))))
                        })),
                        isQueued: !1
                    }),
                    revertChanges: (t, r) => ({
                        run: u("revertChanges", (function() {
                            e().chain((e => e.resetDraft(t, r))), p()
                        })),
                        isQueued: !1,
                        resultActionCreator: Ys.revertResult
                    }),
                    saveRecord: (t, r) => ({
                        run: u("saveRecord", (async function() {
                            return await (c.log(new Je(Je.types.DS_API.TRIGGERED, {
                                eventName: "beforeSave"
                            })), n("beforeSave").then((e => e.some(bc))).catch((e => ({
                                error: e
                            }))).then((e => {
                                if (e) throw new P(`Operation cancelled by user code. ${(0,D.isBoolean)(e)?"":e.error}`, {
                                    code: "DS_OPERATION_CANCELLED"
                                })
                            }))), e().fold((() => !1), (async e => {
                                if (e.hasDraft(t)) {
                                    ! function(e) {
                                        const t = a.filter((t => !t.isValid(e)));
                                        if (t.forEach((e => e.updateValidityIndication())), t.length) throw new P("Some of the elements validation failed", {
                                            code: "DS_VALIDATION_ERROR"
                                        })
                                    }(r);
                                    const n = await e.saveRecord(t);
                                    return f("afterSave", r, n), s.dispatch("afterSave", r, n), n
                                }
                            }))
                        })),
                        isQueued: !0,
                        resultActionCreator: Ys.saveRecordResult
                    }),
                    removeCurrentRecord: t => ({
                        run: u("removeCurrentRecord", (() => function(t) {
                            return e().fold(m, (e => e.removeRecord(t)))
                        }(t))),
                        isQueued: !0,
                        resultActionCreator: Ys.removeCurrentRecordResult
                    }),
                    newRecord: (t, r) => ({
                        run: u("newRecord", (() => function(t, r) {
                            return e().fold(m, (e => e.newRecord(t, r)))
                        }(t, r))),
                        isQueued: !0,
                        resultActionCreator: Ys.newRecordResult
                    }),
                    fireEvent: function(e) {
                        for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) r[n - 1] = arguments[n];
                        return {
                            run: u("fireEvent", (() => f(e, ...r))),
                            isQueued: !1
                        }
                    },
                    notifyIndexChange: e => ({
                        run: u("notifyIndexChange", (() => {
                            t.onCurrentIndexChanged(), f("currentIndexChanged", e)
                        })),
                        isQueued: !1
                    }),
                    notifyRecordSetLoaded: () => ({
                        run: u("notifyRecordSetLoaded", h),
                        isQueued: !0
                    }),
                    updateCurrentView: e => ({
                        run: u("updateCurrentView", (() => Promise.all(t.onCurrentViewChanged()))),
                        isQueued: !0,
                        resultActionCreator: Ys.updateCurrentViewResult
                    }),
                    refresh: (t, r, n) => ({
                        run: u("refresh", (async function() {
                            return e().fold(m, (async e => (e.reset(), n ? Ys.GoToIndexResult.Record(0, e.newRecord(0, r)) : e.getRecords(0, 1).then((e => e.matchWith({
                                Empty: () => Ys.GoToIndexResult.NoRecord(),
                                Results: e => {
                                    let {
                                        items: t
                                    } = e;
                                    return Ys.GoToIndexResult.Record(0, t[0])
                                }
                            }))))))
                        })),
                        isQueued: !0,
                        resultActionCreator: Ys.refreshResult
                    }),
                    updateComponents: (e, t) => ({
                        run: u("updateComponents", (() => {
                            p(e, t)
                        })),
                        isQueued: !1
                    })
                }
            },
            Fc = e => ui({
                state: e
            }),
            xc = e => Tn(e).shouldLoadUrl(),
            Lc = e => Rn(e).shouldLoadUrl(),
            Uc = e => {
                let {
                    getNextDynamicPageUrl: t,
                    getPreviousDynamicPageUrl: r
                } = e;
                const n = {
                        run: t,
                        isQueued: !0,
                        resultActionCreator: (e, t) => ({
                            type: Vr,
                            error: e,
                            payload: t
                        })
                    },
                    o = {
                        run: r,
                        isQueued: !0,
                        resultActionCreator: (e, t) => ({
                            type: $r,
                            error: e,
                            payload: t
                        })
                    },
                    a = e => {
                        let {
                            hasChangedToTrue: t
                        } = e;
                        const r = [];
                        return t(xc) && r.push(n), t(Lc) && r.push(o), r
                    };
                return e => (0, D.flatten)([a].map((t => t(e))))
            },
            Mc = /[^{}]+(?=\})/g,
            kc = /[^\dA-Za-z]/g,
            Gc = async e => {
                let {
                    dataProvider: t,
                    dynamicPagesData: {
                        dynamicPageData: r,
                        datasetConfig: {
                            dataset: {
                                sort: n,
                                collectionName: o
                            }
                        },
                        items: a
                    }
                } = e;
                const i = await t.getSort({
                        sort: n,
                        collectionId: o
                    }) || [],
                    {
                        dynamicUrl: s,
                        userDefinedFilter: c
                    } = r,
                    d = (0, Gn.aU)(a)[0],
                    {
                        fieldName: u,
                        fieldDefinition: p
                    } = qc({
                        dynamicUrl: s,
                        schema: t.getSchema(o)
                    }),
                    f = s && d ? p && (!(m = p).queryOperators || [l.AllowedFilterOperator.gt, l.AllowedFilterOperator.lt].every((e => m.queryOperators.includes(e)))) ? [u] : (h = s, h = (e => e.replace(/(\/{2,})/g, "/").replace(/^\//, ""))(h), {
                        fields: h.match(Mc) || [],
                        nonFields: h.replace(Mc, "").split(kc).filter((e => !!e))
                    }).fields : [];
                var h, m;
                const g = jc(i),
                    y = (0, D.difference)(f, g),
                    v = Bc([...i, ...Vc(y)]),
                    _ = [...g, ...y];
                return {
                    dynamicUrl: s,
                    userDefinedFilter: c,
                    dynamicUrlPatternFieldsValues: $c(d, _, f),
                    sort: v,
                    sortFields: _,
                    patternFields: f
                }
            },
            jc = e => (0, D.flatten)(e.map((e => Object.keys(e).map((e => e))))),
            Bc = e => e.reduce(((e, t) => Object.assign(e, t)), {}),
            Vc = e => e.map((e => ({
                [e]: "asc"
            }))),
            $c = (e, t, r) => {
                const n = r.concat(t);
                return r.length ? (0, D.pick)(e, n) : null
            },
            Wc = async e => {
                let {
                    dataProvider: t,
                    collectionName: r,
                    directionTowardSibling: n,
                    dynamicPagesData: o
                } = e;
                const {
                    dynamicUrl: a,
                    userDefinedFilter: i,
                    dynamicUrlPatternFieldsValues: s,
                    sort: c,
                    sortFields: l,
                    patternFields: d
                } = o ? await Gc({
                    dynamicPagesData: o,
                    dataProvider: t
                }) : {};
                if (null == a || !d.length) return null;
                const u = await t.getSibling({
                        collectionName: r,
                        sort: c,
                        sortFields: l,
                        directionTowardSibling: n,
                        fieldValues: s,
                        filter: i
                    }),
                    {
                        fieldName: p
                    } = qc({
                        dynamicUrl: a,
                        schema: t.getSchema(r)
                    });
                return u && p ? u[p] : void 0
            },
            qc = e => {
                let {
                    schema: t,
                    dynamicUrl: r
                } = e;
                const [n, o] = Object.entries(t.fields).find((e => {
                    let [t, n] = e;
                    return n.type === l.FieldType.pageLink && n.calculator.config.pattern === r
                })) || [];
                return {
                    fieldName: n,
                    fieldDefinition: o
                }
            },
            Hc = (e, t) => {
                try {
                    return zc(e(t))
                } catch (e) {
                    return Yc(e)
                }
            },
            zc = e => ({
                value: e,
                then: t => Hc(t, e),
                catch: () => zc(e)
            }),
            Yc = e => ({
                error: e,
                then: () => Yc(e),
                catch: t => Hc(t, e)
            }),
            Jc = {
                resolve: zc,
                reject: Yc
            },
            Kc = e => {
                let {
                    recordStore: t
                } = e;
                const {
                    logger: r
                } = U;
                return t().fold((() => Promise.resolve(tt.Maybe.Nothing())), (e => e.hasSeedData() ? (e => e.getSeedRecords().matchWith({
                    Empty: () => Jc.resolve(tt.Maybe.Nothing()),
                    Results: e => {
                        let {
                            items: t
                        } = e;
                        return Jc.resolve(tt.Maybe.Just(t[0]))
                    }
                }))(e) : r.log(new ze("dataset/pageReady/getData", (() => (e => e.seed().then((() => e.getRecords(0, 1).then((e => e.chain((e => {
                    let {
                        items: t
                    } = e;
                    return tt.Maybe.Just(t[0])
                })))))).catch((e => (r.logError(e, "Fetch initial data failed"), tt.Maybe.Nothing()))))(e))))))
            },
            Qc = e => {
                let {
                    shouldFetchInitialData: t,
                    recordStore: r,
                    store: n,
                    filter: o,
                    sort: a,
                    datasetIsDeferred: i,
                    modeIsSSR: s,
                    queueMicrotask: c,
                    datasetIsReal: l,
                    collectionId: d,
                    filterResolver: u,
                    dependencyManager: p,
                    getSchemas: f,
                    schemasLoading: h,
                    getUserFilterInitialData: m
                } = e;
                const g = () => {
                        const e = (i = n.getState(), Br.getUserFilterConnectionProps(i.config));
                        var i;
                        const s = t ? Kc({
                            recordStore: r
                        }) : Promise.resolve();
                        if (!(l && (null == e ? void 0 : e.length) > 0)) return s.then((e => Promise.resolve([e])));
                        const c = u(o).map((async t => {
                            const r = m();
                            if (r) return n.dispatch(zs(r)), r;
                            await h;
                            const o = f(),
                                i = o[d];
                            if (i) {
                                const r = await U.dataFetcher.fetchUserFilterInitialData({
                                    filter: t,
                                    sort: await Ko({
                                        datasetConfigSort: a,
                                        getSchema: () => i
                                    }),
                                    userFilterConnectionProps: e,
                                    schema: i,
                                    schemas: o
                                });
                                return n.dispatch(zs(r)), r
                            }
                        })).getOrElse(null);
                        return Promise.all([s, c])
                    },
                    y = p.getDependencyResolutionPromise(o),
                    v = i && ((e, t) => {
                        const {
                            promise: r,
                            resolve: n
                        } = new G;
                        return e || t(n), r
                    })(s, c),
                    {
                        waitingForUserInput: _,
                        resolveUserInputDependency: E
                    } = Bi(o) && (() => {
                        const {
                            promise: e,
                            resolve: t
                        } = new G;
                        return {
                            waitingForUserInput: e,
                            resolveUserInputDependency: t
                        }
                    })(),
                    I = [y, v, _].filter((e => Boolean(e)));
                return {
                    fetchingInitialData: I.length ? Promise.all(I).then(g) : g(),
                    resolveUserInputDependency: () => E && E()
                }
            },
            Xc = e => {
                let {
                    value: t,
                    fieldName: r,
                    record: n,
                    getFieldType: o
                } = e;
                const a = (e => {
                    let {
                        value: t,
                        currentValue: r,
                        fieldType: n
                    } = e;
                    return n === l.FieldType.date && va(t) ? Ra(t) : ya(r) && va(t) ? _a({
                        time: r,
                        date: t
                    }) : va(r) && ya(t) ? _a({
                        time: t,
                        date: r
                    }) : t
                })({
                    value: t,
                    currentValue: (0, D.get)(n, r),
                    fieldType: o(r).getOrElse(null)
                });
                (0, D.set)(n, r, a)
            },
            Zc = (e, t) => {
                const r = ["value", "checked"];
                return e.reduce(((e, n) => {
                    var o;
                    const a = (null == (o = n.connectionConfig) ? void 0 : o.properties) || {};
                    return r.forEach((r => {
                        (0, D.has)(a, r) && Xc({
                            value: n.getValue({
                                propPath: r
                            }),
                            fieldName: a[r].fieldName,
                            record: e,
                            getFieldType: t
                        })
                    })), e
                }), {})
            },
            el = (e, t, r) => {
                var n;
                return t === r || (null == (n = e[t]) ? void 0 : n.some((t => el(e, t, r))))
            },
            tl = e => {
                let {
                    components: t,
                    connectionsGraph: r,
                    updatedCompIds: n,
                    datasetIsReal: o
                } = e;
                const a = t.filter((e => (e => {
                    let {
                        component: t,
                        updatedCompIds: r,
                        datasetIsReal: n,
                        connectionsGraph: o
                    } = e;
                    if (r.length && n) {
                        const {
                            id: e
                        } = t;
                        return r.some((t => el(o, e, t) || el(o, t, e)))
                    }
                    return !0
                })({
                    component: e,
                    connectionsGraph: r,
                    updatedCompIds: n,
                    datasetIsReal: o
                })));
                return a.some((e => {
                    let {
                        role: t
                    } = e;
                    return t === Q
                })) ? t : a
            },
            rl = (e, t) => {
                let {
                    repeaterId: r,
                    itemId: n
                } = t;
                return [e, "componentId", r, "itemId", n].join("_")
            },
            nl = e => e.split("_componentId_")[0],
            ol = (e, t) => {
                const {
                    logger: r
                } = U;
                return (n, o, a) => {
                    const i = ((e, t) => (0, D.isNull)(e) && (0, D.isNull)(t))(n, o);
                    if (i) return void r.log(new S("onChangeHandler invoked with illegal arguments", {
                        extra: {
                            arguments: {
                                before: n,
                                after: o,
                                componentIdToExclude: a
                            }
                        }
                    }));
                    if ((e => (0, D.isNull)(e))(n)) return void t(Ys.refreshCurrentView()).catch((() => {}));
                    const s = mn(e());
                    if (((e, t) => (0, D.isNull)(t))(0, o)) return Ki(n, s) && t(Ys.refreshCurrentRecord()).catch((() => {})), void t(Ys.refreshCurrentView()).catch((() => {}));
                    if (((e, t) => Ki(e, t))(n, s)) {
                        const r = hi({
                            state: e()
                        });
                        t(Ys.setCurrentRecord(o, r, a)).catch((() => {}))
                    }
                }
            },
            al = e => {
                let {
                    detailsDatasetApis: t,
                    masterDatasetApi: r,
                    controllerConfig: n,
                    unsubscribeHandlers: o
                } = e;
                const {
                    logger: a
                } = U;
                t.forEach((e => {
                    const t = () => {
                        o.push(il({
                            masterDatasetApi: r,
                            masterDatasetConfig: n,
                            detailsDatasetApi: e
                        }))
                    };
                    try {
                        o.push(r.onReady(t))
                    } catch (e) {
                        a.log(new Ke(new P("The dataset cannot filter by the dynamic dataset because the field used to build this page's URL is empty", {
                            code: "DS_EMPTY_URL_FIELD",
                            cause: e
                        }), "error"))
                    }
                }))
            },
            il = e => {
                let {
                    masterDatasetConfig: t,
                    masterDatasetApi: r,
                    detailsDatasetApi: n
                } = e;
                const o = gr(t.dataset);
                let a, i;
                return o !== Ze && (a = r.onCurrentIndexChanged((() => n.onReady((() => n.refresh()))))), o !== Xe && (i = r.onItemValuesChanged((() => n.refresh()))), () => [a, i].forEach((e => null == e ? void 0 : e()))
            },
            {
                richText: sl
            } = l.FieldType,
            cl = {
                $text: e => e === sl ? "html" : "text"
            },
            ll = e => {
                let {
                    propName: t,
                    getFieldType: r
                } = e;
                return t in cl ? cl[t](r()) : t
            },
            dl = e => e.startsWith("$"),
            ul = e => ({
                id: e.id,
                role: e.role,
                isValidConnection: () => !0,
                bind: () => {},
                clear: () => e.clear(),
                hide: () => e.hide(),
                show: t => e.show(t),
                resetUserFilter: () => {},
                onRecordsLoaded: async () => {},
                onCurrentViewChanged: async () => {},
                onCurrentIndexChanged: async () => {},
                onCurrentRecordModified: async () => {}
            }),
            pl = e => !!e && Object.values(e).some((e => !(0, D.isEmpty)(e))),
            fl = (e, t, r) => {
                const {
                    logger: n,
                    platform: {
                        location: o,
                        utils: a,
                        executeTpaAction: i
                    }
                } = U, {
                    getState: s,
                    getFieldType: c,
                    wixFormatter: l,
                    modeIsLivePreview: d
                } = r, u = o => {
                    Pi({
                        currentRecord: mn(s()),
                        previousRecord: o,
                        component: e,
                        connectionConfig: t,
                        formatter: l,
                        modeIsLivePreview: d,
                        getFieldType: c,
                        logger: n,
                        recordStore: r.recordStore,
                        actions: r.actions
                    })
                }, p = e => e.matchWith({
                    Empty() {},
                    Loading() {},
                    Loaded(e) {
                        let {
                            url: t
                        } = e;
                        o.navigateTo(t)
                    }
                }), f = t => {
                    const {
                        datasetApi: s,
                        getState: c,
                        actions: l
                    } = r;
                    (0, D.forEach)(t, ((t, r) => {
                        let {
                            action: d,
                            postAction: u
                        } = t;
                        e.on(r, (async () => {
                            try {
                                if (d.startsWith("tpa/")) {
                                    const e = s.getCurrentItem();
                                    return void await i({
                                        currentItem: e,
                                        action: d
                                    })
                                }
                                if ("nextDynamicPage" === d) return p(Tn(c()));
                                if ("previousDynamicPage" === d) return p(Rn(c()));
                                if ("applyUserInputFilters" === d) return l.refresh();
                                if ("resetUserFilter" === d) return l.resetUserInputFilters();
                                const e = await Promise.resolve(s[d]());
                                if (u && u.navigate) {
                                    const t = ((e, t) => e.fieldName ? fa(t, e.fieldName) : e.linkObject ? a.links.toUrl(e.linkObject) : void 0)(u.navigate, e);
                                    o.navigateTo(t)
                                }
                            } catch (e) {
                                e instanceof w || n.log(new S(`${d} operation failed:`, {
                                    cause: e
                                }))
                            }
                        }))
                    }))
                };
                return { ...ul(e),
                    isValidConnection: () => pl(t),
                    bind() {
                        const {
                            events: n,
                            behaviors: o
                        } = t;
                        n && f(n), o && (t => {
                            const {
                                dispatcher: n,
                                eventListeners: {
                                    register: o
                                }
                            } = r;
                            t.forEach((t => {
                                let r = !1;
                                switch (t.type) {
                                    case "saveSuccessFeedback":
                                        o("beforeSave", (() => e.hide())), o("afterSave", (() => {
                                            e.show(), r = !0
                                        })), o("currentIndexChanged", (() => {
                                            r ? r = !1 : e.hide()
                                        })), o("itemValuesChanged", (() => e.hide()));
                                        break;
                                    case "saveFailureFeedback":
                                        o("beforeSave", (() => e.hide())), o("currentIndexChanged", (() => e.hide())), n.subscribe("datasetSaveError", (() => e.show()))
                                }
                            }))
                        })(o)
                    },
                    clear() {
                        const {
                            getFieldType: n
                        } = r, {
                            properties: o
                        } = t;
                        (0, D.forEach)(o, ((t, r) => {
                            const o = n(t.fieldName).getOrElse(void 0),
                                a = (e => e === ma ? [] : void 0)(o);
                            e.setValue(a, {
                                propPath: r,
                                fieldType: o,
                                binding: t
                            })
                        }))
                    },
                    async onRecordsLoaded() {
                        const {
                            behaviors: t
                        } = e.connectionConfig;
                        u(), t && t.forEach((t => {
                            "saveSuccessFeedback" === t.type && e.hide()
                        }))
                    },
                    async onCurrentViewChanged() {
                        u()
                    },
                    async onCurrentIndexChanged() {
                        u()
                    },
                    async onCurrentRecordModified(e) {
                        u(e)
                    }
                }
            };
        const hl = (e, t) => {
                return r = e, n = t, Object.defineProperties({}, { ...Object.getOwnPropertyDescriptors(r),
                    ...Object.getOwnPropertyDescriptors(n)
                });
                var r, n
            },
            ml = e => {
                const t = {
                    getValue: () => e.data,
                    setValue(t) {
                        e.data = t
                    },
                    clear() {
                        e.data = []
                    },
                    onItemReady(t) {
                        e.onItemReady(t)
                    },
                    onItemRemoved(t) {
                        e.onItemRemoved(t)
                    }
                };
                return hl(_l(e), t)
            },
            gl = e => "onChange" in e && ("value" in e || "checked" in e),
            yl = (e, t) => {
                const r = t.split("."),
                    n = r.slice(0, -1),
                    [o] = r.slice(-1);
                return {
                    obj: n.length > 0 ? (0, D.get)(e, n) : e,
                    prop: o
                }
            },
            vl = e => {
                if (!e || !e.parent) return;
                const {
                    parent: t
                } = e;
                return t.type === it.Repeater ? ml(t) : vl(t)
            },
            _l = e => {
                const {
                    connectionConfig: t,
                    uniqueId: r,
                    type: n,
                    role: o,
                    id: a
                } = e, i = !!e.hidden, s = {
                    id: r,
                    connectionConfig: t,
                    nickname: a,
                    type: n,
                    role: o,
                    isInput: gl(e),
                    parentRepeater: vl(e),
                    getValue(t) {
                        let {
                            propPath: r
                        } = void 0 === t ? {} : t;
                        if (r) {
                            const {
                                obj: t,
                                prop: n
                            } = yl(e, r);
                            return t[n]
                        }
                    },
                    setValue(t, r) {
                        let {
                            propPath: n,
                            fieldType: o,
                            binding: a
                        } = void 0 === r ? {} : r;
                        if (n) {
                            const {
                                obj: r,
                                prop: i
                            } = yl(e, n);
                            r[i] = "reference" === o && (e => (0, D.isObject)(e) && (0, D.has)(e, "_id"))(t) ? t._id : t;
                            const s = null == a ? void 0 : a.linkTarget;
                            (e => e === l.FieldType.url || e === l.FieldType.pageLink)(o) && s && (r.target = s)
                        }
                    },
                    setOptions(t) {
                        "options" in e && (e.options = t)
                    },
                    hide() {
                        e.hidden || null == e.hide || e.hide()
                    },
                    show(t) {
                        let {
                            ignoreInitiallyHidden: r
                        } = void 0 === t ? {
                            ignoreInitiallyHidden: !1
                        } : t;
                        !e.hidden || r && i || null == e.show || e.show()
                    },
                    clear(e) {
                        s.setValue(void 0, e)
                    },
                    get enabled() {
                        return !("enabled" in e) || e.enabled
                    },
                    enable() {
                        "enable" in e && !s.enabled && e.enable()
                    },
                    disable() {
                        "disable" in e && s.enabled && e.disable()
                    },
                    isValid: () => !("validity" in e) || "object" != typeof e.validity || e.validity.valid,
                    updateValidityIndication() {
                        "updateValidityIndication" in e && e.updateValidityIndication()
                    },
                    resetValidityIndication() {
                        "resetValidityIndication" in e && e.resetValidityIndication()
                    },
                    onChange(e) {
                        s.on("onChange", e)
                    },
                    on(t, r) {
                        var n;
                        null == (n = e[t]) || n.call(e, r)
                    }
                };
                return "placeholder" in e && Object.defineProperty(s, "placeholder", {
                    get: () => e.placeholder
                }), s
            },
            El = e => {
                switch (e.role) {
                    case X:
                        return (e => {
                            const t = {
                                setValue(t, r) {
                                    let {
                                        fieldType: n,
                                        propPath: o = "text",
                                        binding: a
                                    } = void 0 === r ? {} : r;
                                    if (n === l.FieldType.url) {
                                        const r = (null == a ? void 0 : a.linkTarget) || "_blank";
                                        e.text = `<a href=${t} target="${r}" style="text-decoration: underline">${t}</a>`;
                                        const {
                                            html: n
                                        } = e;
                                        return e.text = "", void(e.html = (0, D.unescape)(n))
                                    }
                                    n !== l.FieldType.richText ? e[o] = t : e.html = t
                                },
                                clear(t) {
                                    let {
                                        fieldType: r
                                    } = void 0 === t ? {} : t;
                                    const n = r === l.FieldType.richText || r === l.FieldType.url ? "html" : "text";
                                    e[n] = ""
                                }
                            };
                            return hl(_l(e), t)
                        })(e);
                    case ce:
                    case J:
                        return ml(e);
                    case oe:
                        return (e => {
                            const t = {
                                get nextEnabled() {
                                    return e.nextEnabled
                                },
                                set nextEnabled(t) {
                                    e.nextEnabled = t
                                },
                                get previousEnabled() {
                                    return e.previousEnabled
                                },
                                set previousEnabled(t) {
                                    e.previousEnabled = t
                                },
                                setValue(t) {
                                    e.rows = t
                                },
                                getValue: () => e.rows,
                                set rows(e) {
                                    t.setValue(e)
                                },
                                get rows() {
                                    return e.rows
                                },
                                get columns() {
                                    return e.columns
                                },
                                clear() {
                                    e.rows = [], e.dataFetcher = void 0
                                },
                                set dataFetcher(t) {
                                    e.dataFetcher = t
                                },
                                refresh: () => e.refresh(),
                                onCellSelect: t => e.onCellSelect(t),
                                onRowSelect: t => e.onRowSelect(t)
                            };
                            return hl(_l(e), t)
                        })(e);
                    case se:
                        return (e => {
                            const t = {
                                isValid(t) {
                                    const {
                                        connectionConfig: r,
                                        validity: n
                                    } = e;
                                    if (n.valid) return !0;
                                    if ((0, D.some)((0, D.values)((0, D.omit)(n, ["valid", "valueMissing"])), (e => e))) return !1;
                                    const o = (0, D.get)(r, "properties.value.fieldName") || "";
                                    return !(0, D.isEmpty)(fa(t, o))
                                },
                                set fileType(t) {
                                    e.fileType = t
                                },
                                get fileType() {
                                    return e.fileType
                                },
                                getValue: () => e.value,
                                clear() {
                                    e.reset()
                                },
                                uploadFiles: async () => e.uploadFiles()
                            };
                            return hl(_l(e), t)
                        })(e);
                    case ge:
                        return (e => {
                            const t = _l(e),
                                r = {
                                    setValue(r, n) {
                                        r ? t.setValue(r, n) : e.clear()
                                    }
                                };
                            return hl(t, r)
                        })(e);
                    case Z:
                        return (e => {
                            e.clickAction && (e.clickAction = e.clickAction);
                            const t = {
                                setValue(t) {
                                    e.items = t
                                },
                                getValue: () => e.items,
                                clear() {
                                    e.items = []
                                },
                                set currentIndex(t) {
                                    try {
                                        e.galleryCapabilities.hasCurrentItem && (e.currentIndex = t)
                                    } catch {}
                                },
                                get currentIndex() {
                                    return e.currentIndex
                                },
                                get clickAction() {
                                    return e.clickAction
                                },
                                onCurrentItemChanged(t) {
                                    e.galleryCapabilities.hasCurrentItem && e.onCurrentItemChanged((e => {
                                        let {
                                            item: r,
                                            itemIndex: n
                                        } = e;
                                        return t(r, n)
                                    }))
                                }
                            };
                            return hl(_l(e), t)
                        })(e);
                    case de:
                        return (e => {
                            const t = {
                                get currentPage() {
                                    return e.currentPage
                                },
                                set currentPage(t) {
                                    e.currentPage = t
                                },
                                get totalPages() {
                                    return e.totalPages
                                },
                                set totalPages(t) {
                                    e.totalPages = t
                                },
                                get nextEnabled() {
                                    return e.nextEnabled
                                },
                                set nextEnabled(t) {
                                    e.nextEnabled = t
                                },
                                get previousEnabled() {
                                    return e.previousEnabled
                                },
                                set previousEnabled(t) {
                                    e.previousEnabled = t
                                },
                                get navigationType() {
                                    return e.navigationType
                                },
                                set navigationType(t) {
                                    e.navigationType = t
                                },
                                onNextClicked(t) {
                                    e.onNextClicked(t)
                                },
                                onPreviousClicked(t) {
                                    e.onPreviousClicked(t)
                                }
                            };
                            return hl(_l(e), t)
                        })(e);
                    case pe:
                        return (e => {
                            const t = {
                                setValue(t) {
                                    e.location = t
                                },
                                getValue: () => e.location,
                                clear() {
                                    e.markers = []
                                },
                                set location(t) {
                                    e.location = t
                                },
                                get location() {
                                    return e.location
                                },
                                set markers(t) {
                                    e.markers = t
                                },
                                get markers() {
                                    return e.markers
                                },
                                setCenter(t) {
                                    e.setCenter(t)
                                }
                            };
                            return hl(_l(e), t)
                        })(e);
                    case Re:
                        return (e => {
                            const t = {
                                setValue(t) {
                                    e.value = t
                                },
                                getValue: () => e.value,
                                clear() {
                                    e.value = []
                                },
                                setBounds(t, r) {
                                    e.min = t, e.max = r
                                },
                                getBounds: () => [e.min, e.max]
                            };
                            return hl(_l(e), t)
                        })(e);
                    default:
                        return _l(e)
                }
            },
            Il = e => t => {
                const r = [],
                    n = [];
                (0, D.uniq)(t.map((e => {
                    let {
                        role: t
                    } = e;
                    return t
                }))).forEach((t => {
                    if (t === K) {
                        return void(e("@" + t) || []).forEach((e => e && n.push(e)))
                    }
                    if (t === le) {
                        const t = e("@" + le) || [],
                            [n] = Array.isArray(t) ? t : [t],
                            o = e("Document");
                        if (o && n) {
                            const e = new Proxy(o, {
                                get: (e, t) => "connectionConfig" === t ? n.connectionConfig : "role" === t ? le : e[t]
                            });
                            r.push(e)
                        }
                        return
                    }(e("@" + t) || []).forEach((e => {
                        e && r.push(e)
                    }))
                }));
                return {
                    components: r.map((e => El(e))),
                    detailsDatasetApis: n
                }
            },
            Tl = (e, t, r) => {
                const {
                    logger: n,
                    errorReporting: o
                } = U, {
                    getState: a,
                    getFieldType: i,
                    actions: s,
                    modeIsLivePreview: c
                } = r, l = o => {
                    Pi({
                        currentRecord: mn(a()),
                        previousRecord: o,
                        component: e,
                        connectionConfig: t,
                        modeIsLivePreview: c,
                        getFieldType: i,
                        logger: n,
                        recordStore: r.recordStore,
                        actions: r.actions
                    })
                }, d = () => {
                    const t = s.isCurrentRecordPristine(a()),
                        r = s.isCurrentRecordNew(a());
                    t && r && e.resetValidityIndication()
                };
                return { ...ul(e),
                    isValidConnection: () => pl(t),
                    bind() {
                        (() => {
                            const {
                                id: r,
                                role: n
                            } = e, {
                                properties: c
                            } = t;
                            e.onChange(o((e => {
                                const t = c.checked ? "checked" : "value",
                                    o = c[t].fieldName,
                                    l = mn(a()),
                                    d = Qa({
                                        value: e.target[t],
                                        currentValue: fa(l, o),
                                        fieldType: i(o).getOrElse(void 0),
                                        fieldName: o,
                                        utils: {
                                            referenceFetcher: (e, t) => s.fetchRecordById(e, t).getOrElse(e)
                                        },
                                        role: n
                                    });
                                s.setFieldInCurrentRecordAndSynchronize(o, d, r)
                            }), S.withMessage("Input adapter onChange - setting value to record failed")))
                        })(), t.filters && e.onChange(o(s.refresh, S.withMessage("Input adapter onChange - sync actions failed")))
                    },
                    async onRecordsLoaded() {
                        l(), d()
                    },
                    async onCurrentViewChanged() {
                        l(), d()
                    },
                    async onCurrentIndexChanged() {
                        l(), d()
                    },
                    async onCurrentRecordModified(e) {
                        l(e), d()
                    }
                }
            },
            Rl = {
                start: 0,
                end: 0
            },
            wl = (e, t) => {
                let {
                    valueSource: r,
                    labelField: n,
                    dataTransformer: o
                } = t;
                const a = o(e, r);
                return {
                    value: a,
                    label: n ? o(e, {
                        type: "field",
                        fieldName: n
                    }) : a
                }
            },
            Sl = e => (0, D.get)(e, "properties.value.fieldName") || "",
            Ol = (e, t, r) => {
                const {
                    errorReporting: n
                } = U, {
                    actions: o,
                    recordStore: a,
                    getState: i
                } = r, s = t.userInputFilter.fieldName;
                e.onChange(n((async () => {
                    const t = Sn(i()),
                        n = (c = i(), Nr.selectIsApplyUserInputFiltersActionBindingPresent(c.records));
                    var c;
                    if (t || n) return;
                    await o.refresh();
                    const l = a().fold((() => {}), (e => e.getDatasetSize().total)),
                        d = Xr(i());
                    (e => {
                        let {
                            state: t,
                            numberOfResults: r,
                            filteredBy: n,
                            componentType: o,
                            fieldType: a,
                            schema: i
                        } = e;
                        const {
                            logger: s,
                            platform: {
                                settings: {
                                    env: {
                                        editor: c
                                    }
                                }
                            }
                        } = U, l = rn(t), d = Xr(t);
                        if (!d) return;
                        const u = i.getOrElse({
                            displayName: d
                        }).displayName;
                        s.log(new kn({
                            id: c ? 366 : 371,
                            collectionId: d,
                            collectionName: u,
                            datasetMode: l,
                            numberOfResults: r,
                            filteredBy: n,
                            componentType: o,
                            fieldType: a
                        }))
                    })({
                        filteredBy: s,
                        numberOfResults: l,
                        state: r.getState(),
                        componentType: e.type,
                        fieldType: r.getFieldType(s).getOrElse(void 0),
                        schema: r.getSchema(d)
                    })
                }), S.withMessage("Filter input adapter onChange failed")))
            },
            {
                NOT_EQUALS: Pl,
                EXCLUDES_ANY: Nl
            } = Oe,
            Cl = (e, t, r) => {
                const {
                    i18n: n
                } = U, {
                    getState: o
                } = r, a = t => {
                    const r = Array.isArray(e.getValue({
                        propPath: t
                    })) ? [] : Be;
                    e.setValue(r, {
                        propPath: t
                    })
                }, i = e => [Pl, Nl].includes(e) ? n.t("USER_INPUT_FILTER_OPTION_NONE") : n.t("USER_INPUT_FILTER_OPTION_RESET_ALL");
                return { ...ul(e),
                    isValidConnection: () => Dr(t),
                    bind() {
                        Ol(e, t, r);
                        const {
                            userInputFilter: {
                                prop: n,
                                fieldName: s,
                                condition: c
                            }
                        } = t, l = (e => {
                            var t;
                            return null == (t = Dn(o())) ? void 0 : t.find((t => t.fieldName === e && Ve.includes(t.role)))
                        })(s);
                        l && (e.setOptions((e => {
                            let {
                                component: t,
                                prop: r,
                                userFilterInitialData: n,
                                condition: o
                            } = e;
                            return [!Array.isArray(t.getValue({
                                propPath: r
                            })) && {
                                value: Be,
                                label: i(o)
                            }, ...n.options.map((e => ({
                                value: String(e),
                                label: String(e)
                            })))].filter(Boolean)
                        })({
                            component: e,
                            prop: n,
                            userFilterInitialData: l,
                            condition: c
                        })), (e => "placeholder" in e)(e) || a(n))
                    },
                    resetUserFilter() {
                        const {
                            userInputFilter: {
                                prop: r
                            }
                        } = t;
                        e.getValue({
                            propPath: r
                        }) && a(r)
                    }
                }
            },
            bl = new Map([
                [ce, (e, t, r) => {
                    const {
                        errorReporting: n
                    } = U, {
                        controllerFactory: o,
                        controllerStore: a
                    } = r, i = [], s = (t, r) => {
                        const n = {
                                repeaterId: e.id,
                                itemId: r._id
                            },
                            s = o.createScopedDataset({
                                datasetScope: n,
                                fixedItem: r
                            });
                        a.setController(n, s);
                        const c = Il(t.scoped),
                            l = s.pageReady(c);
                        i.push(l)
                    }, c = t => {
                        const r = {
                            repeaterId: e.id,
                            itemId: t._id
                        };
                        a.removeController(r)
                    }, l = async () => {
                        const {
                            actions: t,
                            getState: n,
                            modeIsLivePreview: o
                        } = r, {
                            items: a
                        } = await t.fetchCurrentItems(n());
                        o && 0 === a.length || (e.setValue(a), await Promise.all(i), i.splice(0))
                    };
                    return { ...ul(e),
                        bind() {
                            e.onItemReady(n(s, S.withMessage("Repeater adapter onItemReady failed"))), e.onItemRemoved(n(c, S.withMessage("Repeater adapter onItemRemoved failed")))
                        },
                        onRecordsLoaded: async () => l(),
                        async onCurrentViewChanged() {
                            l()
                        },
                        async onCurrentIndexChanged() {},
                        async onCurrentRecordModified() {
                            const {
                                getState: t
                            } = r, n = mn(t()), o = e.getValue();
                            if (o && o.length > 0) {
                                const t = o.map((e => e._id === n._id ? n : e));
                                e.setValue(t)
                            }
                        }
                    }
                }],
                [J, (e, t, r) => {
                    const {
                        errorReporting: n
                    } = U, {
                        controllerFactory: o,
                        controllerStore: a
                    } = r, i = (t, r) => {
                        const n = {
                                repeaterId: e.id,
                                itemId: r._id
                            },
                            i = o.createScopedDetailsDataset({
                                datasetScope: n
                            });
                        a.setController(n, i);
                        const s = Il(t.scoped);
                        i.pageReady(s)
                    }, s = t => {
                        const r = {
                            repeaterId: e.id,
                            itemId: t._id
                        };
                        a.removeController(r)
                    };
                    return { ...ul(e),
                        bind() {
                            e.onItemReady(n(i, S.withMessage("Details repeater adapter onItemReady failed"))), e.onItemRemoved(n(s, S.withMessage("Details repeater adapter onItemRemoved failed")))
                        }
                    }
                }],
                [Q, (e, t, r) => {
                    const {
                        errorReporting: n
                    } = U, {
                        actions: o
                    } = r;
                    return { ...ul(e),
                        isValidConnection: () => pl(t),
                        bind() {
                            e.onChange(n(o.refresh, S.withMessage("Filter input adapter onChange failed")))
                        },
                        resetUserFilter() {
                            const t = Oi(e);
                            e.setValue((e => {
                                switch (e.type) {
                                    case wi:
                                        return !1;
                                    case Si:
                                        return "";
                                    default:
                                        return null
                                }
                            })(e), {
                                propPath: t
                            })
                        }
                    }
                }],
                [ve, Cl],
                [Ie, Cl],
                [Ee, Cl],
                [Te, Cl],
                [_e, (e, t, r) => {
                    const n = () => {
                        const {
                            userInputFilter: {
                                prop: r
                            }
                        } = t;
                        e.setValue(null, {
                            propPath: r
                        })
                    };
                    return { ...ul(e),
                        isValidConnection: () => Dr(t),
                        bind() {
                            Ol(e, t, r), n()
                        },
                        resetUserFilter() {
                            n()
                        }
                    }
                }],
                [Re, (e, t, r) => {
                    const {
                        getState: n
                    } = r, o = t => {
                        var r;
                        const o = null == (r = Dn(n())) ? void 0 : r.find((r => r.fieldName === t && r.role === e.role));
                        if (!o) return null;
                        const {
                            min: a,
                            max: i
                        } = o;
                        return void 0 === a || void 0 === i ? null : {
                            min: a,
                            max: i
                        }
                    }, a = r => {
                        let {
                            firstRender: n,
                            min: o,
                            max: a
                        } = r;
                        const {
                            userInputFilter: {
                                prop: i
                            }
                        } = t;
                        n && e.setBounds(o, a), e.setValue([o, a], {
                            propPath: i
                        })
                    };
                    return { ...ul(e),
                        isValidConnection: () => Dr(t),
                        bind() {
                            const n = o(t.userInputFilter.fieldName);
                            n && (Ol(e, t, r), a({
                                firstRender: !0,
                                ...n
                            }))
                        },
                        resetUserFilter() {
                            const e = o(t.userInputFilter.fieldName);
                            e && a({
                                firstRender: !1,
                                ...e
                            })
                        }
                    }
                }],
                [oe, (e, t, r) => {
                    const {
                        errorReporting: n
                    } = U, {
                        datasetApi: o,
                        getState: a,
                        modeIsLivePreview: i,
                        actions: s
                    } = r;
                    let c = Rl;
                    const l = e => c = e,
                        d = () => l(Rl),
                        u = e => {
                            let {
                                fetchRows: t,
                                logGridValue: r,
                                disableNavigation: n = !1
                            } = e;
                            return async (e, o) => {
                                const {
                                    items: a,
                                    datasetSize: i
                                } = await t(e, o - e);
                                return r(a), {
                                    pageRows: a,
                                    totalRowsCount: n ? a.length : i.total
                                }
                            }
                        },
                        p = t => {
                            let {
                                fetchRows: r,
                                logGridValue: n
                            } = t;
                            return async t => {
                                let {
                                    direction: o,
                                    limit: a
                                } = t, {
                                    start: i,
                                    end: s
                                } = c;
                                "previous" === o ? (s = i, i -= a) : (i = s, s += a);
                                const {
                                    items: d,
                                    datasetSize: u
                                } = await r(i, s - i);
                                return l({
                                    start: i,
                                    end: s
                                }), e.nextEnabled = !!u.cursor || s < u.loaded, e.previousEnabled = i > 0, n(d), {
                                    pageRows: d,
                                    totalRowsCount: u.total || void 0
                                }
                            }
                        },
                        f = t => {
                            const r = [],
                                n = e.columns;
                            (0, D.forEach)(t, (e => {
                                const t = {};
                                (0, D.forEach)(n, (r => {
                                    t[r.label] = (0, D.get)(e, r.dataPath)
                                })), r.push(t)
                            }))
                        };
                    return { ...ul(e),
                        bind() {
                            s.getInitialData().chain((t => {
                                let {
                                    items: r
                                } = t;
                                e.rows = r
                            }));
                            const t = mn(a());
                            if (i && !t) return;
                            const r = s.isCursorPaging();
                            e.dataFetcher = r ? {
                                type: "directional",
                                value: p({
                                    fetchRows: s.fetch,
                                    logGridValue: f,
                                    component: e
                                })
                            } : {
                                type: "pages",
                                value: u({
                                    fetchRows: s.fetch,
                                    logGridValue: f
                                })
                            }, e.onCellSelect(n((e => {
                                let {
                                    cellRowIndex: t
                                } = e;
                                o.setCurrentItemIndex(t)
                            }), S.withMessage("Grid adapter onCellSelect failed"))), e.onRowSelect(n((e => {
                                let {
                                    rowIndex: t
                                } = e;
                                o.setCurrentItemIndex(t)
                            }), S.withMessage("Grid adapter onRowSelect failed"))), (() => {
                                const t = {};
                                e.columns.forEach((e => {
                                    let {
                                        label: r,
                                        dataPath: n,
                                        linkPath: o
                                    } = e;
                                    (n || o) && (t[r] = Object.assign(n ? {
                                        dataPath: n
                                    } : {}, o ? {
                                        linkPath: o
                                    } : {}))
                                }))
                            })()
                        },
                        async onCurrentRecordModified() {
                            e.refresh()
                        },
                        async onRecordsLoaded() {
                            d(), e.refresh()
                        },
                        async onCurrentViewChanged() {
                            d(), e.refresh()
                        }
                    }
                }],
                [re, (e, t, r) => {
                    const {
                        logger: n
                    } = U, {
                        actions: o,
                        getFieldType: a,
                        getSchema: i
                    } = r, s = async () => {
                        var r;
                        const {
                            role: s
                        } = e, c = (e => {
                            const t = e[0];
                            return 1 === e.length && "" === t.label && "" === t.value ? [] : e
                        })(await (async (e, t) => {
                            if ("field" === t.type && a(t.fieldName).map((e => "reference" === e)).getOrElse(!1)) {
                                const {
                                    fieldName: r
                                } = t;
                                return i().chain((t => {
                                    const n = Kn(r, t);
                                    return i(n).map(Qn).map((async t => {
                                        const {
                                            items: n
                                        } = await o.fetchAll(r), a = n.map((r => wl(r, {
                                            valueSource: {
                                                type: "field",
                                                fieldName: "_id"
                                            },
                                            labelField: t,
                                            dataTransformer: e
                                        })));
                                        return (0, D.orderBy)(a, [e => e.label.toLowerCase()])
                                    }))
                                })).getOrElse(Promise.resolve([]))
                            } {
                                const {
                                    items: r
                                } = await o.fetchAll(), n = r.map((r => wl(r, {
                                    valueSource: t,
                                    dataTransformer: e
                                })));
                                return (0, D.uniqBy)(n, "value")
                            }
                        })(((e, t) => "expression" === t.type ? li({
                            expression: t.expression,
                            record: e,
                            prop: "value",
                            role: s,
                            logger: n
                        }).value : Ca({
                            value: fa(e, t.fieldName),
                            role: s
                        })), null != (r = t.expressions) && r.value ? {
                            type: "expression",
                            expression: t.expressions.value.expression
                        } : {
                            type: "field",
                            fieldName: t.properties.value.fieldName
                        }));
                        e.setOptions(c)
                    };
                    return { ...ul(e),
                        isValidConnection: () => pl(t),
                        clear() {
                            e.setOptions([])
                        },
                        async onRecordsLoaded() {
                            s()
                        },
                        async onCurrentRecordModified() {
                            s()
                        }
                    }
                }],
                [ne, (e, t, r) => {
                    const {
                        logger: n
                    } = U, {
                        actions: o
                    } = r, a = async () => {
                        var r;
                        const {
                            role: a
                        } = e, i = (e => {
                            const t = e[0];
                            return 1 === e.length && "" === t.label && "" === t.value ? [] : e
                        })(await (async (e, t) => {
                            const {
                                items: r
                            } = await o.fetchAll(), n = r.map((r => ((e, t) => {
                                let {
                                    valueSource: r,
                                    labelField: n,
                                    dataTransformer: o
                                } = t;
                                const a = o(e, r);
                                return {
                                    value: a,
                                    label: n ? o(e, {
                                        type: "field",
                                        fieldName: n
                                    }) : a
                                }
                            })(r, {
                                valueSource: t,
                                dataTransformer: e
                            })));
                            return (0, D.uniqBy)(n, "value")
                        })(((e, t) => "expression" === t.type ? li({
                            expression: t.expression,
                            record: e,
                            prop: "options",
                            role: a,
                            logger: n
                        }).value : Ca({
                            value: fa(e, t.fieldName),
                            role: a
                        })), null != (r = t.expressions) && r.value ? {
                            type: "expression",
                            expression: t.expressions.options.expression
                        } : {
                            type: "field",
                            fieldName: t.properties.options.fieldName
                        }));
                        e.setOptions(i)
                    };
                    return { ...ul(e),
                        isValidConnection: () => pl(t),
                        clear() {
                            e.setOptions([])
                        },
                        async onRecordsLoaded() {
                            a()
                        },
                        async onCurrentRecordModified() {
                            a()
                        }
                    }
                }],
                [me, (e, t, r) => {
                    const {
                        logger: n
                    } = U, {
                        actions: o,
                        modeIsLivePreview: a
                    } = r, i = async () => {
                        const {
                            role: r
                        } = e, {
                            items: i
                        } = await o.fetchAll(), s = i.reduce(((e, o) => {
                            var a;
                            if (null != (a = t.expressions) && a.options) {
                                const {
                                    value: a
                                } = li({
                                    expression: t.expressions.options.expression,
                                    record: o,
                                    prop: "options",
                                    role: r,
                                    logger: n
                                });
                                return e.push({
                                    value: a,
                                    label: a
                                }), e
                            }
                            const {
                                properties: {
                                    options: {
                                        fieldName: i
                                    }
                                }
                            } = t, s = Ca({
                                value: fa(o, i),
                                role: r
                            });
                            return s && e.push({
                                value: s,
                                label: s
                            }), e
                        }), []);
                        a && 0 === s.length || e.setOptions(s)
                    };
                    return { ...ul(e),
                        isValidConnection: () => pl(t),
                        clear() {
                            e.setOptions([])
                        },
                        async onRecordsLoaded() {
                            i()
                        },
                        async onCurrentRecordModified() {
                            i()
                        }
                    }
                }],
                [se, (e, t, r) => {
                    const {
                        logger: n,
                        errorReporting: o
                    } = U, {
                        actions: a,
                        datasetApi: i,
                        getState: s,
                        getFieldType: c
                    } = r, l = {}, d = function(r) {
                        void 0 === r && (r = !1);
                        const n = mn(s()),
                            o = Sl(t),
                            i = a.isCurrentRecordNew(s()),
                            c = (0, D.isEmpty)(fa(n, o));
                        (a.isCurrentRecordPristine(s()) || r) && e.clear(), !c || i && !r || e.updateValidityIndication()
                    };
                    return { ...ul(e),
                        isValidConnection: () => pl(t),
                        bind() {
                            if (an(s())) return;
                            const {
                                id: r,
                                role: d
                            } = e, u = Sl(t), p = c(u).getOrElse(void 0);
                            e.onChange(o((() => {
                                l[r] = !0
                            }), S.withMessage("Upload button adapter onChange failed"))), i.onBeforeSave((() => {
                                if (l[r] && e.getValue().length) return e.uploadFiles().then((e => {
                                    l[r] = !1;
                                    const t = mn(s()),
                                        n = Qa({
                                            value: e,
                                            currentValue: fa(t, u),
                                            fieldType: p,
                                            fieldName: u,
                                            role: d
                                        });
                                    a.setFieldInCurrentRecordAndSynchronize(u, n, r)
                                })).catch((t => {
                                    const r = e.getValue(),
                                        o = Array.isArray(r) && 1 === r.length ? r[0].name : "unknown";
                                    throw n.log(new O(`The ${o} file failed to upload. Please try again later.`, {
                                        cause: t
                                    })), t
                                }))
                            })), c(u).map((t => {
                                switch (t) {
                                    case "image":
                                        e.fileType = "Image";
                                        break;
                                    case "document":
                                        e.fileType = "Document"
                                }
                            }))
                        },
                        async onCurrentRecordModified(r) {
                            const {
                                id: n
                            } = e, o = Sl(t), a = mn(s()), i = ha({
                                previousRecord: r,
                                currentRecord: a,
                                fieldName: o
                            });
                            i && (l[n] = !1), d(i)
                        },
                        async onRecordsLoaded() {
                            d()
                        },
                        async onCurrentViewChanged() {
                            d()
                        },
                        async onCurrentIndexChanged() {
                            d()
                        }
                    }
                }],
                [Z, (e, t, r) => {
                    const {
                        logger: n,
                        errorReporting: o
                    } = U, {
                        actions: a,
                        getState: i,
                        getFieldType: s,
                        modeIsLivePreview: c,
                        wixFormatter: l
                    } = r, d = (e, t, r, o) => {
                        (0, D.forEach)(r.expressions, ((r, a) => {
                            let {
                                expression: i
                            } = r;
                            const {
                                value: s
                            } = li({
                                expression: i,
                                record: t,
                                prop: a,
                                role: o,
                                logger: n
                            });
                            e[a] = s
                        })), (0, D.forEach)(r.properties, ((r, n) => {
                            let {
                                fieldName: a,
                                format: i
                            } = r;
                            const c = Ca({
                                value: fa(t, a),
                                role: o,
                                fieldType: s(a).getOrElse(void 0),
                                propPath: n,
                                format: i,
                                utils: {
                                    formatter: l
                                }
                            });
                            e[n] = c
                        }))
                    }, u = () => {
                        e.currentIndex = hi({
                            state: i()
                        })
                    }, p = async () => {
                        const {
                            role: r
                        } = e, {
                            items: n
                        } = await a.fetchCurrentItems(i());
                        try {
                            const o = n.map((e => {
                                    const n = {};
                                    return d(n, e, t, r), n
                                })),
                                a = o.every((e => {
                                    let {
                                        src: t
                                    } = e;
                                    return !t
                                }));
                            if (c && a) return;
                            e.setValue(o)
                        } catch (e) {
                            if ("URIError" !== e.name) throw e
                        }
                        u()
                    };
                    return { ...ul(e),
                        isValidConnection: () => pl(t),
                        bind() {
                            e.onCurrentItemChanged(o((() => {
                                a.setCurrentIndex(e.currentIndex)
                            }), S.withMessage("Gallery adapter onItemReady failed")))
                        },
                        async onCurrentRecordModified() {
                            const {
                                role: r
                            } = e, n = mn(i()), o = hi({
                                state: i()
                            }), a = e.getValue() || [], s = a[o];
                            s && d(s, n, t, r), e.setValue(a), u()
                        },
                        async onRecordsLoaded() {
                            p()
                        },
                        async onCurrentViewChanged() {
                            p()
                        },
                        async onCurrentIndexChanged() {
                            u()
                        }
                    }
                }],
                [de, (e, t, r) => {
                    const {
                        errorReporting: n
                    } = U, {
                        actions: o,
                        getState: a
                    } = r, i = () => {
                        o.isCursorPaging() ? (() => {
                            const t = mi({
                                state: a()
                            });
                            e.nextEnabled = o.hasNextPage(a()), e.previousEnabled = t > 1
                        })() : (() => {
                            const t = mi({
                                    state: a()
                                }),
                                r = o.getTotalPageCount(a());
                            e.currentPage = t, r < 1 ? e.disable() : (e.enable(), e.totalPages = r)
                        })()
                    };
                    return { ...ul(e),
                        bind() {
                            const t = o.isCursorPaging(),
                                r = e => {
                                    let {
                                        delta: r,
                                        index: n
                                    } = e;
                                    const i = mi({
                                            state: a()
                                        }),
                                        s = r ? i + r : n,
                                        c = ui({
                                            state: a()
                                        }),
                                        l = t ? s : (0, D.clamp)(s, 1, o.getTotalPageCount(a()));
                                    o.setCurrentIndex(((e, t) => t * (e - 1))(l, c))
                                };
                            t ? (e.navigationType = "arrowsOnly", e.onNextClicked(n((() => r({
                                delta: 1
                            })), S.withMessage("Pagination adapter onNextClicked failed"))), e.onPreviousClicked(n((() => r({
                                delta: -1
                            })), S.withMessage("Pagination adapter onPreviousClicked failed")))) : e.onChange(n((e => r({
                                index: e.target.currentPage
                            })), S.withMessage("Pagination adapter onChange failed")))
                        },
                        async onRecordsLoaded() {
                            i()
                        },
                        async onCurrentViewChanged() {
                            i()
                        }
                    }
                }],
                [pe, (e, t, r) => {
                    const {
                        logger: n
                    } = U, {
                        actions: o,
                        getState: a,
                        getFieldType: i,
                        wixFormatter: s
                    } = r, c = (e, t, r) => {
                        let {
                            expressions: n = {},
                            properties: o = {}
                        } = t;
                        const a = e => {
                            let {
                                propPath: t,
                                marker: n,
                                value: o,
                                fieldType: a,
                                format: i
                            } = e;
                            if ("address" === t) return Object.assign(n, {
                                address: (0, D.get)(o, "formatted"),
                                location: (0, D.get)(o, "location")
                            });
                            if ("link" === t && (0, D.isEmpty)(o)) return n;
                            const c = Ca({
                                value: o,
                                role: r,
                                fieldType: a,
                                propPath: t,
                                format: i,
                                utils: {
                                    formatter: s
                                }
                            });
                            return Object.assign(n, {
                                [t]: c
                            })
                        };
                        let c = {};
                        return c = (0, D.reduce)(n, ((t, r, n) => {
                            let {
                                expression: o
                            } = r;
                            const i = ai({
                                expression: o,
                                variables: e,
                                functions: ci()
                            });
                            return a({
                                propPath: n,
                                marker: t,
                                value: i
                            })
                        }), c), c = (0, D.reduce)(o, ((t, r, n) => {
                            let {
                                fieldName: o,
                                format: s
                            } = r;
                            const c = fa(e, o);
                            return a({
                                propPath: n,
                                marker: t,
                                format: s,
                                value: c,
                                fieldType: i(o).getOrElse(void 0)
                            })
                        }), c), c
                    }, l = async () => {
                        const {
                            role: r
                        } = e;
                        try {
                            const {
                                items: n
                            } = await o.fetchCurrentItems(a());
                            e.markers = n.map((e => c(e, t, r)))
                        } catch (e) {
                            n.log(new S("Failed setting markers", {
                                cause: e
                            }))
                        }
                    };
                    return { ...ul(e),
                        isValidConnection: () => pl(t),
                        async onRecordsLoaded() {
                            l()
                        },
                        async onCurrentViewChanged() {
                            l()
                        },
                        async onCurrentIndexChanged() {
                            const t = hi({
                                state: a()
                            });
                            e.setCenter((0, D.get)(e, ["markers", t, "location"]))
                        },
                        async onCurrentRecordModified() {
                            const {
                                role: r
                            } = e, n = mn(a()), o = hi({
                                state: a()
                            });
                            e.markers[o] = c(n, t, r), e.setCenter((0, D.get)(e, ["markers", o, "location"]))
                        }
                    }
                }]
            ]),
            Dl = e => {
                let {
                    components: t,
                    context: r
                } = e;
                const n = (e => {
                        let {
                            recordStore: t,
                            dispatch: n
                        } = e;
                        const a = {
                            fetchRecordById: (e, r) => t(r).fold((() => tt.Maybe.Nothing()), (t => t.getRecordById(e))),
                            fetchAll: e => (async (e, t, r, n) => {
                                const o = await e(n).fold((() => rs.Empty()), (e => e.externalApi.getRecordsLimitedByMaxPageSize(t, r)));
                                return o.get()
                            })(t, 0, 1e3, e),
                            fetchCurrentItems: e => Hs(t, e).catch((() => rs.Empty().get())),
                            fetchOne: () => qs(t, 0, 1),
                            fetch: (e, r, n) => qs(t, e, r, n),
                            getTotalPageCount: e => yi({
                                state: e,
                                recordStore: t
                            }),
                            getInitialData: () => t().fold((() => rs.Empty()), (e => e.externalApi.getSeedRecords())),
                            setCurrentIndex: (e, t) => n(Bs(e, t)),
                            setFieldInCurrentRecordAndSynchronize: (e, t, r) => {
                                n(Vs({
                                    [e]: (0, D.cloneDeep)(t)
                                }, r))
                            },
                            refresh: () => n(Ws()),
                            resetUserInputFilters: () => {
                                const e = o.filter((e => {
                                        let {
                                            role: t
                                        } = e;
                                        return t === Q || Se.includes(t)
                                    })),
                                    t = Sn(r.getState());
                                e.length && (e.forEach((e => e.resetUserFilter())), t || a.refresh())
                            },
                            isCurrentRecordNew: e => t().fold((() => !1), (t => t.isNewRecord(hi({
                                state: e
                            })))),
                            isCurrentRecordPristine: e => t().fold((() => !1), (t => t.isPristine(hi({
                                state: e
                            })))),
                            isCursorPaging: () => di({
                                recordStore: t
                            }),
                            hasNextPage: e => Ti({
                                state: e,
                                recordStore: t
                            }),
                            getUniqueFieldValues: e => t().fold((() => !1), (t => t.getUniqueFieldValues(e)))
                        };
                        return a
                    })(r),
                    o = t.map((e => ((e, t, r) => (bl.get(e.role) || (e.isInput ? Tl : fl))(e, t, r))(e, ((e, t) => {
                        if (!e) return e;
                        const {
                            properties: r,
                            totalCount: n
                        } = e;
                        return { ...e,
                            ...r ? {
                                properties: (0, D.mapKeys)(r, ((e, r) => dl(r) ? ll({
                                    propName: r,
                                    getFieldType: () => t(e.fieldName).getOrElse(null)
                                }) : r))
                            } : {},
                            ...n ? {
                                totalCount: {
                                    prop: dl(n.prop) ? ll({
                                        propName: n.prop,
                                        getFieldType: () => null
                                    }) : n.prop
                                }
                            } : {}
                        }
                    })(e.connectionConfig, r.getFieldType), { ...r,
                        actions: n
                    }))).filter((e => e.isValidConnection()));
                return {
                    bindAll: async () => Promise.all(o.map((e => (e.bind(), e.onRecordsLoaded())))),
                    hideAll: () => o.map((e => e.hide())),
                    showAll: () => o.map((e => e.show({
                        ignoreInitiallyHidden: !0
                    }))),
                    clearAll: () => o.map((e => e.clear())),
                    onRecordsLoaded: () => o.map((e => e.onRecordsLoaded())),
                    onCurrentViewChanged: () => o.map((e => e.onCurrentViewChanged())),
                    onCurrentIndexChanged: () => o.map((e => e.onCurrentIndexChanged())),
                    onCurrentRecordModified: (e, t) => o.filter((e => {
                        let {
                            id: r
                        } = e;
                        return !t || t !== r
                    })).map((t => t.onCurrentRecordModified(e)))
                }
            },
            Al = e => {
                let {
                    datasetId: t,
                    masterIds: r,
                    connectionsGraph: n
                } = e;
                const o = e => n[t].includes(e.id) ? "PRIMARY" : r.some((t => n[t].includes(e.id))) ? "DETAILS" : "OTHER";
                return {
                    isInsidePrimaryOrDetailsRepeater: e => {
                        let {
                            parentRepeater: t
                        } = e;
                        return !!(r = t) && ["PRIMARY", "DETAILS"].includes(o(r));
                        var r
                    },
                    getDetailsRepeaters: e => {
                        const t = [];
                        return e.forEach((e => {
                            let {
                                parentRepeater: r
                            } = e;
                            r && "DETAILS" === o(r) && t.push(new Proxy(r, {
                                get: (e, t) => "role" === t ? J : e[t]
                            }))
                        })), (0, D.uniqBy)(t, "uniqueId")
                    }
                }
            },
            Fl = [l.FieldType.text, l.FieldType.number, l.FieldType.image, l.FieldType.video, l.FieldType.mediaGallery, l.FieldType.richContent],
            xl = {
                [l.FieldType.text]: "text",
                [l.FieldType.number]: "number",
                [l.FieldType.image]: "image",
                [l.FieldType.video]: "video",
                [l.FieldType.mediaGallery]: "gallery",
                [l.FieldType.richContent]: "rich-content"
            },
            Ll = e => {
                let {
                    recordStore: t,
                    state: r,
                    schema: n,
                    connections: o,
                    isDpItemDataset: a
                } = e;
                if (!a && !o.length) return {
                    collectionData: void 0
                };
                const i = mn(r);
                if (!i) return {
                    collectionData: void 0
                };
                const {
                    id: s,
                    displayName: c,
                    displayField: l,
                    fields: d
                } = n, u = a && l ? i[l] : void 0, p = a ? 1 : (e => {
                    let {
                        recordStore: t
                    } = e;
                    const r = gi({
                        recordStore: t
                    });
                    return r ? r.total : null
                })({
                    recordStore: t
                }) ? ? void 0;
                return {
                    title: u,
                    collectionData: {
                        id: s,
                        name: c || s,
                        totalCount: p,
                        fields: Ul({
                            connections: o,
                            fields: d,
                            currentRecord: i
                        }),
                        primary: a
                    }
                }
            },
            Ul = e => {
                let {
                    connections: t,
                    fields: r,
                    currentRecord: n
                } = e;
                const o = t.reduce(kl, {});
                return Object.entries(r).filter((e => {
                    let [t, r] = e;
                    return !r.pii && !r.isDeleted && Fl.includes(r.type)
                })).map((e => {
                    var t;
                    let [r, a] = e;
                    return {
                        key: r,
                        type: xl[a.type],
                        label: a.displayName,
                        connected: !(null == (t = o[r]) || !t.length),
                        value: Ml({
                            key: r,
                            field: a,
                            currentRecord: n,
                            connections: o[r] || []
                        })
                    }
                }))
            },
            Ml = e => {
                let {
                    key: t,
                    field: r,
                    currentRecord: n,
                    connections: o
                } = e;
                const {
                    type: a
                } = r, i = n[t];
                switch (a) {
                    case l.FieldType.image:
                        return i && Gl({
                            src: i
                        }, o);
                    case l.FieldType.video:
                        return i && jl({
                            src: i
                        }, o);
                    case l.FieldType.mediaGallery:
                        return Bl(i, o);
                    case l.FieldType.text:
                    case l.FieldType.number:
                    case l.FieldType.richContent:
                        return i;
                    default:
                        throw new Error(`Unsupported field type: ${a}`)
                }
            },
            kl = (e, t) => {
                var r;
                const n = (null == t || null == (r = t.config) ? void 0 : r.properties) || {};
                return Object.values(n).map((e => {
                    let {
                        fieldName: t
                    } = e;
                    return t
                })).forEach((r => {
                    e[r] || (e[r] = []), e[r].push(t)
                })), e
            },
            Gl = (e, t) => {
                let {
                    src: r
                } = e;
                const n = t.some((e => {
                    var t, r, n;
                    let {
                        role: o,
                        config: a
                    } = e;
                    return o === ee && Boolean(null == a || null == (t = a.properties) ? void 0 : t.items) || o === Z && Boolean(null == a || null == (r = a.properties) ? void 0 : r.src) || "imageRole" === o && Boolean(null == a || null == (n = a.properties) ? void 0 : n.src)
                }));
                return {
                    url: r,
                    ...Vl(r),
                    connectedToSrc: n
                }
            },
            jl = (e, t) => {
                let {
                    src: r,
                    title: n,
                    description: o
                } = e;
                const a = t.some((e => {
                    var t, r, n;
                    let {
                        role: o,
                        config: a
                    } = e;
                    return o === ee && Boolean(null == a || null == (t = a.properties) ? void 0 : t.items) || "videoPlayerRole" === o && Boolean(null == a || null == (r = a.properties) ? void 0 : r.src) || "videoRole" === o && Boolean(null == a || null == (n = a.properties) ? void 0 : n.src)
                }));
                if (!ql(r)) return {
                    thumbnailUrl: void 0,
                    title: n,
                    description: o,
                    uploadDate: void 0,
                    connectedToSrc: a
                };
                const [i, s] = r.match(/posterUri=(\w+)/) || [], [c, l] = r.match(/posterWidth=(\d+)/) || [], [d, u] = r.match(/posterHeight=(\d+)/) || [];
                return {
                    thumbnailUrl: $l({
                        uri: s,
                        width: Number(l),
                        height: Number(u)
                    }),
                    title: n,
                    description: o,
                    uploadDate: void 0,
                    connectedToSrc: a
                }
            },
            Bl = function(e, t) {
                return void 0 === e && (e = []), e.map((e => "image" === e.type ? Gl(e, t) : jl(e, t)), t)
            },
            Vl = e => {
                if (!Wl(e)) return {
                    height: void 0,
                    width: void 0
                };
                const [t, r] = e.match(/originHeight=(\d+)/) || [], [n, o] = e.match(/originWidth=(\d+)/) || [];
                return {
                    height: r ? Number(r) : void 0,
                    width: o ? Number(o) : void 0
                }
            },
            $l = e => {
                let {
                    uri: t,
                    width: r,
                    height: n,
                    filename: o = "image.ext"
                } = e;
                return `wix:image://v1/${t}/${o}#originWidth=${r}&originHeight=${n}`
            },
            Wl = e => e.startsWith("wix:image://"),
            ql = e => e.startsWith("wix:video://"),
            Hl = (e, t) => r => {
                let {
                    shouldCollectSeoData: n,
                    controllerConfig: o,
                    datasetType: a,
                    connections: i,
                    connectionsGraph: s,
                    isScoped: c,
                    datasetScope: l,
                    dataProvider: d,
                    dependencyManager: u,
                    seoManager: p,
                    firePlatformEvent: f,
                    dynamicPagesData: h,
                    datasetId: m,
                    fixedRecordId: g,
                    recordStoreService: y,
                    updatedCompIds: v,
                    markControllerAsRendered: _,
                    markDatasetDataFetched: E,
                    renderingRegularControllers: I,
                    modeIsLivePreview: T,
                    modeIsSSR: R,
                    schemasLoading: w,
                    listenersByEvent: O
                } = r;
                const P = i.filter((e => !(e => {
                        let {
                            role: t
                        } = e;
                        return Se.includes(t)
                    })(e) || e.config)),
                    N = !!g,
                    {
                        logger: C,
                        loadExpressionFunctions: b,
                        platform: {
                            user: A,
                            settings: {
                                locale: F
                            },
                            timers: {
                                queueMicrotask: x
                            }
                        }
                    } = U,
                    {
                        setConnectedComponents: L,
                        getConnectedComponents: M
                    } = (() => {
                        let e;
                        return {
                            setConnectedComponents: t => e = t,
                            getConnectedComponents: () => e
                        }
                    })(),
                    G = [],
                    {
                        store: B,
                        subscribe: V,
                        onIdle: $
                    } = tc(C, m),
                    W = Ec(f),
                    {
                        fireEvent: q,
                        register: H
                    } = W;
                G.push(W.dispose);
                const z = new k({
                        datasetId: nl(m),
                        scopedDatasetId: c ? m : void 0,
                        getState: B.getState,
                        getSchema: function(e) {
                            return void 0 === e && (e = ee), d.getSchema(e)
                        }
                    }),
                    Y = z.subscribe(O);
                G.push(...Y), B.dispatch(dr({
                    controllerConfig: o,
                    connections: P,
                    isScoped: c,
                    datasetType: a
                }));
                const {
                    datasetIsVirtual: J,
                    datasetIsReal: K,
                    datasetIsDeferred: Q,
                    datasetIsWriteOnly: X,
                    datasetIsRouter: Z,
                    datasetCollectionName: ee,
                    dynamicPageNavComponentsShouldBeLinked: te
                } = (re = B.getState(), {
                    datasetIsRouter: ln(re),
                    datasetIsMaster: dn(re),
                    datasetIsVirtual: un(re),
                    datasetIsReal: pn(re),
                    datasetIsDeferred: fn(re),
                    datasetIsWriteOnly: sn(re),
                    datasetCollectionName: Xr(re),
                    dynamicPageNavComponentsShouldBeLinked: hn(re)
                });
                var re;
                const ne = Zr(B.getState()),
                    oe = en(B.getState()),
                    ae = function(e) {
                        return void 0 === e && (e = ee), tt.Maybe.fromNullable(d.getSchema(e))
                    },
                    ie = e => {
                        const t = ae(ee),
                            r = d.getReferencedSchemas(ee);
                        return t.chain((t => tt.Maybe.fromNullable(Jn(t, r)(e))))
                    },
                    ce = ((e, t, r) => ({
                        dataBinding: sa(e),
                        currentUser: ia(),
                        userInput: Ni({
                            getConnectedComponents: t,
                            getFieldType: r
                        })
                    }))((e => u.getDependencyById(e, l)), M, ie),
                    le = ki({
                        valueResolvers: ce,
                        getConnectedComponents: () => on(B.getState()) ? M() : [],
                        getFieldType: ie,
                        getUserFilterInitialData: () => Dn(B.getState()),
                        wasSetFilterCalled: (0, D.flow)((() => B.getState()), Sn)
                    }),
                    de = (e => {
                        let {
                            recordStoreService: t,
                            getFilter: r,
                            getSort: n,
                            getPageSize: o,
                            datasetId: a,
                            filterResolver: i,
                            getSchema: s,
                            fixedRecordId: c
                        } = e;
                        return e => {
                            const l = o();
                            return t.chain((t => {
                                if (e) return tt.Result.fromMaybe(s().map((t => Kn(e, t))), `cannot resolve referenced collection name for field ${e}`).map((e => t({
                                    pageSize: l,
                                    sort: null,
                                    filter: null,
                                    datasetId: a,
                                    referencedCollectionName: e,
                                    fixedRecordId: c
                                }))); {
                                    const e = r();
                                    return tt.Result.fromMaybe(i(e).map((e => t({
                                        pageSize: l,
                                        sort: n(),
                                        filter: e,
                                        datasetId: a,
                                        referencedCollectionName: null,
                                        fixedRecordId: c
                                    }))), "could not resolve dynamic filter")
                                }
                            }))
                        }
                    })({
                        recordStoreService: y,
                        getFilter: (0, D.flow)((() => B.getState()), Zr),
                        getSort: (0, D.flow)((() => B.getState()), en),
                        getPageSize: () => ui({
                            state: B.getState()
                        }),
                        datasetId: m,
                        filterResolver: le,
                        getSchema: ae,
                        fixedRecordId: g
                    }),
                    ue = te ? (e => {
                        let {
                            dataProvider: t,
                            dynamicPagesData: r,
                            collectionName: n
                        } = e;
                        return {
                            getNextDynamicPageUrl: () => Wc({
                                dataProvider: t,
                                dynamicPagesData: r,
                                collectionName: n,
                                directionTowardSibling: "asc"
                            }),
                            getPreviousDynamicPageUrl: () => Wc({
                                dataProvider: t,
                                dynamicPagesData: r,
                                collectionName: n,
                                directionTowardSibling: "desc"
                            })
                        }
                    })({
                        dataProvider: d,
                        dynamicPagesData: h,
                        collectionName: ee
                    }) : null;
                let pe, fe;
                te && (V(Uc(ue)), B.dispatch(Js(P)));
                const he = new Promise(((e, t) => {
                        pe = e, fe = t
                    })),
                    me = c ? void 0 : () => he;
                c || H("datasetReady", pe);
                const ye = _c({
                        store: B,
                        recordStore: de,
                        eventListeners: W,
                        controllerStore: t,
                        datasetId: m,
                        datasetType: a,
                        isFixedItem: N,
                        siblingDynamicPageUrlGetter: ue,
                        onIdle: $,
                        dispatcher: z,
                        onReadyAsync: me
                    }),
                    ve = ye(!1);
                G.push(y.map((e => e.onChange(ol(B.getState, B.dispatch)))).getOrElse((() => {})));
                const {
                    fetchingInitialData: _e,
                    resolveUserInputDependency: Ee
                } = Qc({
                    dependencyManager: u,
                    shouldFetchInitialData: o && !X,
                    recordStore: de,
                    store: B,
                    filter: ne,
                    sort: oe,
                    datasetIsDeferred: Q,
                    modeIsSSR: R,
                    queueMicrotask: x,
                    datasetIsReal: K,
                    collectionId: ee,
                    filterResolver: le,
                    getSchemas: () => d.getSchemas(),
                    schemasLoading: w,
                    getUserFilterInitialData: () => d.getUserFilterInitialData(m)
                });
                _e.then((() => {
                    E();
                    const e = de().fold((() => {}), (e => e.getSeedRecords().matchWith({
                        Empty: () => {},
                        Results: e => {
                            let {
                                items: t
                            } = e;
                            return t[0]
                        }
                    })));
                    e && B.dispatch(Ys.setCurrentRecord(e, 0))
                }));
                c && !N && u.getDependenciesByFilter(ne, l).forEach((e => {
                    let {
                        masterDataset: {
                            api: t
                        }
                    } = e;
                    al({
                        detailsDatasetApis: [ve],
                        store: B,
                        masterDatasetApi: t,
                        controllerConfig: o,
                        unsubscribeHandlers: G
                    })
                }));
                n && K && !Q && Promise.all([_e, w]).then((() => {
                    let e = {};
                    try {
                        e = Ll({
                            isDpItemDataset: Z,
                            recordStore: de,
                            state: B.getState(),
                            schema: d.getSchema(ee),
                            connections: P
                        })
                    } catch (e) {
                        C.log(new S(`Failed to extract seo data for dataset ${m}`, {
                            cause: e
                        }))
                    }
                    p.submitSeoData(e)
                }));
                const Ie = async function(r) {
                        A.onLogin((() => {
                            (() => {
                                const e = hi({
                                        state: B.getState()
                                    }),
                                    t = de().fold((() => !1), (t => t.isPristine(e)));
                                return t && !X
                            })() && ve.refresh()
                        }));
                        const {
                            components: n,
                            detailsDatasetApis: i
                        } = r(P), c = tl({
                            updatedCompIds: v,
                            datasetIsReal: K,
                            connectionsGraph: s,
                            components: n
                        });
                        L(c);
                        const l = ((e, t) => {
                            let {
                                datasetId: r,
                                connectionsGraph: n,
                                datasetIsReal: o,
                                getDependencies: a
                            } = t;
                            if (!o) return e;
                            const {
                                isInsidePrimaryOrDetailsRepeater: i,
                                getDetailsRepeaters: s
                            } = Al({
                                datasetId: r,
                                connectionsGraph: n,
                                masterIds: a().map((e => e.masterDatasetId))
                            }), c = e.filter((e => !i(e)));
                            return c.push(...s(e)), c
                        })(c, {
                            datasetId: m,
                            datasetIsReal: K,
                            connectionsGraph: s,
                            getDependencies: () => u.getDependenciesByFilter(ne)
                        });
                        if (al({
                                detailsDatasetApis: i,
                                masterDatasetApi: ve,
                                dependencyManager: u,
                                controllerConfig: o,
                                unsubscribeHandlers: G
                            }), K && await w, Ee(), !nn(B.getState()) || !d.hasSchema(o.dataset.collectionName)) return _e.then((() => {
                            _(), u.resolveDependants(m), B.dispatch(Xs(!0)), q("datasetReady")
                        })), Promise.resolve();
                        const p = Dl({
                            components: l,
                            context: {
                                connections: P,
                                recordStore: de,
                                dispatch: B.dispatch,
                                getState: B.getState,
                                datasetApi: ve,
                                eventListeners: W,
                                dispatcher: z,
                                getFieldType: ie,
                                getSchema: ae,
                                controllerFactory: e,
                                controllerStore: t,
                                modeIsLivePreview: T,
                                wixFormatter: F ? Cc({
                                    locale: F
                                }) : null
                            }
                        });
                        V(((e, t, r, n, o, a, i, s) => {
                            const c = Ac(e, t, r, n, o, a, i, s),
                                l = e => {
                                    let {
                                        from: t,
                                        to: r,
                                        hasChanged: n,
                                        hasChangedToFalse: o,
                                        hasChangedToTrue: a,
                                        hasChangedToMatch: i
                                    } = e;
                                    const s = gn(r),
                                        l = gn(t),
                                        d = vn(r),
                                        u = On(r),
                                        p = [];
                                    return (i(vn, (e => e >= 0 && e !== s)) || a(On)) && p.push(c.goToRecordByIndex(l, d, u)), (n(gn) && l >= 0 || o(wn) && 0 === s) && p.push(c.notifyIndexChange(s)), p
                                },
                                d = e => {
                                    let {
                                        from: t,
                                        to: r,
                                        hasChanged: n,
                                        hasChangedToMatch: o,
                                        hasChangedToTrue: a
                                    } = e;
                                    const i = gn(r),
                                        s = mn(r),
                                        l = mn(t),
                                        d = [];
                                    Ki(l, s) ? (0, D.isEqual)(l, s) || (d.push(c.updateComponents(En(r), l)), d.push(c.fireEvent("itemValuesChanged", (0, D.cloneDeep)(l), (0, D.cloneDeep)(s)))) : null == l || null == s || n(gn) || d.push(c.updateComponents());
                                    const u = _n(r);
                                    return o(_n, (e => null != e)) && d.push(c.setFieldsInCurrentRecord(u, i, En(r))), a(Cn) && d.push(c.revertChanges(i, yn(r))), a(Nn) && d.push(c.removeCurrentRecord(i)), d
                                },
                                u = e => {
                                    let {
                                        to: t,
                                        hasChanged: r,
                                        hasChangedToFalse: n,
                                        hasChangedToTrue: o
                                    } = e;
                                    const a = [];
                                    return r(Fc) && a.push(c.refresh(gn(t), yn(t), sn(t))), r(tn) && a.push(c.notifyRecordSetLoaded()), o(wn) && a.push(c.refresh(gn(t), yn(t), sn(t))), n(wn) && a.push(c.notifyRecordSetLoaded()), o(Pn) && a.push(c.updateCurrentView()), a
                                },
                                p = e => {
                                    let {
                                        to: t,
                                        hasChangedToTrue: r
                                    } = e;
                                    const n = gn(t),
                                        o = mn(t);
                                    if (r(bn)) return c.saveRecord(n, o)
                                },
                                f = e => {
                                    let {
                                        to: t,
                                        hasChangedToNotNull: r
                                    } = e;
                                    const n = [];
                                    return r(In) && n.push(c.newRecord(In(t), yn(t))), n
                                };
                            return e => (0, D.flatten)([l, d, u, p, f].map((t => t(e))))
                        })(de, p, ie, W.executeHooks, m, l, q, z)), G.push(((e, t, r, n, o) => Oc(e, t, r, n, o))(B, l, C, m, de));
                        const f = Zc(l.filter((e => {
                            let {
                                role: t
                            } = e;
                            return ![se, ge].includes(t)
                        })), ie);
                        B.dispatch(Ys.setDefaultRecord(f)), X && await B.dispatch(Ys.initWriteOnly(J)), Q && (p.hideAll(), R && p.clearAll());
                        const h = P.some((e => {
                                var t;
                                return Object.keys((null == e || null == (t = e.config) ? void 0 : t.expressions) || {}).length > 0
                            })) ? b() : Promise.resolve(),
                            g = Promise.all([_e, h]).then((async () => {
                                if (Q && await I, !R) try {
                                    ((e, t, r, n, o, a) => {
                                        if (n) return;
                                        const i = Xr(e);
                                        if (!i) return;
                                        const s = a.fold((() => i), (e => e.displayName)),
                                            c = rn(e),
                                            l = !!mn(e),
                                            {
                                                logger: d,
                                                platform: {
                                                    settings: {
                                                        env: {
                                                            editor: u
                                                        }
                                                    }
                                                }
                                            } = U;
                                        l && [An, Fn].includes(c) && t.find((e => {
                                            let {
                                                role: t,
                                                config: r
                                            } = e;
                                            return et(t, r)
                                        })) && d.log(new kn({
                                            id: u ? 153 : 152,
                                            collectionId: i,
                                            collectionName: s,
                                            datasetId: o,
                                            datasetType: r,
                                            datasetMode: c
                                        })), Ot(rn(e), t) && d.log(new kn({
                                            id: u ? 157 : 156,
                                            collectionId: i,
                                            collectionName: s,
                                            datasetId: o,
                                            datasetType: r,
                                            datasetMode: c
                                        }))
                                    })(B.getState(), P, a, J, m, ae(ee))
                                } catch (e) {
                                    C.log(new S("Failed to report dataset active BI", {
                                        cause: e
                                    }))
                                }
                                await p.bindAll(), K && await (e => Promise.all(e.getAll().map((e => new Promise((t => {
                                    e.staticExports.onReady(t)
                                }))))))(t), Q && p.showAll(), u.resolveDependants(m), B.dispatch(Xs(!0)), q("datasetReady")
                            }));
                        return Q ? (_(), Promise.resolve()) : (g.then(_), g)
                    },
                    Te = ye(!0);
                return {
                    pageReady: j(J ? Ie : function() {
                        for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                        return C.log(new ze("dataset/pageReady", (() => Ie(...t))))
                    }, (e => (fe(), C.logError(e, "Dataset pageReady callback failed", {
                        datasetId: m
                    })))),
                    exports: e => e.type === Gs.$.COMPONENT ? Te.inScope(e.compId, e.additionalData.itemId) : Te,
                    staticExports: Te,
                    dispose: () => {
                        G.forEach((e => e()))
                    },
                    api: ve,
                    userFilterInitialDataPromise: _e.then((e => {
                        let [t, r] = e;
                        return r
                    }))
                }
            },
            zl = (e, t) => {
                const r = ks(e),
                    n = {
                        createRealDataset: () => o({ ...t,
                            isScoped: !1
                        }),
                        createScopedDetailsDataset: e => {
                            let {
                                datasetScope: r
                            } = e;
                            return o({ ...t,
                                isScoped: !0,
                                firePlatformEvent: D.noop,
                                datasetId: rl(t.datasetId, r),
                                datasetScope: r
                            })
                        },
                        createScopedDataset: e => {
                            let {
                                datasetScope: r,
                                fixedItem: n
                            } = e;
                            const {
                                dataProvider: a,
                                controllerConfig: i,
                                dynamicPagesData: s
                            } = t, c = (0, D.cloneDeep)(i), l = {
                                items: [n]
                            };
                            c.dataset.filter = a.createSimpleFilter("_id", n._id);
                            const {
                                collectionName: d
                            } = i.dataset;
                            return a.setCollectionData({
                                collectionId: d,
                                data: l
                            }), o({ ...t,
                                isScoped: !0,
                                controllerConfig: c,
                                firePlatformEvent: D.noop,
                                dynamicPagesData: s,
                                datasetId: rl(t.datasetId, r),
                                fixedRecordId: r.itemId
                            })
                        }
                    },
                    o = Hl(n, r);
                return n
            },
            Yl = e => ji(e).map((e => {
                let {
                    filterExpression: {
                        filterId: t
                    }
                } = e;
                return t
            }));
        var Jl = a(1289);
        class Kl {
            constructor() {
                this._datasetConfigs = new Map
            }
            get datasetConfigs() {
                return this._datasetConfigs
            }
        }
        class Ql {
            constructor(e) {
                let {
                    platform: t,
                    dataFetcher: r,
                    warmupCache: n,
                    staticCache: o,
                    features: a,
                    listenersByEvent: i,
                    logger: s,
                    i18n: c,
                    global: l,
                    loadExpressionFunctions: d
                } = e;
                const u = new xn(s, l);
                M({
                    loadExpressionFunctions: d,
                    platform: t,
                    features: a,
                    dataFetcher: r,
                    i18n: c,
                    appState: new Kl,
                    logger: u,
                    errorReporting: Ln(u),
                    breadcrumbReporting: Un(u),
                    verboseReporting: Mn(u)
                }), this._listenersByEvent = i, this._dataProvider = new Qo, this._warmupCache = n, this._staticCache = o, this._features = a, this._logger = u, this._recordStoreCache = {}
            }
            initializeDatasets(e) {
                let {
                    datasetConfigs: t,
                    firePlatformEvent: r
                } = e;
                try {
                    return this._logger.log(new ze("databinding/createControllers", (() => this._initializeDatasets({
                        datasetConfigs: t,
                        firePlatformEvent: r
                    }))))
                } catch (e) {
                    return this._logger.logError(e, "Datasets initialisation failed"), []
                }
            }
            _initializeDatasets(e) {
                let {
                    datasetConfigs: t,
                    firePlatformEvent: r
                } = e;
                const {
                    platform: {
                        settings: {
                            mode: {
                                name: n,
                                csr: o,
                                ssr: a
                            },
                            env: {
                                livePreview: i,
                                live: s
                            }
                        },
                        seo: c,
                        location: l
                    }
                } = U, d = qi(t), u = this._updateDatasetConfigsState(d), p = this._features.warmupData, f = [], h = [], {
                    resolve: m,
                    promise: g
                } = new G;
                this._dataProvider.setSchemas({ ...p && o && this._warmupCache.getSchemas() || {},
                    ...this._staticCache.getSchemas() || {}
                });
                const y = this._logger.log(new ze("databinding/loadSchemas", (() => this._dataProvider.loadSchemas(Xl(d)).then((() => p && a && this._warmupCache.setSchemas(this._dataProvider.getSchemas()))))));
                this._dataProvider.setDatasetConfigs(d.map((e => {
                    let {
                        config: {
                            dataset: {
                                collectionName: t
                            }
                        },
                        compId: r,
                        type: n
                    } = e;
                    return {
                        collectionId: t,
                        datasetId: r,
                        type: n
                    }
                })));
                const v = o && p && this._warmupCache.getDataStore();
                v && this._dataProvider.setStore(rd(v));
                const _ = this._staticCache.getDataStore();
                _ && this._dataProvider.setStaticStore(rd(_)), this._dataProvider.createInitialDataRequest(this._getInitialDataRequestConfigs(d, u));
                const E = d.reduce(((e, t) => {
                        let {
                            compId: r,
                            connections: n
                        } = t;
                        return e[r] = n.map((e => {
                            let {
                                compId: t
                            } = e;
                            return t
                        })), e
                    }), {}),
                    I = (e => {
                        let {
                            datasetConfigs: t
                        } = e;
                        const r = {},
                            n = {},
                            o = (e, t) => {
                                const o = n[e];
                                if (!o) return;
                                const a = r[o.masterDatasetId];
                                return a ? { ...o,
                                    masterDataset: t ? { ...a,
                                        api: a.api.inScope(t.repeaterId, t.itemId)
                                    } : a
                                } : o
                            };
                        return t.forEach((e => {
                            let {
                                id: t,
                                connections: r
                            } = e;
                            r.forEach((e => {
                                let {
                                    role: r,
                                    config: o
                                } = e;
                                r === K && Object.entries(o.filters).forEach((e => {
                                    let r, [o, {
                                        fieldName: a
                                    }] = e;
                                    n[o] = {
                                        id: o,
                                        fieldName: a,
                                        masterDatasetId: t,
                                        isResolved: !1,
                                        promise: new Promise((e => r = e)),
                                        resolve: () => {
                                            n[o].isResolved = !0, r()
                                        }
                                    }
                                }))
                            }))
                        })), {
                            resolveDependants: e => Object.values(n).forEach((t => {
                                let {
                                    id: r,
                                    masterDatasetId: o
                                } = t;
                                e === o && n[r].resolve()
                            })),
                            getDependencyResolutionPromise: e => {
                                const t = Yl(e).flatMap((e => n[e] && !n[e].isResolved ? [n[e].promise] : []));
                                return t.length > 0 ? Promise.all(t) : void 0
                            },
                            getDependencyById: o,
                            getDependenciesByFilter: (e, t) => Yl(e).flatMap((e => o(e, t) || [])),
                            registerDataset: e => {
                                let {
                                    id: t,
                                    api: n,
                                    config: o
                                } = e;
                                r[t] = {
                                    id: t,
                                    api: n,
                                    config: o
                                }
                            }
                        }
                    })({
                        datasetConfigs: d
                    }),
                    T = d.some((e => {
                        let {
                            type: t,
                            dynamicPageData: r
                        } = e;
                        return t === br && !(null == (n = null == r ? void 0 : r.dynamicUrl) || !n.match(/\{.+\}/));
                        var n
                    })),
                    R = T && d.some((e => {
                        let {
                            type: t,
                            dynamicPageData: r
                        } = e;
                        return t === br && (null == r ? void 0 : r.seoV2)
                    })),
                    w = s && T && R,
                    O = w ? (e => {
                        let {
                            seo: t,
                            pageUrl: r
                        } = e;
                        const {
                            logger: n
                        } = U;
                        let o;
                        const a = {
                            title: void 0,
                            pageUrl: r,
                            collections: []
                        };
                        return {
                            submitSeoData: e => {
                                let {
                                    title: t,
                                    collectionData: r
                                } = e;
                                o || (t && (a.title = t), r && a.collections.push(r))
                            },
                            renderSeoTagsOnce: () => (o || (o = t.renderSEOTags({
                                itemType: Jl.ITEM_TYPES.WIX_DATA_PAGE_ITEM,
                                itemData: a
                            }).catch((e => {
                                n.log(new S("Failed to render seo tags", {
                                    cause: e
                                }))
                            }))), o)
                        }
                    })({
                        seo: c,
                        pageUrl: l.pageUrl
                    }) : null,
                    P = d.map((e => {
                        let {
                            type: t,
                            config: s,
                            connections: c,
                            compId: l,
                            livePreviewOptions: {
                                shouldFetchData: d,
                                compsIdsToReset: u = []
                            } = {},
                            dynamicPageData: m
                        } = e;
                        const {
                            datasetIsRouter: _,
                            datasetIsDeferred: T
                        } = s.datasetStaticConfig;
                        this._logger.log(new Ye({
                            category: "createControllers",
                            message: "warmup data contents",
                            data: {
                                datasetId: l,
                                datasetType: t,
                                mode: n,
                                warmupData: Boolean(v)
                            }
                        }));
                        const R = (e => {
                                let {
                                    primaryDatasetId: t,
                                    recordStoreCache: r,
                                    refreshStoreCache: n,
                                    dataProvider: o,
                                    controllerConfig: a
                                } = e;
                                return tt.Result.fromNullable(a, "missing controller configuration").chain((e => {
                                    let {
                                        dataset: t
                                    } = e;
                                    return tt.Result.fromNullable(t, "controller configuration is missing dataset object")
                                })).chain((e => {
                                    let {
                                        collectionName: t
                                    } = e;
                                    return tt.Result.fromNullable(t, "dataset is not connected to a collection")
                                })).map((e => {
                                    const i = (0, D.get)(a, ["dataset", "includes"]),
                                        s = (0, D.get)(a, ["dataset", "nested"]),
                                        c = (0, D.get)(a, ["dataset", "cursor"]),
                                        l = (0, D.get)(a, ["dataset", "readWriteType"]),
                                        d = (0, D.get)(a, ["dataset", "uniqueFieldValues"]);
                                    return Ms({
                                        primaryDatasetId: t,
                                        recordStoreCache: r,
                                        refreshStoreCache: n,
                                        dataProvider: o,
                                        mainCollectionName: e,
                                        includes: i,
                                        nestedFieldKeys: s,
                                        uniqueFieldValues: d,
                                        readWriteType: l,
                                        cursorPagingRequired: c
                                    })
                                }))
                            })({
                                primaryDatasetId: l,
                                recordStoreCache: this._recordStoreCache,
                                refreshStoreCache: d,
                                dataProvider: this._dataProvider,
                                controllerConfig: s
                            }),
                            {
                                promise: S,
                                resolve: P
                            } = new G;
                        _ || T || f.push(S);
                        const {
                            promise: N,
                            resolve: C
                        } = new G;
                        h.push(N);
                        const b = o && p && this._warmupCache.getUserFilterInitialData(l);
                        b && this._dataProvider.setUserFilterInitialData(l, b);
                        const A = zl(this._logger, {
                            shouldCollectSeoData: w,
                            seoManager: O,
                            dependencyManager: I,
                            controllerConfig: s,
                            datasetType: t,
                            connections: c,
                            connectionsGraph: E,
                            recordStoreService: R,
                            dataProvider: this._dataProvider,
                            firePlatformEvent: r(l),
                            dynamicPagesData: _ && m ? {
                                dynamicPageData: m,
                                items: this._staticCache.getItems(),
                                datasetConfig: s
                            } : void 0,
                            datasetId: l,
                            schemasLoading: y,
                            listenersByEvent: this._listenersByEvent,
                            updatedCompIds: u,
                            markControllerAsRendered: C,
                            markDatasetDataFetched: P,
                            renderingRegularControllers: g,
                            modeIsLivePreview: i,
                            modeIsSSR: a
                        }).createRealDataset();
                        return I.registerDataset({
                            id: l,
                            api: A.api,
                            config: s
                        }), a && p && A.userFilterInitialDataPromise.then((e => {
                            this._warmupCache.setUserFilterInitialData(l, e)
                        })), Zl(A)
                    }));
                a && p && f.length && Promise.all(f).then((() => {
                    this._warmupCache.setDataStore(td(this._dataProvider.getStore()))
                })), Promise.all(h).then(m);
                const N = () => Promise.all(f).then(O.renderSeoTagsOnce);
                return w ? P.map((e => ({ ...e,
                    pageReady: function() {
                        return e.pageReady(...arguments).then(N)
                    }
                }))) : P
            }
            _updateDatasetConfigsState(e) {
                const {
                    appState: t
                } = U;
                return e.reduce(((e, r) => {
                    let {
                        compId: n,
                        config: {
                            dataset: o
                        }
                    } = r;
                    const a = t.datasetConfigs.get(n);
                    return a && !(0, D.isEqual)(a, o) && e.push(n), t.datasetConfigs.set(n, o), e
                }), [])
            }
            _getInitialDataRequestConfigs(e, t) {
                return e.reduce(((e, r) => {
                    let {
                        compId: n,
                        config: {
                            datasetStaticConfig: {
                                sequenceType: o
                            }
                        },
                        livePreviewOptions: {
                            shouldFetchData: a
                        } = {}
                    } = r;
                    return o === ea ? [...e, {
                        id: n,
                        refresh: a || t.includes(n)
                    }] : e
                }), [])
            }
        }
        const Xl = e => [...e.reduce(((e, t) => {
                let {
                    config: {
                        dataset: {
                            collectionName: r
                        }
                    }
                } = t;
                return r ? e.add(r) : e
            }), new Set)],
            Zl = e => {
                let {
                    pageReady: t,
                    exports: r,
                    dispose: n
                } = e;
                return {
                    pageReady: t,
                    exports: r,
                    dispose: n
                }
            },
            ed = e => t => {
                if (t) return { ...t,
                    recordsByCollectionId: Object.entries(t.recordsByCollectionId).reduce(((t, r) => {
                        let [n, o] = r;
                        return t[n] = e(o), t
                    }), {})
                }
            },
            td = ed(Gn.pY),
            rd = ed(Gn.aU),
            nd = e => {
                let {
                    datasetId: t,
                    record: r,
                    schema: n,
                    getSchema: o
                } = e;
                const a = {
                        "form-id": {
                            value: t,
                            keyName: ""
                        }
                    },
                    i = (0, D.pickBy)(n.fields, ((e, t) => ((e, t) => {
                        const r = e.type,
                            n = _.includes(r),
                            o = !!e.systemField,
                            a = ["_createdDate", "_updatedDate"].includes(t || e.name);
                        return (!o || a) && n
                    })(e, t) && ! function(e) {
                        return !!e.isDeleted
                    }(e)));
                return (0, D.forEach)(i, ((e, n) => {
                    const i = function(e) {
                        let {
                            record: t,
                            fieldData: r,
                            fieldName: n,
                            getSchema: o
                        } = e;
                        if ("reference" === r.type) {
                            const e = o(r.referencedCollection);
                            if (!e) return;
                            const a = fa(t[n], e.displayField);
                            return {
                                value: ga(a),
                                type: e.fields[e.displayField].type
                            }
                        }
                        return {
                            value: ga(fa(t, n)),
                            type: r.type
                        }
                    }({
                        record: r,
                        fieldData: e,
                        fieldName: n,
                        getSchema: o
                    });
                    if (!i) return;
                    const {
                        value: s,
                        type: c
                    } = i, {
                        displayName: l,
                        index: d
                    } = e, u = ((e, t) => `${e}.${t}`)(t, n);
                    a[`field:${u}`] = {
                        value: s,
                        keyName: l,
                        index: d,
                        valueType: c
                    }
                })), a
            };
        const od = e => {
            let {
                automationsClientCreator: t,
                pageId: r
            } = e;
            const n = t().reportFormEventToAutomationCreator();
            return {
                afterSave: async (e, t, o) => {
                    let {
                        datasetId: a,
                        getSchema: i,
                        getState: s
                    } = e;
                    const c = s(),
                        l = i();
                    if (!Boolean(c.records.isForm) || !l) return;
                    const {
                        eventUTCTime: d,
                        detailedEventPayload: u,
                        collectionId: p
                    } = (e => {
                        let {
                            datasetId: t,
                            getSchema: r,
                            record: n,
                            schema: o
                        } = e;
                        return {
                            eventUTCTime: fa(n, "_updatedDate"),
                            detailedEventPayload: nd({
                                datasetId: t,
                                record: n,
                                schema: o,
                                getSchema: r
                            }),
                            collectionId: o.id
                        }
                    })({
                        datasetId: a,
                        record: o,
                        schema: l,
                        getSchema: i
                    });
                    await n({
                        eventUTCTime: d,
                        detailedEventPayload: u
                    }, p, r)
                }
            }
        };
        a(9308);
        var ad = a(3182);
        a(400);
        const id = e => `WDE0025: The ${e} collection does not exist. You cannot work with a collection using the Data API before it is created in the Editor.`,
            sd = e => `WDE0026: The ${e} collection was removed, so you cannot work with it. To restore its data, create a new collection with the same name.`,
            cd = {
                ItemDoesNotExist: "WD_ITEM_DOES_NOT_EXIST",
                ItemAlreadyExists: "WD_ITEM_ALREADY_EXISTS",
                SiteInTemplateMode: "WD_SITE_IN_TEMPLATE_MODE",
                UnknownError: "WD_UNKNOWN_ERROR",
                ValidationError: "WD_VALIDATION_ERROR",
                CollectionDeleted: "WD_COLLECTION_DELETED",
                SchemaDoesNotExist: "WD_SCHEMA_DOES_NOT_EXIST",
                PermissionDenied: "WD_PERMISSION_DENIED",
                BadRequest: "WD_BAD_REQUEST",
                Unauthorized: "WD_UNAUTHORIZED",
                TooManyRequests: "WD_TOO_MANY_REQUESTS",
                RequestTimedOut: "WD_REQUEST_TIMED_OUT",
                QuotaExceeded: "WD_DATABASE_QUOTA_EXCEEDED",
                QueryExecutionError: "WD_QUERY_EXECUTION_ERROR"
            };

        function ld(e, t, r) {
            return dd(e, t, r)
        }

        function dd(e, t, r) {
            const n = new(t && t !== cd.UnknownError ? pd : Error)(e);
            return n.code = t, r && (n.details = r), n
        }

        function ud(e) {
            return ld(id(e), cd.SchemaDoesNotExist)
        }

        function pd(e) {
            const t = new ad.UserCodeError(e);
            return Object.setPrototypeOf(t, Object.getPrototypeOf(this)), Error.captureStackTrace && Error.captureStackTrace(t, pd), t.name = Error.name, t
        }
        Object.create(Error.prototype, {
            constructor: {
                value: Error,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), pd.prototype = Object.create(ad.UserCodeError.prototype, {
            constructor: {
                value: pd,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        });
        var fd, hd = (fd = function(e, t) {
            return fd = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
            }, fd(e, t)
        }, function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

            function r() {
                this.constructor = e
            }
            fd(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        });

        function md(e) {
            return function(e, t) {
                return Promise.reject(ld(e, t))
            }(sd(e), cd.CollectionDeleted)
        }
        var gd, yd, vd, _d, Ed, Id, Td, Rd, wd, Sd, Od, Pd, Nd, Cd, bd, Dd = function(e) {
                function t(t, r) {
                    var n = e.call(this, t) || this;
                    return Object.setPrototypeOf(n, r.prototype), n.name = r.name, Error.captureStackTrace ? Error.captureStackTrace(n, r) : n.stack = new Error(t).stack, n
                }
                return hd(t, e), t
            }(Error),
            Ad = function(e) {
                function t(r) {
                    var n = e.call(this, r, t) || this;
                    return n.reason = r, n.message = r, n
                }
                return hd(t, e), t
            }(Dd),
            Fd = function(e) {
                function t(r, n, o, a) {
                    var i = e.call(this, o, t) || this;
                    return i.status = r, i.responseText = n, i.requestId = a, i
                }
                return hd(t, e), t
            }(Dd);

        function xd(e) {
            return Object.keys(e).reduce((function(t, r) {
                return void 0 !== e[r] && (t[r] = e[r]), t
            }), {})
        }

        function Ld(e) {
            for (var t = {}, r = 0, n = Object.keys(e); r < n.length; r++) {
                var o = n[r],
                    a = e[o];
                void 0 !== a && (t[a] = o)
            }
            return t
        }

        function Ud(e, t) {
            return null == e ? void 0 : t(e)
        }! function(e) {
            e.NATIVE = "NATIVE", e.WIX_APP = "WIX_APP", e.BLOCKS_APP = "BLOCKS_APP", e.EXTERNAL = "EXTERNAL"
        }(gd || (gd = {})),
        function(e) {
            e.ASC = "ASC", e.DESC = "DESC"
        }(yd || (yd = {})),
        function(e) {
            e.AGGREGATE = "AGGREGATE", e.BULK_INSERT = "BULK_INSERT", e.BULK_REMOVE = "BULK_REMOVE", e.BULK_SAVE = "BULK_SAVE", e.BULK_UPDATE = "BULK_UPDATE", e.COUNT = "COUNT", e.DISTINCT = "DISTINCT", e.FIND = "FIND", e.GET = "GET", e.INSERT = "INSERT", e.INSERT_REFERENCE = "INSERT_REFERENCE", e.IS_REFERENCED = "IS_REFERENCED", e.QUERY_REFERENCED = "QUERY_REFERENCED", e.REMOVE = "REMOVE", e.REMOVE_REFERENCE = "REMOVE_REFERENCE", e.REPLACE_REFERENCES = "REPLACE_REFERENCES", e.SAVE = "SAVE", e.TRUNCATE = "TRUNCATE", e.UPDATE = "UPDATE"
        }(vd || (vd = {})),
        function(e) {
            e.UPDATE = "UPDATE", e.REMOVE = "REMOVE"
        }(_d || (_d = {})),
        function(e) {
            e.UNKNOWN_FIELD_TYPE = "UNKNOWN_FIELD_TYPE", e.TEXT = "TEXT", e.NUMBER = "NUMBER", e.DATE = "DATE", e.DATETIME = "DATETIME", e.IMAGE = "IMAGE", e.BOOLEAN = "BOOLEAN", e.DOCUMENT = "DOCUMENT", e.URL = "URL", e.RICH_TEXT = "RICH_TEXT", e.VIDEO = "VIDEO", e.ANY = "ANY", e.ARRAY_STRING = "ARRAY_STRING", e.ARRAY_DOCUMENT = "ARRAY_DOCUMENT", e.AUDIO = "AUDIO", e.TIME = "TIME", e.LANGUAGE = "LANGUAGE", e.RICH_CONTENT = "RICH_CONTENT", e.MEDIA_GALLERY = "MEDIA_GALLERY", e.ADDRESS = "ADDRESS", e.PAGE_LINK = "PAGE_LINK", e.REFERENCE = "REFERENCE", e.MULTI_REFERENCE = "MULTI_REFERENCE", e.OBJECT = "OBJECT", e.ARRAY = "ARRAY", e.LEGACY_TIME = "LEGACY_TIME", e.LEGACY_BOOK = "LEGACY_BOOK", e.LEGACY_EXTERNAL_URL = "LEGACY_EXTERNAL_URL", e.LEGACY_BROKEN_REFERENCE = "LEGACY_BROKEN_REFERENCE", e.LEGACY_IMAGE = "LEGACY_IMAGE", e.LEGACY_COLOR = "LEGACY_COLOR", e.LEGACY_EXTERNAL_VIDEO = "LEGACY_EXTERNAL_VIDEO"
        }(Ed || (Ed = {})),
        function(e) {
            e.EQ = "EQ", e.LT = "LT", e.GT = "GT", e.NE = "NE", e.LTE = "LTE", e.GTE = "GTE", e.STARTS_WITH = "STARTS_WITH", e.ENDS_WITH = "ENDS_WITH", e.CONTAINS = "CONTAINS", e.HAS_SOME = "HAS_SOME", e.HAS_ALL = "HAS_ALL", e.EXISTS = "EXISTS", e.URLIZED = "URLIZED"
        }(Id || (Id = {})),
        function(e) {
            e.UNKNOWN = "UNKNOWN", e.CMS = "CMS"
        }(Td || (Td = {})),
        function(e) {
            e.UNKNOWN_ROLE = "UNKNOWN_ROLE", e.ADMIN = "ADMIN", e.SITE_MEMBER_AUTHOR = "SITE_MEMBER_AUTHOR", e.SITE_MEMBER = "SITE_MEMBER", e.ANYONE = "ANYONE"
        }(Rd || (Rd = {})),
        function(e) {
            e.UNKNOWN_PUBLISH_PLUGIN_STATUS = "UNKNOWN_PUBLISH_PLUGIN_STATUS", e.PUBLISHED = "PUBLISHED", e.DRAFT = "DRAFT"
        }(wd || (wd = {})),
        function(e) {
            e.UNKNOWN_URLIZED_PLUGIN_FORMAT = "UNKNOWN_URLIZED_PLUGIN_FORMAT", e.ORIGINAL = "ORIGINAL", e.PLAIN = "PLAIN"
        }(Sd || (Sd = {})),
        function(e) {
            e.UNKNOWN_PLUGIN_TYPE = "UNKNOWN_PLUGIN_TYPE", e.PUBLISH = "PUBLISH", e.SINGLE_ITEM = "SINGLE_ITEM", e.URLIZED = "URLIZED", e.GRIDAPPLESS = "GRIDAPPLESS", e.MULTILINGUAL = "MULTILINGUAL", e.SHARED = "SHARED", e.EDITABLE_PAGE_LINK = "EDITABLE_PAGE_LINK", e.CMS = "CMS"
        }(Od || (Od = {})),
        function(e) {
            e.OFFSET = "OFFSET", e.CURSOR = "CURSOR"
        }(Pd || (Pd = {})),
        function(e) {
            e.ASC = "ASC", e.DESC = "DESC"
        }(Nd || (Nd = {})),
        function(e) {
            e.ASC = "ASC", e.DESC = "DESC"
        }(Cd || (Cd = {})),
        function(e) {
            e.UNKNOWN = "UNKNOWN", e.BUILDING = "BUILDING", e.ACTIVE = "ACTIVE", e.DROPPING = "DROPPING", e.DROPPED = "DROPPED", e.FAILED = "FAILED", e.INVALID = "INVALID"
        }(bd || (bd = {}));
        var Md, kd = function() {
                return kd = Object.assign || function(e) {
                    for (var t, r = 1, n = arguments.length; r < n; r++)
                        for (var o in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                    return e
                }, kd.apply(this, arguments)
            },
            Gd = {
                ADMIN: l.PermissionRole.admin,
                SITE_MEMBER_AUTHOR: l.PermissionRole.siteMemberAuthor,
                SITE_MEMBER: l.PermissionRole.siteMember,
                ANYONE: l.PermissionRole.anyone,
                UNKNOWN_ROLE: void 0
            },
            jd = Ld(Gd),
            Bd = {
                TEXT: l.FieldType.text,
                NUMBER: l.FieldType.number,
                DATE: l.FieldType.date,
                DATETIME: l.FieldType.dateTime,
                IMAGE: l.FieldType.image,
                BOOLEAN: l.FieldType.boolean,
                DOCUMENT: l.FieldType.document,
                URL: l.FieldType.url,
                RICH_TEXT: l.FieldType.richText,
                VIDEO: l.FieldType.video,
                ANY: l.FieldType.any,
                ARRAY_STRING: l.FieldType.stringArray,
                ARRAY_DOCUMENT: l.FieldType.documentArray,
                AUDIO: l.FieldType.audio,
                TIME: l.FieldType.time,
                LANGUAGE: l.FieldType.language,
                RICH_CONTENT: l.FieldType.richContent,
                MEDIA_GALLERY: l.FieldType.mediaGallery,
                ADDRESS: l.FieldType.address,
                PAGE_LINK: l.FieldType.pageLink,
                REFERENCE: l.FieldType.reference,
                MULTI_REFERENCE: l.FieldType.multiReference,
                OBJECT: l.FieldType.object,
                ARRAY: l.FieldType.array,
                LEGACY_TIME: l.FieldType.time,
                LEGACY_BOOK: l.FieldType.legacyBook,
                LEGACY_EXTERNAL_URL: l.FieldType.legacyExternalUrl,
                LEGACY_BROKEN_REFERENCE: l.FieldType.legacyBrokenRef,
                LEGACY_IMAGE: l.FieldType.legacyImage,
                LEGACY_COLOR: l.FieldType.color,
                LEGACY_EXTERNAL_VIDEO: l.FieldType.legacyExternalVideo,
                UNKNOWN_FIELD_TYPE: void 0
            },
            Vd = kd(kd({}, Ld(Bd)), ((Md = {})[l.FieldType.time] = Ed.TIME, Md)),
            $d = [{
                v1Type: l.MULTILINGUAL_PLUGIN_ID,
                v2Type: Od.MULTILINGUAL,
                toV2: function(e) {
                    return {
                        multilingualOptions: {
                            translatableFieldKeys: e.translatable
                        }
                    }
                },
                toV1: function(e) {
                    var t, r;
                    return {
                        translatable: null !== (r = null === (t = e.multilingualOptions) || void 0 === t ? void 0 : t.translatableFieldKeys) && void 0 !== r ? r : []
                    }
                }
            }, {
                v1Type: l.PUBLISHING_PLUGIN_ID,
                v2Type: Od.PUBLISH,
                toV2: function(e) {
                    return {
                        publishOptions: {
                            defaultStatus: e.defaultStatus
                        }
                    }
                },
                toV1: function(e) {
                    var t;
                    return {
                        defaultStatus: null === (t = e.publishOptions) || void 0 === t ? void 0 : t.defaultStatus
                    }
                }
            }, {
                v1Type: l.SINGLES_PLUGIN_ID,
                v2Type: Od.SINGLE_ITEM,
                toV2: function(e) {
                    return {
                        singleItemOptions: {
                            singleItemId: e.singleItemId
                        }
                    }
                },
                toV1: function(e) {
                    var t, r;
                    return {
                        singleItemId: null !== (r = null === (t = e.singleItemOptions) || void 0 === t ? void 0 : t.singleItemId) && void 0 !== r ? r : "SINGLE_ITEM_ID"
                    }
                }
            }, {
                v1Type: l.URLIZED_PLUGIN_ID,
                v2Type: Od.URLIZED,
                toV2: function(e) {
                    return {
                        urlizedOptions: {
                            format: e.format.toUpperCase()
                        }
                    }
                },
                toV1: function(e) {
                    var t;
                    return {
                        format: (null === (t = e.urlizedOptions) || void 0 === t ? void 0 : t.format) === Sd.ORIGINAL ? l.UrlizedFormat.ORIGINAL : l.UrlizedFormat.PLAIN
                    }
                }
            }, {
                v1Type: l.GRID_APPLESS_PLUGIN_ID,
                v2Type: Od.GRIDAPPLESS,
                toV2: function(e) {
                    return {
                        gridapplessOptions: {
                            migrated: e.isMigrated
                        }
                    }
                },
                toV1: function(e) {
                    var t, r;
                    return {
                        isMigrated: null !== (r = null === (t = e.gridapplessOptions) || void 0 === t ? void 0 : t.migrated) && void 0 !== r && r
                    }
                }
            }, {
                v1Type: l.SHARED_PLUGIN_ID,
                v2Type: Od.SHARED,
                toV2: function(e) {
                    return {}
                },
                toV1: function(e) {
                    return {}
                }
            }, {
                v1Type: l.PAGE_LINK_PLUGIN_ID,
                v2Type: Od.EDITABLE_PAGE_LINK,
                toV2: function(e) {
                    return {
                        editablePageLinkOptions: {
                            isPersisted: e.isPersisted,
                            isMutable: e.isUpdatable
                        }
                    }
                },
                toV1: function(e) {
                    var t, r, n, o;
                    return {
                        isPersisted: null !== (r = null === (t = e.editablePageLinkOptions) || void 0 === t ? void 0 : t.isPersisted) && void 0 !== r && r,
                        isUpdatable: null !== (o = null === (n = e.editablePageLinkOptions) || void 0 === n ? void 0 : n.isMutable) && void 0 !== o && o
                    }
                }
            }, {
                v1Type: l.CMS_PLUGIN_ID,
                v2Type: Od.CMS,
                toV1: function(e) {
                    var t, r;
                    return kd(kd({}, null !== (t = e.cmsOptions) && void 0 !== t ? t : {}), {
                        siteSort: Ud(null === (r = e.cmsOptions) || void 0 === r ? void 0 : r.siteSort, (function(e) {
                            var t;
                            return {
                                sort: (null !== (t = e.sort) && void 0 !== t ? t : []).map((function(e) {
                                    var t;
                                    return {
                                        fieldName: e.fieldKey,
                                        direction: null === (t = e.direction) || void 0 === t ? void 0 : t.toLowerCase()
                                    }
                                }))
                            }
                        }))
                    })
                },
                toV2: function(e) {
                    return {
                        cmsOptions: kd(kd({}, e), {
                            siteSort: Ud(e.siteSort, (function(e) {
                                return {
                                    sort: e.sort.map((function(e) {
                                        var t;
                                        return {
                                            fieldKey: e.fieldName,
                                            direction: null === (t = e.direction) || void 0 === t ? void 0 : t.toUpperCase()
                                        }
                                    }))
                                }
                            }))
                        })
                    }
                }
            }];
        var Wd, qd, Hd = [{
            v1Type: l.CMS_FIELD_PLUGIN_ID,
            v2Type: Td.CMS,
            toV1: function(e) {
                var t, r;
                return {
                    internal: null !== (r = null === (t = e.cmsOptions) || void 0 === t ? void 0 : t.internal) && void 0 !== r && r
                }
            },
            toV2: function(e) {
                return {
                    cmsOptions: {
                        internal: e.internal
                    }
                }
            }
        }];

        function zd(e) {
            for (var t = {}, r = function(e) {
                    var r = Hd.find((function(t) {
                        return t.v2Type === e.type
                    }));
                    void 0 !== r ? t[r.v1Type] = r.toV1(e) : t[e.type] = e
                }, n = 0, o = e; n < o.length; n++) {
                r(o[n])
            }
            return t
        }

        function Yd(e) {
            for (var t = [], r = function(e, r) {
                    var n = Hd.find((function(t) {
                        return t.v1Type === e
                    }));
                    void 0 !== n ? t.push(kd({
                        type: n.v2Type
                    }, n.toV2(r))) : t.push(r)
                }, n = 0, o = Object.entries(e); n < o.length; n++) {
                var a = o[n];
                r(a[0], a[1])
            }
            return t
        }

        function Jd(e) {
            if (e.permissions) return {
                insert: jd[e.permissions.insert],
                update: jd[e.permissions.update],
                remove: jd[e.permissions.remove],
                read: jd[e.permissions.read]
            }
        }

        function Kd(e) {
            return Object.entries(e.fields || {}).filter((function(e) {
                e[0];
                return !e[1].isDeleted
            })).sort((function(e, t) {
                var r, n, o = null !== (r = e[1].index) && void 0 !== r ? r : 0,
                    a = null !== (n = t[1].index) && void 0 !== n ? n : 0;
                return o > a ? 1 : o < a || null != o && null == a ? -1 : null == o && null != a ? 1 : 0
            })).map((function(e) {
                return function(e, t) {
                    function r(e) {
                        return Object.values(e).some((function(e) {
                            return void 0 !== e
                        })) ? e : void 0
                    }
                    return xd({
                        key: e,
                        displayName: t.displayName,
                        type: Vd[t.type],
                        typeMetadata: Qd(t),
                        encrypted: t.pii,
                        description: t.description,
                        plugin: t.plugin,
                        stringLengthRange: r({
                            minLength: t.minStrLength,
                            maxLength: t.maxStrLength
                        }),
                        arraySizeRange: r({
                            minSize: t.minArraySize,
                            maxSize: t.maxArraySize
                        }),
                        readOnly: t.readOnly,
                        numberRange: r({
                            min: t.minValue,
                            max: t.maxValue
                        }),
                        immutable: t.immutable,
                        required: t.required,
                        plugins: Ud(t.plugins, Yd)
                    })
                }(e[0], e[1])
            }))
        }

        function Qd(e) {
            switch (e.type) {
                case "pagelink":
                    return function(e) {
                        return null == e.calculator || null == e.calculator.config ? void 0 : {
                            pageLink: {
                                linkedRouterPage: e.linkedRouterPage,
                                calculator: xd({
                                    fieldsPattern: xd({
                                        pattern: e.calculator.config.pattern,
                                        lowercase: e.calculator.config.lowercase
                                    }),
                                    urlizedOnlyPattern: xd({
                                        pattern: e.calculator.config.pattern
                                    })
                                })
                            }
                        }
                    }(e);
                case "reference":
                    return function(e) {
                        return {
                            reference: {
                                referencedCollectionId: e.referencedCollection
                            }
                        }
                    }(e);
                case "multi-reference":
                    return function(e) {
                        return {
                            multiReference: {
                                referencedCollectionId: e.referencedCollection,
                                referencingFieldKey: e.referencingFieldKey,
                                referencingDisplayName: e.referencingDisplayName
                            }
                        }
                    }(e);
                case "object":
                    return function(e) {
                        return null == e.fields ? void 0 : {
                            object: {
                                fields: Object.entries(e.fields).map((function(e) {
                                    return function(e, t) {
                                        return xd({
                                            key: e,
                                            displayName: t.displayName,
                                            type: Vd[t.type],
                                            typeMetadata: Qd(t)
                                        })
                                    }(e[0], e[1])
                                }))
                            }
                        }
                    }(e);
                case "array":
                    return function(e) {
                        return null == e.elementType ? void 0 : {
                            array: xd({
                                elementType: Vd[e.elementType.type],
                                typeMetadata: Qd(e.elementType)
                            })
                        }
                    }(e)
            }
        }

        function Xd(e) {
            var t;
            return function(e) {
                for (var t = [], r = function(e, r) {
                        var n = $d.find((function(t) {
                            return t.v1Type === e
                        }));
                        void 0 !== n ? t.push(kd({
                            type: n.v2Type
                        }, n.toV2(r))) : t.push(r)
                    }, n = 0, o = Object.entries(e); n < o.length; n++) {
                    var a = o[n];
                    r(a[0], a[1])
                }
                return t
            }(null !== (t = e.plugins) && void 0 !== t ? t : {})
        }
        var Zd = ((Wd = {})[Pd.OFFSET] = l.PagingMode.Offset, Wd[Pd.CURSOR] = l.PagingMode.Cursor, Wd),
            eu = ((qd = {})[gd.NATIVE] = l.Storage.docstore, qd[gd.WIX_APP] = l.Storage.driver, qd[gd.BLOCKS_APP] = l.Storage.staticAppSchema, qd[gd.EXTERNAL] = l.Storage.external, qd),
            tu = {
                IS_REFERENCED: l.DataOperation.isReferenced,
                INSERT: l.DataOperation.insert,
                SAVE: l.DataOperation.save,
                BULK_INSERT: l.DataOperation.bulkInsert,
                BULK_UPDATE: l.DataOperation.bulkUpdate,
                UPDATE: l.DataOperation.update,
                TRUNCATE: l.DataOperation.truncate,
                REMOVE: l.DataOperation.remove,
                REMOVE_REFERENCE: l.DataOperation.removeReference,
                COUNT: l.DataOperation.count,
                FIND: l.DataOperation.find,
                REPLACE_REFERENCES: l.DataOperation.replaceReferences,
                BULK_REMOVE: l.DataOperation.bulkRemove,
                INSERT_REFERENCE: l.DataOperation.insertReference,
                GET: l.DataOperation.get,
                BULK_SAVE: l.DataOperation.bulkSave,
                QUERY_REFERENCED: l.DataOperation.queryReferenced,
                DISTINCT: l.DataOperation.distinct,
                AGGREGATE: l.DataOperation.aggregate
            },
            ru = {
                UPDATE: l.CollectionOperation.UPDATE,
                REMOVE: l.CollectionOperation.REMOVE
            },
            nu = {
                EQ: l.AllowedFilterOperator.eq,
                LT: l.AllowedFilterOperator.lt,
                GT: l.AllowedFilterOperator.gt,
                NE: l.AllowedFilterOperator.ne,
                LTE: l.AllowedFilterOperator.lte,
                GTE: l.AllowedFilterOperator.gte,
                STARTS_WITH: l.AllowedFilterOperator.startsWith,
                ENDS_WITH: l.AllowedFilterOperator.endsWith,
                CONTAINS: l.AllowedFilterOperator.contains,
                HAS_SOME: l.AllowedFilterOperator.hasSome,
                HAS_ALL: l.AllowedFilterOperator.hasAll,
                EXISTS: l.AllowedFilterOperator.exists,
                URLIZED: l.AllowedFilterOperator.urlized
            };

        function ou(e) {
            var t, r, n, o = e;
            return xd({
                id: o.id,
                isDeleted: !1,
                namespace: yu(o.id),
                storage: eu[o.collectionType],
                ownerAppId: o.ownerAppId || null,
                displayNamespace: o.displayNamespace || null,
                displayField: o.displayField,
                allowedOperations: su(o),
                collectionOperations: cu(o),
                fields: uu(o),
                displayName: null !== (t = o.displayName) && void 0 !== t ? t : o.id,
                permissions: iu(o),
                maxPageSize: null !== (r = o.maxPageSize) && void 0 !== r ? r : void 0,
                defaultSort: lu(o.defaultDisplayOrder),
                version: au(o.revision),
                plugins: du(o.plugins),
                pagingMode: null === (n = o.pagingModes) || void 0 === n ? void 0 : n.map((function(e) {
                    return Zd[e]
                })),
                translatable: !1,
                ttl: null,
                capabilities: _u(o)
            })
        }

        function au(e) {
            var t = parseInt(null != e ? e : "0", 10);
            return isNaN(t) ? 0 : t
        }

        function iu(e) {
            if (e.permissions) {
                var t = e.permissions;
                return {
                    read: Gd[t.read],
                    insert: Gd[t.insert],
                    remove: Gd[t.remove],
                    update: Gd[t.update]
                }
            }
        }

        function su(e) {
            var t, r = null === (t = null == e ? void 0 : e.capabilities) || void 0 === t ? void 0 : t.dataOperations;
            return null == r ? void 0 : r.map((function(e) {
                return tu[e]
            }))
        }

        function cu(e) {
            var t, r = null === (t = null == e ? void 0 : e.capabilities) || void 0 === t ? void 0 : t.collectionOperations;
            return null == r ? void 0 : r.map((function(e) {
                return ru[e]
            }))
        }

        function lu(e) {
            return e ? {
                direction: e.direction === yd.DESC ? l.Direction.desc : l.Direction.asc,
                fieldName: e.fieldKey
            } : null
        }

        function du(e) {
            if (e) return function(e) {
                for (var t = {}, r = function(e) {
                        var r = $d.find((function(t) {
                            return t.v2Type === e.type
                        }));
                        void 0 !== r ? t[r.v1Type] = r.toV1(e) : t[e.type] = e
                    }, n = 0, o = e; n < o.length; n++) r(o[n]);
                return t
            }(e)
        }

        function uu(e) {
            return e.fields ? e.fields.reduce((function(e, t, r) {
                var n;
                return Object.assign({}, e, ((n = {})[t.key] = function(e, t) {
                    var r, n, o, a, i, s, c, l, d, u, p, f, h, m, g, y, v, _, E, I, T, R, w, S, O, P, N, C = e;
                    return xd({
                        displayName: null !== (r = C.displayName) && void 0 !== r ? r : C.key,
                        systemField: null !== (n = C.systemField) && void 0 !== n && n,
                        sortable: null === (o = null == C ? void 0 : C.capabilities) || void 0 === o ? void 0 : o.sortable,
                        isDeleted: !1,
                        index: t,
                        queryOperators: mu(C),
                        plugin: null !== (a = null == C ? void 0 : C.plugin) && void 0 !== a ? a : void 0,
                        calculator: gu(C),
                        pii: !!C.encrypted || void 0,
                        linkedRouterPage: null !== (c = null === (s = null === (i = null == C ? void 0 : C.typeMetadata) || void 0 === i ? void 0 : i.pageLink) || void 0 === s ? void 0 : s.linkedRouterPage) && void 0 !== c ? c : void 0,
                        description: null !== (l = C.description) && void 0 !== l ? l : void 0,
                        readOnly: null !== (d = C.readOnly) && void 0 !== d ? d : void 0,
                        immutable: null !== (u = C.immutable) && void 0 !== u ? u : void 0,
                        required: null !== (p = C.required) && void 0 !== p ? p : void 0,
                        minValue: null !== (h = null === (f = null == C ? void 0 : C.numberRange) || void 0 === f ? void 0 : f.min) && void 0 !== h ? h : void 0,
                        maxValue: null !== (g = null === (m = null == C ? void 0 : C.numberRange) || void 0 === m ? void 0 : m.max) && void 0 !== g ? g : void 0,
                        minStrLength: null !== (v = null === (y = null == C ? void 0 : C.stringLengthRange) || void 0 === y ? void 0 : y.minLength) && void 0 !== v ? v : void 0,
                        maxStrLength: null !== (E = null === (_ = null == C ? void 0 : C.stringLengthRange) || void 0 === _ ? void 0 : _.maxLength) && void 0 !== E ? E : void 0,
                        minArraySize: null !== (T = null === (I = null == C ? void 0 : C.arraySizeRange) || void 0 === I ? void 0 : I.minSize) && void 0 !== T ? T : void 0,
                        maxArraySize: null !== (w = null === (R = null == C ? void 0 : C.arraySizeRange) || void 0 === R ? void 0 : R.maxSize) && void 0 !== w ? w : void 0,
                        type: Bd[C.type],
                        referencedCollection: vu(C.typeMetadata),
                        referencingFieldKey: null === (O = null === (S = C.typeMetadata) || void 0 === S ? void 0 : S.multiReference) || void 0 === O ? void 0 : O.referencingFieldKey,
                        referencingDisplayName: null === (N = null === (P = C.typeMetadata) || void 0 === P ? void 0 : P.multiReference) || void 0 === N ? void 0 : N.referencingDisplayName,
                        fields: fu(C.typeMetadata),
                        elementType: hu(C.typeMetadata),
                        plugins: Ud(C.plugins, zd)
                    })
                }(t, r), n))
            }), {}) : {}
        }

        function pu(e, t) {
            return {
                type: Bd[e],
                fields: fu(t),
                elementType: hu(t)
            }
        }

        function fu(e) {
            var t, r = null == e ? void 0 : e.object;
            if (r) return null === (t = r.fields) || void 0 === t ? void 0 : t.reduce((function(e, t) {
                var r;
                return Object.assign(e, ((r = {})[t.key] = function(e) {
                    var t;
                    return xd(Object.assign({
                        displayName: e.displayName,
                        sortable: null === (t = null == e ? void 0 : e.capabilities) || void 0 === t ? void 0 : t.sortable,
                        queryOperators: mu(e)
                    }, pu(e.type, e.typeMetadata)))
                }(t), r))
            }), {})
        }

        function hu(e) {
            var t = null == e ? void 0 : e.array;
            if (t) return xd(pu(t.elementType, t.typeMetadata))
        }

        function mu(e) {
            var t, r = null === (t = null == e ? void 0 : e.capabilities) || void 0 === t ? void 0 : t.queryOperators;
            return r ? r.length >= Object.keys(nu).length ? void 0 : r.map((function(e) {
                return nu[e]
            })) : []
        }

        function gu(e) {
            var t, r, n, o, a, i, s, c, l, d, u = null === (t = e.typeMetadata) || void 0 === t ? void 0 : t.pageLink;
            return u ? {
                config: {
                    lowercase: null !== (o = null === (n = null === (r = u.calculator) || void 0 === r ? void 0 : r.fieldsPattern) || void 0 === n ? void 0 : n.lowercase) && void 0 !== o && o,
                    pattern: null !== (d = null !== (s = null === (i = null === (a = u.calculator) || void 0 === a ? void 0 : a.fieldsPattern) || void 0 === i ? void 0 : i.pattern) && void 0 !== s ? s : null === (l = null === (c = u.calculator) || void 0 === c ? void 0 : c.urlizedOnlyPattern) || void 0 === l ? void 0 : l.pattern) && void 0 !== d ? d : "unknown"
                }
            } : void 0
        }

        function yu(e) {
            if (!e) return null;
            var t = e.lastIndexOf("/");
            return -1 === t ? null : e.substring(0, t)
        }

        function vu(e) {
            var t, r, n;
            return null !== (r = null === (t = null == e ? void 0 : e.multiReference) || void 0 === t ? void 0 : t.referencedCollectionId) && void 0 !== r ? r : null === (n = null == e ? void 0 : e.reference) || void 0 === n ? void 0 : n.referencedCollectionId
        }

        function _u(e) {
            var t, r = null === (t = null == e ? void 0 : e.capabilities) || void 0 === t ? void 0 : t.indexLimits;
            if (r) return {
                indexing: {
                    regular: r.regular,
                    unique: r.unique,
                    total: r.total
                }
            }
        }
        var Eu = function() {
                return Eu = Object.assign || function(e) {
                    for (var t, r = 1, n = arguments.length; r < n; r++)
                        for (var o in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                    return e
                }, Eu.apply(this, arguments)
            },
            Iu = function(e, t, r, n) {
                return new(r || (r = Promise))((function(o, a) {
                    function i(e) {
                        try {
                            c(n.next(e))
                        } catch (e) {
                            a(e)
                        }
                    }

                    function s(e) {
                        try {
                            c(n.throw(e))
                        } catch (e) {
                            a(e)
                        }
                    }

                    function c(e) {
                        var t;
                        e.done ? o(e.value) : (t = e.value, t instanceof r ? t : new r((function(e) {
                            e(t)
                        }))).then(i, s)
                    }
                    c((n = n.apply(e, t || [])).next())
                }))
            },
            Tu = function(e, t) {
                var r, n, o, a, i = {
                    label: 0,
                    sent: function() {
                        if (1 & o[0]) throw o[1];
                        return o[1]
                    },
                    trys: [],
                    ops: []
                };
                return a = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                }, "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                    return this
                }), a;

                function s(s) {
                    return function(c) {
                        return function(s) {
                            if (r) throw new TypeError("Generator is already executing.");
                            for (; a && (a = 0, s[0] && (i = 0)), i;) try {
                                if (r = 1, n && (o = 2 & s[0] ? n.return : s[0] ? n.throw || ((o = n.return) && o.call(n), 0) : n.next) && !(o = o.call(n, s[1])).done) return o;
                                switch (n = 0, o && (s = [2 & s[0], o.value]), s[0]) {
                                    case 0:
                                    case 1:
                                        o = s;
                                        break;
                                    case 4:
                                        return i.label++, {
                                            value: s[1],
                                            done: !1
                                        };
                                    case 5:
                                        i.label++, n = s[1], s = [0];
                                        continue;
                                    case 7:
                                        s = i.ops.pop(), i.trys.pop();
                                        continue;
                                    default:
                                        if (!(o = i.trys, (o = o.length > 0 && o[o.length - 1]) || 6 !== s[0] && 2 !== s[0])) {
                                            i = 0;
                                            continue
                                        }
                                        if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {
                                            i.label = s[1];
                                            break
                                        }
                                        if (6 === s[0] && i.label < o[1]) {
                                            i.label = o[1], o = s;
                                            break
                                        }
                                        if (o && i.label < o[2]) {
                                            i.label = o[2], i.ops.push(s);
                                            break
                                        }
                                        o[2] && i.ops.pop(), i.trys.pop();
                                        continue
                                }
                                s = t.call(e, i)
                            } catch (e) {
                                s = [6, e], n = 0
                            } finally {
                                r = o = 0
                            }
                            if (5 & s[0]) throw s[1];
                            return {
                                value: s[0] ? s[1] : void 0,
                                done: !0
                            }
                        }([s, c])
                    }
                }
            },
            Ru = function() {
                function e(e) {
                    this.transport = e
                }
                return e.prototype.get = function(e, t) {
                    var r, n, o;
                    return Iu(this, void 0, void 0, (function() {
                        var a;
                        return Tu(this, (function(i) {
                            switch (i.label) {
                                case 0:
                                    return i.trys.push([0, 2, , 3]), [4, Su(this.transport.get({
                                        dataCollectionId: e,
                                        consistentRead: null == t ? void 0 : t.consistentRead
                                    }))];
                                case 1:
                                    return [2, ou(i.sent().collection)];
                                case 2:
                                    if (a = i.sent(), "WDE0025" === (null === (o = null === (n = null === (r = null == a ? void 0 : a.responseText) || void 0 === r ? void 0 : r.details) || void 0 === n ? void 0 : n.applicationError) || void 0 === o ? void 0 : o.code)) throw ud(e);
                                    throw a;
                                case 3:
                                    return [2]
                            }
                        }))
                    }))
                }, e.prototype.bulkGet = function(e, t) {
                    return void 0 === t && (t = {
                        referencedCollectionsDepth: 0
                    }), Iu(this, void 0, void 0, (function() {
                        var r = this;
                        return Tu(this, (function(n) {
                            switch (n.label) {
                                case 0:
                                    return [4, Nu(e, 100, (function(e) {
                                        return Iu(r, void 0, void 0, (function() {
                                            var r, n, o, a, i;
                                            return Tu(this, (function(s) {
                                                switch (s.label) {
                                                    case 0:
                                                        return r = {
                                                            dataCollectionIds: e,
                                                            includeReferencedCollections: (null !== (i = t.referencedCollectionsDepth) && void 0 !== i ? i : 0) > 0,
                                                            showDeletedCollections: t.includeDeletedCollections,
                                                            consistentRead: null == t ? void 0 : t.consistentRead
                                                        }, [4, Su(this.transport.getBulk(r))];
                                                    case 1:
                                                        return n = s.sent(), o = (n.activeCollections || []).map(ou), (a = (n.deletedCollections || []).map(ou)).forEach((function(e) {
                                                            return e.isDeleted = !0
                                                        })), [2, o.concat(a)]
                                                }
                                            }))
                                        }))
                                    }))];
                                case 1:
                                    return [2, Ou(n.sent())]
                            }
                        }))
                    }))
                }, e.prototype.listCollections = function(e) {
                    var t, r, n, o;
                    return Iu(this, void 0, void 0, (function() {
                        var a, i, s, c, l, d;
                        return Tu(this, (function(u) {
                            switch (u.label) {
                                case 0:
                                    a = [], i = {
                                        offset: 0
                                    }, u.label = 1;
                                case 1:
                                    return [4, Su(this.transport.list({
                                        paging: i,
                                        consistentRead: null == e ? void 0 : e.consistentRead
                                    }))];
                                case 2:
                                    return s = u.sent(), a = a.concat(null !== (t = s.collections) && void 0 !== t ? t : []), c = s.pagingMetadata, l = (null !== (r = null == c ? void 0 : c.offset) && void 0 !== r ? r : 0) + (null !== (n = null == c ? void 0 : c.count) && void 0 !== n ? n : 0), d = null !== (o = null == c ? void 0 : c.total) && void 0 !== o ? o : 0, l < d ? (i.offset = l, [3, 1]) : [2, a];
                                case 3:
                                    return [2]
                            }
                        }))
                    }))
                }, e.prototype.list = function(e) {
                    return Iu(this, void 0, void 0, (function() {
                        return Tu(this, (function(t) {
                            switch (t.label) {
                                case 0:
                                    return [4, this.listCollections(e)];
                                case 1:
                                    return [2, Ou(t.sent().map(ou))]
                            }
                        }))
                    }))
                }, e.prototype.save = function(e, t) {
                    return Iu(this, void 0, void 0, (function() {
                        var r;
                        return Tu(this, (function(n) {
                            switch (n.label) {
                                case 0:
                                    return r = function(e) {
                                        var t;
                                        return xd({
                                            id: e.id,
                                            displayName: e.displayName,
                                            displayField: e.displayField,
                                            fields: Kd(e),
                                            permissions: Jd(e),
                                            revision: null === (t = e.version) || void 0 === t ? void 0 : t.toString(),
                                            plugins: Xd(e)
                                        })
                                    }(t), r.id = e || r.id, [4, Su(t.version > 0 ? this.transport.update({
                                        collection: r
                                    }) : this.transport.create({
                                        collection: r
                                    }))];
                                case 1:
                                    return [2, [ou(n.sent().collection)]]
                            }
                        }))
                    }))
                }, e.prototype.remove = function(e) {
                    return Iu(this, void 0, void 0, (function() {
                        return Tu(this, (function(t) {
                            switch (t.label) {
                                case 0:
                                    return [4, Su(this.transport.delete({
                                        dataCollectionId: e
                                    }))];
                                case 1:
                                    return t.sent(), [2, [{
                                        id: e,
                                        isDeleted: !0
                                    }]]
                            }
                        }))
                    }))
                }, e.prototype.restore = function() {
                    return Promise.reject(new Error("Collection restoring is not supported."))
                }, e
            }();
        const wu = Ru;

        function Su(e) {
            return e.catch((function(e) {
                if (!e.response) return Promise.reject(new Ad(Pu(e)));
                var t = e.response,
                    r = t.headers && t.headers["x-wix-request-id"];
                return Promise.reject(new Fd(t.status, t.data, Pu(t.data), r))
            }))
        }

        function Ou(e) {
            return e.reduce((function(e, t) {
                var r;
                return Eu(Eu({}, e), ((r = {})[t.id] = t, r))
            }), {})
        }

        function Pu(e) {
            return "object" == typeof e && e.message ? e.message : "string" == typeof e ? e : JSON.stringify(e)
        }

        function Nu(e, t, r) {
            return Iu(this, void 0, void 0, (function() {
                var n, o;
                return Tu(this, (function(a) {
                    switch (a.label) {
                        case 0:
                            for (n = [], o = 0; o < e.length; o += t) n.push(r(e.slice(o, o + t)));
                            return [4, Promise.all(n)];
                        case 1:
                            return [2, a.sent().reduce((function(e, t) {
                                return e.concat(t)
                            }), [])]
                    }
                }))
            }))
        }
        const Cu = e => e.split("#");
        const bu = "_",
            Du = /{(.*)}/,
            Au = new RegExp(`\\.(${["wix.com","editorx.com"].join("|")})$`),
            Fu = new RegExp(`\\.(${["42.wixprod.net","uw2-edt-1.wixprod.net"].join("|")})$`),
            xu = new RegExp(".*\\.dev.wix-code.com$");

        function Lu(e) {
            const t = function(e, t) {
                const r = t[e] || t[bu];
                if (!r && function(e) {
                        return !!e.match(/\._base_domain_$/)
                    }(e)) return t[Uu];
                return r
            }(function(e) {
                return e.replace("create.editorx.com", "editor.editorx.com")
            }(e.host).replace(Au, "._base_domain_").replace(Fu, "._api_base_domain_").replace(xu, "*.dev.wix-code.com"), e.domainToMappings);
            var r, n;
            return function(e, t) {
                const r = t ? .find((t => e.startsWith(t.destPath)));
                if (!r) return e;
                return r.srcPath + e.slice(r.destPath.length)
            }((r = e.protoPath, n = e.data || {}, r.split("/").map((e => function(e, t) {
                const r = e.match(Du) || [],
                    n = r[1];
                if (n) {
                    const o = e.replace(r[0], "");
                    return function(e, t, r, n) {
                        let o = e;
                        for (const e of t.split(".")) {
                            if (!o) return r;
                            o = o[e]
                        }
                        return `${o}${n}`
                    }(t, n, e, o)
                }
                return e
            }(e, n))).join("/")), t)
        }
        const Uu = "www._base_domain_";

        function Mu(e, t = "") {
            const r = {};
            return Object.entries(e).forEach((([e, n]) => {
                const o = null !== n && "object" == typeof n && !Array.isArray(n),
                    a = function(e, t) {
                        return `${e}${e?".":""}${t}`
                    }(t, e);
                if (o) {
                    const e = Mu(n, a);
                    Object.assign(r, e)
                } else r[a] = n
            })), r
        }

        function ku(e) {
            const t = Mu(e);
            return Object.entries(t).reduce(((e, [t, r]) => ((Array.isArray(r) ? r : [r]).forEach((r => {
                null != r && e.append(t, r)
            })), e)), new URLSearchParams)
        }
        var Gu;

        function ju(e, t = {}, r) {
            return function(n = {}, o) {
                return "string" == typeof n ? n : a(e, n);

                function a(e, t) {
                    const r = {};
                    return [null, void 0].includes(t) ? t : (Object.entries(t).forEach((([t, n]) => {
                        const o = e[t],
                            {
                                schemaName: a,
                                schemaType: c
                            } = function(e = "") {
                                const [t, r] = Cu(e);
                                return r ? {
                                    schemaName: r,
                                    schemaType: t
                                } : {
                                    schemaName: t
                                }
                            }(o),
                            l = "Map" === c;
                        let d;
                        d = s(a) ? .checkRepetable ? .(n) ? ? Array.isArray(n) ? n.map((e => i(e, a))) : l ? function(e, t) {
                            return Object.entries(e).reduce(((e, [r, n]) => (e[r] = i(n, t), e)), {})
                        }(n, a) : i(n, a), r[t] = d
                    })), r)
                }

                function i(e, r) {
                    if (!r) return e;
                    const n = t[r];
                    if (s(r)) return s(r).transform(e);
                    if (n) return a(n, e);
                    throw new Error(`${r} is neither schema nor serializable type`)
                }

                function s(e) {
                    return r[e] ? .[o]
                }
            }
        }! function(e) {
            e[e.TO_JSON = 0] = "TO_JSON", e[e.FROM_JSON = 1] = "FROM_JSON"
        }(Gu || (Gu = {}));
        const Bu = {
                types: ["google.protobuf.Timestamp"],
                [Gu.TO_JSON]: {
                    transform: e => e ? .toISOString()
                },
                [Gu.FROM_JSON]: {
                    transform: e => e ? new Date(e) : void 0
                }
            },
            Vu = {
                types: ["google.protobuf.FieldMask"],
                [Gu.TO_JSON]: {
                    transform: e => e.join(","),
                    checkRepetable: e => e.some((e => Array.isArray(e)))
                },
                [Gu.FROM_JSON]: {
                    transform: e => "object" == typeof e ? e.paths : e.split(",")
                }
            },
            $u = {
                types: ["google.protobuf.BytesValue", "BYTES"],
                [Gu.TO_JSON]: {
                    transform: e => {
                        const t = e.reduce(((e, t) => e + String.fromCharCode(t)), "");
                        return btoa(t)
                    }
                },
                [Gu.FROM_JSON]: {
                    transform: e => Uint8Array.from(atob(e), (e => e.charCodeAt(0)))
                }
            },
            Wu = {
                types: ["google.protobuf.Duration"],
                [Gu.TO_JSON]: {
                    transform: ({
                        seconds: e = "0",
                        nanos: t = 0
                    }) => {
                        let r = "";
                        return 0 !== t && (r = `.${t.toString().padStart(9,"0")}`), `${e}${r}s`
                    }
                },
                [Gu.FROM_JSON]: {
                    transform: e => {
                        const [t, r] = e.substring(0, e.length - 1).split(".");
                        return {
                            seconds: t,
                            nanos: qu(r)
                        }
                    }
                }
            };

        function qu(e) {
            let t = 0;
            if (void 0 !== e) {
                const r = 3 - e.length / 3;
                t = parseInt(e, 10) * Math.pow(1e3, r)
            }
            return t
        }
        const Hu = {
            types: ["FLOAT", "DOUBLE", "google.protobuf.FloatValue", "google.protobuf.DoubleValue"],
            [Gu.TO_JSON]: {
                transform: e => isFinite(e) ? e : e.toString()
            },
            [Gu.FROM_JSON]: {
                transform: e => "NaN" === e ? NaN : "Infinity" === e ? 1 / 0 : "-Infinity" === e ? -1 / 0 : e
            }
        };
        const zu = [...[Bu, Vu, $u, Wu, Hu]].reduce(((e, t) => ({ ...e,
            ...t.types.reduce(((e, r) => ({ ...e,
                [r]: t
            })), {})
        })), {});

        function Yu(e, t = {}) {
            const r = ju(e, t, zu);
            return {
                fromJSON(e) {
                    const t = function(e) {
                        try {
                            return JSON.parse(e)
                        } catch (e) {}
                    }(e) || e;
                    return r(t, Gu.FROM_JSON)
                },
                toJSON: e => r(e, Gu.TO_JSON)
            }
        }
        var Ju = {
                typeMetadata: "_typeMetadata"
            },
            Ku = {},
            Qu = {
                activeCollections: "_dataCollection",
                deletedCollections: "_dataCollection"
            },
            Xu = {
                collection: "_dataCollection"
            },
            Zu = {
                collection: "_dataCollection"
            },
            ep = {
                createdDate: "google.protobuf.Timestamp",
                updatedDate: "google.protobuf.Timestamp",
                fields: "_field"
            },
            tp = {},
            rp = {},
            np = {
                numberRange: "_numberRange",
                typeMetadata: "_typeMetadata"
            },
            op = {},
            ap = {
                collection: "_dataCollection",
                referencedCollections: "_dataCollection"
            },
            ip = {},
            sp = {
                collections: "_dataCollection"
            },
            cp = {
                min: "google.protobuf.DoubleValue",
                max: "google.protobuf.DoubleValue"
            },
            lp = {
                fields: "_objectField"
            },
            dp = {
                typeMetadata: "_typeMetadata"
            },
            up = {
                object: "_object",
                array: "_array"
            },
            pp = {
                collection: "_dataCollection"
            },
            fp = {
                collection: "_dataCollection"
            };

        function hp(e) {
            return Lu(Object.assign(e, {
                domainToMappings: {
                    "api._api_base_domain_": [{
                        srcPath: "/cloud-data",
                        destPath: ""
                    }],
                    "code._base_domain_": [{
                        srcPath: "/_api/cloud-data/v1/data-settings",
                        destPath: "/v1/data-settings"
                    }, {
                        srcPath: "/_api/cloud-data/v1/schemas",
                        destPath: "/v1/schemas"
                    }, {
                        srcPath: "/_api/cloud-data/v1/connector",
                        destPath: "/v1/connector"
                    }, {
                        srcPath: "/_api/data/v1/data-settings",
                        destPath: "/v1/data-settings"
                    }, {
                        srcPath: "/_api/data/v1/schemas",
                        destPath: "/v1/schemas"
                    }, {
                        srcPath: "/_api/data/v1/connector",
                        destPath: "/v1/connector"
                    }, {
                        srcPath: "/_api/cloud-data/v1/wix-data",
                        destPath: "/v1/wix-data"
                    }],
                    "cloud-data.wix-code.com": [{
                        srcPath: "",
                        destPath: ""
                    }],
                    _: [{
                        srcPath: "/_api/cloud-data",
                        destPath: ""
                    }],
                    "www._base_domain_": [{
                        srcPath: "/_api/cloud-data",
                        destPath: ""
                    }, {
                        srcPath: "/_api/data",
                        destPath: ""
                    }],
                    "dev._base_domain_": [{
                        srcPath: "/_api/cloud-data",
                        destPath: ""
                    }],
                    "bo._base_domain_": [{
                        srcPath: "/_api/cloud-data/v1",
                        destPath: "/v1"
                    }, {
                        srcPath: "/_api/cloud-data/v2",
                        destPath: "/v2"
                    }],
                    "wixbo.ai": [{
                        srcPath: "/_api/cloud-data/v1",
                        destPath: "/v1"
                    }, {
                        srcPath: "/_api/cloud-data/v2",
                        destPath: "/v2"
                    }],
                    "manage._base_domain_": [{
                        srcPath: "/_api/cloud-data",
                        destPath: ""
                    }, {
                        srcPath: "/_api/data",
                        destPath: ""
                    }],
                    "editor._base_domain_": [{
                        srcPath: "/_api/cloud-data/v1/schemas",
                        destPath: "/v1/schemas"
                    }, {
                        srcPath: "/_api/cloud-data/dbs/tasks",
                        destPath: "/dbs/tasks"
                    }, {
                        srcPath: "/_api/data/v1/schemas",
                        destPath: "/v1/schemas"
                    }, {
                        srcPath: "/_api/data/dbs/tasks",
                        destPath: "/dbs/tasks"
                    }, {
                        srcPath: "/_api/cloud-data/v1/wix-data",
                        destPath: "/v1/wix-data"
                    }, {
                        srcPath: "/_api/cloud-data/v1/data-settings",
                        destPath: "/v1/data-settings"
                    }, {
                        srcPath: "/_api/data/v2/indexes",
                        destPath: "/v2/indexes"
                    }, {
                        srcPath: "/_api/cloud-data/v1/external-database-connections",
                        destPath: "/v1/external-database-connections"
                    }, {
                        srcPath: "/_api/data/v1/data-collection-sharing",
                        destPath: "/v1/data-collection-sharing"
                    }, {
                        srcPath: "/_api/cloud-data/v2/collections",
                        destPath: "/v2/collections"
                    }, {
                        srcPath: "/_api/cloud-data/v2/bulk",
                        destPath: "/v2/bulk"
                    }, {
                        srcPath: "/_api/cloud-data/v2/items",
                        destPath: "/v2/items"
                    }],
                    "blocks._base_domain_": [{
                        srcPath: "/_api/cloud-data/v1/schemas",
                        destPath: "/v1/schemas"
                    }, {
                        srcPath: "/_api/cloud-data/dbs/tasks",
                        destPath: "/dbs/tasks"
                    }, {
                        srcPath: "/_api/data/v1/schemas",
                        destPath: "/v1/schemas"
                    }, {
                        srcPath: "/_api/data/dbs/tasks",
                        destPath: "/dbs/tasks"
                    }, {
                        srcPath: "/_api/cloud-data/v1/wix-data",
                        destPath: "/v1/wix-data"
                    }, {
                        srcPath: "/_api/cloud-data/v1/data-settings",
                        destPath: "/v1/data-settings"
                    }, {
                        srcPath: "/_api/data/v2/indexes",
                        destPath: "/v2/indexes"
                    }, {
                        srcPath: "/_api/cloud-data/v1/external-database-connections",
                        destPath: "/v1/external-database-connections"
                    }, {
                        srcPath: "/_api/data/v1/data-collection-sharing",
                        destPath: "/v1/data-collection-sharing"
                    }, {
                        srcPath: "/_api/cloud-data/v2/collections",
                        destPath: "/v2/collections"
                    }, {
                        srcPath: "/_api/cloud-data/v2/bulk",
                        destPath: "/v2/bulk"
                    }, {
                        srcPath: "/_api/cloud-data/v2/items",
                        destPath: "/v2/items"
                    }],
                    "create.editorx": [{
                        srcPath: "/_api/cloud-data/v1/schemas",
                        destPath: "/v1/schemas"
                    }, {
                        srcPath: "/_api/cloud-data/dbs/tasks",
                        destPath: "/dbs/tasks"
                    }, {
                        srcPath: "/_api/data/v1/schemas",
                        destPath: "/v1/schemas"
                    }, {
                        srcPath: "/_api/data/dbs/tasks",
                        destPath: "/dbs/tasks"
                    }, {
                        srcPath: "/_api/cloud-data/v1/wix-data",
                        destPath: "/v1/wix-data"
                    }, {
                        srcPath: "/_api/cloud-data/v1/data-settings",
                        destPath: "/v1/data-settings"
                    }, {
                        srcPath: "/_api/data/v2/indexes",
                        destPath: "/v2/indexes"
                    }, {
                        srcPath: "/_api/cloud-data/v1/external-database-connections",
                        destPath: "/v1/external-database-connections"
                    }, {
                        srcPath: "/_api/data/v1/data-collection-sharing",
                        destPath: "/v1/data-collection-sharing"
                    }, {
                        srcPath: "/_api/cloud-data/v2/collections",
                        destPath: "/v2/collections"
                    }, {
                        srcPath: "/_api/cloud-data/v2/bulk",
                        destPath: "/v2/bulk"
                    }, {
                        srcPath: "/_api/cloud-data/v2/items",
                        destPath: "/v2/items"
                    }],
                    "www.wixapis.com": [{
                        srcPath: "/wix-data/v1/collections",
                        destPath: "/v1/wix-data/collections"
                    }, {
                        srcPath: "/wix-data/v1/external-database-connections",
                        destPath: "/v1/external-database-connections"
                    }, {
                        srcPath: "/wix-data/v2/indexes",
                        destPath: "/v2/indexes"
                    }, {
                        srcPath: "/wix-data/v1/items",
                        destPath: "/v1/items"
                    }, {
                        srcPath: "/wix-data/v1/bulk",
                        destPath: "/v1/bulk"
                    }, {
                        srcPath: "/wix-data/v1/external-databases",
                        destPath: "/v1/external-databases"
                    }, {
                        srcPath: "/wix-data/v2",
                        destPath: "/v2"
                    }],
                    "www.wixgateway.com": [{
                        srcPath: "/wix-data/v1/items",
                        destPath: "/v1/items"
                    }, {
                        srcPath: "/wix-data/v1/bulk",
                        destPath: "/v1/bulk"
                    }],
                    "*.dev.wix-code.com": [{
                        srcPath: "/_api/cloud-data/v2",
                        destPath: "/v2"
                    }]
                }
            }))
        }
        var mp = function() {
                return mp = Object.assign || function(e) {
                    for (var t, r = 1, n = arguments.length; r < n; r++)
                        for (var o in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                    return e
                }, mp.apply(this, arguments)
            },
            gp = function() {
                function e(e, t, r) {
                    this.httpClient = e, this.signedInstance = t, this.baseUrl = function(e) {
                        var t = null == e ? void 0 : e.baseUrl;
                        if (!t) return "https://cloud-data.wix-code.com";
                        return t = vp(t, "/"), t = vp(t, "/v1/schemas")
                    }(r)
                }
                return e.prototype._call = function(e) {
                    var t = this;
                    return this.httpClient.request((function(r) {
                        var n = e(r),
                            o = t.baseUrl + function(e, t) {
                                return e.startsWith(t) ? e.substring(t.length) : e
                            }(n.url, "/_api/cloud-data");
                        return mp(mp({}, n), {
                            url: o,
                            headers: mp(mp({}, n.headers), {
                                authorization: t.signedInstance
                            })
                        })
                    }), {
                        signedInstance: this.signedInstance
                    }).then((function(e) {
                        return e.data
                    }))
                }, e.prototype.create = function(e) {
                    return this._call(function(e) {
                        var t = Yu(Xu, {
                                _array: Ju,
                                _dataCollection: ep,
                                _field: np,
                                _numberRange: cp,
                                _object: lp,
                                _objectField: dp,
                                _typeMetadata: up
                            }),
                            r = t.toJSON,
                            n = t.fromJSON,
                            o = Yu(Zu, {
                                _array: Ju,
                                _dataCollection: ep,
                                _field: np,
                                _numberRange: cp,
                                _object: lp,
                                _objectField: dp,
                                _typeMetadata: up
                            }).fromJSON;

                        function a(t) {
                            var n = t.host,
                                a = r(e);
                            return {
                                entityFqdn: "wix.data.v2.data_collection",
                                method: "POST",
                                methodFqn: "com.wixpress.cloud.data.api.collectionservice.DataCollectionService.CreateDataCollection",
                                url: hp({
                                    protoPath: "/v2/collections",
                                    data: a,
                                    host: n
                                }),
                                data: a,
                                transformResponse: o
                            }
                        }
                        return a.fromReq = n, a.__isAmbassador = !0, a
                    }(e))
                }, e.prototype.delete = function(e) {
                    return this._call(function(e) {
                        var t = Yu(tp, {}),
                            r = t.toJSON,
                            n = t.fromJSON,
                            o = Yu(rp, {}).fromJSON;

                        function a(t) {
                            var n = t.host,
                                a = r(e);
                            return {
                                entityFqdn: "wix.data.v2.data_collection",
                                method: "DELETE",
                                methodFqn: "com.wixpress.cloud.data.api.collectionservice.DataCollectionService.DeleteDataCollection",
                                url: hp({
                                    protoPath: "/v2/collections/{dataCollectionId}",
                                    data: a,
                                    host: n
                                }),
                                params: ku(a),
                                transformResponse: o
                            }
                        }
                        return a.fromReq = n, a.__isAmbassador = !0, a
                    }(e))
                }, e.prototype.get = function(e) {
                    return this._call(function(e) {
                        var t = Yu(op, {}),
                            r = t.toJSON,
                            n = t.fromJSON,
                            o = Yu(ap, {
                                _array: Ju,
                                _dataCollection: ep,
                                _field: np,
                                _numberRange: cp,
                                _object: lp,
                                _objectField: dp,
                                _typeMetadata: up
                            }).fromJSON;

                        function a(t) {
                            var n = t.host,
                                a = r(e);
                            return {
                                entityFqdn: "wix.data.v2.data_collection",
                                method: "GET",
                                methodFqn: "com.wixpress.cloud.data.api.collectionservice.DataCollectionService.GetDataCollection",
                                url: hp({
                                    protoPath: "/v2/collections/{dataCollectionId}",
                                    data: a,
                                    host: n
                                }),
                                params: ku(a),
                                transformResponse: o
                            }
                        }
                        return a.fromReq = n, a.__isAmbassador = !0, a
                    }(e))
                }, e.prototype.getBulk = function(e) {
                    return this._call(function(e) {
                        var t = Yu(Ku, {}),
                            r = t.toJSON,
                            n = t.fromJSON,
                            o = Yu(Qu, {
                                _array: Ju,
                                _dataCollection: ep,
                                _field: np,
                                _numberRange: cp,
                                _object: lp,
                                _objectField: dp,
                                _typeMetadata: up
                            }).fromJSON;

                        function a(t) {
                            var n = t.host,
                                a = r(e);
                            return {
                                entityFqdn: "wix.data.v2.data_collection",
                                method: "POST",
                                methodFqn: "com.wixpress.cloud.data.api.collectionservice.DataCollectionService.BulkGetDataCollections",
                                url: hp({
                                    protoPath: "/v2/bulk/collections/get",
                                    data: a,
                                    host: n
                                }),
                                data: a,
                                transformResponse: o
                            }
                        }
                        return a.fromReq = n, a.__isAmbassador = !0, a
                    }(e))
                }, e.prototype.list = function(e) {
                    return this._call(function(e) {
                        var t = Yu(ip, {}),
                            r = t.toJSON,
                            n = t.fromJSON,
                            o = Yu(sp, {
                                _array: Ju,
                                _dataCollection: ep,
                                _field: np,
                                _numberRange: cp,
                                _object: lp,
                                _objectField: dp,
                                _typeMetadata: up
                            }).fromJSON;

                        function a(t) {
                            var n = t.host,
                                a = r(e);
                            return {
                                entityFqdn: "wix.data.v2.data_collection",
                                method: "GET",
                                methodFqn: "com.wixpress.cloud.data.api.collectionservice.DataCollectionService.ListDataCollections",
                                url: hp({
                                    protoPath: "/v2/collections",
                                    data: a,
                                    host: n
                                }),
                                params: ku(a),
                                transformResponse: o
                            }
                        }
                        return a.fromReq = n, a.__isAmbassador = !0, a
                    }(e))
                }, e.prototype.update = function(e) {
                    return this._call(function(e) {
                        var t = Yu(pp, {
                                _array: Ju,
                                _dataCollection: ep,
                                _field: np,
                                _numberRange: cp,
                                _object: lp,
                                _objectField: dp,
                                _typeMetadata: up
                            }),
                            r = t.toJSON,
                            n = t.fromJSON,
                            o = Yu(fp, {
                                _array: Ju,
                                _dataCollection: ep,
                                _field: np,
                                _numberRange: cp,
                                _object: lp,
                                _objectField: dp,
                                _typeMetadata: up
                            }).fromJSON;

                        function a(t) {
                            var n = t.host,
                                a = r(e);
                            return {
                                entityFqdn: "wix.data.v2.data_collection",
                                method: "PUT",
                                methodFqn: "com.wixpress.cloud.data.api.collectionservice.DataCollectionService.UpdateDataCollection",
                                url: hp({
                                    protoPath: "/v2/collections",
                                    data: a,
                                    host: n
                                }),
                                data: a,
                                transformResponse: o
                            }
                        }
                        return a.fromReq = n, a.__isAmbassador = !0, a
                    }(e))
                }, e
            }();
        const yp = gp;

        function vp(e, t) {
            return e.endsWith(t) ? e.substring(0, e.length - t.length) : e
        }
        var _p = a(5241),
            Ep = function(e) {
                return "object" == typeof e && e.message ? e.message : "string" == typeof e ? e : JSON.stringify(e)
            },
            Ip = function(e) {
                return e.reduce((function(e, t) {
                    var r;
                    return Object.assign({}, e, ((r = {})[t.id] = t, r))
                }), {})
            },
            Tp = function(e, t) {
                return e.endsWith(t) ? e.substring(0, e.length - t.length) : e
            },
            Rp = function() {
                function e(e, t, r, n) {
                    var o = this,
                        a = function(e) {
                            return e = Tp(e, "/"), Tp(e, "/v1/schemas")
                        }(n && n.baseUrl || "https://cloud-data.wix-code.com");
                    this.signedInstance = t, this.gridAppId = r, this.mutate = function(t, r, n) {
                        return e[t](a + r, n, o._setHeaders()).then((function(e) {
                            return e.data
                        })).catch(o._handleError)
                    }, this.retrieve = function(t) {
                        return e.get(a + t, o._setHeaders()).then((function(e) {
                            return e.data
                        })).catch(o._handleError)
                    }
                }
                return e.prototype.wrapWithDefaultOptions = function(e) {
                    return Object.assign({}, e, {
                        appId: this.gridAppId
                    })
                }, e.prototype.formRequestUrl = function(e) {
                    return "/v1/schemas?" + _p.As(e)
                }, e.prototype.get = function(e, t) {
                    void 0 === t && (t = {
                        includeDeletedCollections: !1
                    });
                    var r = this.wrapWithDefaultOptions({
                        includeDeleted: !0,
                        schemaIds: e
                    });
                    return this.retrieve(this.formRequestUrl(r)).then((function(r) {
                        var n = r.schemas[0];
                        return n && n.isDeleted && !t.includeDeletedCollections ? md(e) : n || Promise.reject(ud(e))
                    }))
                }, e.prototype.bulkGet = function(e, t) {
                    void 0 === t && (t = {
                        includeDeletedCollections: !1,
                        referencedCollectionsDepth: 0
                    });
                    var r = this.wrapWithDefaultOptions({
                        depth: t.referencedCollectionsDepth || 0,
                        includeDeleted: t.includeDeletedCollections || !1,
                        schemaIds: e
                    });
                    return this.retrieve(this.formRequestUrl(r)).then((function(e) {
                        var t = e.schemas;
                        return Ip(t)
                    }))
                }, e.prototype.list = function(e) {
                    void 0 === e && (e = {
                        includeDeletedCollections: !1
                    });
                    var t = this.wrapWithDefaultOptions({
                        schemaIds: [],
                        depth: 0,
                        includeDeleted: e.includeDeletedCollections || !1
                    });
                    return this.retrieve(this.formRequestUrl(t)).then((function(e) {
                        var t = e.schemas;
                        return Ip(t)
                    }))
                }, e.prototype.save = function(e, t) {
                    var r = this.wrapWithDefaultOptions({
                        schemaId: e,
                        schema: t
                    });
                    return this.mutate("post", "/v1/schemas", r).then((function(e) {
                        return e.schemas
                    }))
                }, e.prototype.setIsDeletedFlag = function(e, t) {
                    var r = this.wrapWithDefaultOptions({
                        schemaId: e,
                        partialSchema: {
                            isDeleted: t
                        }
                    });
                    return this.mutate("patch", "/v1/schemas", r).then((function(e) {
                        return e.schemas
                    }))
                }, e.prototype.remove = function(e) {
                    return this.setIsDeletedFlag(e, !0)
                }, e.prototype.restore = function(e) {
                    return this.setIsDeletedFlag(e, !1)
                }, e.prototype._setHeaders = function() {
                    return {
                        headers: {
                            authorization: this.signedInstance
                        }
                    }
                }, e.prototype._handleError = function(e) {
                    if (!e.response) return Promise.reject(new Ad(Ep(e)));
                    var t = e.response,
                        r = t.headers && t.headers["x-wix-request-id"];
                    return Promise.reject(new Fd(t.status, t.data, Ep(t.data), r))
                }, e
            }();
        const wp = Rp;
        var Sp = function(e, t, r, n) {
                return new(r || (r = Promise))((function(o, a) {
                    function i(e) {
                        try {
                            c(n.next(e))
                        } catch (e) {
                            a(e)
                        }
                    }

                    function s(e) {
                        try {
                            c(n.throw(e))
                        } catch (e) {
                            a(e)
                        }
                    }

                    function c(e) {
                        var t;
                        e.done ? o(e.value) : (t = e.value, t instanceof r ? t : new r((function(e) {
                            e(t)
                        }))).then(i, s)
                    }
                    c((n = n.apply(e, t || [])).next())
                }))
            },
            Op = function(e, t) {
                var r, n, o, a, i = {
                    label: 0,
                    sent: function() {
                        if (1 & o[0]) throw o[1];
                        return o[1]
                    },
                    trys: [],
                    ops: []
                };
                return a = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                }, "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                    return this
                }), a;

                function s(s) {
                    return function(c) {
                        return function(s) {
                            if (r) throw new TypeError("Generator is already executing.");
                            for (; a && (a = 0, s[0] && (i = 0)), i;) try {
                                if (r = 1, n && (o = 2 & s[0] ? n.return : s[0] ? n.throw || ((o = n.return) && o.call(n), 0) : n.next) && !(o = o.call(n, s[1])).done) return o;
                                switch (n = 0, o && (s = [2 & s[0], o.value]), s[0]) {
                                    case 0:
                                    case 1:
                                        o = s;
                                        break;
                                    case 4:
                                        return i.label++, {
                                            value: s[1],
                                            done: !1
                                        };
                                    case 5:
                                        i.label++, n = s[1], s = [0];
                                        continue;
                                    case 7:
                                        s = i.ops.pop(), i.trys.pop();
                                        continue;
                                    default:
                                        if (!(o = i.trys, (o = o.length > 0 && o[o.length - 1]) || 6 !== s[0] && 2 !== s[0])) {
                                            i = 0;
                                            continue
                                        }
                                        if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {
                                            i.label = s[1];
                                            break
                                        }
                                        if (6 === s[0] && i.label < o[1]) {
                                            i.label = o[1], o = s;
                                            break
                                        }
                                        if (o && i.label < o[2]) {
                                            i.label = o[2], i.ops.push(s);
                                            break
                                        }
                                        o[2] && i.ops.pop(), i.trys.pop();
                                        continue
                                }
                                s = t.call(e, i)
                            } catch (e) {
                                s = [6, e], n = 0
                            } finally {
                                r = o = 0
                            }
                            if (5 & s[0]) throw s[1];
                            return {
                                value: s[0] ? s[1] : void 0,
                                done: !0
                            }
                        }([s, c])
                    }
                }
            },
            Pp = function() {
                function e(e, t, r, n) {
                    (null == n ? void 0 : n.client) ? this._client = n.client: (null == n ? void 0 : n.useApiV2) ? this._client = new wu(new yp(e, t, n)) : this._client = new wp(e, t, r, n)
                }
                return e.prototype.get = function(e, t) {
                    var r = this;
                    return this._client.get(e, t).then((function(e) {
                        return r._mapDefaults(e)
                    }))
                }, e.prototype.bulkGet = function(e, t) {
                    return Sp(this, void 0, void 0, (function() {
                        var r = this;
                        return Op(this, (function(n) {
                            return e && 0 !== e.length ? [2, this._client.bulkGet(e, t).then((function(e) {
                                return r._mapDefaultsForSchemas(e)
                            }))] : [2, {}]
                        }))
                    }))
                }, e.prototype.list = function(e) {
                    var t = this;
                    return this._client.list(e).then((function(e) {
                        return t._mapDefaultsForSchemas(e)
                    }))
                }, e.prototype.save = function(e, t) {
                    return this._client.save(e, t)
                }, e.prototype.remove = function(e) {
                    return this._client.remove(e)
                }, e.prototype.restore = function(e) {
                    return this._client.restore(e)
                }, e.prototype._mapDefaultsForSchemas = function(e) {
                    var t = this;
                    return Object.keys(e).reduce((function(r, n) {
                        var o = e[n];
                        return r[n] = t._mapDefaults(o), r
                    }), {})
                }, e.prototype._mapDefaults = function(e) {
                    var t, r;
                    e.displayField || (e.fields && e.fields.title ? e.displayField = "title" : e.displayField = "_id");
                    for (var n = 0, o = Object.values(e.fields); n < o.length; n++) {
                        var a = o[n];
                        (null === (r = null === (t = a.plugins) || void 0 === t ? void 0 : t.cms) || void 0 === r ? void 0 : r.internal) && (a.systemField = !0, a.sortable = !1, a.queryOperators = [])
                    }
                    return e
                }, e
            }();
        const Np = Pp;
        var Cp = function(e, t, r, n) {
            return new Np(e, t, r, n)
        };
        const bp = "v1",
            Dp = 2,
            Ap = 1920,
            Fp = 1920,
            xp = 1e3,
            Lp = 1e3,
            Up = {
                SCALE_TO_FILL: "fill",
                SCALE_TO_FIT: "fit",
                STRETCH: "stretch",
                ORIGINAL_SIZE: "original_size",
                TILE: "tile",
                TILE_HORIZONTAL: "tile_horizontal",
                TILE_VERTICAL: "tile_vertical",
                FIT_AND_TILE: "fit_and_tile",
                LEGACY_STRIP_TILE: "legacy_strip_tile",
                LEGACY_STRIP_TILE_HORIZONTAL: "legacy_strip_tile_horizontal",
                LEGACY_STRIP_TILE_VERTICAL: "legacy_strip_tile_vertical",
                LEGACY_STRIP_SCALE_TO_FILL: "legacy_strip_fill",
                LEGACY_STRIP_SCALE_TO_FIT: "legacy_strip_fit",
                LEGACY_STRIP_FIT_AND_TILE: "legacy_strip_fit_and_tile",
                LEGACY_STRIP_ORIGINAL_SIZE: "legacy_strip_original_size",
                LEGACY_ORIGINAL_SIZE: "actual_size",
                LEGACY_FIT_WIDTH: "fitWidth",
                LEGACY_FIT_HEIGHT: "fitHeight",
                LEGACY_FULL: "full",
                LEGACY_BG_FIT_AND_TILE: "legacy_tile",
                LEGACY_BG_FIT_AND_TILE_HORIZONTAL: "legacy_tile_horizontal",
                LEGACY_BG_FIT_AND_TILE_VERTICAL: "legacy_tile_vertical",
                LEGACY_BG_NORMAL: "legacy_normal"
            },
            Mp = {
                FIT: "fit",
                FILL: "fill",
                FILL_FOCAL: "fill_focal",
                CROP: "crop",
                LEGACY_CROP: "legacy_crop",
                LEGACY_FILL: "legacy_fill"
            },
            kp = {
                CENTER: "center",
                TOP: "top",
                TOP_LEFT: "top_left",
                TOP_RIGHT: "top_right",
                BOTTOM: "bottom",
                BOTTOM_LEFT: "bottom_left",
                BOTTOM_RIGHT: "bottom_right",
                LEFT: "left",
                RIGHT: "right"
            },
            Gp = {
                [kp.CENTER]: {
                    x: .5,
                    y: .5
                },
                [kp.TOP_LEFT]: {
                    x: 0,
                    y: 0
                },
                [kp.TOP_RIGHT]: {
                    x: 1,
                    y: 0
                },
                [kp.TOP]: {
                    x: .5,
                    y: 0
                },
                [kp.BOTTOM_LEFT]: {
                    x: 0,
                    y: 1
                },
                [kp.BOTTOM_RIGHT]: {
                    x: 1,
                    y: 1
                },
                [kp.BOTTOM]: {
                    x: .5,
                    y: 1
                },
                [kp.RIGHT]: {
                    x: 1,
                    y: .5
                },
                [kp.LEFT]: {
                    x: 0,
                    y: .5
                }
            },
            jp = {
                center: "c",
                top: "t",
                top_left: "tl",
                top_right: "tr",
                bottom: "b",
                bottom_left: "bl",
                bottom_right: "br",
                left: "l",
                right: "r"
            },
            Bp = "img",
            Vp = {
                AUTO: "auto",
                CLASSIC: "classic",
                SUPER: "super"
            },
            $p = {
                classic: 1,
                super: 2
            },
            Wp = {
                radius: "0.66",
                amount: "1.00",
                threshold: "0.01"
            },
            qp = 25e6,
            Hp = [1.5, 2, 4],
            zp = {
                HIGH: {
                    size: 196e4,
                    quality: 90,
                    maxUpscale: 1
                },
                MEDIUM: {
                    size: 36e4,
                    quality: 85,
                    maxUpscale: 1
                },
                LOW: {
                    size: 16e4,
                    quality: 80,
                    maxUpscale: 1.2
                },
                TINY: {
                    size: 0,
                    quality: 80,
                    maxUpscale: 1.4
                }
            },
            Yp = {
                HIGH: "HIGH",
                MEDIUM: "MEDIUM",
                LOW: "LOW",
                TINY: "TINY"
            },
            Jp = {
                CONTRAST: "contrast",
                BRIGHTNESS: "brightness",
                SATURATION: "saturation",
                HUE: "hue",
                BLUR: "blur"
            },
            Kp = {
                JPG: "jpg",
                JPEG: "jpeg",
                JPE: "jpe",
                PNG: "png",
                WEBP: "webp",
                WIX_ICO_MP: "wix_ico_mp",
                WIX_MP: "wix_mp",
                GIF: "gif",
                SVG: "svg",
                UNRECOGNIZED: "unrecognized"
            };
        Kp.JPG, Kp.JPEG, Kp.JPE, Kp.PNG, Kp.GIF, Kp.WEBP;

        function Qp(e, ...t) {
            return function(...r) {
                const n = r[r.length - 1] || {},
                    o = [e[0]];
                return t.forEach((function(t, a) {
                    const i = Number.isInteger(t) ? r[t] : n[t];
                    o.push(i, e[a + 1])
                })), o.join("")
            }
        }

        function Xp(e) {
            return e[e.length - 1]
        }
        const Zp = [Kp.PNG, Kp.JPEG, Kp.JPG, Kp.JPE, Kp.WIX_ICO_MP, Kp.WIX_MP, Kp.WEBP],
            ef = [Kp.JPEG, Kp.JPG, Kp.JPE];

        function tf(e, t, r) {
            return ! function(e, t, r = !1) {
                return rf(e) && (t || !r)
            }(e, t, r) && function(e) {
                return Zp.includes(cf(e))
            }(e) && ! function(e) {
                return /(^https?)|(^data)|(^\/\/)/.test(e)
            }(e)
        }

        function rf(e) {
            return cf(e) === Kp.WEBP
        }
        const nf = ["/", "\\", "?", "<", ">", "|", "\u201c", ":", '"'].map(encodeURIComponent),
            of = ["\\.", "\\*"],
            af = "_";

        function sf(e) {
            return function(e) {
                return ef.includes(cf(e))
            }(e) ? Kp.JPG : function(e) {
                return cf(e) === Kp.PNG
            }(e) ? Kp.PNG : rf(e) ? Kp.WEBP : Kp.UNRECOGNIZED
        }

        function cf(e) {
            return (/[.]([^.]+)$/.exec(e) && /[.]([^.]+)$/.exec(e)[1] || "").toLowerCase()
        }

        function lf(e, t, r, n, o) {
            let a;
            return a = o === Mp.FILL ? function(e, t, r, n) {
                return Math.max(r / e, n / t)
            }(e, t, r, n) : o === Mp.FIT ? function(e, t, r, n) {
                return Math.min(r / e, n / t)
            }(e, t, r, n) : 1, a
        }

        function df(e, t, r, n, o, a) {
            e = e || n.width, t = t || n.height;
            const {
                scaleFactor: i,
                width: s,
                height: c
            } = function(e, t, r, n, o) {
                let a, i = r,
                    s = n;
                if (a = lf(e, t, r, n, o), o === Mp.FIT && (i = e * a, s = t * a), i && s && i * s > qp) {
                    const r = Math.sqrt(qp / (i * s));
                    i *= r, s *= r, a = lf(e, t, i, s, o)
                }
                return {
                    scaleFactor: a,
                    width: i,
                    height: s
                }
            }(e, t, n.width * o, n.height * o, r);
            return function(e, t, r, n, o, a, i) {
                const {
                    optimizedScaleFactor: s,
                    upscaleMethodValue: c,
                    forceUSM: l
                } = function(e, t, r, n) {
                    if ("auto" === n) return function(e, t) {
                        const r = hf(e, t);
                        return {
                            optimizedScaleFactor: zp[r].maxUpscale,
                            upscaleMethodValue: $p.classic,
                            forceUSM: !1
                        }
                    }(e, t);
                    if ("super" === n) return function(e) {
                        return {
                            optimizedScaleFactor: Xp(Hp),
                            upscaleMethodValue: $p.super,
                            forceUSM: !(Hp.includes(e) || e > Xp(Hp))
                        }
                    }(r);
                    return function(e, t) {
                        const r = hf(e, t);
                        return {
                            optimizedScaleFactor: zp[r].maxUpscale,
                            upscaleMethodValue: $p.classic,
                            forceUSM: !1
                        }
                    }(e, t)
                }(e, t, a, o);
                let d = r,
                    u = n;
                if (a <= s) return {
                    width: d,
                    height: u,
                    scaleFactor: a,
                    upscaleMethodValue: c,
                    forceUSM: l,
                    cssUpscaleNeeded: !1
                };
                switch (i) {
                    case Mp.FILL:
                        d = r * (s / a), u = n * (s / a);
                        break;
                    case Mp.FIT:
                        d = e * s, u = t * s
                }
                return {
                    width: d,
                    height: u,
                    scaleFactor: s,
                    upscaleMethodValue: c,
                    forceUSM: l,
                    cssUpscaleNeeded: !0
                }
            }(e, t, s, c, a, i, r)
        }

        function uf(e, t, r, n) {
            const o = ff(r) || function(e = kp.CENTER) {
                return Gp[e]
            }(n);
            return {
                x: Math.max(0, Math.min(e.width - t.width, o.x * e.width - t.width / 2)),
                y: Math.max(0, Math.min(e.height - t.height, o.y * e.height - t.height / 2)),
                width: Math.min(e.width, t.width),
                height: Math.min(e.height, t.height)
            }
        }

        function pf(e) {
            return e.alignment && jp[e.alignment] || jp[kp.CENTER]
        }

        function ff(e) {
            let t;
            return !e || "number" != typeof e.x || isNaN(e.x) || "number" != typeof e.y || isNaN(e.y) || (t = {
                x: mf(Math.max(0, Math.min(100, e.x)) / 100, 2),
                y: mf(Math.max(0, Math.min(100, e.y)) / 100, 2)
            }), t
        }

        function hf(e, t) {
            const r = e * t;
            return r > zp[Yp.HIGH].size ? Yp.HIGH : r > zp[Yp.MEDIUM].size ? Yp.MEDIUM : r > zp[Yp.LOW].size ? Yp.LOW : Yp.TINY
        }

        function mf(e, t) {
            const r = Math.pow(10, t || 0);
            return (e * r / r).toFixed(t)
        }

        function gf(e) {
            return e && e.upscaleMethod && Vp[e.upscaleMethod.toUpperCase()] || Vp.AUTO
        }
        const yf = {
                isMobile: !1
            },
            vf = function(e) {
                return yf[e]
            };

        function _f() {
            if ("undefined" != typeof window && "undefined" != typeof navigator) {
                const t = window.matchMedia && window.matchMedia("(max-width: 767px)").matches,
                    r = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                e = t && r, yf["isMobile"] = e
            }
            var e
        }
        kp.CENTER, kp.TOP, kp.TOP_LEFT, kp.TOP_RIGHT, kp.BOTTOM, kp.BOTTOM_LEFT, kp.BOTTOM_RIGHT, kp.LEFT, kp.RIGHT;

        function Ef(e, t, r) {
            let n;
            switch (t.crop && (n = function(e, t) {
                const r = Math.max(0, Math.min(e.width, t.x + t.width) - Math.max(0, t.x)),
                    n = Math.max(0, Math.min(e.height, t.y + t.height) - Math.max(0, t.y));
                return r && n && (e.width !== r || e.height !== n) ? {
                    x: Math.max(0, t.x),
                    y: Math.max(0, t.y),
                    width: r,
                    height: n
                } : null
            }(t, t.crop), n && (e.src.width = n.width, e.src.height = n.height, e.src.isCropped = !0, e.parts.push(Tf(n)))), e.fittingType) {
                case Up.SCALE_TO_FIT:
                case Up.LEGACY_FIT_WIDTH:
                case Up.LEGACY_FIT_HEIGHT:
                case Up.LEGACY_FULL:
                case Up.FIT_AND_TILE:
                case Up.LEGACY_BG_FIT_AND_TILE:
                case Up.LEGACY_BG_FIT_AND_TILE_HORIZONTAL:
                case Up.LEGACY_BG_FIT_AND_TILE_VERTICAL:
                case Up.LEGACY_BG_NORMAL:
                    e.parts.push(If(e, r));
                    break;
                case Up.SCALE_TO_FILL:
                    e.parts.push(function(e, t) {
                        const r = df(e.src.width, e.src.height, Mp.FILL, t, e.devicePixelRatio, e.upscaleMethod),
                            n = ff(e.focalPoint);
                        return {
                            transformType: n ? Mp.FILL_FOCAL : Mp.FILL,
                            width: Math.round(r.width),
                            height: Math.round(r.height),
                            alignment: pf(t),
                            focalPointX: n && n.x,
                            focalPointY: n && n.y,
                            upscale: r.scaleFactor > 1,
                            forceUSM: r.forceUSM,
                            scaleFactor: r.scaleFactor,
                            cssUpscaleNeeded: r.cssUpscaleNeeded,
                            upscaleMethodValue: r.upscaleMethodValue
                        }
                    }(e, r));
                    break;
                case Up.STRETCH:
                    e.parts.push(function(e, t) {
                        const r = lf(e.src.width, e.src.height, t.width, t.height, Mp.FILL),
                            n = { ...t
                            };
                        return n.width = e.src.width * r, n.height = e.src.height * r, If(e, n)
                    }(e, r));
                    break;
                case Up.TILE_HORIZONTAL:
                case Up.TILE_VERTICAL:
                case Up.TILE:
                case Up.LEGACY_ORIGINAL_SIZE:
                case Up.ORIGINAL_SIZE:
                    n = uf(e.src, r, e.focalPoint, r.alignment), e.src.isCropped ? (Object.assign(e.parts[0], n), e.src.width = n.width, e.src.height = n.height) : e.parts.push(Tf(n));
                    break;
                case Up.LEGACY_STRIP_TILE_HORIZONTAL:
                case Up.LEGACY_STRIP_TILE_VERTICAL:
                case Up.LEGACY_STRIP_TILE:
                case Up.LEGACY_STRIP_ORIGINAL_SIZE:
                    e.parts.push(function(e) {
                        return {
                            transformType: Mp.LEGACY_CROP,
                            width: Math.round(e.width),
                            height: Math.round(e.height),
                            alignment: pf(e),
                            upscale: !1,
                            forceUSM: !1,
                            scaleFactor: 1,
                            cssUpscaleNeeded: !1
                        }
                    }(r));
                    break;
                case Up.LEGACY_STRIP_SCALE_TO_FIT:
                case Up.LEGACY_STRIP_FIT_AND_TILE:
                    e.parts.push(function(e) {
                        return {
                            transformType: Mp.FIT,
                            width: Math.round(e.width),
                            height: Math.round(e.height),
                            upscale: !1,
                            forceUSM: !0,
                            scaleFactor: 1,
                            cssUpscaleNeeded: !1
                        }
                    }(r));
                    break;
                case Up.LEGACY_STRIP_SCALE_TO_FILL:
                    e.parts.push(function(e) {
                        return {
                            transformType: Mp.LEGACY_FILL,
                            width: Math.round(e.width),
                            height: Math.round(e.height),
                            alignment: pf(e),
                            upscale: !1,
                            forceUSM: !0,
                            scaleFactor: 1,
                            cssUpscaleNeeded: !1
                        }
                    }(r))
            }
        }

        function If(e, t) {
            const r = df(e.src.width, e.src.height, Mp.FIT, t, e.devicePixelRatio, e.upscaleMethod);
            return {
                transformType: !e.src.width || !e.src.height ? Mp.FIT : Mp.FILL,
                width: Math.round(r.width),
                height: Math.round(r.height),
                alignment: jp.center,
                upscale: r.scaleFactor > 1,
                forceUSM: r.forceUSM,
                scaleFactor: r.scaleFactor,
                cssUpscaleNeeded: r.cssUpscaleNeeded,
                upscaleMethodValue: r.upscaleMethodValue
            }
        }

        function Tf(e) {
            return {
                transformType: Mp.CROP,
                x: Math.round(e.x),
                y: Math.round(e.y),
                width: Math.round(e.width),
                height: Math.round(e.height),
                upscale: !1,
                forceUSM: !1,
                scaleFactor: 1,
                cssUpscaleNeeded: !1
            }
        }

        function Rf(e, t) {
            t = t || {}, e.quality = function(e, t) {
                const r = e.fileType === Kp.PNG,
                    n = e.fileType === Kp.JPG,
                    o = e.fileType === Kp.WEBP,
                    a = n || r || o;
                if (a) {
                    const n = Xp(e.parts),
                        o = (i = n.width, s = n.height, zp[hf(i, s)].quality);
                    let a = t.quality && t.quality >= 5 && t.quality <= 90 ? t.quality : o;
                    return a = r ? a + 5 : a, a
                }
                var i, s;
                return 0
            }(e, t), e.progressive = function(e) {
                return !1 !== e.progressive
            }(t), e.watermark = function(e) {
                return e.watermark
            }(t), e.autoEncode = t.autoEncode ? ? !0, e.unsharpMask = function(e, t) {
                if (function(e) {
                        const t = "number" == typeof(e = e || {}).radius && !isNaN(e.radius) && e.radius >= .1 && e.radius <= 500,
                            r = "number" == typeof e.amount && !isNaN(e.amount) && e.amount >= 0 && e.amount <= 10,
                            n = "number" == typeof e.threshold && !isNaN(e.threshold) && e.threshold >= 0 && e.threshold <= 255;
                        return t && r && n
                    }(t.unsharpMask)) return {
                    radius: mf(t.unsharpMask ? .radius, 2),
                    amount: mf(t.unsharpMask ? .amount, 2),
                    threshold: mf(t.unsharpMask ? .threshold, 2)
                };
                if (("number" != typeof(r = (r = t.unsharpMask) || {}).radius || isNaN(r.radius) || 0 !== r.radius || "number" != typeof r.amount || isNaN(r.amount) || 0 !== r.amount || "number" != typeof r.threshold || isNaN(r.threshold) || 0 !== r.threshold) && function(e) {
                        const t = Xp(e.parts);
                        return !(t.scaleFactor >= 1) || t.forceUSM || t.transformType === Mp.FIT
                    }(e)) return Wp;
                var r;
                return
            }(e, t), e.filters = function(e) {
                const t = e.filters || {},
                    r = {};
                wf(t[Jp.CONTRAST], -100, 100) && (r[Jp.CONTRAST] = t[Jp.CONTRAST]);
                wf(t[Jp.BRIGHTNESS], -100, 100) && (r[Jp.BRIGHTNESS] = t[Jp.BRIGHTNESS]);
                wf(t[Jp.SATURATION], -100, 100) && (r[Jp.SATURATION] = t[Jp.SATURATION]);
                wf(t[Jp.HUE], -180, 180) && (r[Jp.HUE] = t[Jp.HUE]);
                wf(t[Jp.BLUR], 0, 100) && (r[Jp.BLUR] = t[Jp.BLUR]);
                return r
            }(t)
        }

        function wf(e, t, r) {
            return "number" == typeof e && !isNaN(e) && 0 !== e && e >= t && e <= r
        }

        function Sf(e, t, r, n) {
            const o = function(e) {
                    return e ? .isSEOBot ? ? !1
                }(n),
                a = sf(t.id),
                i = function(e, t) {
                    const r = /\.([^.]*)$/,
                        n = new RegExp(`(${nf.concat(of).join("|")})`, "g");
                    if (t && t.length) {
                        let e = t;
                        const o = t.match(r);
                        return o && Zp.includes(o[1]) && (e = t.replace(r, "")), encodeURIComponent(e).replace(n, af)
                    }
                    const o = e.match(/\/(.*?)$/);
                    return (o ? o[1] : e).replace(r, "")
                }(t.id, t.name),
                s = o ? 1 : function(e) {
                    return Math.min(e.pixelAspectRatio || 1, Dp)
                }(r),
                c = cf(t.id),
                l = c,
                d = tf(t.id, n ? .hasAnimation, n ? .allowWEBPTransform),
                u = {
                    fileName: i,
                    fileExtension: c,
                    fileType: a,
                    fittingType: e,
                    preferredExtension: l,
                    src: {
                        id: t.id,
                        width: t.width,
                        height: t.height,
                        isCropped: !1
                    },
                    focalPoint: {
                        x: t.focalPoint && t.focalPoint.x,
                        y: t.focalPoint && t.focalPoint.y
                    },
                    parts: [],
                    devicePixelRatio: s,
                    quality: 0,
                    upscaleMethod: gf(n),
                    progressive: !0,
                    watermark: "",
                    unsharpMask: {},
                    filters: {},
                    transformed: d
                };
            return d && (Ef(u, t, r), Rf(u, n)), u
        }

        function Of(e, t, r) {
            const n = { ...r
                },
                o = vf("isMobile");
            switch (e) {
                case Up.LEGACY_BG_FIT_AND_TILE:
                case Up.LEGACY_BG_FIT_AND_TILE_HORIZONTAL:
                case Up.LEGACY_BG_FIT_AND_TILE_VERTICAL:
                case Up.LEGACY_BG_NORMAL:
                    const e = o ? xp : Ap,
                        r = o ? Lp : Fp;
                    n.width = Math.min(e, t.width), n.height = Math.min(r, Math.round(n.width / (t.width / t.height))), n.pixelAspectRatio = 1
            }
            return n
        }
        const Pf = Qp `fit/w_${"width"},h_${"height"}`,
            Nf = Qp `fill/w_${"width"},h_${"height"},al_${"alignment"}`,
            Cf = Qp `fill/w_${"width"},h_${"height"},fp_${"focalPointX"}_${"focalPointY"}`,
            bf = Qp `crop/x_${"x"},y_${"y"},w_${"width"},h_${"height"}`,
            Df = Qp `crop/w_${"width"},h_${"height"},al_${"alignment"}`,
            Af = Qp `fill/w_${"width"},h_${"height"},al_${"alignment"}`,
            Ff = Qp `,lg_${"upscaleMethodValue"}`,
            xf = Qp `,q_${"quality"}`,
            Lf = Qp `,usm_${"radius"}_${"amount"}_${"threshold"}`,
            Uf = Qp `,bl`,
            Mf = Qp `,wm_${"watermark"}`,
            kf = {
                [Jp.CONTRAST]: Qp `,con_${"contrast"}`,
                [Jp.BRIGHTNESS]: Qp `,br_${"brightness"}`,
                [Jp.SATURATION]: Qp `,sat_${"saturation"}`,
                [Jp.HUE]: Qp `,hue_${"hue"}`,
                [Jp.BLUR]: Qp `,blur_${"blur"}`
            },
            Gf = Qp `,enc_auto`;

        function jf(e, t, r, n = {}, o) {
            if (tf(t.id, n ? .hasAnimation, n ? .allowWEBPTransform)) {
                if (rf(t.id)) {
                    const {
                        alignment: a,
                        ...i
                    } = r;
                    t.focalPoint = {
                        x: void 0,
                        y: void 0
                    }, delete t ? .crop, o = Sf(e, t, i, n)
                } else o = o || Sf(e, t, r, n);
                return function(e) {
                    const t = [];
                    e.parts.forEach((e => {
                        switch (e.transformType) {
                            case Mp.CROP:
                                t.push(bf(e));
                                break;
                            case Mp.LEGACY_CROP:
                                t.push(Df(e));
                                break;
                            case Mp.LEGACY_FILL:
                                let r = Af(e);
                                e.upscale && (r += Ff(e)), t.push(r);
                                break;
                            case Mp.FIT:
                                let n = Pf(e);
                                e.upscale && (n += Ff(e)), t.push(n);
                                break;
                            case Mp.FILL:
                                let o = Nf(e);
                                e.upscale && (o += Ff(e)), t.push(o);
                                break;
                            case Mp.FILL_FOCAL:
                                let a = Cf(e);
                                e.upscale && (a += Ff(e)), t.push(a)
                        }
                    }));
                    let r = t.join("/");
                    return e.quality && (r += xf(e)), e.unsharpMask && (r += Lf(e.unsharpMask)), e.progressive || (r += Uf(e)), e.watermark && (r += Mf(e)), e.filters && (r += Object.keys(e.filters).map((t => kf[t](e.filters))).join("")), e.autoEncode && e.fileType !== Kp.GIF && (r += Gf(e)), `${e.src.id}/${bp}/${r}/${e.fileName}.${e.preferredExtension}`
                }(o)
            }
            return t.id
        }
        const Bf = {
            [kp.CENTER]: "50% 50%",
            [kp.TOP_LEFT]: "0% 0%",
            [kp.TOP_RIGHT]: "100% 0%",
            [kp.TOP]: "50% 0%",
            [kp.BOTTOM_LEFT]: "0% 100%",
            [kp.BOTTOM_RIGHT]: "100% 100%",
            [kp.BOTTOM]: "50% 100%",
            [kp.RIGHT]: "100% 50%",
            [kp.LEFT]: "0% 50%"
        };
        Object.entries(Bf).reduce(((e, [t, r]) => (e[r] = t, e)), {}), Up.TILE, Up.TILE_HORIZONTAL, Up.TILE_VERTICAL, Up.LEGACY_BG_FIT_AND_TILE, Up.LEGACY_BG_FIT_AND_TILE_HORIZONTAL, Up.LEGACY_BG_FIT_AND_TILE_VERTICAL, Up.LEGACY_ORIGINAL_SIZE, Up.ORIGINAL_SIZE, Up.LEGACY_BG_NORMAL;

        function Vf(e, t, r, n) {
            if (function(e, t, r) {
                    return r && t && ! function(e) {
                        return !e || !e.trim() || "none" === e.toLowerCase()
                    }(t.id) && Object.values(Up).includes(e)
                }(e, t, r)) {
                const o = Of(e, t, r);
                return {
                    uri: jf(e, t, o, n || {}, Sf(e, t, o, n))
                }
            }
            return {
                uri: ""
            }
        }
        const $f = /^media\//i,
            Wf = "undefined" != typeof window ? window.devicePixelRatio : 1,
            qf = (e, t) => {
                const r = t && t.baseHostURL;
                return r ? `${r}${e}` : (e => $f.test(e) ? `https://static.wixstatic.com/${e}` : `https://static.wixstatic.com/media/${e}`)(e)
            };
        _f(), _f();
        const Hf = {
            getScaleToFitImageURL: function(e, t, r, n, o, a) {
                const i = Vf(Up.SCALE_TO_FIT, {
                    id: e,
                    width: t,
                    height: r,
                    name: a && a.name
                }, {
                    width: n,
                    height: o,
                    htmlTag: Bp,
                    alignment: kp.CENTER,
                    pixelAspectRatio: Wf
                }, a);
                return qf(i.uri, a)
            },
            getScaleToFillImageURL: function(e, t, r, n, o, a) {
                const i = Vf(Up.SCALE_TO_FILL, {
                    id: e,
                    width: t,
                    height: r,
                    name: a && a.name,
                    focalPoint: {
                        x: a && a.focalPoint && a.focalPoint.x,
                        y: a && a.focalPoint && a.focalPoint.y
                    }
                }, {
                    width: n,
                    height: o,
                    htmlTag: Bp,
                    alignment: kp.CENTER,
                    pixelAspectRatio: Wf
                }, a);
                return qf(i.uri, a)
            },
            getCropImageURL: function(e, t, r, n, o, a, i, s, c, l) {
                const d = Vf(Up.SCALE_TO_FILL, {
                    id: e,
                    width: t,
                    height: r,
                    name: l && l.name,
                    crop: {
                        x: n,
                        y: o,
                        width: a,
                        height: i
                    }
                }, {
                    width: s,
                    height: c,
                    htmlTag: Bp,
                    alignment: kp.CENTER,
                    pixelAspectRatio: Wf
                }, l);
                return qf(d.uri, l)
            }
        };

        function zf(e, t, r) {
            ! function(e, t) {
                if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object")
            }(e, t), t.set(e, r)
        }

        function Yf(e, t) {
            return e.get(Kf(e, t))
        }

        function Jf(e, t, r) {
            return e.set(Kf(e, t), r), r
        }

        function Kf(e, t, r) {
            if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : r;
            throw new TypeError("Private element is not present on this object")
        }
        var Qf = new WeakMap,
            Xf = new WeakMap,
            Zf = new WeakMap,
            eh = new WeakMap,
            th = new WeakMap,
            rh = new WeakMap,
            nh = new WeakMap;
        class oh {
            constructor(e) {
                let {
                    platformUtils: t,
                    wixSdk: r,
                    bi: n,
                    tpaActionImplementations: o,
                    devMode: a,
                    verbose: i
                } = e;
                zf(this, Qf, void 0), zf(this, Xf, void 0), zf(this, Zf, void 0), zf(this, eh, void 0), zf(this, th, void 0), zf(this, rh, void 0), zf(this, nh, void 0), Jf(Qf, this, this._getSettings({
                    wixSdk: r,
                    bi: n,
                    devMode: a,
                    verbose: i
                })), Jf(Xf, this, this._getUser(r.user)), Jf(Zf, this, this._getLocation(r.location, n)), Jf(eh, this, this._getUtils(t)), Jf(th, this, this._getTimers(r)), Jf(rh, this, (async e => {
                    let {
                        currentItem: t,
                        action: n
                    } = e;
                    const a = o[n];
                    await a({
                        wixSdk: r,
                        currentItem: t
                    })
                })), Jf(nh, this, this._getSeo(r))
            }
            get settings() {
                return Yf(Qf, this)
            }
            get user() {
                return Yf(Xf, this)
            }
            get location() {
                return Yf(Zf, this)
            }
            get utils() {
                return Yf(eh, this)
            }
            get timers() {
                return Yf(th, this)
            }
            get executeTpaAction() {
                return Yf(rh, this)
            }
            get seo() {
                return Yf(nh, this)
            }
            _getSettings(e) {
                let {
                    wixSdk: {
                        window: {
                            viewMode: t,
                            rendering: {
                                env: r
                            },
                            browserLocale: n
                        },
                        site: {
                            regionalSettings: o = n
                        }
                    },
                    bi: {
                        metaSiteId: a,
                        viewerName: i
                    },
                    devMode: s,
                    verbose: c
                } = e;
                return {
                    metaSiteId: a,
                    locale: o,
                    mode: {
                        name: r,
                        dev: s,
                        verbose: c,
                        ssr: "backend" === r,
                        csr: "backend" !== r
                    },
                    env: {
                        name: t,
                        live: "Site" === t,
                        preview: "Preview" === t,
                        livePreview: "Editor" === t,
                        editor: "Preview" === t || "Editor" === t,
                        renderer: i
                    }
                }
            }
            _getUser(e) {
                return {
                    get id() {
                        return e.currentUser.id
                    },
                    get loggedIn() {
                        return e.currentUser.loggedIn
                    },
                    onLogin: e.onLogin
                }
            }
            _getLocation(e, t) {
                let {
                    baseUrl: r,
                    url: n,
                    to: o
                } = e, {
                    pageId: a
                } = t;
                return {
                    pageId: a,
                    pageUrl: n,
                    baseUrl: r,
                    navigateTo: o
                }
            }
            _getUtils(e) {
                let {
                    links: t,
                    mediaItemUtils: r
                } = e;
                return {
                    links: t,
                    media: { ...r,
                        getScaleToFillImageURL: Hf.getScaleToFillImageURL
                    }
                }
            }
            _getTimers(e) {
                var t;
                return {
                    queueMicrotask: (null == (t = e.environment) || null == (t = t.timers) ? void 0 : t.queueMicrotask) || queueMicrotask
                }
            }
            _getSeo(e) {
                return {
                    renderSEOTags: e.seo.renderSEOTags
                }
            }
        }
        const ah = JSON.parse('{"USER_INPUT_FILTER_OPTION_RESET_ALL":"\u0627\u0644\u0643\u0644","USER_INPUT_FILTER_OPTION_NONE":"None"}');
        var ih = a.t(ah, 2);
        const sh = JSON.parse('{"USER_INPUT_FILTER_OPTION_RESET_ALL":"\u0412\u0441\u0438\u0447\u043a\u0438","USER_INPUT_FILTER_OPTION_NONE":"None"}');
        var ch = a.t(sh, 2);
        const lh = JSON.parse('{"USER_INPUT_FILTER_OPTION_RESET_ALL":"Tot","USER_INPUT_FILTER_OPTION_NONE":"None"}');
        var dh = a.t(lh, 2);
        const uh = JSON.parse('{"USER_INPUT_FILTER_OPTION_RESET_ALL":"V\u0161e","USER_INPUT_FILTER_OPTION_NONE":"\u017d\xe1dn\xe9"}');
        var ph = a.t(uh, 2);
        const fh = JSON.parse('{"USER_INPUT_FILTER_OPTION_RESET_ALL":"Alle","USER_INPUT_FILTER_OPTION_NONE":"None"}');
        var hh = a.t(fh, 2);
        const mh = JSON.parse('{"USER_INPUT_FILTER_OPTION_RESET_ALL":"Alle","USER_INPUT_FILTER_OPTION_NONE":"None"}');
        var gh = a.t(mh, 2);
        const yh = JSON.parse('{"USER_INPUT_FILTER_OPTION_RESET_ALL":"\u038c\u03bb\u03b1","USER_INPUT_FILTER_OPTION_NONE":"None"}');
        var vh = a.t(yh, 2);
        const _h = JSON.parse('{"USER_INPUT_FILTER_OPTION_RESET_ALL":"All","USER_INPUT_FILTER_OPTION_NONE":"None"}');
        var Eh = a.t(_h, 2);
        const Ih = JSON.parse('{"USER_INPUT_FILTER_OPTION_RESET_ALL":"Todo","USER_INPUT_FILTER_OPTION_NONE":"Ninguno"}');
        var Th = a.t(Ih, 2);
        const Rh = JSON.parse('{"USER_INPUT_FILTER_OPTION_RESET_ALL":"Tout","USER_INPUT_FILTER_OPTION_NONE":"Aucun"}');
        var wh = a.t(Rh, 2);
        const Sh = JSON.parse('{"USER_INPUT_FILTER_OPTION_RESET_ALL":"\u05d4\u05db\u05dc","USER_INPUT_FILTER_OPTION_NONE":"None"}');
        var Oh = a.t(Sh, 2);
        const Ph = JSON.parse('{"USER_INPUT_FILTER_OPTION_RESET_ALL":"\u0938\u092d\u0940","USER_INPUT_FILTER_OPTION_NONE":"None"}');
        var Nh = a.t(Ph, 2);
        const Ch = JSON.parse('{"USER_INPUT_FILTER_OPTION_RESET_ALL":"\xd6sszes","USER_INPUT_FILTER_OPTION_NONE":"None"}');
        var bh = a.t(Ch, 2);
        const Dh = JSON.parse('{"USER_INPUT_FILTER_OPTION_RESET_ALL":"Semua","USER_INPUT_FILTER_OPTION_NONE":"None"}');
        var Ah = a.t(Dh, 2);
        const Fh = JSON.parse('{"USER_INPUT_FILTER_OPTION_RESET_ALL":"Tutti","USER_INPUT_FILTER_OPTION_NONE":"None"}');
        var xh = a.t(Fh, 2);
        const Lh = JSON.parse('{"USER_INPUT_FILTER_OPTION_RESET_ALL":"\u3059\u3079\u3066","USER_INPUT_FILTER_OPTION_NONE":"None"}');
        var Uh = a.t(Lh, 2);
        const Mh = JSON.parse('{"USER_INPUT_FILTER_OPTION_RESET_ALL":"\uc804\uccb4","USER_INPUT_FILTER_OPTION_NONE":"\uc0ac\uc6a9\ud558\uc9c0 \uc54a\uc74c"}');
        var kh = a.t(Mh, 2);
        const Gh = JSON.parse('{"USER_INPUT_FILTER_OPTION_RESET_ALL":"Viskas","USER_INPUT_FILTER_OPTION_NONE":"None"}');
        var jh = a.t(Gh, 2);
        const Bh = JSON.parse('{"USER_INPUT_FILTER_OPTION_RESET_ALL":"Semua","USER_INPUT_FILTER_OPTION_NONE":"None"}');
        var Vh = a.t(Bh, 2);
        const $h = JSON.parse('{"USER_INPUT_FILTER_OPTION_RESET_ALL":"Alle","USER_INPUT_FILTER_OPTION_NONE":"Geen"}');
        var Wh = a.t($h, 2);
        const qh = JSON.parse('{"USER_INPUT_FILTER_OPTION_RESET_ALL":"Alle","USER_INPUT_FILTER_OPTION_NONE":"None"}');
        var Hh = a.t(qh, 2);
        const zh = JSON.parse('{"USER_INPUT_FILTER_OPTION_RESET_ALL":"Wszystkie","USER_INPUT_FILTER_OPTION_NONE":"None"}');
        var Yh = a.t(zh, 2);
        const Jh = JSON.parse('{"USER_INPUT_FILTER_OPTION_RESET_ALL":"Todos","USER_INPUT_FILTER_OPTION_NONE":"None"}');
        var Kh = a.t(Jh, 2);
        const Qh = JSON.parse('{"USER_INPUT_FILTER_OPTION_RESET_ALL":"Toate","USER_INPUT_FILTER_OPTION_NONE":"None"}');
        var Xh = a.t(Qh, 2);
        const Zh = JSON.parse('{"USER_INPUT_FILTER_OPTION_RESET_ALL":"\u0412\u0441\u0435","USER_INPUT_FILTER_OPTION_NONE":"None"}');
        var em = a.t(Zh, 2);
        const tm = JSON.parse('{"USER_INPUT_FILTER_OPTION_RESET_ALL":"V\u0161etky","USER_INPUT_FILTER_OPTION_NONE":"None"}');
        var rm = a.t(tm, 2);
        const nm = JSON.parse('{"USER_INPUT_FILTER_OPTION_RESET_ALL":"Vse","USER_INPUT_FILTER_OPTION_NONE":"None"}');
        var om = a.t(nm, 2);
        const am = JSON.parse('{"USER_INPUT_FILTER_OPTION_RESET_ALL":"Alla","USER_INPUT_FILTER_OPTION_NONE":"None"}');
        var im = a.t(am, 2);
        const sm = JSON.parse('{"USER_INPUT_FILTER_OPTION_RESET_ALL":"\u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14","USER_INPUT_FILTER_OPTION_NONE":"None"}');
        var cm = a.t(sm, 2);
        const lm = JSON.parse('{"USER_INPUT_FILTER_OPTION_RESET_ALL":"Lahat","USER_INPUT_FILTER_OPTION_NONE":"None"}');
        var dm = a.t(lm, 2);
        const um = JSON.parse('{"USER_INPUT_FILTER_OPTION_RESET_ALL":"Hepsi","USER_INPUT_FILTER_OPTION_NONE":"None"}');
        var pm = a.t(um, 2);
        const fm = JSON.parse('{"USER_INPUT_FILTER_OPTION_RESET_ALL":"\u0423\u0441\u0456","USER_INPUT_FILTER_OPTION_NONE":"None"}');
        var hm = a.t(fm, 2);
        const mm = JSON.parse('{"USER_INPUT_FILTER_OPTION_RESET_ALL":"T\u1ea5t c\u1ea3","USER_INPUT_FILTER_OPTION_NONE":"None"}');
        var gm = a.t(mm, 2);
        const ym = JSON.parse('{"USER_INPUT_FILTER_OPTION_RESET_ALL":"\u6240\u6709","USER_INPUT_FILTER_OPTION_NONE":"None"}');
        const vm = {
                ar: ih,
                bg: ch,
                ca: dh,
                cs: ph,
                da: hh,
                de: gh,
                el: vh,
                en: Eh,
                es: Th,
                fr: wh,
                he: Oh,
                hi: Nh,
                hu: bh,
                id: Ah,
                it: xh,
                ja: Uh,
                ko: kh,
                lt: jh,
                ms: Vh,
                nl: Wh,
                no: Hh,
                pl: Yh,
                pt: Kh,
                ro: Xh,
                ru: em,
                sk: rm,
                sl: om,
                sv: im,
                th: cm,
                tl: dm,
                tr: pm,
                uk: hm,
                vi: gm,
                zh: a.t(ym, 2)
            },
            _m = vm.en,
            {
                initAppForPage: Em,
                createControllers: Im
            } = function(e) {
                let t, r, {
                    verbose: n = !1,
                    wixDataSchemasForItTests: i,
                    automationsClientCreator: s = I,
                    tpaActionImplementations: l = o
                } = void 0 === e ? {} : e;
                return {
                    initAppForPage: function(e, o, d, u) {
                        let p, {
                            bi: f = {},
                            monitoring: {
                                createMonitor: h
                            },
                            fedOpsLoggerFactory: m,
                            biLoggerFactory: g,
                            essentials: {
                                httpClient: y,
                                experiments: v,
                                createErrorMonitor: _
                            }
                        } = void 0 === u ? {} : u;
                        try {
                            const u = new oh({
                                    platformUtils: o,
                                    wixSdk: d,
                                    bi: f,
                                    tpaActionImplementations: l,
                                    devMode: !1,
                                    verbose: n
                                }),
                                {
                                    settings: E
                                } = u,
                                {
                                    instance: I,
                                    appData: {
                                        gridAppId: T
                                    },
                                    url: R
                                } = e;
                            (e => {
                                try {
                                    a.p = e.substr(0, e.lastIndexOf("/") + 1)
                                } catch {}
                            })(R);
                            const {
                                data: w,
                                window: {
                                    warmupData: S,
                                    getRouterData: O
                                },
                                location: {
                                    baseUrl: P,
                                    protocol: N
                                },
                                site: {
                                    language: C,
                                    currentPage: b
                                }
                            } = d;
                            t = O(), v.enabled("specs.wixDataClient.RouterDataToWarmupCache") && S.set("routerData", t), p = new Wo({
                                fedops: {
                                    factory: m,
                                    hooks: {
                                        start: e => {
                                            let {
                                                name: t
                                            } = e;
                                            return p.log(new Ye({
                                                category: "interaction start",
                                                message: `interaction ${t} started`
                                            }))
                                        },
                                        end: e => {
                                            let {
                                                name: t,
                                                duration: r
                                            } = e;
                                            return p.log(new Ye({
                                                category: "interaction end",
                                                message: `interaction ${t} ended after ${r} ms`
                                            }))
                                        }
                                    }
                                },
                                bi: {
                                    factory: g
                                },
                                monitor: {
                                    factory: h,
                                    createErrorMonitor: _
                                },
                                verbose: {
                                    factory: () => ({
                                        log: function() {
                                            var e;
                                            return ((null == (e = d.telemetry) ? void 0 : e.console) || console).verbose(...arguments)
                                        }
                                    })
                                },
                                console: {
                                    factory: () => {
                                        var e;
                                        return (null == (e = d.telemetry) ? void 0 : e.console) || console
                                    }
                                },
                                platform: u,
                                global: self
                            }), p.log(new ze("databinding/initAppForPage", ze.types.START));
                            const D = (e => {
                                    const t = vm[e] ? ? _m;
                                    return {
                                        t: e => (null == t ? void 0 : t[e]) ? ? e
                                    }
                                })(C),
                                A = (e => {
                                    let {
                                        experiments: t,
                                        settings: {
                                            env: r
                                        }
                                    } = e;
                                    return {
                                        get fes() {
                                            return t.enabled("specs.wixDataViewer.EnableFES")
                                        },
                                        get warmupData() {
                                            return r.live
                                        },
                                        get newCurrentPageIndex() {
                                            return t.enabled("specs.wixDataViewer.NewCurrentPageIndex")
                                        },
                                        get automationsClientV2() {
                                            return t.enabled("specs.wixDataClient.AutomationsClientV2")
                                        }
                                    }
                                })({
                                    experiments: v,
                                    settings: E
                                }),
                                F = A.fes ? new Bn({
                                    httpClient: y,
                                    getRequestParams: () => ({
                                        instance: I,
                                        gridAppId: T
                                    })
                                }) : new ho({
                                    wixData: w,
                                    wixDataSchemas: i || Cp(y, I, T, {
                                        baseUrl: `${E.env.editor?"https":N}://${c()(P).hostname}/_api/cloud-data`,
                                        useApiV2: !0
                                    })
                                }),
                                x = new To(S),
                                L = new Ro(t),
                                U = od({
                                    automationsClientCreator: () => A.automationsClientV2 ? (e => ({
                                        reportFormEventToAutomationCreator: () => async (t, r, n) => {
                                            const o = t.detailedEventPayload["form-id"].value,
                                                a = rt(t.detailedEventPayload).filter((e => "form-id" !== e)).reduce(((e, r) => {
                                                    const n = r.split(".")[1],
                                                        {
                                                            keyName: o,
                                                            valueType: a,
                                                            value: i
                                                        } = t.detailedEventPayload[r];
                                                    return e[n] = {
                                                        displayName: o,
                                                        value: i,
                                                        type: a
                                                    }, e
                                                }), {}),
                                                i = {
                                                    formId: o,
                                                    pageId: n,
                                                    submissionTime: new Date,
                                                    fields: a,
                                                    collectionId: r
                                                };
                                            await e.post("/_serverless/cms-automations/report-cms-form-submission", i)
                                        }
                                    }))(y) : s({
                                        httpClient: y
                                    }),
                                    pageId: b.id
                                });
                            return r = new Ql({
                                platform: u,
                                dataFetcher: F,
                                warmupCache: x,
                                staticCache: L,
                                features: A,
                                listenersByEvent: U,
                                logger: p,
                                i18n: D,
                                global: self,
                                loadExpressionFunctions: si
                            }), p.log(new ze("databinding/initAppForPage", ze.types.END)), Promise.resolve()
                        } catch (e) {
                            return p && p.log(new S("App initialisation failed", {
                                cause: e
                            })), Promise.reject(e)
                        }
                    },
                    createControllers: e => {
                        if (!e.length) return [];
                        const n = ((e, t) => e.map((e => {
                                let {
                                    compId: r,
                                    config: {
                                        dataset: {
                                            collectionName: n,
                                            filter: o,
                                            sort: a,
                                            includes: i,
                                            nested: s,
                                            pageSize: c,
                                            readWriteType: l,
                                            deferred: d,
                                            cursor: u
                                        } = {}
                                    } = {},
                                    type: p,
                                    connections: f,
                                    livePreviewOptions: {
                                        shouldFetchData: h,
                                        compsIdsToReset: m = []
                                    } = {}
                                } = e;
                                const g = {
                                    id: r,
                                    type: p,
                                    collectionId: n,
                                    filter: o,
                                    sort: a,
                                    pageSize: c,
                                    readWriteType: l,
                                    includes: i,
                                    nested: s,
                                    deferred: d,
                                    connections: f,
                                    dataIsInvalidated: h,
                                    updatedCompIds: m,
                                    cursor: u
                                };
                                return p === br && t ? ((e, t) => {
                                    const {
                                        readWriteType: r
                                    } = e, {
                                        config: {
                                            dataset: {
                                                collectionName: n,
                                                filter: o,
                                                sort: a,
                                                includes: i,
                                                pageSize: s,
                                                lowercase: c,
                                                seoV2: l
                                            }
                                        },
                                        dynamicUrl: d,
                                        userDefinedFilter: u
                                    } = t;
                                    return { ...e,
                                        collectionId: n,
                                        filter: o,
                                        sort: a,
                                        includes: i,
                                        pageSize: s,
                                        readWriteType: r,
                                        dynamicPageData: {
                                            lowercase: c,
                                            dynamicUrl: d,
                                            userDefinedFilter: u,
                                            seoV2: l
                                        }
                                    }
                                })(g, t) : g
                            })))(e, t),
                            o = e.reduce(((e, t) => {
                                let {
                                    $w: r,
                                    compId: n
                                } = t;
                                return e[n] = r.fireEvent, e
                            }), {});
                        return r.initializeDatasets({
                            datasetConfigs: n,
                            firePlatformEvent: e => o[e]
                        }).map((e => ({ ...e,
                            pageReady: t => e.pageReady(Il(t))
                        })))
                    }
                }
            }()
    })(), i
})()));
//# sourceMappingURL=app.js.map
//# sourceURL=https://static.parastorage.com/services/dbsm-viewer-app/1.8297.0/app.js