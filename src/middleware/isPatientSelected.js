export default function isPatientSelected ({ next, store }) {
  if (store.getters['patient/activePatient'].id === 0) {
    return next({
      name: 'Patients'
    })
  }

  return next()
}
