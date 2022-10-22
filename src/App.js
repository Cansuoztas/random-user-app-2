import React, { useEffect, useState } from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import Footer from "./components/footer/Footer";
import axios from "axios";

function App() {
  const url = "https://randomuser.me/api/";

  const [user, setUser] = useState("");

  const getUsers = async () => {
    try {
      const { data } = await axios(url);
      console.log(data);
      setUser(data.results[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  console.log(user);

  const { picture, email, name, phone, location, dob, login } = user;

  const [datatype, setDatatype] = useState(["name"]);

  const dataConfigure = {
    name: `${name?.first} ${name?.last}`,
    email,
    age: dob?.age,
    country: location?.country,
    phone,
    password: login?.password,
  };

  const [newperson, setNewperson] = useState([]);

  return (
    <main>
      <div className="block bcg-orange">
        <img src={cwSvg} alt="cw" id="cw" />
      </div>
      <div className="block">
        <div className="container">
          <img src={picture?.large} alt="random user" className="user-img" />
          <p className="user-title">My {datatype} is</p>
          <p className="user-value">{dataConfigure[datatype]}</p>
          <div className="values-list">
            <button
              className="icon"
              data-label="name"
             onMouseOver={() => setDatatype("name")}
            >
              <img
                src={user?.gender === "female" ? womanSvg : manSvg}
                alt="user"
                id="iconImg"
              />
            </button>
            <button
              className="icon"
              data-label="email"
             onMouseOver={() => setDatatype("email")}
            >
              <img src={mailSvg} alt="mail" id="iconImg" />
            </button>
            <button
              className="icon"
              data-label="age"
             onMouseOver={() => setDatatype("age")}
            >
              <img
                src={user?.gender === "female" ? womanAgeSvg : manAgeSvg}
                alt="age"
                id="iconImg"
              />
            </button>
            <button
              className="icon"
              data-label="street"
             onMouseOver={() => setDatatype("country")}
            >
              <img src={mapSvg} alt="map" id="iconImg" />
            </button>
            <button
              className="icon"
              data-label="phone"
             onMouseOver={() => setDatatype("phone")}
            >
              <img src={phoneSvg} alt="phone" id="iconImg" />
            </button>
            <button
              className="icon"
              data-label="password"
             onMouseOver={() => setDatatype("password")}
            >
              <img src={padlockSvg} alt="lock" id="iconImg" />
            </button>
          </div>
          <div className="btn-group">
            <button
              className="btn"
              type="button"
              onClick={() => getUsers(dataConfigure.name)}
            >
              new user
            </button>
            <button
              className="btn"
              type="button"
              onClick={() =>
                setNewperson(
                  [...newperson].includes(user)
                    ? [...newperson]
                    : [...newperson, user]
                )
              }
            >
              add user
            </button>
          </div>

          <table className="table">
            <thead>
              <tr className="head-tr">
                <th className="th">Firstname</th>
                <th className="th">Email</th>
                <th className="th">Phone</th>
                <th className="th">Age</th>
              </tr>
            </thead>
            <tbody>
              {newperson.map((item) => (
                <tr className="body-tr">
                  <td className="td">{item.name?.first}</td>
                  <td className="td">{item?.email}</td>
                  <td className="td">{item?.phone}</td>
                  <td className="td">{item.dob?.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
    </main>
  );
}

export default App;