import React from 'react'
import { Table, Button } from 'semantic-ui-react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
const ContestList = ({ contests }) => {
    return (
        (contests) ? 
        <div>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Place</Table.HeaderCell>
                        <Table.HeaderCell>StartTime</Table.HeaderCell>
                        <Table.HeaderCell>EndTime</Table.HeaderCell>
                        <Table.HeaderCell>Discussion</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        contests.map((contest, i) => 
                            <Table.Row key={i}>
                                <Table.Cell>{contest.title}</Table.Cell>
                                <Table.Cell>{contest.place}</Table.Cell>
                                <Table.Cell><Moment format="MM Do YY HH:MM" >{contest.startTime}</Moment></Table.Cell>
                                <Table.Cell><Moment format="MM Do YY HH:MM" >{contest.EndTime}</Moment></Table.Cell>
                                <Table.Cell>
                                    <Link to={"/discussion/"+contest.title}><Button
                                            basic
                                            color='black'
                                            content='Discussion'
                                            icon='chat'
                                            label={{
                                                basic: true,
                                                color: 'black',
                                                pointing: 'left',
                                                content: '...',
                                            }}
                                    /></Link>
                                </Table.Cell>
                            </Table.Row>
                        )
                    }
                </Table.Body>
            </Table>
        </div> : ''
    )
}

export default ContestList