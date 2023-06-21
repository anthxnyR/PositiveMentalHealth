import * as React from 'react';
import Button from 'react-bootstrap/Button'
import { Note } from "./note.model";
import { Alert, Form } from 'react-bootstrap';

//material ui
import { Typography } from '@material-ui/core';

interface ICreateNotesProps {
    notes: Note[],
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>
}

const CreateNotes: React.FunctionComponent<ICreateNotesProps> = ({notes, setNotes}) => {
    const [error, setError] = React.useState<string>("");
    const titleRef = React.useRef<HTMLInputElement | null>(null);
    const textRef = React.useRef<HTMLTextAreaElement | null>(null);
    const colorRef = React.useRef<HTMLInputElement | null>(null);

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (titleRef.current?.value === "" || textRef.current?.value === "") {
            return setError("Todos los campos son obligatorios");
        }
        
        setError("");
        setNotes([...notes, {
            id: (new Date()).toString(),
            title: (titleRef.current as HTMLInputElement).value,
            text: (textRef.current as HTMLTextAreaElement).value,
            color: (colorRef.current as HTMLInputElement).value,
            date: (new Date().toLocaleString()).toString()
        }]);
        
        (titleRef.current as HTMLInputElement).value = "";
        (textRef.current as HTMLTextAreaElement).value = "";

    }

    return (<>
            <Typography variant='h2'>NOTAS CREADAS</Typography>
            {error && <Alert variant="danger">{ error}</Alert>}
            <Form className="mt-3 mb-3" onSubmit={(e) => handleSubmit(e) }>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>TÍTULO</Form.Label>
                    <Form.Control  type="text" placeholder="Ingrese el título" ref={ titleRef }/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>TEXTO</Form.Label>
                    <Form.Control placeholder="Escribe el contenido" as="textarea" rows={3} ref={ textRef }/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="colorInput">Color de Nota</Form.Label>
                    <Form.Control type="color" id="colorInput" defaultValue="#dfdfdf" title="Elige el color de la nota" ref={ colorRef }/>
                </Form.Group>
                <Button type="submit" variant="primary">Guardar Nota</Button>
            </Form>
            </>
  );
};

export default CreateNotes;
