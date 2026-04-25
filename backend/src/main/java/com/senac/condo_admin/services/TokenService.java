package com.senac.condo_admin.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.senac.condo_admin.model.entities.Token;
import com.senac.condo_admin.model.entities.Usuario;
import com.senac.condo_admin.model.repository.TokenRepository;
import com.senac.condo_admin.model.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Value("${spring.secretkey}")
    private String secret;

    @Value("${spring.emissor}")
    private String emissor;

    @Value("${spring.tempoExpiracao}")
    private Long tempoExpiracao;

    public Usuario validarToken(String token){

        try {


            Algorithm algoritmo = Algorithm.HMAC256(secret);
            JWTVerifier verifier = JWT.require(algoritmo)
                    .withIssuer(emissor)
                    .build();

            verifier.verify(token);

            var tokenBanco = tokenRepository.findTokenByToken(token);

            return tokenBanco.get().getUsuario();

        }catch(Exception e){
            throw new RuntimeException(e);
        }
    }

    public String gerarToken(String email) {

        try{

            Algorithm algoritmo = Algorithm.HMAC256(secret);
            String token = JWT.create()
                    .withIssuer(emissor)
                    .withSubject(email)
                    .withExpiresAt(gerarDataExpiracao())
                    .sign(algoritmo);

            var usuario = UsuarioRepository.findAll()
                            .stream()
                                    .filter(u -> u.getEmail().equals(email)).findFirst().orElse(null);

            TokenRepository.save(new Token(token, usuario));


            return token;

        }catch (Exception e){
            return null;
        }
    }

    private Instant gerarDataExpiracao(){

        return LocalDateTime.now().plusMinutes(tempoExpiracao).toInstant(ZoneOffset.of("-03:00"));

    }
}
