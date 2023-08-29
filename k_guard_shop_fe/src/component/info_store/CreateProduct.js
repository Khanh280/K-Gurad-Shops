import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as yup from "yup";
import * as ProductService from "../../service/ProductService";
import {toast} from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";
import {getDownloadURL, ref, uploadBytesResumable} from "@firebase/storage";
import {storage} from "../../firebase";
import {log10} from "chart.js/helpers";


export default function CreateProduct() {
    const [productTypes, setProductType] = useState()
    const [brands, setBrand] = useState()
    const [sizes, setSize] = useState()
    const [image1, setImage1] = useState()
    const [image2, setImage2] = useState()
    const [image3, setImage3] = useState()
    const [image4, setImage4] = useState()
    const [customer, setCustomer] = useState({
        name: "",
        address: "",
        phoneNumber: "",
        gender: "",
        username: "",
        password: "",
        email: ""
    })

    const getProductType = async () => {
        const res = await ProductService.getAllProductType()
        setProductType(() => res.data)
    }
    const getBrand = async () => {
        const res = await ProductService.getAllBrand()
        setBrand(() => res.data)
    }
    const getSize = async () => {
        const res = await ProductService.getAllSize()
        setSize(() => res.data)
    }
    const navigate = useNavigate();
    const handleFileSelect =(event, setFile) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
        }
    };
    const handleAvatarFileSelect = (event) => {
        handleFileSelect(event, setImage1);
    };
    const handleImage1FileUpload = async () => {
        return handleFileUpload(image1, setImage1);
    };
    const handleImage2FileUpload = async () => {
        return handleFileUpload(image2, setImage2);
    };
    const handleImage3FileUpload = async () => {
        return handleFileUpload(image3, setImage3);
    };
    const handleImage4FileUpload = async () => {
        return handleFileUpload(image4, setImage4);
    };
    const handleFileUpload = async (file, setFile, setFileUrl) => {
        return new Promise((resolve, reject) => {
            if (!file) return reject("No file selected");
            const newName = "k_guard_shop" + Date.now() + "_" + (file.name.length >= 5 ? file.name.slice(0, 5) : file.name);

            const storageRef = ref(storage, `files/${newName}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                },
                (error) => {
                    reject(error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    setFile(downloadURL);
                    resolve(downloadURL);
                }
            );
        });
    };


    useEffect(() => {
        getProductType()
        getBrand()
        getSize()
        console.log(customer)
    }, [customer])
    if (!productTypes || !brands || !sizes) {
        return null;
    }
    return (
        <div className="row mt-4" style={{height: "100vh", display: "flex"}}>
            <div className="col-md-1"></div>
            <div className="col-md-10">
                <Formik
                    initialValues={{
                        id: "",
                        name: "",
                        description: "",
                        price: "",
                        quantity: 0,
                        brand: brands[0].id,
                        productType: productTypes[0].id,
                        sizes: sizes[0].id,
                        image1: "",
                        image2: "",
                        image3: "",
                        image4: ""
                    }}
                    validationSchema={yup.object({
                        // name: yup.string().required("Tên không được để trống"),
                        // address: yup.string().required("Địa chỉ không được để trống"),
                        // phoneNumber: yup.string().required("Số điện thoại không được để trống"),
                        // gender: yup.number().required("Vui lòng chọn giới tính")
                        //     .min(0, "Vui lòng chọn giới tính hợp lệ")
                        //     .max(2, "Vui lòng chọn giới tính hợp lệ"),
                        // username: yup.string().required("Tên đăng nhập không được để trống"),
                        // password: yup.string().required("Mật khẩu không được để trống"),
                        // confirmPassword: yup.string().required("Mật khẩu không được để trống"),
                        // email: yup.string().required("Email không được để trống")
                    })}
                    onSubmit={async (values, {setSubmitting, resetForm}) => {
                        const res = await Promise.all([handleImage1FileUpload(),handleImage2FileUpload()]);
                        console.log(res[0])
                        // const newValue = {
                        //     ...values,
                        //     brand: brands.find((brand) => brand.id === values.brand),
                        //     productType: productTypes.find((productType) => productType.id === values.productType),
                        //     sizes: sizes.find((size) => size.id === values.sizes),
                        //     image: [{
                        //         id: "",
                        //         product: {
                        //             id: ""
                        //         },
                        //         link: values.images
                        //     }]
                        //
                        // }
                        //
                        // try {
                        //     await ProductService.saveProduct(newValue);
                        //     navigate("/info-store/product-list")
                        //     toast.success("Thêm sản phẩm thành công.")
                        // } catch (e) {
                        //     // await setCustomer({
                        //     //     ...customer,
                        //     //     name: e.response.data.name || "",
                        //     //     address: e.response.data.address || "",
                        //     //     phoneNumber: e.response.data.phoneNumber || "",
                        //     //     gender: e.response.data.gender || "",
                        //     //     username: e.response.data.username || "",
                        //     //     password: e.response.data.password || "",
                        //     //     email: e.response.data.email || ""
                        //     // })
                        // } finally {
                        //     setSubmitting(false)
                        // }
                    }}
                >
                    {
                        ({isSubmitting,setFieldValue}) => (
                            <Form>
                                <div className="row card1" style={{
                                    border: "1px solid gray",
                                    borderRadius: "10px",
                                    padding: "15px",
                                    backgroundColor: "rgba(255,255,255,0.85)",
                                    display: "grid",
                                    alignItems: "center"
                                }}>
                                    <div className="col-md-12 d-flex flex-column">
                                                <span
                                                    className="login ms-0 col-md-12 justify-content-center d-flex"><h3>Thêm mới sản phẩm</h3></span>
                                    </div>
                                    <div className="col-md-12 input-field d-flex flex-column mt-3">
                                        <div className="row d-flex height-row">
                                            <div className="col-md-4">
                                                <label className="mt-1 mb-0" htmlFor="name"><b>Tên sản phẩm</b></label>
                                                <Field className="form-control " id="name" name="name"
                                                    // style={{height: "4vh"}}
                                                       placeholder=" "/>
                                                <ErrorMessage name="name" component="p"
                                                              className="text-danger"/>
                                                {
                                                    customer.name !== "" ?
                                                        <p className="text-danger">{customer.name}</p>
                                                        :
                                                        <p>&nbsp;</p>
                                                }
                                            </div>
                                            <div className="col-md-4">
                                                <label className=" mt-1 mb-0" htmlFor="price"><b>Giá</b></label>
                                                <Field className="form-control " id="price" name="price"
                                                       type="number"
                                                    // style={{height: "4vh"}}
                                                       placeholder=" "/>
                                                <ErrorMessage name="price" component="p"
                                                              className="text-danger"/>
                                                {
                                                    customer.price !== "" ?
                                                        <p className="text-danger">{customer.price}</p>
                                                        :
                                                        <p>&nbsp;</p>
                                                }
                                            </div>
                                            <div className="col-md-4">
                                                <label className="mt-1 mb-0" htmlFor="quantity"><b>Số lượng</b></label>
                                                <Field className="form-control " id="quantity"
                                                       name="quantity"
                                                       type="number"
                                                    // style={{height: "4vh"}}
                                                       placeholder=" "/>
                                                <ErrorMessage name="quantity" component="p"
                                                              className="text-danger"/>
                                                {
                                                    customer.quantity !== "" ?
                                                        <p className="text-danger">{customer.quantity}</p>
                                                        :
                                                        <p>&nbsp;</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="row d-flex height-row">
                                            <div className="col-md-4">
                                                <label className="mt-1 mb-0" htmlFor="productType"><b>Loại sản phẩm</b></label>
                                                <Field as="select" className="form-control " id="productType"
                                                       name="productType"
                                                    // style={{height: "4vh"}}
                                                       placeholder=" ">
                                                    {
                                                        productTypes.map((productType) =>
                                                            <option value={productType.id}>{productType.name}</option>
                                                        )
                                                    }
                                                </Field>
                                                <ErrorMessage name="productType" component="p"
                                                              className="text-danger"/>
                                                {
                                                    customer.productType !== "" ?
                                                        <p className="text-danger">{customer.productType}</p>
                                                        :
                                                        <p>&nbsp;</p>
                                                }
                                            </div>
                                            <div className="col-md-4">
                                                <label className=" mt-1 mb-0"
                                                       htmlFor="brand"><b>Thương hiệu</b></label>
                                                <Field as="select" className="form-control " id="brand" name="brand"
                                                    // style={{height: "4vh"}}
                                                       placeholder=" ">
                                                    {
                                                        brands.map((brand) =>
                                                            <option value={brand.id}>{brand.name}</option>
                                                        )
                                                    }
                                                </Field>
                                                <ErrorMessage name="brand" component="p"
                                                              className="text-danger"/>
                                                {
                                                    customer.brand !== "" ?
                                                        <p className="text-danger">{customer.brand}</p>
                                                        :
                                                        <p>&nbsp;</p>
                                                }
                                            </div>
                                            <div className="col-md-4">
                                                <label className=" mt-1 mb-0" htmlFor="sizes"><b>Sizes</b></label>
                                                <Field as="select" className="form-control " id="sizes"
                                                       name="sizes"
                                                    // style={{height: "4vh"}}
                                                       placeholder=" ">
                                                    {
                                                        sizes.map((size) =>
                                                            <option value={size.id}>{size.name}</option>
                                                        )
                                                    }
                                                </Field>
                                                <ErrorMessage name="sizes" component="p"
                                                              className="text-danger"/>
                                                {
                                                    customer.size !== "" ?
                                                        <p className="text-danger">{customer.size}</p>
                                                        :
                                                        <p>&nbsp;</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="row d-flex height-row">
                                            <div className="col-md-12">
                                                <label className="mt-1 mb-0" htmlFor="description"><b>Mô tả</b></label>
                                                <Field as="textarea" className="form-control " id="description"
                                                       name="description"
                                                       placeholder=""/>
                                                <ErrorMessage name="description" component="p"
                                                              className="text-danger"/>
                                                {
                                                    customer.description !== "" ?
                                                        <p className="text-danger">{customer.description}</p>
                                                        :
                                                        <p>&nbsp;</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="row d-flex height-row">
                                            <div className="col-md-3">
                                                <label className="mt-1 mb-0" htmlFor="images1"><b>Hình ảnh 1</b></label>
                                                <Field type="file" className="form-control" id="images1"
                                                       name="image1"
                                                       placeholder=""
                                                       onChange={(event)=> {
                                                           handleFileSelect(event,setImage1)
                                                           setFieldValue("image1",event.target.value)
                                                       }}
                                                       />
                                                {
                                                    image1 ?
                                                        <img src={URL.createObjectURL(image1)} alt="" id="image1" style={{width: "18rem"}}/>
                                                        : ""
                                                }
                                                <ErrorMessage name="images" component="p"
                                                              className="text-danger"/>
                                                {
                                                    customer.image !== "" ?
                                                        <p className="text-danger">{customer.image}</p>
                                                        :
                                                        <p>&nbsp;</p>
                                                }
                                            </div>
                                            <div className="col-md-3">
                                                <label className="mt-1 mb-0" htmlFor="images2"><b>Hình ảnh 2</b></label>
                                                <Field type="file" className="form-control" id="images2"
                                                       name="image2"
                                                       placeholder=""
                                                       onChange={(event)=> {
                                                           handleFileSelect(event,setImage2)
                                                           setFieldValue("image2",event.target.value)
                                                       }}
                                                />
                                                {
                                                    image2 ?
                                                        <img src={URL.createObjectURL(image2)} alt="" id="image2" style={{width: "18rem"}}/>
                                                        : ""
                                                }
                                                <ErrorMessage name="images" component="p"
                                                              className="text-danger"/>
                                                {
                                                    customer.image !== "" ?
                                                        <p className="text-danger">{customer.image}</p>
                                                        :
                                                        <p>&nbsp;</p>
                                                }
                                            </div>
                                            <div className="col-md-3">
                                                <label className="mt-1 mb-0" htmlFor="images3"><b>Hình ảnh 3</b></label>
                                                <Field type="file" className="form-control" id="images3"
                                                       name="image3"
                                                       placeholder=""
                                                       onChange={(event)=> {
                                                           handleFileSelect(event,setImage3)
                                                           setFieldValue("image3",event.target.value)
                                                       }}
                                                />
                                                {
                                                    image3 ?
                                                        <img src={URL.createObjectURL(image3)} alt="" id="image3" style={{width: "18rem"}}/>
                                                        : ""
                                                }

                                                <ErrorMessage name="images" component="p"
                                                              className="text-danger"/>
                                                {
                                                    customer.image !== "" ?
                                                        <p className="text-danger">{customer.image}</p>
                                                        :
                                                        <p>&nbsp;</p>
                                                }
                                            </div>
                                            <div className="col-md-3">
                                                <label className="mt-1 mb-0" htmlFor="images4"><b>Hình ảnh 4</b></label>
                                                <Field type="file" className="form-control" id="images4"
                                                       name="image4"
                                                       placeholder=""
                                                       onChange={(event)=> {
                                                           handleFileSelect(event,setImage4)
                                                           setFieldValue("image4",event.target.value)
                                                       }}
                                                />
                                                {
                                                    image4 ?
                                                        <img src={URL.createObjectURL(image4)} alt="" id="image4" style={{width: "18rem"}}/>
                                                        : ""
                                                }

                                                <ErrorMessage name="images" component="p"
                                                              className="text-danger"/>
                                                {
                                                    customer.image !== "" ?
                                                        <p className="text-danger">{customer.image}</p>
                                                        :
                                                        <p>&nbsp;</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="row d-flex"
                                             style={{
                                                 cursor: isSubmitting ? "pointer" : "",
                                                 borderRadius: isSubmitting ? "5px" : "",
                                                 // opacity: isSubmitting ? "30%" : "",
                                                 pointerEvents: isSubmitting ? "none" : ""
                                             }}
                                        >
                                            <div className="col-md-5"></div>
                                            {/*<div className="col-md-3">*/}
                                            {/*    <Link to="/info-store" className="col-md-12 p-0">*/}
                                            {/*        <button*/}
                                            {/*            style={{cursor: "pointer", borderRadius: "5px"}}*/}
                                            {/*            className=" login-button">*/}
                                            {/*            Quay lại*/}
                                            {/*        </button>*/}
                                            {/*    </Link>*/}
                                            {/*</div>*/}
                                            <div className="col-md-2">
                                                <button
                                                    style={{cursor: "pointer", borderRadius: "5px"}}
                                                    className=" login-button"
                                                    type="submit">
                                                    {
                                                        isSubmitting ?
                                                            <PulseLoader
                                                                className="d-flex align-items-center justify-content-center"
                                                                color="#F4882F" size={10} margin={10}/>
                                                            :
                                                            "Thêm"
                                                    }
                                                </button>
                                            </div>
                                            <div className="col-md-5"></div>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
            <div className="col-md-1"></div>
        </div>
    )
}