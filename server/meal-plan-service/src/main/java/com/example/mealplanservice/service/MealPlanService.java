package com.example.mealplanservice.service;

import com.example.mealplanservice.dto.request.CreateMealPlanRequest;
import com.example.mealplanservice.dto.response.CreateMealPlanResponse;
import com.example.mealplanservice.exception.MealPlanNotFoundException;
import com.example.mealplanservice.model.MealPlan;

import java.util.List;

public interface MealPlanService {

    MealPlan create(CreateMealPlanRequest request, String userId);

    List<CreateMealPlanResponse> getAll();

    List<CreateMealPlanResponse> getById(String userId) throws MealPlanNotFoundException;

    MealPlan updateById(String userId, CreateMealPlanRequest request, String mealPlanId) throws MealPlanNotFoundException;

    void delete(String userId, String mealPlanId) throws MealPlanNotFoundException;
}
