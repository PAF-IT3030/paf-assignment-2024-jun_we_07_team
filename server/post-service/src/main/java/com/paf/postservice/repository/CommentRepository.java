package com.paf.postservice.repository;

import com.paf.postservice.model.Comment;
import com.paf.postservice.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends MongoRepository<Comment,String> {


}
