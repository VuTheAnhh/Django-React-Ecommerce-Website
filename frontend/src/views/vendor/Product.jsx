import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import apiInstance from '../../utils/axios';
import UserData from '../plugin/UserData';
import Sidebar from './Sidebar';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast:true,
    position:"top",
    showConfirmButton:false,
    timer:1500,
    timerProgressBar: true
  })

function Products() {
    const [products, setProducts] = useState([])
    const userData = UserData()

    console.log(userData.vendor_id);
    if (UserData()?.vendor_id === 0) {
        window.location.href = '/vendor/register/'
    }
    
    const fetchData = async () => {
        try {
            const response = await apiInstance.get(`vendor/products/${userData?.vendor_id}/`)
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);




    const handleFilterProduct = async (param) => {
        try {
            const response = await apiInstance.get(`vendor-product-filter/${userData?.vendor_id}?filter=${param}`)
            setProducts(response.data);
            console.log(products);

        } catch (error) {
            console.log(error);
        }
    }

    
    const handleDeleteProduct = async (productPid) => {
        await apiInstance.delete(`vendor-delete-product/${userData?.vendor_id}/${productPid}/`)
        fetchData();
        Toast.fire({
            icon:"success",
            title:'Product Deleted'
        })
    }

    return (
        <div className="container-fluid" id="main" >
            <div className="row row-offcanvas row-offcanvas-left h-100">
                <Sidebar />
                <div className="col-md-9 col-lg-10 main mt-4">
                    <>
                        <h4>
                            <i className="bi bi-grid" /> All Products
                        </h4>
                        <div className="dropdown">
                            <button
                                className="btn btn-secondary dropdown-toggle  mt-3 mb-3 me-2"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Filter <i className="fas fa-sliders" />
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li>
                                    <button className="dropdown-item" onClick={() => handleFilterProduct('no-filter')}>
                                        No Filter
                                    </button>
                                </li>
                                <li>
                                    <button className="dropdown-item" onClick={() => handleFilterProduct('published')}>
                                        Status: Published
                                    </button>
                                </li>
                                <li>
                                    <button className="dropdown-item" onClick={() => handleFilterProduct('draft')}>
                                        Status: In Draft
                                    </button>
                                </li>
                                <li>
                                    <button className="dropdown-item" onClick={() => handleFilterProduct('in-review')}>
                                        Status: In-review
                                    </button>
                                </li>
                                <li>
                                    <button className="dropdown-item" onClick={() => handleFilterProduct('disabled')}>
                                        Status: Disabled
                                    </button>
                                </li>

                                <hr />
                                <li>
                                    <button className="dropdown-item" onClick={() => handleFilterProduct('latest')}>
                                        Date: Latest
                                    </button>
                                </li>
                                <li>
                                    <button className="dropdown-item" onClick={() => handleFilterProduct('oldest')}>
                                        Date: Oldest
                                    </button>
                                </li>
                            </ul>
                            <Link to={'/vendor/add-product/'} className='btn btn-primary'>Add Product</Link>
                        </div>
                    </>
                    <div className="mb-3 mt-2">
                        <table className="table">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">#ID</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Orders</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products?.map((p, index) => (
                                    <tr key={index}>
                                        <th scope="row">#{p.pid}</th>
                                        <td><img src={p.image} style={{width:'100px', height:'100px', objectFit:'cover', borderRadius:'10px'}}></img></td>
                                        <td>{p.title}</td>
                                        <td>${p.price}</td>
                                        <td>{p.stock_qty}</td>
                                        <td>{p.orders}</td>
                                        <td>{p?.status?.toUpperCase()}</td>
                                        <td>
                                            <Link to={`/detail/${p.slug}`} className="btn btn-primary mb-1 me-2"><i className="fas fa-eye" /></Link>
                                            <Link to={`/vendor/product/update/${p.pid}/`} className="btn btn-success mb-1 me-2"><i className="fas fa-edit" /></Link>
                                            <button onClick={() => handleDeleteProduct(p.pid)} type='button' className="btn btn-danger mb-1 me-2"><i className="fas fa-trash" /></button>
                                        </td>
                                    </tr>
                                ))}

                                {products?.length < 1 &&
                                    <h4 className='p-3 mt-4'>No Products Yet</h4>
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products