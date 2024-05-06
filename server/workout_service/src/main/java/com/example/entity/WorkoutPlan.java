package com.example.entity;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;


@Data
@Document(collection ="workoutplane")

public class WorkoutPlan {
    @Id
    private String id;

    private String userId;
    private String title;
    private String description;
    private String type;
    private String difficultyLevel;
    private int duration;
    private Date creationDate;
    private Date lastUpdated;

    
    private List<Exercise> exercises;

    
}
