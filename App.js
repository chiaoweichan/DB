import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [classname, setClassName] = useState("");
  const [classday, setClassday] = useState(0);
  const [classtime, setClasstime] = useState("");

  const [classnameList, setClassnameList] = useState(0)

  const addClassname = () => {
    Axios.post("http://localhost:3001/create", {
      classname: classname,
      classday: classday,
      classtime: classtime,
    }).then(() => {
      setClassnameList([
        ...classnameList,
        {
          classname: classname,
          classday: classday,
          classtime: classtime,
        },
      ]);
    });
  };

  const getClassname = () => {
    Axios.get("http://localhost:3001/classname").then((response) => {
      setClassnameList(response.data);
    });
  };

  const updateClassnameClasstime = (id) => {
    Axios.put("http://localhost:3001/update", { classtime: newclasstime, id: id }).then(
      (response) => {
        alert("update")
        setclassnameList(
          classnameList.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  classname: val.classname,
                  classday: val.classday,
                  classtime: val.classtime,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteClassname = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setClassnameList(
        classnameList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="information">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>classname:</label>
        <input
          type="text"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <label>Classday:</label>
        <input
          type="number"
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        />
        <label>Classtime:</label>
        <input
          type="number"
          placeholder="0...."
          onChange={(event) => {
            setPosition(event.target.value);
          }}
        />
        <button onClick={addClassname}>Add Classname</button>
      </div>
      <div className="classname" >
        <button onClick={getClassname}>Show Classname</button>

        {classnameList.map((val, key) => {
          return (
            <div className="classname" key={key}>
              <div>
                <h3>ClassName: {val.classname}</h3>
                <h3>Classday: {val.classday}</h3>
                <h3>Classtime: {val.classtime}</h3>
                </div>
                <div>
                <input
                  type="text"
                  placeholder="0..."
                  onChange={(event) => {
                    setNewClasstime(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateClassnameClasstime(val.id);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteClassname(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      </div>
  )}
export default App;
