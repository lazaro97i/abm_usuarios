
package users.persistence;

import java.util.List;
import java.util.Optional;
import users.entities.User;

public interface UserDAO {
    
    List<User> findAll();
    
    Optional<User> findById(Long id);
    
    Optional<User> findByDni(int dni);
    
    Optional<User> findByEmail(String email);
    
    void save(User user);
    
    void deleteById(Long id);
}
