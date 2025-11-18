"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import React from "react";
import { useFirebase } from "@/firebase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ThemeSwitcher } from "../theme-switcher";


const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { 
    label: "Services",
    items: [
        { href: "/services", title: "All Services", description: "View all our support options." },
        { href: "/services#domestic", title: "Domestic Assistance", description: "Help with daily household tasks." },
        { href: "/services#shopping", title: "Shopping Assistance", description: "Support for grocery and essential shopping." },
        { href: "/services#companion", title: "Companionship", description: "Friendly social interaction and support." },
        { href: "/services#transport", title: "Transport Assistance", description: "Safe travel to appointments and outings." },
        { href: "/services#welfare", title: "Welfare Checks", description: "Regular check-ins for safety and wellbeing." },
    ]
  },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact Us" },
];

function UserNav() {
    const { user, auth } = useFirebase();

    if (!user) {
        return null;
    }

    const getInitials = (email: string) => {
        return email ? email.substring(0, 2).toUpperCase() : '??';
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                       <AvatarImage src={user.photoURL || ''} alt={user.displayName || user.email || 'user'} />
                       <AvatarFallback>{getInitials(user.email!)}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.displayName}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => auth.signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useFirebase();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center">
        <Logo className="mr-8" />

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
             {navLinks.map((link) => (
                <NavigationMenuItem key={link.label}>
                    {link.items ? (
                        <>
                            <NavigationMenuTrigger className={cn(navigationMenuTriggerStyle(), "text-base bg-transparent", pathname.startsWith("/services") && "text-primary")}>{link.label}</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                {link.items.map((item) => (
                                    <ListItem
                                    key={item.title}
                                    title={item.title}
                                    href={item.href}
                                    >
                                    {item.description}
                                    </ListItem>
                                ))}
                                </ul>
                            </NavigationMenuContent>
                        </>
                    ) : (
                        <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "text-base bg-transparent", pathname === link.href && "text-primary")}>
                            <Link href={link.href!}>
                                {link.label}
                            </Link>
                        </NavigationMenuLink>
                    )}
                </NavigationMenuItem>
             ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex flex-1 items-center justify-end gap-2">
          <Button asChild className="hidden lg:flex rounded-full">
            <Link href="/booking">Book a Service</Link>
          </Button>
          {!user && (
            <Button asChild variant="ghost" className="hidden lg:flex rounded-full">
                <Link href="/login">Login</Link>
            </Button>
          )}
          <UserNav />
          <ThemeSwitcher />

          {/* Mobile Navigation */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open main menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0 flex flex-col">
              <SheetHeader className="flex-row justify-between items-center pr-6 pb-4">
                <SheetTitle>
                  <Logo />
                </SheetTitle>
                 <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <X className="h-6 w-6" />
                    </Button>
                 </SheetTrigger>
              </SheetHeader>
                <nav className="flex flex-col gap-6 text-lg font-medium pr-6">
                  {navLinks.map((link) => (
                    link.items ? (
                        <div key={link.label}>
                            <h3 className="text-muted-foreground mb-2">{link.label}</h3>
                            <div className="flex flex-col gap-4 pl-4 border-l">
                            {link.items.map(item => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "transition-colors hover:text-primary",
                                        pathname === item.href ? "text-primary font-semibold" : "text-foreground/80",
                                    )}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                    {item.title}
                                </Link>
                            ))}
                            </div>
                        </div>
                    ) : (
                        <Link
                            key={link.href}
                            href={link.href!}
                            className={cn(
                                "transition-colors hover:text-primary",
                                pathname === link.href ? "text-primary font-semibold" : "text-foreground/80",
                            )}
                            onClick={() => setIsMobileMenuOpen(false)}
                            >
                            {link.label}
                        </Link>
                    )
                  ))}
                </nav>
                <div className="mt-auto pr-6 pb-6 space-y-4">
                  { user ? (
                     <Button asChild size="lg" className="w-full rounded-full" variant="outline" onClick={() => {
                        auth.signOut();
                        setIsMobileMenuOpen(false);
                     }}>
                        <Link href="/">Log Out</Link>
                     </Button>
                  ) : (
                     <Button asChild size="lg" className="w-full rounded-full" variant="outline">
                        <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                      </Button>
                  )}
                   <Button asChild size="lg" className="w-full rounded-full">
                    <Link href="/booking" onClick={() => setIsMobileMenuOpen(false)}>Book Now</Link>
                  </Button>
                </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
