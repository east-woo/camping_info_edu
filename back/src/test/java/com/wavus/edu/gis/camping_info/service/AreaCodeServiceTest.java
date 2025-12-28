package com.wavus.edu.gis.camping_info.service;

import com.wavus.edu.gis.camping_info.domain.mapper.AreaCodeMapper;
import com.wavus.edu.gis.camping_info.domain.vo.CtpRvnVo;
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
class AreaCodeServiceTest {

    @Mock
    AreaCodeMapper areaCodeMapper;

    @InjectMocks
    AreaCodeService areaCodeService;

    @Test
    @DisplayName("시도 코드 전체 조회 성공")
    void getAllCtpRvn_success() {
        // Given
        given(areaCodeMapper.findCtpRvnAll())
                .willReturn(List.of(new CtpRvnVo()));

        // When
        List<CtpRvnVo> result = areaCodeService.getAllCtpRvn();

        // Then
        assertThat(result).isNotEmpty();
    }

    @Test
    @DisplayName("존재하지 않는 시도 코드 조회 시 ApiException 발생")
    void getSigList_notFound_throwsException() {
        // Given
        String wrongCode = "99";
        given(areaCodeMapper.findSigList(wrongCode))
                .willReturn(List.of());

        // When & Then
        assertThrows(ApiException.class,
                () -> areaCodeService.getSigList(wrongCode));
    }
}
