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
      className={`fixed-top ${scrolled ? " bg-opacity-75 shadow-sm" : "bg-transparent"}`}
      style={{
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        transition: "all 0.3s ease",
        zIndex: 1000,
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <Container>
        <nav className="navbar navbar-expand-md  px-2">
          {/* Logo */}
          <Link className="navbar-brand" to="/" onClick={() => setMenuOpen(false)}>
            <Logo width="50px" />
          </Link>

          {/* Toggler */}
          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            <i
              className={`bi ${menuOpen ? "bi-x-lg" : "bi-list"} text-white`}
              style={{ fontSize: "1.5rem" }}
            ></i>
          </button>

          {/* Nav items */}
          <div
            className={`navbar-collapse ${menuOpen ? "d-block" : "d-none"} d-md-flex justify-content-end`}
          >
            <ul className="navbar-nav flex-column flex-md-row align-items-start align-items-md-center gap-2 gap-md-3">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li className="nav-item" key={item.name}>
                      <button
                        className="btn nav-btn btn-gradient text-white fw-semibold px-3 py-2 w-100 w-md-auto"
                        onClick={() => {
                          navigate(item.slug);
                          setMenuOpen(false);
                        }}
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              {authStatus && (
                <li className="nav-item">
                  <LogoutBtn onClick={() => setMenuOpen(false)} />
                </li>
              )}
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;





