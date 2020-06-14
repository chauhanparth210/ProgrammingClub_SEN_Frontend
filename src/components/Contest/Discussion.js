import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";
import { SERVER_URL } from "../../utils/constants";
import { Card, Comment, Header } from 'semantic-ui-react';
import AddComment from './AddComment';
import Moment from 'react-moment';

const Discussion = () => {
    const { title } = useParams()
    const [contest, setContest] = useState({})
    useEffect(() => {
        getContest()
        // eslint-disable-next-line
    }, [])
    const [comments, setComments] = useState([])
    const socket = require('./socket').default
    socket.on('newcomment', (data) => {
        setComments(data.comments)
    })
    const getContest = () => {
        axios.get(`${SERVER_URL}/contest/discussion/`+title)
        .then((data) => {
            setContest(data.data)
            setComments(data.data.comments)
        })
    }
    return (
        <div className="p-5 font">
            <Card fluid>
                <Card.Content header={contest.title}></Card.Content>
                <Card.Content>
                    <Comment.Group>
                    <Header as='h3' dividing>
                        Comments
                    </Header>
                    {
                        comments.map(comment => 
                            <Comment key={comment._id}>
                                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
                                <Comment.Content>
                                    <Comment.Author as="a">Matt</Comment.Author>
                                    <Comment.Metadata>
                                        <div><Moment format="DD/MM/YYYY HH:SS">{comment.posted_at}</Moment></div>
                                    </Comment.Metadata>
                                    <Comment.Text>{comment.text}</Comment.Text>
                                    <Comment.Actions>
                                    <Comment.Action>Reply</Comment.Action>
                                    </Comment.Actions>
                                </Comment.Content>
                            </Comment>
                        )
                    }
                    </Comment.Group>
                </Card.Content>
                <Card.Content extra>
                    <AddComment contest={contest} />
                </Card.Content>
            </Card>
        </div>
    )
}

export default Discussion