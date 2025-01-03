package com.wavus.edu.gis.camping_info.controller;

import com.wavus.edu.gis.camping_info.dto.CampingOriginalSiteDto;
import com.wavus.edu.gis.camping_info.service.CampingInfoService;
import com.wavus.edu.gis.camping_info.vo.CampingOriginalSiteVo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/camping-info")
public class CampingInfoController {

    private CampingInfoService campingInfoService;

    public CampingInfoController(CampingInfoService campingInfoService) {
        this.campingInfoService = campingInfoService;
    }

    /*ID로 조회*/
    @GetMapping("/search/id")
    public ResponseEntity<Optional<CampingOriginalSiteVo>> searchById(@RequestParam Long id) {
        return ResponseEntity.ok(campingInfoService.findById(id));
    }


    /*시도 코드로 조회*/
    @GetMapping("/search/city-province")
    public ResponseEntity<List<CampingOriginalSiteDto>> searchByCityProvince(@RequestParam String cityProvinceName) {
        List<CampingOriginalSiteDto> sites = campingInfoService.findByCityProvinceName(cityProvinceName);
        return ResponseEntity.ok(sites);
    }

    /*시군구 코드로 조회*/
    @GetMapping("/search/city-county-district")
    public ResponseEntity<List<CampingOriginalSiteDto>> searchByCityCountyDistrict(@RequestParam String cityCountyDistrictName) {
        List<CampingOriginalSiteDto> sites = campingInfoService.findByCityCountyDistrictName(cityCountyDistrictName);
        return ResponseEntity.ok(sites);
    }

    /*이름으로 조회*/
    @GetMapping("/search/name")
    public ResponseEntity<List<CampingOriginalSiteDto>> searchByName(@RequestParam String facilityName) {
        List<CampingOriginalSiteDto> sites = campingInfoService.findByName(facilityName);
        return ResponseEntity.ok(sites);
    }
}
