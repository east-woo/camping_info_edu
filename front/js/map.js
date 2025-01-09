
import Map from 'ol/Map'; // OpenLayers Map object
import TileLayer from 'ol/layer/Tile'; // OpenLayers TileLayer (base layer)
import OSM from 'ol/source/OSM'; // OpenStreetMap source for TileLayer
import View from 'ol/View'; // OpenLayers View for map's center and zoom
import { fromLonLat } from 'ol/proj'; // Converts lon/lat to map projection
import Overlay from 'ol/Overlay';
import TileWMS from "ol/source/TileWMS";

export let map;
export let campingPop;
export let ctpRvnLayer;

export function initMap() {
    /*Map 초기화*/
    map = new Map({
        target: 'map',
        layers: [
            new TileLayer({
                source: new OSM(),
            }),
        ],
        view: new View({
            center: fromLonLat([126.9780, 37.5665]),
            zoom: 10,
        }),
    });

    /*pop overlay 등록*/
    campingPop = new Overlay({
        element: document.querySelector('#mapPop'),
        autoPan: true,
        autoPanAnimation: {
            duration: 250,
        },
    });

    map.addOverlay(campingPop);
    
    ctpRvnLayer = ctpRvnLayerAdd();
    map.addLayer(ctpRvnLayer);
}

/*시도 레이어 등록*/
function ctpRvnLayerAdd(){
    const ctpRvnSource = new TileWMS({
        url: 'http://localhost:8080/geoserver/wms',
        params: { 'LAYERS': 'wavus:ctp_rvn', 'TILED': true },
        serverType: 'geoserver',
    })

    return new TileLayer({
        source: ctpRvnSource,
        zIndex:0,
    });
}
