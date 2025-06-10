<template>
  <div class="custom-slider" ref="track" @mousedown="startDrag">
    <div class="slider-line"></div>
    <div
      class="slider-range"
      :style="{ left: `${startPercent}%`, width: `${endPercent - startPercent}%` }"
    ></div>
    <div
      class="thumb"
      :style="{ left: `${startPercent}%` }"
      @mousedown.prevent="dragging = 'from'"
    ></div>
    <div
      class="thumb"
      :style="{ left: `${endPercent}%` }"
      @mousedown.prevent="dragging = 'to'"
    ></div>
  </div>

  <div class="inputs">
    <label>
      from:
      <input
        type="number"
        v-model.number="internalFrom"
        :min="min"
        :max="internalTo - 1"
      />
    </label>
    <label>
      to:
      <input
        type="number"
        v-model.number="internalTo"
        :min="internalFrom + 1"
        :max="max"
      />
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
        if (
            props.modelValue.from !== from ||
            props.modelValue.to !== to
        ) {
            emit('update:modelValue', { from, to })
        }
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

<style scoped>
    .custom-slider {
        position: relative;
        height: 30px;
        margin: 10px 0;
    }
    .slider-line {
        position: absolute;
        top: 50%;
        height: 4px;
        width: 100%;
        background-color: #ccc;
        transform: translateY(-50%);
        border-radius: 2px;
        z-index: 1;
    }
    .slider-range {
        position: absolute;
        top: 50%;
        height: 4px;
        background-color: #3b82f6;
        transform: translateY(-50%);
        border-radius: 2px;
        z-index: 2;
    }
    .thumb {
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        height: 16px;
        width: 16px;
        background-color: #3b82f6;
        border-radius: 50%;
        cursor: grab;
        z-index: 3;
        border: 2px solid white;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
    }
    .inputs {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
        margin-top: 10px;
    }
    .inputs input {
        width: 60px;
        margin-right: 5px;
    }
</style>