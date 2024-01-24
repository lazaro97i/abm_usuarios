
package users.persistence;

import java.util.List;
import java.util.Optional;
import users.entities.Role;

public interface RoleDAO {
    
    List<Role> findAll();
    
    Optional<Role> findById(Long id);
    
    void save(Role role);
    
    void deleteById(Long id);
    
}
