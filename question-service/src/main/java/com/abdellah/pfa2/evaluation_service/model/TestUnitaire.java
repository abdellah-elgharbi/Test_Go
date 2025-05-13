package com.abdellah.pfa2.evaluation_service.model;


public class TestUnitaire {
    private String id;
    private String description;
    private Object input;
    private Object expectedOutput;
    private Boolean isHidden;

    public TestUnitaire() {
    }

    public TestUnitaire(String id, String description, Object input, Object expectedOutput, Boolean isHidden) {
        this.id = id;
        this.description = description;
        this.input = input;
        this.expectedOutput = expectedOutput;
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

    public Object getInput() {
        return input;
    }

    public void setInput(Object input) {
        this.input = input;
    }

    public Object getExpectedOutput() {
        return expectedOutput;
    }

    public void setExpectedOutput(Object expectedOutput) {
        this.expectedOutput = expectedOutput;
    }

    public Boolean getIsHidden() {
        return isHidden;
    }

    public void setIsHidden(Boolean isHidden) {
        this.isHidden = isHidden;
    }
}
