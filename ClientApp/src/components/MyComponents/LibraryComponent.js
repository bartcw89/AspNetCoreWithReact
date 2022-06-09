import React, { useState } from 'react';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';

const LibraryComponent = props => {
    const [libraryList, setLibraryList] = useState([
        { id: 1, name: 'Library 1', address: 'Address 1', telephone: 123456789 },
        { id: 1, name: 'Library 2', address: 'Address 2', telephone: 123456789 }
    ]);

    const [searchParameterName, setSearchParameterName] = useState('');
    const handleInputChange = event => setSearchParameterName(event.target.value);
    const searchItems = () => {
        let url = searchParameterName != "" ? ("https://localhost:7063/api/Library/Search?name=" + searchParameterName) : "https://localhost:7063/api/Library/GetAll";
        axios.get(url).then(response => {
            response.data.map(item => item.isEditing = false);
            setLibraryList(response.data);
        }).catch(error => {
            setAlertErrorMessage(error.message);
            setShowAlertError(true);
        });
    };

    const handleLibraryInputChange = (library, input) => {
        let newLibraryList = [...libraryList];
        const index = newLibraryList.findIndex(item => item.name == library.name);
        const { name, value } = input.target;
        newLibraryList[index] = { ...library, [name]: value };
        setLibraryList(newLibraryList);
    };
    const updateEditingStatus = (library, flag) => {
        try {
            let newLibraryList = [...libraryList];
            const index = newLibraryList.findIndex(item => item.name == library.name);
            newLibraryList[index].isEditing = flag;
            setLibraryList(newLibraryList);
        }
        catch (error) {
            setAlertErrorMessage(error.message);
            setShowAlertError(true);
        }
    };
    const confirmUpdate = library => {
        axios.put("https://localhost:7063/api/Library/Update", library).then(response => {
            let newLibraryList = [...libraryList];
            const index = newLibraryList.findIndex(item => item.name == library.name);
            newLibraryList[index] = library;
            newLibraryList[index].isEditing = false;
            setLibraryList(newLibraryList);
        }).catch(error => {
            setAlertErrorMessage(error.message);
            setShowAlertError(true);
        });
    };

    const [library, setLibrary] = useState({ name: '', address: '', telephone: '' });
    const handleNewLibraryInputChange = input => {
        const { name, value } = input.target;
        let newLibrary = { ...library, [name]: value };
        setLibrary(newLibrary);
    };
    const confirmNewLibrary = () => {
        axios.post("https://localhost:7063/api/Library/Save", library).then(response => {
            let newLibraryList = [...libraryList];
            newLibraryList.push(response.data);
            setLibraryList(newLibraryList);
            setLibrary({ name: '', address: '', telephone: '' });
            setShowAlertNewLibrary(true);
        }).catch(error => {
            setAlertErrorMessage(error.message);
            setShowAlertError(true);
        });
    };

    const deleteLibrary = library => {
        axios.delete("https://localhost:7063/api/Library/Delete", { data: library }).then(response => {
            let newLibraryList = [...libraryList];
            const index = newLibraryList.findIndex(item => item.name == library.name);
            newLibraryList.splice(index, 1);
            setLibraryList(newLibraryList);
        }).catch(error => {
            setAlertErrorMessage(error.message);
            setShowAlertError(true);
        });
    };

    const [showAlertNewLibrary, setShowAlertNewLibrary] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);
    const [alertErrorMessage, setAlertErrorMessage] = useState('');

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
                                <input className="form-control" placeholder="Enter name" name="name" value={library.name} onChange={handleNewLibraryInputChange.bind(this)} type="text" />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Address</label>
                                <input className="form-control" placeholder="Enter address" name="address" value={library.address} onChange={handleNewLibraryInputChange.bind(this)} type="text" />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Telephone</label>
                                <input className="form-control" placeholder="Enter telephone" name="telephone" value={library.telephone} onChange={handleNewLibraryInputChange.bind(this)} type="text" />
                            </div>
                            <div className="col-md-2">
                                <label className="form-label">&nbsp;</label>
                                <button type="button" className="btn btn-success from-control" onClick={confirmNewLibrary.bind(this)}>Save</button>
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
                                    <td><input className="form-control" value={item.name} onChange={handleLibraryInputChange.bind(this, item)} name="name" disabled={!item.isEditing} /></td>
                                    <td><input className="form-control" value={item.address} onChange={handleLibraryInputChange.bind(this, item)} name="address" disabled={!item.isEditing} /></td>
                                    <td><input className="form-control" value={item.telephone} onChange={handleLibraryInputChange.bind(this, item)} name="telephone" disabled={!item.isEditing} /></td>
                                    <td>
                                        <div className="btn-toolbar">
                                            <button type="button" className="btn btn-info mr-2" onClick={updateEditingStatus.bind(this, item, true)} style={{display: item.isEditing ? 'none' : 'block'}}>Edit</button>
                                            <button type="button" className="btn btn-warning mr-2" onClick={updateEditingStatus.bind(this, item, false)} style={{ display: item.isEditing ? 'block' : 'none' }}>Cancel</button>
                                            <button type="button" className="btn btn-success mr-2" onClick={confirmUpdate.bind(this, item)} style={{ display: item.isEditing ? 'block' : 'none' }}>Save</button>
                                            <button type="button" className="btn btn-danger mr-2" onClick={deleteLibrary.bind(this, item)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        {/* ALERT LIBRARY ADDED */}
        {showAlertNewLibrary && <SweetAlert success confirmBtnText="Ok" confirmBtnBsStyle="success" title="Item successfully added!" onConfirm={() => setShowAlertNewLibrary(false)}>Please click Ok to close</SweetAlert>}
        {/* ALERT ERROR */}
        {showAlertError && <SweetAlert danger confirmBtnText="Ok" confirmBtnBsStyle="success" title="Something wrong happened..." onConfirm={() => setShowAlertNewLibrary(false)}>{alertErrorMessage}</SweetAlert>}
    </>);
}
export default LibraryComponent;