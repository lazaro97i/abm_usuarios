package users.persistence.impl;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import users.entities.Role;
import users.persistence.RoleDAO;
import users.repositories.RoleRepository;


public class RoleDAOImpl implements RoleDAO {

    @Autowired
    private RoleRepository roleRepository;
    
    @Override
    public List<Role> findAll() {
        return (List<Role>) roleRepository.findAll();
    }

    @Override
    public Optional<Role> findById(Long id) {
        return (Optional<Role>) roleRepository.findById(id);
    }

    @Override
    public void save(Role role) {
        roleRepository.save(role);
    }

    @Override
    public void deleteById(Long id) {
        roleRepository.deleteById(id);
    }
    
}
