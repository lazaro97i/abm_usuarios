
package users.persistence;

import java.util.List;
import java.util.Optional;
import users.entities.User;

public interface UserDAO {
    
    List<User> findAll();
    
    Optional<User> findById(Long id);
    
    void save(User user);
    
    void deleteById(Long id);
}
