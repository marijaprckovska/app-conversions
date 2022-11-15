import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="value"
          value={editFormData.value}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter an type..."
          name="type"
          value={editFormData.type}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a phone number..."
          name="measureunit"
          value={editFormData.measureunit}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="destmeasureunit"
          required="required"
          placeholder="Enter an destmeasureunit..."
          name="destmeasureunit"
          value={editFormData.destmeasureunit}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a phone number..."
          name="destformat"
          value={editFormData.destformat}
          onChange={handleEditFormChange}
        ></input>
      </td>
      

      
      <td>
        <button type="submit" style={{ color: 'blue' }}>Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;