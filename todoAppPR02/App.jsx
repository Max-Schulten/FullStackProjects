import { useEffect, useState } from 'react';
import Item from './Item';
import Menu from './Menu';
import dayjs from 'dayjs';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function App() {
  toastr.options = {
    positionClass: 'toast-bottom-right',
  };

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todosKey');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [keys, setKeys] = useState(() => {
    const savedKeys = localStorage.getItem('keys');
    return savedKeys ? JSON.parse(savedKeys) : [];
  });

  useEffect(() => {
    localStorage.setItem('todosKey', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('keys', JSON.stringify(keys));
  }, [keys]);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [deadline, setDeadline] = useState(dayjs());
  const [priority, setPriority] = useState('Low');
  const [index, setIndex] = useState('0');
  const [editKey, setEditKey] = useState('');

  function handleAdd(event) {
    event.preventDefault();
    $('#addMenu').modal('show');
  }

  function setter(key) {
    setEditKey(key);
  }

  function addItem(event) {
    event.preventDefault();
    let temp = parseInt(index);
    while (keys.includes(String(temp))) {
      temp++;
    }
    const newTodo = {
      key: String(temp),
      title: title,
      desc: desc,
      deadline: deadline.format('MM/DD/YYYY'),
      priority: String(priority),
    };

    setKeys([...keys, String(temp)]);
    setIndex(String(temp + 1));
    setTodos([...todos, newTodo]);
    setTitle('');
    setDesc('');
    setDeadline(dayjs());
    setPriority('Low');
    toastr.success('Task added succesfully!');
  }

  function editItem(edited) {
    setTodos(
      todos.map((todo) =>
        todo.key === editKey
          ? {
              ...todo,
              desc: edited.desc,
              deadline: edited.deadline,
              priority: edited.priority,
            }
          : todo
      )
    );
    toastr.success('Task edited sucessfully!');
  }

  function handleDelete(delkey) {
    setTodos(todos.filter((item) => item.key != delkey));
    setKeys(keys.filter((key) => key != delkey));
    toastr.success('Task succesfully deleted!');
  }

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleDescChange(event) {
    setDesc(event.target.value);
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              align="center"
            >
              <i class="fa-solid fa-bars" />
              &nbsp; Frameworks
            </Typography>
            <Button type="button" onClick={handleAdd} variant="contained">
              <i class="fa-solid fa-circle-plus"></i>&nbsp;Add
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      {/*<div className="navbar navbar-expand-sm bg-primary d-flex justify-content-between">
        <span className="navbar-brand h5 m-2 text-white text-center">
          Frameworks
        </span>
        <button
          className="m-2 btn btn-primary shadow"
          type="button"
          onClick={handleAdd}
        >
          Add
        </button>
  </div>*/}
      <table className={'table'}>
        <thead>
          <tr className={'text-center'}>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Deadline</th>
            <th scope="col">Priority</th>
            <th scope="col">Is Complete</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((item) => (
            <Item
              key={item.key}
              id={item.key}
              title={item.title}
              desc={item.desc}
              priority={item.priority}
              deadline={item.deadline}
              handleDelete={handleDelete}
              editKey={editKey}
              setter={setter}
            />
          ))}
        </tbody>
      </table>
      <Menu
        head="Add Task"
        id="addMenu"
        title={title}
        setTitle={setTitle}
        handleTitleChange={handleTitleChange}
        desc={desc}
        setDesc={setDesc}
        handleDescChange={handleDescChange}
        deadline={deadline}
        setDeadline={setDeadline}
        addItem={addItem}
        priority={priority}
        setPriority={setPriority}
        todos={todos}
      />
      <Menu
        head="Edit Task"
        id="editMenu"
        title={title}
        setTitle={setTitle}
        handleTitleChange={handleTitleChange}
        desc={desc}
        setDesc={setDesc}
        handleDescChange={handleDescChange}
        deadline={deadline}
        setDeadline={setDeadline}
        addItem={addItem}
        editItem={editItem}
        priority={priority}
        setPriority={setPriority}
      />
    </>
  );
}

export default App;
