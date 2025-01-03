package com.wavus.edu.gis.camping_info.vo;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CampingOriginalSiteVo {
    private Long id;
    private String facilityName;
    private String category;
    private String cityProvinceName;
    private String cityCountyDistrictName;
    private String administrativeAreaName;
    private String riName;
    private String streetAddress;
    private String roadName;
    private String buildingNumber;
    private Double latitude;
    private Double longitude;
    private String postalCode;
    private String streetNameAddress;
    private String fullStreetAddress;
    private String telephoneNumber;
    private String website;
    private String businessEntity;
    private Boolean operateWeekdaysYn;
    private Boolean operateWeekendsYn;
    private Boolean operateSpringYn;
    private Boolean operateSummerYn;
    private Boolean operateFallYn;
    private Boolean operateWinterYn;
    private Boolean electricityAuxiliaryFacilitiesYn;
    private Boolean hotWaterAuxiliaryFacilitiesYn;
    private Boolean wirelessInternetAuxiliaryFacilitiesYn;
    private Boolean firewoodSalesAuxiliaryFacilitiesYn;
    private Boolean promenadeAuxiliaryFacilitiesYn;
    private Boolean waterParkAuxiliaryFacilitiesYn;
    private Boolean playgroundAuxiliaryFacilitiesYn;
    private Boolean martAuxiliaryFacilitiesYn;
    private Integer restroomsAuxiliaryFacilities;
    private Integer showerRoomsAuxiliaryFacilities;
    private Integer sinksAuxiliaryFacilities;
    private Integer fireExtinguishersAuxiliaryFacilities;
    private Boolean fishingNearbyFacilitiesYn;
    private Boolean promenadeNearbyFacilitiesYn;
    private Boolean waterPlaySeaBathingNearbyFacilitiesYn;
    private Boolean waterPlaySeaLeisureNearbyFacilitiesYn;
    private Boolean waterPlayValleyNearbyFacilitiesYn;
    private Boolean waterPlayRiverNearbyFacilitiesYn;
    private Boolean waterPlayPoolNearbyFacilitiesYn;
    private Boolean youthExperienceFacilityNearbyFacilitiesYn;
    private Boolean ruralExperienceFacilityNearbyFacilitiesYn;
    private Boolean childrensPlayFacilityNearbyFacilitiesYn;
    private Boolean glampingBedYn;
    private Boolean glampingTvYn;
    private Boolean glampingRefrigeratorYn;
    private Boolean glampingInternetWiredWirelessYn;
    private Boolean glampingInteriorRestroomYn;
    private Boolean glampingAirConditionerYn;
    private Boolean glampingHeatingEquipmentYn;
    private Boolean glampingCookingUtensilsYn;
    private String facilityFeatures;
    private String facilityIntroduction;
    private LocalDate lastWrittenDate;

}
