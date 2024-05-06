package com.example.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.WorkoutPlan;
import com.example.repositary.WorkoutPlanRepository;

@Service


public class WorkoutPlanServiceImpl implements WorkoutPlanService {
    private final WorkoutPlanRepository workoutPlanRepository;
    @Autowired
    public WorkoutPlanServiceImpl(WorkoutPlanRepository workoutPlanRepository) {
        this.workoutPlanRepository = workoutPlanRepository;
    }

    @Override
    public WorkoutPlan createWorkoutPlan(WorkoutPlan workoutPlan) {
        return workoutPlanRepository.save(workoutPlan);
    }

    @Override
    public List<WorkoutPlan> getAllWorkoutPlans() {
        return workoutPlanRepository.findAll();
    }

    @Override
    public WorkoutPlan getWorkoutPlanByUserId(String userId) {
        return workoutPlanRepository.findByUserId(userId).orElseThrow(() -> new NoSuchElementException("User not found: " + userId));
    }
    

    @Override
    public WorkoutPlan updateWorkoutPlan(String userId , WorkoutPlan workoutPlan) {
        WorkoutPlan existingPlan = getWorkoutPlanByUserId(userId);
        existingPlan.setUserId(workoutPlan.getUserId());
        existingPlan.setTitle(workoutPlan.getTitle());
        existingPlan.setDescription(workoutPlan.getDescription());
        existingPlan.setType(workoutPlan.getType());
        existingPlan.setDifficultyLevel(workoutPlan.getDifficultyLevel());
        existingPlan.setDuration(workoutPlan.getDuration());
        existingPlan.setExercises(workoutPlan.getExercises());
        existingPlan.setCreationDate(workoutPlan.getCreationDate());
        existingPlan.setLastUpdated(workoutPlan.getLastUpdated());
        return workoutPlanRepository.save(existingPlan);
    }

    @Override
    public void deleteWorkoutPlan(String id) {
        workoutPlanRepository.deleteById(id);
    }
    
}
