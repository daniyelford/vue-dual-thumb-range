import { ref as s, watch as h, computed as x, onBeforeUnmount as E, createElementBlock as T, openBlock as $, Fragment as B, createElementVNode as l, normalizeStyle as f, withModifiers as w, createTextVNode as y, withDirectives as V, vModelText as M } from "vue";
const C = { style: { display: "flex", "justify-content": "space-between", "font-size": "13px", "margin-top": "10px" } }, L = ["min", "max"], N = ["min", "max"], I = {
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
  setup(i, { emit: k }) {
    const t = i, D = k, a = s(t.modelValue.from), n = s(t.modelValue.to), r = s(null), d = s(null);
    h([a, n], ([o, e]) => {
      if (e <= o) {
        n.value = o + 1;
        return;
      }
      (t.modelValue.from !== o || t.modelValue.to !== e) && D("update:modelValue", { from: o, to: e });
    }), h(
      () => t.modelValue,
      ({ from: o, to: e }) => {
        o !== a.value && (a.value = o), e !== n.value && (n.value = e);
      }
    );
    const m = x(() => t.max - t.min), v = x(
      () => (a.value - t.min) / m.value * 100
    ), b = x(
      () => (n.value - t.min) / m.value * 100
    );
    function c(o) {
      if (!r.value || !d.value) return;
      const e = d.value.getBoundingClientRect(), u = o.clientX - e.left, z = Math.min(Math.max(0, u / e.width * 100), 100), g = Math.round(t.min + z / 100 * m.value);
      r.value === "from" ? a.value = Math.min(g, n.value - 1) : r.value === "to" && (n.value = Math.max(g, a.value + 1));
    }
    function R() {
      document.addEventListener("mousemove", c), document.addEventListener("mouseup", p);
    }
    function p() {
      r.value = null, document.removeEventListener("mousemove", c), document.removeEventListener("mouseup", p);
    }
    return E(() => p()), (o, e) => ($(), T(B, null, [
      l("div", {
        style: { position: "relative", height: "30px", margin: "10px 0" },
        ref_key: "track",
        ref: d,
        onMousedown: R
      }, [
        e[4] || (e[4] = l("div", { style: { position: "absolute", top: "50%", height: "4px", width: "100%", "background-color": "#ccc", transform: "translateY(-50%)", "border-radius": "2px", "z-index": "1" } }, null, -1)),
        l("div", {
          style: f({ left: `${v.value}%`, width: `${b.value - v.value}%`, position: "absolute", top: "50%", height: "4px", backgroundColor: "#3b82f6", transform: "translateY(-50%)", borderRadius: "2px", zIndex: 2 })
        }, null, 4),
        l("div", {
          style: f({ left: `${v.value}%`, position: "absolute", top: "50%", transform: "translate(-50%, -50%)", height: "16px", width: "16px", backgroundColor: "#3b82f6", borderRadius: "50%", cursor: "grab", zIndex: 3, border: "2px solid white", boxShadow: "0 0 2px rgba(0, 0, 0, 0.4)" }),
          onMousedown: e[0] || (e[0] = w((u) => r.value = "from", ["prevent"]))
        }, null, 36),
        l("div", {
          style: f({ left: `${b.value}%`, position: "absolute", top: "50%", transform: "translate(-50%, -50%)", height: "16px", width: "16px", backgroundColor: "#3b82f6", borderRadius: "50%", cursor: "grab", zIndex: 3, border: "2px solid white", boxShadow: "0 0 2px rgba(0, 0, 0, 0.4)" }),
          onMousedown: e[1] || (e[1] = w((u) => r.value = "to", ["prevent"]))
        }, null, 36)
      ], 544),
      l("div", C, [
        l("label", null, [
          e[5] || (e[5] = y(" from: ")),
          V(l("input", {
            style: { width: "60px", "margin-right": "5px" },
            type: "number",
            "onUpdate:modelValue": e[2] || (e[2] = (u) => a.value = u),
            min: i.min,
            max: n.value - 1
          }, null, 8, L), [
            [
              M,
              a.value,
              void 0,
              { number: !0 }
            ]
          ])
        ]),
        l("label", null, [
          e[6] || (e[6] = y(" to: ")),
          V(l("input", {
            style: { width: "60px", "margin-right": "5px" },
            type: "number",
            "onUpdate:modelValue": e[3] || (e[3] = (u) => n.value = u),
            min: a.value + 1,
            max: i.max
          }, null, 8, N), [
            [
              M,
              n.value,
              void 0,
              { number: !0 }
            ]
          ])
        ])
      ])
    ], 64));
  }
}, U = {
  install(i) {
    i.component("VueDualThumbRange", I);
  }
};
export {
  I as VueDualThumbRange,
  U as default
};
