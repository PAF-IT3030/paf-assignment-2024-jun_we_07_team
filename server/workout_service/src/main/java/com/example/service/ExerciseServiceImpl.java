package com.example.service;

import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.Exercise;
import com.example.repositary.ExerciseRepository;

@Service

public class ExerciseServiceImpl implements ExerciseService {
    private final ExerciseRepository exerciseRepository;
    @Autowired
    public ExerciseServiceImpl(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    @Override
    public Exercise createExercise(Exercise exercise) {
        return exerciseRepository.save(exercise);
    }

    @Override
    public List<Exercise> getAllExercises() {
        return exerciseRepository.findAll();
    }

    @Override
    public Exercise getExerciseById(String id) {
        return exerciseRepository.findById(id).orElseThrow(() -> new NoSuchElementException("User not fond"+id));
    }

    @Override
    public Exercise updateExercise(String id, Exercise exercise) {
        Exercise existingExercise = getExerciseById(id);
        existingExercise.setName(exercise.getName());
        existingExercise.setSets(exercise.getSets());
        existingExercise.setRepetitions(exercise.getRepetitions());
        existingExercise.setEquipment(exercise.getEquipment());
        return exerciseRepository.save(existingExercise);
    }

    @Override
    public void deleteExercise(String id) {
        exerciseRepository.deleteById(id);
    }
    
}
