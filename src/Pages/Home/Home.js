import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, Badge } from 'react-bootstrap';
import config from '../../Config/config';

function Home() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [filter, setFilter] = useState('all');

  const API_URL = `${config.backendUrl}/api/movies`;

  const fetchMovies = async () => {
    try {
      const res = await fetch(`${API_URL}?filter=${filter}`);
      const data = await res.json();
      setMovies(data);
    } catch (err) {
      console.error('Error fetching movies:', err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [filter]);

  const addMovie = async (e) => {
    e.preventDefault();
    if (!title || !genre || !description) return;
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, genre, description })
      });

      if (res.ok) {
        setTitle('');
        setGenre('');
        setDescription('');
        fetchMovies();
      }
    } catch (err) {
      console.error('Error adding movie:', err);
    }
  };

  const toggleWatched = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'PATCH' });
      if (res.ok) fetchMovies();
    } catch (err) {
      console.error('Error toggling watched:', err);
    }
  };

  const deleteMovie = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (res.ok) fetchMovies();
    } catch (err) {
      console.error('Error deleting movie:', err);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">My Movie Watchlist</h2>

      <Form onSubmit={addMovie}>
        <Row className="mb-3">
          <Col md={3}>
            <Form.Control placeholder="Movie Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </Col>
          <Col md={3}>
            <Form.Control placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
          </Col>
          <Col md={4}>
            <Form.Control placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </Col>
          <Col md={2}>
            <Button type="submit" variant="primary" className="w-100">Add Movie</Button>
          </Col>
        </Row>
      </Form>

      <div className="d-flex justify-content-center mb-3">
        <Button variant={filter === 'all' ? 'secondary' : 'outline-secondary'} className="mx-1" onClick={() => setFilter('all')}>All</Button>
        <Button variant={filter === 'watched' ? 'success' : 'outline-success'} className="mx-1" onClick={() => setFilter('watched')}>Watched</Button>
        <Button variant={filter === 'unwatched' ? 'warning' : 'outline-warning'} className="mx-1" onClick={() => setFilter('unwatched')}>Unwatched</Button>
      </div>

      <ListGroup>
        {movies.length === 0 && <p className="text-center">No movies found!</p>}
        {movies.map((movie) => (
          <ListGroup.Item key={movie._id} className="d-flex justify-content-between align-items-center">
            <div>
              <h5>{movie.title} <Badge bg="info">{movie.genre}</Badge></h5>
              <p>{movie.description}</p>
              <Button variant={movie.watched ? 'success' : 'outline-success'} size="sm" onClick={() => toggleWatched(movie._id)}>
                {movie.watched ? 'Watched' : 'Mark as Watched'}
              </Button>{' '}
              <Button variant="danger" size="sm" onClick={() => deleteMovie(movie._id)}>Delete</Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default Home;
