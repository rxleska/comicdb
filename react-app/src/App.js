import React from 'react';
//import logo from './logo.svg';
import './App.css';

const apiUrl = "http://localhost:44343/api/Comic";

class Comics extends React.Component {
  render(){
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Series</th>
            <th>Publisher</th>
            <th>IssueNumber</th>
          </tr>
        </thead>
        <tbody>
          {this.props.comics && this.props.comics.map(comic => {
            return <tr>
              <td>{comic.id}</td>
              <td>{comic.title}</td>
              <td>{comic.series}</td>
              <td>{comic.publisher}</td>
              <td>{comic.issueNumber}</td>
            </tr>
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
      id: '',
      title: '',
      series: '',
      publisher: '',
      issueNumber: ''
    };
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    //get all entities - Get
    fetch(apiUrl, {
      "method": "GET", 
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      }
    })
    .then(res => res.json())
    .then(comicInfo => {
      this.setState({
        comics: comicInfo
      })
    })
    .catch(err => { console.log(err); 
    });
  }

  create(e) {
    // add entity - POST
    e.preventDefault();
    fetch(apiUrl, {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify({
        title: this.state.title,
        series: this.state.series,
        publisher: this.state.publisher,
        issueNumber: this.state.issueNumber
      })
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
    })
    .catch(err => {
      console.log(err);
    }).then(()=>{
      window.location.reload()
    });
  }

  update(e) {
    // update entity - PUT
    e.preventDefault();
    fetch(apiUrl, {
      "method": "PUT",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify({
        _id: this.state.id,
        title: this.state.title,
        series: this.state.series,
        publisher: this.state.publisher,
        issueNumber: this.state.issueNumber
      })
    })
    .then(response => response.json())
    .then(response => { console.log(response);
    })
    .catch(err => { console.log(err); }).then(()=>{
      window.location.reload()
    });
  }

  delete(e) {
    // delete entity - DELETE
    e.preventDefault();
    fetch(`${apiUrl}/${this.state.id}`, {
      "method": "DELETE"//,
      // "headers": {
      // }
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    }).then(()=>{
      window.location.reload()
    });
  }

  handleChange(changeObject) {
    this.setState(changeObject)
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
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
                    onChange={(e) => this.handleChange({ title: e.target.value})}
                    required/>
                </label>
                <label htmlFor="series">
                  Comic series:
                  <input
                    title="series"
                    id="series"
                    type="text"
                    className="form-control"
                    value={this.state.series}
                    onChange={(e) => this.handleChange({ series: e.target.value})}
                    required/>
                </label>
                <label htmlFor="publisher">
                  Comic publisher:
                  <input
                    title="publisher"
                    id="publisher"
                    type="text"
                    className="form-control"
                    value={this.state.publisher}
                    onChange={(e) => this.handleChange({ publisher: e.target.value})}
                    required/>
                </label>
                <label htmlFor="issueNumber">
                  Comic issueNumber:
                  <input
                    title="issueNumber"
                    id="issueNumber"
                    type="text"
                    className="form-control"
                    value={this.state.issueNumber}
                    onChange={(e) => this.handleChange({ issueNumber: e.target.value})}
                    required/>
                </label>
                <label htmlFor="id">
                  Comic ID:
                  <input
                    name="id"
                    id="id"
                    type="text"
                    className="form-control"
                    value={this.state.id}
                    onChange={(e) => this.handleChange({ id: e.target.value })}
                    />
                </label>
                <button className="btn btn-primary" type='button' onClick={(e) => this.create(e)}>
                  Add
                </button>
                <button className="btn btn-info" type='button' onClick={(e) => this.update(e)}>
                    Update
                </button>
                <button className="btn btn-danger" type='button' onClick={(e) => this.delete(e)}>
                    Delete
                </button>
              </form>
              <Comics comics={this.state.comics}/>
          </div>
        </div>
      </div>
    )
  }

}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }


export default App;
