import SignOutButton from "./SignOutButton"

interface HeaderProps {
  name: string | null | undefined
  email: string | null | undefined
}

export default function Header({ name, email }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-foreground/10">
      <span className="text-sm text-foreground/60">
        {name ?? email}
      </span>
      <SignOutButton />
    </header>
  )
}
