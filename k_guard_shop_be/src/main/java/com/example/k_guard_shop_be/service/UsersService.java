package com.example.k_guard_shop_be.service;

import com.example.k_guard_shop_be.config.JwtUserDetails;
import com.example.k_guard_shop_be.model.Users;
import com.example.k_guard_shop_be.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by: VienH
 * Date created: 13/07/2023
 * Function: Login , Forgot Password
 *
 * @param
 * @return
 */
@Service
public class UsersService implements UserDetailsService, IUsersService {
    @Autowired
    private IUserRepository iUserRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
      Users users = iUserRepository.findByUsername(username);
      if (users == null){
          System.out.println("adfa");
      }
      List<GrantedAuthority> authorityList = new ArrayList<>();
      String role = users.getRoles().getRole();
      authorityList.add(new SimpleGrantedAuthority(role));
      return new JwtUserDetails(users.getId(),users.getUsername(),users.getPassword(),authorityList);
    }


    @Override
    public Users findByUsername(String username) {
        return iUserRepository.findByUsername(username);
    }

    @Override
    public Users findByEmail(String email) {
        return null;
    }

    @Transactional
    @Override
    public void editUser(Users users) {
        iUserRepository.save(users);
    }

    @Override
    public Users findById(Long id) {
        return iUserRepository.findById(id).get();
    }

    @Transactional
    @Override
    public void saveNewPassword(Users user) {
        Users users = findById(user.getId());
        String password = passwordEncoder.encode(user.getPassword());
        users.setPassword(password);
        iUserRepository.saveNewPassword(users.getId(), users.getPassword());
    }

    @Override
    public void createUser(Users users) {
        iUserRepository.save(users);
    }
}
