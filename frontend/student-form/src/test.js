import axios from 'axios';



async function g()
{
    const response = await axios.get('http://localhost:3000/', { params: { rno : 1 } });
   console.log(response.data);
}


g();