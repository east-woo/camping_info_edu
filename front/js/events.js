import {fetchCtpRvnList, fetchSigList, fetchCampingSiteDetails, fetchCampingSites, fetchCampingSiteByName} from './api';
import { displayCampingSites } from './overlay';
import { map, ctpRvnLayer } from './map';

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
                console.log(data); // 데이터 확인
                displayCampingSites(data);
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
    });


    // 레이어 On/Off 기능
    const toggleLayerButton = document.getElementById('toggleLayerButton');
    let isLayerVisible = true; // 레이어가 처음에 보이도록 설정

    toggleLayerButton.addEventListener('click', () => {
        if (isLayerVisible) {
            map.removeLayer(ctpRvnLayer);
            toggleLayerButton.textContent = '시도 레이어 켜기';
        } else {
            map.addLayer(ctpRvnLayer);
            toggleLayerButton.textContent = '시도 레이어 끄기';
        }
        isLayerVisible = !isLayerVisible; // 상태 토글
    });


    // 레이어 On/Off 기능
    const toggleLayerButton2 = document.getElementById('toggleLayerButton2');
    let isLayerVisible2 = true; // 레이어가 처음에 보이도록 설정

    toggleLayerButton2.addEventListener('click', () => {
        if (isLayerVisible2) {
            map.removeLayer(ctpRvnLayer);
            toggleLayerButton2.textContent = '시군구 레이어 켜기';
        } else {
            map.addLayer(ctpRvnLayer);
            toggleLayerButton2.textContent = '시군구 레이어 끄기';
        }
        isLayerVisible2 = !isLayerVisible2; // 상태 토글
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