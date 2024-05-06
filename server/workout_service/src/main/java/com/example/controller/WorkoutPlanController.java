package com.example.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.WorkoutPlan;
import com.example.service.WorkoutPlanService;


@CrossOrigin(origins = "http://localhost:3001")

@RestController

public class WorkoutPlanController {


    private WorkoutPlanService workoutPlanService;

    @Autowired
    public WorkoutPlanController(WorkoutPlanService workoutPlanService) {
        this.workoutPlanService = workoutPlanService;
    }

    @GetMapping("/workoutplans")
    public ResponseEntity<List<WorkoutPlan>> getAllWorkoutPlans() {
        return ResponseEntity.status(HttpStatus.OK).body(workoutPlanService.getAllWorkoutPlans());
    }

    @GetMapping("/workoutplans/{userId}") // Update the endpoint URL
    public ResponseEntity<WorkoutPlan> getWorkoutPlanByUserId(@PathVariable String userId) {
    try {
        WorkoutPlan workoutPlan = workoutPlanService.getWorkoutPlanByUserId(userId);
        return ResponseEntity.status(HttpStatus.OK).body(workoutPlan);
    } catch (NoSuchElementException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
}


    @PostMapping("/workoutplans")
    public ResponseEntity<WorkoutPlan> createWorkoutPlan(@RequestBody WorkoutPlan workoutPlan) {
        try {
            WorkoutPlan newWorkoutPlan = workoutPlanService.createWorkoutPlan(workoutPlan);
            return ResponseEntity.status(HttpStatus.CREATED).body(newWorkoutPlan);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/workoutplans/{id}")
    public ResponseEntity<WorkoutPlan> updateWorkoutPlan(@PathVariable String id, @RequestBody WorkoutPlan workoutPlan) {
        try {
            WorkoutPlan updateWorkoutPlan = workoutPlanService.updateWorkoutPlan(id, workoutPlan);
            return ResponseEntity.status(HttpStatus.OK).body(updateWorkoutPlan);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/workoutplans/{id}")
    public ResponseEntity<Void> deleteWorkoutPlan(@PathVariable String id) {
        try {
            workoutPlanService.deleteWorkoutPlan(id);
            return ResponseEntity.status(HttpStatus.OK).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
