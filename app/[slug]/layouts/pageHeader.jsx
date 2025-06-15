import SwitchComponent from "@/app/components/switchComponent";

export default function PageHeader({ header }) {
  return (
    <header className={'page-header'}>
      <SwitchComponent pageContent={header} />
    </header>
  )
}