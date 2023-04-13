import React from 'react';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

function AnimeCard({anime}) {
  const cardStyle = {
    width: '30rem', 
    height: '100%',
    margin: '10px',
    textAlign: 'left'
  }
  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  }
    return (
        <div style={divStyle}>
          <Card style={cardStyle}>
            <Card.Header className="bg-dark text-black">{anime.title}</Card.Header>
            <Card.Body>
              <Card.Text>{anime.synopsis}</Card.Text>
            </Card.Body>
          </Card>
        </div>
    )
}

export default AnimeCard;