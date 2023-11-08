import React from 'react'
import { PlusCircle } from 'feather-icons-react/build/IconComponents';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { addVideos } from '../services/allapi';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Add({handleresponse}) {

    const [show, setShow] = useState(false);
    const [uploadData, setuploadData] = useState({

        id: "", caption: "", thumbnail: "", url: ""


    })
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const setInput = (e) => {



        const { name, value } = e.target

        // (...) three dots=spread operator values in the object will be shown all together

        setuploadData({ ...uploadData, [name]: value })

    }

    console.log(uploadData);

    const handleAdd = async () => {
        const { id, caption, thumbnail, url } = uploadData
        if (!id || !caption || !thumbnail || !url) {
            toast.success("please fill the form completly",{
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            }
            )
        }
        else {


            const response = await addVideos(uploadData)
            console.log(response.data);
            // make an api call to allapi.js 
            if (response.status >= 200 && response.status < 300) {
                // console.log();
                handleresponse(response.data);

                setShow(false)
                toast("new video uploaded successfully")
            }

            else {
                toast("please provide a  unique id!!!npm")
            }

        }
    }



    const extractUrl = (e) => {

        let youtubeUrl = e.target.value
        // oruginal https://www.youtube.com/watch?v=6PYammVOr8s

        // i frame tag src="https://www.youtube.com/embed/6PYammVOr8s" 

        if (youtubeUrl.includes("v=")) {
            let index = youtubeUrl.indexOf("v=")
            console.log(index);
            let videoUrl = youtubeUrl.substring(index + 2, index + 30)

            console.log(videoUrl);

            let videodata = uploadData

            videodata.url = `https://www.youtube.com/embed/${videoUrl}`

            setuploadData(videodata)

        }
        console.log(uploadData);
    }




    return (
        <>
            <div className='btn' onClick={handleShow}>
                <PlusCircle color='green' size={40} />
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Upload Video Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>

                        <FloatingLabel className='mb-3' controlId="floatingId" label="Upload Video Id">
                            <Form.Control type="text" placeholder="Video Id" name='id' onChange={setInput} />
                        </FloatingLabel>

                        <FloatingLabel className='mb-3' controlId="floatingCaption" label="Upload Video Caption">
                            <Form.Control type="text" placeholder="Video Caption" name='caption' onChange={setInput} />
                        </FloatingLabel>

                        <FloatingLabel className='mb-3' controlId="floatingImage" label="Upload Video Cover Image Url">
                            <Form.Control type="text" placeholder="Video Image" name='thumbnail' onChange={setInput} />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingLink" label="Upload Video Link">
                            <Form.Control type="text" placeholder="Video Link" name='url' onChange={extractUrl} />
                        </FloatingLabel>

                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleAdd} variant="primary">Add</Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer

                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"

            />
        </>
    )
}

export default Add
