package com.paf.userservice.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "follows")
@Data
public class Follow {

    @Id
    private String id;
    private String followerId;
    private String followeeId;

}
