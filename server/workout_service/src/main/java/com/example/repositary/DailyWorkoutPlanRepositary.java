package com.example.repositary;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.entity.DailyWorkoutPlan;


public interface DailyWorkoutPlanRepositary extends MongoRepository<DailyWorkoutPlan , String> {

    
} 
