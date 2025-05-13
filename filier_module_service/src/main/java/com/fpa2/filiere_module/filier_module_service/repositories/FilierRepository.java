package com.fpa2.filiere_module.filier_module_service.repositories;

import com.fpa2.filiere_module.filier_module_service.document.Filiere;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface  FilierRepository extends MongoRepository<Filiere,String> {
}
