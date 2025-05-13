package com.fpa2.filiere_module.filier_module_service.services;


import com.fpa2.filiere_module.filier_module_service.repositories.ModuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fpa2.filiere_module.filier_module_service.document.Module;
import java.util.List;

@Service
public class ModuleService {
    @Autowired
    private ModuleRepository moduleRepository;

    public List<Module> getAllModules() {
        return moduleRepository.findAll();
    }
    public Module getModuleById(String id) {
        return moduleRepository.findById(id).orElse(null);

    }
    public Module addModule(Module module) {
        return moduleRepository.save(module);
    }
    public Module updateModule(Module module) {
        return moduleRepository.save(module);
    }
    public void deleteModule(String id) {
        moduleRepository.deleteById(id);
    }
}
