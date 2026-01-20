import Map from 'ol/Map'; // OpenLayers Map 객체
import TileLayer from 'ol/layer/Tile'; // OpenLayers TileLayer (기본 레이어)
import OSM from 'ol/source/OSM'; // OpenStreetMap 소스 (TileLayer에 사용)
import View from 'ol/View'; // 지도 중심 및 줌 설정을 위한 OpenLayers View
import {fromLonLat} from 'ol/proj'; // 경도/위도를 지도 투영 좌표계로 변환
import Overlay from 'ol/Overlay'; // 팝업 오버레이
import TileWMS from "ol/source/TileWMS"; // WMS 소스(Tile Layer 용)
import VectorLayer from "ol/layer/Vector"; // 벡터 레이어
import {Feature} from "ol"; // OpenLayers Feature 객체
import {Point} from "ol/geom"; // 점(Point) 형태의 Geometry
import {Icon, Style} from "ol/style"; // 아이콘 및 스타일 관련 객체
import { getConfig } from "./config";
export let map; // 지도 객체
export let campingPop; // 캠핑장 팝업 오버레이
export let ctpRvnLayer; // 시도 레이어

export let sigLayer; // 시도 레이어
// 지도 초기화 함수 (✅ async로 변경)
export async function initMap() {
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

    // 팝업 오버레이
    campingPop = new Overlay({
        element: document.querySelector('#mapPop'),
        autoPan: true,
        autoPanAnimation: { duration: 250 },
    });
    map.addOverlay(campingPop);
    
    ctpRvnLayer = await ctpRvnLayerAdd();
    map.addLayer(ctpRvnLayer);

    sigLayer = await sigLayerAdd();
    map.addLayer(sigLayer);
}

// 시도 레이어 생성
async function ctpRvnLayerAdd() {
    const { GEOSERVER_WMS_URL } = await getConfig();

    const ctpRvnSource = new TileWMS({
        url: GEOSERVER_WMS_URL,
        params: { 'LAYERS': 'wavus:ctp_rvn', 'TILED': true },
        serverType: 'geoserver',
    });

    return new TileLayer({
        source: ctpRvnSource,
        zIndex: 0,
    });
}

// 시군구 레이어 생성
async function sigLayerAdd() {
    const { GEOSERVER_WMS_URL } = await getConfig();

    const sigSource = new TileWMS({
        url: GEOSERVER_WMS_URL,
        params: { 'LAYERS': 'wavus:sig', 'TILED': true },
        serverType: 'geoserver',
    });

    return new TileLayer({
        source: sigSource,
        zIndex: 0,
    });
}

// 팝업 닫기
export function removeCampingPop() {
    campingPop.setPosition(undefined);
}

// 기존 벡터 레이어 제거
export function removeExistingVectorLayers() {
    map.getLayers().forEach((layer) => {
        if (layer instanceof VectorLayer) {
            map.removeLayer(layer);
        }
    });
}

// 마커 생성
export function createSiteMarker(site) {
    return new Feature({
        geometry: new Point(fromLonLat([site.longitude, site.latitude])),
        name: site.facilityName,
    });
}

// 벡터 레이어 생성 + 지도에 추가
export function createVectorLayer(vectorSource) {
    const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: new Style({
            image: new Icon({
                src: './images/camp.png',
                scale: 0.1,
            }),
        }),
        zIndex: 100,
    });

    map.addLayer(vectorLayer);
}

// 마커 범위로 지도 맞추기
export function fitMapToMarkers(vectorSource) {
    const extent = vectorSource.getExtent();
    map.getView().fit(extent, { padding: [20, 20, 20, 20], maxZoom: 15 });
}