import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import apiInstance from '../../utils/axios';
import UserData from '../plugin/UserData';
import moment from 'moment';
import Swal from 'sweetalert2';

function CustomerNotification() {
    const [notifications, setNotifications] = useState([])
    const userData = UserData()

    const fetchNoti = async () => {
        await apiInstance.get(`customer/notification/${userData?.user_id}/`).then((res) => {
            setNotifications(res.data);
        })
    }

    useEffect(() => {
        fetchNoti()
    }, [])

    const MarkNotificationAsSeen = (notiId) => {
        apiInstance.get(`customer/notification/${userData?.user_id}/${notiId}`).then((res) => {
            fetchNoti()
        })

        Swal.fire({
            icon: 'success',
            text: 'Notification Marked As Seen'
        })
    }

    console.log(notifications);

  return (
    <>
        <main className="mt-5">
            <div className="container">
                <section className="">
                <div className="row">
                    {/* Sidebar Here */}
                    <Sidebar />
                    <div className="col-lg-9 mt-1">
                    <section className="">
                        <main className="mb-5" style={{}}>
                        <div className="container px-4">
                            <section className="">
                            <h3 className="mb-3">
                                <i className="fas fa-bell" /> Notifications{" "}
                            </h3>
                            <div className="list-group">
                                {notifications?.map((noti, index)=> (

                                    noti.order !== null
                                    ?
                                    
                                        noti.seen === true
                                        ? 
                                        <div className="list-group-item list-group-item-action">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">New Order!</h5>
                                            <small className="text-muted">{moment(noti.date).format('MMM-DD-YYYY')}</small>
                                        </div>
                                        <p className="mb-1">
                                                Your order #{noti?.order?.oid} was successfull
                                            </p>
                                            <small className=''>Total: ${noti?.order?.total}</small> <br />
                                            <small className=''>Shipping: ${noti?.order?.shipping_amount}</small> <br />
                                            <small className=''>Tax: ${noti?.order?.tax_fee}</small> <br />
                                            <small className=''>Service Fee: ${noti?.order?.service_fee}</small> <br />

                                        </div>

                                        
                                        : 
                                        <div className="list-group-item list-group-item-action active">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">New Order!</h5>
                                            <small className="text-warning">{moment(noti.date).format('MMM-DD-YYYY')}</small>
                                        </div>
                                        <p className="mb-1">
                                                Your order #{noti?.order?.oid} was successfull
                                            </p>
                                            <small className=''>Total: ${noti?.order?.total}</small> <br />
                                            <small className=''>Shipping: ${noti?.order?.shipping_amount}</small> <br />
                                            <small className=''>Tax: ${noti?.order?.tax_fee}</small> <br />
                                            <small className=''>Service Fee: ${noti?.order?.service_fee}</small> <br />

                                        <small className="text-muted">
                                            <button onClick={() => MarkNotificationAsSeen(noti.id)} className='btn btn-success mt-3'><i className='fas fa-eye'></i></button>
                                        </small>
                                        </div>
                                    :
                                    noti.seen === true
                                    ? 
                                    <div className="list-group-item list-group-item-action">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">New Order!</h5>
                                        <small className="text-muted">{moment(noti.date).format('MMM-DD-YYYY')}</small>
                                    </div>
                                    <p className="mb-1">
                                            Your order is waiting. Please complete your purchase
                                    </p>

                                    </div>

                                    
                                    : 
                                    <div className="list-group-item list-group-item-action active">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">New Order!</h5>
                                        <small className="text-warning">{moment(noti.date).format('MMM-DD-YYYY')}</small>
                                    </div>
                                    <p className="mb-1">
                                            Your order is waiting. Please complete your purchase
                                    </p>

                                    <small className="text-muted">
                                        <button onClick={() => MarkNotificationAsSeen(noti.id)} className='btn btn-success mt-3'><i className='fas fa-eye'></i></button>
                                    </small>
                                    </div>
                                ))}

                                {notifications.length < 1 &&
                                    <h2>No notification.</h2>
                                }
                            </div>
                            </section>
                        </div>
                        </main>
                    </section>
                    </div>
                </div>
                </section>
            </div>
    </main>


    </>
  )
}

export default CustomerNotification