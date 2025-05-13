package com.fpa2.filiere_module.filier_module_service.controllers;

import com.fpa2.filiere_module.filier_module_service.document.Filiere;
import com.fpa2.filiere_module.filier_module_service.services.FilierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/filier-module-service/")
public class FilierController {
@Autowired
FilierService filierService;
   @GetMapping("getAllFileire")
    public ResponseEntity <List<Filiere>> getAllFilieres() {
        return ResponseEntity.ok(filierService.getAllFilieres());
    }
    @GetMapping("getFilier/{id}")
    public ResponseEntity <Filiere> getFiliereById(@PathVariable String id) {
       return ResponseEntity.ok(filierService.getFiliereById(id));
    }
    @PutMapping("updateFilier")
    public ResponseEntity <Boolean> updateFiliere(@RequestBody Filiere filiere) {
       return   ResponseEntity.ok(filierService.updateFiliere(filiere));
    }
    @PostMapping("addFilier")
    public ResponseEntity <Boolean> addFiliere(@RequestBody Filiere filiere) {
        return   ResponseEntity.ok(filierService.addFiliere(filiere));
    }
  @DeleteMapping("deleteFilier/{id}")
    public ResponseEntity <Boolean> deleteFiliere(@PathVariable String id) {
       filierService.deleteFiliere(id);
       if(ResponseEntity.ok(filierService.getFiliereById(id))==null) {
           return ResponseEntity.ok(false);
       };
       return ResponseEntity.ok(true);
  }
  @PostMapping("delete-module-from-filier/{idFilier}/{idModule}")
    public ResponseEntity<Filiere> deleteModuleFromFiliere(@PathVariable String idFilier, @PathVariable String idModule)
  {
      return ResponseEntity.ok(filierService.deleteModuleFromFiliere(idModule,idFilier));
  }


}
