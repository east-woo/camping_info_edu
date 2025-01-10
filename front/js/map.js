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

export let map; // 지도 객체
export let campingPop; // 캠핑장 팝업 오버레이
export let ctpRvnLayer; // 시도 레이어

// 지도 초기화 함수
export function initMap() {
    /* 지도 객체 생성 */
    map = new Map({
        target: 'map', // 지도를 렌더링할 HTML 요소의 ID
        layers: [
            new TileLayer({
                source: new OSM(), // OSM 소스를 사용한 기본 타일 레이어 추가
            }),
        ],
        view: new View({
            center: fromLonLat([126.9780, 37.5665]), // 초기 중심 좌표 (서울)
            zoom: 10, // 초기 줌 레벨
        }),
    });

    /* 팝업 오버레이 등록 */
    campingPop = new Overlay({
        element: document.querySelector('#mapPop'), // 팝업을 연결할 HTML 요소
        autoPan: true, // 팝업이 화면에 보이도록 자동으로 지도 이동
        autoPanAnimation: {
            duration: 250, // 애니메이션 지속 시간
        },
    });

    map.addOverlay(campingPop); // 지도에 팝업 오버레이 추가

    /* 시도 레이어 추가 */
    ctpRvnLayer = ctpRvnLayerAdd(); // 시도 레이어 생성
    map.addLayer(ctpRvnLayer); // 지도에 시도 레이어 추가
}

// 시도 레이어 생성 함수
function ctpRvnLayerAdd() {
    const ctpRvnSource = new TileWMS({
        url: 'http://localhost:8080/geoserver/wms', // GeoServer WMS URL
        params: { 'LAYERS': 'wavus:ctp_rvn', 'TILED': true }, // WMS 레이어 설정
        serverType: 'geoserver', // 서버 타입
    });

    return new TileLayer({
        source: ctpRvnSource, // WMS 소스 설정
        zIndex: 0, // 레이어 z-index 설정
    });
}

// 캠핑장 팝업 닫기 함수
export function removeCampingPop() {
    campingPop.setPosition(undefined); // 팝업 위치를 제거하여 닫음
}

// 기존 벡터 레이어(마커 포함)를 제거하는 함수
export function removeExistingVectorLayers() {
    map.getLayers().forEach((layer) => {
        if (layer instanceof VectorLayer) { // 벡터 레이어만 필터링
            map.removeLayer(layer); // 벡터 레이어 제거
        }
    });
}

// 각 캠핑장에 대한 마커를 생성하는 함수
export function createSiteMarker(site) {
    return new Feature({
        geometry: new Point(fromLonLat([site.longitude, site.latitude])), // 경도, 위도로 점 생성
        name: site.facilityName, // 캠핑장 이름을 Feature에 추가
    });
}

// 마커를 포함한 벡터 레이어를 생성하는 함수
export function createVectorLayer(vectorSource) {
    const vectorLayer = new VectorLayer({
        source: vectorSource, // 벡터 소스 설정
        style: new Style({
            image: new Icon({
                src: './images/camp.png', // 마커 아이콘 이미지 경로
                scale: 0.1, // 마커 크기 설정
            }),
        }),
        zIndex: 100, // 레이어의 z-index 설정
    });

    map.addLayer(vectorLayer); // 벡터 레이어를 지도에 추가
}

// 모든 마커를 포함한 범위로 지도의 보기를 맞추는 함수
export function fitMapToMarkers(vectorSource) {
    const extent = vectorSource.getExtent(); // 벡터 소스의 범위 계산
    map.getView().fit(extent, { padding: [20, 20, 20, 20], maxZoom: 15 }); // 지도 보기를 범위에 맞게 설정
}
