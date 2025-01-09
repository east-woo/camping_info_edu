import 'ol/ol.css'; // OpenLayers styles

import { initMap } from './map';
import { setupEventListeners } from './events';
import { fetchCtpRvnList } from './api';

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
    });
}

document.addEventListener('DOMContentLoaded', main);