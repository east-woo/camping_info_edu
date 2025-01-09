import { campingPop, map } from './map';
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {Feature} from "ol";
import {Point} from "ol/geom";
import {fromLonLat} from "ol/proj";
import {Icon, Style} from "ol/style";
import {fetchCampingSiteDetails} from "./api";
import {getAuxiliaryFacilities, getNearbyFacilities, getOperatingSeasons} from "./helpers";

// 캠핑장 상세 정보 팝업 열기
export function openCampingSitePopup(site) {
    console.log(site)
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
    campingPop.setPosition(coordinates);
    popup.style.display = 'block';

    // 팝업 닫기 버튼 이벤트
    document.getElementById('popupCloseButton').addEventListener('click', () => {
        campingPop.setPosition(undefined); // 팝업 닫기
        popup.style.display = 'none';
    });
}

// 캠핑장 결과 표시
export function displayCampingSites(data) {
    console.log("AAA")
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