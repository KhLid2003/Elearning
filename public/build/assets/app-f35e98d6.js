window._ = require("lodash");
window.axios = require("axios");
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
var Ce = !1,
    Me = !1,
    R = [],
    Te = -1;
function $n(e) {
    Rn(e);
}
function Rn(e) {
    R.includes(e) || R.push(e), jn();
}
function vt(e) {
    let t = R.indexOf(e);
    t !== -1 && t > Te && R.splice(t, 1);
}
function jn() {
    !Me && !Ce && ((Ce = !0), queueMicrotask(Ln));
}
function Ln() {
    (Ce = !1), (Me = !0);
    for (let e = 0; e < R.length; e++) R[e](), (Te = e);
    (R.length = 0), (Te = -1), (Me = !1);
}
var H,
    k,
    X,
    yt,
    Ie = !0;
function Nn(e) {
    (Ie = !1), e(), (Ie = !0);
}
function Fn(e) {
    (H = e.reactive),
        (X = e.release),
        (k = (t) =>
            e.effect(t, {
                scheduler: (n) => {
                    Ie ? $n(n) : n();
                },
            })),
        (yt = e.raw);
}
function ct(e) {
    k = e;
}
function Kn(e) {
    let t = () => {};
    return [
        (r) => {
            let i = k(r);
            return (
                e._x_effects ||
                    ((e._x_effects = new Set()),
                    (e._x_runEffects = () => {
                        e._x_effects.forEach((o) => o());
                    })),
                e._x_effects.add(i),
                (t = () => {
                    i !== void 0 && (e._x_effects.delete(i), X(i));
                }),
                i
            );
        },
        () => {
            t();
        },
    ];
}
var xt = [],
    bt = [],
    mt = [];
function Dn(e) {
    mt.push(e);
}
function wt(e, t) {
    typeof t == "function"
        ? (e._x_cleanups || (e._x_cleanups = []), e._x_cleanups.push(t))
        : ((t = e), bt.push(t));
}
function Bn(e) {
    xt.push(e);
}
function Hn(e, t, n) {
    e._x_attributeCleanups || (e._x_attributeCleanups = {}),
        e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []),
        e._x_attributeCleanups[t].push(n);
}
function Et(e, t) {
    e._x_attributeCleanups &&
        Object.entries(e._x_attributeCleanups).forEach(([n, r]) => {
            (t === void 0 || t.includes(n)) &&
                (r.forEach((i) => i()), delete e._x_attributeCleanups[n]);
        });
}
var qe = new MutationObserver(Je),
    We = !1;
function Ve() {
    qe.observe(document, {
        subtree: !0,
        childList: !0,
        attributes: !0,
        attributeOldValue: !0,
    }),
        (We = !0);
}
function St() {
    kn(), qe.disconnect(), (We = !1);
}
var U = [],
    Ee = !1;
function kn() {
    (U = U.concat(qe.takeRecords())),
        U.length &&
            !Ee &&
            ((Ee = !0),
            queueMicrotask(() => {
                zn(), (Ee = !1);
            }));
}
function zn() {
    Je(U), (U.length = 0);
}
function x(e) {
    if (!We) return e();
    St();
    let t = e();
    return Ve(), t;
}
var Ue = !1,
    ae = [];
function qn() {
    Ue = !0;
}
function Wn() {
    (Ue = !1), Je(ae), (ae = []);
}
function Je(e) {
    if (Ue) {
        ae = ae.concat(e);
        return;
    }
    let t = [],
        n = [],
        r = new Map(),
        i = new Map();
    for (let o = 0; o < e.length; o++)
        if (
            !e[o].target._x_ignoreMutationObserver &&
            (e[o].type === "childList" &&
                (e[o].addedNodes.forEach((s) => s.nodeType === 1 && t.push(s)),
                e[o].removedNodes.forEach(
                    (s) => s.nodeType === 1 && n.push(s)
                )),
            e[o].type === "attributes")
        ) {
            let s = e[o].target,
                a = e[o].attributeName,
                u = e[o].oldValue,
                c = () => {
                    r.has(s) || r.set(s, []),
                        r.get(s).push({ name: a, value: s.getAttribute(a) });
                },
                l = () => {
                    i.has(s) || i.set(s, []), i.get(s).push(a);
                };
            s.hasAttribute(a) && u === null
                ? c()
                : s.hasAttribute(a)
                ? (l(), c())
                : l();
        }
    i.forEach((o, s) => {
        Et(s, o);
    }),
        r.forEach((o, s) => {
            xt.forEach((a) => a(s, o));
        });
    for (let o of n)
        if (!t.includes(o) && (bt.forEach((s) => s(o)), o._x_cleanups))
            for (; o._x_cleanups.length; ) o._x_cleanups.pop()();
    t.forEach((o) => {
        (o._x_ignoreSelf = !0), (o._x_ignore = !0);
    });
    for (let o of t)
        n.includes(o) ||
            (o.isConnected &&
                (delete o._x_ignoreSelf,
                delete o._x_ignore,
                mt.forEach((s) => s(o)),
                (o._x_ignore = !0),
                (o._x_ignoreSelf = !0)));
    t.forEach((o) => {
        delete o._x_ignoreSelf, delete o._x_ignore;
    }),
        (t = null),
        (n = null),
        (r = null),
        (i = null);
}
function At(e) {
    return ee(K(e));
}
function Z(e, t, n) {
    return (
        (e._x_dataStack = [t, ...K(n || e)]),
        () => {
            e._x_dataStack = e._x_dataStack.filter((r) => r !== t);
        }
    );
}
function lt(e, t) {
    let n = e._x_dataStack[0];
    Object.entries(t).forEach(([r, i]) => {
        n[r] = i;
    });
}
function K(e) {
    return e._x_dataStack
        ? e._x_dataStack
        : typeof ShadowRoot == "function" && e instanceof ShadowRoot
        ? K(e.host)
        : e.parentNode
        ? K(e.parentNode)
        : [];
}
function ee(e) {
    let t = new Proxy(
        {},
        {
            ownKeys: () =>
                Array.from(new Set(e.flatMap((n) => Object.keys(n)))),
            has: (n, r) => e.some((i) => i.hasOwnProperty(r)),
            get: (n, r) =>
                (e.find((i) => {
                    if (i.hasOwnProperty(r)) {
                        let o = Object.getOwnPropertyDescriptor(i, r);
                        if (
                            (o.get && o.get._x_alreadyBound) ||
                            (o.set && o.set._x_alreadyBound)
                        )
                            return !0;
                        if ((o.get || o.set) && o.enumerable) {
                            let s = o.get,
                                a = o.set,
                                u = o;
                            (s = s && s.bind(t)),
                                (a = a && a.bind(t)),
                                s && (s._x_alreadyBound = !0),
                                a && (a._x_alreadyBound = !0),
                                Object.defineProperty(i, r, {
                                    ...u,
                                    get: s,
                                    set: a,
                                });
                        }
                        return !0;
                    }
                    return !1;
                }) || {})[r],
            set: (n, r, i) => {
                let o = e.find((s) => s.hasOwnProperty(r));
                return o ? (o[r] = i) : (e[e.length - 1][r] = i), !0;
            },
        }
    );
    return t;
}
function Ot(e) {
    let t = (r) => typeof r == "object" && !Array.isArray(r) && r !== null,
        n = (r, i = "") => {
            Object.entries(Object.getOwnPropertyDescriptors(r)).forEach(
                ([o, { value: s, enumerable: a }]) => {
                    if (a === !1 || s === void 0) return;
                    let u = i === "" ? o : `${i}.${o}`;
                    typeof s == "object" && s !== null && s._x_interceptor
                        ? (r[o] = s.initialize(e, u, o))
                        : t(s) && s !== r && !(s instanceof Element) && n(s, u);
                }
            );
        };
    return n(e);
}
function Ct(e, t = () => {}) {
    let n = {
        initialValue: void 0,
        _x_interceptor: !0,
        initialize(r, i, o) {
            return e(
                this.initialValue,
                () => Vn(r, i),
                (s) => Pe(r, i, s),
                i,
                o
            );
        },
    };
    return (
        t(n),
        (r) => {
            if (typeof r == "object" && r !== null && r._x_interceptor) {
                let i = n.initialize.bind(n);
                n.initialize = (o, s, a) => {
                    let u = r.initialize(o, s, a);
                    return (n.initialValue = u), i(o, s, a);
                };
            } else n.initialValue = r;
            return n;
        }
    );
}
function Vn(e, t) {
    return t.split(".").reduce((n, r) => n[r], e);
}
function Pe(e, t, n) {
    if ((typeof t == "string" && (t = t.split(".")), t.length === 1))
        e[t[0]] = n;
    else {
        if (t.length === 0) throw error;
        return e[t[0]] || (e[t[0]] = {}), Pe(e[t[0]], t.slice(1), n);
    }
}
var Mt = {};
function S(e, t) {
    Mt[e] = t;
}
function $e(e, t) {
    return (
        Object.entries(Mt).forEach(([n, r]) => {
            Object.defineProperty(e, `$${n}`, {
                get() {
                    let [i, o] = Rt(t);
                    return (i = { interceptor: Ct, ...i }), wt(t, o), r(t, i);
                },
                enumerable: !1,
            });
        }),
        e
    );
}
function Un(e, t, n, ...r) {
    try {
        return n(...r);
    } catch (i) {
        Y(i, e, t);
    }
}
function Y(e, t, n = void 0) {
    Object.assign(e, { el: t, expression: n }),
        console.warn(
            `Alpine Expression Error: ${e.message}

${
    n
        ? 'Expression: "' +
          n +
          `"

`
        : ""
}`,
            t
        ),
        setTimeout(() => {
            throw e;
        }, 0);
}
var se = !0;
function Jn(e) {
    let t = se;
    (se = !1), e(), (se = t);
}
function F(e, t, n = {}) {
    let r;
    return m(e, t)((i) => (r = i), n), r;
}
function m(...e) {
    return Tt(...e);
}
var Tt = It;
function Gn(e) {
    Tt = e;
}
function It(e, t) {
    let n = {};
    $e(n, e);
    let r = [n, ...K(e)],
        i = typeof t == "function" ? Yn(r, t) : Xn(r, t, e);
    return Un.bind(null, e, t, i);
}
function Yn(e, t) {
    return (n = () => {}, { scope: r = {}, params: i = [] } = {}) => {
        let o = t.apply(ee([r, ...e]), i);
        ue(n, o);
    };
}
var Se = {};
function Qn(e, t) {
    if (Se[e]) return Se[e];
    let n = Object.getPrototypeOf(async function () {}).constructor,
        r =
            /^[\n\s]*if.*\(.*\)/.test(e) || /^(let|const)\s/.test(e)
                ? `(async()=>{ ${e} })()`
                : e,
        o = (() => {
            try {
                return new n(
                    ["__self", "scope"],
                    `with (scope) { __self.result = ${r} }; __self.finished = true; return __self.result;`
                );
            } catch (s) {
                return Y(s, t, e), Promise.resolve();
            }
        })();
    return (Se[e] = o), o;
}
function Xn(e, t, n) {
    let r = Qn(t, n);
    return (i = () => {}, { scope: o = {}, params: s = [] } = {}) => {
        (r.result = void 0), (r.finished = !1);
        let a = ee([o, ...e]);
        if (typeof r == "function") {
            let u = r(r, a).catch((c) => Y(c, n, t));
            r.finished
                ? (ue(i, r.result, a, s, n), (r.result = void 0))
                : u
                      .then((c) => {
                          ue(i, c, a, s, n);
                      })
                      .catch((c) => Y(c, n, t))
                      .finally(() => (r.result = void 0));
        }
    };
}
function ue(e, t, n, r, i) {
    if (se && typeof t == "function") {
        let o = t.apply(n, r);
        o instanceof Promise
            ? o.then((s) => ue(e, s, n, r)).catch((s) => Y(s, i, t))
            : e(o);
    } else
        typeof t == "object" && t instanceof Promise
            ? t.then((o) => e(o))
            : e(t);
}
var Ge = "x-";
function z(e = "") {
    return Ge + e;
}
function Zn(e) {
    Ge = e;
}
var Re = {};
function g(e, t) {
    return (
        (Re[e] = t),
        {
            before(n) {
                if (!Re[n]) {
                    console.warn(
                        "Cannot find directive `${directive}`. `${name}` will use the default order of execution"
                    );
                    return;
                }
                const r = $.indexOf(n);
                $.splice(r >= 0 ? r : $.indexOf("DEFAULT"), 0, e);
            },
        }
    );
}
function Ye(e, t, n) {
    if (((t = Array.from(t)), e._x_virtualDirectives)) {
        let o = Object.entries(e._x_virtualDirectives).map(([a, u]) => ({
                name: a,
                value: u,
            })),
            s = Pt(o);
        (o = o.map((a) =>
            s.find((u) => u.name === a.name)
                ? { name: `x-bind:${a.name}`, value: `"${a.value}"` }
                : a
        )),
            (t = t.concat(o));
    }
    let r = {};
    return t
        .map(Nt((o, s) => (r[o] = s)))
        .filter(Kt)
        .map(nr(r, n))
        .sort(rr)
        .map((o) => tr(e, o));
}
function Pt(e) {
    return Array.from(e)
        .map(Nt())
        .filter((t) => !Kt(t));
}
var je = !1,
    V = new Map(),
    $t = Symbol();
function er(e) {
    je = !0;
    let t = Symbol();
    ($t = t), V.set(t, []);
    let n = () => {
            for (; V.get(t).length; ) V.get(t).shift()();
            V.delete(t);
        },
        r = () => {
            (je = !1), n();
        };
    e(n), r();
}
function Rt(e) {
    let t = [],
        n = (a) => t.push(a),
        [r, i] = Kn(e);
    return (
        t.push(i),
        [
            {
                Alpine: ne,
                effect: r,
                cleanup: n,
                evaluateLater: m.bind(m, e),
                evaluate: F.bind(F, e),
            },
            () => t.forEach((a) => a()),
        ]
    );
}
function tr(e, t) {
    let n = () => {},
        r = Re[t.type] || n,
        [i, o] = Rt(e);
    Hn(e, t.original, o);
    let s = () => {
        e._x_ignore ||
            e._x_ignoreSelf ||
            (r.inline && r.inline(e, t, i),
            (r = r.bind(r, e, t, i)),
            je ? V.get($t).push(r) : r());
    };
    return (s.runCleanups = o), s;
}
var jt =
        (e, t) =>
        ({ name: n, value: r }) => (
            n.startsWith(e) && (n = n.replace(e, t)), { name: n, value: r }
        ),
    Lt = (e) => e;
function Nt(e = () => {}) {
    return ({ name: t, value: n }) => {
        let { name: r, value: i } = Ft.reduce((o, s) => s(o), {
            name: t,
            value: n,
        });
        return r !== t && e(r, t), { name: r, value: i };
    };
}
var Ft = [];
function Qe(e) {
    Ft.push(e);
}
function Kt({ name: e }) {
    return Dt().test(e);
}
var Dt = () => new RegExp(`^${Ge}([^:^.]+)\\b`);
function nr(e, t) {
    return ({ name: n, value: r }) => {
        let i = n.match(Dt()),
            o = n.match(/:([a-zA-Z0-9\-:]+)/),
            s = n.match(/\.[^.\]]+(?=[^\]]*$)/g) || [],
            a = t || e[n] || n;
        return {
            type: i ? i[1] : null,
            value: o ? o[1] : null,
            modifiers: s.map((u) => u.replace(".", "")),
            expression: r,
            original: a,
        };
    };
}
var Le = "DEFAULT",
    $ = [
        "ignore",
        "ref",
        "data",
        "id",
        "bind",
        "init",
        "for",
        "model",
        "modelable",
        "transition",
        "show",
        "if",
        Le,
        "teleport",
    ];
function rr(e, t) {
    let n = $.indexOf(e.type) === -1 ? Le : e.type,
        r = $.indexOf(t.type) === -1 ? Le : t.type;
    return $.indexOf(n) - $.indexOf(r);
}
function J(e, t, n = {}) {
    e.dispatchEvent(
        new CustomEvent(t, {
            detail: n,
            bubbles: !0,
            composed: !0,
            cancelable: !0,
        })
    );
}
function M(e, t) {
    if (typeof ShadowRoot == "function" && e instanceof ShadowRoot) {
        Array.from(e.children).forEach((i) => M(i, t));
        return;
    }
    let n = !1;
    if ((t(e, () => (n = !0)), n)) return;
    let r = e.firstElementChild;
    for (; r; ) M(r, t), (r = r.nextElementSibling);
}
function D(e, ...t) {
    console.warn(`Alpine Warning: ${e}`, ...t);
}
function ir() {
    document.body ||
        D(
            "Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"
        ),
        J(document, "alpine:init"),
        J(document, "alpine:initializing"),
        Ve(),
        Dn((t) => T(t, M)),
        wt((t) => Vt(t)),
        Bn((t, n) => {
            Ye(t, n).forEach((r) => r());
        });
    let e = (t) => !fe(t.parentElement, !0);
    Array.from(document.querySelectorAll(kt()))
        .filter(e)
        .forEach((t) => {
            T(t);
        }),
        J(document, "alpine:initialized");
}
var Xe = [],
    Bt = [];
function Ht() {
    return Xe.map((e) => e());
}
function kt() {
    return Xe.concat(Bt).map((e) => e());
}
function zt(e) {
    Xe.push(e);
}
function qt(e) {
    Bt.push(e);
}
function fe(e, t = !1) {
    return de(e, (n) => {
        if ((t ? kt() : Ht()).some((i) => n.matches(i))) return !0;
    });
}
function de(e, t) {
    if (e) {
        if (t(e)) return e;
        if ((e._x_teleportBack && (e = e._x_teleportBack), !!e.parentElement))
            return de(e.parentElement, t);
    }
}
function or(e) {
    return Ht().some((t) => e.matches(t));
}
var Wt = [];
function sr(e) {
    Wt.push(e);
}
function T(e, t = M, n = () => {}) {
    er(() => {
        t(e, (r, i) => {
            n(r, i),
                Wt.forEach((o) => o(r, i)),
                Ye(r, r.attributes).forEach((o) => o()),
                r._x_ignore && i();
        });
    });
}
function Vt(e) {
    M(e, (t) => Et(t));
}
var Ne = [],
    Ze = !1;
function et(e = () => {}) {
    return (
        queueMicrotask(() => {
            Ze ||
                setTimeout(() => {
                    Fe();
                });
        }),
        new Promise((t) => {
            Ne.push(() => {
                e(), t();
            });
        })
    );
}
function Fe() {
    for (Ze = !1; Ne.length; ) Ne.shift()();
}
function ar() {
    Ze = !0;
}
function tt(e, t) {
    return Array.isArray(t)
        ? ft(e, t.join(" "))
        : typeof t == "object" && t !== null
        ? ur(e, t)
        : typeof t == "function"
        ? tt(e, t())
        : ft(e, t);
}
function ft(e, t) {
    let n = (i) =>
            i
                .split(" ")
                .filter((o) => !e.classList.contains(o))
                .filter(Boolean),
        r = (i) => (
            e.classList.add(...i),
            () => {
                e.classList.remove(...i);
            }
        );
    return (t = t === !0 ? (t = "") : t || ""), r(n(t));
}
function ur(e, t) {
    let n = (a) => a.split(" ").filter(Boolean),
        r = Object.entries(t)
            .flatMap(([a, u]) => (u ? n(a) : !1))
            .filter(Boolean),
        i = Object.entries(t)
            .flatMap(([a, u]) => (u ? !1 : n(a)))
            .filter(Boolean),
        o = [],
        s = [];
    return (
        i.forEach((a) => {
            e.classList.contains(a) && (e.classList.remove(a), s.push(a));
        }),
        r.forEach((a) => {
            e.classList.contains(a) || (e.classList.add(a), o.push(a));
        }),
        () => {
            s.forEach((a) => e.classList.add(a)),
                o.forEach((a) => e.classList.remove(a));
        }
    );
}
function pe(e, t) {
    return typeof t == "object" && t !== null ? cr(e, t) : lr(e, t);
}
function cr(e, t) {
    let n = {};
    return (
        Object.entries(t).forEach(([r, i]) => {
            (n[r] = e.style[r]),
                r.startsWith("--") || (r = fr(r)),
                e.style.setProperty(r, i);
        }),
        setTimeout(() => {
            e.style.length === 0 && e.removeAttribute("style");
        }),
        () => {
            pe(e, n);
        }
    );
}
function lr(e, t) {
    let n = e.getAttribute("style", t);
    return (
        e.setAttribute("style", t),
        () => {
            e.setAttribute("style", n || "");
        }
    );
}
function fr(e) {
    return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function Ke(e, t = () => {}) {
    let n = !1;
    return function () {
        n ? t.apply(this, arguments) : ((n = !0), e.apply(this, arguments));
    };
}
g(
    "transition",
    (e, { value: t, modifiers: n, expression: r }, { evaluate: i }) => {
        typeof r == "function" && (r = i(r)), r ? dr(e, r, t) : pr(e, n, t);
    }
);
function dr(e, t, n) {
    Ut(e, tt, ""),
        {
            enter: (i) => {
                e._x_transition.enter.during = i;
            },
            "enter-start": (i) => {
                e._x_transition.enter.start = i;
            },
            "enter-end": (i) => {
                e._x_transition.enter.end = i;
            },
            leave: (i) => {
                e._x_transition.leave.during = i;
            },
            "leave-start": (i) => {
                e._x_transition.leave.start = i;
            },
            "leave-end": (i) => {
                e._x_transition.leave.end = i;
            },
        }[n](t);
}
function pr(e, t, n) {
    Ut(e, pe);
    let r = !t.includes("in") && !t.includes("out") && !n,
        i = r || t.includes("in") || ["enter"].includes(n),
        o = r || t.includes("out") || ["leave"].includes(n);
    t.includes("in") && !r && (t = t.filter((_, v) => v < t.indexOf("out"))),
        t.includes("out") &&
            !r &&
            (t = t.filter((_, v) => v > t.indexOf("out")));
    let s = !t.includes("opacity") && !t.includes("scale"),
        a = s || t.includes("opacity"),
        u = s || t.includes("scale"),
        c = a ? 0 : 1,
        l = u ? q(t, "scale", 95) / 100 : 1,
        p = q(t, "delay", 0),
        d = q(t, "origin", "center"),
        y = "opacity, transform",
        O = q(t, "duration", 150) / 1e3,
        re = q(t, "duration", 75) / 1e3,
        f = "cubic-bezier(0.4, 0.0, 0.2, 1)";
    i &&
        ((e._x_transition.enter.during = {
            transformOrigin: d,
            transitionDelay: p,
            transitionProperty: y,
            transitionDuration: `${O}s`,
            transitionTimingFunction: f,
        }),
        (e._x_transition.enter.start = {
            opacity: c,
            transform: `scale(${l})`,
        }),
        (e._x_transition.enter.end = { opacity: 1, transform: "scale(1)" })),
        o &&
            ((e._x_transition.leave.during = {
                transformOrigin: d,
                transitionDelay: p,
                transitionProperty: y,
                transitionDuration: `${re}s`,
                transitionTimingFunction: f,
            }),
            (e._x_transition.leave.start = {
                opacity: 1,
                transform: "scale(1)",
            }),
            (e._x_transition.leave.end = {
                opacity: c,
                transform: `scale(${l})`,
            }));
}
function Ut(e, t, n = {}) {
    e._x_transition ||
        (e._x_transition = {
            enter: { during: n, start: n, end: n },
            leave: { during: n, start: n, end: n },
            in(r = () => {}, i = () => {}) {
                De(
                    e,
                    t,
                    {
                        during: this.enter.during,
                        start: this.enter.start,
                        end: this.enter.end,
                    },
                    r,
                    i
                );
            },
            out(r = () => {}, i = () => {}) {
                De(
                    e,
                    t,
                    {
                        during: this.leave.during,
                        start: this.leave.start,
                        end: this.leave.end,
                    },
                    r,
                    i
                );
            },
        });
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function (
    e,
    t,
    n,
    r
) {
    const i =
        document.visibilityState === "visible"
            ? requestAnimationFrame
            : setTimeout;
    let o = () => i(n);
    if (t) {
        e._x_transition && (e._x_transition.enter || e._x_transition.leave)
            ? e._x_transition.enter &&
              (Object.entries(e._x_transition.enter.during).length ||
                  Object.entries(e._x_transition.enter.start).length ||
                  Object.entries(e._x_transition.enter.end).length)
                ? e._x_transition.in(n)
                : o()
            : e._x_transition
            ? e._x_transition.in(n)
            : o();
        return;
    }
    (e._x_hidePromise = e._x_transition
        ? new Promise((s, a) => {
              e._x_transition.out(
                  () => {},
                  () => s(r)
              ),
                  e._x_transitioning.beforeCancel(() =>
                      a({ isFromCancelledTransition: !0 })
                  );
          })
        : Promise.resolve(r)),
        queueMicrotask(() => {
            let s = Jt(e);
            s
                ? (s._x_hideChildren || (s._x_hideChildren = []),
                  s._x_hideChildren.push(e))
                : i(() => {
                      let a = (u) => {
                          let c = Promise.all([
                              u._x_hidePromise,
                              ...(u._x_hideChildren || []).map(a),
                          ]).then(([l]) => l());
                          return (
                              delete u._x_hidePromise,
                              delete u._x_hideChildren,
                              c
                          );
                      };
                      a(e).catch((u) => {
                          if (!u.isFromCancelledTransition) throw u;
                      });
                  });
        });
};
function Jt(e) {
    let t = e.parentNode;
    if (t) return t._x_hidePromise ? t : Jt(t);
}
function De(
    e,
    t,
    { during: n, start: r, end: i } = {},
    o = () => {},
    s = () => {}
) {
    if (
        (e._x_transitioning && e._x_transitioning.cancel(),
        Object.keys(n).length === 0 &&
            Object.keys(r).length === 0 &&
            Object.keys(i).length === 0)
    ) {
        o(), s();
        return;
    }
    let a, u, c;
    _r(e, {
        start() {
            a = t(e, r);
        },
        during() {
            u = t(e, n);
        },
        before: o,
        end() {
            a(), (c = t(e, i));
        },
        after: s,
        cleanup() {
            u(), c();
        },
    });
}
function _r(e, t) {
    let n,
        r,
        i,
        o = Ke(() => {
            x(() => {
                (n = !0),
                    r || t.before(),
                    i || (t.end(), Fe()),
                    t.after(),
                    e.isConnected && t.cleanup(),
                    delete e._x_transitioning;
            });
        });
    (e._x_transitioning = {
        beforeCancels: [],
        beforeCancel(s) {
            this.beforeCancels.push(s);
        },
        cancel: Ke(function () {
            for (; this.beforeCancels.length; ) this.beforeCancels.shift()();
            o();
        }),
        finish: o,
    }),
        x(() => {
            t.start(), t.during();
        }),
        ar(),
        requestAnimationFrame(() => {
            if (n) return;
            let s =
                    Number(
                        getComputedStyle(e)
                            .transitionDuration.replace(/,.*/, "")
                            .replace("s", "")
                    ) * 1e3,
                a =
                    Number(
                        getComputedStyle(e)
                            .transitionDelay.replace(/,.*/, "")
                            .replace("s", "")
                    ) * 1e3;
            s === 0 &&
                (s =
                    Number(
                        getComputedStyle(e).animationDuration.replace("s", "")
                    ) * 1e3),
                x(() => {
                    t.before();
                }),
                (r = !0),
                requestAnimationFrame(() => {
                    n ||
                        (x(() => {
                            t.end();
                        }),
                        Fe(),
                        setTimeout(e._x_transitioning.finish, s + a),
                        (i = !0));
                });
        });
}
function q(e, t, n) {
    if (e.indexOf(t) === -1) return n;
    const r = e[e.indexOf(t) + 1];
    if (!r || (t === "scale" && isNaN(r))) return n;
    if (t === "duration") {
        let i = r.match(/([0-9]+)ms/);
        if (i) return i[1];
    }
    return t === "origin" &&
        ["top", "right", "left", "center", "bottom"].includes(
            e[e.indexOf(t) + 2]
        )
        ? [r, e[e.indexOf(t) + 2]].join(" ")
        : r;
}
var Q = !1;
function te(e, t = () => {}) {
    return (...n) => (Q ? t(...n) : e(...n));
}
function hr(e) {
    return (...t) => Q && e(...t);
}
function gr(e, t) {
    t._x_dataStack || (t._x_dataStack = e._x_dataStack),
        (Q = !0),
        yr(() => {
            vr(t);
        }),
        (Q = !1);
}
function vr(e) {
    let t = !1;
    T(e, (r, i) => {
        M(r, (o, s) => {
            if (t && or(o)) return s();
            (t = !0), i(o, s);
        });
    });
}
function yr(e) {
    let t = k;
    ct((n, r) => {
        let i = t(n);
        return X(i), () => {};
    }),
        e(),
        ct(t);
}
function Gt(e, t, n, r = []) {
    switch (
        (e._x_bindings || (e._x_bindings = H({})),
        (e._x_bindings[t] = n),
        (t = r.includes("camel") ? Ar(t) : t),
        t)
    ) {
        case "value":
            xr(e, n);
            break;
        case "style":
            mr(e, n);
            break;
        case "class":
            br(e, n);
            break;
        default:
            wr(e, t, n);
            break;
    }
}
function xr(e, t) {
    if (e.type === "radio")
        e.attributes.value === void 0 && (e.value = t),
            window.fromModel && (e.checked = dt(e.value, t));
    else if (e.type === "checkbox")
        Number.isInteger(t)
            ? (e.value = t)
            : !Number.isInteger(t) &&
              !Array.isArray(t) &&
              typeof t != "boolean" &&
              ![null, void 0].includes(t)
            ? (e.value = String(t))
            : Array.isArray(t)
            ? (e.checked = t.some((n) => dt(n, e.value)))
            : (e.checked = !!t);
    else if (e.tagName === "SELECT") Sr(e, t);
    else {
        if (e.value === t) return;
        e.value = t;
    }
}
function br(e, t) {
    e._x_undoAddedClasses && e._x_undoAddedClasses(),
        (e._x_undoAddedClasses = tt(e, t));
}
function mr(e, t) {
    e._x_undoAddedStyles && e._x_undoAddedStyles(),
        (e._x_undoAddedStyles = pe(e, t));
}
function wr(e, t, n) {
    [null, void 0, !1].includes(n) && Or(t)
        ? e.removeAttribute(t)
        : (Yt(t) && (n = t), Er(e, t, n));
}
function Er(e, t, n) {
    e.getAttribute(t) != n && e.setAttribute(t, n);
}
function Sr(e, t) {
    const n = [].concat(t).map((r) => r + "");
    Array.from(e.options).forEach((r) => {
        r.selected = n.includes(r.value);
    });
}
function Ar(e) {
    return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
}
function dt(e, t) {
    return e == t;
}
function Yt(e) {
    return [
        "disabled",
        "checked",
        "required",
        "readonly",
        "hidden",
        "open",
        "selected",
        "autofocus",
        "itemscope",
        "multiple",
        "novalidate",
        "allowfullscreen",
        "allowpaymentrequest",
        "formnovalidate",
        "autoplay",
        "controls",
        "loop",
        "muted",
        "playsinline",
        "default",
        "ismap",
        "reversed",
        "async",
        "defer",
        "nomodule",
    ].includes(e);
}
function Or(e) {
    return ![
        "aria-pressed",
        "aria-checked",
        "aria-expanded",
        "aria-selected",
    ].includes(e);
}
function Cr(e, t, n) {
    if (e._x_bindings && e._x_bindings[t] !== void 0) return e._x_bindings[t];
    let r = e.getAttribute(t);
    return r === null
        ? typeof n == "function"
            ? n()
            : n
        : r === ""
        ? !0
        : Yt(t)
        ? !![t, "true"].includes(r)
        : r;
}
function Qt(e, t) {
    var n;
    return function () {
        var r = this,
            i = arguments,
            o = function () {
                (n = null), e.apply(r, i);
            };
        clearTimeout(n), (n = setTimeout(o, t));
    };
}
function Xt(e, t) {
    let n;
    return function () {
        let r = this,
            i = arguments;
        n || (e.apply(r, i), (n = !0), setTimeout(() => (n = !1), t));
    };
}
function Mr(e) {
    e(ne);
}
var P = {},
    pt = !1;
function Tr(e, t) {
    if ((pt || ((P = H(P)), (pt = !0)), t === void 0)) return P[e];
    (P[e] = t),
        typeof t == "object" &&
            t !== null &&
            t.hasOwnProperty("init") &&
            typeof t.init == "function" &&
            P[e].init(),
        Ot(P[e]);
}
function Ir() {
    return P;
}
var Zt = {};
function Pr(e, t) {
    let n = typeof t != "function" ? () => t : t;
    e instanceof Element ? en(e, n()) : (Zt[e] = n);
}
function $r(e) {
    return (
        Object.entries(Zt).forEach(([t, n]) => {
            Object.defineProperty(e, t, {
                get() {
                    return (...r) => n(...r);
                },
            });
        }),
        e
    );
}
function en(e, t, n) {
    let r = [];
    for (; r.length; ) r.pop()();
    let i = Object.entries(t).map(([s, a]) => ({ name: s, value: a })),
        o = Pt(i);
    (i = i.map((s) =>
        o.find((a) => a.name === s.name)
            ? { name: `x-bind:${s.name}`, value: `"${s.value}"` }
            : s
    )),
        Ye(e, i, n).map((s) => {
            r.push(s.runCleanups), s();
        });
}
var tn = {};
function Rr(e, t) {
    tn[e] = t;
}
function jr(e, t) {
    return (
        Object.entries(tn).forEach(([n, r]) => {
            Object.defineProperty(e, n, {
                get() {
                    return (...i) => r.bind(t)(...i);
                },
                enumerable: !1,
            });
        }),
        e
    );
}
var Lr = {
        get reactive() {
            return H;
        },
        get release() {
            return X;
        },
        get effect() {
            return k;
        },
        get raw() {
            return yt;
        },
        version: "3.12.0",
        flushAndStopDeferringMutations: Wn,
        dontAutoEvaluateFunctions: Jn,
        disableEffectScheduling: Nn,
        startObservingMutations: Ve,
        stopObservingMutations: St,
        setReactivityEngine: Fn,
        closestDataStack: K,
        skipDuringClone: te,
        onlyDuringClone: hr,
        addRootSelector: zt,
        addInitSelector: qt,
        addScopeToNode: Z,
        deferMutations: qn,
        mapAttributes: Qe,
        evaluateLater: m,
        interceptInit: sr,
        setEvaluator: Gn,
        mergeProxies: ee,
        findClosest: de,
        closestRoot: fe,
        destroyTree: Vt,
        interceptor: Ct,
        transition: De,
        setStyles: pe,
        mutateDom: x,
        directive: g,
        throttle: Xt,
        debounce: Qt,
        evaluate: F,
        initTree: T,
        nextTick: et,
        prefixed: z,
        prefix: Zn,
        plugin: Mr,
        magic: S,
        store: Tr,
        start: ir,
        clone: gr,
        bound: Cr,
        $data: At,
        walk: M,
        data: Rr,
        bind: Pr,
    },
    ne = Lr;
function Nr(e, t) {
    const n = Object.create(null),
        r = e.split(",");
    for (let i = 0; i < r.length; i++) n[r[i]] = !0;
    return t ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
}
var Fr = Object.freeze({}),
    nn = Object.assign,
    Kr = Object.prototype.hasOwnProperty,
    _e = (e, t) => Kr.call(e, t),
    j = Array.isArray,
    G = (e) => rn(e) === "[object Map]",
    Dr = (e) => typeof e == "string",
    nt = (e) => typeof e == "symbol",
    he = (e) => e !== null && typeof e == "object",
    Br = Object.prototype.toString,
    rn = (e) => Br.call(e),
    on = (e) => rn(e).slice(8, -1),
    rt = (e) =>
        Dr(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
    Hr = (e) => {
        const t = Object.create(null);
        return (n) => t[n] || (t[n] = e(n));
    },
    kr = Hr((e) => e.charAt(0).toUpperCase() + e.slice(1)),
    sn = (e, t) => e !== t && (e === e || t === t),
    Be = new WeakMap(),
    W = [],
    A,
    L = Symbol("iterate"),
    He = Symbol("Map key iterate");
function zr(e) {
    return e && e._isEffect === !0;
}
function qr(e, t = Fr) {
    zr(e) && (e = e.raw);
    const n = Ur(e, t);
    return t.lazy || n(), n;
}
function Wr(e) {
    e.active &&
        (an(e), e.options.onStop && e.options.onStop(), (e.active = !1));
}
var Vr = 0;
function Ur(e, t) {
    const n = function () {
        if (!n.active) return e();
        if (!W.includes(n)) {
            an(n);
            try {
                return Gr(), W.push(n), (A = n), e();
            } finally {
                W.pop(), un(), (A = W[W.length - 1]);
            }
        }
    };
    return (
        (n.id = Vr++),
        (n.allowRecurse = !!t.allowRecurse),
        (n._isEffect = !0),
        (n.active = !0),
        (n.raw = e),
        (n.deps = []),
        (n.options = t),
        n
    );
}
function an(e) {
    const { deps: t } = e;
    if (t.length) {
        for (let n = 0; n < t.length; n++) t[n].delete(e);
        t.length = 0;
    }
}
var B = !0,
    it = [];
function Jr() {
    it.push(B), (B = !1);
}
function Gr() {
    it.push(B), (B = !0);
}
function un() {
    const e = it.pop();
    B = e === void 0 ? !0 : e;
}
function E(e, t, n) {
    if (!B || A === void 0) return;
    let r = Be.get(e);
    r || Be.set(e, (r = new Map()));
    let i = r.get(n);
    i || r.set(n, (i = new Set())),
        i.has(A) ||
            (i.add(A),
            A.deps.push(i),
            A.options.onTrack &&
                A.options.onTrack({ effect: A, target: e, type: t, key: n }));
}
function I(e, t, n, r, i, o) {
    const s = Be.get(e);
    if (!s) return;
    const a = new Set(),
        u = (l) => {
            l &&
                l.forEach((p) => {
                    (p !== A || p.allowRecurse) && a.add(p);
                });
        };
    if (t === "clear") s.forEach(u);
    else if (n === "length" && j(e))
        s.forEach((l, p) => {
            (p === "length" || p >= r) && u(l);
        });
    else
        switch ((n !== void 0 && u(s.get(n)), t)) {
            case "add":
                j(e)
                    ? rt(n) && u(s.get("length"))
                    : (u(s.get(L)), G(e) && u(s.get(He)));
                break;
            case "delete":
                j(e) || (u(s.get(L)), G(e) && u(s.get(He)));
                break;
            case "set":
                G(e) && u(s.get(L));
                break;
        }
    const c = (l) => {
        l.options.onTrigger &&
            l.options.onTrigger({
                effect: l,
                target: e,
                key: n,
                type: t,
                newValue: r,
                oldValue: i,
                oldTarget: o,
            }),
            l.options.scheduler ? l.options.scheduler(l) : l();
    };
    a.forEach(c);
}
var Yr = Nr("__proto__,__v_isRef,__isVue"),
    cn = new Set(
        Object.getOwnPropertyNames(Symbol)
            .map((e) => Symbol[e])
            .filter(nt)
    ),
    Qr = ge(),
    Xr = ge(!1, !0),
    Zr = ge(!0),
    ei = ge(!0, !0),
    ce = {};
["includes", "indexOf", "lastIndexOf"].forEach((e) => {
    const t = Array.prototype[e];
    ce[e] = function (...n) {
        const r = h(this);
        for (let o = 0, s = this.length; o < s; o++) E(r, "get", o + "");
        const i = t.apply(r, n);
        return i === -1 || i === !1 ? t.apply(r, n.map(h)) : i;
    };
});
["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
    const t = Array.prototype[e];
    ce[e] = function (...n) {
        Jr();
        const r = t.apply(this, n);
        return un(), r;
    };
});
function ge(e = !1, t = !1) {
    return function (r, i, o) {
        if (i === "__v_isReactive") return !e;
        if (i === "__v_isReadonly") return e;
        if (i === "__v_raw" && o === (e ? (t ? li : Sn) : t ? ci : En).get(r))
            return r;
        const s = j(r);
        if (!e && s && _e(ce, i)) return Reflect.get(ce, i, o);
        const a = Reflect.get(r, i, o);
        return (nt(i) ? cn.has(i) : Yr(i)) || (e || E(r, "get", i), t)
            ? a
            : ke(a)
            ? !s || !rt(i)
                ? a.value
                : a
            : he(a)
            ? e
                ? An(a)
                : ut(a)
            : a;
    };
}
var ti = ln(),
    ni = ln(!0);
function ln(e = !1) {
    return function (n, r, i, o) {
        let s = n[r];
        if (!e && ((i = h(i)), (s = h(s)), !j(n) && ke(s) && !ke(i)))
            return (s.value = i), !0;
        const a = j(n) && rt(r) ? Number(r) < n.length : _e(n, r),
            u = Reflect.set(n, r, i, o);
        return (
            n === h(o) &&
                (a ? sn(i, s) && I(n, "set", r, i, s) : I(n, "add", r, i)),
            u
        );
    };
}
function ri(e, t) {
    const n = _e(e, t),
        r = e[t],
        i = Reflect.deleteProperty(e, t);
    return i && n && I(e, "delete", t, void 0, r), i;
}
function ii(e, t) {
    const n = Reflect.has(e, t);
    return (!nt(t) || !cn.has(t)) && E(e, "has", t), n;
}
function oi(e) {
    return E(e, "iterate", j(e) ? "length" : L), Reflect.ownKeys(e);
}
var fn = { get: Qr, set: ti, deleteProperty: ri, has: ii, ownKeys: oi },
    dn = {
        get: Zr,
        set(e, t) {
            return (
                console.warn(
                    `Set operation on key "${String(
                        t
                    )}" failed: target is readonly.`,
                    e
                ),
                !0
            );
        },
        deleteProperty(e, t) {
            return (
                console.warn(
                    `Delete operation on key "${String(
                        t
                    )}" failed: target is readonly.`,
                    e
                ),
                !0
            );
        },
    };
nn({}, fn, { get: Xr, set: ni });
nn({}, dn, { get: ei });
var ot = (e) => (he(e) ? ut(e) : e),
    st = (e) => (he(e) ? An(e) : e),
    at = (e) => e,
    ve = (e) => Reflect.getPrototypeOf(e);
function ye(e, t, n = !1, r = !1) {
    e = e.__v_raw;
    const i = h(e),
        o = h(t);
    t !== o && !n && E(i, "get", t), !n && E(i, "get", o);
    const { has: s } = ve(i),
        a = r ? at : n ? st : ot;
    if (s.call(i, t)) return a(e.get(t));
    if (s.call(i, o)) return a(e.get(o));
    e !== i && e.get(t);
}
function xe(e, t = !1) {
    const n = this.__v_raw,
        r = h(n),
        i = h(e);
    return (
        e !== i && !t && E(r, "has", e),
        !t && E(r, "has", i),
        e === i ? n.has(e) : n.has(e) || n.has(i)
    );
}
function be(e, t = !1) {
    return (
        (e = e.__v_raw), !t && E(h(e), "iterate", L), Reflect.get(e, "size", e)
    );
}
function pn(e) {
    e = h(e);
    const t = h(this);
    return ve(t).has.call(t, e) || (t.add(e), I(t, "add", e, e)), this;
}
function _n(e, t) {
    t = h(t);
    const n = h(this),
        { has: r, get: i } = ve(n);
    let o = r.call(n, e);
    o ? wn(n, r, e) : ((e = h(e)), (o = r.call(n, e)));
    const s = i.call(n, e);
    return (
        n.set(e, t),
        o ? sn(t, s) && I(n, "set", e, t, s) : I(n, "add", e, t),
        this
    );
}
function hn(e) {
    const t = h(this),
        { has: n, get: r } = ve(t);
    let i = n.call(t, e);
    i ? wn(t, n, e) : ((e = h(e)), (i = n.call(t, e)));
    const o = r ? r.call(t, e) : void 0,
        s = t.delete(e);
    return i && I(t, "delete", e, void 0, o), s;
}
function gn() {
    const e = h(this),
        t = e.size !== 0,
        n = G(e) ? new Map(e) : new Set(e),
        r = e.clear();
    return t && I(e, "clear", void 0, void 0, n), r;
}
function me(e, t) {
    return function (r, i) {
        const o = this,
            s = o.__v_raw,
            a = h(s),
            u = t ? at : e ? st : ot;
        return (
            !e && E(a, "iterate", L),
            s.forEach((c, l) => r.call(i, u(c), u(l), o))
        );
    };
}
function oe(e, t, n) {
    return function (...r) {
        const i = this.__v_raw,
            o = h(i),
            s = G(o),
            a = e === "entries" || (e === Symbol.iterator && s),
            u = e === "keys" && s,
            c = i[e](...r),
            l = n ? at : t ? st : ot;
        return (
            !t && E(o, "iterate", u ? He : L),
            {
                next() {
                    const { value: p, done: d } = c.next();
                    return d
                        ? { value: p, done: d }
                        : { value: a ? [l(p[0]), l(p[1])] : l(p), done: d };
                },
                [Symbol.iterator]() {
                    return this;
                },
            }
        );
    };
}
function C(e) {
    return function (...t) {
        {
            const n = t[0] ? `on key "${t[0]}" ` : "";
            console.warn(
                `${kr(e)} operation ${n}failed: target is readonly.`,
                h(this)
            );
        }
        return e === "delete" ? !1 : this;
    };
}
var vn = {
        get(e) {
            return ye(this, e);
        },
        get size() {
            return be(this);
        },
        has: xe,
        add: pn,
        set: _n,
        delete: hn,
        clear: gn,
        forEach: me(!1, !1),
    },
    yn = {
        get(e) {
            return ye(this, e, !1, !0);
        },
        get size() {
            return be(this);
        },
        has: xe,
        add: pn,
        set: _n,
        delete: hn,
        clear: gn,
        forEach: me(!1, !0),
    },
    xn = {
        get(e) {
            return ye(this, e, !0);
        },
        get size() {
            return be(this, !0);
        },
        has(e) {
            return xe.call(this, e, !0);
        },
        add: C("add"),
        set: C("set"),
        delete: C("delete"),
        clear: C("clear"),
        forEach: me(!0, !1),
    },
    bn = {
        get(e) {
            return ye(this, e, !0, !0);
        },
        get size() {
            return be(this, !0);
        },
        has(e) {
            return xe.call(this, e, !0);
        },
        add: C("add"),
        set: C("set"),
        delete: C("delete"),
        clear: C("clear"),
        forEach: me(!0, !0),
    },
    si = ["keys", "values", "entries", Symbol.iterator];
si.forEach((e) => {
    (vn[e] = oe(e, !1, !1)),
        (xn[e] = oe(e, !0, !1)),
        (yn[e] = oe(e, !1, !0)),
        (bn[e] = oe(e, !0, !0));
});
function mn(e, t) {
    const n = t ? (e ? bn : yn) : e ? xn : vn;
    return (r, i, o) =>
        i === "__v_isReactive"
            ? !e
            : i === "__v_isReadonly"
            ? e
            : i === "__v_raw"
            ? r
            : Reflect.get(_e(n, i) && i in r ? n : r, i, o);
}
var ai = { get: mn(!1, !1) },
    ui = { get: mn(!0, !1) };
function wn(e, t, n) {
    const r = h(n);
    if (r !== n && t.call(e, r)) {
        const i = on(e);
        console.warn(
            `Reactive ${i} contains both the raw and reactive versions of the same object${
                i === "Map" ? " as keys" : ""
            }, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
        );
    }
}
var En = new WeakMap(),
    ci = new WeakMap(),
    Sn = new WeakMap(),
    li = new WeakMap();
function fi(e) {
    switch (e) {
        case "Object":
        case "Array":
            return 1;
        case "Map":
        case "Set":
        case "WeakMap":
        case "WeakSet":
            return 2;
        default:
            return 0;
    }
}
function di(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : fi(on(e));
}
function ut(e) {
    return e && e.__v_isReadonly ? e : On(e, !1, fn, ai, En);
}
function An(e) {
    return On(e, !0, dn, ui, Sn);
}
function On(e, t, n, r, i) {
    if (!he(e))
        return console.warn(`value cannot be made reactive: ${String(e)}`), e;
    if (e.__v_raw && !(t && e.__v_isReactive)) return e;
    const o = i.get(e);
    if (o) return o;
    const s = di(e);
    if (s === 0) return e;
    const a = new Proxy(e, s === 2 ? r : n);
    return i.set(e, a), a;
}
function h(e) {
    return (e && h(e.__v_raw)) || e;
}
function ke(e) {
    return !!(e && e.__v_isRef === !0);
}
S("nextTick", () => et);
S("dispatch", (e) => J.bind(J, e));
S("watch", (e, { evaluateLater: t, effect: n }) => (r, i) => {
    let o = t(r),
        s = !0,
        a,
        u = n(() =>
            o((c) => {
                JSON.stringify(c),
                    s
                        ? (a = c)
                        : queueMicrotask(() => {
                              i(c, a), (a = c);
                          }),
                    (s = !1);
            })
        );
    e._x_effects.delete(u);
});
S("store", Ir);
S("data", (e) => At(e));
S("root", (e) => fe(e));
S(
    "refs",
    (e) => (e._x_refs_proxy || (e._x_refs_proxy = ee(pi(e))), e._x_refs_proxy)
);
function pi(e) {
    let t = [],
        n = e;
    for (; n; ) n._x_refs && t.push(n._x_refs), (n = n.parentNode);
    return t;
}
var Ae = {};
function Cn(e) {
    return Ae[e] || (Ae[e] = 0), ++Ae[e];
}
function _i(e, t) {
    return de(e, (n) => {
        if (n._x_ids && n._x_ids[t]) return !0;
    });
}
function hi(e, t) {
    e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = Cn(t));
}
S("id", (e) => (t, n = null) => {
    let r = _i(e, t),
        i = r ? r._x_ids[t] : Cn(t);
    return n ? `${t}-${i}-${n}` : `${t}-${i}`;
});
S("el", (e) => e);
Mn("Focus", "focus", "focus");
Mn("Persist", "persist", "persist");
function Mn(e, t, n) {
    S(t, (r) =>
        D(
            `You can't use [$${directiveName}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`,
            r
        )
    );
}
function gi({ get: e, set: t }, { get: n, set: r }) {
    let i = !0,
        o,
        s,
        a = k(() => {
            let u, c;
            i
                ? ((u = e()), r(u), (c = n()), (i = !1))
                : ((u = e()),
                  (c = n()),
                  (s = JSON.stringify(u)),
                  JSON.stringify(c),
                  s !== o ? ((c = n()), r(u), (c = u)) : (t(c), (u = c))),
                (o = JSON.stringify(u)),
                JSON.stringify(c);
        });
    return () => {
        X(a);
    };
}
g(
    "modelable",
    (e, { expression: t }, { effect: n, evaluateLater: r, cleanup: i }) => {
        let o = r(t),
            s = () => {
                let l;
                return o((p) => (l = p)), l;
            },
            a = r(`${t} = __placeholder`),
            u = (l) => a(() => {}, { scope: { __placeholder: l } }),
            c = s();
        u(c),
            queueMicrotask(() => {
                if (!e._x_model) return;
                e._x_removeModelListeners.default();
                let l = e._x_model.get,
                    p = e._x_model.set,
                    d = gi(
                        {
                            get() {
                                return l();
                            },
                            set(y) {
                                p(y);
                            },
                        },
                        {
                            get() {
                                return s();
                            },
                            set(y) {
                                u(y);
                            },
                        }
                    );
                i(d);
            });
    }
);
var vi = document.createElement("div");
g("teleport", (e, { modifiers: t, expression: n }, { cleanup: r }) => {
    e.tagName.toLowerCase() !== "template" &&
        D("x-teleport can only be used on a <template> tag", e);
    let i = te(
        () => document.querySelector(n),
        () => vi
    )();
    i || D(`Cannot find x-teleport element for selector: "${n}"`);
    let o = e.content.cloneNode(!0).firstElementChild;
    (e._x_teleport = o),
        (o._x_teleportBack = e),
        e._x_forwardEvents &&
            e._x_forwardEvents.forEach((s) => {
                o.addEventListener(s, (a) => {
                    a.stopPropagation(),
                        e.dispatchEvent(new a.constructor(a.type, a));
                });
            }),
        Z(o, {}, e),
        x(() => {
            t.includes("prepend")
                ? i.parentNode.insertBefore(o, i)
                : t.includes("append")
                ? i.parentNode.insertBefore(o, i.nextSibling)
                : i.appendChild(o),
                T(o),
                (o._x_ignore = !0);
        }),
        r(() => o.remove());
});
var Tn = () => {};
Tn.inline = (e, { modifiers: t }, { cleanup: n }) => {
    t.includes("self") ? (e._x_ignoreSelf = !0) : (e._x_ignore = !0),
        n(() => {
            t.includes("self") ? delete e._x_ignoreSelf : delete e._x_ignore;
        });
};
g("ignore", Tn);
g("effect", (e, { expression: t }, { effect: n }) => n(m(e, t)));
function ze(e, t, n, r) {
    let i = e,
        o = (u) => r(u),
        s = {},
        a = (u, c) => (l) => c(u, l);
    if (
        (n.includes("dot") && (t = yi(t)),
        n.includes("camel") && (t = xi(t)),
        n.includes("passive") && (s.passive = !0),
        n.includes("capture") && (s.capture = !0),
        n.includes("window") && (i = window),
        n.includes("document") && (i = document),
        n.includes("prevent") &&
            (o = a(o, (u, c) => {
                c.preventDefault(), u(c);
            })),
        n.includes("stop") &&
            (o = a(o, (u, c) => {
                c.stopPropagation(), u(c);
            })),
        n.includes("self") &&
            (o = a(o, (u, c) => {
                c.target === e && u(c);
            })),
        (n.includes("away") || n.includes("outside")) &&
            ((i = document),
            (o = a(o, (u, c) => {
                e.contains(c.target) ||
                    (c.target.isConnected !== !1 &&
                        ((e.offsetWidth < 1 && e.offsetHeight < 1) ||
                            (e._x_isShown !== !1 && u(c))));
            }))),
        n.includes("once") &&
            (o = a(o, (u, c) => {
                u(c), i.removeEventListener(t, o, s);
            })),
        (o = a(o, (u, c) => {
            (mi(t) && wi(c, n)) || u(c);
        })),
        n.includes("debounce"))
    ) {
        let u = n[n.indexOf("debounce") + 1] || "invalid-wait",
            c = le(u.split("ms")[0]) ? Number(u.split("ms")[0]) : 250;
        o = Qt(o, c);
    }
    if (n.includes("throttle")) {
        let u = n[n.indexOf("throttle") + 1] || "invalid-wait",
            c = le(u.split("ms")[0]) ? Number(u.split("ms")[0]) : 250;
        o = Xt(o, c);
    }
    return (
        i.addEventListener(t, o, s),
        () => {
            i.removeEventListener(t, o, s);
        }
    );
}
function yi(e) {
    return e.replace(/-/g, ".");
}
function xi(e) {
    return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
}
function le(e) {
    return !Array.isArray(e) && !isNaN(e);
}
function bi(e) {
    return [" ", "_"].includes(e)
        ? e
        : e
              .replace(/([a-z])([A-Z])/g, "$1-$2")
              .replace(/[_\s]/, "-")
              .toLowerCase();
}
function mi(e) {
    return ["keydown", "keyup"].includes(e);
}
function wi(e, t) {
    let n = t.filter(
        (o) =>
            ![
                "window",
                "document",
                "prevent",
                "stop",
                "once",
                "capture",
            ].includes(o)
    );
    if (n.includes("debounce")) {
        let o = n.indexOf("debounce");
        n.splice(o, le((n[o + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
    }
    if (n.includes("throttle")) {
        let o = n.indexOf("throttle");
        n.splice(o, le((n[o + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
    }
    if (n.length === 0 || (n.length === 1 && _t(e.key).includes(n[0])))
        return !1;
    const i = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter((o) =>
        n.includes(o)
    );
    return (
        (n = n.filter((o) => !i.includes(o))),
        !(
            i.length > 0 &&
            i.filter(
                (s) => (
                    (s === "cmd" || s === "super") && (s = "meta"), e[`${s}Key`]
                )
            ).length === i.length &&
            _t(e.key).includes(n[0])
        )
    );
}
function _t(e) {
    if (!e) return [];
    e = bi(e);
    let t = {
        ctrl: "control",
        slash: "/",
        space: " ",
        spacebar: " ",
        cmd: "meta",
        esc: "escape",
        up: "arrow-up",
        down: "arrow-down",
        left: "arrow-left",
        right: "arrow-right",
        period: ".",
        equal: "=",
        minus: "-",
        underscore: "_",
    };
    return (
        (t[e] = e),
        Object.keys(t)
            .map((n) => {
                if (t[n] === e) return n;
            })
            .filter((n) => n)
    );
}
g("model", (e, { modifiers: t, expression: n }, { effect: r, cleanup: i }) => {
    let o = e;
    t.includes("parent") && (o = e.parentNode);
    let s = m(o, n),
        a;
    typeof n == "string"
        ? (a = m(o, `${n} = __placeholder`))
        : typeof n == "function" && typeof n() == "string"
        ? (a = m(o, `${n()} = __placeholder`))
        : (a = () => {});
    let u = () => {
            let d;
            return s((y) => (d = y)), ht(d) ? d.get() : d;
        },
        c = (d) => {
            let y;
            s((O) => (y = O)),
                ht(y) ? y.set(d) : a(() => {}, { scope: { __placeholder: d } });
        };
    t.includes("fill") &&
        e.hasAttribute("value") &&
        (u() === null || u() === "") &&
        c(e.value),
        typeof n == "string" &&
            e.type === "radio" &&
            x(() => {
                e.hasAttribute("name") || e.setAttribute("name", n);
            });
    var l =
        e.tagName.toLowerCase() === "select" ||
        ["checkbox", "radio"].includes(e.type) ||
        t.includes("lazy")
            ? "change"
            : "input";
    let p = Q
        ? () => {}
        : ze(e, l, t, (d) => {
              c(Ei(e, t, d, u()));
          });
    if (
        (e._x_removeModelListeners || (e._x_removeModelListeners = {}),
        (e._x_removeModelListeners.default = p),
        i(() => e._x_removeModelListeners.default()),
        e.form)
    ) {
        let d = ze(e.form, "reset", [], (y) => {
            et(() => e._x_model && e._x_model.set(e.value));
        });
        i(() => d());
    }
    (e._x_model = {
        get() {
            return u();
        },
        set(d) {
            c(d);
        },
    }),
        (e._x_forceModelUpdate = (d) => {
            (d = d === void 0 ? u() : d),
                d === void 0 &&
                    typeof n == "string" &&
                    n.match(/\./) &&
                    (d = ""),
                (window.fromModel = !0),
                x(() => Gt(e, "value", d)),
                delete window.fromModel;
        }),
        r(() => {
            let d = u();
            (t.includes("unintrusive") &&
                document.activeElement.isSameNode(e)) ||
                e._x_forceModelUpdate(d);
        });
});
function Ei(e, t, n, r) {
    return x(() => {
        if (n instanceof CustomEvent && n.detail !== void 0)
            return typeof n.detail < "u" ? n.detail : n.target.value;
        if (e.type === "checkbox")
            if (Array.isArray(r)) {
                let i = t.includes("number")
                    ? Oe(n.target.value)
                    : n.target.value;
                return n.target.checked
                    ? r.concat([i])
                    : r.filter((o) => !Si(o, i));
            } else return n.target.checked;
        else {
            if (e.tagName.toLowerCase() === "select" && e.multiple)
                return t.includes("number")
                    ? Array.from(n.target.selectedOptions).map((i) => {
                          let o = i.value || i.text;
                          return Oe(o);
                      })
                    : Array.from(n.target.selectedOptions).map(
                          (i) => i.value || i.text
                      );
            {
                let i = n.target.value;
                return t.includes("number")
                    ? Oe(i)
                    : t.includes("trim")
                    ? i.trim()
                    : i;
            }
        }
    });
}
function Oe(e) {
    let t = e ? parseFloat(e) : null;
    return Ai(t) ? t : e;
}
function Si(e, t) {
    return e == t;
}
function Ai(e) {
    return !Array.isArray(e) && !isNaN(e);
}
function ht(e) {
    return (
        e !== null &&
        typeof e == "object" &&
        typeof e.get == "function" &&
        typeof e.set == "function"
    );
}
g("cloak", (e) => queueMicrotask(() => x(() => e.removeAttribute(z("cloak")))));
qt(() => `[${z("init")}]`);
g(
    "init",
    te((e, { expression: t }, { evaluate: n }) =>
        typeof t == "string" ? !!t.trim() && n(t, {}, !1) : n(t, {}, !1)
    )
);
g("text", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
    let i = r(t);
    n(() => {
        i((o) => {
            x(() => {
                e.textContent = o;
            });
        });
    });
});
g("html", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
    let i = r(t);
    n(() => {
        i((o) => {
            x(() => {
                (e.innerHTML = o),
                    (e._x_ignoreSelf = !0),
                    T(e),
                    delete e._x_ignoreSelf;
            });
        });
    });
});
Qe(jt(":", Lt(z("bind:"))));
g(
    "bind",
    (
        e,
        { value: t, modifiers: n, expression: r, original: i },
        { effect: o }
    ) => {
        if (!t) {
            let a = {};
            $r(a),
                m(e, r)(
                    (c) => {
                        en(e, c, i);
                    },
                    { scope: a }
                );
            return;
        }
        if (t === "key") return Oi(e, r);
        let s = m(e, r);
        o(() =>
            s((a) => {
                a === void 0 &&
                    typeof r == "string" &&
                    r.match(/\./) &&
                    (a = ""),
                    x(() => Gt(e, t, a, n));
            })
        );
    }
);
function Oi(e, t) {
    e._x_keyExpression = t;
}
zt(() => `[${z("data")}]`);
g(
    "data",
    te((e, { expression: t }, { cleanup: n }) => {
        t = t === "" ? "{}" : t;
        let r = {};
        $e(r, e);
        let i = {};
        jr(i, r);
        let o = F(e, t, { scope: i });
        (o === void 0 || o === !0) && (o = {}), $e(o, e);
        let s = H(o);
        Ot(s);
        let a = Z(e, s);
        s.init && F(e, s.init),
            n(() => {
                s.destroy && F(e, s.destroy), a();
            });
    })
);
g("show", (e, { modifiers: t, expression: n }, { effect: r }) => {
    let i = m(e, n);
    e._x_doHide ||
        (e._x_doHide = () => {
            x(() => {
                e.style.setProperty(
                    "display",
                    "none",
                    t.includes("important") ? "important" : void 0
                );
            });
        }),
        e._x_doShow ||
            (e._x_doShow = () => {
                x(() => {
                    e.style.length === 1 && e.style.display === "none"
                        ? e.removeAttribute("style")
                        : e.style.removeProperty("display");
                });
            });
    let o = () => {
            e._x_doHide(), (e._x_isShown = !1);
        },
        s = () => {
            e._x_doShow(), (e._x_isShown = !0);
        },
        a = () => setTimeout(s),
        u = Ke(
            (p) => (p ? s() : o()),
            (p) => {
                typeof e._x_toggleAndCascadeWithTransitions == "function"
                    ? e._x_toggleAndCascadeWithTransitions(e, p, s, o)
                    : p
                    ? a()
                    : o();
            }
        ),
        c,
        l = !0;
    r(() =>
        i((p) => {
            (!l && p === c) ||
                (t.includes("immediate") && (p ? a() : o()),
                u(p),
                (c = p),
                (l = !1));
        })
    );
});
g("for", (e, { expression: t }, { effect: n, cleanup: r }) => {
    let i = Mi(t),
        o = m(e, i.items),
        s = m(e, e._x_keyExpression || "index");
    (e._x_prevKeys = []),
        (e._x_lookup = {}),
        n(() => Ci(e, i, o, s)),
        r(() => {
            Object.values(e._x_lookup).forEach((a) => a.remove()),
                delete e._x_prevKeys,
                delete e._x_lookup;
        });
});
function Ci(e, t, n, r) {
    let i = (s) => typeof s == "object" && !Array.isArray(s),
        o = e;
    n((s) => {
        Ti(s) && s >= 0 && (s = Array.from(Array(s).keys(), (f) => f + 1)),
            s === void 0 && (s = []);
        let a = e._x_lookup,
            u = e._x_prevKeys,
            c = [],
            l = [];
        if (i(s))
            s = Object.entries(s).map(([f, _]) => {
                let v = gt(t, _, f, s);
                r((b) => l.push(b), { scope: { index: f, ...v } }), c.push(v);
            });
        else
            for (let f = 0; f < s.length; f++) {
                let _ = gt(t, s[f], f, s);
                r((v) => l.push(v), { scope: { index: f, ..._ } }), c.push(_);
            }
        let p = [],
            d = [],
            y = [],
            O = [];
        for (let f = 0; f < u.length; f++) {
            let _ = u[f];
            l.indexOf(_) === -1 && y.push(_);
        }
        u = u.filter((f) => !y.includes(f));
        let re = "template";
        for (let f = 0; f < l.length; f++) {
            let _ = l[f],
                v = u.indexOf(_);
            if (v === -1) u.splice(f, 0, _), p.push([re, f]);
            else if (v !== f) {
                let b = u.splice(f, 1)[0],
                    w = u.splice(v - 1, 1)[0];
                u.splice(f, 0, w), u.splice(v, 0, b), d.push([b, w]);
            } else O.push(_);
            re = _;
        }
        for (let f = 0; f < y.length; f++) {
            let _ = y[f];
            a[_]._x_effects && a[_]._x_effects.forEach(vt),
                a[_].remove(),
                (a[_] = null),
                delete a[_];
        }
        for (let f = 0; f < d.length; f++) {
            let [_, v] = d[f],
                b = a[_],
                w = a[v],
                N = document.createElement("div");
            x(() => {
                w.after(N),
                    b.after(w),
                    w._x_currentIfEl && w.after(w._x_currentIfEl),
                    N.before(b),
                    b._x_currentIfEl && b.after(b._x_currentIfEl),
                    N.remove();
            }),
                lt(w, c[l.indexOf(v)]);
        }
        for (let f = 0; f < p.length; f++) {
            let [_, v] = p[f],
                b = _ === "template" ? o : a[_];
            b._x_currentIfEl && (b = b._x_currentIfEl);
            let w = c[v],
                N = l[v],
                ie = document.importNode(o.content, !0).firstElementChild;
            Z(ie, H(w), o),
                x(() => {
                    b.after(ie), T(ie);
                }),
                typeof N == "object" &&
                    D(
                        "x-for key cannot be an object, it must be a string or an integer",
                        o
                    ),
                (a[N] = ie);
        }
        for (let f = 0; f < O.length; f++) lt(a[O[f]], c[l.indexOf(O[f])]);
        o._x_prevKeys = l;
    });
}
function Mi(e) {
    let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
        n = /^\s*\(|\)\s*$/g,
        r = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,
        i = e.match(r);
    if (!i) return;
    let o = {};
    o.items = i[2].trim();
    let s = i[1].replace(n, "").trim(),
        a = s.match(t);
    return (
        a
            ? ((o.item = s.replace(t, "").trim()),
              (o.index = a[1].trim()),
              a[2] && (o.collection = a[2].trim()))
            : (o.item = s),
        o
    );
}
function gt(e, t, n, r) {
    let i = {};
    return (
        /^\[.*\]$/.test(e.item) && Array.isArray(t)
            ? e.item
                  .replace("[", "")
                  .replace("]", "")
                  .split(",")
                  .map((s) => s.trim())
                  .forEach((s, a) => {
                      i[s] = t[a];
                  })
            : /^\{.*\}$/.test(e.item) &&
              !Array.isArray(t) &&
              typeof t == "object"
            ? e.item
                  .replace("{", "")
                  .replace("}", "")
                  .split(",")
                  .map((s) => s.trim())
                  .forEach((s) => {
                      i[s] = t[s];
                  })
            : (i[e.item] = t),
        e.index && (i[e.index] = n),
        e.collection && (i[e.collection] = r),
        i
    );
}
function Ti(e) {
    return !Array.isArray(e) && !isNaN(e);
}
function In() {}
In.inline = (e, { expression: t }, { cleanup: n }) => {
    let r = fe(e);
    r._x_refs || (r._x_refs = {}),
        (r._x_refs[t] = e),
        n(() => delete r._x_refs[t]);
};
g("ref", In);
g("if", (e, { expression: t }, { effect: n, cleanup: r }) => {
    let i = m(e, t),
        o = () => {
            if (e._x_currentIfEl) return e._x_currentIfEl;
            let a = e.content.cloneNode(!0).firstElementChild;
            return (
                Z(a, {}, e),
                x(() => {
                    e.after(a), T(a);
                }),
                (e._x_currentIfEl = a),
                (e._x_undoIf = () => {
                    M(a, (u) => {
                        u._x_effects && u._x_effects.forEach(vt);
                    }),
                        a.remove(),
                        delete e._x_currentIfEl;
                }),
                a
            );
        },
        s = () => {
            e._x_undoIf && (e._x_undoIf(), delete e._x_undoIf);
        };
    n(() =>
        i((a) => {
            a ? o() : s();
        })
    ),
        r(() => e._x_undoIf && e._x_undoIf());
});
g("id", (e, { expression: t }, { evaluate: n }) => {
    n(t).forEach((i) => hi(e, i));
});
Qe(jt("@", Lt(z("on:"))));
g(
    "on",
    te((e, { value: t, modifiers: n, expression: r }, { cleanup: i }) => {
        let o = r ? m(e, r) : () => {};
        e.tagName.toLowerCase() === "template" &&
            (e._x_forwardEvents || (e._x_forwardEvents = []),
            e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
        let s = ze(e, t, n, (a) => {
            o(() => {}, { scope: { $event: a }, params: [a] });
        });
        i(() => s());
    })
);
we("Collapse", "collapse", "collapse");
we("Intersect", "intersect", "intersect");
we("Focus", "trap", "focus");
we("Mask", "mask", "mask");
function we(e, t, n) {
    g(t, (r) =>
        D(
            `You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`,
            r
        )
    );
}
ne.setEvaluator(It);
ne.setReactivityEngine({ reactive: ut, effect: qr, release: Wr, raw: h });
var Ii = ne,
    Pn = Ii;
window.Alpine = Pn;
Pn.start();
