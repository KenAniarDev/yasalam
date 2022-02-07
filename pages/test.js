import { useState } from 'react';
import styles from '../styles/Home.module.css';
import ReactQuill from '../components/ReactQuill';

export default function Home() {
  const [items, setItems] = useState('');

  return (
    <div className={styles.container}>
      <button onClick={() => console.log(items)}>console.log</button>
      <ReactQuill value={items} onChange={setItems} />
    </div>
  );
}
