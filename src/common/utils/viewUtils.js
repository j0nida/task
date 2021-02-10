import React from 'react'

export const loadingIndicator = () => {
    return "Loading...";
}

//display a nice visual indicator for loading or empty list
export const emptyListRowIndicator = ({colspan, loading = false, message = "No data available"}) => {
    if (loading)
        message = loadingIndicator();
    return <tr><td colSpan={colspan} className="text-center">{message}</td></tr>;
}
