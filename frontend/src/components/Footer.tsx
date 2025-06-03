const Footer = () => {
  return (
    <>
      <footer className="absolute bottom-0 footer footer-center text-gray-400 text-xs p-1 md:p-2 md:text-md">
        <aside>
          <a href="https://viki.ai" target="_blank">
            &copy; {new Date().getFullYear()} - A product from{" "}
            <b className="mx-1">Viki.ai Pvt. Ltd.</b>
          </a>
        </aside>
      </footer>
    </>
  );
};

export default Footer;
