package com.wavus.edu.gis.camping_info.service;

import com.wavus.edu.gis.camping_info.mapper.AreaCodeMapper;
import com.wavus.edu.gis.camping_info.vo.CtpRvnVo;
import com.wavus.edu.gis.camping_info.vo.SigVo;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * packageName    : com.wavus.edu.gis.camping_info.service
 * fileName       : AreaCodeService
 * author         : dongwoo
 * date           : 2025-01-05
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-05        dongwoo       최초 생성
 */
@Service
public class AreaCodeService {
    private final AreaCodeMapper areaCodeMapper;

    public AreaCodeService(AreaCodeMapper areaCodeMapper) {
        this.areaCodeMapper = areaCodeMapper;
    }


    public List<CtpRvnVo> getAllCtpRvn() {
        return areaCodeMapper.findCtpRvnAll();
    }


    public List<SigVo> getSigList(String ctprvnCd) {
        return areaCodeMapper.findSigList(ctprvnCd);
    }
}
