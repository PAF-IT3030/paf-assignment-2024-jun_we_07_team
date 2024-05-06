package com.example.entity;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection ="daily_workoutplane")

public class DailyWorkoutPlan {
    @Id
    private String id;

    private Long userId;
    private String title;
    private String description;
    private String type;
    private String difficultyLevel;
    private int duration;
    private Date todayDate;
    private float weight;

    private List<DailyExercise> dailyexercises;

    
}
