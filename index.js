import {LitElement, css, html} from 'lit';
import {themeFromImage,argbFromHex,argbFromRgb, themeFromSourceColor, applyTheme} from '@material/material-color-utilities'

export class DynamicColor extends LitElement {
    static properties = {
        sourceImage: {
            type: String,
            reflect: true
        },
        sourceHex: {
            type: String,
            reflect: true
        },
        sourceRgb: {
            type: String,
            reflect: true
        },
        dark: {
            type: Boolean,
            reflect: true
        },
        light: {
            type: Boolean,
            reflect: true
        },
        global: {
            type: Boolean,
            reflect: true
        }
    }

    _checkColorScheme() {
        if (this.dark && this.light) {
            this.darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
        } else if (this.light) {
            this.darkMode = false
        } else if (this.dark) {
            this.darkMode = true
        } else {
            this.darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
        }
    }

    _applyTheme(theme) {
        applyTheme(theme,{
            dark: this.darkMode,
            target: this.global ? document.body : this
        })
    }

    async _setColorsFromImage() {
        let image = null
        if (this.sourceImage) {
            image = document.createElement('img')
            image.src = this.sourceImage
        } else {
            image = this.querySelector('img')
        }
        image.crossOrigin = "Anonymous";
        const theme = await themeFromImage(image)
        this._applyTheme(theme)
    }

    async _setColorsFromHex() {
        const theme = themeFromSourceColor(argbFromHex(this.sourceHex))
        this._applyTheme(theme)
    }

    async _setColorsFromRgb() {
        const theme = themeFromSourceColor(argbFromRgb(this.sourceRgb))
        this._applyTheme(theme)
    }


    _setColors() {
        this._checkColorScheme()
        try {
            if (this.sourceImage) {
                this._setColorsFromImage()
            } else if (this.sourceHex) {
                this._setColorsFromHex()
            } else if (this.sourceRgb) {
                this._setColorsFromRgb()
            } else {
                this._setColorsFromImage()
            }
        } catch (error) {
            console.error('Something went wrong generating your dynamic color scheme', error)
        }
    }

    updated() {
        this._setColors()
    }

    refresh() {
        this._setColors()
    }

    constructor() {
        super()
    }

    connectedCallback() {
        super.connectedCallback()
        this._setColors()
    }

    render() {
        return html`
            <slot></slot>
        `
    }
}

customElements.define('dynamic-color', DynamicColor)