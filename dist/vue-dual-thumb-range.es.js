import { ref as i, watch as M, computed as x, onBeforeUnmount as h, createElementBlock as B, openBlock as L, Fragment as N, createElementVNode as o, normalizeStyle as V, withModifiers as w, createTextVNode as D, withDirectives as k, vModelText as E } from "vue";
const R = (a, r) => {
  const t = a.__vccOpts || a;
  for (const [v, l] of r)
    t[v] = l;
  return t;
}, U = { class: "inputs" }, F = ["min", "max"], O = ["min", "max"], P = {
  __name: "VueDualThumbRange",
  props: {
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    modelValue: {
      type: Object,
      default: () => ({ from: 20, to: 80 })
    }
  },
  emits: ["update:modelValue"],
  setup(a, { emit: r }) {
    const t = a, v = r, l = i(t.modelValue.from), n = i(t.modelValue.to), s = i(null), d = i(null);
    M([l, n], ([u, e]) => {
      if (e <= u) {
        n.value = u + 1;
        return;
      }
      (t.modelValue.from !== u || t.modelValue.to !== e) && v("update:modelValue", { from: u, to: e });
    }), M(
      () => t.modelValue,
      ({ from: u, to: e }) => {
        u !== l.value && (l.value = u), e !== n.value && (n.value = e);
      }
    );
    const c = x(() => t.max - t.min), f = x(
      () => (l.value - t.min) / c.value * 100
    ), b = x(
      () => (n.value - t.min) / c.value * 100
    );
    function g(u) {
      if (!s.value || !d.value) return;
      const e = d.value.getBoundingClientRect(), m = u.clientX - e.left, $ = Math.min(Math.max(0, m / e.width * 100), 100), y = Math.round(t.min + $ / 100 * c.value);
      s.value === "from" ? l.value = Math.min(y, n.value - 1) : s.value === "to" && (n.value = Math.max(y, l.value + 1));
    }
    function T() {
      document.addEventListener("mousemove", g), document.addEventListener("mouseup", p);
    }
    function p() {
      s.value = null, document.removeEventListener("mousemove", g), document.removeEventListener("mouseup", p);
    }
    return h(() => p()), (u, e) => (L(), B(N, null, [
      o("div", {
        class: "custom-slider",
        ref_key: "track",
        ref: d,
        onMousedown: T
      }, [
        e[4] || (e[4] = o("div", { class: "slider-line" }, null, -1)),
        o("div", {
          class: "slider-range",
          style: V({ left: `${f.value}%`, width: `${b.value - f.value}%` })
        }, null, 4),
        o("div", {
          class: "thumb",
          style: V({ left: `${f.value}%` }),
          onMousedown: e[0] || (e[0] = w((m) => s.value = "from", ["prevent"]))
        }, null, 36),
        o("div", {
          class: "thumb",
          style: V({ left: `${b.value}%` }),
          onMousedown: e[1] || (e[1] = w((m) => s.value = "to", ["prevent"]))
        }, null, 36)
      ], 544),
      o("div", U, [
        o("label", null, [
          e[5] || (e[5] = D(" from: ")),
          k(o("input", {
            type: "number",
            "onUpdate:modelValue": e[2] || (e[2] = (m) => l.value = m),
            min: a.min,
            max: n.value - 1
          }, null, 8, F), [
            [
              E,
              l.value,
              void 0,
              { number: !0 }
            ]
          ])
        ]),
        o("label", null, [
          e[6] || (e[6] = D(" to: ")),
          k(o("input", {
            type: "number",
            "onUpdate:modelValue": e[3] || (e[3] = (m) => n.value = m),
            min: l.value + 1,
            max: a.max
          }, null, 8, O), [
            [
              E,
              n.value,
              void 0,
              { number: !0 }
            ]
          ])
        ])
      ])
    ], 64));
  }
}, j = /* @__PURE__ */ R(P, [["__scopeId", "data-v-e7f4e12f"]]), C = {
  install(a) {
    a.component("VueDualThumbRange", j);
  }
};
export {
  j as VueDualThumbRange,
  C as default
};
