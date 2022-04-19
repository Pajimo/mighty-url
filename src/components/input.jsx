import { useEffect, useState, useRef } from "react"
import Bit from "./bitly"
import { AiFillDelete, AiFillCopy } from "react-icons/ai";
import {GiAqueduct} from "react-icons/gi";
import Header from "./header";
import illustration from '../assets/images/illustration-working.svg'
import brand from '../assets/images/icon-brand-recognition.svg'
import detailed from '../assets/images/icon-detailed-records.svg'
import customize from '../assets/images/icon-fully-customizable.svg'
import shortenMobile from '../assets/images/bg-Shorten-mobile.svg'
import shortenDesktop from '../assets/images/bg-Shorten-desktop.svg'
import boostMobile from '../assets/images/bg-boost-mobile.svg'
import boostDesktop from '../assets/images/bg-boost-desktop.svg'
import Footer from "./footer";



const Input = () =>{

    const urlTextBar = useRef()
    const alertValue = useRef()

    const url = 'https://api.rebrandly.com/v1/links'
    const apiKey = '52aa4a3949914f999ca0ee55e7957896'
    const [urlValue, setUrl] = useState('')
    const [shortUrl, setShortUrl] = useState({})
    const [urlTrue, setUrlTrue] = useState(false)
    const [storage, setStorage]= useState([])
    const [urlType, setUrlType] = useState('')
    const [rebrandlyCheckbok, setRebrandyCheckbox] = useState(true)
    const [bitlyCheckbox, setBitlyCheckbox] = useState(false)
    const [bitcheckbox, bitsetCheckbox] = useState(false)
    const [windowDimension, setWindowDimension] = useState()
  
    useEffect(() =>{
        const store = JSON.parse(localStorage.getItem('URL'))
        if(store){
            setStorage(store)
        }
    }, [])


    useEffect(() => {
        localStorage.setItem('URL', JSON.stringify(storage));
    }, [storage]);


    // Using httpRequest to call the rebrandly api
    const getRebrandlyUrl = () =>{
        localStorage.setItem('Long Url', urlValue)
        const data = JSON.stringify({destination: urlValue});
        const xhr = new XMLHttpRequest();

        xhr.responseType = 'json';
        xhr.onreadystatechange = () =>{
            if(xhr.readyState === XMLHttpRequest.DONE){
                setShortUrl(xhr.response)
                let newUrl = [xhr.response]
                setStorage([newUrl, ...storage])           
                
                if(xhr.status === 200){
                    setUrlTrue(true)
                }
                else if(xhr.status === 403){
                    setUrlTrue(false)
                }
            }
        }

        xhr.open('POST', url);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("apikey", apiKey);

        xhr.send(data);

    }

    // Submit button function
    const submitUrl = (e) => {
        e.preventDefault();
        if(!urlTextBar.current.value){
            urlTextBar.current.classList.add('border-2', 'border-red-400')
            alertValue.current.classList.remove('alertValue')
        }
        else{
            if (rebrandlyCheckbok && !bitlyCheckbox){
                setUrlType('Rebrandly')
                getRebrandlyUrl()
                urlTextBar.current.classList.remove('border-2', 'border-red-400')
                alertValue.current.classList.add('alertValue')
            }else if(!rebrandlyCheckbok && bitlyCheckbox){
                setUrlType('Bit.ly')
                bitsetCheckbox(true)
                urlTextBar.current.classList.remove('border-2', 'border-red-400')
                alertValue.current.classList.add('alertValue')
            }else{
                console.log('Error')
            }
        }

    }



    // Deleting individual links using ID from the storage by clicking the delete button or icon
    const removeLink = (id) =>{
        for(let i = 0; i < storage.length; i++){
            if(storage[i][0].id === id){
                // Using splice because the remove property of the local storage only affects the key and that will remove the entire storage
                // but with splice, I will remove the value in the storage and then re add the remaining items by calling setItems with local storage.
                storage.splice(storage[i][0], 1)
                localStorage.setItem('URL', JSON.stringify(storage));
                }
        } 
    }

    //Copy and adding the shortened link of clicked ID to the clipboard 
    const copyShortUrl = async(id) =>{
        for(let i = 0; i < storage.length; i++){
            // To select the link for rebrandly 
            if(storage[i][0].id === id && storage[i][0].shortUrl){
                await navigator.clipboard.writeText(storage[i][0].shortUrl);

            }
            // to select the links for bit.ly
            else if(storage[i][0].id === id && storage[i][0].link){
                await navigator.clipboard.writeText(storage[i][0].link); 
            }
        }
    }
//date format from json format in the apis to readable format on the website
    const createdDate = (date) =>{
        let currentDate = date.split('',10)
        currentDate = currentDate.join('')
        return currentDate;
    }
    
    //Time format from json format in the apis to readable format on the website
    const createdTime = (time) =>{
        let currentTime = time.split('', 19)
        currentTime = currentTime.splice(11, 5)
        currentTime = currentTime.join('')
        return currentTime;
    }

    const detectSize = () => {
        setWindowDimension(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', detectSize)

        return () => {
            window.removeEventListener('resize', detectSize)
        }
    }, [windowDimension])
    

    return(
        <div className="">
            <div className="h-screen mb-24">
                <Header />
                <div className="md:flex mt-20 lg:pl-52 md:pl-20 pl-5 items-center">
                    <div className=" object-left overflow-hidden">
                        <img src={illustration} alt='' className=" w-full"/>
                    </div>
                    <div className="basis-1/2 md:order-first">
                        {window.innerWidth > 900 ?
                            <div className="text-7xl font-bold ">
                                <p>More than just shorter links</p>
                            </div>
                            :
                            <div className="text-5xl font-bold mt-14 text-center pr-5">
                                <p>More than just shorter links</p>
                            </div>
                        }
                        <div className="font-bold text-2xl mt-3 text-slate-400 pr-5">
                            <p> Build your brand’s recognition and get detailed insights 
                                on how your links are performing.
                            </p>
                        </div>
                        <div className="mt-7 flex justify-center pr-5 md:justify-start">
                            <button className="py-3 px-10 seperator rounded-3xl text-2xl text-white font-bold hover:bg-cyan-200">Get Started</button>
                        </div>
                    </div>
                
                </div>
            </div>
            
            <div className="lg:px-52 md:px-20 px-10 relative pt-52 md:pt-20">
                <div className="inset-x-0 absolute -bottom-20">
                    <form onSubmit={submitUrl} className="lg:mx-52 md:mx-20 mx-10 py-12 lg:py-7 relative imagebg rounded-xl">
                        <img src={window.innerWidth > 900 ? shortenDesktop : shortenMobile} className='w-full rounded-xl' />
                        <p className="text-red-400 px-5 alertValue top-3 absolute" ref={alertValue}>Please add a link</p>
                        <div className="absolute inset-x-0 top-0 md:px-20 px-2 py-7">
                            <div className=" flex flex-col md:flex-row py-3">
                                <input ref={urlTextBar} className="w-full border-2 h-14 pl-5 rounded-lg pr-5 mb- md:mr-7" type='url'  placeholder = 'Shorten a link here....' value={urlValue} onChange={(e) =>{
                                    setUrl(e.target.value)
                                }}/>

                                <div className="md:mt-0 mt-5">
                                    <button className=' px-10 text-lg font-bold py-3 rounded-lg text-white seperator w-full hover:bg-cyan-200'>Shorten!</button><br></br>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <p className="text-stone-300 text-xl mr-10">Choose Domain</p>
                                <div className="flex-row mt-2 items-center">
                                    <label htmlFor="rebrandlyCheckbox" className="text-stone-300 text-lg mr-2">Rebrand.ly</label>
                                    <input className="mr-5" type='checkbox' name="rebrandlyCheckbok" id="rebrandlyCheckbok" value='Rebrandly' checked={rebrandlyCheckbok} onChange={() => {
                                        setRebrandyCheckbox(true)
                                        setBitlyCheckbox(false)
                                    }}/></div>
                                <div className="flex-row mt-2">
                                    <label htmlFor="bitlyCheckbox" className="text-stone-300 text-lg mr-2">Bit.ly</label>
                                    <input className="mr-2" type='checkbox' value='Bit.ly' name="bitlyCheckbok" id="bitlyCheckbok" checked={bitlyCheckbox} onChange={() => {
                                        setBitlyCheckbox(true)
                                        setRebrandyCheckbox(false)
                                    }}/>
                                </div>
                            </div>  
                        </div>
                                        
                    </form>
                </div>
            </div>
            <div className="lg:px-52 md:px-20 px-10 bg-gray-200 pb-16 pt-24">
                <h2>{bitcheckbox ? <Bit bitsetCheckbox={bitsetCheckbox} bitcheckbox={bitcheckbox} 
                    urlValue={urlValue} storage={storage} setStorage={setStorage} setShortUrl={setShortUrl}/> 
                    : 
                    (storage.map((urls) => {
                    const {id, destination, shortUrl, createdAt, domainName,long_url} = urls[0]
                    return (<div key={id}>
                        </div>)
                    }))}
                </h2>
                    <h2 className="mb:pb-36 pb-14">
                        {/* <div className=" py-5 font-bold text-2xl">
                            <h2>URL History {storage.length}</h2>
                        </div> */}
                        {(storage.map((urls) => {
                        const {id, destination, shortUrl, createdAt, created_at, domainName, link, long_url} = urls[0]
                        return (
                            <>
                        <div key={id}> 
                            {domainName ? 
                            <div id="linkList" className="md:text-center md:flex md:flex-row md:items-stretch bg-white mb-5">
                                <div className="md:basis-5/6 md:flex md:flex-row items-stretch col-span-2 items-center px-2 py-2" onClick={() => copyShortUrl(id)}>
                                    <h2 className="md:basis-2/5 md:p-2 self-center font-bold text-xl text-cyan-400"> {shortUrl}</h2>
                                    <h2 className="md:basis-2/5 md:p-2 truncate self-center">{destination}</h2>
                                </div>
                                <div className="md:basis-1/6 p-2 self-center md:flex md:flex-row text-white text-lg">
                                    <button onClick={() => removeLink(id)} className="md:flex md:flex-row border-2 py-1 px-7 mr-3 rounded-lg justify-center seperator hover:bg-cyan-200">Delete</button>
                                    <button onClick={() => copyShortUrl(id)} className="md:flex md:flex-row border-2 py-1 px-7 rounded-lg justify-center seperator hover:bg-cyan-200">Copy</button>
                                </div>
                            </div> : 
                            <div id="linkList" className="md:text-center md:flex md:flex-row md:items-stretch bg-white mb-5">
                                <div className="md:basis-5/6 md:flex md:flex-row items-stretch col-span-2 items-center px-2 py-2" onClick={() => copyShortUrl(id)}>
                                    <p className="md:basis-2/5 md:p-2 self-center font-bold text-xl text-cyan-400">{link}</p>
                                    <p className="md:basis-2/5 md:p-2 truncate self-center">{long_url}</p>
                                </div>
                                <div className="md:basis-1/6 p-2 self-center md:flex md:flex-row text-white text-lg">
                                    <button onClick={() => removeLink(id)} className="md:flex md:flex-row border-2 py-1 px-7 mr-3 rounded-lg justify-center seperator hover:bg-cyan-200">Delete</button>
                                    <button onClick={() => copyShortUrl(id)} className="md:flex md:flex-row border-2 py-1 px-7 justify-center seperator hover:bg-cyan-200 active:bg-cyan-900">Copy</button>
                                </div>
                            </div>}
                            
                        </div>
                        </>
                        )
                    }))}</h2>

                    <div>
                        <div className="text-center md:pb-7 pb-20">
                            <h1 className="md:text-4xl text-3xl font-bold mb-5">Advanced Statistics</h1>
                            <div className="flex justify-center">
                                <p className="md:w-1/2 w-full font-bold text-xl text-slate-500">Track how your links are performing across the web with our 
                                advanced statistics dashboard.</p>
                            </div>
                        </div>
                        <div className="md:flex justify-between pb-10 items-center">
                            <div className="w-full bg-white px-8 pb-8 rounded-lg relative">
                                <div className="bg-icon absolute left-1/3 md:left-8  -top-10 rounded-full">
                                    <img src={brand} alt=''className=" p-7" />
                                </div>
                                <p className="text-2xl font-bold pb-5 pt-20">Brand Recognition</p>
                                <p className="text- font-bold text-slate-400">Boost your brand recognition with each click. Generic links don’t 
                                    mean a thing. Branded links help instil confidence in your content.</p>
                            </div>
                            <div className="flex justify-center ">
                                <div className="lg:w-16 md:w-5 w-2 h-28 md:h-2 seperator">

                                </div>
                            </div>
                            <div className="w-full bg-white px-8 pb-8 md:mt-20 rounded-lg relative">
                                <div className="bg-icon absolute left-1/3 md:left-8 -top-10 rounded-full">
                                    <img src={detailed} alt='' className="p-7"/>
                                </div>
                                <p className="text-2xl font-bold pb-5 pt-20">Detailed Records</p>
                                <p className="text- font-bold text-slate-400">Gain insights into who is clicking your links. Knowing when and where 
                                    people engage with your content helps inform better decisions.</p>
                            </div>
                            <div className="flex justify-center md:justify-start">
                                <div className="lg:w-16 md:w-5 w-2 h-28 md:h-2 seperator">

                                </div>
                            </div>
                            <div className="w-full bg-white px-8 pb-8 md:mt-40 rounded-lg relative">
                                <div className="bg-icon absolute left-1/3  md:left-8 -top-10 rounded-full">
                                    <img src={customize} alt='' className="p-7"/>
                                </div>
                                <p className="text-2xl font-bold pb-5 pt-20 ">Fully Customizable</p>
                                <p className="text- font-bold text-slate-400">Improve brand awareness and content discoverability through customizable 
                                    links, supercharging audience engagement.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center imagebg relative items-center">
                    <img src={window.innerWidth > 900 ? boostDesktop : boostMobile} className='imagebg w-full'/>
                    <div className="py-auto absolute">
                        <p className="md:text-5xl text-3xl font-bold text-white">Boost your links today</p>
                        <div className="flex justify-center mt-7">
                            <button className="text-xl px-10 seperator rounded-3xl py-3 text-white font-bold hover:bg-cyan-200">Get Started</button>
                        </div>
                    </div>
                </div>
                <div>
                    
                </div>

        
        </div>
    )
}

export default Input