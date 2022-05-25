import React, { useState } from 'react';
import axios from 'axios';

const LibraryComponent = props => {
    const [libraryList, setLibraryList] = useState([
        { id: 1, name: 'Library 1', address: 'Address 1', telephone: 123456789 },
        { id: 1, name: 'Library 2', address: 'Address 2', telephone: 123456789 }
    ]);

    const [searchParameterName, setSearchParameterName] = useState('');
    const handleInputChange = event => setSearchParameterName(event.target.value);
    const searchItems = () => {
        let url = searchParameterName != "" ? ("https://localhost:7063/api/Library/Search?name=" + searchParameterName) : "https://localhost:7063/api/Library/GetAll";
        axios.get(url).then(response => setLibraryList(response.data));
    };

    return (<>
        <hr />
        <h2>Library</h2>
        <br />
        <div className="row">
            {/* SEARCH LIBRARY */}
            <div className="col-md-4">
                <div className="card border border-secondary shadow-0">
                    <div className="card-header bg-secondary text-white"><strong>Search</strong> Library<span className="glyphicon glyphicon-search"></span></div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-7">
                                <label className="form-label">Name</label>
                                <input className="form-control" placeholder="Enter name" name="name" type="text" value={searchParameterName} onChange={handleInputChange} />
                            </div>
                            <div className="col-md-5">
                                <label className="form-label">&nbsp;</label>
                                <button type="button" className="btn btn-primary form-control" onClick={searchItems.bind(this)}>Search</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* NEW LIBRARY */}
            <div className="col-md-8">
                <div className="card border border-secondary shadow-0">
                    <div className="card-header bg-secondary text-white"><strong>New</strong> Library</div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-3">
                                <label className="form-label">Name</label>
                                <input className="form-control" placeholder="Enter name" name="name" type="text" />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Address</label>
                                <input className="form-control" placeholder="Enter address" name="address" type="text" />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Telephone</label>
                                <input className="form-control" placeholder="Enter telephone" name="telephone" type="text" />
                            </div>
                            <div className="col-md-2">
                                <label className="form-label">&nbsp;</label>
                                <button type="button" className="btn btn-success from-control">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            {/* DISPLAY LIBRARIES */}
            <div className="card border border-secondary shadow-0">
                <div className="card-header bg-secondary text-white"><strong>Display</strong> Libraries</div>
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Telephone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {libraryList.map(item =>
                                <tr key={item.name}>
                                    <td>{item.name}</td>
                                    <td>{item.address}</td>
                                    <td>{item.telephone}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>);
}
export default LibraryComponent;