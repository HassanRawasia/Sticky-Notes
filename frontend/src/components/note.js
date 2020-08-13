import React from 'react';
import './note.css';
import pin from '../pin.png';
import trash from '../delete.png';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

class Note extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            diffX: 0,
            diffY: 0,
            dragging: false,
            styles: {},
            noteList: [],
            title: props.title,
            content: props.content,
            id: props.id
        }

        this.dragStart = this.dragStart.bind(this);
        this.dragging = this.dragging.bind(this);
        this.dragEnd = this.dragEnd.bind(this);
    }

    // For drag functionality: ****************************************
    dragStart(e) {
        this.setState({
            diffX: e.screenX - e.currentTarget.getBoundingClientRect().left,
            diffY: e.screenY - e.currentTarget.getBoundingClientRect().top,
            dragging: true
        });
    }

    dragging(e) {

        if (this.state.dragging) {
            var left = e.screenX - this.state.diffX;
            var top = e.screenY - this.state.diffY;

            this.setState({
                styles: {
                    left: left,
                    top: top
                }
            });
        }
    }

    dragEnd() {
        this.setState({
            dragging: false
        });
    }

    // Note update methods ****************************************
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

    updateNote(title, content) {
        let url = `http://127.0.0.1:7000/api/note-update/${this.state.id}/`

        let csrftoken = this.getCookie('csrftoken');

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({ title, content })
        }).catch((error) => {
            console.log('ERROR:', error)
        })

        this.setState({
            title: title,
            content: content
        })
    }

    saveTitle(title) {
        this.setState({
            title,
            edited: false
        })
        this.updateNote(title, this.state.content);
    }

    saveContent(content) {
        this.setState({
            content,
            edited: false
        })
        this.updateNote(this.state.title, content);
    }

    render() {
        return (

            <div className="Note" style={this.state.styles} onMouseDown={this.dragStart} onMouseMove={this.dragging} onMouseUp={this.dragEnd}>
                <div >
                    <img className="pin" src={pin}></img>
                </div>
                <div className="title">
                    <Editor
                        value={this.state.title}
                        onValueChange={title => this.saveTitle(title)}
                        highlight={code => highlight(code, languages.js)}
                        padding={5}
                        style={{
                            fontFamily: 'Arial, Helvetica, sans-serif',
                            fontSize: 15,
                        }}
                    />
                </div>
                <div className="content">
                    <Editor
                        value={this.state.content}
                        onValueChange={content => this.saveContent(content)}
                        highlight={code => highlight(code, languages.js)}
                        padding={5}
                        style={{
                            fontFamily: 'Arial, Helvetica, sans-serif',
                            fontSize: 15,
                        }}
                    />
                </div>
                <input className="delete" type="image" src={trash} onClick={this.props.DeleteNote} />
            </div>
        );
    }
}

export default Note;