package com.klef.dev.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.klef.dev.entity.Medicine;
import com.klef.dev.repository.MedicineRepository;

@Service
public class MedicineServiceImpl implements MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;

    @Override
    public Medicine addMedicine(Medicine medicine) {
        return medicineRepository.save(medicine);
    }

    @Override
    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    @Override
    public Medicine getMedicineById(int id) {
        Optional<Medicine> opt = medicineRepository.findById(id);
        return opt.orElse(null);
    }

    @Override
    public Medicine updateMedicine(Medicine medicine) {
        return medicineRepository.save(medicine);
    }

    @Override
    public void deleteMedicineById(int id) {
        medicineRepository.deleteById(id);
    }
}
