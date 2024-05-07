package com.paf.userservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoClientDatabaseFactory;

@Configuration
public class MongoConfig {

    @Bean
    public MongoTemplate mongoTemplate() {

        String connectionString = "mongodb+srv://isuru:1234@atlascluster.l6f8mrt.mongodb.net/ITPM?retryWrites=true&w=majority&appName=AtlasCluster";

        return new MongoTemplate(new SimpleMongoClientDatabaseFactory(connectionString));
    }
}
