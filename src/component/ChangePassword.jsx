import React, { useState } from 'react';

const ChangePasswordForm = ({id}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'currentPassword') {
      setCurrentPassword(value);
    } else if (name === 'newPassword') {
      setNewPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/user/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: newPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Password changed successfully:', data);
      })
      .catch((error) => {
        console.error('Failed to change password:', error);
      });
    setCurrentPassword('');
    setNewPassword('');
  };

  return (
    <div className="containar">
      <div className='modal'>


    <form onSubmit={handleSubmit} style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
      <h2>Change Password</h2>
      <label>
        Current Password:
        <input
          type="password"
          name="currentPassword"
          value={currentPassword}
          onChange={handleChange}
        />
      </label>
      <label style={{marginTop:"20px"}}>
        New Password:
        <input
          type="password"
          name="newPassword"
          value={newPassword}
          onChange={handleChange}
        />
      </label>
      <button type="submit" style={{marginTop:"30px"}}>Change Password</button>
    </form>
    </div>
    </div>


  );
};

export default ChangePasswordForm;