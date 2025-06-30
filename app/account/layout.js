import SideNavigation from '../_components/SideNavigation'

export default function Layout({ children }) {
  return (
    <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
      <SideNavigation />
      <div className="scroll-py-14">{children}</div>
    </div>
  )
}
