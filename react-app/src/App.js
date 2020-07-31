import React from "react";
//import logo from './logo.svg';
import "./App.css";
import 'antd/dist/antd.css'
import {Table, Tag, Space} from 'antd';

//https://ant.design/components/table/#components-table-demo-head

const apiUrl = "http://localhost:44343/api/Comic";
var editIDs = []

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
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};


class Comics extends React.Component {

  Update(e) {
    // update entity - PUT
    //e.preventDefault();
    //console.log(e)
    fetch(`${apiUrl}/${e.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        _id: e.id,
        title: e.title,
        series: e.series,
        publisher: e.publisher,
        issueNumber: e.issueNumber,
      }),
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

  Delete(e){
    // delete entity - DELETE
    //e.preventDefault();
    fetch(`${apiUrl}/${e}`, {
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
  logE(e) {
    
  }
  Edit(e) {
    editIDs.push(e)
    this.forceUpdate()
  }

  handleChange(e) {
    this.setState({errorCopy: 'Generic error copy'});
  }

  EditDisplay(comic) {
    if (editIDs.includes(comic.id)) {
      return (
        <tr>
          {/* <td>{comic.id}</td> */}
          <td><input title="editTitle" id="editTitle" className="form-control" 
          type="text" value={comic.title} 
          onChange={(e) => this.handleChange(comic.title = e.target.value)} required/></td>
          <td><input title="editSeries" id="editSeries" className="form-control" 
          type="text" value={comic.series}
          onChange={(e) => this.handleChange(comic.series = e.target.value)} required/></td>
          <td><input title="editPublishere" id="editPublisher" className="form-control" 
          type="text" value={comic.publisher}
          onChange={(e) => this.handleChange(comic.publisher = e.target.value)} required/></td>
          <td><input title="editIssueNumber" id="editIssueNumber" className="form-control" 
          type="text" value={comic.issueNumber}
          onChange={(e) => this.handleChange(comic.issueNumber = e.target.value)} required/></td>
          <td>
            <button
              className="btn btn-info"
              type="button"
              onClick={(e) => this.Update(comic)}
            >
              Save
            </button>
          </td>
          <td>
            <button
              className="btn btn-danger"
              type="button"
              onClick={(e) => this.Delete(comic.id)}
            >
              Delete
            </button>
          </td>
        </tr>)
    } 
    else {
      return (
        <tr>
          {/* <td>{comic.id}</td> */}
          <td>{comic.title}</td>
          <td>{comic.series}</td>
          <td>{comic.publisher}</td>
          <td>{comic.issueNumber}</td>
          <td>
            <button
              className="btn btn-info"
              type="button"
              onClick={(e) => this.Edit(comic.id)}
            >
              Edit
            </button>
          </td>
          <td>
            <button
              className="btn btn-danger"
              type="button"
              onClick={(e) => this.Delete(comic.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      )
    }
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Title</th>
            <th>Series</th>
            <th>Publisher</th>
            <th>IssueNumber</th>
            <th>Edit</th>
            <th>Del</th>
          </tr>
        </thead>
        <tbody>
          {this.props.comics &&
            this.props.comics.map((comic) => {
              return this.EditDisplay(comic);
            })}
        </tbody>
      </table>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comics: [],
      id: "",
      title: "",
      series: "",
      publisher: "",
      issueNumber: "",
    };
    this.create = this.create.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    //get all entities - Get
    fetch(apiUrl, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((comicInfo) => {
        this.setState({
          comics: comicInfo,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  create(e) {
    // add entity - POST
    e.preventDefault();
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        title: this.state.title,
        series: this.state.series,
        publisher: this.state.publisher,
        issueNumber: this.state.issueNumber,
      }),
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

  handleChange(changeObject) {
    this.setState(changeObject);
  }

  render() {
    return (
      <div class="baseMargins">
        <div class="grid-container">
          <div class="Fom">
            <h1 className="display-4 text-center">Comic Database form</h1>
            <form className="d-flex flex-column">
              <legend className="text-center">Add-Update-Delete Comics</legend>
              <label htmlFor="title">
                Comic Title:
                <input
                  title="title"
                  id="title"
                  type="text"
                  className="form-control"
                  value={this.state.title}
                  onChange={(e) => this.handleChange({ title: e.target.value })}
                  required
                />
              </label>
              <label htmlFor="series">
                Comic series:
                <input
                  title="series"
                  id="series"
                  type="text"
                  className="form-control"
                  value={this.state.series}
                  onChange={(e) =>
                    this.handleChange({ series: e.target.value })
                  }
                  required
                />
              </label>
              <label htmlFor="publisher">
                Comic publisher:
                <input
                  title="publisher"
                  id="publisher"
                  type="text"
                  className="form-control"
                  value={this.state.publisher}
                  onChange={(e) =>
                    this.handleChange({ publisher: e.target.value })
                  }
                  required
                />
              </label>
              <label htmlFor="issueNumber">
                Comic issueNumber:
                <input
                  title="issueNumber"
                  id="issueNumber"
                  type="text"
                  className="form-control"
                  value={this.state.issueNumber}
                  onChange={(e) =>
                    this.handleChange({ issueNumber: e.target.value })
                  }
                  required
                />
              </label>
              <button
                className="btn  btn-primary"
                type="button"
                onClick={(e) => this.create(e)}
              >
                Add
              </button>
            </form>
          </div>
          <div class="Tabl">
            <Comics comics={this.state.comics} />
            <br/>
            <Table dataSource={this.state.comics} columns={columns} onChange={onChange} />;
          </div>
        </div>
      </div>
    );
  }
}


function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}


export default App;