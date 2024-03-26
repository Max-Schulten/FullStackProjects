import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Menu(props) {
  const [desc, setDesc] = useState('');
  const [deadline, setDeadline] = useState(dayjs());
  const [priority, setPriority] = useState('Low');
  const [titleErr, setTitleErr] = useState(false);
  const [descErr, setDescErr] = useState(false);
  const [descHelper, setDescHelper] = useState('');
  const [titleHelper, setTitleHelper] = useState('');

  function handleCancel(event) {
    event.preventDefault();
    $('#' + props.id).modal('hide');
    props.setTitle('');
    props.setDesc('');
    props.setPriority('Low');
    props.setDeadline(dayjs());
    setDeadline(dayjs());
    setDesc('');
    setPriority('Low');
    setTitleErr(false);
    setDescErr(false);
  }

  function validate(type) {
    let valid = true;

    if (type == 'add') {
      let unique = true;
      props.todos.forEach((todo) => {
        todo.title == props.title ? (unique = false) : (unique = true);
      });
      if (props.title == '') {
        valid = false;
        setTitleErr(true);
        setTitleHelper('Please enter a title...');
      } else if (!unique) {
        valid = false;
        setTitleErr(true);
        setTitleHelper('Please enter a unique title...');
      } else if (unique && props.title != '') {
        setTitleErr(false);
        setTitleHelper('');
      }
      if (props.desc == '') {
        valid = false;
        setDescErr(true);
        setDescHelper('Please enter a description');
      } else {
        setDescErr(false);
        setDescHelper('');
      }
    } else {
      if (desc == '') {
        valid = false;
        setDescErr(true);
        setDescHelper('Please enter a description');
      } else {
        setDescErr(false);
        setDescHelper('');
      }
    }
    return valid;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (props.id == 'addMenu') {
      if (validate('add') == true) {
        $('#' + props.id).modal('hide');
        props.addItem(event);
      }
    } else {
      if (validate('edit') == true) {
        props.editItem({
          desc: desc,
          deadline: deadline.format('MM/DD/YYYY'),
          priority: priority,
        });
        $('#' + props.id).modal('hide');
        setDesc('');
        setDeadline(dayjs());
        setPriority('Low');
      }
    }
  }

  return (
    <div class="modal fade" id={props.id}>
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white justify-content-center">
            <h5 class="modal-title text-align-start">
              {props.id == 'addMenu' ? (
                <i class="fa-solid fa-circle-plus" />
              ) : (
                <i class="fa-solid fa-pen-to-square" />
              )}
              &nbsp;{props.head}
            </h5>
          </div>
          <div class="modal-body">
            <form id="form" onSubmit={handleSubmit} noValidate>
              {props.id == 'addMenu' && (
                <Box
                  sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                  }}
                >
                  <TextField
                    variant="outlined"
                    value={props.title}
                    onChange={props.handleTitleChange}
                    label="Title"
                    error={titleErr}
                    id="title"
                    helperText={titleHelper}
                  />
                </Box>
              )}
              <Box
                sx={{
                  '& > :not(style)': { m: 1, width: '25ch' },
                }}
              >
                {props.id == 'addMenu' && (
                  <TextField
                    variant="outlined"
                    value={props.desc}
                    onChange={props.handleDescChange}
                    label="Description"
                    error={descErr}
                    id="desc"
                    helperText={descHelper}
                  />
                )}
                {props.id == 'editMenu' && (
                  <TextField
                    variant="outlined"
                    type="text"
                    value={desc}
                    onChange={(event) => {
                      event.preventDefault();
                      setDesc(event.target.value);
                    }}
                    label="Description"
                    id="editdesc"
                    error={descErr}
                    helperText={descHelper}
                  />
                )}
              </Box>
              <div class="row m-3 d-flex justify-content-center">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div id="deadline">
                    {props.id == 'addMenu' && (
                      <DatePicker
                        label="Deadline"
                        value={props.deadline}
                        onChange={(date) => {
                          props.setDeadline(date);
                        }}
                        required
                        id="deadline"
                      />
                    )}
                    {props.id == 'editMenu' && (
                      <DatePicker
                        label="Deadline"
                        value={deadline}
                        onChange={(date) => {
                          setDeadline(date);
                        }}
                        required
                        id="deadline"
                      />
                    )}
                  </div>
                </LocalizationProvider>
              </div>
              <div class="row m-3 d-flex justify-content-center">
                {props.id == 'addMenu' && (
                  <>
                    <label htmlFor="radio" class="text-muted">
                      Priority
                    </label>
                    <div id="radio">
                      <div class="form-check form-check-inline col-sm-3">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="pr"
                          value="Low"
                          onChange={(event) => {
                            props.setPriority(event.target.value);
                          }}
                          checked={props.priority === 'Low'}
                        />
                        <label class="form-check-label" htmlFor="inlineRadio1">
                          Low
                        </label>
                      </div>
                      <div class="form-check form-check-inline col-sm-3">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="pr"
                          value="Med"
                          onChange={(event) => {
                            props.setPriority(event.target.value);
                          }}
                          checked={props.priority === 'Med'}
                        />
                        <label class="form-check-label" htmlFor="inlineRadio2">
                          Med
                        </label>
                      </div>
                      <div class="form-check form-check-inline col-sm-3">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio3"
                          value="High"
                          onChange={(event) => {
                            props.setPriority(event.target.value);
                          }}
                          checked={props.priority === 'High'}
                        />
                        <label class="form-check-label" htmlFor="inlineRadio3">
                          High
                        </label>
                      </div>
                    </div>
                  </>
                )}
                {props.id == 'editMenu' && (
                  <>
                    <label htmlFor="radio" class="text-muted">
                      Priority
                    </label>
                    <div id="radio">
                      <div class="form-check form-check-inline col-sm-3">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio1"
                          value="Low"
                          onChange={(event) => {
                            setPriority(event.target.value);
                          }}
                          checked={priority === 'Low'}
                        />
                        <label class="form-check-label" htmlFor="inlineRadio1">
                          Low
                        </label>
                      </div>
                      <div class="form-check form-check-inline col-sm-3">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio2"
                          value="Med"
                          onChange={(event) => {
                            setPriority(event.target.value);
                          }}
                          checked={priority === 'Med'}
                        />
                        <label class="form-check-label" htmlFor="inlineRadio2">
                          Med
                        </label>
                      </div>
                      <div class="form-check form-check-inline col-sm-3">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio3"
                          value="High"
                          onChange={(event) => {
                            setPriority(event.target.value);
                          }}
                          checked={priority === 'High'}
                        />
                        <label class="form-check-label" htmlFor="inlineRadio3">
                          High
                        </label>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row-reverse',
                  margin: 1,
                }}
              >
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleCancel}
                >
                  <i class="fa-solid fa-ban" /> &nbsp; Cancel
                </Button>
                <Button variant="contained" type="submit">
                  <i class="fa-solid fa-circle-plus" /> &nbsp; Submit
                </Button>
              </Box>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
