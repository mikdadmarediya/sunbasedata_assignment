package com.example.controller;

import com.example.exception.UserNotFoundException;
import com.example.model.Authuser;
import com.example.model.Customer;
import com.example.security.jwt;
import com.example.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
public class CustomerController {
    @Autowired
    CustomerService customerService;

    @Autowired
    jwt jwtimpl;

    private ResponseEntity responseEntity;
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Authuser user){
        customerService.registerUser(user);
        return new ResponseEntity<>("User Created",HttpStatus.CREATED);
    }

    //email And Password
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Authuser user) throws UserNotFoundException {
        Map<String, String> map = null;
        try
        {
            Authuser userObj = customerService.findByUseremailAndPasswordCheck(user.getUserEmail(), user.getPassword());
            if (userObj.getUserEmail().equals(user.getUserEmail())) {
                map = jwtimpl.generateToken(user);
            }
            responseEntity = new ResponseEntity(map, HttpStatus.OK);
            System.out.println("Logged In");
        }
        catch (UserNotFoundException e)
        {
            throw new UserNotFoundException();
        }
        return responseEntity;
    }

    @PostMapping("/addCustomer")
    public ResponseEntity<Customer> addCustomer(@RequestBody Customer customer){
        Customer customer1 = customerService.addMovie(customer);
        return new ResponseEntity<>(customer1,HttpStatus.CREATED);
    }

    @GetMapping("/allCustomer")
    public ResponseEntity<List<Customer>> getAllCustomer(){
     List<Customer> customers = customerService.getAllMovie();
     return new ResponseEntity<>(customers,HttpStatus.OK);
    }

//    @GetMapping("/protected/user/{id}")
//    public ResponseEntity<Movie> getMovie(@PathVariable("id") int movieId){
//        return new ResponseEntity<Movie>(movieService.getMovieInfo(movieId),HttpStatus.OK);
//    }


    @PutMapping("/update")
    public ResponseEntity<Customer> updateCustomer(@RequestBody Customer customer){
        Customer updateCustomer = customerService.updateCustomer(customer);
        return new ResponseEntity<>(updateCustomer,HttpStatus.OK);
    }

    @DeleteMapping("/customer/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable("id") Long id){
        customerService.deleteEmployee(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
