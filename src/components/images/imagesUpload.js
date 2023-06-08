"use client"; // This is a client component 

import { useState } from 'react';
import Dropzone from 'react-dropzone'
import style from './images.module.css';
import axios from 'axios';

const Images = ()=>{

    const [image, setImage] = useState({array: []});
    const [loading, setLoading] = useState("");

    const handleDrop =async (files)=>{
        const uploaders = files.map((file)=>{
            const formData = new FormData();
            formData.append("file", file);
            formData.append("tags", `codeinfuse,medium,gist`);
            formData.append("upload_preset", process.env.NEXT_PUBLIC_FOLDER_CLOUDINARY); //ponerlo en .env
            formData.append("api_key", process.env.NEXT_PUBLIC_API_KEY_CLOUDINARY);
            formData.append("timestamp",(Date.now() / 1000) | 0);
            setLoading("true");
            // console.log(confirm);
                return axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME_CLOUDINARY}/image/upload`, formData,{
                    headers: {"X-Requested-With": "XMLHttpRequest"},
                })
                .then((response) => {
                    const data = response.data;
                    // console.log(data);
                    const fileUrl = data.secure_url;
                    // console.log(fileUrl);
                    let specificArrayInObject = image.array;
                    specificArrayInObject.push(fileUrl);
                    const newobj = {...image, specificArrayInObject};
                    setImage(newobj);
                    // console.log(image);
                    alert("Imagen cargada con exito")
                })
        })
        axios.all(uploaders).then(()=>{
            setLoading("false");
        })
    }

    // const imagePreview = ()=>{
    //     if(loading === "true"){
    //         return <h3>Cargando imagenes...</h3>
    //     }
    //     if(loading === "false"){
    //         return (
    //             <h3>{image.array.length <= 0 ? "No hay imagenes" :
    //              image.array.map((item,index) => 
    //              (<img 
    //                 alt='img'
    //                 style={{width: "200px", height: "100", backgroundSize: "cover",paddingRight: "15px"}}
    //                 src={item}
    //                 key={index}
    //                 />
    //                 ))}</h3>
    //         )
    //     }
    // }
    

    return (
        <div>
            <h1>Subir imagenes</h1>
            <Dropzone
             className='dropzone'
             onDrop={handleDrop}
             onChange={(e)=> setImage(e.target.value)} 
             value={image}
            >
               {({getRootProps, getInputProps}) => (
                    <section>
                    <div {...getRootProps({className: "dropzone"})}>
                        <input {...getInputProps()} />
                        <p>Agrega o suelta tus imágenes</p>
                    </div>
                    </section>
                )}
            </Dropzone>

        {/* {imagePreview()} */}

        </div>
    )
}


export default Images;