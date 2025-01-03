package com.wavus.edu.gis.camping_info.mapper;

import com.wavus.edu.gis.camping_info.vo.CampingOriginalSiteVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;

@Mapper
public interface CampingInfoMapper {

    // ID로 검색
    Optional<CampingOriginalSiteVo> findById(Long id);

    // City Province Name으로 검색
    List<CampingOriginalSiteVo> findByCityProvinceName(String cityProvinceName);

    // City County District Name으로 검색
    List<CampingOriginalSiteVo> findByCityCountyDistrictName(String cityCountyDistrictName);

    // Facility Name으로 검색 (포함 검색)
    List<CampingOriginalSiteVo> findByFacilityNameContaining(String facilityName);
}