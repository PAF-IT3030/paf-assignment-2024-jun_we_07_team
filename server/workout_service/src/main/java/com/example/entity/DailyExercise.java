package com.example.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection ="daily_exercise")

@Data

public class DailyExercise {
     @Id
    private String id;
    private String name;
    private int sets;
    private int repetitions;
    private String equipment;

    
}
