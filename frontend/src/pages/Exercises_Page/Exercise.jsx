import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
// import { useQueryClient } from "@tanstack/react-query";

// eslint-disable-next-line react/prop-types
const Exercise = ( exercise ) => {
	// const queryClient = useQueryClient();
	const { name, instructions} = exercise.exercise;
	console.log(name); // This will log the name of the exercise
	return (
		<div className='border p-4 rounded-lg shadow-md bg-gray-800'>
			<div className='flex justify-between items-center'>
				<h2 className='text-xl font-semibold text-white'>{name}</h2>
				{/* Additional controls/icons can go here */}
			</div>
			<p className='text-gray-400 mt-2'>{instructions}</p>
			<div className='flex items-center gap-2 mt-4'>
				{/* Icon actions */}
				<FaRegHeart className='text-gray-400 hover:text-red-500 cursor-pointer' />
				<FaRegBookmark className='text-gray-400 hover:text-yellow-500 cursor-pointer' />
				<FaTrash className='text-gray-400 hover:text-red-500 cursor-pointer' />
			</div>
			
		</div>
	);
};

export default Exercise;