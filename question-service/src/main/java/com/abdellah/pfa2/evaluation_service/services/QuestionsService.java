package com.abdellah.pfa2.evaluation_service.services;

import com.abdellah.pfa2.evaluation_service.document.Question;
import com.abdellah.pfa2.evaluation_service.repositories.QuestionRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionsService{
    @Autowired
    QuestionRespository questionRespository;
    public List<Question> getAll(){
        return questionRespository.findAll();
    }
    public Question getById(String id){
        return questionRespository.findById(id).orElse(null);
    }
    public void deleteById(String id){
        questionRespository.deleteById(id);
    }
    public void create(Question question){
        questionRespository.save(question);
    }
    public Question update(Question question){
        return questionRespository.save(question);
    }
}
