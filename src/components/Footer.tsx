

const Footer = () => {
  return (
    <footer className="container mt-32 bg-white">
      <hr className="border-dashed border-2 border-grayPrimary"/>
      <div className="md:flex md:items-center md:justify-between mt-14">
        <h1 className="text-center color-gray text-grayPrimary text-xl">BookStore Project</h1>
        <ul className="flex items-center justify-center gap-6 mt-10 relative md:-top-4">
          <li className="border-grayPrimary hover:bg-orange bg-white relative border-2 w-14 h-14 flex items-center justify-center rounded-full">
            <a href="">
              <img src="./img/linkedin.svg" alt="" />
              <span className="block bg-blue p-7 absolute rounded-full top-1 left-1 -z-10"></span>
            </a>
          </li>
          <li className="border-grayPrimary hover:bg-orange bg-white relative border-2 w-14 h-14 flex items-center justify-center rounded-full">
            <a href="">
              <img src="./img/github.svg" alt="" />
              <span className="block bg-blue p-7 absolute rounded-full top-1 left-1 -z-10"></span>
            </a>
          </li>
        </ul>
        <p className="md:mt-0 text-center text-xl text-grayPrimary mt-10">design by eduarda mirelly</p>
      </div>
    </footer>
  )
}

export default Footer