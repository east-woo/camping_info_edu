package com.wavus.edu.gis.camping_info.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;

@OpenAPIDefinition(
        info = @Info(
                title = "(2025 WAVUS GIS 프로그래밍 신입사원 교육) 캠핑장 정보 API",
                version = "1.0.0",
                description = "이 API는 캠핑장 정보, 시설, 편의시설 등을 관리하고 검색할 수 있도록 제공합니다.",
                contact = @Contact(
                        name = "웨이버스 기술연구소 서동우 대리",
                        email = "dwseo96@wavus.co.kr"
                )
        )
)public class OpenApiConfig {
    
}