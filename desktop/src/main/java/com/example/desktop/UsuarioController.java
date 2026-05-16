package com.example.desktop;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.Label;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.stage.Stage;

import java.awt.*;
import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class UsuarioController {

    @FXML
    private TextField txtLogin;

    @FXML
    private TextField txtEmail;

    @FXML
    private PasswordField txtSenha;

    @FXML
    private void onVoltarMenuButtonClick() {;

        Alert alert = new Alert(Alert.AlertType.INFORMATION);

        alert.setTitle("Login");
        alert.setHeaderText(null);
        alert.setContentText("Login efetuado com e-mail!" +
                txtLogin.getText());
        alert.showAndWait();

    }

    @FXML
    private void onSalvarButtonClick(ActionEvent event) throws IOException {

        URL url = new URL("http://localhost:8080/usuarios");
        HttpURLConnection com = (HttpURLConnection) url.openConnection();
        com.setRequestMethod("POST");
        com.setRequestProperty("Content-Type", "application/json");

        com.setDoOutput(true);

        String json = "{"+
                "\"nome\": \""+txtLogin.getText()+"\"" +
                "\"email\": \""+txtEmail.getText()+"\"" +
                "\"senha\": \""+txtSenha.getText()+"\"" +
                "}";

        try(OutputStream os = com.getOutputStream()){
            os.write(json.getBytes());
        }

        var code = com.getResponseCode();
        if (code ==200){

            showMenssage("Sucesso ao salvar! ", Alert.AlertType.INFORMATION);

            FXMLLoader loader = new FXMLLoader(getClass().getResource("menu-view.fxml"));
            Scene scene = new Scene(loader.load());
            Stage stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
            stage.setScene(scene);

        }else {
            showMenssage("Erro ao salvar! ", Alert.AlertType.ERROR);
        }

        com.disconnect();


    }
}
