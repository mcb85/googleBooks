import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        Google Books Search
      </a>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="/">
              Search <span class="sr-only"></span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Saved">
              Saved
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
