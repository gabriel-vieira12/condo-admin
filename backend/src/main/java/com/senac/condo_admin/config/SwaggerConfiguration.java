package com.senac.condo_admin.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfiguration {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("CondoAdmin API")
                        .version("1.0")
                        .description("API para gerenciamento de condomínios com unidades, moradores e ocorrências.")
                );
    }
}