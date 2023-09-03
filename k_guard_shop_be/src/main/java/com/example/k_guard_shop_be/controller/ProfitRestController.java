package com.example.k_guard_shop_be.controller;

import com.example.k_guard_shop_be.dto.ProfitDTO;
import com.example.k_guard_shop_be.service.profit.IProfitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/profit")
public class ProfitRestController {
    @Autowired
    private IProfitService iProfitService;
    @GetMapping("")
    public ResponseEntity<?> getProfit(@RequestParam(value = "startMonth", defaultValue = "") String startMonth,
                                       @RequestParam(value = "endMonth", defaultValue = "") String endMonth,
                                       @RequestParam(value = "years", defaultValue = "") String years){
        List<ProfitDTO> profitDTOList = iProfitService.getProfit(startMonth,endMonth,years);
        return new ResponseEntity<>(profitDTOList,HttpStatus.OK);
    }
}
