let animals = ["cat","dog","monkey","lion","cheetah",,"deer"]
function Animal(){
    return(
    <>
    <ListItem animals = {animals}></ListItem>
    </>)
}
function ListItem(props){
    if(!props.animals){
        return <h3>Loading.....</h3>
    }
    else{
        return <>
        {animals.map((animal)=><List key= {animal} animal = {animal}></List>)}
        </>
    }
}
function List(prop){
    return <li key ={prop.animal}>{prop.animal}</li>
}
export default Animal