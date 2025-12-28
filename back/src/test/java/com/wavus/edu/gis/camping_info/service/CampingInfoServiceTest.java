package com.wavus.edu.gis.camping_info.service;


import com.wavus.edu.gis.camping_info.domain.mapper.CampingInfoMapper;
import com.wavus.edu.gis.camping_info.domain.vo.CampingOriginalSiteVo;
import com.wavus.edu.gis.camping_info.support.error.ApiException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class CampingInfoServiceTest {

    @Mock
    CampingInfoMapper campingInfoMapper;

    @InjectMocks
    CampingInfoService campingInfoService;

    @Test
    @DisplayName("캠핑장 ID 조회 성공")
    void findById_success() {
        // Given
        Long id = 1L;
        given(campingInfoMapper.findById(id))
                .willReturn(new CampingOriginalSiteVo());

        // When
        CampingOriginalSiteVo vo = campingInfoService.findById(id);

        // Then
        assertThat(vo).isNotNull();
    }

    @Test
    @DisplayName("존재하지 않는 ID 조회 시 ApiException 발생")
    void findById_notFound() {
        // Given
        Long wrongId = 999L;
        given(campingInfoMapper.findById(wrongId))
                .willReturn(null);

        // When & Then
        assertThrows(ApiException.class,
                () -> campingInfoService.findById(wrongId));
    }

    @Test
    @DisplayName("지역 코드 조회 성공")
    void findByRegion_success() {
        // Given
        given(campingInfoMapper.findByRegion(11, 11740))
                .willReturn(List.of(new CampingOriginalSiteVo()));

        // When
        List<CampingOriginalSiteVo> list = campingInfoService.findByRegion(11, 11740);

        // Then
        assertThat(list).isNotEmpty();
    }
}
