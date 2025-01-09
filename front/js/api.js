import { openCampingSitePopup } from "./overlay";

const BASE_URL = process.env.PARCEL_BASE_URL;
console.log('Base URL:', BASE_URL);

// 시도 목록 가져오기 (city/province codes)
export function fetchCtpRvnList() {
    return fetch(`${BASE_URL}/api/area-code/ctpRvn/list`)
        .then((response) => response.json())
        .catch((error) => console.error('Error fetching city codes:', error));
}

// 선택된 시도 코드에 기반한 시군구 목록 가져오기 (district codes)
export function fetchSigList(ctprvnCd) {
    if (ctprvnCd) {
        return fetch(`${BASE_URL}/api/area-code/sig/list?ctprvnCd=${ctprvnCd}`)
            .then((response) => response.json())
            .catch((error) => console.error('Error fetching district codes:', error));
    }
    return Promise.resolve([]);
}

// 캠핑장 상세 정보 가져오기
export function fetchCampingSiteDetails(siteId) {
    fetch(`${BASE_URL}/api/camping-info/id?id=${siteId}`)
        .then(response => response.json())
        .then(data => {
            // Open modal with detailed information about the selected camping site
            openCampingSitePopup(data);
        })
        .catch(error => {
            console.error('Error fetching camping site details:', error);
        });
}

// 선택된 시도와 시군구 코드에 기반한 캠핑장 정보 가져오기
export function fetchCampingSites(ctprvnCd, sigCd) {
    const url = `${BASE_URL}/api/camping-info/region?ctprvnCd=${ctprvnCd}&sigCd=${sigCd}`;
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error('Error fetching camping sites:', error));
}

// 캠핑장 이름으로 검색
export function fetchCampingSiteByName(facilityName) {
    const url = `${BASE_URL}/api/camping-info/name?facilityName=${encodeURIComponent(facilityName)}`;
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to fetch camping sites: ${response.statusText}`);
            }
            return response.json();
        })
        .catch((error) => {
            console.error('Error fetching camping sites by name:', error);
            throw error;
        });
}
