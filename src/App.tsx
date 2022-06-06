import './App.css';
import { useEffect, useState } from 'react';
// import DUMMY_NOTES from './DUMMY_NOTES';
import Note from './components/Note/Note';
import INote from './interfaces/note.interface';
import { createNote, deleteNote, getNotes, updateNote } from './services/notesService';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';

function App() {
  // let notesList: any[] = []; // We should not use any, it's just for teaching purpose
  // React does not re-render the view, unless the variable is state variable
  // For this, we need to use Hooks
  const [notesList, setNotesList] = useState<any[]>([]);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [newNote, setNewNote] = useState<Partial<INote>>({
    text: "",
    link: ""
  });

  const handleCloseAddModal = () => {
    setNewNote({
      text: "",
      link: ""
    })
    setShowAddNoteModal(false);
  }
  const handleShowAddModal = () => setShowAddNoteModal(true);
  //setNotesList(DUMMY_NOTES); // Gives error


  useEffect(() => {
    // const listFromStorage = localStorage.getItem("my-notes");
    // if(listFromStorage) {
    //   setNotesList(JSON.parse(listFromStorage));
    // } else {
    //   setNotesList(DUMMY_NOTES);
    // }
    getNotesFromServer();
  }, []);

  // useEffect(() => {
  //   console.log("Saving to localstorage");
  //   localStorage.setItem('my-notes', JSON.stringify(notesList));
  // }, [notesList]);

  const getNotesFromServer = async () => {
    const notes = await getNotes();
    console.log(notes);
    setNotesList(notes);
  }

  const updateNoteItem = async (updatedNote: INote) => {
    const noteFromServer = await updateNote(updatedNote);
    const updatedList = notesList.map((noteItem: INote) => {
      if(noteItem._id === noteFromServer._id) {
        return noteFromServer;
      } 
      return noteItem;
    });

    setNotesList(updatedList);
  }

  const deleteNoteItem = async (noteToDelete: INote) => {
    await deleteNote(noteToDelete._id);
    const remainingNotes = notesList.filter((noteItem) => {
      return noteItem._id !== noteToDelete._id;
    })
    setNotesList(remainingNotes);
  }

  const addNote = async () => {
    const savedNote = await createNote(newNote);
    setNotesList([...notesList, savedNote]);
    handleCloseAddModal();
  }

  return (
    <div className="App">
      <Button variant="dark" className="add-button" onClick={handleShowAddModal}>
        <div className="add-button-text">+</div>
      </Button>

      <Modal show={showAddNoteModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingTextarea2" label="Text">
            <Form.Control 
              onChange={(event) => {
                const newVal = event.currentTarget.value;
                setNewNote({
                  ...newNote,
                  text: newVal
                })
              }}
              as="textarea"
              placeholder="Enter Text"
              style={{ height: '100px' }} 
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingTextarea" label="Link" className="mb-3 note-link">
            <Form.Control 
              onChange={(event) => {
                const newVal = event.currentTarget.value;
                setNewNote({
                  ...newNote,
                  link: newVal
                })
              }}
              type="url"
              placeholder="Enter Link"
              style={{ height: '100px' }} 
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={addNote}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      {/* <div>
        <button onClick={getNotes}>Click Me!</button>
      </div> */}
      <div className="notes-list">
        {
          notesList.map((noteItem, index) => {
            return <Note note={noteItem} onNoteUpdate={updateNoteItem} onNoteDelete={deleteNoteItem} key={index} />
          })
        }
      </div>
    </div>
  );
}

export default App;
