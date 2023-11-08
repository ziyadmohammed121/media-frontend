import React, { useEffect, useState } from 'react'
import { getHistory } from '../services/allapi'


function Watchhistory() {

    const [history, sethistory] = useState([])

    const getwatchHistory = async () => {

        const { data } = await getHistory()

        sethistory(data)

    }
    console.log(history);



    useEffect(() => {

        getwatchHistory()

    }, [])


    return (
        <>

            <h1>

                Watch history

            </h1>
            <table className='table shadow m-3 rounded border'>

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>cardName</th>
                        <th>url</th>
                        <th>Date</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        history?.map((item, index) => (

                            <tr>
                                <td>{index+1}</td>
                                <td>{item?.cardName}</td>
                                <td>{item?.url}</td>
                                <td>{item?.date}</td>
                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </>
    )
}

export default Watchhistory