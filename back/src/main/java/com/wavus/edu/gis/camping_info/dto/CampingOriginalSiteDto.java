package com.wavus.edu.gis.camping_info.dto;

import com.wavus.edu.gis.camping_info.vo.CampingOriginalSiteVo;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Optional;


@Getter
@Setter
public class CampingOriginalSiteDto {
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

    // VO -> DTO 변환 메서드
    public static CampingOriginalSiteDto from(CampingOriginalSiteVo vo) {
        if (vo == null) {
            return null;
        }

        CampingOriginalSiteDto dto = new CampingOriginalSiteDto();
        dto.setId(vo.getId());
        dto.setFacilityName(vo.getFacilityName());
        dto.setCategory(vo.getCategory());
        dto.setCityProvinceName(vo.getCityProvinceName());
        dto.setCityCountyDistrictName(vo.getCityCountyDistrictName());
        dto.setAdministrativeAreaName(vo.getAdministrativeAreaName());
        dto.setRiName(vo.getRiName());
        dto.setStreetAddress(vo.getStreetAddress());
        dto.setRoadName(vo.getRoadName());
        dto.setBuildingNumber(vo.getBuildingNumber());
        dto.setLatitude(vo.getLatitude());
        dto.setLongitude(vo.getLongitude());
        dto.setPostalCode(vo.getPostalCode());
        dto.setStreetNameAddress(vo.getStreetNameAddress());
        dto.setFullStreetAddress(vo.getFullStreetAddress());
        dto.setTelephoneNumber(vo.getTelephoneNumber());
        dto.setWebsite(vo.getWebsite());
        dto.setBusinessEntity(vo.getBusinessEntity());
        dto.setOperateWeekdaysYn(Optional.ofNullable(vo.getOperateWeekdaysYn()).orElse(false));
        dto.setOperateWeekendsYn(Optional.ofNullable(vo.getOperateWeekendsYn()).orElse(false));
        dto.setOperateSpringYn(Optional.ofNullable(vo.getOperateSpringYn()).orElse(false));
        dto.setOperateSummerYn(Optional.ofNullable(vo.getOperateSummerYn()).orElse(false));
        dto.setOperateFallYn(Optional.ofNullable(vo.getOperateFallYn()).orElse(false));
        dto.setOperateWinterYn(Optional.ofNullable(vo.getOperateWinterYn()).orElse(false));
        dto.setElectricityAuxiliaryFacilitiesYn(Optional.ofNullable(vo.getElectricityAuxiliaryFacilitiesYn()).orElse(false));
        dto.setHotWaterAuxiliaryFacilitiesYn(Optional.ofNullable(vo.getHotWaterAuxiliaryFacilitiesYn()).orElse(false));
        dto.setWirelessInternetAuxiliaryFacilitiesYn(Optional.ofNullable(vo.getWirelessInternetAuxiliaryFacilitiesYn()).orElse(false));
        dto.setFirewoodSalesAuxiliaryFacilitiesYn(Optional.ofNullable(vo.getFirewoodSalesAuxiliaryFacilitiesYn()).orElse(false));
        dto.setPromenadeAuxiliaryFacilitiesYn(Optional.ofNullable(vo.getPromenadeAuxiliaryFacilitiesYn()).orElse(false));
        dto.setWaterParkAuxiliaryFacilitiesYn(Optional.ofNullable(vo.getWaterParkAuxiliaryFacilitiesYn()).orElse(false));
        dto.setPlaygroundAuxiliaryFacilitiesYn(Optional.ofNullable(vo.getPlaygroundAuxiliaryFacilitiesYn()).orElse(false));
        dto.setMartAuxiliaryFacilitiesYn(Optional.ofNullable(vo.getMartAuxiliaryFacilitiesYn()).orElse(false));
        dto.setRestroomsAuxiliaryFacilities(vo.getRestroomsAuxiliaryFacilities());
        dto.setShowerRoomsAuxiliaryFacilities(vo.getShowerRoomsAuxiliaryFacilities());
        dto.setSinksAuxiliaryFacilities(vo.getSinksAuxiliaryFacilities());
        dto.setFireExtinguishersAuxiliaryFacilities(vo.getFireExtinguishersAuxiliaryFacilities());
        dto.setFishingNearbyFacilitiesYn(Optional.ofNullable(vo.getFishingNearbyFacilitiesYn()).orElse(false));
        dto.setPromenadeNearbyFacilitiesYn(Optional.ofNullable(vo.getPromenadeNearbyFacilitiesYn()).orElse(false));
        dto.setWaterPlaySeaBathingNearbyFacilitiesYn(Optional.ofNullable(vo.getWaterPlaySeaBathingNearbyFacilitiesYn()).orElse(false));
        dto.setWaterPlaySeaLeisureNearbyFacilitiesYn(Optional.ofNullable(vo.getWaterPlaySeaLeisureNearbyFacilitiesYn()).orElse(false));
        dto.setWaterPlayValleyNearbyFacilitiesYn(Optional.ofNullable(vo.getWaterPlayValleyNearbyFacilitiesYn()).orElse(false));
        dto.setWaterPlayRiverNearbyFacilitiesYn(Optional.ofNullable(vo.getWaterPlayRiverNearbyFacilitiesYn()).orElse(false));
        dto.setWaterPlayPoolNearbyFacilitiesYn(Optional.ofNullable(vo.getWaterPlayPoolNearbyFacilitiesYn()).orElse(false));
        dto.setYouthExperienceFacilityNearbyFacilitiesYn(Optional.ofNullable(vo.getYouthExperienceFacilityNearbyFacilitiesYn()).orElse(false));
        dto.setRuralExperienceFacilityNearbyFacilitiesYn(Optional.ofNullable(vo.getRuralExperienceFacilityNearbyFacilitiesYn()).orElse(false));
        dto.setChildrensPlayFacilityNearbyFacilitiesYn(Optional.ofNullable(vo.getChildrensPlayFacilityNearbyFacilitiesYn()).orElse(false));
        dto.setGlampingBedYn(Optional.ofNullable(vo.getGlampingBedYn()).orElse(false));
        dto.setGlampingTvYn(Optional.ofNullable(vo.getGlampingTvYn()).orElse(false));
        dto.setGlampingRefrigeratorYn(Optional.ofNullable(vo.getGlampingRefrigeratorYn()).orElse(false));
        dto.setGlampingInternetWiredWirelessYn(Optional.ofNullable(vo.getGlampingInternetWiredWirelessYn()).orElse(false));
        dto.setGlampingInteriorRestroomYn(Optional.ofNullable(vo.getGlampingInteriorRestroomYn()).orElse(false));
        dto.setGlampingAirConditionerYn(Optional.ofNullable(vo.getGlampingAirConditionerYn()).orElse(false));
        dto.setGlampingHeatingEquipmentYn(Optional.ofNullable(vo.getGlampingHeatingEquipmentYn()).orElse(false));
        dto.setGlampingCookingUtensilsYn(Optional.ofNullable(vo.getGlampingCookingUtensilsYn()).orElse(false));
        dto.setFacilityFeatures(vo.getFacilityFeatures());
        dto.setFacilityIntroduction(vo.getFacilityIntroduction());
        dto.setLastWrittenDate(Optional.ofNullable(vo.getLastWrittenDate()).orElse(LocalDate.now())); // Default to current date

        return dto;
    }
}
