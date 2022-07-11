import React from 'react'

export default function Home() {
  return (
    <div>
    <div className='App'>

        <p>1. POST /sign-up It should take in the name, email, and password as body parameters. Store the user in an array or use a database if you'd like. Hash the password before storing it.</p>
        <p>2. POST /sign-in It should take in the email and password as body parameters. Use the email parameter to find the user. Compare the password against the hashed password and return an error if it doesn't match. Return the full user with an attached JSON web token for future authentication. </p>
        <p>3. GET  /me It should include an Authorization header containing the JSON web token. It should use an authentication middleware to verify the JSON web token, find the user, and attach it to the request as 'req.user' It should then return the user. </p>
          
      </div>
    </div>
  )
}
