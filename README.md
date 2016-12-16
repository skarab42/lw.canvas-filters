# lw.canvas-filters
SVG path for [LaserWeb/CNCWeb](https://github.com/LaserWeb/LaserWeb4).

## Installation
Using NPM
```
npm install lw.canvas-filters
```

Using GIT
```
git clone https://github.com/lautr3k/lw.canvas-filters.git
cd canvas-filters
npm install
```

Or download the last build from https://raw.githubusercontent.com/lautr3k/lw.canvas-filters/master/dist/lw.canvas-filters.js
```html
<script src="./lw.canvas-filters.js"></script>
<script>
  var path = CanvasFilter.canvasFilter();
</script>
```

## Settings
```javascript
let settings = {
    smoothing   : false,  // Smoothing [true|fale]
    brightness  : 0,      // Image brightness [-255 to +255]
    contrast    : 0,      // Image contrast [-255 to +255]
    gamma       : 0,      // Image gamma correction [0.01 to 7.99]
    grayscale   : 'none', // Graysale algorithm [average, luma, luma-601, luma-709, luma-240, desaturation, decomposition-[min|max], [red|green|blue]-chanel]
    shadesOfGray: 256     // Number of shades of gray [2-256]
}
```

## Usages
```javascript
import canvasFilter from 'canvas-filters'

canvasFilter(canvas, settings)
```
