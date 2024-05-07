package com.example.mealplanservice.repository;

import com.example.mealplanservice.model.MealPlan;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface MealPlanRepository extends MongoRepository<MealPlan, String> {
    List<MealPlan> findByUserId(String userId);

    Optional<MealPlan> findByUserIdAndId(String userId, String mealPlanId);
}