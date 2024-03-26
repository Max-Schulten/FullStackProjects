import React, { useState } from 'react';
import Button from '@mui/material/Button';

function Item(props) {
  const [complete, setComplete] = useState(false);

  function handleDelete(event) {
    event.preventDefault();
    props.handleDelete(props.id);
  }

  function handleEdit(event) {
    event.preventDefault();
    $('#editMenu').modal('show');
    props.setter(props.id);
  }

  return (
    <>
      <tr className={'text-center'}>
        <td>{props.title}</td>
        <td>{props.desc}</td>
        <td>{props.deadline}</td>
        <td>{props.priority}</td>
        <td>
          <input
            className={'form-check-input'}
            type="checkbox"
            onChange={(event) => {
              setComplete(event.target.checked);
            }}
          />
        </td>
        <td>
          <div class="container">
            {!complete && (
              <div class="row">
                <Button variant="contained" onClick={handleEdit}>
                  <i class="fa-solid fa-pen-to-square" /> &nbsp; Update
                </Button>
              </div>
            )}
            <div class="row">
              <Button color="error" variant="contained" onClick={handleDelete}>
                <i class="fa-solid fa-circle-xmark" /> &nbsp; Delete
              </Button>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}

export default Item;
