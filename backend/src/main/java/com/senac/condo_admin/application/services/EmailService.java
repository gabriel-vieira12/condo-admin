package com.senac.condo_admin.application.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void enviarEmailOcorrenciaGrave(
            String emailDestino,
            String nomeSindico,
            String descricao,
            String unidade
    ) {
        SimpleMailMessage mensagem = new SimpleMailMessage();

        mensagem.setTo(emailDestino);
        mensagem.setSubject("🚨 Ocorrência Grave registrada no CondoAdmin");

        mensagem.setText(
                "Olá, " + nomeSindico + "!\n\n" +
                        "Uma nova ocorrência classificada como GRAVE foi registrada no seu condomínio.\n\n" +
                        "Descrição: " + descricao + "\n" +
                        "Unidade: " + unidade + "\n\n" +
                        "Acesse o CondoAdmin para acompanhar e gerenciar essa ocorrência.\n\n" +
                        "Atenciosamente,\n" +
                        "CondoAdmin"
        );

        mailSender.send(mensagem);
    }
}