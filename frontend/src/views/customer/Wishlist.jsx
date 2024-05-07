import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import apiInstance from '../../utils/axios';
import UserData from '../plugin/UserData';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast:true,
  position:"top",
  showConfirmButton:false,
  timer:1500,
  timerProgressBar: true
})

function Wishlist() {
    const [wishlist, setWishlist] = useState([])
    const userData = UserData()


    const fetchWishlist = async () => {
        try {
            const response = await apiInstance.get(`customer/wishlist/${userData?.user_id}/`);
            setWishlist(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, [userData?.user_id]);

    console.log(wishlist);

    const handleAddToWishlist = async (productId, userId) => {
        try {
            const formData = new FormData();
            formData.append('product_id', productId);
            formData.append('user_id', userId);
            const response = await apiInstance.post(`customer/wishlist/${userId}/`, formData);
        
            console.log(response.data);
            fetchWishlist();
            Swal.fire({
                icon: 'success',
                title: response.data.message,
            })
        
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <main className="mt-5">
                <div className="container">
                    <section className="">
                        <div className="row">
                            <Sidebar />
                            <div className="col-lg-9 mt-1">
                                <section className="">
                                    <main className="mb-5" style={{}}>
                                        <div className="container">
                                            {/* Section: Summary */}
                                            <section className="">
                                                <div className="row">
                                                    <h3 className="mb-3">
                                                        {" "}
                                                        <i className="fas fa-heart text-danger" /> Wishlist{" "}
                                                    </h3>
                                                    {wishlist.map((w, index) => (
                                                        <div className="col-lg-4 col-md-12 mb-4">
                                                            <div className="card">
                                                                <div
                                                                    className="bg-image hover-zoom ripple"
                                                                    data-mdb-ripple-color="light"
                                                                >
                                                                    <Link to={`/detail/${w.product.slug}`}>
                                                                        <img
                                                                            src={w.product.image}
                                                                            className="w-100"
                                                                            style={{ width: "100px", height: "300px", objectFit: "cover" }}
                                                                        />
                                                                    </Link>

                                                                </div>
                                                                <div className="card-body">
                                                                    <a href="" className="text-reset">
                                                                        <h6 className="card-title mb-3 ">{w.product.title.slice(0, 30)}...</h6>
                                                                    </a>
                                                                    <a href="" className="text-reset">
                                                                        <p>{w.product?.category.title}</p>
                                                                    </a>
                                                                    <h6 className="mb-3">{w.product.price} <strike className='mb-3 text-muted'>${w.product.old_price}</strike></h6>
                                                                    <button onClick={() => handleAddToWishlist(w.product.id, userData.user_id)} type="button" className="btn btn-danger px-3 me-1 mb-1">
                                                                        <i className="fas fa-heart" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}

                                                    {wishlist.length < 1 &&
                                                        <div className="container text-center">
                                                            <h4>No item in wishlish</h4>
                                                            <img className='' src="https://cdn.dribbble.com/users/2046015/screenshots/5973727/06-loader_telega.gif" alt="" />
                                                        </div>
                                                    }

                                                </div>
                                            </section>
                                            {/* Section: Summary */}
                                            {/* Section: MSC */}
                                            {/* Section: MSC */}
                                        </div>
                                        {/* Container for demo purpose */}
                                    </main>
                                </section>
                            </div>
                        </div>
                    </section>
                    {/*Section: Wishlist*/}
                </div>
            </main>

        </div>
    )
}

export default Wishlist