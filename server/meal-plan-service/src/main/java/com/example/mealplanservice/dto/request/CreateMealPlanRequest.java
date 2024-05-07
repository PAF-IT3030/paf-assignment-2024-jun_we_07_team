package com.example.mealplanservice.dto.request;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateMealPlanRequest {

    private String description;
    private String recipe;
    private String nutritionalInformation;
    private String mealType;
    private String ingredients;
    private String instructions;
    private LocalDateTime createdAt;
    private String userId;

}
