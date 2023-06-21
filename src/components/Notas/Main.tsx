import React, { useState } from 'react';
import NotesList from './NotesList';
import CreateNotes from './CreateNotes';
import { Note } from './note.model';
import { Col, Container, Row } from 'react-bootstrap';

function Main() {
  const [notes, setNotes] = useState<Note[]>([]);


  return (
    <>
      <Container className="mt-5">
        <Row>
        <Col>
            <CreateNotes notes={notes} setNotes={ setNotes}/>
          </Col>

        </Row>
        <Row>
        <Col>
            <NotesList notes={notes} setNotes={ setNotes}/>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Main;
