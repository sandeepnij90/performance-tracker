import Link from "next/link";
import AvatarMenu from "./AvatarMenu";
import LoginButton from "./LoginButton";

interface HeaderProps {
  name: string | null | undefined;
  email: string | null | undefined;
  isSignedIn: boolean;
}

export default function Header({ name, email, isSignedIn }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-foreground/10">
      <Link href="/" className="text-sm font-medium hover:text-foreground/80 transition-colors">
        Performance Tracker
      </Link>
      {isSignedIn ? (
        <AvatarMenu name={name} email={email} />
      ) : (
        <LoginButton />
      )}
    </header>
  );
}
