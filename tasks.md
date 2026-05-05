# Oppgaver per modul

Alle oppgaver gjøres i `apps/arena/` med utgangspunkt i starter-codebase.  
Fasit finnes i `dips-workshop` (ferdig versjon).

> Detaljer om hvordan modulene gjennomføres ligger i [plan.md](plan.md).  
> Her beskriver vi **målet** for hver modul — _hva_ som skal være sant når dere er ferdige, ikke steg for steg hvordan dere kommer dit.

---

## Modul 1 — Arkitektur og Gjenbruk

**Mål:** Gjør codebasen lesbar og gjenbrukbar.

- Filene er organisert etter _hva appen gjør_, ikke etter filtype
- Hver komponent har ett ansvar
- Domenelogikk (f.eks. status → farge) bor i komponentbiblioteket, ikke spredt i appene
- En feil i én del av siden krasjer ikke hele appen

---

## Modul 2 — Routing

**Mål:** URL-en er kilden til sannhet for hva brukeren ser.

- Hver side har sin egen URL og kan bokmerkes
- Navigasjon skjer uten full sidelast
- Felles UI (header, sidebar) deles mellom sider uten duplisering
- Aktiv side er visuelt tydelig i navigasjonen

---

## Modul 3 — State og Effects

**Mål:** State er minimal og avledet der det er mulig.

- Det som kan beregnes blir beregnet — ikke lagret
- Ingen `useEffect` som synkroniserer state med annen state
- Logikk som brukes flere steder er trukket ut til en hook
- ESLint rapporterer ingen `react-hooks`-advarsler

---

## Modul 4 — TanStack Query

**Mål:** Data håndteres deklarativt — vi beskriver _hva_ vi vil ha, ikke _hvordan_ vi henter det.

- Ingen `useEffect` brukes til datafetching
- Loading- og error-tilstander er synlige for brukeren
- Cache gjenbrukes på tvers av navigasjon (rask back/forward)
- Mutasjoner oppdaterer relevante queries automatisk
- Nettverksfeil fanges av en Error Boundary

---

## Modul 5 — Skjema

**Mål:** Ugyldig data slipper aldri gjennom skjemaet.

- Validering er definert i et Zod-schema, ikke spredt i komponenten
- Feilmeldinger vises per felt
- Submit er deaktivert eller blokkert ved ugyldig tilstand
- Vellykket innsending oppdaterer UI uten manuell refresh
- Server-feil vises forståelig til brukeren
