# ProjetcCloud-BasedHealthcareApplication

# Relationships:

User → Role: (1-1)

- A user belongs to a role (roleId).

User → Patient: (1-1)

- A user can be a patient (userId in Patient).

User → Doctor: (1-1)

- A user can be a doctor (userId in Doctor).

Patient → Appointment: (1-♾)

- A patient can have multiple appointments (patientId in Appointment).

Doctor → Appointment: (1-♾)

- A doctor can have multiple appointments (doctorId in Appointment).

Patient → MedicalRecord: (1-♾)

- A patient can have multiple medical records (patientId in MedicalRecord).

Doctor → MedicalRecord: (1-♾)

- A doctor can create multiple medical records (doctorId in MedicalRecord).

User → Notification: (1-♾)

- A user can receive multiple notifications (userId in Notification).

Patient → Billing: (1-♾)

- A patient can have multiple billing entries (patientId in Billing).

Doctor → Specialty: (1-1)

- A doctor belongs to a specialty (specialtyId in Doctor).

User → ActivityLog: (1-♾)

- A user can have multiple activity logs (userId in ActivityLog).
