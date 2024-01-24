
package users.services;

import java.util.List;
import java.util.Optional;
import users.entities.Role;

public interface RoleService {
    
    List<Role> findAll();
    
    Optional<Role> findById(Long id);
    
    void save(Role role);   
    
    void deleteById(Long id);
    
}
