import Map from 'ol/Map'; // OpenLayers Map object
import TileLayer from 'ol/layer/Tile'; // OpenLayers TileLayer (base layer)
import OSM from 'ol/source/OSM'; // OpenStreetMap source for TileLayer
import View from 'ol/View'; // OpenLayers View for map's center and zoom
import {fromLonLat} from 'ol/proj'; // Converts lon/lat to map projection
import Overlay from 'ol/Overlay';
import TileWMS from "ol/source/TileWMS";
import VectorLayer from "ol/layer/Vector";
import {Feature} from "ol";
import {Point} from "ol/geom";
import {Icon, Style} from "ol/style";

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

export function removeCampingPop(){
    campingPop.setPosition(undefined);
}


// 지도에서 기존 벡터 레이어(마커 포함)를 제거하는 함수
export function removeExistingVectorLayers() {
    map.getLayers().forEach((layer) => {
        if (layer instanceof VectorLayer) {
            map.removeLayer(layer); // 벡터 레이어(마커 포함) 제거
        }
    });
}

// 각 캠핑장에 대한 마커를 생성하는 함수
export function createSiteMarker(site) {
    return new Feature({
        geometry: new Point(fromLonLat([site.longitude, site.latitude])), // 경도, 위도로 마커 생성
        name: site.facilityName,
    });
}

// 마커를 포함한 벡터 레이어를 생성하는 함수
export function createVectorLayer(vectorSource) {
    const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: new Style({
            image: new Icon({
                src: './images/camp.png', // 커스텀 마커 이미지
                scale: 0.1,
            }),
        }),
        zIndex: 100, // 레이어의 z-index 설정
    });

    map.addLayer(vectorLayer); // 맵에 벡터 레이어 추가
}

// 모든 마커를 포함한 범위로 지도의 보기를 맞추는 함수
export function fitMapToMarkers(vectorSource) {
    const extent = vectorSource.getExtent(); // 벡터 소스의 범위 계산
    map.getView().fit(extent, { padding: [20, 20, 20, 20], maxZoom: 15 }); // 지도 보기를 범위에 맞게 설정
}