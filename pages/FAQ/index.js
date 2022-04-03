import NavFooter from 'components/NavFooter';
import React from 'react';

const data = [
  {
    title: 'What is a Royal Membership?',
    data: "Royal is the UAE's luxury lifestyle membership. Royal membership will give you unlimited access to enjoy hotels recreational facilities, marine activities, state of the art gyms, sport academies and fitness classes. Also include multiple numbers of Spa and F&B discounts across our venues.",
  },
  {
    title: 'How does the Royal membership work?',
    data: 'Once you are a member, you just need to download the Royal app and login to your account.This is how you will explore your benefits, plan your visits, and avail your exclusive member discounts.',
  },
  {
    title: 'How do I become a Royal Member?',
    data: 'If you are looking to join Royal, please visit our website and fill in your details and follow the instructions to purchase your membership and activate it. You can also drop us an email to info@Yasalamae.ae or WhatsApp us on +971- 50 000 0000. Someone from our membership team will get in touch with you.',
  },
  {
    title: 'How often I can use my membership?',
    data: 'As a member, you are free to use your membership as often as you like across our partner pools, beaches and gyms. If there are any access limitations this will be clearly detailed within the app.',
  },
  {
    title: 'Are there any exclusion days?',
    data: 'You can use your membership every day of the year. Some exceptions and exclusion days may apply at certain venues; these updates will be clearly communicated within the app.',
  },
  {
    title: 'Can I pause my membership?',
    data: 'We do not offer the option to pause membership.',
  },
  {
    title: 'Can I cancel my membership?',
    data: 'We do not offer the option to cancel memberships that have been paid for and used, as we do not offer refunds',
  },
  {
    title: 'Do I need the Royal App?',
    data: 'Yes! The Royal app is necessary as a member. You will use the app to:',
    list: [
      'Plan your visits to venues that require advance planning',
      'Check in and out of venues with your your digital membership card',
      'View important venue information like locations, opening hours, and live updates',
      'Manage your membership information, payment method, invite friends and purchase guest passes',
    ],
  },
  {
    title: 'How do I plan my visit?',
    data: 'You can plan your visits by clicking on the venue page in the app to see the availability Each venue has different slots available; please note that the access is based on first come first served',
  },
  {
    title: 'How do I check in to a venue?',
    data: 'When you reach the check in location at the venue, tap the Royal button in the app to see your QR code. The venue representative will scan the code and check you in!',
  },
];

const FAQ = () => {
  return (
    <NavFooter>
      <div className='container'>
        <div className='py-16'>
          <h2 className='mb-4 text-3xl font-semibold text-center'>
            Frequently Ask Questions
          </h2>
          <div className='py-5'>
            {data.map((item, i) => (
              <div
                className='w-full max-w-screen-lg mx-auto mb-2 border collapse rounded-box border-base-300 collapse-arrow'
                key={i}
              >
                <input type='checkbox' />
                <div className='text-xl font-medium collapse-title'>
                  {item.title}
                </div>
                <div className='collapse-content'>
                  <p>{item.data}</p>
                  {item.list && (
                    <ul className='ml-4 list-disc'>
                      {item.list.map((listItem, i) => (
                        <li key={i}>{listItem}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </NavFooter>
  );
};

export default FAQ;
