<template>
  <div class="world-map-vue">
    <div
      v-if="showColorBar"
      id="color_bar"
    />
    <Map
      @mousemove="onMouseMove"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @click="onClick"
    />
    <transition name="fade">
      <div
        v-if="showOverlay"
        class="map-overlay"
        :class="{'map-overlay-top': isMouseBottom}"
      >
        <div class="map-overlay-content">
          <slot name="overlay" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import chroma from 'chroma-js'
import Map from './Map'
import {
  getDynamicMapCss,
  getCountryColorsMapCss,
  getBaseCss,
  getCombinedCssString
} from './dynamic-map-css'

export default {
  name: 'WorldMapVue',
  components: { Map },
  props: {
    countryData: {
      type: Object,
      required: true
    },
    showOverlay: {
      type: Boolean,
      default: false
    },
    countryColors: {
      type: Boolean,
      default: true
    },
    showColorBar: {
      type: Boolean,
      default: false
    },
    lowColor: {
      type: String,
      default: '#fde2e2'
    },
    highColor: {
      type: String,
      default: '#d83737'
    },
    defaultCountryFillColor: {
      type: String,
      default: '#dadada'
    },
    countryStrokeColor: {
      type: String,
      default: '#cccccc'
    }
  },
  data () {
    return {
      node: document.createElement('style'),
      chromaScale: chroma.scale([this.$props.lowColor, this.$props.highColor]),
      isMouseBottom: false
    }
  },
  watch: {
    countryData () {
      this.renderMapCSS()
    }
  },
  mounted () {
    document.body.appendChild(this.$data.node)
    this.renderMapCSS()
    if (!this.countryColors) {
      this.colorGradient()
    }
  },
  beforeDestroy () {
    this.$data.node.remove()
  },
  methods: {
    onMouseMove (ev, mapSvg) {
      const posY = ev.offsetY
      const mapHeight = mapSvg.getBoundingClientRect().height
      this.isMouseBottom = posY > (mapHeight / 2)
    },
    onMouseEnter (e) {
      this.$emit('mouseenter', e)
    },
    onMouseLeave (e) {
      this.$emit('mouseleave', e)
    },
    onClick (e) {
      this.$emit('click', e)
    },
    renderMapCSS () {
      const baseCss = getBaseCss(this.$props)
      const dynamicMapCss = this.countryColors ? getCountryColorsMapCss(this.$props.countryData) : getDynamicMapCss(this.$props.countryData, this.chromaScale)
      window.mapNode = this.$data.node
      this.$data.node.innerHTML = getCombinedCssString(baseCss, dynamicMapCss)
    },
    colorGradient () {
      const colorBar = document.getElementById('color_bar')
      const prefixes = ['', '-o-', '-ms-', '-moz-', '-webkit-']
      for (let x = 0; x < prefixes.length; x += 1) {
        colorBar.style.background = `${prefixes[x]}linear-gradient(to right, ${this.lowColor}, ${this.highColor})`
      }
    }
  }
}
</script>

<style>
  .world-map-vue {
    height: 100%;
    position: relative;
  }

  .world-map-vue .map-overlay {
    position: absolute;
    top: unset;
    bottom: 2%;
    left: 0;
    width: 100%;
    z-index: 1;
    display: flex;
    justify-content: center;
  }

  .world-map-vue .map-overlay .map-overlay-content {
    padding: 1rem;
    display: block;
    min-width: 30%;
    max-width: 80%;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 0.6rem;
    box-shadow: 0 0 1px rgba(0, 5, 10, 0.25), 0 0.2rem 1rem rgba(0, 5, 10, 0.15);
  }

  .world-map-vue .map-overlay.map-overlay-top {
    top: 2%;
    bottom: unset;
  }

  #map-svg {
    height: 100%;
  }

  #color_bar {
    width: 100%;
    height: 5%;
    margin: auto;
  }

  #color_bar::before {
    position: relative;
    top: 100%;
    left: 5%;
    content: "Low"
  }

  #color_bar::after {
    position: relative;
    top: 100%;
    left: 85%;
    content: "High"
  }
</style>
