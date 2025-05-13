package com.pfa2.evaluation_serivce.model;

public class ResponseDto {
    private String status;
    private String result;

    // Constructeurs
    public ResponseDto() {
    }

    public ResponseDto(String status, String result) {
        this.status = status;
        this.result = result;
    }

    // Getters et Setters
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    // toString() pour faciliter les affichages
    @Override
    public String toString() {
        return "ResponseDto{" +
                "status='" + status + '\'' +
                ", result='" + result + '\'' +
                '}';
    }
}
