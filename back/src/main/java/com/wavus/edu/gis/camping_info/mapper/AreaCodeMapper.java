package com.wavus.edu.gis.camping_info.mapper;

import com.wavus.edu.gis.camping_info.vo.CtpRvnVo;
import com.wavus.edu.gis.camping_info.vo.SigVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * packageName    : com.wavus.edu.gis.camping_info.mapper
 * fileName       : AreaCodeMapper
 * author         : dongwoo
 * date           : 2025-01-05
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-05        dongwoo       최초 생성
 */
@Mapper
public interface AreaCodeMapper {

    List<CtpRvnVo> findCtpRvnAll();

    List<SigVo> findSigList(String ctprvnCd);
}
