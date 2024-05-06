package com.example.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.entity.DailyWorkoutPlan;
@Service



public interface DailyWorkoutPlanService {
    DailyWorkoutPlan createDailyWorkoutPlan(DailyWorkoutPlan dailyworkoutPlan);
    List<DailyWorkoutPlan> getAllDailyWorkoutPlans();
    DailyWorkoutPlan getDailyWorkoutPlanById(String id);
    DailyWorkoutPlan updateDailyWorkoutPlan(String id, DailyWorkoutPlan dailyworkoutPlan);
    void deleteDailyWorkoutPlan(String id);
    
    
}
