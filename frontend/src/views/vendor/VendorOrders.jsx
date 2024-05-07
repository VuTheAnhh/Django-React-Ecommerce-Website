import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';

import apiInstance from '../../utils/axios';
import UserData from '../plugin/UserData';
import Sidebar from './Sidebar';

function VendorOrders() {
    const [orders, setOrders] = useState([])

    const userData = UserData()

    if (UserData()?.vendor_id === 0) {
        window.location.href = '/vendor/register/'
      }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiInstance.get(`vendor/orders/${userData?.vendor_id}/`)
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    
    const handleFilterOrders = async (filter) => {
        try {
            const response = await apiInstance.get(`/vendor-orders-filter/${userData?.vendor_id}?filter=${filter}`)
            setOrders(response.data);
            console.log(filter);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container-fluid" id="main" >
            <div className="row row-offcanvas row-offcanvas-left h-100">
                <Sidebar />
                <div className="col-md-9 col-lg-10 main">
                    <div className="mb-3 mt-3" style={{ marginBottom: 300 }}>
                        <div>
                            <h4><i class="bi bi-cart-check-fill"></i> All Orders  </h4>
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
                                    <button className="dropdown-item" onClick={() => handleFilterOrders('paid')}>
                                        Payment Status: Paid
                                    </button>
                                </li>
                                <li>
                                    <button className="dropdown-item" onClick={() => handleFilterOrders('pending')}>
                                        Payment Status: Pending
                                    </button>
                                </li>
                                <li>
                                    <button className="dropdown-item" onClick={() => handleFilterOrders('processing')}>
                                        Payment Status: Processing
                                    </button>
                                </li>
                                <li>
                                    <button className="dropdown-item" onClick={() => handleFilterOrders('cancelled')}>
                                        Payment Status: Cancelled
                                    </button>
                                </li>
                                <hr />
                                <li>
                                    <button className="dropdown-item" onClick={() => handleFilterOrders('latest')}>
                                        Date: Latest
                                    </button>
                                </li>

                                <li>
                                    <button className="dropdown-item" onClick={() => handleFilterOrders('oldest')}>
                                        Date: Oldest
                                    </button>
                                </li>
                                <hr />
                                <li>
                                    <button className="dropdown-item" onClick={() => handleFilterOrders('Pending')}>
                                        Order Status: Pending
                                    </button>
                                </li>
                                <li>
                                    <button className="dropdown-item" onClick={() => handleFilterOrders('Fulfilled')}>
                                        Order Status: Fulfilled
                                    </button>
                                </li>
                                <li>
                                    <button className="dropdown-item" onClick={() => handleFilterOrders('Cancelled')}>
                                        Order Status: Cancelled
                                    </button>
                                </li>
                            </ul>
                        </div>

                            <table className="table">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">#ID</th>
                                        <th scope="col">Customer</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Payment Status</th>
                                        <th scope="col">Order Status</th>
                                        <th scope="col">Shipping</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders?.map((o, index) => (
                                        <tr key={index}>
                                            <th scope="row">#{o.oid}</th>
                                            <td>{o.full_name}</td>
                                            <td>${o.total}</td>
                                            <td>{moment(o.date).format("MM/DD/YYYY")}</td>
                                            <td>{o.payment_status?.toUpperCase()}</td>
                                            <td>{o.order_status}</td>
                                            <td>{o.order_status === "Pending" ? "Delivering..." : "Complete"}</td>
                                            <td>
                                                <Link to={`/vendor/orders/${o.oid}/`} className="btn btn-primary mb-1">
                                                    <i className="fas fa-eye" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}

                                    {orders < 1 &&
                                        <h5 className='mt-4 p-3'>No orders yet</h5>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VendorOrders