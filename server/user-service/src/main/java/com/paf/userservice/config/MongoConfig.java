package com.paf.userservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoClientDatabaseFactory;

@Configuration
public class MongoConfig {

    @Bean
    public MongoTemplate mongoTemplate() {

        String connectionString = "mongodb+srv://kaveeshagunathilaka99:1234@cluster0.8dscuig.mongodb.net/PAF?retryWrites=true&w=majority&appName=Cluster0";

        return new MongoTemplate(new SimpleMongoClientDatabaseFactory(connectionString));
    }
}
