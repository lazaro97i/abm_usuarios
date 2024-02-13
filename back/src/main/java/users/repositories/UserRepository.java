package users.repositories;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import users.entities.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long>{
    
    Optional<User> findByDni(int dni);
    Optional<User> findByEmail(String email);
}
