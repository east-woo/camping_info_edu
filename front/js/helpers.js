// 운영 시즌, 보조 시설, 근처 명소를 가져오는 헬퍼 함수들
export function getOperatingSeasons(site) {
    const seasons = [];
    if (site.operateWeekdaysYn) seasons.push('주중');
    if (site.operateWeekendsYn) seasons.push('주말');
    if (site.operateSpringYn) seasons.push('봄');
    if (site.operateSummerYn) seasons.push('여름');
    if (site.operateFallYn) seasons.push('가을');
    if (site.operateWinterYn) seasons.push('겨울');
    return seasons.join(', ') || 'N/A';
}

export function getAuxiliaryFacilities(site) {
    const facilities = [];
    if (site.electricityAuxiliaryFacilitiesYn) facilities.push('전기');
    if (site.hotWaterAuxiliaryFacilitiesYn) facilities.push('온수');
    if (site.wirelessInternetAuxiliaryFacilitiesYn) facilities.push('무선 인터넷');
    if (site.firewoodSalesAuxiliaryFacilitiesYn) facilities.push('장작 판매');
    if (site.promenadeAuxiliaryFacilitiesYn) facilities.push('산책로');
    if (site.waterParkAuxiliaryFacilitiesYn) facilities.push('워터파크');
    if (site.playgroundAuxiliaryFacilitiesYn) facilities.push('놀이터');
    if (site.martAuxiliaryFacilitiesYn) facilities.push('마트');
    return facilities.join(', ') || 'N/A';
}

export function getNearbyFacilities(site) {
    const facilities = [];
    if (site.fishingNearbyFacilitiesYn) facilities.push('낚시');
    if (site.promenadeNearbyFacilitiesYn) facilities.push('산책로');
    if (site.waterPlaySeaBathingNearbyFacilitiesYn) facilities.push('바다 수영');
    if (site.waterPlaySeaLeisureNearbyFacilitiesYn) facilities.push('바다 레저');
    if (site.waterPlayValleyNearbyFacilitiesYn) facilities.push('계곡');
    if (site.waterPlayRiverNearbyFacilitiesYn) facilities.push('강');
    if (site.waterPlayPoolNearbyFacilitiesYn) facilities.push('수영장');
    if (site.youthExperienceFacilityNearbyFacilitiesYn) facilities.push('청소년 체험');
    if (site.ruralExperienceFacilityNearbyFacilitiesYn) facilities.push('농촌 체험');
    if (site.childrensPlayFacilityNearbyFacilitiesYn) facilities.push('어린이 놀이터');
    return facilities.join(', ') || 'N/A';
}