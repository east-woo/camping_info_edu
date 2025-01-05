package com.wavus.edu.gis.camping_info.controller;

import com.wavus.edu.gis.camping_info.service.CampingInfoService;
import com.wavus.edu.gis.camping_info.vo.CampingOriginalSiteVo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
@Tag(name = "camping information API", description = "캠핑장 정보 API")
@RestController
@RequestMapping("/api/camping-info")
public class CampingInfoController {

    private CampingInfoService campingInfoService;

    public CampingInfoController(CampingInfoService campingInfoService) {
        this.campingInfoService = campingInfoService;
    }

    @GetMapping("/id")
    @Operation(
            summary = "캠핑장 ID로 조회",
            description = "주어진 캠핑장 아이디로 캠핑장 정보를 조회합니다."
    )
    public ResponseEntity<Optional<CampingOriginalSiteVo>> searchById(
            @RequestParam
            @Parameter(description = "캠핑장 아이디", example = "1", required = true)
            Long id) {
        return ResponseEntity.ok(campingInfoService.findById(id));
    }

    @GetMapping("/region")
    @Operation(
            summary = "지역 코드로 캠핑장 조회",
            description = "시도 코드와 시군구 코드로 캠핑장 정보를 조회합니다. 시도 코드나 시군구 코드 중 하나라도 제공해야 합니다."
    )
    public ResponseEntity<List<CampingOriginalSiteVo>> searchByRegion(
            @RequestParam(required = false)
            @Parameter(description = "시도 코드", example = "11", required = false)
            Integer ctprvnCd,

            @RequestParam(required = false)
            @Parameter(description = "시군구 코드", example = "11740", required = false)
            Integer sigCd) {

        if (ctprvnCd == null && sigCd == null) {
            return ResponseEntity.badRequest().body(null);
        }

        List<CampingOriginalSiteVo> sites = campingInfoService.findByRegion(ctprvnCd, sigCd);
        return ResponseEntity.ok(sites);
    }

    @GetMapping("/name")
    @Operation(
            summary = "캠핑장 이름으로 조회",
            description = "주어진 캠핑장 이름으로 캠핑장 정보를 조회합니다."
    )
    public ResponseEntity<List<CampingOriginalSiteVo>> searchByName(
            @RequestParam
            @Parameter(description = "캠핑장 이름", example = "(유)금강 두승산 글램핑", required = true)
            String facilityName) {
        List<CampingOriginalSiteVo> sites = campingInfoService.findByName(facilityName);
        return ResponseEntity.ok(sites);
    }
}

