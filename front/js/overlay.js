import {
    campingPop,
    createSiteMarker,
    createVectorLayer,
    fitMapToMarkers,
    removeCampingPop,
    removeExistingVectorLayers
} from './map';
import VectorSource from "ol/source/Vector";
import {fromLonLat} from "ol/proj";
import {getAuxiliaryFacilities, getNearbyFacilities, getOperatingSeasons} from "./helpers";
import {addViewOnMapButtonEvent} from "./events";

// 캠핑장 상세 정보 팝업 열기
export function openCampingSitePopup(site) {
    const popupContent = document.querySelector('.mapPopContent .popBody');
    const popup = document.getElementById('mapPop');
    const coordinates = fromLonLat([site.longitude, site.latitude]);
    // 팝업에 캠핑장 상세 정보 채우기
    popupContent.innerHTML = `
    <h3>${site.facilityName}</h3>
    <p><strong>카테고리:</strong> ${site.category}</p>
    <p><strong>주소:</strong> ${site.fullStreetAddress || '정보 없음'}</p>
    <p><strong>전화:</strong> ${site.telephoneNumber || '정보 없음'}</p>
    <p><strong>웹사이트:</strong> <a href="${site.website}" target="_blank">${site.website}</a></p>
    <p><strong>운영 시즌:</strong> ${getOperatingSeasons(site)}</p>
    <p><strong>시설:</strong> ${getAuxiliaryFacilities(site)}</p>
    <p><strong>근처 명소:</strong> ${getNearbyFacilities(site)}</p>
    <p><strong>시설 특징</strong>:</strong> ${site.facilityFeatures}</p>
  `;

    // 팝업 위치 설정 및 표시
    campingPop.setPosition(coordinates);
    popup.style.display = 'block';

    // 팝업 닫기 버튼 이벤트
    document.getElementById('popupCloseButton').addEventListener('click', () => {
        removeCampingPop();
        popup.style.display = 'none';
    });
}

// 캠핑장 결과 표시
export function displayCampingSites(data) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // 이전 결과를 지웁니다.

    // 지도에서 기존 벡터 레이어(마커 포함)를 제거합니다.
    removeExistingVectorLayers();

    if (data.length > 0) {
        // 마커를 담을 새로운 벡터 소스를 만듭니다.
        const vectorSource = new VectorSource();
        const features = []; // 지도 계산을 위한 마커 기능을 저장

        data.forEach((site) => {
            // 각 캠핑장에 대한 마커를 생성합니다.
            const marker = createSiteMarker(site);
            vectorSource.addFeature(marker);
            features.push(marker); // 지도 범위를 계산하기 위한 마커 저장

            // 각 캠핑장에 대한 HTML을 생성하고 이벤트를 처리합니다.
            const siteDiv =
                createSiteInfoDiv(site);
            addViewOnMapButtonEvent(siteDiv, site);

            resultDiv.appendChild(siteDiv);
        });

        // 모든 마커를 포함한 벡터 레이어를 생성합니다.
        createVectorLayer(vectorSource);
        // 모든 마커를 포함한 범위로 지도의 보기를 맞춥니다.
        fitMapToMarkers(vectorSource);
    } else {
        resultDiv.innerHTML = '<p>검색된 캠핑장이 없습니다.</p>';
    }
}



// 각 캠핑장의 정보를 표시할 HTML을 생성하는 함수
function createSiteInfoDiv(site) {
    const div = document.createElement('div');
    div.classList.add('site');
    div.innerHTML = `
        <h3>${site.facilityName}</h3>
        <p>주소: ${site.streetAddress || '정보 없음'}</p>  <!-- 주소가 없으면 '정보 없음'으로 표시 -->
        <p>전화번호: ${site.telephoneNumber || '정보 없음'}</p> <!-- 전화번호가 없으면 '정보 없음'으로 표시 -->
        <button class="viewOnMapButton" data-lat="${site.latitude}" data-lon="${site.longitude}">지도에서 보기</button>
    `;
    return div;
}

