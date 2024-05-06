package com.example.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.entity.WorkoutPlan;
@Service

public interface WorkoutPlanService {
    WorkoutPlan createWorkoutPlan(WorkoutPlan workoutPlan);
    List<WorkoutPlan> getAllWorkoutPlans();
    WorkoutPlan getWorkoutPlanByUserId(String userId); // New method
    WorkoutPlan updateWorkoutPlan(String id, WorkoutPlan workoutPlan);
    void deleteWorkoutPlan(String id);
}

