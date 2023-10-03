import React, { useState, useEffect } from 'react';
import { Row, Col, List, Typography, Avatar, Card, Badge, Spin } from 'antd';
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

  const [people, setPeople] = useState(null);
  const [planets, setPlanets] = useState(null);
  const [species, setSpecies] = useState(null);
  const [starships, setStarships] = useState(null);

  const [loadingPeople, setLoadingPeople] = useState(true);
  const [loadingPlanets, setLoadingPlanets] = useState(true);
  const [loadingSpecies, setLoadingSpecies] = useState(true);
  const [loadingStarships, setLoadingStarships] = useState(true);

  const [userName, setUserName] = useState('');
  const [userPicture, setUserPicture] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

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
      .then(films => {
        setFilms(films.results);
        setIsLoading(false);
      });

      fetch('https://swapi.dev/api/people')
      .then(response => response.json())
      .then(peopleData => {
        setPeople(peopleData.count);
        setLoadingPeople(false);
      });

    fetch('https://swapi.dev/api/planets')
      .then(response => response.json())
      .then(planetsData => {
        setPlanets(planetsData.count);
        setLoadingPlanets(false);
      });

    fetch('https://swapi.dev/api/species')
      .then(response => response.json())
      .then(speciesData => {
        setSpecies(speciesData.count);
        setLoadingSpecies(false);
      });

    fetch('https://swapi.dev/api/starships')
      .then(response => response.json())
      .then(starshipsData => {
        setStarships(starshipsData.count);
        setLoadingStarships(false);
      });
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
        <Spin spinning={isLoading}>
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
      </Spin>
      </div>

      <div className='cardList'>
        <Row gutter={16}>
        <Col span={6}>
          <Card bordered={false} onClick={() => handleCardClick('Pessoas')}>
            <Spin spinning={loadingPeople}>
              <span className='cardTitle'>Pessoas</span><br></br>
              <h1 className="cardCount"><img src={People} alt="Logo"/> {people}</h1>
            </Spin>
          </Card>
        </Col>

        <Col span={6}>
          <Card bordered={false} onClick={() => handleCardClick('Planetas')}>
            <Spin spinning={loadingPlanets}>
              <span className='cardTitle'> Planetas</span><br></br>
              <h1 className="cardCount"><img src={Planet} alt="Logo"/> {planets}</h1>
             </Spin>
          </Card>
        </Col>

        <Col span={6}>
          <Card bordered={false} onClick={() => handleCardClick('Espécies')}>
            <Spin spinning={loadingSpecies}>
              <span className='cardTitle'>Espécies</span><br></br>
              <h1 className="cardCount"><img src={Species} alt="Logo"/> {species}</h1>
            </Spin>
          </Card>
        </Col>

        <Col span={6}>
          <Card bordered={false} onClick={() => handleCardClick('Naves')}>
            <Spin spinning={loadingStarships}>
              <span className='cardTitle'>Naves</span><br></br>
              <h1 className="cardCount"><img src={Starship} alt="Logo"/> {starships}</h1>
            </Spin>
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
