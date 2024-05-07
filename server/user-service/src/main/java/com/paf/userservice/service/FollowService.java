package com.paf.userservice.service;

public interface FollowService {
    void followUser(String followerId, String followeeId);
    void unfollowUser(String followerId, String followeeId);
}
