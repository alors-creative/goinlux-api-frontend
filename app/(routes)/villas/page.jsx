import LinkButton from '@/app/_components/buttons/LinkButton';
import Card from '@/app/_components/card/Card';
import { getVillas } from '@/app/_lib/data-service';
import styles from './page.module.scss';

async function page() {
  const villas = await getVillas();

  return (
    <section>
      <div className={styles.header}>
        <h1>Villas</h1>
        <LinkButton link="/villas/add" color="pink">
          Add New Villa
        </LinkButton>
      </div>
      <div className={styles.villas}>
        {villas && villas?.map((v) => <Card villa={v} key={v.id} />)}
      </div>
    </section>
  );
}

export default page;
