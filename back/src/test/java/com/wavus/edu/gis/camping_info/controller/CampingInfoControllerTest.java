package com.wavus.edu.gis.camping_info.controller;


import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
class CampingInfoControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    @DisplayName("캠핑장 ID 조회 성공")
    void findById_success() throws Exception {

        mockMvc.perform(get("/camping-info/id")
                        .param("id", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists());
    }

    @Test
    @DisplayName("존재하지 않는 캠핑장 조회 시 NOT_FOUND 반환")
    void findById_notFound() throws Exception {

        mockMvc.perform(get("/camping-info/id")
                        .param("id", "999999"))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("지역 검색 성공")
    void findByRegion_success() throws Exception {

        mockMvc.perform(get("/camping-info/region")
                        .param("ctprvnCd", "11"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("지역코드 없을 때 BAD_REQUEST 반환")
    void findByRegion_badRequest() throws Exception {

        mockMvc.perform(get("/camping-info/region"))
                .andExpect(status().isBadRequest());
    }
}