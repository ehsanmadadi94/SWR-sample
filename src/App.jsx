import useSWR, { mutate } from "swr"

function App() {

  //normal way to do it->
  //const getData=(url)=>fetch(url).then(res=>res.json())

  //better way to do it and handle errors(I just logged it , you can use the error in other ways like show it or use it to return another component)->
  const getData=async(url,todoID)=>{
    console.log(todoID)
    const res =await fetch(url);
    if(! res.ok){
      const error= new Error('You have an error');
      error.info=await res.json();
      error.status=res.status;
      throw error
    }

    // return res.json();
    let data=await res.json();
    return data;

  }
//with options for useSWR->
  // const{data:todos,error,mutate}=useSWR('https://68287be16b7628c529137a63.mockapi.io/Todos',getData,{
  //   revalidateIfStale :true,
  //   revalidateOnFocus : true,
  //   refreshInterval:1000
  // })

  //use useSWR in a normal way->
  // const{data:todos,error,mutate}=useSWR('https://68287be16b7628c529137a63.mockapi.io/Todos',getData)

  //this way you can send data to fetcher function (getData)(first way)->
  const{data:todos,error,mutate}=useSWR('https://68287be16b7628c529137a63.mockapi.io/Todos',(url)=>getData(url,6),{
    revalidateIfStale :true,
    revalidateOnFocus : true,
    refreshInterval:1000
  })
    //this way you can send data to fetcher function (getData)(second way)->
  //   const{data:todos,error,mutate}=useSWR(["https://68287be16b7628c529137a63.mockapi.io/Todos",8],getData,{
  //   revalidateIfStale :true,
  //   revalidateOnFocus : true,
  //   refreshInterval:1000
  // })


  //here we add a loading (if both data and error are undefined means it's loading and we use it to show something while loading)->
  let isLoading= ! todos && ! error;

  // console.log(data , error?.info , error?.status)

  const addTodoHandler = async ()=>{
    let todo={
      text: 'new todo'+Date.now(),
      is_done:false,
      id:Date.now(),
    }
    mutate([
      ...todos,
      {
        ...todo,
        id:Date.now(),
      }],{
        revalidate:false
      })

    const res = await fetch('https://68287be16b7628c529137a63.mockapi.io/Todos',{
      method:'POST',
       headers: {'content-type':'application/json'},
       body:JSON.stringify(todo)
    })
    mutate()
    console.log(res)
  }

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
      <button onClick={addTodoHandler}>Add Todo</button>
    </>
  )
}

export default App
