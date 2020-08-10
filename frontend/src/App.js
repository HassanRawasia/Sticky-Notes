import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header.js';
import Note from './components/note.js';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      noteList: []
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

  noteSelect(index) {
    console.log(index);
  }
  render() {
    return (
      <div className="App">
        <Header />
        <div className="notes">
          {/* <Note title="Title" content="This is a note component"/> */}
          {this.state.noteList.map((note, index) => 
            <Note akey={note.id} title={note.title} content={note.content} onClick={this.noteSelect(index)} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
