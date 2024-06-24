import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import * as XLSX from 'xlsx';

const Emails = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const emailsCollection = collection(db, 'subscribers');
    const unsubscribe = onSnapshot(emailsCollection, (snapshot) => {
      const emailsList = snapshot.docs.map((doc, index) => ({
        id: index + 1,
        ...doc.data()
      }));
      setEmails(emailsList);
    });

    return () => unsubscribe();
  }, []);

  const copyToClipboard = (email) => {
    navigator.clipboard.writeText(email).then(() => {
      alert('Email copied to clipboard!');
    }).catch((err) => {
      console.error('Could not copy text: ', err);
    });
  };

  const downloadAsExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(emails);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Subscribers');

    // Generate buffer
    const buf = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Create Blob from buffer
    const blob = new Blob([buf], { type: 'application/octet-stream' });

    // Create link element
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'subscribers_emails.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='email_sort'>
      <h1 className='title_emails'>Emails Sort</h1>
      <button onClick={downloadAsExcel}>Download as Excel</button>
      <ul className='email_ul'>
        {emails.map(email => (
          <li className='email_li' key={email.id} onClick={() => copyToClipboard(email.email)}>{email.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Emails;
