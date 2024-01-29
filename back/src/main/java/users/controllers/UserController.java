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

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {

        Optional<User> userOpt = userService.findById(id);
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

        data = new HashMap<>();

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

    @PutMapping("/{id}")
    public ResponseEntity<?> updateOne(@PathVariable Long id, @RequestBody UserDTO userDTO) {

        Optional<User> userOp = userService.findById(id);
        data = new HashMap<>();

        if (userOp.isPresent()) {

            User user = userOp.get();

            if (userDTO.getName() != null) {
                user.setName(userDTO.getName());
            }
            if (userDTO.getDni() != 0) {
                user.setDni(userDTO.getDni());
            }
            if (userDTO.getRole() != null) {
                user.setRole(userDTO.getRole());
            }
            if (userDTO.getEmail() != null) {
                user.setEmail(userDTO.getEmail());
            }
            
            userService.save(user);
            
            data.put("success", true);
            data.put("message", "usuario actualizado correctamente");
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
