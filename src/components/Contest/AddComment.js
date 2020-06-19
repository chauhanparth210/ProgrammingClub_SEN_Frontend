import React, { useState } from 'react'
import {connect} from "react-redux"

const AddComment = ({ contest ,name}) => {
    const [comment, setComment] = useState('')
    const socket = require('./socket').default
    const addComment = async (e) => {
        e.preventDefault()
        if(comment !== '') {
            if(socket !== undefined) {
                contest.comments.push({ text: comment, posted_at: Date.now(),name  })
                await socket.emit('addcomment', { contest, comment })
            }
            setComment('')
        }
    }
    return (
        <div>
            <form className="" onSubmit={addComment}>
                <div className="ui input fluid">
                    <input value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add Comment" />
                </div>
                <div className="mt-2">
                    <button className="ui button blue" onClick={addComment}>Post Comment</button>
                    <button className="ui button red basic" type="reset" onClick={() => setComment('')}>Reset Text</button>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    name: state.auth.user.name
  });

export default connect(mapStateToProps)(AddComment)
