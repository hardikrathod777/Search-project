import { useState,useEffect } from 'react';
import { Button, Container,Form,Dropdown } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import initialUsers from '../../Helper/Data';

function View() {

    const [users, setUsers] = useState(initialUsers);
    const [searchItem,setSearchItem] =useState('');
    const [cities, setCities] = useState([]);

    useEffect(() => {
        const uniqueCities = Array.from(new Set(initialUsers.map(user => user.address.city)));
        setCities(uniqueCities);
    }, []);

    const handleSorting = (key, type) => {
        const sortedUsers = [...users].sort((a, b) => {
            const aValue = key.split('.').reduce((obj, key) => obj?.[key], a);
            const bValue = key.split('.').reduce((obj, key) => obj?.[key], b);

            if (aValue === undefined || bValue === undefined) {
                return 0;
            }

            if (type === 'asc') {
                return aValue.localeCompare ? aValue.localeCompare(bValue) : aValue - bValue;
            } else {
                return bValue.localeCompare ? bValue.localeCompare(aValue) : bValue - aValue;
            }
        });
        setUsers(sortedUsers);
    }
    const HandleReset =()=>{
        setUsers(initialUsers);
    }
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchItem.trim() === '') {
            setUsers(initialUsers);
        } else {
            const searchResult = initialUsers.filter((data) => {
                return data.firstName.toLowerCase().includes(searchItem.toLowerCase());
            });
            setUsers(searchResult);
        }
    }

    const handleChange = (e) => {
        setSearchItem(e.target.value);
        if (e.target.value.trim() === '') {
            setUsers(initialUsers);
        } else {
            const searchResult = initialUsers.filter((data) => {
                return data.firstName.toLowerCase().includes(e.target.value.toLowerCase());
            });
            setUsers(searchResult);
        }
    }

    const handleFilter = (city) => {
        if (city !== "all") {
            const filteredData = initialUsers.filter((data) => {
                return city === data.address.city;
            });
            setUsers(filteredData);
        } else {
            setUsers(initialUsers);
        }
    }


    return (
    <>
    <Container className='pt-4'>
    <div className='d-flex justify-content-between' >
        <div>
            <Button variant='danger' type='button' onClick={HandleReset} style={{padding:'5px 10px',marginBottom:'20px'}}>Reset </Button>
        </div>
        <div className='d-flex'>
            <div className='pe-3'>
                <Form onSubmit={handleSearch}>
                    <Form.Control type="text" placeholder="Search Name" value={searchItem} onChange={handleChange} />
                </Form>
            </div>
            <div>
                <Dropdown>
                    <Dropdown.Toggle variant="warning" id="dropdown-basic" style={{padding:'5px 10px'}}>
                                    Cities
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleFilter("all")}>All</Dropdown.Item>
                        {cities.map((city) => (
                            <Dropdown.Item key={city} onClick={() => handleFilter(city)}>{city}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    </div>
    
    <Table striped bordered hover>
        <thead>
            <tr>
            <th>ID</th>
            <th>Full Name 
                <Button variant='primary' className='me-2' style={{marginLeft:'80px'}} onClick={() => handleSorting('firstName', 'asc')}>A</Button>
                <Button variant='primary' onClick={() => handleSorting('firstName', 'desc')}>D</Button>
            </th>
            <th>
                Age 
                <Button variant='primary' className='me-2' style={{marginLeft:'10px'}} onClick={() => handleSorting('age', 'asc')}>A</Button>
                <Button variant='primary' onClick={() => handleSorting('age', 'desc')}>D</Button>
            </th>
            <th>Gender</th>
            <th>
                E-mail 
                <Button variant='primary' className='me-2' style={{marginLeft:'120px'}} onClick={() => handleSorting('email', 'asc')}>A</Button>
                <Button variant='primary' onClick={() => handleSorting('email', 'desc')}>D</Button>
            </th>
            <th>Phone</th>
            <th>
                User name 
                <Button variant='primary' className='me-2' style={{marginLeft:'10px'}} onClick={() => handleSorting('username', 'asc')}>A</Button>
                <Button variant='primary' onClick={() => handleSorting('username', 'desc')}>D</Button>
            </th>
            <th>
                Address 
                <Button variant='primary' className='me-2' style={{marginLeft:'190px'}} onClick={() => handleSorting('address.city', 'asc')}>A</Button>
                <Button variant='primary' onClick={() => handleSorting('address.city', 'desc')}>D</Button>
            </th>
            </tr>
        </thead>
        <tbody>
            {users.map(user => (
                <tr key={user.id}>
                    <td>
                        {user.id}
                    </td>
                    <td>
                        {user.firstName} {user.lastName} {user.maidenName}
                    </td>
                    <td>
                        {user.age}
                    </td>
                    <td>
                        {user.gender}
                    </td>
                    <td>
                        {user.email}
                    </td>
                    <td>
                        {user.phone}
                    </td>
                    <td>
                        {user.username}
                    </td>
                    <td>
                        {user.address.address}, {user.address.city}
                    </td>
                </tr>
            ))}
        </tbody>
        </Table>
    </Container>
    </>
    )
}

export default View;