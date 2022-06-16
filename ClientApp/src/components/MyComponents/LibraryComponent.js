import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';

const LibraryComponent = props => {
    const [searchLibraryInput, setSearchLibraryInput] = useState('');
    const [newLibraryInput, setNewLibraryInput] = useState({});
    const [libraryInput, setLibraryInput] = useState([]);
    const [alertLibraryCreated, setAlertLibraryCreated] = useState(false);
    const [alertError, setAlertError] = useState(false);
    const [alertErrorMessage, setAlertErrorMessage] = useState('');

    const handleSearchLibraryInput = input => setSearchLibraryInput(input.target.value);
    const handleNewLibraryInput = input => {
        try {
            const { name, value } = input.target;
            let newLibrary = { ...newLibraryInput, [name]: value };
            setNewLibraryInput(newLibrary);
        }
        catch (error) {
            setAlertErrorMessage(error.message);
            setAlertError(true);
        }
    };
    const handleLibraryInput = (library, input) => {
        try {
            let newLibraries = [...libraryInput];
            const index = newLibraries.findIndex(item => item.name === library.name);
            const { name, value } = input.target;
            newLibraries[index] = { ...library, [name]: value };
            setLibraryInput(newLibraries);
        }
        catch (error) {
            setAlertErrorMessage(error.message);
            setAlertError(true);
        }
    };
    const handleEditStatus = (library, flag) => {
        try {
            let newLibraries = [...libraryInput];
            const index = newLibraries.findIndex(item => item.name === library.name);
            newLibraries[index].isEnabled = flag;
            setLibraryInput(newLibraries);
        }
        catch (error) {
            setAlertErrorMessage(error.message);
            setAlertError(true);
        }
    };

    useEffect(() => {
        axios.get("https://localhost:7063/api/Library/GetAll").then(response => {
            response.data.map(item => item.isEnabled = false);
            setLibraryInput(response.data);
        }).catch(error => {
            setAlertErrorMessage(error.message);
            setAlertError(true);
        });
    }, []);
    const searchLibraries = () => {
        const url = searchLibraryInput ? "https://localhost:7063/api/Library/Search?name=" + searchLibraryInput : "https://localhost:7063/api/Library/GetAll";
        axios.get(url).then(response => {
            response.data.map(item => item.isEnabled = false);
            setLibraryInput(response.data);
        }).catch(error => {
            setAlertErrorMessage(error.message);
            setAlertError(true);
        });
    };
    const createLibrary = () => {
        axios.post("https://localhost:7063/api/Library/Save", newLibraryInput).then(response => {
            let newLibraries = [...libraryInput];
            newLibraries.push(response.data);
            setLibraryInput(newLibraries);
            setNewLibraryInput({});
            setAlertLibraryCreated(true);
        }).catch(error => {
            setAlertErrorMessage(error.message);
            setAlertError(true);
        });
    };
    const updateLibrary = library => {
        axios.put("https://localhost:7063/api/Library/Update", library).then(response => {
            let newLibraries = [...libraryInput];
            const index = newLibraries.findIndex(item => item.name === library.name);
            newLibraries[index] = library;
            newLibraries[index].isEnabled = false;
            setLibraryInput(newLibraries);
        }).catch(error => {
            setAlertErrorMessage(error.message);
            setAlertError(true);
        });
    };
    const deleteLibrary = library => {
        axios.delete("https://localhost:7063/api/Library/Delete", { data: library }).then(response => {
            let newLibraries = [...libraryInput];
            const index = newLibraries.findIndex(item => item.name === library.name);
            newLibraries.splice(index, 1);
            setLibraryInput(newLibraries);
        }).catch(error => {
            setAlertErrorMessage(error.message);
            setAlertError(true);
        });
    };

    return (<>
        <h1>Libraries</h1>
        <div className="row">
            <div className="col-md-4">
                <div className="card border border-secondary shadow-0">
                    <div className="card-header bg-secondary text-white"><h4>Search Library</h4><span className="glyphicon glyphicon-search"></span></div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-7">
                                <label className="form-label">Name</label>
                                <input className="form-control" placeholder="Enter name" name="name" type="text" value={searchLibraryInput} onChange={handleSearchLibraryInput.bind(this)} />
                            </div>
                            <div className="col-md-5">
                                <label className="form-label">&nbsp;</label>
                                <button type="button" className="btn btn-primary form-control" onClick={searchLibraries.bind(this)}>Search</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-8">
                <div className="card border border-secondary shadow-0">
                    <div className="card-header bg-secondary text-white"><h4>New Library</h4></div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-3">
                                <label className="form-label">Name</label>
                                <input className="form-control" placeholder="Enter name" name="name" value={newLibraryInput.name} onChange={handleNewLibraryInput.bind(this)} type="text" />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Address</label>
                                <input className="form-control" placeholder="Enter address" name="address" value={newLibraryInput.address} onChange={handleNewLibraryInput.bind(this)} type="text" />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Telephone</label>
                                <input className="form-control" placeholder="Enter telephone" name="telephone" value={newLibraryInput.telephone} onChange={handleNewLibraryInput.bind(this)} type="text" />
                            </div>
                            <div className="col-md-2">
                                <label className="form-label">&nbsp;</label>
                                <button type="button" className="btn btn-success from-control" onClick={createLibrary.bind(this)}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
                <div className="card border border-secondary shadow-0">
                    <div className="card-header bg-secondary text-white"><h4>Display Libraries</h4></div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-3">
                                <label className="form-label">Name</label>
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Address</label>
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Telephone</label>
                            </div>
                        </div>
                        {libraryInput.map(item =>
                            <div className="row" key={item.name}>
                                <div className="col-md-3"><input className="form-control" value={item.name} onChange={handleLibraryInput.bind(this, item)} name="name" disabled={!item.isEnabled} /></div>
                                <div className="col-md-3"><input className="form-control" value={item.address} onChange={handleLibraryInput.bind(this, item)} name="address" disabled={!item.isEnabled} /></div>
                                <div className="col-md-3"><input className="form-control" value={item.telephone} onChange={handleLibraryInput.bind(this, item)} name="telephone" disabled={!item.isEnabled} /></div>
                                <div className="col-md-3">
                                    <div className="btn-toolbar">
                                        <button type="button" className="btn btn-info mr-2" onClick={handleEditStatus.bind(this, item, true)} style={{display: item.isEnabled ? 'none' : 'block'}}>Edit</button>
                                        <button type="button" className="btn btn-warning mr-2" onClick={handleEditStatus.bind(this, item, false)} style={{display: item.isEnabled ? 'block' : 'none'}}>Cancel</button>
                                        <button type="button" className="btn btn-success mr-2" onClick={updateLibrary.bind(this, item)} style={{display: item.isEnabled ? 'block' : 'none'}}>Save</button>
                                        <button type="button" className="btn btn-danger mr-2" onClick={deleteLibrary.bind(this, item)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        {alertLibraryCreated && <SweetAlert success confirmBtnText="Ok" confirmBtnBsStyle="success" title="Item successfully added!" onConfirm={() => setAlertLibraryCreated(false)}>Please click Ok to close</SweetAlert>}
        {alertError && <SweetAlert danger confirmBtnText="Ok" confirmBtnBsStyle="danger" title="Something wrong happened..." onConfirm={() => setAlertLibraryCreated(false)}>{alertErrorMessage}</SweetAlert>}
    </>);
}
export default LibraryComponent;