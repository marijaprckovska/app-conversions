import React, { useState, Fragment } from "react";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
import {variables} from './Variables.js';
import { nanoid } from 'nanoid';
import data from "./mock-data.json";
import "./App.css";


    const Conversion = () => {

         
        const [contacts, setContacts] = useState(data);
        const [addFormData, setAddFormData] = useState({
         
         
         
          value: "",
          type: "",
          measureunit: "",
          destmeasureunit: "",
          destformat: "",
        });
        
        fetch(variables.API_URL+'conversion')
        .then(response=>response.json())
        .then(data=>{
            this.setState({measureConversions:data,measureConversionsWithoutFilter:data});
        });


        const [editFormData, setEditFormData] = useState({
          value: "",
          type: "",
          measureunit: "",
          destmeasureunit: "",
          destformat: "",
        });
      
        
        const [editContactId, setEditContactId] = useState(null);
      
        const handleAddFormChange = (event) => {
          event.preventDefault();
      
          const fieldName = event.target.getAttribute("name");
          const fieldValue = event.target.value;
      
          const newFormData = { ...addFormData };
          newFormData[fieldName] = fieldValue;
      
          setAddFormData(newFormData);
        };
      
        const handleEditFormChange = (event) => {
          event.preventDefault();
      
          const fieldName = event.target.getAttribute("name");
          const fieldValue = event.target.value;
      
          const newFormData = { ...editFormData };
          newFormData[fieldName] = fieldValue;
      
          setEditFormData(newFormData);
        };
      
        const handleAddFormSubmit = (event) => {
          event.preventDefault();
      
          const newContact = {
            id: nanoid(),
            value: addFormData.value,
            type: addFormData.type,
            measureunit: addFormData.measureunit,
            destmeasureunit: addFormData.destmeasureunit,
          };
      
          const newContacts = [...contacts, newContact];
          setContacts(newContacts);
        };
      
        const handleEditFormSubmit = (event) => {
          event.preventDefault();
      
          const editedContact = {
            id: editContactId,
            value: editFormData.value,
            type: editFormData.type,
            measureunit: editFormData.measureunit,
            destmeasureunit: editFormData.destmeasureunit,
          };
      
          const newContacts = [...contacts];
      
          const index = contacts.findIndex((contact) => contact.id === editContactId);
      
          newContacts[index] = editedContact;
      
          setContacts(newContacts);
          setEditContactId(null);
        };
      

        const handleEditClick = (event, contact) => {
          event.preventDefault();
          setEditContactId(contact.id);
      
          const formValues = {
            value: contact.value,
            type: contact.type,
            measureunit: contact.measureunit,
            destmeasureunit: contact.destmeasureunit,
            destformat: contact.destformat,
            
          };
      
          setEditFormData(formValues);
        };
      
        const handleCancelClick = () => {
          setEditContactId(null);
        };
      
        const handleDeleteClick = (contactId) => {
          const newContacts = [...contacts];
      
          const index = contacts.findIndex((contact) => contact.id === contactId);
      
          newContacts.splice(index, 1);
      
          setContacts(newContacts);
        };

       

        return (
          <div className="app-container">
         <br>
         
         </br>
         <br>

         </br>

<h2 style={{ color: 'blue' }}>Conversion of Units</h2>
            <form onSubmit={handleAddFormSubmit}>
              <input
                type="text"
                name="value"
                required="required"
                placeholder="Enter a value..."
                onChange={handleAddFormChange}
              />
              <input
                type="text"
                name="type"
                required="required"
                placeholder="Enter an type..."
                onChange={handleAddFormChange}
              />
              <input
                type="text"
                name="measureunit"
                required="required"
                placeholder="Enter a measureunit..."
                onChange={handleAddFormChange}
              />
              <input
                type="text"
                name="destmeasureunit"
                required="required"
                placeholder="Enter an destmeasureunit..."
                onChange={handleAddFormChange}   
              />
              <input
                type="text"
                name="destformat"
                required="required"
                placeholder="Enter a destformat..."
                onChange={handleAddFormChange}
              />
              <button type="submit" style={{ color: 'blue' }}>Add</button>
            </form>

            <br>

            </br>
            <br>

            </br>



            <form onSubmit={handleEditFormSubmit}>
              <table>
                <thead>
                  <tr style={{ color: 'blue' }}>
                    <th>value</th>
                    <th>type</th>
                    <th>measureunit</th>
                    <th>destmeasureunit</th>
                    <th>destformat</th>
                    <th style={{ color: 'blue' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <Fragment>
                      {editContactId === contact.id ? (
                        <EditableRow
                          editFormData={editFormData}
                          handleEditFormChange={handleEditFormChange}
                          handleCancelClick={handleCancelClick}
                        />
                      ) : (
                        <ReadOnlyRow
                          contact={contact}
                          handleEditClick={handleEditClick}
                          handleDeleteClick={handleDeleteClick}
                        />
                      )}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </form>
      
           
            </div>
        );
      };
      
      export default Conversion;