package com.klef.dev.service;

import java.util.List;
import com.klef.dev.entity.Medicine;

public interface MedicineService {
    Medicine addMedicine(Medicine medicine);
    List<Medicine> getAllMedicines();
    Medicine getMedicineById(int id);
    Medicine updateMedicine(Medicine medicine);
    void deleteMedicineById(int id);
}
