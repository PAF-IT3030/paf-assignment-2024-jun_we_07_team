package com.paf.postservice.model;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.sql.Time;
import java.util.Date;
import java.util.List;

@Document(collection = "post")
@Data
public class Post {
    @Id
    private String id;

    private String userId;

    private String description;

    private String url;

    private List<Comment> comments;
    private List<Like> likes;

    @CreatedDate
    private Date date;


}
