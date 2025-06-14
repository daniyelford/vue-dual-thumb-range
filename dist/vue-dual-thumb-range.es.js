import { ref as p, computed as v, watch as V, onBeforeUnmount as B, createElementBlock as C, openBlock as L, Fragment as N, createElementVNode as o, normalizeStyle as g, withModifiers as M, createTextVNode as k, withDirectives as D, vModelText as R } from "vue";
const I = { style: { display: "flex", "justify-content": "space-between", "font-size": "13px", "margin-top": "10px" } }, S = ["min", "max"], U = ["min", "max"], j = {
  __name: "VueDualThumbRange",
  props: {
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    modelValue: {
      type: Object,
      default: () => ({ from: 10, to: 70 })
    }
  },
  emits: ["update:modelValue"],
  setup(d, { emit: z }) {
    const n = d, E = z, m = p(null), f = p(null), r = v(() => Math.min(n.min, n.max)), i = v(() => Math.max(n.min, n.max)), x = v(() => i.value - r.value), s = (t, e, u) => Math.min(Math.max(t, e), u), l = p(s(n.modelValue.from, r.value, i.value - 1)), a = p(s(n.modelValue.to, l.value + 1, i.value));
    V([l, a], () => {
      let t = s(l.value, r.value, i.value), e = s(a.value, r.value, i.value);
      e <= t && (e = t + 1, e > i.value && (e = i.value, t = e - 1)), t !== l.value && (l.value = t), e !== a.value && (a.value = e), (n.modelValue.from !== t || n.modelValue.to !== e) && E("update:modelValue", { from: t, to: e });
    }), V(() => n.modelValue, ({ from: t, to: e }) => {
      t !== l.value && (l.value = t), e !== a.value && (a.value = e);
    });
    const b = v(() => s((l.value - r.value) / x.value * 100, 0, 100)), h = v(() => s((a.value - r.value) / x.value * 100, 0, 100));
    function w(t) {
      if (!m.value || !f.value) return;
      const e = f.value.getBoundingClientRect(), u = t.clientX - e.left, $ = s(u / e.width * 100, 0, 100), y = Math.round(r.value + $ / 100 * x.value);
      m.value === "from" ? l.value = Math.min(y, a.value - 1) : m.value === "to" && (a.value = Math.max(y, l.value + 1));
    }
    function T() {
      document.addEventListener("mousemove", w), document.addEventListener("mouseup", c);
    }
    function c() {
      m.value = null, document.removeEventListener("mousemove", w), document.removeEventListener("mouseup", c);
    }
    return B(() => c()), (t, e) => (L(), C(N, null, [
      o("div", {
        style: { position: "relative", height: "30px", margin: "10px 0" },
        ref_key: "track",
        ref: f,
        onMousedown: T
      }, [
        e[4] || (e[4] = o("div", { style: { position: "absolute", top: "50%", height: "4px", width: "100%", "background-color": "#ccc", transform: "translateY(-50%)", "border-radius": "2px", "z-index": "1" } }, null, -1)),
        o("div", {
          style: g({ left: `${b.value}%`, width: `${h.value - b.value}%`, position: "absolute", top: "50%", height: "4px", backgroundColor: "#3b82f6", transform: "translateY(-50%)", borderRadius: "2px", zIndex: 2 })
        }, null, 4),
        o("div", {
          style: g({ left: `${b.value}%`, position: "absolute", top: "50%", transform: "translate(-50%, -50%)", height: "16px", width: "16px", backgroundColor: "#3b82f6", borderRadius: "50%", cursor: "grab", zIndex: 3, border: "2px solid white", boxShadow: "0 0 2px rgba(0, 0, 0, 0.4)" }),
          onMousedown: e[0] || (e[0] = M((u) => m.value = "from", ["prevent"]))
        }, null, 36),
        o("div", {
          style: g({ left: `${h.value}%`, position: "absolute", top: "50%", transform: "translate(-50%, -50%)", height: "16px", width: "16px", backgroundColor: "#3b82f6", borderRadius: "50%", cursor: "grab", zIndex: 3, border: "2px solid white", boxShadow: "0 0 2px rgba(0, 0, 0, 0.4)" }),
          onMousedown: e[1] || (e[1] = M((u) => m.value = "to", ["prevent"]))
        }, null, 36)
      ], 544),
      o("div", I, [
        o("label", null, [
          e[5] || (e[5] = k(" from: ")),
          D(o("input", {
            style: { width: "60px", "margin-right": "5px" },
            type: "number",
            "onUpdate:modelValue": e[2] || (e[2] = (u) => l.value = u),
            min: d.min,
            max: a.value - 1
          }, null, 8, S), [
            [
              R,
              l.value,
              void 0,
              { number: !0 }
            ]
          ])
        ]),
        o("label", null, [
          e[6] || (e[6] = k(" to: ")),
          D(o("input", {
            style: { width: "60px", "margin-right": "5px" },
            type: "number",
            "onUpdate:modelValue": e[3] || (e[3] = (u) => a.value = u),
            min: l.value + 1,
            max: d.max
          }, null, 8, U), [
            [
              R,
              a.value,
              void 0,
              { number: !0 }
            ]
          ])
        ])
      ])
    ], 64));
  }
}, P = {
  install(d) {
    d.component("VueDualThumbRange", j);
  }
};
export {
  j as VueDualThumbRange,
  P as default
};
