import Database from 'better-sqlite3'
import path from 'path'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { patients, journals } from './schema'

const dbPath = path.join(__dirname, '../../data/medix.sqlite')
const sqlite = new Database(dbPath)
const db = drizzle(sqlite)

function seed() {
  console.log('Seeding database...')

  sqlite.exec(`
    DROP TABLE IF EXISTS journals;
    DROP TABLE IF EXISTS patients;

    CREATE TABLE patients (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      date_of_birth TEXT NOT NULL,
      gender TEXT NOT NULL,
      diagnosis TEXT NOT NULL
    );

    CREATE TABLE journals (
      id TEXT PRIMARY KEY,
      patient_id TEXT NOT NULL REFERENCES patients(id),
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      content TEXT NOT NULL,
      status TEXT NOT NULL
    );
  `)

  db.insert(patients)
    .values([
      {
        id: 'p1',
        name: 'Mary Smith',
        dateOfBirth: '1975-03-12',
        gender: 'female',
        diagnosis: 'Type 2 diabetes mellitus',
      },
      {
        id: 'p2',
        name: 'Robert Hansen',
        dateOfBirth: '1960-07-28',
        gender: 'male',
        diagnosis: 'Hypertension',
      },
      {
        id: 'p3',
        name: 'Emily Bergman',
        dateOfBirth: '1988-11-05',
        gender: 'female',
        diagnosis: 'Bronchial asthma',
      },
      {
        id: 'p4',
        name: 'Thomas Erickson',
        dateOfBirth: '1952-01-19',
        gender: 'male',
        diagnosis: 'Coronary artery disease',
      },
      {
        id: 'p5',
        name: 'Margaret Johnson',
        dateOfBirth: '1993-06-30',
        gender: 'female',
        diagnosis: 'Rheumatoid arthritis',
      },
      {
        id: 'p6',
        name: 'Eric Olson',
        dateOfBirth: '1968-09-14',
        gender: 'male',
        diagnosis: 'Chronic kidney disease',
      },
    ])
    .run()

  db.insert(journals)
    .values([
      {
        id: 'j1',
        patientId: 'p1',
        title: 'Routine blood glucose check',
        date: '2025-04-10',
        content:
          'Patient attended routine follow-up. HbA1c measured at 7.2%, acceptable but slightly elevated. Patient reports good adherence to medication. Dietary counseling provided. Next check-in in 3 months.',
        status: 'closed',
      },
      {
        id: 'j2',
        patientId: 'p1',
        title: 'Foot examination follow-up',
        date: '2025-05-01',
        content:
          'Foot exam shows no signs of neuropathy or ulceration. Patient instructed in daily foot care. Referral to podiatrist recommended for ongoing review.',
        status: 'active',
      },
      {
        id: 'j3',
        patientId: 'p2',
        title: 'Blood pressure and medication review',
        date: '2025-04-22',
        content:
          'Blood pressure measured at 148/92 mmHg, somewhat elevated. Amlodipine dose increased from 5 mg to 10 mg daily. Patient advised to reduce salt intake and increase physical activity. Follow-up in 4 weeks.',
        status: 'active',
      },
      {
        id: 'j4',
        patientId: 'p2',
        title: 'Note: patient conversation',
        date: '2025-05-02',
        content: 'Brief conversation about lifestyle changes.',
        status: 'draft',
      },
      {
        id: 'j5',
        patientId: 'p3',
        title: 'Spirometry test',
        date: '2025-03-15',
        content:
          'FEV1/FVC ratio: 0.72. Mild to moderate obstruction. Inhaler technique reviewed. Patient issued new inhaler with spacer. Symptoms reported as well-controlled with correct use.',
        status: 'closed',
      },
      {
        id: 'j6',
        patientId: 'p3',
        title: 'Allergy test results',
        date: '2025-05-03',
        content:
          'Skin prick testing positive for house dust mite and birch pollen. Antihistamine recommended during pollen season. Referral to allergist sent.',
        status: 'active',
      },
      {
        id: 'j7',
        patientId: 'p4',
        title: 'ECG and cardiac evaluation',
        date: '2025-04-05',
        content:
          'ECG shows sinus rhythm with no signs of acute ischemia. Troponin T negative x2. Patient reports stable angina pectoris with good response to nitrospray. Cholesterol controlled: LDL 2.1 mmol/L. Treatment continued.',
        status: 'closed',
      },
      {
        id: 'j8',
        patientId: 'p5',
        title: 'Joint status and inflammation markers',
        date: '2025-04-28',
        content:
          'CRP: 18 mg/L (moderately elevated). DAS28 score: 3.8. Bilateral MCP joint swelling. Methotrexate dose adjusted. Calcium and vitamin D supplements added. Patient will begin physiotherapy 2x weekly.',
        status: 'active',
      },
      {
        id: 'j9',
        patientId: 'p6',
        title: 'Renal function test eGFR',
        date: '2025-04-18',
        content:
          'eGFR: 28 mL/min/1.73m². Classified as CKD stage 4. Patient referred to nephrologist for evaluation of dialysis start. Nutritional counseling initiated. High-protein foods to be limited.',
        status: 'active',
      },
    ])
    .run()

  console.log('Seeding complete!')
  sqlite.close()
}

seed()
