import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function PaymentForm() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <section>
      <form action='/api/create-checkout-session' method='POST'>
        <input type='hidden' name='id' value={id} />
        <button type='submit'>Pay now</button>
      </form>
    </section>
  );
}
