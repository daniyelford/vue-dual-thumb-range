# 🔵 Vue Range Slider

A minimal **dual-thumb range slider** component for **Vue 3**, with no external dependencies.

---

![Vue Range Demo](https://github.com/daniyelford/vue-range/blob/main/2.PNG)


## 📦 Installation

```bash

npm install vue-range-dual

```

## 🚀 Usage

1. Register component

```js

import { createApp } from 'vue'
import App from './App.vue'
import VueRangeDual from 'vue-range-dual'
const app = createApp(App)
app.component('VueRangeDual', VueRangeDual)

```

ℹ️ CommonJS issue?
If you're using a CommonJS environment, use this instead:

```js

import VueRangeDual from 'vue-range-dual'
app.use(VueRange.default)

```
2. Use in template

```vue

<template>
  <VueRangeDual v-model="range" :min="0" :max="100" />
</template>

<script setup>
    import { ref } from 'vue'
    const range = ref({ from: 10, to: 70 })
</script>

```

---

## ⚙️ Props

| Prop         | Type   | Default                | Description              |
|--------------|--------|------------------------|--------------------------|
| `min`        | Number | `0`                    | Minimum slider value     |
| `max`        | Number | `100`                  | Maximum slider value     |
| `modelValue` | Object | `{ from: 20, to: 80 }` | Selected range object    |


### 📤 Emits

| Event              | Payload                     | Description                   |
|:-------------------:|:---------------------------:|:------------------------------:|
| `update:modelValue` | `{ from: Number, to: Number }` | Fired when the range changes   |

### 🧪 Example Output

IF:
```js

 range = { from: 10, to: 70 }

```

you’ll get a visual slider with two thumbs between 10% and 70%.

---

#### 🧾 License

MIT


#### Built with ❤️ by [Dnylfrd](mailto:29danialfrd69@gmail.com).