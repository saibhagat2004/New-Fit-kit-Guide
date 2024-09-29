import Navbar from "../../components/common/NavBar";
function DashboardPage() {
  return (
    <>
        <Navbar />
    <div className="bg-zinc-950 min-h-screen text-gray-200 h-screen">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <div className="col-span-4 sm:col-span-3">
            <div className="bg-gray-800 shadow rounded-lg p-6">
              <div className="flex flex-col items-center">
                <img
                  src="https://randomuser.me/api/portraits/men/94.jpg"
                  className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                  alt="Profile Picture"
                />
                <h1 className="text-xl font-bold">John Doe</h1>
                <p className="text-gray-700">Software Developer</p>
                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                  <a
                    href="#"
                    className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded"
                  >
                    Contact
                  </a>
                  <a
                    href="#"
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded"
                  >
                    Resume
                  </a>
                </div>
              </div>
              <hr className="my-6 border-t border-gray-300" />
              <div className="flex flex-col">
                <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                  Skills
                </span>
                <ul>
                  <li className="mb-2">JavaScript</li>
                  <li className="mb-2">React</li>
                  <li className="mb-2">Node.js</li>
                  <li className="mb-2">HTML/CSS</li>
                  <li className="mb-2">Tailwind Css</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-span-4 sm:col-span-9">
            <div className="bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">About Me</h2>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est
                vitae tortor ullamcorper, ut vestibulum velit convallis. Aenean posuere risus
                non velit egestas suscipit. Nunc finibus vel ante id euismod. Vestibulum ante
                ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
                Aliquam erat volutpat. Nulla vulputate pharetra tellus, in luctus risus
                rhoncus id.
              </p>

              <h3 className="font-semibold text-center mt-3 -mb-2">
                Find me on
              </h3>
              <div className="flex justify-center items-center gap-6 my-6">
                <a
                  href=""
                  target="_blank"
                  aria-label="Visit TrendyMinds LinkedIn"
                  className="text-gray-700 hover:text-orange-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="h-6"
                  >
                    {/* LinkedIn icon */}
                  </svg>
                </a>
                <a
                  href=""
                  target="_blank"
                  aria-label="Visit TrendyMinds YouTube"
                  className="text-gray-700 hover:text-orange-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    className="h-6"
                  >
                    {/* YouTube icon */}
                  </svg>
                </a>
                <a
                  href=""
                  target="_blank"
                  aria-label="Visit TrendyMinds Facebook"
                  className="text-gray-700 hover:text-orange-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                    className="h-6"
                  >
                    {/* Facebook icon */}
                  </svg>
                </a>
                <a
                  href=""
                  target="_blank"
                  aria-label="Visit TrendyMinds Instagram"
                  className="text-gray-700 hover:text-orange-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="h- 6"
                  >
                    {/* Instagram icon */}
                  </svg>
                </a>
                <a
                  href=""
                  target="_blank"
                  aria-label="Visit TrendyMinds Twitter"
                  className="text-gray-700 hover:text-orange-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="h-6"
                  >
                    {/* Twitter icon */}
                  </svg>
                </a>
              </div>

              <h2 className="text-xl font-bold mt-6 mb-4">Experience</h2>
              <div className="mb-6">
                <div className="flex justify-between flex-wrap gap-2 w-full">
                  <span className="text-gray-700 font-bold">Web Developer</span>
                  <p>
                    <span className="text-gray-700 mr-2">at ABC Company</span>
                    <span className="text-gray-700">2017 - 2019</span>
                  </p>
                </div>
                <p className="mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus
                  est vitae tortor ullamcorper, ut vestibulum velit convallis. Aenean
                  posuere risus non velit egestas suscipit.
                </p>
              </div>
              <div className="mb-6">
                <div className="flex justify-between flex-wrap gap-2 w-full">
                  <span className="text-gray-700 font-bold">Web Developer</span>
                  <p>
                    <span className="text-gray-700 mr-2">at ABC Company</span>
                    <span className="text-gray-700">2017 - 2019</span>
                  </p>
                </div>
                <p className="mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus
                  est vitae tortor ullamcorper, ut vestibulum velit convallis. Aenean
                  posuere risus non velit egestas suscipit.
                </p>
              </div>
              <div className="mb-6">
                <div className="flex justify-between flex-wrap gap-2 w-full">
                  <span className="text-gray-700 font-bold">Web Developer</span>
                  <p>
                    <span className="text-gray-700 mr-2">at ABC Company</span>
                    <span className="text-gray-700">2017 - 2019</span>
                  </p>
                </div>
                <p className="mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus
                  est vitae tortor ullamcorper, ut vestibulum velit convallis. Aenean
                  posuere risus non velit egestas suscipit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
}

export default DashboardPage;