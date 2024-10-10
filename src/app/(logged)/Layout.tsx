import Sidemenu from "@/components/Sidemenu"

interface LayoutProps {
    children: React.ReactNode;
  }  

export default function Layout({ children }:LayoutProps) {
  return
    <section className="flex">
        <Sidemenu/>
        {children}
    </section>
}