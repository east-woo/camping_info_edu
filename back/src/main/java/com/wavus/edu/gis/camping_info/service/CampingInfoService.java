package com.wavus.edu.gis.camping_info.service;

import com.wavus.edu.gis.camping_info.mapper.CampingInfoMapper;
import com.wavus.edu.gis.camping_info.vo.CampingOriginalSiteVo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class CampingInfoService {
    private final CampingInfoMapper campingInfoMapper;

    public CampingInfoService(CampingInfoMapper campingInfoMapper) {
        this.campingInfoMapper = campingInfoMapper;
    }

    // ID로 검색하여 DTO 반환
    public Optional<CampingOriginalSiteVo> findById(Long id) {
        return campingInfoMapper.findById(id);
    }

    public List<CampingOriginalSiteVo> findByRegion(Integer ctprvnCd, Integer sigCd) {
        return campingInfoMapper.findByRegion(ctprvnCd, sigCd);
    }

    // Facility Name으로 검색 후 DTO 리스트 반환
    public List<CampingOriginalSiteVo> findByName(String facilityName) {
        return campingInfoMapper.findByFacilityName(facilityName);
    }
}
