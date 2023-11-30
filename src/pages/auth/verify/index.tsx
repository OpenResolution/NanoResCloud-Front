import React, { useState, useEffect } from 'react';
import { authVerify } from '@/services/api/auth';

type HashObject = {
  access_token: string;
  expires_at: string;
  expires_in: string;
  refresh_token: string;
  token_type: string;
  type: string;
};

const Verify: React.FC = () => {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    // Extract the hash part from the URL
    const hash = window.location.hash.substr(1);

    // Convert the hash to an object for easier access
    const hashObject: HashObject = hash.split('&').reduce((result, item) => {
      const parts = item.split('=');
      result[parts[0]] = decodeURIComponent(parts[1]);
      return result;
    }, {});

    // Set the access token to the component's state
    setAccessToken(hashObject.access_token);

    const params = {
      access_token: hashObject.access_token,
      expires_at: hashObject.expires_at,
      expires_in: hashObject.expires_in,
      refresh_token: hashObject.refresh_token,
      token_type: hashObject.token_type,
      type: hashObject.type,
    };

    authVerify(params);
  }, []);

  return (
    <div>
      <p>Successfully Authenticate</p>
      <p>token = {accessToken}</p>
    </div>
  );
};

export default Verify;
