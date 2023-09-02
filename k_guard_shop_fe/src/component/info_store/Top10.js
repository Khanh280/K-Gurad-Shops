import {ChartComponent} from "./ChartComponent";
import {Chart} from "chart.js/auto"
import React, {useEffect, useState} from "react";
import * as ProductService from "../../service/ProductService"
import {ErrorMessage, Field, Formik,Form} from "formik";
import * as yup from "yup"

export default function Top10() {
    const [products, setProduct] = useState()
    const getTop10Product = async () => {
        const res = await ProductService.getTop10Product()
        console.log(res.data)
        setProduct(() => res.data)
    }
    useEffect(() => {
        getTop10Product()
    }, [])
    if (!products) {
        return null;
    }
    return (
        <div>
            <div>
                <Formik
                    initialValues={{
                        startMonth: "",
                        endMonth: "",
                        years: ""
                    }}
                    validationSchema={yup.object({
                        years: yup.string().matches(/^[0-9]+$/,'Năm phải là số').matches(/^[1-9][0-9]{3,}$/,'Năm tối thiểu 4 số')
                    })}
                    onSubmit={async (values) => {
                        // if (dateTimeProfit?.startMonth === "" && dateTimeProfit?.endMonth === "" && dateTimeProfit?.years === "" || dateTimeProfit?.years === "") {
                        //     await setYearCurrent(" (2023) ")
                        // } else {
                        //     await setYearCurrent(" ( " + dateTimeProfit?.years + " ) ")
                        // }
                        //
                        // // await getContract(values.startMonth, values.endMonth, values.years, 0, params.profitType || profitType)
                        // // await getDataProfit(values.startMonth, values.endMonth, values.years, params.profitType || profitType)
                        // // await getProfit(values.startMonth, values.endMonth, values.years, params.profitType || profitType)
                        // // await setStartMonth(values.startMonth);
                        // // await setEndMonth(values.endMonth);
                        // // await setYears(values.years)
                        // await getContract(dateTimeProfit?.startMonth, dateTimeProfit?.endMonth, dateTimeProfit?.years, 0, params.profitType || profitType)
                        // await getDataProfit(dateTimeProfit?.startMonth, dateTimeProfit?.endMonth, dateTimeProfit?.years, params.profitType || profitType)
                        // await getProfit(dateTimeProfit?.startMonth, dateTimeProfit?.endMonth, dateTimeProfit?.years, params.profitType || profitType)
                    }}>
                    <Form className="ps-5 col-lg-12 col-md-12 col-12" style={{boxSizing: "border-box"}}>
                        <div
                            className="d-flex row col-lg-12 col-md-12 col-12 justify-content-between p-0 m-0"
                            style={{
                                height: "4.8vh"
                            }}>
                            <div className="col-lg-3 col-md-3 col-6 p-0">
                                            <span style={{fontWeight: "500"}}>
                                                <Field name="startMonth"
                                                       as="select"
                                                       className="form-control text-center"
                                                       // onChange={(event) => setStartMonth(event)}
                                                       // value={dateTimeProfit?.startMonth}
                                                >
                                                    <option value={""}>Tháng bắt đầu</option>
                                                    {/*{*/}
                                                    {/*    months.map((month, index) =>*/}
                                                    {/*        <option key={index} value={month}>Tháng {month}</option>*/}
                                                    {/*    )*/}
                                                    {/*}*/}
                                                </Field>
                                            </span>
                            </div>
                            <div className="col-lg-3 col-md-3 col-6">
                                            <span style={{fontWeight: "500"}}>
                                                <Field name="endMonth"
                                                       as="select"
                                                       className="form-control text-center"
                                                       // onChange={(event) => setEndMonth(event)}
                                                       // value={dateTimeProfit?.endMonth}
                                                >
                                                    <option value={""}>Tháng kết thúc</option>
                                                    {/*{*/}
                                                    {/*    months.map((month, index) =>*/}
                                                    {/*        <option key={index} value={month}>Tháng {month}</option>*/}
                                                    {/*    )*/}
                                                    {/*}*/}
                                                </Field>
                                            </span>
                            </div>
                            <div className="col-lg-3 col-md-3 col-6">
                                            <span style={{fontWeight: "500"}}>
                                                <Field name="years"
                                                       type="text"
                                                       className="form-control"
                                                       // onChange={(event) => setYears(event)}
                                                       // value={dateTimeProfit?.years}
                                                       placeholder="Vui lòng nhập năm"
                                                />
                                                <ErrorMessage name="years" component="p" style={{color: "red"}}/>
                                            </span>
                            </div>
                            <div className=" col-lg-3 col-md-3 col-12 p-0 d-flex justify-content-end"
                                 style={{
                                     displayFlex: "flex",
                                     height: "100%",
                                     alignItems: "center"
                                 }}>
                                <button type="submit"
                                        className="btn btn-sm btn-outline-success col-lg-6 col-md-6 col-6"
                                        style={{
                                            height: "100%",
                                            alignItems: "center",
                                            display: "flex",
                                            justifyContent: "center"
                                        }}>Thống kê
                                </button>
                                <button type="button"
                                        // onClick={() => setCancel()}
                                        className="btn btn-sm btn-outline-secondary col-lg-6 col-md-6 col-6 ms-1"
                                        style={{
                                            height: "100%",
                                            alignItems: "center",
                                            display: "flex",
                                            justifyContent: "center",
                                            // border: "1px solid red"
                                        }}>
                                    Nhập lại
                                </button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
            <div style={{height: "35rem"}}>
                <ChartComponent data={products}/>
            </div>
        </div>
    )
}