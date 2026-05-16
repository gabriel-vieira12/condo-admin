package com.example.desktop;

import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.Label;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;

import java.awt.*;

public class MenuController {

    @FXML
    private TextField txtLogin;

    @FXML
    private PasswordField txtSenha;

    @FXML
    private void onVoltarButtonClick() {;

        Alert alert = new Alert(Alert.AlertType.INFORMATION);

        alert.setTitle("Login");
        alert.setHeaderText(null);
        alert.setContentText("Login efetuado com e-mail!" +
                txtLogin.getText());
        alert.showAndWait();

    }
}
