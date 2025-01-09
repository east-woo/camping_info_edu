import {fetchCampingSiteByName, fetchCampingSiteDetails, fetchCampingSites, fetchSigList} from './api';
import {displayCampingSites} from './overlay';
import {ctpRvnLayer, map, removeCampingPop} from './map';
import {fromLonLat} from "ol/proj";

export function setupEventListeners() {
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
        fetchCampingSites(ctprvnCd, sigCd)
            .then((data) => {
                displayCampingSites(data);
                removeCampingPop();
            })
    });

    document.getElementById('nameSearchButton').addEventListener('click', () => {
        const facilityName = document.getElementById('facilityName').value;
        if (!facilityName) {
            return alert('캠핑장 이름을 입력해주세요.');
        }
        fetchCampingSiteByName(facilityName)
            .then(displayCampingSites)
            .catch((error) => console.error('Error displaying camping sites:', error));
        removeCampingPop();
    });


    // 레이어 On/Off 기능
    const ctpRvnLayerButton = document.getElementById('ctpRvnLayerButton');
    let isCtpRvnLayerVisible = true; // 레이어가 처음에 보이도록 설정

    ctpRvnLayerButton.addEventListener('click', () => {
        if (isCtpRvnLayerVisible) {
            map.removeLayer(ctpRvnLayer);
            ctpRvnLayerButton.textContent = '시도 레이어 켜기';
        } else {
            map.addLayer(ctpRvnLayer);
            ctpRvnLayerButton.textContent = '시도 레이어 끄기';
        }
        isCtpRvnLayerVisible = !isCtpRvnLayerVisible; // 상태 토글
    });


    // 레이어 On/Off 기능
    const sigLayerButton = document.getElementById('sigLayerButton');
    let isSigLayerVisible = true; // 레이어가 처음에 보이도록 설정

    sigLayerButton.addEventListener('click', () => {
        if (isSigLayerVisible) {
            map.removeLayer(ctpRvnLayer);
            sigLayerButton.textContent = '시군구 레이어 켜기';
        } else {
            map.addLayer(ctpRvnLayer);
            sigLayerButton.textContent = '시군구 레이어 끄기';
        }
        isSigLayerVisible = !isSigLayerVisible; // 상태 토글
    });

}

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


// "지도에서 보기" 버튼 클릭 시, 클릭한 캠핑장으로 이동하고 상세 정보를 가져오는 이벤트 리스너를 추가하는 함수
export function addViewOnMapButtonEvent(siteDiv, site) {
    siteDiv.querySelector('.viewOnMapButton').addEventListener('click', () => {
        const lat = parseFloat(site.latitude);  // 위도
        const lon = parseFloat(site.longitude); // 경도

        // 선택된 캠핑장으로 지도 이동
        map.getView().setCenter(fromLonLat([lon, lat]));
        map.getView().setZoom(15); // 줌 레벨 설정

        // 선택된 캠핑장에 대한 상세 정보를 가져옵니다.
        fetchCampingSiteDetails(site.id);
    });
}