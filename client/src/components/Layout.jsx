import React from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "../components/ui/resizable-navbar";

const navItems = [];

export default function Layout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  return (
    <div className="relative w-full min-h-screen bg-neutral-900">
      <Navbar className="sticky top-0 z-50 bg-neutral-900 text-white shadow-lg border-neutral-800">
        <NavBody>
          <NavbarLogo className="text-white" />
          <NavItems
            items={navItems.length > 0 ? navItems : []}
            className="text-white"
          />
          <div className="flex items-center gap-4">
            <NavbarButton
              variant="secondary"
              className="bg-neutral-800 text-white border border-neutral-700 hover:bg-neutral-700"
            >
              Login
            </NavbarButton>
          </div>
        </NavBody>
        <MobileNav>
          <MobileNavHeader className="bg-neutral-900">
            <NavbarLogo className="text-white" />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white"
            />
          </MobileNavHeader>
          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            className="bg-neutral-900 text-white border-t border-neutral-800"
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-white hover:text-indigo-400"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4 mt-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Login
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      <main>{children}</main>
    </div>
  );
}
