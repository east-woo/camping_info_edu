package com.wavus.edu.gis.camping_info.support.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    // 공통
    INVALID_INPUT("COMMON-001", "잘못된 요청입니다.", HttpStatus.BAD_REQUEST),
    INVALID_PARAMETER_TYPE("COMMON-002", "요청 파라미터 형식이 올바르지 않습니다.", HttpStatus.BAD_REQUEST),
    INTERNAL_ERROR("COMMON-999", "서버 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR),

    // 지역 코드
    AREA_NOT_FOUND("AREA-001", "존재하지 않는 시도 코드입니다.", HttpStatus.NOT_FOUND),

    // 캠핑장
    CAMP_NOT_FOUND("CAMP-001", "캠핑장 정보가 존재하지 않습니다.", HttpStatus.NOT_FOUND);

    private final String code;
    private final String message;
    private final HttpStatus status;
}