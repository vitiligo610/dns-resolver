import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b">
      <Link href="/" className="text-xl font-bold hover:text-primary/80 transition-transform">DNS Resolver</Link>
      <div className="flex gap-4 items-center justify-center">
        <Button variant="outline">
          About
        </Button>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;