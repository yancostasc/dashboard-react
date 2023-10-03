import React, { useState, useEffect } from "react";
import { Table, Input, Spin } from "antd";
import { format } from "date-fns";
import "./List.css";

const { Search } = Input;

const SpeciesList = () => {
  const [species, setSpecies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://swapi.dev/api/species")
      .then((response) => response.json())
      .then((data) => {
        setSpecies(
          data.results.map((species) => ({
            ...species,
            created: format(new Date(species.created), "dd/MM/yyyy HH:mm"),
            edited: format(new Date(species.edited), "dd/MM/yyyy HH:mm"),
          }))
        );
        setLoading(false);
      });
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredSpecies = species.filter((species) =>
    species.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Classificação",
      dataIndex: "classification",
      key: "classification",
    },
    {
      title: "Designação",
      dataIndex: "designation",
      key: "designation",
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
        <h2 className="listTitle">Espécies</h2>
        <Search
          placeholder="Pesquisar espécies"
          onSearch={handleSearch}
          style={{ marginBottom: 16 }}
        />
      </div>
      <Spin spinning={loading}>
        <Table dataSource={filteredSpecies} columns={columns} />
      </Spin>
    </div>
  );
};

export default SpeciesList;
