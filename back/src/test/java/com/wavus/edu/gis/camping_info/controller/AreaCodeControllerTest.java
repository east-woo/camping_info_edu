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
class AreaCodeControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    @DisplayName("시도 코드 목록 조회 성공")
    void getAllCtpRvn_success() throws Exception {
        mockMvc.perform(get("/api/area-code/ctpRvn/list"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    @DisplayName("존재하지 않는 시도 코드 요청 시 NOT_FOUND 반환")
    void getSigList_notFound() throws Exception {

        mockMvc.perform(get("/api/area-code/sig/list")
                        .param("ctprvnCd", "99"))
                .andExpect(status().isNotFound());
    }
}