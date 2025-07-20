'use client';

import NavButton from '@/app/_components/buttons/NavButton';
import styles from '@/app/_components/sidebar/sidebar.module.scss';
import { usePathname } from 'next/navigation';

function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <NavButton
        link="/"
        color="pink"
        activeBtn={pathname === '/' || pathname === '/villas' ? true : false}
      >
        Villas
      </NavButton>
      <NavButton
        link="/locations"
        color="pink"
        activeBtn={pathname === '/' || pathname === '/locations' ? true : false}
      >
        Locations
      </NavButton>
      <NavButton
        link="/amenities"
        color="pink"
        activeBtn={pathname === '/' || pathname === '/amenities' ? true : false}
      >
        Amenities
      </NavButton>
    </aside>
  );
}

export default Sidebar;
