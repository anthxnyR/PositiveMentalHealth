import * as React from 'react';
import Notes from './Notes';
import { Note } from './note.model';
import {Button, Card} from "react-bootstrap";

interface INotesListProps {
    notes: Note[],
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>
}

const NotesList: React.FC<INotesListProps> = ({ notes, setNotes }) => {
    const handleDelete = (id: string) => {
        setNotes(notes.filter(note => note.id !== id));
    }
    const renderNotes = ():JSX.Element[] => {
        return notes.map(note => {
            return <Notes key={note.id} note={note} handleDelete={ handleDelete }/>
        })
    }
    return (
        <>
            <hr />
            <h2 className="mt-3">NOTAS</h2>
            
            <div>{ renderNotes() }</div>
        </>
  );
};

export default NotesList;
