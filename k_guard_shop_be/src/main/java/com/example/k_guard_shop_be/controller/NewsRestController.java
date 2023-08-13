package com.example.k_guard_shop_be.controller;

import com.example.k_guard_shop_be.model.News;
import com.example.k_guard_shop_be.service.news.INewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/news")
public class NewsRestController {
    @Autowired
    private INewsService iNewsService;
    @GetMapping("")
    public ResponseEntity<?> getAll(@RequestParam(value = "page",defaultValue = "0")Integer page){
        Pageable pageable = PageRequest.of(page,4);
        Page<News> newsPage = iNewsService.getAllNews(pageable);
        return new ResponseEntity<>(newsPage,HttpStatus.OK);
    }
}
