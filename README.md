# 🔵 Vue Range Slider

A minimal **dual-thumb range slider** component for **Vue 3**, with no external dependencies.

---



# 📦 Installation

```bash

npm install vue-range

```

## 🚀 Usage

1. Register component
js

```bash

import { createApp } from 'vue'
import App from './App.vue'
import RangeSlider from 'vue-range'
const app = createApp(App)
app.component('RangeSlider', RangeSlider)

```
2. Use in template
vue

```bash

<template>
  <RangeSlider v-model="range" :min="0" :max="100" />
</template>

<script setup>
    import { ref } from 'vue'
    const range = ref({ from: 10, to: 70 })
</script>

```

### ⚙️ Props

Prop	Type	Default	Description
min	Number	0	Minimum slider value
max	Number	100	Maximum slider value
modelValue	Object	{ from: 20, to: 80 }	Selected range object

#### 📤 Emits

Event	Payload	Description
update:modelValue	{ from: Number, to: Number }	Triggered when range changes

##### 🧪 Example Output

If range = { from: 10, to: 70 }, you’ll get a visual slider with two thumbs between 10% and 70%.

###### 🧾 License

MIT

###### Built with ❤️ by Dnylfrd.