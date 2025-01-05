package com.wavus.edu.gis.camping_info.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "캠핑장 정보")
public class CampingOriginalSiteVo {
    @Schema(description = "캠핑장 아이디", example = "1", required = true)
    private Long id;

    @Schema(description = "캠핑장 이름", example = "(유)금강 두승산 글램핑", required = true)
    private String facilityName;

    @Schema(description = "카테고리", example = "글램핑")
    private String category;

    @Schema(description = "시도 명칭", example = "서울특별시")
    private String cityProvinceName;

    @Schema(description = "시군구 명칭", example = "강남구")
    private String cityCountyDistrictName;

    @Schema(description = "법정읍면동명칭", example = "역삼동")
    private String administrativeAreaName;

    @Schema(description = "리 명칭", example = "역삼리")
    private String riName;

    @Schema(description = "번지", example = "123-456")
    private String streetAddress;

    @Schema(description = "도로명 이름", example = "강남대로")
    private String roadName;

    @Schema(description = "건물 번호", example = "101")
    private String buildingNumber;

    @Schema(description = "위도", example = "37.5665")
    private Double latitude;

    @Schema(description = "경도", example = "126.9780")
    private Double longitude;

    @Schema(description = "우편번호", example = "12345")
    private String postalCode;

    @Schema(description = "도로명 주소", example = "서울특별시 강남구 강남대로 123")
    private String streetNameAddress;

    @Schema(description = "지번 주소", example = "서울특별시 강남구 역삼동 123-456")
    private String fullStreetAddress;

    @Schema(description = "전화번호", example = "010-1234-5678")
    private String telephoneNumber;

    @Schema(description = "홈페이지", example = "http://www.sunnycampsite.com")
    private String website;

    @Schema(description = "사업주체", example = "Sunny Co.")
    private String businessEntity;

    @Schema(description = "평일 운영 여부", example = "true")
    private Boolean operateWeekdaysYn;

    @Schema(description = "주말 운영 여부", example = "true")
    private Boolean operateWeekendsYn;

    @Schema(description = "봄 운영 여부", example = "true")
    private Boolean operateSpringYn;

    @Schema(description = "여름 운영 여부", example = "true")
    private Boolean operateSummerYn;

    @Schema(description = "가을 운영 여부", example = "true")
    private Boolean operateFallYn;

    @Schema(description = "겨울 운영 여부", example = "true")
    private Boolean operateWinterYn;

    @Schema(description = "부대시설 전기 여부", example = "true")
    private Boolean electricityAuxiliaryFacilitiesYn;

    @Schema(description = "부대시설 온수 여부", example = "true")
    private Boolean hotWaterAuxiliaryFacilitiesYn;

    @Schema(description = "부대시설 무선인터넷 여부", example = "true")
    private Boolean wirelessInternetAuxiliaryFacilitiesYn;

    @Schema(description = "부대시설 장작판매 여부", example = "false")
    private Boolean firewoodSalesAuxiliaryFacilitiesYn;

    @Schema(description = "부대시설 산책로 여부", example = "true")
    private Boolean promenadeAuxiliaryFacilitiesYn;

    @Schema(description = "부대시설 물놀이장 여부", example = "true")
    private Boolean waterParkAuxiliaryFacilitiesYn;

    @Schema(description = "부대시설 놀이터 여부", example = "true")
    private Boolean playgroundAuxiliaryFacilitiesYn;

    @Schema(description = "부대시설 마트 여부", example = "false")
    private Boolean martAuxiliaryFacilitiesYn;

    @Schema(description = "부대시설 화장실 수", example = "10")
    private Integer restroomsAuxiliaryFacilities;

    @Schema(description = "부대시설 샤워실 수", example = "5")
    private Integer showerRoomsAuxiliaryFacilities;

    @Schema(description = "부대시설 씽크대 수", example = "2")
    private Integer sinksAuxiliaryFacilities;

    @Schema(description = "부대시설 소화기 수", example = "4")
    private Integer fireExtinguishersAuxiliaryFacilities;

    @Schema(description = "주변 시설 낚시 여부", example = "true")
    private Boolean fishingNearbyFacilitiesYn;

    @Schema(description = "주변 시설 산책로 여부", example = "true")
    private Boolean promenadeNearbyFacilitiesYn;

    @Schema(description = "주변 시설 물놀이(해수욕) 여부", example = "false")
    private Boolean waterPlaySeaBathingNearbyFacilitiesYn;

    @Schema(description = "주변 시설 물놀이(수상레저) 여부", example = "true")
    private Boolean waterPlaySeaLeisureNearbyFacilitiesYn;

    @Schema(description = "주변 시설 물놀이(계곡) 여부", example = "false")
    private Boolean waterPlayValleyNearbyFacilitiesYn;

    @Schema(description = "주변 시설 물놀이(강) 여부", example = "false")
    private Boolean waterPlayRiverNearbyFacilitiesYn;

    @Schema(description = "주변 시설 물놀이(수영장) 여부", example = "true")
    private Boolean waterPlayPoolNearbyFacilitiesYn;

    @Schema(description = "주변 시설 청소년체험시설 여부", example = "true")
    private Boolean youthExperienceFacilityNearbyFacilitiesYn;

    @Schema(description = "주변 시설 농어촌체험시설 여부", example = "false")
    private Boolean ruralExperienceFacilityNearbyFacilitiesYn;

    @Schema(description = "주변 시설 어린이놀이시설 여부", example = "true")
    private Boolean childrensPlayFacilityNearbyFacilitiesYn;

    @Schema(description = "글램핑 침대 여부", example = "true")
    private Boolean glampingBedYn;

    @Schema(description = "글램핑 티비 여부", example = "true")
    private Boolean glampingTvYn;

    @Schema(description = "글램핑 냉장고 여부", example = "true")
    private Boolean glampingRefrigeratorYn;

    @Schema(description = "글램핑 유무선인터넷 여부", example = "true")
    private Boolean glampingInternetWiredWirelessYn;

    @Schema(description = "글램핑 내부화장실 여부", example = "true")
    private Boolean glampingInteriorRestroomYn;

    @Schema(description = "글램핑 에어컨 여부", example = "true")
    private Boolean glampingAirConditionerYn;

    @Schema(description = "글램핑 난방기구 여부", example = "true")
    private Boolean glampingHeatingEquipmentYn;

    @Schema(description = "글램핑 취사도구 여부", example = "true")
    private Boolean glampingCookingUtensilsYn;

    @Schema(description = "시설 특징", example = "강남의 가장 인기 있는 캠핑장")
    private String facilityFeatures;

    @Schema(description = "시설 소개", example = "이 캠핑장은 가족과 함께 즐길 수 있는 다양한 활동을 제공합니다.")
    private String facilityIntroduction;

    @Schema(description = "최종 작성일", example = "2025-01-01")
    private LocalDate lastWrittenDate;

}
