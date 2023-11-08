import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Add from './Add'
import Category from './Category'
import View from './View'
import { useState } from 'react'
import { Link } from 'react-router-dom'



function Home() {

    // creating state

    const[serverRes,setserverRes]=useState({})

    const handleresponse=(res)=>{

        setserverRes(res)

    } 

    return (
        <>
            <div>

               <div className='d-flex justify-content-between'>
                    <h1 className='ms-5 mb-5'>All Video Cards</h1>
                    <Link to='/watch-history' style={{textDecoration:"none",fontSize:"25px",color:"blue", fontWeight:"500"}}>Watch History</Link>
               </div>

                <div className='container-fluid'>
                    <Row className='mt-5'>

                        <Col lg={1}>
                            <Add handleresponse={handleresponse}/>
                        </Col>

                        <Col lg={7}>
                            <View serverRes={serverRes} />
                        </Col>

                        <Col lg={4}>
                            <Category />
                        </Col>

                    </Row>
                </div>

            </div>
        </>
    )
}

export default Home
