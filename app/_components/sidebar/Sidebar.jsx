import LinkButton from '@/app/_components/buttons/LinkButton';
import styles from '@/app/_components/sidebar/sidebar.module.scss';

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <LinkButton link="/" color="pink">
        Villas
      </LinkButton>
      <LinkButton link="/locations" color="pink">
        Locations
      </LinkButton>
      <LinkButton link="/amenities" color="pink">
        Amenities
      </LinkButton>
    </aside>
  );
}

export default Sidebar;
