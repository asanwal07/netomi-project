import './index.css';

import React, { useState, useEffect } from "react";


const Main = () => {

      const [name, setName] = useState('');
      const [contact, setContact] = useState('');
      const [email, setEmail] = useState('');
      const [date, setDate] = useState('');
      const [desh, setDesh] = useState('');
      const [deshList, setDeshList] = useState('');
      const [cityList, setCityList] = useState('');
      const [successmessage, setSuccessmessage] = useState(false);


      const handleChangeInName = (event) => {
            setName(event.target.value);
      }

      const handleChangeInContact = (event) => {
            setContact(event.target.value);
      }

      const handleChangeInEmail = (event) => {
            setEmail(event.target.value);
      }

      const handleChangeInDate = (event) => {
            setDate(event.target.value);
      }

      const handleChangeInCountry = (event) => {
            if (event && event.target && event.target.value) {
                  setDesh(event.target.value);
                  const getres = deshList.data.find(desh => desh.iso3 === event.target.value);
                  setCityList(getres.cities);
            }
            // getCities(event.target.value);
      };

      const check = (event) => {
            event.preventDefault();
            if (name.length < 4 || name.length > 10) {
                  alert("Name length should be in between 4 and 10 characters");
                  return;
            }
            if (!contact.match(/^\d{10}$/)) {
                  alert("Check you Contact number");
                  return;
            }

            setSuccessmessage(true);

      }

      useEffect(() => {

            const getCountry = async () => {
                  const req = await fetch("https://countriesnow.space/api/v0.1/countries");
                  const getres = await req.json();
                  console.log(getres);
                  setDeshList(getres);
            }
            getCountry();
      }, []);
      return (
            <div className='Form-Container'>
                  <form onSubmit={check}>
                        <div>
                              <label htmlFor="name">Name</label>
                              <br />
                              <input size="25" type="text" id="name" name="name" value={name} onChange={handleChangeInName} />
                        </div>
                        <div>
                              <label htmlFor="name">Date of birth</label>
                              <br />
                              <input size="25" type="date" id="date" name="date" value={date} onChange={handleChangeInDate} />
                        </div>

                        <div>
                              <label htmlFor="contact">
                                    Contact
                              </label>
                              <br />
                              <input required size="25" type="number" id="contact"
                                    name="contact" value={contact} onChange={handleChangeInContact} />
                        </div>

                        <div>
                              <label htmlFor="email">Email</label>
                              <br />
                              <input required size="25" type="email" name="email" value={email} onChange={handleChangeInEmail} />
                        </div>

                        <div>
                              <label htmlFor="Desh">Country</label>
                              <br />
                              <select required name="Desh" id="Desh" onChange={(e) => handleChangeInCountry(e)} >
                                    <option value="">--Select Country--</option>

                                    {deshList &&
                                          deshList.data.map((eachdata) => (
                                                <option key={eachdata.iso3} value={eachdata.iso3}> {eachdata.country}
                                                </option>
                                          ))
                                    }


                                    {/* <option value="">delhi</option> */}
                              </select>
                        </div>

                        <div>
                              <label htmlFor="city" required>City</label>
                              <br />
                              <select required name="city" id="city">
                                    <option required value="">--Select Cities--</option>

                                    {cityList &&
                                          cityList.map((eachdata) => (
                                                <option key={eachdata} value={eachdata}> {eachdata}
                                                </option>
                                          ))
                                    }


                                    {/* <option value="">delhi</option> */}
                              </select>
                        </div>
                        <div className="buton">
                              <button type="submit">Submit</button>
                        </div>
                        {successmessage &&
                              <div >
                                    <h5 className="Success" >All Fields are Valid</h5>
                              </div>
                        }
                  </form >

            </div >
      )

}

export default Main;