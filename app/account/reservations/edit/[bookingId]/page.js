import SubmitButton from '@/app/_components/SubmitButton'
import { updateBooking } from '@/app/_lib/actions'
import { getBooking, getCabin } from '@/app/_lib/data-service'

export async function generateMetadata({ params }) {
  const { id } = await getBooking(params.bookingId)
  return { title: `Reservation ${id}` }
}

export default async function Page({ params }) {
  const {
    id: reservationId,
    cabinId,
    numGuests,
    observations,
  } = await getBooking(params.bookingId)
  const { maxCapacity } = await getCabin(cabinId)
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <form
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
        action={updateBooking}
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={numGuests}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            defaultValue={observations}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <SubmitButton pendingLabel="updating....">
            Update reservation
          </SubmitButton>
        </div>
        <input
          name="reservationId"
          type="hidden"
          defaultValue={reservationId}
        />
      </form>
    </div>
  )
}
