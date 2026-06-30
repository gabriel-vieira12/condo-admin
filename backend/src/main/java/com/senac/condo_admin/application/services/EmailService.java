package com.senac.condo_admin.application.services;

import com.senac.condo_admin.infra.config.external.EmailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private EmailRepository emailRepository;

    public void enviarEmailOcorrenciaGrave(
            String emailDestino,
            String nomeSindico,
            String descricao,
            String unidade
    ) {
        String assunto = "Ocorrência Grave registrada no CondoAdmin";

        String texto =
                "Olá, " + nomeSindico + "!\n\n" +
                        "Uma nova ocorrência classificada como GRAVE foi registrada no seu condomínio.\n\n" +
                        "Descrição: " + descricao + "\n" +
                        "Unidade: " + unidade + "\n\n" +
                        "Acesse o CondoAdmin para acompanhar e gerenciar essa ocorrência.\n\n" +
                        "Atenciosamente,\n" +
                        "CondoAdmin";

        emailRepository.enviar(emailDestino, assunto, texto);
    }
}