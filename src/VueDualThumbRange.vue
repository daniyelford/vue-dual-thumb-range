<template>
    <div class="d-t-r" ref="track" @mousedown="startDrag">
        <div class="d-t-r-from"></div>
        <div class="d-t-r-progress" :style="{left: `${startPercent}%`,width: `${endPercent - startPercent}%`}"></div>
        <div :style="{ left: `${startPercent}%`,position: 'absolute',top: '50%',transform: 'translate(-50%, -50%)',height: '16px',width: '16px',backgroundColor: '#3b82f6',borderRadius: '50%',cursor: 'grab',zIndex: 3,border: '2px solid white',boxShadow: '0 0 2px rgba(0, 0, 0, 0.4)'}"@mousedown.prevent="dragging = 'from'"></div>
        <div class="d-t-r-to" :style="{left: `${endPercent}%`}" @mousedown.prevent="dragging = 'to'"></div>
    </div>
    <div class="d-t-r-inputs">
        <label>
            from:
            <input class="d-t-r-input" type="number" v-model.number="internalFrom" :min="min" :max="internalTo - 1" />
        </label>
        <label>
            to:
            <input class="d-t-r-input" type="number" v-model.number="internalTo" :min="internalFrom + 1" :max="max" />
        </label>
    </div>
</template>
<script setup>
    import { ref, computed, watch, onBeforeUnmount } from 'vue'
    const props = defineProps({
        min: { type: Number, default: 0 },
        max: { type: Number, default: 100 },
        modelValue: {
            type: Object,
            default: () => ({ from: 10, to: 70 }),
        },
        css: { type: String, default: '' },
    })
    const emit = defineEmits(['update:modelValue'])
    const dragging = ref(null)
    const track = ref(null)
    const safeMin = computed(() => Math.min(props.min, props.max))
    const safeMax = computed(() => Math.max(props.min, props.max))
    const total = computed(() => safeMax.value - safeMin.value)
    const clamp = (val, min, max) => Math.min(Math.max(val, min), max)
    const internalFrom = ref(clamp(props.modelValue.from, safeMin.value, safeMax.value - 1))
    const internalTo = ref(clamp(props.modelValue.to, internalFrom.value + 1, safeMax.value))
    watch([internalFrom, internalTo], () => {
        let from = clamp(internalFrom.value, safeMin.value, safeMax.value)
        let to = clamp(internalTo.value, safeMin.value, safeMax.value)
        if (to <= from) {
            to = from + 1
            if (to > safeMax.value) {
                to = safeMax.value
                from = to - 1
            }
        }
        if (from !== internalFrom.value) internalFrom.value = from
        if (to !== internalTo.value) internalTo.value = to
        if (props.modelValue.from !== from || props.modelValue.to !== to) {
            emit('update:modelValue', { from, to })
        }
    })
    watch(() => props.modelValue,({ from, to }) => {
        if (from !== internalFrom.value) internalFrom.value = from
        if (to !== internalTo.value) internalTo.value = to
    })
    const startPercent = computed(() => clamp(((internalFrom.value - safeMin.value) / total.value) * 100, 0, 100))
    const endPercent = computed(() => clamp(((internalTo.value - safeMin.value) / total.value) * 100, 0, 100))
    function onDrag(e) {
        if (!dragging.value || !track.value) return
        const rect = track.value.getBoundingClientRect()
        const x = e.clientX - rect.left
        const percent = clamp((x / rect.width) * 100, 0, 100)
        const value = Math.round(safeMin.value + (percent / 100) * total.value)
        if (dragging.value === 'from') {
            internalFrom.value = Math.min(value, internalTo.value - 1)
        } else if (dragging.value === 'to') {
            internalTo.value = Math.max(value, internalFrom.value + 1)
        }
    }
    function startDrag() {
        document.addEventListener('mousemove', onDrag)
        document.addEventListener('mouseup', stopDrag)
    }
    function stopDrag() {
        dragging.value = null
        document.removeEventListener('mousemove', onDrag)
        document.removeEventListener('mouseup', stopDrag)
    }
    onMounted(() => {
        const style = document.createElement('style');
        style.textContent = props.css && props.css.trim().length > 0 ? props.css : `
        .d-t-r{position: relative;height: 30px;margin: 10px 0;}
        .d-t-r-to{position: absolute;top: 50%;transform: translate(-50%, -50%);height: 16px;width: 16px;background-color: #3b82f6;border-radius: 50%;cursor: grab;z-index: 3;border: 2px solid white;box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);}
        .d-t-r-progress{position: absolute;top: 50%;height: 4px;background-color: #3b82f6;transform: translateY(-50%);border-radius: 2px;z-index: 2;}
        .d-t-r-from{position: absolute;top: 50%;height: 4px;width: 100%;background-color: #ccc;transform: translateY(-50%);border-radius: 2px;z-index: 1;}
        .d-t-r-inputs{display: flex;justify-content: space-between;font-size: 13px;margin-top: 10px;}
        .d-t-r-input{width: 60px;margin-right: 5px;}
        `;
        document.head.appendChild(style);
    })
    onBeforeUnmount(() => stopDrag())
</script>
