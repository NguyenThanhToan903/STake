package com.example.demo.repositories;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.models.SampleModel;

public interface SampleRepository extends MongoRepository <SampleModel, String> {
    
}
