import React, { useEffect, useState } from 'react'
import axios from "axios"
import { DataGrid } from "@mui/x-data-grid"


const Table = () => {

    const [data, setData] = useState([]);

    const getApiData = async () => {
        const res = await axios.get("https://mocki.io/v1/46483fe9-0e37-4326-b788-eb0fbe36cb88")
        try {
            setData(res.data)
        } catch (error) {
            console.log("API Error " + JSON.stringify(error));
        }
    }

    useEffect(() => {
        getApiData()
    }, []);

    // let assists = 0
    // let games = 0
    // let goals = 0
    // data.forEach((i) => {
    //     assists = i.assists
    //     games = i.games
    //     goals = i.goals
    // })

    // console.log("assists " + assists)
    // console.log("games " + games)
    // console.log("goals " + goals)

    // let gamesAvg = games + assists + goals

    // const myAvg = gamesAvg / 3

    // console.log("myAvg " + myAvg);

    let allgoals = []
    let allgames = []
    let allpoints = []
    for (let i = 0; i < data.length; i++) {
        allgoals.push(data[i]?.goals)
        allgames.push(data[i]?.games)
        allpoints.push(data[i]?.points)
    }

    let totalAvg = []



    for (let i = 0; i < allgoals.length; i++) {

        const myavgArray = allgoals[i] * allgames[i] / allpoints[i]

        totalAvg.push(myavgArray)
    }


    const hightScored = Math.max(totalAvg)
    const checkHigh = hightScored === NaN ? "" : 32.6





    const columns = [
        { field: 'id', headerName: '# ID', width: 150 },
        { field: 'col2', headerName: 'Goals', width: 150 },
        { field: 'col3', headerName: 'Games', width: 150 },
        { field: 'col4', headerName: 'Points', width: 150 },
        {
            field: 'col1', headerName: 'Name', width: 150, cellClassName: (params) => {
                return (
                    (params.getValue(params.id, "col2") * params.getValue(params.id, "col3")) / params.getValue(params.id, "col4") > 0.4 ? "colored" : ""
                )
            }
        },
        {
            field: 'col5', headerName: 'Action', width: 150, renderCell: (params) => {
                return (
                    <a href={data.link}> ESPN </a>
                )
            }
        },
    ]

    const rows = []




    data?.map((item, id) => {
        return rows.push({
            id: id, // for id 
            col1: item.name,
            col2: item.goals,
            col3: item.games,
            col4: item.points
        })
    })

    let totalGames = 0
    let totalGoals = 0
    let totalPoints = 0
    data.forEach((i) => {
        totalGames += i.games
        totalGoals += i.goals
        totalPoints += i.points
    })

    return (
        <div style={{ height: '500px', width: '100%' }}>
            <DataGrid rows={rows} columns={columns} />

            <h4>Total Goals: {totalGoals}</h4>
            <h4>Total Games: {totalGames}</h4>
            <h4>Total Points: {totalPoints}</h4>

        </div>
    )
}

export default Table