import React from "react";
import { FadeLoader } from "react-spinners";

export default function Loading() {
	return (
		<div className='flex justify-center items-center h-screen'>
			<FadeLoader
				height={10}
				radius={2}
				width={3}
				color='#299ecd'
				speedMultiplier={2}
			/>
		</div>
	);
}