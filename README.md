# World Map Vue

A Vue JS Component for displaying dynamic data on a world map. You can use a different color for each individual country
 and display information overlays associated to each country by hover or click events. 

Forked from [Ghrehh's world-map-vue](https://github.com/Ghrehh/world-map-vue) and [mrityunjaygr8](https://github.com/mrityunjaygr8/world-map-vue)

Map from [amCharts](https://www.amcharts.com/svg-maps/?map=world)

## Installation

Install via npm using `npm install world-map-vue`

## Usage

The original component from Ghrehh is most useful in creating a heat map for various countries. And
will color countries differently based on a props passed. This feature is still available on this fork. 
Please check the original documentation if you are interested in that feature/usage:
https://github.com/Ghrehh/world-map-vue

This version focuses on providing events support (based on mrityunjaygr8) (mouseenter, mouseleave and click) and beign 
able to color the countries with different colors. 

To activate this feature you need to set the property `countryColors` as true and provide `countryData` property with 
valid CSS colors for each country you want to color:

``` javascript
{
  US: '#2200AA',
  CA: 'red',
  UK: 'rgba(200, 200, 255, 0.1)',
}
```

Where the key is a country's
[ISO 3166 Code](https://en.wikipedia.org/wiki/ISO_3166) and the value is a
numerical value associated with it.

## API

| Props | Description | Optional |
| --- | --- | --- |
| countryData | Object. See Usage Section above for details  | no |
| countryColors | Boolean. See Usage Section above for details. Defaults to true | yes |
| showOverlay | Boolean. You can dynamically use the mouseenter/mouseleave events to show an overlay containing the contents defined in a slot. | yes |
| lowColor | String (color). Countries with lower values will be colored more strongly with this color. Will be ignored if `countryColors` is true | yes |
| highColor | String (color). Countries with higher values will be colored more strongly with this color. Will be ignored if `countryColors` is true | yes |
| defaultCountryFillColor | String (color). Countries with no data will default to this color | yes |
| countryStrokeColor | String (color). The color of the border around countries | yes |
| showColorBar | Boolean. Deciedes whether to show a color bar displaying the low and the high colors, or not. Defaults to true | yes |

## Hover Events

The component emits the event `mouseenter` when the mouse enters a country's border, with the country's node as the payload.  
Similarly the component also emits the `mouseleave` event when the mouse leaves the country's border.   
Together, these two events can be used for hover actions, or displaying additional data on hover.

Use then in your component as:  
``` javascript
  <vueWorldMap :countryData="stats.group_by_country" @mouseleave="on_mouseleave" @mouseenter="on_mouseenter" />
```
where `on_mouseenter` and `on_mouseleave` are defined among the methods of your component.

Both `on_mouseenter` and `on_mouseleave` return the `country's ISO 3166 Code`, using which the value can be found from the countryData property

## Overlay Panel

You can show overlay information by setting the property `showOverlay` to true.
An overlay will be shown on top of the map with the contents you include within a slot: (named `overlay`)
 ``` javascript
   <WorldMapVue
     :country-data="editSubscriptionCountryData"     
     :show-overlay="showMapOverlay"
     @mouseenter="onMouseEnterMapCountry"
     @mouseleave="onMouseLeaveMapCountry"
     @click="onClickMapCountry"
   >
     <template v-slot:overlay>
        // -> Your components here 
     </template>
   </WorldMapVue>

/* ... */

  methods: {
    onMouseEnterMapCountry (countryCode) {
      this.showMapOverlay = true
      // Update your data/property to be displayed on the overlay.
    }
    onMouseLeaveMapCountry () {
      this.showMapOverlay = false
    },
    onClickMapCountry (data) {
      console.log('Click Country', data)
    },
  }
 ```
This feature is useful to show related information to countries after clicking or hovering over them.

### Other changes
- All dependencies have been updated to their latest versions.
- Eslint and coding styles migrated to comply with JS Standard and the Vue Recommended ruleset.
- The original implementation left the map CSS tag and rules in the body. This version removes them to avoid styling issues and to not clutter the HTML.
