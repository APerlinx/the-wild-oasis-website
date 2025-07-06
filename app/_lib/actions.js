'use server'

import { auth, signIn, signOut } from './auth'

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' })
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' })
}

export async function updateGuest(formData) {
  const session = await auth()
  if (!session) throw new Error('You must be logged in')
  const nationalID = formData.get('nationalID')
  const [nationality, countryFlag] = formData.get('nationality').split('%')
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error('Please provie valid nationail ID')

  const updateData = { nationality, countryFlag, nationalID }
  console.log(updateData)
}
