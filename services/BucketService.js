// import { ref } from "firebase/database";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { storage } from "../firebase";
import { createMemory } from "./Database";

// TODO: Upload Image to Buckets
export const handleUploadImage = async (uri, filename) => {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            resolve(xhr.response)
        }
        xhr.onerror = (e) => {
            console.log(e);
            reject(new TypeError("Network request failed."))
        }
        xhr.responseType = "blob";
        xhr.open("get", uri, true);
        xhr.send(null)
    })

    // Only refers where it should be stored and what it should be called
    const imageRef = ref(storage, filename)
    const uploadRes = await uploadBytes(imageRef, blob)
    blob.close()

    console.log(await getDownloadURL(imageRef))

    const savedMemory = await createMemory("memories", { name: filename, link: await getDownloadURL(imageRef) })
}