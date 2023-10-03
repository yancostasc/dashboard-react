import React, { useState, useEffect } from "react";
import { Table, Input, Spin } from "antd";
import { format } from "date-fns";
import "./List.css";

const { Search } = Input;

const PeopleList = () => {
  const [people, setPeople] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://swapi.dev/api/people")
      .then((response) => response.json())
      .then((data) => {
        setPeople(
          data.results.map((person) => ({
            ...person,
            created: format(new Date(person.created), "dd/MM/yyyy HH:mm"),
            edited: format(new Date(person.edited), "dd/MM/yyyy HH:mm"),
          }))
        );
        setLoading(false);
      });
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredPeople = people.filter((person) =>
    person.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Altura",
      dataIndex: "height",
      key: "height",
      render: (height) => <span>{height} cm</span>,
    },
    {
      title: "Ano de Nascimento",
      dataIndex: "birth_year",
      key: "birth_year",
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
        <h2 className="listTitle">Pessoas</h2>
        <Search
          placeholder="Pesquisar pessoas"
          onSearch={handleSearch}
          style={{ marginBottom: 16 }}
        />
      </div>
      <Spin spinning={loading}>
        <Table
          className="customWidth"
          dataSource={filteredPeople}
          columns={columns}
        />
      </Spin>
    </div>
  );
};

export default PeopleList;
