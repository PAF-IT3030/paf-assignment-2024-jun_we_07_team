package com.example.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.DailyWorkoutPlan;
import com.example.service.DailyWorkoutPlanService;



@RestController

public class DailyWorkoutPlanController {
    private DailyWorkoutPlanService dailyWorkoutPlanService;

    @Autowired
    public DailyWorkoutPlanController(DailyWorkoutPlanService dailyWorkoutPlanService) {
        this.dailyWorkoutPlanService = dailyWorkoutPlanService;
    }

    @GetMapping("/dailyworkoutplans")
    public ResponseEntity<List<DailyWorkoutPlan>> getAllDailyWorkoutPlans() {
        return ResponseEntity.status(HttpStatus.OK).body(dailyWorkoutPlanService.getAllDailyWorkoutPlans());
    }

    @GetMapping("/dailyworkoutplans/{id}")
    public ResponseEntity<DailyWorkoutPlan> getDailyWorkoutPlanById(@PathVariable String id) {
        try {
            DailyWorkoutPlan dailyWorkoutPlan = dailyWorkoutPlanService.getDailyWorkoutPlanById(id);
            return ResponseEntity.status(HttpStatus.OK).body(dailyWorkoutPlan);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/dailyworkoutplans")
    public ResponseEntity<DailyWorkoutPlan> createDailyWorkoutPlan(@RequestBody DailyWorkoutPlan dailyWorkoutPlan) {
        try {
            DailyWorkoutPlan newDailyWorkoutPlan = dailyWorkoutPlanService.createDailyWorkoutPlan(dailyWorkoutPlan);
            return ResponseEntity.status(HttpStatus.CREATED).body(newDailyWorkoutPlan);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/dailyworkoutplans/{id}")
    public ResponseEntity<DailyWorkoutPlan> updateDailyWorkoutPlan(@PathVariable String id, @RequestBody DailyWorkoutPlan dailyWorkoutPlan) {
        try {
            DailyWorkoutPlan updatedDailyWorkoutPlan = dailyWorkoutPlanService.updateDailyWorkoutPlan(id, dailyWorkoutPlan);
            return ResponseEntity.status(HttpStatus.OK).body(updatedDailyWorkoutPlan);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/dailyworkoutplans/{id}")
    public ResponseEntity<Void> deleteDailyWorkoutPlan(@PathVariable String id) {
        try {
            dailyWorkoutPlanService.deleteDailyWorkoutPlan(id);
            return ResponseEntity.status(HttpStatus.OK).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
