const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 border-t border-orange-500 mt-10">
      <div className="max-w-4xl mx-auto text-center px-3">
        <p className="text-sm">
            Built with ❤️ by <span className="text-orange-500">Sai Pravin Bhagat</span>
        </p>

        <div className="flex justify-center gap-6 mt-3 text-sm">
          <a
            href="mailto:your.saibhagat2004@gmail.com"
            className="hover:text-orange-400 transition duration-200"
          >
            📧 Email
          </a>
          <a
            href="https://www.linkedin.com/in/saibhagat/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-400 transition duration-200"
          >
            🔗 LinkedIn
          </a>
          <a
            href="https://github.com/saibhagat2004"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-400 transition duration-200"
          >
            💻 GitHub
          </a>
        </div>

        <p className="text-gray-500 mt-4 text-xs">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
