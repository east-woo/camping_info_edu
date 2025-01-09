import 'ol/ol.css'; // OpenLayers styles 
import Map from 'ol/Map'; // OpenLayers Map object 
import View from 'ol/View'; // OpenLayers View for map's center and zoom 
import { Feature } from 'ol'; // OpenLayers Feature (used for markers) 
import TileLayer from 'ol/layer/Tile'; // OpenLayers TileLayer (base layer) 
import OSM from 'ol/source/OSM'; // OpenStreetMap source for TileLayer 
import { fromLonLat } from 'ol/proj'; // Converts lon/lat to map projection 
import VectorLayer from 'ol/layer/Vector'; // Correct import for VectorLayer 
import VectorSource from 'ol/source/Vector'; // Correct import for VectorSource 
import { Icon, Style } from 'ol/style'; // OpenLayers styles for customizing markers 
import { Point } from 'ol/geom';
import Overlay from 'ol/Overlay';
import TileWMS from 'ol/source/TileWMS';


let map; // 맵 객체를 전역에서 정의
let eduPop; // 팝업 오버레이 객체를 전역에서 정의

// OpenLayers 맵 초기화 함수
function initMap() {


  map = new Map({
    target: 'map',
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: fromLonLat([126.9780, 37.5665]), // Default center: Seoul
      zoom: 10,
    }),
  });

  // 팝업 오버레이 등록
  eduPop = new Overlay({
    element: document.querySelector('#mapPop'),
    autoPan: true,
    autoPanAnimation: {
      duration: 250,
    },
  });


  //시군구 레이어 등록
  const eduSource = new TileWMS({
    url: 'http://localhost:8080/geoserver/wms',
    params: { 'LAYERS': 'wavus:ctp_rvn', 'TILED': true },
    serverType: 'geoserver',
  })

  const eduLayer = new TileLayer({
    source: eduSource,
    zIndex:0,
  });

  map.addLayer(eduLayer);

  // 레이어 On/Off 기능
  const toggleLayerButton = document.getElementById('toggleLayerButton');
  let isLayerVisible = true; // 레이어가 처음에 보이도록 설정

  toggleLayerButton.addEventListener('click', () => {
    if (isLayerVisible) {
      map.removeLayer(eduLayer);
      toggleLayerButton.textContent = '시도 레이어 켜기';
    } else {
      map.addLayer(eduLayer);
      toggleLayerButton.textContent = '시도 레이어 끄기';
    }
    isLayerVisible = !isLayerVisible; // 상태 토글
  });


  // 레이어 On/Off 기능
  const toggleLayerButton2 = document.getElementById('toggleLayerButton2');
  let isLayerVisible2 = true; // 레이어가 처음에 보이도록 설정

  toggleLayerButton2.addEventListener('click', () => {
    if (isLayerVisible2) {
      map.removeLayer(eduLayer);
      toggleLayerButton2.textContent = '시군구 레이어 켜기';
    } else {
      map.addLayer(eduLayer);
      toggleLayerButton2.textContent = '시군구 레이어 끄기';
    }
    isLayerVisible2 = !isLayerVisible2; // 상태 토글
  });

  map.addOverlay(eduPop);
}

// 시도 목록 가져오기 (city/province codes)
function fetchCtpRvnList() {
  return fetch('http://52.78.107.97:4000/api/area-code/ctpRvn/list')
    .then((response) => response.json())
    .catch((error) => console.error('Error fetching city codes:', error));
}

// 선택된 시도 코드에 기반한 시군구 목록 가져오기 (district codes)
function fetchSigList(ctprvnCd) {
  if (ctprvnCd) {
    return fetch(`http://52.78.107.97:4000/api/area-code/sig/list?ctprvnCd=${ctprvnCd}`)
      .then((response) => response.json())
      .catch((error) => console.error('Error fetching district codes:', error));
  }
  return Promise.resolve([]);
}

// 캠핑장 상세 정보 가져오기
function fetchCampingSiteDetails(siteId) {
    fetch(`http://52.78.107.97:4000/api/camping-info/id?id=${siteId}`)
      .then(response => response.json())
      .then(data => {
        // Open modal with detailed information about the selected camping site
        openCampingSitePopup(data);
      })
      .catch(error => {
        console.error('Error fetching camping site details:', error);
      });
  }

// 캠핑장 상세 정보 팝업 열기
function openCampingSitePopup(site) {
  const popupContent = document.querySelector('.mapPopContent .popBody');
  const popup = document.getElementById('mapPop');
  const coordinates = fromLonLat([site.longitude, site.latitude]);
  // 팝업에 캠핑장 상세 정보 채우기
  popupContent.innerHTML = `
    <h3>${site.facilityName}</h3>
    <p><strong>카테고리:</strong> ${site.category}</p>
    <p><strong>주소:</strong> ${site.streetAddress}</p>
    <p><strong>전화:</strong> ${site.telephoneNumber}</p>
    <p><strong>웹사이트:</strong> <a href="${site.website}" target="_blank">${site.website}</a></p>
    <p><strong>운영 시즌:</strong> ${getOperatingSeasons(site)}</p>
    <p><strong>시설:</strong> ${getAuxiliaryFacilities(site)}</p>
    <p><strong>근처 명소:</strong> ${getNearbyFacilities(site)}</p>
    <p><strong>시설 특징</strong>:</strong> ${site.facilityFeatures}</p>
  `;

  // 팝업 위치 설정 및 표시
  eduPop.setPosition(coordinates);
  popup.style.display = 'block';

  // 팝업 닫기 버튼 이벤트
  document.getElementById('popupCloseButton').addEventListener('click', () => {
    eduPop.setPosition(undefined); // 팝업 닫기
    popup.style.display = 'none';
  });
}


// 운영 시즌, 보조 시설, 근처 명소를 가져오는 헬퍼 함수들
function getOperatingSeasons(site) {
    const seasons = [];
    if (site.operateWeekdaysYn) seasons.push('주중');
    if (site.operateWeekendsYn) seasons.push('주말');
    if (site.operateSpringYn) seasons.push('봄');
    if (site.operateSummerYn) seasons.push('여름');
    if (site.operateFallYn) seasons.push('가을');
    if (site.operateWinterYn) seasons.push('겨울');
    return seasons.join(', ') || 'N/A';
  }
  
  function getAuxiliaryFacilities(site) {
    const facilities = [];
    if (site.electricityAuxiliaryFacilitiesYn) facilities.push('전기');
    if (site.hotWaterAuxiliaryFacilitiesYn) facilities.push('온수');
    if (site.wirelessInternetAuxiliaryFacilitiesYn) facilities.push('무선 인터넷');
    if (site.firewoodSalesAuxiliaryFacilitiesYn) facilities.push('장작 판매');
    if (site.promenadeAuxiliaryFacilitiesYn) facilities.push('산책로');
    if (site.waterParkAuxiliaryFacilitiesYn) facilities.push('워터파크');
    if (site.playgroundAuxiliaryFacilitiesYn) facilities.push('놀이터');
    if (site.martAuxiliaryFacilitiesYn) facilities.push('마트');
    return facilities.join(', ') || 'N/A';
  }
  
  function getNearbyFacilities(site) {
    const facilities = [];
    if (site.fishingNearbyFacilitiesYn) facilities.push('낚시');
    if (site.promenadeNearbyFacilitiesYn) facilities.push('산책로');
    if (site.waterPlaySeaBathingNearbyFacilitiesYn) facilities.push('바다 수영');
    if (site.waterPlaySeaLeisureNearbyFacilitiesYn) facilities.push('바다 레저');
    if (site.waterPlayValleyNearbyFacilitiesYn) facilities.push('계곡');
    if (site.waterPlayRiverNearbyFacilitiesYn) facilities.push('강');
    if (site.waterPlayPoolNearbyFacilitiesYn) facilities.push('수영장');
    if (site.youthExperienceFacilityNearbyFacilitiesYn) facilities.push('청소년 체험');
    if (site.ruralExperienceFacilityNearbyFacilitiesYn) facilities.push('농촌 체험');
    if (site.childrensPlayFacilityNearbyFacilitiesYn) facilities.push('어린이 놀이터');
    return facilities.join(', ') || 'N/A';
  }

// 선택된 시도와 시군구 코드에 기반한 캠핑장 정보 가져오기
function fetchCampingSites(ctprvnCd, sigCd) {
  const url = `http://52.78.107.97:4000/api/camping-info/region?ctprvnCd=${ctprvnCd}&sigCd=${sigCd}`;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error('Error fetching camping sites:', error));
}

// 캠핑장 결과 표시
function displayCampingSites(data) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = ''; // 벡터 레이어 (마커 포함) 제거

  // Clear existing markers before adding new ones
  map.getLayers().forEach((layer) => {
    if (layer instanceof VectorLayer) {
      map.removeLayer(layer); // 벡터 레이어 (마커 포함) 제거
    }
  });

  if (data.length > 0) {
    // 모든 마커를 저장할 벡터 소스 생성
    const vectorSource = new VectorSource();
    const features = []; // 지도 계산을 위한 마커 기능 저장
    data.forEach((site) => {
      // 각 캠핑장에 대한 마커 생성
      const marker = new Feature({
        geometry: new Point(fromLonLat([site.longitude, site.latitude])), // 위도/경도로 마커 생성
        name: site.facilityName,
      });

       // 벡터 소스에 마커 추가
      vectorSource.addFeature(marker);

      // 지도 범위 계산을 위한 마커 저장
      features.push(marker);

      // 사이트에 대한 기본 정보 표시
      const div = document.createElement('div');
      div.classList.add('site');
      div.innerHTML = `
        <h3>${site.facilityName}</h3>
        <p>주소: ${site.streetAddress}</p>
        <p>전화번호: ${site.telephoneNumber}</p>
        <button class="viewOnMapButton" data-lat="${site.latitude}" data-lon="${site.longitude}">지도에서 보기</button>
      `;

      // "지도에서 보기" 버튼 클릭 시 이벤트 리스너 추가
      div.querySelector('.viewOnMapButton').addEventListener('click', () => {
        const lat = parseFloat(site.latitude);
        const lon = parseFloat(site.longitude);

        // 선택된 캠핑장으로 지도 이동
        map.getView().setCenter(fromLonLat([lon, lat]));

        // 더 나은 뷰를 위한 줌 레벨 설정
        map.getView().setZoom(15);

        // API에서 상세 정보 가져오기
        fetchCampingSiteDetails(site.id);
      });

      resultDiv.appendChild(div);
    });
    

   // 모든 마커를 포함한 벡터 레이어 생성
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        image: new Icon({
          src: './images/camp.png', // Custom marker image
          scale: 0.1,
        }),
      }),
      zIndex:100
    });

    map.addLayer(vectorLayer); 

    // 모든 마커의 범위를 계산하고 지도의 보기를 조정
    const extent = vectorSource.getExtent(); 
    map.getView().fit(extent, { padding: [20, 20, 20, 20], maxZoom: 15 });
  } else {
    resultDiv.innerHTML = '<p>No camping sites were found</p>';
  }
}


window.addEventListener('resize', function() {

  const vectorSource = map.getLayers().getArray().find(layer => layer instanceof VectorLayer)?.getSource();
  if (vectorSource) {
    const extent = vectorSource.getExtent();
    map.getView().fit(extent, { padding: [20, 20, 20, 20], maxZoom: 15 });
  }
});


function handleSearchTypeChange() {
  const searchType = document.querySelector('input[name="searchType"]:checked').value;
  const regionSearch = document.getElementById('regionSearch');
  const nameSearch = document.getElementById('nameSearch');

  if (searchType === 'region') {
    regionSearch.style.display = 'block';
    nameSearch.style.display = 'none';
  } else if (searchType === 'name') {
    regionSearch.style.display = 'none';
    nameSearch.style.display = 'block';
  }
}


function setupEventListeners() {
  document.querySelectorAll('input[name="searchType"]').forEach((radio) =>
    radio.addEventListener('change', handleSearchTypeChange)
  );

  document.getElementById('cityCode').addEventListener('change', (event) => {
    const ctprvnCd = event.target.value;
    fetchSigList(ctprvnCd).then((data) => {
      const districtCodeSelect = document.getElementById('districtCode');
      districtCodeSelect.innerHTML = ''; 
      const defaultOption = document.createElement('option');
      districtCodeSelect.appendChild(defaultOption);
      data.forEach((item) => {
        const option = document.createElement('option');
        option.value = item.sigCd;
        option.textContent = item.sigKorNm;
        districtCodeSelect.appendChild(option);
      });
    });
  });

  document.getElementById('regionSearchButton').addEventListener('click', () => {
    const ctprvnCd = document.getElementById('cityCode').value;
    const sigCd = document.getElementById('districtCode').value;
    if(ctprvnCd == '' && sigCd ==''){
      return alert("시도를 선택하여 주세요");
    }
    fetchCampingSites(ctprvnCd, sigCd).then(displayCampingSites);
  });

  document.getElementById('nameSearchButton').addEventListener('click', () => {
    const facilityName = document.getElementById('facilityName').value;
    const url = `http://localhost:8081/api/camping-info/name?facilityName=${encodeURIComponent(facilityName)}`;
    fetch(url)
      .then((response) => response.json())
      .then(displayCampingSites)
      .catch((error) => console.error('Error fetching camping sites by name:', error));
  });


}


function main() {
  initMap();
  setupEventListeners();
  fetchCtpRvnList().then((data) => {
    const cityCodeSelect = document.getElementById('cityCode');
    data.forEach((item) => {
      const option = document.createElement('option');
      option.value = item.ctprvnCd;
      option.textContent = item.ctpKorNm;
      cityCodeSelect.appendChild(option);
    });
    
    const ctprvnCd = cityCodeSelect.value;
    fetchSigList(ctprvnCd).then((districtData) => {
      const districtCodeSelect = document.getElementById('districtCode');
      districtData.forEach((item) => {
        const option = document.createElement('option');
        option.value = item.sigCd;
        option.textContent = item.sigKorNm;
        districtCodeSelect.appendChild(option);
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', main);
