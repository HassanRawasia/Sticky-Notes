import React from 'react';
import './App.css';
import Header from './components/header.js';
import Note from './components/note.js';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      noteList: [],
    }
  }

  componentDidMount() {
    this.getNotes();
  }

  getNotes() {
    fetch('http://127.0.0.1:7000/api/note-list/')
      .then(response => response.json())
      .then(data =>
        this.setState({
          noteList: data
        })
      )
  }

  getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  createNote() {
    let url = `http://127.0.0.1:7000/api/note-create/`

    let csrftoken = this.getCookie('csrftoken');

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify({ title: 'Title', content: 'Text' })
    }).catch((error) => {
      console.log('ERROR:', error)
    }).then(() => {
      this.getNotes();
    })
  }

  deleteNote(id) {
    let url = `http://127.0.0.1:7000/api/note-delete/${id}/`

    let csrftoken = this.getCookie('csrftoken');

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
    }).then((response) => {
      this.getNotes();
    })
  }
  render() {
    return (
      <body>
        <div className="App" >
          <Header onCreate={() => this.createNote()} />
          <div className="notes">
            {this.state.noteList.map((note, index) =>
              <div className="note-wrapper">
                <Note key={note.id} id={note.id} title={note.title} content={note.content} DeleteNote={() => this.deleteNote(note.id)} />
              </div>
            )}
          </div>
        </div>
      </body>
    );
  }
}

export default App;
