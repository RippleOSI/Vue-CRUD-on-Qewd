export default function isPatientSelected ({ next, store }) {
  if (store.getters.patient.activePatient) {
    return next({
      name: 'TablePage',
      params: {
        view: 'patients'
      }
    })
  }

  return next()
}
