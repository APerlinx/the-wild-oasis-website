'use server'

import { revalidatePath } from 'next/cache'
import { auth, signIn, signOut } from './auth'
import { supabase } from './supabase'
import { getBookings } from './data-service'
import { redirect } from 'next/navigation'

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

  const { error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', session.user.guestId)

  if (error) throw new Error('Guest could not be updated')
  revalidatePath('/account/profile')
}

export async function deleteBooking(bookingId) {
  const session = await auth()
  if (!session) throw new Error('You must be logged in')

  const guestBookings = await getBookings(session.user.guestId)
  const guestBookingsIds = guestBookings.map((booking) => booking.id)
  if (!guestBookingsIds.includes(bookingId))
    throw new Error('You are not allowed to delete this booking!')

  const { error } = await supabase.from('bookings').delete().eq('id', bookingId)
  if (error) throw new Error('Booking could not be deleted')
  revalidatePath('/account/reservations')
}

export async function updateBooking(formData) {
  const numGuests = Number(formData.get('numGuests'))
  const observations = formData.get('observations')
  const reservationId = Number(formData.get('reservationId'))

  const session = await auth()
  if (!session) throw new Error('You must be logged in')
  if (!/^[a-zA-Z0-9\s.,!?'"():;*&%-]{0,500}$/.test(observations))
    throw new Error('Invalid: only letter allowed (0-500 characters)')

  const { error } = await supabase
    .from('bookings')
    .update({ numGuests, observations })
    .eq('id', reservationId)
    .select()
    .single()

  if (error) throw new Error('Booking could not be updated')
  revalidatePath(`/account/reservations/edit/${reservationId}`)
  revalidatePath('/account/reservations')

  redirect('/account/reservations')
}

export async function createBooking(bookingData, formData) {
  const session = await auth()
  if (!session) throw new Error('You must be logged in')

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get('numGuests')),
    observations: formData.get('observations').slice(0, 500),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: 'unconfirmed',
  }
  const { error } = await supabase.from('bookings').insert([newBooking])

  if (error) throw new Error('Booking could not be created')
  revalidatePath(`/cabins/${bookingData.cabinId}`)
  redirect('/cabins/thankyou')
}
