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

import java.io.IOException;

public class LoginController {

    @FXML
    private TextField txtLogin;

    @FXML
    private PasswordField txtSenha;

    @FXML
    private void onLoginButtonClick(ActionEvent event ) throws  IOException {;

        if (txtLogin.getText().equals("admin")
                && txtSenha.getText().equals("123456")) {

            showMessage("Login efetuado com o email: ", Alert.AlertType.INFORMATION);

            FXMLLoader loader = new FXMLLoader(getClass().getResource("menu-view.fxml"));
            Scene scene = new Scene(loader.load());

            Stage stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
            stage.setScene(scene);


        }else {
            showMessage("Login ou senha incorretos!", Alert.AlertType.ERROR);
        }

    }

    private void showMessage(String message, Alert.AlertType tipo) {

        Alert alert = new Alert(tipo);

        alert.setTitle("Login");
        alert.setHeaderText(null);
        alert.setContentText("Login efetuado com e-mail!" +
                txtLogin.getText());
        alert.showAndWait();

    }

}
