import { ReactNode } from 'react'
import Footer from 'src/components/Footer'
import Header from 'src/components/Header'
import { memo } from 'react'
import { Outlet } from 'react-router-dom'

interface Props {
  children?: ReactNode
}

function MainLayoutInner({ children }: Props) {
  return (
    <div>
      <Header />
      {children}
      <Outlet />
      <Footer />
    </div>
  )
}

const MainLayout = memo(MainLayoutInner)
export default MainLayout
