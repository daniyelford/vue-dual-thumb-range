# 🔵 Vue Range Slider

A minimal **dual-thumb range slider** component for **Vue 3**, with no external dependencies.

---

![Vue Range Demo](https://github.com/daniyelford/vue-dual-thumb-range/blob/main/2.PNG)


## 📦 Installation

```bash

npm install vue-dual-thumb-range

```

## 🚀 Usage

1. Register component

```js

import { createApp } from 'vue'
import App from './App.vue'
import VueDualThumbRange from 'vue-dual-thumb-range'
const app = createApp(App)
app.component('VueDualThumbRange', VueDualThumbRange)

```

ℹ️ CommonJS issue?
If you're using a CommonJS environment, use this instead:

```js

import VueDualThumbRange from 'vue-range-dual'
app.use(VueDualThumbRange.default)

```

or in easy use setup script

```js
import { VueDualThumbRange } from 'vue-dual-thumb-range'

```

2. Use in template

```vue

<template>
  <VueDualThumbRange v-model="range" :min="0" :max="100" :css="customCss"/>
</template>

<script setup>
    import { ref } from 'vue'
    import { VueDualThumbRange } from 'vue-dual-thumb-range'
    const range = ref({ from: 10, to: 70 })
    const customCss = `
    .d-t-r-progress { background-color: #f87171; }
    .d-t-r-to, .d-t-r-from { background-color: #34d399; }
    `
</script>

```

---

## ⚙️ Props

| Prop         | Type   | Default                | Description                                    |
|--------------|--------|------------------------|--------------------------                      |
| `min`        | Number | `0`                    | Minimum slider value                           |
| `max`        | Number | `100`                  | Maximum slider value                           |
| `modelValue` | Object | `{ from: 20, to: 80 }` | Selected range object                          |
| `css`        | String | `''`                   | Optional custom CSS to override default styles |


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

#### Css styles
#### Css styles
These are the default CSS class names used by the slider.  
They are always applied, but you can fully override them using the `css` prop.

+ d-t-r
+ d-t-r-from
+ d-t-r-progress
+ d-t-r-to
+ d-t-r-inputs
+ d-t-r-input

by default:
```css
.d-t-r{position: relative;height: 30px;margin: 10px 0;}
.d-t-r-to{position: absolute;top: 50%;transform: translate(-50%, -50%);height: 16px;width: 16px;background-color: #3b82f6;border-radius: 50%;cursor: grab;z-index: 3;border: 2px solid white;box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);}
.d-t-r-progress{position: absolute;top: 50%;height: 4px;background-color: #3b82f6;transform: translateY(-50%);border-radius: 2px;z-index: 2;}
.d-t-r-from{position: absolute;top: 50%;height: 4px;width: 100%;background-color: #ccc;transform: translateY(-50%);border-radius: 2px;z-index: 1;}
.d-t-r-inputs{display: flex;justify-content: space-between;font-size: 13px;margin-top: 10px;}
.d-t-r-input{width: 60px;margin-right: 5px;}
```

#### 🧾 License

MIT


#### Built with ❤️ by [Dnylfrd](mailto:29danialfrd69@gmail.com).