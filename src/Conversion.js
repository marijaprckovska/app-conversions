import React, { useState, useEffect } from "react";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
import { variables } from "./Variables.js";
import { nanoid } from "nanoid";
import data from "./mock-data.json";
import "./Conversion.css";

const Conversion = () => {
  const [items, setItems] = useState(data);
  const [addFormData, setAddFormData] = useState({});
  const [editFormData, setEditFormData] = useState({});
  const [editContactId, setEditContactId] = useState(null);
  const [convertedItems, setConvertedItems] = useState({ measures: [], dates: [], currency: [] });
  const [measureUnits, setMeasureUnits] = useState([]);
  const [measureTypes, setMeasureTypes] = useState([]);

  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...addFormData };
    if (fieldValue) {
      newFormData[fieldName] = fieldValue;
    } else {
      delete newFormData[fieldName];
    }
    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...editFormData };
    if (fieldValue) {
      newFormData[fieldName] = fieldValue;
    } else {
      delete newFormData[fieldName];
    }
    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    const newContact = { index: nanoid(), ...addFormData };
    const newItems = [...items, newContact];
    setItems(newItems);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const editedContact = { index: editContactId, ...editFormData };
    const newItems = [...items];
    const index = newItems.findIndex(

      (contact) => contact.index === editContactId
    );
    newItems[index] = editedContact;
    setItems(newItems);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.index);
    setEditFormData(contact);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newItems = [...items];
    const index = items.findIndex((contact) => contact.index === contactId);
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleConvertClick = () => {
    fetch(`${variables.API_URL}conversion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        originculture: "en-US",
        destculture: "pt-BR",
        values: items,
      }),
    })
      .then((response) => response.json())
      .then((data) => setConvertedItems(data))
      .catch((err) => console.log("Conversion failed", err));
  };

  useEffect(() => {
    fetch(variables.API_URL + "measureUnits")
      .then((response) => response.json())
      .then((data) => setMeasureUnits(data));
    fetch(variables.API_URL + "measureTypes")
      .then((response) => response.json())
      .then((data) => setMeasureTypes(data));
  }, []);

  const { measures, dates, currency } = convertedItems;

  return (
    <div className="app-container">
      <br></br>
      <br></br>
      <h2 style={{ color: "blue" }}>Conversion of Units</h2>
      <form onSubmit={handleAddFormSubmit}>
        <label htmlFor="value">Value:</label>
        <input
          id={"value"}
          type="text"
          name="value"
          required="required"
          placeholder="Enter a value..."
          onChange={handleAddFormChange}
        />
        <label htmlFor="type">Type:</label>
        <select name="type" id="type" required onChange={handleAddFormChange}>
          <option></option>
          {measureTypes.map(({ mty_sCode }) => (
            <option key={`measureType_${mty_sCode}`}>{mty_sCode}</option>
          ))}
        </select>
        <label htmlFor="measureunit">Measure Unit:</label>
        <select
          name="measureunit"
          id="measureunit"
          onChange={handleAddFormChange}
        >
          <option></option>
          {measureUnits.map(({ mun_sCode }) => (
            <option key={`measureUnit_${mun_sCode}`}>{mun_sCode}</option>
          ))}
        </select>
        <label htmlFor="destmeasureunit">Dest Measure Unit:</label>
        <select
          name="destmeasureunit"
          id="destmeasureunit"
          onChange={handleAddFormChange}
        >
          <option></option>
          {measureUnits.map(({ mun_sCode }) => (
            <option key={`destMeasureUnit_${mun_sCode}`}>{mun_sCode}</option>
          ))}
        </select>
        <label htmlFor="destformat">Dest Format:</label>
        <select
          name="destformat"
          id="destformat"
          onChange={handleAddFormChange}
        >
          <option></option>
          <option>yyyy-MM-dd</option>
          <option>hh_mm</option>
          <option>yyyy-MM-dd / hh_mm</option>
        </select>
        <button type="submit" style={{ color: "blue" }}>
          Add
        </button>
      </form>
      <br></br>
      <br></br>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr style={{ color: "blue" }}>
              <th>Value</th>
              <th>Type</th>
              <th>Measure Unit</th>
              <th>Dest Measure Unit</th>
              <th>Dest Format</th>
              <th style={{ color: "blue" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((contact) =>
              editContactId === contact.index ? (
                <EditableRow
                  key={contact.index}
                  editFormData={editFormData}
                  handleEditFormChange={handleEditFormChange}
                  handleCancelClick={handleCancelClick}
                  measureUnits={measureUnits}
                  measureTypes={measureTypes}
                />
              ) : (
                <ReadOnlyRow
                  key={contact.index}
                  contact={contact}
                  handleEditClick={handleEditClick}
                  handleDeleteClick={handleDeleteClick}
                />
              )
            )}
          </tbody>
        </table>
      </form>
      <div style={{ padding: "20px" }}>
        <button onClick={handleConvertClick}>Convert</button>
      </div>
      {measures.length ? (
        <div>
          <h2>Measures</h2>
          <table>
            <thead>
              <tr style={{ color: "blue" }}>
                <th>Value</th>
                <th>Type</th>
                <th>Measure Unit</th>
                <th>Dest Measure Unit</th>
                <th>Result Measure Unit</th>
                <th>Result Measure</th>
              </tr>
            </thead>
            <tbody>
              {measures.map((measure) => (
                <tr key={measure.Index}>
                  <td>{measure.Value}</td>
                  <td>{measure.Type}</td>
                  <td>{measure.Measureunit}</td>
                  <td>{measure.Destmeasureunit}</td>
                  <td>{measure.Resultmeasureunit}</td>
                  <td>{measure.Resultmeasure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      {dates.length ? (
        <div>
          <h2>Dates</h2>
          <table>
            <thead>
              <tr style={{ color: "blue" }}>
                <th>Value</th>
                <th>Type</th>
                <th>DestFormat</th>
              </tr>
            </thead>
            <tbody>
              {dates.map((date) => (
                <tr key={date.Index}>
                  <td>{date.Value}</td>
                  <td>{date.Type}</td>
                  <td>{date.Destformat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      {currency.length ? (
        <div>
          <h2>Currency</h2>
          <table>
            <thead>
              <tr style={{ color: "blue" }}>
                <th>Type</th>
                <th>Result Currency Unit</th>
                <th>Result Currency</th>
              </tr>
            </thead>
            <tbody>
              {currency.map((currency) => (
                <tr key={currency.Index}>
                  <td>{currency.Type}</td>
                  <td>{currency.Resultcurrencyunit}</td>
                  <td>{currency.Resultcurrency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default Conversion;
