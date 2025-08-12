'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Logo } from './logo';
import Link from 'next/link';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const renderAuthButtons = () => {
    if (!isMounted) {
      return (
        <div className="flex items-center space-x-2">
           <div className="h-9 w-20 rounded-md bg-muted animate-pulse" />
           <div className="h-10 w-24 rounded-md bg-muted animate-pulse" />
        </div>
      );
    }
    
    return (
      <div className="flex items-center space-x-2">
        {isLoggedIn ? (
          <>
            <Button variant="ghost" asChild>
              <Link href="/account">Mitt konto</Link>
            </Button>
            <Button onClick={() => setIsLoggedIn(false)}>Logga ut</Button>
          </>
        ) : (
          <>
            <Button variant="ghost" onClick={() => setIsLoggedIn(true)}>Logga in</Button>
            <Button>Registrera</Button>
          </>
        )}
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Logo />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link href="/">Hem</Link>
            </Button>
            {renderAuthButtons()}
          </nav>
        </div>
      </div>
    </header>
  );
}
