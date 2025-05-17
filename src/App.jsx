import useSWR from "swr"

function App() {
  const getData=(url)=>fetch(url).then(res=>res.json())
  const{data}=useSWR('https://68287be16b7628c529137a63.mockapi.io/Todos',getData)
  console.log(data)
  return (
    <>
      {
        data?.map(
          (todo)=>(
            <div key={todo.id}>
              <p>{todo.text}</p>
            </div>
          )
        )
      }
    </>
  )
}

export default App
