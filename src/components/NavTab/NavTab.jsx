import "./NavTab.css";

function NavTab() {
  return (
    <table className="navtab">
      <thead>
        <tr className="navtab__row">
          <th>
            <a href="/#about-project" className="navtab__link">
              О проекте
            </a>
          </th>
          <th>
            <a href="/#techs" className="navtab__link">
              Технологии
            </a>
          </th>
          <th>
            <a href="/#about-me" className="navtab__link">
              Студент
            </a>
          </th>
        </tr>
      </thead>
    </table>
  );
}

export default NavTab;
