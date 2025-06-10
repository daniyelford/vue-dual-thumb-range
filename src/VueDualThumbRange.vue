<template>
    <div style="position: relative;height: 30px;margin: 10px 0;" ref="track" @mousedown="startDrag">
        <div style="position: absolute;top: 50%;height: 4px;width: 100%;background-color: #ccc;transform: translateY(-50%);border-radius: 2px;z-index: 1;"></div>
        <div :style="{left: `${startPercent}%`,width: `${endPercent - startPercent}%`,position: 'absolute',top: '50%',height: '4px',backgroundColor: '#3b82f6',transform: 'translateY(-50%)',borderRadius: '2px',zIndex: 2}"></div>
        <div :style="{ left: `${startPercent}%`,position: 'absolute',top: '50%',transform: 'translate(-50%, -50%)',height: '16px',width: '16px',backgroundColor: '#3b82f6',borderRadius: '50%',cursor: 'grab',zIndex: 3,border: '2px solid white',boxShadow: '0 0 2px rgba(0, 0, 0, 0.4)'}"@mousedown.prevent="dragging = 'from'"></div>
        <div :style="{left: `${endPercent}%`,position: 'absolute',top: '50%',transform: 'translate(-50%, -50%)',height: '16px',width: '16px',backgroundColor: '#3b82f6',borderRadius: '50%',cursor: 'grab',zIndex: 3,border: '2px solid white',boxShadow: '0 0 2px rgba(0, 0, 0, 0.4)'}" @mousedown.prevent="dragging = 'to'"></div>
    </div>
    <div style="display: flex;justify-content: space-between;font-size: 13px;margin-top: 10px;">
        <label>
            from:
            <input style="width: 60px;margin-right: 5px;" type="number" v-model.number="internalFrom" :min="min" :max="internalTo - 1" />
        </label>
        <label>
            to:
            <input style="width: 60px;margin-right: 5px;" type="number" v-model.number="internalTo" :min="internalFrom + 1" :max="max" />
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
            default: () => ({ from: 20, to: 80 }),
        },
    })
    const emit = defineEmits(['update:modelValue'])
    const internalFrom = ref(props.modelValue.from)
    const internalTo = ref(props.modelValue.to)
    const dragging = ref(null)
    const track = ref(null)
    watch([internalFrom, internalTo], ([from, to]) => {
        if (to <= from) {
            internalTo.value = from + 1
            return
        }
        if (props.modelValue.from !== from || props.modelValue.to !== to) emit('update:modelValue', { from, to })
    })
    watch(
        () => props.modelValue,
        ({ from, to }) => {
            if (from !== internalFrom.value) internalFrom.value = from
            if (to !== internalTo.value) internalTo.value = to
        }
    )
    const total = computed(() => props.max - props.min)
    const startPercent = computed(
        () => ((internalFrom.value - props.min) / total.value) * 100
    )
    const endPercent = computed(
        () => ((internalTo.value - props.min) / total.value) * 100
    )
    function onDrag(e) {
        if (!dragging.value || !track.value) return
        const rect = track.value.getBoundingClientRect()
        const x = e.clientX - rect.left
        const percent = Math.min(Math.max(0, (x / rect.width) * 100), 100)
        const value = Math.round(props.min + (percent / 100) * total.value)
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
    onBeforeUnmount(() => stopDrag())
</script>