import { useEffect, useRef } from "react";
import noProfilePhoto from "../icons/noprofile.jpg";
import { Link } from "react-router-dom";
import DotDotDotIcon from "../icons/dotdotdot.svg?react";
import EditPenIcon from "../icons/edit-pen-google.svg?react";
import DeleteIcon from "../icons/delete.svg?react";

const Comment = ({ comment }) => {
    const detailsRef = useRef(null);

    // Collapses the popup when user clicks outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the click is outside the details element
            if (detailsRef.current && !detailsRef.current.contains(event.target)) {
                // Close the details element
                detailsRef.current.open = false;
            }
        };

        // Add click event listener to the entire document
        document.addEventListener("click", handleClickOutside);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleDeleteComment = (commentId) => {
        alert(commentId);
    };

    return (
        <div className="flex items-start mb-2 text-xs">
            <Link to={`/profile/${comment.postedBy.id}`}>
                <img
                    className="rounded-full w-8 h-8 mr-2 object-cover border border-white ring-1"
                    src={comment.postedBy.profilePhoto || noProfilePhoto}
                    alt="profile photo"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                        e.target.src = noProfilePhoto;
                    }}
                />
            </Link>
            <div className="flex items-center group">
                <div className="flex flex-col max-w-[260px] outline-none bg-slate-300 rounded-2xl pl-4 pr-4 py-1 mr-1" spellCheck="true">
                    <Link to={`/profile/${comment.postedBy.id}`}>
                        <span className="font-bold hover:underline">{comment.postedBy.firstName || comment.postedBy.displayName}</span>
                    </Link>
                    <span className="text-black w-full cursor-text break-words whitespace-pre-wrap">{comment.text}</span>
                </div>
                <details className="relative" ref={detailsRef}>
                    <summary className="list-none" aria-haspopup="menu" role="button">
                        <div className="rounded-full group-hover:visible invisible hover:bg-slate-300 p-2">
                            <DotDotDotIcon className="w-3 h-3" />
                        </div>
                    </summary>
                    <div className="absolute flex flex-col -bottom-16 -left-16 z-10 bg-slate-200 shadow-md border border-gray-300 rounded-md text-xs select-none">
                        <button className="flex items-center hover:bg-slate-300 w-full transition-colors p-1">
                            <EditPenIcon className="w-6 h-6 mr-1" />
                            <span className="w-full whitespace-nowrap text-left">Edit</span>
                        </button>
                        <button className="flex items-center hover:bg-slate-300 w-full transition-colors p-1" onClick={() => handleDeleteComment(comment.id)}>
                            <DeleteIcon className="w-6 h-6 mr-1 fill-red-600" />
                            <span className="w-full whitespace-nowrap text-left">Delete</span>
                        </button>
                    </div>
                </details>
            </div>
        </div>
    );
};

export default Comment;