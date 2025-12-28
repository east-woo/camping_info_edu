package com.wavus.edu.gis.camping_info.service;

import com.wavus.edu.gis.camping_info.support.error.ApiException;
import com.wavus.edu.gis.camping_info.domain.mapper.AreaCodeMapper;
import com.wavus.edu.gis.camping_info.domain.vo.CtpRvnVo;
import com.wavus.edu.gis.camping_info.support.error.ErrorCode;
import com.wavus.edu.gis.camping_info.domain.vo.SigVo;
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
        List<SigVo> result = areaCodeMapper.findSigList(ctprvnCd);

        if (result.isEmpty()) {
            throw new ApiException(ErrorCode.AREA_NOT_FOUND);
        }

        return result;
    }
}
