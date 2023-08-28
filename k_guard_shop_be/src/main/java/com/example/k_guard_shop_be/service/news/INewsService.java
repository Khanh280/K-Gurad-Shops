package com.example.k_guard_shop_be.service.news;

import com.example.k_guard_shop_be.model.News;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface INewsService {
    Page<News> getAllNews(Pageable pageable);
    News getNewsById(Long id);
}
