const e = new Set(),
  t = new WeakMap(),
  n = new WeakMap(),
  o = new WeakMap(),
  i = new WeakMap(),
  r = new WeakMap(),
  a = new WeakMap(),
  s = new WeakMap(),
  d = new WeakSet();
let c;
const l = "__aa_tgt",
  f = "__aa_del",
  u = (e) => {
    const r = (function (e) {
      const t = e.reduce(
        (e, t) => [
          ...e,
          ...Array.from(t.addedNodes),
          ...Array.from(t.removedNodes),
        ],
        []
      );
      return (
        !t.every((e) => "#comment" === e.nodeName) &&
        e.reduce((e, t) => {
          if (!1 === e) return !1;
          if (t.target instanceof Element) {
            if ((w(t.target), !e.has(t.target))) {
              e.add(t.target);
              for (let n = 0; n < t.target.children.length; n++) {
                const o = t.target.children.item(n);
                if (o) {
                  if (f in o) return !1;
                  w(t.target, o), e.add(o);
                }
              }
            }
            if (t.removedNodes.length)
              for (let o = 0; o < t.removedNodes.length; o++) {
                const i = t.removedNodes[o];
                if (f in i) return !1;
                i instanceof Element &&
                  (e.add(i),
                  w(t.target, i),
                  n.set(i, [t.previousSibling, t.nextSibling]));
              }
          }
          return e;
        }, new Set())
      );
    })(e);
    r &&
      r.forEach((e) =>
        (function (e) {
          var r;
          const a = e.isConnected,
            s = t.has(e);
          a && n.has(e) && n.delete(e);
          o.has(e) && (null === (r = o.get(e)) || void 0 === r || r.cancel());
          s && a
            ? (function (e) {
                const n = t.get(e),
                  i = M(e);
                if (!N(e)) return t.set(e, i);
                let r;
                if (!n) return;
                const a = x(e);
                if ("function" != typeof a) {
                  const t = n.left - i.left,
                    o = n.top - i.top,
                    [s, d, c, l] = E(e, n, i),
                    f = { transform: `translate(${t}px, ${o}px)` },
                    u = { transform: "translate(0, 0)" };
                  s !== d && ((f.width = `${s}px`), (u.width = `${d}px`)),
                    c !== l && ((f.height = `${c}px`), (u.height = `${l}px`)),
                    (r = e.animate([f, u], {
                      duration: a.duration,
                      easing: a.easing,
                    }));
                } else (r = new Animation(a(e, "remain", n, i))), r.play();
                o.set(e, r),
                  t.set(e, i),
                  r.addEventListener("finish", h.bind(null, e));
              })(e)
            : s && !a
            ? (function (e) {
                var r;
                if (!n.has(e) || !t.has(e)) return;
                const [a, s] = n.get(e);
                Object.defineProperty(e, f, { value: !0 }),
                  s && s.parentNode && s.parentNode instanceof Element
                    ? s.parentNode.insertBefore(e, s)
                    : a && a.parentNode
                    ? a.parentNode.appendChild(e)
                    : null === (r = W(e)) || void 0 === r || r.appendChild(e);
                function d() {
                  var r;
                  e.remove(),
                    t.delete(e),
                    n.delete(e),
                    o.delete(e),
                    null === (r = i.get(e)) || void 0 === r || r.disconnect();
                }
                if (!N(e)) return d();
                const [c, l, u, p] = (function (e) {
                    const n = t.get(e),
                      [o, , i] = E(e, n, M(e));
                    let r = e.parentElement;
                    for (
                      ;
                      r &&
                      ("static" === getComputedStyle(r).position ||
                        r instanceof HTMLBodyElement);

                    )
                      r = r.parentElement;
                    r || (r = document.body);
                    const a = getComputedStyle(r),
                      s = t.get(r) || M(r),
                      d = Math.round(n.top - s.top) - y(a.borderTopWidth),
                      c = Math.round(n.left - s.left) - y(a.borderLeftWidth);
                    return [d, c, o, i];
                  })(e),
                  h = x(e),
                  g = t.get(e);
                let m;
                Object.assign(e.style, {
                  position: "absolute",
                  top: `${c}px`,
                  left: `${l}px`,
                  width: `${u}px`,
                  height: `${p}px`,
                  margin: 0,
                  pointerEvents: "none",
                  transformOrigin: "center",
                  zIndex: 100,
                }),
                  "function" != typeof h
                    ? (m = e.animate(
                        [
                          { transform: "scale(1)", opacity: 1 },
                          { transform: "scale(.98)", opacity: 0 },
                        ],
                        { duration: h.duration, easing: "ease-out" }
                      ))
                    : ((m = new Animation(h(e, "remove", g))), m.play());
                o.set(e, m), m.addEventListener("finish", d);
              })(e)
            : (function (e) {
                const n = M(e);
                t.set(e, n);
                const i = x(e);
                if (!N(e)) return;
                let r;
                "function" != typeof i
                  ? (r = e.animate(
                      [
                        { transform: "scale(.98)", opacity: 0 },
                        { transform: "scale(0.98)", opacity: 0, offset: 0.5 },
                        { transform: "scale(1)", opacity: 1 },
                      ],
                      { duration: 1.5 * i.duration, easing: "ease-in" }
                    ))
                  : ((r = new Animation(i(e, "add", n))), r.play());
                o.set(e, r), r.addEventListener("finish", h.bind(null, e));
              })(e);
        })(e)
      );
  },
  p = (n) => {
    n.forEach((n) => {
      n.target === c &&
        (clearTimeout(s.get(c)),
        s.set(
          c,
          setTimeout(() => {
            e.forEach((e) => k(e, (e) => m(() => h(e))));
          }, 100)
        )),
        t.has(n.target) && h(n.target);
    });
  };
function h(e) {
  clearTimeout(s.get(e));
  const n = x(e),
    r = "function" == typeof n ? 500 : n.duration;
  s.set(
    e,
    setTimeout(async () => {
      const n = o.get(e);
      try {
        await (null == n ? void 0 : n.finished),
          t.set(e, M(e)),
          (function (e) {
            const n = i.get(e);
            null == n || n.disconnect();
            let o = t.get(e),
              r = 0;
            o || ((o = M(e)), t.set(e, o));
            const { offsetWidth: a, offsetHeight: s } = c,
              d = [
                o.top - 5,
                a - (o.left + 5 + o.width),
                s - (o.top + 5 + o.height),
                o.left - 5,
              ]
                .map((e) => -1 * Math.floor(e) + "px")
                .join(" "),
              l = new IntersectionObserver(
                () => {
                  ++r > 1 && h(e);
                },
                { root: c, threshold: 1, rootMargin: d }
              );
            l.observe(e), i.set(e, l);
          })(e);
      } catch {}
    }, r)
  );
}
function g(e) {
  setTimeout(() => {
    r.set(
      e,
      setInterval(() => m(h.bind(null, e)), 2e3)
    );
  }, Math.round(2e3 * Math.random()));
}
function m(e) {
  "function" == typeof requestIdleCallback
    ? requestIdleCallback(() => e())
    : requestAnimationFrame(() => e());
}
let b, v;
function w(e, t) {
  t || l in e
    ? t && !(l in t) && Object.defineProperty(t, l, { value: e })
    : Object.defineProperty(e, l, { value: e });
}
function y(e) {
  return Number(e.replace(/[^0-9.\-]/g, ""));
}
function M(e) {
  const t = e.getBoundingClientRect();
  return {
    top: t.top + window.scrollY,
    left: t.left + window.scrollX,
    width: t.width,
    height: t.height,
  };
}
function E(e, t, n) {
  let o = t.width,
    i = t.height,
    r = n.width,
    a = n.height;
  const s = getComputedStyle(e);
  if ("content-box" === s.getPropertyValue("box-sizing")) {
    const e =
        y(s.paddingTop) +
        y(s.paddingBottom) +
        y(s.borderTopWidth) +
        y(s.borderBottomWidth),
      t =
        y(s.paddingLeft) +
        y(s.paddingRight) +
        y(s.borderRightWidth) +
        y(s.borderLeftWidth);
    (o -= t), (r -= t), (i -= e), (a -= e);
  }
  return [o, r, i, a].map(Math.round);
}
function x(e) {
  return l in e && a.has(e[l])
    ? a.get(e[l])
    : { duration: 250, easing: "ease-in-out" };
}
function W(e) {
  if (l in e) return e[l];
}
function N(e) {
  const t = W(e);
  return !!t && d.has(t);
}
function k(e, ...t) {
  t.forEach((t) => t(e, a.has(e)));
  for (let n = 0; n < e.children.length; n++) {
    const o = e.children.item(n);
    o && t.forEach((e) => e(o, a.has(o)));
  }
}
function C(t, n = {}) {
  if (b && v) {
    (window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      "function" != typeof n &&
      !n.disrespectUserMotionPreference) ||
      (d.add(t),
      "static" === getComputedStyle(t).position &&
        Object.assign(t.style, { position: "relative" }),
      k(t, h, g, (e) => (null == v ? void 0 : v.observe(e))),
      "function" == typeof n
        ? a.set(t, n)
        : a.set(t, { duration: 250, easing: "ease-in-out", ...n }),
      b.observe(t, { childList: !0 }),
      e.add(t));
  }
  return Object.freeze({
    parent: t,
    enable: () => {
      d.add(t);
    },
    disable: () => {
      d.delete(t);
    },
    isEnabled: () => d.has(t),
  });
}
"undefined" != typeof window &&
  ((c = document.documentElement),
  (b = new MutationObserver(u)),
  (v = new ResizeObserver(p)),
  v.observe(c));
const O = {
  mounted: (e, t) => {
    C(e, t.value || {});
  },
};
export { C as default, E as getTransitionSizes, O as vAutoAnimate };
