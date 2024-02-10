import { Link } from 'react-router-dom'

const Nav = () => {

  const showNav = (nav) => {

    if (nav) {
      document.getElementById("nav").classList.remove("w-0")
      document.getElementById("nav").classList.add("w-[375px]")
      document.getElementById("navBlur").classList.remove("w-0")
      document.getElementById("navBlur").classList.add("w-full")
    } else {
      document.getElementById("nav").classList.remove("w-[375px]")
      document.getElementById("nav").classList.add("w-0")
      document.getElementById("navBlur").classList.remove("w-full")
      document.getElementById("navBlur").classList.add("w-0")
    }

  }

  return (

    <header className='w-full flex bg-[#6374ae] justify-center'>
      <section className='flex w-full justify-around items-center px-5 py-5 max-w-[1200px]'>
        <span className='cursor-pointer' onClick={async () => { showNav(true) }}>
          <svg width={"50px"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11C8.55228 11 9 11.4477 9 12Z" fill="#e7f0f8"></path> <path d="M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12Z" fill="#e7f0f8"></path> <path d="M17 12C17 12.5523 16.5523 13 16 13C15.4477 13 15 12.5523 15 12C15 11.4477 15.4477 11 16 11C16.5523 11 17 11.4477 17 12Z" fill="#e7f0f8"></path> <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#e7f0f8" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
        </span>
        <h1 className='text-2xl md:text-3xl w-[200px] sm:w-auto text-[#e7f0f8]'>Administrador de usuarios</h1>
      </section>
      <div onClick={() => { showNav(false) }} id='navBlur' className='fixed top-0 left-0 w-0 h-screen bg-primary-950 bg-opacity-60 transition-all duration-200 delay-[100ms] [backdrop-filter:_blur(2px)] z-10'></div>
      <div id='nav' className='bg-[#e7f0f8] h-screen fixed left-0 w-0 border-r-4 border-t-4 border-b-4 border-[#6374ae] transition-all duration-500 overflow-hidden z-10'>
        <span className='absolute right-5 top-6 cursor-pointer' onClick={() => { showNav(false) }} >
          <svg width={"45px"} viewBox="0 0 117 117" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <desc></desc> <defs></defs> <g fill="none" fillRule="evenodd" id="Page-1" stroke="none" strokeWidth="1"> <g fillRule="nonzero" id="cancel"> <path d="M58.5,116.6 C90.5,116.6 116.6,90.6 116.6,58.5 C116.6,26.4 90.5,0.4 58.5,0.4 C26.5,0.4 0.4,26.5 0.4,58.5 C0.4,90.5 26.5,116.6 58.5,116.6 Z M58.5,8.6 C86,8.6 108.4,31 108.4,58.5 C108.4,86 86,108.4 58.5,108.4 C31,108.4 8.6,86 8.6,58.5 C8.6,31 31,8.6 58.5,8.6 Z" fill="#6374ae" id="Shape"></path> <path d="M36.7,79.7 C37.5,80.5 38.5,80.9 39.6,80.9 C40.7,80.9 41.7,80.5 42.5,79.7 L58.5,63.7 L74.5,79.7 C75.3,80.5 76.3,80.9 77.4,80.9 C78.5,80.9 79.5,80.5 80.3,79.7 C81.9,78.1 81.9,75.5 80.3,73.9 L64.3,57.9 L80.3,41.9 C81.9,40.3 81.9,37.7 80.3,36.1 C78.7,34.5 76.1,34.5 74.5,36.1 L58.5,52.1 L42.5,36.1 C40.9,34.5 38.3,34.5 36.7,36.1 C35.1,37.7 35.1,40.3 36.7,41.9 L52.7,57.9 L36.7,73.9 C35.1,75.5 35.1,78.1 36.7,79.7 Z" fill="#6374ae" id="Shape"></path> </g> </g> </g></svg>
        </span>
        <ul className='pt-24 px-8 flex flex-col gap-7 text-[#6374ae] text-xl font-light'>
          <li onClick={() => { showNav(false) }} className=' h-[38px] text-ellipsis overflow-hidden cursor-pointer border border-transparent hover:border hover:border-[#6374ae] py-1 pl-3 transition-all duration-300 rounded-md w-full'><Link className='w-full' to={"/"}>Inicio</Link></li>
          <li onClick={() => { showNav(false) }} className=' h-[38px] text-ellipsis overflow-hidden cursor-pointer border border-transparent hover:border hover:border-[#6374ae] py-1 pl-3 transition-all duration-300 rounded-md'><Link className='w-full' to={"/add_user"}>Agregar usuario</Link></li>
          <li onClick={() => { showNav(false) }} className=' h-[38px] text-ellipsis overflow-hidden cursor-pointer border border-transparent hover:border hover:border-[#6374ae] py-1 pl-3 transition-all duration-300 rounded-md'><Link className='w-full' to={"/update_user/:"}>Modificar usuario</Link></li>
          <li onClick={() => { showNav(false) }} className=' h-[38px] text-ellipsis overflow-hidden cursor-pointer border border-transparent hover:border hover:border-[#6374ae] py-1 pl-3 transition-all duration-300 rounded-md'>Eliminar usuario</li>
        </ul>
      </div>
    </header>
  )
}

export default Nav