import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, Badge } from 'react-bootstrap';

function Home() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [filter, setFilter] = useState('all');

  const addMovie = (e) => {
    e.preventDefault();
    if (!title || !genre || !description) return;
    const newMovie = {
      id: Date.now(),
      title,
      genre,
      description,
      watched: false
    };
    setMovies([...movies, newMovie]);
    setTitle('');
    setGenre('');
    setDescription('');
  };

  const toggleWatched = (id) => {
    setMovies(movies.map(movie => movie.id === id ? { ...movie, watched: !movie.watched } : movie));
  };

  const deleteMovie = (id) => {
    setMovies(movies.filter(movie => movie.id !== id));
  };

  const filteredMovies = movies.filter(movie => {
    if (filter === 'watched') return movie.watched;
    if (filter === 'unwatched') return !movie.watched;
    return true;
  });

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">My Movie Watchlist</h2>

      <Form onSubmit={addMovie}>
        <Row className="mb-3">
          <Col md={3}><Form.Control placeholder="Movie Title" value={title} onChange={(e) => setTitle(e.target.value)} /></Col>
          <Col md={3}><Form.Control placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} /></Col>
          <Col md={4}><Form.Control placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} /></Col>
          <Col md={2}><Button type="submit" variant="primary" className="w-100">Add Movie</Button></Col>
        </Row>
      </Form>

      <div className="d-flex justify-content-center mb-3">
        <Button variant={filter === 'all' ? 'secondary' : 'outline-secondary'} className="mx-1" onClick={() => setFilter('all')}>All</Button>
        <Button variant={filter === 'watched' ? 'success' : 'outline-success'} className="mx-1" onClick={() => setFilter('watched')}>Watched</Button>
        <Button variant={filter === 'unwatched' ? 'warning' : 'outline-warning'} className="mx-1" onClick={() => setFilter('unwatched')}>Unwatched</Button>
      </div>

      <ListGroup>
        {filteredMovies.length === 0 && <p className="text-center">No movies found!</p>}
        {filteredMovies.map(movie => (
          <ListGroup.Item key={movie.id} className="d-flex justify-content-between align-items-center">
            <div>
              <h5>{movie.title} <Badge bg="info">{movie.genre}</Badge></h5>
              <p>{movie.description}</p>
              <Button variant={movie.watched ? 'success' : 'outline-success'} size="sm" onClick={() => toggleWatched(movie.id)}>
                {movie.watched ? 'Watched' : 'Mark as Watched'}
              </Button>{' '}
              <Button variant="danger" size="sm" onClick={() => deleteMovie(movie.id)}>Delete</Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default Home;
