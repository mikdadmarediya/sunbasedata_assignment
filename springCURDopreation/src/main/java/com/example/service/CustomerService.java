package com.example.service;

import com.example.exception.UserNotFoundException;
import com.example.model.Authuser;
import com.example.model.Customer;
import com.example.repository.CustomerRepo;
import com.example.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {
    @Autowired
    CustomerRepo customerRepo;

    @Autowired
    UserRepo userRepo;

    public Customer addMovie(Customer customer){
       return customerRepo.save(customer);
    }

    public List<Customer> getAllMovie(){
        return customerRepo.findAll();
    }

//    public Movie getMovieInfo(int movieid){
//        return movieRepo.findById(movieid).get();
//    }
//
//    public List<Movie> getMovieByCato(String cato){
//        return movieRepo.findBymovieCato(cato);
//    }

    public Customer updateCustomer(Customer customer){
        return customerRepo.save(customer);
    }

    public void deleteEmployee(Long id){
        customerRepo.deleteById(id);
    }


    public Authuser registerUser(Authuser user) {
        return userRepo.save(user);
    }


    //email And Password
    public Authuser findByUseremailAndPasswordCheck(String userEmail, String password) throws UserNotFoundException {
        Authuser user = userRepo.findByuserEmailAndPassword(userEmail,password);
        if(user == null){
            throw new UserNotFoundException();
        }
        return user;
    }

}
