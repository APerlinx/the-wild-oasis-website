import Spinner from '@/app/_components/Spinner'

export default function LoadBindings() {
  return (
    <div className="grid items-center justify-center">
      <p className="text-xl text-primary-200">Loading cabin...</p>
      <Spinner />
    </div>
  )
}
