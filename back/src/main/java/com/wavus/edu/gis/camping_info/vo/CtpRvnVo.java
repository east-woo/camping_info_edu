package com.wavus.edu.gis.camping_info.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

/**
 * packageName    : com.wavus.edu.gis.camping_info.dto
 * fileName       : CtpRvnDTO
 * author         : dongwoo
 * date           : 2025-01-05
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-05        dongwoo       최초 생성
 */
@Getter
@Setter
@Schema(description = "시도 정보")
public class CtpRvnVo {
    @Schema(description = "시도 코드", example = "11")
    private String ctprvnCd;

    @Schema(description = "시도 영어명", example = "Gyeonggi")
    private String ctpEngNm;

    @Schema(description = "시도 한글명", example = "경기")
    private String ctpKorNm;
}
