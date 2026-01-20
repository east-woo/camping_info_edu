import {openCampingSitePopup} from "./overlay"; // 캠핑장 상세 정보를 표시하기 위한 팝업 관련 함수 가져오기
import { getConfig } from "./config";


// 시도 목록 가져오기
export async function fetchCtpRvnList() {
    try {
        const { API_BASE_URL } = await getConfig();
        const res = await fetch(`${API_BASE_URL}/area-code/ctpRvn/list`);
        return await res.json();
    } catch (error) {
        console.error("Error fetching city codes:", error);
        return [];
    }
}

// 시군구 목록 가져오기
export async function fetchSigList(ctprvnCd) {
    if (!ctprvnCd) return [];

    try {
        const { API_BASE_URL } = await getConfig();
        const res = await fetch(`${API_BASE_URL}/area-code/sig/list?ctprvnCd=${ctprvnCd}`);
        return await res.json();
    } catch (error) {
        console.error("Error fetching district codes:", error);
        return [];
    }
}

// 캠핑장 상세 정보 가져오기
export async function fetchCampingSiteDetails(siteId) {
    try {
        const { API_BASE_URL } = await getConfig();
        const res = await fetch(`${API_BASE_URL}/camping-info/id?id=${siteId}`);
        const data = await res.json();
        openCampingSitePopup(data);
    } catch (error) {
        console.error("Error fetching camping site details:", error);
    }
}

// 시도/시군구 기반 캠핑장 목록
export async function fetchCampingSites(ctprvnCd, sigCd) {
    try {
        const { API_BASE_URL } = await getConfig();
        const url = `${API_BASE_URL}/camping-info/region?ctprvnCd=${ctprvnCd}&sigCd=${sigCd}`;
        const res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.error("Error fetching camping sites:", error);
        return [];
    }
}

// 캠핑장 이름 검색
export async function fetchCampingSiteByName(facilityName) {
    try {
        const { API_BASE_URL } = await getConfig();
        const url = `${API_BASE_URL}/camping-info/name?facilityName=${encodeURIComponent(facilityName)}`;
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Failed to fetch camping sites: ${res.status} ${res.statusText}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Error fetching camping sites by name:", error);
        throw error;
    }
}