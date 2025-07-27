 import React, { useState, useEffect } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header
      className={`fixed-top  ${
        scrolled ? "bg-dark bg-opacity-75 shadow-sm" : "bg-transparent"
      }`}
      style={{
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        transition: "all 0.3s ease",
        zIndex: 1000,
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <Container>
        <nav className="d-flex align-items-center justify-content-between position-relative">
          {/* Logo */}
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <Logo width="50px" />
          </Link>

          {/* Hamburger toggler - only on small screens */}
          <button
            className="btn w-100 my-2 btn-link text-light d-md-none"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <i
              className={
                menuOpen ? "bi bi-x-lg" : "bi bi-list"
              }
              style={{ fontSize: "1.5rem" }}
            />
          </button>

          {/* Nav items */}
          <ul
  className={`list-unstyled m-0 align-items-center gap-3 
    ${menuOpen ? "d-flex" : "d-none"} 
    d-md-flex flex-column flex-md-row 
    bg-dark bg-opacity-75 p-3 p-md-0 rounded`}
  style={{
    position: menuOpen ? "absolute" : "static",
    top: menuOpen ? "100%" : "auto",
    right: menuOpen ? 0 : "auto",
    width: menuOpen ? "100%" : "auto", 
    zIndex: 999,
  }}
>
  {navItems.map((item) =>
    item.active ? (
      <li key={item.name}>
        <button
          onClick={() => {
            navigate(item.slug);
            setMenuOpen(false);
          }}
          className="btn btn-gradient px-4 py-2 fs-6 w-100 text-start text-md-center"
        >
          {item.name}
        </button>
      </li>
    ) : null
  )}
  {authStatus && (
    <li>
      <LogoutBtn onClick={() => setMenuOpen(false)} />
    </li>
  )}
</ul>

        </nav>
      </Container>
    </header>
  );
}

export default Header;
