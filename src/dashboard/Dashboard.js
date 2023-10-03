import React, { useState, useEffect } from 'react';
import { Row, Col, List, Typography, Avatar, Card, Badge } from 'antd';
import { SearchOutlined, BellOutlined  } from '@ant-design/icons';
import { format } from 'date-fns';
import './Dashboard.css';
import PeopleList from './PeopleList';
import PlanetList from './PlanetList';
import SpeciesList from './SpeciesList';
import People from './People.svg';
import Planet from './Planet.svg';
import Species from './Species.svg';
import Starship from './Starship.svg';
import StarshipList from './StarshipList';

const Dashboard = () => {
  const [films, setFilms] = useState([]);

  const [people, setPeople] = useState([]);
  const [planet, setPlanets] = useState([]);
  const [species, setSpecies] = useState([]);
  const [starships, setStarships] = useState([]);

  const [userName, setUserName] = useState('');
  const [userPicture, setUserPicture] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (cardTitle) => {
    setSelectedCard(cardTitle);
  };

  useEffect(() => {
    fetch(fakeDataUrl)
      .then(response => response.json())
      .then(data => {
        const name = data.results[0].name.first;
        const picture = data.results[0].picture.large;
        setUserName(name);
        setUserPicture(picture);
      });

      fetch('https://swapi.dev/api/films')
      .then(response => response.json())
      .then(films => setFilms(films.results)); 

      fetch('https://swapi.dev/api/people')
      .then(response => response.json())
      .then(people => setPeople(people.count));

      fetch('https://swapi.dev/api/planets')
      .then(response => response.json())
      .then(planets => setPlanets(planets.count));

      fetch('https://swapi.dev/api/species')
      .then(response => response.json())
      .then(species => setSpecies(species.count));

      fetch('https://swapi.dev/api/starships')
      .then(response => response.json())
      .then(starships => setStarships(starships.count));
  }, []);

  const formatDate = (dateString) => {
    const formattedDate = format(new Date(dateString), 'dd/MM/yyyy');
    return formattedDate;
  };

  const fakeDataUrl = 'https://randomuser.me/api/?results=1&inc=name,picture&noinfo';

  return (
    <div>
      <Row align="middle" justify="space-between">
        <Col span={12}>
          <h1 className="label">Olá, {userName}</h1>
        </Col>

        <Col span={12} className='iconsList'>
          <Avatar icon={<SearchOutlined />} className="icon" />
          <Badge dot>
           <Avatar icon={<BellOutlined />} className="icon" />
          </Badge>
          <Avatar className='icon' size={30} src={userPicture} />
          <span className="userLabel"> {userName} </span> 
        </Col>
      </Row>

      <div className='filmsList'>
        <h3>Filmes</h3>
        <List
          grid={{ gutter: 12, column: 2 }}
          dataSource={films}
          renderItem={(film) => (
            <List.Item className='box'>
              <Typography.Text className='filmTitle'>{film.title}</Typography.Text> 
              <span className="filmDate">{formatDate(film.release_date)}</span>
            </List.Item>
          )}
        />
      </div>

      <div className='cardList'>
        <Row gutter={16}>
        <Col span={6}>
          <Card bordered={false} onClick={() => handleCardClick('Pessoas')}>
            <span className='cardTitle'>Pessoas</span><br></br>
            <h1 className="cardCount"><img src={People} alt="Logo"/> {people}</h1>
          </Card>
        </Col>

        <Col span={6}>
          <Card bordered={false} onClick={() => handleCardClick('Planetas')}>
            <span className='cardTitle'> Planetas</span><br></br>
            <h1 className="cardCount"><img src={Planet} alt="Logo"/> {planet}</h1>
          </Card>
        </Col>

        <Col span={6}>
          <Card bordered={false} onClick={() => handleCardClick('Espécies')}>
            <span className='cardTitle'>Espécies</span><br></br>
            <h1 className="cardCount"><img src={Species} alt="Logo"/> {species}</h1>
          </Card>
        </Col>

        <Col span={6}>
          <Card bordered={false} onClick={() => handleCardClick('Naves')}>
            <span className='cardTitle'>Naves</span><br></br>
            <h1 className="cardCount"><img src={Starship} alt="Logo"/> {starships}</h1>
          </Card>
        </Col>

        </Row>

        {selectedCard === 'Pessoas' && <PeopleList />} 
        {selectedCard === 'Planetas' && <PlanetList />} 
        {selectedCard === 'Espécies' && <SpeciesList />} 
        {selectedCard === 'Naves' && <StarshipList />} 

      </div>

    </div>
  );
};

export default Dashboard;
