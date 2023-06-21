import * as React from 'react';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Note } from './note.model';

interface INotesProps {
    note: Note,
    handleDelete: (id: string) => void
}

const Notes: React.FC<INotesProps> = ({ note, handleDelete }) => {
    return (
        <div className="mb-3">
            
            <Card style={{ backgroundColor: note.color }}>
                <hr />
                <Card.Body>
                    <Card.Title >{note.title}</Card.Title>
                    <hr />
                    <Card.Text>{note.text}</Card.Text>
                    <Card.Subtitle className="text-muted">Fecha y Hora: {note.date}</Card.Subtitle>
                    <hr />
                    <Button className="mt-3" variant="danger" onClick={() => handleDelete(note.id)}>Borrar</Button>
                </Card.Body>
                <hr />
            </Card>
        </div>
    );
};

export default Notes;
