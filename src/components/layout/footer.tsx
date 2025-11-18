import { Logo } from "@/components/logo";
import Link from "next/link";
import { Mail, Phone, Clock, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
];

const serviceLinks = [
    { href: "/services#domestic", label: "Domestic Assistance" },
    { href: "/services#shopping", label: "Shopping Assistance" },
    { href: "/services#companion", label: "Companionship" },
    { href: "/services#transport", label: "Transport Assistance" },
    { href: "/services#welfare", label: "Welfare Checks" },
]

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-4 text-muted-foreground pr-8">
              Your trusted partner for compassionate non-clinical support, helping seniors live with dignity and independence.
            </p>
             <div className="mt-6 space-y-3">
              <a href="mailto:carewiseaustralia@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5 text-primary" />
                <span>carewiseaustralia@gmail.com</span>
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-5 w-5 text-primary" />
                <span>(Phone number not specified)</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock className="h-5 w-5 text-primary" />
                <span>8am - 4pm, Monday to Friday</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <h3 className="font-semibold tracking-wider uppercase text-foreground">Navigate</h3>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <h3 className="font-semibold tracking-wider uppercase text-foreground">Services</h3>
            <ul className="mt-4 space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
             <h3 className="font-semibold tracking-wider uppercase text-foreground">Stay Connected</h3>
             <p className="mt-4 text-muted-foreground">
                Sign up for our newsletter to receive updates and helpful resources.
             </p>
             <form className="mt-4 flex gap-2">
                <Input type="email" placeholder="Your email address" className="bg-background" />
                <Button type="submit" variant="default">Subscribe</Button>
             </form>
          </div>
        </div>
        <div className="mt-16 border-t pt-8 flex flex-col md:flex-row justify-between items-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} CareWise Companion. All rights
            reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
