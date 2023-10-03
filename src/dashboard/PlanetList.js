import React, { useState, useEffect } from "react";
import { Table, Input, Spin } from "antd";
import { format } from "date-fns";
import "./List.css";

const { Search } = Input;

const PlanetList = () => {
  const [planets, setPlanets] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://swapi.dev/api/planets")
      .then((response) => response.json())
      .then((data) => {
        setPlanets(
          data.results.map((planet) => ({
            ...planet,
            created: format(new Date(planet.created), "dd/MM/yyyy HH:mm"),
            edited: format(new Date(planet.edited), "dd/MM/yyyy HH:mm"),
          }))
        );
        setLoading(false);
      });
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredPlanets = planets.filter((planet) =>
    planet.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "População",
      dataIndex: "population",
      key: "population",
    },
    {
      title: "Clima",
      dataIndex: "climate",
      key: "climate",
    },
    {
      title: "Criado em",
      dataIndex: "created",
      key: "created",
    },
    {
      title: "Editado em",
      dataIndex: "edited",
      key: "edited",
    },
  ];

  return (
    <div className="customTable">
      <div className="inline">
        <h2 className="listTitle">Planetas</h2>
        <Search
          placeholder="Pesquisar planetas"
          onSearch={handleSearch}
          style={{ marginBottom: 16 }}
        />
      </div>
      <Spin spinning={loading}>
        <Table dataSource={filteredPlanets} columns={columns} />
      </Spin>
    </div>
  );
};

export default PlanetList;
