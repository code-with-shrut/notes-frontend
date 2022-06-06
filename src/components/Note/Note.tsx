import { FC, FocusEvent, useState } from "react";
import INote from "../../interfaces/note.interface";
import "./Note.css";

type Props = {
  note: INote;
  // onNoteUpdate: Function;
  onNoteUpdate: (note: INote) => void;
  onNoteDelete: (note: INote) => void;
};

const Note: FC<Props> = ({ note, onNoteUpdate, onNoteDelete }) => {
  const [isFocused, setIsFocused] = useState(false);

  const noteTextUpdated = (event: FocusEvent<HTMLDivElement>) => {
    setIsFocused(false);
    const newTextValue = event.currentTarget.textContent;
    if(newTextValue === note.text) {
      return;
    }
    onNoteUpdate({
      ...note,
      text: newTextValue || ""
    });
  };

  const noteLinkUpdated = (event: FocusEvent<HTMLDivElement>) => {
    setIsFocused(false);
    const newLinkValue = event.currentTarget.textContent;
    if(newLinkValue === note.link) {
      return;
    }
    onNoteUpdate({
      ...note,
      link: newLinkValue || ""
    });
  };
  
  return (
    <div className={isFocused ? "note note--focused" : "note"}>
      <button onClick={() => {
        onNoteDelete(note)
      }} type="button" className="btn-close"></button>
      <div
        onBlur={noteTextUpdated}
        onFocus={() => {
          setIsFocused(true)
        }}
        contentEditable={true}
        suppressContentEditableWarning={true}
        className="note__text"
      >
        {note.text}
      </div>
      <div 
        onBlur={noteLinkUpdated}
        onFocus={() => {
          setIsFocused(true)
        }}
        contentEditable={true}
        suppressContentEditableWarning={true}
        className="note__link"
      >
        <a href={note.link}>{note.link}</a>
      </div>
    </div>
  );
};

export default Note;
