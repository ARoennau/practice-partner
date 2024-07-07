'use client';

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
} from '@nextui-org/navbar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Nav = () => {
  const currentPath = usePathname();
  return (
    <Navbar className='bg-primary text-whiteish' maxWidth='full'>
      <NavbarBrand className='max-w-15'>
        <h1 className='font-bold'>Practice Partner</h1>
      </NavbarBrand>
      <NavbarContent justify='start'>
        <NavbarItem isActive={currentPath === '/'}>
          <Link href='/'>Home</Link>
        </NavbarItem>
        <NavbarItem isActive={currentPath === '/pieces'}>
          <Link href='/pieces'>Pieces</Link>
        </NavbarItem>
        <NavbarItem isActive={currentPath === '/practice-session'}>
          <Link href='/practice-session'>Practice Session</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu />
    </Navbar>
  );
};
