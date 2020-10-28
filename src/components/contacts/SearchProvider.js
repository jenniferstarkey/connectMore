//Be able to search contacts based on information on profile

import React, {useEffect, useContext} from 'react';
import {ContactContext} from "./ContactProvider"


export const ContactSearch =()=>{
  const { search, setSearchTerms } = useContext(ContactContext)

  useEffect(() => {
    setSearchTerms("")
}, [])

  return(
    <>
      Search:
        <input type="text"
                className="input--wide"
                onKeyUp={
                    (keyEvent) => setSearchTerms(keyEvent.target.value)
                }
                placeholder="Search for a contact... " />
    </>
  )
}