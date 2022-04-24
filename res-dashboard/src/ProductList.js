import Header from './Header';
import React,{useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import {Link} from 'react-router-dom'
function ProductList()
{
    const [data, setData]= useState([]);
    useEffect( ()=>{
        getData();
    },[])
    async function deleteOperation(Id){
        let result = await fetch("http://localhost:8000/api/delete/"+ Id,{
            method: "DELETE",
        })
        result = await result.json();
        console.warn(result)
        getData();
    }
    async function getData(){
        let result = await fetch("http://localhost:8000/api/list");
        result = await result.json();
        setData(result);
    }

    return (
        <div> 
            <Header />
            <h1> Product List</h1>
            <div className="col-sm-8 offset-sm-2">
            <Table>
            <tr>
                    <td>Id</td>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Description</td>
                    <td>Image</td>
                    <td>Operation</td>
                </tr>
                {
                    data.map((item)=> 
                    <tr>
                    <td>{item.Id}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    
                    <td><img style={{width:100}} src={"http://localhost:8000/"+ item.file_path} /></td>
                    <td><span onClick={()=> deleteOperation(item.Id)} className="delete">Delete</span></td>
                    <td><Link to={"update/" + item.Id}><span className="update">Update</span></Link></td>
                    </tr>
                    
                
                    )
                }
            </Table>
            </div>
        </div>
    )
}
export default ProductList;