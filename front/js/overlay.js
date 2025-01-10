import {
    campingPop,
    createSiteMarker,
    createVectorLayer,
    fitMapToMarkers,
    removeCampingPop,
    removeExistingVectorLayers
} from './map'; // 지도 관련 유틸리티 함수 및 변수 임포트
import VectorSource from "ol/source/Vector"; // 벡터 소스
import {fromLonLat} from "ol/proj"; // 경도/위도를 지도 좌표계로 변환
import {getAuxiliaryFacilities, getNearbyFacilities, getOperatingSeasons} from "./helpers"; // 헬퍼 함수 임포트
import {addViewOnMapButtonEvent} from "./events"; // 이벤트 등록 함수 임포트

// 캠핑장 상세 정보 팝업 열기
export function openCampingSitePopup(site) {
    const popupContent = document.querySelector('.mapPopContent .popBody'); // 팝업 내용 영역 선택
    const popup = document.getElementById('mapPop'); // 팝업 요소 선택
    const coordinates = fromLonLat([site.longitude, site.latitude]); // 팝업을 표시할 좌표 변환

    // 팝업에 캠핑장 상세 정보를 삽입
    popupContent.innerHTML = `
        <h3>${site.facilityName}</h3>
        <p><strong>카테고리:</strong> ${site.category}</p>
        <p><strong>주소:</strong> ${site.fullStreetAddress || '정보 없음'}</p>
        <p><strong>전화:</strong> ${site.telephoneNumber || '정보 없음'}</p>
        <p><strong>웹사이트:</strong> <a href="${site.website}" target="_blank">${site.website}</a></p>
        <p><strong>운영 시즌:</strong> ${getOperatingSeasons(site)}</p>
        <p><strong>시설:</strong> ${getAuxiliaryFacilities(site)}</p>
        <p><strong>근처 명소:</strong> ${getNearbyFacilities(site)}</p>
        <p><strong>시설 특징:</strong> ${site.facilityFeatures}</p>
    `;

    // 팝업 위치 설정 및 표시
    campingPop.setPosition(coordinates);
    popup.style.display = 'block'; // 팝업 표시

    // 팝업 닫기 버튼 클릭 이벤트 등록
    document.getElementById('popupCloseButton').addEventListener('click', () => {
        removeCampingPop(); // 팝업 닫기
        popup.style.display = 'none'; // 팝업 숨기기
    });
}

// 캠핑장 검색 결과를 화면에 표시
export function displayCampingSites(data) {
    const resultDiv = document.getElementById('result'); // 결과를 표시할 요소 선택
    resultDiv.innerHTML = ''; // 이전 결과를 지움

    // 지도에서 기존 벡터 레이어(마커 포함)를 제거
    removeExistingVectorLayers();

    if (data.length > 0) {
        // 마커 데이터를 저장할 벡터 소스 생성
        const vectorSource = new VectorSource();
        const features = []; // 지도 범위 계산을 위한 마커 배열

        data.forEach((site) => {
            // 캠핑장에 대한 마커 생성
            const marker = createSiteMarker(site);
            vectorSource.addFeature(marker); // 마커를 벡터 소스에 추가
            features.push(marker); // 마커 배열에 추가

            // 캠핑장 정보를 표시할 HTML 요소 생성 및 이벤트 처리
            const siteDiv = createSiteInfoDiv(site);
            addViewOnMapButtonEvent(siteDiv, site); // "지도에서 보기" 버튼 이벤트 등록

            resultDiv.appendChild(siteDiv); // 결과 영역에 HTML 추가
        });

        // 모든 마커를 포함한 벡터 레이어 생성
        createVectorLayer(vectorSource);
        // 모든 마커를 포함한 범위로 지도 보기 설정
        fitMapToMarkers(vectorSource);
    } else {
        resultDiv.innerHTML = '<p>검색된 캠핑장이 없습니다.</p>'; // 검색 결과가 없을 경우 메시지 표시
    }
}

// 캠핑장 정보를 표시할 HTML 요소 생성
function createSiteInfoDiv(site) {
    const div = document.createElement('div'); // 새로운 div 요소 생성
    div.classList.add('site'); // 클래스 이름 추가
    div.innerHTML = `
        <h3>${site.facilityName}</h3>
        <p>주소: ${site.streetAddress || '정보 없음'}</p> <!-- 주소가 없으면 '정보 없음' 표시 -->
        <p>전화번호: ${site.telephoneNumber || '정보 없음'}</p> <!-- 전화번호가 없으면 '정보 없음' 표시 -->
        <button class="viewOnMapButton" data-lat="${site.latitude}" data-lon="${site.longitude}">지도에서 보기</button>
    `;
    return div; // 생성된 HTML 요소 반환
}
