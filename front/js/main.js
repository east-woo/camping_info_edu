import 'ol/ol.css'; // OpenLayers 스타일 가져오기
import { initMap } from './map'; // 지도 초기화 관련 모듈 가져오기
import { setupEventListeners } from './events';  // 이벤트 설정 관련 모듈 가져오기
import { fetchCtpRvnList } from './api'; // API 호출 관련 모듈 가져오기

async function main() {
    await initMap();              // ✅ 반드시 await
    setupEventListeners();

    const data = await fetchCtpRvnList();
    const cityCodeSelect = document.getElementById('cityCode');

    data.forEach((item) => {
        const option = document.createElement('option');
        option.value = item.ctprvnCd;
        option.textContent = item.ctpKorNm;
        cityCodeSelect.appendChild(option);
    });
}
// DOM이 로드된 후 메인 함수를 실행합니다.
document.addEventListener('DOMContentLoaded', main);