package com.fpa2.filiere_module.filier_module_service.services;


import com.fpa2.filiere_module.filier_module_service.document.Filiere;
import com.fpa2.filiere_module.filier_module_service.document.Module;
import com.fpa2.filiere_module.filier_module_service.repositories.FilierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.processing.Filer;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FilierService {
    @Autowired
    FilierRepository filierRepository;

    public Filiere getFiliereById(String id) {
        return filierRepository.findById(id).orElse(null);
    }
    public List<Filiere> getAllFilieres() {
        return filierRepository.findAll();
    }
    public boolean addFiliere(Filiere filiere) {
        return filierRepository.save(filiere)!=null;
    }
    public boolean updateFiliere(Filiere filiere) {
        return filierRepository.save(filiere)!=null;
    }
    public void deleteFiliere(String id) {
        filierRepository.deleteById(id);
    }
    public Filiere deleteModuleFromFiliere(String idModule, String idFiliere) {
        Filiere filiere = getFiliereById(idFiliere);
        if (filiere != null && filiere.getModules() != null) {
            List<Module> modules = filiere.getModules().stream().filter(module -> !(idModule.equals(module.getId()))).collect(Collectors.toList());
            filierRepository.save(filiere);

        }
        return filiere;
    }
}
