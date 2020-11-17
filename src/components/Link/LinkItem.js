import React from 'react';
import { Link } from 'react-router-dom';

function LinkItem({ link, index, showCount }) {
    return (
        <div className="flex items-start mt2">
            <div className="flex items-center">
                {showCount && <span className="gray">{index}</span>}
                <div className="vote-button">^</div>
                <div className="ml1">
                    <div>
                        {link.description} <span className="link">({link.url})</span>
                    </div>
                </div>
                <div className="f6 1h-copy gray">
                    {link.votes.length} votes by {link.postedBy.name} {link.created} {' | '} <Link to={`/link/${link.id}`}>{link.comments.length > 0 ? `${link.comments.length} comments` : 'discuss'}</Link>
                </div>
            </div>
        </div>
    );
}

export default LinkItem;
