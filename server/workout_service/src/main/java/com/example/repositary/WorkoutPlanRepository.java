package com.example.repositary;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.entity.WorkoutPlan;

public interface WorkoutPlanRepository extends MongoRepository<WorkoutPlan , String> {

    Optional<WorkoutPlan> findByUserId(String userId);
    
}
