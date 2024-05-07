package com.paf.postservice.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Optional;

@Document(collection = "comment")

@Data
public class Comment {
    @Id
    private String id;
    private String uid;
    private String uname;



    private String postid;

    private String text;



}
