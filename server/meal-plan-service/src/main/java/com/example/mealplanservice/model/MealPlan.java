package com.example.mealplanservice.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "meal_plan")
@Data
public class MealPlan {
    private String id;
    private String description;
    private String recipe;
    private String nutritionalInformation;
    private String mealType;
    private String ingredients;
    private String instructions;
    private String userId;
    private LocalDateTime createdAt;
}
