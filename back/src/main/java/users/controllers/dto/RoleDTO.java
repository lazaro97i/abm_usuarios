
package users.controllers.dto;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RoleDTO {
    
    @Enumerated(EnumType.STRING)
    private CategoryType role;
 
    public enum CategoryType{
        ADMIN_ROLE, USER_ROLE
    }
}
