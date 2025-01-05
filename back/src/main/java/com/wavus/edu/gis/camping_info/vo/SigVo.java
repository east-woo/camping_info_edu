package com.wavus.edu.gis.camping_info.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

/**
 * packageName    : com.wavus.edu.gis.camping_info.dto
 * fileName       : SgiDto
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

@Schema(description = "시군구 정보")
public class SigVo {
    @Schema(description = "시군구 코드", example = "11740")
    private String sigCd;

    @Schema(description = "시군구 영어명", example = "Seongnam")
    private String sigEngNm;

    @Schema(description = "시군구 한글명", example = "성남")
    private String sigKorNm;
}
