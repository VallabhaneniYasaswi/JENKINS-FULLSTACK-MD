package com.klef.dev.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.klef.dev.entity.Medicine;
import com.klef.dev.service.MedicineService;

@RestController
@RequestMapping("/medicineapi/")
@CrossOrigin(origins = "*")
public class MedicineController {

    @Autowired
    private MedicineService medicineService;

    @GetMapping("/")
    public String home() {
        return "Medicine Store App is Running...";
    }

    @PostMapping("/add")
    public ResponseEntity<Medicine> addMedicine(@RequestBody Medicine medicine) {
        Medicine saved = medicineService.addMedicine(medicine);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Medicine>> getAllMedicines() {
        List<Medicine> medicines = medicineService.getAllMedicines();
        return new ResponseEntity<>(medicines, HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getMedicineById(@PathVariable int id) {
        Medicine medicine = medicineService.getMedicineById(id);
        if (medicine != null) {
            return new ResponseEntity<>(medicine, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Medicine with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateMedicine(@RequestBody Medicine medicine) {
        Medicine existing = medicineService.getMedicineById(medicine.getId());
        if (existing != null) {
            Medicine updated = medicineService.updateMedicine(medicine);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot update. Medicine with ID " + medicine.getId() + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteMedicine(@PathVariable int id) {
        Medicine existing = medicineService.getMedicineById(id);
        if (existing != null) {
            medicineService.deleteMedicineById(id);
            return new ResponseEntity<>("Medicine with ID " + id + " deleted successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot delete. Medicine with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }
}
