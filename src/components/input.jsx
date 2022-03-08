import { useEffect, useState } from "react"
import Bit from "./bitly"
import { AiFillDelete, AiFillCopy } from "react-icons/ai";
import {GiAqueduct} from "react-icons/gi";



const Input = () =>{

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
        if (rebrandlyCheckbok && !bitlyCheckbox){
            setUrlType('Rebrandly')
            getRebrandlyUrl()
        }else if(!rebrandlyCheckbok && bitlyCheckbox){
            setUrlType('Bit.ly')
            bitsetCheckbox(true)
        }else{
            console.log('Error')
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
    

    return(
        <div>
            <div className="h-screen gradient-bg-welcome mb-5">
                <h1 className=' text-4xl font-semibold pt-5 pb-2 text-stone-300 lg:px-52 px-10 md:px-20' id="title">MightyUrl</h1>
                <h2 className='lg:px-52 md:px-20 px-10 text-stone-300'>Quick way to get a short URL</h2>
                <form onSubmit={submitUrl} className="lg:px-52 md:px-20 px-10 mt-24">
                    <h1 className="text-white mb-5 text-xl text-semibold">Enter URL to shorten</h1>
                    <input className="w-11/12 lg:w-4/6 border-2 h-14 pl-5 pr-5 mb-5" type='url' required placeholder = 'Long URL' value={urlValue} onChange={(e) =>{
                        setUrl(e.target.value)
                    }}></input><br></br>
                    <p className="text-stone-300 text-xl">Choose Domain</p>
                    <div className="flex flex-col">
                        <div className="flex-row mt-2">
                            <label htmlFor="rebrandlyCheckbox" className="text-stone-300 mr-2">Rebrand.ly</label>
                            <input className="mr-5" type='checkbox' name="rebrandlyCheckbok" id="rebrandlyCheckbok" value='Rebrandly' checked={rebrandlyCheckbok} onChange={() => {
                                setRebrandyCheckbox(true)
                                setBitlyCheckbox(false)
                            }}/></div>
                        <div className="flex-row mt-2">
                            <label htmlFor="bitlyCheckbox" className="text-stone-300 mr-2">Bit.ly</label>
                            <input className="mr-2" type='checkbox' value='Bit.ly' name="bitlyCheckbok" id="bitlyCheckbok" checked={bitlyCheckbox} onChange={() => {
                                setBitlyCheckbox(true)
                                setRebrandyCheckbox(false)
                            }}/>
                        </div>
                    </div>
                    <div className="  flex flex-row items-stretch mt-5">
                        <input className=" border-2 w-11/12 h-14 lg:w-3/6 pl-5 pr-5 basis-10/12 lg:basis-3/5" type='text' readOnly  placeholder= 'Short URL' value={urlType === 'Rebrandly' ? urlTrue ? shortUrl.shortUrl : shortUrl.message : shortUrl.link}/>
                        <button className="self-center bg-white h-14 lg:w-1/12 text-sky-900 p-4"  onClick={() => {copyShortUrl(id)}}><AiFillCopy className="w-full h-full"/></button>
                        <br></br>
                    </div>
                    
                    <button className='border-2 px-14 py-3 mt-10 rounded-lg text-white bg-blue-600'>Submit</button>
                </form>
            </div>
            <div className="sm:px-32 px-10">
                <h2>{bitcheckbox ? <Bit bitsetCheckbox={bitsetCheckbox} bitcheckbox={bitcheckbox} 
                    urlValue={urlValue} storage={storage} setStorage={setStorage} setShortUrl={setShortUrl}/> 
                    : 
                    (storage.map((urls) => {
                    const {id, destination, shortUrl, createdAt, domainName,long_url} = urls[0]
                    return (<div key={id}>
                    </div>)
                    }))}
                </h2>
                    <h2 className="pb-20">
                        <div className="border-b-4 py-5 font-bold text-2xl">
                            <h2>URL History {storage.length}</h2>
                        </div>
                        {(storage.map((urls) => {
                        const {id, destination, shortUrl, createdAt, created_at, domainName, link, long_url} = urls[0]
                        return (
                            <>
                        <div key={id}> 
                            {domainName ? 
                            <div id="linkList" className="md:text-center border-b-2 md:flex md:flex-row md:items-stretch grid grid-cols-3 gap-4 pb-4">
                                <div className="md:basis-5/6 md:flex md:flex-row items-stretch col-span-2" onClick={() => copyShortUrl(id)}>
                                    <h2 className="md:basis-2/5 md:p-2 self-center font-bold text-xl"> {shortUrl}</h2>
                                    <h2 className="md:basis-1/5 md:p-2 truncate self-center">{destination}</h2>
                                    <h2 className="md:basis-1/5 md:p-2 self-center">{domainName}</h2>
                                    <div className="flex flex-col md:basis-1/5 md:p-2 self-center">
                                        <h2>{createdTime(createdAt)}</h2>
                                        <h2 className="">{createdDate(createdAt)}</h2>
                                    </div>
                                </div>
                                <div className="md:basis-1/6 p-2 self-center flex flex-col text-indigo-900 text-lg">
                                    <button onClick={() => removeLink(id)} className="flex flex-row border-2 p-1 mb-2 justify-center">Delete</button>
                                    <button onClick={() => copyShortUrl(id)} className="flex flex-row border-2 p-1 justify-center">Copy</button>
                                </div>
                            </div> : 
                            <div id="linkList" className="md:text-center md:flex md:flex-row border-b-2 md:items-stretch grid grid-cols-3 gap-4">
                                <div className="md:basis-5/6 md:flex md:flex-row items-stretch col-span-2" onClick={() => copyShortUrl(id)}>
                                    <p className="md:basis-2/5 md:p-2 self-center font-bold text-xl">{link}</p>
                                    <p className="md:basis-1/5 md:p-2 truncate self-center">{long_url}</p>
                                    <p className="md:basis-1/5 md:p-2 self-center">bit.ly</p>
                                    <div className="flex flex-col md:basis-1/5 md:p-2 self-center">
                                        <h2>{createdTime(created_at)}</h2>
                                        <h2 className="">{createdDate(created_at)}</h2>
                                    </div>
                                </div>
                                <div className="md:basis-1/6 p-2 self-center flex flex-col text-indigo-900 text-lg">
                                    <button onClick={() => removeLink(id)} className="flex flex-row border-2 p-1 mb-2 justify-center">Delete</button>
                                    <button onClick={() => copyShortUrl(id)} className="flex flex-row border-2 p-1 justify-center">Copy</button>
                                </div>
                            </div>}
                            
                        </div>
                        </>
                        )
                    }))}</h2>
                </div>

        
        </div>
    )
}

export default Input