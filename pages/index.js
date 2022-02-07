import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_SOMETHING);
  }, []);

  return <></>;
}
