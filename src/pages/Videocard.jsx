import { Trash2 } from 'feather-icons-react/build/IconComponents';
import React from 'react'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Addhistory, deleteVideos } from '../services/allapi';
import { v4 as uuidv4 } from 'uuid';

function Videocard({ card, handeldeleteStatus ,insidecategory}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = async () => {
        setShow(true);

        const uid = uuidv4();

        let cardTime = new Date()

        console.log(cardTime);

        const { caption, url } = card

        if (uid != "" && caption != "" && url != "" && cardTime != "") {

            const body = {
                id: uid, cardName: caption, url, date: cardTime
            }

            const response = await Addhistory(body)
            console.log(response);

        }


    }

    // removing video

    const removeItem = async (id) => {

        // make call to all api
        let response = await deleteVideos(id)
        //   console.log(response);

        if (response.status >= 200 && response.status < 300) {
            handeldeleteStatus(true)
        }

    }

    // drag started 

    const dragStarted = (e, id) => {
        console.log("drag started & source card id:", id);
        e.dataTransfer.setData("cardId", id)

    }

    return (
        <>
            <div>
                {/* draggable is an attribute in javascript */}
                <Card draggable onDragStart={e => dragStarted(e, card?.id)}


                    className='shadow' style={{ cursor: 'pointer' }}>
                    <Card.Img onClick={handleShow} variant="top" height={'200px'} src={card?.thumbnail} />
                    <Card.Body style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Card.Title style={{ marginBottom: '0px' }}>
                            <span>
                                {card?.caption}
                            </span>
                        </Card.Title>
                        {/* delete button */}
                        {
                            insidecategory?"":
                            <Trash2 onClick={() => removeItem(card?.id)} color='red' />
                        
                        }
                    </Card.Body>

                </Card>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{card?.caption}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <iframe width="100%" height="400px" src={`${card?.url}?autoplay=1`} title="LEO - Badass Lyric | Thalapathy Vijay | Lokesh Kanagaraj | Anirudh Ravichander" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </Modal.Body>
                </Modal>

            </div>
        </>
    )
}

export default Videocard
