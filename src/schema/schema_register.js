import { allergiesPageState } from '@/schema/allergies_page_state'
import { contactsPageState } from '@/schema/contacts_page_state'
import { diagnosisPageState } from '@/schema/diagnosis_page_state'
import { eventsPageState } from '@/schema/events_page_state'
import { medicationsPageState } from '@/schema/medications_page_state'
import { patientsPageState } from '@/schema/patients_page_state'
import { userPageState } from '@/schema/user_state'
import { vaccinationsPageState } from '@/schema/vaccinations_page_state'
import { vitalsPageState } from '@/schema/vitals_page_state'

const CrudRegistry = {

  allergies: allergiesPageState,
  contacts: contactsPageState,
  diagnosis: diagnosisPageState,
  events: eventsPageState,
  medications: medicationsPageState,
  patients: patientsPageState,
  users: userPageState,
  vaccinations: vaccinationsPageState,
  vitals: vitalsPageState

}

export default CrudRegistry
