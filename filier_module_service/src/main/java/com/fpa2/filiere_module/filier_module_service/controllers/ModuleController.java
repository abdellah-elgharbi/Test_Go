package com.fpa2.filiere_module.filier_module_service.controllers;

import com.fpa2.filiere_module.filier_module_service.services.ModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fpa2.filiere_module.filier_module_service.document.Module;
import javax.swing.text.StyledEditorKit;
import java.util.List;
@RestController
@RequestMapping("/api/module/")
public class    ModuleController {

    @Autowired
    private ModuleService moduleService;

    @GetMapping("getAll")
    public ResponseEntity<List<Module>> getAll() {
        return ResponseEntity.ok(moduleService.getAllModules());
    }

    @GetMapping("getAll/{id}")
    public ResponseEntity<Module> getById(@PathVariable String id) {
        return ResponseEntity.ok(moduleService.getModuleById(id));
    }

    @PostMapping("addmodule")
    public ResponseEntity<Module> addModule(@RequestBody Module module) {
        return ResponseEntity.ok(moduleService.addModule(module));
    }

    @PutMapping("updateModule")
    public ResponseEntity<Module> updateModule(@RequestBody Module module) {
        return ResponseEntity.ok(moduleService.updateModule(module));
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Boolean> deleteModule(@PathVariable String id) {
        moduleService.deleteModule(id);
        return ResponseEntity.ok(moduleService.getModuleById(id) == null);
    }
}
