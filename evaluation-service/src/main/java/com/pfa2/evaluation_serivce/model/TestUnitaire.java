package com.pfa2.evaluation_serivce.model;


import java.util.List;

public class TestUnitaire {
    private String id;
    private String description;
    private String input;
    private String expectedOutput;
    private Boolean isHidden;

    private String fileName;

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public TestUnitaire() {
    }



    public TestUnitaire(String id, String description, List<String> input, List<String> expectedOutput, Boolean isHidden) {
        this.id = id;
        this.description = description;

        this.isHidden = isHidden;

    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getInput() {
        return input;
    }

    public void setInput(String input) {
        this.input = input;
    }

    public Object getExpectedOutput() {
        return expectedOutput;
    }

    public void setExpectedOutput(String expectedOutput) {
        this.expectedOutput = expectedOutput;
    }

    public Boolean getIsHidden() {
        return isHidden;
    }

    public void setIsHidden(Boolean isHidden) {
        this.isHidden = isHidden;
    }
}
