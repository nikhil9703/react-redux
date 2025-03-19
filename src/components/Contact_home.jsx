import React, { useEffect , useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, setContacts, updateContact } from '../features/contacts/contactSlice';

const Contact_home = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contact.contacts); 


  const [newcontact , setnewcontact] = useState({name : '', phone_no : ''});
  const [editstatus, seteditstatus] = useState(null)
  useEffect(() => {
    fetch("/contact.json")
      .then((response) => response.json())
      .then((result) => dispatch(setContacts(result)))
  }, []); 


  const handleinput = (e) => {
    const{name ,value} = e.target;
    setnewcontact(prev => ({...prev , [name]: value}))
  }



  const handleaddcontact = (e)=>{
    e.preventDefault();
    if (newcontact.name && newcontact.phone_no){
      dispatch(addContact(newcontact))
      setnewcontact({name: '', phone_no:''});
    }
  }


  const handleedit = (contact) =>{
    seteditstatus(contact)
    setnewcontact({name : contact.name ,phone_no: contact.phone_no})
  }

  const handleupdate = (e) =>{
    e.preventDefault();
    if (editstatus && newcontact.name && newcontact.phone_no){
      dispatch(updateContact({
        ...editstatus,
        name:newcontact.name,
        phone_no: newcontact.phone_no,
      }))
    }
    setnewcontact({name:'',phone_no:''})
    seteditstatus(null);
  }
  return (
    <>
      <h1>Contacts</h1>

      <form action="" onSubmit={editstatus ? handleupdate:handleaddcontact}>
        <input type="text" name='name' value={newcontact.name} onChange={handleinput} />
        <input type="text" name='phone_no' value={newcontact.phone_no} onChange={handleinput}/>
        <button type="submit">{editstatus?'update':'add'}</button>
      </form>

      <div>
        {contacts && contacts.map((item, index) => (
          <Card key={index} style={{ border: 'solid' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <Avatar>{item.name ? item.name.charAt(0).toUpperCase() : ''}</Avatar>
              <span style={{ marginLeft: '10px' }}>{item.name}</span>
              <span style={{ marginLeft: '10px' }}>{item.phone_no}</span>
              <button onClick={()=> handleedit(item)}style={{ marginLeft: '10px' }}>Update</button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Contact_home;