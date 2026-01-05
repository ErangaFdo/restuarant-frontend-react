'use client'

import { useState } from 'react'
import { Dialog, DialogPanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { Link } from "react-router-dom";

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Our Menu', href: '/menu' },
  { name: 'Feedback', href: '/feedbacak' },
  { name: 'Contact Us', href: '/contact' },
]

export default function AnjalFarmHero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-orange-500 border-b border-white/20 shadow-md">
      <nav aria-label="Global" className="flex items-center justify-between p-2 lg:px-8">

        {/* Logo */}
        <div className="flex lg:flex-1 items-center">
          <Link to="/" className="flex items-center gap-3">
            <span className="text-white font-bold text-xl tracking-wide">
              Golden Spoon Restaurant
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="rounded-md p-2.5 text-white hover:text-white cursor-pointer"
          >
            <Bars3Icon className="w-7 h-7" />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-10 items-center">

          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="font-semibold text-white hover:text-yellow-300 transition-colors"
            >
              {item.name}
            </Link>
          ))}

         

        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-3">
          <Link
            to="/register"
            className="text-sm font-semibold text-white bg-amber-800 hover:to-sky-500 px-5 py-2 rounded-lg shadow-lg transition-all"
          >
            Get Started 
          </Link>

        </div>

      </nav>

      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-sky-900/95 backdrop-blur-md text-white p-6">

          <div className="flex items-center justify-between mb-6">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3">
              <span className="font-bold text-lg">Aqua World</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-white cursor-pointer"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* mobile menu links */}
          <div className="space-y-3">

            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-4 py-2 text-base font-semibold hover:bg-sky-800/60 transition"
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Dropdown (Simple Version) */}
            <div className="mt-3">
              <p className="text-sm font-bold text-sky-300">Items</p>
              <div className="pl-4 space-y-2 mt-2 mb-10">
                <Link to="/fish" onClick={() => setMobileMenuOpen(false)} className="block ">
                  Fishes
                </Link>
                <Link to="/access" onClick={() => setMobileMenuOpen(false)} className="block ">
                  Accessories
                </Link>
              </div>
            </div>

            {/* Login + Signup */}
            <div className="mt-6 flex gap-3">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center bg-sky-500 hover:bg-sky-600 py-2 rounded-md font-semibold"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="flex-1 text-center bg-orange-500 hover:bg-orange-600 py-2 rounded-md font-semibold"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}