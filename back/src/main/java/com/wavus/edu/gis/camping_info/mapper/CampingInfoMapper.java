package com.wavus.edu.gis.camping_info.mapper;

import com.wavus.edu.gis.camping_info.vo.CampingOriginalSiteVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;

@Mapper
public interface CampingInfoMapper {

    // ID로 검색
    Optional<CampingOriginalSiteVo> findById(Long id);

    List<CampingOriginalSiteVo> findByRegion(Integer ctprvnCd, Integer sigCd);

    // Facility Name으로 검색 (포함 검색)
    List<CampingOriginalSiteVo> findByFacilityName(String facilityName);
}