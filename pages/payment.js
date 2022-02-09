import React, { useState, useEffect } from 'react';

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function PaymentForm() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setMessage('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
    console.log(message);
  }, []);

  return message.length > 0 ? (
    <Message message={message} />
  ) : (
    <section>
      <div className='product'>
        <img
          src='https://i.imgur.com/EHyR2nP.png'
          alt='The cover of Stubborn Attachments'
        />
        <div className='description'>
          <h3>Stubborn Attachments</h3>
          <h5>$20.00</h5>
        </div>
      </div>
      <form action='/api/create-checkout-session' method='POST'>
        <input type='hidden' name='email' value='ken.aniar.dev@gmail.com' />
        <button type='submit'>Checkout</button>
      </form>
    </section>
  );
}
