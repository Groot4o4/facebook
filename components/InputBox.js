import Image from 'next/image'
import React from 'react'
import { useSession } from 'next-auth/client'
import { useRef , useState} from "react"
import { db, storage } from "../firebase"
import firebase from "firebase"


import { CameraIcon , VideoCameraIcon
} from '@heroicons/react/solid'

import { EmojiHappyIcon
} from '@heroicons/react/outline'

function InputBox() {

 const [session] = useSession();

const inputRef = useRef(null);
const fileRef = useRef(null);

const [imageToPost, setimageToPost] = useState(null);

const addImage = (e)=> {
    const reader = new FileReader();

    if(e.target.files[0]){
        reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent )=>{
        setimageToPost(readerEvent.target.result);
    }

}

const removeImage = () =>{
    setimageToPost(null);
}


 const sentPost = (e)=>{
     e.preventDefault();

     if(!inputRef.current.value) return;
     
     db.collection("posts").add({
         message:inputRef.current.value,
         name:session.user.name,
         email:session.user.email,
         image:session.user.image,
         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
     }).then(doc =>{
         if(imageToPost){
             const uploadTask = storage
             .ref(`posts/${doc.id}`)
             .putString(imageToPost,"data_url");

            
             removeImage();

             uploadTask.on(
                 "state_change",
                 null,
                 (error) => console.error(error),
                 () =>{
                    storage.ref("posts").child(doc.id).getDownloadURL().then(url => {
                         db.collection('posts').doc(doc.id).set({ postImage: url} ,{merge:true})
                     })
                 }

             )



         }
     })

     inputRef.current.value="";

 }

    return (
        <div className="bg-white p-2 rounded-2xl  shadow-md text-gray-500 font-medium mt-6">
            <div className="flex space-x-4 p-4 items-center">
            <Image
            className="rounded-full"
            src={session.user.image}
            width= "30"
            height="30" 
            layout="fixed"/>

            <form className="flex flex-1">
                <input className=" rounded-full h-12 bg-gray-100 flex-grow  px-5 focus:outline-none " type="text" ref={inputRef} placeholder={`What's on your mind, ${session.user.name}?`} />
                <button hidden type="submit"  onClick={sentPost}>Submit</button>
            </form>

            {imageToPost && (
                <div  onClick={removeImage} className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer" > 
                    <img className=" h-10 scale-0 object-contain"  src={imageToPost} alt="" />
                    <p className="text-xs text-red-500 text-center"> Remove</p>
                </div>
            )}


            </div>

            <div className="flex justify-evenly p-3 border-t ">
                <div className="inputIcon hover:bg-gray-100"> 
                    <VideoCameraIcon className="h-7 text-red-500 " />
                    <p className="text-xs sm:text-sm  xl:text-base" >Live video</p>
                </div>

                <div  onClick={()=>fileRef.current.click()} className="inputIcon hover:bg-gray-100">
                    <CameraIcon className="h-7 text-green-400 " />
                    <p className="text-xs sm:text-sm  xl:text-base" >Photo/Video</p>
                    <input type="file" ref={fileRef} hidden  onChange={addImage}/>
                </div>

                <div className="inputIcon hover:bg-gray-100">
                    <EmojiHappyIcon className="h-7 text-yellow-300 " />
                    <p className="text-xs sm:text-sm  xl:text-base" >Feeling/Actitvity</p>
                </div>

            </div>
            
        </div>
    )
}

export default InputBox
