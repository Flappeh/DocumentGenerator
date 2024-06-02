import { NavLink } from 'react-router-dom'
import home from '../assets/icons/home.png'
import edit from '../assets/icons/edit.png'
import history from '../assets/icons/history.png'
export default function Sidebar(): JSX.Element {
  return (
    <aside className="min-h-full w-[4rem] flex flex-col items-center gap-7 p-4 bg-gray-800">
      <section>
        <NavLink to="/">
          <img src={home} alt="" className="w-full h-full invert hover:scale-110 transition-all" />
        </NavLink>
      </section>
      <section>
        <NavLink to="/formfield">
          <img src={edit} alt="" className="w-full h-full invert hover:scale-110 transition-all" />
        </NavLink>
      </section>
      <section>
        <NavLink to="/history">
          <img
            src={history}
            alt=""
            className="w-full h-full invert hover:scale-110 transition-all"
          />
        </NavLink>
      </section>
    </aside>
  )
}
