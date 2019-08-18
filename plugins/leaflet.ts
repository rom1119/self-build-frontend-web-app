import Vue from 'vue';
import { LMap, LTileLayer, LMarker, LPopup, LControl } from 'vue2-leaflet';
import { OpenStreetMapProvider } from '~/node_modules/leaflet-geosearch';
import {Control, Icon} from 'leaflet';
// @ts-ignore
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

Vue.component('l-map', LMap);
Vue.component('l-tilelayer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('l-popup', LPopup);
Vue.component('l-control', LControl);
// LControl.att
