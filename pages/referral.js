import React, { useState } from 'react';

export default function PaymentForm() {
  const [message, setMessage] = useState('');

  return (
    <section>
      <h1>Referral</h1>
      <form action='/api/payment/update-with-referral' method='POST'>
        <input type='text' name='email' required />
        <input type='text' name='code' required />
        <button type='submit'>go</button>
      </form>
    </section>
  );
}
