package com.wavus.edu.gis.camping_info.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // 모든 출처에서 오는 요청을 허용
        registry.addMapping("/**")
                .allowedOriginPatterns("http://localhost:*")
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // 허용할 HTTP 메서드 설정
                .allowedHeaders("*")  // 모든 헤더를 허용
                .allowCredentials(true);  // 쿠키나 인증 정보를 요청에 포함시킬 수 있도록 허용
    }
}