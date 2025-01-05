package com.wavus.edu.gis.camping_info.controller;

import com.wavus.edu.gis.camping_info.service.AreaCodeService;
import com.wavus.edu.gis.camping_info.vo.CtpRvnVo;
import com.wavus.edu.gis.camping_info.vo.SigVo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * packageName    : com.wavus.edu.gis.camping_info.controller
 * fileName       : AreaCodeController
 * author         : dongwoo
 * date           : 2025-01-05
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-05        dongwoo       최초 생성
 */
@Tag(name = "area code API", description = "시도, 시군구 코드 API")
@RestController
@RequestMapping("/api/area-code")
public class AreaCodeController {

    private final AreaCodeService areaCodeService;

    public AreaCodeController(AreaCodeService areaCodeService) {
        this.areaCodeService = areaCodeService;
    }

    @GetMapping("/ctpRvn/list")
    @Operation(
            summary = "시도 코드 목록 조회",
            description = "전체 시도 코드 목록을 조회합니다."
    )
    public ResponseEntity<List<CtpRvnVo>> getAllCtpRvn() {
        List<CtpRvnVo> ctpRvnList = areaCodeService.getAllCtpRvn();
        return ResponseEntity.ok(ctpRvnList);
    }

    @GetMapping("/sig/list")
    @Operation(
            summary = "시도 코드에 해당하는 시군구 목록 조회",
            description = "주어진 시도 코드에 해당하는 시군구 코드 목록을 조회합니다."
    )
    public ResponseEntity<List<SigVo>> getSigList(
            @RequestParam("ctprvnCd")
            @Parameter(description = "시도 코드", example = "11", required = true)
            String ctprvnCd) {
        List<SigVo> sigList = areaCodeService.getSigList(ctprvnCd);
        return ResponseEntity.ok(sigList);
    }
}
