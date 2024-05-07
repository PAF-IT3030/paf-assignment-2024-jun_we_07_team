package com.paf.userservice.service.impl;

import com.paf.userservice.model.Follow;
import com.paf.userservice.repository.FollowRepository;
import com.paf.userservice.service.FollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FollowServiceImpl implements FollowService {

    private final FollowRepository followRepository;

    @Autowired
    public FollowServiceImpl(FollowRepository followRepository) {
        this.followRepository = followRepository;
    }

    @Override
    public void followUser(String followerId, String followeeId) {
        Follow follow = new Follow();
        follow.setFollowerId(followerId);
        follow.setFolloweeId(followeeId);
        followRepository.save(follow);
    }

    @Override
    public void unfollowUser(String followerId, String followeeId) {
        Follow follow = followRepository.findByFollowerIdAndFolloweeId(followerId, followeeId);
        if (follow != null) {
            followRepository.delete(follow);
        }
    }
}
