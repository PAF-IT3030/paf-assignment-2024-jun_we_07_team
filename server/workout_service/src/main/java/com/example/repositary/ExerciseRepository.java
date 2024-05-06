package com.example.repositary;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.entity.Exercise;

public interface ExerciseRepository extends MongoRepository<Exercise , String> {
    
}
