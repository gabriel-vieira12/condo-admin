package com.senac.condo_admin.domain.valueobjects;

import jakarta.persistence.Embeddable;

@Embeddable
public record CNPJ(String valor) {

    public CNPJ {
        if (valor == null || valor.isBlank()) {
            throw new IllegalArgumentException("CNPJ obrigatório!");
        }

        String cnpjLimpo = valor.replaceAll("[^0-9]", "");

        if (cnpjLimpo.length() != 14) {
            throw new IllegalArgumentException("CNPJ inválido!");
        }

        if (cnpjLimpo.matches("(\\d)\\1{13}")) {
            throw new IllegalArgumentException("CNPJ inválido!");
        }

        if (!validarCNPJ(cnpjLimpo)) {
            throw new IllegalArgumentException("CNPJ inválido!");
        }

        valor = cnpjLimpo;
    }

    private static boolean validarCNPJ(String cnpj) {
        int[] peso1 = {5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2};
        int[] peso2 = {6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2};

        int soma = 0;

        for (int i = 0; i < 12; i++) {
            soma += Character.getNumericValue(cnpj.charAt(i)) * peso1[i];
        }

        int resto = soma % 11;
        int digito1 = resto < 2 ? 0 : 11 - resto;

        if (digito1 != Character.getNumericValue(cnpj.charAt(12))) {
            return false;
        }

        soma = 0;

        for (int i = 0; i < 13; i++) {
            soma += Character.getNumericValue(cnpj.charAt(i)) * peso2[i];
        }

        resto = soma % 11;
        int digito2 = resto < 2 ? 0 : 11 - resto;

        return digito2 == Character.getNumericValue(cnpj.charAt(13));
    }
}