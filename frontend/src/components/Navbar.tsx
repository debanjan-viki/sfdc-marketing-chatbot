import { FiEdit3 } from "react-icons/fi";

const Navbar = () => {
  const handleNewChat = () => {
    localStorage.removeItem("chat");
    window.location.reload();
  };

  return (
    <div className="navbar bg-base-100 w-full shadow-lg">
      <div className="flex-1">
        <a
          className="m-2 btn btn-ghost text-xl hover:shadow-lg hover:text-primary hover:scale-105 rounded-box transition-all duration-300"
          href="/"
        >
          SFDC Marketing Chatbot
        </a>
      </div>
      <div className="flex-none">
        <FiEdit3
          onClick={handleNewChat}
          className="m-2 p-3 btn btn-circle btn-ghost scale-105 transition-all duration-300 hover:text-primary hover:scale-125"
        />
      </div>
    </div>
  );
};

export default Navbar;
