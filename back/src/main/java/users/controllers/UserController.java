package users.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import users.controllers.dto.UserDTO;
import users.entities.User;
import users.services.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    HashMap<String, Object> data;

    @CrossOrigin(origins = "http://localhost:5173/")
    @GetMapping("")
    public ResponseEntity<?> findAll() {

        data = new HashMap<>();

        List<UserDTO> users = (List<UserDTO>) userService.findAll()
                .stream()
                .map(user -> UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .dni(user.getDni())
                .email(user.getEmail())
                .role(user.getRole())
                .build())
                .toList();

        if (users.size() > 0) {
            data.put("success", true);
            data.put("message", "Usuarios cargados correctamente");
            data.put("data", users);
            return new ResponseEntity<>(
                    data,
                    HttpStatus.OK
            );
        }else if(users.size() == 0){
            data.put("success", true);
            data.put("message", "No hay usuarios para mostrar");
            data.put("data", users);
            return new ResponseEntity<>(
                    data,
                    HttpStatus.OK
            );
        }
        data.put("success", false);
        data.put("message", "Error al cargar usuarios");
        return new ResponseEntity<>(
                data,
                HttpStatus.NOT_FOUND
        );

    }

    @CrossOrigin(origins = "http://localhost:5173/")
    @GetMapping("/{dni}")
    public ResponseEntity<?> findById(@PathVariable int dni) {

        Optional<User> userOpt = userService.findByDni(dni);
        data = new HashMap<>();

        if (userOpt.isPresent()) {

            User user = userOpt.get();

            UserDTO userDTO = UserDTO.builder()
                    .id(user.getId())
                    .name(user.getName())
                    .dni(user.getDni())
                    .email(user.getEmail())
                    .role(user.getRole())
                    .build();

            data.put("success", true);
            data.put("message", "Usuario encontrado");
            data.put("data", userDTO);

            return new ResponseEntity<>(
                    data,
                    HttpStatus.OK
            );

        }

        data.put("success", false);
        data.put("message", "Usuario no encontrado");

        return new ResponseEntity(
                data,
                HttpStatus.NOT_FOUND
        );

    }

    @CrossOrigin(origins = "http://localhost:5173/")
    @PostMapping("")
    public ResponseEntity<?> save(@RequestBody UserDTO userDTO) {

        Optional<User> dniExists = userService.findByDni(userDTO.getDni());
        Optional<User> emailExists = userService.findByEmail(userDTO.getEmail());
        
        data = new HashMap<>();
        
        if(emailExists.isPresent()){
            data.put("success", false);
            data.put("message", "El email ingresado ya pertenece a un usuario activo");
            return new ResponseEntity<>(
                    data,
                    HttpStatus.BAD_REQUEST
            );
        }
        
        if(dniExists.isPresent()){
            data.put("success", false);
            data.put("message", "El dni ingresado ya pertenece a un usuario activo");
            return new ResponseEntity<>(
                    data,
                    HttpStatus.BAD_REQUEST
            );
        }
        
        if (userDTO.getName().isBlank()
                || userDTO.getEmail().isBlank()
                || userDTO.getDni() == 0
                || userDTO.getRole() == null) {
            data.put("success", false);
            data.put("message", "Error al agregar usuario");
            return new ResponseEntity<>(
                    data,
                    HttpStatus.BAD_REQUEST
            );
        }

        userService.save(User.builder()
                .name(userDTO.getName())
                .dni(userDTO.getDni())
                .email(userDTO.getEmail())
                .role(userDTO.getRole())
                .build()
        );

        data.put("success", true);
        data.put("message", "Usuario agregado correctamente!");
        data.put("data", userDTO);

        return new ResponseEntity<>(
                data,
                HttpStatus.CREATED
        );

    }

    @CrossOrigin(origins = "http://localhost:5173/")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateOne(@PathVariable Long id, @RequestBody UserDTO userDTO) {

        Optional<User> userOp = userService.findById(id);
        data = new HashMap<>();

        if (userOp.isPresent()) {

            User user = userOp.get();

            if (userDTO.getName().isBlank()) {
                data.put("success", false);
                data.put("message", "Nombre requerido");
                return new ResponseEntity<>(
                            data,
                            HttpStatus.BAD_REQUEST
                    );
            }else{
                user.setName(userDTO.getName());
            }
            if (userDTO.getDni() != 0) {
                Optional<User> dniExists = userService.findByDni(userDTO.getDni());
                if(user.getDni() != userDTO.getDni() && dniExists.isPresent()){
                    data.put("success", false);
                    data.put("message", "El dni ingresado ya pertenece a un usuario activo");
                    return new ResponseEntity<>(
                            data,
                            HttpStatus.BAD_REQUEST
                    );
                }
                user.setDni(userDTO.getDni());
            }else{
                data.put("success", false);
                data.put("message", "Dni requerido");
                return new ResponseEntity<>(
                            data,
                            HttpStatus.BAD_REQUEST
                    );
            }
            if (userDTO.getRole() != null) {
                user.setRole(userDTO.getRole());
            }else{
                data.put("success", false);
                data.put("message", "Rol de usuario requerido");
                return new ResponseEntity<>(
                            data,
                            HttpStatus.BAD_REQUEST
                    );
            }
        
            if (userDTO.getEmail().isBlank()) {
                data.put("success", false);
                data.put("message", "Email requerido");
                return new ResponseEntity<>(
                            data,
                            HttpStatus.BAD_REQUEST
                    );
            }else{
                Optional<User> emailExists = userService.findByEmail(userDTO.getEmail());
                if(!user.getEmail().equals(userDTO.getEmail()) && emailExists.isPresent()){
                    data.put("success", false);
                    data.put("message", "El email ingresado ya pertenece a un usuario activo");
                    return new ResponseEntity<>(
                            data,
                            HttpStatus.BAD_REQUEST
                    );
                }
                user.setEmail(userDTO.getEmail());
            }
            
            userService.save(user);
            
            data.put("success", true);
            data.put("message", "Usuario actualizado correctamente");
            data.put("dataUpdated", user);

            return new ResponseEntity<>(
                    data,
                    HttpStatus.OK
            );
        }

        data.put("success", false);
        data.put("message", "Error al actualizar usuario");

        return new ResponseEntity<>(
                data,
                HttpStatus.BAD_REQUEST
        );

    }

    @CrossOrigin(origins = "http://localhost:5173/")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOne(@PathVariable Long id) {

        data = new HashMap<>();
        Boolean exist = userService.existsById(id);

        if (exist) {
            Optional<User> res = userService.findById(id);
            data.put("success", true);
            data.put("message", "Usuario eliminado correctamente");
            data.put("data", res);
            userService.deleteById(id);
            return new ResponseEntity<>(
                    data,
                    HttpStatus.OK
            );
        }

        data.put("success", false);
        data.put("message", "Usuario no encontrado");

        return new ResponseEntity<>(
                data,
                HttpStatus.NOT_FOUND
        );

    }
}
