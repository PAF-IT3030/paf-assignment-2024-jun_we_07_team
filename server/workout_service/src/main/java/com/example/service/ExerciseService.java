package com.example.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.entity.Exercise;


@Service

public interface ExerciseService {
    Exercise createExercise(Exercise exercise);
    List<Exercise> getAllExercises();
    Exercise getExerciseById(String id);
    Exercise updateExercise(String id, Exercise exercise);
    void deleteExercise(String id);


    
} 
