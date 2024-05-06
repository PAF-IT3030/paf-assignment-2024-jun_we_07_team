package com.example.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.DailyWorkoutPlan;
import com.example.repositary.DailyWorkoutPlanRepositary;




@Service


public class DailyWorkoutPlanServiceImpl implements DailyWorkoutPlanService {

   private final DailyWorkoutPlanRepositary dailyworkoutPlanRepository;
    @Autowired
    public DailyWorkoutPlanServiceImpl(DailyWorkoutPlanRepositary dailyworkoutPlanRepository) {
        this.dailyworkoutPlanRepository = dailyworkoutPlanRepository;
    }

    @Override
    public DailyWorkoutPlan createDailyWorkoutPlan(DailyWorkoutPlan dailyworkoutPlan) {
        return dailyworkoutPlanRepository.save(dailyworkoutPlan);
    }

    @Override
    public List<DailyWorkoutPlan> getAllDailyWorkoutPlans() {
        return dailyworkoutPlanRepository.findAll();
    }

    @Override
    public DailyWorkoutPlan getDailyWorkoutPlanById(String id) {
        return dailyworkoutPlanRepository.findById(id).orElseThrow(() -> new NoSuchElementException("User not fond"+id));
    }

    @Override
    public DailyWorkoutPlan updateDailyWorkoutPlan(String id, DailyWorkoutPlan dailyworkoutPlan) {
        DailyWorkoutPlan existingPlan = getDailyWorkoutPlanById(id);
        existingPlan.setUserId(dailyworkoutPlan.getUserId());
        existingPlan.setTitle(dailyworkoutPlan.getTitle());
        existingPlan.setDescription(dailyworkoutPlan.getDescription());
        existingPlan.setType(dailyworkoutPlan.getType());
        existingPlan.setDifficultyLevel(dailyworkoutPlan.getDifficultyLevel());
        existingPlan.setDuration(dailyworkoutPlan.getDuration());
        existingPlan.setTodayDate(dailyworkoutPlan.getTodayDate());
        existingPlan.setWeight(dailyworkoutPlan.getWeight());
        existingPlan.setDailyexercises(dailyworkoutPlan.getDailyexercises());
        return dailyworkoutPlanRepository.save(existingPlan);
    }

    @Override
    public void deleteDailyWorkoutPlan(String id) {
        dailyworkoutPlanRepository.deleteById(id);
    }
    
}
