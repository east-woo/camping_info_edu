package com.wavus.edu.gis.camping_info.service;

import com.wavus.edu.gis.camping_info.support.error.ApiException;
import com.wavus.edu.gis.camping_info.domain.mapper.CampingInfoMapper;
import com.wavus.edu.gis.camping_info.domain.vo.CampingOriginalSiteVo;
import com.wavus.edu.gis.camping_info.support.error.ErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class CampingInfoService {

    private final CampingInfoMapper campingInfoMapper;

    public CampingInfoService(CampingInfoMapper campingInfoMapper) {
        this.campingInfoMapper = campingInfoMapper;
    }

    public CampingOriginalSiteVo findById(Long id) {
        CampingOriginalSiteVo vo = campingInfoMapper.findById(id);

        if (vo == null) {
            throw new ApiException(ErrorCode.CAMP_NOT_FOUND);
        }
        return vo;
    }

    public List<CampingOriginalSiteVo> findByRegion(Integer ctprvnCd, Integer sigCd) {
        return campingInfoMapper.findByRegion(ctprvnCd, sigCd);
    }

    public List<CampingOriginalSiteVo> findByName(String facilityName) {
        return campingInfoMapper.findByFacilityName(facilityName);
    }
}