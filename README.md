# Material Dynamic Colors web component

This simple web component allows you to generate material design color CSS variables for a selection of HTML element children based on an image source, image element, or hex/rgb color codes.

## Usage

Include `index.min.js` in your web project however you like. This will register the `dynamic-color` element in the window.

In your HTML template, use `<dynamic-color>` to apply the color theme to it's children, like so:

```
<dynamic-color>
    <!-- elements in here will be able to use the color theme -->
</dynamic-color>
```

The parent element will be given CSS variables to be used by it's children to apply the color theme where appropriate.

### Image Source

Use the attribute `sourceImage` with an image URL to get a color theme from. Alternatively, have no attributes on the `dynamic-color` element and it will use the source of the first image element child.

*Make sure there are no cors issues with the image*

### Hex color code

Use the attribute `sourceHex` with a hex color value to generate a color theme from a predefined color.

### RGB color code

Use the attribute `sourceRgb` with an rgb color value to generate a color theme from a predefined color.

## Overriding color scheme

By default, this will use the device color scheme preferences. To override, use the attributes `dark` or `light` to set a specific scheme. If both are included, it will use the system default again.

## Applying theme globally

Use the attribute `global` to apply the theme to the whole document.

### Demo

See `demo.html` for a demo