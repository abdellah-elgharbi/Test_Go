package com.abdellah.pfa2.evaluation_service.repositories;

import com.abdellah.pfa2.evaluation_service.document.Question;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRespository extends MongoRepository<Question,String> {
}
