import Header from './Header'
import {withRouter} from 'react-router-dom'
import {useState, useEffect} from 'react'

function UpdateProduct(props)
{
    const [name, setName]= useState("");
    const [file, setFile] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [data, setData] = useState([])
    useEffect(async () => {
        let result = await fetch("http://localhost:8000/api/product/"+ props.match.params.Id);
        result = await result.json();
        setData(result)
        setName(result.name)
        setPrice(result.price)
        setDescription(result.description);
        setFile(result.file);

    }, [])
    async function editProduct(Id){
        const formData = new FormData();
        formData.append('file', file);
        formData.append('price', price);
        formData.append('name', name);
        formData.append('description', description);
        await fetch("http://localhost:8000/api/updateproduct/"+ Id +"?_method=PUT" , {
            method: 'POST',
            body: formData
        });
        alert("Data has been updated")
    }
    return(
        <div>
            <Header />
            <h1>  UpdateProduct</h1>
            <a>Name</a><br />
            <input type="text" 
            onChange={(e) =>setName(e.target.value)}
            defaultValue={data.name} /> <br /><br />
            <a>Price</a><br />
            <input type="text" 
            onChange={(e) =>setPrice(e.target.value)}
            defaultValue={data.price} /> <br /><br />
            <a>Description</a><br />
            <input type="text" 
            onChange={(e) =>setDescription(e.target.value)}
            defaultValue={data.description} /> <br /><br />
            <a>Image</a><br />
            <input type="file" 
            onChange={(e) =>setFile(e.target.files[0])}
            defaultValue={data.file_path} /> <br /><br />
            <img style={{width:100}} src={"http://localhost:8000/"+ data.file_path} /><br /><br />
            <button onClick={()=>editProduct(data.Id)}> Update </button>
        </div>
        
    )
}
export default withRouter(UpdateProduct)