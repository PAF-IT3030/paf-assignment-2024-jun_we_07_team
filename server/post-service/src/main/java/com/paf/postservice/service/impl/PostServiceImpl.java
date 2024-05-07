package com.paf.postservice.service.impl;

import com.paf.postservice.dto.request.PostRequest;
import com.paf.postservice.model.Post;
import com.paf.postservice.repository.PostRepository;
import com.paf.postservice.service.CloudinaryService;
import com.paf.postservice.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Time;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private PostRepository postRepository;

    @Override
    public ResponseEntity<Map> createPost(PostRequest postRequest) {
        try {
            if (postRequest.getDescription() == null || postRequest.getDescription().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            if (postRequest.getFile() == null || postRequest.getFile().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            Post post = new Post();
            post.setUserId(postRequest.getUserId());
            post.setDescription(postRequest.getDescription());
            post.setUrl(cloudinaryService.uploadFile(postRequest.getFile(), "folder_1"));

            // Set the date and time fields
            post.setDate(new Date(System.currentTimeMillis()));
//            post.setTime(new Time(System.currentTimeMillis()));

            if (post.getUrl() == null) {
                return ResponseEntity.badRequest().build();
            }
            postRepository.save(post);
            return ResponseEntity.ok().body(Map.of("url", post.getUrl()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    public ResponseEntity<Map> getPost(String postId) {
        try {
            Optional<Post> optionalPost = postRepository.findById(postId);
            if (optionalPost.isPresent()) {
                Post post = optionalPost.get();
                return ResponseEntity.ok().body(Map.of("post", post));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    public ResponseEntity<Map> getAllPosts() {
        try {
            List<Post> posts = postRepository.findAll();
            return ResponseEntity.ok().body(Map.of("posts", posts));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



    @Override
    public ResponseEntity<Map> updatePost(String postId, PostRequest postRequest) {
        try {
            Optional<Post> optionalPost = postRepository.findById(postId);
            if (!optionalPost.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            Post post = optionalPost.get();

            // Check and update the description
            if (postRequest.getDescription() != null && !postRequest.getDescription().isEmpty()) {
                post.setDescription(postRequest.getDescription());
            }

            // Check if there's a file to upload
            if (postRequest.getFile() != null && !postRequest.getFile().isEmpty()) {
                String uploadedUrl = cloudinaryService.uploadFile(postRequest.getFile(), "folder_1");
                if (uploadedUrl == null) {
                    return ResponseEntity.badRequest().build();
                }
                post.setUrl(uploadedUrl);  // Update the URL if file upload is successful
            }

            postRepository.save(post);
            return ResponseEntity.ok().body(Map.of("message", "Post updated successfully"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @Override
    public ResponseEntity<Map> deletePost(String postId) {
        try {
            Optional<Post> optionalPost = postRepository.findById(postId);
            if (optionalPost.isPresent()) {
                postRepository.deleteById(postId);
                return ResponseEntity.ok().body(Map.of("message", "Post deleted successfully"));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}




