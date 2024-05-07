package com.paf.userservice.controller;

import com.paf.userservice.dto.request.FollowRequest;
import com.paf.userservice.service.FollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/follow")
public class FollowController {

    private final FollowService followService;

    @Autowired
    public FollowController(FollowService followService) {
        this.followService = followService;
    }

    @PostMapping("/follow-user")
    public ResponseEntity<Void> followUser(@RequestBody FollowRequest followRequest) {
        followService.followUser(followRequest.getFollowerId(), followRequest.getFolloweeId());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/unfollow-user")
    public ResponseEntity<Void> unfollowUser(@RequestBody FollowRequest followRequest) {
        followService.unfollowUser(followRequest.getFollowerId(), followRequest.getFolloweeId());
        return ResponseEntity.ok().build();
    }
}
