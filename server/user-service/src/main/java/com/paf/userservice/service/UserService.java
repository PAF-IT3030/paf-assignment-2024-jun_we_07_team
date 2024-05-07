package com.paf.userservice.service;


import com.paf.userservice.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User registerUser(User user);
    User loginUser(String username, String password);

    List<User> getAllUsers();

    Optional<User> getUserById (String id);



}
