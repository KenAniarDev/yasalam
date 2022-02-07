import React from 'react'

export default function TextError({ children }) {
    return (
        <div className="error text-red-500 mt-1 text-left">
            {children}
        </div>
    )
}
