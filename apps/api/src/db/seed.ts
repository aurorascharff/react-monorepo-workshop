import Database from 'better-sqlite3'
import path from 'path'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { patients, journals } from './schema'
import { sql } from 'drizzle-orm'

const dbPath = path.join(__dirname, '../../data/klinikk.sqlite')
const sqlite = new Database(dbPath)
const db = drizzle(sqlite)

function seed() {
  console.log('Seeding database...')

  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS patients (
      id TEXT PRIMARY KEY,
      navn TEXT NOT NULL,
      fodselsdato TEXT NOT NULL,
      kjonn TEXT NOT NULL,
      diagnose TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS journals (
      id TEXT PRIMARY KEY,
      pasient_id TEXT NOT NULL REFERENCES patients(id),
      tittel TEXT NOT NULL,
      dato TEXT NOT NULL,
      innhold TEXT NOT NULL,
      status TEXT NOT NULL
    );
  `)

  db.delete(journals).run()
  db.delete(patients).run()

  db.insert(patients)
    .values([
      {
        id: 'p1',
        navn: 'Kari Nordmann',
        fodselsdato: '1975-03-12',
        kjonn: 'kvinne',
        diagnose: 'Type 2 diabetes mellitus',
      },
      {
        id: 'p2',
        navn: 'Ole Hansen',
        fodselsdato: '1960-07-28',
        kjonn: 'mann',
        diagnose: 'Hypertensjon',
      },
      {
        id: 'p3',
        navn: 'Ingrid Berg',
        fodselsdato: '1988-11-05',
        kjonn: 'kvinne',
        diagnose: 'Astma bronkiale',
      },
      {
        id: 'p4',
        navn: 'Tor Eriksen',
        fodselsdato: '1952-01-19',
        kjonn: 'mann',
        diagnose: 'Koronarsykdom',
      },
      {
        id: 'p5',
        navn: 'Marit Johansen',
        fodselsdato: '1993-06-30',
        kjonn: 'kvinne',
        diagnose: 'Revmatoid artritt',
      },
      {
        id: 'p6',
        navn: 'Erik Olsen',
        fodselsdato: '1968-09-14',
        kjonn: 'mann',
        diagnose: 'Kronisk nyresvikt',
      },
    ])
    .run()

  db.insert(journals)
    .values([
      {
        id: 'j1',
        pasientId: 'p1',
        tittel: 'Rutinekontroll blodsukkermåling',
        dato: '2025-04-10',
        innhold:
          'Pasienten møtte til rutinekontroll. HbA1c målt til 7.2%, som er akseptabelt men noe høyt. Pasienten rapporterer god etterlevelse av medikamentell behandling. Kostholdsrådgivning gitt. Neste kontroll om 3 måneder.',
        status: 'avsluttet',
      },
      {
        id: 'j2',
        pasientId: 'p1',
        tittel: 'Oppfølging fotundersøkelse',
        dato: '2025-05-01',
        innhold:
          'Undersøkelse av føtter viser ingen tegn til nevropati eller sår. Pasienten instruert i daglig fotpleie. Videre oppfølging hos podolog anbefalt.',
        status: 'aktiv',
      },
      {
        id: 'j3',
        pasientId: 'p2',
        tittel: 'Blodtrykksmåling og medisinering',
        dato: '2025-04-22',
        innhold:
          'Blodtrykk målt til 148/92 mmHg. Noe høyt. Dosen av Amlodipine økes fra 5 mg til 10 mg daglig. Pasienten anbefales å redusere saltinntak og øke fysisk aktivitet. Kontroll om 4 uker.',
        status: 'aktiv',
      },
      {
        id: 'j4',
        pasientId: 'p2',
        tittel: 'Notat: Pasientsamtale',
        dato: '2025-05-02',
        innhold: 'Kort samtale om livsstilsendringer.',
        status: 'utkast',
      },
      {
        id: 'j5',
        pasientId: 'p3',
        tittel: 'Spirometriundersøkelse',
        dato: '2025-03-15',
        innhold:
          'FEV1/FVC ratio: 0.72. Mild til moderat obstruksjon. Inhalasjonsteknikkopplæring gjennomgått. Pasienten fikk utdelt ny inhalator med spacer. Symptomene rapporteres som under god kontroll ved riktig bruk.',
        status: 'avsluttet',
      },
      {
        id: 'j6',
        pasientId: 'p3',
        tittel: 'Allergitest resultater',
        dato: '2025-05-03',
        innhold:
          'Prikketesting viser positiv reaksjon for husstøvmidd og bjørkepollen. Antihistamin anbefalt i pollenesesong. Henvisning til allergolog sendt.',
        status: 'aktiv',
      },
      {
        id: 'j7',
        pasientId: 'p4',
        tittel: 'EKG og hjerteundersøkelse',
        dato: '2025-04-05',
        innhold:
          'EKG viser sinusrytme uten tegn til akutt iskemi. Troponin T negativ x2. Pasienten rapporterer stabil angina pectoris med god effekt av nitrospray. Kolesterol kontrollert: LDL 2.1 mmol/L. Behandling videreføres.',
        status: 'avsluttet',
      },
      {
        id: 'j8',
        pasientId: 'p5',
        tittel: 'Leddstatus og inflammasjonsmarkører',
        dato: '2025-04-28',
        innhold:
          'CRP: 18 mg/L (moderat forhøyet). DAS28 score: 3.8. Svelling i MCP-ledd bilateralt. Metotrexat dosen justert. Kalsium og vitamin D tilskudd gitt. Pasienten vil starte fysioterapi 2x ukentlig.',
        status: 'aktiv',
      },
      {
        id: 'j9',
        pasientId: 'p6',
        tittel: 'Nyrefunksjonstest eGFR',
        dato: '2025-04-18',
        innhold:
          'eGFR: 28 mL/min/1.73m². Stadiet klassifiseres som CKD stadium 4. Pasienten er henvist til nefrolog for vurdering av dialysestart. Ernæringsrådgivning igangsatt. Strengt proteinholdige matvarer begrenses.',
        status: 'aktiv',
      },
    ])
    .run()

  console.log('Seeding complete!')
  sqlite.close()
}

seed()
