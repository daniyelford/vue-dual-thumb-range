import { ref as i, watch as M, computed as x, onBeforeUnmount as D, createElementBlock as L, openBlock as N, Fragment as R, createElementVNode as o, normalizeStyle as g, withModifiers as w, createTextVNode as k, withDirectives as E, vModelText as $ } from "vue";
const T = (a, r) => {
  const t = a.__vccOpts || a;
  for (const [v, n] of r)
    t[v] = n;
  return t;
}, U = { class: "inputs" }, h = ["min", "max"], F = ["min", "max"], O = {
  __name: "CustomRange",
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
    const t = a, v = r, n = i(t.modelValue.from), l = i(t.modelValue.to), s = i(null), d = i(null);
    M([n, l], ([u, e]) => {
      if (e <= u) {
        l.value = u + 1;
        return;
      }
      (t.modelValue.from !== u || t.modelValue.to !== e) && v("update:modelValue", { from: u, to: e });
    }), M(
      () => t.modelValue,
      ({ from: u, to: e }) => {
        u !== n.value && (n.value = u), e !== l.value && (l.value = e);
      }
    );
    const c = x(() => t.max - t.min), f = x(
      () => (n.value - t.min) / c.value * 100
    ), b = x(
      () => (l.value - t.min) / c.value * 100
    );
    function V(u) {
      if (!s.value || !d.value) return;
      const e = d.value.getBoundingClientRect(), m = u.clientX - e.left, C = Math.min(Math.max(0, m / e.width * 100), 100), y = Math.round(t.min + C / 100 * c.value);
      s.value === "from" ? n.value = Math.min(y, l.value - 1) : s.value === "to" && (l.value = Math.max(y, n.value + 1));
    }
    function B() {
      document.addEventListener("mousemove", V), document.addEventListener("mouseup", p);
    }
    function p() {
      s.value = null, document.removeEventListener("mousemove", V), document.removeEventListener("mouseup", p);
    }
    return D(() => p()), (u, e) => (N(), L(R, null, [
      o("div", {
        class: "custom-slider",
        ref_key: "track",
        ref: d,
        onMousedown: B
      }, [
        e[4] || (e[4] = o("div", { class: "slider-line" }, null, -1)),
        o("div", {
          class: "slider-range",
          style: g({ left: `${f.value}%`, width: `${b.value - f.value}%` })
        }, null, 4),
        o("div", {
          class: "thumb",
          style: g({ left: `${f.value}%` }),
          onMousedown: e[0] || (e[0] = w((m) => s.value = "from", ["prevent"]))
        }, null, 36),
        o("div", {
          class: "thumb",
          style: g({ left: `${b.value}%` }),
          onMousedown: e[1] || (e[1] = w((m) => s.value = "to", ["prevent"]))
        }, null, 36)
      ], 544),
      o("div", U, [
        o("label", null, [
          e[5] || (e[5] = k(" from: ")),
          E(o("input", {
            type: "number",
            "onUpdate:modelValue": e[2] || (e[2] = (m) => n.value = m),
            min: a.min,
            max: l.value - 1
          }, null, 8, h), [
            [
              $,
              n.value,
              void 0,
              { number: !0 }
            ]
          ])
        ]),
        o("label", null, [
          e[6] || (e[6] = k(" to: ")),
          E(o("input", {
            type: "number",
            "onUpdate:modelValue": e[3] || (e[3] = (m) => l.value = m),
            min: n.value + 1,
            max: a.max
          }, null, 8, F), [
            [
              $,
              l.value,
              void 0,
              { number: !0 }
            ]
          ])
        ])
      ])
    ], 64));
  }
}, P = /* @__PURE__ */ T(O, [["__scopeId", "data-v-452afabc"]]), z = {
  install(a) {
    a.component("CustomRange", P);
  }
};
export {
  P as CustomRange,
  z as default
};
