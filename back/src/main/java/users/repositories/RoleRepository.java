
package users.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import users.entities.Role;

@Repository
public interface RoleRepository extends CrudRepository<Role, Long> {    
}
