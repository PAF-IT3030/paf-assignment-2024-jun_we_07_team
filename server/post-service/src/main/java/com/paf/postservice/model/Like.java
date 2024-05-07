package com.paf.postservice.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "post")
public class Like {
    @Id
    private String id;

    private String postId;
    private String userId;
    private Date createdAt;


}