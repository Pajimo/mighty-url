import facebook from '../assets/images/icon-facebook.svg'
import instagram from '../assets/images/icon-instagram.svg'
import pinterest from '../assets/images/icon-pinterest.svg'
import twitter from '../assets/images/icon-twitter.svg'
import logo from '../assets/images/logo.svg'


const Footer = () =>{
    return (
        <>
            <div className='md:flex md:flex-row justify-between bg-black text-white lg:px-52 md:px-20 px-10 py-20'>
                <div className='text-center'>
                    <p className='text-3xl font-bold'>MightyUrl</p>
                </div>
                <div className='md:flex text-center'>
                    <div className='mx-0 md:mx-10 md:mt-0 mt-10'>
                        <p className='font-bold text-lg'>Features</p>
                        <div className='flex flex-col mt-5 font-bold text-slate-400'>
                            <p className='hover:text-cyan-600 cursor-pointer mb-2'>Link Shortening</p>
                            <p className='hover:text-cyan-600 cursor-pointer mb-2'>Branded Links</p>
                            <p className='hover:text-cyan-600 cursor-pointer mb-2'>Analytics</p>
                        </div>
                    </div>
                    <div className='mx-0 md:mx-10'>
                        <p className='font-bold text-lg'>Resources</p>
                        <div className='flex flex-col mt-5 font-bold text-slate-400'>
                            <p className='hover:text-cyan-600 cursor-pointer mb-2'>Blog</p>
                            <p className='hover:text-cyan-600 cursor-pointer mb-2'>Developers</p>
                            <p className='hover:text-cyan-600 cursor-pointer mb-2'>Support</p>
                        </div>
                    </div>
                    <div className='ml-0 md:ml-10'>
                        <p className='font-bold text-lg'>Company</p>
                        <div className='flex flex-col mt-5 font-bold text-slate-400'>
                            <p className='hover:text-cyan-600 cursor-pointer mb-2'>About</p>
                            <p className='hover:text-cyan-600 cursor-pointer mb-2'>Our Team</p>
                            <p className='hover:text-cyan-600 cursor-pointer mb-2'>Careers</p>
                            <p className='hover:text-cyan-600 cursor-pointer mb-2'>Contact</p>
                            
                        </div>
                    </div>
                </div>
                <div>
                    <div className='flex justify-center  md:mt-0 mt-10'>
                        <img src={facebook} className='mx-2 cursor-pointer '/>
                        <img src={twitter} className='mx-2 cursor-pointer'/>
                        <img src={pinterest} className='mx-2 cursor-pointer'/>
                        <img src={instagram} className='ml-2 cursor-pointer'/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;
