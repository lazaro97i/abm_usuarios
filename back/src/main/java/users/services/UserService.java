
package users.services;

import java.util.List;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import users.entities.User;

public interface UserService {
    
    List<User> findAll();
    
    Optional<User> findById(Long id);
    
    public ResponseEntity<?> postUser (User user);
    
    void deleteById(Long id);
    
    boolean existsById(Long id);
    
}
