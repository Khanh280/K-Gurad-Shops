package com.example.k_guard_shop_be.controller;

import com.example.k_guard_shop_be.dto.ProfitDTO;
import com.example.k_guard_shop_be.service.profit.IProfitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/profit")
public class ProfitRestController {
    @Autowired
    private IProfitService iProfitService;
    @GetMapping("")
    public ResponseEntity<?> getProfit(){
        List<ProfitDTO> profitDTOList = iProfitService.getProfit();
        return new ResponseEntity<>(profitDTOList,HttpStatus.OK);
    }
}
