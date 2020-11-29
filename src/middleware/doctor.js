export default function doctor ({ next, store }) {
  if (
    store.getters.user.role !== 'doctor' &&
      store.getters.user.role !== 'user'
  ) {
    return next({
      name: 'Dashboard'
    })
  }

  return next()
}
