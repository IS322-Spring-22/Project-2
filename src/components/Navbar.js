import React from 'react';

const Navbar = ({ setCurrentPage , currentPage }) => {

  const currentPageHandler = (e) => {
    switch(e.target.id){
      case 'home-0':
      case 'home-1':
        setCurrentPage('home');
        break;
      case 'add':
        setCurrentPage('add');
        break;
      case 'list':
        setCurrentPage('list');
        break;
    }
  }

  return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#" onClick={currentPageHandler} id={'home-0'}>ToDo List App</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#" onClick={currentPageHandler} id={'home-1'}>Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={currentPageHandler} id={'add'}>Add</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={currentPageHandler} id={'list'}>List View</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
