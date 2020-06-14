import React, { useState, useEffect } from 'react'
import axios from "axios";
import { SERVER_URL } from "../../utils/constants";
import { Tab } from 'semantic-ui-react'
import './app.scss'
import ContestList from './ContestList';

const Contests = () => {
    const [contests, setContests] = useState({})
    useEffect(() => {
        getContests()
    }, [])
    const getContests = () => {
        axios.get(`${SERVER_URL}/contest`)
        .then((data) => {
            let running = []
            let previous = [];
            let upcoming = []
            const hrnk = data.data[0].hackerrank
            const hrth = data.data[2].hackerearth
            const cfs = data.data[1].codeforces
            running = hrnk.live
            previous = hrnk.past
            running = [...running, ...hrth.live]
            upcoming = hrth.upcoming
            previous = [...previous, ...cfs.past]
            upcoming = [...upcoming, ...cfs.upcoming]
            setContests({running, upcoming, previous})
        })
    }
    const panes = [
        {
          menuItem: 'Running',
          render: () => <Tab.Pane attached={false} ><ContestList  contests={contests.running} /></Tab.Pane>,
        },
        {
          menuItem: 'Upcoming',
          render: () => <Tab.Pane attached={false}><ContestList contests={contests.upcoming} /></Tab.Pane>,
        },
        {
          menuItem: 'Previous',
          render: () => <Tab.Pane attached={false}><ContestList contests={contests.previous} /></Tab.Pane>,
        },
      ]
    return (
        <div className="p-5 font" style={{fontSize:"1.5rem"}}>
            <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        </div>
    )
}

export default Contests
