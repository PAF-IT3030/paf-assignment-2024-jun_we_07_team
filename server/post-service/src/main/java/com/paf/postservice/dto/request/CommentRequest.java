package com.paf.postservice.dto.request;

import lombok.Data;

@Data
public class CommentRequest {

    private String uid;

    private String uname;
    private String text;


}