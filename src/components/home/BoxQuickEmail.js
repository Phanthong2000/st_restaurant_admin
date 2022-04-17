/* eslint-disable jsx-a11y/label-has-associated-control */
import { Box, Button, styled } from '@mui/material';
import React from 'react';
import emailjs from 'emailjs-com';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '10px',
  background: theme.palette.white,
  borderRadius: '5px',
  border: `1px solid lightgrey`
}));
function BoxQuickEmail() {
  const serviceId = 'service_v2lc9rq';
  const templateId = 'template_ojujb2k';
  const userID = 'HpNo-cTPIk8tMLA9q';
  const handleSendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(serviceId, templateId, e.target, userID).then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text);
      },
      (error) => {
        console.log('FAILED...', error);
      }
    );
  };
  return (
    <form onSubmit={handleSendEmail}>
      <label>Name</label>
      <input type="text" name="name" />
      <label>Email</label>
      <input type="email" name="email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
}

export default BoxQuickEmail;
