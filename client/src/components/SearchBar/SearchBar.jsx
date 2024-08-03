import React, { useContext } from "react";
import { Form, Row } from "react-bootstrap";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import { FaSearch } from "react-icons/fa";

const SearchBar = observer(() => {
  const { device } = useContext(Context);

  return (
    <Row className="mt-4 d-flex align-items-center">
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <FaSearch style={{ marginRight: '8px' }} />
        <Form.Control
          type="text"
          placeholder="Поиск"
          value={device.searchQuery}
          onChange={(e) => device.setSearchQuery(e.target.value)}
          style={{ flex: 1 }}
        />
      </div>
    </Row>
  );
});

export default SearchBar;
