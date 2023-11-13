import Nav from "./Nav";
import { useState } from "react";
import Logo from "./Logo";
import { AiOutlineMenu } from "react-icons/ai";

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="bg-white min-h-screen ">
      <div className="block md:hidden flex items-center justify-center p-4">
        <button onClick={() => setShowNav(true)}>
          <AiOutlineMenu />
        </button>

        <div className="flex grow justify-center mr-8">
          <Logo />
        </div>
      </div>

      <div className="flex">
        <Nav show={showNav} />
        <div className="flex-grow p-5">{children}</div>
      </div>
    </div>
  );
}
