import 'ol/ol.css'; // OpenLayers 스타일 가져오기
import { initMap } from './map'; // 지도 초기화 관련 모듈 가져오기
import { setupEventListeners } from './events';  // 이벤트 설정 관련 모듈 가져오기
import { fetchCtpRvnList } from './api'; // API 호출 관련 모듈 가져오기

function main() {
    initMap(); // 지도를 초기화합니다.
    setupEventListeners(); // 이벤트 리스너를 설정합니다.

    // 시도 목록을 가져와 드롭다운 메뉴에 추가합니다.
    fetchCtpRvnList().then((data) => {
        const cityCodeSelect = document.getElementById('cityCode'); // 시도 선택 드롭다운 엘리먼트를 가져옵니다.
        data.forEach((item) => {
            const option = document.createElement('option'); // 새로운 <option> 엘리먼트를 생성합니다.
            option.value = item.ctprvnCd;// 시도 코드 값을 설정합니다.
            option.textContent = item.ctpKorNm; // 시도 이름(한글)을 설정합니다.
            cityCodeSelect.appendChild(option); // 드롭다운 메뉴에 옵션을 추가합니다.
        });
    });
}
// DOM이 로드된 후 메인 함수를 실행합니다.
document.addEventListener('DOMContentLoaded', main);