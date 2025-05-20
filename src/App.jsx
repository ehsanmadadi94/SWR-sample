import useSWR from "swr"

function App() {

  //normal way to do it->
  //const getData=(url)=>fetch(url).then(res=>res.json())

  //better way to do it and handle errors(I just logged it , you can use the error in other ways like show it or use it to return another component)->
  const getData=async(url)=>{
    const res =await fetch(url);
    if(! res.ok){
      const error= new Error('You have an error');
      error.info=await res.json();
      error.status=res.status;
      throw error
    }

    return res.json();

  }
//with options for useSWR->
  // const{data,error}=useSWR('https://68287be16b7628c529137a63.mockapi.io/Todos',getData,{
  //   revalidateIfStale :false,
  //   revalidateOnFocus : false
  // })

  //use useSWR in a normal way->
  const{data:todos,error}=useSWR('https://68287be16b7628c529137a63.mockapi.io/Todos',getData)

  //here we add a loading (if both data and error are undefined means it's loading and we use it to show something while loading)->
  let isLoading= ! todos && ! error;

  // console.log(data , error?.info , error?.status)
  return (
    <>
      {
        isLoading ? <span>Loading....</span>
        :(
          todos?.map(
          (todo)=>(
            <div key={todo.id}>
              <p>{todo.text}</p>
            </div>
          )
        )
        )
      }
    </>
  )
}

export default App
