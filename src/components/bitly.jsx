import { useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';

const Bit = ({bitsetCheckbox, bitcheckbox, urlValue, storage, setStorage, setShortUrl}) =>{

    const uid = uuidv4()

    const url = 'https://api-ssl.bitly.com/v4/shorten'

    const options = {
        url: url,
        method: "POST",
        headers: {  
            'Authorization': ' 245b31d21f0f5bb151d6849b39bb4ff1b0a0594a',
            'Content-Type': 'application/json',
            
        },
        body: JSON.stringify({ "long_url": urlValue, "domain": "bit.ly" })
    }

    const getBitUrl = async() =>{
        if(bitcheckbox){
            const response = await fetch(url, options)
            if (response.status >= 200 && response.status <= 299) {
                const data = await response.json();
                setShortUrl(data)
                let newUrl = [data]
                setStorage([newUrl, ...storage])
            }

        }
        bitsetCheckbox(false)
    }

useEffect(() =>{
    getBitUrl()
}, [bitcheckbox])

useEffect(() =>{
    const store = JSON.parse(localStorage.getItem('URL'))
    if(store){
        setStorage(store)
    }
}, [])


useEffect(() => {
    localStorage.setItem('URL', JSON.stringify(storage));
}, [storage]);




    return <>
        <div>
        </div>
    </>
}

export default Bit