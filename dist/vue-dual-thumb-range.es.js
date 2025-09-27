import { ref as p, computed as v, watch as M, onBeforeUnmount as B, createElementBlock as C, openBlock as L, Fragment as N, createElementVNode as n, normalizeStyle as g, withModifiers as V, createTextVNode as k, withDirectives as D, vModelText as E } from "vue";
const S = { class: "d-t-r-inputs" }, U = ["min", "max"], j = ["min", "max"], F = {
  __name: "VueDualThumbRange",
  props: {
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    modelValue: {
      type: Object,
      default: () => ({ from: 10, to: 70 })
    },
    css: { type: String, default: "" }
  },
  emits: ["update:modelValue"],
  setup(m, { emit: z }) {
    const o = m, T = z, d = p(null), c = p(null), r = v(() => Math.min(o.min, o.max)), s = v(() => Math.max(o.min, o.max)), f = v(() => s.value - r.value), i = (t, e, u) => Math.min(Math.max(t, e), u), l = p(i(o.modelValue.from, r.value, s.value - 1)), a = p(i(o.modelValue.to, l.value + 1, s.value));
    M([l, a], () => {
      let t = i(l.value, r.value, s.value), e = i(a.value, r.value, s.value);
      e <= t && (e = t + 1, e > s.value && (e = s.value, t = e - 1)), t !== l.value && (l.value = t), e !== a.value && (a.value = e), (o.modelValue.from !== t || o.modelValue.to !== e) && T("update:modelValue", { from: t, to: e });
    }), M(() => o.modelValue, ({ from: t, to: e }) => {
      t !== l.value && (l.value = t), e !== a.value && (a.value = e);
    });
    const x = v(() => i((l.value - r.value) / f.value * 100, 0, 100)), h = v(() => i((a.value - r.value) / f.value * 100, 0, 100));
    function w(t) {
      if (!d.value || !c.value) return;
      const e = c.value.getBoundingClientRect(), u = t.clientX - e.left, R = i(u / e.width * 100, 0, 100), y = Math.round(r.value + R / 100 * f.value);
      d.value === "from" ? l.value = Math.min(y, a.value - 1) : d.value === "to" && (a.value = Math.max(y, l.value + 1));
    }
    function $() {
      document.addEventListener("mousemove", w), document.addEventListener("mouseup", b);
    }
    function b() {
      d.value = null, document.removeEventListener("mousemove", w), document.removeEventListener("mouseup", b);
    }
    return onMounted(() => {
      const t = document.createElement("style");
      t.textContent = o.css && o.css.trim().length > 0 ? o.css : `
        .d-t-r{position: relative;height: 30px;margin: 10px 0;}
        .d-t-r-to{position: absolute;top: 50%;transform: translate(-50%, -50%);height: 16px;width: 16px;background-color: #3b82f6;border-radius: 50%;cursor: grab;z-index: 3;border: 2px solid white;box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);}
        .d-t-r-progress{position: absolute;top: 50%;height: 4px;background-color: #3b82f6;transform: translateY(-50%);border-radius: 2px;z-index: 2;}
        .d-t-r-from{position: absolute;top: 50%;height: 4px;width: 100%;background-color: #ccc;transform: translateY(-50%);border-radius: 2px;z-index: 1;}
        .d-t-r-inputs{display: flex;justify-content: space-between;font-size: 13px;margin-top: 10px;}
        .d-t-r-input{width: 60px;margin-right: 5px;}
        `, document.head.appendChild(t);
    }), B(() => b()), (t, e) => (L(), C(N, null, [
      n("div", {
        class: "d-t-r",
        ref_key: "track",
        ref: c,
        onMousedown: $
      }, [
        e[4] || (e[4] = n("div", { class: "d-t-r-from" }, null, -1)),
        n("div", {
          class: "d-t-r-progress",
          style: g({ left: `${x.value}%`, width: `${h.value - x.value}%` })
        }, null, 4),
        n("div", {
          style: g({ left: `${x.value}%`, position: "absolute", top: "50%", transform: "translate(-50%, -50%)", height: "16px", width: "16px", backgroundColor: "#3b82f6", borderRadius: "50%", cursor: "grab", zIndex: 3, border: "2px solid white", boxShadow: "0 0 2px rgba(0, 0, 0, 0.4)" }),
          onMousedown: e[0] || (e[0] = V((u) => d.value = "from", ["prevent"]))
        }, null, 36),
        n("div", {
          class: "d-t-r-to",
          style: g({ left: `${h.value}%` }),
          onMousedown: e[1] || (e[1] = V((u) => d.value = "to", ["prevent"]))
        }, null, 36)
      ], 544),
      n("div", S, [
        n("label", null, [
          e[5] || (e[5] = k(" from: ")),
          D(n("input", {
            class: "d-t-r-input",
            type: "number",
            "onUpdate:modelValue": e[2] || (e[2] = (u) => l.value = u),
            min: m.min,
            max: a.value - 1
          }, null, 8, U), [
            [
              E,
              l.value,
              void 0,
              { number: !0 }
            ]
          ])
        ]),
        n("label", null, [
          e[6] || (e[6] = k(" to: ")),
          D(n("input", {
            class: "d-t-r-input",
            type: "number",
            "onUpdate:modelValue": e[3] || (e[3] = (u) => a.value = u),
            min: l.value + 1,
            max: m.max
          }, null, 8, j), [
            [
              E,
              a.value,
              void 0,
              { number: !0 }
            ]
          ])
        ])
      ])
    ], 64));
  }
}, Y = {
  install(m) {
    m.component("VueDualThumbRange", F);
  }
};
export {
  F as VueDualThumbRange,
  Y as default
};
