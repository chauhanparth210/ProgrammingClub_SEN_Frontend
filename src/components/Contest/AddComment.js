import React, { useState } from 'react'

const AddComment = ({ contest }) => {
    const [comment, setComment] = useState('')
    const socket = require('./socket').default
    const addComment = async (e) => {
        e.preventDefault()
        if(comment !== '') {
            if(socket !== undefined) {
                contest.comments.push({ text: comment, posted_at: Date.now() })
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

export default AddComment