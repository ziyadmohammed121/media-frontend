import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Videocard from './Videocard'
import { getVideos } from '../services/allapi'
import { useState } from 'react'

function View({serverRes}) {

    // create a state for holding api response 

    const [allVideos, setallVideos] = useState([])

    const [deleteStatus,setdeleteStatus]=useState(false)

    const handeldeleteStatus=(res)=>{

        setdeleteStatus(res)

    }

    // hook
    useEffect(() => {
        //   call back function body

        getallVideos()


    }, [serverRes,deleteStatus])




    const getallVideos = async () => {

        let response = await getVideos()

        setallVideos(response.data);

    }

    console.log(allVideos);

    return (
        <div className='border p-3 ms-4'>

            <Row>
                {
                    allVideos.map(video => (

                        <Col className='ps-3 mb-3' sm={12} md={6}>

                            <Videocard card={video} handeldeleteStatus={handeldeleteStatus} />
                        </Col>

                    ))

                }
            </Row>

        </div>
    )
}

export default View
