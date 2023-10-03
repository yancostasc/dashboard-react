import React, { useState, useEffect } from 'react';
import { Table, Input } from 'antd';
import './List.css';

  const { Search } = Input;

  const StarshipList = () => {
    const [starships, setStarships] = useState([]);
    const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetch('https://swapi.dev/api/starships')
      .then((response) => response.json())
      .then((data) => {
        setStarships(data.results.map((starships) => ({
          ...starships
        })));
      });
  }, []);
  
  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredStarships = starships.filter((starships) =>
    starships.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Modelo',
      dataIndex: 'model',
      key: 'model',
    },
    {
        title: 'Fabricante',
        dataIndex: 'manufacturer',
        key: 'manufacturer'
    },
    {
      title: 'Velocidade',
      dataIndex: 'cost_in_credits',
      key: 'cost_in_credits',
    },
    {
      title: 'Valor em créditos',
      dataIndex: 'max_atmosphering_speed',
      key: 'max_atmosphering_speed',
    },
  ];

  return (
    <div className='customTable'>
        <div className='inline'>
            <h2 className='listTitle'>Naves</h2>
            <Search
                placeholder="Pesquisar naves"
                onSearch={handleSearch}
                style={{ marginBottom: 16 }}
            />
        </div>
      <Table dataSource={filteredStarships} columns={columns} />
    </div>
  );
};

export default StarshipList;
