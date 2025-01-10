// 운영 시즌, 보조 시설, 근처 명소를 가져오는 헬퍼 함수들

// 캠핑장의 운영 시즌 정보를 가져오는 함수
export function getOperatingSeasons(site) {
    const seasons = [];
    if (site.operateWeekdaysYn) seasons.push('주중'); // 주중 운영 여부
    if (site.operateWeekendsYn) seasons.push('주말'); // 주말 운영 여부
    if (site.operateSpringYn) seasons.push('봄'); // 봄 운영 여부
    if (site.operateSummerYn) seasons.push('여름'); // 여름 운영 여부
    if (site.operateFallYn) seasons.push('가을'); // 가을 운영 여부
    if (site.operateWinterYn) seasons.push('겨울'); // 겨울 운영 여부
    return seasons.join(', ') || 'N/A'; // 운영 시즌 정보를 문자열로 반환 (없을 경우 'N/A')
}

// 캠핑장의 보조 시설 정보를 가져오는 함수
export function getAuxiliaryFacilities(site) {
    const facilities = [];
    if (site.electricityAuxiliaryFacilitiesYn) facilities.push('전기'); // 전기 제공 여부
    if (site.hotWaterAuxiliaryFacilitiesYn) facilities.push('온수'); // 온수 제공 여부
    if (site.wirelessInternetAuxiliaryFacilitiesYn) facilities.push('무선 인터넷'); // 무선 인터넷 제공 여부
    if (site.firewoodSalesAuxiliaryFacilitiesYn) facilities.push('장작 판매'); // 장작 판매 여부
    if (site.promenadeAuxiliaryFacilitiesYn) facilities.push('산책로'); // 산책로 여부
    if (site.waterParkAuxiliaryFacilitiesYn) facilities.push('워터파크'); // 워터파크 여부
    if (site.playgroundAuxiliaryFacilitiesYn) facilities.push('놀이터'); // 놀이터 여부
    if (site.martAuxiliaryFacilitiesYn) facilities.push('마트'); // 마트 여부
    return facilities.join(', ') || 'N/A'; // 보조 시설 정보를 문자열로 반환 (없을 경우 'N/A')
}

// 캠핑장 근처의 명소 정보를 가져오는 함수
export function getNearbyFacilities(site) {
    const facilities = [];
    if (site.fishingNearbyFacilitiesYn) facilities.push('낚시'); // 낚시 가능 여부
    if (site.promenadeNearbyFacilitiesYn) facilities.push('산책로'); // 산책로 여부
    if (site.waterPlaySeaBathingNearbyFacilitiesYn) facilities.push('바다 수영'); // 바다 수영 가능 여부
    if (site.waterPlaySeaLeisureNearbyFacilitiesYn) facilities.push('바다 레저'); // 바다 레저 가능 여부
    if (site.waterPlayValleyNearbyFacilitiesYn) facilities.push('계곡'); // 계곡 여부
    if (site.waterPlayRiverNearbyFacilitiesYn) facilities.push('강'); // 강 여부
    if (site.waterPlayPoolNearbyFacilitiesYn) facilities.push('수영장'); // 수영장 여부
    if (site.youthExperienceFacilityNearbyFacilitiesYn) facilities.push('청소년 체험'); // 청소년 체험 시설 여부
    if (site.ruralExperienceFacilityNearbyFacilitiesYn) facilities.push('농촌 체험'); // 농촌 체험 시설 여부
    if (site.childrensPlayFacilityNearbyFacilitiesYn) facilities.push('어린이 놀이터'); // 어린이 놀이터 여부
    return facilities.join(', ') || 'N/A'; // 근처 명소 정보를 문자열로 반환 (없을 경우 'N/A')
}
