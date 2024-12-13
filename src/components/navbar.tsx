import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b">
      <Link href="/" className="text-xl font-bold hover:text-primary/90 transition-colors">
        DNS Resolver
      </Link>
      <div className="flex gap-4 items-center justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">About</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>DNS Resolver - Computer Networks OEL</DialogTitle>
              <DialogDescription className="space-y-4 pt-4">
                <p>
                  A web application for resolving and managing DNS entries with filtering
                  and search capabilities.
                </p>
                <div className="space-y-2">
                  <h4 className="font-medium">Submitted By:</h4>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Ahmed Javed</li>
                    <li>Abdul Rehman</li>
                    <li>Sabahat Ul Hasan</li>
                  </ul>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;