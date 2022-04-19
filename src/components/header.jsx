import { useState, useEffect } from "react"

import menuOpen from '../assets/images/icon-menu.svg'
import menuClose from '../assets/images/icon-close-menu.svg'


const Header = () => {

    const [windowDimension, setWindowDimension] = useState()
    const [menuToggle, setMenuToggle] = useState(false)

    const detectSize = () => {
        setWindowDimension(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', detectSize)

        return () => {
            window.removeEventListener('resize', detectSize)
        }
    }, [windowDimension])


    if(window.outerWidth < 600){
        return(
            <>
                <div className="relative">
                    <div className="flex justify-between items-center lg:px-52 md:px-20 px-10 pt-10">
                        <div className="flex items-center font-bold">
                            <div className='text-3xl pt- pb-' id="">MightyUrl</div>
                        </div>
                        <div className="" onClick={() => setMenuToggle(!menuToggle)}>
                            <img src={!menuToggle ? menuOpen : menuClose} alt=''/>
                        </div>
                    </div>
                    {!menuToggle ? '' : 
                        <div className="absolute top-20  inset-x-0 text-white w-full px-5">
                            <div className="imagebg text-center rounded-xl">
                                <p className="pb-7 pt-10 font-bold">Features</p>
                                <p className="pb-7 font-bold">Pricing</p>
                                <p className="pb-7 font-bold">Resources</p>
                                <hr className="mx-5 pb-5 font-bold"></hr>
                                <button className="pb-5 font-bold">Login</button><br></br>
                                <div className="mx-5 pb-5 font-bold inset-x-0">
                                    <button className=" w-full py-2 bg-cyan-400 rounded-3xl">Sign Up</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </>
    
        ) 
    }

    return(
        <>
            <div>
                <div className="flex justify-between items-center lg:px-52 md:px-20 px-10 pt-10">
                    <div className="flex items-center font-bold">
                        <div className='text-3xl pt- pb-' id="">MightyUrl</div>
                        <div className="ml-10 text-slate-500 hover:text-black cursor-pointer">Features </div>
                        <div className="ml-10 text-slate-500 hover:text-black cursor-pointer">Pricing</div>
                        <div className="ml-10 text-slate-500 hover:text-black cursor-pointer">Resources</div>
                    </div>
                    <div className="flex">
                        <button className="p-1 mr-10 font-bold text-slate-500 hover:text-black">Login</button>
                        <button className="py-2 text-white px-5 seperator rounded-3xl font-bold hover:bg-cyan-200">Sign Up</button>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Header