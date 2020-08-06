import React, { useState, useEffect } from 'react';
import './App.css';
import './components/Add.js'
import 'antd/dist/antd.css'
import {Table, Button, Modal} from 'antd';
import Add from './components/Add.js';
import Edit from './components/Edit.js';
//import {useAsync} from 'react-async';

const apiUrl = "http://localhost:43443/api/Comic";

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    sorter: {
      compare: (a, b) => compareByAlph(a.title, b.title),
    },
    sortDirections: ['descend', 'ascend'],
    filterMultiple: false,
  },
  {
    title: 'Series',
    dataIndex: 'series',
    key: 'series',
    sorter: {
      compare: (a, b) => compareByAlph(a.series, b.series),
    },
    sortDirections: ['descend', 'ascend'],
    filterMultiple: false,
  },
  {
    title: 'Publisher',
    dataIndex: 'publisher',
    key: 'publisher',
    sorter: {
      compare: (a, b) => compareByAlph(a.publisher, b.publisher),
    },
    sortDirections: ['descend', 'ascend'],
    filterMultiple: false,
  },
  {
    title: 'Issue Number',
    dataIndex: 'issueNumber',
    key: 'issueNumber',
    sorter: {
      compare: (a, b) => compareByAlph(a.issueNumber, b.issueNumber),
    },
    sortDirections: ['descend', 'ascend'],
    filterMultiple: false,
  },
];

function compareByAlph (a, b) { if (a > b) { return -1; } if (a < b) { return 1; } return 0; }

function deleteReq(id) {
  // delete entity - DELETE
  //e.preventDefault();
  fetch(`${apiUrl}/${id}`, {
    method: "DELETE", //,
    // "headers": {
    // }
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      window.location.reload();
    });
}

var editDetails = [];

function App() {
  const [comics,setComics,] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [editOn, startEdit] = useState(false);


  useEffect(() => {
    //get all comics -Get
    fetch(apiUrl, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((comicInfo) => {
        setComics(comicInfo)
      })
      .catch((err) => {
        console.log(err);
      })
    }, []
  );

  const onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys)
  };

  const goDelete = () => {
    console.log("Deleting: " + selectedRowKeys);
    //let asynRequests = [];
    selectedRowKeys.forEach(id =>{
      deleteReq(id)
    })
  };

  //const { comics, id, title, series, publisher, issueNumber, selectedRowKeys } = this.state;
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const clickEdit = (e) =>{
    startEdit(true);
    editDetails = (e);
  }

  const closeEdit = () => {
    startEdit(false);
    editDetails = [];
    console.log(editOn);
    window.location.reload();
  }

  const hasSelected = selectedRowKeys.length > 0;
    
    return (
      <div>
        Comic Database <br/>
        <Button type="primary" onClick={(e) => goDelete()} disabled={!hasSelected} danger={true}>delete {hasSelected ? `${selectedRowKeys.length} item(s)` : ''}</Button>
        {Add()}
        <Table rowKey="id" rowSelection={ rowSelection } dataSource={comics} columns={columns} onRow={(record, rowIndex) => {
          return {
            onClick: () => {clickEdit(record)}, //click row
            //onDoubleClick: event => {console.log("double")},
          };
        }} />
        <Modal title="Edit This Comic!" visible={editOn} footer={[]} onCancel={e => closeEdit()}>{Edit(editDetails)}</Modal>
      </div>
      )
}

export default App;