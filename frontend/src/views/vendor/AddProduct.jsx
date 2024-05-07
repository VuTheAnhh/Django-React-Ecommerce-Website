import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import apiInstance from '../../utils/axios';
import UserData from '../plugin/UserData';
import Sidebar from './Sidebar';
import Swal from 'sweetalert2'

function AddProduct() {

    const userData = UserData()
    const navigate = useNavigate()

    if (UserData()?.vendor_id === 0) {
        window.location.href = '/vendor/register/'
    }

    const [product, setProduct] = useState({
        title: '',
        image: null,
        description: '',
        category: '',
        price: '',
        old_price: '',
        shipping_amount: '',
        stock_qty: '',
        vendor: userData?.vendor_id
    });

    const [specifications, setSpecifications] = useState([{ title: '', content: '' }]);
    const [colors, setColors] = useState([{ name: '', color_code: '', image: '' }]);
    const [sizes, setSizes] = useState([{ name: '', price: ''}]);
    const [gallery, setGallery] = useState([{ image: '' }]);
    const [category, setCategory] = useState([]);

    const handleAddMore = (setStateFunction) => {
        setStateFunction((prevState) => [...prevState, {}]);
    };

    const handleRemove = (index, setStateFunction) => {
      setStateFunction((prevState) => {
          const newState = [...prevState];
          newState.splice(index, 1);
          return newState;
      });
    };

    const handleInputChange = (index, field, value, setStateFunction) => {
        setStateFunction((prevState) => {
            const newState = [...prevState];
            newState[index][field] = value;
            return newState;
        });
    };

    const handleImageChange = (index, event, setStateFunction) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setStateFunction((prevState) => {
                    const newState = [...prevState];
                    newState[index].image = { file, preview: reader.result };
                    return newState;
                });
            };

            reader.readAsDataURL(file);
        } else {
            // Handle the case when no file is selected
            setStateFunction((prevState) => {
                const newState = [...prevState];
                newState[index].image = null; // Set image to null
                newState[index].preview = null; // Optionally set preview to null
                return newState;
            });
        }
    };
    
    const handleProductInputChange = (event) => {
        setProduct({
            ...product,
            [event.target.name]: event.target.value
        })
    };

    const handleProductFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setProduct({
                    ...product,
                    image: {
                        file: event.target.files[0],
                        preview: reader.result
                    }
                });
            };

            reader.readAsDataURL(file);
        }
    }

    const fetchCategory = async () => {
        apiInstance.get(`category/`).then((res) => {
            setCategory(res.data);
        })
    }

    useEffect(() => {
        fetchCategory()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (product.title == "" || product.description == "" || product.price == "" || product.category === null || product.shipping_amount == "" || product.stock_qty == "" || product.image === null) {
            // If any required field is missing, show an error message or take appropriate action
            console.log("Please fill in all required fields");

            Swal.fire({
                icon: 'warning',
                title: 'Missing Fields!',
                text: "All fields are required to create a product",
            })
            return;
        }

        try {
            // Create a FormData object
            const formData = new FormData();

            // Append product data
            Object.entries(product).forEach(([key, value]) => {
                if (key === 'image' && value) {
                    formData.append(key, value.file);  // Assuming 'value' is an object with 'file' property
                } else {
                    formData.append(key, value);
                }
            });

            // Append specifications data
            specifications.forEach((specification, index) => {
                Object.entries(specification).forEach(([key, value]) => {
                    formData.append(`specifications[${index}][${key}]`, value);
                });
            });


            colors.forEach((color, index) => {
                Object.entries(color).forEach(([key, value]) => {
                    if (key === 'image' && value && value.file && value.file.type.startsWith('image/')) {
                        formData.append(`colors[${index}][${key}]`, value.file, value.file.name);
                    } else {
                        console.log(String(value));
                        formData.append(`colors[${index}][${key}]`, String(value)); // Convert `value` to a string
                    }
                });
            });

            // Append sizes data
            sizes.forEach((size, index) => {
                Object.entries(size).forEach(([key, value]) => {
                    formData.append(`sizes[${index}][${key}]`, value);
                });
            });

            // Append gallery data
            gallery.forEach((item, index) => {
                if (item.image) {
                    formData.append(`gallery[${index}][image]`, item.image.file);
                }
            });

            await apiInstance.post(`vendor-create-product/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            navigate('/vendor/products/')

            Swal.fire({
                icon: 'success',
                title: 'Product Created Successfully',
                text: 'This product has been successfully created',
            });



        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };


    return (
        <div className="container-fluid" id="main">
            <div className="row row-offcanvas row-offcanvas-left h-100">
                {/* Sidebar Here */}
                <Sidebar />

                <div className="col-md-9 col-lg-10 main mt-4">
                <div className="container">
                    <form onSubmit={handleSubmit} className="main-body">
                        <div className="tab-content" id="pills-tabContent">
                            <div
                            className="tab-pane fade show active"
                            id="pills-home"
                            role="tabpanel"
                            aria-labelledby="pills-home-tab"
                            >
                            <div className="row gutters-sm shadow p-4 rounded">
                                <h4 className="mb-4">Product Details</h4>
                                <div className="col-md-12">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="row text-dark">
                                        <div className="col-lg-6 mb-2">
                                            <label htmlFor="" className="mb-2">
                                            Product Thumbnail
                                            </label>
                                            <input
                                            type="file"
                                            className="form-control"
                                            name="image"
                                            onChange={handleProductFileChange}
                                            />
                                        </div>
                                        <div className="col-lg-6 mb-2 ">
                                            <label htmlFor="" className="mb-2">
                                            Title
                                            </label>
                                            <input
                                            type="text"
                                            className="form-control"
                                            name="title"
                                            value={product?.title || ''}
                                            onChange={handleProductInputChange}
                                            />
                                        </div>
                                        <div className="col-lg-12 mb-2">
                                            <label htmlFor="" className="mb-2">
                                            Description
                                            </label>
                                            <textarea
                                            className="form-control"
                                            id=""
                                            cols={30}
                                            rows={10}
                                            defaultValue={""}
                                            name="description"
                                            value={product?.description || ''}
                                            onChange={handleProductInputChange}
                                            />
                                        </div>
                                        <div className="col-lg-12 mb-2">
                                            <label htmlFor="" className="mb-2">
                                            Category
                                            </label>
                                            <select
                                            className="select form-control"
                                            id=""
                                            name="category"
                                            value={product?.category || ''}
                                            onChange={handleProductInputChange}
                                            >
                                            <option value="">- Select -</option>
                                            {category?.map((c, index) => (
                                                <option key={index} value={c.id}>{c.title}</option>
                                            ))}
                                            </select>
                                        </div>

                                        <div className="col-lg-6 mb-2 ">
                                            <label htmlFor="" className="mb-2">
                                            Sale Price
                                            </label>
                                            <input
                                            type="number"
                                            className="form-control"
                                            name="price"
                                            value={product?.price || ''}
                                            onChange={handleProductInputChange}
                                            />
                                        </div>
                                        <div className="col-lg-6 mb-2 ">
                                            <label htmlFor="" className="mb-2">
                                            Regular Price
                                            </label>
                                            <input
                                            type="number"
                                            className="form-control"
                                            name="old_price"
                                            value={product?.old_price || ''}
                                            onChange={handleProductInputChange}
                                            />
                                        </div>
                                        <div className="col-lg-6 mb-2 ">
                                            <label htmlFor="" className="mb-2">
                                            Shipping Amount
                                            </label>
                                            <input
                                            type="number"
                                            className="form-control"
                                            name="shipping_amount"
                                            value={product?.shipping_amount || ''}
                                            onChange={handleProductInputChange}
                                            />
                                        </div>
                                        <div className="col-lg-6 mb-2 ">
                                            <label htmlFor="" className="mb-2">
                                            Stock Qty
                                            </label>
                                            <input
                                            type="number"
                                            className="form-control"
                                            name="stock_qty"
                                            value={product?.stock_qty || ''}
                                            onChange={handleProductInputChange}
                                            />
                                        </div>
                                        </div>
                                    
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div
                            className="tab-pane fade"
                            id="pills-profile"
                            role="tabpanel"
                            aria-labelledby="pills-profile-tab"
                            >
                            <div className="row gutters-sm shadow p-4 rounded">
                                <h4 className="mb-4">Product Image</h4>
                                <div className="col-md-12">
                                <div className="card mb-3">
                                    <div className="card-body">

                                    {gallery?.map((item, index) => (
                                        <div className="row text-dark">
                                            <div className="col-lg-6 mb-2">
                                                {item.image &&(
                                                    <img src={item.image.preview} 
                                                    alt=""
                                                    style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:'10px'}} />
                                                )}

                                                {!item.image &&(
                                                    <img src='https://th.bing.com/th/id/OIP.z7Z9NY1WbVmMiB8jTvBK4AHaEj?rs=1&pid=ImgDetMain'
                                                    alt=""
                                                    style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:'10px'}} />
                                                )}
                                            </div>
                                            <div className="col-lg-6 mb-2">
                                                <label htmlFor="" className="mb-2">Product Image</label>
                                                <input 
                                                    type="file" 
                                                    className="form-control" 
                                                    onChange={(e) => handleImageChange(index, e, setGallery)} 
                                                />
                                                <button onClick={() => handleRemove(index, setGallery)} type='button' className='col-lg-3 btn btn-danger mt-2'>Remove</button>
                                            </div>
                                            <div className="col-lg-6 mb-2">
                                            </div>
                                        </div>
                                    ))}  

                                    {gallery < 1 &&
                                        <h4>No Image Selected</h4>
                                    }

                                    <button onClick={() => handleAddMore(setGallery)} type='button' className="btn btn-primary mt-5">
                                        <i className="fas fa-plus" /> Add Image
                                    </button>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div
                            className="tab-pane fade"
                            id="pills-contact"
                            role="tabpanel"
                            aria-labelledby="pills-contact-tab"
                            >
                            <div className="row gutters-sm shadow p-4 rounded">
                                <h4 className="mb-4">Specifications</h4>
                                <div className="col-md-12">
                                <div className="card mb-3">
                                    <div className="card-body">
                                    {specifications?.map((specification, index) => (
                                        <div className="row text-dark">
                                        <div className="col-lg-5">
                                            <label htmlFor="" className="">Title</label>
                                            <input value={specification.title || ''} onChange={(e) => handleInputChange(index, 'title', e.target.value, setSpecifications)} type="text" className="form-control"/>
                                        </div>
                                        <div className="col-lg-5">
                                            <label htmlFor="" className="">Content</label>
                                            <input value={specification.content || ''} onChange={(e) => handleInputChange(index, 'content', e.target.value, setSpecifications)} type="text" className="form-control"/>
                                        </div>
                                        <div className="col-lg-2">
                                            <button onClick={() => handleRemove(index, setSpecifications)} type='button' className='btn btn-danger mt-4'>Remove</button>
                                        </div>
                                        </div>
                                    ))}

                                    {specifications < 1 &&
                                        <h4>No Specification Selected</h4>
                                    }
                                    <button onClick={() => handleAddMore(setSpecifications)} type='button' className="btn btn-primary mt-5">
                                        <i className="fas fa-plus" /> Add Specifications
                                    </button>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>

                            <div
                            className="tab-pane fade"
                            id="pills-size"
                            role="tabpanel"
                            aria-labelledby="pills-size-tab"
                            >
                            <div className="row gutters-sm shadow p-4 rounded">
                                <h4 className="mb-4">Size</h4>
                                <div className="col-md-12">
                                <div className="card mb-3">
                                    <div className="card-body">
                                    {sizes?.map((size, index) => (
                                        <div className="row text-dark">
                                        <div className="col-lg-5">
                                            <label htmlFor="" className="">Size</label>
                                            <input value={size.name || ''} onChange={(e) => handleInputChange(index, 'name', e.target.value, setSizes)} type="text" className="form-control"/>
                                        </div>
                                        <div className="col-lg-5">
                                            <label htmlFor="" className="">Price</label>
                                            <input value={size.price || ''} onChange={(e) => handleInputChange(index, 'price', e.target.value, setSizes)} type="number" className="form-control"/>
                                        </div>
                                        <div className="col-lg-2">
                                            <button onClick={() => handleRemove(index, setSizes)} type='button' className='btn btn-danger mt-4'> Remove</button>
                                        </div>
                                        </div>
                                    ))}

                                    {sizes < 1 &&
                                        <h4>No Size Selected</h4>
                                    }
                                    
                                    <button onClick={() => handleAddMore(setSizes)} type='button' className="btn btn-primary mt-5">
                                        <i className="fas fa-plus" /> Add Size
                                    </button>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div
                            className="tab-pane fade"
                            id="pills-color"
                            role="tabpanel"
                            aria-labelledby="pills-color-tab"
                            >
                            <div className="row gutters-sm shadow p-4 rounded">
                                <h4 className="mb-4">Color</h4>
                                <div className="col-md-12">
                                <div className="card mb-3">
                                    <div className="card-body">
                                    {colors?.map((color, index) => (
                                        <div className="row text-dark">
                                            <div className="col-lg-4 ">
                                                <label htmlFor="" className="">Name</label>
                                                <input value={color.name || ''} onChange={(e) => handleInputChange(index, 'name', e.target.value, setColors)} type="text" className="form-control" />
                                            </div>
                                            <div className="col-lg-4 ">
                                                <label htmlFor="" className="">Code</label>
                                                <input value={color.color_code || ''} onChange={(e) => handleInputChange(index, 'color_code', e.target.value, setColors)} type="text" className="form-control" />
                                            </div>
                                            <div className="col-lg-4 ">
                                                <button onClick={() => handleRemove(index, setColors)} type='button' className='btn btn-danger mt-4'>Remove</button>
                                            </div>
                                        </div>
                                    ))}
                                    
                                    {colors < 1 &&
                                        <h4>No Color Selected</h4>
                                    }

                                    <button onClick={() => handleAddMore(setColors)} type='button' className="btn btn-primary mt-5">
                                        <i className="fas fa-plus" /> Add Color
                                    </button>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div>
                            <ul
                                className="nav nav-pills mb-3 d-flex justify-content-center mt-5"
                                id="pills-tab"
                                role="tablist"
                            >
                                <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link active"
                                    id="pills-home-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-home"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-home"
                                    aria-selected="true"
                                >
                                    Basic Information
                                </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link"
                                    id="pills-profile-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-profile"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-profile"
                                    aria-selected="false"
                                >
                                    Gallery
                                </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link"
                                    id="pills-contact-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-contact"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-contact"
                                    aria-selected="false"
                                >
                                    Specifications
                                </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link"
                                    id="pills-size-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-size"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-size"
                                    aria-selected="false"
                                >
                                    Size
                                </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link"
                                    id="pills-color-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-color"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-color"
                                    aria-selected="false"
                                >
                                    Color
                                </button>
                                </li>
                            </ul>
                            <div className="d-flex justify-content-center mb-5">
                                <button type='submit' className="btn btn-success w-50">
                                Create Product <i className="fa fa-check-circle" />{" "}
                                </button>
                            </div>
                            </div>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </div>

    )
}

export default AddProduct