import { useState } from 'react';
import styles from '../styles/Home.module.css';
import SampleTable from '../components/SampleTable';

export default function Home() {
  const [items, setItems] = useState('');

  return (
    <div className={styles.container}>
      <h1>Testing Tables</h1>
      <SampleTable />
    </div>
  );
}
