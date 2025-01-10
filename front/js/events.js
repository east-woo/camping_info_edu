import { fetchCampingSiteByName, fetchCampingSiteDetails, fetchCampingSites, fetchSigList } from './api'; // API 호출 함수 가져오기
import { displayCampingSites } from './overlay'; // 캠핑장 결과 표시 함수 가져오기
import { ctpRvnLayer, map, removeCampingPop } from './map'; // 지도 관련 함수 및 레이어 가져오기
import { fromLonLat } from "ol/proj"; // 좌표 변환 함수 가져오기

// 이벤트 리스너 설정 함수
export function setupEventListeners() {
    // 검색 유형 변경 이벤트 리스너 추가
    document.querySelectorAll('input[name="searchType"]').forEach((radio) =>
        radio.addEventListener('change', handleSearchTypeChange)
    );


    // 시도 선택 시, 시군구 목록 업데이트
    document.getElementById('cityCode').addEventListener('change', (event) => {
        const ctprvnCd = event.target.value; // 선택된 시도 코드
        fetchSigList(ctprvnCd).then((data) => { // 해당 시도 코드에 따른 시군구 목록 가져오기
            const districtCodeSelect = document.getElementById('districtCode'); // 시군구 선택 요소
            districtCodeSelect.innerHTML = ''; // 기존 옵션 제거
            const defaultOption = document.createElement('option'); // 기본 옵션 생성
            districtCodeSelect.appendChild(defaultOption);
            data.forEach((item) => { // 시군구 목록 추가
                const option = document.createElement('option');
                option.value = item.sigCd; // 시군구 코드
                option.textContent = item.sigKorNm; // 시군구 이름
                districtCodeSelect.appendChild(option);
            });
        });
    });

    // 지역 기반 검색 버튼 클릭 이벤트 리스너 추가
    document.getElementById('regionSearchButton').addEventListener('click', () => {
        const ctprvnCd = document.getElementById('cityCode').value; // 선택된 시도 코드
        const sigCd = document.getElementById('districtCode').value; // 선택된 시군구 코드
        if (ctprvnCd == '' && sigCd == '') { // 시도 및 시군구가 선택되지 않은 경우
            return alert("시도를 선택하여 주세요"); // 경고 메시지 표시
        }
        fetchCampingSites(ctprvnCd, sigCd) // 해당 지역의 캠핑장 정보 가져오기
            .then((data) => {
                displayCampingSites(data); // 가져온 캠핑장 정보 표시
                removeCampingPop(); // 기존 팝업 제거
            });
    });

    // 이름 기반 검색 버튼 클릭 이벤트 리스너 추가
    document.getElementById('nameSearchButton').addEventListener('click', () => {
        const facilityName = document.getElementById('facilityName').value; // 입력된 캠핑장 이름
        if (!facilityName) { // 이름이 입력되지 않은 경우
            return alert('캠핑장 이름을 입력해주세요.'); // 경고 메시지 표시
        }
        fetchCampingSiteByName(facilityName) // 입력된 이름으로 캠핑장 정보 검색
            .then(displayCampingSites) // 검색 결과 표시
            .catch((error) => console.error('Error displaying camping sites:', error)); // 에러 발생 시 콘솔에 출력
        removeCampingPop(); // 기존 팝업 제거
    });

    // 시도 레이어 On/Off 버튼 이벤트 리스너 추가
    const ctpRvnLayerButton = document.getElementById('ctpRvnLayerButton');
    let isCtpRvnLayerVisible = true; // 초기 상태: 레이어 보임

    ctpRvnLayerButton.addEventListener('click', () => {
        if (isCtpRvnLayerVisible) { // 레이어가 보이는 경우
            map.removeLayer(ctpRvnLayer); // 레이어 제거
            ctpRvnLayerButton.textContent = '시도 레이어 켜기'; // 버튼 텍스트 변경
        } else { // 레이어가 숨겨진 경우
            map.addLayer(ctpRvnLayer); // 레이어 추가
            ctpRvnLayerButton.textContent = '시도 레이어 끄기'; // 버튼 텍스트 변경
        }
        isCtpRvnLayerVisible = !isCtpRvnLayerVisible; // 상태 토글
    });

    // 시군구 레이어 On/Off 버튼 이벤트 리스너 추가
    const sigLayerButton = document.getElementById('sigLayerButton');
    let isSigLayerVisible = true; // 초기 상태: 레이어 보임

    sigLayerButton.addEventListener('click', () => {
        if (isSigLayerVisible) { // 레이어가 보이는 경우
            map.removeLayer(ctpRvnLayer); // 레이어 제거
            sigLayerButton.textContent = '시군구 레이어 켜기'; // 버튼 텍스트 변경
        } else { // 레이어가 숨겨진 경우
            map.addLayer(ctpRvnLayer); // 레이어 추가
            sigLayerButton.textContent = '시군구 레이어 끄기'; // 버튼 텍스트 변경
        }
        isSigLayerVisible = !isSigLayerVisible; // 상태 토글
    });

}

// 검색 유형 변경 처리 함수
function handleSearchTypeChange() {
    const searchType = document.querySelector('input[name="searchType"]:checked').value; // 선택된 검색 유형
    const regionSearch = document.getElementById('regionSearch'); // 지역 검색 요소
    const nameSearch = document.getElementById('nameSearch'); // 이름 검색 요소

    if (searchType === 'region') { // 지역 검색 선택
        regionSearch.style.display = 'block'; // 지역 검색 보이기
        nameSearch.style.display = 'none'; // 이름 검색 숨기기
    } else if (searchType === 'name') { // 이름 검색 선택
        regionSearch.style.display = 'none'; // 지역 검색 숨기기
        nameSearch.style.display = 'block'; // 이름 검색 보이기
    }
}

// "지도에서 보기" 버튼 클릭 이벤트 리스너 추가 함수
export function addViewOnMapButtonEvent(siteDiv, site) {
    siteDiv.querySelector('.viewOnMapButton').addEventListener('click', () => {
        const lat = parseFloat(site.latitude); // 캠핑장의 위도
        const lon = parseFloat(site.longitude); // 캠핑장의 경도

        // 선택된 캠핑장으로 지도 이동
        map.getView().setCenter(fromLonLat([lon, lat]));
        map.getView().setZoom(15); // 줌 레벨 설정

        // 선택된 캠핑장에 대한 상세 정보 가져오기
        fetchCampingSiteDetails(site.id);
    });
}