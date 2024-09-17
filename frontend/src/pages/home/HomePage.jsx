import { BiLogOut } from "react-icons/bi";
import { useMutation,useQueryClient ,useQuery} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import XSvg from "../svgs/X";



const HomePage = () => {
	
    const queryClient= useQueryClient();
	const {mutate:logout}= useMutation({
		mutationFn: async ()=>{
			try {
				const res = await fetch("/api/auth/logout",{
					method:"POST"
				});
				const data= await res.json();
				
				if(!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
				
			} catch (error) {
				throw new Error(error)
			}
		},
		onSuccess: () => {
			toast.success("Logout successfull");
			queryClient.invalidateQueries({queryKey:["authUser"]});
		},
		onError: ()=>{
			toast.error("Logout Failed");
		}
	})
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });

	return (
        <>
            <h1>Welcome ....</h1>
            <div className='flex justify-between flex-1'>
							<div className='hidden md:block'>
								<p className='text-white font-bold text-sm w-20 truncate'>{authUser?.fullName}</p>
								<p className='text-slate-500 text-sm'>@{authUser?.username}</p>
								<Link to='/Exercises'>
									<button className='btn rounded-full btn-primary text-white btn-outline w-full'>Exercises</button>
								</Link>
								
							</div>
							<BiLogOut
								className='w-5 h-5 cursor-pointer'
								onClick={(e)=>{
									e.preventDefault();
									logout();

								}}

							

								
							
							/>
						</div>
        </>
    )
		
};
export default HomePage;