(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("CanvasFilter", [], factory);
	else if(typeof exports === 'object')
		exports["CanvasFilter"] = factory();
	else
		root["CanvasFilter"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// Grayscale algorithms
	var grayscaleAlgorithms = ['none', 'average', 'desaturation', 'decomposition-min', 'decomposition-max', 'luma', 'luma-601', 'luma-709', 'luma-240', 'red-chanel', 'green-chanel', 'blue-chanel'];
	
	// Trucate color value in the 0-255 range
	function color(color) {
	    return color < 0 ? 0 : color > 255 ? 255 : color;
	}
	
	// Filters ...
	function brightness(data, i, value) {
	    if (value !== undefined) {
	        data[i] = color(data[i] + value);
	        data[i + 1] = color(data[i + 1] + value);
	        data[i + 2] = color(data[i + 2] + value);
	    }
	}
	
	function contrast(data, i, value) {
	    if (value !== undefined) {
	        data[i] = color(value * (data[i] - 128) + 128);
	        data[i + 1] = color(value * (data[i + 1] - 128) + 128);
	        data[i + 2] = color(value * (data[i + 2] - 128) + 128);
	    }
	}
	
	function gamma(data, i, value) {
	    if (value !== undefined) {
	        data[i] = color(Math.exp(Math.log(255 * (data[i] / 255)) * value));
	        data[i + 1] = color(Math.exp(Math.log(255 * (data[i + 1] / 255)) * value));
	        data[i + 2] = color(Math.exp(Math.log(255 * (data[i + 2] / 255)) * value));
	    }
	}
	
	function grayscale(data, i, algorithm, shades) {
	    // Graysale
	    // http://www.tannerhelland.com/3643/grayscale-image-algorithm-vb6/
	
	    // Unsupported algorithm
	    if (grayscaleAlgorithms.indexOf(algorithm) === -1) {
	        throw new Error('Unsupported grayscale algorithm: ' + algorithm);
	    }
	
	    // None
	    if (algorithm === 'none') {
	        return null;
	    }
	
	    // Get Red/Green/Blue values
	    var gray = void 0;
	    var r = data[i];
	    var g = data[i + 1];
	    var b = data[i + 2];
	
	    switch (algorithm) {
	        case 'average':
	            gray = (r + g + b) / 3;
	            break;
	
	        case 'luma':
	            // Default
	            gray = r * 0.3 + g * 0.59 + b * 0.11;
	            break;
	
	        case 'luma-601':
	            // CCIR-601
	            gray = r * 0.299 + g * 0.587 + b * 0.114;
	            break;
	
	        case 'luma-709':
	            // ITU-R-709
	            gray = r * 0.2126 + g * 0.7152 + b * 0.0722;
	            break;
	
	        case 'luma-240':
	            // SMPTE-240M
	            gray = r * 0.212 + g * 0.701 + b * 0.087;
	            break;
	
	        case 'desaturation':
	            gray = (Math.max(r, g, b) + Math.min(r, g, b)) / 2;
	            break;
	
	        case 'decomposition-min':
	            gray = Math.min(r, g, b);
	            break;
	
	        case 'decomposition-max':
	            gray = Math.max(r, g, b);
	            break;
	
	        case 'red-chanel':
	            gray = r;
	            break;
	
	        case 'green-chanel':
	            gray = g;
	            break;
	
	        case 'blue-chanel':
	            gray = b;
	            break;
	    }
	
	    // Shades of gray
	    if (shades !== undefined) {
	        gray = parseInt(gray / shades) * shades;
	    }
	
	    // Force integer
	    gray = parseInt(gray);
	
	    // Set new r/g/b values
	    data[i] = color(gray);
	    data[i + 1] = color(gray);
	    data[i + 2] = color(gray);
	}
	
	// Apply filters on provided canvas
	function canvasFilters(canvas, settings) {
	    settings = Object.assign({}, {
	        smoothing: false, // Smoothing [true|fale]
	        brightness: 0, // Image brightness [-255 to +255]
	        contrast: 0, // Image contrast [-255 to +255]
	        gamma: 0, // Image gamma correction [0.01 to 7.99]
	        grayscale: 'none', // Graysale algorithm [average, luma, luma-601, luma-709, luma-240, desaturation, decomposition-[min|max], [red|green|blue]-chanel]
	        shadesOfGray: 256 // Number of shades of gray [2-256]
	    }, settings || {});
	
	    // Get canvas 2d context
	    var context = canvas.getContext('2d');
	
	    // Smoothing
	    if (context.imageSmoothingEnabled !== undefined) {
	        context.imageSmoothingEnabled = settings.smoothing;
	    } else {
	        context.mozImageSmoothingEnabled = settings.smoothing;
	        context.webkitImageSmoothingEnabled = settings.smoothing;
	        context.msImageSmoothingEnabled = settings.smoothing;
	        context.oImageSmoothingEnabled = settings.smoothing;
	    }
	
	    // Get image data
	    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
	    var data = imageData.data;
	
	    var contrastFactor = void 0,
	        brightnessOffset = void 0,
	        gammaCorrection = void 0,
	        shadesOfGrayFactor = void 0;
	
	    if (settings.contrast !== 0) {
	        contrastFactor = 259 * (settings.contrast + 255) / (255 * (259 - settings.contrast));
	    }
	
	    if (settings.brightness !== 0) {
	        brightnessOffset = settings.brightness;
	    }
	
	    if (settings.gamma !== 0) {
	        gammaCorrection = 1 / settings.gamma;
	    }
	
	    // Shades of gray
	    if (settings.shadesOfGray > 1 && settings.shadesOfGray < 256) {
	        shadesOfGrayFactor = 255 / (settings.shadesOfGray - 1);
	    }
	
	    // For each pixel
	    for (var i = 0, il = data.length; i < il; i += 4) {
	        // Apply filters
	        brightness(data, i, brightnessOffset);
	        contrast(data, i, contrastFactor);
	        gamma(data, i, gammaCorrection);
	        grayscale(data, i, settings.grayscale, shadesOfGrayFactor);
	    }
	
	    // Write new image data on the context
	    context.putImageData(imageData, 0, 0);
	}
	
	// Exports
	exports.canvasFilters = canvasFilters;
	exports.default = canvasFilters;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=lw.canvas-filters.js.map