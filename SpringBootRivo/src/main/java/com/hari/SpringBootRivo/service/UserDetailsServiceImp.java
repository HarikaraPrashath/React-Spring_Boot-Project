package com.hari.SpringBootRivo.service;

import com.hari.SpringBootRivo.model.User;
import com.hari.SpringBootRivo.repository.UserRepo;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailsServiceImp  implements UserDetailsService
{
        private final UserRepo userRepo;


    public UserDetailsServiceImp(UserRepo userRepo) {
        this.userRepo = userRepo;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("Looking for username: " + username);
        Optional<User> user = userRepo.findByUsername(username);
        return userRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User with username " + username + " could not be found"));
    }
}
