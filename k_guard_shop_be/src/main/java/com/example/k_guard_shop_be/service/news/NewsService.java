package com.example.k_guard_shop_be.service.news;

import com.example.k_guard_shop_be.model.News;
import com.example.k_guard_shop_be.repository.INewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.Entity;

@Service
public class NewsService implements INewsService{
    @Autowired
    private INewsRepository iNewsRepository;

    @Override
    public Page<News> getAllNews(Pageable pageable) {
        return iNewsRepository.findAll(pageable);
    }

    @Override
    public News getNewsById(Long id) {
        return iNewsRepository.findById(id).get();
    }
}
