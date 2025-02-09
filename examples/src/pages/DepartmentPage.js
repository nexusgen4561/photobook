import React from 'react'
import { useParams } from 'react-router-dom'

function DepartmentPage() {
    const { id } = useParams()

    return (
        <div>
            <h1>Department Page</h1>
            <p>The ID is: {id}</p>
        </div>
    )
}

export default DepartmentPage